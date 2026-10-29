"use client";
import { useState } from "react";
import { site } from "@/lib/site";

const field = "w-full border-b border-moss/30 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-moss/50 focus:border-olive";

export default function ContactForm() {
  const [f, setF] = useState({ name: "", checkin: "", checkout: "", guests: "2", note: "" });
  const on = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const t = `Hi, I'd like to enquire about ${site.name}.\nName: ${f.name}\nCheck-in: ${f.checkin}\nCheck-out: ${f.checkout}\nGuests: ${f.guests}\n${f.note}`;
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t)}`, "_blank");
  };

  return (
    <form onSubmit={send} className="grid gap-8">
      <label className="grid gap-1 text-sm text-moss">Your name<input required value={f.name} onChange={on("name")} className={field} placeholder="Full name" /></label>
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="grid gap-1 text-sm text-moss">Check-in<input required type="date" value={f.checkin} onChange={on("checkin")} className={field} /></label>
        <label className="grid gap-1 text-sm text-moss">Check-out<input required type="date" value={f.checkout} onChange={on("checkout")} className={field} /></label>
      </div>
      <label className="grid gap-1 text-sm text-moss">Guests
        <select value={f.guests} onChange={on("guests")} className={field}>{[1,2,3,4,5,6,7,8].map((n) => <option key={n}>{n}</option>)}</select>
      </label>
      <label className="grid gap-1 text-sm text-moss">Anything we should know<textarea rows={3} value={f.note} onChange={on("note")} className={field} placeholder="Occasion, pets, late arrival..." /></label>
      <button className="justify-self-start rounded-full bg-moss px-8 py-4 text-chalk transition-colors hover:bg-olive">Send on WhatsApp</button>
    </form>
  );
}
