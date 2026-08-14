import { Component, OnInit, inject } from '@angular/core';
import { EnrollmentStore } from './store/enrollment.store';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {
  private store = inject(EnrollmentStore);

  ngOnInit(): void {
    this.store.loadEnrollments();
    this.store.listenForLiveUpdates();
  }
}