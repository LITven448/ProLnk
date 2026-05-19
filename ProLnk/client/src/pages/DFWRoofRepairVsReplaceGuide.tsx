import { useState } from 'react';

const ROOF_LIFESPANS: Record<string, number> = { '3tab': 20, 'architectural': 30, 'metal': 50, 'tile': 50 };
const DFW_REPAIR_COST = 850;
const DFW_REPLACE_COST = 12500;

export default function DFWRoofRepairVsReplaceGuide() {
  const [roofAge, setRoofAge] = useState('');
  const [shingleType, setShingleType] = useState('');
  const [damageType, setDamageType] = useState('');
  const [hasInsurance, setHasInsurance] = useState('');
  const [result, setResult] = useState<null | { recommend: string; reason: string; remainingLife: number; insurancePath: string }>(null);

  function evaluate() {
    const age = parseInt(roofAge);
    if (!age || !shingleType || !damageType) return;
    const lifespan = ROOF_LIFESPANS[shingleType] || 25;
    const remaining = Math.max(0, lifespan - age);
    const pctLife = age / lifespan;

    let recommend = '';
    let reason = '';
    let insurancePath = '';

    if (damageType === 'hail' && hasInsurance === 'yes') {
      recommend = 'Replace — File Insurance Claim';
      reason = `DFW hail storms often cause enough damage that insurers will cover full replacement. Even minor hail can void manufacturer warranties. Filing a claim for full replacement is almost always better than patching.`;
      insurancePath = 'Document all damage with photos. Get a public adjuster to represent you — they typically recover 20–40% more than going direct with your insurer.';
    } else if (pctLife > 0.75 || remaining < 7) {
      recommend = 'Replace';
      reason = `Your ${shingleType === '3tab' ? '3-tab' : shingleType} roof at ${age} years has only ~${remaining} years of estimated life remaining. Repairs at this stage are rarely cost-effective — each DFW storm season risks additional damage on a compromised deck.`;
      insurancePath = hasInsurance === 'yes' ? 'Check your policy — age-related replacement is typically not covered, but storm damage may qualify for partial credit.' : 'Consider getting a quote now before the next storm season.';
    } else if (pctLife > 0.5 && damageType === 'hail') {
      recommend = 'Replace — Borderline';
      reason = `Mid-life roof with hail damage is the classic DFW dilemma. Insurance replacement now locks in a new roof at minimal out-of-pocket cost. Patching hail damage often fails inspection if you try to sell.`;
      insurancePath = 'File an insurance claim. If approved, proceed. If denied, get a public adjuster’s second opinion.';
    } else {
      recommend = 'Repair';
      reason = `At ${age} years with ${remaining} years remaining and localized damage, repair is the right call. DFW roofers average $${DFW_REPAIR_COST.toLocaleString()} for patch jobs vs $${DFW_REPLACE_COST.toLocaleString()}+ for full replacement.`;
      insurancePath = hasInsurance === 'yes' ? 'Minor repairs are typically below your deductible — paying out of pocket avoids a claim on your record.' : 'Get 2–3 repair quotes from licensed DFW roofers.';
    }

    setResult({ recommend, reason, remainingLife: remaining, insurancePath });
  }

  const pill = (label: string, val: string, current: string, set: (v: string) => void) => (
    <button key={val} onClick={() => set(val)} style={{
      padding: '8px 16px', borderRadius: 20, border: '2px solid',
      borderColor: current === val ? '#F5E642′ : '#2A3A5C',
      background: current === val ? '#F5E642′ : ’transparent',
      color: current === val ? '#0A1628′ : '#CBD5E1',
      cursor: 'pointer', fontWeight: 600, fontSize: 13, margin: '4px 6px 4px 0'
    }}>{label}</button>
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#CBD5E1', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F1F5F9', margin: '0 0 8px' }}>Roof: Repair vs Replace?</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.7 }}>
          DFW averages <strong style={{ color: '#F5E642′ }}>12+ hail events per year</strong> — more than any major US metro. One good storm can change the repair vs replace calculus entirely. Use this guide to find your best path.
        </p>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Roof Age (years)</label>
            <input type="number" value={roofAge} onChange={e => setRoofAge(e.target.value)} placeholder="e.g. 18″
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '2px solid #2A3A5C', background: '#0A1628', color: '#F1F5F9', fontSize: 16, boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Shingle Type</label>
            <div>{[['3-Tab', '3tab'], ['Architectural', 'architectural'], ['Metal', 'metal'], ['Tile', 'tile']].map(([l, v]) => pill(l, v, shingleType, setShingleType))}</div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Type of Damage</label>
            <div>{[['Hail Damage', 'hail'], ['Wind / Missing Shingles', 'wind'], ['Leak / Water Damage', 'leak'], ['Age / Granule Loss', 'age']].map(([l, v]) => pill(l, v, damageType, setDamageType))}</div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Have Homeowner's Insurance?</label>
            <div>{[['Yes', 'yes'], ['No', 'no']].map(([l, v]) => pill(l, v, hasInsurance, setHasInsurance))}</div>
          </div>
          <button onClick={evaluate} style={{ width: '100%', padding: '14px', borderRadius: 8, background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer' }}>
            Get My Recommendation →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F1F3D', border: '2px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
              🏠 {result.recommend}
            </div>
            <p style={{ color: '#CBD5E1', lineHeight: 1.7, marginBottom: 16 }}>{result.reason}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Estimated Remaining Lifespan</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#22C55E' }}>{result.remainingLife} years</div>
            </div>
            <div style={{ borderTop: '1px solid #2A3A5C', paddingTop: 16 }}>
              <div style={{ fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>📋 Insurance Path</div>
              <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{result.insurancePath}</p>
            </div>
          </div>
        )}

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, marginTop: 0 }}>💰 DFW Roofing Cost Benchmarks</h3>
          {[
            ['Patch / Repair (1–3 squares)', '$450 – $1,200', 'Emergency patches, small leaks, isolated missing shingles'],
            ['Partial Replace (4–10 squares)', '$1,800 – $4,500', 'One slope or section; may not match existing shingles'],
            ['Full 3-Tab Replacement (2,000 sq ft)', '$8,000 – $12,000', 'Most common in older DFW subdivisions'],
            ['Architectural Shingle (2,000 sq ft)', '$11,000 – $16,000', 'Best value for longevity in DFW hail conditions'],
            ['Metal Roof (2,000 sq ft)', '$18,000 – $30,000', 'Hail-resistant, 50-year life, may lower insurance premiums'],
          ].map(([label, cost, note]) => (
            <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #2A3A5C' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#F1F5F9', fontSize: 14 }}>{label}</div>
                <div style={{ color: '#64748B', fontSize: 12, marginTop: 2 }}>{note}</div>
              </div>
              <div style={{ fontWeight: 800, color: '#F5E642', fontSize: 16, whiteSpace: 'nowrap', marginLeft: 16 }}>{cost}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 8, textAlign: 'center', padding: '20px', background: '#0F1F3D', borderRadius: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Get 3 Free Roofing Quotes in DFW</div>
          <p style={{ color: '#94A3B8', marginBottom: 16, fontSize: 14 }}>Compare vetted local roofers — no pressure, no storm chasers.</p>
          <button style={{ padding: '12px 32px', background: '#F5E642', color: '#0A1628', fontWeight: 800, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 16 }}>
            Compare Roofing Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
