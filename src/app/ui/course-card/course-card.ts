import { Component, input, output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Course } from '../../models/course.model';

@Component({
  selector: 'tms-course-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-card.html',
  styleUrl: './course-card.scss'
})
export class CourseCardComponent {

  // Required input from the parent
  course = input.required<Course>();

  // Event emitted back to the parent
  enrollClicked = output<Course>();

}