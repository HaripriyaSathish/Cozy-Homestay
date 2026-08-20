import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Reveal, SectionLabel } from "./Reveal";

export function FAQ({ faqs }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-cream py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel>Good to Know</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-4xl text-forest sm:text-5xl">
              Frequently Asked <span className="text-gradient-gold italic">Questions.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.id} delay={i * 0.04}>
                <motion.div
                  layout
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    isOpen ? "border-gold/40 bg-forest text-cream shadow-lg" : "border-olive/15 bg-white/70 text-charcoal"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className={`font-display text-lg sm:text-xl ${isOpen ? "text-cream" : "text-forest"}`}>{faq.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ duration: 0.35 }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        isOpen ? "bg-gold text-forest" : "bg-forest/5 text-forest"
                      }`}
                    >
                      <Plus size={16} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-cream/70">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
