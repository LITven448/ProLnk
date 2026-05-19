import { useState } from 'react';

const sqftRanges = ['Under 1,500 sq ft', '1,500–2,500 sq ft', '2,500–3,500 sq ft', 'Over 3,500 sq ft'];
const wateringMethods = ['No watering system', 'Manual hose only', 'Sprinkler system only', 'Existing soaker hose'];

function getRecommendation(sqft: string, method: string) {
  const soakerFeet = sqft === 'Under 1,500 sq ft' ? '150–200 ft' : sqft === '1,500–2,500 sq ft' ? '200–300 ft' : sqft === '2,500–3,500 sq ft' ? '300–400 ft' : '400–550 ft';
  const cost = sqft === 'Under 1,500 sq ft' ? '$300–$600′ : sqft === '1,500–2,500 sq ft' ? '$500–$900' : sqft === '2,500–3,500 sq ft' ? '$800–$1,400' : '$1,200–$2,000';
  const timer = method === 'Sprinkler system only' ? '3x per week, 30–45 min, early AM' : '5x per week, 20–30 min, early AM';
  return { soakerFeet, cost, timer };
}

const placementTips = [
  { icon: '📏', title: '12–18 Inches from Foundation', desc: 'Place soaker hose 12–18 inches from the perimeter — not touching the foundation. This allows water to wick inward without pooling against the slab.' },
  { icon: '🔄', title: 'Full Perimeter Loop', desc: 'Run soaker hose around the entire foundation perimeter. Gaps create uneven moisture and differential movement — the enemy of DFW slabs.' },
  { icon: '⏰', title: 'Early Morning Timing', desc: 'Water between 5–8 AM to minimize evaporation in DFW heat. Soil should stay consistently moist, not saturated.' },
  { icon: '❄️', title: 'Winter Adjustment', desc: 'Reduce frequency Oct–Feb when DFW temps drop. Resume full schedule when temps consistently exceed 70°F.' },
];

const systemTypes = [
  { name: 'Soaker Hose', pros: ['Even moisture distribution', 'Low cost', 'DIY-friendly'], cons: ['Requires annual replacement', 'Can kink or clog'], cost: '$80–$200 DIY' },
  { name: 'Drip System', pros: ['Precise placement', 'Less maintenance', 'Longer lifespan'], cons: ['Higher upfront cost', 'Requires professional setup'], cost: '$400–$800 installed' },
];

export default function DFWFoundationWateringSystemGuide() {
  const [sqft, setSqft] = useState('');
  const [method, setMethod] = useState('');
  const [showResult, setShowResult] = useState(false);

  const result = sqft && method ? getRecommendation(sqft, method) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW FOUNDATION GUIDE</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>Foundation Watering System Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>DFW's expansive clay soil shrinks dramatically in drought and swells when wet. A consistent watering system is the single best thing you can do for your foundation.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {systemTypes.map(s => (
            <div key={s.name} style={{ background: '#112240', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>💧 {s.name}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>Pros</div>
              {s.pros.map(p => <div key={p} style={{ fontSize: 13, marginBottom: 3 }}>✅ {p}</div>)}
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 10, marginBottom: 6 }}>Cons</div>
              {s.cons.map(c => <div key={c} style={{ fontSize: 13, marginBottom: 3 }}>⚠️ {c}</div>)}
              <div style={{ marginTop: 10, padding: '8px 12px', background: '#0A1628', borderRadius: 8, fontSize: 13 }}>💰 {s.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {placementTips.map(t => (
            <div key={t.title} style={{ background: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{t.title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>🛠️ Your Watering System Recommendation</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Home Size</div>
              <select value={sqft} onChange={e => { setSqft(e.target.value); setShowResult(false); }} style={{ width: '100%', padding: 10, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value="">Select...</option>
                {sqftRanges.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Current Watering Method</div>
              <select value={method} onChange={e => { setMethod(e.target.value); setShowResult(false); }} style={{ width: '100%', padding: 10, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value="">Select...</option>
                {wateringMethods.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!sqft || !method} style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, cursor: 'pointer', opacity: (!sqft || !method) ? 0.5 : 1 }}>
            Get My Watering Plan
          </button>
          {showResult && result && (
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {[
                { label: '📐 Soaker Hose Needed', value: result.soakerFeet },
                { label: '💰 Install Cost Est.', value: result.cost },
                { label: '⏰ Timer Schedule', value: result.timer },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: 14, background: '#0A1628', borderRadius: 8, borderTop: '2px solid #F5E642′ }}>
                  <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>⚡ DFW Watering Facts</div>
          {['DFW clay can lose 3–5 inches of moisture in summer — equivalent to moving soil', 'Dallas Water Utilities recommends watering 2–3x/week in summer for foundations', 'Foundation watering can add 10+ years to slab stability at minimal cost', 'Smart timers with rain sensors prevent over-watering and washout'].map(f => (
            <div key={f} style={{ fontSize: 13, marginBottom: 8, color: '#cbd5e1′ }}>• {f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
