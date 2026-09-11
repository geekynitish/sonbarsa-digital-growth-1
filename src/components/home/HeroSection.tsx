import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/router-shim";

export const HeroSection = () => {
  return (
    <section className="pt-20 pb-6 md:pt-24 md:pb-8 flex items-center justify-center">
      <div className="tg-container text-center">
        <p className="text-sm font-medium text-muted-foreground mb-3">
          AI &amp; digital growth partner since 2008
        </p>

        <h1 className="text-4xl sm:text-5xl leading-[1.1] tracking-tight">
          Real AI products.{" "}
          <span className="text-accent-word">Real business growth.</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          We build generative AI, LLM, computer vision, and predictive
          analytics products — then wrap them in the web, mobile, and
          marketing systems that turn them into revenue. 274+ clients across
          India, the UK, and the Middle East trust us to ship, not just prototype.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/services">
              Explore AI Solutions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/contact">
              <Calendar className="w-4 h-4" />
              Book a Consultation
            </Link>
          </Button>
        </div>

        <dl className="mt-8 sm:mt-10 grid grid-cols-4 gap-4 sm:gap-8">
          {[
            { value: "274+", label: "Clients" },
            { value: "421+", label: "Projects" },
            { value: "18+", label: "Engineers" },
            { value: "15+", label: "Years" },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-xl sm:text-2xl font-extrabold">{stat.value}</dd>
              <dd className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
