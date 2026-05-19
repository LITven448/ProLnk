import { useState } from 'react';

const areas = [
  { name: 'Uptown Dallas', rent: 2180, rentChange5yr: 34, incomeRatio: 0.31, buyBreak: 3.2 },
  { name: 'Deep Ellum', rent: 1920, rentChange5yr: 41, incomeRatio: 0.28, buyBreak: 2.8 },
  { name: 'Plano', rent: 1740, rentChange5yr: 28, incomeRatio: 0.24, buyBreak: 2.1 },
  { name: 'Frisco', rent: 1980, rentChange5yr: 38, incomeRatio: 0.27, buyBreak: 2.4 },
  { name: 'McKinney', rent: 1820, rentChange5yr: 33, incomeRatio: 0.25, buyBreak: 2.2 },
  { name: 'Fort Worth', rent: 1490, rentChange5yr: 29, incomeRatio: 0.22, buyBreak: 1.9 },
  { name: 'Arlington', rent: 1380, rentChange5yr: 26, incomeRatio: 0.21, buyBreak: 1.7 },
  { name: 'Garland', rent: 1290, rentChange5yr: 31, incomeRatio: 0.20, buyBreak: 1.6 },
  { name: 'Denton', rent: 1420, rentChange5yr: 35, incomeRatio: 0.23, buyBreak: 1.8 },
  { name: 'Irving', rent: 1560, rentChange5yr: 27, incomeRatio: 0.24, buyBreak: 2.0 },
];

const dfwMedianRent = 1680;
const dfwRentGrowth5yr = 31;

export default function DFWRentPriceIndexGuide() {
  const [selectedArea, setSelectedArea] = useState('');
  const [currentRent, setCurrentRent] = useState('');
  const [result, setResult] = useState<null | {
    area: (typeof areas)[0];
    vsMedian: string;
    breakEven: string;
    trend: string;
    advice: string;
  }>(null);

  function calculate() {
    const area = areas.find((a) => a.name === selectedArea);
    if (!area || !currentRent) return;
    const rent = parseInt(currentRent);
    const diff = rent - dfwMedianRent;
    const vsMedian = diff >= 0 ? `$${diff} above DFW median` : `$${Math.abs(diff)} below DFW median`;
    const breakEven = `~${area.buyBreak} years in ${area.name} at current rates`;
    const trend = area.rentChange5yr > dfwRentGrowth5yr
      ? `${area.name} rents grew ${area.rentChange5yr}% over 5 yrs — outpacing the DFW average of ${dfwRentGrowth5yr}%.`
      : `${area.name} rents grew ${area.rentChange5yr}% over 5 yrs — below the DFW average of ${dfwRentGrowth5yr}%.`;
    const advice = rent / 1 > area.rent * 0.95
      ? `Your rent is near or above market. Buying could lock in predictable costs and build equity vs. continued rent inflation.`
      : `You may be below market — weigh your flexibility needs before committing to a purchase.`;
    setResult({ area, vsMedian, breakEven, trend, advice });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW MARKET INTELLIGENCE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Rent Price Index Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Where DFW rents stand, where they're heading, and when buying beats renting.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[['DFW Median Rent', `$${dfwMedianRent}/mo`], ['5-Yr Rent Growth', `+${dfwRentGrowth5yr}%`], ['Rent-to-Income', '26% avg']].map(([label, val]) => (
            <div key={label} style={{ background: '#0F2137', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2137', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📊 RENT TRENDS & WHAT THEY MEAN</div>
          {[
            '📈 DFW rents have risen 31% in 5 years — outpacing national average of 24%',
            '💸 High rents are accelerating the buy timeline: renters lose $500–$900/mo to landlord equity in top submarkets',
            '🏙️ Uptown and Legacy West areas have highest rent-to-income ratios — strongest case for buying',
            '🔮 Rent growth expected to moderate to 3–5%/yr through 2028 as new supply comes online in Frisco/Celina corridors',
          ].map((item) => (
            <div key={item} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, lineHeight: 1.5 }}>{item}</div>
          ))}
        </div>

        <div style={{ background: '#0F2137', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🏠 RENT VS BUY CALCULATOR</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 6 }}>DFW AREA</label>
              <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select area...</option>
                {areas.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 12, display: 'block', marginBottom: 6 }}>CURRENT MONTHLY RENT ($)</label>
              <input type='number' value={currentRent} onChange={(e) => setCurrentRent(e.target.value)} placeholder='e.g. 1800' style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Analyze My Rent</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>{result.vsMedian}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Break-even on purchase: {result.breakEven}</div>
              <div style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6 }}>{result.trend}</div>
              <div style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6, borderTop: '1px solid #1e3a5f', paddingTop: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>Recommendation: </span>{result.advice}
              </div>
            </div>
          )}
        </div>

        <div style={{ color: '#475569', fontSize: 12, textAlign: 'center' }}>Data reflects 2025–2026 DFW market conditions. Not financial advice.</div>
      </div>
    </div>
  );
}
