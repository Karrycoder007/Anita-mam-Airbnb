import { Car } from "lucide-react";
import { nearby } from "@/lib/site";

const small = (url: string) => url.replace("w=1800", "w=500");

export default function Nearby() {
  return (
    <section className="bg-moss px-6 py-24 text-chalk md:px-12 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1fr_1.15fr] md:gap-20">
        <div>
          <h2 className="font-display text-5xl leading-none md:text-7xl">Close to everything, quiet at home</h2>
          <p className="mt-6 max-w-md text-lg text-chalk/80">The beach, cafes and markets are a short drive away. Then you come back to the pool.</p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-chalk/20">
            <iframe
              title="Map of Calangute, Goa"
              src="https://www.google.com/maps?q=Calangute%2C%20Goa&output=embed"
              className="h-64 w-full border-0 [filter:grayscale(.5)_sepia(.15)_hue-rotate(40deg)] md:h-72"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <ul className="grid content-start gap-5">
          {nearby.map((n) => (
            <li key={n.name} className="flex items-center gap-5 rounded-2xl bg-chalk/[0.06] p-3 pr-5 transition-colors hover:bg-chalk/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={small(n.img)} alt={n.name} loading="lazy" className="h-24 w-24 shrink-0 rounded-xl object-cover md:h-28 md:w-28" />
              <div className="min-w-0">
                <p className="text-sm text-chalk/65">{n.tag}</p>
                <h3 className="font-display text-2xl leading-tight md:text-3xl">{n.name}</h3>
                <p className="mt-1.5 flex items-center gap-2 text-chalk/85">
                  <Car size={18} strokeWidth={1.6} /> {n.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}