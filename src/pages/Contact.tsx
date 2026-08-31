import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "lali@sonbarsa.com",
    link: "mailto:lali@sonbarsa.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+91141-6761830",
    link: "tel:+91141-6761830",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "India",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon - Fri: 9AM - 6PM IST",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Contact SonBarsa — Talk to AI, ML &amp; Cloud Experts</title>
        <meta
          name="description"
          content="Contact SonBarsa for AI &amp; Machine Learning consulting, generative AI, LLMs, chatbots, predictive analytics, AWS cloud, web, mobile and SEO. Free consultation."
        />
        <meta
          name="keywords"
          content="contact SonBarsa, AI consulting, machine learning consultation, hire AI developers, generative AI experts, LLM consulting, cloud consulting"
        />
        <link rel="canonical" href="https://sonbarsa.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact SonBarsa — AI &amp; ML Experts" />
        <meta property="og:description" content="Free consultation for AI, ML, cloud and digital projects." />
        <meta property="og:url" content="https://sonbarsa.com/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact SonBarsa — AI &amp; ML Experts" />
        <meta name="twitter:description" content="Free consultation for AI, ML, cloud and digital projects." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact SonBarsa",
            "url": "https://sonbarsa.com/contact",
            "about": { "@id": "https://sonbarsa.com/#organization" },
            "mainEntity": {
              "@type": "ContactPoint",
              "contactType": "customer support",
              "email": "lali@sonbarsa.com",
              "telephone": "+911416761830",
              "areaServed": ["IN","US","AE","GB"],
              "availableLanguage": ["en","hi"]
            }
          })}
        </script>
      </Helmet>

      <Navbar />

      <main>
        {/* Hero */}
        <section className="pt-20 pb-16 text-center">
          <div className="tg-container max-w-[640px]">
            <p className="text-sm font-medium text-muted-foreground mb-5">Contact Us</p>
            <h1 className="text-4xl sm:text-5xl leading-[1.1] tracking-tight">
              Let's build something <span className="text-accent-word">amazing together</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              We work with ambitious leaders who want to define the future, not hide from it.
              Together, we achieve extraordinary outcomes.
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-12 border-t border-border">
          <div className="tg-container max-w-[640px]">
            <h2 className="sr-only">Contact information</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {contactInfo.map((info) => (
                <div key={info.title}>
                  <info.icon className="w-6 h-6 text-primary mx-auto mb-2.5" strokeWidth={1.75} />
                  <h3 className="font-bold text-sm mb-1">{info.title}</h3>
                  {info.link ? (
                    <a href={info.link} className="text-muted-foreground text-xs hover:text-primary transition-colors">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground text-xs">{info.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="tg-container max-w-[560px]">
            <h2 className="text-2xl sm:text-3xl text-center mb-10">Send us a message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="h-12"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@company.com"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="h-12"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="h-12"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-2">
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-input bg-background"
                >
                  <option value="">Select a service</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-apps">Mobile App Development</option>
                  <option value="cloud-aws">Cloud & AWS Services</option>
                  <option value="chatbots">WhatsApp & Social Bots</option>
                  <option value="cms">CMS Solutions</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your project..."
                  rows={5}
                />
              </div>

              <Button size="lg" type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
