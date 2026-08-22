import { Reveal, SectionHeading } from "./reveal";
import { Brain, Repeat, FileCheck2, LineChart, Wrench, Trophy } from "lucide-react";

const steps = [
  { icon: Brain, title: "Understand", text: "Build strong fundamentals and understand concepts clearly." },
  { icon: Repeat, title: "Practice", text: "Apply concepts through regular practice." },
  { icon: FileCheck2, title: "Test", text: "Conduct regular tests to evaluate student understanding." },
  { icon: LineChart, title: "Analyze", text: "Identify mistakes and areas that need improvement." },
  { icon: Wrench, title: "Improve", text: "Provide guidance, doubt clearing, and personalised support." },
  { icon: Trophy, title: "Achieve", text: "Help students become confident and perform better in examinations." },
];

export function Methodology() {
  return (
    <section id="methodology" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Teaching Methodology"
          title="How ATLAS Helps Students Learn"
          subtitle="A simple six-step cycle that turns effort into results."
        />

        <div className="relative mt-14">
          <div
            className="absolute left-6 top-0 hidden h-full w-px bg-border lg:left-1/2 lg:block"
            aria-hidden
          />
          <ol className="grid gap-5 lg:grid-cols-2 lg:gap-x-16">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 70} className="relative">
                <article className="flex h-full gap-5 rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="flex shrink-0 flex-col items-center gap-2">
                    <span className="grid size-12 place-items-center rounded-2xl bg-gradient-navy text-navy-foreground">
                      <s.icon className="size-5" />
                    </span>
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[0.65rem] font-bold text-primary">
                      Step {i + 1}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-navy">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
