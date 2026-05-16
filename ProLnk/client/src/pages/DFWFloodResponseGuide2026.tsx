import { useState } from 'react';

const sources = [
  {
    id: 'pipe',
    label: 'Burst pipe or plumbing failure',
    timeline: [
      '0–5 min: Locate and close main water shutoff — in DFW slab homes, usually near front of house or at street meter',
      '0–15 min: Take photos and video of all affected areas before touching anything',
      'Within 1 hr: Call insurance — most DFW policies require notice within 24 hrs but sooner is better',
      'Within 2 hrs: Begin water extraction — mold clock starts immediately in DFW humidity',
      '2–24 hrs: Industrial dehumidifiers and air movers placed by mitigation pro',
      '24–72 hrs: Moisture readings taken, drywall and flooring assessed for removal',
    ],
  },
  {
    id: 'storm',
    label: 'Storm / roof water intrusion',
    timeline: [
      'Immediately: Document with photos — roof, ceiling, walls, floors',
      'Within 1 hr: Place buckets, move valuables, call insurance',
      'Within 24 hrs: Emergency tarping on roof if needed — prevents further damage',
      'Within 48 hrs: Water mitigation team begins drying process',
      '3–5 days: Adjuster visit typical in DFW metro after storm events',
      'Note: DFW hailstorms often cause secondary water damage via attic penetrations' ,
    ],
  },
  {
    id: 'appliance',
    label: 'Appliance overflow (washer, dishwasher)',
    timeline: [
      'Immediately: Turn off appliance and water supply to it',
      'Immediately: Remove standing water with mop or wet vac if minor',
      'Within 2 hrs: If more than 1 inch of water, call mitigation pro — subfloor saturation risk',
      'Within 24 hrs: File insurance claim — most policies cover sudden appliance overflow',
      'Key risk: DFW engineered wood flooring delaminates within 24 hrs of saturation',
    ],
  },
];

export default function DFWFloodResponseGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = sources.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK — DFW EMERGENCY GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>💧 DFW Flood Response Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          Water damage in DFW homes escalates fast. The 2-hour window for water extraction is critical — after that, mold growth becomes likely in DFW's humidity. Speed determines cost.
        </p>

        <div style={{ background: '#0c2340', border: '1px solid #3b82f6', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 8, color: '#93c5fd' }}>⏱️ The 2-Hour Mold Clock</div>
          <div style={{ color: '#bfdbfe', fontSize: 14 }}>
            In DFW's climate, mold spores activate in as little as 24–48 hours on wet materials. Water extraction within 2 hours dramatically reduces remediation scope and cost. Do not wait for insurance approval to start drying.
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📋 Water Source → Response Timeline</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {sources.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{
                  background: selected === s.id ? '#F5E642' : '#0A1628',
                  color: selected === s.id ? '#0A1628' : '#fff',
                  border: '1px solid #F5E642',
                  borderRadius: 8,
                  padding: '12px 16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>Response Timeline:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {match.timeline.map((step, i) => (
                  <div key={i} style={{ color: '#e2e8f0', fontSize: 14 }}>• {step}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Need DFW Water Mitigation Now?</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>ProLnk connects you with certified water mitigation pros — fast response across DFW.</div>
        </div>
      </div>
    </div>
  );
}
