import { useState } from 'react';

const homeAges = ['Built 1960–1975', 'Built 1976–1990', 'Built 1991–2005', 'Built 2006–2020', 'Built after 2020'];

interface PlumbingRisk {
  issues: string[];
  costs: string[];
  urgency: string;
  color: string;
}

function getPlumbingRisks(age: string): PlumbingRisk {
  if (age === 'Built 1960–1975') return {
    issues: ['Cast iron drain lines deteriorating', 'Galvanized steel supply pipes (corroding)', 'No sewer cleanout access', 'Lake-area water pressure fluctuations stressing old joints'],
    costs: ['Sewer line camera inspection: $200–$400', 'Galvanized repipe (full home): $8,000–$18,000', 'Slab leak detection: $300–$600', 'Slab leak repair: $2,500–$6,000'],
    urgency: 'High — Schedule Inspection Now',
    color: '#ef4444'
  };
  if (age === 'Built 1976–1990') return {
    issues: ['Polybutylene pipes (recall risk — gray flexible plastic)', 'Aging water heaters (likely original or replaced once)', 'Slab movement from Lewisville clay soil causing pipe stress', 'Corroding shutoff valves'],
    costs: ['Polybutylene repipe: $4,000–$12,000', 'Water heater replace: $900–$1,800', 'Slab leak repair: $2,500–$6,000', 'Shutoff valve replacement: $150–$400/valve'],
    urgency: 'High — Check for Poly-B Pipes',
    color: '#f97316'
  };
  if (age === 'Built 1991–2005') return {
    issues: ['CPVC plastic supply lines becoming brittle', 'First-generation water heaters needing replacement', 'Lake Lewisville pressure zone fluctuations stressing fittings', 'Slow drains from buildup in older lines'],
    costs: ['CPVC spot repairs: $300–$800', 'Water heater replace: $900–$1,800', 'Drain cleaning (hydro-jet): $350–$700', 'Full repipe (if needed): $5,000–$12,000'],
    urgency: 'Moderate — Inspect Within 6 Months',
    color: '#F5E642'
  };
  if (age === 'Built 2006–2020') return {
    issues: ['PEX plumbing generally solid', 'Check water heater age (15 yr lifespan)', 'Verify pressure regulator is functioning', 'Lake-adjacent homes: check for humidity-related joint issues'],
    costs: ['Water heater replace: $900–$1,800', 'Pressure regulator replace: $250–$500', 'Annual plumbing inspection: $150–$300', 'Tankless upgrade: $2,500–$4,500'],
    urgency: 'Low — Routine Maintenance',
    color: '#22c55e'
  };
  return {
    issues: ['PEX or copper — modern and reliable', 'Focus on fixture quality and proper venting', 'Ensure builder plumbing was inspected and permitted', 'Lake Lewisville area: install whole-home filter if on well'],
    costs: ['New construction inspection: $200–$400', 'Whole-home water filter: $800–$2,000', 'Fixture upgrades: $200–$800 each', 'Softener system: $1,200–$3,000'],
    urgency: 'Minimal — New Construction',
    color: '#22c55e'
  };
}

export default function DFWPlumberLewisville() {
  const [homeAge, setHomeAge] = useState('');
  const result = homeAge ? getPlumbingRisks(homeAge) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
            🌊 Lewisville, TX
          </span>
        </div>

        <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
          Lewisville TX Plumbers —{' '}
          <span style={{ color: '#F5E642′ }}>Lake Lewisville Area Specialists</span>
        </h1>

        <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.7, marginBottom: 40, maxWidth: 700 }}>
          Lewisville is one of DFW's older suburbs — with a large housing stock from the 1970s-1990s that comes with
          specific plumbing risks. Lake proximity, clay soil slab movement, and aging pipe materials make Lewisville
          plumbing jobs unique.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '🔍', title: 'Slab Leak Specialists', desc: 'Lewisville clay soil shifts seasonally, stressing slab-embedded pipes. Electronic leak detection finds problems before floors crack.' },
            { icon: '🚿', title: 'Polybutylene Repipe Experts', desc: 'Homes built 1978-1995 may have gray poly-b pipes subject to recall. We repipe with modern PEX — fast, clean, permitted.' },
            { icon: '💧', title: 'Lake Pressure Zone Pros', desc: 'Lake Lewisville area water pressure fluctuates. Pressure regulators, expansion tanks, and PRV replacements are our specialty.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#111f3a', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>{card.title}</h3>
              <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 16, padding: 36, border: '1px solid #1e3a5f', marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>🏠 Home Age Plumbing Risk Finder</h2>
          <p style={{ color: '#94a3b8', marginBottom: 28 }}>
            Select when your Lewisville home was built — we will show you the most likely plumbing issues and cost ranges.
          </p>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#F5E642′ }}>
              When was your home built?
            </label>
            <select
              value={homeAge}
              onChange={e => setHomeAge(e.target.value)}
              style={{ width: '100%', maxWidth: 360, padding: '12px 16px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: 'white', fontSize: 15 }}
            >
              <option value="">Select build era...</option>
              {homeAges.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 4 }}>URGENCY</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: result.color, marginBottom: 16 }}>{result.urgency}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>LIKELY ISSUES</div>
                  {result.issues.map(issue => (
                    <div key={issue} style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #1e3a5f' }}>
                      {issue}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>TYPICAL COSTS</div>
                  {result.costs.map(cost => (
                    <div key={cost} style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #1e3a5f' }}>
                      {cost}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0d2240', borderRadius: 12, padding: 20, marginBottom: 48, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>💧 Lewisville Slab Leak Alert:</span> Homes in the
            Highlands, Castle Hills, and Old Town areas sit on expansive clay soil that shrinks 4-6 inches seasonally.
            This puts constant stress on slab-embedded copper pipes. Signs: warm spots on floors, high water bills,
            foundation cracks, damp carpet.
          </p>
        </div>

        <div style={{ textAlign: 'center', background: '#111f3a', borderRadius: 16, padding: 40, border: '2px solid #F5E642′ }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔧</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Get Lewisville Plumber Quotes Today</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>ProLnk matches you with licensed Lewisville plumbers. Get 3 quotes — fast, free, no commitment.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', padding: '16px 40px', borderRadius: 10, fontWeight: 800, fontSize: 17, border: 'none', cursor: 'pointer' }}>
            Get Free Quotes
          </button>
        </div>

      </div>
    </div>
  );
}
