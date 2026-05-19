import { useState } from 'react';

const symptoms = [
  {
    id: 'horizontal',
    label: 'Horizontal crack in brick or block wall',
    verdict: 'emergency',
    detail: '🚨 STRUCTURAL EMERGENCY — Horizontal cracks indicate lateral soil pressure overcoming the wall. Call a structural engineer immediately. Do not delay.'
  },
  {
    id: 'suddenLarge',
    label: 'Large crack appeared overnight (>1/4 inch wide)',
    verdict: 'emergency',
    detail: '🚨 URGENT — Sudden crack formation indicates rapid movement. In DFW clay soils, this often follows a drought-to-rain cycle. Engineer assessment needed within 24–48 hours.'
  },
  {
    id: 'doorJam',
    label: 'Door jammed shut or won’t latch — appeared suddenly',
    verdict: 'urgent',
    detail: '⚠️ URGENT — Sudden door jamming across multiple doors simultaneously signals active foundation movement. Single door may be humidity swelling. Multiple doors = engineer visit this week.'
  },
  {
    id: 'stairStep',
    label: 'Stair-step crack in brick exterior',
    verdict: 'monitor',
    detail: '📋 MONITOR — Stair-step brick cracks are common in DFW and often indicate differential settlement. Hairline = normal. Widening over time = get a pier quote. Measure and photograph monthly.'
  },
  {
    id: 'hairline',
    label: 'Hairline crack in drywall (thin as a pencil line)',
    verdict: 'normal',
    detail: '✅ NORMAL — Hairline drywall cracks are extremely common in DFW due to expansive clay soils and seasonal movement. Patch and monitor. Not a structural concern unless widening.'
  },
  {
    id: 'floor',
    label: 'Floor noticeably sloping or bouncing',
    verdict: 'urgent',
    detail: '⚠️ URGENT — Sloping floors in DFW slab homes indicate differential pier settlement or slab heave. Get a foundation inspection — free from most DFW foundation companies.'
  },
];

const verdictColors: Record<string, string> = {
  emergency: '#ef4444',
  urgent: '#f97316',
  monitor: '#eab308',
  normal: '#22c55e',
};

export default function DFWFoundationEmergencyGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = symptoms.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK — DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏗️ DFW Foundation Emergency Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          DFW has some of the most expansive clay soils in the country. Foundation movement is common — but knowing what's an emergency vs. normal seasonal movement can save you from panic or ignoring a real problem.
        </p>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🩺 Symptom Severity Checker</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {symptoms.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{
                  background: selected === s.id ? '#F5E642′ : '#0A1628',
                  color: selected === s.id ? '#0A1628′ : '#fff',
                  border: `1px solid ${selected === s.id ? '#F5E642' : verdictColors[s.verdict]}`,
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
            <div style={{ background: '#0A1628', border: `2px solid ${verdictColors[match.verdict]}`, borderRadius: 8, padding: 16 }}>
              <div style={{ color: verdictColors[match.verdict], fontWeight: 800, fontSize: 16, marginBottom: 8 }}>
                {match.verdict.toUpperCase()}
              </div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{match.detail}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#F5E642′ }}>🌧️ DFW Soil Context</h2>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            DFW's Blackland Prairie clay (Expansive Category III) shrinks during drought and expands aggressively when it rains. This causes more foundation movement than almost any other metro in the US. Seasonal monitoring — especially after a drought breaks — is essential for DFW homeowners.
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Need a DFW Foundation Pro?</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>ProLnk connects you with licensed foundation contractors for free inspections and pier quotes.</div>
        </div>
      </div>
    </div>
  );
}
