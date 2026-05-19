import { useState } from 'react';

type CompostPlan = { binType: string; size: string; timeline: string; amendment: string; tip: string; cost: string };

const compostPlans: Record<string, CompostPlan> = {
  'small-light': { binType: 'Open wire bin or DIY pallet bin', size: '3×3 ft (27 cu ft)', timeline: '3–4 months in summer, 6–9 months in winter', amendment: '1–2 inches per bed per season', tip: 'Even a small bin produces enough compost to meaningfully improve one raised bed per season.', cost: '$0–$40 DIY' },
  'small-heavy': { binType: 'Compact tumbler (37 gallon)', size: '37 gallon tumbler', timeline: '3–6 weeks in DFW summer heat', amendment: '1–2 inches per bed per season', tip: 'Tumblers are perfect for urban yards — contained, no rodent access, works fast in DFW heat.', cost: '$80–$180′ },
  'medium-light': { binType: 'Dual open bin system', size: '2 bins, 3×3 ft each', timeline: '2–3 months summer, 4–6 months winter', amendment: '2–3 inches per 200 sq ft of beds', tip: 'Two-bin system: one active, one curing. Faster overall throughput for regular kitchen waste.', cost: '$20–$80 DIY or $120–$200 purchased' },
  'medium-heavy': { binType: 'Large tumbler (65+ gallon) or dual tumbler', size: '65–80 gallon capacity', timeline: '3–5 weeks in DFW summer', amendment: '2–4 inches per 200 sq ft of beds', tip: 'At this volume, finished compost can fully replace synthetic fertilizer for a medium garden.', cost: '$150–$350′ },
  'large-light': { binType: 'Three-bin hot compost system', size: '3 bins, 4×4 ft each', timeline: '4–8 weeks hot composting in DFW summer', amendment: 'Enough to amend 500+ sq ft of clay soil per season', tip: 'Three-bin system is the most productive setup for serious gardeners. Turns waste into gold fast.', cost: '$80–$200 DIY' },
  'large-heavy': { binType: 'Hot compost windrow + tumbler combo', size: 'Windrow 6×4 ft + tumbler for kitchen scraps', timeline: '3–4 weeks (hot method)', amendment: 'Enough to amend entire yard borders + all beds', tip: 'DFW summer heat makes hot composting almost effortless — temperatures spike to 140–160°F in pile center.', cost: '$100–$400 combined' },
};

export default function DFWCompostBinGuide() {
  const [yard, setYard] = useState('medium');
  const [waste, setWaste] = useState('heavy');
  const [showPlan, setShowPlan] = useState(false);

  const key = `${yard}-${waste}` as keyof typeof compostPlans;
  const plan = compostPlans[key];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          ♻️ DFW COMPOST BIN GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Composting in DFW — Use the Heat to Your Advantage</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          DFW summers that kill your lawn accelerate composting dramatically. That same heat + humidity breaks down organic matter in weeks — then use finished compost to finally fix DFW's notorious clay soil.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 32 }}>
          {[
            { icon: '🌡️', title: 'DFW Summer = Speed', desc: 'Pile temps hit 140–160°F in summer. Compost that takes 6 months up north finishes in 3–6 weeks here.' },
            { icon: '🧱', title: 'Clay Soil Fix', desc: 'DFW\’s heavy clay compacts and drains poorly. Compost breaks it up — the only long-term fix for DFW soil.' },
            { icon: '🔄', title: 'Tumbler vs. Open Bin', desc: 'Tumblers: contained, fast, rodent-proof. Open bins: more volume, requires turning. Both work great in DFW.' },
          ].map(p => (
            <div key={p.title} style={{ background: '#1E2D45', borderRadius: 10, padding: '1.2rem' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🍂 What to Compost in Texas</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8, color: '#4ADE80′ }}>✅ Add This (DFW-Specific)</div>
              {['Live oak leaves (abundant in DFW)', 'Crape myrtle cuttings (chipped)', 'Kitchen scraps: fruit, veg, coffee grounds', 'Grass clippings (unbagged lawn)', 'Cardboard (sheet mulching source)', 'Spent garden plants post-harvest'].map(t => <div key={t} style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>• {t}</div>)}
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8, color: '#F87171′ }}>❌ Avoid This</div>
              {['Meat, fish, dairy (attracts pests)', 'Dog/cat waste (pathogens)', 'Diseased plants (spreads disease)', 'Bermuda grass rhizomes (resprouts in pile)', 'Glossy paper or coated cardboard', 'Invasive plants with seeds (spreads them)'].map(t => <div key={t} style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>• {t}</div>)}
            </div>
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>🏙️ DFW City Composting Programs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { city: 'Dallas', program: 'Compost pickup available for $12/mo add-on to waste service. Green bin pickup every other week.' },
              { city: 'Fort Worth', program: 'Yard waste composting via standard green bin. No food waste pickup yet.' },
              { city: 'Frisco / Plano', program: 'Check city waste portal — programs vary. Many DFW suburbs contract separately.' },
              { city: 'All DFW', program: 'Earth911.com to find composting drop-off sites near you. Home Depot/Lowes often accept yard waste.' },
            ].map(c => (
              <div key={c.city} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 14 }}>{c.city}</div>
                <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>{c.program}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔍 Bin Recommender</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Yard Size</label>
              <select value={yard} onChange={e => { setYard(e.target.value); setShowPlan(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #2D3F5C', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="small">Small (&lt;¼ acre, mostly hard surfaces)</option>
                <option value="medium">Medium (¼ acre, some lawn + beds)</option>
                <option value="large">Large (½+ acre, significant landscaping)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Food Waste Volume</label>
              <select value={waste} onChange={e => { setWaste(e.target.value); setShowPlan(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #2D3F5C', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="light">Light (occasional kitchen scraps)</option>
                <option value="heavy">Heavy (daily kitchen scraps + yard waste)</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowPlan(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Get My Compost Setup ♻️
          </button>
          {showPlan && plan && (
            <div style={{ marginTop: 20 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: 12, borderLeft: '4px solid #F5E642′ }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>Recommended: {plan.binType}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 8 }}>
                  {[{ label: 'Capacity', val: plan.size }, { label: 'Timeline', val: plan.timeline }, { label: 'Cost', val: plan.cost }].map(m => (
                    <div key={m.label} style={{ background: '#162032', borderRadius: 6, padding: '0.5rem', textAlign: 'center' }}>
                      <div style={{ color: '#94A3B8', fontSize: 11 }}>{m.label}</div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{m.val}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: '#162032', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: 8 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>Soil Amendment Rate</div>
                <div style={{ color: '#94A3B8', fontSize: 14 }}>{plan.amendment}</div>
              </div>
              <div style={{ background: '#162032', borderRadius: 8, padding: '0.75rem 1rem', color: '#94A3B8', fontSize: 14 }}>💡 {plan.tip}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#162032', borderRadius: 10, padding: '1rem 1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Want your compost applied professionally?</div>
          <div style={{ color: '#94A3B8', fontSize: 14 }}>ProLnk connects you with DFW landscapers who deliver bulk compost and amend your soil for planting season.</div>
        </div>
      </div>
    </div>
  );
}
