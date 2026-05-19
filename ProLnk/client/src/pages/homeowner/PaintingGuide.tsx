import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  CheckCircle, AlertTriangle, XCircle, Paintbrush,
  Sun, DollarSign, TrendingUp, Home, ChevronDown, ChevronUp, Phone,
} from "lucide-react";

const D = {
  bg: "#0D0F14″,
  surface: "#13161E",
  card: "#1A1E2A",
  border: "#252A3A",
  text: "#F0F2FF",
  muted: "#8B91A8″,
  dim: "#555B72″,
  cyan: "#00D4FF",
  green: "#00E676″,
  amber: "#FFB300″,
  red: "#FF4444″,
  teal: "#14B8A6″,
  orange: "#F97316″,
  purple: "#A855F7″,
};

type CheckStatus = "ok" | "warn" | "bad";

interface CheckItem {
  id: string;
  label: string;
  status: CheckStatus;
}

const INTERIOR_CHECKLIST: CheckItem[] = [
  { id: "i1″, label: "Walls cleaned and patched", status: "ok" },
  { id: "i2″, label: "Painter's tape applied", status: "ok" },
  { id: "i3″, label: "Primer used on new drywall", status: "warn" },
  { id: "i4″, label: "Drop cloths protecting floors", status: "ok" },
  { id: "i5″, label: "Two coats applied", status: "ok" },
  { id: "i6″, label: "Touch-up paint saved for future", status: "bad" },
];

const STATUS_META: Record<CheckStatus, { Icon: typeof CheckCircle; color: string; label: string }> = {
  ok:   { Icon: CheckCircle,  color: D.green, label: "Done" },
  warn: { Icon: AlertTriangle, color: D.amber, label: "Attention" },
  bad:  { Icon: XCircle,       color: D.red,   label: "Action Needed" },
};

interface CostRow {
  service: string;
  low: string;
  high: string;
}

const COSTS: CostRow[] = [
  { service: "Interior (per room)",   low: "$200″,    high: "$500" },
  { service: "Exterior full house",   low: "$2,500″,  high: "$7,000" },
  { service: "Fence / deck",          low: "$500″,    high: "$2,000" },
];

interface BrandRow {
  name: string;
  line: string;
  note: string;
}

const BRANDS: BrandRow[] = [
  { name: "Sherwin-Williams Duration", line: "Exterior",           note: "Best heat resistance for DFW summers" },
  { name: "Benjamin Moore Aura",       line: "Exterior / Interior", note: "Self-priming, excellent UV blocking" },
  { name: "Behr Premium Plus Ultra",   line: "Interior",           note: "Great coverage, low VOC" },
];

export default function PaintingGuide() {
  const [checklist, setChecklist] = useState<CheckItem[]>(INTERIOR_CHECKLIST);
  const [expanded, setExpanded] = useState<string | null>(null);

  function cycleStatus(id: string) {
    const order: CheckStatus[] = ["ok", "warn", "bad"];
    setChecklist(prev =>
      prev.map(item => {
        if (item.id !== id) return item;
        const next = order[(order.indexOf(item.status) + 1) % order.length];
        return { ...item, status: next };
      })
    );
  }

  const okCount = checklist.filter(c => c.status === "ok").length;

  return (
    <HomeownerLayout>
      <div style={{ background: D.bg, minHeight: "100vh", color: D.text }} className="p-4 md:p-8 space-y-8″>

        {/* Header */}
        <div className="flex flex-col gap-2″>
          <div className="flex items-center gap-3″>
            <div style={{ background: D.card, border: `1px solid ${D.border}` }} className="w-12 h-12 rounded-xl flex items-center justify-center">
              <Paintbrush size={22} style={{ color: D.cyan }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: D.text }}>Painting Guide</h1>
              <p style={{ color: D.muted }} className="text-sm">Color and protect your home</p>
            </div>
          </div>
          <div style={{ background: D.card, border: `1px solid ${D.amber}22`, borderLeft: `3px solid ${D.amber}` }} className="rounded-xl p-4 mt-2″>
            <div className="flex items-start gap-3″>
              <Sun size={18} style={{ color: D.amber }} className="mt-0.5 shrink-0″ />
              <p className="text-sm" style={{ color: D.muted }}>
                <span style={{ color: D.amber }} className="font-semibold">DFW Tip: </span>
                DFW's intense UV (summer UV index 11+) and temperature extremes require premium exterior paint.
                Interior painting is ideal in spring and fall when humidity is moderate.
              </p>
            </div>
          </div>
        </div>

        {/* Interior Checklist */}
        <section>
          <div className="flex items-center justify-between mb-4″>
            <h2 className="text-lg font-bold" style={{ color: D.text }}>Interior Painting Checklist</h2>
            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: D.card, color: D.green, border: `1px solid ${D.green}44` }}>
              {okCount}/{checklist.length} Complete
            </span>
          </div>
          <div style={{ background: D.card, border: `1px solid ${D.border}` }} className="rounded-2xl p-4 space-y-2″>
            {checklist.map(item => {
              const { Icon, color, label } = STATUS_META[item.status];
              return (
                <button
                  key={item.id}
                  onClick={() => cycleStatus(item.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:opacity-80″
                  style={{ background: D.surface, border: `1px solid ${D.border}` }}
                >
                  <Icon size={18} style={{ color }} />
                  <span className="flex-1 text-sm" style={{ color: D.text }}>{item.label}</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: `${color}18`, color }}>
                    {label}
                  </span>
                </button>
              );
            })}
            <p className="text-xs text-center pt-1″ style={{ color: D.dim }}>Tap any item to cycle its status</p>
          </div>
        </section>

        {/* Exterior Guide */}
        <section>
          <h2 className="text-lg font-bold mb-4″ style={{ color: D.text }}>Exterior Painting Guide</h2>
          <div className="grid gap-3″>

            {/* Best Season */}
            <div style={{ background: D.card, border: `1px solid ${D.border}` }} className="rounded-2xl p-4″>
              <div className="flex items-center gap-2 mb-3″>
                <Sun size={16} style={{ color: D.amber }} />
                <span className="text-sm font-semibold" style={{ color: D.amber }}>Best Season</span>
              </div>
              <p className="text-sm" style={{ color: D.muted }}>
                October – April is ideal for exterior painting in DFW. Avoid summer heat above 90°F — paint dries too fast and won't bond properly.
              </p>
            </div>

            {/* Paint Type */}
            <div style={{ background: D.card, border: `1px solid ${D.border}` }} className="rounded-2xl p-4″>
              <div className="flex items-center gap-2 mb-3″>
                <Paintbrush size={16} style={{ color: D.cyan }} />
                <span className="text-sm font-semibold" style={{ color: D.cyan }}>Paint Type</span>
              </div>
              <p className="text-sm" style={{ color: D.muted }}>
                <span style={{ color: D.text }}>100% acrylic latex</span> is best for the Texas climate — flexible, UV-resistant, and handles DFW's temperature swings from 20°F to 110°F.
              </p>
            </div>

            {/* Warning Banner */}
            <div style={{ background: `${D.red}12`, border: `1px solid ${D.red}33` }} className="rounded-2xl p-4 flex items-start gap-3″>
              <AlertTriangle size={18} style={{ color: D.red }} className="shrink-0 mt-0.5″ />
              <p className="text-sm" style={{ color: D.muted }}>
                <span style={{ color: D.red }} className="font-semibold">DFW Warning: </span>
                Never paint in direct sun above 90°F — paint dries too fast and won't bond. Always paint in shade or on cooler days.
              </p>
            </div>

            {/* Brand Recommendations */}
            <div style={{ background: D.card, border: `1px solid ${D.border}` }} className="rounded-2xl p-4″>
              <h3 className="text-sm font-semibold mb-3″ style={{ color: D.text }}>Recommended Brands</h3>
              <div className="space-y-2″>
                {BRANDS.map(b => (
                  <div key={b.name} className="flex items-start justify-between gap-3 p-3 rounded-xl" style={{ background: D.surface }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: D.text }}>{b.name}</p>
                      <p className="text-xs mt-0.5″ style={{ color: D.dim }}>{b.note}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full shrink-0″ style={{ background: D.card, color: D.cyan, border: `1px solid ${D.cyan}22` }}>
                      {b.line}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cost Guide */}
        <section>
          <h2 className="text-lg font-bold mb-4″ style={{ color: D.text }}>DFW Cost Guide</h2>
          <div style={{ background: D.card, border: `1px solid ${D.border}` }} className="rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 px-4 py-2″ style={{ background: D.surface, borderBottom: `1px solid ${D.border}` }}>
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: D.dim }}>Service</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-center" style={{ color: D.dim }}>Low</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-right" style={{ color: D.dim }}>High</span>
            </div>
            {COSTS.map((row, i) => (
              <div
                key={row.service}
                className="grid grid-cols-3 px-4 py-3 items-center"
                style={{ borderBottom: i < COSTS.length - 1 ? `1px solid ${D.border}` : "none" }}
              >
                <span className="text-sm" style={{ color: D.text }}>{row.service}</span>
                <span className="text-sm font-bold text-center" style={{ color: D.green }}>{row.low}</span>
                <span className="text-sm font-bold text-right" style={{ color: D.cyan }}>{row.high}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Color Value Impact */}
        <section>
          <div style={{ background: D.card, border: `1px solid ${D.purple}33` }} className="rounded-2xl p-4″>
            <div className="flex items-center gap-2 mb-2″>
              <TrendingUp size={16} style={{ color: D.purple }} />
              <h2 className="text-sm font-bold" style={{ color: D.purple }}>Color & Resale Value</h2>
            </div>
            <p className="text-sm" style={{ color: D.muted }}>
              Neutral gray exteriors sell <span style={{ color: D.green }} className="font-semibold">6% faster</span> in DFW.
              Stick with warm whites, greiges, and light grays for maximum resale appeal.
              Avoid trendy or bold colors — what's popular today may hurt resale in 3–5 years.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 pt-4 pb-8″>
          <button
            className="w-full max-w-xs flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90″
            style={{ background: D.cyan, color: "#000″ }}
          >
            <Phone size={16} />
            Find a Painter
          </button>
          <p className="text-xs" style={{ color: D.dim }}>Matched to vetted DFW painting pros</p>
        </div>

      </div>
    </HomeownerLayout>
  );
}
