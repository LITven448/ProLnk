import { useState } from 'react';

const projectTypes = [
  { label: 'Custom Driveway Gate', base: 3500, material: { steel: 0, iron: 800, aluminum: -500 }, permit: true, lead: '2–4 weeks' },
  { label: 'Iron Fence Repair', base: 450, material: { steel: 0, iron: 100, aluminum: -50 }, permit: false, lead: '3–7 days' },
  { label: 'Ornamental Metalwork', base: 1200, material: { steel: 0, iron: 400, aluminum: -200 }, permit: false, lead: '1–3 weeks' },
  { label: 'Carport Fabrication', base: 4200, material: { steel: 0, iron: 600, aluminum: -800 }, permit: true, lead: '3–6 weeks' },
  { label: 'Trailer Repair', base: 650, material: { steel: 0, iron: 0, aluminum: -100 }, permit: false, lead: '1–5 days' },
];

const materials = ['steel', 'iron', 'aluminum'];

export default function DFWWelderGuide() {
  const [projectIdx, setProjectIdx] = useState(0);
  const [material, setMaterial] = useState('steel');
  const [result, setResult] = useState<null | { cost: string; lead: string; permit: boolean }>(null);

  function estimate() {
    const p = projectTypes[projectIdx];
    const adj = p.material[material as keyof typeof p.material] ?? 0;
    const low = p.base + adj;
    const high = Math.round(low * 1.45);
    setResult({ cost: `$${low.toLocaleString()} – $${high.toLocaleString()}`, lead: p.lead, permit: p.permit });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '0′ }}>
      <div style={{ background: 'linear-gradient(135deg,#0A1628 60%,#122040)', padding: '48px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🔩</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>DFW Welder & Metal Fab Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>Custom gates, iron fences, carports, and ornamental metalwork — what to expect in the Dallas-Fort Worth market.</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 32 }}>
          {[['🚪','Custom Gates','Driveway and entry gates fabricated on-site or in-shop; DFW standard is 10–16 ft double swing'],['🔧','Fence Repair','Ornamental iron repairs, welding broken pickets, rust treatment before DFW rain season'],['🛖','Carports','Steel carport kits vs custom fab; custom adds 40–60% but matches home style'],['🚛','Trailer Repair','Frame cracks, hitch welds, floor replacement — common with DFW ranch/ag use']].map(([ic,t,d])=>(
            <div key={t} style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28 }}>{ic}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 8 }}>{t}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>⚙️ Welder vs. Handyman — Know the Difference</h2>
          {[['Certified welder required','Structural welds, gates with motor operators, load-bearing carports, trailer frames'],['Handyman sufficient','Decorative hooks, light fence patching, non-structural metal assembly'],['Always get a welder','Anything requiring a permit, any weld exposed to vehicle traffic or high wind load']].map(([h,d])=>(
            <div key={h} style={{ borderLeft: '3px solid #F5E642', paddingLeft: 14, marginBottom: 14 }}>
              <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{h}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🏙️ Finding Licensed Welders in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
            {[['✅ AWS Certified','American Welding Society cert — ask for card'],['✅ Insured $1M+','General liability required for any gate/structural work'],['✅ Local References','DFW projects in last 12 months — verify addresses'],['⚠️ No door-knockers','Legitimate welders don\’t solicit door-to-door in DFW']].map(([t,d])=>(
              <div key={t} style={{ background: '#122040', borderRadius: 10, padding: 14 }}>
                <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: 13 }}>{t}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg,#0f1f3d,#122040)', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🧮 Project Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Project Type</label>
              <select value={projectIdx} onChange={e=>setProjectIdx(Number(e.target.value))} style={{ width: '100%', background: '#0A1628', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 14 }}>
                {projectTypes.map((p,i)=><option key={i} value={i}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Primary Material</label>
              <select value={material} onChange={e=>setMaterial(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 14 }}>
                {materials.map(m=><option key={m} value={m}>{m.charAt(0).toUpperCase()+m.slice(1)}</option>)}
              </select>
            </div>
          </div>
          <button onClick={estimate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get Estimate</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, textAlign: 'center' }}>
                <div><div style={{ color: '#94a3b8', fontSize: 12 }}>Est. Cost</div><div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>{result.cost}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: 12 }}>Lead Time</div><div style={{ color: '#e2e8f0', fontSize: 18, fontWeight: 700 }}>{result.lead}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: 12 }}>Permit Req.</div><div style={{ fontSize: 18, fontWeight: 700, color: result.permit ? '#ef4444′ : '#22c55e' }}>{result.permit ? '⚠️ Yes' : '✅ No'}</div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
