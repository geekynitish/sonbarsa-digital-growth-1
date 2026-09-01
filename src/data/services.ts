import {
  Globe,
  Smartphone,
  Cloud,
  MessageSquare,
  BarChart3,
  Settings,
  Brain,
  Sparkles,
  Cpu,
  LineChart,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  slug: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
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
