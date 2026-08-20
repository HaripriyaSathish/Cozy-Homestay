import { motion } from "framer-motion";
import { useState } from "react";
import { Icon } from "../lib/icon.jsx";
import { Reveal, SectionLabel } from "./Reveal";

export function WhyLove({ items }) {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-cream py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel>Why Guests Return</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-4xl text-forest sm:text-5xl">
              The Little Things <span className="text-gradient-gold italic">Make the Difference.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-3">
          {items.map((item, i) => {
            const isActive = active === i;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`group relative flex w-full items-center gap-6 overflow-hidden rounded-2xl border px-6 py-5 text-left transition-all duration-500 ${
                  isActive ? "border-gold/40 bg-forest py-8 text-cream shadow-xl" : "border-olive/15 bg-white/60 text-charcoal hover:border-gold/30"
                }`}
              >
                <motion.span
                  animate={{ opacity: isActive ? 1 : 0.3, scale: isActive ? 1 : 0.9 }}
                  className={`font-display text-3xl ${isActive ? "text-gold" : "text-olive"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>

                <motion.div
                  animate={{ rotate: isActive ? 360 : 0, scale: isActive ? 1.1 : 1 }}
                  transition={{ duration: 0.6 }}
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    isActive ? "bg-gold/15 text-gold" : "bg-forest/5 text-forest"
                  }`}
                >
                  <Icon name={item.icon} size={22} />
                </motion.div>

                <div className="flex-1">
                  <h3 className={`font-display text-xl sm:text-2xl ${isActive ? "text-cream" : "text-forest"}`}>
                    {item.title}
                  </h3>
                  <motion.p
                    initial={false}
                    animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0, marginTop: isActive ? 8 : 0 }}
                    className={`overflow-hidden text-sm leading-relaxed ${isActive ? "text-cream/70" : "text-transparent"}`}
                  >
                    {item.description}
                  </motion.p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
