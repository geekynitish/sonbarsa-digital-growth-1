const clients = [
  "Altech Kings of Structure",
  "Pernia's Pop-Up Shop",
  "Agashe Store",
  "Aashni & Co",
  "UKIERI",
  "Meena Bazaar",
];

export const ClientsSection = () => {
  return (
    <section className="py-16 border-t border-border">
      <div className="tg-container max-w-[640px] text-center">
        <p className="text-sm font-medium text-muted-foreground mb-6">
          Trusted by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {clients.map((name) => (
            <span key={name} className="text-sm font-medium text-foreground/70">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
