import { useState, useEffect } from "react";
import { Link } from "@/lib/router-shim";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.svg?url";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "/services",
    children: [
      { name: "AI & Machine Learning", href: "/services/ai-ml" },
      { name: "Generative AI Solutions", href: "/services/generative-ai" },
      { name: "AI Chatbots & Agents", href: "/services/chatbots" },
      { name: "Data Analytics & BI", href: "/services/data-analytics" },
      { name: "Intelligent Automation", href: "/services/automation" },
      { name: "Web & App Development", href: "/services/web-development" },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

interface NavbarProps {
  pathname: string;
}

// `pathname` comes from Astro.url.pathname at build time (passed down via
// SiteHeader), not react-router's useLocation(). It has to be correct in
// the very first render: React doesn't re-apply a mismatched className
// during hydration unless the component re-renders for some other reason,
// so if this depended on a client-only value the active nav link would
// silently stay wrong (highlighting "Home") on every page until the user
// interacted with something.
export const Navbar = ({ pathname }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Astro.url.pathname carries a trailing slash for every route except "/"
  // (it mirrors the emitted /route/index.html path); nav hrefs never do —
  // strip it so "/contact/" still matches the "/contact" link.
  const normalizedPathname = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [normalizedPathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto w-full max-w-6xl px-6 flex items-center justify-between py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img
            src={logo}
            alt="SonBarsa - Digital Marketing & IT Solutions Company"
            className="h-8 w-auto"
            width={112}
            height={32}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => link.children && setOpenDropdown(link.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={link.href}
                className={cn(
                  "tg-nav-link flex items-center gap-1 py-2 text-[15px]",
                  normalizedPathname === link.href && "is-active"
                )}
              >
                {link.name}
                {link.children && (
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-300",
                      openDropdown === link.name && "rotate-180"
                    )}
                  />
                )}
              </Link>

              {/* Dropdown */}
              {link.children && (
                <div
                  className={cn(
                    "absolute top-full left-0 mt-2 w-64 bg-card rounded-xl border border-border overflow-hidden transition-all duration-200 origin-top",
                    openDropdown === link.name
                      ? "opacity-100 scale-100 visible"
                      : "opacity-0 scale-95 invisible"
                  )}
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.name}
                      to={child.href}
                      className="block px-5 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-muted transition-colors duration-200"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Theme Toggle */}
        <div className="hidden lg:flex items-center">
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto bg-background border-b border-border transition-all duration-300",
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        )}
      >
        <div className="tg-container py-6 space-y-1">
          {navLinks.map((link) => (
            <div key={link.name}>
              <Link
                to={link.href}
                className={cn(
                  "block px-3 py-2.5 rounded-lg font-medium transition-colors",
                  normalizedPathname === link.href
                    ? "text-primary bg-primary/5"
                    : "text-foreground/80 hover:text-primary hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
              {link.children && (
                <div className="pl-4 mt-1 space-y-1">
                  {link.children.map((child) => (
                    <Link
                      key={child.name}
                      to={child.href}
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};
