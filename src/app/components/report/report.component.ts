import { IDeliveryDataRes } from './../../service/indexers.service';
import { InputGenericComponent } from './../inputs/input-generic/input-generic.component';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputButtonGenericComponent } from '../inputs/input-button-generic/input-button-generic.component';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../service/report.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    FormsModule,
    InputGenericComponent,
    InputButtonGenericComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent {
  protected loading = false;
  protected apiService = inject(ReportService);
  protected data!:IDeliveryDataRes[];

  protected report = new FormGroup({
    de: new FormControl('', Validators.required),
    ate: new FormControl('', Validators.required),
  });
  protected onSeach(): void {
    this.loading = true;
    this.apiService.getAll().subscribe(
      (res) => {
        //Forma 1
        console.table(res.data);

        this.data = [...res.data]
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }
}
