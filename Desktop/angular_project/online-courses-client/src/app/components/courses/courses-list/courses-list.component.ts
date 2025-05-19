import { Component, OnInit, inject, signal } from '@angular/core';
import { CoursesService } from '../../../services/courses.service'; // תיקון נתיב
import { Course } from '../../../models/course.model'; // תיקון נתיב
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CoursesListComponent implements OnInit {
  private coursesService = inject(CoursesService);
  courses = signal<Course[]>([]);
  errorMessage = signal<string | null>(null);
  loading = signal(true);

  constructor() { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesService.getCourses().pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorMessage.set('Failed to load courses.');
        console.error('Error loading courses:', error);
        this.loading.set(false);
        return of([]);
      })
    ).subscribe((courses: Course[]) => {
      this.courses.set(courses);
      this.loading.set(false);
      console.log('Courses loaded:', courses);
    });
  }
}