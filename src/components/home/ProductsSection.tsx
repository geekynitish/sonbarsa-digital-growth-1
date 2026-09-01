import { Link } from "@/lib/router-shim";
import { ArrowRight, Target, Users, ExternalLink, Bot, BarChart3, Eye, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    name: "Interview.SonBarsa.com",
    tagline: "AI-Powered Interview Platform",
    description: "Automate hiring with AI-driven screening, video interviews, and intelligent candidate scoring powered by NLP models.",
    href: "https://interview.sonbarsa.com",
    icon: Users,
    status: "Production",
  },
  {
    name: "SEO.SonBarsa.com",
    tagline: "AI SEO Intelligence Suite",
    description: "ML-powered SEO platform with predictive ranking, automated content optimization, and real-time competitor intelligence.",
    href: "https://seo.sonbarsa.com",
    icon: Target,
    status: "Production",
  },
  {
    name: "SonBarsa AI Chatbot",
    tagline: "Conversational AI for Business",
    description: "Multi-channel AI chatbot with GPT integration, trained on your business data. Deployed on WhatsApp, Web, and social platforms.",
    href: "/services/chatbots",
    icon: Bot,
    status: "Production",
  },
  {
    name: "Predictive Analytics Engine",
    tagline: "Business Intelligence with ML",
    description: "Custom-built ML pipelines for demand forecasting, customer churn prediction, and real-time anomaly detection for enterprises.",
    href: "/services/data-analytics",
    icon: BarChart3,
    status: "Deployed",
  },
  {
    name: "Computer Vision Suite",
    tagline: "Visual AI & Image Recognition",
    description: "Production-grade computer vision solutions — object detection, OCR, quality inspection, and visual search for manufacturing & retail.",
    href: "/services/ai-ml",
    icon: Eye,
    status: "Active",
  },
  {
    name: "LLM Fine-Tuning Platform",
    tagline: "Custom AI Model Training",
    description: "Enterprise platform to fine-tune LLMs on proprietary data with RAG pipelines, vector search, and production deployment workflows.",
    href: "/services/generative-ai",
    icon: Cpu,
    status: "Active",
  },
];

export const ProductsSection = () => {
  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="tg-container max-w-[840px]">
        <div className="text-center max-w-md mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl mb-4">
            AI products <span className="text-accent-word">in production</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Real AI products we've built and deployed — from conversational AI to
            computer vision, each one live and serving real users.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="rounded-xl border border-border p-5 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <product.icon className="w-6 h-6 text-primary" strokeWidth={1.75} />
                <span className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground">
                  {product.status}
                </span>
              </div>

              <h3 className="text-sm font-bold mb-1">{product.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{product.tagline}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {product.description}
              </p>

              <a
                href={product.href}
                target={product.href.startsWith("http") ? "_blank" : undefined}
                rel={product.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group"
              >
                Explore
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4 text-sm">
            Need a custom AI solution?
          </p>
          <Button size="lg" asChild>
            <Link to="/contact">
              Let's build together
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
