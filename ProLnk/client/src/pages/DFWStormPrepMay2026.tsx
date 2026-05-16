import { useState } from 'react';

const threats = [
  { id: 'tornado', label: '🌪️ Tornado', preps: ['Identify interior safe room (no windows)', 'Download NOAA Weather app', 'Keep shoes + helmet accessible', 'Charge backup battery bank'] },
  { id: 'hail', label: '🧊 Hail Storm', preps: ['Hail-rated garage door (Class 4)', 'Whole-home surge protector installed', 'Vehicle in garage by May 1', 'Roof inspection after each storm'] },
  { id: 'surge', label: '⚡ Power Surge', preps: ['Whole-home surge protector at panel', 'UPS for home office + network gear', 'Unplug appliances during storms', 'HVAC surge protection add-on'] },
  { id: 'flood', label: '🌊 Flash Flood', preps: ['Know your flood zone (FEMA map)', 'Sump pump + battery backup', 'Sandbags for low entry points', 'Elevation certificate if borderline'] },
];

export default function DFWStormPrepMay2026() {
  const [selected, setSelected] = useState('tornado');
  const threat = threats.find(t => t.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME GUIDE — MAY 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Storm Prep Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 8 }}>DFW severe weather season peaks May–June. Tornado alley runs right through us.</p>
        <div style={{ background: '#1a0a0a', border: '1px solid #ef4444', borderRadius: 10, padding: '0.75rem 1.2rem', marginBottom: 24, color: '#fca5a5', fontSize: 14 }}>
          ⚠️ DFW averages 8 tornadoes per year — more than anywhere in the US metro areas.
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          {threats.map(t => (
            <button key={t.id} onClick={() => setSelected(t.id)} style={{ background: selected === t.id ? '#F5E642' : '#0F2040', color: selected === t.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1.2rem', cursor: 'pointer', fontWeight: 700, fontSize: 14, transition: 'all 0.2s' }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 14, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ fontWeight: 800, marginBottom: 16, color: '#F5E642' }}>{threat.label} Preparation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {threat.preps.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 24, height: 24, background: '#F5E642', color: '#0A1628', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 15, paddingTop: 3 }}>{p}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: '#0a1628', borderRadius: 10, padding: '0.8rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>Safe Room vs Shelter</div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>Safe rooms are FEMA-rated. Interior closets work. Never garage or car.</div>
          </div>
          <div style={{ background: '#0a1628', borderRadius: 10, padding: '0.8rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>Storm Watch Apps</div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>RadarScope, NOAA, MyRadar — enable push alerts.</div>
          </div>
        </div>
      </div>
    </div>
  );
}