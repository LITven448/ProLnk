import { useState } from 'react';

const CONDITIONS = [
  { id: 'good', label: 'Good — paint intact, solid', emoji: '✅', action: 'Paint and caulk every 3 years. Inspect vents annually.' },
  { id: 'peeling', label: 'Paint peeling / fading', emoji: '🎨', action: 'Sand, prime, and repaint within 6 months — moisture is penetrating.' },
  { id: 'soft-spots', label: 'Soft spots / sponginess', emoji: '🪵', action: 'Wood rot present — replace affected sections before next rain season.' },
  { id: 'cracks', label: 'Cracks or gaps', emoji: '💔', action: 'Caulk immediately. If wide (>1/4 in), replace board — water entry ongoing.' },
  { id: 'sagging', label: 'Sagging soffit panels', emoji: '📉', action: 'Check for pest/moisture damage in attic. Re-secure or replace panels.' },
  { id: 'blocked-vents', label: 'Blocked soffit vents', emoji: '🚫', action: 'Clear insulation and debris immediately — attic heat buildup shortens roof life.' },
];

export default function DFWRoofingFasciaSoffit2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [area, setArea] = useState<string>('');

  const active = CONDITIONS.find(c => c.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏚️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 800, margin: '8px 0 4px' }}>
            DFW Fascia and Soffit Guide 2026
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Why fascia and soffit matter — DFW sun and humidity deterioration explained</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          <div style={{ background: '#112240', borderRadius: 12, padding: 18, borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', fontSize: 15, margin: '0 0 8px' }}>🪵 Fascia</h3>
            <p style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              The board at the eave edge of your roof. Gutters attach to it. In DFW, wood fascia rots from humidity — fiber cement or aluminum replacement lasts 30+ years.
            </p>
          </div>
          <div style={{ background: '#112240', borderRadius: 12, padding: 18, borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', fontSize: 15, margin: '0 0 8px' }}>🌬️ Soffit</h3>
            <p style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              The underside of your roof overhang — has vents that allow attic airflow. Blocked or damaged soffits cause heat buildup that destroys shingles from inside.
            </p>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 18, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, margin: '0 0 10px' }}>📍 Which area concerns you?</h2>
          <div style={{ display: 'flex', gap: 10 }}>
            {['Fascia','Soffit','Both'].map(a => (
              <button key={a} onClick={() => setArea(a)}
                style={{ flex: 1, background: area === a ? '#F5E642' : '#0A1628', color: area === a ? '#0A1628' : '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                {a}
              </button>
            ))}
          </div>
          {area && (
            <div style={{ marginTop: 12, background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <p style={{ color: '#CBD5E1', fontSize: 13, margin: 0 }}>
                {area === 'Fascia' && 'Fascia replacement in DFW: remove gutters, pull old fascia, install 1x6 fiber cement board, prime and paint, reattach gutters. Typical cost: $8–$14/linear ft installed.'}
                {area === 'Soffit' && 'Soffit repair in DFW: vinyl soffit panels snap into place — easiest DIY option. Aluminum soffit requires tin snips and J-channel. Typical cost: $6–$12/linear ft installed.'}
                {area === 'Both' && 'Full fascia + soffit replacement: most contractors bundle these — negotiate 15–20% discount vs separate jobs. Budget $3,500–$8,000 for average DFW home.'}
              </p>
            </div>
          )}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔍 Select Condition for Repair Guide</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 10, marginBottom: 24 }}>
          {CONDITIONS.map(c => (
            <button key={c.id} onClick={() => setSelected(c.id === selected ? null : c.id)}
              style={{ background: selected === c.id ? '#1E3A5F' : '#112240', border: `2px solid ${selected === c.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px 10px', cursor: 'pointer', color: '#fff', textAlign: 'center', fontSize: 13 }}>
              <div style={{ fontSize: 26 }}>{c.emoji}</div>
              <div style={{ fontWeight: 600, marginTop: 6 }}>{c.label}</div>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, border: '2px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 8px' }}>{active.emoji} {active.label}</h3>
            <p style={{ color: '#CBD5E1', fontSize: 14, margin: 0 }}>{active.action}</p>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 12px' }}>Get fascia and soffit quotes from vetted DFW contractors</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            🏠 Get Roofing Quotes in DFW
          </button>
        </div>
      </div>
    </div>
  );
}
