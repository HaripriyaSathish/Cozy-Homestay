import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "../lib/icon.jsx";
import { Reveal, revealItem, RevealStagger, SectionLabel } from "./Reveal";

export function PropertyExperience({ highlights }) {
  return (
    <section className="relative bg-forest py-28 text-cream">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,166,106,0.08),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel>The Experience</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">
              Everything You Need. <span className="text-gradient-gold italic">Nothing You Don't.</span>
            </h2>
          </Reveal>
        </div>

        <RevealStagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h) => (
            <motion.div
              key={h.id}
              variants={revealItem}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-cream/10 bg-cream/[0.03] p-8 transition-colors hover:border-gold/40"
            >
              <span className="pointer-events-none absolute -inset-px rounded-3xl bg-[conic-gradient(from_0deg,transparent,rgba(200,166,106,0.5),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:xor] p-px" />

              <motion.div
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 250, damping: 15 }}
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold"
              >
                <Icon name={h.icon} size={26} />
              </motion.div>
              <h3 className="font-display text-2xl">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">{h.description}</p>

              <motion.span
                className="mt-6 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gold opacity-0 transition-opacity group-hover:opacity-100"
                animate={{}}
              >
                Learn more
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.span>
            </motion.div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
