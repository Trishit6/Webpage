import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, Icosahedron, TorusKnot, Environment, ContactShadows } from '@react-three/drei'
import type { Mesh, Group } from 'three'

/** Slowly rotating wireframe icosahedron — the centerpiece. */
function CoreShape() {
  const mesh = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.x += delta * 0.2
    mesh.current.rotation.y += delta * 0.35
    // Gentle mouse parallax
    mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <Icosahedron
        ref={mesh}
        args={[1.4, 1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? '#8b5cf6' : '#6366f1'}
          emissive={hovered ? '#4c1d95' : '#1e1b4b'}
          emissiveIntensity={0.6}
          roughness={0.25}
          metalness={0.85}
          wireframe={false}
          flatShading
        />
      </Icosahedron>
    </Float>
  )
}

/** Orbiting rings around the core. */
function Rings() {
  const group = useRef<Group>(null)

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.z += delta * 0.15
    group.current.rotation.x = Math.PI / 2.6 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1
  })

  return (
    <group ref={group}>
      <mesh>
        <torusGeometry args={[2.4, 0.03, 16, 120]} />
        <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={1.4} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0.4, 0]}>
        <torusGeometry args={[3.0, 0.02, 16, 120]} />
        <meshStandardMaterial color="#f0abfc" emissive="#c026d3" emissiveIntensity={1.2} />
      </mesh>
    </group>
  )
}

/** Spinning knot accent in the background. */
function BackgroundKnot() {
  const mesh = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.x += delta * 0.1
    mesh.current.rotation.y += delta * 0.15
  })
  return (
    <mesh ref={mesh} position={[-4, 1.6, -5]} scale={0.9}>
      <torusKnotGeometry args={[1, 0.28, 160, 24]} />
      <meshStandardMaterial color="#312e81" roughness={0.3} metalness={0.9} flatShading />
    </mesh>
  )
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 2]}
      className="hero-canvas"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={80} color="#c4b5fd" />
        <pointLight position={[-5, -3, 3]} intensity={40} color="#f0abfc" />
        <spotLight position={[0, 8, 2]} angle={0.5} intensity={60} color="#ffffff" />

        <CoreShape />
        <Rings />
        <BackgroundKnot />

        <Stars radius={60} depth={40} count={2500} factor={4} saturation={0} fade speed={1} />
        <ContactShadows position={[0, -2.6, 0]} opacity={0.5} blur={2.5} far={4} />

        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
