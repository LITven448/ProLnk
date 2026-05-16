import { useState } from 'react';

export default function DFWHeatStripsGuide2026() {
  const [systemType, setSystemType] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    if (!systemType) { setResult('Please select your system type.'); return; }
    if (systemType === 'heat-pump-strips') {
      setResult('⚠️ High Risk. Your system has aux heat strips that run when the heat pump cannot keep up. In DFW, strips should activate rarely — only during the coldest nights. If your January electric bill exceeds $300 on a 2,000 sqft home, strips may be running too often. Have a tech check the thermostat lockout settings.');
      return;
    }
    if (systemType === 'all-electric') {
      setResult('🔴 Cost Alert. All-electric homes without heat pump efficiency rely entirely on resistance heating — same as running a giant toaster. Cost: $4–$8/hour when running. Upgrading to a heat pump can cut heating costs 60–70%. Get quotes — Oncor rebates available in 2026 for heat pump upgrades.');
      return;
    }
    if (systemType === 'gas-furnace') {
      setResult('✅ No strip concern. Gas furnaces do not use heat strips. Your heating cost is driven by gas rates (~$1.50–$3.00/therm in DFW). Focus on filter changes and annual tune-ups for efficiency.');
      return;
    }
    if (systemType === 'dual-fuel') {
      setResult('✅ Low risk. Dual fuel systems use gas backup instead of strips during cold snaps — this is more efficient. Verify your crossover temp is set to 35–40°F so strips never activate unnecessarily.');
      return;
    }
    setResult('Please select a valid system type.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0' }}>DFW Electric Heat Strips Guide 2026</h1>
          <p style={{ color: '#a0aec0' }}>Why your January bill spikes and what to do about it</p>
        </div>

        <div style={{ background: '#1a0a0a', border: '2px solid #e53e3e', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#fc8181', marginTop: 0 }}>⚠️ The Heat Strip Cost Problem</h2>
          <p style={{ color: '#fed7d7', lineHeight: 1.6, margin: 0 }}>
            Electric auxiliary heat strips are essentially giant resistance coils — the same technology as your toaster or hair dryer, just much larger. When activated, they consume <strong>10–25 kW</strong> continuously. At DFW's typical rate of <strong>$0.12–$0.18/kWh</strong>, that is <strong>$1.20–$4.50 per hour</strong> just for heating. A cold January night with strips running 8 hours equals <strong>$10–$36 in one night</strong>.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '🌡️', title: 'When Strips Should Activate', desc: 'Only when outdoor temp drops below the heat pump balance point (~25–30°F). In DFW, this should be fewer than 5 nights per year. If strips run regularly above 35°F, something is wrong.' },
            { icon: '📋', title: 'Signs Strips Are Overrunning', desc: 'January electric bills over $250–$350 on a typical DFW home. Thermostat showing AUX or EM HEAT frequently. Heat pump running but home feels cool before strips kick in.' },
            { icon: '🔧', title: 'Fix: Thermostat Lockout', desc: 'Ask your HVAC tech to set a strip lockout temperature at 35°F or higher. Modern thermostats (Ecobee, Nest) allow this configuration in advanced settings. This alone can save $50–$150/year.' },
            { icon: '💡', title: 'Oncor 2026 Rebates', desc: 'Oncor offers $300–$500 rebates for heat pump upgrades that eliminate strip dependence. Qualifying systems: 15+ SEER2 heat pump. Check oncor.com/rebates before your next HVAC purchase.' },
          ].map((card, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', margin: '0 0 0.5rem', fontSize: '1rem' }}>{card.title}</h3>
              <p style={{ color: '#a0aec0', margin: 0, fontSize: '0.875rem', lineHeight: 1.5 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔍 Heating System Efficiency Assessment</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#a0aec0', fontSize: '0.875rem' }}>Your Heating System Type</label>
            <select value={systemType} onChange={e => setSystemType(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 4, padding: '0.5rem', borderRadius: 6, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff' }}>
              <option value=''>Select system type</option>
              <option value='heat-pump-strips'>Heat pump with electric aux strips</option>
              <option value='all-electric'>All-electric resistance heat only</option>
              <option value='gas-furnace'>Gas furnace (no heat pump)</option>
              <option value='dual-fuel'>Dual fuel (heat pump + gas backup)</option>
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Assess My System
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8, color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>💰 Hourly Heating Cost Comparison</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
            {[
              ['Electric Strips', '$4–$8/hr', '#e53e3e'],
              ['Heat Pump', '$0.50–$1.50/hr', '#48bb78'],
              ['Gas Furnace', '$0.75–$2.00/hr', '#4299e1'],
              ['Dual Fuel Gas', '$0.75–$2.00/hr', '#4299e1'],
            ].map(([label, val, color], i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ color: '#a0aec0', fontSize: '0.75rem' }}>{label}</div>
                <div style={{ color, fontWeight: 700, marginTop: 4 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
