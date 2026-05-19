import { useState } from 'react';

type Appliance = { name: string; btu: number; included: boolean };

const defaultAppliances: Appliance[] = [
  { name: '🔥 4-Burner Grill', btu: 48000, included: true },
  { name: '🍕 Pizza Oven', btu: 60000, included: false },
  { name: '🔥 Side Burner', btu: 15000, included: false },
  { name: '🫕 Wok Burner', btu: 65000, included: false },
  { name: '☕ Outdoor Heater', btu: 40000, included: false },
  { name: '🔥 Fire Pit / Fire Table', btu: 50000, included: false },
];

export default function DFWOutdoorKitchenGasGuide() {
  const [appliances, setAppliances] = useState<Appliance[]>(defaultAppliances);
  const [fuelType, setFuelType] = useState<'natural' | 'propane'>('natural');
  const [result, setResult] = useState<null | { totalBtu: number; lineSize: string; permit: boolean; installCost: string; note: string }>(null);

  const s = { background: '#0F1E35', borderRadius: '12px', padding: '20px', marginBottom: '16px' };
  const tg = { display: 'inline-block', background: '#1A2F50', color: '#F5E642', borderRadius: '6px', padding: '3px 10px', fontSize: '12px', marginRight: '6px', marginBottom: '6px' };

  function toggle(i: number) {
    setAppliances(prev => prev.map((a, idx) => idx === i ? { ...a, included: !a.included } : a));
  }

  function calculate() {
    const totalBtu = appliances.filter(a => a.included).reduce((sum, a) => sum + a.btu, 0);
    let lineSize = '1/2″ CSST';
    if (totalBtu > 100000) lineSize = '3/4″ Black Iron Pipe';
    if (totalBtu > 200000) lineSize = '1″ Black Iron Pipe';
    const permit = totalBtu > 50000 || fuelType === 'natural';
    const base = fuelType === 'natural' ? 800 : 600;
    const perAppOn = appliances.filter(a => a.included).length;
    const installCost = `$${(base + perAppOn * 200).toLocaleString()}–$${(base + perAppOn * 350).toLocaleString()}`;
    const note = lineSize.includes('CSST') ? '⚠️ CSST must be bonded per DFW code. Some cities (Plano, Frisco) require black iron instead.' : '✅ Black iron pipe preferred in high-BTU installations and required by some DFW municipalities.';
    setResult({ totalBtu, lineSize, permit, installCost, note });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '13px', marginBottom: '8px' }}>🔥 DFW ENERGY GUIDES</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>Outdoor Kitchen Gas Line Guide for DFW</h1>
        <p style={{ color: '#A0AEC0', fontSize: '15px', marginBottom: '28px' }}>Outdoor kitchens are booming in DFW. Gas line installation is regulated, permit-required, and more complex than most homeowners expect.</p>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>⛽ Natural Gas vs Propane for DFW Outdoor Kitchens</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { type: 'Natural Gas', pros: ['Lower ongoing cost (~40% cheaper)', 'No tank to refill', 'Atmos Delivery — reliable'], cons: ['Requires permit + city inspection', 'Licensed plumber required', 'Line must reach outdoor kitchen'] },
              { type: 'Propane', pros: ['No permit for tank placement', 'Works anywhere on lot', 'Easy to install BBQ lines'], cons: ['Refill logistics ($80–120/tank)', 'Outdoor tank aesthetics', 'Higher BTU cost long-term'] },
            ].map(opt => (
              <div key={opt.type} style={{ background: '#1A2F50', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontWeight: 700, marginBottom: '10px', fontSize: '15px' }}>{opt.type}</div>
                {opt.pros.map(p => <div key={p} style={{ color: '#68D391', fontSize: '12px', marginBottom: '4px' }}>+ {p}</div>)}
                {opt.cons.map(c => <div key={c} style={{ color: '#FC8181', fontSize: '12px', marginBottom: '4px' }}>− {c}</div>)}
              </div>
            ))}
          </div>
        </div>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>📋 DFW Permit Requirements</h2>
          <p style={{ color: '#CBD5E0', fontSize: '14px', marginBottom: '10px' }}>All natural gas line extensions in DFW require a permit. Propane connections to appliances may or may not — check your city.</p>
          {[
            { city: 'Dallas / Fort Worth', req: 'Gas permit required. Must be pulled by licensed master plumber.' },
            { city: 'Plano / Frisco / Allen', req: 'Gas permit + final inspection. CSST may be restricted — verify before install.' },
            { city: 'Arlington / Irving', req: 'Gas permit required. Shutoff within 6ft of each appliance per code.' },
            { city: 'McKinney / Rockwall', req: 'Gas permit required. Inspection within 24hrs of rough-in.' },
          ].map(r => (
            <div key={r.city} style={{ display: 'flex', gap: '12px', marginBottom: '10px', alignItems: 'flex-start' }}>
              <div style={{ background: '#F5E642', borderRadius: '4px', padding: '2px 8px', color: '#0A1628', fontWeight: 700, fontSize: '11px', whiteSpace: 'nowrap', marginTop: '2px' }}>{r.city}</div>
              <div style={{ color: '#CBD5E0', fontSize: '13px' }}>{r.req}</div>
            </div>
          ))}
        </div>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>⚠️ CSST: Know Before You Install</h2>
          <p style={{ color: '#CBD5E0', fontSize: '14px', marginBottom: '10px' }}>Corrugated Stainless Steel Tubing (CSST) is flexible, easy to route, and popular — but it comes with requirements in DFW.</p>
          <div style={tg}>Must be bonded to electrical ground</div>
          <div style={tg}>Some DFW cities require black iron</div>
          <div style={tg}>Lightning strike risk without bonding</div>
          <div style={tg}>Tracpipe / FlexPipe brands most common</div>
        </div>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '16px' }}>🧮 BTU Load + Line Size Calculator</h2>
          <div style={{ marginBottom: '14px' }}>
            <div style={{ color: '#A0AEC0', fontSize: '13px', marginBottom: '8px' }}>Fuel Type</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {(['natural', 'propane'] as const).map(f => (
                <button key={f} onClick={() => setFuelType(f)}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px', background: fuelType === f ? '#F5E642′ : '#1A2F50', color: fuelType === f ? '#0A1628' : '#CBD5E0' }}>
                  {f === 'natural' ? '⛽ Natural Gas' : '🟡 Propane'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ color: '#A0AEC0', fontSize: '13px', marginBottom: '10px' }}>Select Outdoor Appliances</div>
          {appliances.map((a, i) => (
            <label key={a.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: a.included ? '#1A3A20′ : '#1A2F50', borderRadius: '8px', marginBottom: '8px', cursor: ’pointer', border: a.included ? '1px solid #48BB78′ : '1px solid transparent' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" checked={a.included} onChange={() => toggle(i)} style={{ accentColor: '#F5E642′ }} />
                <span style={{ color: '#CBD5E0', fontSize: '14px' }}>{a.name}</span>
              </div>
              <span style={{ color: '#718096', fontSize: '12px' }}>{a.btu.toLocaleString()} BTU</span>
            </label>
          ))}
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', cursor: 'pointer', width: '100%', marginTop: '8px' }}>
            Calculate Requirements
          </button>

          {result && (
            <div style={{ marginTop: '20px', background: '#0A1628', borderRadius: '10px', padding: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                {[
                  { label: 'Total BTU Load', val: `${result.totalBtu.toLocaleString()} BTU/hr` },
                  { label: 'Recommended Line Size', val: result.lineSize },
                  { label: 'Permit Required?', val: result.permit ? '✅ Yes — required' : '🟡 Check your city', highlight: result.permit },
                  { label: 'Est. Installation Cost', val: result.installCost },
                ].map(r => (
                  <div key={r.label} style={{ background: '#0F1E35', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ color: '#718096', fontSize: '11px', marginBottom: '4px' }}>{r.label}</div>
                    <div style={{ color: '#FFF', fontWeight: 700, fontSize: '15px' }}>{r.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#1A2F50', borderRadius: '8px', padding: '12px', fontSize: '13px', color: '#CBD5E0′ }}>{result.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
