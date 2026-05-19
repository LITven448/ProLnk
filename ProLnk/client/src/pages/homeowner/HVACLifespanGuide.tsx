import { useState } from 'react';

const lifespans = [
  { system: 'Central AC (standard)',  dfwYrs: '12–15 yrs', natYrs: '15–20 yrs', note: 'Compressor is the failure point' },
  { system: 'Heat Pump',              dfwYrs: '12–15 yrs', natYrs: '15–20 yrs', note: 'Dual-function accelerates wear' },
  { system: 'Furnace / Air Handler', dfwYrs: '18–20 yrs', natYrs: '20–25 yrs', note: 'Heat stress is less here' },
  { system: 'Window / Mini-Split',   dfwYrs: '8–12 yrs',  natYrs: '10–15 yrs', note: 'Filter maintenance critical' },
];

export default function HVACLifespanGuide() {
  const [unitAge, setUnitAge]     = useState('');
  const [repairCost, setRepairCost] = useState('');
  const [result, setResult]       = useState('');

  function decide() {
    const age    = parseInt(unitAge)    || 0;
    const repair = parseInt(repairCost) || 0;
    if (!age || !repair) { setResult('Enter both values.'); return; }

    const replaceEstimate = 6500;
    const ratio = repair / replaceEstimate;

    if (age < 8 && ratio < 0.4) {
      setResult('🟢 REPAIR — Unit is relatively young and repair is cost-effective. A well-maintained unit has years of life remaining.');
    } else if (age >= 10 && ratio >= 0.5) {
      setResult('🔴 REPLACE — Unit is over 10 years old and repair cost exceeds 50% of replacement. In DFW heat, this unit is near end-of-life. New SEER2 15 units will also save ~$20–40/mo on energy.');
    } else if (age >= 10 && ratio < 0.5) {
      setResult('🟡 CONSIDER REPLACING — Unit is aging. Repair is affordable now but budget for replacement within 1–3 years. Get an efficiency audit to see if early replacement pays off.');
    } else {
      setResult('🟡 PROBABLY REPAIR — Unit is younger but repair cost is meaningful. Get a second opinion before deciding. Ask the tech about compressor life expectancy specifically.');
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'Inter, sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64B5F6', textTransform: 'uppercase', letterSpacing: 2 }}>DFW Homeowner Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 8, lineHeight: 1.2 }}>
          DFW HVAC Lifespan Guide
        </h1>
        <p style={{ fontSize: 18, color: '#94A3B8', marginBottom: 48 }}>
          When to repair vs. replace — with DFW-specific numbers.
        </p>

        {/* DFW Context Banner */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ background: '#1B2E4A', borderRadius: 12, padding: 24, borderLeft: '4px solid #F59E0B' }}>
            <div style={{ fontWeight: 700, color: '#F59E0B', marginBottom: 8 }}>🌡️ Why DFW Is Harder on HVAC</div>
            <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.8 }}>
              DFW systems run <strong style={{ color: '#FFFFFF' }}>6–7 months of heavy cooling per year</strong> vs. 3–4 months nationally. That's nearly double the annual run time. This cuts expected lifespan by <strong style={{ color: '#F59E0B' }}>20–30%</strong> compared to national averages — meaning a unit rated for 15 years may fail at 10–12 in our climate.
            </p>
          </div>
        </section>

        {/* Lifespan Table */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 20 }}>Average Lifespans in DFW vs. National</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#1E3A5F' }}>
                  <th style={{ textAlign: 'left',  padding: '12px 16px', color: '#64B5F6', fontWeight: 600, fontSize: 13 }}>System</th>
                  <th style={{ textAlign: 'center',padding: '12px 16px', color: '#F59E0B', fontWeight: 600, fontSize: 13 }}>DFW Lifespan</th>
                  <th style={{ textAlign: 'center',padding: '12px 16px', color: '#4ADE80', fontWeight: 600, fontSize: 13 }}>National Avg</th>
                  <th style={{ textAlign: 'left',  padding: '12px 16px', color: '#64B5F6', fontWeight: 600, fontSize: 13 }}>Key Note</th>
                </tr>
              </thead>
              <tbody>
                {lifespans.map((row, i) => (
                  <tr key={row.system} style={{ background: i % 2 === 0 ? '#111E33' : '#0A1628', borderBottom: '1px solid #1E3A5F' }}>
                    <td style={{ padding: '14px 16px', color: '#E8EDF5', fontWeight: 500 }}>{row.system}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center', color: '#F59E0B', fontWeight: 700 }}>{row.dfwYrs}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center', color: '#4ADE80', fontWeight: 700 }}>{row.natYrs}</td>
                    <td style={{ padding: '14px 16px', color: '#94A3B8', fontSize: 13 }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* The Rule */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 16 }}>The Repair vs. Replace Rule</h2>
          <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#4ADE80', marginBottom: 12 }}>
              If repair cost {">"} 50% of replacement AND unit is over 10 years → Replace
            </div>
            <p style={{ color: '#94A3B8', margin: 0, lineHeight: 1.7 }}>
              This rule holds in most cases. A new 3-ton central AC in DFW runs $5,500–8,500 installed. If you're looking at a $3,000+ repair on a 12-year-old unit, you're throwing money at a system that has 2–3 years left.
            </p>
          </div>
        </section>

        {/* SEER2 Note */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 16 }}>SEER2 Efficiency Standards</h2>
          <div style={{ background: '#1B2E4A', borderRadius: 12, padding: 24, borderLeft: '4px solid #1D6FE8' }}>
            <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.8 }}>
              As of 2023, all new AC units sold in Texas must meet <strong style={{ color: '#64B5F6' }}>SEER2 15 minimum</strong> (Climate Zone 4). A 10-year-old unit running SEER 13–14 is about <strong style={{ color: '#4ADE80' }}>20% less efficient</strong> than a new unit. In DFW, where cooling bills run $200–500/mo in summer, that efficiency difference can save <strong style={{ color: '#4ADE80' }}>$40–100/mo</strong> — $480–1,200/year — helping offset replacement cost.
            </p>
          </div>
        </section>

        {/* Decision Tool */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 20 }}>🧮 Repair or Replace?</h2>
          <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Unit Age (years)</label>
                <input
                  type="number" min="0" max="30"
                  value={unitAge}
                  onChange={e => setUnitAge(e.target.value)}
                  placeholder="e.g. 11"
                  style={{ width: '100%', background: '#0A1628', border: '1px solid #2D4A6B', borderRadius: 8, padding: '10px 14px', color: '#FFFFFF', fontSize: 15, boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Repair Quote ($)</label>
                <input
                  type="number" min="0"
                  value={repairCost}
                  onChange={e => setRepairCost(e.target.value)}
                  placeholder="e.g. 2800"
                  style={{ width: '100%', background: '#0A1628', border: '1px solid #2D4A6B', borderRadius: 8, padding: '10px 14px', color: '#FFFFFF', fontSize: 15, boxSizing: 'border-box' }}
                />
              </div>
            </div>
            <button
              onClick={decide}
              style={{ background: '#1D6FE8', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}
            >
              Get Recommendation
            </button>
            {result && (
              <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, color: '#E8EDF5', lineHeight: 1.7 }}>
                {result}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1D6FE8, #0D47A1)', borderRadius: 16, padding: 36, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>❄️</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>Schedule an HVAC Assessment</h3>
          <p style={{ color: '#93C5FD', marginBottom: 24, lineHeight: 1.6 }}>
            Get a licensed DFW HVAC tech to assess your system's actual condition — not just the repair quote — and give you an honest replace/repair recommendation.
          </p>
          <a href="/homeowner/signup" style={{ display: 'inline-block', background: '#F59E0B', color: '#0A1628', fontWeight: 800, borderRadius: 8, padding: '14px 32px', textDecoration: 'none', fontSize: 16 }}>
            Schedule Assessment →
          </a>
        </div>

      </div>
    </div>
  );
}
