import { useState } from 'react';

const EXPERIENCE_TIPS: Record<string, string[]> = {
  firstTime: [
    'Option Period (7-10 days): Texas-only — your unrestricted exit window',
    'Foundation disclosure required — always order a structural engineer report',
    'Property taxes: budget 2.1-2.8% of value per year on top of mortgage',
    'Get a CLUE report — hail/water claims follow the home, not the owner',
    'Survey requirement: most DFW lenders need a current survey before closing',
  ],
  experienced: [
    'DFW foundation standards differ from coastal or Midwest markets',
    'HOA penetration is ~70% in DFW — review deed restrictions pre-offer',
    'Title companies (not attorneys) close in Texas — shop for best rate',
    'Earnest money is released at closing, not upon acceptance',
    'No seller attorney required — buyer agent is your primary advocate',
  ],
  investor: [
    'Property tax abatement programs vary by city — verify with county appraisal district',
    'Homestead exemption cannot be claimed on investment properties',
    'DFW cap rate averages 4.5-6% depending on submarket',
    'Texas is a non-disclosure state — sold prices are not public record',
    'High-clay soil zones demand extra foundation due diligence',
  ],
};

const TOP_10 = [
  { icon: '🏗️', tip: 'Foundation first — DFW clay soil causes 80% of structural issues' },
  { icon: '🌡️', tip: 'HVAC age matters: cooling runs 7+ months; budget $6-12K to replace' },
  { icon: '💧', tip: 'Hard water is universal in DFW — water softener is standard equipment' },
  { icon: '📋', tip: 'Option Period (7-10 days) is uniquely Texan — use every day of it' },
  { icon: '🏛️', tip: 'Title company closes the deal — pick one with DFW hail-claim experience' },
  { icon: '💰', tip: 'Property taxes: 2.1-2.8% annually — often exceeds P&I payment' },
  { icon: '🏘️', tip: 'HOAs govern ~70% of DFW neighborhoods — read every restriction' },
  { icon: '⛈️', tip: 'Hail history: get CLUE report — prior claims raise insurance premiums' },
  { icon: '📐', tip: 'Always get a current survey — lenders require it, disputes happen' },
  { icon: '🔍', tip: 'Hire a licensed inspector (TREC license required in Texas)' },
];

export default function DFWHomeBuyingSummaryGuide() {
  const [experience, setExperience] = useState<string>('');

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a2e', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: 40 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0 0.25rem' }}>DFW Home Buying Guide</h1>
          <p style={{ color: '#a0aec0', margin: 0, fontSize: '0.95rem' }}>The complete condensed guide to buying in Dallas-Fort Worth</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 16, padding: '1.75rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.2rem', color: '#0A1628′ }}>🔟 Top 10 Things to Know</h2>
          {TOP_10.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.6rem 0', borderBottom: i < 9 ? '1px solid #f0f0f0′ : ’none' }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>{item.tip}</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: 16, padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', color: '#0A1628′ }}>🎯 Personalized Priorities</h2>
          <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 1rem' }}>Select your buyer experience level:</p>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {[['firstTime', '🌱 First-Time'], ['experienced', '🏠 Experienced'], ['investor', '💼 Investor']].map(([val, label]) => (
              <button key={val} onClick={() => setExperience(val)}
                style={{ padding: '0.5rem 1.1rem', borderRadius: 8, border: '2px solid', borderColor: experience === val ? '#F5E642′ : '#e2e8f0', background: experience === val ? '#0A1628' : '#fff', color: experience === val ? '#F5E642' : '#333', fontWeight: 600, cursor: ’pointer', fontSize: '0.875rem' }}>
                {label}
              </button>
            ))}
          </div>
          {experience && (
            <div style={{ background: '#f8f9fa', borderRadius: 12, padding: '1.25rem' }}>
              {(EXPERIENCE_TIPS[experience] || []).map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem 0', fontSize: '0.9rem' }}>
                  <span>✅</span><span>{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
