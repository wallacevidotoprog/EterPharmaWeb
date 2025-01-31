import { Routes } from '@angular/router';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { ModalDelivaryComponent } from './components/modal/modal-delivery/modal-delivary.component';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import {  DeliveryStoreComponent,
} from './components/pages/delivery-store/delivery-store.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SidebarLayoutComponent } from './components/pages/sidebar-layout/sidebar-layout.component';
import { ReportComponent } from './components/report/report.component';
import { ServicesComponent } from './components/services/services.component';
import { AuthGuard } from './guards/auth-guard';
import { DeliveryComponent } from './components/pages/delivery/delivery.component';
import { DeliveryReportComponent } from './components/pages/delivery-report/delivery-report.component';
import { ModalViewDeliveryComponent } from './components/modal/modal-view-delivery/modal-view-delivery/modal-view-delivery.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'LOGIN' },
  {
    path: '',
    component: SidebarLayoutComponent,
    title: 'Home Page',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'delivery-store',
        component: DeliveryStoreComponent,
        title: 'ENTREGAS',
        canActivate: [AuthGuard],
      },
      {
        path: 'delivery',
        component: DeliveryComponent,
        title: 'ENTREGAS',
        canActivate: [AuthGuard],
      },
      {
        path: 'delivery-report',
        component: DeliveryReportComponent,
        title: 'RELATÓRIO DE ENTREGA',
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
        path: 'testes',
        component: ModalViewDeliveryComponent,
        title: 'testes',
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', component: PageNotFoundComponentComponent },
];
