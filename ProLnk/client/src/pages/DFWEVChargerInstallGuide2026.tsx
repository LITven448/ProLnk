import { useState } from 'react';

export default function DFWEVChargerInstallGuide2026() {
  const [evModel, setEvModel] = useState('Tesla Model Y');
  const [homeAge, setHomeAge] = useState(2000);

  const models = ['Tesla Model Y', 'F-150 Lightning', 'Rivian R1T', 'Chevy Equinox EV', 'BMW iX'];
  const needsUpgrade = homeAge < 1990;
  const baseCost = 1000;
  const upgradeCost = needsUpgrade ? 2500 : 0;
  const total = baseCost + upgradeCost;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>⚡</span>
          <h1 style={{ fontSize: 28, color: '#F5E642', margin: 0 }}>DFW EV Charger Install Guide 2026</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Level 2 home charging setup for DFW homeowners — costs, panels, and ERCOT savings.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🔌', label: 'Level 2 Install Cost', value: '$800–1,500' },
            { icon: '⏰', label: 'Best Charge Window', value: '9pm–6am' },
            { icon: '🏠', label: 'Panel Upgrade (older homes)', value: '+$2,500' },
          ].map(card => (
            <div key={card.label} style={{ background: '#132040', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{card.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642' }}>{card.value}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{card.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📋 DFW EV Charging Facts</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>ERCOT TOU rates: electricity cheapest overnight (off-peak ~$0.06/kWh vs $0.14 peak)</li>
            <li>Level 2 charger adds ~25 miles of range per hour — most EVs fully charge overnight</li>
            <li>Homes built before 1990 often need 200-amp panel upgrade before install</li>
            <li>Most DFW cities require electrical permit; inspection typically same-week</li>
            <li>Federal 30% EV charger tax credit (Form 8911) applies for residential installs</li>
            <li>Popular DFW EVs: Tesla Model Y, F-150 Lightning, Rivian R1T, Chevy Equinox EV</li>
          </ul>
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔧 Install Scope Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13 }}>Your EV Model</label>
              <select value={evModel} onChange={e => setEvModel(e.target.value)}
                style={{ width: '100%', padding: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6, marginTop: 4 }}>
                {models.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13 }}>Home Year Built</label>
              <input type="range" min={1950} max={2024} step={1} value={homeAge}
                onChange={e => setHomeAge(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{homeAge}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {[
              { label: 'Charger + Install', value: `$${baseCost.toLocaleString()}` },
              { label: 'Panel Upgrade', value: needsUpgrade ? `$${upgradeCost.toLocaleString()}` : 'Not Needed' },
              { label: 'Est. Total', value: `$${total.toLocaleString()}` },
            ].map(r => (
              <div key={r.label} style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642' }}>{r.value}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{r.label}</div>
              </div>
            ))}
          </div>
          {needsUpgrade && <p style={{ color: '#fbbf24', marginTop: 12, fontSize: 13 }}>⚠️ Homes built before 1990 often require a panel upgrade — your electrician will confirm during assessment.</p>}
        </div>
      </div>
    </div>
  );
}
