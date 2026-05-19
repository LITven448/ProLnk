import { useState } from 'react';

const trades = [
  { id: 'hvac', label: 'HVAC', icon: '❄️', pct: 28, size: '$2.3B', jobs: '~890K service calls/yr', drivers: ['229 sunny days → AC replacement cycles', '10–15 freeze days → heating emergency calls', 'Average ticket: $2,580 (full system replacement)', 'Largest single trade in DFW by revenue', 'ProLnk HVAC target revenue share: $23M'] },
  { id: 'plumbing', label: 'Plumbing', icon: '🔧', pct: 18, size: '$1.5B', jobs: '~620K service calls/yr', drivers: ['Hard water (high mineral content) accelerates pipe wear', 'Spring flooding drives sewer line calls', 'Average ticket: $2,420', '2021 freeze event created decade of deferred work', 'ProLnk plumbing target: $15M'] },
  { id: 'foundation', label: 'Foundation', icon: '🏗️', pct: 14, size: '$1.1B', jobs: '~280K repairs/yr', drivers: ['Expansive clay soil = unique DFW problem', 'Drought/flood cycles create foundation movement', 'Average repair: $3,900', 'Nearly every home needs work within 10 years', 'ProLnk foundation target: $11M'] },
  { id: 'roofing', label: 'Roofing', icon: '🏠', pct: 12, size: '$1.0B', jobs: '~310K jobs/yr', drivers: ['5–7 hail events/yr drive insurance claims', 'Average full replacement: $3,200', 'No state license required → high fraud risk', 'ProLnk vetting = trust premium for homeowners', 'ProLnk roofing target: $10M'] },
  { id: 'electrical', label: 'Electrical', icon: '⚡', pct: 10, size: '$820M', jobs: '~420K service calls/yr', drivers: ['EV charger installs growing 40%/yr in DFW', 'Aging housing stock (pre-1990) needs panel upgrades', 'Average ticket: $1,950', 'Licensed trade → ProLnk verification is easy', 'ProLnk electrical target: $8.2M'] },
  { id: 'other', label: 'Other Trades', icon: '🛠️', pct: 18, size: '$1.48B', jobs: '~700K jobs/yr', drivers: ['Landscaping, painting, flooring, pest control', 'Handyman and general repair services', 'Pool service (DFW has 280K+ pools)', 'Window / door replacement', 'ProLnk other trades target: $15M'] },
];

export default function DFWHomeServiceMarketSize2026() {
  const [active, setActive] = useState('hvac');
  const selected = trades.find(t => t.id === active)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.4rem' }}>📊</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Home Service Market Size 2026</h1>
          <p style={{ color: '#8899AA', marginTop: '0.5rem' }}>$8.2B/yr total addressable market — ProLnk 1% target = $82M</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
          {trades.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)} style={{ background: active === t.id ? '#F5E642' : '#0F2340', color: active === t.id ? '#0A1628' : '#E8EDF5', border: '2px solid', borderColor: active === t.id ? '#F5E642' : '#1E3A5F', borderRadius: 10, padding: '0.85rem 0.5rem', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 700, fontSize: '0.85rem' }}>
              <div style={{ fontSize: '1.5rem' }}>{t.icon}</div>
              <div>{t.label}</div>
              <div style={{ fontSize: '1.1rem', marginTop: '0.2rem', color: active === t.id ? '#0A1628' : '#F5E642' }}>{t.size}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{t.pct}% of market</div>
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2340', borderRadius: 14, padding: '1.75rem', border: '1px solid #1E3A5F' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '2rem' }}>{selected.icon}</span>
            <div>
              <h2 style={{ margin: 0, color: '#F5E642', fontSize: '1.4rem' }}>{selected.label} — {selected.size}</h2>
              <p style={{ margin: 0, color: '#8899AA', fontSize: '0.9rem' }}>{selected.jobs}</p>
            </div>
          </div>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {selected.drivers.map((d, i) => (
              <div key={i} style={{ background: '#152A4A', borderRadius: 8, padding: '0.7rem 1rem', borderLeft: '3px solid #F5E642', fontSize: '0.9rem' }}>{d}</div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#445566', fontSize: '0.75rem', marginTop: '1.5rem' }}>Sources: IBISWorld, ACCA, Texas TDLR, NAR — 2026 estimates</p>
      </div>
    </div>
  );
}