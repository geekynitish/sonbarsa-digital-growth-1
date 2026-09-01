import { Link } from "@/lib/router-shim";
import { Brain, Sparkles, Cpu, MessageSquare, Globe, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Custom models, predictive analytics, NLP, and computer vision tailored to your business.",
    href: "/services/ai-ml",
  },
  {
    icon: Sparkles,
    title: "Generative AI",
    description: "GPT-powered apps, AI content generation, and LLM fine-tuning for enterprises.",
    href: "/services/generative-ai",
  },
  {
    icon: Cpu,
    title: "Intelligent Automation",
    description: "RPA and AI-driven process optimization that cuts cost and boosts efficiency.",
    href: "/services/automation",
  },
  {
    icon: MessageSquare,
    title: "AI Chatbots & Agents",
    description: "Chatbots for WhatsApp, web, and social with natural language understanding.",
    href: "/services/chatbots",
  },
  {
    icon: Globe,
    title: "Web & App Development",
    description: "Full-stack web and mobile apps with AI built in, on modern cloud-native stacks.",
    href: "/services/web-development",
  },
  {
    icon: BarChart3,
    title: "Data Analytics & BI",
    description: "Pipelines, real-time dashboards, and BI powered by machine learning.",
    href: "/services/data-analytics",
  },
];

export const ServicesSection = () => {
  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="tg-container max-w-[720px]">
        <h2 className="text-2xl sm:text-3xl text-center mb-14">
          What we <span className="text-accent-word">build</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
          {services.map((service) => (
            <Link key={service.title} to={service.href} className="group flex gap-4">
              <service.icon className="w-6 h-6 shrink-0 text-primary mt-0.5" strokeWidth={1.75} />
              <div>
                <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
