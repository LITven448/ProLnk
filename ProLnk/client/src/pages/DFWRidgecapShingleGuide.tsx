import { useState } from 'react';

export default function DFWRidgecapShingleGuide() {
  const [condition, setCondition] = useState('');
  const [sunExposure, setSunExposure] = useState('');
  const [result, setResult] = useState<null | { urgency: string; urgencyColor: string; cost: string; timing: string; note: string }>(null);

  const matrix: Record<string, Record<string, { urgency: string; urgencyColor: string; cost: string; timing: string; note: string }>> = {
    good: {
      high: { urgency: 'Monitor Annually', urgencyColor: '#10B981', cost: '$0 now — budget $400-700 in 3-5 years', timing: 'Replace with next full roof replacement.', note: 'High UV exposure accelerates granule loss on ridge caps even when they look intact. Document condition with photos each year.' },
      medium: { urgency: 'No Action Needed', urgencyColor: '#10B981', cost: '$0 — inspect again in 2 years', timing: 'No immediate action.', note: 'Ridge caps in good condition with moderate sun have 5-8 years of life remaining in DFW climate.' },
      low: { urgency: 'No Action Needed', urgencyColor: '#10B981', cost: '$0 — inspect again in 3 years', timing: 'No immediate action.', note: 'Shaded ridge caps age slower. Inspect for algae growth which is more common in shaded areas.' }
    },
    cracking: {
      high: { urgency: 'Replace Within 12 Months', urgencyColor: '#F59E0B', cost: '$400-800 typical DFW ridge cap replacement', timing: 'Do not wait for full roof replacement — cracks allow water and wind uplift.', note: 'DFW wind events will pull at cracked ridge caps. One bad storm can remove several courses.' },
      medium: { urgency: 'Replace Within 18 Months', urgencyColor: '#F59E0B', cost: '$400-700 ridge cap replacement', timing: 'Plan for next fall or spring roofing season.', note: 'Cracking without high UV exposure gives more time, but DFW summers will accelerate deterioration quickly.' },
      low: { urgency: 'Monitor Closely', urgencyColor: '#F59E0B', cost: '$350-650 — get a quote this season', timing: 'Replace within 24 months.', note: 'Shaded cracking is unusual — check for ventilation issues driving heat from inside the attic.' }
    },
    lifting: {
      high: { urgency: '⚠️ Replace Now', urgencyColor: '#EF4444', cost: '$500-900 emergency priority', timing: 'Do not wait — DFW storm season will remove lifted caps entirely.', note: 'Lifted ridge caps in high-UV zones have lost their adhesive seal. One good DFW gust can strip them clean.' },
      medium: { urgency: 'Replace Within 60 Days', urgencyColor: '#EF4444', cost: '$450-800', timing: 'Schedule before next major storm front.', note: 'Lifting exposes the ridge board and underlayment to direct rain. Interior water damage risk is real.' },
      low: { urgency: 'Replace Within 90 Days', urgencyColor: '#EF4444', cost: '$400-750', timing: 'Do not delay past next major DFW storm season.', note: 'Even shaded lifting indicates nail failure or wind damage underneath. Inspect decking for rot.' }
    },
    missing: {
      high: { urgency: '🚨 Emergency — Replace Immediately', urgencyColor: '#EF4444', cost: '$600-1,100 with emergency surcharge', timing: 'Call today — exposed ridge means active leak risk.', note: 'Missing ridge caps expose the entire ridge board to DFW rain. Every inch of rain drives water directly into your attic.' },
      medium: { urgency: '🚨 Replace This Week', urgencyColor: '#EF4444', cost: '$500-950', timing: 'Do not wait for weather to be convenient.', note: 'Missing ridge caps are an active roofing emergency regardless of current weather.' },
      low: { urgency: '🚨 Replace This Week', urgencyColor: '#EF4444', cost: '$500-900', timing: 'Even shaded missing caps require immediate action.', note: 'Ridge is exposed to full rain exposure during every DFW storm regardless of general shade levels.' }
    }
  };

  function analyze() {
    if (!condition || !sunExposure) return;
    setResult(matrix[condition]?.[sunExposure] ?? null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '.25rem' }}>🏔️</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', fontWeight: 700, marginBottom: '.5rem' }}>
          DFW Ridge Cap Shingle Guide
        </h1>
        <p style={{ color: '#9AAAB8', marginBottom: '2rem', lineHeight: 1.6 }}>
          Ridge caps sit at the peak of your roof — the highest point, most exposed to DFW wind, UV, and thermal cycling. They fail before field shingles and are often overlooked until a storm rips them off. Here's what DFW homeowners need to know.
        </p>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#0F2040', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '.5rem' }}>☀️ Why Ridge Caps Fail First in DFW</div>
            <p style={{ color: '#9AAAB8', margin: 0, fontSize: '.95rem' }}>Ridge caps bend over the peak at a sharp angle, constantly expanding and contracting with DFW's 50°F daily temperature swings. The asphalt adhesive strip that holds them sealed degrades fastest at the peak. Combined with DFW wind uplift patterns, ridge caps typically have 60-70% of field shingle lifespan.</p>
          </div>
          <div style={{ background: '#0F2040', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #3B82F6' }}>
            <div style={{ fontWeight: 600, color: '#3B82F6', marginBottom: '.5rem' }}>🔭 How to Inspect from the Ground</div>
            <p style={{ color: '#9AAAB8', margin: 0, fontSize: '.95rem' }}>Use binoculars or your phone camera with zoom from street level. Look for: gaps between ridge cap courses, lifted corners (shadow lines along the ridge), missing caps (exposed dark strip), or granule-free surfaces that look lighter than surrounding shingles.</p>
          </div>
          <div style={{ background: '#0F2040', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #10B981' }}>
            <div style={{ fontWeight: 600, color: '#10B981', marginBottom: '.5rem' }}>💡 Replace With Full Roof or Standalone?</div>
            <p style={{ color: '#9AAAB8', margin: 0, fontSize: '.95rem' }}>If your full roof has less than 5 years of life remaining, bundle ridge cap replacement into the full reroof — marginal cost delta. If your field shingles have 8+ years left and ridge caps are failing, standalone replacement ($400-900) is the right call. Do not let ridge caps fail while waiting for a full reroof.</p>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>🔍 Assess Your Ridge Caps</h2>
          <div style={{ display: 'grid', gap: '.75rem', marginBottom: '1rem' }}>
            <select value={condition} onChange={e => setCondition(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '.75rem', fontSize: '1rem' }}>
              <option value=''>Ridge cap condition</option>
              <option value='good'>Good — intact, no visible issues</option>
              <option value='cracking'>Cracking or brittle edges</option>
              <option value='lifting'>Lifting or curling corners</option>
              <option value='missing'>Missing — gaps visible</option>
            </select>
            <select value={sunExposure} onChange={e => setSunExposure(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '.75rem', fontSize: '1rem' }}>
              <option value=''>DFW sun exposure</option>
              <option value='high'>High — full south/west facing, minimal shade</option>
              <option value='medium'>Medium — mixed shade and sun</option>
              <option value='low'>Low — significant tree or structure shade</option>
            </select>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '.75rem 1.5rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', width: '100%' }}>
            Get Ridge Cap Assessment
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', border: `1px solid ${result.urgencyColor}` }}>
            <h3 style={{ color: result.urgencyColor, marginBottom: '1rem' }}>{result.urgency}</h3>
            <div style={{ display: 'grid', gap: '.75rem' }}>
              <div><span style={{ color: '#9AAAB8' }}>Estimated Cost: </span><strong style={{ color: '#F5E642' }}>{result.cost}</strong></div>
              <div><span style={{ color: '#9AAAB8' }}>Timing: </span><span style={{ color: '#E8EDF5' }}>{result.timing}</span></div>
              <div style={{ color: '#9AAAB8', fontSize: '.9rem', borderTop: '1px solid #1E3A5F', paddingTop: '.75rem' }}>{result.note}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
