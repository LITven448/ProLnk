import { useState } from 'react';

const storageData = [
  {
    tool: 'Lithium-Ion Battery (cordless tools)',
    location: 'Uninsulated garage',
    requirements: 'NEVER store in garage above 80°F — Li-ion degrades permanently above 100°F, fails above 120°F',
    maintenance: 'Store at 40–80% charge in climate-controlled space (indoors or insulated storage)',
    damage: 'Permanent capacity loss, swelling, fire risk in extreme heat',
    dfwRisk: '🔴 Critical — DFW garages reach 130–140°F in July. Bring batteries inside.',
  },
  {
    tool: 'Rubber-handled hand tools (pliers, screwdrivers)',
    location: 'Uninsulated garage',
    requirements: 'Store in toolbox out of direct sunlight — UV and heat crack rubber grips in 1–2 seasons',
    maintenance: 'Inspect grips annually. Replace cracked handles — grip failure causes injury.',
    damage: 'Grip cracking, handle shrinkage, UV degradation',
    dfwRisk: '🟡 Moderate — toolbox lid blocks UV; unprotected tools degrade fast in DFW sun',
  },
  {
    tool: 'Corded power tools (drill, sander, saw)',
    location: 'Uninsulated garage',
    requirements: 'Coil cords loosely and hang — heat causes cord insulation to crack when coiled tight',
    maintenance: 'Inspect cord insulation before each use in summer. Cracked insulation = shock risk.',
    damage: 'Cord insulation cracking, plug prong corrosion',
    dfwRisk: '🟡 Moderate — inspect cords annually; DFW heat accelerates insulation aging',
  },
  {
    tool: 'Pneumatic nailer / air tools',
    location: 'Any DFW location',
    requirements: 'Drain compressor tank after every use — DFW humidity causes internal tank rust',
    maintenance: 'Oil pneumatic tools weekly if used regularly. Dry compressor tank monthly minimum.',
    damage: 'Internal rust, valve failure, o-ring cracking in heat cycles',
    dfwRisk: '🟡 Moderate — humidity + heat cycles destroy untreated compressor tanks within 3–5 yrs',
  },
  {
    tool: 'Measuring tape / layout tools',
    location: 'Any',
    requirements: 'Keep in case or toolbox — blade spring weakens in sustained heat, ABS case warps',
    maintenance: 'Inspect blade lock and spring function annually',
    damage: 'Blade spring failure, case warping, readability fading',
    dfwRisk: '🟢 Low — minor impact; keep out of direct sun to extend life significantly',
  },
  {
    tool: 'Lubricants and oils (WD-40, 3-in-1, grease)',
    location: 'Uninsulated garage',
    requirements: 'Keep below 120°F — aerosol cans are pressurized and can rupture in extreme heat',
    maintenance: 'Store aerosols in shaded area or bring inside during summer. Check for leaks monthly.',
    damage: 'Aerosol rupture, composition change, reduced effectiveness',
    dfwRisk: '🔴 Critical — aerosol cans stored in 140°F garage are an explosion risk. Store inside.',
  },
];

export default function DFWToolStorageDFWGuide() {
  const [toolInput, setToolInput] = useState('');
  const [result, setResult] = useState<typeof storageData[0] | null>(null);

  function lookup() {
    const match = storageData.find(s =>
      s.tool.toLowerCase().includes(toolInput.toLowerCase())
    );
    setResult(match || null);
  }

  function riskColor(risk: string) {
    if (risk.includes('🔴')) return '#F87171';
    if (risk.includes('🟡')) return '#FBBF24';
    return '#34D399';
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HOMEOWNER GUIDES</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏠 Tool Storage in DFW Heat</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28, lineHeight: 1.6 }}>DFW garages hit 130–140°F in summer. This destroys batteries, cracks handles, and creates safety hazards.</p>

        <div style={{ background: '#F87171' + '22', border: '1px solid #F87171' + '55', borderRadius: 10, padding: 16, marginBottom: 32, fontSize: 14, color: '#F87171' }}>
          🚨 Li-ion batteries and aerosol cans are the #1 DFW storage danger. Both are fire and explosion risks in 130°F+ garages. Always bring inside.
        </div>

        <div style={{ background: '#111C2E', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Get Storage Requirements</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              placeholder="Enter tool type (e.g. battery, drill, lubricant...)"
              value={toolInput}
              onChange={e => setToolInput(e.target.value)}
              style={{ flex: 1, minWidth: 220, background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}
            />
            <button onClick={lookup} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Get Requirements
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${riskColor(result.dfwRisk)}` }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{result.tool}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 10 }}>Location: {result.location}</div>
              <div style={{ color: '#CBD5E1', fontSize: 13, marginBottom: 6 }}>📦 Requirements: {result.requirements}</div>
              <div style={{ color: '#FBBF24', fontSize: 13, marginBottom: 6 }}>🔧 Maintenance: {result.maintenance}</div>
              <div style={{ color: '#F87171', fontSize: 13, marginBottom: 6 }}>💀 Damage if ignored: {result.damage}</div>
              <div style={{ color: riskColor(result.dfwRisk), fontSize: 13, fontWeight: 600 }}>{result.dfwRisk}</div>
            </div>
          )}
          {toolInput && !result && (
            <div style={{ marginTop: 16, color: '#94A3B8', fontSize: 14 }}>Try "battery", "rubber", "corded", "pneumatic", "measuring tape", or "lubricant".</div>
          )}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 Full Storage Reference</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {storageData.map((s, i) => (
            <div key={i} style={{ background: '#111C2E', borderRadius: 10, padding: 18, borderLeft: `3px solid ${riskColor(s.dfwRisk)}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{s.tool}</span>
                <span style={{ fontSize: 13, color: riskColor(s.dfwRisk), fontWeight: 600 }}>{s.dfwRisk.split('—')[0].trim()}</span>
              </div>
              <div style={{ color: '#CBD5E1', fontSize: 13, marginBottom: 4 }}>📦 {s.requirements}</div>
              <div style={{ color: '#FBBF24', fontSize: 13, marginBottom: 4 }}>🔧 {s.maintenance}</div>
              <div style={{ color: '#F87171', fontSize: 13 }}>💀 {s.damage}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #1E3A5F', textAlign: 'center', color: '#475569', fontSize: 13 }}>
          ProLnk · DFW Homeowner Resource · Garage insulation reduces temps 30–40°F — worth the investment
        </div>
      </div>
    </div>
  );
}
