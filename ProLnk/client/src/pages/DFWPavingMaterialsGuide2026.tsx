import { useState } from 'react';

const materials = [
  { type: 'Driveway', budget: 'Budget', name: 'Asphalt', icon: '🛣️', note: 'Affordable but softens in DFW summer heat above 100°F. Seal annually.' },
  { type: 'Driveway', budget: 'Mid-Range', name: 'Concrete', icon: '🏗️', note: 'Best for DFW driveways. Handles expansion/contraction. Control joints required.' },
  { type: 'Driveway', budget: 'Premium', name: 'Pavers', icon: '🧱', note: 'Great look but DFW clay soil settles — expect re-leveling every 5-7 years.' },
  { type: 'Patio', budget: 'Budget', name: 'Decomposed Granite', icon: '🪨', note: 'Permeable and affordable. Great for DFW rain events. Refresh every 2-3 years.' },
  { type: 'Patio', budget: 'Mid-Range', name: 'Concrete', icon: '🏗️', note: 'Durable for DFW patios. Stamp or stain for aesthetics. Seal every 2 years.' },
  { type: 'Patio', budget: 'Premium', name: 'Natural Stone Pavers', icon: '💎', note: 'Travertine and limestone are popular in DFW. Cool underfoot. Check drainage.' },
  { type: 'Pool Deck', budget: 'Budget', name: 'Brushed Concrete', icon: '🏊', note: 'Slip-resistant texture. Common in DFW. Handles heat but gets hot barefoot.' },
  { type: 'Pool Deck', budget: 'Mid-Range', name: 'Travertine', icon: '🌿', note: 'Stays cooler than concrete in DFW heat. Porous — needs sealing yearly.' },
  { type: 'Pool Deck', budget: 'Premium', name: 'Flagstone', icon: '🗿', note: 'Premium DFW choice. Natural look, very durable. Irregular joints need maintenance.' },
  { type: 'Walkway', budget: 'Budget', name: 'Stepping Stones', icon: '🚶', note: 'Easy DIY for DFW homeowners. Use with decomposed granite or ground cover.' },
  { type: 'Walkway', budget: 'Mid-Range', name: 'Brick Pavers', icon: '🧱', note: 'Classic DFW look. Clay soil movement can cause uneven surface over time.' },
  { type: 'Walkway', budget: 'Premium', name: 'Poured Concrete + Inlay', icon: '✨', note: 'Custom look with aggregate inlay. Permanent and durable for DFW climate.' },
];

export default function DFWPavingMaterialsGuide2026() {
  const [areaType, setAreaType] = useState('Driveway');
  const [budget, setBudget] = useState('Mid-Range');

  const result = materials.find(m => m.type === areaType && m.budget === budget);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>DFW Paving Materials Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW-specific guidance for outdoor paving — concrete, pavers, asphalt & more</p>
        </div>

        <div style={{ background: '#0F2137', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>🌡️ DFW Climate Factors</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['☀️', 'Extreme heat (100°F+)', 'Dark surfaces get dangerously hot'],
              ['🌧️', 'Flash flooding', 'Permeability matters for drainage'],
              ['🧱', 'Clay soil expansion', 'Pavers shift — concrete cracks'],
              ['❄️', 'Rare hard freezes', 'Thermal expansion in slabs'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ background: '#162842', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{title}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2137', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>🔍 Find Your Paving Material</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Area Type</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Driveway', 'Patio', 'Pool Deck', 'Walkway'].map(t => (
                <button key={t} onClick={() => setAreaType(t)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: areaType === t ? '#F5E642' : '#162842', color: areaType === t ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Budget Range</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Budget', 'Mid-Range', 'Premium'].map(b => (
                <button key={b} onClick={() => setBudget(b)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: budget === b ? '#F5E642' : '#162842', color: budget === b ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>{b}</button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: '#162842', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{result.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{result.name}</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{result.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2137', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 12 }}>📋 ProLnk Tip</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>Get 3 quotes from DFW-vetted paving contractors through ProLnk. All pros are licensed, insured, and familiar with DFW clay soil conditions. Your project specs and quotes are stored in your Home Health Vault for future reference.</p>
        </div>
      </div>
    </div>
  );
}