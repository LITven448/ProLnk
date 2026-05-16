import { useState } from 'react';

const surfaces = ['Garage Floor', 'Driveway', 'Pool Deck', 'Patio', 'Commercial Floor'];
const useCases = ['Light foot traffic', 'Vehicle traffic', 'Pool/wet area', 'Heavy equipment'];

const coatingMap: Record<string, { type: string; durability: number; costLow: number; costHigh: number; note: string }> = {
  'Garage Floor_Light foot traffic': { type: 'Epoxy', durability: 3, costLow: 3, costHigh: 5, note: 'Adequate for low-use garages; avoid in DFW heat if cars park hot.' },
  'Garage Floor_Vehicle traffic': { type: 'Polyaspartic', durability: 5, costLow: 5, costHigh: 8, note: 'Best for DFW. UV-stable, no hot-tire lift, cures same day.' },
  'Driveway_Vehicle traffic': { type: 'Polyaspartic', durability: 5, costLow: 6, costHigh: 10, note: 'Only coating rated for DFW sun + heat cycling on driveways.' },
  'Driveway_Light foot traffic': { type: 'Polyurea', durability: 4, costLow: 4, costHigh: 7, note: 'Good mid-range option for sealed decorative driveways.' },
  'Pool Deck_Pool/wet area': { type: 'Polyaspartic', durability: 5, costLow: 5, costHigh: 9, note: 'Anti-slip additive required. Resists DFW summer UV extremely well.' },
  'Patio_Light foot traffic': { type: 'Polyurea', durability: 4, costLow: 3, costHigh: 6, note: 'Good balance of price and DFW climate performance for patios.' },
  'Commercial Floor_Heavy equipment': { type: 'Industrial Epoxy', durability: 4, costLow: 4, costHigh: 7, note: 'Thicker mil application needed; temp-control environment preferred.' },
};

function getCoating(surface: string, use: string) {
  return coatingMap[`${surface}_${use}`] || { type: 'Polyaspartic', durability: 4, costLow: 5, costHigh: 8, note: 'Polyaspartic recommended as the safest default for DFW climate.' };
}

export default function DFWConcreteCoatingGuide() {
  const [surface, setSurface] = useState(surfaces[0]);
  const [useCase, setUseCase] = useState(useCases[0]);
  const [sqft, setSqft] = useState(500);
  const [result, setResult] = useState<null | ReturnType<typeof getCoating> & { total: string }>(null);

  function estimate() {
    const c = getCoating(surface, useCase);
    const low = (c.costLow * sqft).toLocaleString();
    const high = (c.costHigh * sqft).toLocaleString();
    setResult({ ...c, total: `$${low} – $${high}` });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg,#0A1628 60%,#122040)', padding: '48px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>DFW Concrete Coating Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>Epoxy vs Polyurea vs Polyaspartic — what DFW heat, humidity, and UV actually demand for your surface.</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 28 }}>
          {[['🟡','Epoxy','Cheapest. Hot-tire-lift risk in DFW summers. Yellows under UV. Best in climate-controlled spaces only.'],['🔵','Polyurea','Mid-range. More flexible than epoxy. Better UV resistance. Good for patios and low-traffic areas.'],['🟢','Polyaspartic','Premium. No hot-tire-lift. UV-stable. Cures in hours even in DFW heat. Best overall for DFW.']].map(([ic,t,d])=>(
            <div key={t} style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28 }}>{ic}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 8 }}>{t}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>⚠️ DFW Climate Factors</h2>
          {[['Surface Prep is Critical','DFW humidity causes adhesion failures if concrete moisture > 4%. Always test before coating.'],['Hot-Tire Lift','DFW summers mean hot tires on garage floors. Epoxy softens and pulls up. Polyaspartic does not.'],['UV Exposure','DFW gets 230+ sunny days/year. UV-stable coatings (polyaspartic) last 2–3× longer on pool decks and driveways.'],['Warranty Read-Through','Most epoxy warranties void above 85°F application temp — nearly all DFW summers exceed this.']].map(([h,d])=>(
            <div key={h} style={{ borderLeft: '3px solid #F5E642', paddingLeft: 14, marginBottom: 14 }}>
              <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{h}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg,#0f1f3d,#122040)', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🧮 Coating Recommender</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 18 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Surface Type</label>
              <select value={surface} onChange={e=>setSurface(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 13 }}>
                {surfaces.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Primary Use</label>
              <select value={useCase} onChange={e=>setUseCase(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 13 }}>
                {useCases.map(u=><option key={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Square Footage</label>
              <input type="number" value={sqft} min={100} max={10000} onChange={e=>setSqft(Number(e.target.value))} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 13, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={estimate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, textAlign: 'center', marginBottom: 14 }}>
                <div><div style={{ color: '#94a3b8', fontSize: 12 }}>Recommended</div><div style={{ color: '#F5E642', fontSize: 18, fontWeight: 800 }}>{result.type}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: 12 }}>Total Cost</div><div style={{ color: '#e2e8f0', fontSize: 16, fontWeight: 700 }}>{result.total}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: 12 }}>DFW Durability</div><div style={{ color: '#F5E642', fontSize: 18 }}>{'★'.repeat(result.durability)}{'☆'.repeat(5-result.durability)}</div></div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13, borderTop: '1px solid #1e3a5f', paddingTop: 12 }}>{result.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
