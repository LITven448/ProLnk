import { useState } from 'react';

export default function DFWFoundationGoodBetterBest2026() {
  const [situation, setSituation] = useState('');
  const [budget, setBudget] = useState('');

  const getTier = () => {
    if (!situation || !budget) return null;
    if (budget === 'tight') return 'good';
    if (budget === 'moderate') return 'better';
    return 'best';
  };

  const tier = getTier();

  const tiers: Record<string, { label: string; points: string[]; note: string }> = {
    good: {
      label: '✅ Good — Minimum Stabilization',
      points: ['Pressed concrete or steel piers at critical failure points', 'Stops active movement', 'Monitor annually after repair', 'Best for: Minor settling, tight budget', 'Est. cost: $3,500–$6,000'],
      note: 'Stops the bleeding. Gets your home stable without full remediation.',
    },
    better: {
      label: '⭐ Better — Recommended Pier Count + Drainage',
      points: ['Full recommended pier count per engineer', 'French drain or surface drainage added', 'Addresses root cause: moisture imbalance', 'Warranty typically 5–10 years', 'Est. cost: $7,000–$14,000'],
      note: 'The sweet spot for most DFW homes. Solves the cause, not just symptoms.',
    },
    best: {
      label: '🏆 Best — Full Perimeter + Interior + Drainage + Soil',
      points: ['Full perimeter and interior pier system', 'Soil stabilization injection', 'Drainage redesign: gutters, grading, French drains', 'Transferable lifetime warranty', 'Est. cost: $15,000–$35,000+'],
      note: 'The permanent fix. Critical for expansive clay soils in North DFW.',
    },
  };

  const situations = [['minor-crack', '🔍 Minor cracks'], ['door-sticking', '🚪 Doors sticking'], ['sloping-floors', '📐 Sloping floors'], ['major-crack', '⚠️ Major cracks'], ['previous-repair', '🔧 Prior repair']];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>🏗️ DFW Foundation Repair Good / Better / Best</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>DFW sits on some of the most expansive clay soil in North America. Choosing the right repair level protects your largest investment.</p>
        <div style={{ background: '#0f1f38', borderRadius: 12, padding: 16, marginBottom: 24, border: '1px solid #F5E642′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>⚠️ DFW Clay Soil Warning</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>DFW expansive clay can shift 4–6 inches seasonally. Always get a structural engineer report before choosing a repair level.</div>
        </div>
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
          <div style={{ fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🎯 Get Your Repair Level</div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Current situation</div>
            {situations.map(([v, l]) => (
              <button key={v} onClick={() => setSituation(v)} style={{ marginRight: 8, marginBottom: 8, padding: '6px 14px', borderRadius: 20, border: '1px solid #1e3a5f', background: situation === v ? '#F5E642′ : '#0A1628', color: situation === v ? '#0A1628' : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 12 }}>
                {l}
              </button>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Budget range</div>
            {([['tight', 'Under $7K'], ['moderate', '$7K–$15K'], ['premium', '$15K+']] as [string,string][]).map(([v, l]) => (
              <button key={v} onClick={() => setBudget(v)} style={{ marginRight: 8, marginBottom: 8, padding: '6px 14px', borderRadius: 20, border: '1px solid #1e3a5f', background: budget === v ? '#F5E642′ : '#0A1628', color: budget === v ? '#0A1628' : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>
                {l}
              </button>
            ))}
          </div>
          {tier && <div style={{ marginTop: 16, padding: 14, background: '#F5E642', borderRadius: 8, color: '#0A1628', fontWeight: 700 }}>Recommended: {tiers[tier].label}</div>}
        </div>
        <div style={{ marginTop: 32, textAlign: 'center', color: '#64748b', fontSize: 12 }}>ProLnk connects DFW homeowners with certified foundation specialists — prolnk.io</div>
      </div>
    </div>
  );
}
