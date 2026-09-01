import { Link } from "@/lib/router-shim";

export const NotFoundContent = () => (
  <main className="min-h-[70vh] flex items-center justify-center pt-20">
    <div className="tg-container max-w-[480px] text-center">
      <p className="text-sm font-medium text-muted-foreground mb-4">404</p>
      <h1 className="text-3xl sm:text-4xl tracking-tight mb-4">Page not found</h1>
      <p className="text-muted-foreground leading-relaxed mb-8">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/" className="text-primary font-medium hover:underline">
        Return to home
      </Link>
    </div>
  </main>
);
