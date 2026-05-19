import { useState } from 'react';

const needs = [
  { id: 'smell', label: '🚨 Smell Gas', contact: '888-286-6700', process: 'LEAVE IMMEDIATELY. Do not turn lights on/off. Call 888-286-6700 from outside or neighbor’s phone. Atmos responds 24/7 within 60 minutes. Do not re-enter until cleared by Atmos technician.' },
  { id: 'newservice', label: '🏗️ New Gas Service', contact: '888-286-6700', process: 'Call Atmos to install new gas service for additions, new appliances, or new construction. Requires licensed plumber to install interior gas line. Atmos installs meter and street connection. Lead time: 10-20 business days.' },
  { id: 'locate', label: '📍 Gas Line Locate', contact: '811 (Call Before You Dig)', process: 'Always call 811 before any digging — it’s free and required by law. Atmos marks gas lines within 2 business days. Covers up to 18 inches from marked line.' },
  { id: 'meter', label: '📊 Meter Reading', contact: '888-286-6700', process: 'Atmos reads meters monthly. Access your usage history at atmosenergy.com. Report a suspected meter problem by calling or submitting online. Estimated bills occur if meter is inaccessible.' },
  { id: 'assistance', label: '💰 Energy Assistance', contact: 'atmossavings.com', process: 'Atmos offers LIHEAP enrollment, budget billing to level monthly payments, and weatherization assistance for income-qualified customers. Apply at atmossavings.com or call 888-286-6700.' },
];

export default function DFWAtmosGasGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = needs.find(n => n.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', padding: '32px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔥</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>Atmos Energy — DFW Natural Gas 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Atmos Energy serves most of DFW for natural gas delivery. They own the pipelines — separate from your billing if you've chosen a gas marketer.</p>
        </div>

        <div style={{ backgroundColor: '#7f1d1d', borderRadius: 12, padding: 20, marginBottom: 24, border: '2px solid #ef4444' }}>
          <h2 style={{ color: '#fca5a5', fontSize: 16, marginBottom: 8 }}>🚨 GAS EMERGENCY — Smell Gas?</h2>
          <p style={{ color: '#fecaca', fontSize: 14, lineHeight: 1.6, margin: 0 }}>Leave immediately. Don't use phones, switches, or lighters inside. Call <strong>888-286-6700</strong> from outside. Atmos responds 24/7.</p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏠 Atmos DFW Coverage</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🗺️ Serves Dallas, Fort Worth, Denton, Collin counties','🏭 1.7M+ customers in North Texas','🔧 Maintains 76,000+ miles of pipeline in TX','📱 Online account management at atmosenergy.com'].map((f,i) => (
              <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12, color: '#cbd5e1', fontSize: 13 }}>{f}</div>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🛠️ What Do You Need?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {needs.map(n => (
            <button key={n.id} onClick={() => setSelected(selected === n.id ? null : n.id)}
              style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${selected === n.id ? '#F5E642' : '#1e3a5f'}`, backgroundColor: selected === n.id ? '#F5E64220' : '#0f2040', color: selected === n.id ? '#F5E642' : '#cbd5e1', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
              {n.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, border: '2px solid #F5E642', marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 16 }}>{active.label}</h3>
            <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>{active.process}</p>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12 }}>
              <span style={{ color: '#94a3b8', fontSize: 12 }}>Contact: </span>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{active.contact}</span>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔧 Gas Appliance Safety Tips</h2>
          {['Annual furnace inspection by licensed HVAC tech','Water heater anode rod check every 3-5 years','CO detector required within 15 ft of sleeping areas in TX','Never store flammables near gas appliances','Gas dryer vent cleaned annually to prevent fires'].map((s,i) => (
            <div key={i} style={{ color: '#cbd5e1', fontSize: 13, padding: '6px 0', borderBottom: i < 4 ? '1px solid #1e3a5f' : 'none' }}>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
