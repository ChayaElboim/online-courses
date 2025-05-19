import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './components/courses/courses-list/courses-list.component'; // ייתכן שהנתיב שלך שונה
import { AuthComponent } from './components/auth/auth.component'; // נוסיף ייבוא עבור AuthComponent

const routes: Routes = [
  { path: '', component: AuthComponent }, // נתיב השורש יוביל ל-AuthComponent
  { path: 'login', component: AuthComponent }, // נתיב /login יוביל גם הוא ל-AuthComponent
  { path: 'courses', component: CoursesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }