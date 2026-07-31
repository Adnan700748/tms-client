import { Component, inject, OnInit } from '@angular/core';
import { EnrollmentStore } from '../../store/enrollment.store';

@Component({
  selector: 'tms-enrollment-list',
  standalone: true,
  templateUrl: './enrollment-list.component.html',
  styleUrl: './enrollment-list.component.scss',
})
export class EnrollmentListComponent implements OnInit {

  // Inject the centralized EnrollmentStore.
  // Every component using this store shares the same data.
  store = inject(EnrollmentStore);

  // Load enrollments when the component is created.
  ngOnInit(): void {
    this.store.loadEnrollments();
  }

  // Approve an enrollment through the store.
  onApprove(id: string): void {
    this.store.approveEnrollment(id);
  }
}