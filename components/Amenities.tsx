"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Waves, Sun, Footprints, Armchair, Car, CookingPot, Milk, Utensils, Coffee, GlassWater,
  Snowflake, Wifi, Tv, Flame, BedDouble, Laptop, Shirt, Wind, Sparkles, Plane,
  Video, BellRing, Lock, Phone, Check, ShieldCheck, type LucideIcon,
} from "lucide-react";
import { amenities } from "@/lib/site";

// First match wins. Add a line here when you add a new amenity in lib/site.ts
const icons: [RegExp, LucideIcon][] = [
  [/loungers/i, Sun], [/pool/i, Waves], [/step-free|ground-floor/i, Footprints], [/sit-out/i, Armchair],
  [/parking/i, Car], [/induction|hob/i, CookingPot], [/refrigerator|fridge/i, Milk], [/cookware|crockery/i, Utensils],
  [/coffee|kettle/i, Coffee], [/drinking water|filtered/i, GlassWater], [/air condition/i, Snowflake], [/wi-?fi/i, Wifi],
  [/tv/i, Tv], [/hot water/i, Flame], [/linen|towels/i, BedDouble], [/work table/i, Laptop], [/washing/i, Shirt],
  [/iron|hair dryer/i, Wind], [/housekeeping/i, Sparkles], [/airport/i, Plane], [/cctv/i, Video],
  [/smoke|first-aid/i, BellRing], [/gated|secure/i, Lock], [/caretaker/i, Phone],
];
const pick = (t: string): LucideIcon => icons.find(([r]) => r.test(t))?.[1] ?? Check;

// The five things most guests look for, shown first
const highlights: { Icon: LucideIcon; title: string; sub: string }[] = [
  { Icon: Waves, title: "Pool view", sub: "Steps from your door" },
  { Icon: Snowflake, title: "Air conditioned", sub: "Every bedroom" },
  { Icon: Wifi, title: "Fast Wi-Fi", sub: "Good for working too" },
  { Icon: Car, title: "Free parking", sub: "Included with your stay" },
];

// One look per group, in the same order as `amenities` in lib/site.ts
const looks = [
  { Head: Waves, card: "md:col-span-7 bg-moss text-chalk", icon: "bg-chalk/15 text-chalk", cols: "sm:grid-cols-2" },
  { Head: CookingPot, card: "md:col-span-5 bg-sage text-forest", icon: "bg-chalk text-olive", cols: "" },
  { Head: BedDouble, card: "md:col-span-5 bg-sage text-forest", icon: "bg-chalk text-olive", cols: "" },
  { Head: Sparkles, card: "md:col-span-7 bg-olive text-chalk", icon: "bg-chalk/15 text-chalk", cols: "sm:grid-cols-2" },
  { Head: ShieldCheck, card: "md:col-span-12 border border-moss/25 bg-chalk text-forest", icon: "bg-sage text-olive", cols: "sm:grid-cols-2 lg:grid-cols-4" },
];

export default function Amenities() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".am-head", { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.12, scrollTrigger: { trigger: ".am-head", start: "top 88%" } });
      gsap.from(".am-hl", { opacity: 0, y: 30, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".am-hls", start: "top 88%" } });
      gsap.utils.toArray<HTMLElement>(".am-card").forEach((card) => {
        gsap.timeline({ scrollTrigger: { trigger: card, start: "top 86%" } })
          .from(card, { opacity: 0, y: 60, duration: 1, ease: "power3.out" })
          .from(card.querySelectorAll(".am-icon"), { scale: 0, duration: 0.5, ease: "back.out(2)", stagger: 0.07 }, 0.35)
          .from(card.querySelectorAll(".am-text"), { opacity: 0, x: -14, duration: 0.6, ease: "power2.out", stagger: 0.07 }, 0.4);
      });
    }, root.current!);
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="amenities" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-6xl leading-[0.95] md:text-8xl">
          <span className="h-mask"><span className="am-head block">What's</span></span>
          <span className="h-mask"><span className="am-head block italic text-olive">included</span></span>
        </h2>

        <ul className="am-hls mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-y border-moss/20 py-10 md:grid-cols-4">
          {highlights.map(({ Icon, title, sub }) => (
            <li key={title} className="am-hl flex flex-col items-start gap-4">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-moss/30 text-olive"><Icon size={28} strokeWidth={1.5} /></span>
              <div>
                <p className="font-display text-3xl leading-none">{title}</p>
                <p className="mt-2 text-moss">{sub}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-5 md:grid-cols-12">
          {amenities.map((a, gi) => {
            const L = looks[gi] ?? looks[1];
            return (
              <div key={a.group} className={`am-card rounded-[1.75rem] p-8 md:p-10 ${L.card}`}>
                <div className="flex items-center gap-3">
                  <L.Head size={26} strokeWidth={1.5} />
                  <h3 className="font-display text-3xl md:text-4xl">{a.group}</h3>
                </div>
                <ul className={`mt-8 grid gap-x-8 gap-y-5 ${L.cols}`}>
                  {a.items.map((item) => {
                    const Icon = pick(item);
                    return (
                      <li key={item} className="flex items-center gap-4 text-lg">
                        <span className={`am-icon grid h-11 w-11 shrink-0 place-items-center rounded-full ${L.icon}`}><Icon size={20} strokeWidth={1.6} /></span>
                        <span className="am-text">{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}