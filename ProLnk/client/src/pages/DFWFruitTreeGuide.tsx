import { useState } from 'react';

const fruitData: Record<string, { trees: string[]; yield: string; careRequirements: string }> = {
  'small-north': {
    trees: ['🍑 Peach (Contender or Redhaven — chill hours met in N.DFW)', '🌿 Fig (Brown Turkey — extremely reliable)', '🍋 Meyer Lemon (south-facing wall or container)', '🍊 Satsuma Mandarin (cold-hardiest citrus)'],
    yield: 'Peach: 50-150 lbs/yr at maturity. Fig: 20-30 lbs. Citrus: 30-60 lbs if protected from freezes.',
    careRequirements: 'Peach needs dormant spray for peach leaf curl. Fig: prune in Feb. Citrus: wrap trunk in freeze events. All: fertilize Mar and June.',
  },
  'small-south': {
    trees: ['🌿 Fig (Celeste variety — smaller tree)', '🍊 Satsuma Mandarin (most cold-hardy citrus)', '🍇 Bunch Grapes (Champanel — DFW proven)', '🍋 Improved Meyer Lemon (container or wall)'],
    yield: 'Fig: 20-40 lbs at peak. Satsuma: 40-80 lbs. Grapes: 15-40 lbs/vine. Lemon: 30-50 fruits/yr.',
    careRequirements: 'South DFW gets more freeze risk — mulch citrus heavily. Fig is most forgiving. Grapes: prune heavily each Feb. Lemon: bring container inside below 28°F.',
  },
  'large-north': {
    trees: ['🍑 Peach (multiple varieties for extended harvest)', '🌿 Fig (multiple: Brown Turkey + Texas Everbearing)', '🫐 Mayhaw (underused — makes amazing jelly)', '🍈 Persimmon (Fuyu — cold hardy, low maintenance)'],
    yield: 'Peach: 100-200 lbs/yr. Fig: 40-80 lbs each. Persimmon: 50-100 lbs. Mayhaw: 10-30 lbs clusters.',
    careRequirements: 'Persimmon: almost zero maintenance — drought tolerant once established. Peach: spray schedule critical. Mayhaw: wet areas of yard ideal. All: deep water 2x/month.',
  },
  'large-south': {
    trees: ['🌿 Fig (Texas Everbearing — two crops/yr)', '🍈 Persimmon (Fuyu + Hachiya varieties)', '🍊 Satsuma grove (3-4 trees for community)', '🍇 Muscadine Grapes (Carlos or Scuppernong)'],
    yield: 'Fig: 60-100 lbs across two crops. Persimmon: 50-150 lbs. Satsuma grove: 150-300 lbs total. Muscadine: 40-60 lbs/vine.',
    careRequirements: 'Muscadine grapes thrive in S.DFW heat — need trellis. Persimmon: water during fruit set only. Fig hedge: plant 8 ft apart. Satsuma: annual fertilize Feb and July.',
  },
};

const sizeOptions = ['small-north', 'small-south', 'large-north', 'large-south'];
const sizeLabels: Record<string, string> = {
  'small-north': 'Small Yard — North DFW (Frisco/McKinney/Plano)',
  'small-south': 'Small Yard — South DFW (Mansfield/Midlothian/Arlington)',
  'large-north': 'Large Yard — North DFW (Flower Mound/Lewisville)',
  'large-south': 'Large Yard — South DFW (Waxahachie/Cedar Hill)',
};

export default function DFWFruitTreeGuide() {
  const [size, setSize] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const result = submitted && size ? fruitData[size] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🍑</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Fruit Tree Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW has the chill hours for peaches, the heat for figs, and borderline citrus territory. Know exactly what grows here.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>📊 DFW Fruit Tree Reality Check</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🌿', label: 'Best Bet', val: 'Figs — near zero maintenance, massive yields' },
              { icon: '🍑', label: 'Works Well', val: 'Peaches — enough chill hours in most of DFW' },
              { icon: '🍊', label: 'Borderline', val: 'Citrus — south-facing wall or container required' },
              { icon: '🍈', label: 'Underrated', val: 'Persimmon — drought tolerant, gorgeous fall color' },
            ].map((f) => (
              <div key={f.label} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 22 }}>{f.icon}</div>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600 }}>{f.label}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{f.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>🔍 Find Your Fruit Trees</h2>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94a3b8' }}>Select your yard size and DFW location:</label>
          <select value={size} onChange={(e) => { setSize(e.target.value); setSubmitted(false); }} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 14, marginBottom: 16 }}>
            <option value="">-- Choose your situation --</option>
            {sizeOptions.map((o) => <option key={o} value={o}>{sizeLabels[o]}</option>)}
          </select>
          <button onClick={() => setSubmitted(true)} disabled={!size} style={{ width: '100%', padding: '12px', background: size ? '#F5E642' : '#1e3a5f', color: size ? '#0A1628' : '#4a6080', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: size ? 'pointer' : 'not-allowed' }}>
            Show My Fruit Tree Plan 🍑
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>✅ Best Fruit Trees for Your DFW Yard</h2>
            <div style={{ marginBottom: 16 }}>
              {result.trees.map((t) => <div key={t} style={{ background: '#0A1628', borderRadius: 8, padding: 10, marginBottom: 8, fontSize: 14 }}>{t}</div>)}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>🍎 Expected Yield</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{result.yield}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>🛠️ Care Requirements</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{result.careRequirements}</div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#4a6080', fontSize: 12 }}>
          ProLnk — DFW Home & Garden Intelligence
        </div>
      </div>
    </div>
  );
}
