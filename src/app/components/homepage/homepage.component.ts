import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AlertService } from '../alert/alert.service';
import { NavBarComponent } from '../nav-bar-component/nav-bar.component';
import { SidebarLayoutComponent } from '../pages/sidebar-layout/sidebar-layout.component';
import { ServicesComponent } from '../services/services.component';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavBarComponent,
    ServicesComponent,
    RouterOutlet,
    SidebarLayoutComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  private tAlerts = inject(NgToastService);
  private dialogAlert = inject(AlertService);
}
