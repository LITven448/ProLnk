import { useState } from 'react';

const decadeData: Record<string, {
  roof: { status: string; summary: string; action: string; cost: string };
  electrical: { status: string; summary: string; action: string; cost: string };
  plumbing: { status: string; summary: string; action: string; cost: string };
  hvac: { status: string; summary: string; action: string; cost: string };
  foundation: { status: string; summary: string; action: string; cost: string };
  totalLow: number;
  totalHigh: number;
}> = {
  '1960s': {
    roof: { status: '🔴', summary: 'Single-tab shingles — past end of life, likely replaced once already', action: 'Full replacement required', cost: '$12,000–$22,000′ },
    electrical: { status: '🔴', summary: 'Aluminum wiring, Zinsco or FPE panel — documented fire hazard', action: 'Panel replacement + wiring remediation', cost: '$6,000–$15,000′ },
    plumbing: { status: '🔴', summary: 'Galvanized steel supply and drain — corrosion, reduced flow, failing', action: 'Full PEX repipe', cost: '$8,000–$20,000′ },
    hvac: { status: '🔴', summary: 'No original AC or decades-old equipment — R-22, non-functional', action: 'Full system + ductwork replacement', cost: '$6,500–$15,000′ },
    foundation: { status: '🟠', summary: 'Conventional slab, 60+ years of DFW clay movement', action: 'Professional evaluation + pier plan', cost: '$0–$25,000′ },
    totalLow: 32500,
    totalHigh: 97000,
  },
  '1970s': {
    roof: { status: '🟠', summary: 'Early architectural or 3-tab shingles, possible asbestos on flat sections', action: 'Inspection + plan for replacement in 2–4 years', cost: '$10,000–$20,000′ },
    electrical: { status: '🔴', summary: 'Aluminum wiring still common, FPE Stab-Lok panels peak era', action: 'Panel inspection — replace if FPE', cost: '$4,500–$12,000′ },
    plumbing: { status: '🟠', summary: 'Copper supply with aging galvanized drains, sewer line risk', action: 'Camera sewer, plan drain repipe', cost: '$4,000–$12,000′ },
    hvac: { status: '🔴', summary: 'R-22 systems at end of life, possible no central AC', action: 'Replace system + ductwork', cost: '$6,500–$15,000′ },
    foundation: { status: '🟠', summary: 'Conventional slab, 50+ years of clay movement', action: 'Annual monitoring + evaluation', cost: '$0–$20,000′ },
    totalLow: 25000,
    totalHigh: 79000,
  },
  '1980s': {
    roof: { status: '🟠', summary: 'Aging architectural shingles, possible prior hail claims', action: 'Inspection — plan replacement within 5 years', cost: '$10,000–$20,000′ },
    electrical: { status: '🔴', summary: 'FPE Stab-Lok panels peak era — replace immediately', action: 'Panel replacement required', cost: '$2,500–$6,500′ },
    plumbing: { status: '🔴', summary: 'Polybutylene (PB) pipe — class-action material, known to fail', action: 'Full PEX repipe immediately', cost: '$4,000–$10,000′ },
    hvac: { status: '🟠', summary: 'R-22 systems, 35+ years old — past end of life', action: 'Replace within 1–2 years', cost: '$5,500–$12,000′ },
    foundation: { status: '🟡', summary: 'Post-tension slab — better design but inspect cable anchors', action: 'PT anchor inspection + monitoring', cost: '$0–$15,000′ },
    totalLow: 22000,
    totalHigh: 63500,
  },
  '1990s': {
    roof: { status: '🟡', summary: 'First-gen architectural shingles at end of 20–30 year life', action: 'Plan replacement within 5 years', cost: '$9,000–$17,000′ },
    electrical: { status: '🟡', summary: 'Mostly safe — check GFCI completeness and panel capacity', action: 'GFCI/AFCI upgrades', cost: '$500–$2,500′ },
    plumbing: { status: '🔴', summary: 'Polybutylene still possible through 1995. CPVC if not PB.', action: 'Identify pipe material immediately', cost: '$0–$10,000′ },
    hvac: { status: '🟡', summary: 'First-gen R-410A or late R-22 — 25–35 years old', action: 'Plan replacement within 5 years', cost: '$4,500–$10,000′ },
    foundation: { status: '🟡', summary: 'Engineered PT slab — good design, monitor for clay movement', action: 'Annual monitoring, consistent irrigation', cost: '$0–$10,000′ },
    totalLow: 14000,
    totalHigh: 50000,
  },
  '2000s': {
    roof: { status: '🟢', summary: 'Architectural shingles, mid-lifecycle — check for hail damage', action: 'Inspection if no recent claim', cost: '$0–$5,000 repairs' },
    electrical: { status: '🟢', summary: 'Modern copper, 200A service — check AFCI gaps', action: 'AFCI completion if missing', cost: '$300–$1,500′ },
    plumbing: { status: '🟡', summary: 'CPVC supply — watch for brittleness, 2021 freeze damage', action: 'Inspection for freeze damage + joint integrity', cost: '$0–$3,000′ },
    hvac: { status: '🟡', summary: 'R-410A systems, 15–25 years old — mid-to-end of lifecycle', action: 'Annual maintenance, budget for replacement', cost: '$3,500–$9,000′ },
    foundation: { status: '🟢', summary: 'Modern PT slab — maintain irrigation, monitor during droughts', action: 'Irrigation system check', cost: '$0–$5,000′ },
    totalLow: 3800,
    totalHigh: 23500,
  },
  '2010s': {
    roof: { status: '🟢', summary: 'Higher-grade shingles, good condition — check for hail', action: 'Routine inspection every 3 years', cost: '$0–$3,000′ },
    electrical: { status: '🟢', summary: 'Modern, safe — verify AFCI and capacity for EV', action: 'EV charger capacity check', cost: '$0–$1,500′ },
    plumbing: { status: '✅', summary: 'PEX standard — low risk, confirm manifold location', action: 'Water heater age check', cost: '$0–$2,000′ },
    hvac: { status: '🟢', summary: 'R-410A, 10–15 years — monitor, maintain, plan ahead', action: 'Annual maintenance plan', cost: '$300–$600/year' },
    foundation: { status: '🟢', summary: 'Best-era PT slab — maintain irrigation, drought monitoring', action: 'Consistent irrigation program', cost: '$0–$2,000′ },
    totalLow: 300,
    totalHigh: 9100,
  },
  '2020s': {
    roof: { status: '✅', summary: 'New — verify warranty registration and storm damage', action: 'Register warranty, annual visual check', cost: '$0–$2,000′ },
    electrical: { status: '✅', summary: 'Modern, solar-ready — verify EV and solar capacity', action: 'Confirm as-built specs', cost: '$0–$1,000′ },
    plumbing: { status: '✅', summary: 'PEX throughout — low risk, new water heater', action: 'Confirm warranty and manifold labeling', cost: '$0–$500′ },
    hvac: { status: '✅', summary: 'New system — maintenance plan for longevity', action: 'Maintenance plan + warranty registration', cost: '$200–$400/year' },
    foundation: { status: '✅', summary: 'Advanced PT engineering — builder warranty active', action: 'Document cracks, file warranty if needed', cost: '$0–$2,000′ },
    totalLow: 200,
    totalHigh: 5900,
  },
};

const systems = ['roof', 'electrical', 'plumbing', 'hvac', 'foundation'] as const;
const systemLabels: Record<typeof systems[number], string> = {
  roof: '🏠 Roof',
  electrical: '⚡ Electrical',
  plumbing: '🚿 Plumbing',
  hvac: '❄️ HVAC',
  foundation: '🏗️ Foundation',
};

export default function DFWDecadeHomeSummary() {
  const [decade, setDecade] = useState<string | null>(null);
  const data = decade ? decadeData[decade] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>📋 DFW Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Home by Decade — Complete Summary</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, fontSize: 15 }}>The ultimate DFW homeowner guide. Select your home's decade for a full snapshot of all 5 major systems, priority actions, and 5-year capital budget estimate.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
          {Object.keys(decadeData).map((d) => (
            <button key={d} onClick={() => setDecade(d === decade ? null : d)}
              style={{ padding: '10px 20px', borderRadius: 8, border: `2px solid ${decade === d ? '#F5E642' : '#1E3A5F'}`, background: decade === d ? '#F5E642′ : '#0F2645', color: decade === d ? '#0A1628' : '#E8EAF0', fontWeight: 700, cursor: ’pointer', fontSize: 14 }}>
              {d}
            </button>
          ))}
        </div>
        {data && (
          <div>
            <div style={{ background: '#0F2645', borderRadius: 12, padding: 20, border: '2px solid #F5E642', marginBottom: 24 }}>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{decade} Home — DFW Health Report</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>Estimated 5-Year Capital Budget</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#F5E642', marginTop: 4 }}>
                ${data.totalLow.toLocaleString()} – ${data.totalHigh.toLocaleString()}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              {systems.map((sys) => {
                const s = data[sys];
                return (
                  <div key={sys} style={{ background: '#0F2645', borderRadius: 10, padding: 20, border: '1px solid #1E3A5F' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div style={{ fontWeight: 800, fontSize: 16 }}>{systemLabels[sys]}</div>
                      <div style={{ fontSize: 20 }}>{s.status}</div>
                    </div>
                    <div style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 8 }}>{s.summary}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                      <div style={{ fontSize: 13, color: '#F5E642′ }}>⚡ {s.action}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#94A3B8′ }}>💰 {s.cost}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ background: '#162035', borderRadius: 10, padding: 20, border: '1px solid #1E3A5F', marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8, fontSize: 15 }}>🎯 Priority Action List for {decade} DFW Homes:</div>
              {systems.filter(s => ['🔴', '🟠'].includes(data[s].status)).map(s => (
                <div key={s} style={{ marginBottom: 6, paddingLeft: 12, fontSize: 14 }}>• {systemLabels[s]}: {data[s].action}</div>
              ))}
              {systems.filter(s => ['🔴', '🟠'].includes(data[s].status)).length === 0 && (
                <div style={{ fontSize: 14, color: '#94A3B8′ }}>✅ No urgent items — focus on routine maintenance and monitoring.</div>
              )}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, fontSize: 13, color: '#64748B', textAlign: 'center' }}>
              This is a general guide based on DFW construction patterns by decade. Always get licensed professional inspections for your specific home. Costs are DFW market estimates for 2025–2026.
            </div>
          </div>
        )}
        {!data && (
          <div style={{ color: '#4A6080', textAlign: 'center', padding: 60, fontSize: 16 }}>
            👆 Select your home's decade above to generate your complete DFW home health report
          </div>
        )}
      </div>
    </div>
  );
}
