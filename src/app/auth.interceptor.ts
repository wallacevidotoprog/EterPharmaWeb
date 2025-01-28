import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthGuard } from './guards/auth-guard';

Injectable();
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const navigationService = inject(NavigationService);

        navigationService.redirectToLogin(req.url); // Redireciona usando o serviço
      }
      return throwError(() => error);
    })
  );
};

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  redirectToLogin(returnUrl: string): void {
    // Aqui você pode simular o comportamento do guard ao chamar o método do guard
    if (!AuthGuard) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl },
      });
    }
  }
}
