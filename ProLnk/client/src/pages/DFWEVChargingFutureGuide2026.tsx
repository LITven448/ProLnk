import { useState } from 'react';

const evModels = [
  { name: 'Tesla Model Y/3', icon: '🚗', charger: '48A Level 2', milesPerHr: '35 mi/hr', note: 'NACS port — Tesla Wall Connector recommended' },
  { name: 'F-150 Lightning', icon: '🛻', charger: '80A Level 2', milesPerHr: '30 mi/hr', note: 'Pro 80A EVSE needed; Ford Charge Station Pro' },
  { name: 'Rivian R1T/R1S', icon: '🏕️', charger: '48A Level 2', milesPerHr: '25 mi/hr', note: 'Rivian Home Charger or J1772 universal' },
  { name: 'Chevy Silverado EV', icon: '⚡', charger: '48A Level 2', milesPerHr: '22 mi/hr', note: 'Level 2 240V install required; 19.2 kW onboard' },
];

const setups = [
  { label: 'Apartment/Condo', rec: 'Level 1 (120V) or request Level 2 install', detail: 'Most DFW apartments adding Level 2 bays. File request with HOA citing property value impact.' },
  { label: 'Single-Family Home', rec: '32A Level 2 hardwired ($800-1,200 installed)', detail: 'Standard DFW home gets 25 mi/hr charge. Schedule off-peak midnight charging to save $40+/mo on Oncor TOU rates.' },
  { label: 'Two-EV Household', rec: 'Dual 40A circuits or smart load-sharing EVSE', detail: 'Emporia or Autel dual-port EVSE shares 80A service intelligently — no panel upgrade needed.' },
  { label: 'Add Solar', rec: 'Solar + smart EVSE for free daytime charging', detail: 'DFW gets 230+ sunny days. Charge your EV for free 10am-4pm with rooftop solar and Emporia or SolarEdge EVSE.' },
];

export default function DFWEVChargingFutureGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = setups.find(s => s.label === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🔌</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW EV Charging Future Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW leads Texas in EV adoption — here is how to charge smarter</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 28, borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 16 }}>⏰ ERCOT Time-of-Use Savings</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>Oncor TOU rates: charge midnight–6am at $0.06/kWh vs $0.18/kWh peak. F-150 Lightning 131 kWh battery costs $7.86 overnight vs $23.58 peak. Annual savings: $400-600 for average DFW driver. V2H/V2G bidirectional charging arriving 2026-2027 — power your home from your truck during ERCOT emergencies.</p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Top DFW EVs + Charging Specs</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {evModels.map(ev => (
            <div key={ev.name} style={{ background: '#112240', borderRadius: 10, padding: 14, display: 'flex', alignItems: 'center', gap: 14, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 30 }}>{ev.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 3 }}>{ev.name}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{ev.charger} • {ev.milesPerHr} • {ev.note}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🏠 Get Your Charging Setup</h2>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>What is your living situation?</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {setups.map(s => (
            <button key={s.label} onClick={() => setSelected(s.label)}
              style={{ background: selected === s.label ? '#F5E642′ : '#1e3a5f', color: selected === s.label ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
              {s.label}
            </button>
          ))}
        </div>
        {result && (
          <div style={{ background: '#F5E642', borderRadius: 10, padding: 20 }}>
            <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>Setup: {result.rec}</div>
            <div style={{ color: '#1a2f4a', fontSize: 14 }}>{result.detail}</div>
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk connects you with DFW licensed EV charger installers • prolnk.io
        </div>
      </div>
    </div>
  );
}
