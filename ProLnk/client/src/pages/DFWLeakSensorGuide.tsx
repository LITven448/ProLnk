import { useState } from 'react';

const riskAreas = [
  { area: 'Water Heater', risk: 'Critical', reason: 'DFW hard water causes sediment buildup and tank failures; 8–12 yr lifespan', sensor: 'Smart leak + auto-shutoff', insurance: 'Yes — most DFW carriers discount', emoji: '🔥' },
  { area: 'AC Drain Pan', risk: 'High', reason: 'DFW AC runs 7+ months/year; clogged drain pans overflow into ceilings', sensor: 'Smart leak sensor', insurance: 'Yes', emoji: '❄️' },
  { area: 'Under Kitchen Sink', risk: 'High', reason: 'Garbage disposal connections and supply lines fail; slow leaks create mold', sensor: 'Smart or audible', insurance: 'Sometimes', emoji: '🚿' },
  { area: 'Washing Machine', risk: 'High', reason: 'Supply hose bursts are one of the top DFW homeowner claims', sensor: 'Smart + steel-braided hoses', insurance: 'Yes', emoji: '🫧' },
  { area: 'Dishwasher', risk: 'Medium', reason: 'Door seal failures; DFW hard water accelerates seal wear', sensor: 'Smart or audible', insurance: 'Sometimes', emoji: '🍽️' },
  { area: 'Refrigerator Ice Maker', risk: 'Medium', reason: 'Supply line connection is top hidden leak source in DFW kitchens', sensor: 'Smart mini sensor', insurance: 'Rarely', emoji: '🧊' },
  { area: 'Master Bath / Toilets', risk: 'Medium', reason: 'Wax ring failures and supply lines; hard water deposits crack valves', sensor: 'Audible or smart', insurance: 'Sometimes', emoji: '🚽' },
  { area: 'Slab Penetrations / Foundation', risk: 'Low-Medium', reason: 'DFW clay soil movement cracks slab pipes over time', sensor: 'Whole-home flow meter', insurance: 'Depends on policy', emoji: '🏗️' },
];

export default function DFWLeakSensorGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  function toggleArea(area: string) {
    setSelected(prev => prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]);
  }

  function getPlan() {
    const count = selected.length;
    const baseCost = count * 35;
    const shutoffCost = selected.includes('Water Heater') || selected.includes('Washing Machine') ? 200 : 0;
    const total = baseCost + shutoffCost;
    const age = parseInt(homeAge) || 0;
    const ageNote = age > 20 ? ' Your home is 20+ years old — prioritize water heater and washing machine first.' : age > 10 ? ' 10–20 yr old homes often have original supply hoses — replace with steel-braided.' : ' Newer homes still need AC drain pan and water heater sensors.';
    const insuranceNote = (selected.includes('Water Heater') || selected.includes('AC Drain Pan')) ? ' Installing smart leak sensors on water heater and AC drain pan qualifies for 5–15% premium discount with most DFW carriers (State Farm, Allstate, USAA).' : '';
    setResult(`Plan for ${count} location${count !== 1 ? 's' : ''}: ~$${total}–$${total + 80} installed.${ageNote}${insuranceNote} Recommended: Moen Flo whole-home monitor ($500) if budget allows — detects micro-leaks before visible damage.`);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13 }}>🏠 DFW Smart Home Guide</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Water Leak Sensor Guide for DFW Homes</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          DFW's hard water (300–500 ppm) accelerates pipe and appliance failures. Water damage is the #1 homeowner insurance claim in North Texas. Smart sensors catch leaks before they become $30,000 disasters.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 10, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#F5E642', marginBottom: 4 }}>💧 DFW Hard Water Impact</div>
            <p style={{ color: '#CBD5E1', fontSize: 13, margin: 0 }}>300–500 ppm calcium deposits clog water heater drain valves, crack supply lines, and reduce appliance lifespan by 30–40% vs. national average.</p>
          </div>
          <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 10, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#F5E642', marginBottom: 4 }}>🏦 Insurance Savings</div>
            <p style={{ color: '#CBD5E1', fontSize: 13, margin: 0 }}>Smart leak sensors on water heater + AC drain pan qualify for 5–15% premium discounts with most major DFW carriers. Average savings: $120–$400/year.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10, marginBottom: 40 }}>
          {riskAreas.map(r => (
            <div key={r.area} style={{ background: '#0D1F35', borderRadius: 8, padding: '14px 18px', border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{r.emoji} {r.area}</div>
                  <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{r.reason}</div>
                  <div style={{ color: '#64748B', fontSize: 12 }}>Sensor: {r.sensor} · Insurance credit: {r.insurance}</div>
                </div>
                <div style={{ background: r.risk === 'Critical' ? '#DC262625' : r.risk === 'High' ? '#F5E64215' : '#1E3A5F', color: r.risk === 'Critical' ? '#F87171' : r.risk === 'High' ? '#F5E642' : '#94A3B8', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>
                  {r.risk}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F35', borderRadius: 12, padding: '28px', border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🔧 Build Your Leak Sensor Plan</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#CBD5E1', fontSize: 13, marginBottom: 6 }}>Home Age (years)</label>
            <input value={homeAge} onChange={e => setHomeAge(e.target.value)} placeholder="e.g. 15" type="number" style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 14, boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#CBD5E1', fontSize: 13, marginBottom: 10 }}>Select High-Risk Areas in Your Home</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {riskAreas.map(r => (
                <button key={r.area} onClick={() => toggleArea(r.area)} style={{ padding: '10px 14px', borderRadius: 8, border: `2px solid ${selected.includes(r.area) ? '#F5E642' : '#1E3A5F'}`, background: selected.includes(r.area) ? '#F5E64220' : 'transparent', color: selected.includes(r.area) ? '#F5E642' : '#94A3B8', cursor: 'pointer', fontWeight: 600, fontSize: 12, textAlign: 'left' }}>
                  {r.emoji} {r.area}
                </button>
              ))}
            </div>
          </div>
          <button onClick={getPlan} style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get My Leak Sensor Plan →
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 8, padding: '16px 20px', color: '#E8EDF5', fontSize: 14, lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ color: '#475569', fontSize: 12, textAlign: 'center' }}>ProLnk · DFW Smart Home Guides · Water damage prevention for North Texas homeowners</div>
      </div>
    </div>
  );
}
