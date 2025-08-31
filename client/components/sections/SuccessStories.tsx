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

export const SuccessStories: React.FC = () => {
  return (
    <section className="container py-20">
      <Reveal>
        <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight">
          Success Stories
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Real people, real career transformations
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 120}>
            <article className="h-full rounded-xl border border-border/60 bg-card/60 p-6 shadow-sm">
              <p className="text-sm leading-relaxed">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-background font-bold">
                  {t.initial}
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
