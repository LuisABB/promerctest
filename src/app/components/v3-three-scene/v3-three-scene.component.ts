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
        display: block;
        width: 100%;
        height: 100%;
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
  private whiteTorus!: THREE.Mesh;
  private softCube!: THREE.Mesh;
  private shards: THREE.Mesh[] = [];
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
    this.camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    this.camera.position.set(0, 0.05, 5.4);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: true
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    this.scene.add(new THREE.AmbientLight('#fff8d8', 0.95));
    const key = new THREE.DirectionalLight('#ffffff', 2.1);
    key.position.set(2.2, 4.2, 3.2);
    this.scene.add(key);
    const fill = new THREE.PointLight('#f0e6a0', 3.2, 26);
    fill.position.set(-2, 1.8, 3);
    this.scene.add(fill);
    const soft = new THREE.PointLight('#ffffff', 1.4, 18);
    soft.position.set(1.5, -1.2, 2.5);
    this.scene.add(soft);

    // Vibrant yellow knot — smaller than full-bleed hero
    const cream = new THREE.MeshPhysicalMaterial({
      color: '#f0d84a',
      metalness: 0.22,
      roughness: 0.24,
      clearcoat: 0.95,
      clearcoatRoughness: 0.14,
      sheen: 0.4,
      sheenColor: new THREE.Color('#ffe978'),
      sheenRoughness: 0.3,
      emissive: '#c9a820',
      emissiveIntensity: 0.2,
      envMapIntensity: 1.2
    });

    this.knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.92, 0.28, 240, 32, 2, 3),
      cream
    );
    this.knot.position.set(0.15, 0.05, 0);
    this.knot.scale.setScalar(0.88);
    this.knot.rotation.set(0.35, -0.45, 0.2);
    this.scene.add(this.knot);

    this.whiteTorus = new THREE.Mesh(
      new THREE.TorusGeometry(0.38, 0.1, 24, 64),
      new THREE.MeshPhysicalMaterial({
        color: '#f4f6f2',
        metalness: 0.1,
        roughness: 0.3,
        transparent: true,
        opacity: 0.55,
        clearcoat: 0.6
      })
    );
    this.whiteTorus.position.set(2.05, 1.4, -0.55);
    this.whiteTorus.rotation.set(0.95, 0.25, 0.15);
    this.scene.add(this.whiteTorus);

    this.softCube = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.48, 0.48),
      new THREE.MeshPhysicalMaterial({
        color: '#ebe6b0',
        metalness: 0.12,
        roughness: 0.35,
        transparent: true,
        opacity: 0.55,
        clearcoat: 0.7
      })
    );
    this.softCube.position.set(1.9, -1.35, 0.25);
    this.softCube.rotation.set(0.5, 0.7, 0.15);
    this.scene.add(this.softCube);

    const darkGlass = new THREE.MeshPhysicalMaterial({
      color: '#24382c',
      metalness: 0.05,
      roughness: 0.4,
      transparent: true,
      opacity: 0.22,
      transmission: 0.35,
      thickness: 0.45
    });

    const shardSpots: Array<[number, number, number, number]> = [
      [-2.0, 0.85, -0.7, 0.65],
      [-1.65, -1.05, -0.35, 0.5],
      [2.25, -0.15, -1.05, 0.42],
      [-0.75, 1.45, -1.15, 0.38]
    ];
    for (const [x, y, z, s] of shardSpots) {
      const mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(s * 0.55, 0), darkGlass.clone());
      mesh.position.set(x, y, z);
      mesh.rotation.set(x, y, z);
      this.scene.add(mesh);
      this.shards.push(mesh);
    }
  }

  private tick = (): void => {
    const t = this.clock.getElapsedTime();
    const m = this.reduced ? 0.2 : 1;
    this.mouse.x += (this.target.x - this.mouse.x) * 0.04;
    this.mouse.y += (this.target.y - this.mouse.y) * 0.04;

    this.knot.rotation.x = 0.35 + t * 0.18 * m + this.mouse.y * 0.12;
    this.knot.rotation.y = -0.45 + t * 0.24 * m + this.mouse.x * 0.18;
    this.knot.position.y = 0.05 + Math.sin(t * 0.65) * 0.07 * m;

    this.whiteTorus.rotation.x = 0.95 + t * 0.18 * m;
    this.whiteTorus.rotation.z = 0.15 + t * 0.1 * m;
    this.softCube.rotation.x = 0.5 + t * 0.22 * m;
    this.softCube.rotation.y = 0.7 + t * 0.16 * m;

    this.shards.forEach((s, i) => {
      s.rotation.x += 0.0025 * m * (i % 2 ? 1 : -1);
      s.rotation.y += 0.0035 * m;
    });

    this.camera.position.x = this.mouse.x * 0.18;
    this.camera.lookAt(0.05, 0, 0);
    this.renderer.render(this.scene, this.camera);
    this.raf = requestAnimationFrame(this.tick);
  };
}
