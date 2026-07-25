import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardComponent {

  // signal('Liya Kebede') creates a reactive variable. Angular watches it.
  // When its value changes, Angular automatically updates the part of the screen that displays it.
  // Reactive state
  studentName = signal('Liya Kebede');

  earnedCredits = signal(45);

  // computed() creates a read-only signal that derives its value from other signals.
  // It recalculates automatically whenever earnedCredits() changes no manual refresh.
  // Derived state
  graduationStatus = computed(() =>
    this.earnedCredits() >= 120
      ? 'Eligible for Graduation'
      : 'In Progress'
  );

// A regular method. When called, it updates the earnedCredits signal.
// The .update() method receives the current value (c) and returns the new value (c + 3).
  // Action
  registerForClass(): void {
    this.earnedCredits.update(c => c + 3);
  }
}