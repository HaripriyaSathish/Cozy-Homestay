import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import { Icon } from "../lib/icon.jsx";

const SOCIAL_ICONS = { instagram: Instagram, facebook: Facebook, youtube: Youtube, twitter: Twitter, linkedin: Linkedin };

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#welcome" },
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Booking", href: "#booking" },
  { label: "Experiences", href: "#nearby" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Footer({ settings, contact, social }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-charcoal py-16 text-cream/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-3 font-display text-2xl text-cream">
            {settings.logo && <img src={settings.logo} alt={settings.site_name} className="h-10 w-10 rounded-full object-cover" />}
            {settings.site_name}
          </p>
          <p className="mt-4 text-sm leading-relaxed">
            A boutique homestay built around peaceful stays, personal hospitality and a genuine sense of place.
          </p>
          <div className="mt-5 flex gap-3">
            {social.map((s) => {
              const Ico = SOCIAL_ICONS[s.platform] || Instagram;
              return (
                <motion.a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, color: "#C8A66A" }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15"
                >
                  <Ico size={15} />
                </motion.a>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">Quick Links</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">Contact</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-gold" /> {contact.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-gold" /> {contact.email}
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-gold" /> {contact.address}
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">Stay Updated</p>
          <p className="mt-4 text-sm">Occasional offers and updates — no spam, ever.</p>
          {subscribed ? (
            <p className="mt-4 text-sm text-gold">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-4 flex overflow-hidden rounded-full border border-cream/15">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-cream/30"
              />
              <button type="submit" className="flex items-center justify-center bg-gold px-4 text-forest">
                <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl border-t border-cream/10 px-6 pt-6 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} {settings.site_name}. All rights reserved.
      </div>
    </footer>
  );
}
