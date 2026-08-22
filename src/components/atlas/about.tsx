import { BadgeCheck, BookOpenCheck, Layers, UserRoundCheck } from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";
import classroom from "@/assets/about-classroom.jpg";

const pillars = [
  "Concept clarity",
  "Strong fundamentals",
  "Regular practice",
  "Exam preparation",
  "Personalised attention",
  "Doubt clearing",
  "Regular assessment",
  "Student confidence",
];

const stats = [
  { icon: Layers, label: "Classes 4 – 10" },
  { icon: BookOpenCheck, label: "CBSE & ICSE" },
  { icon: BadgeCheck, label: "All Subjects" },
  { icon: UserRoundCheck, label: "Personal Attention" },
];

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-lift">
              <img
                src={classroom}
                alt="Teacher explaining a concept to attentive students at ATLAS"
                loading="lazy"
                width={1200}
                height={912}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 rounded-2xl bg-gradient-navy px-6 py-5 text-navy-foreground shadow-card sm:absolute sm:-bottom-8 sm:-right-4 sm:mt-0 sm:max-w-[15rem]">
              <p className="text-script text-2xl text-gold">Strong Concepts</p>
              <p className="text-sm font-semibold">Better Scores • Bright Future</p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="About ATLAS"
              title={
                <>
                  A Strong Foundation for a <span className="text-primary">Bright Tomorrow</span>
                </>
              }
              subtitle="ATLAS is a CBSE / ICSE coaching institute dedicated to helping students from Class 4th to Class 10th build strong academic foundations and achieve better results."
            />

            <Reveal delay={80}>
              <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {pillars.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm font-medium text-foreground">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-border bg-card p-4 text-center shadow-card transition-transform duration-300 hover:-translate-y-1"
                  >
                    <Icon className="mx-auto size-6 text-primary" />
                    <p className="mt-2 text-xs font-bold text-navy">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
