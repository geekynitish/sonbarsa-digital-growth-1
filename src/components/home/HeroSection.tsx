import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "@/lib/router-shim";

export const HeroSection = () => {
  return (
    <section className="pt-20 pb-6 md:pt-24 md:pb-8 flex items-center justify-center">
      <div className="tg-container text-center">
        <p className="text-sm font-medium text-muted-foreground mb-3">
          Custom Software &amp; Digital Growth Partner since 2008
        </p>

        <h1 className="text-4xl sm:text-5xl leading-[1.1] tracking-tight">
          Complete Software &amp; Digital Solutions.{" "}
          <span className="text-accent-word">Real Business Growth.</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          We build custom web &amp; mobile apps, enterprise FinTech software, digital marketing &amp; SEO systems, and smart AI solutions — turning technology into measurable revenue. 274+ clients across India, the UK, and the Middle East trust us to build, scale, and deliver.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            to="/services"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-medium text-sm bg-foreground/5 hover:bg-foreground/10 text-foreground border border-border/80 hover:border-foreground/20 transition-all group"
          >
            <span>Explore Our Services</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground transition-all" />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group border border-transparent hover:border-border"
          >
            <Calendar className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span>Book a Consultation</span>
          </Link>
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
