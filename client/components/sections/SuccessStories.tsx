import React from "react";
import Reveal from "@/components/effects/Reveal";

const testimonials = [
  {
    quote:
      "Ascendify's AI assessment identified my hidden potential in data science. Within 6 months, I transitioned from accounting to a data analyst role with a 40% salary increase!",
    initial: "P",
    name: "Priya Sharma",
    role: "Accountant → Data Analyst",
  },
  {
    quote:
      "The personalized roadmap and hands-on projects helped me master full-stack development. Now I'm working at a top tech company in Bangalore!",
    initial: "R",
    name: "Rahul Patel",
    role: "Student → Full Stack Developer",
  },
  {
    quote:
      "From manual testing to automation engineering in 8 months. The AI mentor guided me through every step of my career transformation.",
    initial: "A",
    name: "Anjali Singh",
    role: "Manual Tester → Automation Engineer",
  },
];

import useEmblaCarousel from "embla-carousel-react";

export const SuccessStories: React.FC = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" });
  return (
    <section className="container py-20">
      <Reveal>
        <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight">Success Stories</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">Real people, real career transformations</p>
      </Reveal>

      <div className="mt-10">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t, i) => (
              <div className="min-w-0 flex-[0_0_100%] px-4" key={t.name}>
                <Reveal delay={i * 120}>
                  <article className="relative">
                    <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-sky-600/25" />
                    <div className="relative rounded-2xl border border-white/10 bg-white/[0.05] p-6">
                      <p className="text-sm leading-relaxed">{t.quote}</p>
                      <div className="mt-6 flex items-center gap-3">
                        <div className="grid size-10 place-items-center rounded-full bg-sky-600/40 text-white font-bold">
                          {t.initial}
                        </div>
                        <div>
                          <div className="font-semibold">{t.name}</div>
                          <div className="text-xs text-muted-foreground">{t.role}</div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
        {/* Controls */}
        <div className="mt-6 flex justify-center gap-3">
          {/* Simple anchors for now; embla supports API, but minimal UI */}
          {testimonials.map((_, i) => (
            <span key={i} className="size-2 rounded-full bg-sky-500/40 inline-block" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
