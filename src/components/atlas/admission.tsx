import { MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { PHONE_DISPLAY, TEL_HREF, WHATSAPP_HREF } from "./site-data";

export function Admission() {
  return (
    <section id="admission" className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-navy px-6 py-14 text-center shadow-lift sm:px-12">
            <div className="grid-paper absolute inset-0 opacity-60" aria-hidden />
            <div
              className="absolute -right-20 -top-20 size-72 rounded-full bg-gold/20 blur-3xl"
              aria-hidden
            />
            <div className="relative mx-auto max-w-3xl">
              <p className="text-script text-3xl text-gold">A Better Tomorrow Begins Today!</p>
              <h2 className="mt-3 text-3xl font-extrabold text-navy-foreground sm:text-4xl lg:text-5xl">
                Admissions Open
              </h2>
              <p className="mt-4 text-base text-navy-foreground/75">
                Give your child a strong foundation for a brighter future.
              </p>
              <p className="mt-5 inline-block rounded-full border border-navy-foreground/20 bg-navy-foreground/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">
                Classes 4th to 10th | CBSE / ICSE | All Subjects
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button asChild variant="gold" size="lg">
                  <a href="#contact">
                    <Send className="size-4" />
                    Enquire Now
                  </a>
                </Button>
                <Button asChild variant="outlineLight" size="lg">
                  <a href={TEL_HREF}>
                    <Phone className="size-4" />
                    Call {PHONE_DISPLAY}
                  </a>
                </Button>
                <Button asChild variant="outlineLight" size="lg">
                  <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
                    <MessageCircle className="size-4" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
