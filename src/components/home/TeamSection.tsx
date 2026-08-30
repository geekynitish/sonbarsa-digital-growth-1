import { Linkedin, Twitter } from "lucide-react";

const team = [
  {
    name: "Satya Prakash",
    role: "Chief Executive Officer",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Moly",
    role: "Product Manager",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Pranaw S",
    role: "CTO",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Lali",
    role: "Co-Founder",
    linkedin: "#",
    twitter: "#",
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const TeamSection = () => {
  return (
    <section id="team" className="py-16 md:py-24 border-t border-border">
      <div className="tg-container max-w-[720px] text-center">
        <h2 className="text-2xl sm:text-3xl mb-4">
          Meet the team &amp; <span className="text-accent-word">advisory board</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
          Got a great idea or looking for a remote dedicated team? Simply reach us
          and see what we can do for you.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold">
                {getInitials(member.name)}
              </div>
              <h3 className="font-bold text-sm">{member.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">{member.role}</p>
              <div className="flex items-center justify-center gap-2">
                <a
                  href={member.linkedin}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={`${member.name}'s LinkedIn`}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href={member.twitter}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={`${member.name}'s Twitter`}
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
