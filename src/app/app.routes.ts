import { Routes } from '@angular/router';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SidebarLayoutComponent } from './components/pages/sidebar-layout/sidebar-layout.component';
import { ReportComponent } from './components/report/report.component';
import { ServicesComponent } from './components/services/services.component';
import { AuthGuard } from './guards/auth-guard';
import { DeliveryComponent } from './components/pages/delivery/delivery.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'login' },
  {
    path: '',
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
    ],
  },
  { path: '**', component: PageNotFoundComponentComponent },
];
