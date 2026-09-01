import { Link } from "@/lib/router-shim";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Custom AI/ML model development since 2008",
  "GPT, TensorFlow, PyTorch & LangChain expertise",
  "ML engineers, data scientists & AI architects",
  "421+ projects deployed across 3 continents",
  "End-to-end MLOps & production deployment",
  "Enterprise-grade security & compliance",
];

export const AboutSection = () => {
  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="tg-container max-w-[640px] text-center">
        <h2 className="text-2xl sm:text-3xl mb-6">
          Building intelligent <span className="text-accent-word">AI systems</span>
        </h2>

        <p className="text-muted-foreground leading-relaxed">
          With 15+ years delivering AI &amp; ML solutions across India, the UK, and
          the Middle East, SonBarsa combines deep machine learning expertise with
          production engineering — 421+ projects shipped, from NLP pipelines and
          computer vision to generative AI products.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 pt-8 text-left max-w-md mx-auto">
          {features.map((feature) => (
            <div key={feature} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center pt-8">
          <Button size="lg" asChild>
            <Link to="/about">
              Learn more about us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
