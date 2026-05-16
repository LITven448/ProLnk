import { useState } from 'react';

const situations = [
  { id: 'buyout', label: 'One spouse buys out the other' },
  { id: 'sell', label: 'Sell and split proceeds' },
  { id: 'defer', label: 'Defer sale (kids still in school)' },
  { id: 'transfer', label: 'Transfer to one spouse via QDRO' },
];

const guides: Record<string, { steps: string[]; tip: string }> = {
  buyout: {
    steps: [
      '🏦 Refinance mortgage into buying spouse's name only',
      '📋 Get independent home appraisal (both spouses choose appraiser)',
      '💰 Paying spouse compensates other: equity / 2 in cash or assets',
      '⚖️ File Deed of Trust and Warranty Deed with Dallas/Tarrant County',
      '🔧 Use ProLnk to handle any pre-refi repairs quickly',
    ],
    tip: 'TX community property = 50/50 default split unless agreed otherwise.',
  },
  sell: {
    steps: [
      '📅 Agree on list date before filing — delay costs both parties',
      '🔧 Use ProLnk for fast pre-listing repairs to maximize sale price',
      '💵 $500K capital gains exclusion still applies if lived in 2 of last 5 yrs',
      '📑 Proceeds held in escrow, split at closing per divorce decree',
      '🏦 Each spouse reports their share on separate tax return',
    ],
    tip: 'Timing matters: sell before divorce is final to preserve joint exclusion.',
  },
  defer: {
    steps: [
      '📄 Draft co-ownership agreement: who pays mortgage, insurance, taxes',
      '🗓️ Set hard future sale date (e.g., youngest child turns 18)',
      '🔧 ProLnk handles maintenance — avoids disputes over deferred upkeep',
      '💰 Agree now on split % when home eventually sells',
      '⚠️ Both stay on mortgage — affects each spouse's borrowing power',
    ],
    tip: 'Co-ownership post-divorce is risky; use a detailed agreement drafted by your attorney.',
  },
  transfer: {
    steps: [
      '⚖️ QDRO transfers retirement assets, not real estate — use Warranty Deed instead',
      '📋 Deed transfer requires notarization + county filing ($15-25 fee)',
      '🏦 Receiving spouse must qualify to refinance solo within 6-12 months',
      '💰 No capital gains tax at transfer — clock resets at future sale',
      '🔧 New owner uses ProLnk for deferred maintenance upon taking possession',
    ],
    tip: 'TX allows deed-in-lieu of refinance but lender approval is still required.',
  },
};

export default function DFWDivorceHomeGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>⚖️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>DFW Divorce & Home Ownership Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          What happens to your DFW home in a divorce? TX is a community property state — here's what that means for you.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📌 Key DFW Facts</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.9, paddingLeft: 20 }}>
            <li>Texas community property: both spouses own 50% of home acquired during marriage</li>
            <li>$500K capital gains exclusion (MFJ) — timing your sale protects this benefit</li>
            <li>Average DFW divorce home sale timeline: 45-90 days from list to close</li>
            <li>Tarrant + Dallas County deed filings: 5-10 business days processing</li>
          </ul>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏠 Select Your Situation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)} style={{
              background: selected === s.id ? '#F5E642' : '#1e3a5f',
              color: selected === s.id ? '#0A1628' : '#fff',
              border: 'none', borderRadius: 10, padding: '14px 16px',
              cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left'
            }}>{s.label}</button>
          ))}
        </div>

        {selected && guides[selected] && (
          <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📋 Action Steps</h3>
            <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20 }}>
              {guides[selected].steps.map((step, i) => <li key={i}>{step}</li>)}
            </ul>
            <div style={{ marginTop: 20, background: '#162944', borderRadius: 8, padding: 14 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>💡 TX Tip: </span>
              <span style={{ color: '#94a3b8' }}>{guides[selected].tip}</span>
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, marginBottom: 8 }}>Need fast repairs before listing your DFW home?</p>
          <p style={{ color: '#1e3a5f', fontSize: 14 }}>ProLnk connects you with vetted DFW contractors — quotes in 24 hours.</p>
        </div>
      </div>
    </div>
  );
}
