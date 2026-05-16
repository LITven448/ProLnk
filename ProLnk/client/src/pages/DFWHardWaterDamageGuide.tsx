import { useState } from 'react';

const dfwCities = ['Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Arlington', 'Irving', 'Garland', 'Denton', 'Allen', 'Other DFW'];
const yearsUntreated = ['Less than 2 years', '2–5 years', '5–10 years', '10–15 years', '15+ years'];

const hardness: Record<string, number> = {
  'Dallas': 16, 'Fort Worth': 18, 'Plano': 20, 'Frisco': 19, 'McKinney': 21,
  'Arlington': 17, 'Irving': 16, 'Garland': 18, 'Denton': 22, 'Allen': 20, 'Other DFW': 18,
};

function getDamage(city: string, years: string) {
  const gpg = hardness[city] || 18;
  const label = gpg >= 20 ? 'Very Hard' : gpg >= 16 ? 'Hard' : 'Moderately Hard';
  let level = 'Low', replace = 'No urgent replacements needed', treatCost = '$400–$800 (softener install)';
  if (years === '5–10 years') { level = 'Moderate'; replace = 'Water heater efficiency reduced ~25%. Dishwasher spray arms may be clogged.'; }
  if (years === '10–15 years') { level = 'High'; replace = 'Water heater: consider replacement ($900–$1,800). Washing machine valve likely scaled.'; }
  if (years === '15+ years') { level = 'Severe'; replace = '🚨 Water heater likely failed or near failure. Pipe scale may be restricting flow. Full descaling or partial repipe may be needed ($2,000–$8,000).'; treatCost = '$400–$800 (softener) + descaling service $300–$600'; }
  return { gpg, label, level, replace, treatCost };
}

export default function DFWHardWaterDamageGuide() {
  const [city, setCity] = useState('');
  const [years, setYears] = useState('');
  const result = city && years ? getDamage(city, years) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>💧 DFW Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>Hard Water Damage Guide — DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, fontSize: 15 }}>DFW water averages 15–22 grains per gallon (GPG) — classified as Very Hard. Scale deposits accumulate in pipes, water heaters, appliances, and fixtures. Without treatment, the cost compounds every year.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🔥', title: 'Water Heater Impact', body: 'Scale acts as insulation. Every 1/4" of scale = 25% efficiency loss. Lifespan drops from 12 years to 6–8 in hard water areas.' },
            { icon: '🍽️', title: 'Dishwasher & Appliances', body: 'Spray arms clog within 3–5 years without treatment. Heating elements scale over, drawing more power and failing early.' },
            { icon: '🚿', title: 'Fixtures & Shower Heads', body: 'DFW shower heads lose 60–75% of flow rate within 2 years without cleaning or a filter. White deposits visible on tile.' },
            { icon: '🧴', title: 'Prevention Options', body: 'Whole-home water softener ($400–$1,200 installed), salt-free conditioner, or inline filters at specific fixtures.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>⚖️ Damage Assessment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Your DFW City</label>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', background: '#1A2F50', border: '1px solid #2A4A70', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select city</option>
                {dfwCities.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Years Without Water Treatment</label>
              <select value={years} onChange={e => setYears(e.target.value)} style={{ width: '100%', background: '#1A2F50', border: '1px solid #2A4A70', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select years</option>
                {yearsUntreated.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, borderRadius: 8, padding: '4px 14px', fontSize: 13 }}>{result.label} — {result.gpg} GPG</div>
                <div style={{ background: result.level === 'Severe' ? '#7F1D1D' : result.level === 'High' ? '#4A1D00' : '#1A3A1A', color: '#FFF', fontWeight: 700, borderRadius: 8, padding: '4px 14px', fontSize: 13 }}>Damage Level: {result.level}</div>
              </div>
              <div><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>🔧 CURRENT DAMAGE ESTIMATE</div><div style={{ color: '#E8EDF5', fontSize: 14 }}>{result.replace}</div></div>
              <div><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>💰 TREATMENT COST vs. CONTINUED DAMAGE</div><div style={{ color: '#E8EDF5', fontSize: 14 }}>Treatment now: {result.treatCost} · Doing nothing: +$500–$3,000/yr in premature appliance replacements</div></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🧹 Monthly Descaling Routine</div>
          <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.8 }}>
            • Shower heads: soak in white vinegar overnight monthly<br/>
            • Water heater: flush sediment from drain valve annually<br/>
            • Dishwasher: run empty cycle with citric acid monthly<br/>
            • Faucet aerators: unscrew and soak quarterly
          </div>
        </div>
      </div>
    </div>
  );
}
