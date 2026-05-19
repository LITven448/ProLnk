import { useState } from 'react';

const planting = {
  'fall-small': { beds: '1 bed (4×8 ft)', plants: ['Lettuce', 'Spinach', 'Kale', 'Broccoli', 'Carrots', 'Beets'], water: '1–2x/week', note: 'Plant Oct 1 – Nov 15 for best results' },
  'fall-medium': { beds: '2–3 beds (4×8 ft each)', plants: ['All leafy greens', 'Broccoli', 'Cauliflower', 'Chard', 'Radishes', 'Peas', 'Carrots'], water: '1–2x/week', note: 'DFW fall garden outperforms spring — mild temps = big yields' },
  'fall-large': { beds: '4–6 beds', plants: ['Full fall garden: greens + brassicas + root veg', 'Row of garlic for June harvest', 'Overwintering perennial herbs'], water: '2–3x/week', note: 'Add drip irrigation for hands-off watering' },
  'spring-small': { beds: '1 bed (4×4 ft)', plants: ['Tomatoes (2–3 plants)', 'Peppers', 'Basil'], water: '2–3x/week', note: 'Plant after last frost (Mar 15 DFW). Harvest before June heat.' },
  'spring-medium': { beds: '2 beds', plants: ['Tomatoes', 'Squash', 'Cucumbers', 'Peppers', 'Beans'], water: '3x/week', note: 'Use shade cloth in May to extend season' },
  'spring-large': { beds: '3–5 beds', plants: ['Full veggie garden + herbs', 'Okra for summer relay', 'Sweet potatoes for fall dig'], water: '3–4x/week', note: 'Succession plant every 2 weeks Mar–Apr' },
  'summer-small': { beds: '1 bed', plants: ['Okra', 'Sweet potatoes', 'Southern peas (Black-eyed)', 'Purslane'], water: 'Daily', note: 'Only xeric veggies survive DFW summer — most gardeners skip it' },
  'summer-medium': { beds: '1–2 beds', plants: ['Okra', 'Sweet potatoes', 'Amaranth', 'Armenian cucumber'], water: 'Daily', note: 'Mulch 4" deep. Water early AM only.' },
  'summer-large': { beds: '2–3 beds max', plants: ['Heat-tolerant only: Okra, Sweet Potato, Cowpeas, Malabar spinach'], water: 'Daily', note: 'Summer is prep season — add compost and rest beds for fall planting' },
};

export default function DFWRaisedGardenBedGuide() {
  const [space, setSpace] = useState('medium');
  const [season, setSeason] = useState('fall');
  const [showPlan, setShowPlan] = useState(false);

  const key = `${season}-${space}` as keyof typeof planting;
  const plan = planting[key];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          🥕 DFW RAISED BED GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Raised Garden Beds for DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          Escape DFW's notorious heavy clay soil. Raised beds let you control your growing environment — critical in North Texas.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🏗️', title: 'Cedar Beds', desc: 'Naturally rot-resistant, no chemicals, lasts 10–15 yrs. Best for food gardens.' },
            { icon: '🔩', title: 'Galvanized Steel', desc: 'Lasts 20+ yrs, modern look, heats up fast — great for DFW spring. Line with fabric to prevent soil loss.' },
            { icon: '🌡️', title: 'DFW Fall = Main Season', desc: 'Oct–Dec is the primary growing season. Cool-weather crops thrive when summer heat breaks.' },
            { icon: '🧱', title: 'Perfect Soil Mix', desc: '40% compost, 40% topsoil, 20% perlite. Never use straight DFW clay — raised beds exist to avoid it.' },
          ].map(p => (
            <div key={p.title} style={{ background: '#1E2D45', borderRadius: 10, padding: '1.2rem' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📅 DFW Planting Calendar</h2>
          {[
            { season: 'Fall (Oct–Dec)', icon: '🍂', desc: 'PRIMARY season. Leafy greens, brassicas, root veg. Plant by Nov 15.' },
            { season: 'Spring (Mar–May)', icon: '🌱', desc: 'SECONDARY season. Tomatoes, peppers, squash. Plant after Mar 15 frost date.' },
            { season: 'Summer (Jun–Sep)', icon: '☀️', desc: 'SKIP or xeric only. Okra, sweet potatoes survive. Most gardeners rest beds.' },
            { season: 'Winter (Jan–Feb)', icon: '❄️', desc: 'PREP season. Add compost, plan spring layout, start seeds indoors.' },
          ].map(s => (
            <div key={s.season} style={{ display: 'flex', gap: 16, marginBottom: 14, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 24, width: 36, flexShrink: 0 }}>{s.icon}</div>
              <div><div style={{ fontWeight: 700 }}>{s.season}</div><div style={{ color: '#94A3B8', fontSize: 14 }}>{s.desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 Garden Planner</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Available Space</label>
              <select value={space} onChange={e => { setSpace(e.target.value); setShowPlan(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #2D3F5C', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="small">Small (&lt;50 sq ft)</option>
                <option value="medium">Medium (50–150 sq ft)</option>
                <option value="large">Large (150+ sq ft)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Season</label>
              <select value={season} onChange={e => { setSeason(e.target.value); setShowPlan(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #2D3F5C', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="fall">Fall (Oct–Dec)</option>
                <option value="spring">Spring (Mar–May)</option>
                <option value="summer">Summer (Jun–Sep)</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowPlan(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Get My Garden Plan 🥕
          </button>
          {showPlan && plan && (
            <div style={{ marginTop: 20 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: 12, borderLeft: '4px solid #F5E642' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>Recommended: {plan.beds}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Watering: {plan.water}</div>
              </div>
              <div style={{ background: '#162032', borderRadius: 8, padding: '1rem', marginBottom: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>What to Plant:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {plan.plants.map(p => <span key={p} style={{ background: '#1E2D45', padding: '4px 10px', borderRadius: 20, fontSize: 13 }}>{p}</span>)}
                </div>
              </div>
              <div style={{ background: '#162032', borderRadius: 8, padding: '1rem', color: '#94A3B8', fontSize: 14 }}>
                💡 {plan.note}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#162032', borderRadius: 10, padding: '1rem 1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Need a raised bed built?</div>
          <div style={{ color: '#94A3B8', fontSize: 14 }}>ProLnk connects you with DFW landscapers who build and fill custom raised garden beds.</div>
        </div>
      </div>
    </div>
  );
}
