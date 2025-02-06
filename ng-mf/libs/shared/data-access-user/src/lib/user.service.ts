import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isUserLoggedIn$ = this.isUserLoggedIn.asObservable();

  private apiUrl = 'http://localhost:3001/'; // Your backend URL

  constructor(private http: HttpClient) {}

  // Check credentials against backend
  login(username: string, password: string) {
    const credentials = { 
      "email": username, 
      "password": password };

      return this.http.post(`${this.apiUrl}auth/login`, credentials, {
        withCredentials: true,
      }).pipe(
        tap((response: any) => {
          this.isUserLoggedIn.next(true); 

          // window.location.href = 'http://localhost:4202/bingo';
        }),
        catchError((error) => { 
          console.error('Login failed:', error);
          return of(null); 
        })
      ).subscribe();
  }

  logout() {
    localStorage.removeItem('token');
    this.isUserLoggedIn.next(false);
  }
}
