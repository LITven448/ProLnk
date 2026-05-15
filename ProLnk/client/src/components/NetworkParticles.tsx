/**
 * NetworkParticles — Three.js particle network for hero background.
 * Renders a living web of nodes and connections that react to mouse movement.
 * Represents the ProLnk partner network visually.
 */
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Individual particle node ─────────────────────────────────────────────────
function ParticleNetwork({ count = 120, mouse }: { count?: number; mouse: React.MutableRefObject<[number, number]> }) {
  const meshRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const { size } = useThree();

  // Generate initial positions
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      vel[i * 3]     = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return [pos, vel];
  }, [count]);

  // Line geometry for connections
  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);
  const lineColors = useMemo(() => new Float32Array(count * count * 6), [count]);
  const linePositions = useMemo(() => new Float32Array(count * count * 6), [count]);

  useEffect(() => {
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
  }, [lineGeometry, linePositions, lineColors]);

  useFrame((state) => {
    if (!meshRef.current || !linesRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;

    const mx = mouse.current[0] * 6;
    const my = mouse.current[1] * 4;

    // Update positions
    for (let i = 0; i < count; i++) {
      posArr[i * 3]     += velocities[i * 3];
      posArr[i * 3 + 1] += velocities[i * 3 + 1];
      posArr[i * 3 + 2] += velocities[i * 3 + 2];

      // Mouse repulsion
      const dx = posArr[i * 3] - mx;
      const dy = posArr[i * 3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        posArr[i * 3]     += dx / dist * 0.02;
        posArr[i * 3 + 1] += dy / dist * 0.02;
      }

      // Boundary wrapping
      if (posArr[i * 3] > 12)  posArr[i * 3] = -12;
      if (posArr[i * 3] < -12) posArr[i * 3] = 12;
      if (posArr[i * 3 + 1] > 7)  posArr[i * 3 + 1] = -7;
      if (posArr[i * 3 + 1] < -7) posArr[i * 3 + 1] = 7;
    }
    posAttr.needsUpdate = true;

    // Draw connection lines between nearby nodes
    let lineIdx = 0;
    const connectionDist = 3.5;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = posArr[i * 3] - posArr[j * 3];
        const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
        const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < connectionDist) {
          const alpha = 1 - d / connectionDist;
          // Gold color with varying opacity
          const r = 0.96, g = 0.77, b = 0.09;
          linePositions[lineIdx]     = posArr[i * 3];
          linePositions[lineIdx + 1] = posArr[i * 3 + 1];
          linePositions[lineIdx + 2] = posArr[i * 3 + 2];
          linePositions[lineIdx + 3] = posArr[j * 3];
          linePositions[lineIdx + 4] = posArr[j * 3 + 1];
          linePositions[lineIdx + 5] = posArr[j * 3 + 2];
          lineColors[lineIdx]     = r * alpha * 0.6;
          lineColors[lineIdx + 1] = g * alpha * 0.6;
          lineColors[lineIdx + 2] = b * alpha * 0.3;
          lineColors[lineIdx + 3] = r * alpha * 0.6;
          lineColors[lineIdx + 4] = g * alpha * 0.6;
          lineColors[lineIdx + 5] = b * alpha * 0.3;
          lineIdx += 6;
        }
      }
    }
    // Zero out remaining
    for (let k = lineIdx; k < linePositions.length; k++) linePositions[k] = 0;

    const linePos = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const lineCol = linesRef.current.geometry.attributes.color as THREE.BufferAttribute;
    (linePos.array as Float32Array).set(linePositions);
    (lineCol.array as Float32Array).set(lineColors);
    linePos.needsUpdate = true;
    lineCol.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIdx / 3);
  });

  return (
    <>
      {/* Nodes */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#F5C518"
          sizeAttenuation
          transparent
          opacity={0.7}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={1} />
      </lineSegments>
    </>
  );
}

// ─── Floating glowing orbs ─────────────────────────────────────────────────────
function GlowOrbs() {
  const orbsRef = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!orbsRef.current) return;
    orbsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    orbsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
  });

  const orbs = useMemo(() => [
    { pos: [-5, 2, -4] as [number,number,number], scale: 1.2, color: "#F5C518", opacity: 0.06 },
    { pos: [5, -1, -3] as [number,number,number], scale: 0.8, color: "#6366F1", opacity: 0.05 },
    { pos: [0, -3, -5] as [number,number,number], scale: 1.5, color: "#00B5B8", opacity: 0.04 },
  ], []);

  return (
    <group ref={orbsRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.pos}>
          <sphereGeometry args={[orb.scale, 32, 32]} />
          <meshBasicMaterial color={orb.color} transparent opacity={orb.opacity} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────
export default function NetworkParticles() {
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 75 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <NetworkParticles mouse={mouse} count={100} />
      <GlowOrbs />
    </Canvas>
  );
}
