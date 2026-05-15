import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, AlertTriangle, TrendingUp, Users,
  Target, ChevronRight, Zap, DollarSign
} from "lucide-react";
import { toast } from "sonner";

const SUMMARY_CARDS = [
  { label: "ZIPs Covered", value: "89 / 342", sub: "26% of DFW ZIPs", icon: MapPin, color: "#10B981" },
  { label: "Lead Volume Uncovered", value: "34%", sub: "of DFW demand unreached", icon: AlertTriangle, color: "#F59E0B" },
  { label: "Avg Pros per ZIP", value: "1.7", sub: "covered ZIPs only", icon: Users, color: "#6366F1" },
  { label: "ZIPs with 0 Pros", value: "253", sub: "highest-value target", icon: Target, color: "#EF4444" },
];

interface GapRow {
  zip: string;
  city: string;
  monthlyLeads: number;
  homeowners: number;
  nearestPro: number;
  priority: number;
}

const GAP_ROWS: GapRow[] = [
  { zip: "75070", city: "McKinney",        monthlyLeads: 47, homeowners: 2, nearestPro: 4.2, priority: 98 },
  { zip: "75024", city: "Plano",           monthlyLeads: 38, homeowners: 1, nearestPro: 6.1, priority: 94 },
  { zip: "75033", city: "Frisco",          monthlyLeads: 31, homeowners: 0, nearestPro: 7.8, priority: 91 },
  { zip: "75056", city: "The Colony",      monthlyLeads: 29, homeowners: 1, nearestPro: 5.3, priority: 87 },
  { zip: "76244", city: "Keller",          monthlyLeads: 26, homeowners: 0, nearestPro: 9.2, priority: 85 },
  { zip: "75068", city: "Little Elm",      monthlyLeads: 24, homeowners: 1, nearestPro: 8.7, priority: 82 },
  { zip: "76262", city: "Roanoke",         monthlyLeads: 22, homeowners: 0, nearestPro: 11.4, priority: 79 },
  { zip: "75071", city: "McKinney",        monthlyLeads: 21, homeowners: 2, nearestPro: 3.9, priority: 76 },
  { zip: "75078", city: "Prosper",         monthlyLeads: 19, homeowners: 0, nearestPro: 12.1, priority: 74 },
  { zip: "76226", city: "Argyle",          monthlyLeads: 18, homeowners: 1, nearestPro: 9.8, priority: 71 },
  { zip: "75009", city: "Celina",          monthlyLeads: 17, homeowners: 0, nearestPro: 14.6, priority: 68 },
  { zip: "76092", city: "Southlake",       monthlyLeads: 16, homeowners: 3, nearestPro: 2.7, priority: 65 },
  { zip: "75023", city: "Plano",           monthlyLeads: 15, homeowners: 1, nearestPro: 5.9, priority: 62 },
  { zip: "76248", city: "Keller",          monthlyLeads: 14, homeowners: 0, nearestPro: 8.3, priority: 59 },
  { zip: "75007", city: "Carrollton",      monthlyLeads: 13, homeowners: 2, nearestPro: 4.5, priority: 56 },
];

const priorityColor = (score: number) => {
  if (score >= 90) return "#EF4444";
  if (score >= 75) return "#F59E0B";
  return "#10B981";
};

const priorityLabel = (score: number) => {
  if (score >= 90) return "Critical";
  if (score >= 75) return "High";
  return "Medium";
};

const HEAT_GRID: { label: string; coverage: "none" | "low" | "good" }[] = [
  { label: "75070", coverage: "none" },
  { label: "75024", coverage: "none" },
  { label: "75033", coverage: "none" },
  { label: "75056", coverage: "none" },
  { label: "76244", coverage: "none" },
  { label: "75068", coverage: "none" },
  { label: "75025", coverage: "low" },
  { label: "75013", coverage: "good" },
  { label: "75019", coverage: "good" },
  { label: "75038", coverage: "low" },
  { label: "75039", coverage: "good" },
  { label: "75040", coverage: "none" },
  { label: "75041", coverage: "low" },
  { label: "75042", coverage: "good" },
  { label: "75043", coverage: "none" },
  { label: "75044", coverage: "good" },
  { label: "75045", coverage: "none" },
  { label: "75046", coverage: "none" },
  { label: "75048", coverage: "low" },
  { label: "75050", coverage: "good" },
  { label: "75051", coverage: "good" },
  { label: "75052", coverage: "none" },
  { label: "75054", coverage: "none" },
  { label: "75060", coverage: "low" },
  { label: "75061", coverage: "good" },
  { label: "75062", coverage: "good" },
  { label: "75063", coverage: "none" },
  { label: "75065", coverage: "none" },
  { label: "75067", coverage: "low" },
  { label: "75071", coverage: "none" },
];

const coverageStyle = (c: "none" | "low" | "good") => {
  if (c === "none") return { background: "#374151", border: "1px solid #4B5563", color: "#6B7280" };
  if (c === "low")  return { background: "#78350F", border: "1px solid #D97706", color: "#FCD34D" };
  return              { background: "#134E4A", border: "1px solid #14B8A6", color: "#5EEAD4" };
};

export default function CoverageGapAnalysis() {
  const [recruited, setRecruited] = useState<Set<string>>(new Set());

  const handleRecruit = (zip: string, city: string) => {
    setRecruited(prev => new Set(prev).add(zip));
    toast.success(`Recruitment campaign started for ${zip} — ${city}`);
  };

  return (
    <AdminLayout>
      <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <MapPin size={22} color="#10B981" />
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#F9FAFB", margin: 0 }}>
              Coverage Gap Analysis
            </h1>
          </div>
          <p style={{ color: "#9CA3AF", fontSize: 14, margin: 0 }}>
            Find the ZIPs we're not serving — prioritize partner recruitment by demand density.
          </p>
        </div>

        {/* Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
          {SUMMARY_CARDS.map(card => (
            <div key={card.label} style={{
              background: "#1F2937", border: "1px solid #374151",
              borderRadius: 10, padding: "16px 18px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ color: "#9CA3AF", fontSize: 12, margin: "0 0 4px" }}>{card.label}</p>
                  <p style={{ color: card.color, fontSize: 24, fontWeight: 700, margin: "0 0 2px" }}>{card.value}</p>
                  <p style={{ color: "#6B7280", fontSize: 12, margin: 0 }}>{card.sub}</p>
                </div>
                <div style={{ padding: 8, borderRadius: 8, background: "#111827" }}>
                  <card.icon size={18} color={card.color} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gap Opportunity Table */}
        <div style={{
          background: "#1F2937", border: "1px solid #374151",
          borderRadius: 10, marginBottom: 28, overflow: "hidden"
        }}>
          <div style={{
            padding: "16px 20px", borderBottom: "1px solid #374151",
            display: "flex", alignItems: "center", justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <TrendingUp size={16} color="#F59E0B" />
              <span style={{ color: "#F9FAFB", fontWeight: 600, fontSize: 15 }}>
                Top 15 Uncovered ZIPs by Demand
              </span>
            </div>
            <span style={{ color: "#6B7280", fontSize: 12 }}>Sorted by priority score</span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #374151" }}>
                  {["ZIP", "City", "Monthly Leads", "Homeowners Needed", "Nearest Pro", "Priority", "Action"].map(h => (
                    <th key={h} style={{
                      padding: "10px 16px", textAlign: "left",
                      color: "#6B7280", fontSize: 11, fontWeight: 600,
                      textTransform: "uppercase", letterSpacing: "0.05em"
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GAP_ROWS.map((row, i) => (
                  <tr key={row.zip} style={{
                    borderBottom: i < GAP_ROWS.length - 1 ? "1px solid #1F2937" : "none",
                    background: i % 2 === 0 ? "#111827" : "#1F2937"
                  }}>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ color: "#F9FAFB", fontWeight: 600, fontSize: 14 }}>{row.zip}</span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#D1D5DB", fontSize: 14 }}>{row.city}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ color: "#10B981", fontWeight: 600, fontSize: 14 }}>{row.monthlyLeads}</span>
                      <span style={{ color: "#6B7280", fontSize: 12 }}>/mo</span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#D1D5DB", fontSize: 14 }}>
                      {row.homeowners === 0
                        ? <span style={{ color: "#EF4444" }}>None yet</span>
                        : `${row.homeowners} pre-signed`
                      }
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ color: row.nearestPro > 10 ? "#EF4444" : "#F59E0B", fontSize: 14 }}>
                        {row.nearestPro} mi
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                        color: priorityColor(row.priority),
                        background: `${priorityColor(row.priority)}18`,
                        border: `1px solid ${priorityColor(row.priority)}40`
                      }}>
                        {row.priority} — {priorityLabel(row.priority)}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      {recruited.has(row.zip) ? (
                        <span style={{ color: "#10B981", fontSize: 13, fontWeight: 600 }}>
                          ✓ Recruiting
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleRecruit(row.zip, row.city)}
                          style={{
                            background: "#134E4A", color: "#5EEAD4",
                            border: "1px solid #14B8A6", fontSize: 12,
                            height: 28, padding: "0 10px"
                          }}
                        >
                          Recruit here
                          <ChevronRight size={12} style={{ marginLeft: 2 }} />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coverage Heat Map */}
        <div style={{
          background: "#1F2937", border: "1px solid #374151",
          borderRadius: 10, marginBottom: 28, padding: "20px 24px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <MapPin size={16} color="#6366F1" />
            <span style={{ color: "#F9FAFB", fontWeight: 600, fontSize: 15 }}>
              DFW ZIP Coverage Density
            </span>
          </div>

          <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
            {[
              { color: "#374151", border: "#4B5563", label: "No coverage" },
              { color: "#78350F", border: "#D97706", label: "1 pro" },
              { color: "#134E4A", border: "#14B8A6", label: "2+ pros" },
            ].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 12, height: 12, borderRadius: 2,
                  background: l.color, border: `1px solid ${l.border}`
                }} />
                <span style={{ color: "#9CA3AF", fontSize: 12 }}>{l.label}</span>
              </div>
            ))}
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 4
          }}>
            {HEAT_GRID.map(cell => (
              <div
                key={cell.label}
                style={{
                  ...coverageStyle(cell.coverage),
                  borderRadius: 4,
                  padding: "6px 4px",
                  textAlign: "center",
                  fontSize: 10,
                  fontWeight: 500,
                  cursor: "default",
                }}
                title={cell.label}
              >
                {cell.label}
              </div>
            ))}
          </div>
        </div>

        {/* Acquisition Plan */}
        <div style={{
          background: "linear-gradient(135deg, #064E3B 0%, #134E4A 100%)",
          border: "1px solid #14B8A6",
          borderRadius: 10, padding: "20px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ padding: 10, borderRadius: 8, background: "#064E3B" }}>
              <DollarSign size={20} color="#10B981" />
            </div>
            <div>
              <p style={{ color: "#F9FAFB", fontWeight: 700, fontSize: 15, margin: "0 0 3px" }}>
                Targeted Acquisition Opportunity
              </p>
              <p style={{ color: "#6EE7B7", fontSize: 13, margin: 0 }}>
                Adding <strong style={{ color: "#fff" }}>10 partners</strong> to top uncovered ZIPs = estimated{" "}
                <strong style={{ color: "#34D399" }}>+$42,000/mo</strong> in platform revenue
              </p>
            </div>
          </div>
          <Button
            onClick={() => toast.success("Recruitment campaign created for top 10 ZIPs")}
            style={{
              background: "#10B981", color: "#fff",
              border: "none", fontWeight: 600,
              display: "flex", alignItems: "center", gap: 6
            }}
          >
            <Zap size={15} />
            Launch ZIP Blitz
          </Button>
        </div>

      </div>
    </AdminLayout>
  );
}
