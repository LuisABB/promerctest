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
  selector: 'app-v2-three-scene',
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
export class V2ThreeSceneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private clock = new THREE.Clock();
  private raf = 0;
  private group!: THREE.Group;
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
      if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
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
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    this.camera.position.set(0, 0.15, 6.2);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
      antialias: true
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.group = new THREE.Group();
    this.scene.add(this.group);

    const mkWire = (geo: THREE.BufferGeometry, color: string, opacity: number) =>
      new THREE.LineSegments(
        new THREE.WireframeGeometry(geo),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity })
      );

    const sphere = mkWire(new THREE.IcosahedronGeometry(1.85, 1), '#2f4a3a', 0.55);
    sphere.position.set(0.55, 0.1, -0.2);
    this.group.add(sphere);

    const torus = mkWire(new THREE.TorusGeometry(1.15, 0.38, 16, 48), '#c9a227', 0.72);
    torus.position.set(1.35, 0.05, 0.35);
    torus.rotation.set(0.7, 0.35, 0.2);
    this.group.add(torus);

    const shards: Array<[number, number, number, number, string]> = [
      [-2.2, 1.1, 0.4, 0.35, '#9aa39a'],
      [-1.6, -1.2, 0.6, 0.28, '#b7b2a4'],
      [2.4, -1.0, -0.2, 0.42, '#c9a227'],
      [2.1, 1.35, 0.2, 0.22, '#8f978f'],
      [-0.2, -1.55, 0.8, 0.2, '#a8a297'],
      [0.9, 1.6, -0.5, 0.18, '#b8b3a6']
    ];

    for (const [x, y, z, s, c] of shards) {
      const mesh = mkWire(new THREE.TetrahedronGeometry(s, 0), c, 0.55);
      mesh.position.set(x, y, z);
      mesh.rotation.set(x, y, z);
      this.group.add(mesh);
    }
  }

  private tick = (): void => {
    const t = this.clock.getElapsedTime();
    const m = this.reduced ? 0.2 : 1;
    this.mouse.x += (this.target.x - this.mouse.x) * 0.04;
    this.mouse.y += (this.target.y - this.mouse.y) * 0.04;

    this.group.rotation.y = t * 0.08 * m + this.mouse.x * 0.15;
    this.group.rotation.x = Math.sin(t * 0.2) * 0.06 * m + this.mouse.y * 0.08;
    this.group.children.forEach((child, i) => {
      child.rotation.z += 0.0015 * (i % 3 === 0 ? 1 : -1) * m;
    });

    this.camera.position.x = this.mouse.x * 0.25;
    this.camera.lookAt(0.4, 0, 0);
    this.renderer.render(this.scene, this.camera);
    this.raf = requestAnimationFrame(this.tick);
  };
}
