import { useState } from 'react';

export default function DFWHomeAfterNaturalDisasterGuide() {
  const [disasterType, setDisasterType] = useState('');
  const [damageLevel, setDamageLevel] = useState('');
  const [result, setResult] = useState<null | { actions: string[]; timeline: string; costs: string; redFlags: string[] }>(null);

  function calculate() {
    const isFlood = disasterType === 'flood';
    const isHail = disasterType === 'hail';
    const isIce = disasterType === 'ice';
    const isMinor = damageLevel === 'minor';
    const isMajor = damageLevel === 'major';

    const actions: string[] = [];

    actions.push('📸 Document EVERYTHING before touching anything — photos and video with timestamps');
    actions.push('📞 Call your insurance carrier within 24–48 hours — delays can affect claim eligibility');

    if (isFlood) {
      actions.push('💧 Do not enter a flooded home until utilities are confirmed off — electrocution risk');
      actions.push('🧪 Assume water contamination — wear N95 and gloves for initial inspection');
      actions.push('📋 Register with FEMA at disasterassistance.gov if declared disaster area — check zip eligibility');
      actions.push('🌬️ Start drying within 24–48 hours — mold begins in 48 hours in DFW humidity');
    }
    if (isHail) {
      actions.push('🏠 Temporary roof tarp to prevent interior water damage — do this before permanent repairs');
      actions.push('🚗 Document vehicle damage separately — auto and home claims are separate policies');
      actions.push('🔍 Request a public adjuster if claim feels undervalued — they work on commission');
    }
    if (isIce) {
      actions.push('🚰 Locate and document all burst pipes before calling a plumber — helps scope estimate');
      actions.push('🔌 Do not use electrical outlets near water damage until electrician inspects');
      actions.push('📦 Get personal property into storage if roof or wall is compromised');
    }

    if (isMajor) {
      actions.push('🏨 Ask insurer about ALE (Additional Living Expenses) — covers hotel and meals while uninhabitable');
      actions.push('📝 Keep all receipts for temporary housing, meals, and storage — reimbursable under most policies');
    }

    actions.push('🔨 Do NOT sign with the first contractor who knocks on your door — storm chasers work fast');
    actions.push('✅ Use ProLnk to find licensed, insured local contractors — they verify credentials before listing');

    const timeline = isFlood
      ? 'Day 1–2: Document, call insurer, start drying. Day 3–7: Adjuster visit, remediation starts. Week 2–4: Structural assessment and repair bids. Month 1–3: Rebuild if major damage.'
      : isHail
      ? 'Day 1: Document, tarp if needed, call insurer. Week 1–2: Adjuster inspection. Week 2–6: Contractor bids and scheduling. Month 1–2: Repair completion (DFW contractors are slammed post-storm).'
      : 'Day 1: Document and call insurer. Day 2–5: Plumber for burst pipes, electrician if water near electrical. Week 1–3: Full assessment and repair. Expect delays — ice events overwhelm DFW contractors.';

    const costs = isMajor
      ? 'Major damage: $15,000–$100,000+ depending on flood/fire. Insurance deductible typically $1,000–$5,000. ALE can cover $2,000–$5,000/month in hotel and living costs.'
      : isMinor
      ? 'Minor damage: $1,000–$8,000. Often below deductible — get a contractor estimate before filing to avoid premium increases.'
      : 'Moderate damage: $5,000–$25,000. File claim. Get 3 bids. Do not pay more than 10% upfront to any contractor.';

    const redFlags = [
      '🚩 Contractor demands full payment upfront before work starts',
      '🚩 No local address or office — just a phone number and truck',
      '🚩 Pressure to sign today because "materials are going fast"',
      '🚩 Offers to waive your deductible — this is insurance fraud in Texas',
      '🚩 No written contract before work begins',
      '🚩 Unmarked vehicle, no visible license plate, refuses to show license',
    ];

    setResult({ actions, timeline, costs, redFlags });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1 }}>DFW HOME GUIDE — DISASTER RECOVERY</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          🌪️ Home Recovery After a DFW Disaster
        </h1>
        <p style={{ fontSize: 16, color: '#aab4c8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW gets hail, floods, and ice storms. Storm chasers flood neighborhoods within hours of damage. This guide tells you exactly what to do — and exactly who to avoid.
        </p>

        <div style={{ background: 'rgba(245,230,66,0.08)', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: '3px solid #F5E642′ }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>⚡ First 24 Hours — Universal</h2>
          <ol style={{ lineHeight: 2.2, paddingLeft: 20, fontSize: 14, color: '#ddd' }}>
            <li>Ensure everyone is safe and out of danger</li>
            <li>Document damage with photos and video before anything is moved or dried</li>
            <li>Call your insurance carrier — not an agent, the claims line directly</li>
            <li>Do temporary protective measures only (tarps, not permanent repairs)</li>
            <li>Do NOT sign any repair contracts until insurance adjuster has visited</li>
          </ol>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>📋 Get Your Recovery Plan</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#aab4c8′ }}>Disaster type</label>
            {[{ v: 'hail', l: '🌨️ Hail storm / wind damage' }, { v: 'flood', l: '🌊 Flood or water event' }, { v: 'ice', l: '🧊 Ice storm / freeze damage' }].map(opt => (
              <label key={opt.v} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, cursor: 'pointer' }}>
                <input type="radio" name="disaster" value={opt.v} checked={disasterType === opt.v} onChange={() => setDisasterType(opt.v)} />
                {opt.l}
              </label>
            ))}
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#aab4c8′ }}>Damage level</label>
            {[{ v: 'minor', l: '🟡 Minor — cosmetic or small repairs' }, { v: 'moderate', l: '🟠 Moderate — significant but livable' }, { v: 'major', l: '🔴 Major — uninhabitable or structural' }].map(opt => (
              <label key={opt.v} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, cursor: 'pointer' }}>
                <input type="radio" name="damage" value={opt.v} checked={damageLevel === opt.v} onChange={() => setDamageLevel(opt.v)} />
                {opt.l}
              </label>
            ))}
          </div>
          <button onClick={calculate} disabled={!disasterType || !damageLevel}
            style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, border: 'none', fontSize: 15, fontWeight: 800, cursor: 'pointer', width: '100%' }}>
            Build My Recovery Plan →
          </button>
        </div>

        {result && (
          <div>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 24, marginBottom: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>Your Priority Actions</h3>
              {result.actions.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0, color: '#aab4c8', fontSize: 13, marginTop: 2 }}>{i + 1}.</span>
                  <span style={{ fontSize: 14, lineHeight: 1.6 }}>{a}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>TIMELINE</div>
                <div style={{ fontSize: 13, lineHeight: 1.7, color: '#ddd' }}>{result.timeline}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>ESTIMATED COSTS</div>
                <div style={{ fontSize: 13, lineHeight: 1.7, color: '#ddd' }}>{result.costs}</div>
              </div>
            </div>
            <div style={{ background: '#1a0a0a', borderRadius: 12, padding: 24, border: '1px solid rgba(255,80,80,0.3)' }}>
              <h3 style={{ color: '#ff6b6b', marginBottom: 16, fontSize: 18 }}>🚩 Storm Chaser Red Flags</h3>
              {result.redFlags.map((r, i) => <div key={i} style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.6 }}>{r}</div>)}
            </div>
          </div>
        )}

        <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>🛡️ ProLnk After a Disaster</h2>
          <p style={{ color: '#aab4c8', lineHeight: 1.7, fontSize: 14 }}>Every contractor in ProLnk is pre-vetted with a verified license, insurance, and no storm-chaser flag. After a DFW hail event, when every unlicensed roofer in Texas shows up at your door, ProLnk is where you go to find someone you can actually trust.</p>
        </div>
      </div>
    </div>
  );
}
