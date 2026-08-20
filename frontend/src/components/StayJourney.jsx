import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Icon } from "../lib/icon.jsx";
import { Reveal, SectionLabel } from "./Reveal";

export function StayJourney({ steps }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.4"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden bg-forest py-28 text-cream">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel>How It Works</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">
              Your Stay, <span className="text-gradient-gold italic">Step by Step.</span>
            </h2>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-20">
          <div className="absolute left-6 top-0 h-full w-px bg-cream/10 sm:left-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 top-0 w-px bg-gradient-to-b from-gold to-gold/30 sm:left-1/2"
          />

          <div className="flex flex-col gap-14">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={step.step_number} className="relative grid gap-6 sm:grid-cols-2 sm:items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 14 }}
                    className="absolute left-6 top-1 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-gold text-forest sm:left-1/2"
                  >
                    <Icon name={step.icon} size={16} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={`ml-14 rounded-2xl border border-cream/10 bg-cream/[0.04] p-6 sm:ml-0 ${
                      isEven ? "sm:col-start-1 sm:text-right sm:pr-14" : "sm:col-start-2 sm:pl-14"
                    }`}
                  >
                    <span className="font-display text-3xl text-gold">{String(step.step_number).padStart(2, "0")}</span>
                    <h3 className="mt-2 font-display text-2xl">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/60">{step.description}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
