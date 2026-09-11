import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "CEO, FinTech Startup, Mumbai",
    image: "https://img.sonbarsa.com/img/testimonial-1.jpg",
    content: "The SonBarsa team was incredibly knowledgeable and always up-to-date on the latest AI and ML trends. They built our predictive analytics pipeline in just 6 weeks — what our in-house team estimated would take 6 months. Truly exceptional.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Product, E-commerce Platform",
    image: "https://img.sonbarsa.com/img/testimonial-2.jpg",
    content: "Overall, I am extremely satisfied with the quality of service I received from SonBarsa. Their AI chatbot reduced our customer support tickets by 40% within the first month. Would highly recommend them to any business looking for reliable and effective AI solutions.",
  },
  {
    name: "James Whitfield",
    role: "CTO, Healthcare SaaS, London",
    image: "https://img.sonbarsa.com/img/testimonial-3.jpg",
    content: "Throughout the entire process, the team was communicative and kept us informed every step of the way. Their computer vision solution for our medical imaging platform is now processing 10,000+ scans per day in production — impressive engineering work.",
  },
  {
    name: "Khalid Al-Rashid",
    role: "Managing Director, Logistics Company, Dubai",
    image: "https://img.sonbarsa.com/img/testimonial-4.jpg",
    content: "I recently partnered with SonBarsa for our digital transformation, and the experience was nothing short of exceptional. Their AWS cloud migration cut our infrastructure costs by 35%, and the new mobile app they built has a 4.8-star rating on the App Store.",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-10 md:py-14 border-t border-border">
      <div className="tg-container max-w-[720px] text-center">
        <h2 className="text-2xl sm:text-3xl mb-4">
          What clients say about <span className="text-accent-word">working with us</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
          Real results from real businesses — see how our partnerships drive measurable growth.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 pt-8 text-left">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="rounded-xl border border-border p-6">
              <Quote className="w-5 h-5 text-primary mb-4" />

              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed mb-5">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} - ${testimonial.role}`}
                  className="w-10 h-10 rounded-full object-cover"
                  width={40}
                  height={40}
                  loading="lazy"
                />
                <div>
                  <div className="font-bold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
