import Link from "next/link";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Gallery from "@/components/Gallery";
import Spaces from "@/components/Spaces";
import Amenities from "@/components/Amenities";
import Nearby from "@/components/Nearby";
import Testimonials from "@/components/Testimonials";
import { site } from "@/lib/site";
import Story from "@/components/Story";

export default function Home() {
  return (
    <>
      <Hero />

      <Story/>

      <Gallery />

      <section className="bg-sage px-6 py-28 md:px-12 md:py-40">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-20 font-display text-5xl leading-none md:text-7xl">Every room, in detail</h2>
          <Spaces />
        </div>
      </section>

      <Amenities />
      <Nearby />
      <Testimonials />

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