import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // Extract C# RFC 7807 ProblemDetails detail property
      const detailMessage = err.error?.detail ?? 
                           err.error?.title ?? 
                           'A system error occurred. Please try again.';
      
      if (err.status === 401) {
        // Redirect expired or unauthenticated sessions back to login
        console.warn('Session expired - redirecting to login');
        router.navigate(['/login']);
      } else if (err.status === 409) {
        // Conflict - used for optimistic rollback
        console.warn('Conflict detected:', detailMessage);
      } else {
        // Surface structured error to developer console
        console.error('API Error Response:', {
          status: err.status,
          message: detailMessage,
          error: err.error
        });
      }
      
      // Re-throw the error so components can handle it
      return throwError(() => err);
    })
  );
};