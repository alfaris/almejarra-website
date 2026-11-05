import { useEffect, useRef, type RefObject } from 'react'
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
} from 'three'

// Plain three.js with named imports (rather than a React renderer) so the bundle only carries
// the pieces this scene uses.

// Seeded PRNG so the galaxy is deterministic.
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aScale;
  attribute vec3 aColor;
  varying vec3 vColor;

  void main() {
    // Differential rotation in the galaxy's own space, so it spins around its core even when
    // the galaxy is moved off-centre: inner stars orbit faster than outer ones.
    vec3 p = position;
    float angle = atan(p.x, p.z);
    float dist = length(p.xz);
    angle += (1.0 / (dist + 0.6)) * uTime * 0.35;
    p.x = cos(angle) * dist;
    p.z = sin(angle) * dist;

    vec4 modelPosition = modelMatrix * vec4(p, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = uSize * aScale * (1.0 / -viewPosition.z);
    vColor = aColor;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float strength = pow(1.0 - clamp(d * 2.0, 0.0, 1.0), 3.0);
    gl_FragColor = vec4(vColor * strength, strength);
  }
`

function galaxyPoints(count: number, pixelRatio: number) {
  const radius = 6
  const branches = 4
  const spin = 1.1
  const randomness = 0.32
  const power = 3
  const inside = new Color('#ffd27a')
  const mid = new Color('#c13bbb')
  const outside = new Color('#3fb6ff')

  const pos = new Float32Array(count * 3)
  const col = new Float32Array(count * 3)
  const scl = new Float32Array(count)
  const c = new Color()
  const random = mulberry32(2015)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const r = Math.pow(random(), 1.4) * radius
    const branchAngle = ((i % branches) / branches) * Math.PI * 2
    const spinAngle = r * spin
    const rnd = () => Math.pow(random(), power) * (random() < 0.5 ? 1 : -1) * randomness * (r + 0.4)

    pos[i3] = Math.cos(branchAngle + spinAngle) * r + rnd()
    pos[i3 + 1] = rnd() * 0.45
    pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + rnd()

    const t = r / radius
    if (t < 0.35) c.copy(inside).lerp(mid, t / 0.35)
    else c.copy(mid).lerp(outside, (t - 0.35) / 0.65)
    col[i3] = c.r
    col[i3 + 1] = c.g
    col[i3 + 2] = c.b

    scl[i] = random() * 0.9 + 0.1
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(pos, 3))
  geometry.setAttribute('aColor', new BufferAttribute(col, 3))
  geometry.setAttribute('aScale', new BufferAttribute(scl, 1))
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: { uTime: { value: 0 }, uSize: { value: 30 * pixelRatio } },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })
  const points = new Points(geometry, material)
  points.rotation.set(0.18, 0, 0.08)
  return { points, material }
}

/** The logo's ring, floating at the galactic core. */
function coreRing(segments: number) {
  const ring = new Group()
  ring.position.set(0, 0.55, 0)
  ring.rotation.set(0.35, 0, -0.2)

  ring.add(
    new Mesh(
      new TorusGeometry(0.55, 0.22, segments / 2.5, segments),
      new MeshStandardMaterial({ color: '#8e2a8c', emissive: '#5a0f58', roughness: 0.35, metalness: 0.25 }),
    ),
  )
  const blue = new Mesh(new TorusGeometry(0.55, 0.205, 12, segments, Math.PI * 1.2), new MeshBasicMaterial({ color: '#3fb6ff', transparent: true, opacity: 0.85 }))
  blue.rotation.z = 0.6
  blue.scale.setScalar(1.04)
  const red = new Mesh(new TorusGeometry(0.55, 0.2, 12, segments, Math.PI * 0.8), new MeshBasicMaterial({ color: '#ff4d4d', transparent: true, opacity: 0.85 }))
  red.rotation.z = 2.4
  red.scale.setScalar(1.045)
  ring.add(blue, red, new PointLight('#ffd27a', 6, 4))
  return ring
}

/** Distant background stars on a sphere shell. */
function starfield(count: number) {
  const random = mulberry32(42)
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = 25 + random() * 25
    const theta = random() * Math.PI * 2
    const phi = Math.acos(2 * random() - 1)
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    pos[i * 3 + 2] = r * Math.cos(phi)
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(pos, 3))
  return new Points(geometry, new PointsMaterial({ size: 0.12, color: '#ffffff', transparent: true, opacity: 0.7, depthWrite: false, sizeAttenuation: true }))
}

export default function GalaxyScene({
  active,
  reduced,
  compact,
  side = 0,
  anchor,
  onRingHover,
}: {
  active: boolean
  reduced: boolean
  compact: boolean
  /** Which side to push the galaxy to, opposite the headline: -1 left, 1 right, 0 centred. */
  side?: -1 | 0 | 1
  /** Gets the ring's on-screen centre and radius every frame, as --ring-x, --ring-y and --ring-r. */
  anchor?: RefObject<HTMLDivElement | null>
  /** Called when the pointer moves onto or off the ring (or a tap toggles it on touch screens). */
  onRingHover?: (on: boolean) => void
}) {
  const host = useRef<HTMLDivElement>(null)
  const activeRef = useRef(active)
  const hoverCb = useRef(onRingHover)

  useEffect(() => {
    hoverCb.current = onRingHover
  }, [onRingHover])

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const el = host.current
    if (!el) return

    const renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' })
    // Phones get a lighter scene: fewer stars, simpler ring, lower resolution. It reads the same at that size.
    const pixelRatio = Math.min(window.devicePixelRatio, compact ? 1 : 1.75)
    renderer.setPixelRatio(pixelRatio)
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.domElement.style.display = 'block'
    el.appendChild(renderer.domElement)

    const scene = new Scene()
    const camera = new PerspectiveCamera(compact ? 70 : 55, 1, 0.1, 200)
    camera.position.set(0, 3.2, 7.5)

    scene.add(new AmbientLight('#ffffff', 0.6))
    const sun = new DirectionalLight('#ffffff', 1.4)
    sun.position.set(3, 4, 2)
    scene.add(sun)

    const galaxy = new Group()
    galaxy.position.set(0, compact ? 2.4 : 0.9, compact ? -1 : 0)
    galaxy.scale.setScalar(compact ? 0.75 : 1)
    const { points, material: galaxyMaterial } = galaxyPoints(compact ? 11000 : 42000, pixelRatio)
    const ring = coreRing(compact ? 64 : 128)
    galaxy.add(points, ring)
    scene.add(galaxy)

    const stars = starfield(compact ? 700 : 2500)
    scene.add(stars)

    const resize = () => {
      const { width, height } = el.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      // Keep the galaxy at the same share of the screen width on any aspect ratio.
      const halfWidth = Math.tan((camera.fov * Math.PI) / 360) * camera.position.length() * camera.aspect
      galaxy.position.x = side * halfWidth * 0.4
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    // The ring's position on screen, in viewport pixels, refreshed every frame.
    const ringScreen = { x: 0, y: 0, r: 0 }
    const ringCentre = new Vector3()
    const ringEdge = new Vector3()
    // World point → pixels within the canvas.
    const project = (v: Vector3, width: number, height: number) => {
      v.project(camera)
      return { x: ((v.x + 1) / 2) * width, y: ((1 - v.y) / 2) * height }
    }
    let hovered = false
    const setHovered = (on: boolean) => {
      if (on === hovered) return
      hovered = on
      document.body.style.cursor = on ? 'pointer' : ''
      hoverCb.current?.(on)
    }
    const overRing = (x: number, y: number, target: EventTarget | null) => {
      if (!activeRef.current || ringScreen.r === 0) return false
      // Links and buttons keep their own behaviour, and an open lightbox hides the ring.
      if (target instanceof Element && target.closest('a,button,[data-ring-block]')) return false
      return Math.hypot(x - ringScreen.x, y - ringScreen.y) < ringScreen.r * 1.25
    }
    // The mouse's last position, so hover is checked again as the ring moves under a still pointer (scrolling).
    const mouse = { x: 0, y: 0, inside: false }
    const onMouseLeave = () => {
      mouse.inside = false
      setHovered(false)
    }

    // Pointer in -1..1, for a gentle parallax.
    const pointer = { x: 0, y: 0 }
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
      if (e.pointerType !== 'mouse') return
      Object.assign(mouse, { x: e.clientX, y: e.clientY, inside: true })
      setHovered(overRing(e.clientX, e.clientY, e.target))
    }
    // Touch screens have no hover: a tap on the ring opens the photos, a tap anywhere else closes them.
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return
      // A tap on one of the photos is not a tap away from the ring.
      if (e.target instanceof Element && e.target.closest('[data-ring-keep]')) return
      setHovered(overRing(e.clientX, e.clientY, e.target))
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    document.documentElement.addEventListener('mouseleave', onMouseLeave)

    const target = new Vector3()
    let last = performance.now()
    let elapsed = 0
    let frame = 0
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      const delta = Math.min((now - last) / 1000, 0.1)
      last = now
      // Skip work while the hero is off-screen or the tab is hidden, closing the photos first.
      if (!activeRef.current || document.hidden) {
        setHovered(false)
        return
      }
      elapsed += delta

      // Hovered, the ring swells a little and slows down.
      const grow = 1 + (hovered ? 0.15 : 0)
      ring.scale.setScalar(ring.scale.x + (grow - ring.scale.x) * (1 - Math.exp(-delta * 8)))

      if (!reduced) {
        galaxyMaterial.uniforms.uTime.value += delta
        ring.rotation.y += delta * (hovered ? 0.08 : 0.25)
        ring.position.y = 0.55 + Math.sin(elapsed * 0.8) * 0.06
        stars.rotation.y += delta * 0.01
      }

      // Mouse parallax plus a scroll-driven dolly.
      const progress = Math.min(window.scrollY / window.innerHeight, 1.2)
      const px = reduced ? 0 : pointer.x * 0.6
      const py = reduced ? 0 : pointer.y * 0.35
      target.set(px, 3.2 - progress * 1.6 + py, 7.5 - progress * 3)
      camera.position.lerp(target, 1 - Math.exp(-delta * 3))
      camera.lookAt(0, 0.2 - progress * 0.4, 0)

      renderer.render(scene, camera)

      // Track the ring on screen: its centre, and a point on its outer edge for the radius.
      const rect = el.getBoundingClientRect()
      ring.getWorldPosition(ringCentre)
      ringEdge.set(0.8 * ring.scale.x * galaxy.scale.x, 0, 0).applyQuaternion(camera.quaternion).add(ringCentre)
      const c = project(ringCentre, rect.width, rect.height)
      const edge = project(ringEdge, rect.width, rect.height)
      ringScreen.x = rect.left + c.x
      ringScreen.y = rect.top + c.y
      ringScreen.r = Math.hypot(edge.x - c.x, edge.y - c.y)
      const a = anchor?.current
      if (a) {
        a.style.setProperty('--ring-x', `${c.x}px`)
        a.style.setProperty('--ring-y', `${c.y}px`)
        a.style.setProperty('--ring-r', `${ringScreen.r}px`)
      }
      // Scrolling moves the ring without a pointermove: check the hover again against the still mouse.
      if (mouse.inside) setHovered(overRing(mouse.x, mouse.y, document.elementFromPoint(mouse.x, mouse.y)))
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerdown', onPointerDown)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      setHovered(false)
      scene.traverse((obj) => {
        const mesh = obj as Mesh
        mesh.geometry?.dispose()
        const mat = mesh.material
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
        else mat?.dispose()
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [reduced, compact, side, anchor])

  return <div ref={host} className="size-full" aria-hidden />
}
