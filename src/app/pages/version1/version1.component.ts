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
  carouselIndex = 0;
  private observer?: IntersectionObserver;
  private carouselTimer?: ReturnType<typeof setInterval>;

  readonly nav = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  /** Portrait carousel — 12 images (4 from client strip + editorial portraits) */
  readonly carousel = [
    { src: '/carousel/p1.jpg', alt: 'Portrait studio lighting' },
    { src: '/carousel/p2.jpg', alt: 'Creative in workshop' },
    { src: '/carousel/p3.jpg', alt: 'Joyful urban portrait' },
    { src: '/carousel/p4.jpg', alt: 'Clean professional portrait' },
    {
      src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
      alt: 'Editorial close-up'
    },
    {
      src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80',
      alt: 'Street style portrait'
    },
    {
      src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
      alt: 'Fashion portrait'
    },
    {
      src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80',
      alt: 'Natural light portrait'
    },
    {
      src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=900&q=80',
      alt: 'Soft portrait'
    },
    {
      src: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=900&q=80',
      alt: 'Studio male portrait'
    },
    {
      src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
      alt: 'Warm tone portrait'
    },
    {
      src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
      alt: 'Classic portrait'
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

    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.stopCarousel();
  }

  get carouselMax(): number {
    return Math.max(0, this.carousel.length - 1);
  }

  nextSlide(user = false): void {
    this.carouselIndex = this.carouselIndex >= this.carouselMax ? 0 : this.carouselIndex + 1;
    if (user) this.restartCarousel();
  }

  prevSlide(): void {
    this.carouselIndex = this.carouselIndex <= 0 ? this.carouselMax : this.carouselIndex - 1;
    this.restartCarousel();
  }

  goToSlide(i: number): void {
    this.carouselIndex = i;
    this.restartCarousel();
  }

  private startCarousel(): void {
    this.stopCarousel();
    this.carouselTimer = setInterval(() => this.nextSlide(), 3500);
  }

  private stopCarousel(): void {
    if (this.carouselTimer) {
      clearInterval(this.carouselTimer);
      this.carouselTimer = undefined;
    }
  }

  restartCarousel(): void {
    this.startCarousel();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
