<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { NgToastModule } from 'ng-angular-popup';
=======
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { AlertComponent } from './components/alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgToastModule } from 'ng-angular-popup';
import { StartDeliveryComponent } from './components/pages/start-delivery/start-delivery.component';
import { FinishDeliveryComponent } from './components/pages/finish-delivery/finish-delivery.component';
import { LaunchOrderComponent } from './components/pages/launch-order/launch-order.component';
>>>>>>> f180803 (init)

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
<<<<<<< HEAD
    MatDialogModule,

=======
    LoginComponent,
    HomepageComponent,
    PageNotFoundComponentComponent,
    AlertComponent,
    MatDialogModule,
    LoginComponent,
    StartDeliveryComponent,
    FinishDeliveryComponent,
    LaunchOrderComponent
>>>>>>> f180803 (init)
  ],
})
export class AppComponent {
  title = 'ANGULAR-Monitoramento-MotoEntregado';
}
