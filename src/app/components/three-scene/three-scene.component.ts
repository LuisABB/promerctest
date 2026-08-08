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

interface Floater {
  mesh: THREE.Mesh;
  speed: number;
  drift: number;
  base: THREE.Vector3;
}

@Component({
  selector: 'app-three-scene',
  standalone: true,
  template: `<canvas #canvas class="fx-canvas" aria-hidden="true"></canvas>`,
  styles: [
    `
:host {
        position: fixed;
        inset: 0;
        z-index: 0;
        pointer-events: none;
      }

      .fx-canvas {
        display: block;
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class ThreeSceneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private clock = new THREE.Clock();
  private raf = 0;

  private knot!: THREE.Mesh;
  private knotB!: THREE.Mesh;
  private wire!: THREE.LineSegments;
  private wireNodes!: THREE.Points;
  private particles!: THREE.Points;
  private floaters: Floater[] = [];
  private glowA!: THREE.Mesh;
  private glowB!: THREE.Mesh;

  private mouse = { x: 0, y: 0 };
  private targetMouse = { x: 0, y: 0 };
  private scrollProgress = 0;
  private targetScroll = 0;
  private reducedMotion = false;

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
    this.resize();
    this.zone.runOutsideAngular(() => this.tick());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.disposeScene();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.targetScroll = max > 0 ? window.scrollY / max : 0;
  }

  @HostListener('window:resize')
  resize(): void {
    if (!this.renderer || !this.camera) {
      return;
    }
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private init(): void {
    const canvas = this.canvasRef.nativeElement;
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    this.camera.position.set(0, 0.2, 7.2);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.45;

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    this.scene.add(new THREE.AmbientLight('#fff4c8', 0.85));
    this.scene.add(new THREE.HemisphereLight('#fff1b8', '#143d28', 1.15));

    const key = new THREE.DirectionalLight('#ffffff', 2.6);
    key.position.set(3.5, 6.5, 4.5);
    this.scene.add(key);

    const warmKey = new THREE.DirectionalLight('#ffe08a', 1.8);
    warmKey.position.set(-2.5, 4, 5);
    this.scene.add(warmKey);

    const fill = new THREE.PointLight('#ffd24a', 4.5, 32);
    fill.position.set(1.5, 2.2, 4);
    this.scene.add(fill);

    const fillB = new THREE.PointLight('#fff6d0', 3.2, 28);
    fillB.position.set(4.5, 0.5, 2);
    this.scene.add(fillB);

    const rim = new THREE.PointLight('#7dffb8', 2.2, 24);
    rim.position.set(2.8, -1.5, -2.5);
    this.scene.add(rim);

    const goldMat = new THREE.MeshPhysicalMaterial({
      color: '#ffd866',
      metalness: 0.92,
      roughness: 0.16,
      emissive: '#c9a227',
      emissiveIntensity: 0.28,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      reflectivity: 1,
      envMapIntensity: 1.85,
      sheen: 0.35,
      sheenColor: new THREE.Color('#ffe9a0'),
      sheenRoughness: 0.4
    });

    this.knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.05, 0.32, 220, 28, 2, 3), goldMat);
    this.knot.position.set(2.35, 0.15, -0.4);
    this.scene.add(this.knot);

    this.knotB = new THREE.Mesh(
      new THREE.TorusGeometry(0.95, 0.22, 48, 100),
      goldMat.clone()
    );
    this.knotB.position.set(2.35, 0.15, -0.4);
    this.knotB.rotation.set(Math.PI / 2.4, 0.35, 0.2);
    this.knotB.scale.setScalar(0.72);
    this.scene.add(this.knotB);

    const wireGeo = new THREE.IcosahedronGeometry(2.55, 1);
    this.wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(wireGeo),
      new THREE.LineBasicMaterial({
        color: '#d8ffe8',
        transparent: true,
        opacity: 0.38
      })
    );
    this.wire.position.copy(this.knot.position);
    this.scene.add(this.wire);

    this.wireNodes = new THREE.Points(
      wireGeo.clone(),
      new THREE.PointsMaterial({
        color: '#f0fff5',
        size: 0.04,
        transparent: true,
        opacity: 0.7,
        depthWrite: false
      })
    );
    this.wireNodes.position.copy(this.knot.position);
    this.scene.add(this.wireNodes);

    this.createFloaters();
    this.createParticles();
    this.createGlows();
  }

  private createFloaters(): void {
    const count = window.innerWidth < 768 ? 12 : 22;
    const colors = ['#ffd866', '#c9b56a', '#a8b89a', '#ffe08a', '#7a8f78'];

    for (let i = 0; i < count; i++) {
      const size = 0.08 + Math.random() * 0.28;
      const geo =
        Math.random() > 0.45
          ? new THREE.TetrahedronGeometry(size, 0)
          : new THREE.OctahedronGeometry(size * 0.85, 0);

      const mat = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        metalness: Math.random() > 0.5 ? 0.75 : 0.2,
        roughness: Math.random() > 0.5 ? 0.28 : 0.55,
        emissive: colors[i % colors.length],
        emissiveIntensity: 0.12,
        transparent: true,
        opacity: 0.5 + Math.random() * 0.4
      });

      const mesh = new THREE.Mesh(geo, mat);
      const base = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 8 - 1
      );
      mesh.position.copy(base);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      this.scene.add(mesh);
      this.floaters.push({
        mesh,
        speed: 0.15 + Math.random() * 0.45,
        drift: 0.2 + Math.random() * 0.6,
        base
      });
    }
  }

  private createParticles(): void {
    const n = window.innerWidth < 768 ? 80 : 160;
    const positions = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.particles = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: '#d8f5c8',
        size: 0.03,
        transparent: true,
        opacity: 0.45,
        depthWrite: false
      })
    );
    this.scene.add(this.particles);
  }

  private createGlows(): void {
    const glowMat = (color: string, opacity: number) =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        depthWrite: false
      });

    this.glowA = new THREE.Mesh(new THREE.SphereGeometry(2.2, 32, 32), glowMat('#ffd24a', 0.16));
    this.glowA.position.set(2.4, 0.1, -2.2);
    this.scene.add(this.glowA);

    this.glowB = new THREE.Mesh(new THREE.SphereGeometry(2.8, 32, 32), glowMat('#2f8a52', 0.18));
    this.glowB.position.set(2.1, -0.4, -3.2);
    this.scene.add(this.glowB);

    const glowC = new THREE.Mesh(new THREE.SphereGeometry(1.4, 24, 24), glowMat('#fff1b0', 0.1));
    glowC.position.set(2.6, 0.8, -1.4);
    this.scene.add(glowC);
  }

  private tick = (): void => {
    const t = this.clock.getElapsedTime();
    const motion = this.reducedMotion ? 0.15 : 1;

    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.04;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.04;
    this.scrollProgress += (this.targetScroll - this.scrollProgress) * 0.06;

    const knotX = 2.35 + Math.sin(this.scrollProgress * Math.PI * 2) * 0.35;
    const knotY = 0.15 - this.scrollProgress * 1.8 + Math.sin(t * 0.4) * 0.08 * motion;

    this.knot.position.set(knotX, knotY, -0.4);
    this.knot.rotation.x = t * 0.18 * motion + this.mouse.y * 0.25;
    this.knot.rotation.y = t * 0.28 * motion + this.mouse.x * 0.35;
    this.knot.rotation.z = t * 0.08 * motion;

    this.knotB.position.copy(this.knot.position);
    this.knotB.rotation.x = Math.PI / 2.4 + t * 0.12 * motion;
    this.knotB.rotation.y = 0.35 + t * 0.2 * motion + this.mouse.x * 0.2;
    this.knotB.rotation.z = 0.2 + t * 0.1 * motion;

    this.wire.position.copy(this.knot.position);
    this.wire.rotation.y = t * 0.08 * motion;
    this.wire.rotation.x = t * 0.04 * motion + this.mouse.y * 0.1;
    this.wireNodes.position.copy(this.knot.position);
    this.wireNodes.rotation.copy(this.wire.rotation);

    this.glowA.position.set(knotX, knotY, -2.2);
    this.glowA.scale.setScalar(1 + Math.sin(t * 0.7) * 0.08);
    this.glowB.scale.setScalar(1 + Math.cos(t * 0.5) * 0.1);

    for (const f of this.floaters) {
      f.mesh.rotation.x += 0.004 * f.speed * motion;
      f.mesh.rotation.y += 0.006 * f.speed * motion;
      f.mesh.position.x = f.base.x + Math.sin(t * f.drift + f.base.z) * 0.35 * motion;
      f.mesh.position.y =
        f.base.y +
        Math.cos(t * f.speed + f.base.x) * 0.4 * motion -
        this.scrollProgress * 2.2;
      f.mesh.position.z = f.base.z + Math.sin(t * 0.2 + f.base.y) * 0.2;
    }

    this.particles.rotation.y = t * 0.02 * motion;
    this.particles.position.y = -this.scrollProgress * 1.5;

    this.camera.position.x = this.mouse.x * 0.35;
    this.camera.position.y = 0.2 + this.mouse.y * 0.2 - this.scrollProgress * 0.4;
    this.camera.lookAt(0.6, knotY * 0.35, -0.5);

    this.renderer.render(this.scene, this.camera);
    this.raf = requestAnimationFrame(this.tick);
  };

  private disposeScene(): void {
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments || obj instanceof THREE.Points) {
        obj.geometry.dispose();
        const mat = obj.material;
        if (Array.isArray(mat)) {
          mat.forEach((m) => m.dispose());
        } else {
          mat.dispose();
        }
      }
    });
    this.renderer.dispose();
  }
}
