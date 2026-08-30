import {
  Sparkles,
  Bot,
  FileSearch,
  Database,
  Eye,
  Mic,
  GitBranch,
  Cloud,
  BarChart3,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface TechStackItem {
  name: string;
  description: string;
  icon: LucideIcon;
}

export const techStack: TechStackItem[] = [
  {
    name: "Generative AI & LLMs",
    description: "GPT-4, Claude, Gemini integration for enterprise apps.",
    icon: Sparkles,
  },
  {
    name: "Agentic AI",
    description: "Autonomous AI agents that handle multi-step tasks, not just chat.",
    icon: Bot,
  },
  {
    name: "RAG",
    description: "Retrieval-augmented generation — LLMs grounded in your own knowledge base.",
    icon: FileSearch,
  },
  {
    name: "Vector Databases",
    description: "Pinecone, Weaviate, pgvector for fast semantic search.",
    icon: Database,
  },
  {
    name: "Computer Vision & Multimodal AI",
    description: "Image, video and voice understanding in a single model.",
    icon: Eye,
  },
  {
    name: "Voice AI",
    description: "Voice bots, transcription and text-to-speech.",
    icon: Mic,
  },
  {
    name: "MLOps & LLMOps",
    description: "Production ML pipelines with monitoring and continuous fine-tuning.",
    icon: GitBranch,
  },
  {
    name: "Cloud-Native & Serverless",
    description: "AWS and Kubernetes-based auto-scaling infrastructure for AI workloads.",
    icon: Cloud,
  },
  {
    name: "Predictive Analytics & AI-BI",
    description: "Forecasting and real-time business intelligence dashboards.",
    icon: BarChart3,
  },
  {
    name: "Low-Code/No-Code AI Automation",
    description: "RPA plus AI for faster workflow automation without heavy development.",
    icon: Zap,
  },
];
