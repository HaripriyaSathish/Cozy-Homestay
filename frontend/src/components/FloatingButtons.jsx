import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { callLink, mailLink, whatsappLink } from "../lib/contactLinks";

const ITEMS = (contact) => [
  { key: "whatsapp", label: "WhatsApp Us", icon: MessageCircle, href: whatsappLink(contact), color: "bg-[#25D366]", external: true },
  { key: "call", label: "Call Us", icon: Phone, href: callLink(contact), color: "bg-forest" },
  { key: "email", label: "Email Us", icon: Mail, href: mailLink(contact), color: "bg-gold text-forest" },
];

export function FloatingButtons({ contact }) {
  const [hovered, setHovered] = useState(null);
  const items = ITEMS(contact);

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      {items.map((item, i) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 + i * 0.15, type: "spring", stiffness: 200, damping: 15 }}
          className="relative flex items-center gap-3"
          onMouseEnter={() => setHovered(item.key)}
          onMouseLeave={() => setHovered(null)}
        >
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: hovered === item.key ? 1 : 0, x: hovered === item.key ? 0 : 10 }}
            className="hidden sm:block rounded-full glass-light px-3 py-1.5 text-xs font-semibold text-charcoal shadow-md"
          >
            {item.label}
          </motion.span>
          <motion.a
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            aria-label={item.label}
            className={`relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full ${item.color} text-white shadow-xl shadow-black/20`}
          >
            {item.key === "whatsapp" && (
              <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
            )}
            <item.icon size={22} className="relative z-10" />
          </motion.a>
        </motion.div>
      ))}
    </div>
  );
}
