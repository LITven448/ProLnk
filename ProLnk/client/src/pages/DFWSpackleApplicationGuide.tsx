import { useState } from 'react';

type RepairResult = { coats: number; dryTime: string; steps: string[]; primer: string };

const repairMap: Record<string, RepairResult> = {
  'nail-drywall': {
    coats: 2,
    dryTime: '45-60 min per coat (DFW summer), 90 min (winter)',
    steps: ['Clean hole, remove loose debris', 'Apply lightweight spackle with putty knife', 'Feather edges 2-3 inches out', 'Sand with 120-grit when dry', 'Apply second thin coat', 'Sand with 220-grit, wipe dust'],
    primer: 'Spot prime before painting — DFW humidity causes flashing without primer',
  },
  'nail-plaster': {
    coats: 3,
    dryTime: '2 hrs per coat — plaster absorbs more in DFW humidity',
    steps: ['Dampen hole edges with water', 'Apply setting-type compound (not spackle)', 'Let firm up, apply second coat to fill', 'Third coat: skim smooth', 'Sand 150-grit, then 220-grit'],
    primer: 'Plaster MUST be primed in DFW — use PVA bonding primer',
  },
  'fist-drywall': {
    coats: 3,
    dryTime: '4-6 hrs per coat — do not rush in DFW humidity',
    steps: ['Cut clean square/circle around damage', 'Install wood backing strips', 'Cut patch from scrap drywall', 'Tape all seams with paper tape + all-purpose mud', 'Second coat: feather 8 inches out', 'Third coat: skim coat entire area', 'Sand 150 then 220-grit'],
    primer: 'Full area prime essential — DFW temperature swings cause texture mismatch without it',
  },
  'fist-plaster': {
    coats: 4,
    dryTime: '6-8 hrs per coat — old plaster absorbs slowly',
    steps: ['Remove all loose plaster to lath', 'Apply bonding agent to lath', 'Base coat: plaster or setting compound', 'Scratch coat when firm', 'Brown coat to build level', 'Finish coat: skim smooth'],
    primer: 'PVA bonding primer mandatory — two coats in DFW before painting',
  },
  'hairline-drywall': {
    coats: 1,
    dryTime: '30 min (DFW summer heat speeds drying significantly)',
    steps: ['Widen crack slightly with putty knife', 'Apply lightweight spackle, press firmly into crack', 'Wipe smooth with damp sponge', 'Sand lightly with 220-grit when dry'],
    primer: 'Spot prime — especially in DFW rooms with AC cycling (temperature changes reopen hairlines)',
  },
  'hairline-plaster': {
    coats: 2,
    dryTime: '60-90 min per coat',
    steps: ['Flex sealant into crack first (DFW movement cracks are structural — do not spackle)', 'If cosmetic only: setting compound pressed in', 'Skim second coat flat', 'Sand 220-grit'],
    primer: 'Prime with oil-based primer if crack kept returning — seals better against DFW humidity',
  },
};

export default function DFWSpackleApplicationGuide() {
  const [repairSize, setRepairSize] = useState('');
  const [wallType, setWallType] = useState('');
  const [result, setResult] = useState<RepairResult | null>(null);

  function calculate() {
    if (!repairSize || !wallType) return;
    setResult(repairMap[`${repairSize}-${wallType}`] || null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🪣</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Spackle Application Guide</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          DFW's humidity and temperature swings affect drying time and coat count. Get it right the first time.
        </p>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🌡️ DFW-Specific Spackle Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              'Summer heat (95°F+): spackle skins over fast — work in small sections',
              'Winter cold fronts: spackle can crack if applied below 50°F',
              'DFW humidity 70%+: add 30-40% to all drying times listed on packages',
              'AC vents nearby: direct airflow dries edges faster than centers — patch seams open',
            ].map(f => (
              <div key={f} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12, fontSize: 13, color: '#CBD5E1', borderLeft: '3px solid #F5E642′ }}>
                {f}
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🎯 Get Your Application Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Repair Size</label>
              <select value={repairSize} onChange={e => setRepairSize(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select size...</option>
                <option value="hairline">Hairline Crack</option>
                <option value="nail">Nail / Screw Hole</option>
                <option value="fist">Large Hole (fist-sized+)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Wall Type</label>
              <select value={wallType} onChange={e => setWallType(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select type...</option>
                <option value="drywall">Drywall (post-1970 DFW home)</option>
                <option value="plaster">Plaster (pre-1970 DFW home)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get DFW Application Plan →
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>{result.coats}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Coats Needed</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642′ }}>⏱️ Dry Time</div>
                <div style={{ color: '#CBD5E1', fontSize: 13, marginTop: 4 }}>{result.dryTime}</div>
              </div>
            </div>
            <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📋 Step-by-Step</h3>
            {result.steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, backgroundColor: '#0A1628', borderRadius: 8, padding: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
                <span style={{ color: '#CBD5E1', fontSize: 14 }}>{s}</span>
              </div>
            ))}
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14, marginTop: 16, borderLeft: '3px solid #F5A623′ }}>
              <div style={{ color: '#F5A623', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>🖌️ Primer Note for DFW</div>
              <div style={{ color: '#CBD5E1', fontSize: 13 }}>{result.primer}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
