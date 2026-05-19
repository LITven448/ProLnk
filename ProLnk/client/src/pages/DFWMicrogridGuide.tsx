import { useState } from 'react';

const homeSizes = ['Under 1,500 sqft', '1,500–2,500 sqft', '2,500–3,500 sqft', '3,500+ sqft'];
const independenceGoals = ['Outage protection (3–5 days)', 'Partial independence (50% self-sufficient)', 'High independence (80% self-sufficient)', 'True off-grid capability'];

type MicrogridConfig = { solar: string; battery: string; generator: string; totalCost: string; payback: string; notes: string };

const microgridMap: Record<string, MicrogridConfig> = {
  'Under 1,500 sqft|Outage protection (3–5 days)':           { solar: '5 kW', battery: '20 kWh (2× Powerwall)', generator: 'Propane 8 kW standby', totalCost: '$42,000–$55,000', payback: '8–11 years', notes: 'Handles DFW winter events. Generator bridges cloudy periods.' },
  'Under 1,500 sqft|Partial independence (50% self-sufficient)': { solar: '7 kW', battery: '27 kWh',           generator: 'Optional 7 kW',          totalCost: '$50,000–$65,000', payback: '7–9 years',  notes: '50% offset on typical DFW bill. Qualifies for ERCOT VPP.' },
  'Under 1,500 sqft|High independence (80% self-sufficient)': { solar: '10 kW', battery: '40 kWh',            generator: '10 kW natural gas',      totalCost: '$70,000–$90,000', payback: '9–12 years', notes: 'Near net-zero. Smart EV charging included.' },
  'Under 1,500 sqft|True off-grid capability':                { solar: '12 kW', battery: '54 kWh',            generator: '12 kW nat gas + propane', totalCost: '$95,000+',        payback: '12–15 years', notes: 'Full independence. Rare for DFW suburban. Requires utility disconnect.' },

  '1,500–2,500 sqft|Outage protection (3–5 days)':           { solar: '8 kW',  battery: '27 kWh',            generator: 'Propane 10 kW standby',  totalCost: '$55,000–$72,000', payback: '8–10 years', notes: 'Best ROI config for mid-size DFW homes.' },
  '1,500–2,500 sqft|Partial independence (50% self-sufficient)': { solar: '10 kW', battery: '40 kWh',        generator: 'Optional 10 kW',         totalCost: '$68,000–$85,000', payback: '7–9 years',  notes: 'Pairs well with ERCOT variable-rate plan.' },
  '1,500–2,500 sqft|High independence (80% self-sufficient)': { solar: '14 kW', battery: '54 kWh',           generator: '12 kW natural gas',      totalCost: '$90,000–$115,000', payback: '9–12 years', notes: 'Full home comfort through DFW winter events.' },
  '1,500–2,500 sqft|True off-grid capability':                { solar: '18 kW', battery: '80 kWh',           generator: '15 kW dual-fuel',        totalCost: '$135,000+',       payback: '14–18 years', notes: 'Premium build. Often paired with EV + heat pump.' },

  '2,500–3,500 sqft|Outage protection (3–5 days)':           { solar: '12 kW', battery: '40 kWh',            generator: '12 kW standby',          totalCost: '$72,000–$95,000', payback: '8–11 years', notes: 'Handles pool pump, HVAC, fridge, and EV charging.' },
  '2,500–3,500 sqft|Partial independence (50% self-sufficient)': { solar: '15 kW', battery: '54 kWh',        generator: 'Optional 12 kW',         totalCost: '$90,000–$115,000', payback: '7–10 years', notes: 'Common upgrade path after initial solar install.' },
  '2,500–3,500 sqft|High independence (80% self-sufficient)': { solar: '20 kW', battery: '80 kWh',           generator: '15 kW natural gas',      totalCost: '$125,000–$155,000', payback: '10–13 years', notes: 'Near-zero bill. Works for most DFW climate zones.' },
  '2,500–3,500 sqft|True off-grid capability':                { solar: '25 kW', battery: '120 kWh',          generator: '20 kW dual-fuel',        totalCost: '$185,000+',       payback: '15–20 years', notes: 'Commercial-grade residential. Rare but achievable in DFW.' },

  '3,500+ sqft|Outage protection (3–5 days)':                { solar: '15 kW', battery: '54 kWh',            generator: '15 kW standby',          totalCost: '$95,000–$125,000', payback: '9–12 years', notes: 'Designed for DFW luxury homes with pool + EV.' },
  '3,500+ sqft|Partial independence (50% self-sufficient)':  { solar: '20 kW', battery: '80 kWh',            generator: '15 kW',                  totalCost: '$125,000–$155,000', payback: '8–11 years', notes: 'Pairs with smart home automation for peak shaving.' },
  '3,500+ sqft|High independence (80% self-sufficient)':     { solar: '28 kW', battery: '120 kWh',           generator: '20 kW nat gas',          totalCost: '$175,000–$220,000', payback: '11–14 years', notes: 'Full comfort, full redundancy. DFW executive home tier.' },
  '3,500+ sqft|True off-grid capability':                    { solar: '35 kW', battery: '160 kWh',           generator: '25 kW dual-fuel',        totalCost: '$260,000+',       payback: '15–22 years', notes: 'Estate-level microgrid. Requires dedicated electrical design.' },
};

export default function DFWMicrogridGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [goal, setGoal] = useState('');
  const [showResult, setShowResult] = useState(false);

  const key = `${homeSize}|${goal}`;
  const config = microgridMap[key];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏘️⚡🔋</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Home Microgrid Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>True Energy Independence: Solar + Battery + Generator — Built for DFW's ERCOT Reality</p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>❄️ Why DFW Homeowners Want Microgrids</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: 12 }}>February 2021 changed everything. 4.5 million Texas homes lost power — some for 10+ days at temperatures near 0°F. A true microgrid combines <strong style={{ color: '#F5E642' }}>solar generation</strong>, <strong style={{ color: '#F5E642' }}>battery storage</strong>, and <strong style={{ color: '#F5E642' }}>backup generation</strong> into an islanded power system that disconnects from the grid and runs independently.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[['☀️', 'Solar', 'Generates daytime power, charges batteries'], ['🔋', 'Battery', 'Stores solar, bridges nights + cloudy days'], ['⛽', 'Generator', 'Backs up extended outages, fuel-independent']].map(([icon, label, desc]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{label}</div>
                <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 DFW Microgrid Configurator</h2>
          {[{ label: 'Home Size', val: homeSize, opts: homeSizes, setter: setHomeSize },
            { label: 'Energy Independence Goal', val: goal, opts: independenceGoals, setter: setGoal }].map(({ label, val, opts, setter }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 8 }}>{label}</label>
              <select value={val} onChange={e => { setter(e.target.value); setShowResult(false); }}
                style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
                <option value="">Select...</option>
                {opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <button onClick={() => setShowResult(true)} disabled={!homeSize || !goal}
            style={{ width: '100%', background: homeSize && goal ? '#F5E642' : '#1E3A5F', color: homeSize && goal ? '#0A1628' : '#4A6FA5', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 16, fontWeight: 700, cursor: homeSize && goal ? 'pointer' : 'default' }}>
            Design My DFW Microgrid →
          </button>
        </div>

        {showResult && config && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>⚡ Your DFW Microgrid Configuration</h3>
            {[
              ['☀️', 'Solar Array', config.solar],
              ['🔋', 'Battery Storage', config.battery],
              ['⛽', 'Backup Generator', config.generator],
              ['💰', 'Total System Cost', config.totalCost],
              ['📅', 'Estimated Payback', config.payback],
              ['💡', 'DFW Notes', config.notes],
            ].map(([icon, label, val]) => (
              <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 14, padding: 14, background: '#0A1628', borderRadius: 8 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div><div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{label}</div><div style={{ fontWeight: 600 }}>{val}</div></div>
              </div>
            ))}
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, borderLeft: '3px solid #F5E642', marginTop: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>💰 Federal Incentive Stack</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>30% ITC on solar + battery + interconnection equipment. TX property tax exemption on appraised value increase. Total incentives can reduce cost by 30–40%.</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
