import { Component, computed, input } from '@angular/core';
import { Enrollment } from '../../models/enrollment.model';

@Component({
  selector: 'tms-analytics-chart',
  standalone: true,
  templateUrl: './analytics-chart.component.html',
  styleUrl: './analytics-chart.component.scss',
})
export class AnalyticsChartComponent {

  // Receives enrollment data from the parent component
  data = input.required<Enrollment[]>();

  // Calculates the height of the Approved bar
  approvedHeight = computed(() => {
    const count = this.data().filter(
      enrollment => enrollment.status === 'Approved'
    ).length;

    return Math.max(20, count * 3);
  });

  // Calculates the height of the Pending bar
  pendingHeight = computed(() => {
    const count = this.data().filter(
      enrollment => enrollment.status === 'Pending'
    ).length;

    return Math.max(20, count * 3);
  });

  // Calculates the height of the Rejected bar
  rejectedHeight = computed(() => {
    const count = this.data().filter(
      enrollment => enrollment.status === 'Rejected'
    ).length;

    return Math.max(20, count * 3);
  });

}