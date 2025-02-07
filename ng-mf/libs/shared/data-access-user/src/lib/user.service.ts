import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

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
          localStorage.setItem('userId', response._id); 
        }),
        catchError((error) => { 
          console.error('Login failed:', error);
          return of(null); 
        })
      ).subscribe();
  }

  createUser(username: string, password: string): Observable<any> {
    const requestBody = { email: username, password: password };
  
    return this.http.post(`${this.apiUrl}auth/users`, requestBody, {
      withCredentials: true,
    }).pipe(
      tap((response: any) => {
        console.log('User created successfully:', response);
        this.isUserLoggedIn.next(true); // Mark user as logged in
      }),
      catchError((error) => {
        console.error('User creation failed:', error);
        return of(null);
      })
    );
  }
  
  logout() {
    localStorage.removeItem('token');
    this.isUserLoggedIn.next(false);
  }
}
