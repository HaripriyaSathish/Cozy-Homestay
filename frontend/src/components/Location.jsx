import { motion } from "framer-motion";
import { Clock, MapPin, Navigation, Signpost } from "lucide-react";
import { Reveal, RevealStagger, revealItem, SectionLabel } from "./Reveal";

export function Location({ contact, maps, businessHours }) {
  const cards = [
    { icon: MapPin, title: "Address", value: contact.address },
    { icon: Signpost, title: "Nearby Landmark", value: contact.landmark || "Ask us for directions" },
    {
      icon: Clock,
      title: "Today's Hours",
      value: businessHours?.length ? `${businessHours[0].open_time} – ${businessHours[0].close_time}` : "8:00 AM – 10:00 PM",
    },
  ];

  return (
    <section className="bg-beige/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel>Location</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-4xl text-forest sm:text-5xl">
              Easy to Find. <span className="text-gradient-gold italic">Hard to Leave.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <RevealStagger className="flex flex-col gap-4">
            {cards.map((c) => (
              <motion.div
                key={c.title}
                variants={revealItem}
                whileHover={{ x: 6 }}
                className="flex items-start gap-4 rounded-2xl border border-olive/15 bg-white/70 p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest text-gold">
                  <c.icon size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-olive">{c.title}</p>
                  <p className="mt-1 text-charcoal/80">{c.value}</p>
                </div>
              </motion.div>
            ))}
            <a
              href={maps.directions_url || "#"}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cream transition hover:bg-charcoal"
            >
              <Navigation size={16} /> Get Directions
            </a>
          </RevealStagger>

          <Reveal delay={0.15} className="overflow-hidden rounded-3xl border-4 border-white shadow-xl">
            {maps.embed_url ? (
              <iframe
                title="Property location"
                src={maps.embed_url}
                width="100%"
                height="360"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="flex h-[360px] items-center justify-center bg-olive/10 text-olive">Map coming soon</div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
