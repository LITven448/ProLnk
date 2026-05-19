import { useState } from 'react';

const myths = [
  {
    belief: 'Any crack in the foundation means major failure',
    verdict: 'MYTH',
    reality: 'In DFW, hairline cracks under 1/4 inch that run horizontally and stay stable over time are common and generally non-structural. Cracks wider than 1/4 inch, diagonal cracks at corners, or cracks that grow are the warning signs. Context and a structural engineer determine severity.',
    icon: '🔍',
  },
  {
    belief: 'Only older homes have foundation problems in DFW',
    verdict: 'MYTH',
    reality: 'DFW clay soil (Blackland Prairie) expands and contracts dramatically with moisture. New homes built in 2022 can show movement within 2 years. Age is irrelevant — soil moisture management is the determining factor regardless of when the home was built.',
    icon: '🏠',
  },
  {
    belief: 'Foundation repair is a dealbreaker when buying',
    verdict: 'MYTH',
    reality: 'DFW is one of the most active foundation repair markets in the US. Documented repairs with a transferable warranty and an engineer\’s completion letter are considered routine and acceptable by most lenders and buyers. Undisclosed issues are the dealbreaker — not disclosed and repaired ones.',
    icon: '📋',
  },
  {
    belief: 'Watering your foundation is a Texas myth',
    verdict: 'MYTH',
    reality: 'It\’s very real — but most homeowners do it wrong. DFW foundation watering should maintain consistent soil moisture, not saturate. A soaker hose 12–18 inches from the perimeter, run 30–60 min 3x per week in dry seasons, is the standard recommendation by DFW structural engineers.',
    icon: '💧',
  },
  {
    belief: 'Foundation repair is only cosmetic',
    verdict: 'MYTH',
    reality: 'Foundation movement in DFW causes doors to bind, windows to crack, plumbing to shift, and interior walls to shear. Ignoring early signs (sticking doors, diagonal drywall cracks) allows structural problems to compound. Early intervention costs $3K–$8K; delayed repair can exceed $30K.',
    icon: '⚠️',
  },
];

const verdictColor: Record<string, string> = {
  MYTH: '#EF4444',
  FACT: '#10B981',
};

export default function DFWFoundationMythsGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW Foundation Myths — Debunked</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>DFW clay soil makes foundation topics unavoidable. Here's what’s true and what’s fear-mongering.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {myths.map((m, i) => (
            <div
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? '#0F2040′ : '#111D33',
                border: `1px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`,
                borderRadius: 12,
                padding: '18px 20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24 }}>{m.icon}</span>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{m.belief}</span>
                </div>
                <span style={{
                  background: verdictColor[m.verdict] || '#EF4444',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 20,
                  flexShrink: 0,
                  marginLeft: 12,
                }}>{m.verdict}</span>
              </div>
              {selected === i && (
                <div style={{ marginTop: 14, padding: '14px', background: '#0A1628', borderRadius: 8, color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>
                  {m.reality}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 36, padding: 20, background: '#111D33', borderRadius: 12, border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>Get a DFW Foundation Expert You Can Trust</p>
          <p style={{ color: '#94A3B8', fontSize: 13 }}>ProLnk connects DFW homeowners with vetted foundation specialists who know Blackland Prairie soil and give honest assessments.</p>
        </div>
      </div>
    </div>
  );
}
