import { useState } from 'react';

const stages = [
  {
    day: 'Day 1', title: 'Document & Report', icon: '📸',
    steps: ['Photograph ALL damage before cleanup begins', 'Call your insurance company to open a claim', 'Get a claim number — write it down', 'Begin temporary repairs to prevent further damage (keep receipts)'],
    risks: 'Not documenting before cleanup voids coverage for unreported damage. Moving damaged items before adjuster visit can complicate claims.',
  },
  {
    day: 'Days 2–5', title: 'Adjuster Scheduled', icon: '📅',
    steps: ['Insurer assigns an adjuster (field or virtual)', 'You receive confirmation with scheduled date', 'Prepare your documentation: photos, purchase receipts, prior inspection reports', 'If emergency, request an emergency adjuster — carriers must prioritize active leaks/structural damage'],
    risks: 'High-volume events (hail storms, freezes) create 2-3 week delays. Push back and ask for a provisional payment for living expenses if displaced.',
  },
  {
    day: 'Days 6–14', title: 'Adjuster Visit', icon: '🔍',
    steps: ['Meet the adjuster at your property — do not skip this', 'Walk through every area of damage together', 'Ask: "Is this covered under my policy?" for each item', 'Get the adjuster\’s estimate in writing before they leave if possible'],
    risks: 'Adjusters work for the insurer. Be polite but thorough — point out everything. If you miss something now, it\’s harder to add later.',
  },
  {
    day: 'Days 15–30', title: 'Claim Decision', icon: '📋',
    steps: ['Receive claim decision letter (approval, partial, denial)', 'Review line by line — carriers often underpay categories', 'If approved: funds released less your deductible', 'If denied: request written reason, escalation process begins'],
    risks: 'Underpayment is common. Roofing line items, code upgrade costs, and depreciation adjustments are frequent battlegrounds.',
  },
  {
    day: 'Days 31–60', title: 'Repairs & Supplemental Claims', icon: '🔨',
    steps: ['Hire licensed contractor (get 3 bids minimum)', 'Contractor may find additional damage during repairs', 'File supplemental claim for newly discovered damage', 'Final payment released after repairs documented'],
    risks: 'Insurer may use preferred contractors who lowball. You have the right to choose your contractor. Document all contractor communications.',
  },
];

const appealSteps = [
  { step: '1', action: 'Request full claim file', detail: 'You\’re entitled to all documents, adjuster notes, and photos in your file' },
  { step: '2', action: 'Get an independent estimate', detail: 'Hire a contractor to provide a detailed line-item estimate' },
  { step: '3', action: 'Submit written dispute', detail: 'Send certified mail: dispute letter + independent estimate + your documentation' },
  { step: '4', action: 'Invoke appraisal clause', detail: 'Most policies have an appraisal process — both sides hire appraisers + neutral umpire' },
  { step: '5', action: 'File TDI complaint', detail: 'Texas Department of Insurance investigates bad faith claims — carriers take these seriously' },
  { step: '6', action: 'Hire public adjuster or attorney', detail: 'For large disputed claims, professionals recover far more than their fee' },
];

export default function DFWInsuranceClaimTimeline() {
  const [damageType, setDamageType] = useState('hail');
  const [severity, setSeverity] = useState('moderate');
  const [result, setResult] = useState<{ timeline: string; priority: string; tip: string; paRec: string } | null>(null);

  function calculate() {
    const timelines: Record<string, Record<string, string>> = {
      hail: { minor: '3–5 weeks total', moderate: '5–8 weeks total', major: '8–16 weeks total (peak season longer)' },
      water: { minor: '2–4 weeks total', moderate: '4–8 weeks total', major: '8–20 weeks (mold remediation extends timeline)' },
      fire: { minor: '4–6 weeks total', moderate: '6–12 weeks total', major: '4–18 months (total loss rebuilds)' },
      wind: { minor: '3–5 weeks total', moderate: '5–10 weeks total', major: '8–20 weeks total' },
    };
    const tips: Record<string, Record<string, string>> = {
      hail: { minor: 'Roof-only damage — get 2-3 contractor bids, adjuster often undercounts damaged squares', moderate: 'Request scope review from contractor before accepting settlement', major: 'Carrier may invoke depreciation aggressively — push for replacement cost value' },
      water: { minor: 'Document moisture readings before drying begins', moderate: 'Mold potential starts within 48 hrs — prioritize extraction', major: 'Loss-of-use coverage activates if home is uninhabitable — claim it' },
      fire: { minor: 'Smoke damage extends beyond visible burn area — document fully', moderate: 'Hire a fire restoration specialist before accepting adjuster estimate', major: 'Total loss: insist on replacement cost rebuild, not actual cash value' },
      wind: { minor: 'Check for secondary water intrusion from wind-driven rain', moderate: 'Tree damage to structures is typically covered; tree removal from yard often not', major: 'Structural engineer report strengthens your claim significantly' },
    };
    const paRec: Record<string, string> = {
      minor: 'Public adjuster likely not cost-effective for small claims',
      moderate: 'Consider public adjuster if carrier estimate seems low — get a free consultation',
      major: 'Strongly recommend public adjuster or attorney — recoveries often 30-60% higher',
    };
    setResult({
      timeline: timelines[damageType]?.[severity] ?? '4–8 weeks',
      priority: severity === 'major' ? '🔴 Priority: Document everything, displace safely, file immediately' : severity === 'moderate' ? '🟡 Important: Get contractor estimate before accepting settlement' : '🟢 Standard: Follow process, review adjuster estimate carefully',
      tip: tips[damageType]?.[severity] ?? 'Document thoroughly and get independent contractor estimate',
      paRec: paRec[severity],
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Homeowner Resource · 2026</div>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: '#FFFFFF', marginBottom: 12, lineHeight: 1.1 }}>Insurance Claim Timeline Guide</h1>
        <p style={{ fontSize: 18, color: '#8BA3C7', marginBottom: 48, maxWidth: 680 }}>From damage to payout — what happens at each stage, what can go wrong, and how to protect your settlement.</p>

        <div style={{ marginBottom: 48 }}>
          {stages.map((s, i) => (
            <div key={s.day} style={{ display: 'flex', gap: 20, marginBottom: 8 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 50, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
                {i < stages.length - 1 && <div style={{ width: 2, flex: 1, background: '#2D3F5C', marginTop: 6 }} />}
              </div>
              <div style={{ background: '#1A2640', borderRadius: 16, padding: 24, marginBottom: 8, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{ background: '#0A1628', color: '#F5E642', borderRadius: 8, padding: '4px 12px', fontSize: 13, fontWeight: 700 }}>{s.day}</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 18 }}>{s.title}</span>
                </div>
                <div style={{ marginBottom: 16 }}>
                  {s.steps.map(step => (
                    <div key={step} style={{ color: '#E8EDF5', fontSize: 14, lineHeight: 1.6, marginBottom: 6, display: 'flex', gap: 8 }}>
                      <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>{step}
                    </div>
                  ))}
                </div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 14, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18 }}>⚠️</span>
                  <div style={{ color: '#8BA3C7', fontSize: 13, lineHeight: 1.6 }}>{s.risks}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 700, marginBottom: 20 }}>How to Appeal a Denied or Underpaid Claim</h2>
        <div style={{ marginBottom: 48 }}>
          {appealSteps.map(a => (
            <div key={a.step} style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 10, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>{a.step}</div>
              <div><div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: 4 }}>{a.action}</div><div style={{ color: '#8BA3C7', fontSize: 14 }}>{a.detail}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1A2640', borderRadius: 20, padding: 36, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>⏱️ Estimate Your Claim Timeline</h2>
          <p style={{ color: '#8BA3C7', marginBottom: 28 }}>Get a personalized timeline and tips based on your situation.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
            <div>
              <label style={{ color: '#8BA3C7', fontSize: 13, display: 'block', marginBottom: 8 }}>Type of Damage</label>
              <select value={damageType} onChange={e => setDamageType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #2D3F5C', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value="hail">Hail / Wind Damage</option>
                <option value="water">Water / Pipe Damage</option>
                <option value="fire">Fire / Smoke Damage</option>
                <option value="wind">Tornado / Severe Wind</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#8BA3C7', fontSize: 13, display: 'block', marginBottom: 8 }}>Damage Severity</label>
              <select value={severity} onChange={e => setSeverity(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #2D3F5C', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value="minor">Minor ($2K–$15K)</option>
                <option value="moderate">Moderate ($15K–$75K)</option>
                <option value="major">Major ($75K+)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%', marginBottom: 24 }}>Get My Timeline & Tips →</button>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              <div><div style={{ color: '#8BA3C7', fontSize: 13, marginBottom: 4 }}>Expected Timeline</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{result.timeline}</div></div>
              <div><div style={{ color: '#8BA3C7', fontSize: 13, marginBottom: 4 }}>Priority Level</div><div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15 }}>{result.priority}</div></div>
              <div style={{ gridColumn: '1 / -1′ }}><div style={{ color: '#8BA3C7', fontSize: 13, marginBottom: 4 }}>Pro Tip for Your Situation</div><div style={{ color: '#FFFFFF', fontSize: 15 }}>{result.tip}</div></div>
              <div style={{ gridColumn: '1 / -1′ }}><div style={{ color: '#8BA3C7', fontSize: 13, marginBottom: 4 }}>Public Adjuster?</div><div style={{ color: '#FFFFFF', fontSize: 14 }}>{result.paRec}</div></div>
            </div>
          )}
        </div>

        <div style={{ background: '#1A2640', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏠</div>
          <h3 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Need a Trusted Contractor for Repairs?</h3>
          <p style={{ color: '#8BA3C7', marginBottom: 20 }}>ProLnk connects DFW homeowners with licensed, vetted contractors for insurance-related repairs. Get multiple bids fast.</p>
          <a href="/" style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '12px 28px', fontWeight: 800, textDecoration: 'none', fontSize: 15 }}>Get Contractor Quotes →</a>
        </div>
      </div>
    </div>
  );
}
