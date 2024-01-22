// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://college-attendance-system-backend.vercel.app";

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    const body = { username, password };
    return this.http.post<User>(`${this.apiUrl}/login`, body);
  }
  register(username: string, password: string, role: string): Observable<any> {
    const body = { username, password, role };
    return this.http.post<any>(`${this.apiUrl}/register`, body);
  }
}
