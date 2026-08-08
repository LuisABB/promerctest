import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-version1',
  standalone: true,
  templateUrl: './version1.component.html',
  styleUrl: './version1.component.scss'
})
export class Version1Component implements AfterViewInit, OnDestroy {
  @ViewChild('page', { static: true }) pageRef!: ElementRef<HTMLElement>;

  readonly whatsapp =
    'https://wa.me/525636352382?text=Hola%20Meibe%2C%20quiero%20hablar%20sobre%20un%20proyecto.';

  menuOpen = false;
  scrolled = false;
  private observer?: IntersectionObserver;

  readonly nav = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  readonly strip = [
    {
      src: 'https://assets.mixkit.co/videos/preview/mixkit-woman-turning-her-head-away-from-camera-32808-large.mp4',
      poster: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=70'
    },
    {
      src: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smart-watch-4288-large.mp4',
      poster: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=70'
    },
    {
      src: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-woman-eye-looking-at-the-camera-39880-large.mp4',
      poster: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=70'
    },
    {
      src: 'https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-man-walking-on-stairs-40887-large.mp4',
      poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=70'
    }
  ];

  readonly services = [
    { n: '01', title: 'Strategy', text: 'El porqué, el para quién y el resultado. Primero pensamos.' },
    { n: '02', title: 'Brand & Content', text: 'Identidad, mensaje y piezas que se sienten en cada canal.' },
    { n: '03', title: 'Audiovisual', text: 'Video, foto, audio y postproducción bajo la misma línea.' },
    { n: '04', title: 'Growth', text: 'Paid media y medición: alcance, percepción y conversión.' }
  ];

  readonly values = [
    { tag: '+ Craft', text: 'Pensamos como cineastas: ritmo, narrativa y emoción. Descartamos el exceso para ganar claridad.' },
    { tag: '+ Precision', text: 'Workflow profesional. Creatividad como ciencia aplicada para resolver problemas reales.' },
    { tag: '+ Partners', text: 'Nos involucramos en el crecimiento de la marca, no solo en entregar archivos.' }
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 24;
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
          }
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    this.pageRef.nativeElement
      .querySelectorAll('[data-reveal]')
      .forEach((el) => this.observer?.observe(el));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
