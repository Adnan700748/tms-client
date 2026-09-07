import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  async login(): Promise<void> {
    this.errorMessage = '';
    this.loading = true;

    try {
      await this.auth.login({
        email: this.email,
        password: this.password
      });

      const user = this.auth.currentUser();

      if (user?.role === 'Admin') {
        await this.router.navigate(['/admin/courses']);
      } else if (user?.role === 'Instructor') {
        await this.router.navigate(['/grade-submission']);
      } else {
        await this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.error('Login failed:', error);
      this.errorMessage = 'Invalid email or password.';
    } finally {
      this.loading = false;
    }
  }
}

