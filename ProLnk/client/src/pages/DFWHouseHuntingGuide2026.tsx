import { useState } from 'react';

const priorities = [
  { id: 'price', label: '💰 Budget' },
  { id: 'schools', label: '🏫 Schools' },
  { id: 'commute', label: '🚗 Commute' },
  { id: 'size', label: '📐 Square Footage' },
  { id: 'yard', label: '🌿 Yard Size' },
  { id: 'newbuild', label: '🏗️ New Build' },
];

const checklists: Record<string, string[]> = {
  price: [
    'Set max budget + 10% buffer for bidding wars',
    'Get pre-approval letter before touring',
    'Check tax rates by city (Frisco vs Dallas differ widely)',
    'Factor in HOA fees — DFW average $150-400/mo',
  ],
  schools: [
    'Verify school ratings on GreatSchools.org',
    'Check district boundaries — one street can change district',
    'Visit during school year if possible',
    'Look at boundaries map, not just city name',
  ],
  commute: [
    'Drive the commute at rush hour before offering',
    'Check toll road costs (DNT, 35, 121 add up fast)',
    'Test Google Maps at 8am and 5:30pm',
    'Consider future highway construction',
  ],
  size: [
    'Bring tape measure for critical rooms',
    'Check closet sizes — DFW homes often undersize storage',
    'Measure garage for your vehicles',
    'Count bathrooms vs household members',
  ],
  yard: [
    'Visit at different times to assess sun and shade',
    'Check sprinkler system zone count',
    'Assess drainage — DFW clay soil floods fast',
    'Look for large trees near foundation',
  ],
  newbuild: [
    'Compare builder incentives across communities',
    'Hire independent inspector even for new builds',
    'Understand phase timeline for your lot',
    'Check what is and is not included in base price',
  ],
};

export default function DFWHouseHuntingGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🏘️ DFW House Hunting Guide 2026</h1>
        <p style={{ color: '#aaa', marginBottom: 32 }}>Efficiently navigate DFW's fast-moving market with alerts, neighborhood assessments, and red flag detection.</p>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📡 Set Up Your Alert Stack</h2>
          {[
            'Zillow: Save searches with 15-min email alerts',
            'Realtor.com: Set push notifications on mobile',
            'NTREIS MLS: Ask your agent for auto-email from live MLS',
            'Nextdoor: Monitor target neighborhoods for off-market listings',
          ].map(t => (
            <div key={t} style={{ padding: '8px 0', borderBottom: '1px solid #1a2d4a', color: '#ccc', fontSize: 14 }}>✓ {t}</div>
          ))}
        </div>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🚗 10-Minute Drive-By Checklist</h2>
          {[
            'Curb: cracks in driveway, heaved sidewalks (drainage clue)',
            'Roof: missing shingles, sagging ridge line, moss growth',
            'Lot grade: does land slope toward or away from house?',
            'Neighbors: yards maintained? HOA visible or chaos?',
            'Street: dead-end feel or cut-through traffic?',
          ].map(t => (
            <div key={t} style={{ padding: '8px 0', borderBottom: '1px solid #1a2d4a', color: '#ccc', fontSize: 14 }}>🔍 {t}</div>
          ))}
        </div>

        <div style={{ background: '#1a0a0a', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #5a1a1a' }}>
          <h2 style={{ color: '#ff6b6b', fontSize: 16, marginBottom: 16 }}>🚨 DFW Red Flags</h2>
          {[
            'Foundation hairlines — diagonal cracks at door corners means movement',
            'HVAC 15+ years old — DFW heat runs it hard, $7-12K to replace',
            'Water stains on ceilings — DFW hail storms are relentless',
            'Slab cracks on exterior — shifting clay soil moves foundations',
            'Aluminum wiring (pre-1972 homes) — fire hazard, expensive fix',
          ].map(t => (
            <div key={t} style={{ padding: '8px 0', borderBottom: '1px solid #3a1a1a', color: '#ffaaaa', fontSize: 14 }}>⚠️ {t}</div>
          ))}
        </div>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎯 Your Priorities → Custom Checklist</h2>
          <p style={{ color: '#aaa', fontSize: 13, marginBottom: 16 }}>Select what matters most to you:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {priorities.map(p => (
              <button
                key={p.id}
                onClick={() => toggle(p.id)}
                style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, background: selected.includes(p.id) ? '#F5E642′ : '#1a2d4a', color: selected.includes(p.id) ? '#0A1628' : '#ccc', fontWeight: selected.includes(p.id) ? 700 : 400 }}
              >
                {p.label}
              </button>
            ))}
          </div>
          {selected.map(id => (
            <div key={id} style={{ marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>{priorities.find(p => p.id === id)?.label}</div>
              {checklists[id].map(item => (
                <div key={item} style={{ color: '#ccc', fontSize: 13, padding: '4px 0′ }}>→ {item}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', color: '#F5E642', fontSize: 13 }}>🔗 ProLnk — DFW Home Services Network | prolnk.io</div>
      </div>
    </div>
  );
}
