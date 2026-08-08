import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuOpen = false;
  scrolled = false;

  readonly links = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Cómo trabajamos', href: '#proceso' },
    { label: 'Portafolio', href: '#portafolio' },
    { label: 'FAQ', href: '#faq' }
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 24;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
