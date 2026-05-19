import { useState } from 'react';

const riskData: Record<string, { risk: string; checklist: string[] }> = {
  gas: {
    risk: 'HIGH — Gas appliances produce CO. Detectors required by TX law (2022).',
    checklist: [
      '✅ Install CO detector within 10 ft of every sleeping area',
      '✅ Install near furnace/water heater if in living space',
      '✅ Replace detectors every 5–7 years',
      '✅ Schedule annual furnace inspection',
      '✅ Check battery or hardwire monthly',
    ],
  },
  electric: {
    risk: 'LOW — All-electric homes have minimal CO risk. Detector still recommended.',
    checklist: [
      '✅ Install one CO detector per floor as precaution',
      '✅ Check attached garage for running vehicles',
      '✅ Inspect fireplace/wood stove if applicable',
    ],
  },
  mixed: {
    risk: 'MODERATE — Partial gas use. Follow gas home protocol for affected areas.',
    checklist: [
      '✅ Detector within 10 ft of all sleeping areas',
      '✅ Detector near any gas appliance',
      '✅ Annual inspection of all combustion appliances',
      '✅ Test detectors monthly',
    ],
  },
};

export default function DFWCarbonMonoxideGuide2026() {
  const [homeType, setHomeType] = useState('');
  const result = homeType ? riskData[homeType] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME HEALTH VAULT · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>💨 DFW Carbon Monoxide Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Texas law (2022) requires CO detectors in all homes with gas appliances. 85% of DFW homes use natural gas — know your risk.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 32 }}>
          {[['🔥', 'TX CO Law', '2022 mandate for gas homes'],['🏘️', 'DFW Gas Homes', '85% use natural gas'],['⏱️', 'Detector Life', '5–7 years typical']].map(([icon, title, sub]) => (
            <div key={title} style={{ background: '#1a2744', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#F5E642' }}>{title}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🧮 CO Risk Assessment</h2>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>Select your home type:</label>
          <select value={homeType} onChange={e => setHomeType(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155', fontSize: 15, marginBottom: 16 }}>
            <option value=''>-- Choose home type --</option>
            <option value='gas'>Gas appliances (furnace, water heater, range)</option>
            <option value='electric'>All-electric home</option>
            <option value='mixed'>Mixed (some gas, some electric)</option>
          </select>
          {result && (
            <div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12, borderLeft: '4px solid #F5E642' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>Risk Level</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{result.risk}</div>
              </div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Your Detector Checklist:</div>
              {result.checklist.map(item => <div key={item} style={{ fontSize: 14, color: '#cbd5e1', marginBottom: 6 }}>{item}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📍 Detector Placement Rules</h2>
          {[['🛏️','Sleeping Areas','Within 10 ft of every bedroom door'],['🔧','Mechanical Rooms','Near furnace, water heater, boiler'],['🚗','Attached Garages','CO from vehicles enters living space'],['🏠','Multi-Story','One detector per floor minimum']].map(([icon, title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 22 }}>{icon}</div>
              <div><div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div><div style={{ fontSize: 13, color: '#94a3b8' }}>{desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#F5E642', borderRadius: 10, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 15 }}>⚠️ CO Emergency: Leave immediately & call 911</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Do not re-enter until cleared by fire department</div>
        </div>
      </div>
    </div>
  );
}
