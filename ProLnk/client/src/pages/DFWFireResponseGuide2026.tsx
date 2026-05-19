import { useState } from 'react';

const fireScopes = [
  {
    id: 'active',
    label: 'Active fire or smoke — still burning',
    steps: [
      '🚨 LEAVE IMMEDIATELY — do not stop for pets, valuables, or clothing',
      '🚨 Close doors as you exit — slows fire spread significantly',
      '🚨 Call 911 once outside — give address and confirm everyone is out',
      '✅ Meet at pre-designated family meeting spot',
      '❌ Do NOT re-enter for any reason — structural collapse risk is immediate',
    ],
  },
  {
    id: 'contained',
    label: 'Fire out, damage contained to one area',
    steps: [
      '✅ Wait for fire marshal clearance before re-entering',
      '✅ Call homeowners insurance same day — document policy number before you need it',
      '✅ Take photos and video of all damage before any cleanup',
      '✅ Arrange emergency board-up and tarping within 24 hours' ,
      '✅ Do NOT use electricity or HVAC until electrician clears the system',
      '✅ Keep all receipts for hotel, food, clothing — additional living expense (ALE) coverage',
    ],
  },
  {
    id: 'heavy',
    label: 'Heavy structural damage / partial collapse',
    steps: [
      '✅ Do not enter — engineer must assess structural stability first',
      '✅ Insurance will assign an adjuster — typical DFW response 2–5 business days post-loss',
      '✅ File claim and request emergency advance — most carriers offer partial advance within 48 hrs',
      '✅ Secure property: board windows and doors, tarp exposed roof',
      '✅ Document everything from outside via phone camera',
      '✅ Engage public adjuster if damage is over $100K — negotiating power' ,
    ],
  },
  {
    id: 'smoke',
    label: 'Smoke damage only (no significant structural damage)',
    steps: [
      '✅ Ventilate — open windows and run fans to remove smoke odor',
      '✅ Document with photos before cleaning anything',
      '✅ File insurance claim — smoke damage is covered under standard DFW homeowner policies',
      '✅ Smoke mitigation typically includes HEPA air scrubbing and ozone treatment',
      '❌ Do not paint over soot — must be properly cleaned first or odor returns',
    ],
  },
];

export default function DFWFireResponseGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = fireScopes.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK — DFW EMERGENCY GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔥 DFW House Fire Response Guide</h1>

        <div style={{ background: '#7c1515', border: '1px solid #ef4444', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Active Fire: Leave Now</div>
          <div style={{ color: '#fca5a5', fontSize: 15 }}>Get out. Close doors. Call 911 from outside. Do not re-enter.</div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📋 Fire Scope → Response Guide</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {fireScopes.map(s => (
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
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>Response Steps:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {match.steps.map((step, i) => (
                  <div key={i} style={{ color: '#e2e8f0', fontSize: 14 }}>{step}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>📞 Key DFW Resources</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, color: '#94a3b8', fontSize: 14 }}>
            <div>🔴 Emergency: 911</div>
            <div>🏠 Red Cross DFW: 214-678-4800 (temporary housing)</div>
            <div>🏛️ Dallas OEM: 214-670-4911</div>
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Need DFW Fire Restoration Pros?</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>ProLnk connects you with certified fire & smoke restoration contractors across DFW.</div>
        </div>
      </div>
    </div>
  );
}
