import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter } from "lucide-react";

const links = [
  { to: "/roadmaps", label: "Roadmaps" },
  { to: "/assessment", label: "Assessment" },
  { to: "/contact", label: "Contact" },
];

export const SiteFooter: React.FC = () => {
  return (
    <footer className="border-t border-border/50 bg-background/60">
      <div className="container py-10 grid gap-6 md:grid-cols-3 items-center">
        <div>
          <div className="font-extrabold text-xl">Ascendify</div>
          <p className="text-sm text-muted-foreground mt-2">
            Elevate your skills, amplify your career.
          </p>
        </div>
        <nav className="flex gap-4 md:justify-center">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex md:justify-end gap-3">
          <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-foreground">
            <Github className="size-5" />
          </a>
          <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground">
            <Twitter className="size-5" />
          </a>
        </div>
      </div>
      <div className="border-t border-border/50">
        <div className="container py-4 text-xs text-muted-foreground">© {new Date().getFullYear()} Ascendify. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default SiteFooter;
