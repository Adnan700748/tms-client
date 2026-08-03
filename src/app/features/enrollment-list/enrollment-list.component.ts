import { Component, effect, inject, viewChild } from '@angular/core';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';

import { EnrollmentStore } from '../../store/enrollment.store';
import { Enrollment } from '../../models/enrollment.model';

@Component({
  selector: 'tms-enrollment-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './enrollment-list.component.html',
  styleUrl: './enrollment-list.component.scss',
})
export class EnrollmentListComponent {

  // Shared application state
  store = inject(EnrollmentStore);

  // Columns displayed in the Material table
  displayedColumns = [
    'studentName',
    'courseName',
    'status',
    'actions'
  ];

  // Material data source
  dataSource = new MatTableDataSource<Enrollment>();

  // Material paginator
  readonly paginator = viewChild.required(MatPaginator);

  // Material sorter
  readonly sort = viewChild.required(MatSort);

  constructor() {

    // Update the table whenever the store changes
    effect(() => {
      this.dataSource.data = this.store.entities();
    });

    // Connect paginator and sorting once available
    effect(() => {
      this.dataSource.paginator = this.paginator();
      this.dataSource.sort = this.sort();
    });

    // Load enrollments
    this.store.loadEnrollments();

  }

  // Approve an enrollment
  onApprove(id: string) {
    this.store.approveEnrollment(id);
  }

}