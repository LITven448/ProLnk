import { useState } from 'react';

const homeTypes = ['Asphalt Shingle', 'Metal Roof', 'Tile', 'Flat/TPO'];
const ageRanges = ['Under 10 years', '10-15 years', '16-20 years', '21-25 years', '25+ years'];

function getTimeline(age: string, roofType: string): { label: string; color: string; detail: string } {
  if (age === 'Under 10 years') return { label: 'No Replacement Needed', color: '#22c55e', detail: 'Your roof is relatively new. Schedule annual inspections after major storms.' };
  if (age === '10-15 years') {
    if (roofType === 'Metal Roof') return { label: 'No Replacement Needed', color: '#22c55e', detail: 'Metal roofs last 40-70 years. Inspect flashings and fasteners annually.' };
    return { label: 'Monitor Closely', color: '#F5E642', detail: 'Approaching mid-life. Get a professional inspection especially after hail events.' };
  }
  if (age === '16-20 years') {
    if (roofType === 'Metal Roof') return { label: 'Inspect Annually', color: '#22c55e', detail: 'Metal roofs at this age need fastener checks and coating evaluation.' };
    if (roofType === 'Tile') return { label: 'Inspect & Repair', color: '#F5E642', detail: 'Tile lasts 50+ years but underlayment may need attention around now.' };
    return { label: 'Plan Replacement', color: '#f97316', detail: 'Standard asphalt shingles average 20-25 years in DFW heat. Budget now.' };
  }
  if (age === '21-25 years') {
    if (roofType === 'Metal Roof' || roofType === 'Tile') return { label: 'Inspect & Assess', color: '#F5E642', detail: 'Long-life materials still going strong. Full inspection recommended.' };
    return { label: 'Replace Now', color: '#ef4444', detail: 'Past expected lifespan in Texas climate. Waiting risks interior damage and insurance issues.' };
  }
  return { label: 'Urgent Replacement', color: '#ef4444', detail: 'Overdue for replacement. Denton storm season makes delay risky. Get quotes immediately.' };
}

export default function DFWRooferDenton() {
  const [homeAge, setHomeAge] = useState('');
  const [roofType, setRoofType] = useState('');
  const result = homeAge && roofType ? getTimeline(homeAge, roofType) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
            🏠 Denton, TX
          </span>
        </div>

        <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
          Denton TX Roofers —{' '}
          <span style={{ color: '#F5E642′ }}>University Town Specialists</span>
        </h1>

        <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.7, marginBottom: 40, maxWidth: 700 }}>
          From UNT and TWU campus-area rentals to brand-new Robson Ranch subdivisions, Denton roofing needs
          span decades of construction styles — all battered by North Texas storm corridors every spring.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '🎓', title: 'Campus Rental Specialists', desc: 'Older homes near UNT and TWU often have 20-30 year old roofs. Landlords trust local pros who know the territory.' },
            { icon: '🌩️', title: 'Storm Corridor Experts', desc: 'Denton sits in a primary hail and wind corridor. We document damage for insurance claims and work with all major carriers.' },
            { icon: '🏘️', title: 'New Subdivision Ready', desc: 'Serving Highland Village, Robson Ranch, and Oak Point — new builds need proper installation to keep warranties valid.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#111f3a', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>{card.title}</h3>
              <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 16, padding: 36, border: '1px solid #1e3a5f', marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>🔧 Roof Replacement Timeline Estimator</h2>
          <p style={{ color: '#94a3b8', marginBottom: 28 }}>
            Tell us about your Denton home and we will estimate when you should plan for a roof replacement.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#F5E642′ }}>
                Current Roof Age
              </label>
              <select
                value={homeAge}
                onChange={e => setHomeAge(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: 'white', fontSize: 15 }}
              >
                <option value="">Select age range...</option>
                {ageRanges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#F5E642′ }}>
                Roof Material Type
              </label>
              <select
                value={roofType}
                onChange={e => setRoofType(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: 'white', fontSize: 15 }}
              >
                <option value="">Select roof type...</option>
                {homeTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 4 }}>RECOMMENDATION</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: result.color, marginBottom: 10 }}>{result.label}</div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{result.detail}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 16, padding: 36, border: '1px solid #1e3a5f', marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>📊 Denton Roofing Cost Reference</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { service: 'Inspection', range: 'Free–$150', note: 'Post-storm priority' },
              { service: 'Repair (minor)', range: '$300–$900', note: 'Shingle replacement, flashing' },
              { service: 'Full Replace (1,500 sqft)', range: '$8,000–$14,000', note: 'Standard asphalt' },
              { service: 'Metal Roof Install', range: '$18,000–$35,000', note: '40-70 yr lifespan' },
            ].map(item => (
              <div key={item.service} style={{ background: '#0A1628', borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>{item.service}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642′ }}>{item.range}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#111f3a', borderRadius: 16, padding: 40, border: '2px solid #F5E642′ }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>⚡</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Get Denton Roofer Quotes Today</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>ProLnk connects you with verified Denton-area roofers. Compare 3 quotes — no pressure.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', padding: '16px 40px', borderRadius: 10, fontWeight: 800, fontSize: 17, border: 'none', cursor: 'pointer' }}>
            Get Free Quotes
          </button>
        </div>

      </div>
    </div>
  );
}
