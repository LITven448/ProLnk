import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, AlertTriangle, XCircle, Thermometer,
  DollarSign, Droplets, Shield, Wrench, Clock, Layers,
} from "lucide-react";

interface CheckItem {
  id: string;
  label: string;
  defaultStatus: "ok" | "warn" | "bad";
}

interface RepairCard {
  condition: string;
  scope: string;
  cost: string;
  type: "diy" | "pro";
  color: string;
  detail: string;
}

const CHECKLIST: CheckItem[] = [
  { id: "1", label: "No major cracks (>1/4\" wide)", defaultStatus: "ok" },
  { id: "2", label: "Surface not spalling or flaking", defaultStatus: "ok" },
  { id: "3", label: "No tree root lifting", defaultStatus: "warn" },
  { id: "4", label: "Seal coat applied within 5 years", defaultStatus: "bad" },
  { id: "5", label: "Joints intact and sealed", defaultStatus: "warn" },
  { id: "6", label: "Proper drainage slope away from house", defaultStatus: "ok" },
];

const REPAIR_CARDS: RepairCard[] = [
  {
    condition: "Hairline Cracks",
    scope: "< 1/8\" wide, surface-level only",
    cost: "$20–50",
    type: "diy",
    color: "#16A34A",
    detail: "Fill with concrete crack filler or caulk rated for outdoor use. Best done in fall when temps are 50–80°F. Clean crack thoroughly, apply filler, tool flush, let cure 24h.",
  },
  {
    condition: "Moderate Cracks",
    scope: "1/8\"–1/2\" wide, some depth",
    cost: "$200–600",
    type: "pro",
    color: "#D97706",
    detail: "Requires grinding out loose edges, applying hydraulic cement or epoxy injection, and surface sealing. DIY is possible but proper prep is critical — improper repair leads to faster re-cracking.",
  },
  {
    condition: "Surface Spalling",
    scope: "Flaking, pitting, or scaling over large area",
    cost: "$500–2,000",
    type: "pro",
    color: "#DC2626",
    detail: "Caused by freeze-thaw cycles and deicing salts. Thin overlays ($3–5/sqft) can resurface without full replacement. Must address cause (drainage, salt use) or spalling recurs.",
  },
  {
    condition: "Full Replacement",
    scope: "Heaved sections, structural cracks, total failure",
    cost: "$3,000–8,000",
    type: "pro",
    color: "#7C3AED",
    detail: "Demo + haul ($800–1,500), base prep, 4\" reinforced concrete pour. For 1,000 sqft driveway. Get 3 quotes — prices vary 40%+ in DFW. Consider fiber reinforcement for Texas conditions.",
  },
];

const SEAL_TIPS = [
  { icon: Clock, label: "How often", value: "Every 3–5 years in Texas climate" },
  { icon: Thermometer, label: "Best timing", value: "Fall (Oct–Nov) — avoid summer heat above 90°F" },
  { icon: Droplets, label: "Top products", value: "Siloxa-Tek 8500 (penetrating), Armor AR350 (film-forming)" },
  { icon: Layers, label: "DIY vs pro", value: "DIY: $60–120 materials. Pro: $300–800 for 1,000 sqft" },
];

const STATUS_CONFIG = {
  ok: { color: "#16A34A", label: "OK", Icon: CheckCircle },
  warn: { color: "#D97706", label: "Review", Icon: AlertTriangle },
  bad: { color: "#DC2626", label: "Action needed", Icon: XCircle },
};

export default function ConcreteGuide() {
  const [checked, setChecked] = useState<Set<string>>(new Set(["1", "2", "6"]));

  function toggleCheck(id: string) {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const okCount = CHECKLIST.filter(i => checked.has(i.id)).length;
  const score = Math.round((okCount / CHECKLIST.length) * 100);

  return (
    <HomeownerLayout>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px 48px" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "linear-gradient(135deg, #78350F, #D97706)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Layers size={22} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#F8FAFC", margin: 0 }}>
                Concrete & Driveway Guide
              </h1>
              <p style={{ fontSize: 14, color: "#94A3B8", margin: 0 }}>
                Protect your investment from Texas heat and freeze
              </p>
            </div>
          </div>
        </div>

        {/* Your Driveway Card */}
        <div style={{
          background: "linear-gradient(135deg, #1C1917, #292524)",
          border: "1px solid #44403C",
          borderRadius: 16, padding: "20px 24px", marginBottom: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <Shield size={18} color="#F59E0B" />
            <span style={{ fontSize: 15, fontWeight: 700, color: "#FEF3C7" }}>Your Driveway</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
            {[
              ["Material", "Concrete"],
              ["Installed", "2016 (9 years)"],
              ["Seal recommended", "Every 3–5 years"],
              ["Last sealed", "Unknown"],
            ].map(([label, value]) => (
              <div key={label}>
                <span style={{ fontSize: 12, color: "#78716C" }}>{label}</span>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#E7E5E4" }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 14, padding: "10px 14px",
            background: "rgba(234, 179, 8, 0.12)", borderRadius: 10,
            border: "1px solid rgba(234, 179, 8, 0.25)",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <AlertTriangle size={15} color="#FBBF24" />
            <span style={{ fontSize: 13, color: "#FCD34D" }}>
              Seal coat overdue — last seal date unknown, recommend inspection this fall.
            </span>
          </div>
        </div>

        {/* DFW Context Banner */}
        <div style={{
          background: "linear-gradient(135deg, #1E1B4B, #1D4ED8)",
          borderRadius: 16, padding: "20px 24px", marginBottom: 20,
          border: "1px solid #3730A3",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <Thermometer size={18} color="#A5B4FC" />
            <span style={{ fontSize: 15, fontWeight: 700, color: "#EEF2FF" }}>DFW Climate Impact</span>
          </div>
          <p style={{ fontSize: 14, color: "#C7D2FE", margin: "0 0 12px", lineHeight: 1.65 }}>
            DFW temperature swings <strong style={{ color: "#fff" }}>120°F (from -5°F to 110°F+)</strong> cause
            concrete to expand and contract more than almost anywhere in the US. Sealing every 3–5 years is critical
            to prevent moisture infiltration during freeze cycles.
          </p>
          <div style={{
            background: "rgba(255,255,255,0.08)", borderRadius: 10,
            padding: "12px 16px", border: "1px solid rgba(255,255,255,0.12)",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px",
          }}>
            {[
              ["Summer peak", "108°F+"],
              ["Winter low", "-5°F (rare)"],
              ["Freeze cycles/year", "5–15"],
              ["Deicing salt risk", "High"],
            ].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontSize: 11, color: "#818CF8" }}>{l}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#E0E7FF" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Condition Checklist */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9", margin: 0 }}>
              Condition checklist
            </h2>
            <div style={{
              fontSize: 13, fontWeight: 700, color: score >= 80 ? "#34D399" : score >= 50 ? "#FBBF24" : "#F87171",
              background: "rgba(0,0,0,0.3)", padding: "3px 12px", borderRadius: 20,
            }}>
              {okCount}/{CHECKLIST.length} OK
            </div>
          </div>
          <Card style={{ background: "#1E293B", border: "1px solid #334155" }}>
            <CardContent style={{ padding: "8px 0" }}>
              {CHECKLIST.map((item, i) => {
                const done = checked.has(item.id);
                const cfg = STATUS_CONFIG[item.defaultStatus];
                const CfgIcon = cfg.Icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "13px 20px", cursor: "pointer",
                      borderBottom: i < CHECKLIST.length - 1 ? "1px solid #293548" : "none",
                      background: done ? "rgba(20, 83, 45, 0.2)" : "transparent",
                      transition: "background 0.2s",
                    }}
                  >
                    <div style={{
                      minWidth: 22, height: 22, borderRadius: 6,
                      border: done ? "none" : "2px solid #475569",
                      background: done ? "#16A34A" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {done && <CheckCircle size={14} color="#fff" />}
                    </div>
                    <span style={{
                      flex: 1, fontSize: 14,
                      color: done ? "#86EFAC" : "#CBD5E1",
                      textDecoration: done ? "line-through" : "none",
                      lineHeight: 1.5,
                    }}>
                      {item.label}
                    </span>
                    {!done && (
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <CfgIcon size={14} color={cfg.color} />
                        <span style={{
                          fontSize: 11, fontWeight: 700, color: cfg.color,
                          whiteSpace: "nowrap",
                        }}>
                          {cfg.label}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Repair Guide */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9", marginBottom: 12 }}>
            Repair guide
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {REPAIR_CARDS.map(card => (
              <Card key={card.condition} style={{
                background: "#1E293B", border: "1px solid #334155", overflow: "hidden",
              }}>
                <div style={{
                  height: 4,
                  background: `linear-gradient(90deg, ${card.color}, transparent)`,
                }} />
                <CardContent style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#F1F5F9" }}>{card.condition}</div>
                      <div style={{ fontSize: 12, color: "#64748B" }}>{card.scope}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                      <span style={{
                        fontSize: 14, fontWeight: 700, color: "#34D399",
                        background: "rgba(52,211,153,0.1)", padding: "2px 10px",
                        borderRadius: 20,
                      }}>
                        {card.cost}
                      </span>
                      <span style={{
                        fontSize: 11, fontWeight: 700,
                        color: card.type === "diy" ? "#86EFAC" : "#93C5FD",
                        background: card.type === "diy" ? "rgba(134,239,172,0.1)" : "rgba(147,197,253,0.1)",
                        padding: "2px 8px", borderRadius: 20,
                      }}>
                        {card.type === "diy" ? "DIY" : "Pro"}
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "#94A3B8", margin: 0, lineHeight: 1.6 }}>
                    {card.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Seal Coat Guide */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9", marginBottom: 12 }}>
            Seal coat guide
          </h2>
          <Card style={{ background: "#1E293B", border: "1px solid #334155" }}>
            <CardContent style={{ padding: "8px 0" }}>
              {SEAL_TIPS.map((tip, i) => {
                const TipIcon = tip.icon;
                return (
                  <div key={tip.label} style={{
                    display: "flex", alignItems: "flex-start", gap: 14,
                    padding: "14px 20px",
                    borderBottom: i < SEAL_TIPS.length - 1 ? "1px solid #293548" : "none",
                  }}>
                    <div style={{
                      minWidth: 34, height: 34, borderRadius: 10,
                      background: "rgba(234, 179, 8, 0.12)",
                      border: "1px solid rgba(234, 179, 8, 0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <TipIcon size={16} color="#F59E0B" />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: "#64748B", marginBottom: 2 }}>{tip.label}</div>
                      <div style={{ fontSize: 14, color: "#CBD5E1", lineHeight: 1.5 }}>{tip.value}</div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div style={{
          background: "linear-gradient(135deg, #1C1917, #292524)",
          border: "1px solid #44403C", borderRadius: 16,
          padding: "24px", textAlign: "center",
        }}>
          <Wrench size={28} color="#F59E0B" style={{ marginBottom: 10 }} />
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#FEF3C7", margin: "0 0 8px" }}>
            Ready to get your concrete in shape?
          </h3>
          <p style={{ fontSize: 14, color: "#A8A29E", margin: "0 0 20px" }}>
            Connect with vetted concrete professionals in DFW — seal coat, crack repair, or full replacement.
          </p>
          <Button style={{
            background: "linear-gradient(135deg, #D97706, #F59E0B)",
            color: "#fff", fontWeight: 700, padding: "12px 32px",
            borderRadius: 10, fontSize: 15, border: "none",
          }}>
            Get Concrete Quotes
          </Button>
        </div>

      </div>
    </HomeownerLayout>
  );
}
