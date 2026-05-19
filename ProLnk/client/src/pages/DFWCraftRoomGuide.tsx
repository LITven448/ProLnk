import { useState } from 'react';

const craftTypes: Record<string, { lighting: string; storage: string; humidity: string; layout: string }> = {
  sewing: {
    lighting: '5000K daylight LED (90+ CRI) — color-accurate for fabric matching; task lighting over machine + cutting table',
    storage: 'Wall-mounted thread organization + rolling fabric bolt storage + drawer inserts for notions',
    humidity: 'DFW summer humidity warps fabric — dehumidifier or AC vent directed into room keeps 45–55% RH',
    layout: 'L-shaped: cutting table (36″ height) + sewing station + ironing board zone — minimum 150 sq ft recommended',
  },
  painting: {
    lighting: '6500K natural daylight LEDs + north-facing window if possible — DFW south/west windows create harsh glare',
    storage: 'Wall-mounted brush holders + vertical canvas storage + ventilated cabinet for solvents (oil painting)',
    humidity: 'Acrylic paints tolerate DFW humidity; oil paints need lower humidity — exhaust fan essential for solvents',
    layout: 'Central easel zone + perimeter storage + sealed flooring (epoxy or tile) — paint spills are permanent on wood',
  },
  woodworking: {
    lighting: 'High-lumen shop lighting (10,000+ lumens) — shadows cause measurement errors; under-cabinet task lighting',
    storage: 'French cleat wall system — modular and reconfigurable for DFW hobbyist who adds tools over time',
    humidity: 'Critical: DFW humidity swings warp wood — mini-split HVAC keeps stable 45% RH year-round',
    layout: 'Workbench against wall + central open floor + dust collector in corner — minimum 200 sq ft',
  },
  paper: {
    lighting: '5000K daylight LED + dimmable — paper crafts need accurate color; adjustable brightness for detail work',
    storage: 'Stamp and die storage drawers + paper vertical sorters + Cricut/Silhouette dedicated station',
    humidity: 'DFW humidity curls paper — sealed storage bins and dehumidifier for paper supply storage',
    layout: 'Large flat work surface (48″x96″ minimum) + vertical storage walls + light table station',
  },
};

const spaceCosts: Record<string, Record<string, string>> = {
  small: { economy: '$3,000–$6,000', mid: '$6,000–$12,000', luxury: '$12,000–$22,000′ },
  medium: { economy: '$5,000–$9,000', mid: '$9,000–$18,000', luxury: '$18,000–$35,000′ },
  large: { economy: '$8,000–$14,000', mid: '$14,000–$26,000', luxury: '$26,000–$50,000′ },
};

export default function DFWCraftRoomGuide() {
  const [craftType, setCraftType] = useState('');
  const [spaceSize, setSpaceSize] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | { lighting: string; storage: string; humidity: string; layout: string; cost: string }>(null);

  function calculate() {
    if (!craftType || !spaceSize || !budget) return;
    const rec = craftTypes[craftType];
    const cost = spaceCosts[spaceSize][budget];
    setResult({ ...rec, cost });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#E8E8E8', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🎨</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Craft Room Guide</h1>
          <p style={{ color: '#9AA5B4', fontSize: 16 }}>Dedicated craft and hobby rooms are increasingly common in DFW homes — design yours for your specific craft.</p>
        </div>

        <div style={{ backgroundColor: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🌡️ DFW Environment Challenges for Craft Rooms</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['DFW summer humidity (70%+) warps wood, curls paper, and stretches fabric without humidity control','DFW heat makes attic storage impossible for most craft materials — finished room storage is essential','West-facing craft rooms get brutal afternoon sun — UV damages fabric, paint, and paper over time','DFW clay soil movement can crack floor tiles — flexible flooring (LVP) safer than ceramic for craft rooms'].map(tip => (
              <li key={tip} style={{ display: 'flex', gap: 10 }}>
                <span style={{ color: '#F5E642', flexShrink: 0 }}>✓</span>
                <span style={{ color: '#CBD5E0', fontSize: 14 }}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ backgroundColor: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20 }}>🔧 Craft Room Configurator</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Primary Craft Type</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['sewing','🧵 Sewing / Quilting'],['painting','🖌️ Painting / Art'],['woodworking','🪚 Woodworking'],['paper','✂️ Paper / Scrapbooking']].map(([key, label]) => (
                <button key={key} onClick={() => setCraftType(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: craftType === key ? '#F5E642′ : '#1E3A5F', backgroundColor: craftType === key ? '#F5E6421A' : ’transparent', color: craftType === key ? '#F5E642′ : '#9AA5B4', cursor: ’pointer', fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Available Space</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['small','📦 Small (under 120 sq ft)'],['medium','🏠 Medium (120–200 sq ft)'],['large','🏢 Large (200+ sq ft)']].map(([key, label]) => (
                <button key={key} onClick={() => setSpaceSize(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: spaceSize === key ? '#F5E642′ : '#1E3A5F', backgroundColor: spaceSize === key ? '#F5E6421A' : ’transparent', color: spaceSize === key ? '#F5E642′ : '#9AA5B4', cursor: ’pointer', fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Budget</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['economy','💰 Economy'],['mid','💎 Mid-Range'],['luxury','👑 Luxury']].map(([key, label]) => (
                <button key={key} onClick={() => setBudget(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: budget === key ? '#F5E642′ : '#1E3A5F', backgroundColor: budget === key ? '#F5E6421A' : ’transparent', color: budget === key ? '#F5E642′ : '#9AA5B4', cursor: ’pointer', fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={calculate}
            style={{ width: '100%', padding: '14px', backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, borderRadius: 8, border: 'none', cursor: 'pointer' }}>
            Design My Craft Room →
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#1E3A5F', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🎨 Your DFW Craft Room Plan</h3>
            {[['💡 Lighting Plan', result.lighting],['🗄️ Storage System', result.storage],['💧 DFW Humidity Control', result.humidity],['📐 Layout Recommendation', result.layout],['💵 Estimated DFW Cost', result.cost]].map(([label, value]) => (
              <div key={label as string} style={{ marginBottom: 14 }}>
                <div style={{ color: '#9AA5B4', fontSize: 12, marginBottom: 4 }}>{label}</div>
                <div style={{ color: '#E8E8E8', fontSize: 14, lineHeight: 1.5 }}>{value as string}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
