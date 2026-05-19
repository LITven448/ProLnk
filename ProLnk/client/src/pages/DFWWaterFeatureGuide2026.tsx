import { useState } from 'react';

const features = [
  { type: 'Fountain', icon: '⛲', tips: ['Top off weekly in summer — DFW heat causes 1–2 inches of evaporation per week', 'Run pump 24/7 to prevent mosquito breeding in standing water', 'Clean pump filter monthly; mineral buildup is heavy in DFW hard water', 'Add algaecide every 2 weeks from May–September', 'Winterize by draining lines and storing pump when temps drop below 32°F'] },
  { type: 'Koi Pond', icon: '🐟', tips: ['Install aerator — DFW summer heat depletes oxygen fast; fish die above 90°F water temp', 'Partial water changes (25%) weekly in summer to reduce algae and nitrates', 'Shade 50%+ of pond surface with aquatic plants or shade cloth', 'Use beneficial bacteria monthly to reduce algae; avoid copper-based algaecides with koi', 'Cover pond with netting in fall — pecan and oak leaf drop is heavy across DFW'] },
  { type: 'Swimming Pool Water Feature', icon: '🏊', tips: ['Evaporation in DFW summer can be 1 inch per day — install auto-fill to protect pump', 'Sheet waterfalls and spillways accelerate evaporation; run features during cooler hours', 'Balance chemistry weekly; DFW sun degrades chlorine 2–3x faster in summer', 'Inspect nozzles and jets for calcium buildup every 6 months', 'LED lighting in water features requires GFCI protection — DFW code requirement'] },
  { type: 'Pondless Waterfall', icon: '🌊', tips: ['Pondless systems are easiest for DFW mosquito compliance — no standing water', 'Top off reservoir weekly in summer; bury reservoir deep to reduce evaporation', 'Use a pre-filter on pump intake — DFW winds carry heavy debris', 'Flush lines before winter and cover basin with foam insulation if temps drop below 25°F', 'Check pump every spring; DFW clay soil can shift gravel and pinch lines'] },
];

export default function DFWWaterFeatureGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = features.find(f => f.type === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>💧</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Water Feature Guide 2026</h1>
          <p style={{ color: '#aab', fontSize: 15, maxWidth: 560, margin: '0 auto' }}>
            Fountains, ponds, and water features in DFW — evaporation is high, algae is aggressive, and mosquitoes are a real concern. Select your feature type below.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 32 }}>
          {features.map(f => (
            <button key={f.type} onClick={() => setSelected(f.type === selected ? null : f.type)}
              style={{ background: selected === f.type ? '#F5E642′ : '#1a2a42', border: '2px solid', borderColor: selected === f.type ? '#F5E642' : '#2a3a55', borderRadius: 10, padding: '18px 10px', cursor: ’pointer', color: selected === f.type ? '#0A1628′ : '#fff', fontWeight: 700, fontSize: 14, transition: ’all .2s' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{f.icon}</div>
              {f.type}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1a2a42', borderRadius: 12, padding: 28, borderLeft: '4px solid #F5E642′ }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>{active.icon} {active.type} — DFW Maintenance Guide</h2>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              {active.tips.map((t, i) => <li key={i} style={{ color: '#dde' }}>{t}</li>)}
            </ul>
          </div>
        )}

        <div style={{ background: '#1a2a42', borderRadius: 12, padding: 24, marginTop: 28 }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>🦟 DFW Mosquito Prevention</h3>
          <p style={{ color: '#aab', lineHeight: 1.7 }}>Moving water is your best defense. Still water breeds mosquitoes in 7–10 days. Run pumps continuously, use Mosquito Dunks (BTI) in any basin, and eliminate standing water in pots, saucers, and gutters nearby.</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '16px 32px', display: 'inline-block', fontWeight: 800, fontSize: 15 }}>
            🔧 Get Free Water Feature Quotes from DFW Pros — ProLnk.io
          </div>
        </div>
      </div>
    </div>
  );
}