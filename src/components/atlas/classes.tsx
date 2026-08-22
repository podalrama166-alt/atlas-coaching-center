import { ArrowUpRight, Check, GraduationCap, Rocket, Sprout } from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";
import { Button } from "@/components/ui/button";

const groups = [
  {
    icon: Sprout,
    classes: "Class 4 – 5",
    stage: "Foundation Level",
    points: ["Strong basics", "Concept development", "Regular practice", "Learning confidence"],
  },
  {
    icon: Rocket,
    classes: "Class 6 – 8",
    stage: "Middle School",
    points: ["Concept clarity", "Subject understanding", "Regular tests", "Academic improvement"],
    featured: true,
  },
  {
    icon: GraduationCap,
    classes: "Class 9 – 10",
    stage: "Board Preparation",
    points: [
      "Strong concepts",
      "Exam-focused preparation",
      "Regular test series",
      "Board examination preparation",
    ],
  },
];

export function Classes() {
  return (
    <section id="classes" className="bg-secondary/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our Programs"
          title="Classes We Offer"
          subtitle="Structured coaching for every stage of school — from building basics to scoring better in the boards."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {groups.map((g, i) => (
            <Reveal key={g.classes} delay={i * 90}>
              <article
                className={`group flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift ${
                  g.featured
                    ? "border-transparent bg-gradient-navy text-navy-foreground shadow-lift"
                    : "border-border bg-card shadow-card"
                }`}
              >
                <span
                  className={`grid size-14 place-items-center rounded-2xl ${
                    g.featured ? "bg-gradient-gold text-gold-foreground" : "bg-accent text-primary"
                  }`}
                >
                  <g.icon className="size-7" />
                </span>
                <h3
                  className={`mt-6 text-2xl font-extrabold ${g.featured ? "text-navy-foreground" : "text-navy"}`}
                >
                  {g.classes}
                </h3>
                <p
                  className={`mt-1 text-xs font-bold uppercase tracking-[0.18em] ${
                    g.featured ? "text-gold" : "text-primary"
                  }`}
                >
                  {g.stage}
                </p>
                <ul className="mt-6 space-y-3">
                  {g.points.map((p) => (
                    <li
                      key={p}
                      className={`flex items-start gap-2.5 text-sm ${
                        g.featured ? "text-navy-foreground/85" : "text-muted-foreground"
                      }`}
                    >
                      <Check
                        className={`mt-0.5 size-4 shrink-0 ${g.featured ? "text-gold" : "text-primary"}`}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-2">
                  <Button asChild variant={g.featured ? "gold" : "outlineNavy"} size="sm">
                    <a href="#admission">
                      Enquire
                      <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 rounded-3xl bg-card px-6 py-6 text-center shadow-card">
            <p className="font-display text-xl font-extrabold tracking-wide text-navy">CBSE | ICSE</p>
            <span className="hidden h-6 w-px bg-border sm:block" />
            <p className="text-sm font-semibold text-primary">All Subjects Covered</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
