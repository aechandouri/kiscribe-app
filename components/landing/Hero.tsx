"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const NOTE_LINES = [
  { label: "S", text: "Lombalgie chronique L4-L5, EVA 6/10 à l'entrée." },
  { label: "O", text: "Lasègue positif à 45°, flexion lombaire 60°." },
  { label: "A", text: "Contracture para-vertébrale, déficit de stabilisation." },
  { label: "P", text: "Renforcement profond, proprioception sur 8 séances." },
  { label: "I", text: "Massage décontracturant, McKenzie, gainages." },
  { label: "E", text: "EVA 3/10 en fin de séance. Bonne tolérance." },
];

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; opacity: number }[] = [];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 0.4,
        opacity: Math.random() * 0.3 + 0.06,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(92,122,95,${p.opacity})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(92,122,95,${0.07 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="hero-root relative w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />

      {/* Aurora */}
      <div className="aurora-blob aurora-1" aria-hidden="true" />
      <div className="aurora-blob aurora-2" aria-hidden="true" />
      <div className="aurora-blob aurora-3" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pt-20 pb-28 lg:pt-32 lg:pb-36 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">

        {/* ── Left: copy */}
        <div className="flex-1 text-center lg:text-left max-w-xl">

          <div className="hero-badge animate-appear">
            <span className="hero-badge-dot" />
            Conforme RGPD · Aucune donnée stockée
          </div>

          <h1 className="animate-appear animate-appear-d1 hero-headline">
            Arrête de perdre<br />
            <span className="hero-gradient-text">2h par jour</span><br />
            en paperasse.
          </h1>

          <p className="animate-appear animate-appear-d2 hero-sub">
            Tu dictes 90 secondes après ta séance.
            Kiscribe génère la note SOAPIE complète et le bon code AMK — prêt à coller dans Doctolib.
          </p>

          <div className="animate-appear animate-appear-d3 hero-cta-row">
            <Link href="/sign-up" className="hero-cta-primary cta-glow cta-btn">
              Essayer gratuitement — 7 jours
              <svg className="ml-2.5 w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <p className="hero-cta-note">Sans CB · Annulable à tout moment</p>
          </div>

          <div className="animate-appear animate-appear-d4 hero-stats">
            {[
              { v: "90s", l: "par séance" },
              { v: "AMK ✓", l: "post-Avenant 7" },
              { v: "0", l: "app à installer" },
            ].map(({ v, l }, i) => (
              <div key={i} className="hero-stat-item">
                <div className="hero-stat-value">{v}</div>
                <div className="hero-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: floating mockup */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <div className="hero-mockup-wrap phone-float">
            <div className="mockup-glow" aria-hidden="true" />

            <div className="hero-card shimmer-card card-shimmer">
              {/* Header */}
              <div className="hero-card-header">
                <div className="flex items-center gap-1.5">
                  <div className="card-dot" style={{ background: "#E05555" }} />
                  <div className="card-dot" style={{ background: "#C4A96A" }} />
                  <div className="card-dot" style={{ background: "#5C7A5F" }} />
                </div>
                <span className="card-title">Note SOAPIE générée</span>
                <div className="card-copy-hint">
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copier
                </div>
              </div>

              {/* Note body */}
              <div className="hero-card-body">
                {NOTE_LINES.map(({ label, text }, i) => (
                  <div key={label} className="note-line" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                    <span className="note-letter">{label}</span>
                    <span className="note-text">{text}</span>
                  </div>
                ))}
              </div>

              {/* AMK footer */}
              <div className="hero-card-footer">
                <span className="amk-badge">AMK 7.5</span>
                <span className="amk-desc">Lombalgie commune · NGAP Avenant 7</span>
                <span className="amk-check">✓</span>
              </div>
            </div>

            {/* Floating badges */}
            <div className="mic-badge">
              <div className="mic-icon-wrap">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div>
                <div className="mic-label">Dictée terminée</div>
                <div className="mic-sub">90s enregistrées</div>
              </div>
            </div>

            <div className="time-badge">
              <span className="time-val">-2h</span>
              <span className="time-unit">/jour</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-bottom-fade" aria-hidden="true" />
    </section>
  );
}
