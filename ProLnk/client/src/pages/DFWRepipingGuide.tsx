import { useState } from 'react';

const PIPE_MATERIALS = [
  { value: 'galvanized', label: '🔩 Galvanized Steel (pre-1970)', urgencyBase: 9, description: 'Corrodes from inside out. After 50+ years, interior rust narrows flow and contaminates water.' },
  { value: 'polybutylene', label: '⚠️ Polybutylene / PB (1978–1995)', urgencyBase: 10, description: 'Class action recalled material. Chlorine in DFW water accelerates degradation at fittings.' },
  { value: 'cpvc', label: '🟡 CPVC (1970s–2000s)', urgencyBase: 5, description: 'Becomes brittle with age. DFW thermal expansion cycles crack fittings after 25–30 years.' },
  { value: 'copper', label: '🟤 Copper', urgencyBase: 2, description: 'Durable but DFW hard water causes pinhole leaks after 40–50 years. Still good if under 30 yrs.' },
  { value: 'pex', label: '✅ PEX (2000s–present)', urgencyBase: 0, description: 'Best choice for DFW. Flexible, handles expansion/contraction, resists hard water scale.' },
  { value: 'unknown', label: '❓ Unknown', urgencyBase: 6, description: 'Inspection recommended. Homes built before 2000 commonly have problematic materials.' },
];

const SYMPTOMS_LIST = [
  { id: 'multiLeak', label: 'Multiple leaks in past 2 years', points: 3 },
  { id: 'discolor', label: 'Discolored or rust-tinted water', points: 3 },
  { id: 'lowFlow', label: 'Low water pressure throughout home', points: 2 },
  { id: 'taste', label: 'Metallic taste in tap water', points: 2 },
  { id: 'visible', label: 'Visible corrosion on exposed pipes', points: 2 },
  { id: 'age30', label: 'Home is 30+ years old', points: 1 },
];

function getUrgencyLabel(score: number) {
  if (score >= 10) return { label: 'REPLACE IMMEDIATELY', color: '#FF4444', action: 'Polybutylene is a liability. Replacement should be scheduled within 30 days.' };
  if (score >= 7) return { label: 'HIGH URGENCY', color: '#FF8800', action: 'Major repipe recommended. Each additional leak costs more than proactive replacement.' };
  if (score >= 4) return { label: 'MODERATE — PLAN AHEAD', color: '#F5E642', action: 'Budget for repipe within 2–3 years. Inspect exposed pipes annually.' };
  return { label: 'MONITOR', color: '#4ECDC4', action: 'No immediate action needed. Address leaks as they occur. Re-evaluate in 5 years.' };
}

function getCostEstimate(sqft: number) {
  const pexPerSqft = sqft < 1500 ? 5.5 : sqft < 2500 ? 4.8 : 4.2;
  const copperPerSqft = pexPerSqft * 1.4;
  return {
    pex: { low: Math.round(sqft * pexPerSqft * 0.85), high: Math.round(sqft * pexPerSqft * 1.15) },
    copper: { low: Math.round(sqft * copperPerSqft * 0.85), high: Math.round(sqft * copperPerSqft * 1.15) },
  };
}

export default function DFWRepipingGuide() {
  const [material, setMaterial] = useState('');
  const [age, setAge] = useState('');
  const [sqft, setSqft] = useState('');
  const [symptoms, setSymptoms] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState(false);

  const toggleSymptom = (id: string) => {
    const next = new Set(symptoms);
    next.has(id) ? next.delete(id) : next.add(id);
    setSymptoms(next);
    setShowResult(false);
  };

  const materialData = PIPE_MATERIALS.find(p => p.value === material);
  const symptomScore = [...symptoms].reduce((acc, id) => acc + (SYMPTOMS_LIST.find(s => s.id === id)?.points ?? 0), 0);
  const totalScore = (materialData?.urgencyBase ?? 0) + symptomScore;
  const urgency = getUrgencyLabel(totalScore);
  const sqftNum = parseInt(sqft) || 2000;
  const costs = getCostEstimate(sqftNum);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 40px', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>🔧 DFW WHOLE-HOME REPIPING</div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.15 }}>Complete Repiping Guide<br /><span style={{ color: '#F5E642′ }}>for DFW Homes</span></h1>
          <p style={{ fontSize: 16, color: '#8BA3C7', maxWidth: 620, margin: 0 }}>DFW has one of the highest rates of problematic pipe materials in Texas. Polybutylene plastic, aging galvanized steel, and stressed CPVC are ticking timebombs — especially in DFW's thermal cycling climate.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>⚠️ Problem Pipe Materials in DFW</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {PIPE_MATERIALS.slice(0, 4).map(p => (
              <div key={p.value} style={{ background: '#112240', border: `1px solid ${p.urgencyBase >= 9 ? '#FF4444' : p.urgencyBase >= 5 ? '#FF8800' : '#1E3A5F'}`, borderRadius: 10, padding: 18 }}>
                <div style={{ fontWeight: 800, color: p.urgencyBase >= 9 ? '#FF4444′ : p.urgencyBase >= 5 ? '#F5E642' : '#E8EDF5', marginBottom: 6, fontSize: 15 }}>{p.label}</div>
                <div style={{ color: '#8BA3C7', fontSize: 14, lineHeight: 1.6 }}>{p.description}</div>
                {p.urgencyBase >= 9 && <div style={{ marginTop: 8, background: '#FF444420', border: '1px solid #FF4444', borderRadius: 6, padding: '6px 12px', fontSize: 13, color: '#FF8888′ }}>🚨 High replacement priority in DFW</div>}
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>🔬 Copper vs PEX for DFW Homes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { name: 'PEX', emoji: '✅', pros: ['Flexible — handles DFW expansion/contraction', 'Resists hard water scale better than copper', '20–25% lower installed cost', 'No soldering — faster installation', '50-year lifespan in DFW conditions'], cons: ['Cannot be used outdoors (UV degrades)', 'Some municipalities restrict in hot water solar systems'], verdict: 'Best choice for DFW full repipes', color: '#4ECDC4′ },
              { name: 'Copper', emoji: '🟤', pros: ['Proven 50+ year track record', 'Fully recyclable', 'Works with solar thermal systems', 'Some homebuyers prefer it'], cons: ['DFW hard water causes pinhole leaks after 40 yrs', '40% higher material + labor cost', 'Thermal expansion stresses joints over time', 'Requires skilled soldering'], verdict: 'Good but pricier — PEX preferred for DFW', color: '#F5E642′ },
            ].map(item => (
              <div key={item.name} style={{ background: '#112240', border: `2px solid ${item.color}`, borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: item.color, marginBottom: 12 }}>{item.emoji} {item.name}</div>
                <div style={{ marginBottom: 10 }}>
                  {item.pros.map((p, i) => <div key={i} style={{ color: '#C0D0E8', fontSize: 13, marginBottom: 4 }}>✓ {p}</div>)}
                </div>
                <div style={{ marginBottom: 12 }}>
                  {item.cons.map((c, i) => <div key={i} style={{ color: '#8BA3C7', fontSize: 13, marginBottom: 4 }}>✗ {c}</div>)}
                </div>
                <div style={{ background: '#0A1628', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: item.color, fontWeight: 700 }}>{item.verdict}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40, background: '#112240', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 20 }}>🧮 Repipe Urgency & Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#8BA3C7', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>CURRENT PIPE MATERIAL</label>
              <select value={material} onChange={e => { setMaterial(e.target.value); setShowResult(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="">Select material...</option>
                {PIPE_MATERIALS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8BA3C7', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>HOME SQUARE FOOTAGE</label>
              <input type="number" placeholder="e.g. 2200″ value={sqft} onChange={e => { setSqft(e.target.value); setShowResult(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#8BA3C7', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 10 }}>SYMPTOMS (CHECK ALL THAT APPLY)</label>
            <div style={{ display: 'grid', gap: 8 }}>
              {SYMPTOMS_LIST.map(s => (
                <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', background: symptoms.has(s.id) ? '#0D2B4E' : '#0A1628', border: `1px solid ${symptoms.has(s.id) ? '#F5E642' : '#1E3A5F'}`, borderRadius: 8, padding: '10px 14px' }}>
                  <input type="checkbox" checked={symptoms.has(s.id)} onChange={() => toggleSymptom(s.id)} style={{ accentColor: '#F5E642′ }} />
                  <span style={{ color: '#C0D0E8', fontSize: 14 }}>{s.label}</span>
                </label>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!material} style={{ background: material ? '#F5E642′ : '#1E3A5F', color: '#0A1628', border: ’none', borderRadius: 8, padding: '13px 28px', fontWeight: 800, fontSize: 15, cursor: material ? 'pointer' : 'not-allowed', width: '100%', marginBottom: 20 }}>
            Get My Urgency Score + Cost Estimate
          </button>
          {showResult && material && (
            <div style={{ display: 'grid', gap: 14 }}>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${urgency.color}` }}>
                <div style={{ fontSize: 12, color: '#8BA3C7', marginBottom: 4 }}>URGENCY SCORE: {totalScore}/15</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: urgency.color, marginBottom: 8 }}>{urgency.label}</div>
                <div style={{ color: '#C0D0E8', fontSize: 14, lineHeight: 1.6 }}>{urgency.action}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { label: 'PEX Repipe', range: `$${costs.pex.low.toLocaleString()} – $${costs.pex.high.toLocaleString()}`, note: 'Recommended for DFW', color: '#4ECDC4′ },
                  { label: 'Copper Repipe', range: `$${costs.copper.low.toLocaleString()} – $${costs.copper.high.toLocaleString()}`, note: 'Premium option', color: '#F5E642′ },
                ].map(c => (
                  <div key={c.label} style={{ background: '#0D1B2E', border: `1px solid ${c.color}`, borderRadius: 10, padding: 16, textAlign: 'center' }}>
                    <div style={{ color: c.color, fontWeight: 800, marginBottom: 6 }}>{c.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: '#E8EDF5', marginBottom: 4 }}>{c.range}</div>
                    <div style={{ color: '#8BA3C7', fontSize: 12 }}>for {sqftNum.toLocaleString()} sq ft • {c.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <div style={{ marginTop: 40, background: '#F5E642', borderRadius: 12, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#0A1628', marginBottom: 8 }}>Get Free Repiping Quotes from DFW Pros</div>
          <p style={{ color: '#112240', margin: '0 0 16px' }}>Licensed DFW plumbers will inspect your pipes and provide a detailed scope and price — no obligation.</p>
          <div style={{ background: '#0A1628', color: '#F5E642', display: 'inline-block', padding: '14px 32px', borderRadius: 8, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Request Repipe Quotes →</div>
        </div>
      </div>
    </div>
  );
}
