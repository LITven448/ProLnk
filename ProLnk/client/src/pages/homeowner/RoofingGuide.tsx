import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home, CheckCircle, AlertTriangle, ChevronDown, ChevronUp,
  CloudRain, Shield, DollarSign, Camera, FileText, Phone, Wrench,
  Clock, Star,
} from "lucide-react";

interface CheckItem {
  id: string;
  label: string;
  status: "ok" | "warn" | "pending";
}

interface InsuranceTip {
  icon: typeof Camera;
  title: string;
  detail: string;
}

interface CostRow {
  service: string;
  low: string;
  high: string;
}

const CHECKLIST: CheckItem[] = [
  { id: "1″, label: "Visible from ground: Missing or curled shingles", status: "ok" },
  { id: "2″, label: "Gutters: Granule accumulation after rain", status: "warn" },
  { id: "3″, label: "Metal flashing: No gaps or rust around chimney and vents", status: "ok" },
  { id: "4″, label: "Chimney: Flashing intact, no gaps at base", status: "ok" },
  { id: "5″, label: "Attic: No daylight visible through decking", status: "ok" },
  { id: "6″, label: "Interior: No water stains or rings on ceiling", status: "ok" },
];

const INSURANCE_TIPS: InsuranceTip[] = [
  {
    icon: Camera,
    title: "Document everything before cleanup",
    detail: "Take photos and video of all damage — shingles, gutters, vents, and interior stains. Timestamps matter for claim timing.",
  },
  {
    icon: Phone,
    title: "Call your insurance within 24 hours",
    detail: "Most policies require prompt notice. Delays can give the carrier grounds to reduce or deny your claim.",
  },
  {
    icon: AlertTriangle,
    title: "Don't let roofers 'waive your deductible'",
    detail: "Deductible waiving is insurance fraud in Texas. Any roofer offering this is violating state law — walk away.",
  },
  {
    icon: FileText,
    title: "Get 3 estimates before accepting settlement",
    detail: "Insurance adjusters often underestimate replacement costs. Independent roofer estimates give you negotiating leverage.",
  },
];

const COSTS: CostRow[] = [
  { service: "Professional inspection", low: "$150″, high: "$350" },
  { service: "Minor repair (flashing, few shingles)", low: "$300″, high: "$1,500" },
  { service: "Full replacement (2,400 sqft home)", low: "$8,000″, high: "$18,000" },
  { service: "Insurance deductible (typical DFW)", low: "$1,000″, high: "$3,000" },
];

const STATUS_CONFIG = {
  ok: { color: "#16A34A", bg: "#DCFCE7″, label: "OK", Icon: CheckCircle },
  warn: { color: "#D97706″, bg: "#FEF3C7", label: "Review", Icon: AlertTriangle },
  pending: { color: "#6366F1″, bg: "#EEF2FF", label: "Pending", Icon: Clock },
};

export default function RoofingGuide() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set(["1″, "3", "4", "5", "6"]));

  function toggleExpand(id: string) {
    setExpanded(prev => prev === id ? null : id);
  }

  function toggleCheck(id: string) {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <HomeownerLayout>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px 48px" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "linear-gradient(135deg, #0F766E, #0D9488)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Home size={22} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#F8FAFC", margin: 0 }}>Roofing Guide</h1>
              <p style={{ fontSize: 14, color: "#94A3B8″, margin: 0 }}>Protect your home from Texas weather</p>
            </div>
          </div>
        </div>

        {/* DFW Context Banner */}
        <div style={{
          background: "linear-gradient(135deg, #1E3A5F, #1D4ED8)",
          borderRadius: 16, padding: "20px 24px", marginBottom: 20,
          border: "1px solid #2563EB",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <CloudRain size={20} color="#93C5FD" />
            <span style={{ fontSize: 16, fontWeight: 700, color: "#EFF6FF" }}>DFW Roofing Reality</span>
          </div>
          <p style={{ fontSize: 14, color: "#BFDBFE", margin: "0 0 12px", lineHeight: 1.6 }}>
            DFW averages <strong style={{ color: "#fff" }}>3–5 significant hail events per year</strong>. Roofing is the #1 insurance claim in Texas.
          </p>
          <div style={{
            background: "rgba(255,255,255,0.08)", borderRadius: 10,
            padding: "12px 16px", border: "1px solid rgba(255,255,255,0.12)",
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#93C5FD", marginBottom: 8 }}>Your Roof Status</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 24px" }}>
              {[
                ["Type", "Architectural shingle"],
                ["Installed", "2016 (9 years old)"],
                ["Expected lifespan", "25–30 years"],
                ["Next inspection", "After next storm event"],
              ].map(([label, value]) => (
                <div key={label}>
                  <span style={{ fontSize: 12, color: "#94A3B8″ }}>{label}</span>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#E2E8F0″ }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hail Damage Guide */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9″, marginBottom: 12 }}>
            How to spot hail damage
          </h2>
          <Card style={{ background: "#1E293B", border: "1px solid #334155″, overflow: "hidden" }}>
            {/* Photo placeholder */}
            <div style={{
              height: 140, background: "linear-gradient(135deg, #1E3A2F, #166534)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 8, borderBottom: "1px solid #334155″,
            }}>
              <Camera size={32} color="#4ADE80″ style={{ opacity: 0.6 }} />
              <span style={{ fontSize: 13, color: "#6EE7B7″, opacity: 0.7 }}>Hail damage photo reference</span>
            </div>
            <CardContent style={{ padding: "20px 24px" }}>
              <div style={{
                background: "#0F172A", borderRadius: 10, padding: "12px 16px",
                marginBottom: 16, border: "1px solid #1E293B",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <Clock size={16} color="#F59E0B" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#FCD34D" }}>
                  Inspect within 72 hours of hail event
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: "●", color: "#F87171″, label: "Circular dents on shingles", detail: "Look for dark, rounded impact marks on shingle surfaces — bruising visible on asphalt granules." },
                  { icon: "●", color: "#FB923C", label: "Granule loss (check gutters)", detail: "After a storm, gutters full of dark granules mean shingles are shedding protective coating." },
                  { icon: "●", color: "#FBBF24″, label: "Dented metal vents and flashing", detail: "Soft metals around vents, gutters, and flashing dent easily — these are the clearest signs of significant hail." },
                  { icon: "●", color: "#A78BFA", label: "Bruised soft metals (valleys)", detail: "Check valley metal and around skylights. Hail leaves textured dimples on aluminum and copper." },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: item.color, marginTop: 6, minWidth: 8,
                    }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#E2E8F0″, marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: 13, color: "#94A3B8″, lineHeight: 1.5 }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inspection Checklist */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9″, marginBottom: 12 }}>
            Inspection checklist
          </h2>
          <Card style={{ background: "#1E293B", border: "1px solid #334155″ }}>
            <CardContent style={{ padding: "8px 0″ }}>
              {CHECKLIST.map((item, i) => {
                const done = checked.has(item.id);
                const cfg = STATUS_CONFIG[item.status];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "13px 20px", cursor: "pointer",
                      borderBottom: i < CHECKLIST.length - 1 ? "1px solid #293548″ : "none",
                      background: done ? "rgba(20, 83, 45, 0.2)" : "transparent",
                      transition: "background 0.2s",
                    }}
                  >
                    <div style={{
                      minWidth: 22, height: 22, borderRadius: 6,
                      border: done ? "none" : "2px solid #475569″,
                      background: done ? "#16A34A" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {done && <CheckCircle size={14} color="#fff" />}
                    </div>
                    <span style={{
                      flex: 1, fontSize: 14, color: done ? "#86EFAC" : "#CBD5E1″,
                      textDecoration: done ? "line-through" : "none",
                      lineHeight: 1.5,
                    }}>{item.label}</span>
                    {!done && (
                      <span style={{
                        fontSize: 11, fontWeight: 700, color: cfg.color,
                        background: "rgba(0,0,0,0.3)", padding: "2px 8px",
                        borderRadius: 20, whiteSpace: "nowrap",
                      }}>{cfg.label}</span>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Cost Guide */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9″, marginBottom: 12 }}>
            Cost guide (DFW, 2025)
          </h2>
          <Card style={{ background: "#1E293B", border: "1px solid #334155″ }}>
            <CardContent style={{ padding: "8px 0″ }}>
              {COSTS.map((row, i) => (
                <div key={row.service} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "13px 20px",
                  borderBottom: i < COSTS.length - 1 ? "1px solid #293548″ : "none",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <DollarSign size={15} color="#64748B" />
                    <span style={{ fontSize: 14, color: "#CBD5E1″ }}>{row.service}</span>
                  </div>
                  <span style={{
                    fontSize: 14, fontWeight: 700, color: "#34D399″,
                    background: "rgba(52, 211, 153, 0.1)", padding: "3px 10px", borderRadius: 20,
                  }}>{row.low} – {row.high}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Insurance Claim Tips */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9″, marginBottom: 12 }}>
            Insurance claim tips
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {INSURANCE_TIPS.map((tip, i) => {
              const TipIcon = tip.icon;
              const open = expanded === `tip-${i}`;
              return (
                <Card key={i} style={{
                  background: "#1E293B",
                  border: open ? "1px solid #0D9488″ : "1px solid #334155",
                  overflow: "hidden",
                }}>
                  <button
                    onClick={() => toggleExpand(`tip-${i}`)}
                    style={{
                      width: "100%", background: "none", border: "none",
                      cursor: "pointer", padding: "14px 20px",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: 8,
                        background: "rgba(13, 148, 136, 0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <TipIcon size={16} color="#2DD4BF" />
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 14, color: "#E2E8F0″, textAlign: "left" }}>
                        {tip.title}
                      </span>
                    </div>
                    {open ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
                  </button>
                  {open && (
                    <div style={{ padding: "0 20px 16px", borderTop: "1px solid #0F172A" }}>
                      <p style={{ fontSize: 14, color: "#94A3B8″, margin: 0, lineHeight: 1.6 }}>
                        {tip.detail}
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: "linear-gradient(135deg, #0F766E, #0D9488)",
          borderRadius: 16, padding: "24px",
          display: "flex", flexDirection: "column" as const, alignItems: "center",
          textAlign: "center" as const, gap: 12,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Wrench size={24} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
              Ready for a professional inspection?
            </div>
            <div style={{ fontSize: 14, color: "#CCFBF1″ }}>
              TrustyPro-verified roofers in DFW, rated 4.7★ average
            </div>
          </div>
          <a href="/trustypro/book?trade=roofing" style={{ textDecoration: "none" }}>
            <Button style={{
              background: "#fff", color: "#0F766E",
              fontWeight: 700, padding: "10px 28px", borderRadius: 10,
              fontSize: 15, border: "none",
            }}>
              <Star size={16} style={{ marginRight: 8, color: "#0D9488″ }} />
              Schedule Roof Inspection
            </Button>
          </a>
        </div>

      </div>
    </HomeownerLayout>
  );
}
