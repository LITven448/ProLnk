import { useState } from 'react';

const profiles = [
  { lot: 'Under 6,000 sq ft', system: 'Basic 6-zone', controller: 'Rachio 3 (8-zone)', cost: '$229', savings: '20–25% water savings', rebate: 'Up to $100 rebate — check city of Dallas/Plano/Frisco portals', note: 'Rachio works out of box — skip pro install for basic setups' },
  { lot: '6,000–12,000 sq ft', system: 'Mid 8–12 zone', controller: 'RainBird ST8 Smart', cost: '$179', savings: '25–30% savings', rebate: 'Check Denton/McKinney rebate programs (varies by year)', note: 'RainBird integrates with existing RainBird heads — easiest upgrade path' },
  { lot: '12,000–20,000 sq ft', system: 'Large 12–16 zone', controller: 'Rachio 3 16-zone', cost: '$299', savings: '28–35% savings', rebate: 'Fort Worth Water rebates up to $150 for smart controllers', note: 'Weather-skip alone saves 4–6 watering cycles per month in DFW spring' },
  { lot: 'Over 20,000 sq ft / Estate', system: 'Multi-controller', controller: 'Hunter HC or Rachio Pro', cost: '$500+', savings: '30–40% savings + ERCOT rate scheduling', rebate: 'Commercial rebates available — ProLnk installers can file paperwork', note: 'ERCOT time-of-use pricing rewards watering at 2–5AM — smart controllers automate this' },
];

export default function DFWSmartIrrigationGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const rec = selected !== null ? profiles[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>🌿</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW Smart Irrigation Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Rachio vs RainBird + ERCOT scheduling — cut your water bill 30%</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '💧', label: 'Weather-skip savings', value: '30% water use', sub: 'vs standard timer' },
            { icon: '⚡', label: 'ERCOT off-peak', value: '2–5AM window', sub: 'Lowest rate period' },
            { icon: '🏙️', label: 'City rebates', value: '$50–$200', sub: 'DFW municipalities' },
          ].map(s => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 10, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{s.value}</div>
              <div style={{ color: '#cbd5e1', fontSize: 12 }}>{s.label}</div>
              <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 10 }}>🌦️ DFW-Specific Smart Features to Enable</h2>
          <ul style={{ paddingLeft: 18, margin: 0, color: '#cbd5e1', fontSize: 14, lineHeight: 1.9 }}>
            <li>Weather intelligence skip — NWS data integration skips after measurable rain</li>
            <li>ET (evapotranspiration) scheduling — adjusts for DFW clay soil moisture retention</li>
            <li>ERCOT time-of-use scheduling — pump during 2–5AM off-peak hours</li>
            <li>Freeze protection — pauses when temps drop below 35°F (DFW winters)</li>
            <li>Flow monitoring — detects broken heads wasting water mid-cycle</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏡 What's your lot size?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {profiles.map((p, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? '#F5E642′ : '#1e3a5f', color: selected === i ? '#0A1628' : '#e2e8f0', border: ’none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {p.lot} ({p.system})
              </button>
            ))}
          </div>
          {rec && (
            <div style={{ marginTop: 14, background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Recommended: {rec.controller} — {rec.cost}</div>
              <div style={{ fontSize: 13, color: '#cbd5e1', marginBottom: 4 }}>Expected savings: {rec.savings}</div>
              <div style={{ fontSize: 13, color: '#22c55e', marginBottom: 4 }}>🏷️ Rebate: {rec.rebate}</div>
              <div style={{ fontSize: 12, color: '#94a3b8′ }}>💡 {rec.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 20, marginBottom: 6 }}>🔗</div>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>ProLnk connects DFW homeowners with certified irrigation pros</div>
          <div style={{ color: '#1a2f4a', fontSize: 13, marginTop: 4 }}>Smart controller install + rebate filing — vetted pros, transparent pricing</div>
        </div>
      </div>
    </div>
  );
}
