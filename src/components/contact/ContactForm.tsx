import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const CONTACT_API_ENDPOINT = "/api/contact";

export const ContactForm = () => {
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

    try {
      const response = await fetch(CONTACT_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          company: formData.company || undefined,
          service: formData.service || undefined,
          message: formData.message,
        }),
      });

      if (response.ok) {
        toast({
          title: "Message Sent! ✓",
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
      } else {
        const data = await response.json().catch(() => ({}));
        const errMsg =
          (data as { error?: string }).error ||
          "Something went wrong. Please try emailing us directly at lali@sonbarsa.com";
        toast({
          title: "Failed to send",
          description: errMsg,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network error",
        description: "Please check your connection and try again, or email us at lali@sonbarsa.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-10 md:py-14 border-t border-border">
      <div className="tg-container max-w-[560px]">
        <h2 className="text-2xl sm:text-3xl text-center mb-8">Send us a message</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                Your Name *
              </label>
              <Input
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="h-12"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                Email Address *
              </label>
              <Input
                id="contact-email"
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
              <label htmlFor="contact-phone" className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <Input
                id="contact-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="h-12"
              />
            </div>
            <div>
              <label htmlFor="contact-company" className="block text-sm font-medium mb-2">
                Company Name
              </label>
              <Input
                id="contact-company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company"
                className="h-12"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-service" className="block text-sm font-medium mb-2">
              Service Interested In
            </label>
            <select
              id="contact-service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-lg border border-input bg-background"
            >
              <option value="">Select a service</option>
              <option value="ai-ml">AI &amp; Machine Learning</option>
              <option value="generative-ai">Generative AI &amp; LLMs</option>
              <option value="data-analytics">Data Analytics &amp; BI</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="web-development">Web Development</option>
              <option value="mobile-apps">Mobile App Development</option>
              <option value="cloud-aws">Cloud &amp; AWS Services</option>
              <option value="chatbots">WhatsApp &amp; Social Bots</option>
              <option value="cms">CMS Solutions</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
              Your Message *
            </label>
            <Textarea
              id="contact-message"
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
  );
};
