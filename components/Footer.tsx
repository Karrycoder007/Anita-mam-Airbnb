import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-forest px-6 pb-8 pt-24 text-chalk md:px-12">
      <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <p className="max-w-sm font-display text-4xl leading-tight">Slow mornings, a pool outside your door.</p>
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
      <p className="mt-20 select-none font-display text-[clamp(5rem,22vw,21rem)] leading-[0.8] text-chalk/10">{site.name}</p>
      <p className="mt-6 text-sm text-chalk/50">© {new Date().getFullYear()} {site.name}. Website by Karry Creative Studios.</p>
    </footer>
  );
}
