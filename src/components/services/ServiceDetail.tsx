import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "@/lib/router-shim";
import { services, type Service } from "@/data/services";

export const ServiceDetail = ({ service }: { service: Service }) => {
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="pt-20 pb-12 text-center">
        <div className="tg-container max-w-[640px]">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            All services
          </Link>

          <service.icon className="w-10 h-10 text-primary mx-auto mb-5" strokeWidth={1.5} />

          <h1 className="text-3xl sm:text-4xl leading-[1.15] tracking-tight">
            {service.title}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            {service.description}
          </p>

          <p className="mt-8 text-sm text-muted-foreground">
            Interested? <Link to="/contact" className="text-primary font-medium hover:underline">Get in touch</Link> or <Link to="/portfolio" className="text-primary font-medium hover:underline">see related work</Link>.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 border-t border-border">
        <div className="tg-container max-w-[560px]">
          <h2 className="text-xl font-bold text-center mb-6">What's included</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {service.features.map((feature) => (
              <div key={feature} className="flex items-start gap-2.5 rounded-lg border border-border p-3">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 border-t border-border">
        <div className="tg-container max-w-[720px]">
          <h2 className="text-xl font-bold text-center mb-6">Other services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                to={`/services/${other.slug}`}
                className="group flex flex-col items-center text-center gap-2 rounded-lg border border-border p-4 hover:border-primary/30 transition-colors"
              >
                <other.icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
                <span className="text-xs font-medium group-hover:text-primary transition-colors">
                  {other.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
