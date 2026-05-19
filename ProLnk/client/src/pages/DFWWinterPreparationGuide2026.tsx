import { useState } from 'react';

const homeTypes = {
  slab: {
    label: '🏠 Slab Foundation (no crawlspace)',
    items: [
      { task: '🔍 Locate & label your main water shutoff', score: 20, done: false },
      { task: '🌡️ Insulate pipes on exterior north/west walls in garage', score: 20, done: false },
      { task: '🚿 Know which outdoor faucets to drip during freeze', score: 15, done: false },
      { task: '🔌 Test garage door — cold affects batteries & motors', score: 10, done: false },
      { task: '🪟 Seal gaps under exterior doors (draft snakes work)', score: 15, done: false },
      { task: '⚡ Stock emergency kit: space heater, flashlights, water', score: 10, done: false },
      { task: '🏠 Know your breaker panel — which breaker cuts which zone', score: 10, done: false },
    ],
  },
  pier: {
    label: '🏗️ Pier & Beam Foundation (has crawlspace)',
    items: [
      { task: '🔍 Locate & label your main water shutoff', score: 20, done: false },
      { task: '🌡️ Insulate ALL exposed pipes under the home', score: 25, done: false },
      { task: '🪵 Close crawlspace vents before freeze warnings', score: 15, done: false },
      { task: '🚿 Know which faucets to drip — especially kitchen & baths on exterior walls', score: 15, done: false },
      { task: '⚡ Stock emergency kit: space heater, generator, water jugs', score: 15, done: false },
      { task: '🔌 Check crawlspace insulation — add if missing', score: 10, done: false },
    ],
  },
  mobile: {
    label: '🏕️ Mobile / Manufactured Home',
    items: [
      { task: '💧 Insulate all exposed pipes — mobile homes freeze fastest', score: 25, done: false },
      { task: '🔍 Locate and label main water shutoff', score: 20, done: false },
      { task: '🏕️ Skirt gaps let wind under — seal all gaps', score: 20, done: false },
      { task: '⚡ Generator + space heaters + water jugs mandatory', score: 15, done: false },
      { task: '🪟 Plastic window insulation film on all single-pane windows', score: 10, done: false },
      { task: '🚿 Drip all faucets at 28°F or below — do not wait for 32°F', score: 10, done: false },
    ],
  },
};

export default function DFWWinterPreparationGuide2026() {
  const [homeType, setHomeType] = useState<'slab' | 'pier' | 'mobile' | null>(null);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const items = homeType ? homeTypes[homeType].items : [];
  const totalScore = items.reduce((sum, item) => sum + item.score, 0);
  const earnedScore = items.reduce((sum, item, i) => sum + (checked[i] ? item.score : 0), 0);
  const pct = totalScore > 0 ? Math.round((earnedScore / totalScore) * 100) : 0;

  const scoreColor = pct >= 80 ? '#22c55e' : pct >= 50 ? '#F5E642′ : '#ef4444';
  const scoreLabel = pct >= 80 ? '✅ Freeze Ready' : pct >= 50 ? '⚠️ Getting There' : '🚨 At Risk';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          ❄️ DFW Winter Home Preparation Guide 2026
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
          Uri proved it: DFW homes are not built for hard freezes. November–December prep prevents burst pipes, $10K+ repairs, and weeks without water.
        </p>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>🧊 Freeze Thresholds for DFW Homes</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', textAlign: 'center' }}>
            {[['28°F', 'Drip outdoor faucets'], ['24°F', 'Drip ALL faucets'], ['20°F', 'Shut off & drain if possible']].map(([temp, label]) => (
              <div key={temp} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem' }}>{temp}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>🏠 What type of home do you have?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {(Object.keys(homeTypes) as ('slab' | 'pier' | 'mobile')[]).map(k => (
              <button key={k} onClick={() => { setHomeType(k); setChecked({}); }} style={{ padding: '0.7rem 1.2rem', borderRadius: 8, border: '2px solid', borderColor: homeType === k ? '#F5E642′ : '#1e3a5f', background: homeType === k ? '#F5E642' : '#0f2040', color: homeType === k ? '#0A1628' : '#fff', fontWeight: 600, cursor: ’pointer', textAlign: 'left' }}>
                {homeTypes[k].label}
              </button>
            ))}
          </div>
        </div>
        {items.length > 0 && (
          <>
            <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: scoreColor }}>{pct}%</div>
              <div style={{ color: scoreColor, fontWeight: 600 }}>{scoreLabel}</div>
              <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem' }}>Winter Prep Score</div>
            </div>
            <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem' }}>
              <div style={{ fontWeight: 600, marginBottom: '1rem' }}>Your Winter Prep Checklist</div>
              {items.map((item, i) => (
                <div key={i} onClick={() => setChecked(c => ({ ...c, [i]: !c[i] }))} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0', borderBottom: i < items.length - 1 ? '1px solid #1e3a5f' : 'none', cursor: 'pointer' }}>
                  <span>{checked[i] ? '✅' : '⬜'}</span>
                  <span style={{ flex: 1, textDecoration: checked[i] ? 'line-through' : 'none', color: checked[i] ? '#64748b' : '#fff' }}>{item.task}</span>
                  <span style={{ color: '#F5E642', fontSize: '0.8rem', fontWeight: 600 }}>+{item.score}pts</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}