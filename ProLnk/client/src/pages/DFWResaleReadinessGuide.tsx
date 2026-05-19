import { useState } from 'react';

const homeAges = ['Built after 2015', 'Built 2000–2015', 'Built 1985–2000', 'Built before 1985'];
const conditions = ['Well-maintained', 'Minor deferred maintenance', 'Moderate deferred maintenance', 'Significant issues'];
const submarkets = ['North Dallas / Plano / Allen', 'Fort Worth / Westside', 'Las Colinas / Irving / Coppell', 'South Dallas / Oak Cliff / Lancaster', 'East DFW / Mesquite / Garland', 'Frisco / McKinney / Prosper'];

const scores: Record<string, { score: number; priorities: string[]; note: string }> = {
  'Well-maintained': { score: 87, priorities: ['Update kitchen hardware and fixtures for modern look', 'Refresh exterior paint if over 7 years old', 'Service HVAC and provide maintenance records to buyers', 'Replace dated light fixtures with modern brushed nickel or matte black'], note: 'You\’re in great shape. Small cosmetic updates deliver 3–5x ROI in DFW.' },
  'Minor deferred maintenance': { score: 68, priorities: ['Address any foundation cracks — buyers and inspectors flag these immediately in DFW', 'Fix roof issues before listing — DFW hail history is always scrutinized', 'Repair all visible water damage or staining', 'Service HVAC system and replace filters'], note: 'Deferred maintenance items are heavily negotiated in DFW. Address them proactively.' },
  'Moderate deferred maintenance': { score: 48, priorities: ['Get a pre-listing inspection to identify all issues upfront', 'Foundation repair is non-negotiable in clay-heavy DFW soil markets', 'Update one major system (HVAC, water heater, or electrical panel)', 'Deep clean and declutter — presentation masks deferred maintenance perception'], note: 'At this condition level, you\’ll face significant buyer negotiations. Prioritize structural issues first.' },
  'Significant issues': { score: 28, priorities: ['Consider selling as-is with price adjustment vs. full repair cost', 'Foundation repair must be done — DFW buyers have access to structural inspectors', 'Address any safety hazards (electrical, HVAC, plumbing) before showing', 'Consult a local real estate attorney if foundation issues are severe'], note: 'Major issues require a strategic decision: invest to repair or price for condition. Get 3 contractor bids.' },
};

export default function DFWResaleReadinessGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [condition, setCondition] = useState('');
  const [submarket, setSubmarket] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const result = submitted && condition ? scores[condition] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏡</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Resale Readiness Guide</h1>
        <p style={{ color: '#9AABB8', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          You don't have to be selling now to think about resale. Deferred maintenance compounds fast in DFW's clay soil and extreme weather cycles. Know where you stand before the market forces your hand.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[{ label: '🏗️ Foundation Risk', value: 'DFW\’s expansive clay soil is the #1 resale killer. Buyers always hire structural inspectors.' }, { label: '🌨️ Hail History', value: 'DFW averages 5+ hail events/year. Buyers check roof age and insurance history.' }, { label: '💧 Water Damage', value: 'Staining, mold, or efflorescence are red flags in DFW\’s humid summers.' }, { label: '🔧 HVAC Age', value: 'HVAC systems over 10 years old are heavily negotiated — DFW heat demands reliable AC.' }].map(card => (
            <div key={card.label} style={{ backgroundColor: '#0F2137', borderRadius: 10, padding: 16, border: '1px solid #1C3352' }}>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>{card.label}</div>
              <div style={{ fontSize: 13, color: '#9AABB8', lineHeight: 1.5 }}>{card.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2137', borderRadius: 12, padding: 24, border: '1px solid #1C3352', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#F5E642', marginBottom: 20 }}>📊 Get Your Resale Readiness Score</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9AABB8', marginBottom: 6 }}>Home Age</label>
            <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1C3352', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select age...</option>
              {homeAges.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9AABB8', marginBottom: 6 }}>Current Condition</label>
            <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1C3352', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select condition...</option>
              {conditions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9AABB8', marginBottom: 6 }}>DFW Submarket</label>
            <select value={submarket} onChange={e => setSubmarket(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1C3352', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select submarket...</option>
              {submarkets.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={() => setSubmitted(true)} disabled={!homeAge || !condition || !submarket} style={{ width: '100%', padding: '12px', backgroundColor: homeAge && condition && submarket ? '#F5E642' : '#1C3352', color: homeAge && condition && submarket ? '#0A1628' : '#4A6278', fontWeight: 700, border: 'none', borderRadius: 8, cursor: homeAge && condition && submarket ? 'pointer' : 'not-allowed', fontSize: 15 }}>
            Get My Readiness Score
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0F2137', borderRadius: 12, padding: 24, border: '1px solid #F5E642' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: result.score >= 75 ? '#22C55E' : result.score >= 50 ? '#F59E0B' : '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexShrink: 0 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF' }}>{result.score}</div>
                <div style={{ fontSize: 10, color: '#FFFFFF', opacity: 0.8 }}>/ 100</div>
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#F5E642' }}>Resale Readiness Score</div>
                <div style={{ fontSize: 13, color: '#9AABB8', marginTop: 4 }}>{submarket} · {homeAge} · {condition}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: '#9AABB8', marginBottom: 16, padding: '10px 14px', backgroundColor: '#0A1628', borderRadius: 8, lineHeight: 1.5 }}>{result.note}</div>
            <h4 style={{ fontSize: 15, fontWeight: 600, color: '#F5E642', marginBottom: 12 }}>Top Improvement Priorities:</h4>
            {result.priorities.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#F5E642', color: '#0A1628', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 14, color: '#E8EDF5', lineHeight: 1.5 }}>{item}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
