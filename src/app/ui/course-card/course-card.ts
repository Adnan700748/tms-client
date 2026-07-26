import { Component, input, output } from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'tms-course-card',
  standalone: true,
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss'
})
export class CourseCardComponent {

  // Required input from the parent
  course = input.required<Course>();

  // Event emitted back to the parent
  enrollClicked = output<Course>();

}