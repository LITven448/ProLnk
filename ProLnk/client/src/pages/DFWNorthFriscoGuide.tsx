import { useState } from 'react';

const buildYearRanges = [
  { label: '2020-2026 (Brand New)', value: 'new', warranty: ['Builder structural warranty active (10yr)', 'Roof warranty active (5yr)', 'Appliance warranties active (1-2yr)', 'HVAC manufacturer warranty (5-10yr)'], maintenance: ['Document all builder warranties NOW', 'Schedule 11-month builder walkthrough', 'Check grading/drainage before first rain season', 'Test all GFCI outlets and breakers'], upcoming: ['Year 2-3: Caulking and sealant refresh', 'Year 3-5: First HVAC filter/service cycle', 'Year 5: Roof inspection milestone', 'Year 7-10: Appliance replacement planning'] },
  { label: '2015-2019 (Post-Recession Build)', value: 'mid', warranty: ['Most builder warranties expired', 'Check for any extended structural coverage', 'Roof likely still in good shape (7-11yr)'], maintenance: ['HVAC service history audit', 'Water heater age check (replace at 10-12yr)', 'Irrigation system inspection', 'Foundation watering program start'], upcoming: ['Year 5-8: Roof replacement planning (-18K)', 'HVAC replacement window approaching', 'Kitchen/bath refresh for resale value'] },
  { label: '2010-2014 (Recovery Era)', value: 'early', warranty: ['All warranties expired', 'Focus on proactive replacement'], maintenance: ['Full HVAC inspection and likely replacement', 'Water heater replacement if original', 'Foundation inspection (North TX clay soil)', 'Fence and exterior wood inspection'], upcoming: ['Major systems replacement cycle', 'Roof replacement likely needed (-20K)', 'Consider smart home upgrades for resale'] },
];

export default function DFWNorthFriscoGuide() {
  const [selected, setSelected] = useState<string>('');

  const active = buildYearRanges.find(r => r.value === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>
          DFW Homeowner Series
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          🏗️ North Frisco Homeowner Guide
        </h1>
        <p style={{ color: '#94A3B8', marginBottom: 24, lineHeight: 1.7 }}>
          North Frisco is one of the fastest-growing areas in all of DFW — from Panther Creek to Fields and beyond. Most homes here were built 2012-2026, meaning warranty management and new-construction maintenance are your top priorities.
        </p>

        <div style={{ background: '#111D30', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📅 Select Your Home Build Year</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {buildYearRanges.map(r => (
              <button key={r.value} onClick={() => setSelected(r.value)}
                style={{ background: selected === r.value ? '#F5E642′ : '#1E2D45', color: selected === r.value ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#111D30', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🛡️ Active Warranty Items</div>
              {active.warranty.map((w, i) => <div key={i} style={{ color: '#CBD5E1', marginBottom: 6, paddingLeft: 16, borderLeft: '3px solid #F5E642′ }}>{w}</div>)}
            </div>
            <div style={{ background: '#111D30', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🔧 First Maintenance Priorities</div>
              {active.maintenance.map((m, i) => <div key={i} style={{ color: '#CBD5E1', marginBottom: 6, paddingLeft: 16, borderLeft: '3px solid #22D3EE' }}>{m}</div>)}
            </div>
            <div style={{ background: '#111D30', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>📈 Upcoming Capital Expenses</div>
              {active.upcoming.map((u, i) => <div key={i} style={{ color: '#CBD5E1', marginBottom: 6, paddingLeft: 16, borderLeft: '3px solid #A78BFA' }}>{u}</div>)}
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, background: '#111D30', borderRadius: 12, padding: 20, color: '#94A3B8', fontSize: 13 }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk Tip: </span>
          North Frisco contractors are in high demand. Pre-book HVAC service in February and roofing inspections in September before the rush.
        </div>
      </div>
    </div>
  );
}
