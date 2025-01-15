import { Routes } from '@angular/router';
<<<<<<< HEAD
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SidebarLayoutComponent } from './components/pages/sidebar-layout/sidebar-layout.component';
import { ReportComponent } from './components/report/report.component';
import { ServicesComponent } from './components/services/services.component';
import { AuthGuard } from './guards/auth-guard';
import { DeliveryComponent } from './components/pages/delivery/delivery.component';
=======

import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { AuthGuard } from './guards/auth-guard';
import { ServicesComponent } from './components/services/services.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { ReportComponent } from './components/report/report.component';
import { StartDeliveryComponent } from './components/pages/start-delivery/start-delivery.component';
import { LaunchOrderComponent } from './components/pages/launch-order/launch-order.component';
import { FinishDeliveryComponent } from './components/pages/finish-delivery/finish-delivery.component';
>>>>>>> f180803 (init)

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'login' },
  {
    path: '',
<<<<<<< HEAD
    component: SidebarLayoutComponent,
    title: 'Home Page',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'delivery',
        component: DeliveryComponent,
        title: 'ENTREGAS',
        canActivate: [AuthGuard],
      },
      {
        path: 'services',
        component: ServicesComponent,
        title: 'Entraga',
        canActivate: [AuthGuard],
=======
    component: HomepageComponent,
    title: 'Home Page',
    //canActivate: [AuthGuard] ,
    children: [
      {
        path: 'services',
        component: ServicesComponent,
        title: 'Entraga'
>>>>>>> f180803 (init)
      },
      {
        path: 'maintenance',
        component: MaintenanceComponent,
<<<<<<< HEAD
        title: 'Manutenção',
        canActivate: [AuthGuard],
=======
        title: 'Manutenção'
>>>>>>> f180803 (init)
      },
      {
        path: 'report',
        component: ReportComponent,
<<<<<<< HEAD
        title: 'Relatórios',
        canActivate: [AuthGuard],
=======
        title: 'Relatórios'
      },
      {
        path: 'start-delivery',
        component: StartDeliveryComponent,
        title: 'Relatórios'
      },
      {
        path: 'launch-order',
        component: LaunchOrderComponent,
        title: 'Relatórios'
      },
      {
        path: 'finish-delivery',
        component: FinishDeliveryComponent,
        title: 'Relatórios'
>>>>>>> f180803 (init)
      },
    ],
  },
  { path: '**', component: PageNotFoundComponentComponent },
];
