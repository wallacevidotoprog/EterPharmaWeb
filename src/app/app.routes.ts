import { Routes } from '@angular/router';

import { LoginComponent } from './components/pages/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { AuthGuard } from './guards/auth-guard';
import { ServicesComponent } from './components/services/services.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { ReportComponent } from './components/report/report.component';
import { StartDeliveryComponent } from './components/pages/start-delivery/start-delivery.component';
import { LaunchOrderComponent } from './components/pages/launch-order/launch-order.component';
import { FinishDeliveryComponent } from './components/pages/finish-delivery/finish-delivery.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'login' },
  {
    path: '',
    component: HomepageComponent,
    title: 'Home Page',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'services',
        component: ServicesComponent,
        title: 'Entraga',
        canActivate: [AuthGuard],
      },
      {
        path: 'maintenance',
        component: MaintenanceComponent,
        title: 'Manutenção',
        canActivate: [AuthGuard],
      },
      {
        path: 'report',
        component: ReportComponent,
        title: 'Relatórios',
        canActivate: [AuthGuard],
      },
      {
        path: 'start-delivery',
        component: StartDeliveryComponent,
        title: 'Relatórios',
        canActivate: [AuthGuard],
      },
      {
        path: 'launch-order',
        component: LaunchOrderComponent,
        title: 'Relatórios',
        canActivate: [AuthGuard],
      },
      {
        path: 'finish-delivery',
        component: FinishDeliveryComponent,
        title: 'Relatórios',
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', component: PageNotFoundComponentComponent },
];
