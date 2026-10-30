"use client";
import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, BedDouble, Bath, Star, type LucideIcon } from "lucide-react";
import Statement from "@/components/Statement";
import { img, site } from "@/lib/site";

const mid = (url: string) => url.replace("w=1800", "w=1100");

const facts: { Icon: LucideIcon; to: number; dec?: number; label: string }[] = [
  { Icon: Users, to: 8, label: "Guests welcome" },
  { Icon: BedDouble, to: 3, label: "Air-conditioned bedrooms" },
  { Icon: Bath, to: 4, label: "Ensuite bathrooms" },
  { Icon: Star, to: parseFloat(site.rating), dec: 1, label: `Rated from ${site.reviews} stays` },
];

export default function Story() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // photos unveil, then drift at different speeds
      gsap.fromTo(".st-big", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: ".st-big", start: "top 85%" } });
      gsap.fromTo(".st-small", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1, delay: 0.4, ease: "power3.out", scrollTrigger: { trigger: ".st-big", start: "top 80%" } });
      gsap.fromTo(".st-big img", { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: ".st-big", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".st-small", { y: 40 }, { y: -40, ease: "none", scrollTrigger: { trigger: ".st-big", start: "top bottom", end: "bottom top", scrub: true } });

      // facts rise in, numbers count up
      gsap.from(".st-fact", { opacity: 0, y: 30, duration: 0.9, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".st-facts", start: "top 88%" } });
      gsap.utils.toArray<HTMLElement>(".st-num").forEach((el) => {
        const to = parseFloat(el.dataset.to!);
        const dec = Number(el.dataset.dec ?? 0);
        const o = { v: 0 };
        el.textContent = (0).toFixed(dec);
        gsap.to(o, { v: to, duration: 1.6, ease: "power2.out", onUpdate: () => { el.textContent = o.v.toFixed(dec); }, scrollTrigger: { trigger: el, start: "top 92%" } });
      });
    }, root.current!);
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="story" className="px-6 py-28 md:px-12 md:py-44">
      <div className="mx-auto grid max-w-6xl gap-20 md:grid-cols-12 md:items-center md:gap-10">
        <div className="md:col-span-7">
          <Statement text="Three bedrooms on the ground floor, a pool you can see from the sofa, and the unhurried side of Calangute just beyond the gate. Bring the whole family or the whole group." />
          <Link href="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-moss px-8 py-4 text-lg text-chalk transition-colors hover:bg-olive">
            Check your dates <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="relative mb-12 md:col-span-5 md:col-start-8 md:mb-0">
          <div className="st-big relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-moss">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mid(img.pool)} alt="The pool at Tropical Homes" className="absolute -top-[6%] h-[112%] w-full object-cover" />
          </div>
          <div className="st-small absolute -bottom-10 -left-2 w-[46%] overflow-hidden rounded-2xl border-[5px] border-chalk shadow-[0_20px_40px_-20px_rgba(30,40,27,.5)] md:-left-14">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mid(img.living)} alt="Living room facing the pool" className="aspect-square w-full object-cover" />
          </div>
        </div>
      </div>

      <dl className="st-facts mx-auto mt-28 grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 border-t border-moss/20 pt-12 md:grid-cols-4">
        {facts.map(({ Icon, to, dec, label }) => (
          <div key={label} className="st-fact flex flex-col items-start gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-sage text-olive"><Icon size={26} strokeWidth={1.5} /></span>
            <dt className="sr-only">{label}</dt>
            <dd>
              <span className="st-num font-display text-6xl leading-none" data-to={to} data-dec={dec ?? 0}>{to.toFixed(dec ?? 0)}</span>
              <span className="mt-2 block text-lg text-moss">{label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}