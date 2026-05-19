import { useState } from 'react';

const TILE_COLORS = ['White/Light', 'Beige/Cream', 'Gray', 'Brown/Tan', 'Dark/Charcoal'];
const LIFESTYLES = ['Kids & Pets', 'Hard Water Stains', 'DFW Clay Soil Tracked In', 'Low Maintenance'];

const groutMatrix: Record<string, Record<string, { color: string; reason: string; maintenance: string }>> = {
  'White/Light': {
    'Kids & Pets': { color: 'Medium Gray (#888)', reason: 'Hides dirt without extreme contrast. Kids and pets bring in DFW red clay -- white grout turns orange fast.', maintenance: 'Seal annually. Spot clean weekly.' },
    'Hard Water Stains': { color: 'Warm Gray or Almond', reason: 'DFW water is 16-20 grains hard. White grout shows calcium buildup within weeks of install.', maintenance: 'Wipe down after every use. Seal every 6 months.' },
    'DFW Clay Soil Tracked In': { color: 'Tan or Walnut', reason: 'DFW red clay is relentless. Matching warm tones hide what cannot be swept fast enough.', maintenance: 'Seal quarterly. Mop weekly.' },
    'Low Maintenance': { color: 'Gray #777', reason: 'Gray grout reads clean even when it is not -- ideal for DFW dust and hard water.', maintenance: 'Seal once at install. Annual reapplication.' },
  },
  'Beige/Cream': {
    'Kids & Pets': { color: 'Khaki or Linen', reason: 'Blends with tile so tracked-in DFW soil disappears into the field.', maintenance: 'Seal every 6 months. Mop weekly.' },
    'Hard Water Stains': { color: 'Bone or Biscuit', reason: 'Calcium deposits from DFW water blend into warm neutral tones better than white.', maintenance: 'Wipe after wet use. Seal annually.' },
    'DFW Clay Soil Tracked In': { color: 'Walnut or Coffee', reason: 'Dark warm grout hides the red/brown clay DFW homes fight constantly.', maintenance: 'Seal quarterly. Epoxy grout eliminates sealing.' },
    'Low Maintenance': { color: 'Antique White', reason: 'Slight warm offset prevents the yellow staining white grout gets from DFW hard water.', maintenance: 'Annual seal. Easy spot clean.' },
  },
  'Gray': {
    'Kids & Pets': { color: 'Charcoal or Graphite', reason: 'Dark grout hides everything. DFW clay, pet paws, muddy boots -- all invisible.', maintenance: 'Seal at install. Almost zero visible maintenance.' },
    'Hard Water Stains': { color: 'Mid-Gray #999', reason: 'Calcium deposits from DFW water are white -- they show on dark AND white grout. Mid-gray masks both.', maintenance: 'Seal every 6 months. Vinegar rinse monthly.' },
    'DFW Clay Soil Tracked In': { color: 'Dark Graphite', reason: 'The darkest grout wins against DFW red clay tracked in from expansive clay soil yards.', maintenance: 'Epoxy grout recommended -- zero absorption.' },
    'Low Maintenance': { color: 'Mid-Gray', reason: 'Midtone gray is the lowest-effort grout color for DFW conditions bar none.', maintenance: 'Seal once. Annual check.' },
  },
  'Brown/Tan': {
    'Kids & Pets': { color: 'Mocha or Espresso', reason: 'Warm dark grout blends with brown tile and hides DFW red clay completely.', maintenance: 'Seal annually. Spot clean as needed.' },
    'Hard Water Stains': { color: 'Caramel', reason: 'Warm tones absorb the yellow-white calcium look DFW hard water leaves behind.', maintenance: 'Seal every 6 months. Soft water rinse helps.' },
    'DFW Clay Soil Tracked In': { color: 'Espresso', reason: 'Dark grout with a warm undertone is unbeatable for DFW red clay foot traffic.', maintenance: 'Seal at install. Epoxy option eliminates future sealing.' },
    'Low Maintenance': { color: 'Walnut', reason: 'Warm medium grout forgives DFW dust and clay between cleaning sessions.', maintenance: 'Annual seal. Weekly dry mop.' },
  },
  'Dark/Charcoal': {
    'Kids & Pets': { color: 'Charcoal Matching Tile', reason: 'Same-tone grout on dark tile makes the whole floor read as one surface -- no grout lines to show dirt.', maintenance: 'Seal at install. Nearly invisible maintenance.' },
    'Hard Water Stains': { color: 'Graphite', reason: 'DFW hard water white calcium shows most on the darkest grout -- go matching or mid-gray instead.', maintenance: 'Wipe weekly. Epoxy grout eliminates staining.' },
    'DFW Clay Soil Tracked In': { color: 'Same-shade Dark Gray', reason: 'Matching grout to dark tile creates a seamless floor. DFW clay disappears.', maintenance: 'Seal once. Spot clean only.' },
    'Low Maintenance': { color: 'Charcoal', reason: 'Dark grout on dark tile is the ultimate low-maintenance DFW floor. Nothing shows.', maintenance: 'Seal at install. Minimal ongoing care.' },
  },
};

const sandedInfo = {
  sanded: 'Use for joints wider than 1/8". Most DFW floor tile installations. Resists shrinkage during DFW summer heat.',
  unsanded: 'Use for joints 1/16"-1/8". Polished stone, glass tile, wall tile. Will shrink if used in wide joints in DFW heat.',
};

export default function DFWGroutColorGuide() {
  const [tile, setTile] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const result = tile && lifestyle ? groutMatrix[tile]?.[lifestyle] : null;
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Tile Pro Guide</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>🎨 DFW Grout Color Guide</h1>
        <p style={{ color: '#8899BB', marginBottom: '2rem', lineHeight: 1.6 }}>DFW hard water (16-20 grains), red clay soil, and intense UV make grout color selection critical. White grout fails fast here. Select your tile color and primary concern.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>Tile Color</div>
            {TILE_COLORS.map(t => (
              <button key={t} onClick={() => setTile(t)} style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.6rem 1rem', background: tile === t ? '#F5E642' : '#0D1E3A', color: tile === t ? '#0A1628' : '#CDD5E0', border: '1px solid', borderColor: tile === t ? '#F5E642' : '#1C2E4A', borderRadius: 8, cursor: 'pointer', textAlign: 'left', fontWeight: tile === t ? 700 : 400, transition: 'all 0.2s' }}>{t}</button>
            ))}
          </div>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>Primary DFW Concern</div>
            {LIFESTYLES.map(l => (
              <button key={l} onClick={() => setLifestyle(l)} style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.6rem 1rem', background: lifestyle === l ? '#F5E642' : '#0D1E3A', color: lifestyle === l ? '#0A1628' : '#CDD5E0', border: '1px solid', borderColor: lifestyle === l ? '#F5E642' : '#1C2E4A', borderRadius: 8, cursor: 'pointer', textAlign: 'left', fontWeight: lifestyle === l ? 700 : 400, transition: 'all 0.2s' }}>{l}</button>
            ))}
          </div>
        </div>
        {result && (
          <div style={{ background: '#0D1E3A', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.75rem' }}>✅ Recommended Grout Color</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>{result.color}</div>
            <div style={{ color: '#8899BB', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>{result.reason}</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', border: '1px solid #1C2E4A' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.25rem' }}>MAIMTEANANCE EXPECTATION</div>
              <div style={{ color: '#CDD5E0', fontSize: '0.9rem' }}>{result.maintenance}</div>
            </div>
          </div>
        )}
        <div style={{ background: '#0D1E3A', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1C2E4A' }}>
          <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem' }}>Sanded vs Unsanded for DFW</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', border: '1px solid #1C2E4A' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Sanded</div>
              <div style={{ color: '#8899BB', fontSize: '0.85rem', lineHeight: 1.5 }}>{sandedInfo.sanded}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', border: '1px solid #1C2E4A' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Unsanded</div>
              <div style={{ color: '#8899BB', fontSize: '0.85rem', lineHeight: 1.5 }}>{sandedInfo.unsanded}</div>
            </div>
          </div>
        </div>
        <div style={{ background: '#0D1E3A', borderRadius: 12, padding: '1.25rem', border: '1px solid #1C2E4A' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>DFW-Specific Grout Tips</div>
          {['Use epoxy grout in DFW showers -- hard water cannot penetrate it.', 'Seal all cement grout within 72 hours of cure in DFW humidity.', 'Avoid white grout near exterior doors -- DFW red clay stains permanently.', 'Summer heat expands grout -- leave proper expansion joints at walls.'].map((tip, i) => (
            <div key={i} style={{ color: '#8899BB', fontSize: '0.875rem', marginBottom: '0.4rem', paddingLeft: '0.5rem', borderLeft: '2px solid #F5E642' }}>{tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
