"use client";
import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { img, site } from "@/lib/site";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".h-frame", { clipPath: "inset(9% 5% 9% 5% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.9, ease: "expo.inOut" })
        .from(".h-frame img", { scale: 1.25, duration: 2.2, ease: "expo.out" }, 0)
        .from(".h-line > span", { yPercent: 115, duration: 1.3, stagger: 0.12 }, 0.9)
        .from(".h-fade", { opacity: 0, y: 24, duration: 1, stagger: 0.1 }, 1.5);
      gsap.to(".h-frame img", { yPercent: 10, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-chalk">
      <div className="h-frame absolute inset-0 overflow-hidden bg-moss">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.hero} alt="Pool view from the living room at Casa Olivar" className="absolute -top-[6%] h-[112%] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/15 to-forest/30" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-8 text-chalk md:px-12 md:pb-12">
        <h1 className="font-display text-[clamp(3.6rem,10.5vw,10.5rem)] leading-[0.92] tracking-[-0.02em]">
          <span className="h-mask"><span className="h-line block"><span>Wake up beside</span></span></span>
          <span className="h-mask"><span className="h-line block"><span className="italic">the water.</span></span></span>
        </h1>
        <p className="h-fade mt-6 max-w-md text-lg text-chalk/85">
          A three-bedroom, ground-floor home that opens onto the pool, minutes from Calangute beach.
        </p>

        <div className="h-fade mt-8 flex flex-col gap-4 rounded-3xl border border-chalk/25 bg-chalk/10 p-4 backdrop-blur-md md:flex-row md:items-center md:justify-between md:pl-8">
          <dl className="grid grid-cols-3 gap-6 md:flex md:gap-14">
            <div><dt className="text-sm text-chalk/70">Sleeps</dt><dd className="text-lg">8 guests</dd></div>
            <div><dt className="text-sm text-chalk/70">Home</dt><dd className="text-lg">3 bedrooms</dd></div>
            <div><dt className="text-sm text-chalk/70">From</dt><dd className="text-lg">{site.price} a night</dd></div>
          </dl>
          <Link href="/contact" className="rounded-2xl bg-chalk px-7 py-4 text-center text-forest transition-colors hover:bg-sage">
            Check your dates
          </Link>
        </div>
      </div>
    </section>
  );
}
