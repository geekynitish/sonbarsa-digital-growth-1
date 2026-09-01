import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/Navbar";

interface SiteHeaderProps {
  pathname: string;
}

// The Navbar's ThemeToggle reads theme state via React Context
// (useTheme/ThemeProvider), and Radix's Tooltip primitives need
// TooltipProvider's context — both of those only work within the same
// hydrated island as their consumer, so this bundles them together as one
// client:load boundary instead of spreading provider + consumer across
// separate islands.
export const SiteHeader = ({ pathname }: SiteHeaderProps) => (
  <ThemeProvider defaultTheme="light" storageKey="sonbarsa-ui-theme">
    <TooltipProvider>
      <Toaster />
      <Navbar pathname={pathname} />
    </TooltipProvider>
  </ThemeProvider>
);
