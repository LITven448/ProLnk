import { useState } from 'react';

const brokerTips = [
  'Ask for quotes from at least 3 different carriers',
  'Request the full policy declarations page, not just a summary',
  'Compare dwelling coverage limits, not just premiums',
  'Check replacement cost vs actual cash value for personal property',
  'Verify loss of use coverage (typically 20-30% of dwelling)',
  'Ask about claims history for the home (CLUE report)',
  'Confirm carrier financial strength rating (A or better)',
];

const questionsForBroker = [
  'Which carriers are still actively writing in DFW?',
  'What is the wind/hail deductible and how is it calculated?',
  'Is there a separate roof payment schedule for older roofs?',
  'What endorsements do DFW homeowners commonly add?',
  'How does this carrier handle DFW hail claims?',
  'What discounts apply for roof age, security system, or bundling?',
];

const infoNeeded = [
  'Year built and square footage',
  'Roof age, material, and condition',
  'Heating/cooling system age',
  'Electrical panel type (no knob-and-tube)',
  'Pool, trampoline, or dog breed (liability factors)',
  'Current coverage limits and deductibles',
  'Claims history (last 5 years)',
];

export default function DFWInsuranceShoppingGuide() {
  const [homeValue, setHomeValue] = useState('');
  const [roofAge, setRoofAge] = useState('');
  const [location, setLocation] = useState('');
  const [showChecklist, setShowChecklist] = useState(false);

  const getRoofNote = () => {
    const age = parseInt(roofAge);
    if (!age) return '';
    if (age <= 5) return 'New roof — most carriers will offer best rates. Leverage this.';
    if (age <= 10) return 'Good roof age — strong position for competitive quotes.';
    if (age <= 15) return 'Moderate age — some carriers may apply a payment schedule for claims.';
    if (age <= 20) return 'Aging roof — some carriers may require inspection or decline coverage.';
    return 'Older roof — ask specifically which carriers will insure and on what terms.';
  };

  const getPriorityComparisons = () => {
    const val = parseInt(homeValue?.replace(/,/g, ''));
    const items = [
      'Dwelling replacement cost coverage (match rebuild cost, not market value)',
      'Wind/hail deductible structure (1% vs 2% of dwelling)',
      'Roof replacement terms (full replacement vs depreciated value)',
    ];
    if (val > 500000) items.push('Extended replacement cost endorsement (20-50% buffer above limit)');
    if (location === 'tornado') items.push('Separate tornado coverage terms — verify explicitly');
    return items;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', color: '#1a1a2e', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#666′ }}>ProLnk Guide · DFW Homeowners</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0A1628′ }}>
          🏠 DFW Homeowners Insurance Shopping Guide 2026
        </h1>
        <p style={{ color: '#555', marginBottom: '2rem', lineHeight: 1.6 }}>
          The DFW insurance market has changed dramatically. Several major carriers have exited or restricted new policies. Here's how to shop smart in today’s market.
        </p>

        <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 8, padding: '1rem 1.25rem', marginBottom: '2rem' }}>
          <strong>⚠️ Market Alert:</strong> Multiple national carriers have stopped writing new homeowner policies in DFW or significantly tightened underwriting. Always confirm a carrier is actively quoting before spending time on an application.
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#0A1628′ }}>🔍 Independent Broker vs Captive Agent</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#f0fff4', borderRadius: 8, padding: '1rem' }}>
              <strong style={{ color: '#276749′ }}>✅ Independent Broker</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#333′ }}>
                <li>Shops multiple carriers for you</li>
                <li>Not tied to one company's products</li>
                <li>Better for complex or high-value homes</li>
                <li>Can find carriers still writing in DFW</li>
              </ul>
            </div>
            <div style={{ background: '#fff5f5', borderRadius: 8, padding: '1rem' }}>
              <strong style={{ color: '#9b2c2c' }}>⚠️ Captive Agent</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#333′ }}>
                <li>Only sells one company's policies</li>
                <li>Limited if that carrier has exited DFW</li>
                <li>May have fewer options for older homes</li>
                <li>Fine if the carrier is competitive in your area</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#0A1628′ }}>📋 Information You Need for Quotes</h2>
          <ul style={{ paddingLeft: '1.2rem' }}>
            {infoNeeded.map((item, i) => (
              <li key={i} style={{ marginBottom: '0.4rem', fontSize: '0.9rem', color: '#444′ }}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#0A1628′ }}>🧮 Your Shopping Checklist</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Home Value ($)</label>
              <input value={homeValue} onChange={e => setHomeValue(e.target.value)} placeholder="e.g. 450000″ style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #ddd', fontSize: '0.9rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Roof Age (years)</label>
              <input value={roofAge} onChange={e => setRoofAge(e.target.value)} placeholder="e.g. 8″ style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #ddd', fontSize: '0.9rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>DFW Zone</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #ddd', fontSize: '0.9rem' }}>
                <option value="">Select...</option>
                <option value="north">North DFW (Frisco, McKinney, Prosper)</option>
                <option value="tornado">Tornado Alley (Garland, Mesquite, east)</option>
                <option value="central">Central/Urban (Dallas, Fort Worth)</option>
                <option value="south">South DFW (Mansfield, Midlothian)</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowChecklist(true)} style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Generate My Checklist</button>
          {showChecklist && (
            <div style={{ marginTop: '1.25rem' }}>
              {roofAge && <div style={{ background: '#e8f4fd', borderRadius: 6, padding: '0.75rem', marginBottom: '0.75rem', fontSize: '0.9rem' }}>🏠 <strong>Roof Note:</strong> {getRoofNote()}</div>}
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>What to Compare (beyond premium):</strong>
              <ul style={{ paddingLeft: '1.2rem' }}>
                {getPriorityComparisons().map((item, i) => <li key={i} style={{ marginBottom: '0.35rem', fontSize: '0.9rem', color: '#333′ }}>{item}</li>)}
              </ul>
              <strong style={{ display: 'block', margin: '0.75rem 0 0.5rem' }}>Broker Shopping Checklist:</strong>
              <ul style={{ paddingLeft: '1.2rem' }}>
                {brokerTips.map((tip, i) => <li key={i} style={{ marginBottom: '0.35rem', fontSize: '0.9rem', color: '#333′ }}>{tip}</li>)}
              </ul>
              <strong style={{ display: 'block', margin: '0.75rem 0 0.5rem' }}>Questions to Ask Your Broker:</strong>
              <ul style={{ paddingLeft: '1.2rem' }}>
                {questionsForBroker.map((q, i) => <li key={i} style={{ marginBottom: '0.35rem', fontSize: '0.9rem', color: '#333′ }}>{q}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div style={{ background: '#0A1628', color: '#fff', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem', opacity: 0.8 }}>Need help with a repair before you insure?</div>
          <strong style={{ color: '#F5E642′ }}>ProLnk connects you with vetted DFW contractors for roofing, HVAC, plumbing, and more.</strong>
        </div>
      </div>
    </div>
  );
}
