import { useState } from 'react';

const scopeLevels: Record<string, { label: string; rooms: string; totalTimeline: string; phases: { name: string; order: number; duration: string; trades: string; note: string }[] }> = {
  light: {
    label: 'Light (3–5 rooms, cosmetic)',
    rooms: 'Kitchen refresh, 2 baths, flooring, paint',
    totalTimeline: '8–14 weeks',
    phases: [
      { name: 'Flooring', order: 1, duration: '1–2 weeks', trades: 'Flooring installer', note: 'Do flooring before any cabinets or fixtures are installed in renovated rooms' },
      { name: 'Kitchen & Bath Cosmetic', order: 2, duration: '3–5 weeks', trades: 'Plumber, electrician, tile, cabinet crew', note: 'Sequence: plumber → electrician → tile → cabinets. No overlap in same room.' },
      { name: 'Paint & Finishes', order: 3, duration: '1–2 weeks', trades: 'Painter', note: 'Paint after all rough work is done — protects new surfaces' },
    ],
  },
  medium: {
    label: 'Medium (kitchen + master + other rooms)',
    rooms: 'Full kitchen, master bath, guest bath, floors, paint',
    totalTimeline: '14–22 weeks',
    phases: [
      { name: 'Structural (if any)', order: 1, duration: '1–3 weeks', trades: 'Structural engineer, framing crew', note: 'Walls, beams, load paths must be resolved FIRST before anything else' },
      { name: 'Mechanical Rough-In', order: 2, duration: '2–4 weeks', trades: 'Plumber, HVAC, electrician', note: 'DFW reality: can\’t book all 3 at once. Plumber first, then HVAC, then electrician. Allow 1 week per trade.' },
      { name: 'Inspections', order: 3, duration: '1–2 weeks', trades: 'City inspector', note: 'DFW cities require rough inspection before drywall. Schedule immediately after rough-in.' },
      { name: 'Drywall & Insulation', order: 4, duration: '1–2 weeks', trades: 'Drywall crew', note: 'After all inspections pass. Insulation required in exterior walls before drywall close.' },
      { name: 'Cabinets & Tile', order: 5, duration: '3–5 weeks', trades: 'Cabinet installer, tile setter', note: 'Cabinets first, then countertop template, then backsplash. Tile in baths in parallel if separate crew.' },
      { name: 'Finishes & Punch List', order: 6, duration: '2–3 weeks', trades: 'Painter, trim carpenter, fixture install', note: 'Final inspections at end. Don\’t schedule move-in until all city sign-offs received.' },
    ],
  },
  full: {
    label: 'Full Gut (whole home overhaul)',
    rooms: 'Every room, all mechanical systems, structural',
    totalTimeline: '6–12 months',
    phases: [
      { name: 'Design & Permits', order: 1, duration: '4–8 weeks', trades: 'Architect, designer, permit office', note: 'DFW permits for whole-home renos can take 3–6 weeks depending on city and scope' },
      { name: 'Demo', order: 2, duration: '1–2 weeks', trades: 'Demo crew', note: 'Full demo reveals hidden issues — budget 10–15% contingency for DFW homes built pre-1990' },
      { name: 'Structural & Foundation', order: 3, duration: '1–4 weeks', trades: 'Structural engineer, foundation company', note: 'Address any foundation or structural issues BEFORE mechanical rough-in' },
      { name: 'All Mechanical Rough-In', order: 4, duration: '4–8 weeks', trades: 'Plumber, HVAC, electrician', note: 'DFW scheduling reality: 3–6 week booking waits per trade. Start scheduling at permit approval.' },
      { name: 'Inspections', order: 5, duration: '1–3 weeks', trades: 'City inspector (multiple visits)', note: 'Rough framing, rough plumbing, rough electrical — 3 separate inspections in most DFW cities' },
      { name: 'Drywall, Tile, Cabinets', order: 6, duration: '6–10 weeks', trades: 'Drywall, tile, cabinets, countertops', note: 'Largest phase. Lead times for custom cabinets (6–8 weeks) drive scheduling — order at permit approval' },
      { name: 'Finishes & Final', order: 7, duration: '4–6 weeks', trades: 'Painter, flooring, fixtures, trim', note: 'Final inspection required before Certificate of Occupancy (CO) if major structural changes' },
    ],
  },
};

export default function DFWWholeHomeRenovationTimeline() {
  const [scope, setScope] = useState('');
  const selected = scope ? scopeLevels[scope] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>🏡 DFW Home Services</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>DFW Whole Home Renovation Timeline</h1>
        <p style={{ color: '#9BAEC8', marginBottom: 32, fontSize: 15 }}>How to phase multi-room renovations in DFW — what must happen first, how to stack trades without conflicts, and realistic completion timelines.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#F5E642', marginBottom: 14 }}>🔨 Renovation Scope</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Object.entries(scopeLevels).map(([key, val]) => (
              <button key={key} onClick={() => setScope(key)} style={{ padding: '12px 18px', borderRadius: 8, border: `2px solid ${scope === key ? '#F5E642' : '#1E3050'}`, background: scope === key ? '#1E3050' : 'transparent', color: scope === key ? '#F5E642' : '#9BAEC8', fontWeight: 600, cursor: 'pointer', fontSize: 13, textAlign: 'left' }}>
                <div style={{ fontWeight: 700, color: scope === key ? '#F5E642' : '#E8EDF5' }}>{val.label}</div>
                <div style={{ fontSize: 12, color: '#9BAEC8', marginTop: 2 }}>{val.rooms}</div>
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <>
            <div style={{ background: '#0A1628', border: '2px solid #F5E642', borderRadius: 10, padding: '14px 20px', marginBottom: 22 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>Realistic DFW Timeline: </span>
              <span style={{ color: '#E8EDF5', fontWeight: 600 }}>{selected.totalTimeline}</span>
              <div style={{ color: '#9BAEC8', fontSize: 12, marginTop: 6 }}>⚠️ DFW contractor scheduling reality: you cannot have 5 trades in the same space at once — sequencing is everything</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {selected.phases.map((p, i) => (
                <div key={i} style={{ background: '#111E35', borderRadius: 10, padding: 18, borderLeft: '3px solid #F5E642' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>Phase {p.order}</span>
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{p.name}</span>
                    <span style={{ fontSize: 12, color: '#9BAEC8', marginLeft: 'auto' }}>{p.duration}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 6 }}>Trades: {p.trades}</div>
                  <p style={{ margin: 0, color: '#9BAEC8', fontSize: 14 }}>{p.note}</p>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ marginTop: 28, textAlign: 'center', background: '#F5E642', borderRadius: 10, padding: '16px 24px' }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>🔗 Get matched with vetted DFW renovation contractors — free on ProLnk</span>
        </div>
      </div>
    </div>
  );
}
