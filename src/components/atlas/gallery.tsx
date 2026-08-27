import { useCallback, useEffect, useState } from "react";
import { X, ImageIcon, Loader2 } from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";
import { fetchGalleryImages, type GalleryImage } from "@/lib/gallery";

const SPANS = [
  "sm:col-span-2",
  "sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
  "sm:row-span-2",
  "sm:col-span-2",
  "",
  "",
  "sm:col-span-2",
];

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<number | null>(null);

  const load = useCallback(async () => {
    try {
      setImages(await fetchGalleryImages());
    } catch {
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="gallery" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Gallery"
          title="Life at ATLAS"
          subtitle="Classes, students, activities and moments of achievement."
        />

        {loading ? (
          <div className="mt-14 flex items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-card/50 py-20 text-muted-foreground">
            <Loader2 className="size-5 animate-spin" />
            <span className="text-sm font-medium">Loading gallery…</span>
          </div>
        ) : images.length === 0 ? (
          <div className="mt-14 flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-gradient-gold text-gold-foreground">
              <ImageIcon className="size-6" />
            </span>
            <p className="font-display text-xl font-semibold">Photos coming soon</p>
            <p className="max-w-md text-sm text-muted-foreground">
              Our gallery is being updated with the latest moments from ATLAS classes, tests and
              celebrations.
            </p>
            <Link
              to="/admin"
              className="mt-2 rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Admin — Upload photos
            </Link>

          </div>
        ) : (
          <div className="mt-14 grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-3 lg:auto-rows-[220px] lg:grid-cols-4">
            {images.map((img, i) => (
              <Reveal
                key={img.id}
                delay={Math.min(i, 8) * 60}
                className={`h-full ${SPANS[i % SPANS.length]}`}
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="group relative h-full w-full overflow-hidden rounded-3xl shadow-card"
                >
                  <img
                    src={img.url}
                    alt={img.title || `ATLAS gallery photo ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-gradient-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-gold-foreground">
                    {img.category}
                  </span>
                  {img.title ? (
                    <span className="absolute bottom-4 right-4 max-w-[55%] truncate text-right text-xs font-semibold text-navy-foreground">
                      {img.title}
                    </span>
                  ) : null}
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {active !== null && images[active] ? (
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
            src={images[active]?.url}
            alt={images[active]?.title || "ATLAS gallery photo"}
            className="max-h-[85vh] w-auto max-w-full rounded-2xl shadow-lift"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </section>
  );
}
