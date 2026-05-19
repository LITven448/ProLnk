import { useState } from 'react';

const zones = [
  { type: 'Lawn (Bermuda/St. Augustine)', heads: 'Pop-up spray or rotor heads, 15-35 ft spacing', pressure: '30-45 PSI dynamic', precip: '1.5–2.0 in/hr' },
  { type: 'Garden Beds', heads: 'Low-angle sprays or drip emitters', pressure: '20-30 PSI', precip: '1.0–1.5 in/hr' },
  { type: 'Slopes', heads: 'MP Rotators (matched precip)', pressure: '25-40 PSI', precip: '0.4–0.6 in/hr' },
  { type: 'Trees / Large Shrubs', heads: 'Drip ring or bubbler', pressure: '15-25 PSI', precip: '0.1–0.5 in/hr' },
];

const yardSizes = ['Under 2,000 sq ft', '2,000–5,000 sq ft', '5,000–10,000 sq ft', 'Over 10,000 sq ft'];

const sizeGuide: Record<string, { zones: number; heads: string; controller: string }> = {
  'Under 2,000 sq ft': { zones: 2, heads: '8–12 heads total', controller: '4-zone smart controller' },
  '2,000–5,000 sq ft': { zones: 4, heads: '16–28 heads total', controller: '6-zone smart controller' },
  '5,000–10,000 sq ft': { zones: 6, heads: '28–50 heads total', controller: '8-zone smart controller' },
  'Over 10,000 sq ft': { zones: 8, heads: '50+ heads total', controller: '12-zone smart controller' },
};

export default function DFWSprinklerSystemDesign2026() {
  const [yardType, setYardType] = useState('');
  const [yardSize, setYardSize] = useState('');

  const guide = yardSize ? sizeGuide[yardSize] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF6', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk DFW Guide · 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>💧 DFW Sprinkler System Design Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32 }}>Design or upgrade your DFW irrigation system right — head-to-head coverage, pressure zones, backflow compliance, and smart scheduling for North Texas.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>⚡ DFW Design Essentials</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {[
              { icon: '🔄', label: 'Head-to-Head Coverage', desc: 'Each head reaches the next — mandatory for even coverage in DFW clay soil' },
              { icon: '💧', label: 'Backflow Preventer', desc: 'Required by most DFW municipalities (Dallas, Fort Worth, Plano, Frisco, etc.)' },
              { icon: '🌧', label: 'Rain Sensor', desc: 'Texas state law requires rain/freeze sensors on all new installs' },
              { icon: '📊', label: 'Separate Zones by Type', desc: 'Never mix lawn and bed zones — precipitation rates differ by 3–5x' },
            ].map(i => (
              <div key={i.label} style={{ background: '#162035', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{i.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{i.label}</div>
                <div style={{ color: '#94A3B8', fontSize: 12 }}>{i.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🗺️ Zone Design by Area Type</h2>
          {zones.map(z => (
            <div key={z.type} style={{ borderBottom: '1px solid #1E3A5F', padding: '12px 0' }}>
              <div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: 4 }}>{z.type}</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Heads: {z.heads} · Pressure: {z.pressure} · Precip rate: {z.precip}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔧 Your DFW Design Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Yard Type</label>
              <select value={yardType} onChange={e => setYardType(e.target.value)} style={{ width: '100%', background: '#162035', border: '1px solid #1E3A5F', color: '#E8EAF6', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select yard type</option>
                <option>Lawn only</option>
                <option>Lawn + beds</option>
                <option>Lawn + beds + trees</option>
                <option>Beds and garden only</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Irrigated Area</label>
              <select value={yardSize} onChange={e => setYardSize(e.target.value)} style={{ width: '100%', background: '#162035', border: '1px solid #1E3A5F', color: '#E8EAF6', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select yard size</option>
                {yardSizes.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {guide && (
            <div style={{ background: '#162035', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, marginBottom: 10 }}>📐 Recommended Design — {yardSize}</div>
              <div style={{ color: '#E8EAF6', fontSize: 14, lineHeight: 1.8 }}>
                <div>🔢 <strong>Zones needed:</strong> {guide.zones}+ zones</div>
                <div>💦 <strong>Head count estimate:</strong> {guide.heads}</div>
                <div>🎛️ <strong>Controller:</strong> {guide.controller}</div>
                <div style={{ marginTop: 10, color: '#94A3B8', fontSize: 12 }}>🌿 DFW tip: Add a dedicated drip zone for beds — saves 30–50% water vs spray heads on plants</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Get a Free DFW Irrigation Design Quote</div>
          <div style={{ color: '#94A3B8', marginBottom: 16, fontSize: 14 }}>Licensed DFW irrigators ready to design and install your system — fast quotes, licensed, insured.</div>
          <a href='/' style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontSize: 16 }}>Get Free Quotes →</a>
        </div>
      </div>
    </div>
  );
}