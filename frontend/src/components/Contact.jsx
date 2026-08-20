import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { submitContactEnquiry } from "../api/client";
import { callLink, mailLink, whatsappLink } from "../lib/contactLinks";
import { Reveal, revealItem, RevealStagger, SectionLabel } from "./Reveal";

export function Contact({ contact, businessHours }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");

  const options = [
    { icon: MessageCircle, title: "WhatsApp Us", desc: "Quick and easy booking assistance.", href: whatsappLink(contact), external: true, color: "bg-[#25D366]" },
    { icon: Phone, title: "Call Us", desc: "Speak directly with our team.", href: callLink(contact), color: "bg-forest" },
    { icon: Mail, title: "Email Us", desc: "Send us your travel requirements.", href: mailLink(contact), color: "bg-gold text-forest" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitContactEnquiry(form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-beige/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel>Get in Touch</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-4xl text-forest sm:text-5xl">
              Ready to Plan <span className="text-gradient-gold italic">Your Stay?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-charcoal/70">
              Whether you're planning a quick escape, a family holiday or a longer stay, our team is here to help.
            </p>
          </Reveal>
        </div>

        <RevealStagger className="mt-14 grid gap-5 sm:grid-cols-3">
          {options.map((o) => (
            <motion.a
              key={o.title}
              href={o.href}
              target={o.external ? "_blank" : undefined}
              rel={o.external ? "noreferrer" : undefined}
              variants={revealItem}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-olive/15 bg-white/70 p-6 text-center transition-shadow hover:shadow-xl"
            >
              <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-white transition-transform group-hover:scale-110 ${o.color}`}>
                <o.icon size={22} />
              </div>
              <h3 className="font-display text-xl text-forest">{o.title}</h3>
              <p className="mt-1 text-sm text-charcoal/60">{o.desc}</p>
            </motion.a>
          ))}
        </RevealStagger>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <Reveal className="rounded-3xl border border-olive/15 bg-white/70 p-8">
            <h3 className="font-display text-2xl text-forest">Send Us a Message</h3>
            {status === "success" ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-olive">
                Thank you — we've received your message and will be in touch shortly.
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <input
                  required
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="rounded-xl border border-olive/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="rounded-xl border border-olive/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                  />
                  <input
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="rounded-xl border border-olive/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                  />
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help?"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="rounded-xl border border-olive/20 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cream transition hover:bg-charcoal disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"} <Send size={15} />
                </button>
                {status === "error" && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
              </form>
            )}
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="rounded-3xl border border-olive/15 bg-white/70 p-8">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-forest">
                <MapPin size={16} className="text-gold" /> {contact.address}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-olive">Business Hours</p>
              <div className="mt-2 grid grid-cols-2 gap-y-1 text-sm text-charcoal/70">
                {businessHours.map((h) => (
                  <span key={h.day}>
                    {h.day_display}: {h.is_closed ? "Closed" : `${h.open_time?.slice(0, 5)} – ${h.close_time?.slice(0, 5)}`}
                  </span>
                ))}
              </div>
            </div>
            {contact.maps_embed_url && (
              <div className="overflow-hidden rounded-3xl border-4 border-white shadow-lg">
                <iframe title="map" src={contact.maps_embed_url} width="100%" height="200" style={{ border: 0 }} loading="lazy" />
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
