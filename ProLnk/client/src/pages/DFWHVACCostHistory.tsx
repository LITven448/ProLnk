import { useState } from 'react';

type ProjectType = 'filter' | 'tune' | 'refrigerant' | 'condenser' | 'handler' | 'fullsystem' | 'ductwork';

interface CostData {
  label: string;
  y2019: string;
  y2022: string;
  y2026: string;
  drivers: string;
  current: string;
}

const costs: Record<ProjectType, CostData> = {
  filter: { label: '🌀 Filter Replacement (DIY)', y2019: '$8–$18', y2022: '$12–$24', y2026: '$18–$38', drivers: 'Supply chain disruptions raised material costs. MERV 11+ filters now standard due to air quality awareness.', current: '$18–$38 for MERV 11, replaced every 1–3 months in DFW.' },
  tune: { label: '🔧 Annual HVAC Tune-Up', y2019: '$79–$119', y2022: '$99–$149', y2026: '$129–$189', drivers: 'Labor costs up 35% since 2019. Technician shortage drives rates. DFW market competitive but labor scarcity is real.', current: '$129–$189 for full seasonal tune-up in DFW suburbs.' },
  refrigerant: { label: '❄️ Refrigerant Recharge (R-410A)', y2019: '$150–$300', y2022: '$250–$500', y2026: '$350–$800', drivers: 'R-410A phaseout began Jan 2025. Stock is limited. Transition to R-454B adds cost. DFW heat means high-use systems need recharge more often.', current: '$350–$800 depending on system size. R-22 systems: $1,200–$2,500 if any remain.' },
  condenser: { label: '🏗️ Condenser Unit Replacement', y2019: '$1,800–$3,200', y2022: '$2,400–$4,500', y2026: '$3,200–$6,500', drivers: 'Steel and copper prices up 40–60%. New efficiency standards (SEER2 min 15 in South) add $400–$800 per unit. Labor up 35%.', current: '$3,200–$6,500 installed in DFW. High-efficiency (18+ SEER2): $5,000–$9,000.' },
  handler: { label: '💨 Air Handler Replacement', y2019: '$1,200–$2,200', y2022: '$1,600–$3,000', y2026: '$2,200–$4,500', drivers: 'Variable-speed motors now standard in many units. Electronics costs up 50% post-2021. Labor rates climbed 35%.', current: '$2,200–$4,500 installed. Variable speed: $3,500–$6,000.' },
  fullsystem: { label: '🏠 Full System Replacement (2–3 ton)', y2019: '$4,500–$7,500', y2022: '$6,000–$10,000', y2026: '$8,000–$16,000', drivers: 'New SEER2 standards, refrigerant transition, steel prices, and labor shortages compound. DFW installs often include duct inspection/seal ($500–$2,000 added).', current: '$8,000–$16,000 for 2–3 ton in DFW. Add 20–30% for 4–5 ton systems.' },
  ductwork: { label: '🪩 Ductwork Seal/Replace', y2019: '$300–$1,500', y2022: '$500–$2,500', y2026: '$800–$4,500', drivers: 'Aeroseal became standard. Labor rates up. DFW homes average 25–35% duct leakage — remediation now a separate billable scope.', current: '$800–$4,500 depending on extent. Aeroseal full house: $1,500–$3,500.' },
};

export default function DFWHVACCostHistory() {
  const [project, setProject] = useState<ProjectType | null>(null);

  const data = project ? costs[project] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>DFW HVAC Guide</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>📈 DFW HVAC Cost History</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW HVAC costs have risen 60–120% since 2019. Here's what's driving it — and what you should expect to pay today.
        </p>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 10 }}>Select your DFW project type:</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {(Object.entries(costs) as [ProjectType, CostData][]).map(([k, v]) => (
              <button key={k} onClick={() => setProject(k)} style={{ padding: '8px 14px', borderRadius: 8, border: `2px solid ${project === k ? '#F5E642' : '#1e3a5f'}`, background: project === k ? '#F5E642' : 'transparent', color: project === k ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{v.label}</button>
            ))}
          </div>
        </div>

        {data ? (
          <>
            <div style={{ background: '#0f2236', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>📊 Cost Comparison — {data.label}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
                {[['2019', data.y2019, '#94a3b8'], ['2022', data.y2022, '#38bdf8'], ['2026', data.y2026, '#F5E642']].map(([year, cost, color]) => (
                  <div key={year} style={{ background: '#0A1628', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                    <div style={{ color: color as string, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{year}</div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{cost}</div>
                  </div>
                ))}
              </div>
              <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>What's driving increases: </span>{data.drivers}
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, color: '#cbd5e1', fontSize: 14 }}>
                <span style={{ color: '#F5E642', fontWeight: 600 }}>Current DFW estimate: </span>{data.current}
              </div>
            </div>
          </>
        ) : (
          <div style={{ background: '#0f2236', borderRadius: 12, padding: 32, textAlign: 'center', color: '#94a3b8' }}>Select a project type to see cost history</div>
        )}

        <div style={{ marginTop: 32, background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628', fontWeight: 600, textAlign: 'center' }}>
          🔧 Get competitive DFW HVAC quotes — ProLnk matches you with vetted local pros.
        </div>
      </div>
    </div>
  );
}
