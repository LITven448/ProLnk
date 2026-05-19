import { useState } from 'react';

const serviceTypes = [
  { label: 'Emergency Lockout — Residential', low: 65, high: 150, flags: ['Refuses to show ID', 'Price jumps after arrival', 'No physical address'], verify: ['Check Google reviews > 50', 'Confirm local address', 'Ask for written quote before work'] },
  { label: 'Emergency Lockout — Vehicle', low: 75, high: 175, flags: ['Quotes $35 on phone, charges $300 on-site', 'Van has no company branding'], verify: ['Confirm flat-rate quote by phone', 'Match tech ID to company name', 'Pay by card not cash'] },
  { label: 'Rekey After Move-In', low: 100, high: 200, flags: ['Insists on full lock replacement when rekeying would work', 'No lock brands you recognize'], verify: ['Rekeying is always cheaper than replacement', 'Should take 15–30 min per lock'] },
  { label: 'Smart Lock Installation', low: 150, high: 350, flags: ['Won\’t give itemized parts + labor breakdown'], verify: ['Confirm lock brand compatibility', 'Ask if they program the app or just install hardware'] },
  { label: 'High-Security Lock Upgrade', low: 200, high: 500, flags: ['Pushes Medeco/Mul-T-Lock copies from unknown brands'], verify: ['Medeco, Mul-T-Lock, ASSA Abloy only', 'Ask for ALOA certification'] },
  { label: 'Automotive Key Programming', low: 125, high: 400, flags: ['No OBD2 diagnostic tool visible', 'Quote doubles after they see car model'], verify: ['Ask for OEM or matched aftermarket part', 'Get written quote including programming fee'] },
];

export default function DFWLocksmithGuide() {
  const [serviceIdx, setServiceIdx] = useState(0);
  const [result, setResult] = useState<null | typeof serviceTypes[0]>(null);

  const svc = serviceTypes[serviceIdx];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg,#0A1628 60%,#122040)', padding: '48px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🔐</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>DFW Locksmith Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>Avoid scams, verify credentials, and know what legitimate prices look like across the Metroplex.</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#0f1f3d', border: '1px solid #ef4444', borderRadius: 16, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#ef4444', fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🚨 The DFW Locksmith Scam — Know It</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>DFW has a well-documented fake locksmith problem. The pattern: search for "locksmith near me," call a number that appears local, get quoted $35–45 on the phone. A tech arrives with no branding, drills your lock unnecessarily, and charges $300–600 in cash. The "company" is a lead aggregator in another state using fake local numbers. Always verify before you open the door.</p>
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>✅ ALOA Certification — The Gold Standard</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
            {[['🏆 ALOA Member','Associated Locksmiths of America — verifiable online at aloa.org'],['📋 Texas License','TX DPS locksmith license required for any commercial job. Ask for license #.'],['🔎 Google Reviews','50+ reviews with photos of actual jobs. Beware 5-star accounts with no profile pics.'],['📍 Real Address','Physical shop address in DFW — not just a P.O. box or Google listing with no storefront.']].map(([t,d])=>(
              <div key={t} style={{ background: '#122040', borderRadius: 10, padding: 14 }}>
                <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: 13 }}>{t}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🏠 Always Rekey After Move-In</h2>
          {[['Why rekeying matters','Previous owners, contractors, real estate agents may still have keys. Rekeying costs $15–25/lock vs $80–150 to replace.'],['Rekeying vs replacing','Rekeying changes the internal pins to match a new key — same lock, new combination. Replacement is only needed if lock is damaged.'],['Best time to rekey','Day one in new home. Some DFW home insurance carriers offer discounts for documented rekeying.']].map(([h,d])=>(
            <div key={h} style={{ borderLeft: '3px solid #F5E642', paddingLeft: 14, marginBottom: 14 }}>
              <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{h}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg,#0f1f3d,#122040)', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🧮 Price & Red Flag Checker</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Service Type</label>
            <select value={serviceIdx} onChange={e=>setServiceIdx(Number(e.target.value))} style={{ width: '100%', background: '#0A1628', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 14 }}>
              {serviceTypes.map((s,i)=><option key={i} value={i}>{s.label}</option>)}
            </select>
          </div>
          <button onClick={()=>setResult(svc)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Show Info</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Legitimate Price Range (DFW)</div>
                <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>${result.low} – ${result.high}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <div style={{ color: '#ef4444', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>🚩 Red Flags</div>
                  {result.flags.map(f=><div key={f} style={{ color: '#94a3b8', fontSize: 12, marginBottom: 5 }}>• {f}</div>)}
                </div>
                <div>
                  <div style={{ color: '#22c55e', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>✅ Verify Before Work</div>
                  {result.verify.map(v=><div key={v} style={{ color: '#94a3b8', fontSize: 12, marginBottom: 5 }}>• {v}</div>)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
