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
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

@Component({
  selector: 'app-v3-three-scene',
  standalone: true,
  template: `<canvas #canvas class="fx" aria-hidden="true"></canvas>`,
  styles: [
    `
      :host {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
      }
      .fx {
        display: block;
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class V3ThreeSceneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private clock = new THREE.Clock();
  private raf = 0;
  private knot!: THREE.Mesh;
  private torus!: THREE.Mesh;
  private cubes: THREE.Mesh[] = [];
  private mouse = { x: 0, y: 0 };
  private target = { x: 0, y: 0 };
  private reduced = false;

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
    this.resize();
    this.zone.runOutsideAngular(() => this.tick());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.scene?.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const m = obj.material;
        if (Array.isArray(m)) m.forEach((x) => x.dispose());
        else m.dispose();
      }
    });
    this.renderer?.dispose();
  }

  @HostListener('window:mousemove', ['$event'])
  onMove(e: MouseEvent): void {
    this.target.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.target.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  @HostListener('window:resize')
  resize(): void {
    if (!this.renderer || !this.camera) return;
    const host = this.canvasRef.nativeElement.parentElement;
    const w = host?.clientWidth || window.innerWidth;
    const h = host?.clientHeight || window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private init(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    this.camera.position.set(0.2, 0.1, 6.4);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: true
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    this.scene.add(new THREE.AmbientLight('#fff6c8', 0.7));
    const key = new THREE.DirectionalLight('#ffffff', 2.2);
    key.position.set(3, 5, 4);
    this.scene.add(key);
    const fill = new THREE.PointLight('#ebd96a', 3.5, 30);
    fill.position.set(-2, 2, 4);
    this.scene.add(fill);

    const gold = new THREE.MeshPhysicalMaterial({
      color: '#ebd96a',
      metalness: 0.55,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      emissive: '#a8922e',
      emissiveIntensity: 0.18,
      envMapIntensity: 1.4
    });

    this.knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.15, 0.34, 220, 32, 2, 3), gold);
    this.knot.position.set(0.85, 0.05, 0);
    this.scene.add(this.knot);

    this.torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.72, 0.22, 32, 80),
      new THREE.MeshPhysicalMaterial({
        color: '#f5f5f0',
        metalness: 0.2,
        roughness: 0.28,
        transparent: true,
        opacity: 0.92,
        clearcoat: 0.8
      })
    );
    this.torus.position.set(2.55, 0.35, -0.6);
    this.torus.rotation.set(0.8, 0.4, 0.2);
    this.scene.add(this.torus);

    const glass = new THREE.MeshPhysicalMaterial({
      color: '#e8f0ea',
      metalness: 0,
      roughness: 0.12,
      transmission: 0.85,
      transparent: true,
      opacity: 0.55,
      thickness: 0.6
    });

    const spots: Array<[number, number, number, number]> = [
      [-2.4, 1.3, 0.4, 0.35],
      [-2.0, -1.1, 0.2, 0.28],
      [2.2, -1.2, 0.5, 0.32],
      [-1.2, 0.9, -0.8, 0.22]
    ];
    for (const [x, y, z, s] of spots) {
      const cube = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), glass.clone());
      cube.position.set(x, y, z);
      cube.rotation.set(x, y, z);
      this.scene.add(cube);
      this.cubes.push(cube);
    }
  }

  private tick = (): void => {
    const t = this.clock.getElapsedTime();
    const m = this.reduced ? 0.2 : 1;
    this.mouse.x += (this.target.x - this.mouse.x) * 0.04;
    this.mouse.y += (this.target.y - this.mouse.y) * 0.04;

    this.knot.rotation.x = t * 0.2 * m + this.mouse.y * 0.2;
    this.knot.rotation.y = t * 0.28 * m + this.mouse.x * 0.25;
    this.torus.rotation.x = 0.8 + t * 0.15 * m;
    this.torus.rotation.y = 0.4 + t * 0.12 * m;

    this.cubes.forEach((c, i) => {
      c.rotation.x += 0.004 * m * (i % 2 ? 1 : -1);
      c.rotation.y += 0.005 * m;
      c.position.y += Math.sin(t * 0.8 + i) * 0.0015 * m;
    });

    this.camera.position.x = 0.2 + this.mouse.x * 0.3;
    this.camera.lookAt(0.6, 0, 0);
    this.renderer.render(this.scene, this.camera);
    this.raf = requestAnimationFrame(this.tick);
  };
}
