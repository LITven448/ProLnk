import { useState } from 'react';

const homeTypes = ['Single Family', 'Townhome', 'Condo'];
const homeAges = ['Built after 2012', '2000–2012', '1985–2000', 'Before 1985'];

const gapData: Record<string, Record<string, { gap: string; upgrades: string[]; cost: string; savings: string }>> = {
  'Single Family': {
    'Built after 2012': { gap: 'Minimal', upgrades: ['Smart thermostat', 'LED lighting'], cost: '$500–$1,500', savings: '5–10%' },
    '2000–2012': { gap: 'Moderate', upgrades: ['Attic air sealing', 'HVAC tune-up', 'Low-E windows'], cost: '$3,000–$8,000', savings: '15–25%' },
    '1985–2000': { gap: 'Significant', upgrades: ['Insulation upgrade', 'HVAC replacement', 'Air sealing', 'Window replacement'], cost: '$8,000–$18,000', savings: '25–35%' },
    'Before 1985': { gap: 'Major', upgrades: ['Full air barrier', 'R-38+ attic insulation', 'High-SEER HVAC', 'Duct sealing', 'Window upgrade'], cost: '$15,000–$35,000', savings: '35–50%' },
  },
  'Townhome': {
    'Built after 2012': { gap: 'Minimal', upgrades: ['Smart thermostat', 'LED lighting'], cost: '$400–$1,200', savings: '5–8%' },
    '2000–2012': { gap: 'Low-Moderate', upgrades: ['Attic sealing', 'HVAC tune-up'], cost: '$2,000–$5,000', savings: '12–20%' },
    '1985–2000': { gap: 'Moderate', upgrades: ['Insulation', 'Air sealing', 'HVAC'], cost: '$5,000–$12,000', savings: '20–30%' },
    'Before 1985': { gap: 'Major', upgrades: ['Full envelope upgrade', 'HVAC', 'Duct sealing'], cost: '$10,000–$25,000', savings: '30–45%' },
  },
  'Condo': {
    'Built after 2012': { gap: 'Minimal', upgrades: ['Smart thermostat'], cost: '$300–$800', savings: '3–6%' },
    '2000–2012': { gap: 'Low', upgrades: ['Weatherstripping', 'Thermostat upgrade'], cost: '$1,000–$3,000', savings: '8–15%' },
    '1985–2000': { gap: 'Moderate', upgrades: ['Window film', 'Air sealing', 'HVAC'], cost: '$3,000–$8,000', savings: '15–22%' },
    'Before 1985': { gap: 'Significant', upgrades: ['Full HVAC', 'Window upgrade', 'Insulation'], cost: '$8,000–$18,000', savings: '22–35%' },
  },
};

export default function DFWEnergyStarHomeGuide() {
  const [homeType, setHomeType] = useState('');
  const [homeAge, setHomeAge] = useState('');

  const result = homeType && homeAge ? gapData[homeType]?.[homeAge] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME EFFICIENCY</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>ENERGY STAR Home Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>In DFW, your AC runs 7+ months a year. ENERGY STAR certification means real savings — not just a label.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '❄️', title: 'Tighter Envelope', desc: 'Less air leakage means your AC does not fight the outdoors all day.' },
            { icon: '🌡️', title: 'Higher-Efficiency HVAC', desc: 'SEER2 15.2+ minimum — designed for Texas heat loads.' },
            { icon: '🏠', title: 'Better Insulation', desc: 'R-38+ attic insulation keeps heat out where it matters most in DFW.' },
            { icon: '💡', title: 'Verified Performance', desc: 'Third-party HERS rater tests every certified home — not self-reported.' },
          ].map(f => (
            <div key={f.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{f.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🔍 ENERGY STAR Gap Analysis</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value=''>Select type...</option>
                {homeTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Year Built</label>
              <select value={homeAge} onChange={e => setHomeAge(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value=''>Select age...</option>
                {homeAges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div><div style={{ color: '#94A3B8', fontSize: 12 }}>ENERGY STAR Gap</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>{result.gap}</div></div>
                <div><div style={{ color: '#94A3B8', fontSize: 12 }}>Upgrade Cost</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>{result.cost}</div></div>
                <div><div style={{ color: '#94A3B8', fontSize: 12 }}>Energy Savings</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>{result.savings}</div></div>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Recommended upgrades to reach certification:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {result.upgrades.map(u => (
                  <span key={u} style={{ background: '#1E3A5F', borderRadius: 20, padding: '4px 12px', fontSize: 13 }}>✅ {u}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 12 }}>📋 Buying vs. Certifying in DFW</h3>
          <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>
            New ENERGY STAR homes in DFW carry a $10K–$25K premium — but save $1,200–$2,400/year in utility costs. Certifying an existing home costs $500–$2,000 in HERS rating fees plus upgrade costs. Most DFW homeowners reach payback in 7–12 years.
          </div>
        </div>
      </div>
    </div>
  );
}
