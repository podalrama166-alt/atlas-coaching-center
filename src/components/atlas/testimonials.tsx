import { Quote, UserRound } from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";

// Placeholder testimonials — replace `quote` and `name` with genuine feedback when available.
const testimonials = [
  { name: "Student / Parent Testimonial", role: "Add name & class here", quote: "Add genuine student or parent feedback here." },
  { name: "Student / Parent Testimonial", role: "Add name & class here", quote: "Add genuine student or parent feedback here." },
  { name: "Student / Parent Testimonial", role: "Add name & class here", quote: "Add genuine student or parent feedback here." },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-secondary/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Students &amp; Parents Say"
          subtitle="Real feedback from the ATLAS family will appear here."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 90}>
              <article className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <Quote className="size-8 text-gold" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-primary">
                    <UserRound className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-navy">{t.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
