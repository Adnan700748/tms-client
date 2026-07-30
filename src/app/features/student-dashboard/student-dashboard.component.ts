import {Component, computed, inject, signal,} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { CourseCardComponent } from '../../ui/course-card/course-card';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { RouterLink } from '@angular/router';
import { EnrollmentListComponent } from '../../features/enrollment-list/enrollment-list.component';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CourseCardComponent, RouterLink, EnrollmentListComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardComponent {

  // Requests the CourseService using Angular dependency injection.
  private api = inject(CourseService);

  // Reactive signal that stores the student's name.
  studentName = signal('Liya Kebede');

  // Reactive signal that stores earned credits.
  earnedCredits = signal(45);

  // Computes graduation status whenever earnedCredits changes.
  graduationStatus = computed(() =>
    this.earnedCredits() >= 120
      ? 'Eligible for Graduation'
      : 'In Progress'
  );

  // Stores the last course the student selected for enrollment.
  selectedCourse = signal<Course | null>(null);

  // Loads courses from the ASP.NET Core API.
  // rxResource automatically manages subscriptions and cleanup.
  coursesResource = rxResource({
    stream: () => this.api.getAll(),
  });

  // Adds three credits to simulate registering for a class.
  registerForClass() {
    this.earnedCredits.update((credits) => credits + 3);
  }

  // Stores the selected course and logs it.
  handleEnroll(course: Course) {
    this.selectedCourse.set(course);

    console.log('Enrollment requested for:', course.title);
  }
}