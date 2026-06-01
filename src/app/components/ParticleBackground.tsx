import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulseOffset: number;
  pulseSpeed: number;
  isHub: boolean;
  glowIntensity: number;
  colorShift: number;
}

const PARTICLE_COUNT = 130;
const HUB_COUNT = 18;
const MAX_DIST = 170;
const SPEED = 0.22;
const HUB_SPEED = 0.1;

function lerpColor(
  r1: number, g1: number, b1: number,
  r2: number, g2: number, b2: number,
  t: number
) {
  return [
    Math.round(r1 + (r2 - r1) * t),
    Math.round(g1 + (g2 - g1) * t),
    Math.round(b1 + (b2 - b1) * t),
  ];
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = document.documentElement.scrollHeight;
      init();
    }

    function init() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const isHub = i < HUB_COUNT;
        const baseRadius = isHub
          ? 3.5 + Math.random() * 2.5
          : 1.2 + Math.random() * 2;
        const speed = isHub ? HUB_SPEED : SPEED;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed * 2,
          vy: (Math.random() - 0.5) * speed * 2,
          radius: baseRadius,
          baseRadius,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.008 + Math.random() * 0.012,
          isHub,
          glowIntensity: isHub ? 0.9 + Math.random() * 0.1 : 0.5 + Math.random() * 0.4,
          colorShift: Math.random(),
        });
      }
    }

    function drawBackground() {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#030014");
      grad.addColorStop(0.35, "#060925");
      grad.addColorStop(0.65, "#07052a");
      grad.addColorStop(1, "#0d0220");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const radGrad1 = ctx.createRadialGradient(
        width * 0.15, height * 0.25, 0,
        width * 0.15, height * 0.25, width * 0.55
      );
      radGrad1.addColorStop(0, "rgba(30, 0, 100, 0.28)");
      radGrad1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = radGrad1;
      ctx.fillRect(0, 0, width, height);

      const radGrad2 = ctx.createRadialGradient(
        width * 0.82, height * 0.6, 0,
        width * 0.82, height * 0.6, width * 0.5
      );
      radGrad2.addColorStop(0, "rgba(100, 0, 80, 0.18)");
      radGrad2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = radGrad2;
      ctx.fillRect(0, 0, width, height);
    }

    function getNodeColor(p: Particle, alpha: number): string {
      const t = p.colorShift;
      if (t < 0.3) {
        return `rgba(220, 240, 255, ${alpha})`;
      } else if (t < 0.6) {
        const [r, g, b] = lerpColor(100, 180, 255, 160, 220, 255, (t - 0.3) / 0.3);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      } else {
        const [r, g, b] = lerpColor(160, 100, 255, 220, 80, 255, (t - 0.6) / 0.4);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
    }

    function getLineColor(p: Particle, q: Particle, alpha: number): string {
      const mx = (p.x + q.x) / 2 / width;
      const t = mx * p.colorShift * 0.5 + q.colorShift * 0.5;

      let r: number, g: number, b: number;
      if (t < 0.5) {
        [r, g, b] = lerpColor(0, 180, 255, 80, 120, 255, t * 2);
      } else {
        [r, g, b] = lerpColor(80, 120, 255, 180, 60, 240, (t - 0.5) * 2);
      }
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function drawNode(p: Particle) {
      const pulse = Math.sin(frame * p.pulseSpeed + p.pulseOffset);
      const r = p.baseRadius + (p.isHub ? pulse * 1.2 : pulse * 0.4);
      p.radius = r;

      const glowR = r * (p.isHub ? 14 : 8);
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
      const baseAlpha = p.isHub ? 0.22 + pulse * 0.06 : 0.1 + pulse * 0.03;
      glow.addColorStop(0, getNodeColor(p, baseAlpha * p.glowIntensity * 2));
      glow.addColorStop(0.3, getNodeColor(p, baseAlpha * p.glowIntensity));
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      if (p.isHub) {
        const coreGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3.5);
        coreGlow.addColorStop(0, getNodeColor(p, 0.9));
        coreGlow.addColorStop(0.5, getNodeColor(p, 0.5));
        coreGlow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = coreGlow;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = getNodeColor(p, p.isHub ? 1 : 0.85);
      ctx.fill();

      if (p.isHub) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.fill();
      }
    }

    function draw() {
      frame++;
      ctx.clearRect(0, 0, width, height);
      drawBackground();

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const t = 1 - dist / MAX_DIST;
            const alpha = t * t * (a.isHub || b.isHub ? 0.55 : 0.28);
            const lineWidth = a.isHub || b.isHub ? 0.9 : 0.55;

            if (a.isHub && b.isHub && dist < MAX_DIST * 0.7) {
              const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
              grad.addColorStop(0, getNodeColor(a, alpha * 1.3));
              grad.addColorStop(1, getNodeColor(b, alpha * 1.3));
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = grad;
              ctx.lineWidth = lineWidth * 1.4;
              ctx.stroke();
            } else {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = getLineColor(a, b, alpha);
              ctx.lineWidth = lineWidth;
              ctx.stroke();
            }
          }
        }
      }

      for (const p of particles) {
        drawNode(p);
      }

      animId = requestAnimationFrame(draw);
    }

    function handleResize() {
      resize();
    }

    resize();
    draw();

    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      const newHeight = document.documentElement.scrollHeight;
      if (Math.abs(newHeight - height) > 50) {
        canvas.height = newHeight;
        height = newHeight;
      }
    });
    resizeObserver.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
