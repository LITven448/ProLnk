import { useState } from 'react';

const carpetTypes = ['Berber', 'Plush/Saxony', 'Frieze', 'Sisal/Natural Fiber', 'Polyester Blend'];
const lifestyles = ['No kids or pets', 'Kids only', 'Pets only', 'Kids and pets'];
const allergyLevels = ['Low sensitivity', 'Moderate (seasonal)', 'High (year-round DFW pollen)'];

function getRecommendation(carpet: string, lifestyle: string, allergy: string) {
  let freq = 12;
  let cost = '$120–$180';
  let method = 'Steam cleaning';
  let rec = 'Professional';

  if (lifestyle === 'Kids and pets') freq = 4;
  else if (lifestyle === 'Kids only' || lifestyle === 'Pets only') freq = 6;
  else freq = 12;

  if (allergy === 'High (year-round DFW pollen)') { freq = Math.max(freq / 2, 2); }
  if (allergy === 'Moderate (seasonal)') { freq = Math.max(freq - 1, 2); }

  if (carpet === 'Sisal/Natural Fiber') { method = 'Dry cleaning only'; cost = '$150–$220'; }
  else if (carpet === 'Berber') { method = 'Low-moisture dry cleaning'; cost = '$110–$160'; }

  if (lifestyle === 'No kids or pets' && allergy === 'Low sensitivity') rec = 'DIY rental';

  const timesPerYear = Math.round(12 / freq);
  return { timesPerYear, cost, method, rec };
}

export default function DFWCarpetCleaningGuide() {
  const [carpet, setCarpet] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [allergy, setAllergy] = useState('');
  const result = carpet && lifestyle && allergy ? getRecommendation(carpet, lifestyle, allergy) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>🏠 DFW CARPET CARE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Carpet Cleaning Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW clay soil, cedar pollen, and pet dander demand a smarter cleaning schedule. Here's what you need to know.</p>

        <div style={{ display: 'grid', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '🌿', title: 'DFW Clay Soil Problem', body: 'North Texas clay soil clings to carpet fibers and acts as an abrasive, breaking down pile faster than sandy soils. Entrance mats and shoe policies are critical.' },
            { icon: '🤧', title: 'Cedar & Oak Pollen Season', body: 'DFW cedar fever (Dec–Feb) and oak pollen (Mar–Apr) spike allergens indoors. HEPA vacuuming 3x/week during peak season is recommended.' },
            { icon: '💧', title: 'Steam vs Dry Cleaning', body: 'Steam (hot water extraction) is best for DFW homes with kids/pets — kills bacteria and removes embedded clay. Dry cleaning suits delicate fibers and faster drying.' },
            { icon: '🛠️', title: 'DIY Rental Reality', body: 'Home Depot/Walmart rentals are $40–$60/day but use less PSI than truck-mounted professional units. Good for light maintenance between professional cleanings.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0F1F3D', borderRadius: 12, padding: '20px 24px', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{card.icon} <strong>{card.title}</strong></div>
              <p style={{ color: '#94A3B8', margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F1F3D', borderRadius: 16, padding: 28, border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 20 }}>🧮 DFW Cleaning Frequency Calculator</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>CARPET TYPE</label>
              <select value={carpet} onChange={e => setCarpet(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value=''>Select carpet type...</option>
                {carpetTypes.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>HOUSEHOLD LIFESTYLE</label>
              <select value={lifestyle} onChange={e => setLifestyle(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value=''>Select lifestyle...</option>
                {lifestyles.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>DFW ALLERGY SENSITIVITY</label>
              <select value={allergy} onChange={e => setAllergy(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value=''>Select allergy level...</option>
                {allergyLevels.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>Your DFW Recommendation</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: '#0F1F3D', borderRadius: 8, padding: 14 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>CLEANINGS/YEAR</div><div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642' }}>{result.timesPerYear}x</div></div>
                <div style={{ background: '#0F1F3D', borderRadius: 8, padding: 14 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>EST. COST/VISIT</div><div style={{ fontSize: 18, fontWeight: 700 }}>{result.cost}</div></div>
                <div style={{ background: '#0F1F3D', borderRadius: 8, padding: 14 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>BEST METHOD</div><div style={{ fontSize: 15, fontWeight: 700 }}>{result.method}</div></div>
                <div style={{ background: '#0F1F3D', borderRadius: 8, padding: 14 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>RECOMMENDATION</div><div style={{ fontSize: 15, fontWeight: 700, color: result.rec === 'Professional' ? '#4ADE80' : '#F5E642' }}>{result.rec}</div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
