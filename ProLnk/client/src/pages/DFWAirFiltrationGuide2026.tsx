import { useState } from 'react';

export default function DFWAirFiltrationGuide2026() {
  const [concern, setConcern] = useState<string | null>(null);

  const concerns = [
    { id: 'cedar', label: '🌲 Cedar Fever Season', tip: 'Mountain cedar peaks Dec–Feb in DFW. MERV-13 in HVAC is essential. Add HEPA purifier in bedroom. Run HVAC fan continuously (not just when heating/cooling) to filter air all day during peak season.' },
    { id: 'pollen', label: '🌸 Spring Pollen', tip: 'Oak, elm, and grass pollen hit DFW hard Mar–Jun. MERV-13 minimum, keep windows closed on high-count days. Check DFWPollen.com daily. Change filter at start of spring season.' },
    { id: 'smoke', label: '🔥 Wildfire Smoke / PM2.5', tip: 'DFW increasingly impacted by west Texas and Oklahoma smoke events. HEPA purifier at CADR >200 for living areas. MERV-16 or electronic air cleaner for whole-home protection.' },
    { id: 'voc', label: '🧪 VOCs / Odors', tip: 'Standard HEPA captures particles but not gases. You need activated carbon media alongside HEPA. Whole-home air cleaners with carbon media handle VOCs from new carpet, paint, and cleaning products.' },
  ];

  const systems = [
    { icon: '🔧', title: 'MERV-13 HVAC Filter', cost: '$15–40/filter', desc: 'Minimum for DFW — traps pollen, mold spores, and fine particles. Change every 60 days during cedar and pollen seasons' },
    { icon: '🌬️', title: 'Portable HEPA Purifier', cost: '$150–500', desc: 'Best for specific rooms — bedroom during sleep. Look for CADR ≥ 200 for rooms over 300 sqft' },
    { icon: '⚡', title: 'Electronic Air Cleaner', cost: '$600–1,500', desc: 'Whole-home electrostatic precipitation — captures particles down to 0.1 micron, good for smoke events' },
    { icon: '🔄', title: 'ERV (Energy Recovery Ventilator)', cost: '$1,200–3,000', desc: 'Brings filtered fresh outdoor air inside while recovering conditioning energy — solves CO2 and VOC buildup simultaneously' },
  ];

  const facts = [
    { icon: '🌲', stat: 'MERV-13', label: 'Minimum filter rating for DFW cedar and pollen season protection' },
    { icon: '💨', stat: 'CADR 200+', label: 'Portable purifier rating needed for typical DFW living room (400 sqft)' },
    { icon: '⚡', stat: '0.1 micron', label: 'Particle size captured by electronic air cleaners — 3x smaller than HEPA' },
    { icon: '🔄', stat: 'ERV/HRV', label: 'Best system for DFW: fresh air without losing AC efficiency in summer heat' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🌬️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW Air Filtration Complete Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Every filtration option for DFW homes — matched to cedar season, smoke events, VOCs, and pollen</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {facts.map(f => (
            <div key={f.stat} style={{ background: '#122040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28 }}>{f.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>{f.stat}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{f.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🎯 Select Your Primary Concern</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => setConcern(c.id === concern ? null : c.id)}
                style={{ background: concern === c.id ? '#F5E642' : '#1e3a5f', color: concern === c.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '14px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
                {c.label}
              </button>
            ))}
          </div>
          {concern && (
            <div style={{ background: '#1e3a5f', borderLeft: '4px solid #F5E642', borderRadius: '0 10px 10px 0', padding: 20, marginTop: 16 }}>
              <p style={{ margin: 0, color: '#e2e8f0', fontSize: 15, lineHeight: 1.6 }}>{concerns.find(c => c.id === concern)?.tip}</p>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {systems.map(s => (
            <div key={s.title} style={{ background: '#122040', borderRadius: 12, padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 32, flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, color: '#F5E642', fontSize: 15 }}>{s.title}</span>
                  <span style={{ background: '#0A1628', color: '#94a3b8', fontSize: 12, padding: '2px 8px', borderRadius: 6 }}>{s.cost}</span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#122040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📅 DFW Filtration Calendar</h2>
          {['Dec–Feb: Cedar season — MERV-13 mandatory, HEPA purifier in bedroom','Mar–Jun: Pollen season — change filter at season start, run HVAC fan continuously','Jun–Sep: Ozone/PM2.5 season — avoid opening windows on Code Orange days','Oct–Nov: Best ventilation months — open windows during mild weather to flush indoor pollutants'].map(item => (
            <div key={item} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642' }}>📅</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
