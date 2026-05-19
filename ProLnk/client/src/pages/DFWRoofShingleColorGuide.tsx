import { useState } from 'react';

export default function DFWRoofShingleColorGuide() {
  const [homeStyle, setHomeStyle] = useState('');
  const [hasHOA, setHasHOA] = useState('');
  const [energyPriority, setEnergyPriority] = useState('');
  const [result, setResult] = useState<null | { color: string; resale: number; energyImpact: string; hoaNote: string }>(null);

  const colorMap: Record<string, Record<string, string>> = {
    traditional: { energy: 'Light Gray or Weathered Wood — reflects DFW heat, HOA-safe, neutral resale', cooling: 'Cuts cooling load ~15% vs dark shingles in DFW summers' },
    modern: { energy: 'Charcoal or Slate Gray — photovoltaic-ready aesthetics, watch HOA rules', cooling: 'Adds ~8-12% cooling cost in DFW; offset with attic ventilation' },
    ranch: { energy: 'Tan or Desert Sand — blends with DFW landscape, high resale neutrality', cooling: 'Moderate reflectivity; mid-range cooling impact' },
    craftsman: { energy: 'Weathered Wood or Autumn Brown — period-appropriate, broad buyer appeal', cooling: 'Medium heat absorption; recommend ridge vent upgrade' },
  };

  function getResaleScore(style: string, hoa: string): number {
    const base: Record<string, number> = { traditional: 88, modern: 74, ranch: 85, craftsman: 82 };
    const score = base[style] ?? 80;
    return hoa === 'yes' ? Math.min(score + 5, 99) : score;
  }

  function analyze() {
    if (!homeStyle || !hasHOA || !energyPriority) return;
    const entry = colorMap[homeStyle];
    const key = energyPriority === 'low-bills' ? 'energy' : 'cooling';
    const color = entry?.[key] ?? 'Light Gray — universally safe for DFW';
    const resale = getResaleScore(homeStyle, hasHOA);
    const energyImpact = entry?.cooling ?? 'Moderate impact expected in DFW climate';
    const hoaNote = hasHOA === 'yes'
      ? '⚠️ Submit color sample to HOA before ordering — DFW HOAs commonly reject saturated tones.'
      : '✅ No HOA — full palette available. Stick to neutrals for resale.';
    setResult({ color, resale, energyImpact, hoaNote });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '.25rem' }}>🎨</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', fontWeight: 700, marginBottom: '.5rem' }}>
          DFW Roof Shingle Color Guide
        </h1>
        <p style={{ color: '#9AAAB8', marginBottom: '2rem', lineHeight: 1.6 }}>
          Shingle color is one of the most impactful decisions for DFW homeowners — it affects your energy bills, HOA approval, resale value, and even insurance eligibility. In a climate that hits 110°F, choosing wrong costs real money.
        </p>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#0F2040', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '.5rem' }}>☀️ Heat Absorption in DFW</div>
            <p style={{ color: '#9AAAB8', margin: 0, fontSize: '.95rem' }}>Dark shingles (black, dark charcoal) can reach surface temps of 150-170°F on DFW summer days, raising attic temps 20-30°F and increasing AC runtime. Light colors reflect more UV and keep attic temps cooler — critical for homes without spray foam insulation.</p>
          </div>
          <div style={{ background: '#0F2040', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #3B82F6' }}>
            <div style={{ fontWeight: 600, color: '#3B82F6', marginBottom: '.5rem' }}>🏘️ HOA Color Restrictions</div>
            <p style={{ color: '#9AAAB8', margin: 0, fontSize: '.95rem' }}>DFW HOAs — especially in Frisco, Allen, Prosper, and Southlake — commonly maintain an approved color list. Reds, blues, greens, and stark whites are frequently rejected. Grays, tans, and weathered earth tones pass most committees.</p>
          </div>
          <div style={{ background: '#0F2040', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #10B981' }}>
            <div style={{ fontWeight: 600, color: '#10B981', marginBottom: '.5rem' }}>💰 Insurance Color Discounts</div>
            <p style={{ color: '#9AAAB8', margin: 0, fontSize: '.95rem' }}>Some DFW carriers offer 3-7% premium discounts for Class 4 impact-resistant shingles in lighter colors. Call your carrier before ordering — color can be a qualifying factor in combination with impact rating.</p>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>🔍 Get Your Color Recommendation</h2>
          <div style={{ display: 'grid', gap: '.75rem', marginBottom: '1rem' }}>
            <select value={homeStyle} onChange={e => setHomeStyle(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '.75rem', fontSize: '1rem' }}>
              <option value=''>Select your home style</option>
              <option value='traditional'>Traditional / Colonial</option>
              <option value='modern'>Modern / Contemporary</option>
              <option value='ranch'>Ranch / Single-Story</option>
              <option value='craftsman'>Craftsman / Bungalow</option>
            </select>
            <select value={hasHOA} onChange={e => setHasHOA(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '.75rem', fontSize: '1rem' }}>
              <option value=''>HOA status</option>
              <option value='yes'>Yes — I have an HOA</option>
              <option value='no'>No HOA</option>
            </select>
            <select value={energyPriority} onChange={e => setEnergyPriority(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '.75rem', fontSize: '1rem' }}>
              <option value=''>Primary priority</option>
              <option value='low-bills'>Lower energy bills</option>
              <option value='resale'>Maximum resale value</option>
            </select>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '.75rem 1.5rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', width: '100%' }}>
            Get Color Recommendation
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>Your DFW Color Recommendation</h3>
            <div style={{ marginBottom: '.75rem' }}><span style={{ color: '#9AAAB8' }}>Recommended Color: </span><strong style={{ color: '#E8EDF5' }}>{result.color}</strong></div>
            <div style={{ marginBottom: '.75rem' }}><span style={{ color: '#9AAAB8' }}>Resale Neutrality Score: </span><strong style={{ color: '#10B981' }}>{result.resale}/100</strong></div>
            <div style={{ marginBottom: '.75rem' }}><span style={{ color: '#9AAAB8' }}>DFW Energy Impact: </span><span style={{ color: '#E8EDF5' }}>{result.energyImpact}</span></div>
            <div style={{ color: '#E8EDF5', marginTop: '.5rem' }}>{result.hoaNote}</div>
          </div>
        )}
      </div>
    </div>
  );
}
