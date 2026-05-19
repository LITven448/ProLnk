import { useState } from 'react';

const efLevels = [
  { ef: 'EF0', wind: '65–85 mph', color: '#22c55e', emoji: '🟢', duration: '1–3 min avg', trackLen: '< 1 mile typical', constructions: { 'Wood Frame': 'Minor — shingles, gutters, siding damage', 'Brick Veneer': 'Negligible — cosmetic only', 'Mobile Home': 'Significant — structural concern', 'Concrete Block': 'Negligible' }, shelter: 'Interior room, lowest floor', action: 'Monitor alerts, shelter in place' },
  { ef: 'EF1', wind: '86–110 mph', color: '#84cc16', emoji: '🟡', duration: '2–5 min avg', trackLen: '1–3 miles typical', constructions: { 'Wood Frame': 'Moderate — roof damage, windows broken', 'Brick Veneer': 'Minor — cosmetic brick damage', 'Mobile Home': 'Severe — likely total loss', 'Concrete Block': 'Minor — roof attachments at risk' }, shelter: 'Interior hallway, bathroom, lowest floor', action: 'Take shelter immediately — do not wait' },
  { ef: 'EF2', wind: '111–135 mph', color: '#f59e0b', emoji: '🟠', duration: '3–8 min avg', trackLen: '3–10 miles', constructions: { 'Wood Frame': 'Severe — roof removed, walls may fail', 'Brick Veneer': 'Moderate — brick cladding failure', 'Mobile Home': 'Destruction — move to permanent structure', 'Concrete Block': 'Moderate — potential partial wall failure' }, shelter: 'Storm shelter or interior reinforced room', action: 'Underground shelter preferred' },
  { ef: 'EF3', wind: '136–165 mph', color: '#ef4444', emoji: '🔴', duration: '5–15 min avg', trackLen: '10–30 miles', constructions: { 'Wood Frame': 'Destruction — complete structural loss', 'Brick Veneer': 'Severe — masonry fails, walls collapse', 'Mobile Home': 'Complete destruction', 'Concrete Block': 'Severe — block walls may collapse' }, shelter: 'Below-grade storm shelter ONLY', action: 'Only underground shelter provides protection' },
  { ef: 'EF4', wind: '166–200 mph', color: '#7c3aed', emoji: '🟣', duration: '10–20 min avg', trackLen: '20–50+ miles', constructions: { 'Wood Frame': 'Complete destruction — swept from foundation', 'Brick Veneer': 'Total loss — walls and foundation at risk', 'Mobile Home': 'Complete destruction — no protection', 'Concrete Block': 'Severe to complete destruction' }, shelter: 'Reinforced underground shelter', action: 'Underground shelter is survival requirement' },
  { ef: 'EF5', wind: '200+ mph', color: '#be123c', emoji: '⛔', duration: 'Rare — minutes', trackLen: 'Highly variable', constructions: { 'Wood Frame': 'Swept clean — concrete slab remains', 'Brick Veneer': 'Complete destruction', 'Mobile Home': 'Complete destruction — no survival in path', 'Concrete Block': 'Complete destruction' }, shelter: 'Reinforced underground shelter — highest urgency', action: 'If no shelter: lowest floor, most interior room, cover with mattress' },
];

const constructionTypes = ['Wood Frame', 'Brick Veneer', 'Mobile Home', 'Concrete Block'];

export default function DFWTornadoRatingGuide() {
  const [selectedEF, setSelectedEF] = useState<number | null>(null);
  const [selectedConstruction, setSelectedConstruction] = useState<string | null>(null);

  const ef = selectedEF !== null ? efLevels[selectedEF] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🌪️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW Tornado Rating Guide
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: 580, margin: '0 auto' }}>
            DFW averages 20–30 tornado warnings per year. The EF scale rates tornadoes by damage caused. Select an EF level and your home construction type to see expected damage and survival guidance.
          </p>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🌪️ Select EF Rating</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {efLevels.map((e, i) => (
              <button key={e.ef} onClick={() => setSelectedEF(i === selectedEF ? null : i)}
                style={{ background: selectedEF === i ? e.color : '#0A1628', border: `2px solid ${e.color}`, borderRadius: '10px', padding: '0.75rem 1rem', cursor: 'pointer', color: '#fff', fontWeight: 700, transition: 'all 0.2s', minWidth: 90, textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem' }}>{e.emoji}</div>
                <div>{e.ef}</div>
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1′ }}>{e.wind}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🏠 Select Home Construction Type</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {constructionTypes.map((c) => (
              <button key={c} onClick={() => setSelectedConstruction(c === selectedConstruction ? null : c)}
                style={{ background: selectedConstruction === c ? '#1e3a5f' : '#0A1628', border: selectedConstruction === c ? '2px solid #F5E642′ : '2px solid #2d4a6b', borderRadius: '10px', padding: '0.75rem 1.2rem', cursor: ’pointer', color: '#fff', fontWeight: 600, transition: 'all 0.2s' }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {ef && (
          <div style={{ background: '#1e2d47', borderRadius: '16px', padding: '1.5rem', border: `2px solid ${ef.color}`, marginBottom: '1.5rem' }}>
            <h3 style={{ color: ef.color, marginBottom: '1rem' }}>{ef.emoji} {ef.ef} — {ef.wind}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>⏱️ Typical Duration</div>
                <div style={{ color: '#e2e8f0′ }}>{ef.duration}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>📏 Track Length</div>
                <div style={{ color: '#e2e8f0′ }}>{ef.trackLen}</div>
              </div>
            </div>
            {selectedConstruction && (
              <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>🏗️ {selectedConstruction} — Expected Damage</div>
                <div style={{ color: '#e2e8f0′ }}>{(ef.constructions as Record<string,string>)[selectedConstruction]}</div>
              </div>
            )}
            {!selectedConstruction && (
              <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🏗️ Damage by Construction Type</div>
                {constructionTypes.map((c) => (
                  <div key={c} style={{ marginBottom: '0.4rem', color: '#e2e8f0', fontSize: '0.9rem' }}><strong style={{ color: '#94a3b8′ }}>{c}:</strong> {(ef.constructions as Record<string,string>)[c]}</div>
                ))}
              </div>
            )}
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>🛡️ Shelter Recommendation</div>
              <div style={{ color: '#e2e8f0′ }}>{ef.shelter}</div>
            </div>
            <div style={{ background: ef.color, borderRadius: '10px', padding: '1rem', textAlign: 'center', fontWeight: 700 }}>
              ⚡ {ef.action}
            </div>
          </div>
        )}

        <div style={{ background: '#1e2d47', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>📊 DFW Tornado History (avg per decade)</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            {[['EF0–EF1', '185', '#22c55e'], ['EF2–EF3', '28', '#ef4444'], ['EF4–EF5', '3', '#7c3aed']].map(([label, count, color]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color }}>{count}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{label} per decade</div>
              </div>
            ))}
          </div>
        </div>

        {!ef && (
          <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '1.5rem' }}>
            👆 Select an EF rating above to see damage assessment and survival guidance
          </div>
        )}
      </div>
    </div>
  );
}
