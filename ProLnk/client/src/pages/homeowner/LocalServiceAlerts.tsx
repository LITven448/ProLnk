import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Bell, Cloud, Zap, Tag, Calendar, CheckCircle, XCircle, Bookmark, Users, ChevronRight, Moon, Shield, DollarSign } from "lucide-react";

const T = {
  bg:      "#0A0C10",
  card:    "#12151C",
  border:  "#1E2330",
  text:    "#F0F4FF",
  muted:   "#7B82A0",
  dim:     "#3A3F52",
  cyan:    "#00CFFF",
  green:   "#00E676",
  amber:   "#FFB300",
  red:     "#FF4444",
  blue:    "#3B82F6",
  purple:  "#A855F7",
};

interface AlertSub {
  id: string;
  icon: string;
  label: string;
  desc: string;
  freq: "Instant" | "Daily" | "Weekly";
  color: string;
  on: boolean;
}

const INITIAL_SUBS: AlertSub[] = [
  { id: "storm",     icon: "🌩️", label: "Storm Alerts",               desc: "Get notified after hail events near your ZIP",              freq: "Instant", color: T.amber,  on: true },
  { id: "emergency", icon: "🔥", label: "Emergency Pro Availability", desc: "When 24/7 pros become available nearby",                    freq: "Instant", color: T.red,    on: true },
  { id: "deals",     icon: "💰", label: "Neighborhood Deals",         desc: "Group discounts when 5+ neighbors book same service",       freq: "Daily",   color: T.green,  on: true },
  { id: "seasonal",  icon: "📅", label: "Seasonal Reminders",         desc: "DFW-specific maintenance reminders",                        freq: "Weekly",  color: T.blue,   on: true },
];

const RECENT_ALERTS = [
  { type: "storm",     icon: "🌩️", msg: "Hail event detected within 2 miles — 3 roofing pros available now",         date: "May 13, 2:14 PM", action: "Booked",  color: T.amber  },
  { type: "deal",      icon: "💰", msg: "HVAC group deal launched — 8 neighbors joined, $89 tune-up (was $149)",      date: "May 11, 9:00 AM", action: "Saved",   color: T.green  },
  { type: "seasonal",  icon: "📅", msg: "Reminder: Pre-summer AC check — DFW averages 95°F in June",                 date: "May 10, 8:00 AM", action: "Ignored", color: T.blue   },
  { type: "emergency", icon: "🔥", msg: "24/7 plumber available in ZIP 75034 — emergency callout $149 flat",         date: "May 9, 11:45 PM", action: "Ignored", color: T.red    },
  { type: "deal",      icon: "💰", msg: "Pest control group buy — 6 of 10 neighbors joined, closes Friday",         date: "May 8, 3:00 PM",  action: "Saved",   color: T.green  },
];

const GROUP_DEALS = [
  { service: "HVAC Pre-season tune-up", joined: 8, needed: 10, price: 89, was: 149, color: T.amber, deadline: "Closes May 17" },
  { service: "Window cleaning (exterior)", joined: 4, needed: 10, price: 59, was: 99, color: T.cyan,  deadline: "Closes May 20" },
];

function FreqBadge({ freq }: { freq: string }) {
  const color = freq === "Instant" ? T.red : freq === "Daily" ? T.amber : T.blue;
  return (
    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${color}20`, color }}>
      {freq}
    </span>
  );
}

function ActionBadge({ action }: { action: string }) {
  const color = action === "Booked" ? T.green : action === "Saved" ? T.blue : T.dim;
  const Icon = action === "Booked" ? CheckCircle : action === "Saved" ? Bookmark : XCircle;
  return (
    <span className="flex items-center gap-1 text-xs font-semibold" style={{ color }}>
      <Icon className="w-3 h-3" /> {action}
    </span>
  );
}

export default function LocalServiceAlerts() {
  const [subs, setSubs] = useState<AlertSub[]>(INITIAL_SUBS);
  const [quietHours, setQuietHours] = useState(true);
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [maxPrice, setMaxPrice] = useState(150);

  function toggleSub(id: string) {
    setSubs((prev) => prev.map((s) => s.id === id ? { ...s, on: !s.on } : s));
  }

  function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
    return (
      <button
        onClick={onChange}
        className="relative w-10 h-5 rounded-full transition-all"
        style={{ backgroundColor: on ? T.cyan : T.dim }}
      >
        <span
          className="absolute top-0.5 w-4 h-4 rounded-full transition-all"
          style={{ left: on ? "calc(100% - 18px)" : "2px", backgroundColor: "#FFF" }}
        />
      </button>
    );
  }

  return (
    <HomeownerLayout>
      <div className="min-h-screen p-6 space-y-6" style={{ backgroundColor: T.bg, fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${T.cyan}20, ${T.cyan}40)`, border: `1px solid ${T.cyan}40` }}>
                <Bell className="w-5 h-5" style={{ color: T.cyan }} />
              </div>
              <h1 className="text-2xl font-black" style={{ color: T.text }}>Local Service Alerts</h1>
            </div>
            <p className="text-sm" style={{ color: T.muted }}>Never miss deals or warnings in your area</p>
          </div>
          <div className="text-right text-xs" style={{ color: T.muted }}>
            <div className="flex items-center gap-2 justify-end">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: T.green }} />
              <span>ZIP 75034 — Frisco TX</span>
            </div>
            <p className="mt-1 font-semibold" style={{ color: T.cyan }}>847 homeowners subscribed</p>
          </div>
        </div>

        {/* Active Subscriptions */}
        <div className="rounded-2xl p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold" style={{ color: T.text }}>Active Subscriptions</h2>
              <p className="text-xs mt-0.5" style={{ color: T.muted }}>Toggle alerts by category</p>
            </div>
            <span className="text-sm font-bold" style={{ color: T.green }}>
              {subs.filter((s) => s.on).length} of {subs.length} active
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {subs.map((sub) => (
              <div
                key={sub.id}
                className="rounded-xl p-4 transition-all"
                style={{
                  background: sub.on ? `linear-gradient(135deg, ${sub.color}08, ${sub.color}18)` : T.bg,
                  border: `1px solid ${sub.on ? sub.color + "40" : T.border}`,
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{sub.icon}</span>
                    <div>
                      <p className="font-bold text-sm" style={{ color: sub.on ? T.text : T.muted }}>{sub.label}</p>
                      <FreqBadge freq={sub.freq} />
                    </div>
                  </div>
                  <Toggle on={sub.on} onChange={() => toggleSub(sub.id)} />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: T.muted }}>{sub.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Group Deals in Progress */}
        <div className="rounded-2xl p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold" style={{ color: T.text }}>Group Deals in Progress</h2>
              <p className="text-xs mt-0.5" style={{ color: T.muted }}>Join neighbors for group pricing</p>
            </div>
            <Users className="w-4 h-4" style={{ color: T.cyan }} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {GROUP_DEALS.map((deal) => {
              const pct = Math.round((deal.joined / deal.needed) * 100);
              return (
                <div key={deal.service} className="rounded-xl p-4" style={{ background: `linear-gradient(135deg, ${deal.color}08, ${deal.color}18)`, border: `1px solid ${deal.color}30` }}>
                  <p className="font-bold text-sm mb-1" style={{ color: T.text }}>{deal.service}</p>
                  <p className="text-xs mb-3" style={{ color: T.muted }}>{deal.deadline}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: T.border }}>
                      <div className="h-2 rounded-full" style={{ width: `${pct}%`, backgroundColor: deal.color }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: deal.color }}>{deal.joined}/{deal.needed}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black" style={{ color: deal.color }}>${deal.price}</span>
                      <span className="text-xs line-through" style={{ color: T.dim }}>${deal.was}</span>
                    </div>
                    <button
                      className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all hover:opacity-90"
                      style={{ backgroundColor: deal.color, color: "#000" }}
                    >
                      Join Group <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Alerts + Preferences side by side */}
        <div className="grid grid-cols-2 gap-6">
          {/* Recent Alerts */}
          <div className="rounded-2xl p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold" style={{ color: T.text }}>Recent Alerts</h2>
              <Bell className="w-4 h-4" style={{ color: T.muted }} />
            </div>
            <div className="space-y-3">
              {RECENT_ALERTS.map((a, i) => (
                <div key={i} className="flex items-start gap-3 pb-3" style={{ borderBottom: i < RECENT_ALERTS.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-sm" style={{ background: `${a.color}20` }}>
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-relaxed" style={{ color: T.text }}>{a.msg}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs" style={{ color: T.dim }}>{a.date}</span>
                      <ActionBadge action={a.action} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="rounded-2xl p-5" style={{ background: T.card, border: `1px solid ${T.border}` }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold" style={{ color: T.text }}>Alert Preferences</h2>
              <Shield className="w-4 h-4" style={{ color: T.muted }} />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3" style={{ borderBottom: `1px solid ${T.border}` }}>
                <div className="flex items-center gap-3">
                  <Moon className="w-4 h-4" style={{ color: T.purple }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: T.text }}>Quiet Hours</p>
                    <p className="text-xs" style={{ color: T.muted }}>8 PM – 8 AM, no alerts</p>
                  </div>
                </div>
                <button
                  onClick={() => setQuietHours(!quietHours)}
                  className="relative w-10 h-5 rounded-full transition-all"
                  style={{ backgroundColor: quietHours ? T.purple : T.dim }}
                >
                  <span className="absolute top-0.5 w-4 h-4 rounded-full transition-all" style={{ left: quietHours ? "calc(100% - 18px)" : "2px", backgroundColor: "#FFF" }} />
                </button>
              </div>
              <div className="flex items-center justify-between py-3" style={{ borderBottom: `1px solid ${T.border}` }}>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4" style={{ color: T.green }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: T.text }}>Verified Pros Only</p>
                    <p className="text-xs" style={{ color: T.muted }}>Only show alerts from verified partners</p>
                  </div>
                </div>
                <button
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                  className="relative w-10 h-5 rounded-full transition-all"
                  style={{ backgroundColor: verifiedOnly ? T.green : T.dim }}
                >
                  <span className="absolute top-0.5 w-4 h-4 rounded-full transition-all" style={{ left: verifiedOnly ? "calc(100% - 18px)" : "2px", backgroundColor: "#FFF" }} />
                </button>
              </div>
              <div className="py-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4" style={{ color: T.amber }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: T.text }}>Max Deal Price Alert</p>
                      <p className="text-xs" style={{ color: T.muted }}>Only alert deals under this amount</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold" style={{ color: T.amber }}>${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={25}
                  max={500}
                  step={25}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full cursor-pointer accent-amber-400"
                  style={{ accentColor: T.amber }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: T.dim }}>
                  <span>$25</span>
                  <span>$500</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </HomeownerLayout>
  );
}
