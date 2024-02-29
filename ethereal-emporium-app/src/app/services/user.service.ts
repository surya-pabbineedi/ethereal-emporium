import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_URL) private api_url: string
  ) {}

  login(email: string, password: string): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${this.api_url}/login`, {
      email,
      password,
    });
  }
}
