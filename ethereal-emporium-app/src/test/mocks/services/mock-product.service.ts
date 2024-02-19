import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { PagedResponse } from 'src/app/models/paged-response';
import { Product } from 'src/app/models/product';

@Injectable()
export class MockProductService {
  getProducts$(): Observable<PagedResponse<Product>> {
    return of({
      items: [],
      limit: 0,
      skip: 0,
      total: 0,
    });
  }

  getProduct$(id: string | null): Observable<Product | null> {
    return of(null);
  }

  searchProducts(incomingQuery: string): Observable<Product[]> {
    return of([]);
  }
}
