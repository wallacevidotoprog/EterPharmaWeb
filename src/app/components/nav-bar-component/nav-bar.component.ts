import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  protected api = inject(LoginService);
<<<<<<< HEAD
  menuActive: boolean = false;

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }

  closeMenu(): void {
    this.menuActive = false;
  }

  logout() {
    this.api.eLogout().subscribe()
=======
  logout() {
    this.api.eLogout().subscribe()
<<<<<<< HEAD

>>>>>>> f180803 (init)
=======
>>>>>>> 9088d33 (	modified:   src/app/components/login/login.component.ts)
  }
}
