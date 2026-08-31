import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Saul Goodman",
    role: "CEO & Founder",
    image: "https://img.sonbarsa.com/img/testimonial-1.jpg",
    content: "The team was incredibly knowledgeable and always up-to-date on the latest trends and best practices in digital marketing. They worked tirelessly to optimize my website, improve my search engine rankings, and create engaging content that resonated with my audience.",
  },
  {
    name: "Sara Wilsson",
    role: "Designer",
    image: "https://img.sonbarsa.com/img/testimonial-2.jpg",
    content: "Overall, I am extremely satisfied with the quality of service I received from SonBarsa, and would highly recommend them to any business looking for reliable and effective IT solutions. Their expertise and professionalism made all the difference in the success of my business.",
  },
  {
    name: "Jena Karlis",
    role: "Store Owner",
    image: "https://img.sonbarsa.com/img/testimonial-3.jpg",
    content: "Throughout the entire process, the team was communicative, and kept me informed every step of the way. They were always available to answer any questions or concerns I had, and provided excellent customer service.",
  },
  {
    name: "Matt Brandon",
    role: "Freelancer",
    image: "https://img.sonbarsa.com/img/testimonial-4.jpg",
    content: "I recently had the pleasure of working with SonBarsa for my business needs, and I can confidently say that the experience was nothing short of exceptional. From the moment I contacted them, the team was professional, knowledgeable, and efficient.",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="tg-container max-w-[720px] text-center">
        <h2 className="text-2xl sm:text-3xl mb-4">
          What clients say about <span className="text-accent-word">working with us</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
          Real results from real businesses — see how our partnerships drive measurable growth.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 pt-12 text-left">
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
