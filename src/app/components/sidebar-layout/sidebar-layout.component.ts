import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar-layout',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-layout.component.html',
  styleUrl: './sidebar-layout.component.css',
})
export class SidebarLayoutComponent {
  @ViewChild('menuBar') menuBar!: ElementRef;

  constructor(private renderer: Renderer2) {}

  toggleMenu() {
    const menuElement = this.menuBar.nativeElement;
    if (menuElement.classList.contains('open')) {
      this.renderer.removeClass(menuElement, 'open');
    } else {
      this.renderer.addClass(menuElement, 'open');
    }
  }
}
