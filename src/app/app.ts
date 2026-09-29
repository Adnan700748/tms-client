import { Component, OnInit, inject } from '@angular/core';
import { EnrollmentStore } from './store/enrollment.store';
import { RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  private store = inject(EnrollmentStore);

  ngOnInit(): void {
    this.store.loadEnrollments();
    this.store.listenForLiveUpdates();
  }
}
