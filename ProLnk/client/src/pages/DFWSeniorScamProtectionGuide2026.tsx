import { useState } from 'react';

const scamTypes = [
  {
    id: 'doorstep',
    label: '🚪 Door-to-Door Contractor After a Storm',
    redFlags: [
      '🚨 NEVER HIRE — this is the #1 scam targeting DFW seniors after hail storms',
      '🌪️ After every major DFW storm, out-of-state contractors flood neighborhoods looking for vulnerable homeowners',
      '💸 They collect a large deposit (sometimes full payment) and disappear',
      '🔴 Red flag: "I was already working in your neighborhood" — this is a rehearsed script',
      '🔴 Red flag: "My price is only good today" — legitimate contractors don\'t pressure like this',
      '✅ Protection: All ProLnk pros are DFW-based, verified, and background-checked — no fly-by-nights',
    ],
  },
  {
    id: 'upfront',
    label: '💵 Large Upfront Payment Demands',
    redFlags: [
      '🚨 Legitimate contractors never require full payment before work begins',
      '📋 Standard in Texas: 10-30% deposit to start, remainder on completion',
      '🔴 Red flag: Demanding 50%+ upfront, especially cash or check only',
      '🔴 Red flag: "I need to order special materials" — standard materials are stocked or ordered after contract',
      '🔴 Red flag: Asking to be paid via Venmo, Zelle, or gift cards — no legitimate contractor does this',
      '✅ ProLnk uses milestone payments with documented scope — you see exactly what you\'re paying for',
    ],
  },
  {
    id: 'pressure',
    label: '⏰ High-Pressure Tactics',
    redFlags: [
      '🚨 "This price is only good right now" is a psychological manipulation tactic',
      '📋 Reputable contractors have consistent pricing and don\'t create false urgency',
      '🔴 Red flag: Refusing to provide a written estimate before work starts',
      '🔴 Red flag: Refusing to allow you time to get a second opinion',
      '🔴 Red flag: Claiming "this damage is an emergency" without showing you documentation',
      '✅ ProLnk: Request any time, no pressure, written quote always provided, 3-day right of rescission',
    ],
  },
  {
    id: 'fake',
    label: '🎭 Fake Inspections & Exaggerated Damage',
    redFlags: [
      '🚨 Roofing scammers bang on shingles with hammers to "create" hail damage — documented practice',
      '📸 They show you scary photos that may not even be from your home',
      '🔴 Red flag: Inspector who immediately says "you need a full replacement" without measuring hail marks',
      '🔴 Red flag: Offering to "work with your insurance" by inflating the claim',
      '✅ Get an independent inspection first — ProLnk matches you with a licensed structural inspector',
      '✅ Texas contractor license lookup: tdlr.texas.gov/LicenseSearch',
    ],
  },
];

export default function DFWSeniorScamProtectionGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = scamTypes.find((s) => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚨</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', fontWeight: 700, margin: '0 0 0.5rem' }}>
            DFW Senior Home Repair Scam Protection Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
            Seniors 65+ are the #1 target for contractor fraud in DFW — know the red flags before you open the door
          </p>
        </div>

        <div style={{ background: '#ef444420', border: '1px solid #ef4444', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#fca5a5' }}>
            ⚠️ <strong>DFW Fact:</strong> The Texas Attorney General office receives more contractor fraud complaints from seniors than any other consumer group. The average senior loses $3,000-$15,000 per scam incident. Most are preventable.
          </p>
        </div>

        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Select the scam type to see how to protect yourself:
        </p>

        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {scamTypes.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{
                background: selected === s.id ? '#F5E642' : '#1e2d45',
                color: selected === s.id ? '#0A1628' : '#fff',
                border: '1px solid #334155',
                borderRadius: 8,
                padding: '0.9rem 1.2rem',
                textAlign: 'left',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.15s',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1e2d45', border: '1px solid #334155', borderRadius: 10, padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>{active.label}</h2>
            <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
              {active.redFlags.map((flag, i) => (
                <li key={i} style={{ marginBottom: '0.6rem', color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.5 }}>{flag}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#22c55e20', border: '1px solid #22c55e', borderRadius: 8, padding: '1rem', marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 700, color: '#86efac' }}>✅ The ProLnk Difference — Scam-Free by Design</p>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#86efac', fontSize: '0.9rem' }}>
            <li>Every pro is background-checked and TDLR license-verified</li>
            <li>No door-to-door contractors — you initiate, they respond</li>
            <li>Written scope and pricing before any work begins</li>
            <li>Texas-based pros only — no out-of-state storm chasers</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', background: '#1e2d45', borderRadius: 10, padding: '1.5rem' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 0.5rem', fontSize: '1rem' }}>
            🔒 ProLnk — The Only Safe Way to Hire in DFW
          </p>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
            Seniors trust ProLnk because every contractor is verified before they ever see your address.
          </p>
        </div>
      </div>
    </div>
  );
}
