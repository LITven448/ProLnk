import { useState } from 'react';

const CITIES: string[] = [
  'Dallas', 'Fort Worth', 'Plano', 'Arlington', 'Frisco',
  'McKinney', 'Irving', 'Garland', 'Denton', 'Richardson',
  'Carrollton', 'Allen', 'Lewisville', 'Grand Prairie', 'Mesquite',
];

type IssueType =
  | 'Curb cracked or heaved'
  | 'Curb settled / sunken'
  | 'Gutter clogged or broken'
  | 'Water pooling at curb'
  | 'Curb missing entirely';

const RULES: Record<IssueType, { owner: string; contact: string; timeline: string; tip: string }> = {
  'Curb cracked or heaved': {
    owner: 'City of [city] — Public Works',
    contact: '311 or city public works portal',
    timeline: '30–90 days for assessment; repairs vary by budget cycle',
    tip: 'Document with photos + date. File a 311 request — creates a paper trail and triggers inspection.',
  },
  'Curb settled / sunken': {
    owner: 'City of [city] if in right-of-way; Homeowner if on private approach',
    contact: 'Public Works first; then a licensed concrete contractor',
    timeline: 'City inspection within 2–4 weeks; repair scheduling varies',
    tip: 'Sunken curb near driveway apron may be homeowner responsibility — check your property survey.',
  },
  'Gutter clogged or broken': {
    owner: 'City of [city] — street drainage / storm water',
    contact: '311 or Storm Water Management department',
    timeline: '1–3 weeks for urgent drainage issues; up to 90 days for non-emergency',
    tip: 'If water backs up to your foundation, request emergency priority in your 311 report.',
  },
  'Water pooling at curb': {
    owner: 'Shared: City controls street grade; homeowner controls yard drainage',
    contact: 'Public Works for street-side; drainage contractor for yard-side',
    timeline: 'Depends on cause — get a contractor to diagnose yard drainage first',
    tip: 'DFW clay soil does not absorb water fast. Install a French drain if yard drainage is the culprit.',
  },
  'Curb missing entirely': {
    owner: 'City of [city] — required for street safety',
    contact: '311 with photos; escalate to city council if no response in 30 days',
    timeline: 'Higher priority — typically 30–60 days',
    tip: 'Missing curb is a liability and safety hazard. Cities usually respond faster to safety-classified requests.',
  },
};

export default function DFWCurbAndGutterGuide() {
  const [city, setCity] = useState('');
  const [issue, setIssue] = useState<IssueType | ''>('');
  const result = issue ? RULES[issue] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🛣️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Curb & Gutter Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Who owns it, who fixes it, and who to call in North Texas</p>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>📋 The Basic Rule</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            In virtually every DFW city, the curb and gutter along a public street sit within the city right-of-way.
            The <strong style={{ color: '#e2e8f0′ }}>city is responsible for maintenance and repair</strong> — not the adjacent homeowner.
            The exception: your private <em>driveway apron</em> (the concrete connecting your driveway to the street) is typically your responsibility.
          </p>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔍 Responsibility Finder</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.875rem' }}>Your DFW City</label>
              <select value={city} onChange={e => setCity(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem' }}>
                <option value=''>Select city...</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.875rem' }}>Issue Type</label>
              <select value={issue} onChange={e => setIssue(e.target.value as IssueType)}
                style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem' }}>
                <option value=''>Select issue...</option>
                {(Object.keys(RULES) as IssueType[]).map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
          </div>

          {result && city && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: '#64748b', fontSize: '0.8rem' }}>RESPONSIBLE PARTY</span>
                <div style={{ color: '#F5E642', fontWeight: 600, marginTop: '0.2rem' }}>{result.owner.replace('[city]', city)}</div>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: '#64748b', fontSize: '0.8rem' }}>WHO TO CONTACT</span>
                <div style={{ color: '#e2e8f0', marginTop: '0.2rem' }}>{result.contact}</div>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: '#64748b', fontSize: '0.8rem' }}>TYPICAL TIMELINE</span>
                <div style={{ color: '#e2e8f0', marginTop: '0.2rem' }}>{result.timeline}</div>
              </div>
              <div style={{ borderTop: '1px solid #1e2d47', paddingTop: '0.75rem' }}>
                <span style={{ color: '#F5E642′ }}>💡 </span>
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{result.tip}</span>
              </div>
            </div>
          )}
          {result && !city && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center', color: '#64748b' }}>
              Select your city to see contact details
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🏠 Foundation Drainage Connection</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            If curb or gutter issues are causing water to pool near your foundation, the risk in DFW clay soil is significant.
            Standing water within 6 feet of your foundation causes soil expansion and differential movement.
            Even if the curb is the city&apos;s problem, proactively improving your yard grade is your best protection while waiting for city repairs.
          </p>
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', background: '#1e2d47', borderRadius: 12 }}>
          <p style={{ color: '#94a3b8', marginBottom: '0.75rem' }}>Need a DFW concrete or drainage contractor?</p>
          <a href='/' style={{ background: '#F5E642', color: '#0A1628', padding: '0.75rem 2rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>Find Pros on ProLnk →</a>
        </div>
      </div>
    </div>
  );
}
