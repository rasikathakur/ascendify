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
    <section className="py-16 bg-gradient-to-r from-sky-900 via-sky-800 to-cyan-900">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 120}>
              <CounterCard stat={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

function CounterCard({ stat }: { stat: Stat }) {
  const value = useCountUp(stat.value);
  return (
    <div className="rounded-xl bg-white/10/50 backdrop-blur border border-sky-500/40 p-6 text-center shadow-[0_0_24px_rgba(56,189,248,0.15)]">
      <div className="text-4xl md:text-5xl font-black tracking-tight text-sky-100">
        {value.toLocaleString()} {stat.suffix ?? ""}
      </div>
      <div className="mt-2 text-sm text-sky-100/80">{stat.label}</div>
    </div>
  );
}

export default StatsCounters;
