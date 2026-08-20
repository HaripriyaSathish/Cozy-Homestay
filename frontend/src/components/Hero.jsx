import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { callLink, whatsappLink } from "../lib/contactLinks";
import { MagneticButton } from "./MagneticButton";

const HEADING_WORDS = (text) => text.split(" ");

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const handler = (e) => {
      setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

function RotatingKeywords({ keywords }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % keywords.length), 2200);
    return () => clearInterval(id);
  }, [keywords.length]);

  return (
    <span className="relative inline-block h-[1.2em] min-w-[7ch] align-bottom overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={keywords[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 text-gradient-gold font-display italic"
        >
          {keywords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero({ hero, contact }) {
  const mouse = useMousePosition();
  const words = useMemo(() => HEADING_WORDS(hero.heading), [hero.heading]);
  const [dates, setDates] = useState({ checkIn: "", checkOut: "", guests: 2, rooms: 1 });

  const parallaxX = (mouse.x - 0.5) * 18;
  const parallaxY = (mouse.y - 0.5) * 18;

  const findStay = (e) => {
    e.preventDefault();
    const el = document.getElementById("booking");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-forest">
      {/* Background image + cinematic overlays */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: parallaxX, y: parallaxY }}
      >
        {hero.hero_video ? (
  <video
    src={hero.hero_video}
    poster={hero.hero_image || undefined}
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    className="h-full w-full scale-110 object-cover"
  />
) : hero.hero_image ? (
  <img src={hero.hero_image} alt="Cozy Homestay" className="h-full w-full scale-110 object-cover" />
) : (
  <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,#2c3a30,transparent_55%),radial-gradient(circle_at_80%_80%,#1d2a22,transparent_55%),linear-gradient(160deg,#18231E,#0d130f)]" />
)}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/60 to-forest" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,166,106,0.18),transparent_60%)]" />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold/60"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-14 px-6 pt-28 pb-24 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cream/90"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-gold"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            {hero.badge_text}
          </motion.span>

          <h1 className="font-display text-5xl leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
            {words.map((word, i) => (
              <span key={i} className="mr-4 inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80"
          >
            {hero.subheading}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.9 }}
            className="mt-4 font-display text-2xl text-cream/90"
          >
            <RotatingKeywords keywords={hero.keywords?.length ? hero.keywords : ["Comfort", "Calm", "Connection"]} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton
              href="#booking"
              onClick={findStay}
              className="group relative overflow-hidden rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-forest shadow-lg shadow-gold/20"
            >
              <span className="relative z-10">Book Your Stay</span>
              <span className="absolute inset-0 -translate-x-full bg-cream transition-transform duration-500 group-hover:translate-x-0" />
            </MagneticButton>
            <MagneticButton
              href="#booking"
              onClick={findStay}
              className="rounded-full glass px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition hover:bg-cream/10"
            >
              Check Availability
            </MagneticButton>
            <MagneticButton
              href={whatsappLink(contact)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-cream/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition hover:border-gold hover:text-gold"
            >
              WhatsApp Us
            </MagneticButton>
            <MagneticButton
              href={callLink(contact)}
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream transition hover:border-gold hover:text-gold"
            >
              <Phone size={16} /> Call Now
            </MagneticButton>
          </motion.div>
        </div>

        {/* Floating availability card */}
        <motion.form
          initial={{ opacity: 0, y: 40, rotate: 1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={findStay}
          className="glass animate-float w-full rounded-3xl p-6 sm:p-8"
        >
          <p className="mb-5 font-display text-xl text-cream">Check Your Perfect Stay</p>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-xs uppercase tracking-wide text-cream/70">
              Check-In
              <input
                type="date"
                value={dates.checkIn}
                onChange={(e) => setDates((d) => ({ ...d, checkIn: e.target.value }))}
                className="rounded-lg border border-cream/20 bg-cream/5 px-3 py-2 text-sm text-cream outline-none focus:border-gold [color-scheme:dark]"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs uppercase tracking-wide text-cream/70">
              Check-Out
              <input
                type="date"
                value={dates.checkOut}
                onChange={(e) => setDates((d) => ({ ...d, checkOut: e.target.value }))}
                className="rounded-lg border border-cream/20 bg-cream/5 px-3 py-2 text-sm text-cream outline-none focus:border-gold [color-scheme:dark]"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs uppercase tracking-wide text-cream/70">
              Guests
              <input
                type="number"
                min={1}
                value={dates.guests}
                onChange={(e) => setDates((d) => ({ ...d, guests: e.target.value }))}
                className="rounded-lg border border-cream/20 bg-cream/5 px-3 py-2 text-sm text-cream outline-none focus:border-gold"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs uppercase tracking-wide text-cream/70">
              Rooms
              <input
                type="number"
                min={1}
                value={dates.rooms}
                onChange={(e) => setDates((d) => ({ ...d, rooms: e.target.value }))}
                className="rounded-lg border border-cream/20 bg-cream/5 px-3 py-2 text-sm text-cream outline-none focus:border-gold"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-gold py-3 text-sm font-semibold uppercase tracking-wide text-forest transition hover:brightness-110"
          >
            Find Your Perfect Stay
          </button>
        </motion.form>
      </div>

      <motion.a
        href="#welcome"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/70"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll down"
      >
        <ChevronDown size={26} />
      </motion.a>
    </section>
  );
}
