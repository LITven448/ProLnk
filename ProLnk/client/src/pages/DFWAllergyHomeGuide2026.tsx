import { useState } from 'react';

const triggers = [
  { id: 'cedar', label: '🌲 Cedar Pollen', peak: 'Dec–Feb', mods: ['MERV-13+ HVAC filter', 'HEPA air purifier in bedroom', 'Seal window gaps', 'Remove indoor plants that trap pollen'] },
  { id: 'oak', label: '🌳 Oak/Elm Pollen', peak: 'Mar–May', mods: ['MERV-13+ HVAC filter', 'Hard flooring instead of carpet', 'Weekly damp mop floors', 'Air purifier near entry points'] },
  { id: 'grass', label: '🌿 Grass Pollen', peak: 'May–Aug', mods: ['Keep indoor humidity 45–50%', 'HEPA vacuum weekly', 'Remove shoes at door', 'Shower before bed during peak season'] },
  { id: 'mold', label: '🍄 Mold Spores', peak: 'Year-round', mods: ['Dehumidifier target 45–50% RH', 'Fix any water leaks immediately', 'Duct cleaning every 3–5 years', 'Hard flooring preferred over carpet'] },
  { id: 'dust', label: '🪲 Dust Mites', peak: 'Summer (humidity)', mods: ['Humidity below 50% kills mites', 'MERV-13 filter traps particles', 'Wash bedding weekly in hot water', 'HEPA vacuum all soft surfaces'] },
];

const tips = [
  { icon: '🔬', title: 'MERV-13 Minimum', body: 'DFW cedar season (Dec–Feb) is among the worst in the US. Standard MERV-8 filters miss 40% of fine pollen particles. MERV-13 captures 90%+ of particles 1 micron and larger.' },
  { icon: '💧', title: 'Humidity Sweet Spot', body: '45–50% relative humidity is the allergy-reduction zone. Below 30% dries mucous membranes. Above 55% accelerates mold and dust mite growth — both major DFW allergy triggers.' },
  { icon: '🪵', title: 'Hard Flooring vs Carpet', body: 'Carpet holds 100x more allergens per square foot than hard flooring. DFW allergists consistently recommend tile, hardwood, or LVP. Area rugs should be washed monthly.' },
  { icon: '🌬', title: 'Duct Cleaning Debate', body: 'NADCA recommends duct cleaning when visible mold, pest debris, or heavy dust buildup exists. Otherwise, regular MERV-13 filter changes (every 60 days) provide equal benefit at lower cost.' },
];

export default function DFWAllergyHomeGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = triggers.find(t => t.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 12, fontWeight: 700, marginBottom: 16 }}>DFW HOME HEALTH 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🤧 Allergy-Proof Your DFW Home</h1>
        <p style={{ color: '#8899BB', marginBottom: 32 }}>DFW ranks in the top 5 worst allergy cities in the US. Cedar, oak, grass pollen, and mold spores combine for a year-round assault. Here's how to fight back inside your home.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {tips.map(tip => (
            <div key={tip.title} style={{ background: '#111E35', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{tip.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{tip.title}</div>
              <div style={{ fontSize: 13, color: '#8899BB', lineHeight: 1.5 }}>{tip.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 10, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🎯 My Allergy Trigger → Home Fix</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {triggers.map(t => (
              <button key={t.id} onClick={() => setSelected(t.id === selected ? null : t.id)}
                style={{ background: selected === t.id ? '#F5E642' : '#1C2E4A', color: selected === t.id ? '#0A1628' : '#E8EDF5', border: 'none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {t.label}<br /><span style={{ fontSize: 11, fontWeight: 400 }}>Peak: {t.peak}</span>
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>Priority modifications for {active.label}:</div>
              {active.mods.map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontSize: 14 }}>{m}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#111E35', borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Ready to improve your home's air quality?</div>
          <div style={{ fontSize: 13, color: '#8899BB' }}>Connect with a ProLnk-vetted HVAC or air quality specialist in the DFW area.</div>
        </div>
      </div>
    </div>
  );
}
