import { useState } from 'react';

const trades = {
  hvac: {
    label: 'HVAC Tech',
    tools: ['Manifold gauge set ($300-800)', 'Refrigerant recovery machine ($600-1200)', 'Vacuum pump ($150-400)', 'Digital multimeter ($80-200)', 'Leak detector ($200-500)', 'Torch kit ($150-300)', 'Pipe cutter set ($40-100)', 'Drill/driver combo ($150-300)'],
    starter: 4500,
    experienced: 12000,
    financing: ['Snap Finance (no credit check)', 'HD Supply credit line', 'Ferguson 90-day terms'],
    rentWorthy: ['Duct blaster for energy audits', 'Combustion analyzer for commercial', 'Coil fin straightener'],
    insurance: 'Tool floater: $200-400/yr for $10K coverage'
  },
  plumber: {
    label: 'Plumber',
    tools: ['PEX crimper kit ($200-500)', 'Press tool (Milwaukee/Ridgid) ($800-2000)', 'Drain snake/auger ($300-800)', 'Pipe wrench set ($80-200)', 'Torch/soldering kit ($100-250)', 'Camera inspection ($1500-4000)', 'Copper cutter set ($40-80)', 'Reciprocating saw ($150-300)'],
    starter: 5500,
    experienced: 18000,
    financing: ['Ferguson Waterworks credit', 'HD Pro credit (6 mo no interest)', 'Sunbelt tool lease program'],
    rentWorthy: ['Sewer jetter for major clogs', 'Pipe locator/detector', 'Hydrostatic testing pump'],
    insurance: 'Tool floater: $250-500/yr for $15K coverage'
  },
  electrician: {
    label: 'Electrician',
    tools: ['Fluke multimeter 115+ ($150-350)', 'Non-contact voltage tester ($30-80)', 'Wire stripper set ($40-100)', 'Conduit bender ($60-200)', 'Fish tape ($60-150)', 'Drill with spade bits ($200-400)', 'Panel schedule kit ($50-100)', 'Circuit tracer ($200-500)'],
    starter: 3500,
    experienced: 9000,
    financing: ['Graybar credit account', 'HD Pro 12-mo financing', 'Snap Finance for equipment'],
    rentWorthy: ['Thermal imaging camera for panel inspections', 'Lift for high-ceiling work', 'Large wire pull equipment'],
    insurance: 'Tool floater: $200-350/yr for $8K coverage'
  },
  roofer: {
    label: 'Roofer',
    tools: ['Framing nailer ($250-500)', 'Roofing nailer (coil) ($300-600)', 'Compressor (6-gal portable) ($150-350)', 'Safety harness system ($200-400)', 'Roofing knife set ($30-80)', 'Pry bar/shingle shovel ($40-100)', 'Chalk line ($20-40)', 'Ladder system 28ft ($200-400)'],
    starter: 3000,
    experienced: 8000,
    financing: ['ABC Supply trade credit (net 30)', 'HD Pro revolving credit', 'ToolBX rental-to-own'],
    rentWorthy: ['Forklift for large material delivery', 'Tear-off machine for big jobs', 'Metal roller for standing seam'],
    insurance: 'Tool floater: $150-300/yr for $6K coverage'
  }
};

const levels = { new: 'New (0-2 yrs)', mid: 'Mid (3-7 yrs)', senior: 'Senior (8+ yrs)' };
const levelMultiplier = { new: 1, mid: 1.4, senior: 1.8 };

export default function DFWTradeToolsGuide() {
  const [trade, setTrade] = useState('');
  const [level, setLevel] = useState('');
  const selected = trade ? trades[trade as keyof typeof trades] : null;
  const investment = selected && level
    ? Math.round(selected.starter * levelMultiplier[level as keyof typeof levelMultiplier] / 500) * 500
    : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>🔧 PROLNK DFW PRO RESOURCE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DFW Trade Tools Guide</h1>
        <p style={{ color: '#94a3b8', margin: '0 0 32px', lineHeight: 1.6 }}>The right tools mean faster jobs, happier DFW homeowners, and higher ratings on ProLnk. Don't underbid your equipment — it's your business infrastructure.</p>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 18 }}>🎯 Find Your Essential Tool List</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            {Object.entries(trades).map(([k, v]) => (
              <button key={k} onClick={() => setTrade(k)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: trade === k ? '#F5E642' : '#1e3a5f', background: trade === k ? '#F5E642' : 'transparent', color: trade === k ? '#0A1628' : '#fff', fontWeight: 700, cursor: 'pointer' }}>{v.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {Object.entries(levels).map(([k, v]) => (
              <button key={k} onClick={() => setLevel(k)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: level === k ? '#F5E642' : '#1e3a5f', background: level === k ? '#F5E642' : 'transparent', color: level === k ? '#0A1628' : '#fff', fontWeight: 700, cursor: 'pointer' }}>{v}</button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 12px' }}>🛠️ Essential Tools — {selected.label}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {selected.tools.map((t, i) => <div key={i} style={{ background: '#0A1628', borderRadius: 6, padding: '8px 12px', fontSize: 14, color: '#cbd5e1' }}>✅ {t}</div>)}
              </div>
            </div>
            {investment && (
              <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24 }}>
                <h3 style={{ color: '#F5E642', margin: '0 0 12px' }}>💰 Investment Estimate for Your Level</h3>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>${investment.toLocaleString()}</div>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: 14 }}>Typical starting investment for a {levels[level as keyof typeof levels]} {selected.label} in DFW</p>
              </div>
            )}
            <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 12px' }}>💳 Financing Options</h3>
              {selected.financing.map((f, i) => <div key={i} style={{ padding: '8px 0', borderBottom: i < selected.financing.length - 1 ? '1px solid #1e3a5f' : 'none', color: '#cbd5e1', fontSize: 14 }}>→ {f}</div>)}
            </div>
            <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 12px' }}>🏪 Rent These — Don't Buy Yet</h3>
              {selected.rentWorthy.map((r, i) => <div key={i} style={{ padding: '6px 0', color: '#94a3b8', fontSize: 14 }}>🔄 {r}</div>)}
              <div style={{ marginTop: 16, padding: 12, background: '#0A1628', borderRadius: 8, fontSize: 13, color: '#64748b' }}>💡 {selected.insurance}</div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, padding: 24, background: 'linear-gradient(135deg, #1a2f5a, #0F1F3D)', borderRadius: 12, border: '1px solid #F5E642' }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 8px' }}>📋 ProLnk Tool Requirement</h3>
          <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14, lineHeight: 1.6 }}>ProLnk pros must arrive to every DFW job fully equipped. Homeowners rate tool readiness — it affects your match priority score. Invest in your tools and protect them — they're what puts you at the top of the feed.</p>
        </div>
      </div>
    </div>
  );
}
