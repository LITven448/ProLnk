import { useState } from 'react';

const claimsHistory = [
  { value: 'none', label: 'No Claims (Last 5 Years)' },
  { value: 'one_small', label: 'One Small Claim (<$5K)' },
  { value: 'one_large', label: 'One Large Claim (>$5K)' },
  { value: 'multiple', label: 'Multiple Claims' },
];

const roofAgeRanges = [
  { value: 'new', label: '0–5 Years (New)', multiplier: 1.0 },
  { value: 'mid', label: '6–10 Years', multiplier: 1.15 },
  { value: 'aging', label: '11–15 Years', multiplier: 1.35 },
  { value: 'old', label: '16–20 Years', multiplier: 1.55 },
  { value: 'replace', label: '20+ Years (Near End of Life)', multiplier: 1.9 },
];

const shopThresholds: Record<string, number> = { none: 0.12, one_small: 0.20, one_large: 0.25, multiple: 0.35 };

export default function DFWInsuranceRenewalGuide() {
  const [currentPremium, setCurrentPremium] = useState('');
  const [roofAge, setRoofAge] = useState('');
  const [claims, setClaims] = useState('');
  const [result, setResult] = useState<{ shouldShop: boolean; expectedRange: string; strategy: string; notes: string[] } | null>(null);

  function analyze() {
    const base = parseFloat(currentPremium) || 0;
    const roofData = roofAgeRanges.find(r => r.value === roofAge);
    const multiplier = roofData?.multiplier || 1.0;
    const shopThreshold = shopThresholds[claims] || 0.15;
    const lowEst = Math.round(base * multiplier * 0.95);
    const highEst = Math.round(base * multiplier * 1.35);
    const shouldShop = multiplier > 1.2 || claims === 'multiple' || base > 3000;
    const notes: string[] = [];
    if (roofAge === 'old' || roofAge === 'replace') notes.push('Roofs over 15 years are increasingly non-renewable in DFW. Some carriers require replacement before renewal. Budget $15,000–$25,000 for DFW roof replacement.');
    if (claims === 'multiple') notes.push('Multiple claims signal high risk to carriers. Consider a non-standard market or surplus lines insurer if standard markets decline.');
    if (claims === 'one_large') notes.push('Large single claims often trigger rate review. Compare at least 3 carriers — spreads vary significantly in DFW post-storm market.');
    if (base > 4000) notes.push('Premium over $4,000/yr signals you may already be paying above-market rates. Shop aggressively — DFW market is competitive despite rising prices.');
    notes.push('DFW premiums have risen 25–40% since 2022 driven by hail losses. Carrier appetite varies widely — loyalty rarely reduces rates here.');
    const strategy = shouldShop
      ? 'Shop your policy — contact 3+ independent agents and compare. Focus on claims reputation in DFW, not just price. Consider bundling auto for discounts.'
      : 'Your profile may qualify for renewal without major increases. Review deductibles and coverage limits — do not just renew without reading changes.';
    setResult({ shouldShop, expectedRange: `$${lowEst.toLocaleString()} – $${highEst.toLocaleString()}/yr`, strategy, notes });
  }

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1E293B', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#059669', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700 }}>🔄 DFW Homeowner Series</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, color: '#0F172A' }}>DFW Insurance Renewal Guide</h1>
        <p style={{ color: '#64748B', marginBottom: 32 }}>DFW homeowners are seeing some of the steepest renewal increases in the country — 25–40% in recent years. Here is how to respond strategically rather than just accepting the renewal.</p>

        <div style={{ background: '#059669', color: '#fff', borderRadius: 10, padding: '16px 20px', marginBottom: 32, fontWeight: 700 }}>
          📈 Average DFW homeowner premium has risen from ~$1,800/yr in 2020 to ~$2,700–3,200/yr in 2026. Your renewal notice is a negotiating document.
        </div>

        <h2 style={{ color: '#059669', fontSize: 20, marginBottom: 16 }}>Why DFW Rates Are Rising</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32 }}>
          {[['🌩️', 'Hail frequency', 'DFW averages 7–10 significant hail events per year — carriers price accordingly'],['🏚️', 'Roof age crisis', 'Aging housing stock means more roofs are near end-of-life, driving higher claim frequency'],['💸', 'Reinsurance costs', 'Global catastrophe losses drive up reinsurance, which carriers pass to consumers'],['🏗️', 'Construction costs', 'Labor and materials up 40%+ since 2020, making every claim more expensive to resolve']].map(([icon, title, desc]) => (
            <div key={title} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#0F172A', marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 12, color: '#64748B' }}>{desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#059669', fontSize: 20, marginBottom: 16 }}>What to Compare Beyond Price</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {[['⭐', 'Claims reputation in DFW — ask local contractors who they see pay claims fastest'],['📋', 'Coverage terms — RCV vs ACV roof coverage, ordinance/law coverage'],['📞', 'Local claims adjusting — some carriers use remote adjusters who miss DFW-specific damage'],['🔄', 'Non-renewal history — is this carrier exiting Texas? Check their market commitment'],['🔗', 'Bundling discounts — auto + home bundles can offset 10–20% of premium increases']].map(([icon, text]) => (
            <div key={text} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <span style={{ fontSize: 16 }}>{icon}</span><span style={{ fontSize: 13, color: '#374151′ }}>{text}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, marginBottom: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#059669', fontSize: 20, marginBottom: 20 }}>🔢 Renewal Strategy Calculator</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', display: 'block', marginBottom: 6 }}>Current Annual Premium ($)</label>
              <input value={currentPremium} onChange={e => setCurrentPremium(e.target.value)} placeholder="e.g. 2800″ style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: 6, padding: '10px 12px', color: '#1E293B', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', display: 'block', marginBottom: 6 }}>Roof Age</label>
              <select value={roofAge} onChange={e => setRoofAge(e.target.value)} style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: 6, padding: '10px 12px', color: '#1E293B', fontSize: 15 }}>
                <option value="">Select roof age...</option>
                {roofAgeRanges.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', display: 'block', marginBottom: 6 }}>Claims History (Last 5 Years)</label>
              <select value={claims} onChange={e => setClaims(e.target.value)} style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: 6, padding: '10px 12px', color: '#1E293B', fontSize: 15 }}>
                <option value="">Select claims history...</option>
                {claimsHistory.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <button onClick={analyze} style={{ background: '#059669', color: '#fff', fontWeight: 700, fontSize: 15, padding: '12px 0', borderRadius: 8, border: 'none', cursor: 'pointer' }}>Get My Renewal Strategy</button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#F0FDF4', borderRadius: 8, padding: 18, border: '1px solid #BBF7D0′ }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: result.shouldShop ? '#B45309′ : '#166534', marginBottom: 10 }}>{result.shouldShop ? '🔍 Shop Your Policy This Renewal' : '✅ Renew With Review'}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#166534', marginBottom: 4 }}>Expected Renewal Range:</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>{result.expectedRange}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#166534', marginBottom: 6 }}>Strategy:</div>
              <div style={{ fontSize: 14, color: '#374151', marginBottom: 12 }}>{result.strategy}</div>
              {result.notes.length > 0 && <>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#166534', marginBottom: 6 }}>Alerts:</div>
                {result.notes.map(n => <div key={n} style={{ fontSize: 13, color: '#374151', marginBottom: 6 }}>• {n}</div>)}
              </>}
            </div>
          )}
        </div>
        <div style={{ color: '#94A3B8', fontSize: 12, textAlign: 'center' }}>General guidance only — consult your insurance agent for policy-specific advice.</div>
      </div>
    </div>
  );
}
