import { useState } from 'react';

export default function DFWRoofingContractorLicense2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const situations = [
    { id: 'storm_chaser', label: 'Door knocker after storm' },
    { id: 'no_insurance', label: 'Contractor has no insurance' },
    { id: 'has_certs', label: 'Has manufacturer certification' },
    { id: 'prolnk_match', label: 'ProLnk matched contractor' },
  ];

  const guides: Record<string, { verdict: string; color: string; steps: string[] }> = {
    storm_chaser: {
      verdict: 'HIGH RISK — Verify Everything', color: '#ef4444',
      steps: [
        '🚨 Texas has NO state roofing license — anyone can knock your door after a storm',
        '🚨 Storm chasers often disappear after insurance check clears',
        '🔍 Require: general liability insurance (min $1M per occurrence)',
        '🔍 Require: workers comp if bringing a crew onto your roof',
        '🔍 Ask for local DFW references — not just a business card',
        '✅ Check BBB and HAAG certification before signing anything',
      ],
    },
    no_insurance: {
      verdict: 'DO NOT HIRE', color: '#ef4444',
      steps: [
        '🚫 No insurance = you are liable if a worker is injured on your roof',
        '🚫 Your homeowner policy may not cover damage they cause',
        '🚫 Texas law does not require roofing license — insurance is the only backstop',
        '⚠️ Certificate of Insurance must name YOU as additional insured',
        '⚠️ Call the insurer to verify policy is active — not just the contractor',
        '✅ ProLnk verifies current insurance certificates before any match',
      ],
    },
    has_certs: {
      verdict: 'GOOD SIGNAL — Still Verify Insurance', color: '#22c55e',
      steps: [
        '✅ Manufacturer cert (GAF Master Elite, Owens Corning Preferred) = serious training',
        '✅ HAAG certification = specialized hail and wind damage assessment',
        '✅ These certs are what licensing was designed to accomplish — but voluntary',
        '✅ Certified contractors can offer better manufacturer warranties (Golden Pledge, etc.)',
        '🔍 Still verify insurance independently — certs alone do not protect you',
        '✅ ProLnk prioritizes certified DFW contractors in all matches',
      ],
    },
    prolnk_match: {
      verdict: 'VERIFIED — Safe to Proceed', color: '#22c55e',
      steps: [
        '✅ ProLnk has verified: general liability insurance active and current',
        '✅ ProLnk has verified: workers comp if crew size requires it',
        '✅ ProLnk has checked: BBB standing and local DFW references',
        '✅ ProLnk has screened: manufacturer certifications where available',
        '✅ ProLnk captures: HAAG training for storm damage specialists',
        '✅ ProLnk fills the gap that TX roofing licensing does not',
      ],
    },
  };

  const handleSituation = (id: string) => { setSituation(id); setResult(id); };
  const current = guides[result];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>🏠 DFW Why Roofing Has No License Guide 2026</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Understanding unlicensed roofing in Texas and how to protect yourself in DFW.</p>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📋 The Texas Roofing License Situation</div>
          {[
            { icon: '🏛️', fact: 'Texas has NO state roofing license requirement — this is why DFW has more storm chasers than almost any US city.' },
            { icon: '🌪️', fact: 'After every DFW hail event, out-of-state contractors flood the market with no local accountability.' },
            { icon: '🔑', fact: 'What to require instead: current GL insurance ($1M+), workers comp, and at least one manufacturer certification.' },
            { icon: '🛡️', fact: 'ProLnk screens for exactly what licensing was designed to accomplish — before you ever meet a contractor.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
              <span>{item.icon}</span><span>{item.fact}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🎯 My Contractor Situation</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            {situations.map((s) => (
              <button key={s.id} onClick={() => handleSituation(s.id)} style={{ backgroundColor: situation === s.id ? '#F5E642' : '#1a2f50', color: situation === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: '8px', padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>{s.label}</button>
            ))}
          </div>
          {current && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: current.color, fontWeight: 700, marginBottom: '0.75rem' }}>{current.verdict}</div>
              {current.steps.map((step, i) => <div key={i} style={{ color: '#e2e8f0', marginBottom: '0.4rem', fontSize: '0.9rem' }}>{step}</div>)}
              <div style={{ marginTop: '1rem', color: '#F5E642', fontSize: '0.85rem' }}>ProLnk does the vetting Texas law does not require — so DFW homeowners are protected. 🛡️</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
