import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BackgroundDots from "@/components/effects/BackgroundDots";

export const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Simple parallax on mouse move
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX - w / 2) / w;
      const y = (e.clientY - h / 2) / h;
      el.style.setProperty("--parallax-x", String(x * 10));
      el.style.setProperty("--parallax-y", String(y * 10));
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <BackgroundDots />
      <div
        ref={ref}
        className="container flex min-h-[70vh] flex-col items-center justify-center py-20 text-center"
      >
        <h1
          className="max-w-4xl text-balance text-4xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-b from-cyan-300 via-sky-400 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(56,189,248,0.55)]"
          style={{
            transform:
              "translate3d(calc(var(--parallax-x,0)*1px), calc(var(--parallax-y,0)*1px), 0)",
          }}
        >
          Ascendify – Elevate your skills, amplify your career.
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground text-base md:text-lg">
          Discover your path. Build your skills. Land your dream role with AI-powered guidance.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <Button asChild size="lg" variant="gradient" className="shadow-neon">
            <Link to="/assessment">Start Free Career Assessment</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-cyan-400/30">
            <Link to="/roadmaps">Explore Skill Roadmaps</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
