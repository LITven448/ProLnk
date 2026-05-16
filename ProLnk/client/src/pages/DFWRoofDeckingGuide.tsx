import { useState } from 'react';

const deckingMaterials = [
  { name: 'OSB (Oriented Strand Board)', pros: 'Lower cost, standard in DFW new builds since 1990s', cons: 'Swells if moisture-exposed, hail damage shows as delamination', hailRisk: 'high' },
  { name: 'Plywood', pros: 'Superior moisture resistance, holds nails better, durable', cons: 'Higher cost, less common in newer DFW builds', hailRisk: 'medium' },
];

export default function DFWRoofDeckingGuide() {
  const [roofAge, setRoofAge] = useState('');
  const [hailHistory, setHailHistory] = useState('none');
  const [material, setMaterial] = useState('OSB (Oriented Strand Board)');
  const [result, setResult] = useState<null | { likelihood: string; action: string; cost: string; inspectNow: boolean }>(null);

  function assess() {
    const age = parseFloat(roofAge);
    if (!age) return;
    const oldRoof = age > 15;
    const hailDamage = hailHistory !== 'none';
    const isOSB = material.includes('OSB');
    let likelihood = '';
    let action = '';
    let cost = '';
    let inspectNow = false;

    if (hailDamage && isOSB) {
      likelihood = 'HIGH — OSB decking with hail history frequently requires partial or full replacement';
      action = 'Get a licensed DFW roofer to inspect decking during next storm cycle. Look for soft spots, delamination, and punctures. File insurance claim if storm occurred within 12 months.';
      cost = 'Partial decking (5–10 sheets): $300–$700. Full replacement (typical DFW home): $2,500–$5,000 on top of shingle cost.';
      inspectNow = true;
    } else if (hailDamage && !isOSB) {
      likelihood = 'MODERATE — Plywood is more hail-resistant but large hail (2"+) can still cause damage';
      action = 'Inspect attic for light penetration and soft spots after major hail events. Plywood typically shows cracking rather than delamination.';
      cost = 'Spot repair: $150–$400 per damaged section. Likely partial replacement only.';
      inspectNow = true;
    } else if (oldRoof && isOSB) {
      likelihood = 'MODERATE — OSB decking over 15 years in DFW humidity cycles may show edge swelling or nail pull-through';
      action = 'Inspect attic edges and nail rows during roof replacement quote. Replacing proactively at re-roof time is far cheaper than post-install fixes.';
      cost = 'Full decking replacement during re-roof adds $1,500–$3,500 — negotiate during re-roof bid.';
      inspectNow = false;
    } else {
      likelihood = 'LOW — No major risk factors identified';
      action = 'Standard inspection at re-roof time. Have roofer walk decking and check for soft spots before installing new shingles.';
      cost = 'Spot replacement only if needed: $150–$600.';
      inspectNow = false;
    }
    setResult({ likelihood, action, cost, inspectNow });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0D1F3C', padding: '48px 24px 36px', borderBottom: '3px solid #F5E642' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔨</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Roof Decking Guide</h1>
          <p style={{ fontSize: 16, color: '#9BA8C0', margin: 0 }}>
            Roof decking is the foundation under your shingles. DFW's hail storms and humidity cycles are hard on decking — especially OSB which dominates post-1990 DFW construction.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 16px' }}>🏗️ OSB vs Plywood in DFW</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {deckingMaterials.map(mat => (
              <div key={mat.name} style={{ background: '#162040', borderRadius: 10, padding: '16px 18px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{mat.name}</div>
                <div style={{ color: '#9BA8C0', fontSize: 13, marginBottom: 6 }}>✅ {mat.pros}</div>
                <div style={{ color: '#9BA8C0', fontSize: 13, marginBottom: 6 }}>⚠️ {mat.cons}</div>
                <div style={{ color: mat.hailRisk === 'high' ? '#F5A623' : '#7AB8A0', fontSize: 12, fontWeight: 700 }}>
                  DFW Hail Risk: {mat.hailRisk.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 16px' }}>🌩️ When DFW Decking Needs Replacement</h2>
          <ul style={{ color: '#9BA8C0', lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li><strong style={{ color: '#E8EAF0' }}>Always replace:</strong> Visible punctures, delamination, or soft spots found during inspection</li>
            <li><strong style={{ color: '#E8EAF0' }}>Replace if:</strong> Hail 2"+ diameter impacted OSB decking — even without visible shingle damage</li>
            <li><strong style={{ color: '#E8EAF0' }}>Partial vs full:</strong> Less than 20% damaged = spot replace; more than 20% = full deck consideration</li>
            <li><strong style={{ color: '#E8EAF0' }}>Insurance tip:</strong> DFW hail claims often include decking — document before and after with photos</li>
            <li><strong style={{ color: '#E8EAF0' }}>Upgrade opportunity:</strong> Switch OSB to plywood during full re-roof for $800–$1,500 premium</li>
          </ul>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 20px' }}>🔧 Decking Assessment Tool</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#9BA8C0', fontSize: 13, display: 'block', marginBottom: 6 }}>Roof Age (years)</label>
              <input type="number" value={roofAge} onChange={e => setRoofAge(e.target.value)} placeholder="e.g. 12"
                style={{ width: '100%', padding: '10px 14px', background: '#162040', border: '1px solid #2A3F6F', borderRadius: 8, color: '#E8EAF0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#9BA8C0', fontSize: 13, display: 'block', marginBottom: 6 }}>Hail History (DFW hail events since roof installed)</label>
              <select value={hailHistory} onChange={e => setHailHistory(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#162040', border: '1px solid #2A3F6F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
                <option value="none">None known</option>
                <option value="small">Small hail (under 1")</option>
                <option value="large">Large hail (1"–2")</option>
                <option value="severe">Severe hail (2"+)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#9BA8C0', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Decking Material</label>
              <select value={material} onChange={e => setMaterial(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#162040', border: '1px solid #2A3F6F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
                {deckingMaterials.map(m => <option key={m.name}>{m.name}</option>)}
                <option>Unknown</option>
              </select>
            </div>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Assess My Decking
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#162040', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              {result.inspectNow && <div style={{ background: '#F5A623', color: '#0A1628', borderRadius: 6, padding: '6px 12px', fontSize: 13, fontWeight: 700, display: 'inline-block', marginBottom: 10 }}>🔍 Inspection Recommended Now</div>}
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Replacement Likelihood: {result.likelihood}</div>
              <div style={{ color: '#E8EAF0', marginBottom: 8 }}>{result.action}</div>
              <div style={{ color: '#9BA8C0', fontSize: 14 }}>💰 {result.cost}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
