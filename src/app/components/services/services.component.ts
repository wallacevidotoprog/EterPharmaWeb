import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DeliveryService } from '../../service/delivery.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { InputGenericComponent } from '../inputs/input-generic/input-generic.component';
import { InputButtonGenericComponent } from '../inputs/input-button-generic/input-button-generic.component';
import { IndexersService } from '../../service/indexers.service';
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    InputGenericComponent,
    InputButtonGenericComponent,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements OnInit {
  protected alerts = inject(NgToastService);
  protected apiDelivery = inject(DeliveryService);
  protected isDate!:string;
  protected loading: boolean = false;
  protected indrs = inject(IndexersService);

  ngOnInit(): void {
    this.isDate = this.indrs.getDateNow();
  }
  deliveryForm = new FormGroup({
    date: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
    km: new FormControl('', Validators.required),
    router: new FormControl('', Validators.required),
    isDerivery: new FormControl('', Validators.required),
  });

  send(): void {
    if (!this.deliveryForm.valid) {
      this.alerts.error({
        detail: 'ERRO',
        summary: 'Faltou preencher algo.',
        duration: 5000,
      });
      return;
    }
    this.loading = true;

    this.apiDelivery.add({date:this.deliveryForm.value.date,
      km:this.deliveryForm.value.km,
      value:this.deliveryForm.value.value,
      router:this.deliveryForm.value.router,
      isRate: this.deliveryForm.value.isDerivery =='isRate' ? true:false,
      isIfood:this.deliveryForm.value.isDerivery =='isIfood' ? true:false,
      isManipulation:this.deliveryForm.value.isDerivery =='isManipulation' ? true:false,
    }).subscribe(
      (res) => {
        this.loading = false;
        this.deliveryForm.reset();
        this.isDate = this.indrs.getDateNow();
        this.alerts.success({
          detail: 'Sucesso',
          summary: 'Registro cadastrado com sucesso.',
          duration: 5000,
        });
      },
      (error) => {
        this.loading = false;
        this.alerts.error({
          detail: 'Erro ',
          summary: JSON.stringify(error),
          duration: 5000,
        });
      }
    );
  }
}
