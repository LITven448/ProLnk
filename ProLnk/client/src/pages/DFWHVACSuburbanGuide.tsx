import { useState } from 'react';

const suburbs = [
  {
    name: 'Frisco / Prosper',
    era: '2000s–present',
    size: '2,800–4,500 sq ft',
    profile: 'Newer construction with better insulation, proper load calculations, and energy-efficient systems',
    systems: '2–3 ton systems, often 2-stage or variable speed',
    ducts: 'Properly sized flex duct or hybrid systems',
    issues: ['Builder-grade equipment that lasts 10–12 years', 'HOA restrictions on equipment placement', 'Rapid growth straining utility infrastructure'],
    expect: 'Lower operating costs, fewer emergency calls, but watch for builder-grade shortcuts',
    accent: '#22c55e',
  },
  {
    name: 'Plano / Allen',
    era: '1980s–2000s',
    size: '1,800–3,200 sq ft',
    profile: 'Mix of eras — some well-maintained older systems, some updated homes with modern equipment',
    systems: '3–5 ton systems, single-stage common',
    ducts: 'Mix of metal trunk-and-branch and flex duct',
    issues: ['Aging R-22 systems still running', 'Duct leakage in attic adds cooling load', 'Pool homes with added heat gain'],
    expect: 'Likely one major system replacement in next 5 years; duct inspection recommended',
    accent: '#f59e0b',
  },
  {
    name: 'Garland / Mesquite',
    era: '1960s–1980s',
    size: '1,200–2,200 sq ft',
    profile: 'Older homes with original undersized ductwork designed for window units, now running central HVAC',
    systems: '3–5 ton units oversized to compensate for duct losses',
    ducts: 'Undersized metal ducts, multiple flex extensions, high static pressure',
    issues: ['Short-cycling due to oversized equipment', 'Hot/cold rooms from poor duct balance', 'Attic insulation below R-30', 'Electrical panels near capacity'],
    expect: 'Higher bills, frequent repairs; duct replacement often more cost-effective than repeated patches',
    accent: '#ef4444',
  },
  {
    name: 'Irving / Grand Prairie',
    era: '1970s–1990s',
    size: '1,400–2,600 sq ft',
    profile: 'Transitional era homes — some updated, some still on original systems',
    systems: '3–4 ton, single-stage common',
    ducts: 'Often original undersized trunk-and-branch',
    issues: ['R-22 refrigerant phase-out impact', 'Foundation movement cracking duct connections', 'High humidity in low-lying areas'],
    expect: 'Budget for R-410A conversion or full replacement; check duct integrity at crawlspace connections',
    accent: '#a855f7',
  },
];

export default function DFWHVACSuburbanGuide() {
  const [selected, setSelected] = useState(suburbs[0]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏘️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW HVAC by Suburb</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>
            HVAC needs vary dramatically across DFW. Select your suburb to understand your home's typical profile and common issues.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          {suburbs.map(s => (
            <button
              key={s.name}
              onClick={() => setSelected(s)}
              style={{
                padding: '10px 20px', borderRadius: 8, border: `2px solid ${selected.name === s.name ? '#F5E642' : '#1e3a5f'}`,
                background: selected.name === s.name ? '#F5E642′ : '#0d2137', color: selected.name === s.name ? '#0A1628' : '#94a3b8',
                fontWeight: 600, cursor: 'pointer', fontSize: 14,
              }}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div style={{ background: '#0d2137', borderRadius: 12, padding: 28, border: `2px solid ${selected.accent}`, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{selected.name}</h2>
              <p style={{ color: '#94a3b8', fontSize: 14 }}>Era: {selected.era} · Typical Size: {selected.size}</p>
            </div>
            <div style={{ background: selected.accent + '22', border: `1px solid ${selected.accent}`, borderRadius: 8, padding: '8px 16px', display: 'flex', alignItems: 'center' }}>
              <span style={{ color: selected.accent, fontWeight: 700, fontSize: 13 }}>Typical Systems: {selected.systems}</span>
            </div>
          </div>

          <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: 20 }}>{selected.profile}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>⚠️ Common Issues</p>
              {selected.issues.map((issue, i) => (
                <p key={i} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>• {issue}</p>
              ))}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>🔧 Ductwork</p>
              <p style={{ color: '#94a3b8', fontSize: 13 }}>{selected.ducts}</p>
            </div>
          </div>

          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: `4px solid #F5E642` }}>
            <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 14 }}>💡 What to Expect</p>
            <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{selected.expect}</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '20px', background: '#0d2137', borderRadius: 12, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Get a free HVAC assessment from a DFW-certified pro</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get Free Assessment
          </button>
        </div>
      </div>
    </div>
  );
}