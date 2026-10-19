import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Seeded PRNG so the galaxy is deterministic (and render stays pure).
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
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // Differential rotation: inner stars orbit faster than outer ones.
    float angle = atan(modelPosition.x, modelPosition.z);
    float dist = length(modelPosition.xz);
    angle += (1.0 / (dist + 0.6)) * uTime * 0.35;
    modelPosition.x = cos(angle) * dist;
    modelPosition.z = sin(angle) * dist;

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

function GalaxyPoints({ count, reduced }: { count: number; reduced: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null)
  const { gl } = useThree()

  const [positions, colors, scales] = useMemo(() => {
    const radius = 6
    const branches = 4
    const spin = 1.1
    const randomness = 0.32
    const power = 3
    const inside = new THREE.Color('#ffd27a')
    const mid = new THREE.Color('#c13bbb')
    const outside = new THREE.Color('#3fb6ff')

    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const scl = new Float32Array(count)
    const c = new THREE.Color()
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
    return [pos, col, scl]
  }, [count])

  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uSize: { value: 30 * gl.getPixelRatio() } }), [gl])

  useFrame((_, delta) => {
    if (material.current && !reduced) material.current.uniforms.uTime.value += delta
  })

  return (
    <points rotation={[0.18, 0, 0.08]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/** Distant background stars on a sphere shell. */
function Starfield({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
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
    return pos
  }, [count])
  useFrame((_, delta) => {
    if (ref.current && !reduced) ref.current.rotation.y += delta * 0.01
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#ffffff" transparent opacity={0.7} depthWrite={false} sizeAttenuation />
    </points>
  )
}

/** The logo's ring, floating at the galactic core. */
function CoreRing({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  useFrame((state, delta) => {
    if (!group.current || reduced) return
    group.current.rotation.y += delta * 0.25
    group.current.position.y = 0.55 + Math.sin(state.clock.elapsedTime * 0.8) * 0.06
  })
  return (
    <group ref={group} position={[0, 0.55, 0]} rotation={[0.35, 0, -0.2]}>
      <mesh>
        <torusGeometry args={[0.55, 0.22, 48, 128]} />
        <meshStandardMaterial color="#8e2a8c" emissive="#5a0f58" roughness={0.35} metalness={0.25} />
      </mesh>
      <mesh rotation={[0, 0, 0.6]} scale={1.04}>
        <torusGeometry args={[0.55, 0.205, 16, 128, Math.PI * 1.2]} />
        <meshBasicMaterial color="#3fb6ff" transparent opacity={0.85} />
      </mesh>
      <mesh rotation={[0, 0, 2.4]} scale={1.045}>
        <torusGeometry args={[0.55, 0.2, 16, 128, Math.PI * 0.8]} />
        <meshBasicMaterial color="#ff4d4d" transparent opacity={0.85} />
      </mesh>
      <pointLight color="#ffd27a" intensity={6} distance={4} />
    </group>
  )
}

/** Mouse parallax + scroll-driven dolly. */
function CameraRig({ reduced }: { reduced: boolean }) {
  const { camera, pointer } = useThree()
  const target = useMemo(() => new THREE.Vector3(), [])
  useFrame((_, delta) => {
    const progress = Math.min(window.scrollY / window.innerHeight, 1.2)
    const px = reduced ? 0 : pointer.x * 0.6
    const py = reduced ? 0 : pointer.y * 0.35
    target.set(px, 3.2 - progress * 1.6 + py, 7.5 - progress * 3)
    camera.position.lerp(target, 1 - Math.exp(-delta * 3))
    camera.lookAt(0, 0.2 - progress * 0.4, 0)
  })
  return null
}

export default function GalaxyScene({
  active,
  reduced,
  compact,
  offsetX = 0,
}: {
  active: boolean
  reduced: boolean
  compact: boolean
  /** Shifts the galaxy sideways so it sits opposite the headline. */
  offsetX?: number
}) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, compact ? 1.5 : 1.75]}
      camera={{ position: [0, 3.2, 7.5], fov: compact ? 70 : 55 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 2]} intensity={1.4} />
      <group position={[offsetX, compact ? 2.4 : 0, compact ? -1 : 0]} scale={compact ? 0.75 : 1}>
        <GalaxyPoints count={compact ? 18000 : 42000} reduced={reduced} />
        <CoreRing reduced={reduced} />
      </group>
      <Starfield count={compact ? 1200 : 2500} reduced={reduced} />
      <CameraRig reduced={reduced} />
    </Canvas>
  )
}
