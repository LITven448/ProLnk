import { useState } from 'react';

const confidenceLevels = [
  {
    level: 'Confused',
    emoji: '😕',
    description: "I don't know how HVAC works or who to trust",
    understanding: [
      '🔑 Your DFW system has 3 parts: outdoor condenser, indoor air handler, and ductwork',
      '🔑 In DFW, systems run 8–10 months/year — maintenance is non-negotiable',
      '🔑 SEER2 rating = efficiency; higher = lower monthly utility bills',
      '🔑 A trustworthy contractor explains everything before charging you',
    ],
    actions: [
      '→ Schedule a diagnostic tune-up to get a baseline on your system',
      '→ Ask the tech to walk you through every finding in plain English',
      '→ Use ProLnk to get 3 bids on any job over $300',
    ],
  },
  {
    level: 'Learning',
    emoji: '🤔',
    description: 'I understand the basics but get overwhelmed by quotes',
    understanding: [
      '🔑 An itemized quote shows labor, parts, and refrigerant separately',
      '🔑 R-410A is being phased out — R-454B is the future-safe refrigerant',
      '🔑 A second opinion is always free and often saves hundreds',
      '🔑 "Recommended" repairs ≠ "required" — you can always wait and compare',
    ],
    actions: [
      '→ Always get quotes in writing before approving any repair',
      '→ Use ProLnk to compare quotes from 2–3 vetted DFW contractors',
      '→ Ask: "What happens if I don\’t do this repair right now?"',
    ],
  },
  {
    level: 'Confident',
    emoji: '😎',
    description: 'I understand HVAC and make good decisions without second-guessing',
    understanding: [
      '🔑 You know what your system costs to run, repair, and replace',
      '🔑 You have a go-to contractor and a backup through ProLnk',
      '🔑 You track service history in Home Health Vault',
      '🔑 You know when a repair makes sense vs. when to replace',
    ],
    actions: [
      '→ Help neighbors by sharing ProLnk — earn referral commissions',
      '→ Add your home to Home Health Vault for long-term documentation',
      '→ Review your system on its 10th birthday — plan the replacement',
    ],
  },
];

export default function DFWHVACDFWConfidence() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>💪</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            From Confused to Confident: Your DFW HVAC Journey
          </h1>
          <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.7 }}>
            Every DFW homeowner starts somewhere. Most stay confused. You won't.
            Here's exactly what changes when you understand your HVAC — and what to do with that knowledge.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
          {['😕 Confused', '🤔 Learning', '😎 Confident'].map((stage, i) => (
            <div key={i} style={{
              backgroundColor: '#1e293b',
              borderRadius: 12,
              padding: 16,
              textAlign: 'center',
              borderTop: `3px solid ${i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : '#22c55e'}`,
            }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{stage}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 6 }}>
                {i === 0 ? 'Where most start' : i === 1 ? 'Where most stay' : 'Where you\’re going'}
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>
            📊 Where are you right now?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {confidenceLevels.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                style={{
                  backgroundColor: selected === i ? '#F5E642′ : '#0f172a',
                  color: selected === i ? '#0A1628′ : '#fff',
                  border: '2px solid',
                  borderColor: selected === i ? '#F5E642′ : '#334155',
                  borderRadius: 10,
                  padding: '14px 18px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                {item.emoji} {item.level} — <span style={{ fontWeight: 400 }}>{item.description}</span>
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 10, fontSize: 16, fontWeight: 700 }}>
                What you now understand:
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
                {confidenceLevels[selected].understanding.map((u, j) => (
                  <li key={j} style={{ padding: '5px 0', fontSize: 14, color: '#e2e8f0', lineHeight: 1.6 }}>{u}</li>
                ))}
              </ul>
              <h3 style={{ color: '#F5E642', marginBottom: 10, fontSize: 16, fontWeight: 700 }}>
                What to do with it:
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {confidenceLevels[selected].actions.map((a, j) => (
                  <li key={j} style={{ padding: '5px 0', fontSize: 14, color: '#93c5fd', lineHeight: 1.6 }}>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28 }}>🎓</div>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, margin: '8px 0′ }}>
            ProLnk turns HVAC confidence into action
          </h3>
          <p style={{ color: '#1e293b', fontSize: 14, lineHeight: 1.6 }}>
            Knowing what to do is half the battle. ProLnk gives you pre-vetted DFW contractors,
            transparent quotes, and your Home Health Vault record — so confidence becomes results.
          </p>
        </div>
      </div>
    </div>
  );
}
