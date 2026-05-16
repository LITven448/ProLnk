import { useState } from 'react';

const months = [
  { name: 'January', action: 'Planning month — review last year's lawn, order seed and amendments, sharpen mower blades' },
  { name: 'February', action: 'Apply pre-emergent herbicide for summer weeds (crabgrass, spurge). Target soil temp 50–55°F. Do NOT fertilize yet' },
  { name: 'March', action: 'Bermuda grass waking from dormancy — scalp lawn to 1 inch to remove thatch and jump-start green-up. Begin mowing as needed' },
  { name: 'April', action: 'Prime DFW planting season — annuals, perennials, warm-season veggies. Fertilize Bermuda with slow-release nitrogen. Water 1 inch per week' },
  { name: 'May', action: 'Mulch landscape beds 3 inches deep to conserve moisture ahead of summer heat. Edge beds and sidewalks for clean lines' },
  { name: 'June', action: 'Fertilize Bermuda again — high-nitrogen application. Raise mower to 2.5 inches to shade soil. Water deeply 2x/week early morning' },
  { name: 'July', action: 'Survival mode — water 3x/week during heat waves. Spot-treat weeds only (avoid herbicide over 90°F). Skip fertilizer until August' },
  { name: 'August', action: 'Final summer fertilizer application in early August. Watch for brown patch fungus in St. Augustine — treat with fungicide if spotted' },
  { name: 'September', action: 'Core aerate Bermuda lawn — reduces compaction in DFW clay soils. Best window Sep 1–15. Apply fall pre-emergent for winter weeds' },
  { name: 'October', action: 'Overseed with annual ryegrass for winter green on Bermuda lawns — seed at 10 lbs/1000 sqft. Water daily until germination (7–10 days)' },
  { name: 'November', action: 'Transition fertilizer for overseeded rye — low nitrogen, higher potassium. Rake leaves off turf — blocks light and causes disease' },
  { name: 'December', action: 'Dormant season — no mowing needed for Bermuda. Maintain ryegrass at 2 inches. Plan bed additions and hardscaping for spring' },
];

export default function DFWLandscapingSeasonGuide2026() {
  const [selected, setSelected] = useState(new Date().getMonth());
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌿</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Landscaping Season Calendar 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Month-by-month lawn and landscaping actions for Dallas–Fort Worth</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {months.map((m, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#e2e8f0', fontWeight: 600, fontSize: 13 }}>{m.name}</button>
          ))}
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>🗓️ {months[selected].name} — Landscaping Action Guide</h2>
          <p style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.7 }}>{months[selected].action}</p>
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 12 }}>🌱 DFW Grass Quick Reference</h3>
          {['Bermuda — dominant grass, thrives in DFW heat, goes dormant November–March','St. Augustine — shade tolerant, more water-hungry, watch for brown patch','Zoysia — drought tolerant once established, slow to green up in spring','Annual Ryegrass — overseeded Oct for winter color, dies in May heat'].map((g, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <span style={{ color: '#F5E642' }}>🌾</span>
              <span style={{ color: '#94a3b8', fontSize: 14 }}>{g}</span>
            </div>
          ))}
        </div>
        <p style={{ color: '#475569', fontSize: 12, textAlign: 'center', marginTop: 24 }}>ProLnk — Connecting DFW Homeowners with Trusted Landscaping Pros</p>
      </div>
    </div>
  );
}
