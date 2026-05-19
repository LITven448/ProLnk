import { useState } from 'react';

const concerns = ['Hardness', 'Taste/Odor', 'Safety/Bacteria', 'All'];
const recs: Record<string, { kit: string; cost: string; note: string }> = {
  Hardness: { kit: 'TDS Meter', cost: '$10–20', note: 'Quick spot-check for dissolved solids. DFW averages 300–400 ppm. Above 180 = hard water confirmed.' },
  'Taste/Odor': { kit: 'Basic Mail-In Panel', cost: '$30–60', note: 'Tests chlorine, chloramine, pH, iron. Order from National Testing Labs or SimpleLab.' },
  'Safety/Bacteria': { kit: 'Coliform + Nitrate Panel', cost: '$80–120', note: 'Critical for well water or older homes. Tests E. coli, total coliform, nitrates (baby risk).' },
  All: { kit: 'Comprehensive Mail-In Panel', cost: '$120–150', note: 'Hardness, chlorine, nitrates, bacteria, heavy metals. Best for full picture or pre-purchase testing.' },
};

export default function DFWWaterTestingGuide2026() {
  const [concern, setConcern] = useState<string>('Hardness');
  const rec = recs[concern];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>🚰 DFW Water Testing Guide 2026</div>
        <div style={{ color: '#8899AA', marginBottom: '2rem' }}>DFW water is among the hardest in the nation. Know what you're drinking.</div>

        <div style={{ background: '#111E35', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📋 What to Test For in DFW</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { icon: '💎', title: 'Hardness (300–400 ppm avg)', desc: 'Damages appliances, leaves scale on faucets. DFW is classified hard to very hard.' },
              { icon: '☣️', title: 'Chlorine & Chloramine', desc: 'Dallas adds chloramine for disinfection. Affects taste and aquarium fish.' },
              { icon: '🌿', title: 'Nitrates', desc: 'Risk for infants <6 months. Elevated near agricultural runoff or older neighborhoods.' },
              { icon: '🦠', title: 'Bacteria (Well Water Only)', desc: 'City water is treated but well water requires annual coliform testing.' },
              { icon: '📄', title: 'City Water Report vs Private Test', desc: 'DWSD publishes annual CCR. Private test catches point-of-use contamination from your pipes.' },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div><div style={{ fontWeight: 600 }}>{item.title}</div><div style={{ color: '#8899AA', fontSize: '0.9rem' }}>{item.desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🔍 Concern → Testing Recommendation</div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#8899AA', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Primary Concern</div>
            <select value={concern} onChange={(e) => setConcern(e.target.value)} style={{ background: '#0A1628', border: '1px solid #2A3A55', borderRadius: '8px', padding: '0.5rem 1rem', color: '#E8EDF5′ }}>
              {concerns.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.25rem' }}>{rec.kit} — {rec.cost}</div>
              <div style={{ color: '#E8EDF5', fontSize: '0.95rem' }}>{rec.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
