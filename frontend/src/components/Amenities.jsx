import { motion } from "framer-motion";
import { useState } from "react";
import { Icon } from "../lib/icon.jsx";
import { Reveal, revealItem, RevealStagger, SectionLabel } from "./Reveal";

function AmenityCard({ amenity }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  return (
    <motion.div
      variants={revealItem}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.y, rotateY: tilt.x }}
      style={{ transformPerspective: 600 }}
      className="group relative overflow-hidden rounded-2xl border border-olive/15 bg-white/70 p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-gold/10"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/10 blur-2xl transition-all duration-500 group-hover:bg-gold/25" />
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-forest text-gold transition-transform duration-300 group-hover:scale-110">
        <Icon name={amenity.icon} size={22} />
      </div>
      <h3 className="font-display text-lg text-forest">{amenity.name}</h3>
      <motion.p
        initial={{ opacity: 0, height: 0 }}
        whileInView={{}}
        className="mt-1 max-h-0 overflow-hidden text-xs leading-relaxed text-charcoal/60 transition-all duration-500 group-hover:mt-2 group-hover:max-h-20"
      >
        {amenity.description}
      </motion.p>
    </motion.div>
  );
}

export function Amenities({ amenities }) {
  const marqueeWords = ["Comfort", "Convenience", "Hospitality", "Relaxation", "Local Experience"];

  return (
    <section id="amenities" className="bg-cream py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel>Amenities</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-4xl text-forest sm:text-5xl">
              Every Comfort, <span className="text-gradient-gold italic">Thoughtfully Placed.</span>
            </h2>
          </Reveal>
        </div>

        <RevealStagger className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5" stagger={0.06}>
          {amenities.map((a) => (
            <AmenityCard key={a.id} amenity={a} />
          ))}
        </RevealStagger>
      </div>

      <div className="relative mt-20 overflow-hidden border-y border-gold/20 bg-forest py-5">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map((word, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-2xl text-cream/80">
              {word} <span className="text-gold">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
