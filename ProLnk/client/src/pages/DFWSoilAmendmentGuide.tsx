import { useState } from 'react';

const soilProblems = ['Compacted / Rock Hard', 'Drains Too Slowly', 'Plants Always Yellow', 'Cracks When Dry', 'Poor Plant Survival', 'High Salinity'];
const intendedUses = ['Vegetable Garden', 'Lawn / Turfgrass', 'Landscape Beds', 'Flower Garden', 'Native Plants'];

const amendments = [
  { name: 'Compost', emoji: '♻️', rating: 'Best Overall', cost: '$30–45/cubic yard bulk', desc: 'The #1 amendment for DFW clay soil. Improves drainage, adds nutrients, feeds soil biology. Can never apply too much.', rate: '3–4 inches tilled in for new beds. 1-inch topdressing annually for lawns.', timing: 'Fall is ideal in DFW — compost over winter, plant in spring. Spring also fine.', uses: ['Vegetable Garden', 'Landscape Beds', 'Flower Garden'] },
  { name: 'Expanded Shale', emoji: '🪨', rating: 'Best for Permanent Fix', cost: '$35–55/cubic yard', desc: 'Permanently opens clay structure — unlike organic matter, it never decomposes. DFW landscape contractors use it for permanent drainage fixes.', rate: '3–4 inches tilled in 8–10 inches deep. Mix 1:1:1 with native soil and compost for raised beds.', timing: 'Any time of year. Best when incorporated before planting.', uses: ['Vegetable Garden', 'Lawn / Turfgrass', 'Landscape Beds', 'Native Plants'] },
  { name: 'Gypite (Calcium Sulfate)', emoji: '🧪', rating: 'Best for Salinity', cost: '$15–25/50 lb bag', desc: 'Helps break up compaction by replacing sodium with calcium. Best for DFW soils with high salt content from years of treated city water.', rate: '40 lbs per 1,000 sq ft for lawns. 20 lbs per 100 sq ft for beds. Water in well.', timing: 'Spring or fall. Avoid applying in extreme heat.', uses: ['Lawn / Turfgrass', 'Vegetable Garden', 'High Salinity'] },
  { name: 'Decomposed Granite (DG)', emoji: '⚪', rating: 'Best for Pathways/Xeric Areas', cost: '$1.50–2.50/sq ft installed', desc: 'Not a soil amendment per se — but as a mulch alternative in DFW xeriscaping, DG suppresses weeds, drains fast, and looks clean.', rate: '3–4 inch layer over landscape fabric. Steel edging required.', timing: 'Any time of year.', uses: ['Native Plants', 'Landscape Beds'] },
];

export default function DFWSoilAmendmentGuide() {
  const [problem, setProblem] = useState('');
  const [useCase, setUseCase] = useState('');
  const [showResults, setShowResults] = useState(false);

  function getRecommendations() {
    return amendments.filter(a => {
      if (useCase && !a.uses.includes(useCase) && useCase !== 'High Salinity') return false;
      if (problem === 'High Salinity') return a.name === 'Gypite (Calcium Sulfate)';
      if (problem === 'Drains Too Slowly') return a.name !== 'Gypite (Calcium Sulfate)' && a.name !== 'Decomposed Granite (DG)';
      return true;
    });
  }

  const results = getRecommendations();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🌱 DFW SOIL GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Soil Amendment Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          DFW sits on expansive black clay — Blackland Prairie soil that shrinks, cracks, and compacts into concrete in drought. With the right amendments, it becomes one of the most productive soils in Texas.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🗺️ Understanding DFW Clay (Blackland Prairie)</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20 }}>
            <li>pH typically 7.5–8.5 (alkaline) — limits iron and micronutrient uptake</li>
            <li>Expands 10–15% when wet, contracts when dry — causes foundation issues</li>
            <li>Compacts under foot traffic and equipment rapidly</li>
            <li>Actually nutrient-rich — amend for structure and drainage, not fertility</li>
            <li>Fall is ideal amendment time: soil is workable, amendments integrate over winter</li>
          </ul>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Find Your Amendment</h2>
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Your soil problem:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {soilProblems.map(p => (
                <button key={p} onClick={() => setProblem(p)} style={{ background: problem === p ? '#F5E642' : '#1e3a5f', color: problem === p ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13 }}>{p}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Intended use:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {intendedUses.map(u => (
                <button key={u} onClick={() => setUseCase(u)} style={{ background: useCase === u ? '#F5E642' : '#1e3a5f', color: useCase === u ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13 }}>{u}</button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResults(true)} disabled={!problem || !useCase} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', opacity: (!problem || !useCase) ? 0.5 : 1 }}>Get Recommendations</button>
        </div>

        {showResults && (
          <div style={{ display: 'grid', gap: 12 }}>
            {results.map(a => (
              <div key={a.name} style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{a.emoji} {a.name}</div>
                  <div style={{ background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 700, borderRadius: 6, padding: '2px 8px' }}>{a.rating}</div>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 12 }}>{a.desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 10 }}>
                    <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>APPLICATION RATE</div>
                    <div style={{ color: '#e2e8f0', fontSize: 13 }}>{a.rate}</div>
                  </div>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 10 }}>
                    <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>BEST TIMING (DFW)</div>
                    <div style={{ color: '#e2e8f0', fontSize: 13 }}>{a.timing}</div>
                  </div>
                </div>
                <div style={{ marginTop: 8, background: '#0A1628', borderRadius: 8, padding: 10 }}>
                  <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>COST</div>
                  <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 600 }}>{a.cost}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
