import { useState } from 'react';

const dfwCities = [
  { city: 'Dallas', att: true, google: false, spectrum: true, frontier: true },
  { city: 'Fort Worth', att: true, google: false, spectrum: true, frontier: true },
  { city: 'Plano', att: true, google: false, spectrum: true, frontier: true },
  { city: 'Frisco', att: true, google: false, spectrum: true, frontier: false },
  { city: 'McKinney', att: true, google: false, spectrum: true, frontier: false },
  { city: 'Irving', att: true, google: false, spectrum: true, frontier: true },
  { city: 'Garland', att: true, google: false, spectrum: true, frontier: true },
  { city: 'Arlington', att: true, google: false, spectrum: true, frontier: false },
  { city: 'Denton', att: false, google: false, spectrum: true, frontier: true },
  { city: 'Allen', att: true, google: false, spectrum: true, frontier: false },
];

export default function DFWFiberInternetGuide2026() {
  const [selected, setSelected] = useState('Dallas');
  const city = dfwCities.find(c => c.city === selected) || dfwCities[0];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌐</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Fiber Internet Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Compare ISPs for work-from-home reliability across the Metroplex</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '⚡', name: 'AT&T Fiber', speed: 'Up to 5 Gbps', price: '–/mo', note: 'Widest DFW coverage, symmetrical speeds' },
            { icon: '🟦', name: 'Google Fiber', speed: 'Up to 2 Gbps', price: '–/mo', note: 'Limited DFW footprint — check availability first' },
            { icon: '🔵', name: 'Spectrum', speed: 'Up to 1 Gbps', price: '–/mo', note: 'Cable-based, asymmetric — upload slower' },
            { icon: '🟠', name: 'Frontier Fiber', speed: 'Up to 2 Gbps', price: '–/mo', note: 'Expanding in DFW, true fiber symmetrical' },
          ].map(isp => (
            <div key={isp.name} style={{ background: '#0f2035', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{isp.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{isp.name}</div>
              <div style={{ color: '#fff', fontSize: 13, marginBottom: 4 }}>{isp.speed}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>{isp.price}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{isp.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏙️ Check Your DFW City</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {dfwCities.map(c => (
              <button key={c.city} onClick={() => setSelected(c.city)}
                style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13,
                  background: selected === c.city ? '#F5E642' : '#1e3a5f', color: selected === c.city ? '#0A1628' : '#fff', fontWeight: selected === c.city ? 700 : 400 }}>
                {c.city}
              </button>
            ))}
          </div>
          <div style={{ color: '#fff', fontSize: 15, marginBottom: 12 }}>Fiber options in <strong style={{ color: '#F5E642' }}>{city.city}</strong>:</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
            {[['⚡ AT&T Fiber', city.att],['🟦 Google Fiber', city.google],['🔵 Spectrum',city.spectrum],['🟠 Frontier Fiber',city.frontier]].map(([label, avail]) => (
              <div key={String(label)} style={{ background: '#0A1628', borderRadius: 8, padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{avail ? '✅' : '❌'}</span>
                <span style={{ color: avail ? '#fff' : '#64748b', fontSize: 13 }}>{String(label)}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⛈️ Why Fiber Matters for DFW WFH</h3>
          {['DFW severe weather causes frequent outages — fiber underground lines hold better than cable','Symmetrical upload speeds critical for video calls, large file transfers','Fiber reliability SLAs average 99.9% vs 99.5% for cable during peak storm season','Having a backup LTE hotspot is still recommended for ERCOT grid events'].map(tip => (
            <div key={tip} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
