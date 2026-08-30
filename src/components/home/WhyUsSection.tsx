import { Target, Brain, Users, Clock, Cpu, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Brain,
    title: "AI-First Approach",
    description: "Every project starts with identifying where AI and ML can deliver the highest impact — from automation to predictive intelligence.",
  },
  {
    icon: Target,
    title: "Data-Driven Strategy",
    description: "We leverage data science and analytics to craft strategies backed by real insights, not assumptions.",
  },
  {
    icon: Users,
    title: "ML Engineers & PhDs",
    description: "Our team includes AI researchers, ML engineers, and data scientists with deep expertise in production-grade AI systems.",
  },
  {
    icon: Clock,
    title: "Rapid Prototyping",
    description: "From concept to working AI prototype in weeks, not months. We iterate fast with continuous model improvement.",
  },
  {
    icon: Cpu,
    title: "Production-Ready AI",
    description: "We don't just build models — we deploy scalable, monitored AI systems with MLOps pipelines and real-time inference.",
  },
  {
    icon: TrendingUp,
    title: "Measurable AI ROI",
    description: "Every AI solution we deliver comes with clear KPIs, performance dashboards, and measurable business impact metrics.",
  },
];

export const WhyUsSection = () => {
  return (
    <section className="py-16 md:py-24 border-t border-border bg-secondary text-secondary-foreground">
      <div className="tg-container max-w-[720px] text-center">
        <h2 className="text-2xl sm:text-3xl mb-4">
          One size fits all is <span className="text-accent-word">not our theory</span>
        </h2>
        <p className="text-secondary-foreground/70 leading-relaxed max-w-md mx-auto">
          Every business is unique — that's why we craft bespoke AI and digital
          strategies tailored to your industry, audience, and growth objectives.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 pt-12 text-left">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="p-5 rounded-xl border border-secondary-foreground/10 hover:border-primary/30 transition-colors duration-300"
            >
              <reason.icon className="w-6 h-6 text-primary mb-3" strokeWidth={1.75} />
              <h3 className="font-bold mb-1.5">{reason.title}</h3>
              <p className="text-secondary-foreground/60 text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
