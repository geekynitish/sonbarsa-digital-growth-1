import { useState } from "react";
import { ExternalLink, PieChart, Building2, Video, Gamepad2 } from "lucide-react";

const categories = ["All", "AI Solutions", "Media & Publishing", "Social & Media Tech", "E-commerce", "Web", "App", "Digital Marketing"];

const projects = [
  {
    title: "Social Media Audience Analytics",
    category: "Social & Media Tech",
    icon: PieChart,
    iconColor: "bg-blue-500",
    description: "Audience demographics, sentiment analysis, and engagement & growth tracking dashboard across social platforms.",
    technologies: ["Audience Analytics", "Sentiment Analysis", "Social APIs", "Dashboards"],
  },
  {
    title: "Enterprise Social Media Suite",
    category: "Social & Media Tech",
    icon: Building2,
    iconColor: "bg-violet-500",
    description: "Multi-brand, multi-account scheduling, approval workflows, and reporting for large organizations.",
    technologies: ["Multi-account Management", "Approval Workflows", "Reporting", "Enterprise SSO"],
  },
  {
    title: "Creator Video Engagement Tool",
    category: "Social & Media Tech",
    icon: Video,
    iconColor: "bg-pink-500",
    description: "Analytics, audience-retention insights, and comment/engagement management built for vloggers and content creators.",
    technologies: ["Video Analytics", "Audience Retention", "Comment Management", "Recommendations"],
  },
  {
    title: "Mobile Gaming App",
    category: "Social & Media Tech",
    icon: Gamepad2,
    iconColor: "bg-emerald-500",
    description: "Casual mobile game with real-time leaderboards and in-app engagement features to keep players coming back.",
    technologies: ["React Native", "Real-time Leaderboards", "Push Notifications", "In-app Engagement"],
  },
  {
    title: "Digital News Platform",
    category: "Media & Publishing",
    image: "https://img.sonbarsa.com/portfolio-webp/digital-news-platform.webp",
    description: "End-to-end digital publishing platform for a newspaper group — reader subscriptions, paywalls, and an AI recommendation engine for personalized story feeds.",
    technologies: ["Digital Publishing", "Subscriptions & Paywall", "AI Recommendations", "Analytics"],
  },
  {
    title: "AI Interview Platform",
    category: "AI Solutions",
    image: "https://img.sonbarsa.com/portfolio-webp/ai-interview-platform.webp",
    description: "AI-powered interview screening platform with automated candidate evaluation, video analysis, and smart scoring.",
    link: "https://interview.sonbarsa.com",
    technologies: ["AI/ML", "NLP", "React", "Python", "OpenAI"],
  },
  {
    title: "AI SEO Management Suite",
    category: "AI Solutions",
    image: "https://img.sonbarsa.com/portfolio-webp/ai-seo-management-suite.webp",
    description: "AI-driven SEO platform with automated rank tracking, content optimization, and competitor intelligence.",
    link: "https://seo.sonbarsa.com",
    technologies: ["AI/ML", "Data Analytics", "React", "Node.js"],
  },
  {
    title: "AI Chatbot for E-commerce",
    category: "AI Solutions",
    image: "https://img.sonbarsa.com/portfolio-webp/ai-chatbot-for-e-commerce.webp",
    description: "Intelligent conversational AI chatbot for customer support, product recommendations, and order tracking.",
    technologies: ["GPT-4", "LangChain", "WhatsApp API", "Node.js"],
  },
  {
    title: "Predictive Analytics Dashboard",
    category: "AI Solutions",
    image: "https://img.sonbarsa.com/portfolio-webp/predictive-analytics-dashboard.webp",
    description: "ML-powered business intelligence dashboard with predictive sales forecasting and customer behavior analysis.",
    technologies: ["Machine Learning", "Python", "TensorFlow", "React"],
  },
  {
    title: "AI Content Generator",
    category: "AI Solutions",
    image: "https://img.sonbarsa.com/portfolio-webp/ai-content-generator.webp",
    description: "Automated content creation platform using generative AI for blogs, social media, and marketing copy.",
    technologies: ["GPT-4", "Stable Diffusion", "Next.js", "Python"],
  },
  {
    title: "Altech Kings of Structure",
    category: "Web",
    image: "https://img.sonbarsa.com/portfolio-webp/altech-kings-of-structure.webp",
    description: "Professional website for leading structural engineering firm with project showcase and inquiry system.",
    link: "https://www.altechkingofstructure.com",
    technologies: ["React", "SEO", "Responsive Design"],
  },
  {
    title: "Pernia's Pop-Up Shop",
    category: "E-commerce",
    image: "https://img.sonbarsa.com/portfolio-webp/pernias-pop-up-shop.webp",
    description: "Premium fashion e-commerce platform with luxury designer collections.",
    link: "https://www.perniaspopupshop.com/",
    technologies: ["Shopify", "Custom Theme", "Payment Integration"],
  },
  {
    title: "Aashni & Co",
    category: "E-commerce",
    image: "https://img.sonbarsa.com/portfolio-webp/aashni-co.webp",
    logo: true,
    description: "Online luxury South Asian fashion destination for wedding and occasion wear from top designers.",
    link: "https://aashniandco.com/",
    technologies: ["E-commerce", "Custom Development", "SEO"],
  },
  {
    title: "Agashe Store",
    category: "E-commerce",
    image: "https://img.sonbarsa.com/portfolio-webp/agashe-store.webp",
    description: "Modern e-commerce solution for traditional Indian wear and accessories.",
    link: "https://agashestore.com/",
    technologies: ["Shopify", "Custom Development", "SEO"],
  },
  {
    title: "Meena Bazaar",
    category: "E-commerce",
    image: "https://img.sonbarsa.com/portfolio-webp/meena-bazaar.webp",
    description: "Traditional Indian ethnic wear e-commerce with modern shopping experience.",
    link: "https://www.meenabazaar.shop/",
    technologies: ["Shopify", "Inventory Management", "Multi-currency"],
  },
  {
    title: "Custom Mobile App",
    category: "App",
    image: "https://img.sonbarsa.com/portfolio-webp/custom-mobile-app.webp",
    description: "Feature-rich mobile application with seamless user experience.",
    technologies: ["React Native", "Node.js", "MongoDB"],
  },
  {
    title: "Enterprise Web Portal",
    category: "Web",
    image: "https://img.sonbarsa.com/portfolio-webp/enterprise-web-portal.webp",
    description: "Custom enterprise solution for business operations management.",
    technologies: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Digital Marketing Campaign",
    category: "Digital Marketing",
    image: "https://img.sonbarsa.com/portfolio-webp/digital-marketing-campaign.webp",
    description: "Comprehensive digital marketing strategy with measurable ROI.",
    technologies: ["SEO", "PPC", "Social Media"],
  },
];

export const PortfolioFilterGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Filter */}
      <section className="py-6 border-y border-border sticky top-14 bg-background z-40">
        <div className="tg-container max-w-[840px]">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-20">
        <div className="tg-container max-w-[840px]">
          <h2 className="sr-only">Our projects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <div key={project.title} className="rounded-xl border border-border overflow-hidden group">
                <div
                  className={`relative overflow-hidden aspect-video flex items-center justify-center ${
                    project.icon ? project.iconColor : project.logo ? "bg-white p-8" : ""
                  }`}
                >
                  {project.icon ? (
                    <project.icon className="w-14 h-14 text-white" strokeWidth={1.5} />
                  ) : (
                    <img
                      src={project.image}
                      alt={`${project.title} - ${project.category} project by SonBarsa`}
                      className={project.logo ? "max-w-full max-h-full object-contain" : "w-full h-full object-cover"}
                      width={600}
                      height={400}
                      loading="lazy"
                    />
                  )}
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    {project.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold mb-1.5">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group/link"
                    >
                      Visit site
                      <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
