import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BackgroundDotsProps {
  className?: string;
  speed?: number; // parallax intensity
}

// Animated dotted background using CSS radial-gradient grid and slow panning.
export function BackgroundDots({ className, speed = 0.25 }: BackgroundDotsProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const y = window.scrollY * speed;
      el.style.transform = `translate3d(0, ${-y}px, 0)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]",
        className,
      )}
    >
      {/* Dot grid layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.3)_1px,transparent_1px)] bg-[length:22px_22px] animate-bg-pan"></div>
      {/* Soft vignette + subtle aurora gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_10%,rgba(59,130,246,0.08),transparent_60%),radial-gradient(60%_40%_at_80%_20%,rgba(168,85,247,0.06),transparent_60%),radial-gradient(50%_50%_at_20%_10%,rgba(34,197,94,0.05),transparent_60%)]"></div>
    </div>
  );
}

export default BackgroundDots;
