import { useState } from 'react';

const symptoms = [
  { id: 'pooling', label: 'Water pools in yard after rain', solutions: ['Regrading', 'French drain', 'Dry creek bed'] },
  { id: 'basement', label: 'Water seeps into garage or foundation', solutions: ['French drain', 'Regrading', 'Sump pump'] },
  { id: 'erosion', label: 'Soil washing away along slopes', solutions: ['Dry creek bed', 'Retaining wall', 'Ground cover'] },
  { id: 'soggy', label: 'Perpetually soggy lawn areas', solutions: ['French drain', 'Catch basin', 'Regrading'] },
  { id: 'neighbor', label: 'Neighbor water drains onto your property', solutions: ['Swale', 'French drain', 'Legal review'] },
];

const solutions = [
  {
    name: 'French Drain',
    emoji: '🕳️',
    cost: '$1,500–$6,000',
    bestFor: 'Subsurface water, soggy areas, foundation seepage',
    description: 'Perforated pipe buried in gravel trench redirects groundwater away from problem areas.',
    dfwNote: 'DFW clay soil often clogs French drains in 5–8 years without proper fabric lining. Demand root-barrier fabric.',
    pros: ['Hidden underground', 'Handles high volume', 'Long-lasting when done right'],
    cons: ['Can clog in clay soil', 'Requires access for cleaning', 'More expensive than regrading'],
  },
  {
    name: 'Regrading',
    emoji: '⛏️',
    cost: '$500–$3,000',
    bestFor: 'Water pooling near foundation, negative slope toward house',
    description: 'Adding or redistributing soil to create positive slope (6 inches per 10 feet) away from structures.',
    dfwNote: 'Most DFW homes settle and develop negative grade within 5–10 years due to expansive clay shrinkage.',
    pros: ['Lowest cost fix', 'Permanent if done correctly', 'No maintenance parts'],
    cons: ["Won't fix subsurface water", 'Disturbs existing landscaping', 'May require sod replacement'],
  },
  {
    name: 'Dry Creek Bed',
    emoji: '🪨',
    cost: '$800–$4,000',
    bestFor: 'Surface runoff, slope erosion, aesthetic drainage',
    description: 'Decorative rock channel that directs surface runoff while adding landscape interest.',
    dfwNote: 'Popular in DFW because it handles the 3–4 inch rainfall events common in spring without being an eyesore.',
    pros: ['Attractive solution', 'Handles large volume', 'Low maintenance'],
    cons: ['Surface water only', 'Debris accumulation', 'Requires proper outlet'],
  },
];

export default function DrainageAndGradingGuide() {
  const [checkedSymptoms, setCheckedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleSymptom = (id: string) => {
    setCheckedSymptoms(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const recommendedSolutions = showResults
    ? [...new Set(
        symptoms
          .filter(s => checkedSymptoms.includes(s.id))
          .flatMap(s => s.solutions)
      )]
    : [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2d4a 100%)', padding: '60px 24px 40px', textAlign: 'center', borderBottom: '1px solid #1e3a5f' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🌧️</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 12px', color: '#FFFFFF' }}>
          DFW Drainage & Grading Guide
        </h1>
        <p style={{ fontSize: 18, color: '#8BA3C0', maxWidth: 640, margin: '0 auto 16px' }}>
          Expansive clay soil is the #1 cause of drainage failures in Dallas-Fort Worth. Here is how to diagnose and fix your yard.
        </p>
        <div style={{ display: 'inline-block', background: '#1e3a5f', borderRadius: 8, padding: '8px 20px', fontSize: 14, color: '#60A5FA' }}>
          🏠 DFW-specific guidance for black clay (Vertisol) soil conditions
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#1a1a2e', border: '1px solid #F59E0B', borderRadius: 12, padding: 24, marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F59E0B', margin: '0 0 12px' }}>
            ⚠️ Why DFW Drainage Is Different
          </h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>
            Dallas-Fort Worth sits on expansive <strong style={{ color: '#FCD34D' }}>black clay (Vertisol) soil</strong> that swells when wet and shrinks when dry — sometimes by 3–4 inches seasonally. This creates a moving, cracking soil environment that makes drainage engineering more complex than most of the country. Solutions that work in sandy-soil states often fail here within 2–3 years without DFW-specific design.
          </p>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 32, marginBottom: 40, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px' }}>
            🔍 Symptom Checker
          </h2>
          <p style={{ color: '#8BA3C0', margin: '0 0 24px' }}>Select all that apply to your property:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {symptoms.map(s => (
              <label
                key={s.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                  background: checkedSymptoms.includes(s.id) ? '#1e3a5f' : '#0A1628',
                  border: `2px solid ${checkedSymptoms.includes(s.id) ? '#60A5FA' : '#1e3a5f'}`,
                  borderRadius: 8, cursor: 'pointer', transition: 'all 0.15s'
                }}
              >
                <input
                  type="checkbox"
                  checked={checkedSymptoms.includes(s.id)}
                  onChange={() => toggleSymptom(s.id)}
                  style={{ width: 18, height: 18, accentColor: '#60A5FA' }}
                />
                <span style={{ color: '#E8EDF5', fontSize: 16 }}>{s.label}</span>
              </label>
            ))}
          </div>
          <button
            onClick={() => setShowResults(true)}
            disabled={checkedSymptoms.length === 0}
            style={{
              background: checkedSymptoms.length > 0 ? '#2563EB' : '#1e3a5f',
              color: checkedSymptoms.length > 0 ? '#FFFFFF' : '#4B6A8A',
              border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16,
              fontWeight: 700, cursor: checkedSymptoms.length > 0 ? 'pointer' : 'default'
            }}
          >
            Show Recommended Solutions
          </button>
          {showResults && recommendedSolutions.length > 0 && (
            <div style={{ marginTop: 24, padding: 20, background: '#0A1628', borderRadius: 8, border: '1px solid #60A5FA' }}>
              <p style={{ color: '#60A5FA', fontWeight: 700, margin: '0 0 12px', fontSize: 16 }}>
                Based on your symptoms, consider:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {recommendedSolutions.map(sol => (
                  <span key={sol} style={{ background: '#1e3a5f', color: '#93C5FD', padding: '6px 14px', borderRadius: 20, fontSize: 14 }}>
                    {sol}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 700, color: '#FFFFFF', margin: '0 0 24px' }}>🛠️ Solution Comparison</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48 }}>
          {solutions.map(sol => (
            <div key={sol.name} style={{ background: '#0f2035', borderRadius: 12, padding: 28, border: '1px solid #1e3a5f' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 32 }}>{sol.emoji}</span>
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>{sol.name}</h3>
                  <span style={{ color: '#34D399', fontWeight: 600, fontSize: 15 }}>{sol.cost}</span>
                </div>
              </div>
              <p style={{ color: '#8BA3C0', fontSize: 14, margin: '0 0 8px' }}>
                <strong style={{ color: '#60A5FA' }}>Best for:</strong> {sol.bestFor}
              </p>
              <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 12px' }}>{sol.description}</p>
              <div style={{ background: '#1a2d4a', borderRadius: 8, padding: '12px 16px', marginBottom: 16, borderLeft: '3px solid #F59E0B' }}>
                <p style={{ color: '#FCD34D', fontSize: 14, margin: 0 }}><strong>DFW Note:</strong> {sol.dfwNote}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <p style={{ color: '#34D399', fontWeight: 600, margin: '0 0 6px', fontSize: 14 }}>Pros</p>
                  {sol.pros.map(p => <p key={p} style={{ color: '#CBD5E1', fontSize: 14, margin: '0 0 4px' }}>• {p}</p>)}
                </div>
                <div>
                  <p style={{ color: '#F87171', fontWeight: 600, margin: '0 0 6px', fontSize: 14 }}>Cons</p>
                  {sol.cons.map(c => <p key={c} style={{ color: '#CBD5E1', fontSize: 14, margin: '0 0 4px' }}>• {c}</p>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 32, marginBottom: 40, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', margin: '0 0 20px' }}>❓ Questions to Ask Any Contractor</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Do you use non-woven filter fabric in French drains to prevent clay intrusion?',
              'Where does the water outlet? What happens at the street or property line?',
              'Do you perform a site elevation survey before recommending a solution?',
              'What warranty do you provide on labor and materials?',
              'Have you worked on clay soil drainage in this specific area of DFW?',
            ].map((q, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', background: '#0A1628', borderRadius: 8 }}>
                <span style={{ color: '#60A5FA', fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
                <span style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{q}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #2563EB)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px' }}>Get Quotes from DFW Drainage Pros</h2>
          <p style={{ color: '#93C5FD', fontSize: 16, margin: '0 auto 28px', maxWidth: 500 }}>
            ProLnk connects you with verified local contractors who specialize in North Texas clay soil drainage.
          </p>
          <button style={{ background: '#FFFFFF', color: '#1e3a5f', border: 'none', borderRadius: 10, padding: '16px 40px', fontSize: 18, fontWeight: 800, cursor: 'pointer' }}>
            Get Free Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
