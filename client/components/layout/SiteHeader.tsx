import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/roadmaps", label: "Explore Roadmaps" },
  { to: "/assessment", label: "Career Assessment" },
  { to: "/contact", label: "Contact" },
];

export const SiteHeader: React.FC = () => {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-extrabold text-xl tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(56,189,248,0.55)]">Ascendify</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => {
            const active = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  active
                    ? "text-foreground bg-accent/40"
                    : "text-foreground/70 hover:text-foreground hover:bg-accent/30",
                )}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="gradient" className="hidden sm:inline-flex shadow-neon">
            <Link to="/signin">Sign In</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
