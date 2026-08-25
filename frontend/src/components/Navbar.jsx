import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#welcome" },
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Booking", href: "#booking" },
  { label: "Experiences", href: "#nearby" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ siteName, logo }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "glass-light py-3 shadow-lg shadow-black/5" : "py-6 bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#home" className={`flex items-center gap-3 font-display text-2xl tracking-wide ${scrolled ? "text-forest" : "text-cream"}`}>
          {logo && <img src={logo} alt={siteName} className="h-9 w-9 rounded-full object-cover" />}
          {siteName}
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`group relative text-sm font-medium uppercase tracking-wide ${
                scrolled ? "text-charcoal/80 hover:text-forest" : "text-cream/90 hover:text-white"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#booking"
          className={`hidden lg:inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold tracking-wide transition-all ${
            scrolled ? "bg-forest text-cream hover:bg-charcoal" : "bg-gold text-forest hover:brightness-110"
          }`}
        >
          Book Your Stay
        </a>

        <button
          className={`lg:hidden ${scrolled ? "text-forest" : "text-cream"}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden glass-light"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-charcoal font-medium border-b border-charcoal/10 last:border-none"
                >
                  {link.label}
                </a>
              ))}
              <a href="#booking" onClick={() => setOpen(false)} className="mt-3 rounded-full bg-forest text-cream text-center py-2.5 font-semibold">
                Book Your Stay
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
