import { useState } from 'react';

const CITIES: string[] = [
  'Dallas', 'Fort Worth', 'Plano', 'Arlington', 'Frisco',
  'McKinney', 'Irving', 'Garland', 'Denton', 'Richardson',
  'Carrollton', 'Allen', 'Lewisville', 'Grand Prairie', 'Mesquite',
];

type AlleyIssue =
  | 'Pothole or surface damage'
  | 'Overgrown vegetation / blocked'
  | 'Illegal dumping'
  | 'Drainage / flooding'
  | 'Utility conflict'
  | 'Street light out'
  | 'Privacy fence encroachment';

const GUIDE: Record<AlleyIssue, { responsible: string; homeowner: string; contact: string; timeline: string; tip: string }> = {
  'Pothole or surface damage': {
    responsible: 'City — alleys are public ROW in most DFW cities',
    homeowner: 'Keep your adjoining property clear of debris that worsens damage',
    contact: '311 or Public Works portal',
    timeline: '30–120 days depending on severity and budget cycle',
    tip: 'File a 311 request with GPS coordinates and photos. Alleys are lower priority than streets — follow up at 60 days.',
  },
  'Overgrown vegetation / blocked': {
    responsible: 'Shared: City clears alley ROW; homeowner clears overhanging trees on their property',
    homeowner: 'Trim any trees or shrubs that hang into the alley from your side',
    contact: '311 for city vegetation; no contact needed for your own trimming',
    timeline: 'City responds in 2–4 weeks; homeowner should act immediately if blocking access',
    tip: 'In DFW, overhanging limbs above 14 ft clearance height are typically fine. Below that, homeowners can be cited.',
  },
  'Illegal dumping': {
    responsible: 'City Code Enforcement and Solid Waste',
    homeowner: 'Do not touch dumped materials — it can complicate the city investigation',
    contact: '311 or City Code Enforcement hotline',
    timeline: '3–10 business days for removal response; faster in high-volume cities like Dallas',
    tip: 'Photo-document the dump with timestamp. If it happens repeatedly, request a camera or increased patrols from your city council rep.',
  },
  'Drainage / flooding': {
    responsible: 'City Storm Water department controls alley drainage grade',
    homeowner: 'Ensure your property does not direct additional runoff into the alley',
    contact: 'Storm Water Management via 311',
    timeline: 'Safety-classified flooding: 24–72 h response; routine drainage: 30–60 days',
    tip: 'DFW clay soil makes alley drainage worse after heavy rain. Document with video showing water flow direction.',
  },
  'Utility conflict': {
    responsible: 'Utilities (Oncor, Atmos, local water utility) own infrastructure in alley ROW',
    homeowner: 'Do not excavate near alley utilities without calling 811',
    contact: 'Call 811 before any digging; contact specific utility for infrastructure issues',
    timeline: '811 locates within 2 business days; utility repairs vary',
    tip: 'Alleys in DFW are dense with utilities. Always call 811 — violating this risks fines and liability.',
  },
  'Street light out': {
    responsible: 'Oncor or city depending on ownership agreement',
    homeowner: 'Report only — no homeowner action required',
    contact: 'Oncor outage line or 311',
    timeline: '3–7 business days for non-emergency; faster if safety concern documented',
    tip: 'Alley lights are a security issue. If in a high-crime area, frame your 311 report as a safety concern.',
  },
  'Privacy fence encroachment': {
    responsible: 'Homeowner — your fence must not encroach into the alley ROW',
    homeowner: 'Verify fence placement against your survey before building or replacing',
    contact: 'City Planning / Zoning for setback verification',
    timeline: 'Violations can result in removal notice within 30 days',
    tip: 'In DFW, many older fences were built before strict ROW enforcement. A survey (approx. ) prevents costly mistakes.',
  },
};

export default function DFWAlleyMaintenanceGuide() {
  const [city, setCity] = useState('');
  const [issue, setIssue] = useState<AlleyIssue | ''>('');
  const result = issue ? GUIDE[issue] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏘️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Alley Maintenance Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Who maintains DFW residential alleys — and what you&apos;re responsible for</p>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>📋 The Short Answer</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            DFW residential alleys are public right-of-way maintained by the city.
            As an adjacent homeowner, you are responsible for <strong style={{ color: '#e2e8f0′ }}>keeping your side clear</strong> of debris, not dumping, and ensuring your structures (fences, sheds) do not encroach into the ROW.
            You cannot block alley access and must maintain vegetation on your property that could obstruct alley use.
          </p>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔍 Issue Guide</h2>
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
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.875rem' }}>Alley Issue</label>
              <select value={issue} onChange={e => setIssue(e.target.value as AlleyIssue)}
                style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem' }}>
                <option value=''>Select issue...</option>
                {(Object.keys(GUIDE) as AlleyIssue[]).map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: '#64748b', fontSize: '0.8rem' }}>WHO&apos;S RESPONSIBLE</span>
                <div style={{ color: '#F5E642', fontWeight: 600, marginTop: '0.2rem' }}>{result.responsible}</div>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: '#64748b', fontSize: '0.8rem' }}>YOUR ROLE AS HOMEOWNER</span>
                <div style={{ color: '#e2e8f0', marginTop: '0.2rem' }}>{result.homeowner}</div>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ color: '#64748b', fontSize: '0.8rem' }}>WHO TO CALL{city ?  : ''}</span>
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
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', background: '#1e2d47', borderRadius: 12 }}>
          <p style={{ color: '#94a3b8', marginBottom: '0.75rem' }}>Need a DFW contractor for fence, drainage, or concrete near your alley?</p>
          <a href='/' style={{ background: '#F5E642', color: '#0A1628', padding: '0.75rem 2rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>Find DFW Pros on ProLnk →</a>
        </div>
      </div>
    </div>
  );
}
