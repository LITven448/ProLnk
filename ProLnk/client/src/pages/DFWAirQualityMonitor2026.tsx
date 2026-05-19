import { useState } from 'react';

const concerns = [
  {
    id: 'allergy', label: '🤧 Allergies / Pollen',
    monitors: ['Airthings View Plus ($299) — PM2.5, radon, VOCs, humidity', 'Awair Element ($149) — PM2.5, VOCs, CO2, temp, humidity'],
    thresholds: ['PM2.5 > 12 µg/m³: Run HEPA air purifier, check HVAC filter', 'PM2.5 > 35 µg/m³: Keep windows closed, limit outdoor time', 'Humidity > 55%: Mold and dust mite risk — dehumidify'],
  },
  {
    id: 'voc', label: '🧪 VOCs / Chemical Odors',
    monitors: ['IQAir AirVisual Pro ($269) — PM2.5, CO2, AQI', 'Airthings Wave Plus ($229) — VOC + radon combo'],
    thresholds: ['VOC > 250 ppb: Ventilate, identify source (new furniture, paint, cleaning products)', 'VOC > 1000 ppb: Vacate room, open windows, identify and remove source', 'New furniture/flooring: Expect elevated VOCs for 30–90 days'],
  },
  {
    id: 'co2', label: '🌬 CO₂ / Stuffiness',
    monitors: ['Aranet4 ($299) — Best-in-class CO2 accuracy (NDIR sensor)', 'Awair Element ($149) — CO2 + VOC + PM2.5 bundle'],
    thresholds: ['CO2 < 800 ppm: Excellent, well-ventilated', 'CO2 800–1200 ppm: Open a window or increase HVAC fresh air', 'CO2 > 1500 ppm: Impairs cognition — ventilate immediately'],
  },
  {
    id: 'radon', label: '☢️ Radon (Slab Homes)',
    monitors: ['Airthings Corentium Home ($149) — long-term radon monitor', 'Airthings Wave Plus ($229) — radon + air quality combo'],
    thresholds: ['< 2 pCi/L: Safe, no action needed', '2–4 pCi/L: Consider mitigation if above 3 pCi/L', '> 4 pCi/L: EPA action level — schedule radon mitigation system'],
  },
];

const metrics = [
  { name: 'PM2.5', unit: 'µg/m³', safe: '< 12', action: '> 35', icon: '💨' },
  { name: 'VOCs', unit: 'ppb', safe: '< 250', action: '> 1000', icon: '🧪' },
  { name: 'CO₂', unit: 'ppm', safe: '< 800', action: '> 1500', icon: '🌬' },
  { name: 'Humidity', unit: '%', safe: '45–50', action: '> 60 or < 30', icon: '💧' },
  { name: 'Radon', unit: 'pCi/L', safe: '< 2', action: '> 4', icon: '☢️' },
];

export default function DFWAirQualityMonitor2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = concerns.find(c => c.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 12, fontWeight: 700, marginBottom: 16 }}>DFW HOME HEALTH 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>📡 DFW Air Quality Monitor Guide</h1>
        <p style={{ color: '#8899BB', marginBottom: 32 }}>You can't fix what you can’t measure. DFW homes face unique threats — cedar pollen, ozone, wildfire smoke drift, and radon in slab foundations. A $150–300 monitor gives you real-time data to act on.</p>

        <div style={{ background: '#111E35', borderRadius: 10, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>📊 What to Measure — Key Thresholds</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {metrics.map(m => (
              <div key={m.name} style={{ background: '#0A1628', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{m.icon}</div>
                <div style={{ fontWeight: 700 }}>{m.name}</div>
                <div style={{ fontSize: 11, color: '#8899BB', marginTop: 2 }}>{m.unit}</div>
                <div style={{ fontSize: 12, color: '#81C784', marginTop: 6 }}>Safe: {m.safe}</div>
                <div style={{ fontSize: 12, color: '#E57373', marginTop: 2 }}>Act: {m.action}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 10, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🎯 My Concern → Monitor + Action Thresholds</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id === selected ? null : c.id)}
                style={{ background: selected === c.id ? '#F5E642′ : '#1C2E4A', color: selected === c.id ? '#0A1628' : '#E8EDF5', border: ’none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600 }}>
                {c.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 10, color: '#F5E642′ }}>Recommended monitors:</div>
              {active.monitors.map((m, i) => <div key={i} style={{ fontSize: 14, marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #F5E642′ }}>📦 {m}</div>)}
              <div style={{ fontWeight: 700, margin: '16px 0 10px', color: '#F5E642′ }}>Action thresholds:</div>
              {active.thresholds.map((t, i) => <div key={i} style={{ fontSize: 14, marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #E57373', color: '#E8EDF5′ }}>{t}</div>)}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#111E35', borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>High readings? ProLnk HVAC pros can help.</div>
          <div style={{ fontSize: 13, color: '#8899BB' }}>Connect with a DFW air quality or HVAC specialist for remediation, air purifier install, or radon mitigation.</div>
        </div>
      </div>
    </div>
  );
}
