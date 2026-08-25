import { useState, type FormEvent } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./reveal";
import { EMAIL } from "./site-data";

const recent = [
  {
    name: "Sasmita Panda",
    role: "Parent of Class 9 student",
    rating: 5,
    text: "Teachers explain every concept until my son understands it. His marks improved a lot within a few months.",
  },
  {
    name: "Aditya Sahu",
    role: "Class 10 student",
    rating: 5,
    text: "Regular tests and doubt clearing sessions gave me confidence for the board exam.",
  },
  {
    name: "Rashmi Nayak",
    role: "Parent of Class 6 student",
    rating: 4,
    text: "Small batches and personal attention. The staff keeps us updated about progress.",
  },
];

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn("size-4", i <= value ? "fill-gold text-gold" : "text-muted-foreground/40")}
        />
      ))}
    </span>
  );
}

export function Reviews() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim().slice(0, 100);
    const relation = String(data.get("relation") ?? "").trim().slice(0, 100);
    const review = String(data.get("review") ?? "").trim().slice(0, 1000);

    const body = [
      `Name: ${name}`,
      `Student / Class: ${relation}`,
      `Rating: ${rating} / 5`,
      "",
      "Review:",
      review,
    ].join("\n");

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      `ATLAS Review — ${name} (${rating}/5)`,
    )}&body=${encodeURIComponent(body)}`;

    toast.success("Thank you!", { description: `Your review is being sent to ${EMAIL}.` });
    form.reset();
    setRating(0);
  }

  return (
    <section id="reviews" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Reviews"
          title="Rate Your Experience"
          subtitle="Students and parents share how ATLAS has helped them."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {recent.map((r, i) => (
              <Reveal key={r.name} delay={i * 80}>
                <article className="h-full rounded-3xl border border-border bg-card p-6 shadow-card">
                  <Stars value={r.rating} />
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-bold text-navy">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
            >
              <h3 className="text-xl font-extrabold text-navy">Write a Review</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your review is sent to {EMAIL}.
              </p>

              <div className="mt-6 grid gap-4">
                <div className="grid gap-2">
                  <Label>Your Rating</Label>
                  <div className="flex gap-1.5" onMouseLeave={() => setHover(0)}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
                        onMouseEnter={() => setHover(i)}
                        onClick={() => setRating(i)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={cn(
                            "size-8",
                            i <= (hover || rating)
                              ? "fill-gold text-gold"
                              : "text-muted-foreground/40",
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reviewName">Your Name</Label>
                  <Input id="reviewName" name="name" required maxLength={100} placeholder="Full name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="relation">Student / Class</Label>
                  <Input id="relation" name="relation" maxLength={100} placeholder="e.g. Parent of Class 8 student" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="review">Your Review</Label>
                  <Textarea id="review" name="review" rows={5} required maxLength={1000} placeholder="Share your experience with ATLAS" />
                </div>
              </div>

              <Button type="submit" variant="gold" size="lg" className="mt-6 w-full">
                <Star className="size-4" />
                Submit Review
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
