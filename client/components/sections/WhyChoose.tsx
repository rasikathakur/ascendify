import React from "react";
import Reveal from "@/components/effects/Reveal";

const features = [
  {
    emoji: "🤖",
    title: "AI-Powered Assessment",
    desc:
      "Advanced machine learning algorithms analyze your skills, interests, and market trends to provide precise career recommendations.",
  },
  {
    emoji: "🛤️",
    title: "Dynamic Skill Roadmaps",
    desc:
      "Interactive learning paths that adapt to your progress and current market demands. Never follow outdated curricula again.",
  },
  {
    emoji: "💼",
    title: "Real-Time Job Market",
    desc:
      "Live job market analysis with salary insights, demand forecasts, and geographic opportunities for your target roles.",
  },
  {
    emoji: "🎯",
    title: "Hands-On Practice",
    desc:
      "Interactive coding environments, project-based learning, and real-world scenarios to build practical skills.",
  },
  {
    emoji: "👥",
    title: "Community Learning",
    desc:
      "Connect with peers, join study groups, participate in coding challenges, and learn from industry mentors.",
  },
  {
    emoji: "📈",
    title: "Progress Tracking",
    desc:
      "Comprehensive analytics dashboard showing your skill development, achievement milestones, and career readiness score.",
  },
];

export const WhyChoose: React.FC = () => {
  return (
    <section className="container py-20">
      <Reveal>
        <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight">
          Why Choose <span className="text-sky-400">Ascendify</span>?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Cutting-edge AI technology meets personalized career guidance
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 90}>
            <div className="h-full rounded-xl border border-border/60 bg-card/60 p-6 shadow-sm">
              <div className="text-3xl">{f.emoji}</div>
              <h3 className="mt-3 font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
