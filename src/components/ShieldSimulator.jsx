import React, { useEffect, useRef } from "react";

export default function ShieldSimulator({ powerLevels }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      // Fit container
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = 500;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
        this.size = Math.random() * 2 + 1;
      }

      draw() {
        ctx.fillStyle = "rgba(6, 182, 212, 0.8)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update(mouse, shockwaves, currentPower) {
        // Sensor Sweep makes particles vibrate/scan slightly
        let dx = 0;
        let dy = 0;

        const scanFactor = currentPower.sensor / 100;
        if (scanFactor > 0) {
          this.x += (Math.random() - 0.5) * scanFactor * 2;
          this.y += (Math.random() - 0.5) * scanFactor * 2;
        }

        // Return to base position (Shield Integrity determines how firmly they hold formation)
        const integrityFactor = Math.max(
          0.01,
          (currentPower.integrity / 100) * 0.1,
        );
        dx = this.baseX - this.x;
        dy = this.baseY - this.y;
        this.x += dx * integrityFactor;
        this.y += dy * integrityFactor;

        // Mouse repels particles
        if (mouse.x !== null) {
          let mDx = mouse.x - this.x;
          let mDy = mouse.y - this.y;
          let distance = Math.sqrt(mDx * mDx + mDy * mDy);
          let maxDist = 100;

          if (distance < maxDist) {
            let forceDirectionX = mDx / distance;
            let forceDirectionY = mDy / distance;
            let force = (maxDist - distance) / maxDist;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;
            this.x -= directionX;
            this.y -= directionY;
          }
        }

        // Shockwaves repel particles
        shockwaves.forEach((wave) => {
          let wDx = wave.x - this.x;
          let wDy = wave.y - this.y;
          let distance = Math.sqrt(wDx * wDx + wDy * wDy);

          // Wave thickness
          if (Math.abs(distance - wave.radius) < 20) {
            let force = (20 - Math.abs(distance - wave.radius)) / 20;
            // Burst power determines force
            let burstFactor = (currentPower.burst / 100) * 5;
            this.x -= (wDx / distance) * force * this.density * burstFactor;
            this.y -= (wDy / distance) * force * this.density * burstFactor;
          }
        });
      }
    }

    const particles = [];
    for (let i = 0; i < 500; i++) {
      particles.push(new Particle());
    }

    const mouse = { x: null, y: null };
    const shockwaves = [];

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      shockwaves.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: 300,
        opacity: 1,
      });
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const wave = shockwaves[i];
        wave.radius += 5;
        wave.opacity -= 5 / wave.maxRadius;

        if (wave.opacity <= 0) {
          shockwaves.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(6, 182, 212, ${wave.opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      particles.forEach((p) => {
        p.update(mouse, shockwaves, powerLevels);
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [powerLevels]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-700 dark:border-cyan-900 shadow-2xl cursor-crosshair">
      <div className="absolute top-4 left-4 z-10 font-mono text-xs text-cyan-500 pointer-events-none drop-shadow-md">
        [ CLICK TO EMIT KINETIC SHOCKWAVE ]
      </div>
      <canvas ref={canvasRef} className="block w-full" />
    </div>
  );
}
