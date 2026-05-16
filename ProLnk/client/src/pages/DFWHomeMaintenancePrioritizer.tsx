import { useState } from 'react';

type Item = {
  id: string;
  label: string;
  emoji: string;
  safety: number;
  financial: number;
  dfwUrgency: number;
  category: string;
};

const ITEMS: Item[] = [
  { id: 'foundation', label: 'Foundation crack', emoji: '🏚️', safety: 9, financial: 10, dfwUrgency: 10, category: 'Structural' },
  { id: 'hvac', label: 'HVAC aging (10+ yrs)', emoji: '❄️', safety: 7, financial: 8, dfwUrgency: 9, category: 'HVAC' },
  { id: 'roof', label: 'Roof age (15+ yrs)', emoji: '🏠', safety: 8, financial: 9, dfwUrgency: 8, category: 'Roofing' },
  { id: 'plumbing', label: 'Plumbing leak / corrosion', emoji: '🔧', safety: 8, financial: 7, dfwUrgency: 8, category: 'Plumbing' },
  { id: 'electrical', label: 'Electrical concern (panel)', emoji: '⚡', safety: 10, financial: 6, dfwUrgency: 7, category: 'Electrical' },
  { id: 'drain', label: 'Poor drainage / grading', emoji: '🌧️', safety: 5, financial: 8, dfwUrgency: 9, category: 'Drainage' },
  { id: 'windows', label: 'Single pane windows', emoji: '🪟', safety: 2, financial: 6, dfwUrgency: 7, category: 'Insulation' },
  { id: 'insulation', label: 'Attic insulation inadequate', emoji: '🌡️', safety: 3, financial: 7, dfwUrgency: 8, category: 'Insulation' },
  { id: 'gutter', label: 'Clogged / missing gutters', emoji: '🍂', safety: 4, financial: 5, dfwUrgency: 6, category: 'Exterior' },
  { id: 'termite', label: 'Termite / pest evidence', emoji: '🐛', safety: 6, financial: 8, dfwUrgency: 7, category: 'Pest' },
];

function score(item: Item): number {
  return item.safety * 0.4 + item.financial * 0.35 + item.dfwUrgency * 0.25;
}

export default function DFWHomeMaintenancePrioritizer() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [prioritized, setPrioritized] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setPrioritized(false);
  };

  const ranked = ITEMS.filter(i => selected.has(i.id)).sort((a, b) => score(b) - score(a));

  const BAR_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36 }}>🏡</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW Home Maintenance Prioritizer</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Select your issues — get a DFW-climate-adjusted priority list</p>
        </div>
        <div style={{ background: '#111f38', border: '1px solid #2d4166', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 16 }}>Select All Issues Present in Your Home</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {ITEMS.map(item => {
              const active = selected.has(item.id);
              return (
                <button key={item.id} onClick={() => toggle(item.id)}
                  style={{ background: active ? '#1a2f50' : '#0f1c33', border: active ? '2px solid #F5E642' : '1px solid #2d4166', borderRadius: 8, padding: '12px 14px', color: '#fff', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{item.emoji}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: active ? 700 : 400, color: active ? '#F5E642' : '#e2e8f0' }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{item.category}</div>
                  </div>
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <button onClick={() => setPrioritized(true)} disabled={selected.size === 0}
              style={{ background: selected.size > 0 ? '#F5E642' : '#1e2d4a', color: selected.size > 0 ? '#0A1628' : '#64748b', fontWeight: 700, fontSize: 16, padding: '12px 36px', borderRadius: 8, border: 'none', cursor: selected.size > 0 ? 'pointer' : 'not-allowed' }}>
              📊 Prioritize {selected.size > 0 ? `(${selected.size} items)` : 'Items'}
            </button>
          </div>
        </div>
        {prioritized && ranked.length > 0 && (
          <div style={{ background: '#111f38', border: '1px solid #2d4166', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>🎯 Your Priority List</h2>
            {ranked.map((item, idx) => {
              const s = score(item);
              const pct = Math.round((s / 10) * 100);
              const color = BAR_COLORS[Math.min(idx, 4)];
              return (
                <div key={item.id} style={{ marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontWeight: 700 }}>{idx + 1}. {item.emoji} {item.label}</span>
                    <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>Priority Score: {s.toFixed(1)}/10</span>
                  </div>
                  <div style={{ background: '#1e2d4a', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 4 }} />
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginTop: 4, fontSize: 11, color: '#94a3b8' }}>
                    <span>🦺 Safety: {item.safety}/10</span>
                    <span>💰 Financial: {item.financial}/10</span>
                    <span>🌤️ DFW Urgency: {item.dfwUrgency}/10</span>
                  </div>
                </div>
              );
            })}
            <div style={{ marginTop: 16, padding: 14, background: '#0f1c33', borderRadius: 8, fontSize: 13, color: '#94a3b8' }}>
              <strong style={{ color: '#F5E642' }}>⚡ Start Here:</strong> {ranked[0].emoji} {ranked[0].label} — highest combined risk in DFW climate conditions.
            </div>
          </div>
        )}
        <div style={{ textAlign: 'center', padding: 20, background: '#111f38', borderRadius: 12, border: '1px solid #2d4166' }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Get vetted DFW contractors for your top priority items via ProLnk</div>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 28px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
            🔗 Connect with Pros
          </button>
        </div>
      </div>
    </div>
  );
}
