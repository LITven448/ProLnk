import { useState } from 'react';

const concernTypes = [
  {
    key: 'permits',
    label: '🔨 Unpermitted work or additions',
    resources: [
      { name: 'DCAD / TAD Appraisal District', url: 'dcad.org or tad.org', what: 'Search property by address — look for square footage discrepancies between listed size and tax records.' },
      { name: 'City Building Permits Portal', url: 'Varies by city (e.g., permits.cityoffrisco.org)', what: 'Pull all permits on record. Missing permits for decks, room additions, garage conversions = red flag.' },
      { name: 'Your Inspector', url: 'N/A', what: 'Texas inspectors can note suspected unpermitted work. Ask specifically: "Does anything here look like it wasn\’t permitted?"' },
    ],
    redFlags: ['Square footage on listing is 300+ sq ft more than tax records', 'Garage converted to bedroom without HVAC permit', 'Pool or deck added with no permit on record'],
    tip: 'Unpermitted work can void insurance claims and create liability when you sell. Get it permitted retroactively or negotiate price reduction.',
  },
  {
    key: 'foundation',
    label: '🏚️ Foundation or structural issues',
    resources: [
      { name: 'Seller\’s Disclosure Notice', url: 'Texas-required form', what: 'Sellers must disclose known foundation movement, cracks, or past repairs. Review line by line.' },
      { name: 'County Clerk Property Records', url: 'County clerk website', what: 'Search for foundation repair company liens — often filed against property when repair isn\’t paid off.' },
      { name: 'MLS History via Agent', url: 'Via your buyer\’s agent', what: 'Pull all prior listings. Multiple price cuts or "back on market" often signals inspection failures including foundation.' },
    ],
    redFlags: ['Disclosure mentions "pier and beam repair" but no engineer report provided', 'Stair-step cracks in brick exterior', 'Doors that stick or don\’t close flush'],
    tip: 'North Texas expansive clay soil = foundation movement is common. Get an independent structural engineer report ($400–$600) if there\’s any doubt.',
  },
  {
    key: 'title',
    label: '📋 Title issues, liens, or ownership disputes',
    resources: [
      { name: 'County Clerk Records', url: 'Dallas County: dallascountyclerk.com / Tarrant: tarrantcounty.com', what: 'Search by property address or owner name for liens, lis pendens (active lawsuits), and deed transfers.' },
      { name: 'Title Commitment', url: 'From your title company at contract', what: 'Reveals all title defects, liens, easements, and encumbrances. Review Schedule B exceptions carefully.' },
      { name: 'HOA Estoppel Letter', url: 'Via your agent from HOA management', what: 'Confirms any unpaid HOA dues or fines that transfer as liens to new owner.' },
    ],
    redFlags: ['Multiple owner transfers in 12 months (potential flipping chain with unclear title)', 'Tax liens or judgment liens showing in county records', 'HOA shows past-due balance not disclosed by seller'],
    tip: 'Always use a local DFW title company with DFW-specific underwriter relationships. Title issues in Texas can be complex — don\’t skimp here.',
  },
  {
    key: 'price',
    label: '📉 Prior sales price and listing history',
    resources: [
      { name: 'MLS History (via Agent)', url: 'Ask your buyer\’s agent for full MLS history', what: 'Shows every time the property listed, at what price, and how long it sat. Days on market tells a story.' },
      { name: 'Zillow / Redfin Price History', url: 'zillow.com, redfin.com', what: 'Public version of prior listing prices. Less complete than MLS but available to anyone.' },
      { name: 'DCAD / TAD Tax History', url: 'dcad.org or tad.org', what: 'Shows assessed value history and any homestead exemption lapses — which can reveal ownership changes.' },
    ],
    redFlags: ['Price dropped 3+ times in current listing cycle', 'Sold 6 months ago for 20% less than current ask without visible renovation', 'Listed and withdrawn multiple times in past 2 years'],
    tip: 'A property that\’s been relisted 3+ times in 2 years often has a hidden issue. Ask the listing agent directly: "Why did the prior sales fall through?"',
  },
  {
    key: 'environmental',
    label: '☣️ Environmental or hazmat history',
    resources: [
      { name: 'EPA ECHO Database', url: 'echo.epa.gov', what: 'Search nearby facilities with environmental compliance records — useful near industrial areas of DFW.' },
      { name: 'Texas CEQ TCEQ Records', url: 'tceq.texas.gov', what: 'Texas Commission on Environmental Quality — search for cleanup sites, underground storage tanks.' },
      { name: 'Lead Paint Disclosure', url: 'Required for pre-1978 homes', what: 'Sellers must provide EPA lead paint disclosure for older homes. Request any test records.' },
    ],
    redFlags: ['Home built pre-1978 with original paint and no disclosure documentation', 'Property near former gas station, dry cleaner, or industrial site', 'Seller or agent reluctant to provide environmental records'],
    tip: 'DFW has significant industrial history in areas like south Dallas and parts of Tarrant County. Check TCEQ\’s database before buying near any former industrial use.',
  },
];

export default function DFWPropertyHistoryGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = concernTypes.find(c => c.key === selected);

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📁</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>DFW Property History Research Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 16, margin: 0 }}>Know what to look for before you sign. Every DFW property has a paper trail — here\'s how to read it.</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>What are you most concerned about?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {concernTypes.map(c => (
              <button key={c.key} onClick={() => setSelected(c.key)}
                style={{ textAlign: 'left', padding: '14px 20px', borderRadius: 10, border: '2px solid', cursor: 'pointer',
                  borderColor: selected === c.key ? '#F5E642' : '#E2E8F0',
                  backgroundColor: selected === c.key ? '#FEFCE8' : '#F9FAFB',
                  color: '#0A1628', fontWeight: 600, fontSize: 15 }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {match && (
          <div>
            <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 style={{ color: '#0A1628', fontWeight: 700, marginBottom: 16 }}>Where to research in DFW:</h3>
              {match.resources.map((r, i) => (
                <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #F1F5F9' }}>
                  <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>{r.name}</div>
                  <div style={{ fontSize: 13, color: '#64748B', marginBottom: 6 }}>🔗 {r.url}</div>
                  <div style={{ color: '#334155' }}>{r.what}</div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#FEF2F2', borderRadius: 12, padding: 24, marginBottom: 20 }}>
              <h3 style={{ color: '#991B1B', fontWeight: 700, marginBottom: 12 }}>🚩 Red flags to look for:</h3>
              {match.redFlags.map((f, i) => (
                <div key={i} style={{ color: '#7F1D1D', marginBottom: 8 }}>• {f}</div>
              ))}
            </div>
            <div style={{ backgroundColor: '#EFF6FF', borderRadius: 12, padding: 24 }}>
              <p style={{ color: '#1E40AF', margin: 0 }}>💡 <strong>Pro tip:</strong> {match.tip}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
