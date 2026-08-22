import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logo from "@/assets/atlas-logo.png";
import { NAV_LINKS, PHONE_DISPLAY, TEL_HREF } from "./site-data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-navy-deep/95 shadow-lift backdrop-blur"
          : "bg-navy-deep/60 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:py-4">
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <img
            src={logo}
            alt="ATLAS CBSE / ICSE Coaching logo"
            width={48}
            height={48}
            className="h-11 w-11 shrink-0 rounded-xl bg-navy-foreground/95 p-1"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-xl font-extrabold tracking-tight text-navy-foreground">
              ATLAS
            </span>
            <span className="block truncate text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-gold">
              CBSE / ICSE Coaching
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-navy-foreground/80 transition-colors hover:bg-navy-foreground/10 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="gold" size="sm" className="hidden sm:inline-flex">
            <a href={TEL_HREF}>
              <Phone className="size-4" />
              {PHONE_DISPLAY}
            </a>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 shrink-0 place-items-center rounded-xl border border-navy-foreground/20 text-navy-foreground transition-colors hover:bg-navy-foreground/10 xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-navy-foreground/10 bg-navy-deep xl:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-navy-foreground/85 transition-colors hover:bg-navy-foreground/10 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <Button asChild variant="gold" className="mt-2">
              <a href="#admission" onClick={() => setOpen(false)}>
                Admission Open
              </a>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
