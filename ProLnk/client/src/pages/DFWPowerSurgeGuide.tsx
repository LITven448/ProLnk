import { useState } from 'react';

type Rec = { protection: string; cost: string; insurance: string; priority: string };

const recs: Record<string, Rec> = {
  hvac_high: {
    protection: 'Whole-Home Surge Suppressor (Square D HOM2175SPA)',
    cost: '$150–$300 installed by electrician',
    insurance: 'Most DFW homeowners policies cover surge damage to HVAC — file within 60 days of event.',
    priority: '🔴 Critical — HVAC boards average $800–$2,000 to replace.',
  },
  electronics_medium: {
    protection: 'Point-of-Use Surge Protectors (Tripp Lite ISOBAR6ULTRA for entertainment center)',
    cost: '$40–$80 per strip',
    insurance: 'Electronics claims often have $500+ deductible — not worth claiming under $1,000.',
    priority: '🟡 Important — TVs, gaming consoles, home theater vulnerable.',
  },
  whole_home_high: {
    protection: 'Whole-Home Suppressor + Point-of-Use combo',
    cost: '$250–$500 total installed',
    insurance: 'Document all electronics serial numbers now — required for surge damage claims.',
    priority: '🔴 Full Protection — two-layer defense against DFW lightning and HVAC cycling.',
  },
  basic_low: {
    protection: 'Basic surge strips for computers and entertainment center',
    cost: '$20–$50',
    insurance: 'Minimal exposure — basic protection is adequate.',
    priority: '🟢 Low Risk — covered with affordable point-of-use protectors.',
  },
};

export default function DFWPowerSurgeGuide() {
  const [concern, setConcern] = useState('');
  const [exposure, setExposure] = useState('');
  const [result, setResult] = useState<null | Rec>(null);

  function assess() {
    if (!concern || !exposure) return;
    const key = `${concern}_${exposure}`;
    setResult(recs[key] ?? recs['basic_low']);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>⚡ DFW Power Surge Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW averages 50+ thunderstorm days per year and has one of the highest lightning strike densities in Texas. Your home electronics — especially your HVAC — are at risk.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🌩️ DFW Surge Sources</div>
          {[
            ['⚡ Lightning Strikes', 'DFW\’s open prairie geography + flat terrain = frequent direct and nearby strikes.'],
            ['🔄 HVAC Cycling', 'Your AC compressor creates small surges every time it starts/stops — 20+ times daily in summer.'],
            ['🔌 Utility Grid Events', 'Oncor switching events during storms send transient surges through neighborhood lines.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ marginBottom: '0.75rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🏆 DFW #1 Surge Victim: HVAC Control Boards</div>
          <div style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            HVAC control boards are the most common expensive surge casualty in DFW homes. A single nearby lightning strike can destroy a $1,200 board. A whole-home surge suppressor at the panel is the only real protection.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {[['🏠 HVAC Board', '$800–$2,000'], ['📺 Smart TV', '$400–$1,500'], ['🖥️ Computer', '$500–$2,000'], ['🍳 Smart Appliances', '$300–$800']].map(([item, cost]) => (
              <div key={item as string} style={{ background: '#1e3a5f', borderRadius: 8, padding: '0.5rem 0.75rem' }}>
                <div style={{ color: '#cbd5e1′ }}>{item}</div>
                <div style={{ color: '#f87171', fontWeight: 700, fontSize: '0.9rem' }}>{cost} to replace</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🧮 Protection Recommendation Tool</div>
          {[
            { label: 'Primary Concern', value: concern, setter: setConcern, options: [['hvac', 'Protect HVAC system'], ['electronics', 'Protect electronics / TV / computers'], ['whole_home', 'Full home protection']] },
            { label: 'DFW Exposure Level', value: exposure, setter: setExposure, options: [['high', 'High (open lot, metal roof, pool, prior surge)'], ['medium', 'Medium (standard suburb lot)'], ['low', 'Low (condo or interior apartment)']] },
          ].map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', marginBottom: '0.4rem' }}>{label}</div>
              <select value={value} onChange={e => setter(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #334155′ }}>
                <option value="">Select...</option>
                {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          ))}
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: 'pointer', width: '100%' }}>Get Protection Plan</button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 8, background: '#001a2e', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>{result.priority}</div>
              <div style={{ color: '#cbd5e1', marginBottom: '0.4rem' }}>🛡️ {result.protection}</div>
              <div style={{ color: '#4ade80', marginBottom: '0.4rem' }}>💰 {result.cost}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>📋 Insurance: {result.insurance}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>📋 DFW Insurance Tip</div>
          <div style={{ color: '#94a3b8′ }}>Texas homeowners insurance typically covers sudden surge damage from lightning. HVAC cycling damage (gradual) is usually excluded. After a storm, document and file within 60 days. Keep receipts — adjusters require proof of pre-storm value.</div>
        </div>
      </div>
    </div>
  );
}
