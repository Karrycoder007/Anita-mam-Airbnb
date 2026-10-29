import {
  Waves, Sun, Footprints, Armchair, Car, CookingPot, Milk, Utensils, Coffee, GlassWater,
  Snowflake, Wifi, Tv, Flame, BedDouble, Laptop, Shirt, Wind, Sparkles, Plane,
  Video, BellRing, Lock, Phone, Check, type LucideIcon,
} from "lucide-react";
import { amenities } from "@/lib/site";

// First match wins. Add a line here when you add a new amenity in lib/site.ts
const icons: [RegExp, LucideIcon][] = [
  [/loungers/i, Sun],
  [/pool/i, Waves],
  [/step-free|ground-floor/i, Footprints],
  [/sit-out/i, Armchair],
  [/parking/i, Car],
  [/induction|hob/i, CookingPot],
  [/refrigerator|fridge/i, Milk],
  [/cookware|crockery/i, Utensils],
  [/coffee|kettle/i, Coffee],
  [/drinking water|filtered/i, GlassWater],
  [/air condition/i, Snowflake],
  [/wi-?fi/i, Wifi],
  [/tv/i, Tv],
  [/hot water/i, Flame],
  [/linen|towels/i, BedDouble],
  [/work table/i, Laptop],
  [/washing/i, Shirt],
  [/iron|hair dryer/i, Wind],
  [/housekeeping/i, Sparkles],
  [/airport/i, Plane],
  [/cctv/i, Video],
  [/smoke|first-aid/i, BellRing],
  [/gated|secure/i, Lock],
  [/caretaker/i, Phone],
];

const pick = (t: string): LucideIcon => icons.find(([r]) => r.test(t))?.[1] ?? Check;

export default function Amenities() {
  return (
    <section id="amenities" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 font-display text-5xl leading-none md:text-7xl">What's included</h2>
        <div className="grid gap-x-20 gap-y-16 md:grid-cols-2">
          {amenities.map((a) => (
            <div key={a.group}>
              <h3 className="border-b border-moss/25 pb-5 font-display text-3xl">{a.group}</h3>
              <ul className="mt-6 grid gap-4">
                {a.items.map((item) => {
                  const Icon = pick(item);
                  return (
                    <li key={item} className="flex items-center gap-4 text-lg text-moss">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sage text-olive">
                        <Icon size={20} strokeWidth={1.6} />
                      </span>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}