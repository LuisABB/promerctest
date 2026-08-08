import { Component } from '@angular/core';
import { V3ThreeSceneComponent } from '../../components/v3-three-scene/v3-three-scene.component';

@Component({
  selector: 'app-version3',
  standalone: true,
  imports: [V3ThreeSceneComponent],
  templateUrl: './version3.component.html',
  styleUrl: './version3.component.scss'
})
export class Version3Component {
  readonly whatsapp = 'https://wa.me/525636352382';
  menuOpen = false;
  openFaq = -1;

  readonly nav = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Cómo trabajamos', href: '#proceso' },
    { label: 'Casos', href: '#casos' },
    { label: 'Portafolio', href: '#portafolio' },
    { label: 'FAQ', href: '#faq' }
  ];

  readonly marquee = [
    'Think big',
    'Built for results',
    'Make it Meibe',
    'No fluff, just performance',
    'We think it, create it, produce it',
    'Rooted in Mexico, thinking globally'
  ];

  readonly solutionCards = [
    {
      icon: '◎',
      title: 'Estrategia',
      text: 'El porqué, el para quién y el qué. Primero pensamos, luego diseñamos.'
    },
    {
      icon: '✦',
      title: 'Creatividad',
      text: 'Craft de cineastas: ritmo, narrativa y emoción en cada pieza.'
    },
    {
      icon: '▦',
      title: 'Producción',
      text: 'Video, foto, animación y audio de principio a fin, dentro de casa.'
    },
    {
      icon: '↗',
      title: 'Resultados',
      text: 'Alcance, percepción y conversión. Medimos lo que importa.'
    }
  ];

  readonly agencyTags = [
    'Branding y arquitectura de marca',
    'Estrategia digital',
    'Manejo de redes sociales',
    'Diseño de contenido',
    'UGC & talent management',
    'Paid media — Meta / TikTok Ads / Google',
    'Analytics',
    'Diseño web',
    'Ilustración & animación'
  ];

  readonly productionTags = [
    'Video & foto de contenido',
    'Producción con dron',
    'Postproducción y edición de audio y video',
    'Cobertura de eventos sociales',
    'Grabación de audio',
    'Producción de podcast',
    'Doblaje, mezcla & mastering'
  ];

  readonly process = [
    {
      n: '01',
      title: 'Estrategia primero',
      text: 'Nunca empezamos por el diseño. Empezamos por el porqué, el para quién y el qué se quiere lograr.'
    },
    {
      n: '02',
      title: 'Craft',
      text: 'Pensamos como cineastas. Ritmo, narrativa y emoción en cada pieza que sale del estudio.'
    },
    {
      n: '03',
      title: 'Medimos lo que importa',
      text: 'Los resultados mandan sobre lo bonito. Alcance, percepción y conversión.'
    },
    {
      n: '04',
      title: 'Socios, no proveedores',
      text: 'Nos involucramos en el crecimiento de tu marca, no solo en la entrega.'
    }
  ];

  readonly caseStats = [
    { value: '2', unit: 'años', text: 'construyendo marcas bajo una misma línea' },
    { value: '2', unit: 'áreas', text: 'agencia de marketing + productora audiovisual' },
    { value: '360°', unit: '', text: 'estrategia, diseño y producción de principio a fin' },
    { value: '2026', unit: '', text: 'últimos espacios de agenda disponibles' }
  ];

  readonly idealClients = [
    'Médicos',
    'Beauty & wellness — estudios, uñas, pestañas, estética, clínicas',
    'Restaurantes',
    'Tiendas con e-commerce que ya venden',
    'Marcas personales, cursos y podcasts'
  ];

  readonly benefits = [
    {
      title: 'Todo bajo un mismo techo',
      text: 'Pensamos, creamos y producimos en la misma línea. No coordinas tres proveedores distintos: todo se siente coherente.'
    },
    {
      title: 'Rooted in Mexico, thinking globally',
      text: 'Estándar internacional con sensibilidad local. Raíz mexicana con ambición global.'
    },
    {
      title: 'No fluff, just performance',
      text: 'Enfoque en resultados medibles —alcance, percepción y conversión— no solo en lo estético.'
    },
    {
      title: 'Craft de cineastas',
      text: 'Cada pieza cuenta una historia con ritmo y emoción. Que no solo te vean: que te sientan.'
    }
  ];

  readonly portfolio = [
    {
      wide: true,
      tag: 'Foto & video de contenido',
      title: 'Restaurantes',
      image:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80'
    },
    {
      wide: false,
      tag: 'Branding & contenido',
      title: 'Beauty & Wellness',
      image:
        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80'
    },
    {
      wide: false,
      tag: 'Identidad & confianza',
      title: 'Médicos',
      image:
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
    },
    {
      wide: true,
      tag: 'Producción de audio',
      title: 'Podcasts',
      image:
        'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80'
    },
    {
      wide: true,
      tag: 'Cobertura con dron',
      title: 'Eventos sociales',
      image:
        'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1200&q=80'
    },
    {
      wide: false,
      tag: 'Sistema visual',
      title: 'Marcas personales',
      image:
        'https://images.unsplash.com/photo-1542744173-8e2bd1f53eef?auto=format&fit=crop&w=800&q=80'
    }
  ];

  readonly faqs = [
    {
      q: '¿Qué hace Meibe exactamente?',
      a: 'Somos estudio creativo: estrategia, diseño y producción audiovisual bajo una misma línea.'
    },
    {
      q: '¿Trabajan solo el contenido o también la estrategia?',
      a: 'Ambos. Podemos empezar por producción o armar el sistema completo: think, create y produce.'
    },
    {
      q: '¿Para qué tipo de negocios trabajan?',
      a: 'Médicos, beauty & wellness, restaurantes, e-commerce y marcas personales, cursos y podcasts.'
    },
    {
      q: '¿Cómo miden los resultados?',
      a: 'Con reportes por marca: alcance, percepción y conversión — transparencia total.'
    },
    {
      q: '¿Tienen disponibilidad?',
      a: 'Quedan últimos espacios de agenda para 2026. Cotiza y confirmamos tiempos.'
    }
  ];

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  toggleFaq(i: number): void {
    this.openFaq = this.openFaq === i ? -1 : i;
  }
}
