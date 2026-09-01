import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/router-shim";
import { techStack } from "@/data/techStack";
import { services } from "@/data/services";

export const AllServicesList = () => (
  <>
    {/* Hero */}
    <section className="pt-20 pb-16 text-center">
      <div className="tg-container max-w-[640px]">
        <p className="text-sm font-medium text-muted-foreground mb-5">Our Services</p>
        <h1 className="text-4xl sm:text-5xl leading-[1.1] tracking-tight">
          Full-stack digital solutions for{" "}
          <span className="text-accent-word">your business</span>.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          From strategy to execution, we provide end-to-end technology services
          that help businesses grow and scale in the digital era.
        </p>

        <p className="mt-8 text-xs font-medium text-muted-foreground">
          Powered by the latest AI stack
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {techStack.map((item) => (
            <span
              key={item.name}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground"
            >
              <item.icon className="w-3 h-3 text-primary shrink-0" />
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="py-16 md:py-20 border-t border-border">
      <div className="tg-container max-w-[640px] divide-y divide-border">
        {services.map((service) => (
          <Link
            key={service.slug}
            to={`/services/${service.slug}`}
            className="group flex items-start gap-4 py-6 first:pt-0 last:pb-0"
          >
            <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="min-w-0">
              <h2 className="font-bold text-base sm:text-lg mb-1 group-hover:text-primary transition-colors">
                {service.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1.5 ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </section>
  </>
);
