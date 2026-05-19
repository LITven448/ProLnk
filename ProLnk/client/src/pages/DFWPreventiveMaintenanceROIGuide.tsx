import { useState } from 'react';

const SYSTEMS = [
  { label: 'HVAC System', value: 'hvac' },
  { label: 'Foundation', value: 'foundation' },
  { label: 'Roof', value: 'roof' },
  { label: 'Gutters', value: 'gutters' },
  { label: 'Water Heater', value: 'waterheater' },
  { label: 'Plumbing', value: 'plumbing' },
];

const ROI_DATA: Record<string, { maintCost: string; maintFreq: string; failureCost: string; failureName: string; roi: number; payback: string; detail: string }> = {
  hvac: {
    maintCost: '$150',
    maintFreq: 'Annual tune-up',
    failureCost: '$8,500',
    failureName: 'Full HVAC replacement',
    roi: 5567,
    payback: '6 days of use',
    detail: 'A $150 tune-up catches capacitor wear ($200 repair) before it becomes compressor failure ($4,000+) or full replacement ($8,500). In DFW, August failure means hotel costs on top.',
  },
  foundation: {
    maintCost: '$360',
    maintFreq: '$30/mo soaker hose system',
    failureCost: '$12,000',
    failureName: 'Pier and beam foundation repair (avg DFW)',
    roi: 3233,
    payback: '11 days of protection',
    detail: 'DFW clay soil requires consistent moisture to prevent differential settlement. A soaker hose running during droughts prevents the slab movement that leads to $8,000–$25,000 pier installation.',
  },
  roof: {
    maintCost: '$150',
    maintFreq: 'Annual inspection',
    failureCost: '$25,000',
    failureName: 'Full roof replacement + water damage repair',
    roi: 16567,
    payback: '3 days of protection',
    detail: 'A $150 inspection catches missing flashing and granule loss from DFW hail before a single storm turns into a $15,000 roof + $10,000 water damage interior repair.',
  },
  gutters: {
    maintCost: '$150',
    maintFreq: 'Bi-annual cleaning',
    failureCost: '$8,000',
    failureName: 'Foundation water intrusion + interior repair',
    roi: 5233,
    payback: '7 days of protection',
    detail: 'Blocked gutters in DFW redirect roof water against the foundation. Combined with clay soil shrinkage, this accelerates settlement and causes interior wall cracking and water intrusion.',
  },
  waterheater: {
    maintCost: '$75',
    maintFreq: 'Annual flush',
    failureCost: '$2,800',
    failureName: 'Tank replacement + water damage cleanup',
    roi: 3633,
    payback: '10 days of protection',
    detail: 'DFW hard water (300+ ppm) deposits sediment rapidly. Annual flushing removes sediment, extends tank life by 3–5 years, and prevents the catastrophic failure that floods the garage or utility room.',
  },
  plumbing: {
    maintCost: '$200',
    maintFreq: 'Annual inspection + leak monitoring',
    failureCost: '$30,000',
    failureName: 'Slab leak repair + remediation + flooring',
    roi: 14900,
    payback: '5 days of protection',
    detail: 'DFW slab foundations mean plumbing runs under the home. A $30–$50/yr water monitor subscription detects micro-leaks before they become slab leaks requiring jackhammering, pipe reroute, and floor replacement.',
  },
};

export default function DFWPreventiveMaintenanceROIGuide() {
  const [system, setSystem] = useState('');
  const data = system ? ROI_DATA[system] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Preventive Maintenance ROI Guide</h1>
        <p style={{ color: '#8899AA', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          Every dollar spent on preventive maintenance in DFW returns $30–$170 in avoided failure costs. The math is not close — prevention always wins. Here is the proof by system.
        </p>

        <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💡 The Core Principle</h2>
          <p style={{ color: '#8899AA', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
            DFW homeowners face above-average failure costs because of: extreme heat cycles (140°F attic temperatures), expansive clay soil, above-average hail frequency, and hard water that degrades systems faster. The maintenance investment is modest. The failure cost is devastating.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              ['🔧 Maintenance', 'Predictable cost', '#F5E642'],
              ['💥 Failure', 'Catastrophic cost', '#FF6B6B'],
              ['📈 ROI', '30x–170x return', '#4CAF50'],
            ].map(([label, sub, color]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' as const }}>
                <div style={{ fontSize: 16, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 12, color: color as string }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Calculate ROI by System</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8899AA', marginBottom: 8 }}>Select a Home System</label>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {SYSTEMS.map(s => (
                <button key={s.value} onClick={() => setSystem(s.value)}
                  style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: system === s.value ? '#F5E642′ : '#0A1628',
                    color: system === s.value ? '#0A1628′ : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          {data && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642′ }}>
                  <div style={{ fontSize: 12, color: '#8899AA', marginBottom: 4 }}>PREVENTIVE MAINTENANCE</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>{data.maintCost}</div>
                  <div style={{ fontSize: 12, color: '#8899AA' }}>{data.maintFreq}</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: '4px solid #FF6B6B' }}>
                  <div style={{ fontSize: 12, color: '#8899AA', marginBottom: 4 }}>FAILURE COST</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#FF6B6B' }}>{data.failureCost}</div>
                  <div style={{ fontSize: 12, color: '#8899AA' }}>{data.failureName}</div>
                </div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #4CAF50', marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 12, color: '#8899AA' }}>RETURN ON INVESTMENT</div>
                    <div style={{ fontSize: 36, fontWeight: 800, color: '#4CAF50′ }}>{data.roi.toLocaleString()}%</div>
                  </div>
                  <div style={{ textAlign: 'right' as const }}>
                    <div style={{ fontSize: 12, color: '#8899AA' }}>PAYBACK PERIOD</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#E8EDF5′ }}>{data.payback}</div>
                  </div>
                </div>
              </div>
              <div style={{ background: '#111E33', borderRadius: 10, padding: 16, fontSize: 14, color: '#8899AA', lineHeight: 1.6 }}>
                {data.detail}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 DFW Annual Maintenance Budget (All Systems)</h2>
          {[
            ['HVAC tune-up', '$150/yr', '$8,500'],
            ['Foundation watering', '$360/yr', '$12,000'],
            ['Roof inspection', '$150/yr', '$25,000'],
            ['Gutter cleaning (2x)', '$150/yr', '$8,000'],
            ['Water heater flush', '$75/yr', '$2,800'],
            ['Plumbing inspection', '$200/yr', '$30,000'],
          ].map(([task, cost, avoided]) => (
            <div key={task} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1E2D45', paddingBottom: 10, marginBottom: 10 }}>
              <div style={{ fontSize: 14 }}>{task}</div>
              <div style={{ display: 'flex', gap: 24, fontSize: 13 }}>
                <span style={{ color: '#F5E642', fontWeight: 600 }}>{cost}</span>
                <span style={{ color: '#8899AA' }}>avoids {avoided}</span>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontWeight: 700 }}>
            <span>Total Annual Investment</span>
            <span style={{ color: '#4CAF50′ }}>$1,085/yr → protects $86,300 in failure risk</span>
          </div>
        </div>

        <div style={{ textAlign: 'center' as const }}>
          <a href="/get-quotes" style={{ background: '#F5E642', color: '#0A1628', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
            Schedule Preventive Maintenance →
          </a>
        </div>
      </div>
    </div>
  );
}