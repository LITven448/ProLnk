import { useState } from 'react';

const coverageTypes = [
  { label: 'Actual Cash Value (ACV)', desc: 'Pays depreciated value — a 15-year-old roof may pay pennies on the dollar. Avoid in DFW.' },
  { label: 'Replacement Cost Value (RCV)', desc: 'Pays full replacement cost after deductible. Essential in DFW hail country.' },
  { label: 'Extended Replacement Cost', desc: 'Covers cost overruns up to 25-50% above policy limit. Valuable when contractor demand spikes post-storm.' },
];

const deductibleTypes = [
  { type: 'Flat Dollar ($1,000–$2,500)', risk: 'low' },
  { type: '1% of Dwelling Value', risk: 'medium' },
  { type: '2% of Dwelling Value', risk: 'high' },
  { type: 'Split: 2% Wind/Hail, Flat All-Else', risk: 'medium' },
];

export default function DFWRoofingInsuranceGuide() {
  const [homeValue, setHomeValue] = useState('');
  const [deductType, setDeductType] = useState('1%');
  const [damageEst, setDamageEst] = useState('');
  const [result, setResult] = useState<null | { claim: boolean; deductible: number; netPayout: number; premiumImpact: string }>(null);

  function analyze() {
    const val = parseFloat(homeValue) || 0;
    const dmg = parseFloat(damageEst) || 0;
    let ded = 0;
    if (deductType === 'flat1000') ded = 1000;
    else if (deductType === 'flat2500') ded = 2500;
    else if (deductType === '1%') ded = val * 0.01;
    else if (deductType === '2%') ded = val * 0.02;
    const netPayout = Math.max(0, dmg - ded);
    const claim = netPayout > 1500;
    const premiumImpact = claim ? '+18–35% for 3–5 years (~$' + Math.round(val * 0.0015) + '/yr increase)' : 'No impact — pay out of pocket';
    setResult({ claim, deductible: ded, netPayout, premiumImpact });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🏠 DFW Homeowner Series</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Roof Insurance Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Dallas-Fort Worth leads the US in hail claim frequency. Your roof coverage decisions here matter more than almost anywhere else in the country.</p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '16px 20px', marginBottom: 32, fontWeight: 700 }}>
          ⚡ DFW averages 7–10 significant hail events per year. The average insurance claim in North Texas exceeds $12,000.
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>Coverage Types — What You Need in DFW</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {coverageTypes.map(c => (
            <div key={c.label} style={{ background: '#132035', borderRadius: 8, padding: '14px 18px', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{c.label}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>DFW Deductible Landscape</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32 }}>
          {deductibleTypes.map(d => (
            <div key={d.type} style={{ background: '#132035', borderRadius: 8, padding: '12px 16px', borderTop: `3px solid ${d.risk === 'high' ? '#EF4444' : d.risk === 'medium' ? '#F59E0B' : '#10B981'}` }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{d.type}</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>Risk: {d.risk}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔢 Claim vs. Pay-Out-of-Pocket Analyzer</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Home Dwelling Value ($)</label>
              <input value={homeValue} onChange={e => setHomeValue(e.target.value)} placeholder="e.g. 400000″ style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5F', borderRadius: 6, padding: '10px 12px', color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Deductible Type</label>
              <select value={deductType} onChange={e => setDeductType(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5F', borderRadius: 6, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="flat1000″>Flat $1,000</option>
                <option value="flat2500″>Flat $2,500</option>
                <option value="1%">1% of Dwelling</option>
                <option value="2%">2% of Dwelling</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Estimated Damage ($)</label>
              <input value={damageEst} onChange={e => setDamageEst(e.target.value)} placeholder="e.g. 8000″ style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5F', borderRadius: 6, padding: '10px 12px', color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 0', borderRadius: 8, border: 'none', cursor: 'pointer' }}>Analyze My Situation</button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 18 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: result.claim ? '#10B981′ : '#F59E0B', marginBottom: 10 }}>{result.claim ? '✅ File the Claim' : '⚠️ Pay Out of Pocket'}</div>
              <div style={{ fontSize: 14, color: '#94A3B8′ }}>Estimated Deductible: <span style={{ color: '#E8EDF5', fontWeight: 600 }}>${result.deductible.toLocaleString()}</span></div>
              <div style={{ fontSize: 14, color: '#94A3B8', marginTop: 4 }}>Estimated Net Payout: <span style={{ color: '#E8EDF5', fontWeight: 600 }}>${result.netPayout.toLocaleString()}</span></div>
              <div style={{ fontSize: 14, color: '#94A3B8', marginTop: 4 }}>Premium Impact: <span style={{ color: '#E8EDF5', fontWeight: 600 }}>{result.premiumImpact}</span></div>
            </div>
          )}
        </div>
        <div style={{ color: '#64748B', fontSize: 12, textAlign: 'center' }}>General guidance only — consult your insurance agent for policy-specific advice.</div>
      </div>
    </div>
  );
}
