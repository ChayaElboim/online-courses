import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { Course } from '../models/course.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    const token = localStorage.getItem('authToken');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<Course[]>(this.apiUrl, { headers });
    } else {
      // אם אין טוקן, תחזיר Observable שזורק שגיאה או ערך ריק, בהתאם לצורך שלך
      console.error('No token found in localStorage');
      return of([]); // או throwError(() => new Error('No token provided'));
    }
  }

  // פונקציות נוספות יכולות להשתמש באופרטורים מתקדמים מ-RxJS אם יש צורך
}