import {
  BrainCircuit,
  ClipboardCheck,
  HelpCircle,
  Target,
  UserRoundCheck,
  Users,
} from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";

const features = [
  { icon: Users, title: "Expert Faculty", sub: "Learn from the Best" },
  { icon: BrainCircuit, title: "Concept-Based Learning", sub: "Strong Foundation, Clear Concepts" },
  { icon: ClipboardCheck, title: "Regular Test Series", sub: "Practice • Analyze • Improve" },
  { icon: UserRoundCheck, title: "Personal Attention", sub: "Every Student Matters" },
  { icon: HelpCircle, title: "Doubt Clearing Sessions", sub: "Clear Doubts, Gain Confidence" },
  { icon: Target, title: "Exam-Focused Preparation", sub: "Smart Strategies, Better Results" },
];

export function Why() {
  return (
    <section id="why" className="relative overflow-hidden bg-gradient-navy py-20 lg:py-28">
      <div className="grid-paper absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
            Why Choose ATLAS
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-navy-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            We Don&apos;t Just Teach, <span className="text-gold">We Build Futures</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-foreground/70">
            Everything at ATLAS is designed around one goal — helping every student understand
            better, practise more, and score higher.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <article className="group h-full rounded-3xl border border-navy-foreground/12 bg-navy-foreground/6 p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:bg-navy-foreground/10">
                <span className="grid size-13 place-items-center rounded-2xl bg-gradient-gold text-gold-foreground transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="size-6" />
                </span>
                <h3 className="mt-6 text-lg font-bold text-navy-foreground">{f.title}</h3>
                <p className="mt-1.5 text-sm text-navy-foreground/65">{f.sub}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
