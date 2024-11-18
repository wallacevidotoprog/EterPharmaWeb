import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavBarComponent } from '../nav-bar-component/nav-bar.component';
import { ServicesComponent } from '../services/services.component';
import { StateAlert } from '../alert/alert.component';
import { AlertService } from '../alert/alert.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavBarComponent, ServicesComponent, RouterOutlet],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  private tAlerts = inject(NgToastService);
  private dialogAlert = inject(AlertService);
  
}
