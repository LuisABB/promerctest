import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ThreeSceneComponent } from './components/three-scene/three-scene.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ThreeSceneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly whatsapp = 'https://wa.me/525636352382';

  menuOpenFaq = 0;

  readonly problemCards = [
    'Mensajes incoherentes entre canales',
    'Tres proveedores que no se hablan',
    'Contenido que no mueve la aguja'
  ];

  readonly solutionCards = [
    {
      title: 'Un solo techo',
      text: 'No coordinas tres proveedores distintos. Por eso todo se siente coherente.'
    },
    {
      title: 'Estándar internacional',
      text: 'Raíz mexicana con ambición global: sensibilidad local, ejecución global.'
    },
    {
      title: 'Resultados medibles',
      text: 'Alcance, percepción y conversión. No solo estética.'
    }
  ];

  readonly agencyServices = [
    'Branding y arquitectura de marca',
    'Estrategia digital',
    'Manejo de redes sociales',
    'Diseño de contenido',
    'UGC & talent management',
    'Paid media — Meta / TikTok Ads / Google Analytics',
    'Diseño web',
    'Ilustración & animación'
  ];

  readonly productionServices = [
    'Video & foto de contenido',
    'Producción con dron',
    'Postproducción y edición de audio y video',
    'Cobertura de eventos sociales',
    'Grabación de audio',
    'Producción de podcast',
    'Doblaje, mezcla & mastering'
  ];

  readonly processSteps = [
    {
      n: '01',
      title: 'Entendemos el porqué',
      text: 'Nunca empezamos por el diseño. Primero el porqué, el para quién y el qué quieres lograr.'
    },
    {
      n: '02',
      title: 'Diseñamos la estrategia',
      text: 'Territorio de marca, mensajes y plan de canales con métricas definidas desde el día uno.'
    },
    {
      n: '03',
      title: 'Creamos y producimos',
      text: 'Pensamos como cineastas: ritmo, narrativa y emoción. Todo bajo el mismo techo.'
    },
    {
      n: '04',
      title: 'Medimos y ajustamos',
      text: 'Alcance, percepción y conversión. Los resultados mandan sobre lo bonito.'
    }
  ];

  readonly cases = [
    { title: '2 años', text: 'construyendo marcas que se sienten' },
    { title: 'Marcas & Proyectos', text: 'creativos, campañas y producción por cliente' },
    { title: 'Reportes', text: 'métricas de alcance, percepción y conversión' }
  ];

  readonly benefits = [
    {
      title: 'Estrategia primero',
      text: 'El porqué antes del cómo. Nada se produce sin intención.'
    },
    {
      title: 'Craft de cine',
      text: 'Ritmo, narrativa y emoción en cada pieza que sale del estudio.'
    },
    {
      title: 'Medimos lo que importa',
      text: 'Reportes claros por marca: alcance, percepción y conversión.'
    },
    {
      title: 'Socios, no proveedores',
      text: 'Nos metemos al crecimiento de la marca, no solo a la entrega.'
    }
  ];

  readonly portfolio = [
    'Médicos y clínicas',
    'Beauty & wellness',
    'Estudios de ejercicio',
    'Restaurantes',
    'E-commerce & emprendedores',
    'Marcas personales, cursos y podcasts'
  ];

  readonly plans = [
    {
      title: 'Solo producción',
      text: 'Video, foto, audio, podcast y postproducción para marcas personales, cursos y podcasts.',
      featured: false
    },
    {
      title: 'Marketing & estrategia',
      text: 'Branding, redes, contenido, paid media y web con métricas definidas.',
      featured: false
    },
    {
      title: 'Estudio completo',
      text: 'Estrategia + creatividad + producción bajo un mismo techo. La ventaja Meibe.',
      featured: true
    }
  ];

  readonly faqs = [
    {
      q: '¿Puedo contratar solo producción audiovisual?',
      a: 'Sí. Muchas marcas personales, cursos y podcasts llegan solo por producción de contenido: video, foto, audio y postproducción. También puedes sumar estrategia después.'
    },
    {
      q: '¿Cómo comparten resultados y casos de éxito?',
      a: 'Damos acceso a carpetas de clientes activos e inactivos y a reportes por marca, con métricas reales de alcance, percepción y conversión.'
    },
    {
      q: '¿Trabajan con marcas fuera de México?',
      a: 'Sí. Estamos rooted in Mexico, thinking globally: sensibilidad local con ejecución de estándar internacional.'
    },
    {
      q: '¿Cuánto tiempo llevan operando?',
      a: 'Llevamos 2 años construyendo marcas que se sienten, con proyectos creativos, campañas y producción por cliente.'
    },
    {
      q: '¿Tienen disponibilidad ahora?',
      a: 'Quedan últimos espacios de agenda en 2026. Escríbenos por WhatsApp y te confirmamos tiempos según el alcance.'
    }
  ];

  toggleFaq(index: number): void {
    this.menuOpenFaq = this.menuOpenFaq === index ? -1 : index;
  }
}
