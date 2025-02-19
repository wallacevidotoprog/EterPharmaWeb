import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { environment } from '../../environments/environment';
import { IRespAPI, IUsers } from './indexers.service';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private api = inject(HttpClient);

  getUsersAll(): Observable<{ users: IUsers[]; useractive: any }> {
    return this.api
      .get<IRespAPI<{ users: IUsers[]; useractive: any }>>(
        `${environment.API}api/users-default`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .pipe(
        map((resp) => ({
          users: resp.data?.users ?? [],
          useractive: resp.data?.useractive ?? null,
        }))
      );
  }

}
