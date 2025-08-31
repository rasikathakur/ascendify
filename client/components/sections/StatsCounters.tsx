import React, { useEffect, useRef, useState } from "react";
import Reveal from "@/components/effects/Reveal";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

const STATS: Stat[] = [
  { label: "Careers Transformed", value: 25000, suffix: "+" },
  { label: "Skill Roadmaps", value: 120, suffix: "+" },
  { label: "Success Rate", value: 92, suffix: "%" },
];

function useCountUp(target: number, start = 0, duration = 1400) {
  const [value, setValue] = useState(start);
  const ref = useRef<number>(start);

  useEffect(() => {
    const startTs = performance.now();
    let raf = 0;
    const step = (ts: number) => {
      const p = Math.min(1, (ts - startTs) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(start + (target - start) * eased);
      if (current !== ref.current) {
        ref.current = current;
        setValue(current);
      }
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return value;
}

export const StatsCounters: React.FC = () => {
  return (
    <section className="container py-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 120}>
            <CounterCard stat={s} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

function CounterCard({ stat }: { stat: Stat }) {
  const value = useCountUp(stat.value);
  return (
    <div className="rounded-xl border border-border/60 bg-card/60 p-6 text-center shadow-sm">
      <div className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(56,189,248,0.45)]">
        {value.toLocaleString()} {stat.suffix ?? ""}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
    </div>
  );
}

export default StatsCounters;
