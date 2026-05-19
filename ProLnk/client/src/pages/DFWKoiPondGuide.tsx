import { useState } from 'react';

const SHADE_SOLUTIONS: Record<string, { label: string; cost: string; effectiveness: string }> = {
  pergola: { label: 'Pergola with Shade Sail', cost: '$3,000–$8,000', effectiveness: '50–70% shade coverage' },
  trees: { label: 'Deciduous Tree Planting', cost: '$500–$2,000', effectiveness: '30–60% natural shade (3–5 years to mature)' },
  sail: { label: 'UV-Rated Shade Sail', cost: '$200–$800', effectiveness: '90% UV block, 70% shade' },
  none: { label: 'No Shade (high-risk in DFW)', cost: '$0', effectiveness: 'Water temps exceed 95°F — lethal to koi' },
};

const FILTRATION: Record<string, { label: string; forFish: number; cost: string; note: string }> = {
  bog: { label: 'Bog Filter + Waterfall', forFish: 20, cost: '$800–$2,500', note: 'Best for DFW algae — plants consume nutrients before algae can' },
  bead: { label: 'Pressurized Bead Filter', forFish: 50, cost: '$1,500–$4,000', note: 'High-capacity mechanical + biological — ideal for DFW algae season (May–Sep)' },
  nexus: { label: 'Evolution Aqua Nexus', forFish: 100, cost: '$3,000–$6,000', note: 'Moving bed + settlement chamber — commercial-grade, recommended for serious collections' },
};

export default function DFWKoiPondGuide() {
  const [space, setSpace] = useState('');
  const [fish, setFish] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<{ size: string; depth: string; filter: string; filterCost: string; shade: string; totalCost: string; permit: string; predator: string } | null>(null);

  function calculate() {
    const sqftAvail = parseInt(space);
    const fishCount = parseInt(fish);
    const bud = parseInt(budget);
    const pondSqft = Math.min(sqftAvail * 0.4, Math.max(fishCount * 10, 100));
    const pondSize = `${Math.round(Math.sqrt(pondSqft) * 1.5)} × ${Math.round(Math.sqrt(pondSqft))} ft (approx ${Math.round(pondSqft)} sq ft surface)`;
    const depth = pondSqft > 200 ? '5 ft minimum for DFW summer — 4 ft absolute minimum' : '4 ft minimum — critical for DFW summer survival';
    let filter = 'bog';
    if (fishCount > 50) filter = 'nexus';
    else if (fishCount > 20) filter = 'bead';
    const fd = FILTRATION[filter];
    const shade = bud > 15000 ? 'pergola' : 'sail';
    const sd = SHADE_SOLUTIONS[shade];
    const pondCost = Math.round(pondSqft * 85);
    const total = `$${pondCost.toLocaleString()}–$${Math.round(pondCost * 1.6).toLocaleString()} pond construction + ${fd.cost} filtration + ${sd.cost} shade`;
    const permit = pondSqft > 150
      ? 'Permit likely required — most DFW cities require permits for ponds over 150 sq ft or deeper than 2 ft. Check city building department.'
      : 'Verify with your city — some DFW municipalities require permits for any water feature over 18 in deep.';
    setResult({ size: pondSize, depth, filter: fd.label, filterCost: fd.cost + ' — ' + fd.note, shade: sd.label + ' (' + sd.effectiveness + ', ' + sd.cost + ')', totalCost: total, permit, predator: 'Install pond net during heron migration (Oct–Mar). Raccoons active year-round — add motion sensor lighting and steep pond edges (vertical walls at 18 in depth deter raccoons). DFW great blue herons are federally protected — deter, do not harm.' });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.25rem' }}>🐟 DFW Koi Pond Guide</div>
        <div style={{ color: '#94A3B8', marginBottom: '2rem' }}>Survive DFW summers and predators — build a thriving koi habitat</div>

        <div style={{ background: '#7F1D1D', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #EF4444′ }}>
          <div style={{ color: '#FCA5A5', fontWeight: 700, marginBottom: '0.5rem' }}>🌡️ DFW Summer Heat — Critical Warning</div>
          <div style={{ color: '#FEE2E2', lineHeight: 1.7 }}>
            Koi begin experiencing heat stress at 86°F and die rapidly above 95°F water temperature. DFW summers regularly produce 100–110°F air temperatures. <strong>An unshaded pond in DFW will kill koi.</strong> Minimum 4 ft depth + 50% shade coverage is non-negotiable. Aeration must run 24/7 June through September — warm water holds less oxygen.
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>📏 DFW Depth Requirements</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', color: '#CBD5E1′ }}>
            <div>Minimum depth: <strong style={{ color: '#fff' }}>4 ft</strong></div>
            <div>Recommended DFW depth: <strong style={{ color: '#fff' }}>5–6 ft</strong></div>
            <div>Koi per 100 gal: <strong style={{ color: '#fff' }}>1 inch of fish</strong></div>
            <div>100 gal per 1 sq ft: <strong style={{ color: '#fff' }}>at 4 ft depth</strong></div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🌿 DFW Algae — Filtration Reality</div>
          <div style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            DFW long, hot summers create an extended algae growth season (April–October). Standard filters sized for koi count will underperform May–September. Oversize your filtration by 50% for DFW conditions. Bog filters with native Texas aquatic plants (pickerelweed, blue flag iris) outperform mechanical filtration alone by consuming nutrients before algae blooms form.
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>❄️ DFW Winter Care</div>
          <div style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            DFW winters are mild — koi rarely require intervention. Water temps stay above 50°F most winters, keeping koi active at reduced metabolism. During rare hard freezes (below 25°F): run a de-icer or pond heater to keep a hole in ice for gas exchange. Do not feed koi below 50°F water temp. Ice rarely exceeds 1–2 in in DFW — koi do not need deep winter refuges as in northern climates.
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem' }}>🧮 Koi Pond Recommender</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Available Space (sq ft)</div>
              <input value={space} onChange={e => setSpace(e.target.value)} placeholder="e.g. 400″ style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Planned Fish Count</div>
              <input value={fish} onChange={e => setFish(e.target.value)} placeholder="e.g. 15″ style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Total Budget ($)</div>
              <input value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 25000″ style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 2rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Recommended Pond Size: {result.size}</div>
              <div style={{ color: '#CBD5E1′ }}>Depth: {result.depth}</div>
              <div style={{ color: '#CBD5E1', marginTop: '0.25rem' }}>Filtration: {result.filterCost}</div>
              <div style={{ color: '#CBD5E1', marginTop: '0.25rem' }}>Shade: {result.shade}</div>
              <div style={{ color: '#F5E642', marginTop: '0.5rem', fontWeight: 600 }}>Total Estimate: {result.totalCost}</div>
              <div style={{ color: '#94A3B8', marginTop: '0.5rem', fontSize: '0.85rem' }}>🦅 Predators: {result.predator}</div>
              <div style={{ color: '#94A3B8', marginTop: '0.5rem', fontSize: '0.85rem' }}>📋 Permits: {result.permit}</div>
            </div>
          )}
        </div>

        <div style={{ color: '#475569', textAlign: 'center', fontSize: '0.8rem' }}>ProLnk connects you with DFW koi pond installation pros · prolnk.io</div>
      </div>
    </div>
  );
}
