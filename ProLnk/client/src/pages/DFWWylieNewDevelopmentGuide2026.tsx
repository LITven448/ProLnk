import { useState } from 'react';

const developments = [
  { id: 'dominion', label: '🏰 Dominion of Pleasant Valley', tips: ['Newer builds 2018–2026: builder warranty inspection at year 1 is critical — hire independent inspector', 'HOA landscaping standards strict — check deed restrictions before any exterior modification', 'Water pressure variations in fast-growing areas: install whole-house pressure regulator', 'Attic ventilation critical for Wylie heat — verify ridge vents and soffit vents are unobstructed', 'Storm drain maintenance: keep lot grading sloping away from foundation, regrade as needed'] },
  { id: 'sagecreek', label: '🌿 Sage Creek', tips: ['Mid-2000s through 2015 builds: HVAC approaching replacement window in older sections', 'Sage Creek has mature trees — annual arborist inspection for limbs over roof line', 'Pool ownership common here: monthly chemical balance + annual equipment inspection', 'Brick mortar repointing needed on 15+ year homes — check for gaps above windows and at corners', 'Fence replacement cycle: wood fences in DFW last 10–15 years, budget accordingly'] },
  { id: 'lakeranch', label: '🐴 Lake Ranch Estates', tips: ['Larger lots with acreage: septic system inspection every 3 years minimum', 'Private water wells in some sections — annual water quality testing required', 'Gravel driveways and rural access: grade and compact annually to prevent erosion', 'Open sky means higher lightning risk — whole-home surge protection is worth $300', 'Rural fire response times longer — maintain 30-foot defensible space around structure'] },
  { id: 'inspiration', label: '💧 Inspiration (Lake Lavon)', tips: ['Lakefront lots require annual bulkhead or shoreline stabilization inspection', 'Humidity near Lake Lavon accelerates exterior wood rot — seal decks and trim annually', 'Foundation near lake: high water table in wet years, monitor for heave and uplift', 'Boat dock maintenance: treat wood with marine-grade sealer biannually', 'Window and door seals degrade faster with lake humidity — re-caulk every 3 years'] },
];

export default function DFWWylieNewDevelopmentGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = developments.find(d => d.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, letterSpacing: 1 }}>
          PROLNK · DFW LOCAL GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
          🚀 Wylie New Development Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Wylie TX is one of DFW's fastest-growing cities. From lakeside living at Inspiration
          on Lake Lavon to master-planned Dominion of Pleasant Valley, each development has its
          own maintenance profile. Select your community below.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>📍 Wylie Snapshot</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            ZIP codes 75098 · Collin County · Wylie ISD · Population doubled 2010–2026 ·
            Lake Lavon provides lakefront and near-lake living options ·
            Major employers accessible via US-78 and SH-205 corridors
          </div>
        </div>

        <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>
          Select your Wylie development:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {developments.map(d => (
            <button
              key={d.id}
              onClick={() => setSelected(d.id === selected ? null : d.id)}
              style={{
                background: selected === d.id ? '#F5E642' : '#0f2040',
                color: selected === d.id ? '#0A1628' : '#fff',
                border: '1px solid ' + (selected === d.id ? '#F5E642' : '#1e3a5f'),
                borderRadius: 8, padding: '0.75rem 1rem', textAlign: 'left',
                fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem',
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>
              {active.label} — 2026 Maintenance Guide
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {active.tips.map((tip, i) => (
                <li key={i} style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.9rem' }}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 10, padding: '1rem' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, marginBottom: '0.3rem' }}>Wylie homeowner? Get matched on ProLnk</div>
          <div style={{ color: '#0A1628', fontSize: '0.85rem' }}>Local pros serving all Wylie developments — foundation to lakefront</div>
        </div>
      </div>
    </div>
  );
}