import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-version3',
  standalone: true,
  templateUrl: './version3.component.html',
  styleUrl: './version3.component.scss'
})
export class Version3Component {
  readonly whatsapp =
    'https://wa.me/525636352382?text=Hola%20Meibe%2C%20quiero%20hablar%20sobre%20un%20proyecto.';

  menuOpen = false;
  scrolled = false;

  readonly nav = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' }
  ];

  readonly services = [
    'Marketing & Strategy',
    'Branding & Brand Architecture',
    'Digital Strategy & Social Media',
    'Content Design & UGC',
    'Paid Media · Meta / TikTok Ads',
    'Web Design',
    'Video · Photo · Drone · Animation',
    'Audio · Podcast · Dubbing · Mastering'
  ];

  readonly benefits = [
    {
      n: '01',
      title: 'Strategy first.',
      text: 'Empezamos por el porqué, el para quién y el resultado que queremos provocar.'
    },
    {
      n: '02',
      title: 'Craft.',
      text: 'Pensamos como cineastas: ritmo, narrativa, composición y emoción en cada pieza.'
    },
    {
      n: '03',
      title: 'Measure what matters.',
      text: 'Alcance, percepción y conversión. Los resultados mandan sobre lo bonito.'
    },
    {
      n: '04',
      title: 'Partners, not vendors.',
      text: 'Nos involucramos en el crecimiento de la marca, no solo en entregar archivos.'
    }
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 20;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
