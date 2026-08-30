import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | SonBarsa</title>
        <meta name="description" content="The page you're looking for doesn't exist or has moved." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Navbar />

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

      <Footer />
    </>
  );
};

export default NotFound;
