import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { CheckCircle, Circle, TrendingUp, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface CheckItem {
  id: string;
  label: string;
  note?: string;
}

interface Phase {
  id: string;
  label: string;
  tag: string;
  color: string;
  items: CheckItem[];
}

const PHASES: Phase[] = [
  {
    id: "critical",
    label: "Phase 1 — Critical",
    tag: "Must-Do",
    color: "#ef4444″,
    items: [
      { id: "c1″, label: "Foundation inspection", note: "Required by most buyers' lenders in DFW" },
      { id: "c2″, label: "Roof inspection / certificate", note: "Hail-prone DFW market — buyers will ask for it" },
      { id: "c3″, label: "HVAC service record", note: "Buyers deduct $6–10K for unknown HVAC age" },
      { id: "c4″, label: "Electrical panel inspection", note: "Federal Pacific / Zinsco panels are deal-killers" },
      { id: "c5″, label: "Plumbing leak check", note: "Slab leaks common in DFW clay soil" },
    ],
  },
  {
    id: "roi",
    label: "Phase 2 — High ROI",
    tag: "Best Return",
    color: "#22c55e",
    items: [
      { id: "r1″, label: "Fresh neutral paint (interior)", note: "Greige or warm white — avoid bold accent walls" },
      { id: "r2″, label: "Landscaping cleanup", note: "First impression sets buyer expectations" },
      { id: "r3″, label: "Power wash exterior", note: "Driveways, walkways, fencing — $200–400 job" },
      { id: "r4″, label: "Deep clean entire home", note: "Includes windows, baseboards, and appliances" },
      { id: "r5″, label: "Fix all visible cracks / damage", note: "Buyers mentally triple repair estimates" },
    ],
  },
  {
    id: "trust",
    label: "Phase 3 — Buyer Trust",
    tag: "Confidence Builders",
    color: "#3b82f6″,
    items: [
      { id: "t1″, label: "Pre-listing inspection report", note: "Proactive disclosure = fewer re-negotiations" },
      { id: "t2″, label: "Repair receipts organized", note: "Proves work was done professionally" },
      { id: "t3″, label: "Warranty docs compiled", note: "Appliances, roof, HVAC — transferable is a selling point" },
      { id: "t4″, label: "HOA docs ready", note: "DFW buyers want rules, fees, and financials up front" },
    ],
  },
  {
    id: "final",
    label: "Phase 4 — Final Touches",
    tag: "Go-Live",
    color: "#a855f7″,
    items: [
      { id: "f1″, label: "Professional photos scheduled", note: "Listings with pro photos sell 32% faster in DFW" },
      { id: "f2″, label: "Home staged", note: "Even partial staging adds perceived value" },
      { id: "f3″, label: "Utility costs documented", note: "DFW buyers ask — have last 12 months ready" },
      { id: "f4″, label: "Neighborhood comps researched", note: "Know your price anchor before listing" },
    ],
  },
];

export default function HomeSellingChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  const totalItems = PHASES.reduce((s, p) => s + p.items.length, 0);
  const doneCount = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((doneCount / totalItems) * 100);

  return (
    <HomeownerLayout>
      <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#e5e7eb", fontFamily: "sans-serif" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 20px 72px" }}>

          <div style={{ marginBottom: 36 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 20, padding: "5px 14px", fontSize: 12, color: "#22c55e",
              fontWeight: 600, marginBottom: 16,
            }}>
              <TrendingUp size={12} /> DFW Pre-Sale Guide
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: "#fff", margin: "0 0 14px", lineHeight: 1.2 }}>
              Sell Faster, Sell Higher — Your Pre-Listing Home Prep Checklist
            </h1>
            <div style={{
              background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: 12, padding: "14px 18px", marginBottom: 8,
            }}>
              <p style={{ color: "#86efac", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                <strong>DFW data point:</strong> Homes that are move-in ready sell 23 days faster and for $14,000 more on average than homes with deferred maintenance. This checklist is built for DFW market conditions.
              </p>
            </div>
          </div>

          <div style={{ background: "#141c2e", borderRadius: 14, border: "1px solid #1e2c45″, padding: "18px 22px", marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ color: "#9ca3af", fontSize: 13, fontWeight: 600 }}>Your progress</span>
              <span style={{ color: "#22c55e", fontSize: 14, fontWeight: 800 }}>{doneCount}/{totalItems} complete ({pct}%)</span>
            </div>
            <div style={{ background: "#1e2c45″, borderRadius: 8, height: 8 }}>
              <div style={{ background: "#22c55e", borderRadius: 8, height: 8, width: `${pct}%`, transition: "width 0.3s" }} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 40 }}>
            {PHASES.map(phase => {
              const phaseDone = phase.items.filter(i => checked[i.id]).length;
              return (
                <div key={phase.id} style={{ background: "#141c2e", borderRadius: 16, border: `1px solid ${phase.color}30`, overflow: "hidden" }}>
                  <div style={{
                    padding: "16px 22px", borderBottom: `1px solid ${phase.color}20`,
                    display: "flex", alignItems: "center", gap: 12,
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{phase.label}</div>
                      <div style={{ fontSize: 12, color: "#6b7280″, marginTop: 2 }}>{phaseDone}/{phase.items.length} complete</div>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: phase.color,
                      background: `${phase.color}18`, borderRadius: 6, padding: "3px 10px",
                    }}>
                      {phase.tag}
                    </span>
                  </div>
                  <div style={{ padding: "14px 22px 18px" }}>
                    {phase.items.map(item => (
                      <button
                        key={item.id}
                        onClick={() => toggle(item.id)}
                        style={{
                          display: "flex", alignItems: "flex-start", gap: 12, width: "100%",
                          background: "transparent", border: "none", cursor: "pointer",
                          textAlign: "left", padding: "10px 0″,
                          borderBottom: "1px solid #1e2c45″,
                        }}
                      >
                        {checked[item.id]
                          ? <CheckCircle size={20} color="#22c55e" style={{ flexShrink: 0, marginTop: 1 }} />
                          : <Circle size={20} color="#374151″ style={{ flexShrink: 0, marginTop: 1 }} />}
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: checked[item.id] ? "#6b7280″ : "#e5e7eb", textDecoration: checked[item.id] ? "line-through" : "none" }}>
                            {item.label}
                          </div>
                          {item.note && (
                            <div style={{ fontSize: 12, color: "#4b5563″, marginTop: 3 }}>{item.note}</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ background: "#141c2e", borderRadius: 16, border: "1px solid rgba(245,158,11,0.3)", padding: "24px 28px", marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <DollarSign size={18} color="#f59e0b" />
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#fff" }}>The ROI Math</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 14, marginBottom: 20 }}>
              {[
                { label: "Interior paint", cost: "$1,800″ },
                { label: "Landscaping", cost: "$1,200″ },
                { label: "Pre-listing inspection", cost: "$350″ },
              ].map(item => (
                <div key={item.label} style={{ background: "#0A1628″, borderRadius: 10, padding: "12px 16px", border: "1px solid #1e2c45" }}>
                  <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#f59e0b" }}>{item.cost}</div>
                </div>
              ))}
            </div>
            <div style={{
              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 12, padding: "16px 20px",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ color: "#6b7280″, fontSize: 12, marginBottom: 4 }}>Total investment</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#f59e0b" }}>$3,350</div>
                </div>
                <div style={{ color: "#4b5563″, fontSize: 20, fontWeight: 700 }}>to</div>
                <div>
                  <div style={{ color: "#6b7280″, fontSize: 12, marginBottom: 4 }}>Avg higher sale price</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#22c55e" }}>$14,000</div>
                </div>
                <div style={{ color: "#4b5563″, fontSize: 20, fontWeight: 700 }}>=</div>
                <div>
                  <div style={{ color: "#6b7280″, fontSize: 12, marginBottom: 4 }}>Return on investment</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#22c55e" }}>4.2x ROI</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 18 }}>
              Ready to tackle your checklist? Get quotes from vetted DFW pros instantly.
            </p>
            <Link href="/homeowner-signup">
              <button style={{
                background: "#14b8a6″, color: "#fff", border: "none",
                borderRadius: 10, padding: "14px 32px", fontSize: 15,
                fontWeight: 700, cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 8,
              }}>
                Find Pre-Sale Pros <ArrowRight size={16} />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
