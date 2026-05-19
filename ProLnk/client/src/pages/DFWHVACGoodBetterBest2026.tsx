import { useState } from 'react';

export default function DFWHVACGoodBetterBest2026() {
  const [priority, setPriority] = useState('');
  const [budget, setBudget] = useState('');

  const getTier = () => {
    if (!priority || !budget) return null;
    if (budget === 'tight') return 'good';
    if (budget === 'premium') return 'best';
    return 'better';
  };

  const tier = getTier();

  const tiers: Record<string, { label: string; points: string[]; note: string }> = {
    good: {
      label: '✅ Good — 15 SEER2 Standard',
      points: ['Meets 2026 Texas minimum code', 'Single-stage compressor', 'Handles DFW heat reliably', 'Lowest upfront cost', 'Est. cost: $4,500–$7,000 installed'],
      note: 'Gets the job done. Fine for rental properties or tight budgets.',
    },
    better: {
      label: '⭐ Better — 16–18 SEER2 Two-Stage',
      points: ['Two-stage cooling for DFW humidity', 'Longer run cycles = better dehumidification', 'Quieter operation', '15–20% lower energy bills vs Good', 'Est. cost: $7,000–$10,500 installed'],
      note: 'Best value for most DFW homeowners. Tackles humidity without premium price.',
    },
    best: {
      label: '🏆 Best — 18+ SEER2 Variable Speed',
      points: ['Variable speed compressor adapts continuously', 'Superior humidity control for DFW summers', 'Near-silent operation', '25–35% energy savings vs Good', 'Est. cost: $10,500–$16,000 installed'],
      note: 'The long-term investment. Pays back in 6–9 years via energy savings.',
    },
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>🌡️ DFW HVAC Good / Better / Best</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Which HVAC tier is right for your DFW home? DFW summers demand more than the national minimum. Use this guide to choose smart.</p>
        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {Object.entries(tiers).map(([key, t]) => (
            <div key={key} style={{ background: tier === key ? '#1e3a5f' : '#0f1f38', border: `2px solid ${tier === key ? '#F5E642' : '#1e3a5f'}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 10, color: tier === key ? '#F5E642′ : '#fff' }}>{t.label}</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#cbd5e1', lineHeight: 1.8 }}>
                {t.points.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
              <div style={{ marginTop: 12, fontSize: 13, color: '#94a3b8', fontStyle: 'italic' }}>{t.note}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#0f1f38', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🎯 Find Your Tier</div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Top priority</div>
            {['comfort', 'savings', 'reliability'].map(p => (
              <button key={p} onClick={() => setPriority(p)} style={{ marginRight: 8, marginBottom: 8, padding: '6px 14px', borderRadius: 20, border: '1px solid #1e3a5f', background: priority === p ? '#F5E642′ : '#0A1628', color: priority === p ? '#0A1628' : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Budget range</div>
            {([['tight', 'Under $7K'], ['moderate', '$7K–$11K'], ['premium', '$11K+']] as [string,string][]).map(([v, l]) => (
              <button key={v} onClick={() => setBudget(v)} style={{ marginRight: 8, marginBottom: 8, padding: '6px 14px', borderRadius: 20, border: '1px solid #1e3a5f', background: budget === v ? '#F5E642′ : '#0A1628', color: budget === v ? '#0A1628' : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>
                {l}
              </button>
            ))}
          </div>
          {tier && <div style={{ marginTop: 16, padding: 14, background: '#F5E642', borderRadius: 8, color: '#0A1628', fontWeight: 700 }}>Recommended: {tiers[tier].label}</div>}
        </div>
        <div style={{ marginTop: 32, textAlign: 'center', color: '#64748b', fontSize: 12 }}>ProLnk connects DFW homeowners with verified HVAC pros — prolnk.io</div>
      </div>
    </div>
  );
}
