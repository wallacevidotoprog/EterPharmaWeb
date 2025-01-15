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

  getUsersAll(): Observable<IUsers[]> {
    return this.api
      .get<IRespAPI<IUsers[]>>(`${environment.API}api/users`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .pipe(map((resp: IRespAPI<IUsers[]>) => resp.data ?? []));
  }
}
