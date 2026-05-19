import { useState } from 'react';

const TRADE_CHECKLISTS: Record<string, string[]> = {
  hvac: [
    'Verify HVAC technician holds a TACCA or RSES certification in Texas',
    'Ask if they pull a permit — DFW cities require permits for full system replacement',
    'Get 3 quotes; DFW replacement range: $5,500-$12,000 for 3-ton unit',
    'Confirm manufacturer warranty + labor warranty (minimum 1 year labor)',
    'Never pay more than 50% upfront; final payment on successful startup',
  ],
  plumbing: [
    'Verify plumber license at tdlr.texas.gov — required for any work in DFW',
    'Ask if permit is pulled for water heater replacement or gas line work',
    'Get itemized quote: parts + labor + permit fees listed separately',
    'DFW slab plumbing leaks: confirm they use leak detection before tunneling',
    'Check reviews for experience with cast iron pipe (common pre-1990 DFW homes)',
  ],
  roofing: [
    'DFW roofer must carry $300K+ general liability + workers comp',
    'Ask specifically about hail experience — DFW is hail capital of the US',
    'Verify they pull city permit (required for full replacement in most DFW cities)',
    'Class 4 impact-resistant shingles: significant insurance discount, ask about them',
    'Avoid storm-chasing contractors — check 2+ year local history on Google/BBB',
  ],
  foundation: [
    'Use only Texas-licensed foundation repair companies (check TDLR)',
    'Get a third-party engineer report before accepting any repair proposal',
    'Typical DFW slab repair: $3,000-$15,000 depending on pier count',
    'Lifetime transferable warranty is standard — insist on it or walk away',
    'Confirm warranty covers both interior and exterior piers',
  ],
  electrical: [
    'All electrical work in Texas requires a licensed electrician (TDLR)',
    'Permit required for panel upgrades, new circuits, and service upgrades',
    'Get ESA certification on completion for insurance documentation',
    'DFW insurance increasingly requires updated panels for coverage',
    'Never let unlicensed handyman touch electrical — buyer will discover on inspection',
  ],
};

const TOP_10 = [
  { icon: '🔎', tip: 'Always verify license at tdlr.texas.gov before any work begins' },
  { icon: '📞', tip: 'Get 3 competitive quotes — DFW has deep contractor market' },
  { icon: '📄', tip: 'Written contract required: scope, price, timeline, warranty' },
  { icon: '💵', tip: 'Never pay 100% upfront — 10-50% max; balance on completion' },
  { icon: '🏛️', tip: 'Contractor must pull permits — not homeowner in DFW cities' },
  { icon: '🛡️', tip: 'Verify liability insurance + workers comp before work starts' },
  { icon: '⭐', tip: 'Check Google + BBB reviews: look for 2+ years local history' },
  { icon: '📷', tip: 'Photo document everything before, during, and after work' },
  { icon: '🔐', tip: 'Lien waiver on final payment protects your home title' },
  { icon: '📋', tip: 'Get all warranties in writing with transfer rights to next owner' },
];

export default function DFWContractorHiringSummaryGuide() {
  const [trade, setTrade] = useState<string>('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: 40 }}>🔨</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0 0.25rem' }}>DFW Contractor Hiring Guide</h1>
          <p style={{ color: '#a0aec0', margin: 0 }}>10 things every DFW homeowner must know before hiring</p>
        </div>
        <div style={{ background: '#112240', borderRadius: 16, padding: '1.75rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 1rem', fontSize: '1.15rem' }}>🔟 Universal Hiring Rules</h2>
          {TOP_10.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.6rem 0', borderBottom: i < TOP_10.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: '0.875rem', lineHeight: 1.5, color: '#cbd5e0′ }}>{item.tip}</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#112240', borderRadius: 16, padding: '1.75rem' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 0.5rem', fontSize: '1.15rem' }}>🎯 Trade-Specific Checklist</h2>
          <p style={{ color: '#a0aec0', fontSize: '0.875rem', margin: '0 0 1rem' }}>Select your trade type:</p>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {[['hvac', '❄️ HVAC'], ['plumbing', '🚿 Plumbing'], ['roofing', '🏠 Roofing'], ['foundation', '🏗️ Foundation'], ['electrical', '⚡ Electrical']].map(([val, label]) => (
              <button key={val} onClick={() => setTrade(val)}
                style={{ padding: '0.45rem 0.9rem', borderRadius: 8, border: '2px solid', borderColor: trade === val ? '#F5E642′ : '#1e3a5f', background: trade === val ? '#F5E642' : ’transparent', color: trade === val ? '#0A1628′ : '#e2e8f0', fontWeight: 700, cursor: ’pointer', fontSize: '0.8rem' }}>
                {label}
              </button>
            ))}
          </div>
          {trade && (
            <div style={{ background: '#0d1f3c', borderRadius: 12, padding: '1.25rem' }}>
              {(TRADE_CHECKLISTS[trade] || []).map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 0', fontSize: '0.875rem', borderBottom: i < TRADE_CHECKLISTS[trade].length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                  <span>✅</span><span style={{ color: '#e2e8f0′ }}>{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
