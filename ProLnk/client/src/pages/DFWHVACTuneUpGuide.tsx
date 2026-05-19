import { useState } from 'react';

const checks = {
  spring: [
    '🌀 Clean evaporator and condenser coils',
    '💧 Check and clear condensate drain line',
    '⚡ Test capacitors and contactors',
    '🌡️ Measure refrigerant charge (not just "check")',
    '🔌 Inspect electrical connections and wiring',
    '📏 Check blower motor amp draw',
    '🌬️ Test airflow at each register',
    '🔧 Lubricate moving parts',
    '📋 Calibrate thermostat accuracy',
  ],
  fall: [
    '🔥 Inspect heat exchanger for cracks',
    '🌀 Clean burners and igniter',
    '💨 Test gas pressure and manifold',
    '🔌 Inspect flue and venting for blockage',
    '🌡️ Measure temperature rise across heat exchanger',
    '⚡ Test safety limits and rollout switches',
    '🔧 Check blower belt or direct drive',
    '📋 Verify carbon monoxide levels at all registers',
    '🌬️ Test heat output at supply registers',
  ],
};

const upsellWarnings = [
  '"UV light install" — rarely needed unless immunocompromised household',
  '"Full duct cleaning" — only needed every 5–10 years unless visible mold',
  '"Compressor replacement" without second opinion — always get one',
  '"New system" when unit is under 10 years old — ask for repair cost instead',
];

export default function DFWHVACTuneUpGuide() {
  const [unitCount, setUnitCount] = useState(1);
  const [unitAge, setUnitAge] = useState(5);
  const [season, setSeason] = useState<'spring' | 'fall'>('spring');
  const [showResult, setShowResult] = useState(false);

  const frequency = unitAge >= 10 ? 'Every 6 months (biannual required)' : 'Biannual — spring before AC season, fall before heat season';
  const costLow = unitCount * 89;
  const costHigh = unitCount * (unitAge >= 10 ? 175 : 149);
  const urgency = unitAge >= 15 ? '🔴 High — aging system needs thorough inspection' : unitAge >= 10 ? '🟡 Moderate — schedule within 30 days' : '🟢 Standard — schedule 2–4 weeks before season';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>HVAC Tune-Up Walkthrough</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.7 }}>
          DFW AC systems run 7+ months per year. A proper tune-up is not just a filter swap — here's what should actually happen and what you should expect to pay.
        </p>

        <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>🗓️ Why DFW Needs Biannual Tune-Ups</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            The AC system runs from April through October — sometimes November. Heat runs December through March. Both systems need a dedicated tune-up before their heavy season. Single-visit "annual" plans miss half the picture.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {(['spring', 'fall'] as const).map(s => (
            <div key={s} onClick={() => setSeason(s)} style={{ background: season === s ? '#F5E64220′ : '#1e293b', border: `1px solid ${season === s ? '#F5E642' : '#334155'}`, borderRadius: 10, padding: '1rem', cursor: ’pointer' }}>
              <div style={{ fontWeight: 700, color: season === s ? '#F5E642′ : '#94a3b8', marginBottom: '0.75rem', textTransform: ’capitalize' }}>{s === 'spring' ? '🌸 Spring (AC Prep)' : '🍂 Fall (Heat Prep)'}</div>
              {checks[s].slice(0, 4).map((c, i) => <div key={i} style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.3rem' }}>{c}</div>)}
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>+{checks[s].length - 4} more checks</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🧮 Your Tune-Up Schedule</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Number of HVAC units</label>
              <input type="number" min={1} max={5} value={unitCount} onChange={e => setUnitCount(+e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: '1rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Oldest unit age (years)</label>
              <input type="number" min={1} max={30} value={unitAge} onChange={e => setUnitAge(+e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: '1rem' }} />
            </div>
          </div>
          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: 'pointer', fontSize: '0.95rem' }}>Get My Schedule →</button>
          {showResult && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ marginBottom: '0.5rem' }}><strong>Urgency:</strong> {urgency}</div>
              <div style={{ marginBottom: '0.5rem' }}><strong>Frequency:</strong> {frequency}</div>
              <div style={{ marginBottom: '0.5rem' }}><strong>DFW market cost:</strong> ${costLow}–${costHigh} per visit ({unitCount} unit{unitCount > 1 ? 's' : ''})</div>
              <div><strong>Next step:</strong> {season === 'spring' ? 'Book spring AC tune-up before April 15′ : ’Book fall heat tune-up before November 1'}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🚩 When to Say No to the Upsell</h2>
          {upsellWarnings.map((w, i) => <div key={i} style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.6rem', paddingLeft: '1rem', borderLeft: '2px solid #ef4444′ }}>{w}</div>)}
        </div>
      </div>
    </div>
  );
}
