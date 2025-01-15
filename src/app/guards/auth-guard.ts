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
<<<<<<< HEAD
<<<<<<< HEAD
      if (!res.data?.Authentication) {
        this.routerService.navigate(['login'])
      }
      return !res.data?.Authentication
=======
      if (res.err) {
        this.routerService.navigate(['login'])
      }
      return !res.err
>>>>>>> f180803 (init)
=======
      if (res.actionResult) {
        this.routerService.navigate(['login'])
      }
      return !res.actionResult
>>>>>>> 9088d33 (	modified:   src/app/components/login/login.component.ts)
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
