import { useState } from 'react';

const REPAIR_DATA: Record<string, { label: string; low: number; high: number; diy: string; claySoilNote: string; emergency: number }> = {
  faucet: { label: 'Dripping Faucet', low: 75, high: 150, diy: 'Easy', claySoilNote: 'Not affected by soil', emergency: 1.5 },
  toilet: { label: 'Running Toilet', low: 90, high: 200, diy: 'Easy', claySoilNote: 'Not affected by soil', emergency: 1.5 },
  drain: { label: 'Clogged Drain (main)', low: 150, high: 400, diy: 'Moderate', claySoilNote: 'DFW clay root intrusion can add $150–$300 for root cutting', emergency: 1.75 },
  water_heater: { label: 'Water Heater Replacement', low: 900, high: 1800, diy: 'Difficult', claySoilNote: 'Hard water in DFW accelerates anode rod failure — budget $80/yr in maintenance', emergency: 1.5 },
  slab_detect: { label: 'Slab Leak Detection', low: 300, high: 600, diy: 'Not DIY', claySoilNote: 'DFW clay movement causes slab leaks in 1 in 5 homes over 20 years', emergency: 1.25 },
  slab_repair: { label: 'Slab Leak Repair', low: 2000, high: 4500, diy: 'Not DIY', claySoilNote: 'Clay soil access difficulty adds 20–40% to tunneling cost vs. other markets', emergency: 1.4 },
  repipe: { label: 'Full Home Repipe (polybutylene or galvanized)', low: 8000, high: 15000, diy: 'Not DIY', claySoilNote: 'Many 1980s–1990s DFW homes have failing polybutylene pipe — reship before it fails', emergency: 1.0 },
  gas_line: { label: 'Gas Line Repair', low: 200, high: 800, diy: 'Not DIY', claySoilNote: 'DFW soil expansion can stress gas lines; always pressure-test after foundation work', emergency: 1.8 },
};

export default function DFWPlumbingRepairCostGuide() {
  const [repairType, setRepairType] = useState('');
  const [isEmergency, setIsEmergency] = useState('');
  const [result, setResult] = useState<null | { label: string; low: number; high: number; emergLow: number; emergHigh: number; diy: string; note: string }>(null);

  function estimate() {
    if (!repairType) return;
    const d = REPAIR_DATA[repairType];
    const mult = isEmergency === 'yes' ? d.emergency : 1;
    setResult({
      label: d.label, low: d.low, high: d.high,
      emergLow: Math.round(d.low * mult), emergHigh: Math.round(d.high * mult),
      diy: d.diy, note: d.claySoilNote
    });
  }

  const diyColor = (v: string) => v === 'Easy' ? '#22C55E' : v === 'Moderate' ? '#F5E642' : '#F97316';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#CBD5E1', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F1F5F9', margin: '0 0 8px' }}>DFW Plumbing Repair Cost Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.7 }}>
          DFW's expansive Blackland Prairie clay creates <strong style={{ color: '#F5E642' }}>unique plumbing challenges</strong> — from slab leaks to root-invaded drains. Here's what repairs actually cost in the DFW market, including the clay soil premium.
        </p>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 12 }}>Select Repair Type</label>
            <div style={{ display: 'grid', gap: 8 }}>
              {Object.entries(REPAIR_DATA).map(([key, d]) => (
                <button key={key} onClick={() => setRepairType(key)} style={{
                  padding: '12px 16px', borderRadius: 8, border: '2px solid',
                  borderColor: repairType === key ? '#F5E642' : '#2A3A5C',
                  background: repairType === key ? '#1a1500' : '#0A1628',
                  color: repairType === key ? '#F5E642' : '#CBD5E1',
                  cursor: 'pointer', textAlign: 'left', fontWeight: repairType === key ? 700 : 400,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <span>{d.label}</span>
                  <span style={{ fontSize: 13, color: '#94A3B8' }}>${d.low.toLocaleString()}–${d.high.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Emergency / After-Hours Service?</label>
            <div>
              {[['Standard (M–F, 8am–5pm)', 'no'], ['Emergency / Weekend', 'yes']].map(([l, v]) => (
                <button key={v} onClick={() => setIsEmergency(v)} style={{
                  padding: '8px 18px', borderRadius: 20, border: '2px solid',
                  borderColor: isEmergency === v ? '#F5E642' : '#2A3A5C',
                  background: isEmergency === v ? '#F5E642' : 'transparent',
                  color: isEmergency === v ? '#0A1628' : '#CBD5E1',
                  cursor: 'pointer', fontWeight: 600, fontSize: 13, margin: '4px 6px 4px 0'
                }}>{l}</button>
              ))}
            </div>
          </div>
          <button onClick={estimate} style={{ width: '100%', padding: '14px', borderRadius: 8, background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer' }}>
            Get DFW Cost Estimate →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F1F3D', border: '2px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#F1F5F9', marginBottom: 16 }}>🔧 {result.label}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Standard Rate</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#22C55E' }}>${result.low.toLocaleString()}–${result.high.toLocaleString()}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4' }}>Emergency Rate</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#F97316' }}>${result.emergLow.toLocaleString()}–${result.emergHigh.toLocaleString()}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>DIY Feasibility</div>
                <div style={{ fontWeight: 800, color: diyColor(result.diy) }}>{result.diy}</div>
              </div>
            </div>
            <div style={{ background: '#1a1500', borderRadius: 8, padding: 14, border: '1px solid #F5E642' }}>
              <strong style={{ color: '#F5E642', fontSize: 13 }}>🌍 DFW Clay Soil Impact:</strong>
              <span style={{ color: '#CBD5E1', fontSize: 13 }}> {result.note}</span>
            </div>
          </div>
        )}

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, marginTop: 0 }}>⚠️ DFW Plumbing Red Flags</h3>
          {[
            ['Polybutylene Pipe', 'Homes built 1978–1995 in DFW often have gray poly-b pipe. It fails without warning. Look for gray flexible pipe under sinks.'],
            ['Galvanized Steel', 'Older DFW homes with galvanized steel will see rust-colored water and reduced pressure. Full repipe is the only lasting fix.'],
            ['Slab Leak Signs', 'Warm spots on floors, high water bills, or mold smell are DFW slab leak indicators. Detect early — tunneling after water damage multiplies cost.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ padding: '12px 0', borderBottom: '1px solid #2A3A5C' }}>
              <div style={{ fontWeight: 700, color: '#F97316', marginBottom: 4 }}>⚠️ {title}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '20px', background: '#0F1F3D', borderRadius: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Get 3 Free Plumbing Quotes in DFW</div>
          <p style={{ color: '#94A3B8', marginBottom: 16, fontSize: 14 }}>Compare licensed plumbers — vetted for DFW clay soil expertise.</p>
          <button style={{ padding: '12px 32px', background: '#F5E642', color: '#0A1628', fontWeight: 800, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 16 }}>
            Compare Plumbing Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
