import { useState } from 'react';

const situations = [
  {
    id: 'buying-no-agent',
    label: 'Buying without a real estate agent',
    sources: [
      { name: 'DCAD / TAD Assessed Value', url: 'https://www.dallascad.org', note: 'Free — use as floor estimate, typically 10-20% below market' },
      { name: 'County Appraisal District Sales History', url: 'https://www.dallascad.org', note: 'Limited data — sale prices not publicly disclosed in TX' },
      { name: 'Zillow / Redfin Estimates', note: 'Use with caution — TX non-disclosure skews Zestimate accuracy' },
      { name: 'Contact a licensed agent for CMA', note: 'Agents with MLS access can pull actual sold comps for you' },
    ],
  },
  {
    id: 'buyer-with-agent',
    label: 'Working with a buyer\’s agent',
    sources: [
      { name: 'MLS Comparable Sales (CMA)', note: 'Most accurate — agent pulls actual closed sale prices' },
      { name: 'Days on Market & Price Reductions', note: 'MLS data reveals negotiation leverage' },
      { name: 'DCAD / TAD for Tax History', url: 'https://www.tarrantcad.org', note: 'Cross-reference appraised vs. ask price' },
    ],
  },
  {
    id: 'refinancing',
    label: 'Refinancing or estimating equity',
    sources: [
      { name: 'Licensed Appraisal (required by lender)', note: 'Only legally binding method for loan purposes' },
      { name: 'DCAD Notice of Appraised Value', note: 'Arrives each April — useful benchmark' },
      { name: 'Recent neighborhood sold comps via agent', note: 'Request a no-cost CMA from any agent' },
    ],
  },
];

export default function DFWNonDisclosureStateGuide() {
  const [selected, setSelected] = useState('');
  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'system-ui, sans-serif', color: '#1a1a2e' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ background: '#fff', borderRadius: 12, padding: 32, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏠 📋</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>Texas Non-Disclosure State Guide</h1>
          <p style={{ color: '#555', margin: 0, fontSize: 15, lineHeight: 1.6 }}>
            Texas is a <strong>non-disclosure state</strong> — sale prices are NOT publicly recorded or required to be disclosed after closing. This makes finding accurate comps harder than in disclosure states like California or Colorado.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '🔒', title: 'What "Non-Disclosure" Actually Means', body: 'In Texas, neither buyer nor seller is legally required to report the sale price to any public database. County appraisal districts cannot compel disclosure. The result: Zillow, Redfin, and public records often show $0 or estimated values for TX homes.' },
            { icon: '📊', title: 'DCAD / TAD Assessed Values as a Proxy', body: 'Dallas Central Appraisal District (DCAD) and Tarrant Appraisal District (TAD) publish assessed values each spring. These are typically 10–20% below market but are the best free, public data point available. Use them as a floor, not a ceiling.' },
            { icon: '🏦', title: 'Where Real Prices Live', body: 'Actual sold prices exist in two places: (1) the MLS, accessible only to licensed agents and members, and (2) lender appraisal reports, which are private. This is why working with an agent who can pull a Comparative Market Analysis (CMA) is critical in DFW.' },
            { icon: '⚠️', title: 'Zillow Accuracy Warning', body: 'Zestimates in Texas are less reliable than in disclosure states. Zillow\’s algorithm is trained on public sale data — which barely exists in TX. Margins of error can be 15–25% in some DFW submarkets. Treat Zestimates as rough order-of-magnitude only.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{card.icon}</div>
              <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700 }}>{card.title}</h3>
              <p style={{ margin: 0, color: '#555', fontSize: 14, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700 }}>🔍 Find the Best Data Sources for Your Situation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ padding: '12px 16px', borderRadius: 8, border: `2px solid ${selected === s.id ? '#2563eb' : '#e0e0e0'}`, background: selected === s.id ? '#eff6ff' : '#fafafa', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700 }}>Recommended Data Sources</h3>
              {match.sources.map((src, i) => (
                <div key={i} style={{ background: '#f0f7ff', borderRadius: 8, padding: 14, marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{src.name}</div>
                  <div style={{ color: '#555', fontSize: 13 }}>{src.note}</div>
                  {'url' in src && <a href={(src as any).url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontSize: 12, display: 'block', marginTop: 4 }}>{(src as any).url}</a>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
