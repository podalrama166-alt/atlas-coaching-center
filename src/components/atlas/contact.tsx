import { useState, type FormEvent } from "react";
import { MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal, SectionHeading } from "./reveal";
import { ADDRESS, PHONE_DISPLAY, TEL_HREF, WHATSAPP_HREF } from "./site-data";

export function Contact() {
  const [board, setBoard] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.success("Enquiry noted", {
      description: `Please also call ${PHONE_DISPLAY} so we can respond faster.`,
    });
    e.currentTarget.reset();
    setBoard("");
  }

  return (
    <section id="contact" className="bg-secondary/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact Us"
          title="Talk to ATLAS"
          subtitle="Send an enquiry or reach us directly — we're happy to help."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-4">
            <a
              href={TEL_HREF}
              className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-gold text-gold-foreground">
                <Phone className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Phone
                </span>
                <span className="block truncate text-lg font-extrabold text-navy">
                  {PHONE_DISPLAY}
                </span>
              </span>
            </a>

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-navy text-navy-foreground">
                <MessageCircle className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  WhatsApp
                </span>
                <span className="block truncate text-lg font-extrabold text-navy">Chat with us</span>
              </span>
            </a>

            <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-card">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent text-primary">
                <MapPin className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Address
                </span>
                <span className="block text-base font-bold text-navy">{ADDRESS}</span>
              </span>
            </div>

            {/* Google Maps placeholder — embed the institute map here once the exact location is available. */}
            <div className="grid h-52 place-items-center rounded-3xl border border-dashed border-border bg-card/60 text-center">
              <div className="px-6">
                <MapPin className="mx-auto size-6 text-primary" />
                <p className="mt-2 text-sm font-bold text-navy">Google Map coming soon</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  The exact map location will be added here.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
            >
              <h3 className="text-xl font-extrabold text-navy">Admission Enquiry</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill in the details and we will get back to you.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input id="studentName" name="studentName" required placeholder="Student's full name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="parentName">Parent Name</Label>
                  <Input id="parentName" name="parentName" placeholder="Parent's full name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="class">Class</Label>
                  <Input id="class" name="class" required placeholder="e.g. Class 8" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="board">Board</Label>
                  <Select value={board} onValueChange={setBoard}>
                    <SelectTrigger id="board">
                      <SelectValue placeholder="CBSE / ICSE" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CBSE">CBSE</SelectItem>
                      <SelectItem value="ICSE">ICSE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="10-digit mobile number" />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" rows={4} placeholder="Tell us what you need help with" />
                </div>
              </div>

              <Button type="submit" variant="gold" size="lg" className="mt-6 w-full">
                <Send className="size-4" />
                Submit Enquiry
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
