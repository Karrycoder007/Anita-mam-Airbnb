import Link from "next/link";
import { site } from "@/lib/site";

const socials = [
  { label: "Instagram", href: site.socials.instagram },
  { label: "Facebook", href: site.socials.facebook },
  { label: "YouTube", href: site.socials.youtube },
  { label: "WhatsApp", href: `https://wa.me/${site.whatsapp}` },
].filter((s) => s.href);

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-forest px-6 pb-8 pt-24 text-chalk md:px-12">
      <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="max-w-sm font-display text-4xl leading-tight">Slow mornings, a pool outside your door.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-chalk/35 px-5 py-2.5 text-[15px] transition-colors hover:bg-chalk hover:text-forest">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="grid content-start gap-2 text-chalk/75">
          <p className="mb-2 text-chalk">Explore</p>
          <Link href="/#story" className="hover:text-chalk">The stay</Link>
          <Link href="/#gallery" className="hover:text-chalk">Gallery</Link>
          <Link href="/#amenities" className="hover:text-chalk">Amenities</Link>
          <Link href="/contact" className="hover:text-chalk">Contact</Link>
        </div>
        <div className="grid content-start gap-2 text-chalk/75">
          <p className="mb-2 text-chalk">Reach us</p>
          <a href={`https://wa.me/${site.whatsapp}`} className="hover:text-chalk">WhatsApp</a>
          <a href={`mailto:${site.email}`} className="hover:text-chalk">{site.email}</a>
          <a href={site.airbnbUrl} className="hover:text-chalk">Airbnb listing</a>
        </div>
        <div className="grid content-start gap-2 text-chalk/75">
          <p className="mb-2 text-chalk">Find us</p>
          <p>{site.area}</p>
          <p>Check-in {site.checkIn}</p>
          <p>Check-out {site.checkOut}</p>
        </div>
      </div>
      <p className="mt-20 select-none font-display text-[clamp(4rem,18vw,17rem)] leading-[0.8] text-chalk/10">{site.name}</p>
      <p className="mt-6 text-sm text-chalk/50">© {new Date().getFullYear()} {site.name}. Website by Karry Creative Studios.</p>
    </footer>
  );
}