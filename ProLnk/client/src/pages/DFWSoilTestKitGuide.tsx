import { useState } from 'react';

const soilIssues = [
  { id: 'alkaline', label: 'High pH / Alkaline Soil', icon: '🧪' },
  { id: 'caliche', label: 'Caliche Layer', icon: '🪨' },
  { id: 'clay', label: 'Heavy Clay', icon: '🟤' },
  { id: 'drainage', label: 'Poor Drainage', icon: '💧' },
];

const plants = [
  { id: 'lawn', label: 'Bermuda / St. Augustine Lawn' },
  { id: 'vegetables', label: 'Vegetable Garden' },
  { id: 'trees', label: 'Trees & Shrubs' },
  { id: 'natives', label: 'Native Texas Plants' },
  { id: 'roses', label: 'Roses & Ornamentals' },
];

const recommendations: Record<string, Record<string, string>> = {
  lawn: {
    alkaline: 'Apply sulfur 5 lb/1000 sq ft in spring. DFW lawns rarely need lime. Test every 2 years.',
    caliche: 'Break caliche with rented chisel or jackhammer. Fill pocket with topsoil + compost before planting.',
    clay: 'Topdress with 1/4" compost annually. Avoid tilling — worsens DFW clay structure.',
    drainage: 'Core aerate twice yearly. Grade soil to 2% slope away from house. French drain if needed.',
  },
  vegetables: {
    alkaline: 'Raise beds with pH-neutral mix: 50% compost, 30% topsoil, 20% vermiculite. Target pH 6.0-6.8.',
    caliche: 'Build raised beds minimum 12" deep over caliche. Do not till through — creates bowl that floods.',
    clay: 'Mix in 3-4" compost + expanded shale to break clay. Repeat each season.',
    drainage: 'Always use raised beds for vegetables in DFW clay. Amend with expanded shale for drainage.',
  },
  trees: {
    alkaline: 'Select DFW-adapted trees: live oak, cedar elm, Texas redbud — all alkaline-tolerant. Avoid pin oak (yellows in alkaline).',
    caliche: 'Dig hole 3x wider than root ball. If caliche found, auger through or mound-plant above it.',
    clay: 'Do not amend backfill — causes bathtub effect. Plant high, 2" above grade, mulch 3-4" deep.',
    drainage: 'Plant on slight mound. Avoid low spots. Use 3" mulch ring — do not volcano-mulch.',
  },
  natives: {
    alkaline: 'DFW natives evolved in alkaline clay — no amendment needed. Remove from soil test concern list.',
    caliche: 'Texas natives handle caliche well. Break a small pocket for establishment. No ongoing amendment.',
    clay: 'Natives thrive in DFW clay after establishment. Water weekly first year only.',
    drainage: 'Natives prefer well-drained but tolerate seasonal DFW clay waterlogging. Space adequately.',
  },
  roses: {
    alkaline: 'Apply acidifying fertilizer (Espoma Holly-tone) + sulfur. Target pH 6.0-6.5. Test every season.',
    caliche: 'Plant in raised bed or large container if caliche is shallow (under 18"). Roses need 18"+ depth.',
    clay: 'Amend deeply: 50% compost in planting hole. Mulch heavily. Avoid wetting foliage.',
    drainage: 'Roses demand excellent drainage. Raised planting + expanded shale amendment essential in DFW.',
  },
};

export default function DFWSoilTestKitGuide() {
  const [plant, setPlant] = useState<string | null>(null);
  const [issue, setIssue] = useState<string | null>(null);

  const rec = plant && issue ? recommendations[plant]?.[issue] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>🌱 DFW SOIL GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Soil Test Kit Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          DFW soil is almost always alkaline (pH 7.5-8.5), clay-heavy, and frequently interrupted by caliche (calcium carbonate hardpan). Testing before landscaping saves money and ensures plants survive. Texas A&M AgriLife Extension offers mail-in tests for $15-20.
        </p>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>📋 What DFW Soil Tests Reveal</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['pH', 'Almost always 7.5-8.5 in DFW — very alkaline'],
              ['Caliche Depth', 'Hardpan layer that blocks roots and drainage'],
              ['Clay %', 'Determines shrink-swell risk for your foundation'],
              ['Nutrients', 'N, P, K, iron, magnesium — iron often deficient in DFW'],
            ].map(([label, desc]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>Get Amendment Recommendations</h2>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 10 }}>What are you planting?</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {plants.map(p => (
              <button key={p.id} onClick={() => setPlant(p.id)}
                style={{ background: plant === p.id ? '#F5E642' : '#0f2240', color: plant === p.id ? '#0A1628' : '#fff', border: '2px solid #F5E642', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 10 }}>What DFW soil issue did your test show?</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {soilIssues.map(s => (
              <button key={s.id} onClick={() => setIssue(s.id)}
                style={{ background: issue === s.id ? '#F5E642' : '#0f2240', color: issue === s.id ? '#0A1628' : '#fff', border: '2px solid #F5E642', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>

        {rec && (
          <div style={{ background: '#0f2240', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
            <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8 }}>✅ AMENDMENT RECOMMENDATION</div>
            <div style={{ color: '#e2e8f0', lineHeight: 1.7, fontSize: 15 }}>{rec}</div>
          </div>
        )}

        <div style={{ marginTop: 28, background: '#0f2240', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🔗 Where to Get DFW Soil Tests</div>
          <ul style={{ color: '#94a3b8', margin: 0, paddingLeft: 20, lineHeight: 2 }}>
            <li>Texas A&M AgriLife Extension — Dallas County office</li>
            <li>Denton County Master Gardeners (free clinics)</li>
            <li>Home Depot / Lowe's quick pH strips (less accurate)</li>
            <li>SoilKit.com — mail-in with digital results</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
