import { useState } from 'react';

const bathroomTypes: Record<string, { label: string; timeline: string; phases: string[] }> = {
  hall: {
    label: 'Hall / Guest Bath',
    timeline: '4–6 weeks',
    phases: ['Demo (1 day)', 'Rough plumbing & electric (2–3 days)', 'Backer board & waterproofing (1 day)', 'Tile floor & shower (3–5 days)', 'Vanity & fixtures (1–2 days)', 'Punch list & inspection (1 day)'],
  },
  master: {
    label: 'Master Bath',
    timeline: '8–12 weeks',
    phases: ['Design & selections (1–2 weeks)', 'Demo (1–2 days)', 'Rough plumbing & electric (4–5 days)', 'Custom shower & niche tile (5–8 days)', 'Heated floor rough-in (1 day)', 'Vanity, mirrors, fixtures (2–3 days)', 'Final inspection & punch list (1–2 days)'],
  },
  addition: {
    label: 'New Bathroom Addition',
    timeline: '12–16 weeks',
    phases: ['Permit (2–4 weeks DFW)', 'Framing & rough-in (1 week)', 'Inspections (1–3 days each)', 'Tile & waterproofing (1 week)', 'Fixtures & finishes (1 week)', 'Final inspection'],
  },
};

const dfwTileNotes = [
  'Arizona Tile (Carrollton, Plano) — in-stock tile available same week',
  'Tile Shop (Dallas, Plano) — custom orders 2–4 weeks',
  'Floor & Decor (multiple DFW locations) — largest in-stock selection',
  'Italian imports via local tile suppliers: 4–8 weeks lead time',
];

const delays = [
  'Tile backordered from specialty suppliers (especially large-format)',
  'Waterproofing inspection required before tile — adds 1–3 days',
  'Custom shower glass: 2–4 weeks fabrication in DFW',
  'Plumber and tile installer scheduling conflicts (coordinate early)',
  'Heated floor systems: add 3–5 days + extra inspection',
];

export default function DFWBathroomRenovationTimeline() {
  const [type, setType] = useState('');

  const selected = type ? bathroomTypes[type] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>🚿 DFW Home Services</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>DFW Bathroom Renovation Timeline</h1>
        <p style={{ color: '#9BAEC8', marginBottom: 32, fontSize: 15 }}>Master bath vs hall bath timelines, DFW tile sourcing, and contractor booking lead times.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#F5E642', marginBottom: 14 }}>🛁 Select Your Bathroom Type</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {Object.entries(bathroomTypes).map(([key, val]) => (
              <button key={key} onClick={() => setType(key)} style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${type === key ? '#F5E642' : '#1E3050'}`, background: type === key ? '#F5E642' : 'transparent', color: type === key ? '#0A1628' : '#9BAEC8', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>{val.label}</button>
            ))}
          </div>
          {selected && (
            <div style={{ marginTop: 18 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, borderLeft: '3px solid #F5E642', marginBottom: 14 }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>DFW Realistic Timeline: </span>
                <span style={{ color: '#E8EDF5', fontWeight: 600 }}>{selected.timeline}</span>
                <div style={{ color: '#9BAEC8', fontSize: 13, marginTop: 6 }}>Contractor booking lead time in DFW: 2–6 weeks depending on season</div>
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Phase-by-Phase</h3>
              <ul style={{ margin: '0 0 0 16px', padding: 0, color: '#9BAEC8', fontSize: 14 }}>
                {selected.phases.map((p, i) => <li key={i} style={{ marginBottom: 6 }}>{p}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 22, marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 14 }}>🏪 DFW Tile Sourcing & Lead Times</h2>
          <ul style={{ margin: 0, padding: '0 0 0 18px', color: '#9BAEC8', fontSize: 14 }}>
            {dfwTileNotes.map((n, i) => <li key={i} style={{ marginBottom: 8 }}>{n}</li>)}
          </ul>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 22 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 14 }}>⚠️ Common DFW Bathroom Delays</h2>
          <ul style={{ margin: 0, padding: '0 0 0 18px', color: '#9BAEC8', fontSize: 14 }}>
            {delays.map((d, i) => <li key={i} style={{ marginBottom: 8 }}>{d}</li>)}
          </ul>
        </div>

        <div style={{ marginTop: 28, textAlign: 'center', background: '#F5E642', borderRadius: 10, padding: '16px 24px' }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>🔗 Get matched with a vetted DFW bathroom contractor — free on ProLnk</span>
        </div>
      </div>
    </div>
  );
}
