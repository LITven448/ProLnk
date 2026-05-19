import { useState } from 'react';

export default function DFWAirSealingGuide2026B() {
  const [selected, setSelected] = useState('');
  const locations = [
    { id: 'attic', label: '🏠 Attic Penetrations', roi: 'Very High', savings: '$300-600/yr', cost: '$200-500', notes: 'Top plates, wiring holes, recessed lights — biggest DFW leakage point', priority: 1 },
    { id: 'ducts', label: '🌬️ HVAC Duct Leakage', roi: 'Very High', savings: '$400-800/yr', cost: '$300-700', notes: 'Leaky ducts in unconditioned attic dump conditioned air — huge DFW impact', priority: 2 },
    { id: 'rim', label: '🧱 Rim Joist / Foundation', roi: 'High', savings: '$150-300/yr', cost: '$150-400', notes: 'Where floor meets foundation wall — major cold/hot air intrusion point', priority: 3 },
    { id: 'windows', label: '🪟 Windows & Doors', roi: 'Medium', savings: '$100-250/yr', cost: '$50-200', notes: 'Most visible but NOT highest impact — weatherstripping and caulk', priority: 4 },
    { id: 'recessed', label: '💡 Recessed Lights', roi: 'High', savings: '$200-400/yr', cost: '$100-300', notes: 'Old recessed lights are like open holes to attic — seal or replace with IC-rated', priority: 5 },
  ];

  const selected_loc = locations.find(l => l.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔒</div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>DFW Air Sealing Deep Dive 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>Priority locations, ROI rankings, and cost vs savings for DFW homes</p>
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '12px' }}>⚡ Why Air Sealing Matters in DFW</h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6′ }}>DFW summers hit 100°F+ for weeks at a time. A leaky home forces your AC to work 30-40% harder. Air sealing is the single highest-ROI upgrade before adding insulation — DOE studies show 20-30% energy savings in DFW climate zones.</p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '20px', marginBottom: '16px' }}>🎯 Select a Location to See ROI</h2>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
          {locations.map(loc => (
            <button
              key={loc.id}
              onClick={() => setSelected(loc.id)}
              style={{ backgroundColor: selected === loc.id ? '#1e3a5f' : '#0f2540', border: selected === loc.id ? '2px solid #F5E642′ : '2px solid #1e3a5f', borderRadius: '10px', padding: '14px 18px', color: '#ffffff', cursor: ’pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}
            >
              <span style={{ fontWeight: 600, fontSize: '15px' }}>{loc.label}</span>
              <span style={{ backgroundColor: loc.priority <= 2 ? '#F5E642′ : loc.priority === 3 ? '#f97316' : '#64748b', color: loc.priority <= 2 ? '#0A1628' : '#fff', borderRadius: '6px', padding: '2px 10px', fontSize: '13px', fontWeight: 700 }}>Priority #{loc.priority}</span>
            </button>
          ))}
        </div>

        {selected_loc && (
          <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', border: '2px solid #F5E642', marginBottom: '24px' }}>
            <h3 style={{ color: '#F5E642', fontSize: '20px', marginBottom: '16px' }}>{selected_loc.label} — ROI Analysis</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>ROI Rating</div>
                <div style={{ color: '#F5E642', fontSize: '18px', fontWeight: 700 }}>{selected_loc.roi}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Annual Savings</div>
                <div style={{ color: '#22c55e', fontSize: '18px', fontWeight: 700 }}>{selected_loc.savings}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Install Cost</div>
                <div style={{ color: '#f97316', fontSize: '18px', fontWeight: 700 }}>{selected_loc.cost}</div>
              </div>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6′ }}>{selected_loc.notes}</p>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2540', borderRadius: '10px', padding: '20px', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: '16px', marginBottom: '12px' }}>📋 DFW Air Sealing Pro Tips</h3>
          <ul style={{ color: '#94a3b8', lineHeight: '1.8', paddingLeft: '20px' }}>
            <li>Always air seal BEFORE adding insulation — insulation without air sealing underperforms</li>
            <li>Blower door test confirms leakage level (target: below 3 ACH50 for DFW)</li>
            <li>Attic sealing done in fall/spring — not summer (140°F attic temps dangerous)</li>
            <li>Oncor and CoServ offer rebates up to $400 for air sealing + insulation combo</li>
          </ul>
        </div>
      </div>
    </div>
  );
}