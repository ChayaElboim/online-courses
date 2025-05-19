import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // נתיב לשירות האוטנטיקציה
import { User } from '../../models/user.model'; // נתיב למודל המשתמש
import { AuthResponse } from '../../models/auth-response'; // ייבוא ה-AuthResponse
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions'; 
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // אופציונלי: בדיקה אם משתמש כבר מחובר
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/courses']);
      }
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login({ email, password }).subscribe(
        (response: AuthResponse) => {
          console.log('Login successful:', response);
          if (response && response.token) { // <-- בדיקה
            localStorage.setItem('authToken', response.token);
            this.store.dispatch(AuthActions.loginSuccess({ user: { id: response.userId, role: response.role } }));
            this.router.navigate(['/courses']);
          } else {
            this.errorMessage = 'שגיאה לא צפויה בהתחברות.';
          }
        },
        (error) => {
          this.errorMessage = 'שגיאה בהתחברות. אנא נסה שוב.';
        }
      );
    }
  }

  register(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response: AuthResponse) => {
          console.log('Registration successful:', response);
          if (response && response.token) { // <-- בדיקה
            localStorage.setItem('authToken', response.token);
            this.store.dispatch(AuthActions.registerSuccess({ user: { id: response.userId, role: response.role } }));
            this.router.navigate(['/courses']);
          } else {
            this.errorMessage = 'שגיאה לא צפויה בהרשמה.';
          }
        },
        (error) => {
          this.errorMessage = 'שגיאה בהרשמה. אנא נסה שוב.';
        }
      );
    }
  }
}