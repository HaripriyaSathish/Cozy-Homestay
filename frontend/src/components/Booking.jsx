import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, PartyPopper } from "lucide-react";
import { useState } from "react";
import { submitBookingEnquiry } from "../api/client";
import { Reveal, SectionLabel } from "./Reveal";

const STEP_TITLES = ["Your Details", "Your Stay", "Your Preferences"];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  check_in: "",
  check_out: "",
  adults: 2,
  children: 0,
  rooms_requested: 1,
  room_preference: "",
  special_request: "",
};

function validateStep(step, form) {
  const errors = {};
  if (step === 0) {
    if (!form.name.trim()) errors.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Enter a valid email";
    if (!form.phone.trim()) errors.phone = "Phone number is required";
  }
  if (step === 1) {
    if (!form.check_in) errors.check_in = "Select a check-in date";
    if (!form.check_out) errors.check_out = "Select a check-out date";
    if (form.check_in && form.check_out && form.check_out <= form.check_in) {
      errors.check_out = "Check-out must be after check-in";
    }
  }
  return errors;
}

export function Booking({ rooms }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [reference, setReference] = useState("");
  const [serverError, setServerError] = useState("");

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const goNext = () => {
    const stepErrors = validateStep(step, form);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) setStep((s) => Math.min(s + 1, 2));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stepErrors = validateStep(1, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      setStep(1);
      return;
    }
    setStatus("submitting");
    setServerError("");
    try {
      const payload = {
        ...form,
        room_preference: form.room_preference || null,
      };
      const res = await submitBookingEnquiry(payload);
      setReference(res.reference_code);
      setStatus("success");
    } catch (err) {
      setServerError("Something went wrong. Please try again or reach us on WhatsApp.");
      setStatus("idle");
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setStep(0);
    setStatus("idle");
  };

  return (
    <section id="booking" className="relative overflow-hidden bg-forest py-28 text-cream">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(200,166,106,0.12),transparent_55%)]" />
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="text-center">
          <Reveal>
            <SectionLabel>Book Your Stay</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">
              Your Escape <span className="text-gradient-gold italic">Starts Here.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-cream/70">
              Tell us when you're planning to stay, and we'll help you find the perfect accommodation.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-12 rounded-3xl border border-cream/10 bg-cream/[0.04] p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-forest"
                >
                  <PartyPopper size={28} />
                </motion.div>
                <h3 className="mt-6 font-display text-3xl">Enquiry Received!</h3>
                <p className="mt-3 max-w-sm text-cream/70">
                  Thank you, {form.name.split(" ")[0]}. Your reference is{" "}
                  <span className="font-semibold text-gold">{reference}</span>. Our team will confirm availability
                  shortly by email.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-8 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-forest"
                >
                  Make Another Enquiry
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit}>
                {/* Progress bar */}
                <div className="mb-10">
                  <div className="mb-3 flex justify-between text-xs font-semibold uppercase tracking-wide text-cream/60">
                    {STEP_TITLES.map((t, i) => (
                      <span key={t} className={i <= step ? "text-gold" : ""}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream/10">
                    <motion.div
                      className="h-full rounded-full bg-gold"
                      animate={{ width: `${((step + 1) / 3) * 100}%` }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                      className="grid gap-5 sm:grid-cols-2"
                    >
                      <Field label="Full Name" error={errors.name} className="sm:col-span-2">
                        <input value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} placeholder="Your name" />
                      </Field>
                      <Field label="Email" error={errors.email}>
                        <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} placeholder="you@email.com" />
                      </Field>
                      <Field label="Phone" error={errors.phone}>
                        <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} placeholder="+91 98765 43210" />
                      </Field>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                      className="grid gap-5 sm:grid-cols-2"
                    >
                      <Field label="Check-In" error={errors.check_in}>
                        <input type="date" value={form.check_in} onChange={(e) => update("check_in", e.target.value)} className={`${inputClass} [color-scheme:dark]`} />
                      </Field>
                      <Field label="Check-Out" error={errors.check_out}>
                        <input type="date" value={form.check_out} onChange={(e) => update("check_out", e.target.value)} className={`${inputClass} [color-scheme:dark]`} />
                      </Field>
                      <Field label="Adults">
                        <input type="number" min={1} value={form.adults} onChange={(e) => update("adults", e.target.value)} className={inputClass} />
                      </Field>
                      <Field label="Children">
                        <input type="number" min={0} value={form.children} onChange={(e) => update("children", e.target.value)} className={inputClass} />
                      </Field>
                      <Field label="Number of Rooms">
                        <input type="number" min={1} value={form.rooms_requested} onChange={(e) => update("rooms_requested", e.target.value)} className={inputClass} />
                      </Field>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                      className="grid gap-5"
                    >
                      <Field label="Room Preference">
                        <select value={form.room_preference} onChange={(e) => update("room_preference", e.target.value)} className={inputClass}>
                          <option value="">No preference</option>
                          {rooms.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.name}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Special Request">
                        <textarea
                          value={form.special_request}
                          onChange={(e) => update("special_request", e.target.value)}
                          rows={4}
                          className={inputClass}
                          placeholder="Anything we should know before you arrive?"
                        />
                      </Field>
                    </motion.div>
                  )}
                </AnimatePresence>

                {serverError && <p className="mt-4 text-sm text-red-300">{serverError}</p>}

                <div className="mt-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-cream/60 disabled:opacity-0"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>

                  {step < 2 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-wide text-forest transition hover:brightness-110"
                    >
                      Continue <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-wide text-forest transition hover:brightness-110 disabled:opacity-60"
                    >
                      {status === "submitting" ? "Sending..." : "Submit Enquiry"} <Check size={16} />
                    </button>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border border-cream/15 bg-cream/5 px-4 py-3 text-sm text-cream placeholder:text-cream/30 outline-none transition focus:border-gold";

function Field({ label, error, children, className = "" }) {
  return (
    <label className={`flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-cream/60 ${className}`}>
      {label}
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[11px] font-medium normal-case tracking-normal text-red-300"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}
