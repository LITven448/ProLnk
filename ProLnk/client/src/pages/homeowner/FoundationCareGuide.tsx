import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home, CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronUp,
  Droplets, Sun, Leaf, Snowflake, DoorOpen, Layers, MoveHorizontal,
  Hammer, TreeDeciduous, Shield, TrendingDown,
} from "lucide-react";

interface CheckItem {
  id: string;
  label: string;
  status: "ok" | "warn" | "fail";
}

interface WarningSign {
  id: string;
  icon: typeof DoorOpen;
  title: string;
  detail: string;
  severity: "high" | "medium" | "low";
}

interface Season {
  name: string;
  icon: typeof Sun;
  color: string;
  tip: string;
}

const CHECKLIST: CheckItem[] = [
  { id: "1", label: "Consistent perimeter watering (every 2–3 days in summer)", status: "ok" },
  { id: "2", label: "Maintain 4–6\" of soil moisture around foundation", status: "warn" },
  { id: "3", label: "No large trees within 15 feet of foundation", status: "ok" },
  { id: "4", label: "Gutters directing water away from foundation", status: "ok" },
  { id: "5", label: "No pooling water after rain", status: "fail" },
  { id: "6", label: "French drain if yard slopes toward house", status: "fail" },
];

const WARNING_SIGNS: WarningSign[] = [
  {
    id: "doors",
    icon: DoorOpen,
    title: "Doors / windows sticking",
    detail: "When your door frames shift, doors begin to bind in their frames. In DFW clay soil this often appears first in interior doors. If sticking suddenly worsens after a dry spell, that's a red flag.",
    severity: "high",
  },
  {
    id: "drywall",
    icon: Layers,
    title: "Cracks in drywall",
    detail: "Diagonal cracks running from window or door corners at 45° angles are the classic sign of differential movement. Hairline cracks from normal settling are normal; cracks wider than 1/4\" need immediate attention.",
    severity: "high",
  },
  {
    id: "gaps",
    icon: MoveHorizontal,
    title: "Gaps around doors / windows",
    detail: "Visible daylight at the top corners of a door or window frame, or gaps where molding has separated from the wall, indicate the structure is moving.",
    severity: "medium",
  },
  {
    id: "floors",
    icon: Layers,
    title: "Uneven floors",
    detail: "Roll a marble across your floor. If it consistently rolls in one direction, or you can see a noticeable slope with a level, your slab may be heaving or settling unevenly.",
    severity: "medium",
  },
  {
    id: "foundation",
    icon: Hammer,
    title: "Visible foundation cracks",
    detail: "Inspect your foundation perimeter 2–4 times per year. Horizontal cracks are the most serious (lateral pressure). Vertical cracks wider than 1/8\" or any crack with displacement need a professional.",
    severity: "high",
  },
  {
    id: "chimney",
    icon: Home,
    title: "Chimney leaning",
    detail: "A leaning or separated chimney is often the first dramatic visible sign of foundation movement. Check if your chimney is pulling away from the main structure at the roofline.",
    severity: "high",
  },
];

const SEASONS: Season[] = [
  {
    name: "Spring",
    icon: Leaf,
    color: "#22C55E",
    tip: "Resume perimeter watering gradually after winter. Check for any settling that occurred during freeze-thaw cycles. Inspect foundation for new cracks before summer heat sets in.",
  },
  {
    name: "Summer",
    icon: Sun,
    color: "#F59E0B",
    tip: "Daily watering is critical June–September. DFW clay shrinks dramatically when dry — this is when most foundation movement occurs. Set a soaker hose 12–18\" from foundation. Watch for soil pulling away from foundation edges.",
  },
  {
    name: "Fall",
    icon: Leaf,
    color: "#EA580C",
    tip: "Reduce watering gradually as temps drop. Clean gutters to ensure rain is directed away from foundation. This is the best time of year for a professional inspection.",
  },
  {
    name: "Winter",
    icon: Snowflake,
    color: "#60A5FA",
    tip: "DFW freezes are rare but damaging. Protect exposed pipes. Keep watering during dry winters — clay soil moisture loss in winter is slower but still occurs. Note any new cracks after a hard freeze.",
  },
];

const SEVERITY_COLORS: Record<string, string> = {
  high: "#EF4444",
  medium: "#F59E0B",
  low: "#22C55E",
};

function StatusIcon({ status }: { status: "ok" | "warn" | "fail" }) {
  if (status === "ok") return <CheckCircle size={20} color="#22C55E" />;
  if (status === "warn") return <AlertTriangle size={20} color="#F59E0B" />;
  return <XCircle size={20} color="#EF4444" />;
}

export default function FoundationCareGuide() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set(["1", "3", "4"]));

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

  const doneCount = CHECKLIST.filter(c => checked.has(c.id)).length;

  return (
    <HomeownerLayout>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px 56px" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: "linear-gradient(135deg, #92400E, #B45309)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Home size={24} color="#FDE68A" />
            </div>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", margin: 0 }}>
                Foundation Care Guide
              </h1>
              <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>
                Protect your biggest investment in DFW
              </p>
            </div>
          </div>
        </div>

        {/* DFW Context Banner */}
        <div style={{
          background: "linear-gradient(135deg, #78350F, #92400E)",
          borderRadius: 16, padding: "18px 22px", marginBottom: 20,
          border: "1px solid #B45309",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <AlertTriangle size={18} color="#FDE68A" />
            <span style={{ fontSize: 16, fontWeight: 700, color: "#FEF3C7" }}>
              DFW Homeowners: You face elevated risk
            </span>
          </div>
          <p style={{ fontSize: 14, color: "#FDE68A", margin: 0, lineHeight: 1.6 }}>
            DFW's <strong>expansive clay soil</strong> makes foundation issues the #1 homeowner cost in North Texas.
            Average repair ranges from <strong>$8,000–$40,000</strong>. Prevention costs just <strong>$0–$200/year</strong>.
            The clay swells when wet and shrinks dramatically when dry — this seasonal movement is what cracks your slab.
          </p>
        </div>

        {/* Your Foundation Status */}
        <Card style={{ marginBottom: 20, border: "1px solid #D1FAE5", background: "#F0FDF4" }}>
          <CardContent style={{ padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <CheckCircle size={20} color="#16A34A" />
                  <span style={{ fontWeight: 700, color: "#15803D", fontSize: 16 }}>Foundation Status: Good</span>
                </div>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, color: "#374151" }}>
                    <strong>Last inspection:</strong> September 2025
                  </span>
                  <span style={{ fontSize: 13, color: "#374151" }}>
                    <strong>Next recommended:</strong> September 2026
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "#4B5563", margin: "6px 0 0" }}>
                  No issues detected during last inspection. Stay on top of your prevention checklist to keep it that way.
                </p>
              </div>
              <div style={{
                background: "#DCFCE7", border: "1px solid #86EFAC",
                borderRadius: 12, padding: "10px 16px", textAlign: "center", minWidth: 90,
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#15803D" }}>A</div>
                <div style={{ fontSize: 11, color: "#16A34A", fontWeight: 600 }}>GRADE</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prevention Checklist */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", margin: 0 }}>
              Prevention Checklist
            </h2>
            <span style={{
              fontSize: 13, fontWeight: 600, color: doneCount >= 4 ? "#16A34A" : "#D97706",
              background: doneCount >= 4 ? "#DCFCE7" : "#FEF3C7",
              border: `1px solid ${doneCount >= 4 ? "#86EFAC" : "#FCD34D"}`,
              borderRadius: 20, padding: "3px 12px",
            }}>
              {doneCount} / {CHECKLIST.length} complete
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {CHECKLIST.map(item => (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: "#fff", border: "1px solid #E2E8F0",
                  borderRadius: 10, padding: "12px 16px", cursor: "pointer",
                  opacity: checked.has(item.id) ? 0.7 : 1,
                  transition: "opacity 0.15s",
                }}
              >
                <StatusIcon status={checked.has(item.id) ? "ok" : item.status} />
                <span style={{
                  fontSize: 14, color: "#1E293B",
                  textDecoration: checked.has(item.id) ? "line-through" : "none",
                  lineHeight: 1.5,
                }}>
                  {item.label}
                </span>
                {!checked.has(item.id) && item.status === "fail" && (
                  <span style={{
                    marginLeft: "auto", fontSize: 11, fontWeight: 700,
                    color: "#DC2626", background: "#FEE2E2",
                    border: "1px solid #FECACA", borderRadius: 20, padding: "2px 8px",
                  }}>Action needed</span>
                )}
                {!checked.has(item.id) && item.status === "warn" && (
                  <span style={{
                    marginLeft: "auto", fontSize: 11, fontWeight: 700,
                    color: "#D97706", background: "#FEF3C7",
                    border: "1px solid #FCD34D", borderRadius: 20, padding: "2px 8px",
                  }}>Monitor</span>
                )}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 8 }}>Tap any item to mark complete</p>
        </div>

        {/* Warning Signs — accordion */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>
            Warning Signs to Watch For
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {WARNING_SIGNS.map(sign => {
              const Icon = sign.icon;
              const isOpen = expanded === sign.id;
              const color = SEVERITY_COLORS[sign.severity];
              return (
                <div key={sign.id} style={{ border: "1px solid #E2E8F0", borderRadius: 12, overflow: "hidden" }}>
                  <button
                    onClick={() => toggleExpand(sign.id)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      width: "100%", background: isOpen ? "#F8FAFC" : "#fff",
                      padding: "14px 16px", border: "none", cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 8,
                        background: `${color}18`, display: "flex",
                        alignItems: "center", justifyContent: "center",
                      }}>
                        <Icon size={16} color={color} />
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 600, color: "#1E293B" }}>{sign.title}</span>
                      <span style={{
                        fontSize: 11, fontWeight: 700, color,
                        background: `${color}18`, border: `1px solid ${color}44`,
                        borderRadius: 20, padding: "2px 8px", textTransform: "capitalize",
                      }}>
                        {sign.severity} priority
                      </span>
                    </div>
                    {isOpen ? <ChevronUp size={16} color="#94A3B8" /> : <ChevronDown size={16} color="#94A3B8" />}
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 16px 14px", background: "#F8FAFC" }}>
                      <p style={{ fontSize: 14, color: "#475569", margin: 0, lineHeight: 1.6 }}>
                        {sign.detail}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Seasonal Guide */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>
            Seasonal Care Guide
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {SEASONS.map(s => {
              const Icon = s.icon;
              return (
                <div key={s.name} style={{
                  background: "#fff", border: "1px solid #E2E8F0",
                  borderRadius: 12, padding: "14px 16px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: `${s.color}20`, display: "flex",
                      alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={15} color={s.color} />
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.name}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#475569", margin: 0, lineHeight: 1.5 }}>{s.tip}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cost Comparison */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>
            The Math Is Clear
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{
              background: "linear-gradient(135deg, #F0FDF4, #DCFCE7)",
              border: "1px solid #86EFAC", borderRadius: 14, padding: "18px 20px",
              textAlign: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 8 }}>
                <Droplets size={18} color="#16A34A" />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#15803D" }}>Prevention</span>
              </div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#15803D", marginBottom: 4 }}>$200</div>
              <div style={{ fontSize: 12, color: "#16A34A" }}>per year</div>
              <div style={{ fontSize: 11, color: "#4B5563", marginTop: 8 }}>
                Soaker hose system + inspections
              </div>
            </div>
            <div style={{
              background: "linear-gradient(135deg, #FFF7ED, #FEF3C7)",
              border: "1px solid #FCD34D", borderRadius: 14, padding: "18px 20px",
              textAlign: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 8 }}>
                <Hammer size={18} color="#B45309" />
                <span style={{ fontSize: 13, fontWeight: 700, color: "#92400E" }}>Foundation Repair</span>
              </div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#B45309", marginBottom: 4 }}>$8K–40K</div>
              <div style={{ fontSize: 12, color: "#D97706" }}>average DFW repair</div>
              <div style={{ fontSize: 11, color: "#4B5563", marginTop: 8 }}>
                Piers, drainage, mudjacking, structural
              </div>
            </div>
          </div>
          <div style={{
            marginTop: 12, background: "#EFF6FF", border: "1px solid #BFDBFE",
            borderRadius: 12, padding: "12px 16px",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <TrendingDown size={18} color="#2563EB" />
            <span style={{ fontSize: 13, color: "#1D4ED8" }}>
              <strong>ROI:</strong> Every $200 spent on prevention saves an expected $4,000–$8,000 in repair costs over a 10-year home ownership period.
            </span>
          </div>
        </div>

        {/* Trees Warning */}
        <Card style={{ marginBottom: 24, border: "1px solid #FEE2E2", background: "#FFF5F5" }}>
          <CardContent style={{ padding: "14px 18px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <TreeDeciduous size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 700, color: "#991B1B", fontSize: 14, marginBottom: 4 }}>
                  Tree Root Risk
                </div>
                <p style={{ fontSize: 13, color: "#7F1D1D", margin: 0, lineHeight: 1.5 }}>
                  Large trees within 15 feet draw enormous amounts of moisture from clay soil.
                  Bradford pears, cottonwoods, and oaks are the most common culprits in DFW.
                  If you have large trees near your foundation, budget for annual root barrier maintenance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div style={{
          background: "linear-gradient(135deg, #1E3A5F, #1D4ED8)",
          borderRadius: 18, padding: "28px 28px", textAlign: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
            <Shield size={22} color="#93C5FD" />
            <span style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>Get a Foundation Inspection</span>
          </div>
          <p style={{ fontSize: 14, color: "#BFDBFE", margin: "0 0 20px" }}>
            Book a certified foundation inspector through ProLnk. Verified pros, transparent pricing, and a written report — typically $250–$400.
          </p>
          <Button style={{
            background: "#3B82F6", color: "#fff", fontWeight: 700,
            fontSize: 15, padding: "12px 32px", borderRadius: 10,
            border: "none", cursor: "pointer",
          }}>
            Book a Foundation Pro
          </Button>
          <p style={{ fontSize: 12, color: "#93C5FD", marginTop: 10 }}>
            All ProLnk pros are licensed, background-checked, and rated by verified homeowners.
          </p>
        </div>

      </div>
    </HomeownerLayout>
  );
}
