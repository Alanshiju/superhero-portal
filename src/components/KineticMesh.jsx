import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function KineticMesh() {
  const canvasRef = useRef(null);
  const location = useLocation();
  const burstRef = useRef(0);

  useEffect(() => {
    burstRef.current = 10;
  }, [location.pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Mouse Interaction State
    const mouse = { x: null, y: null, radius: 180 };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    resizeCanvas();

    class Node {
      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        const speedMult = 1 + burstRef.current * 0.5;
        this.x += this.vx * speedMult;
        this.y += this.vy * speedMult;

        if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;
      }

      draw(isDark) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? "rgba(6, 182, 212, 0.8)"
          : "rgba(30, 58, 138, 0.5)";
        ctx.fill();
      }
    }

    const nodes = [];
    const numNodes = Math.min(
      120,
      (window.innerWidth * window.innerHeight) / 12000,
    );
    for (let i = 0; i < numNodes; i++) {
      nodes.push(new Node());
    }

    const animate = () => {
      if (burstRef.current > 0)
        burstRef.current = Math.max(0, burstRef.current - 0.2);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const isDark = document.documentElement.classList.contains("dark");
      const rgb = isDark ? "6, 182, 212" : "30, 58, 138";

      nodes.forEach((node) => {
        node.update();
        node.draw(isDark);

        if (mouse.x !== null) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${rgb}, ${(1 - distance / mouse.radius) * (isDark ? 1 : 0.6)})`;
            ctx.lineWidth = 1.5;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            const angle = Math.atan2(dy, dx);
            const orbitSpeed = 0.05;
            const targetX =
              mouse.x - Math.cos(angle + orbitSpeed) * distance * 0.8;
            const targetY =
              mouse.y - Math.sin(angle + orbitSpeed) * distance * 0.8;

            node.x += (targetX - node.x) * 0.05;
            node.y += (targetY - node.y) * 0.05;
          }
        }
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${rgb}, ${(1 - distance / 130) * (isDark ? 1 : 0.4)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
