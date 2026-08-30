import { techStack } from "@/data/techStack";

export const TechStackSection = () => {
  return (
    <section className="py-16 md:py-20 border-t border-border">
      <div className="tg-container max-w-[840px] text-center">
        <h2 className="text-2xl sm:text-3xl mb-4">
          Built on the <span className="text-accent-word">latest AI stack</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
          We keep pace with where AI is actually heading — not just LLMs, but the
          full modern stack around them.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-12 text-left">
          {techStack.map((item) => (
            <div key={item.name} className="rounded-xl border border-border p-5">
              <item.icon className="w-6 h-6 text-primary mb-3" strokeWidth={1.75} />
              <h3 className="font-bold text-sm mb-1.5">{item.name}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
