import { useState } from 'react';

export default function DFWRoofingMaterialRating2026() {
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState('');

  const goals = [
    'Lower my homeowners insurance premium',
    'Maximum storm protection',
    'Meet DFW city requirements',
    'Qualify for Fortified designation',
    'Understand my current shingles',
  ];

  const guide: Record<string, string> = {
    'Lower my homeowners insurance premium': 'Focus on UL 2218 Class 4 impact rating — this is what DFW insurers care most about. Class 4 shingles can reduce hail deductibles and some carriers (State Farm, Farmers, USAA) offer 10-28% premium discounts. Look for shingles like Malarkey Vista AR, GAF Timberline HDZ, or Owens Corning Duration Storm. Also ask your agent about FM 4473 Class 4 — some carriers require FM rather than UL rating for discounts.',
    'Maximum storm protection': 'Pursue IBHS Fortified Roof designation — it exceeds all other ratings. Requires: sealed roof deck (peel-and-stick underlayment), ring-shank nails, Class 4 impact shingles, and sealed edges/hips/ridges. Total cost premium over standard: $2,000-4,000 on average DFW home. Best protection for DFW hail, straight-line winds, and occasional tornado risk.',
    'Meet DFW city requirements': 'All DFW cities require Class A fire rating minimum — this means asphalt shingles must be UL 790 Class A rated. This is the baseline; almost all modern shingles meet this. Some DFW HOAs or older fire districts may require Class A plus impact rating. Check with your city building department — permits for reroof require meeting current code.',
    'Qualify for Fortified designation': 'IBHS Fortified requires three components: (1) Fortified Roof — sealed deck + Class 4 shingles + proper fasteners, (2) Fortified Silver adds hurricane straps at rafters, (3) Fortified Gold adds walls and openings. Start with Fortified Roof — it is the entry level and provides the insurance benefits. Must use IBHS-approved evaluator contractor. List at ibhs.org.',
    'Understand my current shingles': 'Check the shingle label or ask for the product data sheet. Key ratings to look for: UL 790 Class A (fire), UL 2218 Class 1-4 (impact — higher is better), FM 4473 Class 1-4 (alternate impact standard). Most basic 3-tab shingles are Class 1 or 2 impact. Architectural/dimensional shingles are typically Class 3. Impact-rated products are Class 4. Age matters too — DFW sun degrades granules after 15-20 years.',
  };

  function handleCheck() {
    if (!goal) return;
    setResult(guide[goal] || '');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏆🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 4 }}>DFW Roofing Material Fire and Wind Rating Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Ratings determine insurance costs, code compliance, and storm protection in DFW — knowing the difference between UL, FM, and IBHS can save thousands.</p>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📊 DFW Ratings Explained</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#0d2137′ }}>
                  {['Rating', 'What It Tests', 'DFW Relevance'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#F5E642′ }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['UL 790 Class A', 'Fire resistance', 'Required by all DFW cities'],
                  ['UL 2218 Class 1-4', 'Steel ball impact', 'Insurance premium discounts'],
                  ['FM 4473 Class 1-4', 'Freeze/thaw impact', 'Some carriers prefer this'],
                  ['IBHS Fortified', 'Full storm system', 'Best discount, full protection'],
                ].map(([r, w, d]) => (
                  <tr key={r} style={{ borderBottom: '1px solid #1e3a5f' }}>
                    <td style={{ padding: '8px 12px', color: '#F5E642', fontWeight: 600 }}>{r}</td>
                    <td style={{ padding: '8px 12px', color: '#e2e8f0′ }}>{w}</td>
                    <td style={{ padding: '8px 12px', color: '#94a3b8′ }}>{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🎯 My Goal → Rating Priority</h2>
          <select
            value={goal}
            onChange={e => { setGoal(e.target.value); setResult(''); }}
            style={{ width: '100%', padding: '10px 12px', background: '#0d2137', color: '#fff', border: '1px solid #2d4a6b', borderRadius: 8, fontSize: 14, marginBottom: 12 }}
          >
            <option value="">Select your goal...</option>
            {goals.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <button
            onClick={handleCheck}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
          >
            Get Rating Priority Guide
          </button>
          {result && (
            <div style={{ background: '#0d2137', borderRadius: 8, padding: 16, marginTop: 16, color: '#e2e8f0', lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>💰 DFW Insurance Impact</h2>
          {[
            'Class 4 impact rating: 10-28% premium discount with most major DFW carriers',
            'IBHS Fortified Roof: up to 30% discount — largest single discount available',
            'Always provide your carrier with the product data sheet proving Class 4 rating',
            'Some carriers in DFW waive hail deductible for Class 4 roofs — ask specifically',
            'Document everything: take photos of shingle labels, keep data sheets for future claims',
          ].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ color: '#F5E642′ }}>💵</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
