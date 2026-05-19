import { useState } from 'react';

const counties = [
  { name: 'Parker County (Weatherford)', traits: 'Strong equestrian culture, ag exemptions common, land prices $8K-$15K/acre' },
  { name: 'Kaufman County', traits: 'Affordable acreage, growing horse community, $5K-$10K/acre' },
  { name: 'Ellis County (Waxahachie)', traits: 'Historic ranch land, good water tables, $7K-$12K/acre' },
  { name: 'Hood County (Granbury)', traits: 'Scenic Hill Country edge, higher prices, $10K-$18K/acre' },
  { name: 'Johnson County (Cleburne)', traits: 'Budget-friendly, flat terrain, $5K-$9K/acre' },
];

const checklist = (acreage: number, features: string[]) => {
  const items = ['Perimeter fencing audit (wood vs wire vs pipe)', 'Water source verification (well GPM + pond rights)', 'Pasture soil test for toxins'];
  if (acreage >= 5) items.push('Hay storage capacity assessment', 'Dedicated trailer turn-around space');
  if (acreage >= 10) items.push('Ag exemption qualification review', 'Cross-fencing for pasture rotation');
  if (features.includes('barn')) items.push('Barn structure inspection (roof, foundation, ventilation)', 'Stall count vs horse capacity ratio');
  if (features.includes('arena')) items.push('Arena footing material analysis', 'Arena drainage slope check', 'Lighting infrastructure for night use');
  if (features.includes('water')) items.push('Water rights documentation review', 'Automatic waterer system inspection');
  return items;
};

export default function DFWHorsesPropertyGuide() {
  const [acreage, setAcreage] = useState(10);
  const [features, setFeatures] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleFeature = (f: string) =>
    setFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  const minCost = acreage * 7000;
  const maxCost = acreage * 15000;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🐴 DFW Horse Property Guide</h1>
        <p style={{ color: '#8A9BB5', fontSize: 16, marginBottom: 32 }}>Parker, Kaufman, and Ellis counties lead DFW's horse property market. Here’s how to evaluate what you’re buying.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🗺️ Top DFW Equestrian Counties</h2>
          {counties.map(c => (
            <div key={c.name} style={{ borderBottom: '1px solid #1E2F4A', padding: '12px 0′ }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{c.name}</div>
              <div style={{ color: '#8A9BB5', fontSize: 14 }}>{c.traits}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔧 Build Your Checklist</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Acreage Needed: {acreage} acres</label>
            <input type="range" min={2} max={50} value={acreage} onChange={e => setAcreage(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8A9BB5', fontSize: 12 }}>
              <span>2 acres</span><span>50 acres</span>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>Features You Need:</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['barn', 'arena', 'water', 'loafing shed', 'tack room'].map(f => (
                <button key={f} onClick={() => toggleFeature(f)}
                  style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                    background: features.includes(f) ? '#F5E642′ : '#1E2F4A', color: features.includes(f) ? '#0A1628' : '#8A9BB5' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResults(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Generate My Checklist →
          </button>
        </div>

        {showResults && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>✅ Your Horse Property Checklist</h2>
            <div style={{ color: '#8A9BB5', fontSize: 14, marginBottom: 16 }}>
              Estimated land cost range: <span style={{ color: '#F5E642', fontWeight: 700 }}>${minCost.toLocaleString()} – ${maxCost.toLocaleString()}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {checklist(acreage, features).map((item, i) => (
                <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1E2F4A', display: 'flex', gap: 10, fontSize: 15 }}>
                  <span style={{ color: '#F5E642′ }}>▸</span>{item}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 20, padding: 16, background: '#0A1628', borderRadius: 8 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>💡 Ag Exemption Tip</div>
              <div style={{ color: '#8A9BB5', fontSize: 14 }}>Texas ag exemption requires qualifying agricultural use — horses for personal recreation don't qualify. Horse breeding or boarding for hire typically does. Confirm with the county appraisal district before purchase.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
