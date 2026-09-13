import { useEffect, useRef, useState } from 'react';
import { Activity, Cpu, Shield, Zap } from 'lucide-react';

// 1. Pure Math 3D Wireframe Engine
function KineticShieldWireframe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let angle = 0;

    // Define the vertices of a 3D cube (The "Containment Core")
    const vertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1],  [1, -1, 1],  [1, 1, 1],  [-1, 1, 1]
    ];

    // Define which vertices connect to form the mesh edges
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Back face
      [4, 5], [5, 6], [6, 7], [7, 4], // Front face
      [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting edges
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const scale = 80;

      angle += 0.01;
      const sinA = Math.sin(angle);
      const cosA = Math.cos(angle);

      // Rotate and project 3D coordinates to 2D
      const projected = vertices.map(v => {
        // Rotate around Y axis
        let x = v[0] * cosA - v[2] * sinA;
        let z = v[0] * sinA + v[2] * cosA;
        let y = v[1];

        // Rotate around X axis (slight tilt)
        const tiltSin = Math.sin(0.5);
        const tiltCos = Math.cos(0.5);
        const ty = y * tiltCos - z * tiltSin;
        const tz = y * tiltSin + z * tiltCos;

        // Perspective divide
        const distance = 4;
        const zRatio = distance / (distance - tz);
        
        return {
          x: cx + x * scale * zRatio,
          y: cy + ty * scale * zRatio
        };
      });

      // Draw the mesh
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)'; // Cyan
      ctx.lineWidth = 1.5;
      
      edges.forEach(edge => {
        const p1 = projected[edge[0]];
        const p2 = projected[edge[1]];
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw vertex connection nodes
      projected.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-full h-64 bg-slate-900 rounded-lg border border-slate-700 dark:border-cyan-900/50 overflow-hidden flex items-center justify-center">
      <div className="absolute top-2 left-2 text-xs font-mono text-cyan-500 animate-pulse">
        [ KINETIC MESH RENDER : ACTIVE ]
      </div>
      <canvas ref={canvasRef} width={300} height={250} className="block" />
    </div>
  );
}

// 2. Hardware Diagnostics Panel
function SystemDiagnostics() {
  const [temp, setTemp] = useState(42);

  // Simulate minor GPU/System temperature fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setTemp(42 + (Math.random() * 3 - 1.5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <div className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 rounded-lg flex items-center gap-3">
        <Cpu className="w-8 h-8 text-blue-600 dark:text-cyan-400" />
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono">Core Temp</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white font-mono">{temp.toFixed(1)}°C</p>
        </div>
      </div>
      <div className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 rounded-lg flex items-center gap-3">
        <Activity className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono">Grid Status</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white font-mono">NOMINAL</p>
        </div>
      </div>
      <div className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 rounded-lg flex items-center gap-3">
        <Zap className="w-8 h-8 text-amber-500" />
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono">Energy Output</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white font-mono">1.21 GW</p>
        </div>
      </div>
      <div className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 rounded-lg flex items-center gap-3">
        <Shield className="w-8 h-8 text-blue-600 dark:text-cyan-400" />
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono">Threat Defense</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white font-mono">ACTIVE</p>
        </div>
      </div>
    </div>
  );
}

// 3. Main Intel Page Layout
export default function Intel() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-600 dark:from-cyan-400 dark:to-blue-600 mb-8 uppercase font-mono border-b border-slate-200 dark:border-slate-800 pb-4">
        Aegis System Architecture
      </h1>
      
      <div className="grid md:grid-cols-12 gap-8">
        
        {/* Left Column: Lore */}
        <div className="md:col-span-7 space-y-6">
          <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-none transition-colors">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-mono uppercase">Origin Vector</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Originally a top-tier systems engineer, the entity known as Aegis was caught in a sub-atomic containment breach during an experimental kinetic reactor test. Instead of destroying him, the blast bonded his cellular structure with the facility's quantum sensory grid.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              He now perceives the world as a kinetic mesh, capable of intercepting distress signals across the electromagnetic spectrum and manipulating ambient energy to form impenetrable physical shields.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-none transition-colors">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-mono uppercase">Mission Directive</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Aegis does not fight crime in the traditional sense; he stabilizes critical failures. Whether it is a failing power grid, a compromised digital network, or an individual crying out for help, Aegis is the ultimate firewall between order and collapse.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Tech Specs */}
        <div className="md:col-span-5">
          <h2 className="text-xl font-bold text-slate-900 dark:text-cyan-400 mb-4 uppercase font-mono tracking-widest">
            Live Telemetry
          </h2>
          <KineticShieldWireframe />
          <SystemDiagnostics />
        </div>

      </div>
    </div>
  );
}