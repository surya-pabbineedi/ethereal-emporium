import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';
import { API_URL } from '../app.config';

type ProductResponse = {
  products: Product[];
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_URL) private apiURL: string
  ) {}

  getProducts$(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURL}/api/Product`);
  }

  getProduct$(id: string | null): Observable<Product> {
    if (!id) throw new Error('No product id');

    return this.http.get<Product>(`${this.apiURL}/api/Product${id}`);
  }

  searchProducts(incomingQuery: string): Observable<Product[]> {
    return this.http
      .get<ProductResponse>(
        `https://dummyjson.com/products/search?q=${incomingQuery}`
      )
      .pipe(map((response: ProductResponse) => response.products));
  }
}
