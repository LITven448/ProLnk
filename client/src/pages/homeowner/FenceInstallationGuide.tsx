import { useState } from 'react';

const materials = [
  { id: 'wood', name: 'Wood Privacy', emoji: '🪵', costLow: 18, costHigh: 28, lifespan: '10–15 yrs', maintenance: 'High', hoa: 'Usually approved', pros: 'Classic DFW look, customizable height/style', cons: 'Warps in DFW clay soil movement, needs staining every 2-3 yrs' },
  { id: 'vinyl', name: 'Vinyl / PVC', emoji: '🤍', costLow: 25, costHigh: 40, lifespan: '20–30 yrs', maintenance: 'Low', hoa: 'HOA check required', pros: 'No rot, no painting, looks new for decades', cons: 'Higher upfront, can crack in extreme cold' },
  { id: 'iron', name: 'Ornamental Iron', emoji: '⚙️', costLow: 30, costHigh: 55, lifespan: '30–50 yrs', maintenance: 'Medium', hoa: 'Often preferred', pros: 'Elegant, long-lasting, great for front yards', cons: 'No privacy, can rust without coating' },
  { id: 'chain', name: 'Chain Link', emoji: '🔗', costLow: 8, costHigh: 18, lifespan: '15–20 yrs', maintenance: 'Low', hoa: 'Often restricted', pros: 'Most affordable, durable, dog-friendly', cons: 'No privacy, less aesthetic appeal' },
];

export default function FenceInstallationGuide() {
  const [linearFt, setLinearFt] = useState('');
  const [material, setMaterial] = useState('wood');
  const [estimate, setEstimate] = useState<null | { low: number; high: number; roiLow: number; roiHigh: number }>(null);

  const calculate = () => {
    const ft = parseFloat(linearFt);
    if (isNaN(ft) || ft <= 0) return;
    const mat = materials.find(m => m.id === material)!;
    const low = Math.round(ft * mat.costLow);
    const high = Math.round(ft * mat.costHigh);
    const roiLow = Math.round(low * 0.5);
    const roiHigh = Math.round(high * 0.65);
    setEstimate({ low, high, roiLow, roiHigh });
  };

  const selected = materials.find(m => m.id === material)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2d4d 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🏡</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '16px 0 8px' }}>DFW Fence Installation Guide</h1>
        <p style={{ color: '#F5E642', fontWeight: 600, fontSize: 16, margin: 0 }}>Materials · Clay Soil Tips · HOA Notes · Cost Estimator</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>⚠️ DFW Clay Soil — The Hidden Fence Killer</h2>
          <p style={{ color: '#b0b8cc', lineHeight: 1.7 }}>
            North Texas black clay soil ("black gumbo") expands when wet and contracts when dry — sometimes shifting 2–3 inches seasonally. This movement is the #1 cause of leaning, cracked, and failed fences in DFW. Best practice: concrete posts set 18–24 inches deep (below the active clay zone), spaced no more than 8 feet apart. Cedar and pressure-treated pine handle movement better than untreated wood.
          </p>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>🏘️ HOA Restrictions — Know Before You Build</h2>
          <div style={{ background: '#111f3a', borderRadius: 12, padding: 22, border: '1px solid #1e3a5f' }}>
            <p style={{ color: '#b0b8cc', lineHeight: 1.7, margin: '0 0 12px' }}>
              An estimated 65% of DFW homes are in HOA communities. Before pulling permits or buying materials:
            </p>
            <div style={{ display: 'grid', gap: 8 }}>
              {['Get written HOA approval — verbal is not enough', 'Check approved material list (many HOAs ban chain link)', 'Confirm max fence height (6 ft is typical; 8 ft often banned)', 'Front yard fences often require different style than back', 'Stain/paint color may need approval', 'Survey your property line — build inside it by 6 inches'].map(item => (
                <div key={item} style={{ display: 'flex', gap: 10, color: '#b0b8cc', fontSize: 14 }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span> {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Material Comparison</h2>
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {materials.map(m => (
              <div key={m.id} style={{ background: '#111f3a', borderRadius: 12, padding: 22, border: '1px solid #1e3a5f' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{m.emoji}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{m.name}</h3>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>${m.costLow}–${m.costHigh}/linear ft</div>
                <div style={{ color: '#8a9ab5', fontSize: 12, marginBottom: 4 }}>⏱ {m.lifespan}</div>
                <div style={{ color: '#8a9ab5', fontSize: 12, marginBottom: 10 }}>🔧 Maintenance: {m.maintenance}</div>
                <div style={{ color: '#6bcf8a', fontSize: 13, marginBottom: 4 }}>✅ {m.pros}</div>
                <div style={{ color: '#e07070', fontSize: 13 }}>❌ {m.cons}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>💰 Cost Per Linear Foot — DFW Installed Prices</h2>
          <div style={{ background: '#111f3a', borderRadius: 12, overflow: 'hidden', border: '1px solid #1e3a5f' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '160px 130px 130px 1fr', gap: 12, padding: '12px 20px', background: '#0d1930', color: '#F5E642', fontWeight: 700, fontSize: 14 }}>
              <span>Material</span><span>Low</span><span>High</span><span>Notes</span>
            </div>
            {materials.map((m, i) => (
              <div key={m.id} style={{ display: 'grid', gridTemplateColumns: '160px 130px 130px 1fr', gap: 12, padding: '14px 20px', background: i % 2 === 0 ? 'transparent' : '#0d1930', borderTop: '1px solid #1e3a5f' }}>
                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>{m.emoji} {m.name}</span>
                <span style={{ color: '#6bcf8a' }}>${m.costLow}/ft</span>
                <span style={{ color: '#e07070' }}>${m.costHigh}/ft</span>
                <span style={{ color: '#8a9ab5', fontSize: 13 }}>{m.hoa}</span>
              </div>
            ))}
          </div>
          <p style={{ color: '#6a7a95', fontSize: 13, marginTop: 8 }}>* Prices include labor, posts, concrete, and materials. Gates add $200–$600 each.</p>
        </section>

        <section style={{ marginTop: 48, background: '#111f3a', borderRadius: 16, padding: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>🧮 Fence Cost Estimator</h2>
          <p style={{ color: '#8a9ab5', marginBottom: 28 }}>Get an instant cost estimate and home value ROI projection.</p>

          <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 15 }}>Fence Length (linear feet)</label>
              <input
                type="number"
                value={linearFt}
                onChange={e => { setLinearFt(e.target.value); setEstimate(null); }}
                placeholder="e.g. 150"
                style={{ background: '#0A1628', border: '1px solid #2a4a7a', color: '#fff', borderRadius: 8, padding: '12px 16px', fontSize: 16, width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 15 }}>Material Type</label>
              <select
                value={material}
                onChange={e => { setMaterial(e.target.value); setEstimate(null); }}
                style={{ background: '#0A1628', border: '1px solid #2a4a7a', color: '#fff', borderRadius: 8, padding: '12px 16px', fontSize: 16, width: '100%', boxSizing: 'border-box' }}
              >
                {materials.map(m => <option key={m.id} value={m.id}>{m.emoji} {m.name}</option>)}
              </select>
            </div>
          </div>

          {material && (
            <div style={{ background: '#0d1930', borderRadius: 10, padding: 16, marginBottom: 20, border: '1px solid #1e3a5f' }}>
              <span style={{ color: '#8a9ab5', fontSize: 14 }}>Selected: </span>
              <span style={{ fontWeight: 600 }}>{selected.emoji} {selected.name} — </span>
              <span style={{ color: '#F5E642' }}>${selected.costLow}–${selected.costHigh}/ft · {selected.lifespan}</span>
            </div>
          )}

          <button
            onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', padding: '14px 28px', borderRadius: 10, border: 'none', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}
          >
            Calculate Total Cost & ROI →
          </button>

          {estimate && (
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              <div style={{ background: '#0d1930', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #F5E64244' }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642' }}>${estimate.low.toLocaleString()}–${estimate.high.toLocaleString()}</div>
                <div style={{ color: '#8a9ab5', marginTop: 4, fontSize: 14 }}>Total Project Cost</div>
              </div>
              <div style={{ background: '#0d1930', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #6bcf8a44' }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#6bcf8a' }}>${estimate.roiLow.toLocaleString()}–${estimate.roiHigh.toLocaleString()}</div>
                <div style={{ color: '#8a9ab5', marginTop: 4, fontSize: 14 }}>Estimated Home Value Added</div>
              </div>
            </div>
          )}
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>🔧 DFW Installation Best Practices</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {['Call 811 before any digging — Texas requires it by law', 'Set posts in concrete at least 18–24 inches deep (below clay zone)', 'Space posts no more than 8 ft apart in DFW clay soil', 'Allow concrete to cure 48 hours before attaching panels', 'Use cedar or pressure-treated pine for ground-contact pieces', 'Apply wood preservative or stain within 60 days of install', 'Install a pressure-relief gap at bottom for water drainage'].map(item => (
              <div key={item} style={{ background: '#111f3a', borderRadius: 8, padding: '14px 20px', color: '#b0b8cc', display: 'flex', gap: 12, alignItems: 'center', border: '1px solid #1e3a5f' }}>
                <span style={{ color: '#F5E642' }}>✓</span> {item}
              </div>
            ))}
          </div>
        </section>

        <div style={{ marginTop: 48, background: 'linear-gradient(135deg, #F5E642 0%, #e8d800 100%)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Get Free Fence Quotes in DFW</h3>
          <p style={{ color: '#0A1628', marginBottom: 0, fontWeight: 500 }}>ProLnk connects you with licensed DFW fence contractors who know clay soil and HOA requirements.</p>
        </div>
      </div>
    </div>
  );
}
