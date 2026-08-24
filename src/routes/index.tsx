import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/atlas/navbar";
import { Hero } from "@/components/atlas/hero";
import { About } from "@/components/atlas/about";
import { Classes } from "@/components/atlas/classes";
import { Why } from "@/components/atlas/why";
import { Methodology } from "@/components/atlas/methodology";
import { Benefits } from "@/components/atlas/benefits";
import { Results } from "@/components/atlas/results";
import { Gallery } from "@/components/atlas/gallery";
import { Testimonials } from "@/components/atlas/testimonials";
import { Admission } from "@/components/atlas/admission";
import { Faq } from "@/components/atlas/faq";
import { Contact } from "@/components/atlas/contact";
import { Footer } from "@/components/atlas/footer";
import { StickyCta } from "@/components/atlas/sticky-cta";

const title = "ATLAS – CBSE / ICSE Coaching for Classes 4th to 10th";
const description =
  "ATLAS coaching for Classes 4–10, CBSE & ICSE. Concept-based learning, regular tests, doubt clearing and personal attention. Admissions open — call 8339863449.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Classes />
        <Why />
        <Methodology />
        <Benefits />
        <Results />
        <Gallery />
        <Testimonials />
        <Admission />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyCta />
    </div>
  );
}
