import { useState } from 'react';

const levels = [
  { id: 'mild', label: '😌 Mild Allergies (seasonal sniffles)', rec: 'MERV-13 media air cleaner in return duct — filters pollen, dust, pet dander. Change filter 1x/year.', cost: '$400–$700 installed' },
  { id: 'moderate', label: '😤 Moderate Allergies (cedar/ragweed)', rec: 'Electronic air cleaner (electrostatic precipitator) — captures particles MERV-13 misses, washable plates', cost: '$600–$1,000 installed' },
  { id: 'severe', label: '🤒 Severe / Asthma / Chemical Sensitivity', rec: 'PCO + HEPA media combo — destroys VOCs + captures sub-micron particles. Hospital-grade air quality.', cost: '$900–$1,500 installed' },
  { id: 'pets', label: '🐾 Pets + Dander', rec: 'Electronic air cleaner + MERV-16 pre-filter — electrostatic plates trap pet dander and hair effectively', cost: '$700–$1,100 installed' },
];

export default function DFWAirPurifierGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = levels.find(l => l.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌿</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Whole-Home Air Purifier Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW cedar season (Dec–Mar) is one of the worst allergy seasons in the US. Your HVAC can be your defense.</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>📊 DFW Allergy Season Calendar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Cedar Season', value: 'Dec–Mar' },
              { label: 'Ragweed Season', value: 'Aug–Nov' },
              { label: 'Grass Pollen', value: 'Apr–Jun' },
              { label: 'Mold Spores', value: 'Year-Round' },
            ].map(item => (
              <div key={item.label} style={{ background: '#1a2f4a', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.label}</div>
                <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 700 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>🔍 Select Your Allergy Severity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {levels.map(l => (
              <button key={l.id} onClick={() => setSelected(l.id === selected ? null : l.id)}
                style={{ background: selected === l.id ? '#F5E642' : '#1a2f4a', color: selected === l.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {l.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: 16, background: '#1a2f4a', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Air Purification Solution</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 8 }}>{match.rec}</div>
              <div style={{ color: '#F5E642', fontSize: 13 }}>💰 Installed Cost: {match.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>⚙️ Technology Comparison</h2>
          {[
            { tech: 'Media Filter (MERV-13+)', icon: '🗂️', desc: 'Dense filter captures large particles. No electricity. Annual replacement $50–120. Best baseline option.' },
            { tech: 'Electronic Air Cleaner', icon: '⚡', desc: 'Electrostatic plates charge particles and trap them. Washable — no filter cost. Captures sub-micron.' },
            { tech: 'PCO Technology', icon: '☀️', desc: 'UV + catalyst destroys VOCs, odors, and biological contaminants at the molecular level.' },
          ].map(t => (
            <div key={t.tech} style={{ background: '#1a2f4a', borderRadius: 8, padding: '12px 14px', marginBottom: 10, display: 'flex', gap: 12 }}>
              <div style={{ fontSize: 24 }}>{t.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{t.tech}</div>
                <div style={{ color: '#e2e8f0', fontSize: 13, marginTop: 4 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
