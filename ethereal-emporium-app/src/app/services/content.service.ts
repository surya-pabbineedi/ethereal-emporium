import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_URL) private apiURL: string
  ) {}

  importProducts(products: Product[]): Observable<string> {
    return this.http.post<string>(`${this.apiURL}/api/content/products`, {
      products,
    });
  }
}
