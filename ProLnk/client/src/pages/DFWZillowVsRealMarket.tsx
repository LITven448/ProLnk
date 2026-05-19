import { useState } from 'react';

const DFW_AREAS = ['Frisco/Prosper', 'Plano/Allen', 'McKinney/Celina', 'Denton/Lewisville', 'Arlington/Grand Prairie', 'Garland/Mesquite', 'Fort Worth Inner Loop', 'Mansfield/Midlothian', 'Rockwall/Royse City', 'Uptown/Highland Park', 'Far North Dallas', 'Irving/Las Colinas'];
const HOME_TYPES = ['Single Family 3/2', 'Single Family 4/3', 'Townhome', 'Condo', 'New Construction', 'Luxury ($750K+)'];

interface ZillowResult {
  accuracy: string;
  avgError: string;
  direction: string;
  betterAlternatives: string[];
  whyTexas: string;
  action: string;
}

function getZillowAnalysis(area: string, type: string): ZillowResult {
  const isLuxury = type === 'Luxury ($750K+)';
  const isCondo = type === 'Condo' || type === 'Townhome';
  const isNew = type === 'New Construction';
  const isHighland = area === 'Uptown/Highland Park';
  const isOuterSuburb = area.includes('Celina') || area.includes('Midlothian') || area.includes('Royse City');

  if (isLuxury || isHighland) return {
    accuracy: 'Poor (often 8–15% off)',
    avgError: '$80,000–$200,000+ on DFW luxury homes',
    direction: 'Can be high or low — luxury comps are sparse and unique',
    betterAlternatives: ['Agent CMA from HAR.com data', 'Certified appraiser', 'Review actual closed sales in HAR', 'Call listing agent for recent comps'],
    whyTexas: 'Texas non-disclosure means Zillow cannot see actual sale prices. Luxury homes have too few comps for any algorithm to be accurate.',
    action: 'Never use Zestimate for luxury DFW pricing. Get a full CMA from an experienced luxury agent.',
  };
  if (isCondo) return {
    accuracy: 'Poor to Moderate (6–12% off)',
    avgError: '$15,000–$45,000 typical error range',
    direction: 'Usually undervalues condos in urban DFW due to HOA and floor level factors not captured',
    betterAlternatives: ['HAR.com active and sold listings', 'Agent CMA specific to your building', 'Check same-building recent sales'],
    whyTexas: 'Condo valuations require building-specific data (floor, view, HOA fees) that Zillow algorithm ignores. Texas non-disclosure compounds the problem.',
    action: 'Pull your specific building sold comps on HAR.com. Zillow Zestimates for condos are essentially guesses.',
  };
  if (isNew) return {
    accuracy: 'Very Poor (often 10–20% off)',
    avgError: '$25,000–$80,000 typical error',
    direction: 'Almost always undervalues — cannot account for upgrades and community premiums',
    betterAlternatives: ['Builder\’s base price + upgrade list', 'Ask builder sales agent for community comps', 'Compare to builder\’s price sheet for same plan'],
    whyTexas: 'New construction upgrades are not in public records. Texas non-disclosure makes builder pricing completely opaque to Zillow.',
    action: 'For new construction in DFW, trust the builder\’s price sheet and compare to inventory homes in the same community.',
  };
  if (isOuterSuburb) return {
    accuracy: 'Moderate (4–8% off)',
    avgError: '$12,000–$30,000 typical error',
    direction: 'Tends to lag appreciation in fast-growing outer suburbs like Celina and Royse City',
    betterAlternatives: ['HAR.com sold comps', 'Agent CMA', 'Active listing price comparison'],
    whyTexas: 'Outer DFW suburbs appreciate rapidly and have thin comp pools. Zillow models lag 3–6 months behind actual market in these areas.',
    action: 'In high-growth outer DFW submarkets, assume Zestimate is 6-month-old data. Pull fresh solds from HAR.',
  };
  return {
    accuracy: 'Fair (3–6% off)',
    avgError: '$10,000–$25,000 typical error range',
    direction: 'Can go either direction but often lags in appreciating areas',
    betterAlternatives: ['HAR.com (Houston Association of Realtors — covers all Texas)', 'Agent CMA with recent solds', 'Active listing price comparison', 'NTREIS data via your agent'],
    whyTexas: 'Texas is a non-disclosure state. Sale prices are not public record, so Zillow uses assessment data and listing prices — not actuals. Accuracy degrades in fast-moving markets.',
    action: 'Use Zestimate as a rough starting point only. Get a HAR.com search for recent solds and ask an agent for a CMA before making any pricing decision.',
  };
}

export default function DFWZillowVsRealMarket() {
  const [area, setArea] = useState('');
  const [homeType, setHomeType] = useState('');
  const [result, setResult] = useState<ZillowResult | null>(null);

  function analyze() {
    if (!area || !homeType) return;
    setResult(getZillowAnalysis(area, homeType));
  }

  const accuracyColor = result ? (result.accuracy.startsWith('Poor') || result.accuracy.startsWith('Very') ? '#ef4444′ : result.accuracy.startsWith(’Fair') ? '#f59e0b' : '#22c55e') : '#fff';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>🔍 DFW Data Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Zillow vs DFW Real Market</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Why Zillow Zestimate is frequently wrong in DFW — and what to use instead for accurate Dallas-Fort Worth home valuations.</p>

        <div style={{ background: '#0f1f3a', border: '1px solid #ef4444', borderRadius: 16, padding: 24, marginBottom: 28 }}>
          <div style={{ color: '#ef4444', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Why Texas Is Zillow's Hardest Market</div>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Texas is a <strong style={{ color: '#e2e8f0′ }}>non-disclosure state</strong> — sale prices are not recorded in public records. Zillow’s algorithm cannot see what homes actually sold for. Instead, it relies on listing prices, tax assessments, and proprietary models. In DFW — one of the fastest-appreciating markets in the US — this creates systematic errors that can mislead buyers and sellers by tens of thousands of dollars.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[['Median DFW Error', '4–8%', 'For standard homes'], ['Luxury DFW Error', '8–15%+', 'For $750K+ homes'], ['New Construction', '10–20%+', 'Upgrades not captured']].map(([label, stat, sub]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ color: '#64748b', fontSize: 11 }}>{label}</div>
                <div style={{ color: '#ef4444', fontWeight: 800, fontSize: 18 }}>{stat}</div>
                <div style={{ color: '#64748b', fontSize: 11 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3a', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Check Zestimate Accuracy for Your DFW Home</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Area</label>
              <select value={area} onChange={e => setArea(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 13 }}>
                <option value=''>Select area...</option>
                {DFW_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 13 }}>
                <option value=''>Select type...</option>
                {HOME_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer' }}>Analyze Accuracy</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ color: accuracyColor, fontWeight: 800, fontSize: 20, marginBottom: 4 }}>Zestimate Accuracy: {result.accuracy}</div>
              <div style={{ color: '#64748b', fontSize: 13, marginBottom: 16 }}>Typical error: {result.avgError} | Direction: {result.direction}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>{result.whyTexas}</div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Better Alternatives:</div>
                <div style={{ display: 'grid', gap: 6 }}>
                  {result.betterAlternatives.map(alt => (
                    <div key={alt} style={{ background: '#0f1f3a', borderRadius: 6, padding: '8px 12px', color: '#e2e8f0', fontSize: 13 }}>✓ {alt}</div>
                  ))}
                </div>
              </div>
              <div style={{ borderTop: '1px solid #1e3a5f', paddingTop: 14, color: '#94a3b8', fontSize: 13 }}>Recommended action: {result.action}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}