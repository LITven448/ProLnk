import { useState } from 'react';

const ACREAGES = [
  { id: 'small', label: '2–5 Acres', checklist: ['Annual fence walk for broken boards/wire', 'Check water trough/automatic waterers monthly', 'Mow pasture 2–3x per year', 'Maintain single-stall barn electrical annually'] },
  { id: 'medium', label: '5–20 Acres', checklist: ['Quarterly fence inspection (perimeter + cross-fencing)', 'Pasture rotation plan (2–3 paddocks recommended)', 'Barn ventilation inspection before summer', 'Arena footing refresh every 2–3 years', 'Annual well water testing if horse water source'] },
  { id: 'large', label: '20+ Acres', checklist: ['Semi-annual full fence audit with repair crew', 'Professional pasture soil test every 3 years', 'Multiple water sources with backup', 'Arena lighting, drainage, and footing annual inspection', 'Fire suppression planning for large barn structures', 'Dedicated propane or natural gas for barn heating'] },
];

const FENCING = [
  { type: '🪵 Board Fence', pros: 'Traditional look, horse-safe, highly visible', cons: 'Higher cost, requires painting/staining every 5 years' },
  { type: '🔩 T-Post + Wire', pros: 'Lowest cost, fast to install', cons: 'Not ideal for horses — risk of injury; better for cattle' },
  { type: '⬛ Pipe Rail', pros: 'Extremely durable, low maintenance, horse-safe', cons: 'High upfront cost, requires welding for repairs' },
  { type: '🟡 Electric Tape', pros: 'Good for interior paddock division, low cost', cons: 'Not suitable as primary perimeter fence' },
];

export default function DFWEquinePropertyGuide2026() {
  const [selectedAcreage, setSelectedAcreage] = useState<string | null>(null);

  const found = ACREAGES.find(a => a.id === selectedAcreage);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk · DFW Guides</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🐴 DFW Equine Property Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          DFW's outer counties — Parker, Wise, Ellis, Hood, and Johnson — host tens of thousands of horses. Maintaining a safe, functional equine property requires specialized contractors who understand barn electrical, arena footing, perimeter fencing, and water systems.
        </p>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📐 Property Size → Maintenance Checklist</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
            {ACREAGES.map(a => (
              <button key={a.id} onClick={() => setSelectedAcreage(a.id)} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, backgroundColor: selectedAcreage === a.id ? '#F5E642′ : '#1e2d4a', color: selectedAcreage === a.id ? '#0A1628' : '#fff' }}>{a.label}</button>
            ))}
          </div>
          {found && (
            <div>
              <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 15 }}>Maintenance Checklist for {found.label}:</h3>
              {found.checklist.map((item, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e2d4a', fontSize: 14, color: '#cbd5e1′ }}>✅ {item}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏗️ Fencing Type Comparison</h2>
          {FENCING.map((f, i) => (
            <div key={i} style={{ marginBottom: 16, backgroundColor: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 15 }}>{f.type}</div>
              <div style={{ color: '#4ade80', fontSize: 13, marginBottom: 2 }}>✅ {f.pros}</div>
              <div style={{ color: '#f87171', fontSize: 13 }}>⚠️ {f.cons}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🏟️</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Arena Footing</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Sand and rubber mix is gold standard. Refresh every 2–3 years. Grade and drag monthly to prevent hardpacking and dust.</div>
          </div>
          <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>💧</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Water for Horses</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Test well water annually for bacteria and nitrates. Horses drink 5–10 gallons/day. Automatic waterers require quarterly servicing.</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <h2 style={{ color: '#0A1628', fontWeight: 800, marginBottom: 8 }}>Connect with Equine Property Contractors</h2>
          <p style={{ color: '#0A1628', marginBottom: 16, fontSize: 14 }}>ProLnk matches horse property owners with barn electricians, fencing pros, arena contractors, and well services across DFW.</p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', border: 'none', padding: '12px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get Free Equine Property Quotes →</button>
        </div>
      </div>
    </div>
  );
}