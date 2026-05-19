import { useState } from 'react';

type Budget = 'economy' | 'standard' | 'premium';
type HomeSize = 'small' | 'medium' | 'large';

const recommendations: Record<Budget, Record<HomeSize, { system: string; brand: string; seer: string; cost: string; monthlyEst: string; notes: string }>> = {
  economy: {
    small: { system: '2-ton split system', brand: 'Goodman / Rheem entry', seer: '14 SEER2', cost: '$3,200 – $4,800', monthlyEst: '$95 – $130', notes: 'Best for budget-conscious retirees. Does the job, 10-year parts warranty.' },
    medium: { system: '3-ton split system', brand: 'Goodman / Rheem entry', seer: '14 SEER2', cost: '$4,200 – $6,000', monthlyEst: '$120 – $160', notes: 'Reliable workhorse for the price. Cooling capacity sufficient, efficiency is basic.' },
    large: { system: '4-5 ton split system', brand: 'Goodman entry-tier', seer: '14 SEER2', cost: '$5,500 – $8,200', monthlyEst: '$155 – $210', notes: 'Will handle the square footage. Larger homes benefit more from mid-tier efficiency savings.' },
  },
  standard: {
    small: { system: '2-ton heat pump', brand: 'Carrier / Trane mid', seer: '16–17 SEER2', cost: '$5,500 – $7,800', monthlyEst: '$75 – $105', notes: 'Sweet spot for most Bedford homes. Heat pump handles mild TX winters efficiently.' },
    medium: { system: '3-ton heat pump', brand: 'Carrier / Trane mid', seer: '16–17 SEER2', cost: '$6,800 – $9,500', monthlyEst: '$95 – $135', notes: 'Most popular choice. Energy savings vs economy typically pay back in 5-7 years.' },
    large: { system: '4-5 ton dual-stage', brand: 'Lennox / Trane mid', seer: '17–18 SEER2', cost: '$9,000 – $13,500', monthlyEst: '$130 – $185', notes: 'Dual-stage compressor reduces runtime and humidity issues common in TX.' },
  },
  premium: {
    small: { system: 'Variable-speed mini-split', brand: 'Mitsubishi / Daikin', seer: '20–25 SEER2', cost: '$8,500 – $13,000', monthlyEst: '$55 – $80', notes: 'Best for retirees on fixed income long-term — lowest energy bills, 15+ year lifespan.' },
    medium: { system: 'Variable-speed communicating system', brand: 'Lennox XC21 / Carrier Infinity', seer: '21–24 SEER2', cost: '$12,000 – $18,000', monthlyEst: '$70 – $110', notes: 'Whole-home comfort with smart zoning. Whisper-quiet operation, app control.' },
    large: { system: 'Zoned variable-speed system', brand: 'Carrier Infinity / Trane XV', seer: '20–22 SEER2', cost: '$16,000 – $26,000', monthlyEst: '$100 – $155', notes: 'Multiple zones eliminate hot/cold spots. 10-year full system warranty standard.' },
  },
};

const budgetLabels: Record<Budget, string> = { economy: '💵 Economy', standard: '⚖️ Standard', premium: '🏆 Premium' };
const sizeLabels: Record<HomeSize, string> = { small: '🏠 Small (< 1,500 sq ft)', medium: '🏡 Medium (1,500–2,500)', large: '🏘️ Large (2,500+ sq ft)' };

export default function DFWHVACBedford() {
  const [budget, setBudget] = useState<Budget | ''>('');
  const [size, setSize] = useState<HomeSize | ''>('');
  const rec = budget && size ? recommendations[budget][size] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ borderBottom: '3px solid #F5E642', paddingBottom: 24, marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
            🌡️ BEDFORD TX — MID-CITIES COMFORT EXPERTS
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
            Bedford HVAC<br />Installed Right, Priced Fair
          </h1>
          <p style={{ color: '#a0aec0', fontSize: 18, marginTop: 16, maxWidth: 640 }}>
            Bedford's mix of retirees and young families means we see every budget level. Our HVAC pros match you to the right system — not the most expensive one — for your home size and financial goals.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '👴', label: 'Retiree-Friendly', detail: 'Fixed-income efficiency options' },
            { icon: '👨‍👩‍👧', label: 'Young Families', detail: 'Value + long-term comfort' },
            { icon: '🏘️', label: 'Established Suburb', detail: 'Mix of home sizes & ages' },
            { icon: '⚡', label: 'Utility Rebates', detail: 'Oncor rebates available' },
          ].map((item) => (
            <div key={item.label} style={{ backgroundColor: '#111f35', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: '#a0aec0', fontSize: 14 }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111f35', border: '2px solid #F5E642', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginTop: 0, marginBottom: 8 }}>
            🧮 System Recommender
          </h2>
          <p style={{ color: '#a0aec0', marginBottom: 28 }}>Select your budget level and home size to get a personalized system recommendation with cost and estimated monthly energy savings.</p>

          <div style={{ marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 12 }}>Your Budget Level:</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {(['economy', 'standard', 'premium'] as Budget[]).map((b) => (
                <button
                  key={b}
                  onClick={() => { setBudget(b); }}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: budget === b ? '#F5E642' : '#0A1628',
                    color: budget === b ? '#0A1628' : '#fff',
                    border: `1px solid ${budget === b ? '#F5E642' : '#1e3a5f'}`,
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  {budgetLabels[b]}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 12 }}>Your Home Size:</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {(['small', 'medium', 'large'] as HomeSize[]).map((s) => (
                <button
                  key={s}
                  onClick={() => { setSize(s); }}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: size === s ? '#F5E642' : '#0A1628',
                    color: size === s ? '#0A1628' : '#fff',
                    border: `1px solid ${size === s ? '#F5E642' : '#1e3a5f'}`,
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  {sizeLabels[s]}
                </button>
              ))}
            </div>
          </div>

          {rec && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>✅ Recommended: {rec.system}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 20 }}>
                <div style={{ backgroundColor: '#111f35', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#a0aec0', fontSize: 11, marginBottom: 4 }}>BRAND</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{rec.brand}</div>
                </div>
                <div style={{ backgroundColor: '#111f35', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#a0aec0', fontSize: 11, marginBottom: 4 }}>EFFICIENCY</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{rec.seer}</div>
                </div>
                <div style={{ backgroundColor: '#111f35', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#a0aec0', fontSize: 11, marginBottom: 4 }}>TOTAL COST</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 16 }}>{rec.cost}</div>
                </div>
                <div style={{ backgroundColor: '#111f35', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#a0aec0', fontSize: 11, marginBottom: 4 }}>EST. MONTHLY ENERGY</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{rec.monthlyEst}</div>
                </div>
              </div>
              <div style={{ color: '#a0aec0', lineHeight: 1.6 }}>💡 {rec.notes}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Get a Bedford HVAC Quote</div>
          <p style={{ color: '#1a2f4a', marginBottom: 24 }}>Licensed, insured, Oncor rebate-eligible installs. Serving all of Bedford and Mid-Cities.</p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 800, fontSize: 17, padding: '16px 40px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Request My Free Quote 🌡️
          </button>
        </div>

      </div>
    </div>
  );
}
