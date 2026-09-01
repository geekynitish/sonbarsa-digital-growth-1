const industries = [
  { name: "AI & Machine Learning", projects: 25 },
  { name: "Newspaper & Publishing", projects: 6 },
  { name: "E-commerce", projects: 45 },
  { name: "Healthcare & MedTech", projects: 12 },
  { name: "Fashion & Retail", projects: 15 },
  { name: "Education & EdTech", projects: 18 },
  { name: "Finance & FinTech", projects: 8 },
  { name: "Construction & Engineering", projects: 10 },
  { name: "Real Estate & PropTech", projects: 10 },
];

export const PortfolioIndustries = () => (
  <section className="py-16 md:py-20 border-t border-border">
    <div className="tg-container max-w-[720px] text-center">
      <h2 className="text-2xl sm:text-3xl mb-4">Industries we serve</h2>
      <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
        Our expertise spans across multiple industries, delivering tailored solutions for each.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-12">
        {industries.map((industry) => (
          <div key={industry.name} className="rounded-xl border border-border p-6 text-center">
            <h3 className="font-bold mb-1.5">{industry.name}</h3>
            <p className="text-primary font-semibold text-sm">{industry.projects}+ Projects</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
