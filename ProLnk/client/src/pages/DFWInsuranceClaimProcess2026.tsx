import { useState } from 'react';

export default function DFWInsuranceClaimProcess2026() {
  const [damageType, setDamageType] = useState('hail');
  const [step, setStep] = useState(0);

  const steps: Record<string, {title: string; desc: string; icon: string}[]> = {
    hail: [
      { icon: '📸', title: 'Document immediately (0-24 hrs)', desc: 'Photo + video every damaged area. Screenshot weather data showing hail date/size.' },
      { icon: '🔒', title: 'Emergency mitigation required', desc: 'Cover broken windows/roof holes with tarps. Insurer can deny claim if you delay and damage worsens.' },
      { icon: '📞', title: 'File claim within 48 hours', desc: 'Call claims line or use app. Get claim number. Texas law: insurer must acknowledge within 15 days.' },
      { icon: '🔍', title: 'Adjuster visit (5-10 business days)', desc: 'Be present. Point out all damage. Get your own contractor estimate BEFORE adjuster visits if possible.' },
      { icon: '💰', title: 'Settlement offer', desc: 'Review line by line. You can dispute. TX law: payment within 5 days of acceptance.' },
    ],
    water: [
      { icon: '🚰', title: 'Stop the source immediately', desc: 'Shut off main water valve. Burst pipe vs. flood: standard policy covers burst pipe, NOT flood.' },
      { icon: '📸', title: 'Document before cleanup', desc: 'Photos + video FIRST. Then begin drying — mold starts in 24-48 hours.' },
      { icon: '🛠️', title: 'Emergency mitigation NOW', desc: 'Call water remediation company. Keep receipts — covered under ALE.' },
      { icon: '📞', title: 'File claim within 24 hours', desc: 'Water damage worsens fast. Earlier claim = less dispute over pre-existing damage.' },
      { icon: '🔍', title: 'Adjuster + remediation estimate', desc: 'Get restoration company estimate. Compare to adjuster. Hire public adjuster if gap is >$5K.' },
    ],
    fire: [
      { icon: '🚒', title: 'Get fire report from fire dept', desc: 'Critical document for claim. Request same day.' },
      { icon: '🏨', title: 'Use ALE immediately', desc: 'Hotel, meals, pet boarding — all covered. Keep every receipt from day one.' },
      { icon: '📸', title: 'Document with insurer present', desc: 'Do not clean or remove debris before adjuster visit.' },
      { icon: '📋', title: 'Personal property inventory', desc: 'List every lost item with est. value. Credit card statements, Amazon orders help.' },
      { icon: '🏗️', title: 'Rebuild process', desc: 'Insurer pays contractor direct or reimburses you. Get 3 contractor bids.' },
    ],
  };

  const currentSteps = steps[damageType] || [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13 }}>📋 DFW CLAIMS GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Insurance Claim Process 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Step-by-step guidance for DFW claims — what you do in the first 48 hours determines your outcome.</p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔍 Claim Walkthrough by Damage Type</h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {[{v:'hail',l:'⛈️ Hail/Wind'},{v:'water',l:'💧 Water'},{v:'fire',l:'🔥 Fire'}].map(d => (
              <button key={d.v} onClick={() => { setDamageType(d.v); setStep(0); }}
                style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  background: damageType === d.v ? '#F5E642′ : '#1a2f55', color: damageType === d.v ? '#0A1628' : '#fff' }}>
                {d.l}
              </button>
            ))}
          </div>
          {currentSteps.map((s, i) => (
            <div key={i} onClick={() => setStep(i)}
              style={{ background: step === i ? '#1a2f55′ : ’transparent', border: '1px solid', borderColor: step === i ? '#F5E642′ : '#1a2f55',
                borderRadius: 10, padding: 14, marginBottom: 10, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>Step {i+1}: {s.title}</div>
                  {step === i && <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>{s.desc}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>⚖️ Know Your TX Rights</h2>
          {['Insurer must acknowledge claim within 15 days (TX Insurance Code)','Must accept/reject within 15 days of receiving all docs','Must pay within 5 days of settlement acceptance','You can hire a public adjuster — they work on contingency (10-15% of payout)'].map(t => (
            <div key={t} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 13 }}>
              <span>⚡</span><span style={{ color: '#94a3b8′ }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
