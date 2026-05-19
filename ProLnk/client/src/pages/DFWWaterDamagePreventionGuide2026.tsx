import { useState } from 'react';

export default function DFWWaterDamagePreventionGuide2026() {
  const [selected, setSelected] = useState('');
  const [tip, setTip] = useState('');

  const items = [
    { label: 'Washing machine supply lines', tip: 'Replace braided stainless lines every 5 years. Burst supply lines are #1 cause of major home water damage. Cost: $20-40 DIY. Install single-lever shutoff valve within reach.' },
    { label: 'Whole-home water shutoff sensor', tip: 'Smart shutoff valve ($200-400 + install) auto-shuts water when sensor detects leak. Best brands: Flo by Moen, Phyn Plus. Pays for itself with first prevented claim (avg DFW water damage: $11,000).' },
    { label: 'Refrigerator ice maker line', tip: 'Replace plastic/copper tubing with braided stainless. Common failure point behind refrigerator where line kinks. Check annually. Slow leaks under flooring cause major subfloor damage.' },
    { label: 'Dishwasher supply + drain', tip: 'Inspect supply line under sink annually. Drain hose must have high loop or air gap to prevent backflow. Replace supply line at 7-10 years. DFW water hardness accelerates line degradation.' },
    { label: 'Water heater pan + drain', tip: 'Install drain pan with line to exterior if not present ($150-300). Tank water heaters: replace at 10-12 years. Tankless: inspect annually. Corrosion at fittings = imminent failure.' },
    { label: 'Bathtub overflow protection', tip: 'Overflow plate overflow is a leading cause of multi-floor water damage. Test annually: fill tub to overflow, verify drain works. Replace worn gasket ($10 DIY). Consider overflow sensor alarm ($25).' },
    { label: 'HVAC condensate drain line', tip: 'DFW ACs produce 5-20 gallons of condensate daily in summer. Clean drain line with vinegar quarterly. Install float switch shutoff ($15-30) — cuts AC power when drain backs up. Prevents ceiling damage.' },
  ];

  const handleSelect = (i: { label: string; tip: string }) => {
    setSelected(i.label);
    setTip(i.tip);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>DFW 2026 GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>💧 DFW Water Damage Prevention Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 15 }}>Proactive water damage prevention for DFW homes — average claim is $11,000, prevention costs under $500.</p>

        <div style={{ background: '#1e2d4a', borderRadius: 8, padding: 16, marginBottom: 24, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>⚡ Highest ROI Single Action</div>
          <div style={{ color: '#e2e8f0', fontSize: 14 }}>Install a smart whole-home water shutoff sensor ($200-400). Automatically cuts water supply on leak detection. One prevention = one avoided $11,000 average claim.</div>
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14, color: '#F5E642′ }}>🔍 Select Home Feature for Prevention Tips</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {items.map(i => (
            <button key={i.label} onClick={() => handleSelect(i)} style={{ background: selected === i.label ? '#F5E642′ : '#1e2d4a', color: selected === i.label ? '#0A1628' : '#fff', border: ’none', borderRadius: 6, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>{i.label}</button>
          ))}
        </div>
        {tip && (
          <div style={{ background: '#1e2d4a', border: '1px solid #F5E642', borderRadius: 8, padding: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Prevention Protocol</div>
            <p style={{ color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>{tip}</p>
          </div>
        )}
        <div style={{ marginTop: 32, color: '#64748b', fontSize: 12, textAlign: 'center' }}>ProLnk · DFW Water Damage Prevention · 2026 Edition</div>
      </div>
    </div>
  );
}