import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>403 - Unauthorized</h1>
    <p>You do not have permission to access this page.</p>

    <a routerLink="/dashboard">Back to Dashboard</a>
  `
})
export class UnauthorizedComponent {}