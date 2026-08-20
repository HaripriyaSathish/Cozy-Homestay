import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal, SectionLabel } from "./Reveal";

export function Testimonials({ testimonials }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % testimonials.length);
  };
  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  if (!testimonials.length) return null;
  const t = testimonials[index];

  return (
    <section className="relative overflow-hidden bg-forest py-28 text-cream">
      <Quote className="pointer-events-none absolute left-1/2 top-10 h-32 w-32 -translate-x-1/2 text-gold/10" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <SectionLabel>Guest Stories</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">
            What Our <span className="text-gradient-gold italic">Guests Say.</span>
          </h2>
        </Reveal>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-sm">
          <Star size={16} className="fill-gold text-gold" />
          <span className="font-semibold">4.9/5</span>
          <span className="text-cream/60">Guest Satisfaction</span>
        </div>

        <div className="relative mt-14 min-h-[220px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-4 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < t.rating ? "fill-gold text-gold" : "text-cream/20"} />
                ))}
              </div>
              <p className="font-display text-2xl italic leading-relaxed text-cream sm:text-3xl">"{t.quote}"</p>
              <p className="mt-6 font-semibold text-gold">{t.guest_name}</p>
              <p className="text-sm text-cream/50">
                {t.location} {t.room_stayed && `· Stayed in ${t.room_stayed}`}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full glass hover:bg-cream/10">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className="relative h-1.5 w-6 overflow-hidden rounded-full bg-cream/15"
              >
                {i === index && (
                  <motion.span
                    layoutId="testimonial-progress"
                    className="absolute inset-0 rounded-full bg-gold"
                  />
                )}
              </button>
            ))}
          </div>
          <button onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full glass hover:bg-cream/10">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
