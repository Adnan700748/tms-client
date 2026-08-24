import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface TmsUser {
  displayName: string;
  role: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

@Service()
export class AuthService {
  private http = inject(HttpClient);

  currentUser = signal<TmsUser | null>(null);

  hasRole(role: string): boolean {
    const user = this.currentUser();

    return user?.role === role || user?.role === 'Admin';
  }

  async login(credentials: LoginRequest): Promise<void> {
    // The server sets the HttpOnly authentication cookie.
    // JavaScript never receives or stores the raw token.
    await firstValueFrom(
      this.http.post<void>('/api/auth/login', credentials)
    );

    // The browser automatically sends the HttpOnly cookie.
    const user = await firstValueFrom(
      this.http.get<TmsUser>('/api/auth/me')
    );

    this.currentUser.set(user);
  }
}