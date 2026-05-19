import { useState } from 'react';

const problems = [
  { id: 'breaker', label: '⚡ Breaker Keeps Tripping', diy: false, costRange: '$180 – $650', cause: 'Overloaded circuit or failing breaker. Could also indicate undersized wiring to a high-draw appliance.', threshold: 'PRO REQUIRED', reason: 'Electrical panel work requires a licensed electrician in Texas. DIY risks house fire or failed inspection.' },
  { id: 'outlets', label: '🔌 Dead Outlets / GFCI Trips', diy: true, costRange: '$85 – $280', cause: 'Often a tripped GFCI protecting downstream outlets. Check all GFCI reset buttons in kitchen, bath, garage.', threshold: 'TRY DIY FIRST', reason: 'Reset GFCI buttons first — it\’s free. If outlets still dead after reset, call a pro to trace the circuit.' },
  { id: 'flickering', label: '💡 Flickering or Dimming Lights', diy: false, costRange: '$150 – $900', cause: 'Loose connection at fixture, panel, or service entrance. In 1970s-90s homes, may indicate aluminum wiring issues.', threshold: 'PRO REQUIRED', reason: 'Intermittent connections cause arcing — the #1 cause of electrical fires. Don\’t ignore flickering.' },
  { id: 'panel', label: '🔧 Panel Upgrade Needed', diy: false, costRange: '$1,800 – $4,200', cause: 'Euless homes from 1970s-1980s often have 100-amp panels. EV chargers, HVAC upgrades, and additions require 200-amp service.', threshold: 'PRO REQUIRED', reason: 'Panel upgrades require permits, utility coordination, and licensed electrician. Budget $2,500-3,500 typical.' },
  { id: 'outlets-add', label: '➕ Add Outlets / USB Ports', diy: true, costRange: '$120 – $350 per outlet', cause: 'Standard need in older homes. Surface-mount conduit is a clean DIY option; in-wall requires fishing wire.', threshold: 'DEPENDS ON SKILL', reason: 'Replacing existing outlets: DIY-able. Fishing wire through walls or adding new circuits: hire a pro.' },
  { id: 'ev', label: '🚗 EV Charger Installation', diy: false, costRange: '$600 – $1,400', cause: 'Level 2 charger requires dedicated 240V/50A circuit. Many Euless homes need a panel assessment first.', threshold: 'PRO REQUIRED', reason: 'Permit required in Euless. Incorrect install voids EV warranty and creates fire risk. Always hire licensed.' },
];

export default function DFWElectricianEuless() {
  const [selected, setSelected] = useState('');
  const problem = problems.find((p) => p.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ borderBottom: '3px solid #F5E642', paddingBottom: 24, marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
            ⚡ EULESS TX — MID-CITIES SPECIALISTS
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
            Euless Electricians<br />HEB Mid-Cities Experts
          </h1>
          <p style={{ color: '#a0aec0', fontSize: 18, marginTop: 16, maxWidth: 640 }}>
            Euless sits at the heart of the Mid-Cities between Dallas and Fort Worth. Our licensed electricians know the 1970s–1990s housing stock in the HEB district — and what it takes to bring it up to modern standards safely.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '🏫', label: 'HEB School District', detail: 'Hurst-Euless-Bedford' },
            { icon: '🏠', label: '1970s–1990s Homes', detail: 'Aging electrical systems' },
            { icon: '🚗', label: 'EV Charger Demand', detail: 'Panel upgrades common' },
            { icon: '🔌', label: 'Aluminum Wiring Era', detail: 'Requires special handling' },
          ].map((item) => (
            <div key={item.label} style={{ backgroundColor: '#111f35', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: '#a0aec0', fontSize: 14 }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111f35', border: '2px solid #F5E642', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginTop: 0, marginBottom: 8 }}>
            ⚡ DIY vs Pro Threshold Checker
          </h2>
          <p style={{ color: '#a0aec0', marginBottom: 24 }}>Select your electrical problem to find out if you can tackle it yourself — or when you should call a licensed electrician.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, marginBottom: 28 }}>
            {problems.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                style={{
                  padding: '14px 12px',
                  backgroundColor: selected === p.id ? '#F5E642' : '#0A1628',
                  color: selected === p.id ? '#0A1628' : '#fff',
                  border: `1px solid ${selected === p.id ? '#F5E642' : '#1e3a5f'}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 13,
                  textAlign: 'left',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {problem && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{
                display: 'inline-block',
                padding: '6px 16px',
                borderRadius: 20,
                backgroundColor: problem.diy ? '#1a3a1a' : '#3a1a1a',
                color: problem.diy ? '#86efac' : '#fca5a5',
                fontWeight: 800,
                fontSize: 14,
                marginBottom: 16,
              }}>
                {problem.diy ? '✅ ' : '🚫 '}{problem.threshold}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#a0aec0', fontSize: 12, marginBottom: 6 }}>LIKELY CAUSE</div>
                <div style={{ color: '#e2e8f0', lineHeight: 1.6 }}>{problem.cause}</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#a0aec0', fontSize: 12, marginBottom: 6 }}>WHY THIS THRESHOLD</div>
                <div style={{ color: '#e2e8f0', lineHeight: 1.6 }}>{problem.reason}</div>
              </div>
              <div style={{ backgroundColor: '#111f35', borderRadius: 8, padding: 16, display: 'inline-block' }}>
                <div style={{ color: '#a0aec0', fontSize: 12, marginBottom: 4 }}>ESTIMATED COST IF PRO NEEDED</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>{problem.costRange}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111f35', borderRadius: 12, padding: 24, marginBottom: 40, border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>⚠️ Euless Homeowner Warning: Aluminum Wiring</div>
          <p style={{ color: '#a0aec0', margin: 0, lineHeight: 1.6 }}>Many 1970s Euless homes were wired with aluminum instead of copper. This is a known fire hazard when connected to modern devices without proper CO/ALR outlets or pigtailing. If your home was built between 1965–1973, ask your electrician to inspect for aluminum wiring during any service call.</p>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Get a Licensed Euless Electrician</div>
          <p style={{ color: '#1a2f4a', marginBottom: 24 }}>Permitted work, licensed pros, guaranteed to pass inspection. Serving HEB and all Mid-Cities.</p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 800, fontSize: 17, padding: '16px 40px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Get My Free Quote ⚡
          </button>
        </div>

      </div>
    </div>
  );
}
