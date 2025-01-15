import { MaintenanceService } from './../../service/maintenance.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { InputGenericComponent } from '../inputs/input-generic/input-generic.component';
import { InputButtonGenericComponent } from '../inputs/input-button-generic/input-button-generic.component';
import { InputDropdownGenericComponent } from '../inputs/input-dropdown-generic/input-dropdown-generic.component';
import { IndexersService } from '../../service/indexers.service';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    InputGenericComponent,
    InputButtonGenericComponent,
    InputDropdownGenericComponent,
  ],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.css',
})
export class MaintenanceComponent implements OnInit {
  private alerts = inject(NgToastService);
  protected maintenanceService = inject(MaintenanceService);
  protected indrs = inject(IndexersService);
  protected dataDP!: never[];
  protected load = false;
  protected isDate!: string;

  ngOnInit(): void {
    this.isDate = this.indrs.getDateNow();
    this.maintenanceService.getDropDown().subscribe(
      (data) => {
        this.dataDP = data.data;
      },
      (_err) => {}
    ); 
  }
  maintenance = new FormGroup({
    date: new FormControl('', Validators.required),
    plate: new FormControl('', Validators.required),
    km: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    obs: new FormControl('', Validators.required),
  });
  send(): void {
    if (!this.maintenance.valid) {
      this.alerts.error({
        detail: 'ERRO',
        summary: 'Faltou preencher algo.',
        duration: 5000,
      });
      return;
    }
    this.load = true;

    this.maintenanceService
      .add({
        date: this.maintenance.value.date,
        km: this.maintenance.value.km,
        value: this.maintenance.value.value,
        type: this.maintenance.value.type,
        plate: this.maintenance.value.plate,
        obs: this.maintenance.value.obs,
      })
      .subscribe(
        (res) => {
          this.load = false;
          this.maintenance.reset();
          this.isDate = this.indrs.getDateNow();
          this.alerts.success({
            detail: 'Sucesso',
            summary: 'Registro cadastrado com sucesso.',
            duration: 5000,
          });
        },
        (err) => {
          this.load = false;
          this.alerts.error({
            detail: 'Erro ',
            summary: JSON.stringify(err),
            duration: 5000,
          });
        }
      );
  }
}
