import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent, StateAlert } from './alert.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  dialog = inject(MatDialog);

  OpenAlert(msg: string, sAlert: StateAlert) {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: {  message:msg , typeAlert: StateAlert[sAlert] },
    });
    dialogRef.afterClosed().subscribe((ref) => {
      console.log('alertClose');
    });
  }
}
