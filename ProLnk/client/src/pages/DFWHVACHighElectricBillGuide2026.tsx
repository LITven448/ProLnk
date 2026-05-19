import { useState } from 'react';

const diagnoses = [
  { range: 'Under $200/mo', size: 'Under 1,500 sq ft', verdict: '✅ Normal', issues: [] },
  { range: '$200-350/mo', size: '1,500-2,500 sq ft', verdict: '⚠️ Check Filter + Thermostat', issues: ['Replace filter — dirty filter forces 15-20% longer runtime', 'Thermostat set too cold (each 1° lower = 3% more cost)', 'Check for duct leaks in attic — DFW attics hit 150°F and leaks are expensive'] },
  { range: '$350-500/mo', size: '2,500-4,000 sq ft', verdict: '🔴 Efficiency Problem', issues: ['Low refrigerant — unit runs longer to reach setpoint, costs 20-30% more', 'Duct leaks — DFW homes lose 20-30% of cooled air to attic in older homes', 'Unit oversized or undersized — both cost more than right-sized unit', 'Old unit (12+ years) — efficiency ratings have improved dramatically'] },
  { range: 'Over $500/mo', size: 'Any size', verdict: '🚨 Major Issue', issues: ['Unit likely failing — compressor efficiency drops sharply at end of life', 'Refrigerant critically low or leak present', 'Duct system compromised — get a duct pressure test', 'Consider replacing unit if over 12 years old — payback is 2-4 years in DFW'] },
];

export default function DFWHVACHighElectricBillGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = diagnoses.find(d => d.range === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '24px', marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>💡 DFW HVAC High Electric Bill Guide — 2026</h1>
          <p style={{ margin: '8px 0 0', fontWeight: 600 }}>HVAC drives 50-70% of your DFW summer electric bill. Here's how to diagnose the waste.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>📊 DFW HVAC Cost Drivers</h2>
          {[
            { label: 'Dirty filter', impact: '+15-20% runtime' },
            { label: 'Low refrigerant', impact: '+20-30% energy use' },
            { label: 'Duct leaks', impact: 'Lose 20-30% of cooled air' },
            { label: 'Thermostat too low', impact: '+3% per degree' },
            { label: 'Unit over 12 years old', impact: 'SEER drops 30-50%' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '10px 0', borderBottom: '1px solid #1e3a5f' }}>
              <div style={{ color: '#cdd9e5' }}>{item.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{item.impact}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>🔍 What's your monthly bill?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {diagnoses.map(d => (
              <button key={d.range} onClick={() => setSelected(d.range === selected ? null : d.range)}
                style={{ background: selected === d.range ? '#F5E642' : '#1e3a5f', color: selected === d.range ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '14px 18px', fontSize: 15, fontWeight: 700, cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between' }}>
                <span>{d.range}</span>
                <span style={{ fontSize: 13, opacity: 0.8 }}>{d.size}</span>
              </button>
            ))}
          </div>
          {active && (
            <div style={{ marginTop: 20, background: '#0d1f3c', borderRadius: 8, padding: 20 }}>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, color: '#F5E642' }}>{active.verdict}</div>
              {active.issues.length > 0 ? active.issues.map((issue, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
                  <span style={{ color: '#F5E642', fontWeight: 800, minWidth: 24 }}>{i + 1}.</span>
                  <span style={{ color: '#cdd9e5' }}>{issue}</span>
                </div>
              )) : <div style={{ color: '#4ade80', fontWeight: 600 }}>Your bill looks normal for DFW. Keep up with filter changes monthly.</div>}
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>💰 Quick Wins to Lower Bill</h2>
          {['Set thermostat to 78°F when home, 85°F when away', 'Replace filter monthly June-Sept', 'Add attic insulation (DFW heat hits R-38 minimum)', 'Seal duct connections with mastic (not tape)', 'Get unit serviced annually — coil cleaning improves efficiency 10-15%'].map((item, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3a5f', color: '#cdd9e5' }}>💡 {item}</div>
          ))}
          <div style={{ marginTop: 20, background: '#F5E642', borderRadius: 8, padding: 16, textAlign: 'center' }}>
            <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>ProLnk connects you with DFW energy efficiency experts.</div>
          </div>
        </div>
      </div>
    </div>
  );
}