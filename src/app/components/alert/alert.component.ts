import { Component, Inject, inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataAlert
  ) {}

  //@Optional() dialogRef = inject(MatDialogRef<AlertComponent>)
  //constructor(public dialogRef:MatDialogRef<AlertComponent>){}
  //@Inject(MAT_DIALOG_DATA) public  data: DialogData;

  ngOnInit(): void {
    setTimeout(() => {
      this.onClose();
    }, 5000);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

export enum StateAlert {
  info,
  success,
  warning,
  danger,
}

export interface DataAlert {
  message: string;
  typeAlert: string;
}
