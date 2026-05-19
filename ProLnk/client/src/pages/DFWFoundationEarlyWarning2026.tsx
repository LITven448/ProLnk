import { useState } from 'react';

const WARNING_SIGNS = [
  { id: 'wall-gaps', label: 'Wall gaps at ceiling', emoji: '🏠', urgency: 'high', note: 'Indicates upward foundation movement — act within 30 days' },
  { id: 'door-strike', label: 'Door strike plate misalignment', emoji: '🚪', urgency: 'medium', note: 'Frame racking — schedule inspection within 60 days' },
  { id: 'grout-crack', label: 'Grout cracking in tile floors', emoji: '🪟', urgency: 'medium', note: 'Slab flex — monitor monthly, inspect if spreading' },
  { id: 'window-bind', label: 'Windows binding or sticking', emoji: '🔲', urgency: 'high', note: 'Structural shift detected — schedule engineer visit' },
  { id: 'stair-step', label: 'Stair-step brick cracks', emoji: '🧱', urgency: 'critical', note: 'Mortar joint failure — urgent structural evaluation needed' },
  { id: 'floor-slope', label: 'Noticeable floor slope', emoji: '📐', urgency: 'high', note: 'Pier settlement — get 2 foundation quotes immediately' },
];

const URGENCY_COLOR: Record<string, string> = {
  critical: '#FF4444',
  high: '#FF8800',
  medium: '#F5E642',
};

export default function DFWFoundationEarlyWarning2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = WARNING_SIGNS.find(w => w.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>
            DFW Foundation Early Warning Signs Guide 2026
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>
            Catch problems before $5,000+ repairs — subtle signs DFW homeowners miss
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 28, borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 8px' }}>📅 Monthly Monitoring Habits</h2>
          <ul style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
            <li>Walk perimeter after heavy rain — look for new soil separation</li>
            <li>Open/close all interior doors monthly — note any new binding</li>
            <li>Check garage floor corners for new cracks quarterly</li>
            <li>Photograph any existing cracks with a coin for scale</li>
          </ul>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 14 }}>⚠️ Select a Warning Sign for Urgency Assessment</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12, marginBottom: 24 }}>
          {WARNING_SIGNS.map(w => (
            <button
              key={w.id}
              onClick={() => setSelected(w.id === selected ? null : w.id)}
              style={{
                background: selected === w.id ? '#1E3A5F' : '#112240',
                border: `2px solid ${selected === w.id ? '#F5E642' : '#1E3A5F'}`,
                borderRadius: 10, padding: '14px 10px', cursor: 'pointer', color: '#fff',
                textAlign: 'center', fontSize: 13, fontWeight: 600,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{w.emoji}</div>
              {w.label}
              <div style={{ marginTop: 6, fontSize: 11, color: URGENCY_COLOR[w.urgency] || '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
                {w.urgency}
              </div>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, border: `2px solid ${URGENCY_COLOR[active.urgency]}` }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{active.emoji}</div>
            <h3 style={{ color: '#F5E642', margin: '0 0 8px' }}>{active.label}</h3>
            <p style={{ color: '#CBD5E1', fontSize: 14, margin: 0 }}>{active.note}</p>
            <div style={{ marginTop: 14, background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <p style={{ color: '#94A3B8', fontSize: 12, margin: 0 }}>
                💡 Early intervention (catching this sign now) typically saves <strong style={{ color: '#F5E642′ }}>$5,000–$18,000</strong> vs waiting for structural failure.
              </p>
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 12px' }}>Get a foundation inspection from a vetted DFW pro</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            🔍 Find Foundation Pros Near Me
          </button>
        </div>
      </div>
    </div>
  );
}
