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
  phoneIndex = 0;
  private observer?: IntersectionObserver;
  private carouselTimer?: ReturnType<typeof setInterval>;
  private phoneTimer?: ReturnType<typeof setInterval>;

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

  /** Instagram-style phone posts (10+) — center scrolls like a phone */
  readonly phonePosts = [
    {
      kind: 'growth',
      tag: 'WEB APP',
      title: 'New project created for growth.',
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
      image2:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
      stat: 'Earnings + 90%',
      range: '2025 — 2026'
    },
    {
      kind: 'feature',
      title: 'One more + feature',
      caption: 'This is what happens when your product keeps growing and your interface doesn’t.',
      image:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80'
    },
    {
      kind: 'agency',
      title: 'Design agency for startups and enterprise',
      image:
        'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80'
    },
    {
      kind: 'website',
      title: 'New Website',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
      image2:
        'https://images.unsplash.com/photo-1557683316-973635b84ce9?auto=format&fit=crop&w=900&q=80',
      preview:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80'
    },
    {
      kind: 'growth',
      tag: 'BRAND',
      title: 'Identity that grows with you.',
      image:
        'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=900&q=80',
      image2:
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80',
      stat: 'Reach + 120%',
      range: '2024 — 2026'
    },
    {
      kind: 'feature',
      title: 'Content that lands',
      caption: 'Same story across photo, video and paid — one creative line.',
      image:
        'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80'
    },
    {
      kind: 'agency',
      title: 'Campaigns built to be felt',
      image:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
    },
    {
      kind: 'website',
      title: 'Product launch',
      image:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
      image2:
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=900&q=80',
      preview:
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80'
    },
    {
      kind: 'growth',
      tag: 'VIDEO',
      title: 'Stories that stay on screen.',
      image:
        'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80',
      image2:
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
      stat: 'Watch + 3.2x',
      range: 'Q1 — Q3'
    },
    {
      kind: 'feature',
      title: 'One team. One line.',
      caption: 'Strategy, craft and production under the same roof.',
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80'
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
    this.startPhoneCarousel();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.stopCarousel();
    this.stopPhoneCarousel();
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

  /** Relative slot: -1 left, 0 center, 1 right — advancing moves cards to the right */
  phoneSlot(i: number): -1 | 0 | 1 | null {
    const n = this.phonePosts.length;
    let d = (this.phoneIndex - i) % n;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    if (d === -1 || d === 0 || d === 1) return d as -1 | 0 | 1;
    return null;
  }

  nextPhone(user = false): void {
    this.phoneIndex = (this.phoneIndex + 1) % this.phonePosts.length;
    if (user) this.restartPhoneCarousel();
  }

  prevPhone(): void {
    this.phoneIndex = (this.phoneIndex - 1 + this.phonePosts.length) % this.phonePosts.length;
    this.restartPhoneCarousel();
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

  private startPhoneCarousel(): void {
    this.stopPhoneCarousel();
    this.phoneTimer = setInterval(() => this.nextPhone(), 4200);
  }

  private stopPhoneCarousel(): void {
    if (this.phoneTimer) {
      clearInterval(this.phoneTimer);
      this.phoneTimer = undefined;
    }
  }

  restartPhoneCarousel(): void {
    this.startPhoneCarousel();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
