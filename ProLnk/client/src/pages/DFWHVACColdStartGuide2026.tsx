import { useState } from 'react';

const symptoms = [
  { id: 'smell', label: '💨 Burning Smell from Vents', tip: 'Normal — dust burning off heat exchanger after months dormant. Should clear in 15–30 minutes. If it persists or smells like burning plastic/rubber, shut off and call tech.' },
  { id: 'nostart', label: '❌ Furnace Won\'t Ignite', tip: 'Check if crankcase heater has been on. Heat pumps need crankcase heater running 24/7 — if power was cut, wait 24 hours before starting. Cold oil can damage compressor.' },
  { id: 'heatpump', label: '🔁 Heat Pump Not Heating', tip: 'DFW heat pumps struggle below 35°F. Aux/emergency heat should kick in automatically. Check that aux heat strips are functional before first cold snap each year.' },
  { id: 'capacitor', label: '⚡ AC/Furnace Hums but Won\'t Start', tip: 'Capacitor failure — common in DFW after sitting idle. Capacitors weaken in extreme heat. Humming + no startup = likely failed start or run capacitor. Inexpensive fix.' },
  { id: 'board', label: '🖥️ Thermostat Shows Heat but Nothing Happens', tip: 'Control board confusion after long dormancy is rare but real. Try cycling power at the breaker. If error codes appear, document them before calling. Check ProLnk for verified HVAC techs.' },
];

export default function DFWHVACColdStartGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = symptoms.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>ProLnk · DFW HVAC Series</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          ❄️ DFW HVAC Cold Start Problems Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          DFW furnaces and heat pumps sit idle 6–8 months a year. When the first cold front hits in November, problems surface fast. Know the difference between normal first-run behavior and actual failures before calling a tech.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🗓️', label: 'DFW Heat Season', value: 'Nov–Mar (~5 mo)' },
            { icon: '🌡️', label: 'Lowest DFW Avg Temp', value: '32–38°F (Jan)' },
            { icon: '⚡', label: 'Top Cold-Start Failure', value: 'Capacitor' },
            { icon: '⏱️', label: 'Normal Burn-Off Smell', value: '15–30 min' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{stat.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1rem' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>What Symptom Are You Seeing?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {symptoms.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{
                background: selected === s.id ? '#F5E642' : '#0f2040',
                color: selected === s.id ? '#0A1628' : '#fff',
                border: '1px solid #1e3a5f',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0f2040', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>{active.label}</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{active.tip}</p>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📋 Pre-Season DFW HVAC Checklist (October)</div>
          {[
            'Confirm crankcase heater has been on all summer',
            'Replace filter before first heat run',
            'Test thermostat on HEAT mode before cold front arrives',
            'Check aux heat strip operation on heat pump',
            'Have capacitor tested — DFW heat weakens them annually',
            'Log system test results in ProLnk Home Vault',
          ].map(item => (
            <div key={item} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.6rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              <span style={{ color: '#F5E642' }}>✓</span>{item}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk Home Health Vault · DFW HVAC Series 2026
        </div>
      </div>
    </div>
  );
}