import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";
import { useCountUp } from "../hooks/useCountUp";

function Stat({ value, decimals = 0, suffix = "", label }) {
  const { ref, rounded } = useCountUp(value, { decimals });
  return (
    <div ref={ref} className="rounded-2xl border border-olive/15 bg-white/60 p-6 text-center shadow-sm backdrop-blur">
      <p className="font-display text-4xl text-forest">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </p>
      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-olive">{label}</p>
    </div>
  );
}

export function Welcome({ property }) {
  const paragraphs = property.story.split(". ").reduce((acc, sentence, i) => {
    if (i % 2 === 0) acc.push(sentence);
    else acc[acc.length - 1] += ". " + sentence;
    return acc;
  }, []);

  return (
    <section id="welcome" className="relative overflow-hidden bg-cream py-28">
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-olive/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <Reveal>
            <SectionLabel>Welcome</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
              {property.heading.split(". ").map((part, i, arr) => (
                <span key={i}>
                  {i === 0 ? <span className="text-gradient-gold">{part}.</span> : ` ${part}${i < arr.length - 1 ? "." : ""}`}
                </span>
              ))}
            </h2>
          </Reveal>

          <div className="mt-8 space-y-5">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.15 + i * 0.1}>
                <p className="text-lg leading-relaxed text-charcoal/75">{p}.</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2} className="grid grid-cols-2 gap-4 self-center">
          <Stat value={property.guests_served} suffix="+" label="Happy Guests" />
          <Stat value={Number(property.guest_rating)} decimals={1} label="Guest Rating" />
          <Stat value={property.years_of_hospitality} suffix="+" label="Years of Hospitality" />
          <div className="rounded-2xl border border-olive/15 bg-forest p-6 text-center shadow-sm">
            <p className="font-display text-4xl text-gold">{property.support_availability}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-cream/70">Guest Support</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
