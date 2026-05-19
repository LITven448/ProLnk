import { useState } from 'react';

const issues = [
  { id: 'billing', label: '💳 Billing Issue', contact: '214-651-1441', process: 'Call Dallas Water Utilities billing line Mon-Fri 8am-5pm. For after-hours emergencies call 214-651-1441. Leak adjustment program available if you have a confirmed repair — submit form at dallaswater.org with plumber invoice.' },
  { id: 'quality', label: '🧪 Water Quality', contact: '214-670-3155', process: 'Dallas water averages 300 TDS (total dissolved solids) — slightly hard. Annual water quality report at dallaswater.org. For specific concerns, call the lab at 214-670-3155. Free lead testing for homes built before 1986.' },
  { id: 'leak', label: '💧 Report a Leak', contact: '214-651-1441', process: 'Report street or main line leaks 24/7 at 214-651-1441. For leaks on your property side of the meter, you are responsible — call a licensed plumber. Check your meter box for leaks: open lid and look for spinning dial when all water is off.' },
  { id: 'watering', label: '🌿 Watering Restrictions', contact: 'dallaswater.org', process: 'Dallas enforces Stage 1-4 water restrictions during drought. Stage 1 (currently): odd addresses water Tue/Thu/Sat, even addresses water Wed/Fri/Sun. No watering 10am-6pm. Violators face $250+ fines.' },
  { id: 'newservice', label: '🏗️ New Service Connection', contact: '214-651-1441', process: 'For additions or new construction, apply online at dallaswater.org or call. Meter installation requires permit and licensed plumber. Tap fee based on meter size: 3/4″ meter = ~$2,400 tap fee.' },
];

export default function DFWDallasWaterGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = issues.find(n => n.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', padding: '32px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>💧</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>Dallas Water Utilities — 2026 Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>City of Dallas water service for Dallas proper. Suburbs have separate providers (e.g., Frisco, Plano, McKinney each have their own utility).</p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📊 Dallas Water By the Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🧪 Average TDS: 300 mg/L (moderately hard)','🏠 300,000+ accounts served','💧 Sourced from Lake Lewisville, Lake Ray Hubbard, Lake Tawakoni','♻️ 15% water recycled for irrigation/industrial use'].map((f,i) => (
              <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12, color: '#cbd5e1', fontSize: 13 }}>{f}</div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 16, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>💰 Conservation Rebates Available</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[{ r: 'WaterSense toilet', v: '$100 rebate' },{ r: 'Smart irrigation controller', v: '$150 rebate' },{ r: 'Rain sensor', v: '$25 rebate' },{ r: 'Lawn conversion (grass to native plants)', v: '$0.10/sq ft' }].map((item,i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: 13, padding: '4px 0', borderBottom: i < 3 ? '1px solid #1e3a5f' : 'none' }}>
                <span>{item.r}</span><span style={{ color: '#F5E642', fontWeight: 600 }}>{item.v}</span>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🛠️ What Do You Need?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {issues.map(n => (
            <button key={n.id} onClick={() => setSelected(selected === n.id ? null : n.id)}
              style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${selected === n.id ? '#F5E642' : '#1e3a5f'}`, backgroundColor: selected === n.id ? '#F5E64220′ : '#0f2040', color: selected === n.id ? '#F5E642' : '#cbd5e1', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>
              {n.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, border: '2px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 16 }}>{active.label}</h3>
            <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>{active.process}</p>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12 }}>
              <span style={{ color: '#94a3b8', fontSize: 12 }}>Contact: </span>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{active.contact}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
