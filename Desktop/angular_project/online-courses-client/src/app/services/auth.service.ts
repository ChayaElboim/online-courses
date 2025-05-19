import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth-response';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth/auth.actions';
import { selectCurrentUser, selectIsAuthenticated } from '../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users'; // <-- שינוי הנתיב הבסיסי ל-/api/users

  constructor(private http: HttpClient, private store: Store) { }

  register(user: User): Observable<AuthResponse> {
    console.log('Attempting registration for:', user);
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user)
      .pipe(
        tap(response => {
          console.log('Registration successful', response);
          localStorage.setItem('authToken', response.token);
          this.store.dispatch(AuthActions.registerSuccess({ user: { id: response.userId, role: response.role } })); // שידור עם מבנה user: { id, role }
        }),
        catchError(this.handleError<AuthResponse>('register'))
      );
  }

  login(credentials: { email: string, password: string }): Observable<AuthResponse> {
    console.log('Attempting login for:', credentials.email);
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          console.log('Login successful', response);
          localStorage.setItem('authToken', response.token);
          this.store.dispatch(AuthActions.loginSuccess({ user: { id: response.userId, role: response.role } })); // שידור עם מבנה user: { id, role }
        }),
        catchError(this.handleError<AuthResponse>('login'))
      );
  }

  logout(): void {
    console.log('Logging out');
    localStorage.removeItem('authToken');
    this.store.dispatch(AuthActions.logout());
  }

  isLoggedIn(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated);
  }

  getLoggedInUser(): Observable<{ id: number | null; role: string | null } | null> {
    return this.store.select(selectCurrentUser);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}