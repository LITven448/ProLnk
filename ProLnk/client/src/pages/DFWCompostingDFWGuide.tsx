import { useState } from 'react';

const yardSizes = ['Small (<1/4 acre)', 'Medium (1/4–1/2 acre)', 'Large (>1/2 acre)'];
const goals = ['Improve Garden Soil', 'Reduce Lawn Waste', 'Reduce Food Waste', 'Full Yard Sustainability'];

const binTypes: Record<string, { bin: string; desc: string; cost: string; dfwNote: string }> = {
  'Small (<1/4 acre)': { bin: 'Tumbler Composter', desc: 'Enclosed tumbler accelerates composting in DFW heat — tumble daily in summer and you\’ll have finished compost in 6 weeks. Keeps wildlife out.', cost: '$80–150', dfwNote: 'DFW heat is your ally. In July–August, internal temps can hit 140°F — ideal for fast decomposition.' },
  'Medium (1/4–1/2 acre)': { bin: '3-Bin Pallet System', desc: 'Build with free pallets from hardware stores. Bin 1: fresh material. Bin 2: active composting. Bin 3: finished compost. Turn weekly in DFW summer.', cost: '$0–30 (free pallets)', dfwNote: 'In DFW summer, the active bin can finish in 6–8 weeks if you keep it moist and turn it every 3–4 days.' },
  'Large (>1/2 acre)': { bin: 'Open Windrow Pile', desc: 'Large piles retain heat better. Use a 3-4 ft tall pile and turn with a pitchfork weekly. DFW summer heat does the work fast.', cost: '$0 (pitchfork only)', dfwNote: 'Larger piles need more watering in DFW summers — the pile should feel like a wrung-out sponge.' },
};

const addFast = ['Grass clippings (DFW bermuda and zoysia clippings are nitrogen-rich)', 'Vegetable scraps', 'Coffee grounds', 'Torn cardboard (no tape)', 'Shredded dry leaves (DFW oaks drop massively in spring)', 'Fruit peels and cores'];
const addSlow = ['Small wood chips', 'Paper bags', 'Egg shells (take months to break down)', 'Hair and nail clippings'];
const avoid = ['Meat and bones (attracts armadillos, raccoons, possums — all abundant in DFW)', 'Grease and oils', 'Pet waste (dog/cat — DFW\’s pet density makes this common)', 'Diseased plant material', 'Treated wood products'];

const seasonalCalendar = [
  { season: 'Spring (Mar–May)', icon: '🌸', tip: 'DFW spring is prime time. Warm but not extreme heat. Start new pile in March. Add fresh bermuda clippings as lawn wakes up (high nitrogen). Finished compost ready to apply before summer planting.' },
  { season: 'Summer (Jun–Sep)', icon: '☀️', tip: 'DFW heat accelerates everything. Turn pile every 3–5 days. Water daily or every other day — pile dries out fast. Expect finished compost in 6–8 weeks. Avoid adding thick layers of dry grass — mix with food scraps.' },
  { season: 'Fall (Oct–Nov)', icon: '🍂', tip: 'Best composting season in DFW. Live oak and pecan leaves drop massively. Chop leaves with mower before adding. Start a large fall pile to compost over winter for spring garden. Layer leaves with kitchen scraps.' },
  { season: 'Winter (Dec–Feb)', icon: '❄️', tip: 'DFW winters are mild — composting continues at reduced rate. Pile is not frozen. Turn every 2–3 weeks. Add kitchen scraps throughout. Cover pile in rare hard freezes.' },
];

export default function DFWCompostingDFWGuide() {
  const [yardSize, setYardSize] = useState('');
  const [goal, setGoal] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const binRec = binTypes[yardSize];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>♻️ DFW COMPOSTING GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Composting in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          DFW's intense heat is a composting superpower. What takes 6 months in northern climates finishes in 6–8 weeks in a Dallas summer. Here’s how to make the most of it.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚡ Why DFW is a Composting Advantage</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[['🌡️ Heat = Speed', 'Summer pile temps reach 140°F+ — kills weed seeds and speeds breakdown dramatically.'], ['🌿 Grass Volume', 'Bermuda and zoysia clippings provide constant high-nitrogen feedstock all summer.'], ['🍂 Fall Leaf Dump', 'Live oak, pecan, and cedar elm drop huge volumes — ideal carbon source.'], ['⏱️ 6–8 Week Turnaround', 'DFW summer composting: start a pile in June, finished by August.']].map(([t, d]) => (
              <div key={t} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{t}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🗑️ Find Your Bin Type</h2>
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Yard size:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {yardSizes.map(s => (
                <button key={s} onClick={() => setYardSize(s)} style={{ background: yardSize === s ? '#F5E642′ : '#1e3a5f', color: yardSize === s ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13 }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Primary goal:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {goals.map(g => (
                <button key={g} onClick={() => setGoal(g)} style={{ background: goal === g ? '#F5E642′ : '#1e3a5f', color: goal === g ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13 }}>{g}</button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResults(true)} disabled={!yardSize || !goal} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', opacity: (!yardSize || !goal) ? 0.5 : 1 }}>Get My Setup</button>
        </div>

        {showResults && binRec && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>✅ Recommended: {binRec.bin}</div>
            <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 12 }}>Cost: {binRec.cost}</div>
            <p style={{ color: '#cbd5e1', marginBottom: 12 }}>{binRec.desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>🌡️ DFW-SPECIFIC TIP</div>
              <div style={{ color: '#e2e8f0', fontSize: 14 }}>{binRec.dfwNote}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#22c55e', fontSize: 12, marginBottom: 6 }}>✅ ADD FAST</div>
                {addFast.map((i, idx) => <div key={idx} style={{ color: '#94a3b8', fontSize: 11, marginBottom: 3 }}>• {i}</div>)}
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 6 }}>🐢 ADD SLOW</div>
                {addSlow.map((i, idx) => <div key={idx} style={{ color: '#94a3b8', fontSize: 11, marginBottom: 3 }}>• {i}</div>)}
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#ef4444', fontSize: 12, marginBottom: 6 }}>🚫 AVOID (DFW)</div>
                {avoid.map((i, idx) => <div key={idx} style={{ color: '#94a3b8', fontSize: 11, marginBottom: 3 }}>• {i}</div>)}
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16, margin: 0 }}>📅 DFW Seasonal Composting Calendar</h2>
            <button onClick={() => setShowCalendar(!showCalendar)} style={{ background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 13 }}>{showCalendar ? 'Hide' : 'Show'}</button>
          </div>
          {showCalendar && (
            <div style={{ display: 'grid', gap: 10 }}>
              {seasonalCalendar.map(s => (
                <div key={s.season} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>{s.icon} {s.season}</div>
                  <div style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6 }}>{s.tip}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
