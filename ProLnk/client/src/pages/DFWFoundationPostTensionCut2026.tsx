import { useState } from 'react';

const scenarios = [
  {
    id: 'cut_active',
    label: '🚨 Cable Cut — Work In Progress',
    severity: 'EMERGENCY',
    steps: [
      'STOP ALL WORK IMMEDIATELY — do not cut any more cables',
      'Clear the area — a released PT cable can whip violently',
      'Do NOT attempt to remove or repair the cable yourself',
      'Call a licensed structural engineer (PE stamp required in Texas)',
      'Document everything: photos, contractor name, time of cut',
      'Call your homeowners insurance to open a claim',
      'Post-tension cable cuts are a structural emergency — not a handyman repair',
    ],
    note: 'In DFW, most slab-on-grade homes built after 1970 have post-tension cables. The tendons are under 33,000–60,000 lbs of force. A cut end can retract violently into the slab.',
    cost: '$2,000–$15,000+ for structural repair depending on location and engineer requirements',
  },
  {
    id: 'suspected',
    label: '⚠️ Suspected Cut — Not Confirmed',
    severity: 'HIGH',
    steps: [
      'Look for: exposed wire ends at slab edge, fresh concrete dust, unusual cracking pattern',
      'Do NOT probe with metal tools — could contact live tendons',
      'Hire a PT specialist or structural engineer to assess',
      'Ground penetrating radar (GPR) can locate cables without cutting',
      'If during plumbing/electrical work: halt that scope until cables are mapped',
    ],
    note: 'DFW contractors are required to locate PT cables before cutting into slabs. Use PT cable locating service or GPR before any saw-cut or core drill into a DFW slab.',
    cost: '$300–$800 for GPR scan; engineer consultation $300–$600',
  },
  {
    id: 'repair_process',
    label: '🔧 Repair Process Overview',
    severity: 'INFO',
    steps: [
      'Structural engineer creates repair plan (PE stamp required for permit)',
      'Option 1: Hydraulic restoration — re-stress the severed tendon if ends accessible',
      'Option 2: New PT anchor installation at cut point',
      'Option 3: Supplemental reinforcement if cable is inaccessible',
      'City of Dallas/Fort Worth requires permit and engineer approval for PT repairs',
      'Final inspection by city building inspector required',
    ],
    note: 'DFW municipalities treat PT cable repairs as structural modifications requiring full permit and inspection. DIY repairs are illegal and void homeowner insurance claims.',
    cost: '$3,000–$20,000 depending on cable location, accessibility, and repair method chosen',
  },
  {
    id: 'prevention',
    label: '✅ Prevention Before Work',
    severity: 'LOW',
    steps: [
      'Hire PT cable locator before any slab penetration in DFW',
      'Request PT cable layout from original builder (if available in city records)',
      'Mark all located cables with spray paint before saw-cutting',
      'Use core drills over saw-cuts when possible — smaller risk window',
      'Inform all subcontractors of cable locations at job start',
    ],
    note: 'DFW has one of the highest post-tension slab concentrations in the country due to expansive clay soils. Nearly all tract homes built after 1975 have PT slabs.',
    cost: '$300–$600 for professional PT cable location — always worth it',
  },
];

const colors: Record<string,string> = { EMERGENCY: '#f87171', HIGH: '#fbbf24', INFO: '#60a5fa', LOW: '#4ade80′ };

export default function DFWFoundationPostTensionCut2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const sc = scenarios.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', margin: '0.5rem 0′ }}>DFW Post-Tension Cable Cut Emergency Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>A cut PT cable is a structural emergency — DFW contractors must know this protocol</p>
        </div>

        <div style={{ background: '#1a0505', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid #f87171′ }}>
          <div style={{ color: '#f87171', fontWeight: 700 }}>🚨 Critical: PT Cables Are Under 33,000–60,000 lbs of Force</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem' }}>A severed tendon can retract violently. Never attempt to grab, pull, or manually repair a cut PT cable. This is a structural engineering matter only.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {scenarios.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
              style={{ background: selected === s.id ? '#1e3a5f' : '#0f2233', border: `2px solid ${selected === s.id ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '1rem', color: '#fff', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>{s.label}</div>
              <div style={{ fontSize: '0.75rem', color: colors[s.severity], fontWeight: 700 }}>{s.severity}</div>
            </button>
          ))}
        </div>

        {sc && (
          <div style={{ background: '#0f2233', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: '#F5E642', margin: 0, fontSize: '1.1rem' }}>{sc.label}</h2>
              <span style={{ background: colors[sc.severity], color: '#000', padding: '0.2rem 0.6rem', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700 }}>{sc.severity}</span>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              {sc.steps.map((step, i) => <div key={i} style={{ color: '#cbd5e1', padding: '0.4rem 0', borderBottom: '1px solid #1e3a5f', fontSize: '0.9rem' }}>{i + 1}. {step}</div>)}
            </div>
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '1rem', marginBottom: '0.8rem', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>📋 DFW Context</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{sc.note}</div>
            </div>
            <div style={{ color: '#F5E642', fontSize: '0.9rem', fontWeight: 700 }}>💰 {sc.cost}</div>
          </div>
        )}
      </div>
    </div>
  );
}
