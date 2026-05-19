import { useState } from 'react';

const tasks = [
  { id: 'dishwasher', label: '🍽️ Run dishwasher at night (11pm–6am)', saving: 8 },
  { id: 'washer', label: '👕 Wash/dry laundry after 9pm', saving: 12 },
  { id: 'ev', label: '🚗 Charge EV 11pm–6am (if applicable)', saving: 35 },
  { id: 'thermostat', label: '🌡️ Pre-cool home before 4pm peak', saving: 18 },
  { id: 'pool', label: '🏊 Pool pump runs midnight–6am', saving: 22 },
  { id: 'battery', label: '🔋 Battery arbitrage (charge cheap, discharge peak)', saving: 45 },
];

const touRates = [
  { period: '11pm – 6am', rate: '$0.06–0.08', label: 'Off-Peak', color: '#22c55e' },
  { period: '6am – 3pm', rate: '$0.10–0.12', label: 'Mid-Peak', color: '#F5E642′ },
  { period: '3pm – 9pm', rate: '$0.18–0.24', label: 'Peak', color: '#ef4444′ },
  { period: '9pm – 11pm', rate: '$0.10–0.12', label: 'Mid-Peak', color: '#F5E642′ },
];

export default function DFWElectricityRateHacks2026() {
  const [checked, setChecked] = useState<string[]>([]);
  const toggle = (id: string) => setChecked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const totalSaving = checked.reduce((sum, id) => sum + (tasks.find(t => t.id === id)?.saving || 0), 0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>💡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Electricity Rate Optimization 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Time-of-use rates can cut your DFW electric bill by 20–40%</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>⏰ DFW Time-of-Use Rate Map</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {touRates.map(r => (
              <div key={r.period} style={{ background: '#0A1628', borderRadius: 10, padding: 14, borderLeft: `4px solid ${r.color}` }}>
                <div style={{ color: r.color, fontWeight: 700, fontSize: 13 }}>{r.label}</div>
                <div style={{ color: '#fff', fontSize: 18, fontWeight: 900, margin: '4px 0′ }}>{r.rate}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{r.period}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 4 }}>💰 Monthly Savings Calculator</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>Check what changes you can make to your daily schedule:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {tasks.map(t => (
              <label key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', background: '#0A1628', borderRadius: 8, padding: '10px 12px', border: checked.includes(t.id) ? '1px solid #F5E642′ : '1px solid #1e3a5f' }}>
                <input type="checkbox" checked={checked.includes(t.id)} onChange={() => toggle(t.id)}
                  style={{ width: 16, height: 16, accentColor: '#F5E642′ }} />
                <span style={{ color: '#cbd5e1', fontSize: 14, flex: 1 }}>{t.label}</span>
                <span style={{ color: '#22c55e', fontSize: 13, fontWeight: 700 }}>~${t.saving}/mo</span>
              </label>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center', borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Estimated Monthly Savings</div>
            <div style={{ color: '#F5E642', fontSize: 42, fontWeight: 900 }}>${totalSaving}</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>${totalSaving * 12}/year — select more items above to increase savings</div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔋 Battery Arbitrage in DFW</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            With a home battery (Powerwall, Franklin, Enphase), you can charge at $0.06–0.08/kWh overnight, then power your home from stored energy during the 3–9pm peak window when rates hit $0.18–0.24/kWh. 
            On a 13.5 kWh battery, this arbitrage is worth $1.50–2.20 per day — or $45–65/month in bill reduction with a TOU plan.
          </p>
        </div>
      </div>
    </div>
  );
}