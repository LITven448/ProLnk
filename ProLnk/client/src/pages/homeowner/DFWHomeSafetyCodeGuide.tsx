import { useState } from 'react';

const ROOM_CODES: Record<string, { codes: string[]; violations: string[] }> = {
  bathroom: {
    codes: [
      'GFCI outlet required within 6ft of sink',
      'Ventilation fan must vent to exterior (not attic)',
      'Proper lighting required over shower/tub if enclosed',
    ],
    violations: [
      'Exhaust fan vented into attic — very common in DFW homes pre-2000',
      'Missing GFCI outlet near sink',
      'Non-GFCI outlet in shower area',
    ],
  },
  kitchen: {
    codes: [
      'GFCI required on all countertop circuits within 6ft of sink',
      'Two 20-amp dedicated circuits required for small appliances',
      'Range hood must vent to exterior or recirculate per manufacturer spec',
    ],
    violations: [
      'Non-GFCI outlets on countertop circuits',
      'Single 15-amp circuit serving kitchen appliances (undersized)',
      'Missing smoke detector within 10ft of cooking surface',
    ],
  },
  bedroom: {
    codes: [
      'Smoke detector required inside each bedroom',
      'AFCI breaker required on bedroom circuits (new construction)',
      'Egress window required — minimum 5.7 sqft clear opening, max 44″ sill height',
      'CO detector required within 15ft if gas appliances or attached garage present',
    ],
    violations: [
      'Missing smoke detector inside bedroom',
      'Window does not meet egress requirements (too small or too high)',
      'No CO detector in home with gas furnace',
    ],
  },
  garage: {
    codes: [
      'GFCI outlet required on all garage circuits',
      'Fire-rated door required between garage and living space (20-min minimum)',
      'Garage door opener must have auto-reverse safety sensor',
      'CO detector required in attached garage or within 15ft of door into home',
    ],
    violations: [
      'Missing GFCI outlets in garage',
      'Non-fire-rated door between garage and house',
      'Missing or non-functional safety sensor on garage door opener',
    ],
  },
  stairway: {
    codes: [
      'Handrail required when more than 2 risers',
      'Max riser height: 8.25 inches',
      'Min tread depth: 9 inches',
      'Graspable handrail required on at least one side',
    ],
    violations: [
      'Missing handrail on stairway with 3+ risers',
      'Decorative rail not graspable (square post top without grip)',
      'Inconsistent riser heights (trip hazard)',
    ],
  },
  exterior: {
    codes: [
      'GFCI required on all exterior outlets',
      'Weatherproof covers required on all exterior outlets and boxes',
      'Deck ledger must be properly flashed and fastened per IRC R507',
    ],
    violations: [
      'Non-GFCI exterior outlets',
      'Missing weatherproof cover on outdoor outlet',
      'Deck ledger improperly attached — separation from house structure',
    ],
  },
};

export default function DFWHomeSafetyCodeGuide() {
  const [selectedRoom, setSelectedRoom] = useState<string>('');

  const rooms = [
    { id: 'bathroom', label: '🚿 Bathroom' },
    { id: 'kitchen', label: '🍳 Kitchen' },
    { id: 'bedroom', label: '🛏️ Bedroom' },
    { id: 'garage', label: '🚗 Garage' },
    { id: 'stairway', label: '🪜 Stairway' },
    { id: 'exterior', label: '🌿 Exterior' },
  ];

  const result = selectedRoom ? ROOM_CODES[selectedRoom] : null;

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: '#60a5fa', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            🏠 HOME SAFETY CODES
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.15, margin: '0 0 20px', color: '#f8fafc' }}>
            DFW Home Safety Code Guide
          </h1>
          <p style={{ fontSize: 19, color: '#94a3b8', lineHeight: 1.7, maxWidth: 720 }}>
            What Texas Requires and Why It Matters
          </p>
        </div>

        {/* Why codes matter */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32, borderLeft: '4px solid #f59e0b' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', margin: '0 0 16px' }}>⚠️ Why Safety Codes Matter</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.75, margin: 0, fontSize: 16 }}>
            Code violations found during inspection or when selling can <strong style={{ color: '#fbbf24′ }}>delay or kill deals</strong>. 
            Unpermitted work that fails code creates major liability — you may be required to bring the entire system up to current code, 
            not just the specific violation. In DFW's competitive market, savvy buyers use code violations as negotiating leverage.
          </p>
        </div>

        {/* Key codes grid */}
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#f8fafc', margin: '0 0 24px' }}>📋 Key Texas Residential Codes (IRC-Based)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '🔊', title: 'Smoke Detectors', body: 'Required in each bedroom, outside each sleeping area, and on each floor. Must be interconnected in new construction — when one sounds, all sound.' },
            { icon: '💨', title: 'CO Detectors', body: 'Required within 15ft of sleeping areas if gas appliances are present OR if there is an attached garage. Battery backup required.' },
            { icon: '🪜', title: 'Stair Safety', body: 'Handrails required when more than 2 risers. Max 8.25″ riser height, 9″ minimum tread depth. Graspable rail on at least one side.' },
            { icon: '🔌', title: 'GFCI Outlets', body: 'Required in bathrooms, kitchens within 6ft of sink, garages, all exterior locations, and crawl spaces. Protects against electrocution near water.' },
            { icon: '⚡', title: 'AFCI Breakers', body: 'Required on all bedroom circuits in new construction. Arc-fault protection prevents electrical fires from wiring damage.' },
            { icon: '🚰', title: 'Water Heater', body: 'Must have pressure relief valve, drain pan underneath, and proper venting to exterior. Gas units need combustion air supply.' },
            { icon: '🌬️', title: 'Bathroom Ventilation', body: 'Must vent to exterior — not into attic. Many DFW homes vent into attic, creating mold and moisture damage. This is a code violation.' },
            { icon: '🪟', title: 'Egress Windows', body: 'All bedrooms must have a window openable to minimum 5.7 sqft clear area. Max sill height 44″. Life-safety requirement for emergency exit.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>{item.title}</div>
              <div style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.65 }}>{item.body}</div>
            </div>
          ))}
        </div>

        {/* Common violations */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', margin: '0 0 20px' }}>🚨 Most Common DFW Code Violations Found at Inspection</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Bathroom fan vented into attic — should vent to exterior',
              'Missing smoke detectors in older homes (pre-2000 construction)',
              'GFCI outlets missing in garage and/or exterior locations',
              'Unpermitted electrical additions — panel work, added circuits, hot tubs',
              'Water heater in closet without proper combustion air supply',
              'Deck ledger improperly flashed — leads to moisture intrusion and structural damage',
              'Handrail missing or not graspable on interior stairways',
            ].map((v, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', background: '#0f172a', borderRadius: 8 }}>
                <span style={{ color: '#ef4444', fontSize: 16, marginTop: 1 }}>✗</span>
                <span style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.5 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive checker */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', margin: '0 0 8px' }}>🔍 Interactive Code Checker</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 24px' }}>Select a room to see applicable safety codes and common violations.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
            {rooms.map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRoom(r.id)}
                style={{
                  padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  background: selectedRoom === r.id ? '#3b82f6′ : '#0f172a',
                  color: selectedRoom === r.id ? '#fff' : '#94a3b8',
                  transition: 'all 0.15s',
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e', letterSpacing: 1, marginBottom: 12, textTransform: 'uppercase' }}>✓ Required Codes</div>
                {result.codes.map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#22c55e', fontSize: 14 }}>•</span>
                    <span style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.55 }}>{c}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', letterSpacing: 1, marginBottom: 12, textTransform: 'uppercase' }}>✗ Common Violations</div>
                {result.violations.map((v, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#ef4444', fontSize: 14 }}>•</span>
                    <span style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.55 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #1e293b)', border: '1px solid #3b82f6', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🤖</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f8fafc', margin: '0 0 12px' }}>TrustyPro AI Detects Visible Code Issues During Scans</h3>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: '0 0 24px', lineHeight: 1.65 }}>
            Our visual AI identifies surface-level code concerns — missing GFCI outlets, exhaust fan locations, window openability, 
            deck conditions, and more — before a formal inspection. Catch issues early.
          </p>
          <button style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            Get Your AI Home Scan →
          </button>
        </div>

      </div>
    </div>
  );
}
