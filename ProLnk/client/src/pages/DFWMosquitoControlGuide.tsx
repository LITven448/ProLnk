import { useState } from 'react';

export default function DFWMosquitoControlGuide() {
  const [yardSize, setYardSize] = useState('medium');
  const [waterFeatures, setWaterFeatures] = useState('none');
  const [preference, setPreference] = useState('professional');
  const [showEstimate, setShowEstimate] = useState(false);

  const getEstimate = () => {
    let perTreatment = preference === 'professional' ? 85 : 30;
    let treatments = yardSize === 'small' ? 7 : yardSize === 'medium' ? 8 : 10;
    if (waterFeatures !== 'none') treatments += 2;
    const seasonal = perTreatment * treatments;
    const schedule = waterFeatures !== 'none'
      ? 'Every 3 weeks April–October + standing water inspections monthly'
      : 'Every 3–4 weeks April–October';
    return { perTreatment, seasonal, schedule };
  };

  const est = getEstimate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🦟</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Mosquito Control Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6 }}>
            Mosquito season in DFW runs <strong style={{ color: '#F5E642′ }}>April through October</strong>, peaking in June–September. North Texas consistently reports West Nile Virus cases — Tarrant and Dallas counties among the highest in the state. Control is not optional here.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>🦠 West Nile Risk in North Texas</h2>
          <div style={{ backgroundColor: '#1a2d4a', borderRadius: 8, padding: 16, borderLeft: '4px solid #ef4444′ }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              Texas leads the nation in West Nile cases most years. DFW's warm winters allow Culex mosquitoes (primary WNV carriers) to survive and emerge earlier. Peak transmission: <strong style={{ color: '#e2e8f0' }}>July–September</strong>. Protect yourself with elimination of standing water + professional spray programs.
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>💧 Common DFW Standing Water Sources</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {[
              ['🪣', 'Flower pots and saucers'],
              ['🚗', 'Tarps and car covers'],
              ['🌿', 'Clogged gutters'],
              ['🐦', 'Bird baths (change weekly)'],
              ['🏊', 'Neglected pools or fountains'],
              ['🛞', 'Old tires and toys'],
              ['🌧️', 'Low spots in yard after rain'],
              ['🌳', 'Tree holes and stumps'],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, backgroundColor: '#1a2d4a', borderRadius: 8, padding: 12 }}>
                <span>{icon}</span>
                <span style={{ color: '#cbd5e1', fontSize: 13 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>🛡️ Treatment Options</h2>
          {[
            { name: 'Professional Spray Service', icon: '💼', desc: 'Technician applies barrier spray to shrubs, grass, and shaded areas every 3–4 weeks. Most effective, fast-acting. Pyrethroid-based or organic (essential oil) options available.', cost: '$50–$150/treatment', best: 'Best overall control' },
            { name: 'Automatic Misting System', icon: '⚙️', desc: 'Nozzles installed around perimeter of yard. Sprays 2–3x/day at dawn/dusk. Requires refillable reservoir. High upfront cost but convenient long-term.', cost: '$2,500–$5,000 installed + $200–$400/year refills', best: 'Best for large properties' },
            { name: 'DIY Backpack Sprayer', icon: '🎒', desc: 'Purchase concentrate (Bifen IT or Permethrin) and spray yourself. Labor-intensive but cost-effective. Requires proper PPE. Reapply after rain.', cost: '$30–$60/treatment', best: 'Best for budget-conscious' },
            { name: 'Natural Repellents (DFW Climate)', icon: '🌿', desc: 'Citronella and cedar oil work short-term only. Mosquito Dunks (BTi) in standing water very effective and pet-safe. Fans on patios disrupt flight — surprisingly effective for outdoor seating.', cost: '$10–$50', best: 'Best as supplement only' },
          ].map(t => (
            <div key={t.name} style={{ backgroundColor: '#1a2d4a', borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 20 }}>{t.icon}</span>
                <span style={{ fontWeight: 600, color: '#e2e8f0′ }}>{t.name}</span>
                <span style={{ marginLeft: 'auto', color: '#22c55e', fontSize: 12 }}>{t.best}</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 6 }}>{t.desc}</div>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600 }}>{t.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>📊 Seasonal Cost Estimator</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Yard Size</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['small', 'medium', 'large'].map(s => (
                <button key={s} onClick={() => setYardSize(s)}
                  style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: '2px solid', borderColor: yardSize === s ? '#F5E642′ : '#1a2d4a', backgroundColor: yardSize === s ? '#F5E642' : '#1a2d4a', color: yardSize === s ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: ’pointer', textTransform: 'capitalize' }}>
                  {s === 'small' ? 'Small (<1/4 ac)' : s === 'medium' ? 'Medium (1/4–1/2 ac)' : 'Large (1/2+ ac)'}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Water Features</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['none', 'some', 'many'].map(w => (
                <button key={w} onClick={() => setWaterFeatures(w)}
                  style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: '2px solid', borderColor: waterFeatures === w ? '#F5E642′ : '#1a2d4a', backgroundColor: waterFeatures === w ? '#F5E642' : '#1a2d4a', color: waterFeatures === w ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: ’pointer', textTransform: 'capitalize' }}>
                  {w === 'none' ? 'None' : w === 'some' ? 'Some (pond/fountain)' : 'Many sources'}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Treatment Preference</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['professional', 'Professional'], ['diy', 'DIY']].map(([val, label]) => (
                <button key={val} onClick={() => setPreference(val)}
                  style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: '2px solid', borderColor: preference === val ? '#F5E642′ : '#1a2d4a', backgroundColor: preference === val ? '#F5E642' : '#1a2d4a', color: preference === val ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: ’pointer' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowEstimate(true)}
            style={{ width: '100%', backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get My Seasonal Estimate →
          </button>

          {showEstimate && (
            <div style={{ marginTop: 20, backgroundColor: '#1a2d4a', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>~${est.seasonal.toLocaleString()}/season</div>
              <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 6 }}>~${est.perTreatment}/treatment</div>
              <div style={{ color: '#e2e8f0', fontSize: 14 }}>📅 {est.schedule}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 22, marginBottom: 6 }}>🏠</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>ProLnk connects you with licensed DFW mosquito control pros — compare quotes, book fast.</p>
        </div>

      </div>
    </div>
  );
}
