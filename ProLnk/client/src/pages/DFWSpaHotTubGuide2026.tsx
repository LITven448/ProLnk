import { useState } from 'react';

const spaTypes = [
  { id: 'acrylic', label: '🛁 Acrylic Spa', tips: ['Test water 2x/week in DFW summer heat', 'Add water weekly — DFW evaporation can drop levels 1-2 inches', 'Run jets 15-30 min daily to prevent biofilm in warm temps', 'Clean filter monthly; DFW dust loads filters fast'] },
  { id: 'saltwater', label: '🧂 Salt Water Spa', tips: ['Maintain salt at 2,500-3,000 ppm — DFW hard water shifts this', 'Check calcium hardness monthly; target 150-250 ppm to prevent scaling on cell', 'Clean salt cell quarterly — DFW mineral deposits build fast', 'Still need to balance pH and alkalinity weekly'] },
  { id: 'inflatable', label: '💨 Inflatable / Portable Spa', tips: ['Drain and refill every 60-90 days in DFW heat (bacteria risk)', 'Use a floating thermometer — DFW sun can superheat water fast', 'Store cover properly; UV degrades cheap covers quickly in DFW', 'Winterize if temps drop below 32°F — rare but happens in DFW'] },
];

export default function DFWSpaHotTubGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const tips = spaTypes.find(s => s.id === selected)?.tips ?? [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>♨️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0′ }}>DFW Spa & Hot Tub Guide 2026</h1>
          <p style={{ color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>
            DFW's 9-month outdoor season means your spa works overtime. High heat, hard water, and rare freezes
            create unique maintenance demands. Know what to expect.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '☀️', label: '9-Month Season', desc: 'March through November outdoor spa use is comfortable in DFW' },
            { icon: '💧', label: 'High Evaporation', desc: 'Expect to add water weekly — DFW summer heat pulls moisture fast' },
            { icon: '🧱', label: 'Hard Water', desc: 'DFW water is 200-400 ppm hardness; scale management is critical' },
            { icon: '❄️', label: 'Freeze Prep', desc: 'DFW freezes are rare but catastrophic — always have a winterization plan' },
          ].map(c => (
            <div key={c.label} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem', border: '1px solid #2d4a7a' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #2d4a7a' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔧 Salt Water Spas in DFW</h2>
          <p style={{ color: '#94a3b8′ }}>Salt water systems are growing in popularity — but DFW hard water creates unique challenges for salt cells. Calcium deposits on the cell can reduce chlorine output within weeks if ignored. Clean the cell with diluted muriatic acid quarterly and monitor output with a test strip.</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', border: '1px solid #2d4a7a' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🛁 Select Your Spa Type → DFW Maintenance Guide</h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {spaTypes.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '2px solid', borderColor: selected === s.id ? '#F5E642′ : '#2d4a7a', background: selected === s.id ? '#F5E642' : '#0A1628', color: selected === s.id ? '#0A1628' : '#fff', cursor: ’pointer', fontWeight: 600 }}>
                {s.label}
              </button>
            ))}
          </div>
          {tips.length > 0 && (
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {tips.map(t => <li key={t} style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}>{t}</li>)}
            </ul>
          )}
          {!selected && <p style={{ color: '#94a3b8′ }}>Select a spa type above to see your DFW-specific maintenance checklist.</p>}
        </div>
      </div>
    </div>
  );
}