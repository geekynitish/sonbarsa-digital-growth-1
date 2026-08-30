import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Globe,
  Smartphone,
  Cloud,
  MessageSquare,
  BarChart3,
  Settings,
  CheckCircle2,
  Brain,
  Sparkles,
  Cpu,
  LineChart,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { techStack } from "@/data/techStack";

const services = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    slug: "ai-ml",
    description: "Custom models, predictive analytics, NLP, and computer vision tailored to your business.",
    features: ["Custom ML Model Development", "Natural Language Processing", "Computer Vision", "Predictive Analytics", "Deep Learning & Neural Networks", "Model Deployment & MLOps"],
  },
  {
    icon: Sparkles,
    title: "Generative AI",
    slug: "generative-ai",
    description: "GPT-powered apps, AI content generation, and LLM fine-tuning for enterprises.",
    features: ["LLM Fine-Tuning", "Retrieval-Augmented Generation (RAG)", "AI Content Generation", "Custom GPT Applications", "Vector Database Integration", "Enterprise AI Copilots"],
  },
  {
    icon: Cpu,
    title: "Intelligent Automation",
    slug: "automation",
    description: "RPA and AI-driven process optimization that cuts cost and boosts efficiency.",
    features: ["Robotic Process Automation (RPA)", "AI-Driven Workflow Optimization", "Document Processing Automation", "Low-Code/No-Code Automation", "Business Process Reengineering", "Automated Reporting & Alerts"],
  },
  {
    icon: LineChart,
    title: "Data Analytics & BI",
    slug: "data-analytics",
    description: "Pipelines, real-time dashboards, and BI powered by machine learning.",
    features: ["Real-Time Dashboards", "Data Pipeline Engineering", "Business Intelligence Reporting", "Customer Behavior Analytics", "Demand Forecasting", "Data Warehouse Design"],
  },
  {
    icon: MessageSquare,
    title: "AI Chatbots & Agents",
    slug: "chatbots",
    description: "AI-powered chatbots and agents for WhatsApp, web, and social with natural language understanding.",
    features: ["WhatsApp Business API", "Facebook & Instagram Bots", "AI Agents & Automation", "Lead Generation Bots", "Custom Knowledge Base Training", "Multi-Language Support"],
  },
  {
    icon: Globe,
    title: "Web Development",
    slug: "web-development",
    description: "Custom websites, web applications, and enterprise solutions built with cutting-edge technologies.",
    features: ["Custom Website Development", "E-commerce Solutions", "Web Applications", "Enterprise Portals", "API Development", "Website Maintenance"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    slug: "mobile-apps",
    description: "Native and cross-platform mobile applications for iOS and Android with seamless user experience.",
    features: ["iOS App Development", "Android App Development", "Cross-Platform Apps", "React Native Development", "Flutter Development", "App Maintenance & Support"],
  },
  {
    icon: Cloud,
    title: "Cloud & AWS Services",
    slug: "cloud-aws",
    description: "AWS, Azure, multi-cloud infrastructure management, deployment, migration, and DevOps automation.",
    features: ["AWS Infrastructure Management", "Azure Cloud Services", "Cloud Migration", "DevOps & CI/CD", "Kubernetes Deployment", "Cloud Security & Compliance"],
  },
  {
    icon: BarChart3,
    title: "Digital Marketing",
    slug: "digital-marketing",
    description: "Comprehensive digital marketing services to boost your online presence and drive conversions.",
    features: ["Search Engine Optimization (SEO)", "Pay-Per-Click (PPC) Advertising", "Social Media Marketing", "Content Marketing", "Email Marketing", "Conversion Rate Optimization"],
  },
  {
    icon: Settings,
    title: "CMS Solutions",
    slug: "cms",
    description: "Shopify, Magento, WooCommerce, and custom CMS development for complete eCommerce solutions.",
    features: ["Shopify Development", "Magento Solutions", "WooCommerce", "Custom CMS", "Headless Commerce", "Multi-vendor Marketplaces"],
  },
];

const AllServicesList = () => (
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

const ServiceDetail = ({ service }: { service: (typeof services)[number] }) => {
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

const Services = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? services.find((s) => s.slug === slug) : undefined;

  if (slug && !service) {
    return <Navigate to="/services" replace />;
  }

  const title = service
    ? `${service.title} Services | SonBarsa`
    : "AI, ML, Cloud & Digital Marketing Services | SonBarsa";
  const description = service
    ? service.description
    : "SonBarsa services: Generative AI, LLM development, AI chatbots, computer vision, predictive analytics, MLOps, AWS cloud, web & mobile development, SEO and digital marketing.";
  const canonical = service
    ? `https://sonbarsa.com/services/${service.slug}`
    : "https://sonbarsa.com/services";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {service ? (
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.title,
            "description": service.description,
            "url": canonical,
            "provider": { "@id": "https://sonbarsa.com/#organization" },
          })}</script>
        ) : (
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "SonBarsa AI, ML, Cloud and Digital Services",
            "url": "https://sonbarsa.com/services",
            "itemListElement": services.map((s, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Service",
                "name": s.title,
                "url": `https://sonbarsa.com/services/${s.slug}`,
                "provider": { "@id": "https://sonbarsa.com/#organization" },
              },
            })),
          })}</script>
        )}
      </Helmet>

      <Navbar />

      <main>
        {service ? <ServiceDetail service={service} /> : <AllServicesList />}
      </main>

      <Footer />
    </>
  );
};

export default Services;
