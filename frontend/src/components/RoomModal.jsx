import { AnimatePresence, motion } from "framer-motion";
import { BedDouble, Maximize2, MessageCircle, Users, X } from "lucide-react";
import { Icon } from "../lib/icon.jsx";
import { whatsappRoomLink } from "../lib/contactLinks";

export function RoomModal({ room, currency, contact, onClose }) {
  return (
    <AnimatePresence>
      {room && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 grid max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-cream shadow-2xl lg:grid-cols-2"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-forest shadow-md"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <motion.div
              initial={{ scale: 1.15, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative min-h-[220px] lg:min-h-full"
            >
              {room.image ? (
                <img src={room.image} alt={room.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-[linear-gradient(135deg,#C8A66A_0%,#E7DDCE_50%,#6B7A6A_100%)]" />
              )}
            </motion.div>

            <div className="p-8 sm:p-10">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-xs font-semibold uppercase tracking-[0.25em] text-gold"
              >
                {room.tagline}
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-2 font-display text-3xl text-forest"
              >
                {room.name}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-4 leading-relaxed text-charcoal/70"
              >
                {room.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 grid grid-cols-3 gap-3 text-center"
              >
                <div className="rounded-xl bg-white/70 p-3">
                  <BedDouble size={18} className="mx-auto text-gold" />
                  <p className="mt-1 text-xs text-charcoal/60">{room.bed_type}</p>
                </div>
                <div className="rounded-xl bg-white/70 p-3">
                  <Maximize2 size={18} className="mx-auto text-gold" />
                  <p className="mt-1 text-xs text-charcoal/60">{room.size_sqft} sq.ft</p>
                </div>
                <div className="rounded-xl bg-white/70 p-3">
                  <Users size={18} className="mx-auto text-gold" />
                  <p className="mt-1 text-xs text-charcoal/60">Up to {room.max_guests} guests</p>
                </div>
              </motion.div>

              <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-forest/60">Full Amenities</p>
              <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4">
                {room.amenities.map((a, i) => (
                  <motion.span
                    key={a.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                    className="inline-flex items-center gap-2 text-sm text-charcoal/75"
                  >
                    <Icon name={a.icon} size={15} className="text-gold" /> {a.name}
                  </motion.span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-charcoal/10 pt-6">
                <p>
                  <span className="font-display text-3xl text-forest">
                    {currency}
                    {Number(room.price_per_night).toLocaleString("en-IN")}
                  </span>
                  <span className="ml-2 text-sm text-charcoal/50">/ Night</span>
                </p>
                <div className="flex gap-3">
                  <a
                    href={whatsappRoomLink(contact, room.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-forest/30 px-5 py-2.5 text-sm font-semibold text-forest transition hover:border-gold hover:text-gold"
                  >
                    <MessageCircle size={16} /> Enquire
                  </a>
                  <a
                    href="#booking"
                    onClick={onClose}
                    className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-cream transition hover:bg-charcoal"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
