import { useState } from 'react';

const conditions = ['Full Sun', 'Partial Shade', 'Heavy Clay Soil', 'Sandy Soil', 'Drought-Prone'];
const usages = ['Low Traffic', 'High Traffic Play Area', 'Lawn Aesthetics', 'Low Maintenance'];

const comparison = {
  Zoysia: { water: 'Low once established', mow: 'Every 10-14 days', cost: '$0.35–0.55/sq ft sod', establish: '1–2 seasons', shade: 'Moderate', traffic: 'Moderate-High', drought: 'Excellent' },
  Bermuda: { water: 'Moderate', mow: 'Weekly', cost: '$0.20–0.40/sq ft sod', establish: '1 season', shade: 'Poor', traffic: 'Excellent', drought: 'Good' },
  'St. Augustine': { water: 'High', mow: 'Weekly', cost: '$0.30–0.50/sq ft sod', establish: '1 season', shade: 'Good', traffic: 'Low-Moderate', drought: 'Poor' },
};

export default function DFWZoysiaGrassGuide() {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedUsage, setSelectedUsage] = useState('');
  const [showResults, setShowResults] = useState(false);

  function getRecommendation() {
    if (selectedCondition === 'Partial Shade' || selectedCondition === 'Heavy Clay Soil') return 'Zoysia';
    if (selectedUsage === 'High Traffic Play Area') return 'Bermuda';
    if (selectedUsage === 'Low Maintenance') return 'Zoysia';
    return 'Zoysia';
  }

  const recommended = getRecommendation();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🌿 DFW LAWN GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Zoysia Grass in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          Zoysia is gaining fast in DFW — slower to establish but more drought-tolerant than St. Augustine and requires less water than bermuda once established. For DFW homeowners tired of high water bills, zoysia is worth a serious look.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚡ DFW Fast Facts</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20 }}>
            <li>Zoysia goes dormant (brown) Nov–Mar in DFW — plan accordingly</li>
            <li>Best time to sod: May–August when soil temps above 70°F</li>
            <li>DFW clay soil: amend with expanded shale before laying sod</li>
            <li>Zoysia spreads slowly — expect 1–2 seasons to fill in from plugs</li>
            <li>Tolerates DFW summers better than St. Augustine once roots established</li>
          </ul>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Find Your Best Grass Match</h2>
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Your DFW yard condition:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {conditions.map(c => (
                <button key={c} onClick={() => setSelectedCondition(c)} style={{ background: selectedCondition === c ? '#F5E642′ : '#1e3a5f', color: selectedCondition === c ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13 }}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Primary usage:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {usages.map(u => (
                <button key={u} onClick={() => setSelectedUsage(u)} style={{ background: selectedUsage === u ? '#F5E642′ : '#1e3a5f', color: selectedUsage === u ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13 }}>{u}</button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResults(true)} disabled={!selectedCondition || !selectedUsage} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', opacity: (!selectedCondition || !selectedUsage) ? 0.5 : 1 }}>Compare Grasses</button>
        </div>

        {showResults && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>✅ Recommended for your yard: {recommended}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {Object.entries(comparison).map(([grass, data]) => (
                <div key={grass} style={{ background: grass === recommended ? '#1a3a6a' : '#0A1628', border: `1px solid ${grass === recommended ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: 14 }}>
                  <div style={{ color: grass === recommended ? '#F5E642′ : '#94a3b8', fontWeight: 700, marginBottom: 8 }}>{grass} {grass === recommended ? '⭐' : ''}</div>
                  {Object.entries(data).map(([k, v]) => (
                    <div key={k} style={{ fontSize: 12, color: '#cbd5e1', marginBottom: 4 }}><span style={{ color: '#64748b' }}>{k}:</span> {v}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
