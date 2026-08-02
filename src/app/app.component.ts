import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  ViewChild
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('fxCanvas', { static: true })
  fxCanvasRef!: ElementRef<HTMLCanvasElement>;

  readonly metrics = [
    { value: '6', label: 'Zonas de cobertura Nielsen ibope' },
    { value: '+42', label: 'Años de experiencia' },
    { value: '+80', label: 'Marcas Líderes en México' },
    { value: '2003', label: '1ªAfiliación AMAPRO' },
    { value: '2016', label: 'Agencia Promoción del año' },
    { value: '2020', label: 'Agencia Promoción del año' },
    { value: '2021', label: 'Obtención de "REPSE STyPV"' }
  ];

  readonly services = [
    {
      id: '01',
      title: 'CAPACITACION',
      description: 'Formacion operativa para equipos de piso y ejecucion en punto de venta.'
    },
    {
      id: '02',
      title: 'MYSTERY SHOPPER',
      description: 'Evaluacion en campo para medir experiencia, servicio y cumplimiento.'
    },
    {
      id: '03',
      title: 'REPORTEO',
      description: 'Reportes accionables con evidencia para seguimiento y toma de decisiones.'
    },
    {
      id: '04',
      title: 'DEGUSTACION',
      description: 'Activaciones con demostracion y prueba de producto en punto de venta.'
    },
    {
      id: '05',
      title: 'PROMOCIONES ESTRATEGICAS',
      description: 'Planeacion y ejecucion de promociones para impulsar conversion.'
    },
    {
      id: '06',
      title: 'PROMOTORIA',
      description: 'Cobertura nacional con personal capacitado para ejecucion en anaquel.'
    }
  ];

  readonly cases = [
    'CONAIR - Aplicacion',
    'HISENSE - Materiales POP',
    'HERBALIFE - Material de promocion',
    'LITTLE CAESARS - Activaciones',
    'REPUBLIC OF GAMERS - Diseno de muebles',
    'GRUPO BIMBO - Diseno de stand',
    'REVLON - Experiencia de marca',
    'NESPRESSO - POP'
  ];

  readonly testimonials = [
    {
      quote:
        'Tienen la atencion mas eficiente, rapida y oportuna que he experimentado en el mercado; su capacitacion es la joya de la corona.',
      name: 'Lic. Pamela Arce',
      company: 'Shiseido'
    },
    {
      quote:
        'Tienen todas las cualidades para llevar a cabo las funciones de una agencia de promotoria y trade marketing a nivel nacional.',
      name: 'Lic. Cynthia Arzate',
      company: 'Revlon'
    },
    {
      quote:
        'Atencion impecable y resultados medibles en cada activacion que hemos ejecutado juntos.',
      name: 'Lic. Eduardo Vallejo',
      company: 'CB&H'
    }
  ];

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private clock = new THREE.Clock();
  private animationFrameId = 0;

  private sphereMesh!: THREE.Mesh;
  private cubeMesh!: THREE.Mesh;
  private prismGroup!: THREE.Group;
  private capsuleGroup!: THREE.Group;
  private glassMeshes: THREE.Mesh[] = [];
  private hazePoints!: THREE.Points;

  private currentScrollProgress = 0;
  private targetScrollProgress = 0;

  constructor(private readonly zone: NgZone, private readonly hostRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.initScene();
    this.onResize();
    this.onScroll();
    this.zone.runOutsideAngular(() => this.animate());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.renderer.dispose();

    for (const mesh of this.glassMeshes) {
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    }

    this.hazePoints.geometry.dispose();
    (this.hazePoints.material as THREE.Material).dispose();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    this.targetScrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.renderer || !this.camera) {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 0.7, 8);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.fxCanvasRef.nativeElement,
      alpha: true,
      antialias: true
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    const hemi = new THREE.HemisphereLight('#d9f3ff', '#0a1021', 0.45);
    this.scene.add(hemi);

    const keyLight = new THREE.DirectionalLight('#f4c470', 1.05);
    keyLight.position.set(5, 4, 4);
    this.scene.add(keyLight);

    const rimLight = new THREE.PointLight('#69e1e6', 1.4, 40);
    rimLight.position.set(-6, -1, 5);
    this.scene.add(rimLight);

    const createGlassMaterial = (tint: string): THREE.MeshPhysicalMaterial =>
      new THREE.MeshPhysicalMaterial({
        color: tint,
        metalness: 0,
        roughness: 0.14,
        transmission: 0.92,
        transparent: true,
        opacity: 0.92,
        thickness: 1.2,
        ior: 1.42,
        reflectivity: 0.75,
        clearcoat: 1,
        clearcoatRoughness: 0.1
      });

    this.sphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 48, 48),
      createGlassMaterial('#b9e8ff')
    );
    this.sphereMesh.position.set(-3.3, 1.45, -1.1);

    this.cubeMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.45, 1.45, 1.45, 3, 3, 3),
      createGlassMaterial('#c9dcff')
    );
    this.cubeMesh.position.set(2.8, -0.25, -1.9);
    this.cubeMesh.rotation.set(0.42, 0.55, 0.14);

    this.prismGroup = new THREE.Group();
    const prismGeometry = new THREE.CylinderGeometry(0.55, 0.55, 1.7, 3);
    const prismA = new THREE.Mesh(prismGeometry, createGlassMaterial('#9fd2ff'));
    const prismB = new THREE.Mesh(prismGeometry, createGlassMaterial('#add8ff'));
    const prismC = new THREE.Mesh(prismGeometry, createGlassMaterial('#8bc6ff'));
    prismA.position.set(-0.6, 0.4, 0);
    prismB.position.set(0.55, -0.15, -0.25);
    prismC.position.set(0.1, -0.55, 0.45);
    prismA.rotation.set(0.2, 0.5, 1.35);
    prismB.rotation.set(-0.35, 0.1, 0.75);
    prismC.rotation.set(0.28, 0.7, 0.2);
    this.prismGroup.add(prismA, prismB, prismC);
    this.prismGroup.position.set(0.9, -2.6, -3.3);

    this.capsuleGroup = new THREE.Group();
    const capsuleGeometry = new THREE.CapsuleGeometry(0.34, 1.4, 10, 18);
    const capsuleA = new THREE.Mesh(capsuleGeometry, createGlassMaterial('#c5f4f3'));
    const capsuleB = new THREE.Mesh(capsuleGeometry, createGlassMaterial('#d2fcff'));
    capsuleA.position.set(-0.8, 0.1, 0.2);
    capsuleB.position.set(0.7, -0.2, -0.25);
    capsuleA.rotation.set(0.2, 0.4, 1.1);
    capsuleB.rotation.set(-0.35, -0.2, -1.05);
    this.capsuleGroup.add(capsuleA, capsuleB);
    this.capsuleGroup.position.set(-0.7, -0.9, -2.4);

    this.scene.add(this.sphereMesh, this.cubeMesh, this.prismGroup, this.capsuleGroup);

    this.glassMeshes = [
      this.sphereMesh,
      this.cubeMesh,
      prismA,
      prismB,
      prismC,
      capsuleA,
      capsuleB
    ];

    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 24;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }

    const hazeGeometry = new THREE.BufferGeometry();
    hazeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const hazeMaterial = new THREE.PointsMaterial({
      color: '#92cbff',
      size: 0.08,
      transparent: true,
      opacity: 0.14,
      depthWrite: false
    });

    this.hazePoints = new THREE.Points(hazeGeometry, hazeMaterial);
    this.hazePoints.position.z = -4.6;
    this.scene.add(this.hazePoints);
  }

  private animate(): void {
    const elapsedTime = this.clock.getElapsedTime();
    this.currentScrollProgress += (this.targetScrollProgress - this.currentScrollProgress) * 0.08;

    this.sphereMesh.rotation.x = elapsedTime * 0.22 + this.currentScrollProgress * 1.6;
    this.sphereMesh.rotation.y = elapsedTime * 0.34 + this.currentScrollProgress * 1.2;
    this.sphereMesh.position.y = 1.45 + Math.sin(elapsedTime * 0.9) * 0.25 - this.currentScrollProgress * 2.3;

    this.cubeMesh.rotation.x = 0.4 + elapsedTime * -0.16;
    this.cubeMesh.rotation.y = 0.55 + elapsedTime * 0.27 + this.currentScrollProgress * 1.9;
    this.cubeMesh.rotation.z = 0.14 + elapsedTime * 0.1;
    this.cubeMesh.position.x = 2.8 + Math.sin(elapsedTime * 0.8 + 0.3) * 0.38 + this.currentScrollProgress * 0.9;
    this.cubeMesh.position.y = -0.25 + Math.sin(elapsedTime * 1.4) * 0.18 - this.currentScrollProgress * 0.9;

    this.prismGroup.rotation.y = elapsedTime * 0.22 + this.currentScrollProgress * 2.4;
    this.prismGroup.rotation.z = elapsedTime * 0.14;
    this.prismGroup.position.x = 0.9 + Math.sin(elapsedTime * 0.85 + 0.7) * 0.45;
    this.prismGroup.position.y = -2.6 + Math.sin(elapsedTime * 0.5) * 0.2 - this.currentScrollProgress * 0.7;

    this.capsuleGroup.rotation.x = elapsedTime * 0.18;
    this.capsuleGroup.rotation.y = elapsedTime * -0.2 + this.currentScrollProgress * 1.3;
    this.capsuleGroup.position.x = -0.7 + Math.sin(elapsedTime * 1.1) * 0.35;
    this.capsuleGroup.position.y = -0.9 + Math.sin(elapsedTime * 0.6 + 1.3) * 0.2 - this.currentScrollProgress * 1.1;

    this.hazePoints.rotation.y = elapsedTime * 0.03;
    this.hazePoints.rotation.x = elapsedTime * 0.01;

    this.camera.position.y = 0.7 - this.currentScrollProgress * 2.4;
    this.camera.position.z = 8 - this.currentScrollProgress * 1.1;
    this.camera.lookAt(0, -0.8, -1);

    this.hostRef.nativeElement.style.setProperty('--scroll-progress', this.currentScrollProgress.toFixed(4));

    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}
