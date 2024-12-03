import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-sidebar-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './sidebar-layout.component.html',
  styleUrl: './sidebar-layout.component.scss',
})
export class SidebarLayoutComponent {
  btnExpanded() {
    throw new Error('Method not implemented.');
  }
  protected api = inject(LoginService);
  protected router = inject(Router);
  protected isSubmenuOpen: boolean = false;
  protected isExpanded: boolean = true;

  toggleSubmenu(event: MouseEvent) {
    event.stopPropagation();
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }
  toggleMenu() {
    this.isExpanded = !this.isExpanded; // Alterna o estado de expandido
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.isSubmenuOpen = false;
  }

  logout() {
    this.api.eLogout().subscribe({
      next: (response) => {
        console.log('Logout bem-sucedido:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro ao fazer logout:', error);
      },
    });
  }
}
