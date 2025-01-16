import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseURL } from '../baseURL';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseURL {

  constructor(private http: HttpClient) {
      super();
  }

  login(email: string, password: string): Observable<any> {
    const payload = { email, password }; // Dữ liệu gửi lên API
    return this.http.post(`${BaseURL.getOrigin()}/auth/login`, payload);
  }
}
