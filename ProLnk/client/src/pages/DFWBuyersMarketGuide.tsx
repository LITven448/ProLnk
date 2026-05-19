import { useState } from 'react';

const DFW_AREAS = [
  'Plano / Allen / McKinney',
  'Frisco / Prosper / Celina',
  'Fort Worth / Keller / Southlake',
  'Arlington / Mansfield / Grand Prairie',
  'Irving / Las Colinas / Coppell',
  'Garland / Mesquite / Rowlett',
  'Denton / Lewisville / Flower Mound',
  'Richardson / Addison / Carrollton',
];

const MARKET_CONDITIONS = [
  '7+ months inventory (deep buyer\’s market)',
  '6-7 months inventory (moderate buyer\’s market)',
  '4-6 months inventory (balanced)',
  'Under 4 months (seller\’s market)',
];

const strategies: Record<string, Record<string, { strategy: string; concessions: string[]; leverage: string }>> = {
  '7+ months inventory (deep buyer\’s market)': {
    default: {
      strategy: 'Maximum negotiating power — ask for everything. Sellers are motivated and options are limited for them.',
      concessions: ['2-3% closing cost assistance', '1-year home warranty paid by seller', 'Price reductions of 5-8% below list', 'Repair credits after inspection', 'Flexible closing timeline'],
      leverage: 'Extended inspection periods (15+ days), financing contingencies with no penalty, and walk-away rights are all negotiable.',
    },
  },
  '6-7 months inventory (moderate buyer\’s market)': {
    default: {
      strategy: 'Solid leverage but tempered. Target 2-4% below list and request meaningful concessions without overplaying your hand.',
      concessions: ['1-2% closing cost assistance', 'Home warranty ($500-800)', 'Price reduction of 3-5% below list', 'Select repair credits post-inspection'],
      leverage: 'Standard inspection periods, financing contingencies remain strong. Sellers will negotiate rather than relist.',
    },
  },
  '4-6 months inventory (balanced)': {
    default: {
      strategy: 'Balanced market — fair offers near list price win. Pick your battles on concessions and focus on inspection items.',
      concessions: ['Closing cost split', 'Home warranty negotiable', 'Inspection repairs for material defects only'],
      leverage: 'Inspection contingency is your strongest tool. Financing contingencies expected but sellers may push back on extended timelines.',
    },
  },
  'Under 4 months (seller\’s market)': {
    default: {
      strategy: 'DFW\’s most common state. Come in at or above list, minimize contingencies, and move fast — days on market are often under 7.',
      concessions: ['Minimal — focus on winning first', 'Escalation clauses to $5-15K over list', 'Shorten inspection window to 7-10 days'],
      leverage: 'Cash-equivalent financing (pre-underwritten approval) and flexible close dates are your only real edges.',
    },
  },
};

export default function DFWBuyersMarketGuide() {
  const [area, setArea] = useState('');
  const [condition, setCondition] = useState('');

  const result = condition ? strategies[condition]?.default : null;
  const isRarelyBuyerMarket = condition === 'Under 4 months (seller\’s market)' || condition === '4-6 months inventory (balanced)';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
          🏡 DFW Real Estate Intelligence
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 12, lineHeight: 1.2 }}>
          DFW Buyer's Market Guide
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          A true buyer's market in DFW — over 6 months of inventory — is rare in growth corridors but does appear in specific submarkets. Here’s how to recognize it and win when you find it.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📊 What a Buyer's Market Looks Like in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { icon: '📦', label: 'Inventory Signal', value: '6+ months of supply', note: 'Rarely hits this metro-wide' },
              { icon: '⏱️', label: 'Days on Market', value: '45-90+ days', note: 'vs. 7-14 in hot periods' },
              { icon: '💬', label: 'Price Reductions', value: '30-50% of listings', note: 'High churn = buyer power' },
              { icon: '🤝', label: 'Multiple Offers', value: 'Uncommon', note: 'You can take your time' },
            ].map(({ icon, label, value, note }) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{value}</div>
                <div style={{ fontSize: 12, color: '#94A3B8′ }}>{note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🎯 Get Your Strategy</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>DFW Area</label>
              <select value={area} onChange={e => setArea(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select area...</option>
                {DFW_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Current Market Conditions</label>
              <select value={condition} onChange={e => setCondition(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select conditions...</option>
                {MARKET_CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20 }}>
              {isRarelyBuyerMarket && (
                <div style={{ background: '#1E3A5F', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: '#F5E642′ }}>
                  ⚠️ This is not a buyer's market — adapt your approach accordingly.
                </div>
              )}
              <div style={{ fontSize: 15, color: '#E8EDF5', lineHeight: 1.6, marginBottom: 16 }}>{result.strategy}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>💰 Concessions to Request</div>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {result.concessions.map(c => (
                  <li key={c} style={{ fontSize: 14, color: '#94A3B8', marginBottom: 6 }}>{c}</li>
                ))}
              </ul>
              <div style={{ marginTop: 16, padding: 12, background: '#0F2040', borderRadius: 8, fontSize: 13, color: '#94A3B8′ }}>
                🔍 <strong style={{ color: '#E8EDF5′ }}>Inspection Leverage:</strong> {result.leverage}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📍 Where Buyer's Markets Appear in DFW</h2>
          <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.7 }}>
            DFW metro-wide is almost never a true buyer's market. However, pockets emerge: <strong style={{ color: '#E8EDF5' }}>Denton County exurbs</strong> during rate spikes,
            <strong style={{ color: '#E8EDF5′ }}> Kaufman County</strong> and far-eastern suburbs when builders flood with new inventory, and
            <strong style={{ color: '#E8EDF5′ }}> some master-planned communities</strong> in Celina and Prosper during oversupply phases (2023-2024 was an example).
            Watch months-of-supply at the zip code level — not just metro averages — to find your true leverage moment.
          </p>
        </div>
      </div>
    </div>
  );
}
