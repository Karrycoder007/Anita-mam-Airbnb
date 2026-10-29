import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { faqs, rules, site } from "@/lib/site";

export const metadata: Metadata = { title: `Plan your stay | ${site.name}` };

export default function Contact() {
  return (
    <div className="px-6 pb-28 pt-36 md:px-12 md:pt-48">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-[clamp(3.5rem,9vw,9rem)] leading-[0.92] tracking-[-0.02em]">Plan your stay</h1>

        <div className="mt-20 grid gap-20 lg:grid-cols-[1.2fr_1fr]">
          <ContactForm />
          <aside className="grid content-start gap-10">
            <div>
              <h2 className="font-display text-3xl">Talk to us directly</h2>
              <div className="mt-4 grid gap-1 text-lg text-moss">
                <a href={`https://wa.me/${site.whatsapp}`} className="underline underline-offset-4 hover:text-olive">WhatsApp</a>
                <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-olive">{site.email}</a>
                <a href={site.airbnbUrl} className="underline underline-offset-4 hover:text-olive">Book on Airbnb</a>
              </div>
            </div>
            <div>
              <h2 className="font-display text-3xl">House rules</h2>
              <ul className="mt-4 grid gap-1 text-lg text-moss">{rules.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
          </aside>
        </div>

        <section id="map" className="mt-32 scroll-mt-28">
          <h2 className="mb-8 font-display text-5xl md:text-6xl">Where we are</h2>
          <div className="overflow-hidden rounded-3xl bg-sage">
            <iframe
              title={`Map of ${site.area}`}
              src="https://www.google.com/maps?q=Calangute%2C%20Goa&output=embed"
              className="h-[420px] w-full border-0 [filter:grayscale(.45)_sepia(.12)_hue-rotate(40deg)] md:h-[560px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-4 text-moss">The exact address and a pin are shared on booking.</p>
        </section>

        <section className="mt-32 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="font-display text-5xl md:text-6xl">Good to know</h2>
          <div>
            {faqs.map((f) => (
              <details key={f.q} className="border-t border-moss/25 py-6 last:border-b">
                <summary className="flex items-center justify-between gap-6 text-xl">
                  {f.q}<span className="plus text-3xl text-olive transition-transform duration-300">+</span>
                </summary>
                <p className="mt-4 max-w-xl text-lg text-moss">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
