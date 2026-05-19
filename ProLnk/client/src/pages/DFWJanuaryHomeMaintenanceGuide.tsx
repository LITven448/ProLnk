import { useState } from 'react';

const facts = [
  { emoji: '🌡️', label: 'Avg January Low', value: '37°F', note: 'Coldest month in DFW — pipe freeze risk is real' },
  { emoji: '⚡', label: 'Peak Energy Demand', value: 'Jan 6-20', note: 'Highest electric bills of the year for most DFW homes' },
  { emoji: '💧', label: 'Pipe Freeze Threshold', value: '20°F / 6 hrs', note: 'Exposed pipes in attics and exterior walls most vulnerable' },
  { emoji: '🧾', label: 'Tax Prep Window', value: 'Jan 1-31', note: 'Gather all 2025 contractor receipts for home improvement deductions' },
];

const guides: Record<string, { items: string[]; alert: string }> = {
  'Single Family - Slab': {
    items: ['Insulate exposed pipes in garage', 'Drip exterior faucets when temp < 28°F', 'Change HVAC filter (January = month 1)', 'Check attic hatch weatherstripping', 'Test all GFCI outlets — reset any that tripped in December', 'Gather contractor invoices for tax records'],
    alert: 'Slab homes: check exposed pipes under kitchen and bathroom sinks on exterior walls.',
  },
  'Single Family - Pier & Beam': {
    items: ['Inspect crawl space vents — close for winter', 'Insulate pipes under floor in crawl space', 'Check floor drafts — install door sweeps', 'Monitor for moisture in crawl space after rain', 'HVAC filter check', 'Post-holiday exterior light cord inspection'],
    alert: 'Pier & beam homes: crawl space pipes are at highest freeze risk in January.',
  },
  'Townhome / Condo': {
    items: ['Confirm HOA handles exterior pipe maintenance', 'Know your unit shutoff valve location', 'Check in-unit water heater age (>10 yrs = risk)', 'HVAC filter swap', 'Clear dryer vent (fire risk peaks in winter)', 'Gather any HOA assessment receipts for taxes'],
    alert: 'Shared walls help insulate, but top-floor and corner units face higher cold exposure.',
  },
  'Investment / Rental': {
    items: ['Text tenants your emergency plumber contact', 'Verify heat is set to minimum 55°F if vacant', 'Check smoke and CO detector batteries', 'Inspect exterior hose bibs', 'Schedule January HVAC service before spring rush fills calendars', 'Organize lease and repair records for taxes'],
    alert: 'Vacant rentals are highest risk — a frozen pipe with no one home can cause $50K+ in damage.',
  },
};

export default function DFWJanuaryHomeMaintenanceGuide() {
  const [selected, setSelected] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🥶</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW January Home Maintenance</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Coldest month of the year — pipe risk, energy bills, and tax prep</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 40 }}>
          {facts.map((f) => (
            <div key={f.label} style={{ background: '#0f2040', borderRadius: 12, padding: 18, border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 6 }}>{f.emoji}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{f.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 22 }}>{f.value}</div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 6 }}>{f.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, marginBottom: 12 }}>🏠 Your January Maintenance Guide</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Select your home type:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {Object.keys(guides).map((k) => (
              <button key={k} onClick={() => setSelected(k)}
                style={{ background: selected === k ? '#F5E642' : '#1e3a5f', color: selected === k ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {k}
              </button>
            ))}
          </div>
          {selected && (
            <div>
              <div style={{ background: '#1a2f4a', borderLeft: '4px solid #F5E642', padding: '10px 14px', borderRadius: 4, marginBottom: 16, color: '#F5E642', fontSize: 13 }}>
                ⚠️ {guides[selected].alert}
              </div>
              <ul style={{ color: '#e2e8f0', lineHeight: 2, paddingLeft: 20 }}>
                {guides[selected].items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, background: '#F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#0A1628' }}>DFW's coldest month needs a plan.</div>
          <div style={{ color: '#0A1628', marginTop: 6 }}>ProLnk connects you with licensed plumbers, HVAC pros, and more.</div>
        </div>
      </div>
    </div>
  );
}
