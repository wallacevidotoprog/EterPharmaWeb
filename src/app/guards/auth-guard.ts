import { booleanAttribute, inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from '../service/login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
class eAuthGuard {
  private auth = inject(LoginService);
  private routerService = inject(Router);

  handleError(error: HttpErrorResponse) {
    return throwError(() => {console.log(error);
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | any {
    return this.auth
    .eVerifyToken()
    .subscribe((res) => {
      if (res.err) {
        this.routerService.navigate(['login'])
      }
      return !res.err
    },
    (error)=>{


      this.routerService.navigate(['login'])

    });

  }
}
export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(eAuthGuard).canActivate(route, state);
};
