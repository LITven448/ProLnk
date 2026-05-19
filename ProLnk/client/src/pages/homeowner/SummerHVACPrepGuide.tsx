import { useState } from 'react';

const steps = [
  { id: 1, title: 'Replace Air Filter', desc: 'Use MERV-8 or higher. DFW dust + pollen = monthly replacement May–Oct.', diy: true },
  { id: 2, title: 'Clear Condenser Coils', desc: 'Shut off power, rinse outdoor unit with hose. Remove debris and vegetation.', diy: true },
  { id: 3, title: 'Check Refrigerant Lines', desc: 'Inspect insulation on copper lines from unit to home. Replace if cracked.', diy: true },
  { id: 4, title: 'Test Thermostat Calibration', desc: 'Compare reading to a separate thermometer. Off by 3°F+ = recalibrate or replace.', diy: true },
  { id: 5, title: 'Clear Condensate Drain', desc: 'Pour 1 cup of bleach down the drain line to prevent algae clogs.', diy: true },
  { id: 6, title: 'Inspect Ductwork', desc: 'Check accessible ducts for disconnections or tears. Seal with mastic sealant.', diy: true },
  { id: 7, title: 'Schedule Pro Tune-Up', desc: 'HVAC tech checks refrigerant charge, electrical connections, and motor bearings.', diy: false },
  { id: 8, title: 'Verify Attic Insulation', desc: 'DFW attics hit 150°F in summer. R-38 minimum. Add blown insulation if needed.', diy: false },
];

const thermostatSettings = [
  { temp: 68, label: 'Too Cold', monthlyEst: 320, note: 'Overcooling in DFW heat — system runs nonstop' },
  { temp: 72, label: 'Comfortable', monthlyEst: 240, note: 'Good balance for most households' },
  { temp: 75, label: 'Optimal', monthlyEst: 175, note: 'DOE recommended for efficiency' },
  { temp: 78, label: 'Efficient', monthlyEst: 120, note: 'Every degree above 72°F saves ~3%' },
  { temp: 82, label: 'Warm', monthlyEst: 80, note: 'Only viable with ceiling fans in every room' },
];

export default function SummerHVACPrepGuide() {
  const [checked, setChecked] = useState<number[]>([]);
  const [selectedTemp, setSelectedTemp] = useState(75);
  const [sqft, setSqft] = useState(2000);

  const toggle = (id: number) =>
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const setting = thermostatSettings.find(s => s.temp === selectedTemp) || thermostatSettings[2];
  const scaledCost = Math.round((setting.monthlyEst * sqft) / 2000);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌡️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW Summer HVAC Prep Guide
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Before the heat hits 100°F+ — complete this checklist every May
          </p>
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <div>
            <strong>DFW Summer Fact:</strong> Dallas averages 19 days above 100°F per year. An HVAC failure in July can make your home dangerously hot within hours.
          </div>
        </div>

        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>
          ✅ May Pre-Summer Checklist
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {steps.map(step => (
            <div
              key={step.id}
              onClick={() => toggle(step.id)}
              style={{
                background: checked.includes(step.id) ? '#0f2a1a' : '#112240',
                border: `1px solid ${checked.includes(step.id) ? '#22c55e' : '#1e3a5f'}`,
                borderRadius: 10,
                padding: '1rem 1.25rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
              }}
            >
              <span style={{ fontSize: '1.25rem', marginTop: 2 }}>
                {checked.includes(step.id) ? '✅' : '⬜'}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <strong style={{ color: checked.includes(step.id) ? '#22c55e' : '#fff' }}>{step.title}</strong>
                  <span style={{ fontSize: '0.7rem', background: step.diy ? '#1e40af' : '#7c3aed', color: '#fff', borderRadius: 4, padding: '1px 6px' }}>
                    {step.diy ? 'DIY' : 'Pro'}
                  </span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            🔧 Filter Replacement Schedule
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e3a5f' }}>
                  {['Month', 'Action', 'Priority'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.5rem', color: '#94a3b8′ }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['May', 'Replace filter + schedule tune-up', '🔴 Critical'],
                  ['June', 'Replace filter', '🟡 High'],
                  ['July', 'Replace filter + check drain line', '🔴 Critical'],
                  ['Aug', 'Replace filter', '🟡 High'],
                  ['Sep', 'Replace filter', '🟡 High'],
                  ['Oct', 'Replace filter + winterize', '🟢 Normal'],
                ].map(([month, action, priority]) => (
                  <tr key={month} style={{ borderBottom: '1px solid #1e3a5f' }}>
                    <td style={{ padding: '0.5rem', fontWeight: 600 }}>{month}</td>
                    <td style={{ padding: '0.5rem', color: '#94a3b8′ }}>{action}</td>
                    <td style={{ padding: '0.5rem' }}>{priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>
            💰 Monthly Energy Cost Estimator
          </h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Home Size (sq ft)</label>
              <input
                type="number"
                value={sqft}
                onChange={e => setSqft(Number(e.target.value))}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.5rem', color: '#fff', marginTop: '0.25rem', fontSize: '1rem' }}
              />
            </div>
            <div style={{ flex: 2, minWidth: 220 }}>
              <label style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Thermostat Setting: {selectedTemp}°F</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {thermostatSettings.map(s => (
                  <button
                    key={s.temp}
                    onClick={() => setSelectedTemp(s.temp)}
                    style={{
                      background: selectedTemp === s.temp ? '#F5E642′ : '#1e3a5f',
                      color: selectedTemp === s.temp ? '#0A1628′ : '#fff',
                      border: 'none', borderRadius: 8, padding: '0.4rem 0.75rem', cursor: 'pointer', fontWeight: 600,
                    }}
                  >
                    {s.temp}°F
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: '1rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642′ }}>${scaledCost}/mo</div>
            <div style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.25rem' }}>{setting.label} — {setting.note}</div>
          </div>
        </div>

        <div style={{ background: '#1a1a2e', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏠</div>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>Need a DFW HVAC Pro?</h3>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.875rem' }}>
            ProLnk connects you with vetted local HVAC technicians. Get 3 quotes fast.
          </p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontSize: '1rem', cursor: 'pointer' }}>
            Get Free HVAC Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
