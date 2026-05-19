import { useState } from 'react';

const projectTypes = [
  {
    type: 'HVAC Replacement',
    compare: ['Equipment brand + model + SEER rating', 'Load calculation included?', 'Labor warranty vs equipment warranty (separate)', 'Permit pulled by contractor?', 'Disposal of old unit'],
    redFlags: ['Quote with no model numbers listed', 'No mention of load calc', 'Labor warranty under 1 year'],
    lowestBidWarning: 'Often means inferior equipment brand or no permit — costs more long-term.',
  },
  {
    type: 'Roofing',
    compare: ['Shingle manufacturer + model + class (Class 4 hail)', 'Underlayment spec (synthetic vs felt)', 'Drip edge + valley flashing included?', 'Ventilation plan', 'Permit + inspection'],
    redFlags: ['No shingle model specified', 'Missing ventilation plan', 'Storm chaser asking for immediate deposit'],
    lowestBidWarning: 'Often means inferior materials or no permit — voids insurance and warranties.',
  },
  {
    type: 'Foundation Repair',
    compare: ['Type and number of piers', 'Warranty transferable to next owner?', 'Engineer certification included?', 'Interior access restoration', 'Re-leveling included or extra?'],
    redFlags: ['Drastically fewer piers than competitors', 'No engineer involved', 'Non-transferable warranty'],
    lowestBidWarning: 'Likely means fewer piers — problem recurs within 5 years.',
  },
  {
    type: 'Electrical',
    compare: ['Permit pulled by whom (contractor or homeowner)?', 'Wire gauge specified', 'Breaker brand', 'Inspection included', 'Fixture specs listed'],
    redFlags: ['Homeowner pulls permit', 'No wire gauge listed', 'Unlicensed sub mentioned'],
    lowestBidWarning: 'Often skips permit — creates liability and fails home inspection at resale.',
  },
];

export default function DFWServiceQuoteComparisonGuide() {
  const [project, setProject] = useState('');
  const [quoteCount, setQuoteCount] = useState('');

  const selected = projectTypes.find(p => p.type === project);
  const count = parseInt(quoteCount);

  const recommendation = count >= 3
    ? 'Good. With 3+ quotes you have enough data to spot outliers and compare scope line by line.'
    : count === 2
    ? 'Acceptable, but get a third. Two quotes makes it hard to identify which is the outlier.'
    : count === 1
    ? 'Do not hire yet. One quote gives you no frame of reference.'
    : '';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8ECF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>
          📊 DFW HOMEOWNER GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
          How to Compare Contractor Quotes in DFW
        </h1>
        <p style={{ color: '#9BA8B8', fontSize: 16, marginBottom: 36 }}>
          Apples-to-apples comparison, red flags in low bids, and when price should not be the deciding factor.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>⚖️ Apples-to-Apples: Are You Comparing the Same Scope?</h2>
        <ul style={{ color: '#9BA8B8', fontSize: 15, lineHeight: 1.8, marginBottom: 32, paddingLeft: 20 }}>
          <li>Always get quotes in writing — verbal quotes shift at the job</li>
          <li>Confirm same materials (brand, model, grade) in every quote</li>
          <li>Check whether permit is included or extra</li>
          <li>Ask what happens if something unexpected is discovered mid-job</li>
          <li>Verify labor warranty length — it should be separate from equipment warranty</li>
          <li>Written quotes protect you legally if price changes</li>
        </ul>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🚨 When the Lowest Bid Is a Trap</h2>
        <ul style={{ color: '#9BA8B8', fontSize: 15, lineHeight: 1.8, marginBottom: 32, paddingLeft: 20 }}>
          <li>Generic materials listed (no brand/model) — contractor chooses at their discretion</li>
          <li>No permit included — shifts liability to homeowner, fails inspection at resale</li>
          <li>Fewer units, piers, or coverage than competitors' quotes</li>
          <li>Labor warranty under 1 year — they don't stand behind their work</li>
          <li>Subcontractor heavy — accountability chain gets long</li>
        </ul>

        <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Interactive: Project Type + Quote Count</h2>
        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
            <div style={{ flex: 2, minWidth: 200 }}>
              <label style={{ fontSize: 12, color: '#9BA8B8', display: 'block', marginBottom: 6 }}>PROJECT TYPE</label>
              <select value={project} onChange={e => setProject(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8ECF0', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select type...</option>
                {projectTypes.map(p => <option key={p.type} value={p.type}>{p.type}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 140 }}>
              <label style={{ fontSize: 12, color: '#9BA8B8', display: 'block', marginBottom: 6 }}>QUOTES IN HAND</label>
              <select value={quoteCount} onChange={e => setQuoteCount(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8ECF0', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>How many?</option>
                <option value='1'>1 quote</option>
                <option value='2'>2 quotes</option>
                <option value='3'>3 quotes</option>
                <option value='4'>4+ quotes</option>
              </select>
            </div>
          </div>
          {recommendation && (
            <div style={{ padding: 14, background: '#0A1628', borderRadius: 8, marginBottom: 14, borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontSize: 14, color: '#E8ECF0' }}>{recommendation}</div>
            </div>
          )}
          {selected && (
            <>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>WHAT TO COMPARE LINE BY LINE</div>
                {selected.compare.map(item => (
                  <div key={item} style={{ fontSize: 13, color: '#9BA8B8', marginBottom: 4 }}>✓ {item}</div>
                ))}
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>RED FLAGS TO WATCH</div>
                {selected.redFlags.map(flag => (
                  <div key={flag} style={{ fontSize: 13, color: '#FF6B6B', marginBottom: 4 }}>⚠ {flag}</div>
                ))}
              </div>
              <div style={{ padding: 12, background: '#1a0a0a', borderRadius: 8, fontSize: 13, color: '#FFA07A' }}>
                <strong>Why lowest bid fails here:</strong> {selected.lowestBidWarning}
              </div>
            </>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628' }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>💡 ProLnk Tip</div>
          <div style={{ fontSize: 14 }}>ProLnk sends you pre-screened, licensed DFW contractors with verified reviews. Get 3 quotes in 24 hours — guaranteed apples-to-apples scope.</div>
        </div>
      </div>
    </div>
  );
}
