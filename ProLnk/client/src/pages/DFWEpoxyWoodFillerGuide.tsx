import { useState } from 'react';

type FillerResult = { recommendation: string; approach: string; brands: string[]; cost: string; uvNote: string };

const fillerMap: Record<string, FillerResult> = {
  'surface-interior': {
    recommendation: 'Minwax High Performance Wood Filler',
    approach: 'Clean rot, treat with wood hardener first, fill in layers max 1/2in each, sand when firm',
    brands: ['Minwax High Performance', 'PC-Woody Epoxy Paste', 'LiquidWood + WoodEpox kit'],
    cost: '$15-35 per repair',
    uvNote: 'Interior — UV not a concern. Prime and paint normally.',
  },
  'surface-exterior': {
    recommendation: 'PC-Woody Two-Part Epoxy Wood Filler',
    approach: 'DFW UV destroys single-part fillers outdoors. Two-part epoxy only. Sand, prime with oil-based primer, paint within 30 days',
    brands: ['PC-Woody Epoxy Paste', 'Bondo Wood Filler (exterior grade)', 'LiquidWood consolidant + WoodEpox'],
    cost: '$25-55 per repair',
    uvNote: 'DFW UV is intense — unprimed epoxy chalks and shrinks within 60 days. Always prime.',
  },
  'structural-interior': {
    recommendation: 'Replace wood — epoxy filler is cosmetic only',
    approach: 'If structural member (joist, stud, beam) has deep rot, replace. Epoxy filler does not restore load capacity. Call a pro.',
    brands: ['N/A — replacement required'],
    cost: '$150-800+ depending on member (pro repair)',
    uvNote: 'Interior — moisture source must be fixed first or rot returns.',
  },
  'structural-exterior': {
    recommendation: 'Replace wood — DFW heat accelerates structural rot',
    approach: 'DFW heat + humidity cycles make structural rot worse fast. Sistering a joist or replacing a sill plate is the only safe fix. Epoxy buys 1-2 years max.',
    brands: ['N/A — use pressure-treated lumber for replacements in DFW'],
    cost: '$300-2000+ (structural pro required)',
    uvNote: 'Always use PT lumber for exterior structural replacements in DFW. Standard lumber rots within 3-5 years.',
  },
  'cosmetic-interior': {
    recommendation: 'Elmer\’s Carpenter\’s Wood Filler or DAP Plastic Wood',
    approach: 'Overfill slightly, sand flush when dry. Works for nail holes, small dings, trim repairs.',
    brands: ["Elmer's Carpenter's Wood Filler", 'DAP Plastic Wood', 'Famowood Wood Filler'],
    cost: '$8-18 per container',
    uvNote: 'Interior only. These single-part fillers shrink and crack if used outdoors in DFW.',
  },
  'cosmetic-exterior': {
    recommendation: 'Bondo Exterior Wood Filler or PC-Woody',
    approach: 'Two-part for exterior DFW work. Mix small batches — DFW heat shortens working time to 5-8 min (vs 15 min indoors).',
    brands: ['Bondo Exterior Wood Filler', 'PC-Woody', 'Abatron WoodEpox'],
    cost: '$20-45',
    uvNote: 'DFW sun: prime within 24-48hrs of application. Use exterior paint rated for 100°F+ surface temps.',
  },
};

export default function DFWEpoxyWoodFillerGuide() {
  const [extent, setExtent] = useState('');
  const [application, setApplication] = useState('');
  const [result, setResult] = useState<FillerResult | null>(null);

  function calculate() {
    if (!extent || !application) return;
    setResult(fillerMap[`${extent}-${application}`] || null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🪵</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Epoxy Wood Filler Guide</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          DFW's heat and UV degrade wood fillers fast. Know when to fill vs replace, and which products survive DFW conditions.
        </p>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>☀️ DFW Wood Rot Reality Check</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              'DFW heat accelerates rot 2-3x vs northern climates',
              'Single-part fillers crack outdoors within 1 DFW summer',
              'Working time for epoxy: 5-8 min in DFW summer vs 15 min inside',
              'Always fix moisture source — rot returns if you don\’t',
            ].map(f => (
              <div key={f} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12, fontSize: 13, color: '#CBD5E1', borderLeft: '3px solid #F5A623' }}>
                ⚠️ {f}
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Diagnose Your Repair</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Wood Rot Extent</label>
              <select value={extent} onChange={e => setExtent(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select extent...</option>
                <option value="cosmetic">Cosmetic (surface only, wood still firm)</option>
                <option value="surface">Surface Rot (soft but 1/4in or less)</option>
                <option value="structural">Structural (deep rot, spongy, load-bearing)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>DFW Application</label>
              <select value={application} onChange={e => setApplication(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select application...</option>
                <option value="interior">Interior (trim, baseboards, doors)</option>
                <option value="exterior">Exterior (fascia, siding, porch, DFW sun)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get DFW Wood Repair Plan →
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <div style={{ color: '#F5A623', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>RECOMMENDED PRODUCT</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#E8EDF5' }}>🛒 {result.recommendation}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginTop: 6 }}>💰 {result.cost}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 6 }}>REPAIR APPROACH</div>
              <div style={{ color: '#CBD5E1', fontSize: 14 }}>{result.approach}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 8 }}>BRAND OPTIONS</div>
              {result.brands.map(b => (
                <div key={b} style={{ color: '#E8EDF5', fontSize: 13, marginBottom: 4 }}>• {b}</div>
              ))}
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14, borderLeft: '3px solid #F5A623' }}>
              <div style={{ color: '#F5A623', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>☀️ DFW UV / Paint Note</div>
              <div style={{ color: '#CBD5E1', fontSize: 13 }}>{result.uvNote}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
