import { useState } from 'react';

const options = [
  { label: 'Keep the House', value: 'keep' },
  { label: 'Sell the House', value: 'sell' },
  { label: 'Buyout Partner', value: 'buyout' },
];

export default function DFWRecentlyDivorcedHomeGuide() {
  const [equity, setEquity] = useState('');
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState<null | { ranked: string[]; tax: string; step: string }>(null);

  function calculate() {
    const eq = parseInt(equity) || 0;
    const ranked: string[] = [];
    const hasKids = situation === 'kids';
    const highEquity = eq > 150000;

    if (hasKids && highEquity) ranked.push('Refinance into one name (stability for children)', 'Deferred sale agreement', 'Equity buyout with co-parenting clause');
    else if (hasKids) ranked.push('Sell and split proceeds (clean break)', 'Equity buyout if one spouse qualifies alone', 'Rent to one spouse temporarily');
    else if (highEquity) ranked.push('Equity buyout — largest asset, negotiate hard', 'Sell and 1031 exchange into investment', 'Refinance and cash-out to divide proceeds');
    else ranked.push('Sell quickly — minimize carrying costs', 'Divide proceeds and start fresh', 'Rent out if neither can qualify to refi');

    const tax = highEquity
      ? 'Texas has no state income tax. Federal exclusion: $250K per person if lived in home 2 of last 5 years. Consult CPA on timing.'
      : 'Proceeds under exclusion threshold — likely no capital gains. Confirm with CPA if home appreciated significantly.';

    const step = hasKids
      ? 'Get a QDRO attorney for pension/retirement splits, then a real estate attorney for the home.'
      : 'Order a home appraisal immediately — sets negotiation baseline and speeds resolution.';

    setResult({ ranked, tax, step });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f6f0', color: '#1a1a2e', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>DFW HOME GUIDE — LIFE TRANSITION</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          🏠 Home Decisions After Divorce
        </h1>
        <p style={{ fontSize: 16, color: '#444', marginBottom: 32, lineHeight: 1.6 }}>
          Texas is a community property state. That changes everything about how your home equity is divided. Here's how to think through your options clearly — without the emotional fog.
        </p>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #e0ddd5′ }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔑 Texas Community Property Basics</h2>
          <ul style={{ lineHeight: 2, paddingLeft: 20, color: '#333′ }}>
            <li>Home acquired during marriage = community property, split 50/50 by default</li>
            <li>Home owned before marriage may be separate property — document it</li>
            <li>Refinancing removes ex-spouse from mortgage liability (deed of trust separate from title)</li>
            <li>Quitclaim deed transfers title; refinance removes mortgage obligation</li>
            <li>Texas does not have a homestead exception override in divorce — both spouses must agree</li>
          </ul>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #e0ddd5′ }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>📊 Find Your Best Option</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Estimated home equity ($)</label>
            <input
              type="number"
              value={equity}
              onChange={e => setEquity(e.target.value)}
              placeholder="e.g. 180000″
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 15, boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Your situation</label>
            {[{ v: 'kids', l: '👨‍👩‍👧 Children in the home' }, { v: 'nokids', l: '🤝 No children, clean split' }, { v: 'investment', l: '📈 Home was an investment' }].map(opt => (
              <label key={opt.v} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, cursor: 'pointer' }}>
                <input type="radio" name="situation" value={opt.v} checked={situation === opt.v} onChange={() => setSituation(opt.v)} />
                {opt.l}
              </label>
            ))}
          </div>
          <button onClick={calculate} disabled={!equity || !situation}
            style={{ background: '#1a1a2e', color: '#F5E642', padding: '12px 28px', borderRadius: 8, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Show My Options →
          </button>
        </div>

        {result && (
          <div style={{ background: '#1a1a2e', borderRadius: 12, padding: 24, color: '#fff' }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>Your Options — Ranked</h3>
            {result.ranked.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{ background: '#F5E642', color: '#1a1a2e', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0, fontSize: 13 }}>{i + 1}</span>
                <span style={{ lineHeight: 1.5 }}>{r}</span>
              </div>
            ))}
            <div style={{ marginTop: 20, padding: 16, background: 'rgba(245,230,66,0.1)', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>💰 Tax Implications</div>
              <div style={{ fontSize: 14, lineHeight: 1.6, color: '#ddd' }}>{result.tax}</div>
            </div>
            <div style={{ marginTop: 16, padding: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>✅ Recommended First Step</div>
              <div style={{ fontSize: 14, lineHeight: 1.6 }}>{result.step}</div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e0ddd5′ }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🛠️ Getting the Home Ready to Sell Fast</h2>
          <p style={{ color: '#555', lineHeight: 1.7 }}>DFW buyers move fast. Focus on: fresh neutral paint, HVAC service record in hand, any foundation disclosure ready, and a pre-listing inspection. ProLnk can connect you with vetted contractors for pre-sale repairs — no upselling, no pressure.</p>
        </div>
      </div>
    </div>
  );
}
