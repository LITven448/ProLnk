import { useState } from 'react';

const neighborhoodGuide: Record<string, { label: string; tips: string[] }> = {
  'Historic Downtown': {
    label: 'Historic Downtown McKinney — 1920s–1970s',
    tips: [
      '🏛️ Pier and beam foundations dominant — annual inspection for settled piers and moisture',
      '🔌 Knob-and-tube wiring risk in pre-1950 homes — full electrical inspection before purchase',
      '🚿 Cast iron drain lines — hydrojetting and camera scope every 3 years minimum',
      '🪟 Wood-frame single-pane windows — restoration vs replacement decision critical for historic district compliance',
      '🎨 Historic overlay rules — exterior changes require City of McKinney historic commission approval',
    ],
  },
  'Mid-Century Suburbs': {
    label: 'McKinney Mid-Century — 1960s–1980s',
    tips: [
      '🏗️ Slab foundations from early era — differential settlement common on Collin clay',
      '🔌 100A panels — most need upgrade for modern EV and HVAC loads',
      '🌳 50-year trees — root intrusion in cast iron and early PVC sewer lines critical',
      '🪟 Aluminum frame windows — replacement to vinyl or fiberglass delivers major efficiency gains',
      '❄️ HVAC 20–40 years old — any system over 20 years should be budgeted for replacement',
    ],
  },
  'Adriatica Village': {
    label: 'Adriatica Village — European-Style New Construction',
    tips: [
      '🏗️ Built 2005–2015 — foundation settled but monitor for drainage from impervious surfaces',
      '🌿 Distinctive Mediterranean landscaping — irrigation system at 10–20 year service age',
      '🏘️ Active HOA with architectural standards — stone and stucco require approved materials only',
      '❄️ HVAC 10–20 years — Adriatica heat island effect from stone hardscaping increases load',
      '💧 Decorative water features — freeze protection and pump replacement every 7–10 years',
    ],
  },
  'New Suburban McKinney': {
    label: 'New McKinney Suburbs — 2010–2026',
    tips: [
      '🏗️ Active settling for 2018–2026 builds — monitor door frames and brick joints seasonally',
      '📋 Builder warranty still active for 2020+ builds — push structural items before year 10',
      '🌿 Irrigation backflow preventers — annual testing required by Collin County code',
      '❄️ HVAC at 0–16 years — verify refrigerant type (R-410A phase-out affects older units)',
      '🛡️ HOA developing standards — community is still in formative governance period',
    ],
  },
};

export default function DFWMcKinneyHomeownerGuide2026B() {
  const [selected, setSelected] = useState<string | null>(null);
  const neighborhoods = Object.keys(neighborhoodGuide);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · McKINNEY TX · PART 2 OF 2</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>McKinney TX Homeowner Deep Dive 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Collin County's historic gem blends 1920s downtown charm with explosive suburban growth and Adriatica's European-style new construction. Your neighborhood defines your maintenance reality.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 28 }}>
          {[{ icon: '🏛️', label: 'Downtown Vintage', val: '1920s–1970s historic district' }, { icon: '🌍', label: 'Adriatica Village', val: 'European-style 2005–2015' }, { icon: '🏠', label: 'Median Home Price', val: '$450K (2026)' }, { icon: '📈', label: 'Population', val: '210K+ (Collin County seat)' }].map(c => (
            <div key={c.label} style={{ background: '#111e35', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22 }}>{c.icon}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{c.label}</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📍 Select Your McKinney Neighborhood</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {neighborhoods.map(n => (
              <button key={n} onClick={() => setSelected(n === selected ? null : n)}
                style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, background: selected === n ? '#F5E642' : '#1e2f4a', color: selected === n ? '#0A1628' : '#fff' }}>
                {n}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>{neighborhoodGuide[selected].label}</div>
              {neighborhoodGuide[selected].tips.map((t, i) => <div key={i} style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.5 }}>{t}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🏛️ Historic District Pro Tips</h2>
          {[{ icon: '📜', text: 'City of McKinney Historic Preservation Office reviews all exterior changes in the historic overlay — plan 45-60 days for approval' }, { icon: '🔨', text: 'Approved contractors for historic work — not all licensed pros qualify; verify with the city before hiring' }, { icon: '💰', text: 'Historic tax credits available — Collin County and State programs offset restoration costs significantly' }].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.5 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#F5E642', borderRadius: 10, color: '#0A1628', textAlign: 'center', fontWeight: 700 }}>
          Get McKinney-Verified Pros on ProLnk — Free Quotes in 24 Hours
        </div>
      </div>
    </div>
  );
}