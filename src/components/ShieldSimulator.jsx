import React, { useEffect, useRef } from "react";
import { useSound } from "../context/SoundContext";

export default function ShieldSimulator({ powerLevels, stressTestActive }) {
  const canvasRef = useRef(null);
  const { playHover } = useSound();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = 500;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
        this.size = Math.random() * 2 + 1;
        this.vx = 0;
        this.vy = 0;
      }

      draw() {
        ctx.fillStyle = "rgba(6, 182, 212, 0.8)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update(mouse, shockwaves, projectiles, currentPower) {
        let dx = 0;
        let dy = 0;

        const scanFactor = currentPower.sensor / 100;
        if (scanFactor > 0) {
          this.x += (Math.random() - 0.5) * scanFactor * 3;
          this.y += (Math.random() - 0.5) * scanFactor * 3;
        }

        const integrityFactor = Math.max(
          0.01,
          (currentPower.integrity / 100) * 0.15,
        );
        dx = this.baseX - this.x;
        dy = this.baseY - this.y;

        this.vx += dx * integrityFactor;
        this.vy += dy * integrityFactor;

        // Dampen velocity
        this.vx *= 0.9;
        this.vy *= 0.9;

        if (mouse.x !== null) {
          let mDx = mouse.x - this.x;
          let mDy = mouse.y - this.y;
          let distance = Math.sqrt(mDx * mDx + mDy * mDy);
          let maxDist = 120;

          if (distance < maxDist) {
            let forceDirectionX = mDx / distance;
            let forceDirectionY = mDy / distance;
            let force = (maxDist - distance) / maxDist;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;
            this.vx -= directionX * 0.5;
            this.vy -= directionY * 0.5;
          }
        }

        shockwaves.forEach((wave) => {
          let wDx = wave.x - this.x;
          let wDy = wave.y - this.y;
          let distance = Math.sqrt(wDx * wDx + wDy * wDy);

          if (Math.abs(distance - wave.radius) < 30) {
            let force = (30 - Math.abs(distance - wave.radius)) / 30;
            let burstFactor = (currentPower.burst / 100) * 8;
            this.vx -= (wDx / distance) * force * this.density * burstFactor;
            this.vy -= (wDy / distance) * force * this.density * burstFactor;
          }
        });

        projectiles.forEach((proj) => {
          let pDx = proj.x - this.x;
          let pDy = proj.y - this.y;
          let distance = Math.sqrt(pDx * pDx + pDy * pDy);

          if (distance < proj.radius + 20) {
            let force = 10;
            this.vx -= (pDx / distance) * force;
            this.vy -= (pDy / distance) * force;
          }
        });

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    class Projectile {
      constructor() {
        this.x = Math.random() < 0.5 ? 0 : canvas.width;
        this.y = Math.random() * canvas.height;
        let angle = Math.atan2(
          canvas.height / 2 - this.y,
          canvas.width / 2 - this.x,
        );
        // Add spread
        angle += (Math.random() - 0.5) * 0.5;
        let speed = Math.random() * 5 + 5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.radius = 4;
        this.active = true;
      }

      draw() {
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ef4444";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (
          this.x < -50 ||
          this.x > canvas.width + 50 ||
          this.y < -50 ||
          this.y > canvas.height + 50
        ) {
          this.active = false;
        }
      }
    }

    const particles = [];
    for (let i = 0; i < 600; i++) {
      particles.push(new Particle());
    }

    const mouse = { x: null, y: null };
    const shockwaves = [];
    let projectiles = [];
    let frameCount = 0;

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
        maxRadius: (powerLevels.burst / 100) * 400 + 100,
        opacity: 1,
      });
      playHover(); // Use hover sound for shockwave click for now
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      if (stressTestActive && frameCount % 10 === 0) {
        projectiles.push(new Projectile());
      }

      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const wave = shockwaves[i];
        wave.radius += 8;
        wave.opacity -= 8 / wave.maxRadius;

        if (wave.opacity <= 0) {
          shockwaves.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(6, 182, 212, ${wave.opacity})`;
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }

      for (let i = projectiles.length - 1; i >= 0; i--) {
        projectiles[i].update();
        projectiles[i].draw();
        if (!projectiles[i].active) {
          projectiles.splice(i, 1);
        }
      }

      particles.forEach((p) => {
        p.update(mouse, shockwaves, projectiles, powerLevels);
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
  }, [powerLevels, stressTestActive]); // Re-bind when state changes to update closures

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-slate-900/50 backdrop-blur-md border border-slate-700 dark:border-cyan-900 shadow-2xl cursor-crosshair">
      <div className="absolute top-4 left-4 z-10 font-mono text-xs text-cyan-500 pointer-events-none drop-shadow-md">
        [ CLICK TO EMIT KINETIC SHOCKWAVE ]
      </div>
      <canvas ref={canvasRef} className="block w-full" />
    </div>
  );
}
