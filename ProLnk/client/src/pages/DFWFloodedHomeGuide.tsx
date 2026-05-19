import { useState } from 'react';

const floodPlans = {
  storm_minor: {
    moldWindow: '48–72 hours in DFW summer heat',
    restorationCost: '$1,500–$6,000',
    timeline: ['Hour 1: Document all damage with photos/video before moving anything', 'Hour 2: Extract standing water with wet-vac or call restoration company', 'Hour 3: Remove wet rugs, furniture, and belongings to dry area', 'Hour 6: Set up fans and dehumidifiers — DFW humidity accelerates mold', 'Day 2: Call insurance adjuster, get restoration estimates', 'Day 3–7: Active drying with commercial equipment'],
    fema: 'FEMA assistance available if presidentially declared disaster. Check DisasterAssistance.gov.',
    insurance: 'Standard homeowners covers sudden flooding from rain infiltration. Flood from rising water requires separate NFIP flood policy.',
  },
  storm_severe: {
    moldWindow: '24–36 hours — DFW heat and humidity make this a race',
    restorationCost: '$8,000–$40,000+',
    timeline: ['Hour 1: Ensure no structural damage or electrical hazards before entering', 'Hour 1: Call restoration company AND insurance simultaneously', 'Hour 2: Document everything — do not move anything until adjuster advises', 'Hour 4: Emergency board-up and tarping if roof is compromised', 'Day 1: Insurance adjuster on site, remediation team deployed', 'Day 2–14: Full structural drying, mold prevention treatment'],
    fema: 'Register at DisasterAssistance.gov within 60 days of disaster. Bring insurance denial letter if applicable.',
    insurance: 'Call your agent immediately — do not sign restoration contracts until adjuster reviews. Get multiple restoration quotes.',
  },
  plumbing_minor: {
    moldWindow: '48 hours — clean water buys more time than storm water',
    restorationCost: '$500–$3,000',
    timeline: ['Immediately: Turn off water supply to leaking fixture or main shutoff', 'Hour 1: Extract water with wet-vac or towels', 'Hour 2: Remove wet flooring materials if possible', 'Hour 4: Set up fans and dehumidifiers', 'Day 1: Document and call insurance — plumbing failure is covered', 'Day 2–5: Monitor with moisture meter, dry thoroughly'],
    fema: 'FEMA not applicable for plumbing failures — covered under homeowners insurance.',
    insurance: 'Sudden and accidental plumbing failures are covered. Gradual leaks or neglected maintenance are typically excluded.',
  },
  plumbing_severe: {
    moldWindow: '24–48 hours depending on water category',
    restorationCost: '$5,000–$25,000',
    timeline: ['Immediately: Shut off main water and electricity to affected areas', 'Hour 1: Call licensed plumber to fix source + restoration company for water extraction', 'Hour 2: Insurance call — document everything before remediation starts', 'Hour 4: Professional water extraction and drying equipment deployed', 'Day 2: Moisture mapping and drying protocol established', 'Day 5–14: Full dry-out, reconstruction assessment'],
    fema: 'FEMA not applicable for plumbing failures.',
    insurance: 'Document all damage. Sewage backup requires separate rider — standard policy may exclude it.',
  },
};

export default function DFWFloodedHomeGuide() {
  const [source, setSource] = useState('');
  const [extent, setExtent] = useState('');
  const [result, setResult] = useState<null | typeof floodPlans.storm_minor>(null);

  function handleAssess() {
    const key = `${source}_${extent}` as keyof typeof floodPlans;
    if (floodPlans[key]) setResult(floodPlans[key]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>🌊</span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Flooded Home Emergency Guide</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          DFW flash floods are sudden and severe — the region averages over 40 flash flood events annually. With summer temperatures above 95°F and 70%+ humidity, mold can begin growing in as little as 24 hours. The first 48 hours are critical.
        </p>

        <div style={{ background: '#1e3a5f', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #3b82f6' }}>
          <h2 style={{ color: '#93c5fd', fontSize: '1rem', marginBottom: '0.5rem' }}>🏥 Safety First</h2>
          <p style={{ color: '#bfdbfe', margin: 0, fontSize: '0.9rem' }}>Do not enter flooded areas if electricity may be on. Floodwater can carry sewage, chemicals, and debris. Check for structural damage before entering. Turn off electricity at the breaker if safe to do so.</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔍 Tell Us About Your Flood</h2>
          <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Source of flooding:</label>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {[{ key: 'storm', label: '⛈️ Storm / rising water / rain' }, { key: 'plumbing', label: '🚿 Plumbing failure / burst pipe' }].map(opt => (
              <button key={opt.key} onClick={() => setSource(opt.key)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '2px solid', borderColor: source === opt.key ? '#F5E642' : '#334155', background: source === opt.key ? '#F5E642' : 'transparent', color: source === opt.key ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: 'pointer' }}>
                {opt.label}
              </button>
            ))}
          </div>
          <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Extent of flooding:</label>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {[{ key: 'minor', label: '🟡 Less than 1 inch / limited area' }, { key: 'severe', label: '🔴 Multiple rooms or inches deep' }].map(opt => (
              <button key={opt.key} onClick={() => setExtent(opt.key)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '2px solid', borderColor: extent === opt.key ? '#F5E642' : '#334155', background: extent === opt.key ? '#F5E642' : 'transparent', color: extent === opt.key ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: 'pointer' }}>
                {opt.label}
              </button>
            ))}
          </div>
          <button onClick={handleAssess} disabled={!source || !extent} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', opacity: (!source || !extent) ? 0.5 : 1 }}>
            Get Action Timeline
          </button>
        </div>

        {result && (
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div style={{ background: '#7f1d1d', borderRadius: '8px', padding: '0.75rem 1rem', flex: 1 }}>
                <div style={{ color: '#fca5a5', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>🦠 MOLD WINDOW</div>
                <div style={{ color: '#fecaca', fontWeight: 600 }}>{result.moldWindow}</div>
              </div>
              <div style={{ background: '#1e3a5f', borderRadius: '8px', padding: '0.75rem 1rem', flex: 1 }}>
                <div style={{ color: '#93c5fd', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>💰 EST. COST</div>
                <div style={{ color: '#bfdbfe', fontWeight: 600 }}>{result.restorationCost}</div>
              </div>
            </div>
            <h3 style={{ color: '#F5E642', fontSize: '1rem', marginBottom: '0.75rem' }}>⏱️ Action Timeline</h3>
            <ol style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: '1.2rem', margin: '0 0 1rem 0' }}>
              {result.timeline.map((t, i) => <li key={i}>{t}</li>)}
            </ol>
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>🏠 Insurance Steps</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{result.insurance}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>🏛️ FEMA Assistance</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{result.fema}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
