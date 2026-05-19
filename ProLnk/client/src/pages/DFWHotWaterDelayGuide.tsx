import { useState } from 'react';

const recommendations: Record<string, Record<string, { solution: string; cost: string; savings: string; notes: string }>> = {
  small: {
    '0-30': { solution: '✅ No action needed', cost: '$0', savings: 'N/A', notes: 'Under 30 seconds is normal for small DFW homes. Ensure water heater is set to 120°F.' },
    '30-90': { solution: '🔧 Pipe insulation', cost: '$20-60 DIY', savings: '$15-25/yr energy', notes: 'Insulate hot water pipes in attic/crawl space. DFW summer attic temps hit 140°F, cooling water rapidly.' },
    '90+': { solution: '⚡ Point-of-use tankless heater', cost: '$150-400 installed', savings: '$30-50/yr', notes: 'Install under-sink tankless unit in the distant bathroom. Eliminates wait time entirely.' },
  },
  large: {
    '0-30': { solution: '✅ Acceptable — consider recirculation', cost: '$300-600 installed', savings: '$20-40/yr', notes: 'Hot water recirculation pump adds comfort. Timer-controlled to run mornings only.' },
    '30-90': { solution: '🔄 Hot water recirculation pump', cost: '$300-700 installed', savings: '$25-45/yr', notes: 'Grundfos or Watts recirculation pump installs at water heater. Long pipe runs in large DFW homes make this the best solution.' },
    '90+': { solution: '🚨 Recirculation pump + pipe check', cost: '$400-900', savings: '$40-60/yr', notes: 'Over 90 seconds in a large home may indicate water heater is undersized or losing efficiency. DFW hard water sediment reduces heater capacity by 20-30%.' },
  },
};

export default function DFWHotWaterDelayGuide() {
  const [size, setSize] = useState('');
  const [wait, setWait] = useState('');
  const result = size && wait ? recommendations[size]?.[wait] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW PLUMBING GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🔥 Hot Water Delay<br /><span style={{ color: '#F5E642′ }}>Dallas-Fort Worth Guide</span></h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, fontSize: 15 }}>DFW homes average 2,500-4,500 sq ft — larger than the national average. Long pipe runs from water heater to master bath can mean <strong style={{ color: '#F5E642′ }}>2-5 minute waits</strong> for hot water. DFW hard water sediment reduces water heater efficiency by 20-30%, making the problem worse over time.</p>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 12 }}>🏠 WHY DFW HOMES WAIT LONGER</div>
          {[['📏 Large Homes', 'DFW avg home 2,800 sq ft — long pipe runs from water heater'],['🧂 Hard Water', 'Sediment builds up in heater tank, reducing output temp by 10-15°F'],['☀️ Attic Pipes', 'Uninsulated pipes in 140°F DFW attics cool between uses']].map(([icon, desc]) => (
            <div key={icon} style={{ display: 'flex', gap: 12, marginBottom: 8, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 18 }}>{icon.split(' ')[0]}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}><strong style={{ color: '#e2e8f0′ }}>{icon.split(' ').slice(1).join(' ')}</strong> — {desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>STEP 1: Home Size</div>
          {[{ id: 'small', label: '🏡 Under 2,500 sq ft' }, { id: 'large', label: '🏰 2,500+ sq ft (typical DFW)' }].map(o => (
            <button key={o.id} onClick={() => setSize(o.id)}
              style={{ display: 'block', width: '100%', marginBottom: 8, background: size === o.id ? '#1a3a5c' : '#0A1628', border: `2px solid ${size === o.id ? '#F5E642' : '#2d3f5a'}`, borderRadius: 8, padding: '12px 16px', color: '#e2e8f0', textAlign: 'left', cursor: 'pointer', fontSize: 14 }}>
              {o.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>STEP 2: Current Wait Time</div>
          {[{ id: '0-30', label: '⚡ Under 30 seconds' }, { id: '30-90', label: '⏱️ 30-90 seconds' }, { id: '90+', label: '😤 Over 90 seconds (or more)' }].map(o => (
            <button key={o.id} onClick={() => setWait(o.id)}
              style={{ display: 'block', width: '100%', marginBottom: 8, background: wait === o.id ? '#1a3a5c' : '#0A1628', border: `2px solid ${wait === o.id ? '#F5E642' : '#2d3f5a'}`, borderRadius: 8, padding: '12px 16px', color: '#e2e8f0', textAlign: 'left', cursor: 'pointer', fontSize: 14 }}>
              {o.label}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ background: '#1e2d47', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{result.solution}</div>
            <p style={{ color: '#cbd5e1', marginBottom: 16 }}>{result.notes}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><div style={{ color: '#64748b', fontSize: 11 }}>ESTIMATED COST</div><div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4 }}>{result.cost}</div></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><div style={{ color: '#64748b', fontSize: 11 }}>ANNUAL SAVINGS</div><div style={{ color: '#22c55e', fontWeight: 700, marginTop: 4 }}>{result.savings}</div></div>
            </div>
          </div>
        )}

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginTop: 24 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>💡 DFW Hard Water Tip</div>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>Flush your water heater annually to remove sediment. For a 50-gallon tank, connect a garden hose to the drain valve and let it run until clear. DFW homeowners who skip this lose 25-30% efficiency within 5 years.</p>
        </div>
      </div>
    </div>
  );
}
