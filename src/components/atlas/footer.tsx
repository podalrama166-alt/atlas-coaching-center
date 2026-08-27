import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import logo from "@/assets/atlas-logo.png";
import { ADDRESS, EMAIL, MAPS_URL, PHONE_DISPLAY, TEL_HREF, YOUTUBE_URL } from "./site-data";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Classes", href: "#classes" },
  { label: "Why Choose Us", href: "#why" },
  { label: "Results", href: "#results" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep pb-24 pt-16 text-navy-foreground lg:pb-10">
      <div className="grid-paper absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="ATLAS logo"
                loading="lazy"
                width={56}
                height={56}
                className="size-13 shrink-0 rounded-2xl bg-navy-foreground/95 p-1.5"
              />
              <div className="min-w-0">
                <p className="font-display text-2xl font-extrabold leading-none">ATLAS</p>
                <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">
                  CBSE / ICSE Coaching
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-navy-foreground/70">Classes 4th to 10th</p>
            <p className="text-script mt-4 text-2xl text-gold">Better Future Starts Here</p>

            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-navy-foreground/60">
                ATLAS CLASSES
              </p>
              <div className="mt-3 flex gap-3">
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="ATLAS YouTube channel"
                  className="grid size-10 place-items-center rounded-xl border border-navy-foreground/20 text-navy-foreground/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <Youtube className="size-4" />
                </a>
                <span
                  aria-label="Instagram — link coming soon"
                  className="grid size-10 place-items-center rounded-xl border border-navy-foreground/20 text-navy-foreground/80"
                >
                  <Instagram className="size-4" />
                </span>
                <span
                  aria-label="Facebook — link coming soon"
                  className="grid size-10 place-items-center rounded-xl border border-navy-foreground/20 text-navy-foreground/80"
                >
                  <Facebook className="size-4" />
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Quick Links</h3>
            <ul className="mt-5 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-navy-foreground/70 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Contact</h3>
            <ul className="mt-5 space-y-4 text-sm text-navy-foreground/75">
              <li>
                <a href={TEL_HREF} className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Phone className="size-4 shrink-0 text-gold" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 break-all transition-colors hover:text-gold"
                >
                  <Mail className="size-4 shrink-0 text-gold" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-gold"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                  {ADDRESS}
                </a>
              </li>
            </ul>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-6 flex items-center gap-3 rounded-2xl border border-navy-foreground/15 bg-navy-foreground/5 p-4 transition-colors hover:border-gold hover:bg-navy-foreground/10"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-gold text-gold-foreground">
                <Navigation className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-navy-foreground">Find Us</span>
                <span className="block text-xs text-navy-foreground/60 group-hover:text-gold">
                  Open our location in Google Maps
                </span>
              </span>
              <ExternalLink className="ml-auto size-4 shrink-0 text-navy-foreground/50 group-hover:text-gold" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-navy-foreground/10 pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm font-semibold text-gold">
            ATLAS – Better Education, Better Tomorrow!
          </p>
          <div className="flex flex-col items-center gap-1 sm:items-end">
            <p className="text-xs text-navy-foreground/50">
              © {new Date().getFullYear()} ATLAS CBSE / ICSE Coaching. All rights reserved.
            </p>
            <Link to="/admin" className="text-xs text-navy-foreground/40 transition-colors hover:text-gold">
              Admin — Manage Gallery
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
