import { useState } from 'react';

const DFW_AREAS = [
  { area: 'Uptown / Oak Lawn', rent: '$1,800–$3,500/mo', notes: 'Walk to restaurants and entertainment. Best for buyers targeting M Streets, Highland Park area. Month-to-month premium ~15%.' },
  { area: 'Frisco / McKinney / Allen', rent: '$1,400–$2,400/mo', notes: 'Best for families targeting northern suburbs. High supply keeps prices reasonable. Many new complexes offer 60-day out clauses.' },
  { area: 'Plano / Richardson', rent: '$1,300–$2,200/mo', notes: 'Near major employers (Toyota, JPMorgan). Good for buyers targeting East Plano, Richardson, or Garland.' },
  { area: 'Fort Worth / Southlake / Keller', rent: '$1,200–$2,000/mo', notes: 'Less supply of furnished/short-term in Far West. Target older Class B complexes that offer month-to-month.' },
  { area: 'Las Colinas / Irving', rent: '$1,400–$2,300/mo', notes: 'Central DFW location. Good if targeting mid-cities homes. Corporate housing market here is active — good for furnished options.' },
  { area: 'Addison / Carrollton', rent: '$1,300–$2,100/mo', notes: 'Good supply of shorter-term leases. Near highways for wide home search radius.' },
];

const TIMELINES = ['1–3 months', '3–6 months', '6–12 months', 'Unknown timeline'];
const BUDGETS = ['Under $1,500/mo', '$1,500–$2,000/mo', '$2,000–$3,000/mo', 'Over $3,000/mo'];

function getStrategy(timeline: string) {
  if (timeline === '1–3 months') return { label: 'Month-to-Month', tip: 'Pay the premium (10–20% above base rent) for month-to-month flexibility. Avoid any lease with a penalty over 2 months rent for early exit.' };
  if (timeline === '3–6 months') return { label: 'Short-Term Lease (3–6 mo)', tip: 'Negotiate a 3 or 6 month lease. DFW has many complexes willing to offer this, especially in Q4 when occupancy is lower.' };
  if (timeline === '6–12 months') return { label: '12-Month Lease with Break Clause', tip: 'Sign a 12-month lease and negotiate a 60-day out clause. Many DFW landlords accept this with a $500–$1,000 fee.' };
  return { label: 'Flexible / Furnished', tip: 'Consider furnished extended-stay (Oakwood, National Corporate Housing) while you finalize your search area. Higher cost but maximum flexibility.' };
}

export default function DFWApartmentPreparationGuide() {
  const [targetArea, setTargetArea] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getStrategy> | null>(null);
  const [areaInfo, setAreaInfo] = useState<typeof DFW_AREAS[0] | null>(null);

  function calculate() {
    if (!timeline) return;
    setResult(getStrategy(timeline));
    const found = DFW_AREAS.find((a) => a.area === targetArea) || null;
    setAreaInfo(found);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>DFW Apartment Preparation Guide</h1>
        <p style={{ color: '#8A9BC0', fontSize: 15, marginBottom: 32 }}>
          Selling before buying in DFW? Here's how to find a temporary apartment that keeps you flexible — without overpaying or getting locked in.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>📍 DFW Area Overview</h2>
          {DFW_AREAS.map((a) => (
            <div key={a.area} style={{ borderBottom: '1px solid #1E2F4A', paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{a.area}</div>
              <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 4 }}>💰 {a.rent}</div>
              <div style={{ fontSize: 12, color: '#6B7FA0′ }}>{a.notes}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>💡 What to Negotiate in DFW</h2>
          <ul style={{ fontSize: 13, color: '#8A9BC0', paddingLeft: 18, margin: 0 }}>
            <li style={{ marginBottom: 8 }}>Month-to-month clause or 60-day out provision (especially Q4 when complexes have vacancy)</li>
            <li style={{ marginBottom: 8 }}>Waived application fee if you pay first month upfront</li>
            <li style={{ marginBottom: 8 }}>Free parking (covered spots typically $75–$150/mo in DFW)</li>
            <li style={{ marginBottom: 8 }}>Storage unit — critical when you're between homes with furniture in storage</li>
            <li>First month free — common in DFW new construction lease-ups</li>
          </ul>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔧 Build Your Strategy</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, color: '#8A9BC0', display: 'block', marginBottom: 6 }}>Target DFW Area (for home purchase)</label>
              <select value={targetArea} onChange={(e) => setTargetArea(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2F4A', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="">Select area</option>
                {DFW_AREAS.map((a) => <option key={a.area} value={a.area}>{a.area}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#8A9BC0', display: 'block', marginBottom: 6 }}>Monthly Apartment Budget</label>
              <select value={budget} onChange={(e) => setBudget(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2F4A', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="">Select budget</option>
                {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#8A9BC0', display: 'block', marginBottom: 6 }}>Estimated Timeline Before Purchase</label>
              <select value={timeline} onChange={(e) => setTimeline(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2F4A', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="">Select timeline</option>
                {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Get Apartment Strategy →
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏠 Strategy: {result.label}</div>
              <div style={{ fontSize: 13, color: '#8A9BC0', marginBottom: 10 }}>💡 {result.tip}</div>
              {areaInfo && (
                <div style={{ borderTop: '1px solid #1E2F4A', paddingTop: 12 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>📍 {areaInfo.area}</div>
                  <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 4 }}>💰 {areaInfo.rent}</div>
                  <div style={{ fontSize: 12, color: '#6B7FA0′ }}>{areaInfo.notes}</div>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ fontSize: 12, color: '#4A5A70', textAlign: 'center' }}>
          DFW rental market is competitive — visit complexes in person and ask directly about short-term lease options not listed online.
        </div>
      </div>
    </div>
  );
}
