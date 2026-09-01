import { Mail, Phone, MapPin, Clock } from "lucide-react";

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

export const ContactInfo = () => (
  <>
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
  </>
);
