import { useState } from 'react';

const enclosureTypes: Record<string, { low: number; high: number; label: string; months: number }> = {
  covered_patio: { low: 5000, high: 15000, label: 'Covered Patio', months: 9 },
  screen_room: { low: 15000, high: 30000, label: 'Screen Room', months: 10 },
  four_season: { low: 25000, high: 60000, label: '4-Season Room', months: 12 },
};

const kitchenLevels: Record<string, { low: number; high: number; label: string }> = {
  none: { low: 0, high: 0, label: 'No Kitchen' },
  basic: { low: 3000, high: 8000, label: 'Basic (grill + counter)' },
  mid: { low: 10000, high: 25000, label: 'Mid (grill, sink, fridge, bar)' },
  full: { low: 25000, high: 50000, label: 'Full Outdoor Kitchen' },
};

const sizeMultipliers: Record<string, number> = { small: 0.7, medium: 1.0, large: 1.4, xlarge: 1.8 };

export default function DFWOutdoorRoomCostGuide() {
  const [patioSize, setPatioSize] = useState('medium');
  const [enclosure, setEnclosure] = useState('covered_patio');
  const [kitchen, setKitchen] = useState('basic');

  const sm = sizeMultipliers[patioSize];
  const enc = enclosureTypes[enclosure];
  const kit = kitchenLevels[kitchen];

  const encLow = Math.round(enc.low * sm);
  const encHigh = Math.round(enc.high * sm);
  const kitLow = Math.round(kit.low);
  const kitHigh = Math.round(kit.high);
  const totalLow = encLow + kitLow;
  const totalHigh = encHigh + kitHigh;

  const hoursPerYear = enc.months * 30 * 4;
  const costPerHourLow = totalLow > 0 ? (totalLow / (hoursPerYear * 10)).toFixed(2) : '0.00';
  const costPerHourHigh = totalHigh > 0 ? (totalHigh / (hoursPerYear * 10)).toFixed(2) : '0.00';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 DFW COST GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Outdoor Room Cost Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '0.75rem' }}>Dallas-Fort Worth · 2026 Contractor Pricing</p>
        <div style={{ background: '#1e3a2f', borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '2rem', color: '#4ade80', fontSize: '0.9rem' }}>
          ☀️ DFW outdoor rooms are usable ~9 months/year — making them one of the highest ROI investments in the market.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Patio Size</label>
            <select value={patioSize} onChange={e => setPatioSize(e.target.value)}
              style={{ width: '100%', background: '#1e2d45', color: '#fff', border: '1px solid #2d3f5e', borderRadius: 8, padding: '0.6rem', fontSize: '1rem' }}>
              <option value="small">Small (under 150 sq ft)</option>
              <option value="medium">Medium (150–300 sq ft)</option>
              <option value="large">Large (300–500 sq ft)</option>
              <option value="xlarge">Extra Large (500+ sq ft)</option>
            </select>
          </div>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Enclosure Type</label>
            <select value={enclosure} onChange={e => setEnclosure(e.target.value)}
              style={{ width: '100%', background: '#1e2d45', color: '#fff', border: '1px solid #2d3f5e', borderRadius: 8, padding: '0.6rem', fontSize: '1rem' }}>
              {Object.entries(enclosureTypes).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Outdoor Kitchen Level</label>
          <select value={kitchen} onChange={e => setKitchen(e.target.value)}
            style={{ width: '100%', background: '#1e2d45', color: '#fff', border: '1px solid #2d3f5e', borderRadius: 8, padding: '0.6rem', fontSize: '1rem' }}>
            {Object.entries(kitchenLevels).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>📋 Cost Breakdown</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #2d3f5e' }}>
            <span style={{ color: '#cbd5e1′ }}>{enc.label}</span>
            <span style={{ fontWeight: 600 }}>${encLow.toLocaleString()} – ${encHigh.toLocaleString()}</span>
          </div>
          {kit.low > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #2d3f5e' }}>
              <span style={{ color: '#cbd5e1′ }}>{kit.label}</span>
              <span style={{ fontWeight: 600 }}>${kitLow.toLocaleString()} – ${kitHigh.toLocaleString()}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0 0', fontWeight: 700, fontSize: '1.1rem' }}>
            <span style={{ color: '#F5E642′ }}>Total Investment</span>
            <span style={{ color: '#F5E642′ }}>${totalLow.toLocaleString()} – ${totalHigh.toLocaleString()}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⏱️</div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Cost Per Usable Hour (10 yr)</div>
            <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#4ade80′ }}>${costPerHourLow} – ${costPerHourHigh}</div>
            <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '0.3rem' }}>{enc.months} usable months/year</div>
          </div>
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📈</div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Estimated ROI at Resale</div>
            <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#F5E642′ }}>50–80%</div>
            <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '0.3rem' }}>DFW buyers prioritize outdoor living</div>
          </div>
        </div>
      </div>
    </div>
  );
}
