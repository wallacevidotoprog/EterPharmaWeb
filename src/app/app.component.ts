import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HomepageComponent } from './components/homepage/homepage.component';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { AlertComponent } from './components/alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgToastModule } from 'ng-angular-popup';
import { StartDeliveryComponent } from './components/pages/start-delivery/start-delivery.component';
import { FinishDeliveryComponent } from './components/pages/finish-delivery/finish-delivery.component';
import { LaunchOrderComponent } from './components/pages/launch-order/launch-order.component';
import { LoginComponent } from './components/pages/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    NgToastModule,
    HttpClientModule,
    CommonModule,
    RouterOutlet,
    LoginComponent,
    HomepageComponent,
    PageNotFoundComponentComponent,
    AlertComponent,
    MatDialogModule,
    StartDeliveryComponent,
    FinishDeliveryComponent,
    LaunchOrderComponent,
  ],
})
export class AppComponent {
  title = 'ANGULAR-Monitoramento-MotoEntregado';
}
