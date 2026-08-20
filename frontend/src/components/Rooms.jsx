import { motion } from "framer-motion";
import { BedDouble, Maximize2, MessageCircle, Users } from "lucide-react";
import { useState } from "react";
import { Icon } from "../lib/icon.jsx";
import { Reveal, SectionLabel } from "./Reveal";
import { RoomModal } from "./RoomModal";

function RoomCard({ room, index, currency, onExplore }) {
  const reversed = index % 2 === 1;

  return (
    <Reveal delay={0.05}>
      <div
        className={`group grid gap-0 overflow-hidden rounded-[2rem] border transition-colors lg:grid-cols-2 ${
          reversed ? "border-olive/15 bg-cream" : "border-forest/10 bg-forest text-cream"
        }`}
      >
        <div className={`relative min-h-[260px] overflow-hidden ${reversed ? "lg:order-2" : ""}`}>
          {room.image ? (
            <img
              src={room.image}
              alt={room.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(135deg,#C8A66A_0%,#E7DDCE_50%,#6B7A6A_100%)] opacity-90" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {room.is_available ? (
            <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-forest">
              Available
            </span>
          ) : (
            <span className="absolute left-5 top-5 rounded-full bg-charcoal/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cream">
              Fully Booked
            </span>
          )}
        </div>

        <div className={`flex flex-col justify-center p-8 sm:p-12 ${reversed ? "lg:order-1" : ""}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${reversed ? "text-gold" : "text-gold"}`}>
            {room.tagline}
          </p>
          <h3 className="mt-3 font-display text-3xl sm:text-4xl">{room.name}</h3>
          <p className={`mt-4 leading-relaxed ${reversed ? "text-charcoal/70" : "text-cream/70"}`}>{room.description}</p>

          <div className="mt-6 flex flex-wrap gap-5 text-sm">
            <span className="inline-flex items-center gap-2">
              <BedDouble size={16} className="text-gold" /> {room.bed_type}
            </span>
            <span className="inline-flex items-center gap-2">
              <Maximize2 size={16} className="text-gold" /> {room.size_sqft} sq.ft
            </span>
            <span className="inline-flex items-center gap-2">
              <Users size={16} className="text-gold" /> Up to {room.max_guests} guests
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {room.amenities.slice(0, 4).map((a) => (
              <span
                key={a.id}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                  reversed ? "bg-forest/5 text-forest" : "bg-cream/10 text-cream/80"
                }`}
              >
                <Icon name={a.icon} size={13} /> {a.name}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-current/10 pt-6">
            <p>
              <span className="font-display text-3xl text-gold">
                {currency}
                {Number(room.price_per_night).toLocaleString("en-IN")}
              </span>
              <span className={`ml-2 text-sm ${reversed ? "text-charcoal/50" : "text-cream/50"}`}>/ Night</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => onExplore(room)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition ${
                  reversed ? "bg-forest text-cream hover:bg-charcoal" : "bg-gold text-forest hover:brightness-110"
                }`}
              >
                Explore Room
              </button>
              <a
                href="#booking"
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition ${
                  reversed ? "border-forest/30 text-forest hover:border-forest" : "border-cream/30 text-cream hover:border-gold"
                }`}
              >
                Check Availability
              </a>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Rooms({ rooms, currency, contact }) {
  const [activeRoom, setActiveRoom] = useState(null);

  return (
    <section id="rooms" className="bg-beige/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel>Our Rooms</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-4xl text-forest sm:text-5xl">
              Rooms Designed <span className="text-gradient-gold italic">Around You.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-charcoal/70">
              A carefully sized collection of rooms, each built for a different kind of stay.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-8">
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} currency={currency} onExplore={setActiveRoom} />
          ))}
        </div>
      </div>

      <RoomModal room={activeRoom} currency={currency} contact={contact} onClose={() => setActiveRoom(null)} />
    </section>
  );
}
