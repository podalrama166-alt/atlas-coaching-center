import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "./reveal";
import { ADDRESS, PHONE_DISPLAY } from "./site-data";

// Answers are editable — update as more institute details become available.
const faqs = [
  {
    q: "Which classes does ATLAS provide coaching for?",
    a: "ATLAS provides coaching for students from Class 4th to Class 10th.",
  },
  { q: "Does ATLAS provide CBSE coaching?", a: "Yes, ATLAS provides coaching for the CBSE board." },
  { q: "Does ATLAS provide ICSE coaching?", a: "Yes, ATLAS provides coaching for the ICSE board." },
  { q: "Are all subjects covered?", a: "Yes, all subjects are covered for the classes we offer." },
  { q: "How can I contact ATLAS?", a: `You can call or WhatsApp us on ${PHONE_DISPLAY}.` },
  {
    q: "How can I enquire about admission?",
    a: `Fill the enquiry form on this page, or call / WhatsApp ${PHONE_DISPLAY}.`,
  },
  { q: "Where is ATLAS located?", a: `${ADDRESS}. Detailed directions will be shared on request.` },
];

export function Faq() {
  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Quick answers for students and parents."
        />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-border bg-card px-5 shadow-card"
              >
                <AccordionTrigger className="text-left text-sm font-bold text-navy hover:no-underline sm:text-base">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
