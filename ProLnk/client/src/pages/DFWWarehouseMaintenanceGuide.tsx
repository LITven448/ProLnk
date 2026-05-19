import { useState } from 'react';

function getBudgetAndPriorities(sqft: number, age: number): { budget: string; priorities: string[] } {
  const large = sqft > 50000;
  const medium = sqft > 15000;
  const old = age > 20;
  const mid = age > 10;

  let budget: string;
  if (large) budget = old ? '$85,000–$160,000/yr' : mid ? '$55,000–$95,000/yr' : '$30,000–$60,000/yr';
  else if (medium) budget = old ? '$35,000–$65,000/yr' : mid ? '$18,000–$38,000/yr' : '$10,000–$22,000/yr';
  else budget = old ? '$12,000–$28,000/yr' : mid ? '$6,000–$14,000/yr' : '$3,000–$8,000/yr';

  const priorities: string[] = [];
  if (old) priorities.push('Roof inspection and reseal — DFW flat roofs degrade every 10–15 years');
  else priorities.push('Roof drainage check — DFW summer storms cause pooling on flat roofs');
  if (large) priorities.push('LED lighting retrofit — reduce electricity costs 40–60% with rebates');
  else priorities.push('LED lighting audit — identify inefficient fixtures for phased replacement');
  if (old) priorities.push('Dock door and leveler overhaul — aging seals and hydraulics increase energy loss');
  else priorities.push('Dock seal inspection — worn seals add to HVAC load year-round');
  if (sqft > 30000) priorities.push('Fire suppression system annual inspection and sprinkler head replacement');
  else priorities.push('Fire extinguisher certification and exit signage inspection');
  if (old) priorities.push('Epoxy floor coating reapplication — forklifts wear surfaces within 8–12 years');
  else if (mid) priorities.push('Floor crack sealing — prevent moisture intrusion in DFW clay soil areas');
  else priorities.push('Preventive floor marking refresh for OSHA aisle compliance');

  return { budget, priorities };
}

export default function DFWWarehouseMaintenanceGuide() {
  const [sqft, setSqft] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState<{ budget: string; priorities: string[] } | null>(null);

  function calculate() {
    const s = parseInt(sqft, 10);
    const a = parseInt(age, 10);
    if (isNaN(s) || isNaN(a)) return;
    setResult(getBudgetAndPriorities(s, a));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>🏭 DFW Warehouse Maintenance Guide</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, marginBottom: 12 }}>Warehouse Maintenance for <span style={{ color: '#F5E642' }}>DFW Industrial Properties</span></h1>
        <p style={{ color: '#94A3B8', fontSize: 17, marginBottom: 36 }}>DFW is the #2 industrial market in the US. Whether you own or lease, deferred maintenance on warehouse facilities compounds fast — especially with Dallas-area clay soil and extreme summer heat.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '🚪', title: 'Dock Doors & Loading Bays', body: 'DFW distribution centers average 1 dock door per 5,000 sq ft. Levelers, seals, and bumpers need annual service. Failed levelers stop operations — $800–$2,500 to repair, $200/yr to maintain.' },
            { icon: '🏗️', title: 'Flat Roof Maintenance', body: 'Nearly all DFW warehouses have TPO or modified bitumen flat roofs. DFW hail and UV degradation require inspection every 2 years. Recoating every 5–7 years extends life 15+ years.' },
            { icon: '💡', title: 'LED Lighting ROI', body: 'Switching 400W metal halide to LED: 60% energy reduction. DFW facilities averaging $80,000/yr in lighting costs see $48,000/yr savings. Oncor rebates cover 20–35% of installation.' },
            { icon: '🏋️', title: 'Epoxy Flooring', body: 'Forklift traffic wears industrial floors within 8–12 years. Epoxy recoating: $2–$5/sq ft. Uncured concrete surface causes dust contamination and product damage in warehouses.' },
            { icon: '🔥', title: 'Fire Suppression', body: 'ESFR (Early Suppression Fast Response) sprinklers required for high-piled storage. Annual inspection required by DFW fire code. Racking changes often require sprinkler redesign.' },
            { icon: '🌡️', title: 'Climate in DFW Warehouses', body: 'Most DFW warehouses use evaporative coolers + exhaust fans, not full HVAC. For climate-controlled space: $3–$6/sq ft additional build-out. Affects product specs and employee comfort.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#F5E642' }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, border: '1px solid #F5E642', marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#F5E642' }}>🔧 Maintenance Budget Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Warehouse Square Footage</label>
              <input type="number" placeholder="e.g. 25000" value={sqft} onChange={e => setSqft(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Building Age (years)</label>
              <input type="number" placeholder="e.g. 15" value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get Maintenance Plan →</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #2A4A7F' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 17, marginBottom: 16 }}>Annual Maintenance Budget</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 26, marginBottom: 20 }}>{result.budget}</div>
              <div><span style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 10 }}>TOP 5 PRIORITY MAINTENANCE ITEMS</span>
                {result.priorities.map((p, i) => <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700, minWidth: 24 }}>{i + 1}.</span><span style={{ color: '#E8EDF5', fontSize: 14 }}>{p}</span></div>)}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <div style={{ fontSize: 26, marginBottom: 12 }}>🏭</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Find DFW Industrial Contractors</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>ProLnk connects warehouse owners and facility managers with licensed contractors for dock maintenance, roofing, flooring, and electrical across DFW.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get Warehouse Service Quotes →</button>
        </div>
      </div>
    </div>
  );
}
