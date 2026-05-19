import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { TrendingUp, ArrowRight, ArrowUpDown } from "lucide-react";
import { Link } from "wouter";

interface Project {
  name: string;
  baseCost: number;
  valueAdd: number;
  roi: number;
  badge?: string;
  warning?: string;
}

const BASE_PROJECTS: Project[] = [
  { name: "Kitchen remodel", baseCost: 25000, valueAdd: 18000, roi: 72 },
  { name: "Master bath remodel", baseCost: 15000, valueAdd: 10500, roi: 70 },
  { name: "Roof replacement", baseCost: 14000, valueAdd: 8400, roi: 60, warning: "Essential for sale" },
  { name: "HVAC upgrade", baseCost: 8000, valueAdd: 4800, roi: 60 },
  { name: "Landscaping", baseCost: 5000, valueAdd: 5500, roi: 110, badge: "Best ROI" },
  { name: "New windows", baseCost: 12000, valueAdd: 7200, roi: 60 },
  { name: "Exterior paint", baseCost: 4000, valueAdd: 4400, roi: 110, badge: "Best ROI" },
  { name: "Fence", baseCost: 3000, valueAdd: 1800, roi: 60 },
];

const WORST = [
  { name: "Pool", cost: "$50,000", value: "$10,000", note: "Pools add less than 20% of install cost in DFW" },
  { name: "Sunroom / Patio cover", cost: "$30,000", value: "Negative ROI", note: "Texas heat makes enclosed additions unappealing to buyers" },
];

export default function HomeRenovationROI() {
  const [sortByROI, setSortByROI] = useState(false);
  const [multipliers, setMultipliers] = useState<Record<string, number>>(
    Object.fromEntries(BASE_PROJECTS.map(p => [p.name, 1]))
  );

  const projects = BASE_PROJECTS.map(p => {
    const m = multipliers[p.name] ?? 1;
    const cost = Math.round(p.baseCost * m);
    const value = Math.round(p.valueAdd * m);
    return { ...p, cost, value };
  });

  const displayed = sortByROI
    ? [...projects].sort((a, b) => b.roi - a.roi)
    : projects;

  const fmt = (v: number) => `$${v.toLocaleString()}`;

  return (
    <HomeownerLayout>
      <div style={{ minHeight: "100vh", background: "#0A1628", color: "#e5e7eb", fontFamily: "sans-serif" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px 72px" }}>

          {/* Hero */}
          <div style={{ marginBottom: 36 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.25)",
              borderRadius: 20, padding: "5px 14px", fontSize: 12, color: "#14b8a6",
              fontWeight: 600, marginBottom: 16,
            }}>
              <TrendingUp size={12} /> DFW Renovation ROI
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: "#fff", margin: "0 0 14px", lineHeight: 1.2 }}>
              Which Home Improvements Actually Pay Off in DFW?
            </h1>
            <p style={{ color: "#9ca3af", fontSize: 15, maxWidth: 620, margin: 0, lineHeight: 1.65 }}>
              Adjust each project's investment with the slider to see how the numbers change. DFW data from CoreLogic + Remodeling Cost vs. Value 2025.
            </p>
          </div>

          {/* Sort toggle */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
            <button
              onClick={() => setSortByROI(s => !s)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: sortByROI ? "rgba(20,184,166,0.15)" : "#141c2e",
                border: sortByROI ? "1px solid rgba(20,184,166,0.4)" : "1px solid #1e2c45",
                color: sortByROI ? "#14b8a6" : "#9ca3af",
                borderRadius: 10, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}
            >
              <ArrowUpDown size={14} />
              {sortByROI ? "Sorted by ROI" : "Sort by ROI"}
            </button>
          </div>

          {/* Table */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
            {displayed.map(project => {
              const m = multipliers[project.name] ?? 1;
              const roiColor = project.roi >= 100 ? "#22c55e" : project.roi >= 70 ? "#14b8a6" : "#f59e0b";
              return (
                <div key={project.name} style={{
                  background: "#141c2e", borderRadius: 14, border: "1px solid #1e2c45",
                  padding: "20px 22px",
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{project.name}</span>
                        {project.badge && (
                          <span style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", background: "rgba(34,197,94,0.15)", borderRadius: 6, padding: "2px 8px" }}>
                            {project.badge}
                          </span>
                        )}
                        {project.warning && (
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#f59e0b", background: "rgba(245,158,11,0.12)", borderRadius: 6, padding: "2px 8px" }}>
                            {project.warning}
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>Investment</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#e5e7eb" }}>{fmt(project.cost)}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>Value Added</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#14b8a6" }}>{fmt(project.value)}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>ROI</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: roiColor }}>{project.roi}%</div>
                      </div>
                    </div>
                  </div>
                  {/* Slider */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ color: "#6b7280", fontSize: 12 }}>Adjust investment scale</span>
                      <span style={{ color: "#14b8a6", fontSize: 12, fontWeight: 700 }}>{Math.round(m * 100)}% of baseline</span>
                    </div>
                    <input
                      type="range" min={0.5} max={2} step={0.05} value={m}
                      onChange={e => setMultipliers(prev => ({ ...prev, [project.name]: Number(e.target.value) }))}
                      style={{ width: "100%", accentColor: "#14b8a6" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Worst money spent */}
          <div style={{ background: "#141c2e", borderRadius: 16, border: "1px solid rgba(239,68,68,0.25)", padding: "22px 26px", marginBottom: 36 }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 17, fontWeight: 700, color: "#ef4444" }}>
              Worst Money Spent in DFW
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 14 }}>
              {WORST.map(w => (
                <div key={w.name} style={{ background: "#0A1628", borderRadius: 12, padding: "16px 18px", border: "1px solid #1e2c45" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{w.name}</div>
                  <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 11, color: "#6b7280" }}>Cost</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#ef4444" }}>{w.cost}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#6b7280" }}>Value Add</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#f59e0b" }}>{w.value}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>{w.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 18 }}>
              Ready to start your highest-ROI project? Get quotes from vetted DFW contractors today.
            </p>
            <Link href="/homeowner-signup">
              <button style={{
                background: "#14b8a6", color: "#fff", border: "none",
                borderRadius: 10, padding: "14px 32px", fontSize: 15,
                fontWeight: 700, cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 8,
              }}>
                Get Quotes for Your Project <ArrowRight size={16} />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
