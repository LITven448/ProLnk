import { useState } from 'react';

const stages = [
  {
    id: 'just-happened',
    label: '🌩️ Storm just ended — what do I do first?',
    title: 'Document Before Anything Else',
    steps: [
      'Walk exterior and photograph ALL damage with timestamps — do not wait',
      'Take wide shots, close-ups, and comparison shots of undamaged areas',
      'Do NOT allow any contractor on roof yet — you need to control the narrative',
      'Check gutters, siding, AC units, windows, and fence for additional hail evidence',
      'Write down the date, time, and approximate storm duration'
    ],
    action: 'Call ProLnk to schedule a vetted DFW roofer for same-day assessment. Then call your insurer. Do both within 24 hours.'
  },
  {
    id: 'calling-insurer',
    label: '📞 About to call my insurance company',
    title: 'What to Say (and Not Say) to Your Insurer',
    steps: [
      'Say: "I am reporting a claim for storm damage on [date]" — do not guess the amount',
      'Do NOT say "I think" or minimize damage — report what you observed',
      'Get a claim number immediately and write it down',
      'Ask: "Do I have RCV or ACV coverage?" — this matters enormously for payout',
      'Ask: "What is my wind/hail deductible?" — DFW policies often have separate 1-2% deductibles',
      'Do not authorize any repairs until adjuster visits'
    ],
    action: 'Request ProLnk roofer be present during adjuster inspection. Vetted pros know how to identify all damage the adjuster might miss.'
  },
  {
    id: 'adjuster-coming',
    label: '👷 Adjuster is coming to inspect',
    title: 'Prepare for the Adjuster Visit',
    steps: [
      'Have your ProLnk roofer present — this is critical, do not meet adjuster alone',
      'Provide all photos and timestamps you collected',
      'Walk every area of damage together, not just what adjuster points out',
      'If adjuster misses items, your roofer can speak up professionally',
      'Do not sign anything during the inspection — review all documents first'
    ],
    action: 'If adjuster offer seems low, request a supplement or hire a public adjuster. ProLnk roofers can provide competing estimates to support your case.'
  },
  {
    id: 'got-offer',
    label: '💵 I received an insurance offer',
    title: 'Evaluate the Settlement Offer',
    steps: [
      'Compare to ProLnk roofer estimate line by line — scope must match',
      'RCV (Replacement Cost Value) = full replacement. ACV = replacement minus depreciation. Know which you have',
      'Check if depreciation is recoverable — most RCV policies hold back depreciation until work is complete',
      'Do not accept offer if it does not cover full scope of damage',
      'You have the right to dispute and supplement — do not feel pressured'
    ],
    action: 'If offer is below ProLnk roofer estimate by more than 10%, formally dispute with supplemental documentation. ProLnk pros handle this regularly in DFW.'
  },
  {
    id: 'contractor-pressure',
    label: '🚨 A contractor knocked on my door after the storm',
    title: 'Storm Chaser Warning — DFW Danger Zone',
    steps: [
      'Do NOT sign any Assignment of Benefits (AOB) — you lose control of your claim',
      'Do not let any contractor do emergency repairs before insurer approves',
      'Get contractor license number and verify it on Texas State License Board',
      'Do not pay any upfront deposit to storm chasers — this is a major DFW scam',
      'Report aggressive storm chasers to Texas Department of Insurance'
    ],
    action: 'Use ProLnk to find a licensed, vetted DFW roofer with verifiable local track record. All ProLnk pros are screened — no storm chasers.'
  }
];

export default function DFWRoofingClaimDFWFinal2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = stages.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: '26px', fontWeight: '800', margin: '0 0 8px' }}>
            DFW Roofing Insurance Claim Final Guide
          </h1>
          <p style={{ color: '#F5E642', fontSize: '13px', fontWeight: '700', margin: '0 0 8px' }}>
            FINAL GUIDE 2026 — DEFINITIVE DFW RESOURCE
          </p>
          <p style={{ color: '#94a3b8', fontSize: '15px', margin: '0' }}>
            DFW gets more hail claims than nearly any US metro. Know your rights, protect your payout, and avoid storm chasers.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '14px', fontWeight: '700', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Where Are You In the Claim Process? →
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stages.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  background: selected === s.id ? '#F5E642' : '#1e3a5f',
                  color: selected === s.id ? '#0A1628' : '#e2e8f0',
                  border: 'none', borderRadius: '8px', padding: '14px 16px',
                  textAlign: 'left', cursor: 'pointer', fontSize: '14px', fontWeight: '600'
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ background: '#112240', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ color: '#F5E642', fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>{active.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {active.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', fontWeight: '800', minWidth: '20px' }}>{i + 1}.</span>
                  <span style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '16px' }}>
              <div style={{ color: '#F5E642', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>⚡ ACTION</div>
              <p style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.6', margin: '0' }}>{active.action}</p>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', background: '#112240', borderRadius: '12px', padding: '24px' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 16px' }}>
            Get vetted DFW roofers who specialize in insurance claims — no storm chasers, ever
          </p>
          <a href="https://prolnk.io" style={{
            background: '#F5E642', color: '#0A1628', padding: '14px 32px',
            borderRadius: '8px', fontWeight: '800', fontSize: '15px', textDecoration: 'none', display: 'inline-block'
          }}>
            Find Vetted DFW Roofers → prolnk.io
          </a>
        </div>
      </div>
    </div>
  );
}
