import { useState } from 'react';

export default function DFWWindHailDeductibleGuide() {
  const [dwellingValue, setDwellingValue] = useState('');
  const [deductibleType, setDeductibleType] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculate = () => {
    const dwelling = parseFloat(dwellingValue?.replace(/,/g, '')) || 0;
    const claim = parseFloat(claimAmount?.replace(/,/g, '')) || 0;
    const pct = deductibleType === '2pct' ? 0.02 : deductibleType === '1pct' ? 0.01 : 0;
    return { dwelling, claim, pct, deductible: Math.round(dwelling * pct) };
  };

  const result = calculate();

  const getVerdict = () => {
    if (!result.deductible || !result.claim) return null;
    const netPayout = result.claim - result.deductible;
    if (netPayout <= 0) return { file: false, reason: 'Claim is at or below your deductible. You would receive $0 — pay out of pocket.', color: '#dc3545′ };
    if (netPayout < 2000) return { file: false, reason: `Net payout after deductible is only $${netPayout.toLocaleString()}. Filing may not be worth the claim history impact on your premium.`, color: '#fd7e14′ };
    if (netPayout < 5000) return { file: true, reason: `Net payout is $${netPayout.toLocaleString()}. Borderline — weigh against potential 15-25% premium increase next renewal.`, color: '#ffc107′ };
    return { file: true, reason: `Net payout is $${netPayout.toLocaleString()}. Generally worth filing. Document thoroughly before work starts.`, color: '#28a745′ };
  };

  const verdict = getVerdict();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', opacity: 0.8 }}>ProLnk Guide · DFW Homeowners</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F5E642′ }}>
          🌪️ DFW Wind/Hail Deductible Guide
        </h1>
        <p style={{ color: '#ccc', marginBottom: '2rem', lineHeight: 1.6 }}>
          DFW homeowners face separate wind and hail deductibles — often 1-2% of your dwelling value. A $450,000 home with a 2% deductible means $9,000 out of pocket before insurance pays a cent on storm damage.
        </p>

        <div style={{ background: 'rgba(245,230,66,0.1)', border: '1px solid #F5E642', borderRadius: 10, padding: '1.25rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642′ }}>Why DFW Has Separate Wind/Hail Deductibles</h2>
          <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
            After repeated major hail events in the late 1990s and 2000s, insurers lobbied Texas regulators to allow percentage-based deductibles specifically for wind and hail. This shifts significant claim costs to homeowners and reduces insurer losses in high-frequency storm markets like DFW. It's now standard — but the percentage and structure vary by policy.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: '#112240', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>1%</div>
            <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>1% of Dwelling Value</div>
            <div style={{ color: '#ccc', fontSize: '0.85rem', lineHeight: 1.5 }}>
              On a $400K home: <strong style={{ color: '#F5E642′ }}>$4,000 deductible</strong><br />
              Better for homeowners who want lower out-of-pocket on claims. Often paired with slightly higher premium.
            </div>
          </div>
          <div style={{ background: '#112240', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>2%</div>
            <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>2% of Dwelling Value</div>
            <div style={{ color: '#ccc', fontSize: '0.85rem', lineHeight: 1.5 }}>
              On a $400K home: <strong style={{ color: '#F5E642′ }}>$8,000 deductible</strong><br />
              Lower premium. Significant risk if you have frequent hail events. Most common in DFW market.
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem', color: '#F5E642′ }}>🧮 Should I File This Claim?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem', color: '#ccc' }}>Dwelling Coverage ($)</label>
              <input value={dwellingValue} onChange={e => setDwellingValue(e.target.value)} placeholder="e.g. 420000″ style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #334', background: '#0d1b2a', color: '#fff', fontSize: '0.9rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem', color: '#ccc' }}>Deductible Type</label>
              <select value={deductibleType} onChange={e => setDeductibleType(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #334', background: '#0d1b2a', color: '#fff', fontSize: '0.9rem' }}>
                <option value="">Select...</option>
                <option value="1pct">1% of Dwelling</option>
                <option value="2pct">2% of Dwelling</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem', color: '#ccc' }}>Estimated Damage ($)</label>
              <input value={claimAmount} onChange={e => setClaimAmount(e.target.value)} placeholder="e.g. 12000″ style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #334', background: '#0d1b2a', color: '#fff', fontSize: '0.9rem' }} />
            </div>
          </div>
          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Calculate</button>

          {showResult && result.deductible > 0 && (
            <div style={{ marginTop: '1.25rem' }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#ccc', marginBottom: '0.25rem' }}>Your effective wind/hail deductible</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642′ }}>${result.deductible.toLocaleString()}</div>
                <div style={{ fontSize: '0.85rem', color: '#aaa' }}>= {deductibleType === '2pct' ? '2%' : '1%'} × ${result.dwelling.toLocaleString()} dwelling value</div>
              </div>
              {verdict && (
                <div style={{ background: verdict.color + '20', border: `1px solid ${verdict.color}`, borderRadius: 8, padding: '1rem' }}>
                  <strong style={{ color: verdict.color }}>{verdict.file ? '✅ Consider Filing' : '❌ Think Twice'}</strong>
                  <p style={{ color: '#ccc', fontSize: '0.9rem', margin: '0.5rem 0 0′ }}>{verdict.reason}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642′ }}>📌 Key Things to Know</h3>
          <ul style={{ paddingLeft: '1.2rem', color: '#ccc', fontSize: '0.9rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>The wind/hail deductible applies per occurrence — each storm event is a separate deductible</li>
            <li style={{ marginBottom: '0.5rem' }}>Filing a claim affects your CLUE report for 5 years — even if no payout occurs</li>
            <li style={{ marginBottom: '0.5rem' }}>Some carriers have moved to "ACV roof schedules" — you pay depreciation on older roofs</li>
            <li style={{ marginBottom: '0.5rem' }}>Get a contractor estimate before deciding to file — don't rely on adjuster’s first number</li>
            <li style={{ marginBottom: 0 }}>Two claims in 3 years can result in non-renewal in the DFW market</li>
          </ul>
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <strong>Need a DFW roofing contractor to assess hail damage?</strong>
          <div style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>ProLnk connects you with vetted pros — get real estimates before you decide to file.</div>
        </div>
      </div>
    </div>
  );
}
