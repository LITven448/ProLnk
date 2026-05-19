import { useState } from "react";
import { useLocation } from "wouter";
import {
  Star, Shield, BadgeCheck, ChevronRight, Clock, CheckCircle,
  ChevronDown, Calendar, Zap, Wrench, ArrowRight, Loader2,
  CreditCard, Lock,
} from "lucide-react";

const BG = "#0A1628″;
const CARD = "#0F1F3D";
const BORDER = "#1E3A5F";
const BLUE = "#3B82F6″;
const GREEN = "#10B981″;

const today = new Date();
const SLOTS = Array.from({ length: 5 }, (_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() + i + 1);
  return {
    date: d,
    label: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    amSlots: ["8:00 AM", "9:30 AM", "11:00 AM"],
    pmSlots: ["1:00 PM", "2:30 PM", "4:00 PM"],
  };
});

const SERVICE_TIERS = [
  {
    id: "inspection",
    label: "Inspection",
    price: 79,
    duration: "1–2 hrs",
    icon: Wrench,
    color: BLUE,
    perks: ["Full system assessment", "Written report", "No repairs included"],
  },
  {
    id: "full",
    label: "Full Service",
    price: 189,
    duration: "2–4 hrs",
    icon: BadgeCheck,
    color: "#8B5CF6″,
    perks: ["Assessment + common repairs", "Parts up to $75 included", "30-day service guarantee"],
    recommended: true,
  },
  {
    id: "emergency",
    label: "Emergency",
    price: 299,
    duration: "Same day",
    icon: Zap,
    color: "#EF4444″,
    perks: ["Priority dispatch", "Any-hour availability", "Complete resolution focus"],
  },
];

function useQueryParam(key: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key) ?? "";
}

function avatarColor(id: string) {
  const colors = ["#1B4FD8″, "#0d9488", "#7c3aed", "#d97706", "#059669", "#0891b2"];
  let h = 0;
  for (let i = 0; i < id.length; i++) h = id.charCodeAt(i) + ((h << 5) - h);
  return colors[Math.abs(h) % colors.length];
}

export default function BookPro() {
  const [, navigate] = useLocation();
  const proId = useQueryParam("pro");
  const serviceParam = useQueryParam("service");

  const proName = proId ? `Marcus T.` : "TrustyPro Pro";
  const proTrade = serviceParam || "HVAC Specialist";
  const proRating = 4.9;
  const proReviews = 312;
  const proResponse = "< 2 hrs";

  const [selectedTier, setSelectedTier] = useState("full");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);

  const tier = SERVICE_TIERS.find((t) => t.id === selectedTier)!;
  const slotDay = selectedDate !== null ? SLOTS[selectedDate] : null;
  const estimatedArrival = selectedSlot
    ? `${selectedSlot} – ${selectedSlot.replace(/\d+:\d+/, (m) => {
        const [h, min] = m.split(":").map(Number);
        return `${h + 1}:${min.toString().padStart(2, "0")}`;
      })}`
    : null;

  const handleBook = () => {
    if (!selectedDate === null || !selectedSlot) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setBooked(true); }, 1400);
  };

  if (booked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4″ style={{ backgroundColor: BG }}>
        <div className="w-full max-w-sm rounded-2xl border p-8 text-center space-y-5″ style={{ backgroundColor: CARD, borderColor: BORDER }}>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
            style={{ background: `radial-gradient(circle, ${GREEN}30, ${GREEN}10)`, border: `2px solid ${GREEN}` }}
          >
            <CheckCircle className="w-10 h-10″ style={{ color: GREEN }} />
          </div>

          <div>
            <h2 className="text-2xl font-black text-white mb-1″>Booking Confirmed!</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {proName} will arrive {estimatedArrival ? `between ${estimatedArrival}` : "at your selected time"}.
              Check your email for confirmation.
            </p>
          </div>

          {slotDay && selectedSlot && (
            <div className="rounded-xl border p-4 text-left space-y-2″ style={{ backgroundColor: "#0A1628", borderColor: BORDER }}>
              <div className="flex items-center gap-2 text-sm text-slate-300″>
                <Calendar className="w-4 h-4 text-blue-400″ />
                {slotDay.label} at {selectedSlot}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300″>
                <BadgeCheck className="w-4 h-4 text-blue-400″ />
                {tier.label} — ${tier.price}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300″>
                <Shield className="w-4 h-4 text-blue-400″ />
                ProLnk Protection Guarantee active
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2″>
            <button
              onClick={() => navigate("/trustypro")}
              className="w-full py-3 rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: BLUE }}
            >
              Back to TrustyPro
            </button>
            <button
              onClick={() => { setBooked(false); setSelectedDate(null); setSelectedSlot(null); setConfirmed(false); }}
              className="w-full py-3 rounded-xl text-sm font-semibold border text-slate-400 hover:text-white transition-colors"
              style={{ borderColor: BORDER }}
            >
              Book Another Service
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG, fontFamily: "'Inter', sans-serif" }}>
      <nav
        className="sticky top-0 z-40 border-b backdrop-blur-sm"
        style={{ backgroundColor: "rgba(10,22,40,0.95)", borderColor: BORDER }}
      >
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center gap-3″>
          <button onClick={() => navigate("/trustypro/pros")} className="text-slate-400 hover:text-white transition-colors">
            <ChevronRight className="w-5 h-5 rotate-180″ />
          </button>
          <div className="w-px h-4″ style={{ backgroundColor: BORDER }} />
          <div className="flex items-center gap-2″>
            <Shield className="w-4 h-4 text-blue-400″ />
            <span className="font-bold text-white text-sm">Book a Pro</span>
          </div>
          <div className="ml-auto flex items-center gap-1 text-xs text-slate-500″>
            <Lock className="w-3 h-3″ />
            Secure booking
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-5″>
        <div className="rounded-2xl border p-5″ style={{ backgroundColor: CARD, borderColor: BORDER }}>
          <div className="flex items-center gap-4″>
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-black text-2xl flex-shrink-0″
              style={{ backgroundColor: avatarColor(proId || "default") }}
            >
              {proName[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0″>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-black text-white">{proName}</p>
                <BadgeCheck className="w-4 h-4 text-blue-400″ />
                <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ backgroundColor: `${GREEN}20`, color: GREEN }}>Verified Pro</span>
              </div>
              <p className="text-sm text-slate-400 mt-0.5″>{proTrade}</p>
              <div className="flex items-center gap-3 mt-1″>
                <div className="flex items-center gap-1″>
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400″ />
                  <span className="text-xs font-bold text-white">{proRating}</span>
                  <span className="text-xs text-slate-500″>({proReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500″>
                  <Clock className="w-3 h-3″ />
                  <span className="text-xs">Responds {proResponse}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border p-5 space-y-4″ style={{ backgroundColor: CARD, borderColor: BORDER }}>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Service Tier</p>
          <div className="space-y-3″>
            {SERVICE_TIERS.map((t) => {
              const active = selectedTier === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTier(t.id)}
                  className="relative rounded-xl border-2 p-4 cursor-pointer transition-all"
                  style={{
                    borderColor: active ? t.color : BORDER,
                    backgroundColor: active ? `${t.color}10` : "transparent",
                  }}
                >
                  {t.recommended && (
                    <div
                      className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{ backgroundColor: t.color, color: "#fff" }}
                    >
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2″>
                    <div className="flex items-center gap-2″>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${t.color}20` }}>
                        <t.icon className="w-4 h-4″ style={{ color: t.color }} />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{t.label}</p>
                        <p className="text-xs text-slate-500″>{t.duration}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-white text-lg">${t.price}</p>
                      <p className="text-xs text-slate-500″>flat rate</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1″>
                    {t.perks.map((perk) => (
                      <div key={perk} className="flex items-center gap-1.5″>
                        <CheckCircle className="w-3 h-3 flex-shrink-0″ style={{ color: t.color }} />
                        <span className="text-xs text-slate-400″>{perk}</span>
                      </div>
                    ))}
                  </div>
                  {active && (
                    <div className="absolute top-4 right-4″>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: t.color }}>
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border p-5 space-y-4″ style={{ backgroundColor: CARD, borderColor: BORDER }}>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Date & Time</p>

          <div className="flex gap-2 overflow-x-auto pb-1″>
            {SLOTS.map((slot, i) => (
              <button
                key={i}
                onClick={() => { setSelectedDate(i); setSelectedSlot(null); }}
                className="flex-shrink-0 px-3 py-2.5 rounded-xl text-center text-xs font-bold transition-all border"
                style={{
                  borderColor: selectedDate === i ? BLUE : BORDER,
                  backgroundColor: selectedDate === i ? `${BLUE}20` : "transparent",
                  color: selectedDate === i ? "#93C5FD" : "#94A3B8″,
                  minWidth: 72,
                }}
              >
                <p>{slot.label.split(",")[0]}</p>
                <p className="font-normal mt-0.5″>{slot.label.split(",")[1]?.trim()}</p>
              </button>
            ))}
          </div>

          {selectedDate !== null && (
            <div className="space-y-3″>
              <div>
                <p className="text-xs text-slate-500 mb-2″>Morning slots</p>
                <div className="flex flex-wrap gap-2″>
                  {SLOTS[selectedDate].amSlots.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSlot(s)}
                      className="px-3 py-2 rounded-lg text-xs font-semibold border transition-all"
                      style={{
                        borderColor: selectedSlot === s ? BLUE : BORDER,
                        backgroundColor: selectedSlot === s ? `${BLUE}20` : "transparent",
                        color: selectedSlot === s ? "#93C5FD" : "#94A3B8″,
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-2″>Afternoon slots</p>
                <div className="flex flex-wrap gap-2″>
                  {SLOTS[selectedDate].pmSlots.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSlot(s)}
                      className="px-3 py-2 rounded-lg text-xs font-semibold border transition-all"
                      style={{
                        borderColor: selectedSlot === s ? BLUE : BORDER,
                        backgroundColor: selectedSlot === s ? `${BLUE}20` : "transparent",
                        color: selectedSlot === s ? "#93C5FD" : "#94A3B8″,
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              {selectedSlot && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ backgroundColor: `${GREEN}15`, color: GREEN }}>
                  <Clock className="w-3.5 h-3.5″ />
                  Estimated arrival window: {estimatedArrival}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="rounded-2xl border p-5 space-y-3″ style={{ backgroundColor: CARD, borderColor: BORDER }}>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Payment Summary</p>
          <div className="space-y-2″>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400″>{tier.label}</span>
              <span className="text-white font-semibold">${tier.price}.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400″>ProLnk service fee</span>
              <span className="text-slate-400″>$0.00</span>
            </div>
            <div className="border-t pt-2 flex justify-between" style={{ borderColor: BORDER }}>
              <span className="font-bold text-white">Total today</span>
              <span className="font-black text-white text-lg">${tier.price}.00</span>
            </div>
          </div>

          <div
            className="rounded-xl p-3 flex items-center gap-3″
            style={{ backgroundColor: `${BLUE}15`, border: `1px solid ${BLUE}30` }}
          >
            <Shield className="w-5 h-5 flex-shrink-0 text-blue-400″ />
            <div>
              <p className="text-xs font-bold text-blue-300″>ProLnk Protection Guarantee</p>
              <p className="text-xs text-slate-400 mt-0.5″>Full refund if pro doesn't show. Work guaranteed for 30 days.</p>
            </div>
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <div
            onClick={() => setConfirmed(!confirmed)}
            className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-colors cursor-pointer"
            style={{
              backgroundColor: confirmed ? BLUE : "transparent",
              borderColor: confirmed ? BLUE : "#374151″,
            }}
          >
            {confirmed && <CheckCircle className="w-3 h-3 text-white" />}
          </div>
          <span className="text-sm text-slate-400 leading-snug">
            I agree to TrustyPro's terms of service. No payment is charged until the pro confirms.
          </span>
        </label>

        <button
          onClick={handleBook}
          disabled={selectedDate === null || !selectedSlot || !confirmed || loading}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white text-base transition-opacity hover:opacity-90 disabled:opacity-40″
          style={{ backgroundColor: BLUE }}
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Confirming Booking...</>
          ) : (
            <><CreditCard className="w-4 h-4″ /> Book {proName} — ${tier.price}</>
          )}
        </button>

        <div className="flex items-center justify-center gap-4 pb-4″>
          {[
            { icon: Lock, text: "256-bit encrypted" },
            { icon: Shield, text: "ProLnk protected" },
            { icon: BadgeCheck, text: "Verified pro" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-xs text-slate-500″>
              <Icon className="w-3 h-3″ />
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
