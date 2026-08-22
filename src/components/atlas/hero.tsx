import { ArrowRight, BookOpen, GraduationCap, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroStudent from "@/assets/hero-student.jpg";
import logo from "@/assets/atlas-logo.png";
import { TEL_HREF, PHONE_DISPLAY } from "./site-data";

const badges = ["CBSE / ICSE", "Classes 4th – 10th", "All Subjects"];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-navy pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="grid-paper absolute inset-0 opacity-70" aria-hidden />
      <div
        className="absolute -top-32 -right-24 size-[26rem] rounded-full bg-gold/20 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -left-24 size-[24rem] rounded-full bg-primary/40 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-navy-foreground/5 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold">
            <Sparkles className="size-3.5" />
            Admissions Open
          </div>

          <div className="mt-6 flex items-center gap-4">
            <img
              src={logo}
              alt="ATLAS logo"
              width={72}
              height={72}
              className="size-16 shrink-0 rounded-2xl bg-navy-foreground/95 p-1.5 shadow-lift"
            />
            <div className="min-w-0">
              <p className="font-display text-3xl font-extrabold leading-none tracking-tight text-navy-foreground">
                ATLAS
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                CBSE / ICSE Coaching
              </p>
            </div>
          </div>

          <h1 className="mt-7 text-4xl font-extrabold leading-[1.08] text-navy-foreground sm:text-5xl lg:text-6xl">
            Better Future
            <br />
            <span className="text-script text-5xl font-bold text-gold sm:text-6xl lg:text-7xl">
              Starts Here
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-foreground/75 sm:text-lg">
            Build Strong Concepts. Improve Your Scores. Achieve Your Goals. Focused CBSE &amp; ICSE
            coaching for students of Class 4th to Class 10th.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg">
              <a href="#admission">
                Admission Open
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <a href={TEL_HREF}>
                <Phone className="size-4" />
                Call {PHONE_DISPLAY}
              </a>
            </Button>
          </div>

          <a
            href="#classes"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-foreground/80 underline-offset-8 transition-colors hover:text-gold hover:underline"
          >
            <BookOpen className="size-4" />
            Explore Classes
          </a>

          <ul className="mt-9 flex flex-wrap gap-2">
            {badges.map((b) => (
              <li
                key={b}
                className="rounded-full border border-navy-foreground/15 bg-navy-foreground/5 px-4 py-2 text-xs font-semibold text-navy-foreground/85"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative animate-scale-in">
          <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-gold opacity-25 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[2rem] border border-navy-foreground/15 shadow-lift">
            <img
              src={heroStudent}
              alt="Smiling school student holding notebooks in a classroom"
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep/80 to-transparent" aria-hidden />
          </div>

          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-lift sm:left-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-gold text-gold-foreground">
              <GraduationCap className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-extrabold text-navy">Classes 4 – 10</span>
              <span className="block text-xs text-muted-foreground">CBSE &amp; ICSE • All Subjects</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
