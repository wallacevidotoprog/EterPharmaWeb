import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../../service/login.service';
import { LoadingModalComponent } from '../../modal/loading-modal/loading-modal.component';
import { GlobalLoaderService } from '../../../service/loading.service';
import { MapComponent } from "../../maps/maps.component";
@Component({
  selector: 'app-sidebar-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MapComponent
],
  templateUrl: './sidebar-layout.component.html',
  styleUrl: './sidebar-layout.component.scss',
})
export class SidebarLayoutComponent implements OnInit {
  protected loaderService!: GlobalLoaderService;
  constructor() {
    this.loaderService = inject(GlobalLoaderService); // Usando 'inject' no construtor
  }
  carregar() {
    console.log('carregar');

    this.loaderService.show();

    setTimeout(() => {
      this.loaderService.hide();
    }, 3000);
  }
  isMenuOpened = false;
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  closeMenu() {
    this.isMenuOpened = false;
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
