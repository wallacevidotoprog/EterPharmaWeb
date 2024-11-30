import {
  Component,
  Renderer2,
  ElementRef,
  ViewChild,
  inject,} from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive  } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-sidebar-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './sidebar-layout.component.html',
  styleUrl: './sidebar-layout.component.css',
})
export class SidebarLayoutComponent {
  protected api = inject(LoginService);
  logout() {
    this.api.eLogout();
  }
}
