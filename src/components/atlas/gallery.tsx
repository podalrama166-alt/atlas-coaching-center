import { useState } from "react";
import { X } from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import classroom from "@/assets/about-classroom.jpg";
import student from "@/assets/hero-student.jpg";

const images = [
  { src: classroom, alt: "Classroom teaching session at ATLAS", category: "Classes", span: "sm:col-span-2 sm:row-span-1" },
  { src: g1, alt: "Students studying together at ATLAS", category: "Students", span: "sm:row-span-2" },
  { src: g2, alt: "Regular practice work in an exercise book", category: "Activities", span: "" },
  { src: g3, alt: "One-on-one doubt clearing session", category: "Institute", span: "" },
  { src: g4, alt: "Students celebrating their results", category: "Results", span: "sm:col-span-2" },
  { src: student, alt: "ATLAS student in uniform", category: "Events", span: "sm:row-span-2" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Gallery"
          title="Life at ATLAS"
          subtitle="Classes, students, activities and moments of achievement."
        />

        <div className="mt-14 grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-3 lg:auto-rows-[220px] lg:grid-cols-4">
          {images.map((img, i) => (
            <Reveal key={img.alt} delay={i * 60} className={`h-full ${img.span}`}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative h-full w-full overflow-hidden rounded-3xl shadow-card"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
                <span className="absolute bottom-4 left-4 rounded-full bg-gradient-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-gold-foreground">
                  {img.category}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active !== null ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/90 p-4 backdrop-blur animate-fade-in"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Close image"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-navy-foreground/25 text-navy-foreground transition-colors hover:bg-navy-foreground/10"
          >
            <X className="size-5" />
          </button>
          <img
            src={images[active]?.src}
            alt={images[active]?.alt ?? ""}
            className="max-h-[85vh] w-auto max-w-full rounded-2xl shadow-lift"
            onClick={(e) => e.stopPropagation()}
          />

        </div>
      ) : null}
    </section>
  );
}
