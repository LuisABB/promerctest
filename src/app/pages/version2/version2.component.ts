import { Component } from '@angular/core';
import { V2ThreeSceneComponent } from '../../components/v2-three-scene/v2-three-scene.component';

@Component({
  selector: 'app-version2',
  standalone: true,
  imports: [V2ThreeSceneComponent],
  templateUrl: './version2.component.html',
  styleUrl: './version2.component.scss'
})
export class Version2Component {
  readonly whatsapp = 'https://wa.me/525636352382';
  menuOpen = false;
  openFaq = -1;

  readonly nav = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  readonly marquee = [
    'Estrategia',
    'Branding',
    'Marketing',
    'Diseño',
    'Producción audiovisual',
    'Meibe Creative Studio',
    'Redes sociales',
    'Paid media',
    'Podcast'
  ];

  readonly silos = ['Estrategia (silo)', 'Diseño (silo)', 'Producción (silo)'];

  readonly pillars = [
    {
      n: '01',
      title: 'Think',
      text: 'Empezamos donde otros terminan: entendiendo el negocio, la audiencia y el objetivo. La estrategia es el primer entregable.'
    },
    {
      n: '02',
      title: 'Create',
      text: 'Diseñamos identidades, contenidos y experiencias con intención creativa. Cada pieza tiene una razón de ser.'
    },
    {
      n: '03',
      title: 'Produce',
      text: 'Lo hacemos real. Video, foto, audio, digital. Producción de alta calidad bajo la misma estrategia.'
    }
  ];

  readonly agency = [
    'Marketing & Estrategia',
    'Branding y arquitectura de marca',
    'Estrategia digital',
    'Manejo de redes sociales',
    'Diseño de contenido',
    'UGC & Talent Management',
    'Paid Media — Meta / TikTok / Google Ads',
    'Diseño web',
    'Ilustración & Animación'
  ];

  readonly production = [
    'Video & fotografía de contenido',
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
      tag: 'Think',
      title: 'Entendemos el terreno.',
      text: 'Escuchamos el negocio, la audiencia y el objetivo. Sin atajos.'
    },
    {
      n: '02',
      tag: 'Strategy',
      title: 'Definimos la dirección.',
      text: 'Una estrategia clara antes de mover un solo píxel o encender una cámara.'
    },
    {
      n: '03',
      tag: 'Create',
      title: 'Diseñamos la experiencia.',
      text: 'Conceptos, contenido y piezas que comunican con intención y forma.'
    },
    {
      n: '04',
      tag: 'Produce',
      title: 'Lo hacemos real.',
      text: 'Ideas convertidas en videos, campañas, identidades y plataformas que funcionan.'
    }
  ];

  readonly cases = [
    {
      tone: 'green',
      cat: 'Branding + Redes sociales',
      title: 'Marca Gastro',
      problem: 'Presencia inconsistente y poco alcance local.',
      solution: 'Sistema de marca + contenido editorial semanal.',
      metric: '340%',
      metricLabel: 'Alcance orgánico',
      detail: '+340% alcance orgánico en 90 días'
    },
    {
      tone: 'gold',
      cat: 'Producción audiovisual + Paid media',
      title: 'Startup Fintech',
      problem: 'Campañas caras sin narrativa de producto.',
      solution: 'Piezas de performance + embudo creativo.',
      metric: '4.2x',
      metricLabel: 'ROAS',
      detail: '4.2x ROAS en el primer trimestre'
    },
    {
      tone: 'dark',
      cat: 'Estrategia digital + Diseño',
      title: 'Retail Nacional',
      problem: 'Leads caros y mensajes genéricos.',
      solution: 'Reposición de canales y landing de conversión.',
      metric: '-60%',
      metricLabel: 'Costo por lead',
      detail: '-60% costo por lead en 120 días'
    },
    {
      tone: 'teal',
      cat: 'Podcast + Thought leadership',
      title: 'Consultora B2B',
      problem: 'Autoridad diluida en un mercado saturado.',
      solution: 'Podcast de categoría + distribución.',
      metric: 'Top 10',
      metricLabel: 'Categoría podcast',
      detail: 'Top 10 en categoría en 8 semanas'
    }
  ];

  readonly why = [
    {
      tag: 'Strategy first.',
      title: 'Nunca empezamos por el diseño.',
      text: 'Cada proyecto parte de una estrategia clara. El diseño es la consecuencia, no el punto de partida.'
    },
    {
      tag: 'Craft.',
      title: 'Pensamos como cineastas.',
      text: 'Ritmo, narrativa y emoción en cada pieza. La forma en que se cuenta algo importa tanto como lo que se dice.'
    },
    {
      tag: 'Measure what matters.',
      title: 'Los resultados mandan sobre lo bonito.',
      text: 'No hacemos diseño por el diseño. Todo tiene un objetivo claro y métricas que lo respaldan.'
    },
    {
      tag: 'Partners, not providers.',
      title: 'Nos involucramos en tu crecimiento.',
      text: 'No somos un proveedor más. Nos convertimos en parte del equipo con compromisos reales.'
    }
  ];

  readonly brands = [
    'Nike MX',
    'Oxxo',
    'Cabañas',
    'Tequila Patrón',
    'MercadoLibre',
    'Cinépolis',
    'Spotify LATAM',
    'Telcel'
  ];

  readonly faqs = [
    {
      q: '¿Qué tipo de marcas trabajan?',
      a: 'Marcas que quieren crecer con coherencia: retail, food, wellness, fintech, B2B y proyectos personales con ambición.'
    },
    {
      q: '¿Qué servicios ofrecen?',
      a: 'Estrategia, branding, contenido, paid media, diseño web y producción audiovisual — bajo una misma línea.'
    },
    {
      q: '¿Pueden encargarse de estrategia, contenido y producción?',
      a: 'Sí. Esa es la ventaja Meibe: think, create y produce sin fricción entre equipos.'
    },
    {
      q: '¿Trabajan con marcas fuera de México?',
      a: 'Sí. Rooted in Mexico, thinking globally.'
    },
    {
      q: '¿Cómo comienza un proyecto?',
      a: 'Con una conversación de 30 minutos para entender visión, audiencia y métricas. Luego armamos propuesta.'
    },
    {
      q: '¿Cuánto tarda un proyecto?',
      a: 'Depende del alcance. Producción puntual puede tomar días; sistemas de marca y campañas, semanas.'
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
