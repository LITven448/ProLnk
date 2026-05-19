import { useState } from 'react';

type SailPlan = { config: string; mounting: string; cost: string; uv: string; tip: string; anchoring: string };

const sailPlans: Record<string, SailPlan> = {
  'small-low': { config: '1 triangle sail (12×12 ft)', mounting: 'Wall-mount 2 corners + 1 steel post', cost: '$300–$600 installed', uv: '90–95% UV block (darker color)', tip: 'Fastest install option. Overlapping sails create full coverage.', anchoring: '4×4 steel post in concrete footing (24" deep minimum for DFW wind load)' },
  'small-high': { config: '1 triangle sail (12×12 ft) — heavy-duty hardware', mounting: '3 steel posts or wall-mount all corners', cost: '$500–$1,000 installed', uv: '90–95% UV block', tip: 'In DFW wind zones, use turnbuckles for tensioning and remove sail during storm warnings.', anchoring: 'Heavy-gauge galvanized hardware rated for 80+ MPH wind loads' },
  'medium-low': { config: '2 overlapping triangles or 1 rectangle (14×18 ft)', mounting: '3–4 steel posts or mixed wall/post', cost: '$700–$1,400 installed', uv: '90–95% UV block', tip: 'Rectangle sails cover more area with less hardware. Overlap triangles for flexible configurations.', anchoring: '4" steel posts, minimum 30" concrete footing per DFW soil conditions' },
  'medium-high': { config: '2 overlapping triangles + heavy tensioning system', mounting: '4 steel posts (engineered for DFW wind)', cost: '$1,200–$2,200 installed', uv: '95%+ UV block (HDPE fabric)', tip: 'Get post footings engineered if on expansive clay — DFW soil movement can loosen footings over time.', anchoring: 'Engineer-specified footings for DFW clay expansion. Critical.' },
  'large-low': { config: '3+ triangles or 2 rectangles — modular system', mounting: '5–8 posts or structure attachment points', cost: '$1,500–$3,000 installed', uv: '90–95% UV block', tip: 'Modular design lets you adjust coverage seasonally. Remove panels you don\’t need in winter.', anchoring: 'Professional layout required for multi-sail post placement to maintain equal tension' },
  'large-high': { config: 'Full engineered shade system — multiple sails with shared posts', mounting: 'Structural engineering required', cost: '$3,000–$7,000 installed', uv: '95%+ UV block', tip: 'At this scale, consider a permanent pergola with shade fabric — often similar cost with more structure.', anchoring: 'Engineered post system with DFW wind load calculations (90 MPH design load)' },
};

export default function DFWShadeSailGuide() {
  const [size, setSize] = useState('medium');
  const [wind, setWind] = useState('high');
  const [showPlan, setShowPlan] = useState(false);

  const key = `${size}-${wind}` as keyof typeof sailPlans;
  const plan = sailPlans[key];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          ⛵ DFW SHADE SAIL GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Shade Sails for DFW Outdoor Spaces</h1>
        <p style={{ color: '#94A3B8', marginBottom: 8 }}>
          Faster and cheaper than a pergola, shade sails give you flexible coverage. But in DFW's severe storm environment, proper anchoring isn't optional.
        </p>
        <div style={{ background: '#7F1D1D', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: 28, border: '1px solid #EF4444' }}>
          <span style={{ color: '#FCA5A5', fontWeight: 700 }}>⚠️ DFW Wind Warning: </span>
          <span style={{ color: '#FCA5A5', fontSize: 14 }}>Unsecured or improperly anchored shade sails become projectiles in DFW thunderstorms. Proper post depth and hardware is critical.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '⚡', title: 'vs. Pergola', desc: 'Shade sails: 50–70% less cost, faster install, adjustable. Pergola: permanent, can add fans/lights, higher resale value.' },
            { icon: '🎨', title: 'Color & UV', desc: 'Darker colors (charcoal, navy) block 95%+ UV. Lighter colors let more light through but less UV protection.' },
            { icon: '📐', title: 'Sizing for Max Shade', desc: 'Sail should be 10–20% larger than target area — sails must be tensioned taut, which reduces coverage.' },
            { icon: '🔩', title: 'Hardware Matters', desc: 'Use marine-grade stainless turnbuckles and D-rings. Cheap hardware fails in DFW heat/UV within 2 years.' },
          ].map(p => (
            <div key={p.title} style={{ background: '#1E2D45', borderRadius: 10, padding: '1.2rem' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>🔩 DFW Anchoring Requirements</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Post Mounting</div>
              {['Minimum 24" concrete footing (30" preferred)', 'DFW clay expands — use bell-bottom footing', '4×4 or 4×6 steel post (not wood)', 'Post must extend 8–10 ft above ground', 'Galvanized or powder-coated for weather'].map(t => <div key={t} style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>• {t}</div>)}
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Wall Mounting</div>
              {['Attach to structural member only (stud/joist)', 'Never attach to fascia or trim', 'Stainless eye bolts with backing plates', 'Check with contractor before attaching to house', 'Storm season: remove sail or loosen tension'].map(t => <div key={t} style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>• {t}</div>)}
            </div>
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 Shade Sail Planner</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Space Dimensions</label>
              <select value={size} onChange={e => { setSize(e.target.value); setShowPlan(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #2D3F5C', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="small">Small (up to 150 sq ft)</option>
                <option value="medium">Medium (150–400 sq ft)</option>
                <option value="large">Large (400+ sq ft)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Wind Exposure</label>
              <select value={wind} onChange={e => { setWind(e.target.value); setShowPlan(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #2D3F5C', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="low">Sheltered (near fence, trees, structure)</option>
                <option value="high">Exposed (open yard, storm-prone area)</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowPlan(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Get My Sail Configuration ⛵
          </button>
          {showPlan && plan && (
            <div style={{ marginTop: 20 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: 12, borderLeft: '4px solid #F5E642' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>Config: {plan.config}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Mounting: {plan.mounting} · UV Block: {plan.uv} · Cost: {plan.cost}</div>
              </div>
              <div style={{ background: '#162032', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: 8, fontSize: 14 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>⚠️ Anchoring Requirement</div>
                <div style={{ color: '#94A3B8' }}>{plan.anchoring}</div>
              </div>
              <div style={{ background: '#162032', borderRadius: 8, padding: '0.75rem 1rem', color: '#94A3B8', fontSize: 14 }}>💡 {plan.tip}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#162032', borderRadius: 10, padding: '1rem 1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Need professional shade sail installation?</div>
          <div style={{ color: '#94A3B8', fontSize: 14 }}>ProLnk connects you with DFW outdoor living contractors who install shade sails with proper DFW-rated anchoring.</div>
        </div>
      </div>
    </div>
  );
}
