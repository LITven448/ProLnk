import { useState } from 'react';

const energySituations = [
  'Natural gas furnace + AC',
  'Heat pump (electric only)',
  'Heat pump + rooftop solar',
  'Mini-split system',
  'Mini-split + battery storage',
];

const carbonData: Record<string, { lbs: number; rating: string; reduction: string; plan: string; color: string }> = {
  'Natural gas furnace + AC': {
    lbs: 14200,
    rating: 'High',
    reduction: 'Highest impact: switch to heat pump — saves 6,000–8,000 lbs CO₂/year in DFW',
    plan: '🌿 Your natural gas furnace burns 40–60 therms/month in peak winter. In DFW, this accounts for 35% of your home\’s carbon. Replace with a heat pump to cut HVAC carbon by 45-60%. Use the $2,000 federal heat pump tax credit toward upgrade cost.',
    color: '#ef4444',
  },
  'Heat pump (electric only)': {
    lbs: 7800,
    rating: 'Moderate',
    reduction: 'Add solar to eliminate 70%+ of your remaining HVAC carbon',
    plan: '☀️ Great starting point. Your DFW heat pump runs on grid power which is still 35% fossil fuel in ERCOT. Adding a 6kW solar system will cover 80-100% of HVAC electricity in DFW. ROI: 8-11 years. Carbon impact: -5,000 lbs/year.',
    color: '#eab308',
  },
  'Heat pump + rooftop solar': {
    lbs: 1200,
    rating: 'Low',
    reduction: 'Add battery storage to achieve near-zero operational carbon',
    plan: '🔋 You are already in the top 10% of DFW homes for carbon efficiency. Your remaining 1,200 lbs comes from grid draw on cloudy days and at night. Adding a 10kWh battery stores solar for evening HVAC — reduces grid dependence by 90%.',
    color: '#22c55e',
  },
  'Mini-split system': {
    lbs: 6400,
    rating: 'Moderate',
    reduction: 'Add solar to dramatically reduce remaining carbon footprint',
    plan: '🌬️ Mini-splits are 25-40% more efficient than central AC, so you\’re already doing well. Your carbon comes entirely from ERCOT grid electricity. A 4kW solar system in DFW generates enough to cover mini-split usage 8 months of the year.',
    color: '#eab308',
  },
  'Mini-split + battery storage': {
    lbs: 900,
    rating: 'Very Low',
    reduction: 'Add solar generation to achieve near-zero HVAC carbon',
    plan: '⚡ Excellent setup — you have the storage, now add the generation. A 5-6kW solar array will make your DFW HVAC system carbon-negative (you\’ll export excess power back to the grid). Your total HVAC carbon could drop below 200 lbs/year.',
    color: '#06b6d4',
  },
};

const actions = [
  { label: 'Seal attic air leaks', impact: '8%', cost: '$500–1,500', time: 'Today' },
  { label: 'MERV-13 air filter', impact: '3%', cost: '$25/quarter', time: 'This week' },
  { label: 'Programmable thermostat', impact: '10%', cost: '$200–400', time: 'This month' },
  { label: 'Add attic radiant barrier', impact: '12%', cost: '$800–2,000', time: 'This season' },
  { label: 'Replace with heat pump', impact: '45%', cost: '$6,000–12,000', time: 'This year' },
  { label: 'Add rooftop solar', impact: '70%', cost: '$15,000–25,000', time: '1–3 years' },
];

export default function DFWHVACCarbonFootprint() {
  const [situation, setSituation] = useState('Natural gas furnace + AC');
  const data = carbonData[situation];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>HVAC Carbon Footprint in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>HVAC accounts for 40-50% of a DFW home's energy use — and energy use is the largest source of residential carbon. Here is how to measure and cut yours.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🌍 What Is Your DFW Energy Setup?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {energySituations.map(s => (
              <button key={s} onClick={() => setSituation(s)}
                style={{ padding: '8px 14px', borderRadius: 6, border: 'none', cursor: 'pointer',
                  background: situation === s ? '#F5E642' : '#162035', color: situation === s ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 12 }}>
                {s}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div style={{ background: '#162035', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Annual HVAC Carbon</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: data.color }}>{data.lbs.toLocaleString()} lbs</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>CO₂ equivalent per year</div>
            </div>
            <div style={{ background: '#162035', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Carbon Rating</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: data.color }}>{data.rating}</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>vs DFW average: 9,400 lbs</div>
            </div>
          </div>

          <div style={{ background: '#1a2a4a', borderRadius: 10, padding: 20, borderLeft: `4px solid ${data.color}`, marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4, fontWeight: 700 }}>BIGGEST REDUCTION OPPORTUNITY</div>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>{data.reduction}</div>
            <div style={{ color: '#e2e8f0', lineHeight: 1.7 }}>{data.plan}</div>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📋 Carbon Reduction Action List</div>
          {actions.map((a, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#162035', borderRadius: 8, padding: '12px 16px', marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{a.label}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{a.cost} · {a.time}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#22c55e', fontWeight: 800 }}>-{a.impact}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>carbon</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18 }}>Cut Carbon and Energy Bills Together</div>
          <div style={{ color: '#162035', marginTop: 4, fontSize: 14 }}>ProLnk connects you with DFW HVAC pros who specialize in heat pumps, insulation, and solar integration.</div>
          <button style={{ marginTop: 12, background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
