import { useState } from 'react';

const scopeDetails: Record<string, { features: string[]; hardWater: string; layout: string }> = {
  basic: {
    features: ['New flooring (LVP or tile)','Fresh paint + storage shelving','New lighting'],
    hardWater: 'Water softener loop rough-in — DFW water hardness 17–25 gpg destroys machines without treatment',
    layout: 'Optimized appliance placement + wall-mount drying bar',
  },
  mid: {
    features: ['Built-in cabinetry above appliances','Utility sink with faucet','Folding counter with storage','New flooring + backsplash'],
    hardWater: 'Whole-house water softener install (DFW essential) — $800–$1,500 added',
    layout: 'U-shaped or L-shaped layout with dedicated ironing zone',
  },
  full: {
    features: ['Full cabinet system (ceiling height)','Quartz countertop folding station','Deep utility sink + pot filler','Custom pet washing station','In-wall ironing board'],
    hardWater: 'Whole-house softener + reverse osmosis drinking loop — standard for DFW luxury builds',
    layout: 'Zoned layout: wash → fold → hang → iron — DFW builders call this the "laundry suite"',
  },
};

const costMap: Record<string, Record<string, string>> = {
  small: { basic: '$3,000–$5,500', mid: '$6,000–$10,000', full: '$12,000–$20,000' },
  medium: { basic: '$4,500–$7,500', mid: '$8,000–$14,000', full: '$16,000–$28,000' },
  large: { basic: '$6,000–$10,000', mid: '$11,000–$18,000', full: '$22,000–$40,000' },
};

export default function DFWLaundryRoomRenovationGuide() {
  const [roomSize, setRoomSize] = useState('');
  const [scope, setScope] = useState('');
  const [result, setResult] = useState<null | { features: string[]; hardWater: string; layout: string; cost: string }>(null);

  function calculate() {
    if (!roomSize || !scope) return;
    const details = scopeDetails[scope];
    const cost = costMap[roomSize][scope];
    setResult({ ...details, cost });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#E8E8E8', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🧺</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Laundry Room Renovation Guide</h1>
          <p style={{ color: '#9AA5B4', fontSize: 16 }}>DFW homes often have oversized laundry rooms — turn wasted space into a functional powerhouse.</p>
        </div>

        <div style={{ backgroundColor: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>💧 DFW Hard Water Reality Check</h2>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642', marginBottom: 16 }}>
            <p style={{ color: '#CBD5E0', fontSize: 14, margin: 0 }}>
              DFW tap water averages <strong style={{ color: '#F5E642' }}>17–25 grains per gallon</strong> hardness — among the highest in Texas. Without a water softener, front-loading washers fail in 4–6 years. Every laundry renovation should include softener planning.
            </p>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Front-loaders need vibration pads on DFW concrete slab floors','Gas dryer hookup adds $300–$600 but cuts utility bills vs electric','DFW humidity (summer 70%+) requires proper exhaust ventilation','Folding stations at 36" height — standard DFW builder preference'].map(tip => (
              <li key={tip} style={{ display: 'flex', gap: 10 }}>
                <span style={{ color: '#F5E642', flexShrink: 0 }}>✓</span>
                <span style={{ color: '#CBD5E0', fontSize: 14 }}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ backgroundColor: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20 }}>🔧 Design Configurator</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Room Size</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['small','📦 Small (under 60 sq ft)'],['medium','🏠 Medium (60–100 sq ft)'],['large','🏢 Large (100+ sq ft)']].map(([key, label]) => (
                <button key={key} onClick={() => setRoomSize(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: roomSize === key ? '#F5E642' : '#1E3A5F', backgroundColor: roomSize === key ? '#F5E6421A' : 'transparent', color: roomSize === key ? '#F5E642' : '#9AA5B4', cursor: 'pointer', fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Renovation Scope</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['basic','🔨 Basic Refresh'],['mid','🏗️ Mid Renovation'],['full','👑 Full Laundry Suite']].map(([key, label]) => (
                <button key={key} onClick={() => setScope(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: scope === key ? '#F5E642' : '#1E3A5F', backgroundColor: scope === key ? '#F5E6421A' : 'transparent', color: scope === key ? '#F5E642' : '#9AA5B4', cursor: 'pointer', fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={calculate}
            style={{ width: '100%', padding: '14px', backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, borderRadius: 8, border: 'none', cursor: 'pointer' }}>
            Build My Laundry Room Plan →
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#1E3A5F', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🧺 Your DFW Laundry Room Plan</h3>
            <div style={{ marginBottom: 14 }}>
              <div style={{ color: '#9AA5B4', fontSize: 12, marginBottom: 6 }}>🔨 Included Features</div>
              {result.features.map(f => (
                <div key={f} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                  <span style={{ color: '#F5E642' }}>→</span>
                  <span style={{ color: '#E8E8E8', fontSize: 14 }}>{f}</span>
                </div>
              ))}
            </div>
            {[['💧 DFW Hard Water Solution', result.hardWater],['📐 Recommended Layout', result.layout],['💵 Estimated DFW Cost', result.cost]].map(([label, value]) => (
              <div key={label as string} style={{ marginBottom: 14 }}>
                <div style={{ color: '#9AA5B4', fontSize: 12, marginBottom: 4 }}>{label}</div>
                <div style={{ color: '#E8E8E8', fontSize: 15 }}>{value as string}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
