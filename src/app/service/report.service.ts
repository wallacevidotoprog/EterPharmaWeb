import { IRespAPI } from './indexers.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  protected api = inject(HttpClient);
  constructor() {}

  public getAll(): Observable<IRespAPI> {
    return this.api.get<IRespAPI>(`${environment.API}api/delivery/getAll`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  }
}
