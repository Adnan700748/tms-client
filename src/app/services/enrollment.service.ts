import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';

// @Service() means Angular creates one instance of this service
// and shares it across the entire app. This is similar to AddSingleton<T>() in .NET.
@Service()
export class EnrollmentService {

  // inject(HttpClient) requests Angular's HTTP client
  private http = inject(HttpClient);

  private baseUrl = "http://localhost:5187/api/v2/enrollments";

  getAll(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.baseUrl);
  }

  approve(id: string): Observable<void> {
  return this.http.post<void>(`${this.baseUrl}/${id}/approve`, {});
  }

  reject(id: string): Observable<void> {
  return this.http.post<void>(`${this.baseUrl}/${id}/reject`, {});
}

}