import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/* "Scuba Diver" by turelljc, CC BY 4.0 (credited in the footer). The procedural diver stands in until it loads. */
export const DIVER_MODEL_URL = "/scuba_diver/scene.gltf";

/*
  The studio's optics, built from geometry: glass lens elements, matte
  mounts and one electric-blue ring, drifting in a pale room. The camera
  leans with the pointer, the cluster turns with the scroll. Everything is
  procedural; no model files are loaded.
*/

export type Scene3D = {
  setPointer: (x: number, y: number) => void;
  setScroll: (p: number) => void;
  setVisible: (v: boolean) => void;
  dispose: () => void;
};

const PALE = 0xf6f6fc;
const SLATE = 0xa9afd8;
const BLUE = 0x2a3cff;

function lensGeometry(radius: number, thickness: number) {
  // A biconvex lens: two shallow spherical caps joined at the rim.
  const pts: THREE.Vector2[] = [];
  const n = 24;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const r = Math.sin(t * Math.PI) * radius;
    const y = (t - 0.5) * thickness * Math.sin(t * Math.PI) ** 0.25;
    pts.push(new THREE.Vector2(Math.max(r, 0.001), y));
  }
  return new THREE.LatheGeometry(pts, 64);
}

export function createScene(canvas: HTMLCanvasElement, opts: { ground: number; light?: boolean } ): Scene3D {
  const mobile = window.matchMedia("(max-width: 720px)").matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
  renderer.setClearColor(opts.ground, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(opts.ground, 10, 22);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
  camera.position.set(0, 0, 11);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;

  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(4, 6, 6);
  scene.add(key, new THREE.HemisphereLight(0xffffff, 0xc9ccdf, 0.8));

  const glass = new THREE.MeshPhysicalMaterial({
    color: 0xdfe6ff,
    roughness: 0.04,
    metalness: 0,
    transmission: mobile ? 0 : 0.9,
    opacity: mobile ? 0.55 : 1,
    transparent: mobile,
    thickness: 2.2,
    ior: 1.52,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    envMapIntensity: 1.3,
    specularIntensity: 1,
  });
  const matte = new THREE.MeshStandardMaterial({ color: PALE, roughness: 0.55, metalness: 0 });
  const slate = new THREE.MeshStandardMaterial({ color: SLATE, roughness: 0.4, metalness: 0.05 });
  const blue = new THREE.MeshStandardMaterial({ color: BLUE, roughness: 0.28, metalness: 0 });

  const group = new THREE.Group();
  scene.add(group);

  type Drift = { mesh: THREE.Mesh; base: THREE.Vector3; spin: THREE.Vector3; phase: number; amp: number };
  const drifts: Drift[] = [];
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const place = (mesh: THREE.Mesh, spread = 1) => {
    const base = new THREE.Vector3((rnd() - 0.5) * 9 * spread, (rnd() - 0.5) * 5 * spread, (rnd() - 0.5) * 5);
    mesh.position.copy(base);
    mesh.rotation.set(rnd() * Math.PI, rnd() * Math.PI, rnd() * Math.PI);
    drifts.push({ mesh, base, spin: new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).multiplyScalar(0.25), phase: rnd() * Math.PI * 2, amp: 0.15 + rnd() * 0.25 });
    group.add(mesh);
  };

  const lensBig = lensGeometry(1.5, 0.55);
  const lensSmall = lensGeometry(0.9, 0.4);
  const count = mobile ? 0.6 : 1;
  for (let i = 0; i < Math.round(4 * count); i++) place(new THREE.Mesh(i % 2 ? lensBig : lensSmall, glass));
  for (let i = 0; i < Math.round(5 * count); i++) place(new THREE.Mesh(new THREE.CapsuleGeometry(0.28 + rnd() * 0.2, 0.9 + rnd() * 1.2, 8, 24), i % 3 ? matte : slate));
  for (let i = 0; i < 3; i++) place(new THREE.Mesh(new THREE.TorusGeometry(0.9 + rnd() * 0.6, 0.16, 32, 96), i === 0 ? blue : matte));
  for (let i = 0; i < Math.round(3 * count); i++) place(new THREE.Mesh(new THREE.SphereGeometry(0.32 + rnd() * 0.25, 48, 32), i === 1 ? blue : matte));
  const hero = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.5, 72), slate);
  place(hero, 0.4);

  const target = new THREE.Vector2(0, 0);
  const pointer = new THREE.Vector2(0, 0);
  let scroll = 0;
  let scrollEased = 0;
  let visible = true;
  let alive = true;
  let raf = 0;

  const resize = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const clock = new THREE.Clock();
  const loop = () => {
    if (!alive) return;
    raf = requestAnimationFrame(loop);
    if (!visible || document.hidden) return;
    const t = clock.getElapsedTime();
    pointer.lerp(target, 0.06);
    scrollEased += (scroll - scrollEased) * 0.08;

    for (const d of drifts) {
      d.mesh.rotation.x += d.spin.x * 0.01;
      d.mesh.rotation.y += d.spin.y * 0.01;
      d.mesh.rotation.z += d.spin.z * 0.01;
      d.mesh.position.y = d.base.y + Math.sin(t * 0.6 + d.phase) * d.amp;
      d.mesh.position.x = d.base.x + Math.cos(t * 0.4 + d.phase) * d.amp * 0.5;
    }
    group.rotation.y = pointer.x * 0.22 + scrollEased * 0.9;
    group.rotation.x = -pointer.y * 0.16 + scrollEased * 0.25;
    camera.position.x = pointer.x * 0.6;
    camera.position.y = pointer.y * 0.4 - scrollEased * 1.2;
    camera.lookAt(0, -scrollEased * 0.6, 0);
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(loop);

  return {
    setPointer: (x, y) => target.set(x, y),
    setScroll: (p) => {
      scroll = p;
    },
    setVisible: (v) => {
      visible = v;
    },
    dispose: () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      group.traverse((o) => {
        if (o instanceof THREE.Mesh) o.geometry.dispose();
      });
      glass.dispose();
      matte.dispose();
      slate.dispose();
      blue.dispose();
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}

/* One lens element on a pale ground, turned by the scroll: the second and last 3D moment. */
export function createOrbit(canvas: HTMLCanvasElement, ground: number): Scene3D {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(ground, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 40);
  camera.position.set(0, 0, 7.5);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  scene.add(new THREE.HemisphereLight(0xffffff, 0xc9ccdf, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(3, 5, 6);
  scene.add(key);

  const mobile = window.matchMedia("(max-width: 720px)").matches;
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.05,
    transmission: mobile ? 0 : 0.96,
    opacity: mobile ? 0.6 : 1,
    transparent: mobile,
    thickness: 1.6,
    ior: 1.5,
    clearcoat: 1,
  });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.12, 32, 128), new THREE.MeshStandardMaterial({ color: BLUE, roughness: 0.3 }));
  const lens = new THREE.Mesh(lensGeometry(1.6, 0.6), glass);
  lens.rotation.x = Math.PI / 2;
  const group = new THREE.Group();
  group.add(lens, ring);
  scene.add(group);

  let scroll = 0;
  let eased = 0;
  const target = new THREE.Vector2();
  const pointer = new THREE.Vector2();
  let visible = true;
  let alive = true;
  let raf = 0;

  const resize = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const clock = new THREE.Clock();
  const loop = () => {
    if (!alive) return;
    raf = requestAnimationFrame(loop);
    if (!visible || document.hidden) return;
    const t = clock.getElapsedTime();
    eased += (scroll - eased) * 0.08;
    pointer.lerp(target, 0.06);
    group.rotation.y = eased * Math.PI * 1.2 + pointer.x * 0.3 + t * 0.05;
    group.rotation.x = 0.35 + eased * 0.6 - pointer.y * 0.2;
    group.position.y = Math.sin(t * 0.7) * 0.08;
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(loop);

  return {
    setPointer: (x, y) => target.set(x, y),
    setScroll: (p) => {
      scroll = p;
    },
    setVisible: (v) => {
      visible = v;
    },
    dispose: () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      lens.geometry.dispose();
      ring.geometry.dispose();
      glass.dispose();
      (ring.material as THREE.Material).dispose();
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}

/*
  The dive. A stylised diver, built from the same matte capsules as the
  hero, descends from a bright surface to a dark seabed as the page
  scrolls; bubbles rise, the light fades with depth, and the blue ring
  waits on the sand. Procedural throughout; no model files are loaded.
*/
export function createDive(canvas: HTMLCanvasElement): Scene3D {
  const mobile = window.matchMedia("(max-width: 720px)").matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const surface = new THREE.Color(0xc7d4ff);
  const deep = new THREE.Color(0x111c4f);
  const water = surface.clone();
  const scene = new THREE.Scene();
  scene.background = water;
  scene.fog = new THREE.FogExp2(water.getHex(), 0.055);

  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 80);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  const sun = new THREE.DirectionalLight(0xffffff, 1.8);
  sun.position.set(2, 10, 4);
  const fill = new THREE.HemisphereLight(0xdfe6ff, 0x1b2a6b, 0.9);
  scene.add(sun, fill);

  const white = new THREE.MeshStandardMaterial({ color: 0xf6f6fc, roughness: 0.5 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x1a1d2e, roughness: 0.35 });
  const slate = new THREE.MeshStandardMaterial({ color: 0xa9afd8, roughness: 0.4 });
  const blue = new THREE.MeshStandardMaterial({ color: 0x2a3cff, roughness: 0.3 });

  // The diver, head-down, arms forward, built along its own -Y axis.
  const diver = new THREE.Group();
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 0.9, 8, 24), white);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 24), white);
  head.position.y = -0.95;
  const mask = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.08, 32), dark);
  mask.rotation.x = Math.PI / 2;
  mask.position.set(0, -1.0, 0.26);
  const tank = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.8, 8, 20), slate);
  tank.position.set(0, 0.05, -0.42);
  const valve = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.03, 12, 32), dark);
  valve.position.set(0, 0.55, -0.42);
  const armL = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.85, 6, 16), white);
  const armR = armL.clone();
  armL.position.set(-0.3, -1.25, 0.05);
  armR.position.set(0.3, -1.25, 0.05);
  armL.rotation.z = 0.12;
  armR.rotation.z = -0.12;
  const legL = new THREE.Group();
  const legR = new THREE.Group();
  for (const [leg, x] of [
    [legL, -0.17],
    [legR, 0.17],
  ] as const) {
    const thigh = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.95, 6, 16), white);
    thigh.position.y = -0.55;
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.7, 0.04), dark);
    fin.position.set(0, -1.3, 0.05);
    leg.add(thigh, fin);
    leg.position.set(x, 0.55, 0);
    leg.rotation.x = Math.PI;
  }
  const rig = new THREE.Group();
  rig.add(torso, head, mask, tank, valve, armL, armR, legL, legR);
  diver.add(rig);
  diver.rotation.z = 0.08;
  scene.add(diver);

  // A real diver model replaces the capsules when one is present. The
  // model is normalised to the same height, turned head-down, and its
  // first animation clip (a swim, usually) is played.
  let mixer: THREE.AnimationMixer | null = null;
  let hasModel = false;
  let modelHolder: THREE.Group | null = null;
  new GLTFLoader().load(
    DIVER_MODEL_URL,
    (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const centre = box.getCenter(new THREE.Vector3());
      const s = 2.8 / Math.max(size.y, 0.001);
      model.position.sub(centre).multiplyScalar(s);
      model.scale.setScalar(s);
      const holder = new THREE.Group();
      holder.add(model);
      // The model stands upright facing +Z. Turn it head-down, face toward the camera side.
      holder.rotation.set(0, -0.7, Math.PI);
      modelHolder = holder;
      model.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          const m = o.material as THREE.MeshStandardMaterial;
          if ("envMapIntensity" in m) m.envMapIntensity = 0.6;
          o.castShadow = false;
        }
      });
      if (gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();
      }
      rig.visible = false;
      diver.add(holder);
      hasModel = true;
    },
    undefined,
    () => {
      /* no model at the path: the procedural diver stays */
    },
  );

  // The surface, seen from below: a sheet of slow waves that catches the light.
  const surfGeo = new THREE.PlaneGeometry(90, 90, 48, 48);
  const surfMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.15, metalness: 0, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false });
  const surf = new THREE.Mesh(surfGeo, surfMat);
  surf.rotation.x = Math.PI / 2;
  surf.position.y = 4.2;
  scene.add(surf);
  const surfBase = (surfGeo.attributes.position as THREE.BufferAttribute).array.slice() as Float32Array;

  // Caustics on the sand: a small canvas of drifting light rings, redrawn a few times a second.
  const cauCanvas = document.createElement("canvas");
  cauCanvas.width = cauCanvas.height = 256;
  const cg = cauCanvas.getContext("2d");
  const cauTex = new THREE.CanvasTexture(cauCanvas);
  cauTex.wrapS = cauTex.wrapT = THREE.RepeatWrapping;
  cauTex.repeat.set(6, 6);
  let cauTick = 0;
  const drawCaustics = (t: number) => {
    if (!cg) return;
    cg.fillStyle = "#6c74a8";
    cg.fillRect(0, 0, 256, 256);
    cg.strokeStyle = "rgba(255,255,255,0.55)";
    cg.lineWidth = 3;
    for (let i = 0; i < 18; i++) {
      const x = 128 + Math.sin(t * 0.7 + i * 1.9) * 110;
      const y = 128 + Math.cos(t * 0.5 + i * 2.3) * 110;
      const r = 28 + Math.sin(t + i) * 12;
      cg.beginPath();
      cg.ellipse(x, y, r, r * 0.7, i, 0, Math.PI * 2);
      cg.stroke();
    }
    cauTex.needsUpdate = true;
  };
  drawCaustics(0);

  // Drifting particulate: tiny, slow, everywhere.
  const M = mobile ? 400 : 900;
  const dust = new Float32Array(M * 3);
  for (let i = 0; i < M; i++) {
    dust[i * 3] = (Math.random() - 0.5) * 24;
    dust[i * 3 + 1] = -Math.random() * 46 + 4;
    dust[i * 3 + 2] = (Math.random() - 0.5) * 16;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dust, 3));
  const dustMat = new THREE.PointsMaterial({ color: 0xdfe6ff, size: 0.05, transparent: true, opacity: 0.45, depthWrite: false });
  scene.add(new THREE.Points(dustGeo, dustMat));

  // Bubbles: a column of points that rise and wrap.
  const N = mobile ? 180 : 360;
  const pos = new Float32Array(N * 3);
  const vel = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 10;
    pos[i * 3 + 1] = -Math.random() * 44 + 3;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    vel[i] = 0.4 + Math.random() * 0.9;
  }
  const bubbleGeo = new THREE.BufferGeometry();
  bubbleGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  // A round sprite for the bubbles, drawn once.
  const dot = document.createElement("canvas");
  dot.width = dot.height = 64;
  const g = dot.getContext("2d");
  if (g) {
    const grad = g.createRadialGradient(32, 32, 4, 32, 32, 30);
    grad.addColorStop(0, "rgba(255,255,255,0.9)");
    grad.addColorStop(0.6, "rgba(255,255,255,0.35)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
  }
  const dotTex = new THREE.CanvasTexture(dot);
  const bubbleMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.16, map: dotTex, transparent: true, opacity: 0.7, sizeAttenuation: true, depthWrite: false });
  const bubbles = new THREE.Points(bubbleGeo, bubbleMat);
  scene.add(bubbles);

  // Light shafts near the surface, fading with depth.
  const rays = new THREE.Group();
  const rayMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1, depthWrite: false, side: THREE.DoubleSide });
  for (let i = 0; i < 7; i++) {
    const ray = new THREE.Mesh(new THREE.PlaneGeometry(0.5 + Math.random() * 0.8, 26), rayMat);
    ray.position.set((Math.random() - 0.5) * 14, -8, -3 - Math.random() * 4);
    ray.rotation.z = (Math.random() - 0.5) * 0.3;
    rays.add(ray);
  }
  scene.add(rays);

  // The seabed: sand, a few rocks, and the ring resting on it.
  const floorY = -40;
  const sandMat = new THREE.MeshStandardMaterial({ color: 0xb9bde0, roughness: 1, map: cauTex });
  const sandGeo = new THREE.CircleGeometry(60, 64);
  const sand = new THREE.Mesh(sandGeo, sandMat);
  sand.rotation.x = -Math.PI / 2;
  sand.position.y = floorY;
  scene.add(sand);
  const rockGeo = new THREE.DodecahedronGeometry(1, 1);
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x6f76a8, roughness: 0.95, flatShading: true });
  for (let i = 0; i < 16; i++) {
    const rock = new THREE.Mesh(rockGeo, rockMat);
    const s = 0.5 + Math.random() * 1.6;
    rock.scale.set(s, s * 0.55, s * (0.7 + Math.random() * 0.6));
    rock.position.set((Math.random() - 0.5) * 30, floorY + s * 0.25, (Math.random() - 0.5) * 18 - 4);
    rock.rotation.y = Math.random() * Math.PI;
    scene.add(rock);
  }
  // Kelp: thin tapered blades that sway.
  const kelp: THREE.Mesh[] = [];
  const kelpMat = new THREE.MeshStandardMaterial({ color: 0x3f5a7a, roughness: 0.8 });
  const kelpGeo = new THREE.ConeGeometry(0.12, 4, 6, 4, true);
  kelpGeo.translate(0, 2, 0);
  for (let i = 0; i < 22; i++) {
    const blade = new THREE.Mesh(kelpGeo, kelpMat);
    blade.position.set((Math.random() - 0.5) * 26, floorY, (Math.random() - 0.5) * 16 - 5);
    blade.scale.y = 0.6 + Math.random() * 0.9;
    blade.userData.phase = Math.random() * Math.PI * 2;
    kelp.push(blade);
    scene.add(blade);
  }
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.12, 24, 96), blue);
  ring.position.set(-1.2, floorY + 1.45, 1.5);
  ring.rotation.y = 0.5;
  scene.add(ring);

  let scroll = 0;
  let eased = 0;
  const target = new THREE.Vector2();
  const pointer = new THREE.Vector2();
  let visible = true;
  let alive = true;
  let raf = 0;

  const resize = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const clock = new THREE.Clock();
  const loop = () => {
    if (!alive) return;
    raf = requestAnimationFrame(loop);
    if (!visible || document.hidden) return;
    const dt = Math.min(clock.getDelta() || 0.016, 0.05);
    const t = clock.elapsedTime;
    eased += (scroll - eased) * 0.07;
    pointer.lerp(target, 0.05);

    const depth = eased * 41;
    const y = 2 - depth;
    const settle = THREE.MathUtils.smoothstep(eased, 0.88, 1);
    diver.position.set(Math.sin(t * 0.5) * 0.3, Math.max(y, floorY + 1.9), Math.cos(t * 0.4) * 0.2);
    diver.rotation.x = THREE.MathUtils.lerp(0.15 + Math.sin(t * 0.7) * 0.05, -Math.PI / 2 + 0.2, settle);
    diver.rotation.y = Math.sin(t * 0.3) * 0.15;
    const kick = Math.sin(t * 3.2) * 0.35 * (1 - settle);
    legL.rotation.x = Math.PI + kick;
    legR.rotation.x = Math.PI - kick;
    if (mixer) mixer.update(dt * (hasModel ? 1 - settle * 0.7 : 1));

    const p = bubbleGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < N; i++) {
      let by = p.getY(i) + vel[i] * dt * 2;
      let bx = p.getX(i) + Math.sin(t * 2 + i) * 0.003;
      if (by > 3) {
        by = diver.position.y - 1 - Math.random() * 20;
        bx = diver.position.x + (Math.random() - 0.5) * 6;
      }
      p.setXY(i, bx, by);
    }
    p.needsUpdate = true;

    water.copy(surface).lerp(deep, Math.min(1, eased * 1.25));
    (scene.fog as THREE.FogExp2).color.copy(water);
    (scene.fog as THREE.FogExp2).density = 0.045 + eased * 0.02;
    rayMat.opacity = 0.12 * (1 - Math.min(1, eased * 1.6));
    sun.intensity = 1.8 - eased * 1.1;
    rays.rotation.z = Math.sin(t * 0.15) * 0.04;

    // Waves on the surface sheet, kelp swaying, caustics drifting.
    const sp = surfGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < sp.count; i++) {
      const x = surfBase[i * 3];
      const yy = surfBase[i * 3 + 1];
      sp.setZ(i, Math.sin(x * 0.35 + t * 0.9) * 0.25 + Math.cos(yy * 0.28 + t * 0.7) * 0.2);
    }
    sp.needsUpdate = true;
    for (const blade of kelp) blade.rotation.z = Math.sin(t * 0.8 + (blade.userData.phase as number)) * 0.18;
    if (++cauTick % 4 === 0) drawCaustics(t);
    if (modelHolder) modelHolder.rotation.x = Math.sin(t * 1.1) * 0.06;

    camera.position.set(pointer.x * 1.6 + 2.4, diver.position.y + 0.8 + pointer.y * 0.8 + settle * 1.2, 10.5 - settle * 2);
    camera.lookAt(diver.position.x - 0.5, diver.position.y - 1.4 - settle * 0.8, 0);
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(loop);

  return {
    setPointer: (x, y) => target.set(x, y),
    setScroll: (p) => {
      scroll = p;
    },
    setVisible: (v) => {
      visible = v;
    },
    dispose: () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Points) o.geometry.dispose();
      });
      [white, dark, slate, blue, rayMat, sandMat, bubbleMat, surfMat, dustMat, rockMat, kelpMat].forEach((m) => m.dispose());
      dotTex.dispose();
      cauTex.dispose();
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
