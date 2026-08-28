import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

interface Course {
  id: number;
  code: string;
  title: string;
}

@Component({
  selector: 'app-admin-course-list',
  standalone: true,
  templateUrl: './admin-course-list.component.html'
})
export class AdminCourseListComponent {

  auth = inject(AuthService);

  courses: Course[] = [
    {
      id: 1,
      code: 'DB-401',
      title: 'Database Internals'
    },
    {
      id: 2,
      code: 'CS-301',
      title: 'Software Engineering'
    }
  ];

  deleteCourse(id: number): void {
    this.courses = this.courses.filter(course => course.id !== id);

    console.log(`Course ${id} deleted`);
  }
}