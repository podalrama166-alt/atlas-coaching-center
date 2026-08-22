import { MessageCircle, Phone, GraduationCap } from "lucide-react";
import { TEL_HREF, WHATSAPP_HREF } from "./site-data";

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-foreground/10 bg-navy-deep/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-3 divide-x divide-navy-foreground/10">
        <a
          href={TEL_HREF}
          className="flex flex-col items-center gap-1 py-3 text-[0.7rem] font-bold uppercase tracking-wider text-navy-foreground"
        >
          <Phone className="size-5 text-gold" />
          Call Now
        </a>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-[0.7rem] font-bold uppercase tracking-wider text-navy-foreground"
        >
          <MessageCircle className="size-5 text-gold" />
          WhatsApp
        </a>
        <a
          href="#admission"
          className="flex flex-col items-center gap-1 bg-gradient-gold py-3 text-[0.7rem] font-bold uppercase tracking-wider text-gold-foreground"
        >
          <GraduationCap className="size-5" />
          Admission
        </a>
      </div>
    </div>
  );
}
