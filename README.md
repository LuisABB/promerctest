# PROMERC Landing - Angular + Three.js

Landing page corporativa inspirada en el diseño compartido, construida con Angular y animaciones 3D en scroll usando Three.js.

## Tecnologias

- Angular 19 (standalone components)
- TypeScript
- SCSS
- Three.js
- Angular CLI

## Caracteristicas implementadas

- UI dark premium con paleta naranja/cyan, tarjetas y gradientes atmosfericos.
- Navegacion sticky por anclas: Servicios, Stand 3D, Casos, Contacto.
- Secciones de landing:
  - Hero
  - Metricas
  - Servicios
  - Bloques 3D/experiencia
  - Casos de exito
  - Testimoniales
  - CTA final de contacto
- Escena Three.js de fondo (canvas full-screen) con objetos 3D y particulas.
- Animaciones ligadas al scroll:
  - Rotacion y desplazamiento de mallas 3D segun progreso de scroll.
  - Movimiento suave de camara segun avance de pagina.
  - Parallax adicional en tarjetas/secciones mediante variables CSS.
- Layout responsive para desktop, tablet y mobile.

## Estructura del proyecto

```text
promerc-landing/
|- src/
|  |- app/
|  |  |- app.component.ts      # Datos de secciones + motor Three.js + eventos scroll/resize
|  |  |- app.component.html    # Estructura completa de la landing
|  |  |- app.component.scss    # Estilos de interfaz, responsive y parallax de bloques
|  |  |- app.config.ts
|  |  |- app.routes.ts
|  |- main.ts
|  |- styles.scss              # Estilos globales y tipografias
|- angular.json                # Configuracion de build y budgets
|- package.json
|- README.md
```

## Instalacion y uso

1. Instalar dependencias:

```bash
npm install
```

2. Levantar entorno local:

```bash
npm start
```

3. Build de produccion:

```bash
npm run build
```

## Notas tecnicas

- El canvas de Three.js se renderiza en segundo plano y no bloquea interacciones (`pointer-events: none`).
- Se usa `NgZone.runOutsideAngular()` para mantener la animacion fluida y reducir trabajo de change detection.
- Se ajusta `pixelRatio` para balancear nitidez y rendimiento.
- Las mallas y materiales se liberan en `ngOnDestroy` para evitar fugas de memoria.

## Siguientes mejoras sugeridas

- Reemplazar placeholders visuales por modelos GLTF reales de exhibidores.
- Migrar animacion de scroll a una linea de tiempo avanzada (por ejemplo GSAP ScrollTrigger) si se requiere direccion de arte mas compleja.
- Optimizar peso final con lazy loading de recursos 3D y compresion de texturas.
