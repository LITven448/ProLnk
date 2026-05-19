import { useState } from 'react';

export default function PipeReplacementGuide() {
  const [yearBuilt, setYearBuilt] = useState('');

  const getPipeInfo = (year: number) => {
    if (year < 1960) return {
      supply: 'Galvanized steel (original)',
      drain: 'Cast iron',
      risk: 'CRITICAL',
      riskColor: '#ef4444',
      action: 'Replace supply lines immediately. Cast iron drains likely failing. Budget $12,000–$18,000 for full repipe.',
      pipeTypes: ['Galvanized steel supply lines', 'Cast iron drain lines'],
    };
    if (year < 1980) return {
      supply: 'Galvanized steel or early copper',
      drain: 'Cast iron',
      risk: 'HIGH',
      riskColor: '#f97316',
      action: 'Inspect supply lines for corrosion. Cast iron drains at 50+ year lifespan. Plan repipe within 2–3 years.',
      pipeTypes: ['Galvanized steel or early copper supply', 'Cast iron drain lines'],
    };
    if (year < 1995) return {
      supply: 'Copper (excellent)',
      drain: 'Cast iron or early PVC',
      risk: 'MODERATE',
      riskColor: '#f59e0b',
      action: 'Copper supply lines are in great shape. Check drain lines — cast iron units may show cracking. No urgent action required.',
      pipeTypes: ['Copper supply lines', 'Cast iron or early PVC drains'],
    };
    if (year < 2010) return {
      supply: 'Copper or PEX',
      drain: 'PVC',
      risk: 'LOW',
      riskColor: '#22c55e',
      action: 'System is mostly sound. Routine inspection every 3–5 years. No major concerns in near term.',
      pipeTypes: ['Copper or PEX supply lines', 'PVC drain lines'],
    };
    return {
      supply: 'PEX (modern)',
      drain: 'PVC or ABS',
      risk: 'MINIMAL',
      riskColor: '#16a34a',
      action: 'Excellent modern plumbing. No action required. Standard maintenance only.',
      pipeTypes: ['PEX supply lines (flexible, durable)', 'PVC or ABS drain lines'],
    };
  };

  const yr = parseInt(yearBuilt);
  const info = !isNaN(yr) && yr >= 1900 && yr <= 2026 ? getPipeInfo(yr) : null;

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#f1f5f9′ }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔧</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
            DFW Pipe Replacement Guide
          </h1>
          <p style={{ fontSize: 20, color: '#94a3b8', maxWidth: 560, margin: '0 auto' }}>
            Know your plumbing before it fails. DFW's hard water and aging housing stock make pipe awareness essential.
          </p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#60a5fa' }}>
            🏗️ DFW Pipe Types by Construction Era
          </h2>
          {[
            { era: 'Pre-1960s', supply: 'Galvanized steel', drain: 'Cast iron', status: '⚠️ REPLACE NOW', color: '#ef4444', note: '50-70 year lifespan expired. Immediate action required.' },
            { era: '1960s–1980s', supply: 'Galvanized steel', drain: 'Cast iron', status: '🔴 HIGH RISK', color: '#f97316', note: '50+ year lifespan ending. Plan repipe within 2–3 years.' },
            { era: '1980s–1995', supply: 'Copper', drain: 'Cast iron or early PVC', status: '🟡 MODERATE', color: '#f59e0b', note: 'Copper supply is excellent. Check drain lines for cracking.' },
            { era: '1995–2010', supply: 'Copper or PEX', drain: 'PVC', status: '🟢 GOOD', color: '#22c55e', note: 'Mostly sound. Routine inspection every 3–5 years.' },
            { era: '2010–Present', supply: 'PEX', drain: 'PVC or ABS', status: '✅ EXCELLENT', color: '#16a34a', note: 'Modern materials. No near-term concerns.' },
          ].map(row => (
            <div key={row.era} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid #334155', alignItems: 'flex-start' }}>
              <div style={{ minWidth: 110, fontWeight: 700, color: '#cbd5e0', fontSize: 14 }}>{row.era}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 4 }}>Supply: <span style={{ color: '#e2e8f0′ }}>{row.supply}</span> · Drain: <span style={{ color: '#e2e8f0' }}>{row.drain}</span></div>
                <div style={{ fontSize: 13, color: '#94a3b8′ }}>{row.note}</div>
              </div>
              <div style={{ color: row.color, fontWeight: 700, fontSize: 13, minWidth: 110, textAlign: 'right' }}>{row.status}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #f97316′ }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: '#fb923c' }}>
            💧 Hard Water Warning for DFW Homes
          </h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            DFW's water supply runs 300–500 PPM hardness — among the highest in Texas. This accelerates galvanized pipe corrosion significantly. Homes with galvanized supply lines may see full failure 5–10 years earlier than national averages suggest. If your home was built before 1975 and hasn’t been repiped, treat it as urgent.
          </p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            🚨 Warning Signs of Failing Pipes
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {[
              { icon: '📉', sign: 'Low water pressure', detail: 'Corrosion builds up inside galvanized pipes, narrowing flow' },
              { icon: '🟤', sign: 'Rust-colored water', detail: 'Brown or orange tint = active galvanized corrosion entering your water' },
              { icon: '💦', sign: 'Multiple leaks', detail: 'Two or more leaks in 12 months = systemic failure, not isolated incidents' },
              { icon: '🔍', sign: 'Visible corrosion', detail: 'Green or white buildup at joints, rust staining on walls or ceilings' },
            ].map(s => (
              <div key={s.sign} style={{ background: '#0f172a', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{s.sign}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{s.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            💰 Repipe Cost Guide — DFW Averages
          </h2>
          {[
            { type: 'Partial repipe (1–2 runs)', low: '$2,000', high: '$8,000′ },
            { type: 'Full supply repipe (typical DFW home)', low: '$7,000', high: '$15,000′ },
            { type: 'Drain line replacement', low: '$3,000', high: '$10,000′ },
            { type: 'Full repipe (supply + drain)', low: '$12,000', high: '$25,000′ },
          ].map(c => (
            <div key={c.type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #334155′ }}>
              <div style={{ color: '#cbd5e0', fontSize: 15 }}>{c.type}</div>
              <div style={{ fontWeight: 700, color: '#60a5fa', fontSize: 15 }}>{c.low} – {c.high}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #3b82f6′ }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: '#60a5fa' }}>
            🤖 TrustyPro Advantage
          </h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            AI photo scanning during routine service visits can detect rust staining, visible corrosion at joints, and moisture damage patterns from slow pipe failures — often before you notice any symptoms. Every TrustyPro visit builds a documented timeline of your plumbing's condition, making insurance claims and contractor conversations easier.
          </p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            🏠 Your Home's Pipe Risk Assessment
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Enter your home's year built:</p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <input
              type="number"
              value={yearBuilt}
              onChange={e => setYearBuilt(e.target.value)}
              placeholder="e.g. 1978″
              style={{ flex: 1, padding: '14px 18px', borderRadius: 10, border: '2px solid #334155', background: '#0f172a', color: '#f1f5f9', fontSize: 18 }}
            />
          </div>
          {info && (
            <div style={{ background: '#0f172a', borderRadius: 12, padding: 24, border: `2px solid ${info.riskColor}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ fontSize: 18, fontWeight: 700 }}>Built {yr} · Likely Pipes</div>
                <div style={{ fontWeight: 800, color: info.riskColor, fontSize: 16 }}>Risk: {info.risk}</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                {info.pipeTypes.map(p => (
                  <div key={p} style={{ color: '#94a3b8', marginBottom: 6, paddingLeft: 16, borderLeft: `3px solid ${info.riskColor}`, lineHeight: 1.5 }}>{p}</div>
                ))}
              </div>
              <div style={{ background: '#1e293b', borderRadius: 10, padding: 16, color: '#e2e8f0', lineHeight: 1.6 }}>
                <strong style={{ color: '#60a5fa' }}>Recommended Action: </strong>{info.action}
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#1e293b', borderRadius: 16, padding: 40 }}>
          <h3 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>
            Get a TrustyPro Plumbing Assessment
          </h3>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>
            AI-assisted inspection identifies corrosion and moisture damage before it becomes a crisis.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#3b82f6', color: '#fff', fontWeight: 700, fontSize: 18, padding: '14px 40px', borderRadius: 50, textDecoration: 'none' }}>
            Join the Waitlist →
          </a>
        </div>

      </div>
    </div>
  );
}
