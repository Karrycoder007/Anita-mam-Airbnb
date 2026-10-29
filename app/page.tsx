import Link from "next/link";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Gallery from "@/components/Gallery";
import Spaces from "@/components/Spaces";
import { amenities, nearby, reviews, site } from "@/lib/site";
  import Amenities from "@/components/Amenities";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="story" className="px-6 py-28 md:px-12 md:py-44">
        <div className="mx-auto max-w-6xl">
          <Statement text="Three bedrooms on the ground floor, a pool you can see from the sofa, and the unhurried side of Calangute just beyond the gate. Bring the whole family or the whole group." />
          <dl className="mt-20 grid grid-cols-2 gap-y-10 border-t border-moss/20 pt-10 md:grid-cols-4">
            {[["Guests", "Up to 8"], ["Bedrooms", "3, all air-conditioned"], ["Bathrooms", "3 ensuite"], ["Rated", `${site.rating} from ${site.reviews} stays`]].map(([k, v]) => (
              <div key={k}><dt className="text-moss">{k}</dt><dd className="mt-1 font-display text-3xl">{v}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section id="gallery" className="px-6 pb-28 md:px-12 md:pb-44">
        <div className="mx-auto max-w-[1500px]">
          <h2 className="mb-14 max-w-3xl font-display text-5xl leading-none md:text-7xl">A look around</h2>
          <Gallery />
        </div>
      </section>

      <section className="bg-sage px-6 py-28 md:px-12 md:py-40">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 font-display text-5xl leading-none md:text-7xl">Every room, in detail</h2>
          <Spaces />
        </div>
      </section>

      <Amenities/>

      <section className="bg-moss px-6 py-28 text-chalk md:px-12 md:py-40">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="font-display text-5xl leading-none md:text-7xl">Close to everything, quiet at home</h2>
            <Link href="/contact#map" className="mt-10 inline-block rounded-full border border-chalk/40 px-7 py-3 transition-colors hover:bg-chalk hover:text-forest">See the map</Link>
          </div>
          <ul>
            {nearby.map((n) => (
              <li key={n.name} className="flex items-baseline justify-between border-b border-chalk/20 py-5 text-xl">
                <span>{n.name}</span><span className="text-chalk/65">{n.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-28 md:px-12 md:py-40">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 font-display text-5xl leading-none md:text-7xl">What guests say</h2>
          <div className="grid gap-12 md:grid-cols-3">
            {reviews.map((r) => (
              <blockquote key={r.n}>
                <p className="font-display text-3xl leading-snug">“{r.q}”</p>
                <footer className="mt-5 text-moss">{r.n}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-28 md:px-12 md:pb-40">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-olive px-8 py-20 text-center text-chalk md:py-28">
          <h2 className="mx-auto max-w-3xl font-display text-5xl leading-none md:text-8xl">Your dates are waiting</h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-chalk/85">Tell us when you're coming. We reply within the hour, usually faster.</p>
          <Link href="/contact" className="mt-10 inline-block rounded-full bg-chalk px-9 py-4 text-forest transition-colors hover:bg-sage">Plan your stay</Link>
        </div>
      </section>
    </>
  );
}
