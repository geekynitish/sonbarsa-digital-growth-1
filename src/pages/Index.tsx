import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ClientsSection } from "@/components/home/ClientsSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SonBarsa — AI &amp; Machine Learning Company | Generative AI, Cloud, Web &amp; SEO</title>
        <meta
          name="description"
          content="SonBarsa is a leading AI &amp; Machine Learning company building generative AI, LLMs, computer vision, AI chatbots, predictive analytics, AWS cloud, web, mobile and SEO solutions for enterprises since 2008."
        />
        <meta
          name="keywords"
          content="SonBarsa, AI company, artificial intelligence company, machine learning company, generative AI, LLM development, AI chatbot, computer vision, predictive analytics, MLOps, AI consulting, AWS cloud, digital marketing, SEO, web development, mobile app development"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="canonical" href="https://sonbarsa.com/" />
        <meta property="og:title" content="SonBarsa — AI &amp; Machine Learning Company" />
        <meta property="og:description" content="Generative AI, LLMs, computer vision, chatbots, predictive analytics, AWS cloud, web, mobile and SEO solutions. Trusted by enterprises since 2008." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sonbarsa.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SonBarsa — AI &amp; Machine Learning Company" />
        <meta name="twitter:description" content="Generative AI, LLMs, computer vision, chatbots, predictive analytics, AWS cloud, web, mobile and SEO solutions. Trusted by enterprises since 2008." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "SonBarsa — AI & Machine Learning Company",
            "url": "https://sonbarsa.com/",
            "description": "AI & ML company delivering generative AI, LLMs, computer vision, chatbots, predictive analytics, AWS cloud, web, mobile and SEO solutions.",
            "isPartOf": { "@id": "https://sonbarsa.com/#website" },
            "about": [
              "Artificial Intelligence","Machine Learning","Generative AI","LLM",
              "Computer Vision","AI Chatbots","Predictive Analytics","MLOps",
              "AWS Cloud","Web Development","Mobile App Development","SEO"
            ]
          })}
        </script>
      </Helmet>

      <Navbar />
      
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ClientsSection />
      </main>

      <Footer />
    </>
  );
};

export default Index;
