import { useState } from 'react';

type RoomSize = 'Small (under 100 sq ft)' | 'Medium (100–180 sq ft)' | 'Large (180+ sq ft)';
type NoiseConcern = 'Low (quiet neighborhood)' | 'Medium (some street/neighbor noise)' | 'High (busy road, highway nearby)';
type BudgetLevel = 'DIY ($500–$1,500)' | 'Mid-Range ($1,500–$4,000)' | 'Premium ($4,000–$10,000)';

function getRecommendation(size: RoomSize, noise: NoiseConcern, budgetLevel: BudgetLevel) {
  const recs: string[] = [];
  let costLow = 0;
  let costHigh = 0;

  if (budgetLevel === 'DIY ($500–$1,500)') {
    costLow = 500; costHigh = 1500;
    recs.push('🎨 Repaint with Benjamin Moore Chantilly Lace or Ammonite grey — $150–$250');
    recs.push('🪵 Interlocking cork floor tiles over existing flooring — $200–$400');
    recs.push('🪟 Blackout curtains with solar sheer layer ($80–$180)');
    if (noise !== 'Low (quiet neighborhood)') recs.push('🔇 DIY acoustic panels: rockwool in wood frames, fabric-covered — $200–$400');
    recs.push('💡 Dimmable warm bulbs (2700K) on smart switch — $40–$80');
  } else if (budgetLevel === 'Mid-Range ($1,500–$4,000)') {
    costLow = 1500; costHigh = 4000;
    recs.push('🪵 Cork or bamboo floating floor installation — $600–$1,200');
    recs.push('🔇 Professional acoustic panel installation (6–8 panels) — $400–$900');
    recs.push('💡 Circadian lighting system with app control — $200–$500');
    recs.push('🚪 Door sweep + acoustic door seal kit — $80–$150');
    if (noise === 'High (busy road, highway nearby)') recs.push('🪟 Acoustic window insert (secondary glazing) — $300–$600 per window');
    recs.push('🌿 Built-in plant shelf + natural element accents — $300–$600');
  } else {
    costLow = 4000; costHigh = 10000;
    recs.push('🏗️ Full acoustic wall treatment: rockwool batt + resilient channel + drywall — $1,500–$3,500');
    recs.push('🪵 Custom cork or tatami mat flooring — $800–$2,000');
    recs.push('🌡️ Dedicated mini-split HVAC for silent, independent temperature control — $1,800–$3,500');
    recs.push('🔆 Tunable circadian LED system (sunrise/sunset simulation) — $400–$1,000');
    recs.push('🚪 Solid-core door with acoustic door sweep and seals — $400–$800');
    recs.push('🪟 Motorized blackout + sheer dual roller shades — $300–$600 per window');
  }

  if (size === 'Small (under 100 sq ft)') {
    recs.push('🪞 Single large mirror to expand perceived space (lean-style, not mounted)');
  } else if (size === 'Large (180+ sq ft)') {
    recs.push('🧘 Define sub-zones: meditation mat area + journaling nook + gentle movement space');
  }

  return { recs, costLow, costHigh };
}

export default function DFWMeditationRoomGuide() {
  const [roomSize, setRoomSize] = useState<RoomSize | ''>('');
  const [noise, setNoise] = useState<NoiseConcern | ''>('');
  const [budget, setBudget] = useState<BudgetLevel | ''>('');
  const [showResults, setShowResults] = useState(false);

  const ready = roomSize && noise && budget;
  const result = ready ? getRecommendation(roomSize as RoomSize, noise as NoiseConcern, budget as BudgetLevel) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', borderBottom: '3px solid #F5E642' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🧘</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Meditation & Wellness Room Guide</h1>
          <p style={{ fontSize: 18, color: '#A8B8D0', maxWidth: 640 }}>
            Converting a spare room into a dedicated wellness sanctuary. In DFW, the key challenges are traffic noise, afternoon heat, and open-plan echo — all solvable.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, margin: '40px 0' }}>
          {[
            { icon: '🔇', title: 'DFW Traffic Noise Reality', body: 'DFW\’s explosive growth means many homes are within 500 ft of busy roads. Acoustic window inserts ($300–$600 per window) add a secondary glazing layer and can reduce noise by 70% without replacing your existing windows.' },
            { icon: '🎨', title: 'Color Science for Calm', body: 'Studies show warm greys (Agreeable Grey, Repose Grey) and soft greens (Sage, Eucalyptus) lower cortisol measurably. Avoid cool whites and blues in meditation rooms — they activate alertness rather than calm.' },
            { icon: '🌿', title: 'Air Quality Matters', body: 'Essential oil diffusers require adequate ventilation to avoid indoor air quality issues. Install a small exhaust fan or ensure 1 air change per hour. Snake plants and peace lilies also remove VOCs naturally.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#112240', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{card.title}</h3>
              <p style={{ color: '#A8B8D0', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 14, padding: 28, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 6px' }}>🌡️ Temperature Control for Meditation</h2>
          <p style={{ color: '#A8B8D0', fontSize: 14, margin: '0 0 16px' }}>Ideal temperature for meditation is 65–70°F. DFW homes struggle to reach this in summer without a dedicated solution.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { title: 'Dedicated Mini-Split', cost: '$1,800–$3,500', note: 'Best option — silent, precise, independent of main HVAC' },
              { title: 'Portable AC Unit', cost: '$300–$700', note: 'Budget option — noisier, needs window vent kit' },
              { title: 'Ceiling Fan + Blackout Blinds', cost: '$150–$400', note: 'Minimal — reduces heat gain, not a standalone solution' },
            ].map(item => (
              <div key={item.title} style={{ background: '#0D1B33', borderRadius: 10, padding: 16 }}>
                <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, margin: '0 0 4px' }}>{item.title}</p>
                <p style={{ color: '#E8EDF5', fontWeight: 600, fontSize: 13, margin: '0 0 6px' }}>{item.cost}</p>
                <p style={{ color: '#A8B8D0', fontSize: 13, margin: 0, lineHeight: 1.5 }}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, border: '2px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, margin: '0 0 6px' }}>🧮 Room Conversion Estimator</h2>
          <p style={{ color: '#A8B8D0', fontSize: 14, margin: '0 0 24px' }}>Get a renovation recommendation and cost breakdown for your DFW home</p>

          {([
            { label: 'Room Size', value: roomSize, setter: setRoomSize, options: ['Small (under 100 sq ft)', 'Medium (100–180 sq ft)', 'Large (180+ sq ft)'] as RoomSize[] },
            { label: 'Noise Concern', value: noise, setter: setNoise, options: ['Low (quiet neighborhood)', 'Medium (some street/neighbor noise)', 'High (busy road, highway nearby)'] as NoiseConcern[] },
            { label: 'Budget Level', value: budget, setter: setBudget, options: ['DIY ($500–$1,500)', 'Mid-Range ($1,500–$4,000)', 'Premium ($4,000–$10,000)'] as BudgetLevel[] },
          ]).map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: 20 }}>
              <p style={{ color: '#E8EDF5', fontWeight: 600, marginBottom: 10 }}>{label}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {options.map((opt: string) => (
                  <button key={opt} onClick={() => { (setter as (v: string) => void)(opt); setShowResults(false); }}
                    style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${value === opt ? '#F5E642' : '#1E3A5F'}`, background: value === opt ? '#F5E642' : '#0D1B33', color: value === opt ? '#0A1628' : '#E8EDF5', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button onClick={() => setShowResults(true)} disabled={!ready}
            style={{ padding: '12px 32px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: ready ? 'pointer' : 'not-allowed', opacity: ready ? 1 : 0.5 }}>
            Get Renovation Plan →
          </button>

          {showResults && result && (
            <div style={{ marginTop: 28, background: '#0A1628', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 6px', fontSize: 20 }}>Your Wellness Room Plan</h3>
              <p style={{ fontSize: 28, fontWeight: 800, color: '#E8EDF5', margin: '0 0 16px' }}>${result.costLow.toLocaleString()} – ${result.costHigh.toLocaleString()}</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {result.recs.map(r => <li key={r} style={{ color: '#C8D8E8', fontSize: 14, marginBottom: 10, lineHeight: 1.5 }}>{r}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
