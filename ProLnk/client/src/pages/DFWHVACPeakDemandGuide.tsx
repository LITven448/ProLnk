import { useState } from 'react';

const peakTips = [
  { icon: '🌡️', tip: 'Pre-cool your home to 74°F before 2pm', savings: '15-25%', effort: 'Low' },
  { icon: '🪟', tip: 'Close blinds on west-facing windows by noon', savings: '5-10%', effort: 'Low' },
  { icon: '🌀', tip: 'Use ceiling fans to feel 4°F cooler without lowering thermostat', savings: '8-12%', effort: 'Low' },
  { icon: '🍽️', tip: 'Avoid oven use 3-7pm — use microwave or cook outdoors', savings: '3-5%', effort: 'Medium' },
  { icon: '🧺', tip: 'Run dishwasher and laundry after 9pm', savings: '5-8%', effort: 'Low' },
  { icon: '💡', tip: 'Switch to LED lighting — incandescents add heat load', savings: '2-4%', effort: 'One-time' },
  { icon: '📱', tip: 'Enroll in Oncor Smart Thermostat Program —  rebate + credits', savings: '10-18%', effort: 'One-time' },
  { icon: '🔋', tip: 'Battery storage (Powerwall) can discharge during peak hours', savings: '20-40%', effort: 'High' },
];

const situations = [
  'Home all day with family',
  'Away from home 8am-5pm',
  'Work from home alone',
  'Have a smart thermostat',
  'No smart thermostat',
];

const situationPlans: Record<string, { plan: string; savings: string }> = {
  'Home all day with family': { plan: 'Pre-cool to 74°F by 1pm. Raise to 78°F from 3-7pm with fans running. Use blackout curtains. Enroll in Oncor Smart Thermostat Program for automatic adjustments and  rebate.', savings: '-320/summer' },
  'Away from home 8am-5pm': { plan: 'Program thermostat to 82°F while away, 74°F starting at 4pm so it is comfortable by 5:30pm arrival. This alone cuts peak demand by 60%.', savings: '-400/summer' },
  'Work from home alone': { plan: 'Zone cooling if available — cool only your workspace. Pre-cool whole home by 1pm. Strategic fans reduce effective temp 4°F. Avoid cooking 2-7pm.', savings: '-260/summer' },
  'Have a smart thermostat': { plan: 'Enable Eco+ or peak demand mode. Set pre-cool schedule (74°F by 1pm, 78°F from 3-7pm, 74°F by 7pm). Connect to Oncor Smart Thermostat Program for automated peak events.', savings: '-380/summer' },
  'No smart thermostat': { plan: 'Manually adjust thermostat at 2pm daily. Consider a Ecobee or Nest (-250) — payback in one summer at DFW energy rates. Oncor offers  rebate on qualifying models.', savings: '-300/summer after upgrade' },
};

export default function DFWHVACPeakDemandGuide() {
  const [situation, setSituation] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600 }}>⚡ DFW HVAC RESOURCE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>HVAC Peak Demand Guide for DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 16, fontSize: 15 }}>
          DFW peak demand hours (typically 3–7pm, July–August) are when the ERCOT grid strains most and Oncor time-of-use rates are highest.
          Managing HVAC during these windows can cut summer bills by 20-40%.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Peak Window', value: '3–7pm', sub: 'Jul–Aug weekdays' },
            { label: 'Grid Events Per Summer', value: '15–40', sub: 'ERCOT emergency days' },
            { label: 'Demand Charge Premium', value: '2–3x', sub: 'vs off-peak rate' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0F2240', borderRadius: 10, padding: 16, border: '1px solid #1E3A5F', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: '#64748B' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🛡️ Peak Demand Reduction Tactics</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {peakTips.map(t => (
              <div key={t.tip} style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <span style={{ fontSize: 20 }}>{t.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: '#CBD5E1' }}>{t.tip}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Effort: {t.effort}</div>
                </div>
                <div style={{ minWidth: 70, fontSize: 13, fontWeight: 700, color: '#10B981', textAlign: 'right' }}>{t.savings}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>🏠 My Peak Demand Plan</h2>
          <select value={situation} onChange={e => setSituation(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 14, marginBottom: 16 }}>
            <option value="">Select your situation...</option>
            {situations.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {situation && situationPlans[situation] && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 14, color: '#CBD5E1', lineHeight: 1.7, marginBottom: 12 }}>{situationPlans[situation].plan}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10B981' }}>Expected savings: {situationPlans[situation].savings}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
