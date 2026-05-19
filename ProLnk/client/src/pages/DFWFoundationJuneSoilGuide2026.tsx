import { useState } from 'react';

const concerns = [
  { id: 'schedule', label: '🕐 Watering Schedule', action: 'Water every side of your foundation every morning. Run soaker hose 30–45 minutes per side. June requires daily watering — skip no days once soil shows cracks.' },
  { id: 'moisture', label: '💧 Check Soil Moisture', action: 'Push a screwdriver 6 inches into soil beside your foundation. Should slide in with moderate pressure and feel damp. Bone dry = water more. Muddy = reduce frequency slightly.' },
  { id: 'cracks', label: '🔍 Visible Cracks', action: 'Hairline cracks (< 1/8 inch) in brick or drywall near corners are common in June. Document with photos and date. Cracks widening over 2 weeks need a structural engineer consult.' },
  { id: 'doors', label: '🚪 Sticking Doors/Windows', action: 'June foundation movement is normal. If doors stick that were fine in May, increase watering on that side of the home. If sticking persists after 2 weeks of proper watering, call a foundation pro.' },
  { id: 'drainage', label: '🌧️ Drainage Check', action: 'June storms can over-saturate areas. Ensure gutters drain 6+ feet from foundation. No pooling within 10 feet of structure. Balance is key — too wet is as damaging as too dry.' },
];

export default function DFWFoundationJuneSoilGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW FOUNDATION GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW June Foundation Soil Care Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 24 }}>
          June marks the transition to critical daily foundation watering in DFW. Expansive clay soils begin rapid drying — neglect now leads to costly repairs later.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { icon: '🌍', label: 'Soil Type', val: 'Expansive Clay' },
            { icon: '💧', label: 'Watering Freq', val: 'Daily' },
            { icon: '⏱️', label: 'Duration/Side', val: '30–45 min' },
            { icon: '📏', label: 'Check Depth', val: '6 inches' },
          ].map(s => (
            <div key={s.label} style={{ background: '#111f38', borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642′ }}>{s.val}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Select Your June Foundation Concern</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {concerns.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(selected === c.id ? null : c.id)}
              style={{
                background: selected === c.id ? '#F5E642′ : '#111f38',
                color: selected === c.id ? '#0A1628′ : '#fff',
                border: 'none', borderRadius: 8, padding: '14px 18px',
                textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15,
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#1a2f50', border: '2px solid #F5E642', borderRadius: 10, padding: 20, marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>SOIL CARE GUIDE</div>
            <p style={{ fontSize: 15, lineHeight: 1.6 }}>{concerns.find(c => c.id === selected)?.action}</p>
          </div>
        )}

        <div style={{ background: '#111f38', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>DFW CLAY SOIL FACT</div>
          <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>
            DFW sits on some of the most expansive clay soils in North America. A 1-inch moisture change can move your foundation up to 4 inches. Consistent June watering is the single best investment you can make.
          </p>
        </div>
      </div>
    </div>
  );
}