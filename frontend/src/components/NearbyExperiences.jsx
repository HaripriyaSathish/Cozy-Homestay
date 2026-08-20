import { motion } from "framer-motion";
import { Icon } from "../lib/icon.jsx";
import { Reveal, revealItem, RevealStagger, SectionLabel } from "./Reveal";

export function NearbyExperiences({ attractions }) {
  return (
    <section id="nearby" className="bg-cream py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel>Nearby Experiences</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-4xl text-forest sm:text-5xl">
              Beyond the <span className="text-gradient-gold italic">Property.</span>
            </h2>
          </Reveal>
        </div>

        <RevealStagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {attractions.map((a) => (
            <motion.div
              key={a.id}
              variants={revealItem}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-2xl border border-olive/15 bg-white/70"
            >
              <div className="relative h-32 overflow-hidden">
                {a.image ? (
                  <img src={a.image} alt={a.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-forest">
                    <Icon name={a.icon} size={34} className="text-gold transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6" />
                  </div>
                )}
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-forest">
                  {a.distance}
                </span>
              </div>
              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gold">{a.category}</p>
                <h3 className="mt-1 font-display text-lg text-forest">{a.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal/60">{a.description}</p>
              </div>
            </motion.div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
