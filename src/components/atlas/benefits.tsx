import { Reveal, SectionHeading } from "./reveal";
import {
  Award,
  BookOpenCheck,
  Eye,
  Lightbulb,
  PencilRuler,
  ShieldCheck,
  Sparkles,
  Building2,
} from "lucide-react";

const major = [
  { icon: Lightbulb, title: "Concept Clarity" },
  { icon: Eye, title: "Better Focus" },
  { icon: PencilRuler, title: "Regular Practice" },
  { icon: Award, title: "Excellent Results" },
];

const more = [
  { icon: Building2, title: "Strong Foundation" },
  { icon: BookOpenCheck, title: "Better Understanding" },
  { icon: ShieldCheck, title: "Confidence Building" },
  { icon: Sparkles, title: "Exam Preparation" },
];

export function Benefits() {
  return (
    <section id="benefits" className="bg-secondary/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Student Benefits"
          title={
            <>
              We Help Students <span className="text-primary">Learn • Grow • Succeed</span>
            </>
          }
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {major.map((m, i) => (
            <Reveal key={m.title} delay={i * 80}>
              <article className="group h-full rounded-3xl bg-card p-7 text-center shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-gold text-gold-foreground transition-transform duration-300 group-hover:scale-110">
                  <m.icon className="size-7" />
                </span>
                <h3 className="mt-5 text-base font-bold text-navy">{m.title}</h3>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-6 grid gap-4 rounded-3xl border border-border bg-card p-6 sm:grid-cols-2 lg:grid-cols-4">
            {more.map((m) => (
              <div key={m.title} className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                  <m.icon className="size-5" />
                </span>
                <p className="min-w-0 text-sm font-semibold text-navy">{m.title}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
