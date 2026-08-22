import { Medal, Trophy } from "lucide-react";
import { Reveal } from "./reveal";
import { TOPPERS } from "./site-data";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

export function Results() {
  return (
    <section id="results" className="relative overflow-hidden bg-gradient-navy py-20 lg:py-28">
      <div className="grid-paper absolute inset-0 opacity-60" aria-hidden />
      <div
        className="absolute left-1/2 top-0 size-[30rem] -translate-x-1/2 rounded-full bg-gold/15 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold">
            <Trophy className="size-3.5" />
            Session 2025 – 2026
          </span>
          <h2 className="mt-5 text-3xl font-extrabold text-navy-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Congratulations to Our <span className="text-gold">10th Toppers</span>
          </h2>
          <p className="text-script mt-4 text-2xl text-gold sm:text-3xl">
            Your hard work today… Your bright future tomorrow!
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOPPERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-navy-foreground/12 bg-navy-foreground/6 p-7 text-center backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50">
                <span className="absolute right-4 top-4 rounded-full bg-gradient-gold px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-gold-foreground">
                  Rank {t.rank}
                </span>
                {/* Student photograph slot — replace the initials block with an <img> when photos are available. */}
                <div className="mx-auto grid size-20 place-items-center rounded-full border-2 border-gold/60 bg-navy-deep font-display text-2xl font-extrabold text-gold">
                  {initials(t.name)}
                </div>
                <Medal className="mx-auto -mt-3 size-7 text-gold drop-shadow" />
                <h3 className="mt-4 text-base font-bold leading-snug text-navy-foreground">
                  {t.name}
                </h3>
                <p className="mt-3 font-display text-4xl font-extrabold text-gold">{t.score}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-navy-foreground/60">
                  Class 10 • 2025-26
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
