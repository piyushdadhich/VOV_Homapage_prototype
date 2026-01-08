import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  Megaphone,
  Phone,
  Play,
  Sparkles,
  Ticket,
  Users,
  Mail,
  X,
  CircleDot,
  Shield,
  UtensilsCrossed,
} from "lucide-react";

/**
 * VOV / Vishnu Mandir — TWO DEMO HOMEPAGES (A + B)
 *
 * USER PRIORITIES (TOP TASKS):
 *  1) Inform visitors about upcoming events (increase attendance)
 *  2) Make it easy to BOOK events
 *  3) Increase donations
 *
 * Implementation notes:
 *  - Palette uses CSS variables with static Tailwind classes.
 *  - Both demos have the SAME 3 primary CTAs: Events • Book • Donate
 *  - Booking is demonstrated with a modal (demo UI) so “easy booking” is visible in the demo.
 */

// ===== Design Tokens (CSS variables) =====
const THEME_VARS = {
  "--saffron": "#F28C28",
  "--maroon": "#8B1E1E",
  "--white": "#FFFFFF",
  "--sand": "#FFF4E6",
  "--charcoal": "#2B2B2B",
  "--gold": "#D4A017",
  "--maroonSoft": "#B33A3A",
  "--stroke": "rgba(139, 30, 30, 0.16)",
  "--stroke2": "rgba(139, 30, 30, 0.12)",
  "--shadow": "0 18px 40px rgba(0,0,0,0.06)",
};

// ===== Demo Images (stand-ins) =====
// Replace with your own official temple photo set for production.
const IMG = {
  hero: "https://s3-media0.fl.yelpcdn.com/bphoto/wYYlHvVAgX_t4hEpOfP5lw/l.jpg",
  exterior: "https://s3-media0.fl.yelpcdn.com/bphoto/yNynDcoAavyelGEHuAwKXA/l.jpg",
  gate: "https://s3-media0.fl.yelpcdn.com/bphoto/k83WmUkiXHQW5bRqJO8xMg/l.jpg",
  hanuman: "https://s3-media0.fl.yelpcdn.com/bphoto/jqf5w3V4vDx0KN7OjdeabA/l.jpg",
  radhaKrishna: "https://s3-media0.fl.yelpcdn.com/bphoto/i6wD9jpZhc0PnclYo6g2xw/l.jpg",
  shiva: "https://s3-media0.fl.yelpcdn.com/bphoto/peSlE4vL6OZ2FmFKANzqhQ/l.jpg",
};

// ===== Demo Data =====
const EVENTS = [
  {
    id: "evt-1",
    when: "Fri",
    date: "This Friday",
    time: "6:30 PM",
    title: "Bhajan & Satsang",
    where: "Main Mandap",
    highlight: "Community singing + satsang (example).",
    featured: true,
  },
  {
    id: "evt-2",
    when: "Sat",
    date: "This Saturday",
    time: "11:00 AM",
    title: "Family Seva Morning",
    where: "Community Hall",
    highlight: "Volunteer seva teams welcome (example).",
  },
  {
    id: "evt-3",
    when: "Sun",
    date: "This Sunday",
    time: "5:30 PM",
    title: "Aarti + Prasad",
    where: "Temple Hall",
    highlight: "Join for evening aarti (example).",
  },
  {
    id: "evt-4",
    when: "Wed",
    date: "Next Week",
    time: "7:00 AM",
    title: "Surya Narayan Puja",
    where: "Temple Hall",
    highlight: "Special puja (example).",
  },
];

const DONATION_CAUSES = [
  {
    key: "temple",
    title: "Temple Worship",
    desc: "Daily puja, aarti, supplies, upkeep.",
    icon: Shield,
    img: IMG.hero,
  },
  {
    key: "bhojan",
    title: "Bhojan Sponsorship",
    desc: "Sponsor prasad / bhojan for devotees.",
    icon: UtensilsCrossed,
    img: IMG.gate,
  },
  {
    key: "care",
    title: "Health & Care",
    desc: "Support compassionate services and care.",
    icon: Heart,
    img: IMG.hanuman,
  },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useMotion() {
  const reduced = useReducedMotion();
  return {
    container: reduced
      ? { hidden: {}, show: {} }
      : {
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, duration: 0.35, ease: "easeOut" } },
        },
    item: reduced
      ? { hidden: {}, show: {} }
      : { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } } },
  };
}

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-[var(--white)] text-[var(--charcoal)]" style={THEME_VARS}>
      {children}
    </div>
  );
}

function Surface({ children, className = "", tone = "sand" }) {
  const base = "rounded-2xl border shadow-[var(--shadow)]";
  const bg = tone === "white" ? "bg-white/85" : "bg-[var(--sand)]/85";
  return (
    <div className={cx(base, bg, "border-[var(--stroke)]", className)} style={{ backdropFilter: "blur(10px)" }}>
      {children}
    </div>
  );
}

function Button({ as = "a", href = "#", onClick, variant = "primary", children, className = "", type }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2";

  const styles =
    variant === "primary"
      ? "bg-[var(--saffron)] text-[var(--charcoal)] hover:bg-[var(--gold)]"
      : variant === "maroon"
      ? "bg-[var(--maroon)] text-white hover:bg-[var(--maroonSoft)]"
      : "bg-white/80 text-[var(--charcoal)] border border-[var(--stroke)] hover:bg-[var(--sand)]";

  const Comp = as;
  return (
    <Comp href={as === "a" ? href : undefined} onClick={onClick} type={type} className={cx(base, styles, className)}>
      {children}
    </Comp>
  );
}

function Pill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full px-3 py-2 text-xs font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
      style={{ background: active ? "var(--maroon)" : "transparent", color: active ? "white" : "var(--charcoal)" }}
    >
      {children}
    </button>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--stroke)] bg-white/70 px-3 py-1 text-xs">
      <Sparkles size={14} className="text-[var(--gold)]" />
      <span className="font-extrabold text-[var(--maroon)]">{children}</span>
    </div>
  );
}

function SectionTitle({ eyebrow, title, desc, right = null }) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
      <div className="max-w-2xl">
        {eyebrow ? (
          <div className="mb-3">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        ) : null}
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-[var(--maroon)]">{title}</h2>
        {desc ? <p className="mt-3 text-sm leading-6 opacity-85">{desc}</p> : null}
      </div>
      {right}
    </div>
  );
}

function ImageTile({ src, alt, className = "" }) {
  return (
    <div className={cx("relative overflow-hidden rounded-2xl border border-[var(--stroke)]", className)}>
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.00), rgba(0,0,0,0.42))" }} />
    </div>
  );
}

function BookingModal({ open, onClose, event, onConfirm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qty, setQty] = useState(1);
  const [addDonation, setAddDonation] = useState(true);
  const [donation, setDonation] = useState(25);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setName("");
      setEmail("");
      setPhone("");
      setQty(1);
      setAddDonation(true);
      setDonation(25);
    }
  }, [open, event?.id]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-x-0 top-8 mx-auto max-w-2xl px-4">
        <div className="overflow-hidden rounded-3xl border border-[var(--stroke)] bg-white shadow-[var(--shadow)]">
          <div className="flex items-start justify-between gap-3 border-b border-[var(--stroke2)] bg-[var(--sand)]/65 p-5">
            <div>
              <div className="text-xs font-extrabold text-[var(--maroon)]">Book an event</div>
              <div className="mt-1 text-xl font-semibold text-[var(--maroon)]">{event?.title ?? "Select an event"}</div>
              <div className="mt-1 text-sm opacity-85">{event ? `${event.when} • ${event.time} • ${event.where}` : ""}</div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-2xl border border-[var(--stroke)] bg-white/80 transition hover:bg-white"
              aria-label="Close"
            >
              <X size={18} className="text-[var(--maroon)]" />
            </button>
          </div>

          <div className="p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-extrabold text-[var(--maroon)]">Full name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-[var(--stroke)] bg-white/90 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs font-extrabold text-[var(--maroon)]">Number of attendees</label>
                <select
                  value={qty}
                  onChange={(e) => setQty(parseInt(e.target.value, 10))}
                  className="mt-1 w-full rounded-2xl border border-[var(--stroke)] bg-white/90 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                >
                  {Array.from({ length: 10 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-extrabold text-[var(--maroon)]">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-[var(--stroke)] bg-white/90 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="text-xs font-extrabold text-[var(--maroon)]">Phone (optional)</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-[var(--stroke)] bg-white/90 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                  placeholder="(###) ###-####"
                />
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-[var(--stroke)] bg-[var(--sand)]/55 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-extrabold text-[var(--maroon)]">Optional: add a donation</div>
                  <div className="mt-1 text-xs opacity-85">Helps support the temple and seva.</div>
                </div>
                <label className="inline-flex items-center gap-2 text-xs font-extrabold">
                  <input type="checkbox" checked={addDonation} onChange={(e) => setAddDonation(e.target.checked)} />
                  Add donation
                </label>
              </div>

              {addDonation ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {[10, 25, 51, 101].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setDonation(v)}
                      className={cx(
                        "rounded-full border px-4 py-2 text-sm font-extrabold transition",
                        donation === v ? "bg-[var(--saffron)]/20" : "bg-white/80"
                      )}
                      style={{ borderColor: donation === v ? "rgba(139,30,30,0.40)" : "var(--stroke)" }}
                    >
                      ${v}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button as="button" type="button" variant="ghost" className="w-full" onClick={onClose}>
                Cancel
              </Button>
              <Button
                as="button"
                type="button"
                variant="primary"
                className="w-full"
                onClick={() => onConfirm?.({ eventId: event?.id, name, email, phone, qty, donation: addDonation ? donation : 0 })}
              >
                Confirm booking <ArrowRight size={16} />
              </Button>
            </div>
            <div className="mt-3 text-[11px] opacity-70">Demo only — connect to the real booking engine later.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrimaryActions({ onBook }) {
  // Same in both demos to keep priorities consistent.
  return (
    <div className="grid gap-3 rounded-3xl border border-[var(--stroke)] bg-white/85 p-3 backdrop-blur sm:grid-cols-3">
      <Button href="#events" variant="ghost" className="w-full">
        <Calendar size={16} className="text-[var(--maroon)]" /> Upcoming events <ArrowRight size={16} />
      </Button>
      <Button as="button" variant="maroon" className="w-full" onClick={onBook}>
        <Ticket size={16} /> Book an event <ArrowRight size={16} />
      </Button>
      <Button href="#donate" variant="primary" className="w-full">
        <Heart size={16} className="text-[var(--maroon)]" /> Donate <ArrowRight size={16} />
      </Button>
    </div>
  );
}

function Header({ demo, onDemoChange, onBook }) {
  // Keep top tasks visible in nav: Events • Book • Donate
  const nav = [
    { label: "Events", href: "#events" },
    { label: "Book", href: "#book" },
    { label: "Donate", href: "#donate" },
    { label: "Daily Puja", href: "#" },
    { label: "Announcements", href: "#" },
    { label: "Gallery", href: "#" },
    { label: "Watch", href: "#" },
  ];

  return (
    <>
      <div className="border-b border-[var(--stroke2)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs">
          <div className="flex items-center gap-2 opacity-90">
            <Phone size={14} className="text-[var(--maroon)]" />
            <span>+1 905-886-1724</span>
          </div>
          <div className="hidden items-center gap-2 opacity-90 sm:flex">
            <Clock size={14} className="text-[var(--maroon)]" />
            <span>Hours: Mon–Sun 7:30 AM–8:30 PM (example)</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[var(--stroke2)] bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--stroke)] bg-[var(--sand)]">
              <span className="text-sm font-extrabold text-[var(--maroon)]">VOV</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-[var(--maroon)]">Voice of Vedas</div>
              <div className="text-xs opacity-80">Vishnu Mandir</div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((t) => (
              <a key={t.label} href={t.href} className="rounded-full px-3 py-2 text-sm transition hover:bg-[var(--sand)]">
                {t.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden rounded-full border border-[var(--stroke)] bg-[var(--sand)]/60 p-1 md:flex">
              <Pill active={demo === "A"} onClick={() => onDemoChange("A")}>
                Demo A
              </Pill>
              <Pill active={demo === "B"} onClick={() => onDemoChange("B")}>
                Demo B
              </Pill>
            </div>
            <Button as="button" variant="maroon" className="rounded-full px-4 py-2" onClick={onBook}>
              <Ticket size={16} /> Book
            </Button>
            <Button href="#donate" variant="primary" className="rounded-full px-4 py-2">
              <Heart size={16} className="text-[var(--maroon)]" /> Donate
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pt-3 md:hidden">
        <div className="inline-flex rounded-full border border-[var(--stroke)] bg-[var(--sand)]/60 p-1">
          <Pill active={demo === "A"} onClick={() => onDemoChange("A")}>
            Demo A
          </Pill>
          <Pill active={demo === "B"} onClick={() => onDemoChange("B")}>
            Demo B
          </Pill>
        </div>
      </div>
    </>
  );
}

// ===== DEMO A (Evolutionary) =====
function HomeDemoA({ onBook }) {
  const { container, item } = useMotion();

  return (
    <div>
      {/* Hero (strong, calm) */}
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <motion.div variants={container} initial="hidden" animate="show" className="relative overflow-hidden rounded-3xl border border-[var(--stroke)]">
          <img src={IMG.hero} alt="Mandir interior" className="h-[60vh] min-h-[520px] w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.14) 44%, rgba(255,255,255,0.92) 100%)",
            }}
          />

          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-6 pb-6">
              <motion.div variants={item} className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs text-white backdrop-blur">
                  <Sparkles size={14} className="text-[var(--gold)]" />
                  Welcome
                </div>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Vishnu Mandir</h1>
                <p className="mt-2 text-sm leading-6 text-white/90">
                  Worship, learning, and seva — with clear actions for events, bookings, and donations.
                </p>
              </motion.div>

              <motion.div variants={item} className="mt-6">
                <PrimaryActions onBook={onBook} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <main className="mx-auto max-w-6xl px-4">
        {/* EVENTS FIRST (Priority #1) */}
        <section id="events" className="mt-12">
          <SectionTitle
            eyebrow="Priority 1 · Events"
            title="Upcoming events"
            desc="Increase attendance by making the next few events impossible to miss — and one-click bookable."
            right={
              <Button href="#" variant="ghost" className="rounded-full px-4 py-2">
                View full calendar <ArrowRight size={16} />
              </Button>
            }
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Surface tone="white" className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-[var(--maroon)]">This week</div>
                  <a href="#" className="text-xs font-extrabold text-[var(--maroon)]">
                    Calendar <ChevronRight size={14} className="inline" />
                  </a>
                </div>
                <div className="mt-4 space-y-3">
                  {EVENTS.map((e) => (
                    <div key={e.id} className="flex items-start justify-between gap-3 rounded-2xl border border-[var(--stroke)] bg-[var(--sand)]/70 p-4">
                      <div className="flex items-start gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--stroke2)] bg-white/70 text-[11px] font-extrabold text-[var(--maroon)]">
                          {e.when}
                        </div>
                        <div>
                          <div className="text-xs opacity-75">{e.time} • {e.where}</div>
                          <div className="text-sm font-semibold">{e.title}</div>
                          <div className="mt-1 text-xs opacity-80">{e.highlight}</div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button as="button" variant="maroon" className="px-4 py-2" onClick={() => onBook(e)}>
                          <Ticket size={16} /> Book
                        </Button>
                        <a href="#" className="text-xs font-extrabold text-[var(--maroon)] text-center">
                          Details
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </Surface>
            </div>

            <div className="lg:col-span-5 grid gap-4">
              <Surface tone="sand" className="p-5" id="book">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-[var(--maroon)]">Priority 2 · Book</div>
                  <span className="text-xs opacity-70">Fast flow</span>
                </div>
                <div className="mt-4 rounded-2xl border border-[var(--stroke)] bg-white/80 p-4">
                  <div className="text-xs font-extrabold text-[var(--maroon)]">Book in seconds</div>
                  <div className="mt-1 text-xs opacity-85">Pick an event → name/email → confirm.</div>
                  <Button as="button" variant="maroon" className="mt-4 w-full" onClick={() => onBook(EVENTS.find((x) => x.featured) ?? EVENTS[0])}>
                    <Ticket size={16} /> Book next event <ArrowRight size={16} />
                  </Button>
                </div>
                <div className="mt-3 text-[11px] opacity-75">(For real build: connect to booking engine / payment.)</div>
              </Surface>

              <Surface tone="sand" className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-[var(--maroon)]">Watch (secondary)</div>
                  <a href="#" className="text-xs font-extrabold text-[var(--maroon)]">
                    YouTube <ChevronRight size={14} className="inline" />
                  </a>
                </div>
                <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--stroke)]">
                  <div className="relative aspect-video">
                    <img src={IMG.exterior} alt="Video preview" className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 grid place-items-center bg-black/20">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-sm font-extrabold text-white backdrop-blur">
                        <Play size={16} className="text-[var(--gold)]" /> Latest
                      </div>
                    </div>
                  </div>
                </div>
              </Surface>
            </div>
          </div>
        </section>

        {/* DONATE (Priority #3) */}
        <section id="donate" className="mt-14">
          <SectionTitle
            eyebrow="Priority 3 · Donate"
            title="Support a seva"
            desc="Donation is always one click away and uses simple, familiar amount choices."
          />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {DONATION_CAUSES.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.key} className="overflow-hidden rounded-3xl border border-[var(--stroke)]">
                  <div className="relative aspect-[4/3]">
                    <img src={c.img} alt={c.title} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.62))" }} />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="rounded-2xl border border-white/30 bg-white/15 p-4 text-white backdrop-blur">
                        <div className="flex items-center gap-2 text-xs opacity-95">
                          <Icon size={16} className="text-[var(--gold)]" /> Seva
                        </div>
                        <div className="mt-1 text-lg font-semibold">{c.title}</div>
                        <div className="mt-1 text-xs opacity-90">{c.desc}</div>
                        <a href="#" className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--saffron)] px-4 py-2 text-sm font-extrabold text-[var(--charcoal)] hover:bg-[var(--gold)]">
                          Donate <ArrowRight size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--stroke)] bg-[var(--sand)]/60 p-5">
            <div className="text-sm font-semibold text-[var(--maroon)]">Trust & transparency</div>
            <div className="mt-2 text-sm opacity-85">Add: charitable registration, receipts, how funds are used, and annual reports (links).</div>
          </div>
        </section>

        {/* Gallery (supporting) */}
        <section className="mt-14">
          <SectionTitle eyebrow="Gallery" title="Moments from the mandir" desc="A curated set keeps warmth without overwhelming priorities." />
          <div className="mt-6 grid gap-4 lg:grid-cols-12">
            <ImageTile src={IMG.radhaKrishna} alt="Radha Krishna" className="lg:col-span-5 aspect-[4/3]" />
            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              <ImageTile src={IMG.exterior} alt="Exterior" className="aspect-[4/3]" />
              <ImageTile src={IMG.gate} alt="Gate" className="aspect-[4/3]" />
              <ImageTile src={IMG.shiva} alt="Shiva" className="aspect-[4/3]" />
              <ImageTile src={IMG.hanuman} alt="Hanuman" className="aspect-[4/3]" />
            </div>
          </div>
        </section>

        <Footer onBook={() => onBook(EVENTS[0])} />
      </main>
    </div>
  );
}

// ===== DEMO B (Radical: Live Mandir + Events/Book/Donate flow) =====
function HomeDemoB({ onBook }) {
  const { container, item } = useMotion();
  const featured = useMemo(() => EVENTS.find((e) => e.featured) ?? EVENTS[0], []);

  // Light “live” element (keeps it feeling alive without becoming a dashboard wall)
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const isOpen = useMemo(() => {
    const mins = now.getHours() * 60 + now.getMinutes();
    return mins >= 450 && mins <= 1230; // demo: 7:30–20:30
  }, [now]);

  return (
    <main className="mx-auto max-w-6xl px-4">
      {/* ABOVE THE FOLD: balanced two-column only here (no long right column) */}
      <motion.section variants={container} initial="hidden" animate="show" className="pt-6" id="live">
        <div className="mb-3">
          <Eyebrow>Live Mandir · Events · Book · Donate</Eyebrow>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {/* Left: Live + featured + primary actions */}
          <motion.div variants={item} className="lg:col-span-6">
            <Surface tone="sand" className="p-5 h-full">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--stroke)] bg-white/70 px-3 py-1 text-xs">
                  <CircleDot size={14} className={isOpen ? "text-[var(--gold)]" : "text-[var(--maroonSoft)]"} />
                  <span className="font-extrabold text-[var(--maroon)]">{isOpen ? "Open now" : "Closed now"}</span>
                  <span className="opacity-70">(demo)</span>
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--stroke)] bg-white/70 px-3 py-1 text-xs">
                  <MapPin size={14} className="text-[var(--maroon)]" /> Richmond Hill
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--maroon)] sm:text-4xl">Live Mandir</h1>
              <p className="mt-3 text-sm leading-6 opacity-90">
                Designed for the three priorities: promote events, make booking effortless, and increase donations.
              </p>

              <div className="mt-5">
                <PrimaryActions onBook={() => onBook(featured)} />
              </div>

              <div className="mt-5 rounded-2xl border border-[var(--stroke)] bg-white/80 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-extrabold text-[var(--maroon)]">Featured event</div>
                    <div className="mt-1 text-sm font-semibold">{featured.title}</div>
                    <div className="mt-1 text-xs opacity-80">{featured.date} • {featured.time} • {featured.where}</div>
                    <div className="mt-2 text-xs opacity-85">{featured.highlight}</div>
                  </div>
                  <Button as="button" variant="maroon" className="px-4 py-2" onClick={() => onBook(featured)}>
                    <Ticket size={16} /> Book
                  </Button>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[var(--stroke)] bg-white/80 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--maroon)]">
                    <Megaphone size={16} /> Bulletin
                  </div>
                  <div className="mt-2 text-xs opacity-85">Festival preparations this week (example).</div>
                  <a href="#" className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold text-[var(--maroon)]">
                    View updates <ChevronRight size={14} />
                  </a>
                </div>
                <div className="rounded-2xl border border-[var(--stroke)] bg-white/80 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--maroon)]">
                    <Clock size={16} /> Visit hours
                  </div>
                  <div className="mt-2 text-xs opacity-85">7:30 AM – 8:30 PM (example)</div>
                  <a href="#visit" className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold text-[var(--maroon)]">
                    Plan visit <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </Surface>
          </motion.div>

          {/* Right: a visually connected “journey” card (Events → Book → Donate) */}
          <motion.div variants={item} className="lg:col-span-6">
            <Surface tone="sand" className="p-5 h-full">
              <div className="text-sm font-semibold text-[var(--maroon)]">Your next steps</div>
              <div className="mt-2 text-xs opacity-85">A connected flow (not random modules).</div>

              {/* Step 1: Events preview */}
              <div className="mt-4 rounded-2xl border border-[var(--stroke)] bg-white/80 p-4" id="events">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-extrabold text-[var(--maroon)]">1) Upcoming events</div>
                  <a href="#events-list" className="text-xs font-extrabold text-[var(--maroon)]">
                    See all <ChevronRight size={14} className="inline" />
                  </a>
                </div>
                <div className="mt-3 space-y-2">
                  {EVENTS.slice(0, 2).map((e) => (
                    <div key={e.id} className="flex items-start justify-between gap-3 rounded-2xl border border-[var(--stroke)] bg-[var(--sand)]/60 p-3">
                      <div className="flex items-start gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--stroke2)] bg-white/70 text-[11px] font-extrabold text-[var(--maroon)]">
                          {e.when}
                        </div>
                        <div>
                          <div className="text-xs opacity-75">{e.time} • {e.where}</div>
                          <div className="text-sm font-semibold">{e.title}</div>
                        </div>
                      </div>
                      <Button as="button" variant="maroon" className="px-3 py-2" onClick={() => onBook(e)}>
                        <Ticket size={16} /> Book
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step connector */}
              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-[var(--stroke)]" />
                <span className="text-[11px] font-extrabold text-[var(--maroon)]">then</span>
                <div className="h-px flex-1 bg-[var(--stroke)]" />
              </div>

              {/* Step 2: Book */}
              <div className="rounded-2xl border border-[var(--stroke)] bg-white/80 p-4" id="book">
                <div className="text-xs font-extrabold text-[var(--maroon)]">2) Book in seconds</div>
                <div className="mt-2 text-xs opacity-85">Pick event → name/email → confirm (demo modal).</div>
                <Button as="button" variant="maroon" className="mt-3 w-full" onClick={() => onBook(featured)}>
                  <Ticket size={16} /> Book the featured event <ArrowRight size={16} />
                </Button>
              </div>

              {/* Step connector */}
              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-[var(--stroke)]" />
                <span className="text-[11px] font-extrabold text-[var(--maroon)]">and</span>
                <div className="h-px flex-1 bg-[var(--stroke)]" />
              </div>

              {/* Step 3: Donate */}
              <div className="rounded-2xl border border-[var(--stroke)] bg-white/80 p-4" id="donate">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-extrabold text-[var(--maroon)]">3) Support seva</div>
                  <a href="#donate-section" className="text-xs font-extrabold text-[var(--maroon)]">
                    Causes <ChevronRight size={14} className="inline" />
                  </a>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[10, 25, 51, 101].map((v) => (
                    <a
                      key={v}
                      href="#donate-section"
                      className="rounded-full border border-[var(--stroke)] bg-[var(--sand)]/60 px-4 py-2 text-sm font-extrabold hover:bg-[var(--saffron)]/20"
                    >
                      Give ${v}
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--stroke)]">
                <div className="relative aspect-video">
                  <img src={IMG.exterior} alt="Mandir" className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0.55))" }} />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="rounded-2xl border border-white/30 bg-white/15 p-4 text-white backdrop-blur">
                      <div className="text-sm font-semibold">Not just a dashboard</div>
                      <div className="mt-1 text-xs opacity-90">Each section below continues the story — no abrupt drop.</div>
                    </div>
                  </div>
                </div>
              </div>
            </Surface>
          </motion.div>
        </div>
      </motion.section>

      {/* BELOW THE FOLD: single-column flow to avoid “right column keeps going” */}

      {/* EVENTS LIST (Priority 1) */}
      <section className="mt-12" id="events-list">
        <SectionTitle
          eyebrow="Priority 1 · Events"
          title="Upcoming events"
          desc="Make the next few events unmissable — and bookable from every card."
          right={
            <Button href="#" variant="ghost" className="rounded-full px-4 py-2">
              View full calendar <ArrowRight size={16} />
            </Button>
          }
        />

        <div className="mt-6">
          <Surface tone="white" className="p-5">
            <div className="space-y-3">
              {EVENTS.map((e) => (
                <div key={e.id} className="flex flex-col gap-3 rounded-2xl border border-[var(--stroke)] bg-[var(--sand)]/70 p-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--stroke2)] bg-white/70 text-[11px] font-extrabold text-[var(--maroon)]">
                      {e.when}
                    </div>
                    <div>
                      <div className="text-xs opacity-75">{e.date} • {e.time} • {e.where}</div>
                      <div className="text-sm font-semibold">{e.title}</div>
                      <div className="mt-1 text-xs opacity-80">{e.highlight}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:flex-col sm:items-stretch">
                    <Button as="button" variant="maroon" className="px-4 py-2" onClick={() => onBook(e)}>
                      <Ticket size={16} /> Book
                    </Button>
                    <a href="#" className="text-xs font-extrabold text-[var(--maroon)] text-center">Details</a>
                  </div>
                </div>
              ))}
            </div>
          </Surface>
        </div>
      </section>

      {/* BOOKING (Priority 2) */}
      <section className="mt-12" id="book-section">
        <SectionTitle
          eyebrow="Priority 2 · Book"
          title="Book an event (fast)"
          desc="Show the booking flow clearly. In production this connects to your booking engine."
          right={
            <Button as="button" variant="maroon" className="rounded-full px-4 py-2" onClick={() => onBook(featured)}>
              <Ticket size={16} /> Book featured
            </Button>
          }
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          <Surface tone="sand" className="lg:col-span-7 p-5">
            <div className="text-sm font-semibold text-[var(--maroon)]">How it works</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {["Pick an event", "Enter name/email", "Confirm"].map((s, i) => (
                <div key={s} className="rounded-2xl border border-[var(--stroke)] bg-white/80 p-4">
                  <div className="text-xs font-extrabold text-[var(--maroon)]">Step {i + 1}</div>
                  <div className="mt-1 text-sm font-semibold">{s}</div>
                </div>
              ))}
            </div>
            <Button as="button" variant="maroon" className="mt-4 w-full" onClick={() => onBook(featured)}>
              <Ticket size={16} /> Open booking modal <ArrowRight size={16} />
            </Button>
            <div className="mt-2 text-[11px] opacity-75">Tip: keep booking friction low to increase attendance.</div>
          </Surface>

          <div className="lg:col-span-5">
            <ImageTile src={IMG.gate} alt="Mandir" className="aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* DONATE (Priority 3) */}
      <section className="mt-12" id="donate-section">
        <SectionTitle
          eyebrow="Priority 3 · Donate"
          title="Support a seva"
          desc="Donation is always one click away, with simple amount choices and clear trust cues."
        />

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {DONATION_CAUSES.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.key} className="overflow-hidden rounded-3xl border border-[var(--stroke)]">
                <div className="relative aspect-[4/3]">
                  <img src={c.img} alt={c.title} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.62))" }} />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="rounded-2xl border border-white/30 bg-white/15 p-4 text-white backdrop-blur">
                      <div className="flex items-center gap-2 text-xs opacity-95">
                        <Icon size={16} className="text-[var(--gold)]" /> Seva
                      </div>
                      <div className="mt-1 text-lg font-semibold">{c.title}</div>
                      <div className="mt-1 text-xs opacity-90">{c.desc}</div>
                      <a href="#" className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--saffron)] px-4 py-2 text-sm font-extrabold text-[var(--charcoal)] hover:bg-[var(--gold)]">
                        Donate <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          <Surface tone="sand" className="lg:col-span-7 p-5">
            <div className="text-sm font-semibold text-[var(--maroon)]">Quick donate</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[10, 25, 51, 101].map((v) => (
                <a
                  key={v}
                  href="#"
                  className="rounded-full border border-[var(--stroke)] bg-white/80 px-4 py-2 text-sm font-extrabold hover:bg-[var(--saffron)]/20"
                >
                  Give ${v}
                </a>
              ))}
            </div>
          </Surface>
          <Surface tone="sand" className="lg:col-span-5 p-5">
            <div className="text-sm font-semibold text-[var(--maroon)]">Trust & transparency</div>
            <div className="mt-2 text-sm opacity-85">Add: charitable registration, receipts, how funds are used, annual reports (links).</div>
          </Surface>
        </div>
      </section>

      {/* Supporting (secondary) */}
      <section className="mt-12">
        <div className="grid gap-4 lg:grid-cols-12">
          <Surface tone="sand" className="lg:col-span-7 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-[var(--maroon)]">Watch (secondary)</div>
              <a href="#" className="text-xs font-extrabold text-[var(--maroon)]">
                YouTube <ChevronRight size={14} className="inline" />
              </a>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--stroke)]">
              <div className="relative aspect-video">
                <img src={IMG.exterior} alt="Video preview" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 grid place-items-center bg-black/20">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-sm font-extrabold text-white backdrop-blur">
                    <Play size={16} className="text-[var(--gold)]" /> Latest
                  </div>
                </div>
              </div>
            </div>
          </Surface>

          <div className="lg:col-span-5" id="visit">
            <Surface tone="sand" className="p-5">
              <div className="text-sm font-semibold text-[var(--maroon)]">Plan your visit</div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl border border-[var(--stroke)] bg-white/80 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--maroon)]">
                    <MapPin size={16} /> Address
                  </div>
                  <div className="mt-2 text-sm">8640 Yonge St, Richmond Hill, ON</div>
                  <a href="#" className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold text-[var(--maroon)]">
                    Get directions <ChevronRight size={14} />
                  </a>
                </div>
                <div className="rounded-2xl border border-[var(--stroke)] bg-white/80 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--maroon)]">
                    <Phone size={16} /> Contact
                  </div>
                  <div className="mt-2 text-sm">+1 905-886-1724</div>
                  <a href="#" className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold text-[var(--maroon)]">
                    Email / WhatsApp <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </Surface>
          </div>
        </div>
      </section>

      <Footer onBook={() => onBook(featured)} />
    </main>
  );
}

function Footer({ onBook }) {
  return (
    <footer className="mt-16 pb-24 md:pb-8">
      <div className="overflow-hidden rounded-3xl bg-[var(--maroon)] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="text-sm font-semibold">Vishnu Mandir • Voice of Vedas</div>
              <p className="mt-3 text-sm leading-6 opacity-90">Sacred spaces for worship, learning, community, and service.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-2 text-xs font-extrabold" href="#">
                  <Mail size={14} /> info@vishnumandir.com
                </a>
                <a className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-2 text-xs font-extrabold" href="#">
                  <Phone size={14} /> +1 905-886-1724
                </a>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="text-sm font-semibold">Top tasks</div>
              <ul className="mt-3 space-y-2 text-sm opacity-95">
                <li>
                  <a href="#events" className="inline-flex items-center gap-1">
                    Events <ChevronRight size={14} />
                  </a>
                </li>
                <li>
                  <a href="#book" className="inline-flex items-center gap-1">
                    Book <ChevronRight size={14} />
                  </a>
                </li>
                <li>
                  <a href="#donate" className="inline-flex items-center gap-1">
                    Donate <ChevronRight size={14} />
                  </a>
                </li>
              </ul>
              <button
                type="button"
                onClick={onBook}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white/15 px-4 py-3 text-sm font-extrabold backdrop-blur hover:bg-white/20"
              >
                <Ticket size={16} className="text-[var(--gold)]" /> Book an event
              </button>
            </div>

            <div className="md:col-span-4">
              <div className="text-sm font-semibold">Location</div>
              <div className="mt-3 overflow-hidden rounded-2xl border border-white/25">
                <div className="relative aspect-[16/11]">
                  <img src={IMG.exterior} alt="Mandir" className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </div>
              <div className="mt-3 text-xs opacity-90">8640 Yonge St, Richmond Hill, ON</div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/20 pt-4 text-xs opacity-85">© {new Date().getFullYear()} Voice of Vedas (VOV). All rights reserved.</div>
        </div>
      </div>

      {/* Mobile dock: keep priorities accessible everywhere */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--stroke2)] bg-white/92 p-3 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2">
          <a href="#events" className="flex items-center justify-center gap-2 rounded-2xl border border-[var(--stroke)] bg-[var(--sand)]/70 px-3 py-2 text-sm font-extrabold">
            <Calendar size={16} className="text-[var(--maroon)]" /> Events
          </a>
          <button
            type="button"
            onClick={onBook}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[var(--maroon)] px-3 py-2 text-sm font-extrabold text-white"
          >
            <Ticket size={16} /> Book
          </button>
          <a href="#donate" className="flex items-center justify-center gap-2 rounded-2xl bg-[var(--saffron)] px-3 py-2 text-sm font-extrabold text-[var(--charcoal)]">
            <Heart size={16} className="text-[var(--maroon)]" /> Donate
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function VOVTwoDemoHomepages() {
  const [demo, setDemo] = useState("B");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0]);

  const openBooking = (evt = EVENTS[0]) => {
    setSelectedEvent(evt);
    setBookingOpen(true);
  };

  return (
    <Shell>
      <Header demo={demo} onDemoChange={setDemo} onBook={() => openBooking(EVENTS.find((x) => x.featured) ?? EVENTS[0])} />

      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-4 rounded-2xl border border-[var(--stroke)] bg-[var(--sand)]/55 px-4 py-3 text-xs">
          <span className="font-extrabold text-[var(--maroon)]">{demo === "A" ? "Demo A:" : "Demo B:"}</span>{" "}
          {demo === "A"
            ? "Evolutionary refresh — Events, Book, Donate are all top priority."
            : "Radical ‘Live Mandir’ — guided flow: Events → Book → Donate, with booking visible in the demo."}
        </div>
      </div>

      {demo === "A" ? <HomeDemoA onBook={openBooking} /> : <HomeDemoB onBook={openBooking} />}

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        event={selectedEvent}
        onConfirm={() => setBookingOpen(false)}
      />
    </Shell>
  );
}
