// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://college-attendance-system-backend.vercel.app";

  constructor(private http: HttpClient) {}

//   login(username: string, password: string): Observable<User> {
//     const body = { username, password };
//     return this.http.post<User>(`${this.apiUrl}/login`, body);
//   }
  register(username: string, password: string, role: string): Observable<any> {
    const body = { username, password, role };
    return this.http.post<any>(`${this.apiUrl}/register`, body);
  }
  login(username: string, password: string): Observable<any> {
    const body = { username, password };

    return this.http.post<any>(`${this.apiUrl}/login`, body).pipe(
      tap(response => {
        console.log(response,"resp")
        // Assuming the server returns a token upon successful login
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          console.log(localStorage,"localstorage")
          // Additional logic to store user details, role, etc., can be added here
        }
      })
    );
  }

  logout(): void {
    // Clear the token and any other stored user information on logout
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    // Check if the token is present (indicating the user is authenticated)
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    // Get user role from stored information (you can enhance this based on your needs)
    // This is just a placeholder; you might store more information in the token or elsewhere
    // For example, you might decode the token to get user details
    // Here, we are assuming a basic structure where the role is stored in the token
    const token = localStorage.getItem('token');
    console.log(token,"token")
    if (token) {
      const decodedToken = this.decodeToken(token);
      console.log(decodedToken)
      return decodedToken?.role || null;
    }
    return null;
  }

  private decodeToken(token: string): any {
    // This is a placeholder; you should decode the token using a library like jwt-decode or your server logic
    // This function is just for demonstration purposes
    try {
      // This is a simple example; in a real-world scenario, you would use a proper library to decode the token
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
