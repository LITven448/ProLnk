import { useState } from 'react';

const steps = [
  { icon: '🔍', label: 'Job Posted', desc: 'Homeowner posts job with details, location, urgency' },
  { icon: '🧠', label: 'AI Analyzes', desc: 'Model scores 200+ signals: proximity, rating, availability, trade match' },
  { icon: '📊', label: 'Learning Loop', desc: 'Every completed job feeds rating data back into the model' },
  { icon: '🎯', label: 'Better Matches', desc: 'Match quality improves with every job in DFW market' },
];

const tradeMap: Record<string, string[]> = {
  Plumbing: ['Burst pipe urgency scoring', 'Seasonal freeze-thaw patterns', 'DFW water pressure anomalies', 'Pro availability during storms'],
  HVAC: ['Summer peak demand routing', 'Preventive tune-up timing', 'Brand-specific expertise matching', 'Emergency vs scheduled dispatch'],
  Electrical: ['Code compliance signals', 'Panel upgrade demand clustering', 'Storm outage surge detection', 'Permit-required job flagging'],
  Roofing: ['Post-storm demand spikes', 'Material lead time awareness', 'HOA approval flag routing', 'Seasonal scheduling optimization'],
};

export default function ProLnkAIMatchingExplainer() {
  const [selected, setSelected] = useState<string>('Plumbing');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🧠</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>ProLnk AI Matching Technology</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>
            Every job makes the next match smarter. Our AI learns DFW-specific patterns that generic platforms never see.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 13, color: '#94a3b8′ }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>
            🎯 How AI Optimizes Your Trade
          </h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
            {Object.keys(tradeMap).map(t => (
              <button key={t} onClick={() => setSelected(t)}
                style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                  background: selected === t ? '#F5E642′ : '#1e3a5f', color: selected === t ? '#0A1628' : '#fff' }}>
                {t}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {tradeMap[selected].map((item, i) => (
              <div key={i} style={{ background: '#162033', borderRadius: 10, padding: 16, borderLeft: '3px solid #F5E642′ }}>
                <span style={{ fontSize: 13, color: '#cbd5e1′ }}>✅ {item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1a2f4e, #0f1f3d)', border: '1px solid #F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>📈</div>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642', marginBottom: 8 }}>Why AI Beats Manual Dispatch</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 20 }}>
            {[['200+', 'signals per match'], ['48hr', 'demand forecasting'], ['DFW-tuned', 'local patterns']].map(([v, l], i) => (
              <div key={i}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>{v}</div>
                <div style={{ fontSize: 13, color: '#94a3b8′ }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}