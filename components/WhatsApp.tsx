import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export default function WhatsAppButton() {
  const msg = encodeURIComponent(`Hi, I'm interested in booking ${site.name}. Are my dates available?`);
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-4 text-base font-medium text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,.4)] transition-transform hover:scale-105 md:bottom-8 md:right-8"
    >
      <MessageCircle size={24} />
      <span>Chat on WhatsApp</span>
    </a>
  );
}