import { useState } from 'react';

const services = [
  {
    name: 'Annual Tune-Up',
    range: '$150 – $250',
    typical: '$185',
    emoji: '🔧',
    included: ['Inspect and clean evaporator and condenser coils', 'Check refrigerant charge and look for leaks', 'Test capacitors, contactors, and electrical connections', 'Lubricate fan motors and moving parts', 'Clear and flush condensate drain line', 'Measure airflow and temperature differential', 'Inspect ductwork connections at the unit'],
    notIncluded: ['Refrigerant top-off (extra if needed)', 'Replacement parts', 'Duct cleaning'],
    tip: 'Book in March — April tune-ups cost the same but take 3-4x longer to schedule.',
  },
  {
    name: 'Filter Replacement',
    range: '$5 – $25',
    typical: '$12',
    emoji: '💨',
    included: ['Standard 1-inch filter (MERV 8 recommended)', 'Media filter up to MERV 11', 'Proper disposal of old filter'],
    notIncluded: ['4-inch media filters ($25-60)', 'HEPA filters', 'Electronic air cleaners'],
    tip: 'DFW dust and pollen levels justify MERV 10-11. Change every 30 days June-September.',
  },
  {
    name: 'Basic Repair (Diagnostic + Minor Fix)',
    range: '$150 – $500',
    typical: '$275',
    emoji: '🛠️',
    included: ['Diagnostic service call (typically $95-125)', 'Minor electrical repairs', 'Simple thermostat issues', 'Contactor replacement', 'Drain pan cleaning'],
    notIncluded: ['Major parts (compressor, coils)', 'Refrigerant', 'After-hours premium'],
    tip: 'After-hours emergency calls in peak summer add $100-200 to any repair.',
  },
  {
    name: 'Capacitor Replacement',
    range: '$100 – $250',
    typical: '$165',
    emoji: '⚡',
    included: ['Run and/or start capacitor replacement', 'Testing of associated motor', 'Full electrical check at outdoor unit'],
    notIncluded: ['Diagnostic fee if not bundled', 'Motor replacement if damaged by failed capacitor'],
    tip: 'Most common DFW summer repair. Capacitors fail when ambient temps exceed 95°F repeatedly.',
  },
  {
    name: 'Refrigerant (R-410A) Top-Off',
    range: '$150 – $400',
    typical: '$250',
    emoji: '🧊',
    included: ['Refrigerant charge check and addition', 'Basic leak check', 'Up to 1 lb R-410A refrigerant'],
    notIncluded: ['Leak repair (additional)', 'R-22 systems (much higher — system may need replacement)', 'Multiple pounds refrigerant'],
    tip: 'R-22 systems: refrigerant costs $100-150/lb. Consider replacement economics carefully.',
  },
  {
    name: 'Full System Replacement (3-ton)',
    range: '$6,500 – $12,000',
    typical: '$8,500',
    emoji: '🏠',
    included: ['Removal and disposal of old equipment', 'New 3-ton split system (14-16 SEER2)', 'New pad or stand if needed', 'Refrigerant line connections', 'Electrical connections and disconnect', 'Permits (varies by city)', 'Startup and commissioning'],
    notIncluded: ['Ductwork repairs or replacement', 'Thermostat upgrade', 'Financing fees'],
    tip: 'Get 3 quotes. Price varies 20-30% in DFW market. Higher SEER2 units save $300-600/year in electricity.',
  },
];

export default function DFWHVACDFWCost2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const svc = selected !== null ? services[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DFW HVAC Cost Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, margin: '0 0 32px' }}>
          Current DFW market rates for common HVAC services as of 2026. Prices reflect DFW labor market and parts costs — not national averages.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { l: 'Tune-Up', v: '$150–250' },
            { l: 'Capacitor', v: '$100–250' },
            { l: 'Full Replace (3T)', v: '$6.5K–12K' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#1e293b', borderRadius: 10, padding: 16, border: '1px solid #334155', textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 800 }}>{s.v}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Select a service type to see current DFW rates and what is included:</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {services.map((s, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642' : '#1e293b', color: selected === i ? '#0A1628' : '#cbd5e1', border: '1px solid ' + (selected === i ? '#F5E642' : '#334155'), borderRadius: 8, padding: '12px 14px', cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: 600 }}>
                {s.emoji} {s.name}
              </button>
            ))}
          </div>
        </div>

        {svc && (
          <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, border: '1px solid #F5E642', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{svc.emoji} {svc.name}</div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>{svc.typical}</div>
                <div style={{ color: '#64748b', fontSize: 11 }}>typical | range: {svc.range}</div>
              </div>
            </div>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>Typically Included:</div>
            <ul style={{ margin: '0 0 12px', paddingLeft: 18 }}>
              {svc.included.map((t, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 4 }}>{t}</li>)}
            </ul>
            <div style={{ color: '#f87171', fontWeight: 600, marginBottom: 6 }}>Not Included:</div>
            <ul style={{ margin: '0 0 12px', paddingLeft: 18 }}>
              {svc.notIncluded.map((t, i) => <li key={i} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>{t}</li>)}
            </ul>
            <div style={{ background: '#0f172a', borderRadius: 8, padding: '10px 14px', color: '#F5E642', fontSize: 13 }}>
              Tip: {svc.tip}
            </div>
          </div>
        )}

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, border: '1px solid #334155' }}>
          <div style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>Get Competitive DFW HVAC Quotes</div>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
            ProLnk connects DFW homeowners with vetted HVAC pros. Describe your need and get competitive quotes from local contractors who know DFW conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
