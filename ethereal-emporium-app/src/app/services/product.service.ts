import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';
import { PagedResponse } from '../models/paged-response';

type ProductResponse = {
  products: Product[];
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  getProducts$(): Observable<PagedResponse<Product>> {
    return this.http.get('https://dummyjson.com/products').pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map((response: any) => ({ ...response, items: response.products }))
    ) as Observable<PagedResponse<Product>>;
  }

  getProduct$(id: string | null): Observable<Product> {
    if (!id) throw new Error('No product id');

    return this.http.get<Product>(`https://dummyjson.com/products/${id}`);
  }

  searchProducts(incomingQuery: string): Observable<Product[]> {
    return this.http
      .get<ProductResponse>(
        `https://dummyjson.com/products/search?q=${incomingQuery}`
      )
      .pipe(map((response: ProductResponse) => response.products));
  }
}
