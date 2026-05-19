import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sun, CheckCircle, AlertTriangle, XCircle, DollarSign,
  Zap, ShieldCheck, Star, Wrench,
} from "lucide-react";

interface CheckItem {
  id: string;
  label: string;
  status: "ok" | "warn" | "fail";
}

interface UpgradeOption {
  title: string;
  cost: string;
  benefit: string;
  roi: string;
  color: string;
}

const CHECKLIST: CheckItem[] = [
  { id: "1″, label: "No condensation between panes", status: "warn" },
  { id: "2″, label: "Opens and closes smoothly", status: "ok" },
  { id: "3″, label: "Weather stripping intact", status: "ok" },
  { id: "4″, label: "No visible cracks in glass", status: "ok" },
  { id: "5″, label: "Caulk seal around frame", status: "warn" },
  { id: "6″, label: "Energy Star certified", status: "fail" },
];

const UPGRADES: UpgradeOption[] = [
  {
    title: "Window Film",
    cost: "$200–600″,
    benefit: "Blocks 35–50% heat, immediate ROI",
    roi: "2–3 yr payback",
    color: "#0D9488″,
  },
  {
    title: "Double-Pane Replacement",
    cost: "$300–700/window",
    benefit: "Best long-term value for DFW climate",
    roi: "6–8 yr payback",
    color: "#2563EB",
  },
  {
    title: "Low-E Glass",
    cost: "$400–900/window",
    benefit: "Best energy performance — blocks IR and UV",
    roi: "7–10 yr payback",
    color: "#7C3AED",
  },
  {
    title: "Impact-Resistant",
    cost: "$600–1,200/window",
    benefit: "Storm protection + insurance discount",
    roi: "Insurance savings",
    color: "#D97706″,
  },
];

const STATUS_CFG = {
  ok:   { color: "#16A34A", bg: "rgba(22,163,74,0.12)",  label: "✅", Icon: CheckCircle },
  warn: { color: "#D97706″, bg: "rgba(217,119,6,0.12)",  label: "⚠️", Icon: AlertTriangle },
  fail: { color: "#DC2626″, bg: "rgba(220,38,38,0.12)",  label: "❌", Icon: XCircle },
};

export default function WindowGuide() {
  const [checked, setChecked] = useState<Set<string>>(new Set(["2″, "3", "4"]));

  function toggle(id: string) {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const passCount = CHECKLIST.filter(i => checked.has(i.id)).length;

  return (
    <HomeownerLayout>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px 48px" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "linear-gradient(135deg, #0369A1, #0EA5E9)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Sun size={22} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#F8FAFC", margin: 0 }}>Window Guide</h1>
              <p style={{ fontSize: 14, color: "#94A3B8″, margin: 0 }}>Keep the heat out and the cool in</p>
            </div>
          </div>
        </div>

        {/* Your Windows Card */}
        <div style={{
          background: "#1E293B", border: "1px solid #334155″,
          borderRadius: 16, padding: "20px 24px", marginBottom: 16,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#94A3B8″, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Your Windows
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#E2E8F0″, marginBottom: 4 }}>
            Single-pane aluminum windows, installed 2002 (23 years old)
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)",
            borderRadius: 20, padding: "4px 12px", marginTop: 4,
          }}>
            <AlertTriangle size={13} color="#F87171″ />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#F87171″ }}>Upgrade recommended</span>
          </div>
        </div>

        {/* DFW Context Banner */}
        <div style={{
          background: "linear-gradient(135deg, #1E3A5F, #1D4ED8)",
          borderRadius: 16, padding: "20px 24px", marginBottom: 20,
          border: "1px solid #2563EB",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <Sun size={20} color="#93C5FD" />
            <span style={{ fontSize: 15, fontWeight: 700, color: "#EFF6FF" }}>DFW Solar Load Reality</span>
          </div>
          <p style={{ fontSize: 14, color: "#BFDBFE", margin: 0, lineHeight: 1.6 }}>
            South and west facing windows absorb up to <strong style={{ color: "#fff" }}>800 BTUs/hr</strong> during DFW summer.
            Window upgrades can reduce cooling costs <strong style={{ color: "#fff" }}>15–25%</strong> — one of the highest ROI home improvements in Texas.
          </p>
        </div>

        {/* Assessment Checklist */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9″, margin: 0 }}>Window assessment</h2>
            <span style={{
              fontSize: 13, fontWeight: 700,
              color: passCount >= 5 ? "#34D399″ : passCount >= 3 ? "#FBBF24" : "#F87171",
            }}>{passCount}/{CHECKLIST.length} passing</span>
          </div>
          <Card style={{ background: "#1E293B", border: "1px solid #334155″ }}>
            <CardContent style={{ padding: "8px 0″ }}>
              {CHECKLIST.map((item, i) => {
                const done = checked.has(item.id);
                const cfg = STATUS_CFG[item.status];
                const StatusIcon = cfg.Icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "13px 20px", cursor: "pointer",
                      borderBottom: i < CHECKLIST.length - 1 ? "1px solid #293548″ : "none",
                      background: done ? "rgba(22,163,74,0.08)" : "transparent",
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
                      flex: 1, fontSize: 14,
                      color: done ? "#86EFAC" : "#CBD5E1″,
                      lineHeight: 1.4,
                    }}>{item.label}</span>
                    {!done && (
                      <div style={{
                        background: cfg.bg, borderRadius: 8,
                        padding: "3px 6px", display: "flex", alignItems: "center",
                      }}>
                        <StatusIcon size={14} color={cfg.color} />
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Options */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9″, marginBottom: 12 }}>Upgrade options</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {UPGRADES.map(opt => (
              <div key={opt.title} style={{
                background: "#1E293B", border: `1px solid ${opt.color}33`,
                borderRadius: 14, padding: "16px 18px",
                borderLeft: `3px solid ${opt.color}`,
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#F1F5F9″, marginBottom: 4 }}>{opt.title}</div>
                <div style={{
                  fontSize: 16, fontWeight: 800, color: opt.color, marginBottom: 8,
                }}>{opt.cost}</div>
                <div style={{ fontSize: 12, color: "#94A3B8″, lineHeight: 1.5, marginBottom: 8 }}>{opt.benefit}</div>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: "#64748B",
                  background: "#0F172A", borderRadius: 6, padding: "2px 8px",
                  display: "inline-block",
                }}>{opt.roi}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tax Incentives Banner */}
        <div style={{
          background: "linear-gradient(135deg, #1A2F1A, #166534)",
          border: "1px solid #16A34A",
          borderRadius: 14, padding: "16px 20px", marginBottom: 24,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: "rgba(22,163,74,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center", minWidth: 40,
          }}>
            <ShieldCheck size={20} color="#4ADE80″ />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4ADE80″, marginBottom: 3 }}>
              Federal Tax Credit Available
            </div>
            <div style={{ fontSize: 13, color: "#86EFAC", lineHeight: 1.5 }}>
              Energy Star windows qualify for <strong>30% Federal Tax Credit</strong> through 2032. Save $300–$1,800 on your upgrade.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: "linear-gradient(135deg, #0369A1, #0EA5E9)",
          borderRadius: 16, padding: "24px",
          display: "flex", flexDirection: "column" as const,
          alignItems: "center", textAlign: "center" as const, gap: 12,
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
              Ready to upgrade your windows?
            </div>
            <div style={{ fontSize: 14, color: "#BAE6FD" }}>
              TrustyPro-verified window installers in DFW — free quotes, no obligation
            </div>
          </div>
          <a href="/homeowner/request-pro?trade=windows" style={{ textDecoration: "none" }}>
            <Button style={{
              background: "#fff", color: "#0369A1″,
              fontWeight: 700, padding: "10px 28px", borderRadius: 10,
              fontSize: 15, border: "none",
            }}>
              <Star size={16} style={{ marginRight: 8, color: "#0EA5E9″ }} />
              Get Window Quotes
            </Button>
          </a>
        </div>

      </div>
    </HomeownerLayout>
  );
}
