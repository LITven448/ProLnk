import { useState } from 'react';

const painPoints = [
  {
    id: 'emergency',
    label: '🚨 Emergency breakdown — need someone NOW',
    before: 'Panic-Googling contractors at midnight. First result is a $250 diagnostic fee. Tech arrives 6 hours late. Quote for $4,200. You have no idea if that’s fair.',
    after: 'ProLnk surfaces vetted DFW techs with availability. You see ratings, response time, and price ranges before you call. Matched pros compete — you choose with confidence.',
  },
  {
    id: 'maintenance',
    label: '🔧 Annual tune-up — nothing urgent',
    before: 'Call 5 companies. 2 don’t answer. 1 won’t come for 3 weeks. 1 quotes $299. 1 quotes $89 with a $500 upsell waiting inside your home.',
    after: 'ProLnk matches you to rated DFW HVAC pros who’ve done tune-ups in your zip code. Transparent pricing upfront. No upsell bait-and-switch.',
  },
  {
    id: 'replacement',
    label: '💸 Full system replacement quote',
    before: 'Get 3 quotes. One ghosted you. One gave a lump-sum with no itemization. One was $4K higher but seemed more professional. You’re guessing.',
    after: 'ProLnk requests itemized quotes from multiple vetted pros. You compare labor vs. equipment costs side by side. ProLnk’s HVAC data tells you if the quote is fair for DFW.',
  },
  {
    id: 'vetting',
    label: '🔍 Worried about letting a stranger in my home',
    before: 'Google reviews are gamed. Yelp has fake 5-stars. Angi charges pros to appear. You have no way to verify licenses, insurance, or real job history.',
    after: 'ProLnk verifies licenses, insurance, and background checks before any pro joins. Job history is logged in the Home Health Vault. Accountability is permanent and searchable.',
  },
  {
    id: 'pricing',
    label: '❓ No idea if I’m being overcharged',
    before: 'HVAC pricing is completely opaque. Techs know you can’t walk away in July. Markups of 200-400% on parts are standard. You have no baseline.',
    after: 'ProLnk uses market data from thousands of DFW jobs to flag outlier quotes. You see what comparable jobs cost in your zip code before you commit.',
  },
];

const vaultBenefits = [
  { icon: '📋', text: 'Full job history stored permanently in Home Health Vault' },
  { icon: '🔒', text: 'Vetted pros only — licensed, insured, background-checked' },
  { icon: '⭐', text: 'Real ratings from verified DFW homeowners — no fake reviews' },
  { icon: '💲', text: 'Market pricing data so you know if a quote is fair' },
  { icon: '📞', text: 'Matched to pros who work in your zip code and trade' },
  { icon: '🏠', text: 'Your home’s HVAC history builds equity documentation' },
];

export default function DFWHVACProLnkDifference() {
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = painPoints.find(p => p.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚡</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>How ProLnk Changes DFW HVAC</h1>
          <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.6 }}>
            Before ProLnk, finding a trustworthy HVAC tech in DFW was phone book roulette. Here's what changed.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginBottom: 40 }}>
          {vaultBenefits.map(b => (
            <div key={b.text} style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 10, padding: 16, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 22 }}>{b.icon}</span>
              <span style={{ fontSize: 14, color: '#CBD5E1', lineHeight: 1.5 }}>{b.text}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🔄 Before vs. With ProLnk</h2>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Select your HVAC pain point to see the difference:</p>
          <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
            {painPoints.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id)}
                style={{ background: selected === p.id ? '#F5E642' : '#0A1628', color: selected === p.id ? '#0A1628' : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 10, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>
                {p.label}
              </button>
            ))}
          </div>
          {chosen && (
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ background: '#1A0A0A', border: '1px solid #7F1D1D', borderRadius: 10, padding: 18 }}>
                <div style={{ fontWeight: 700, color: '#FF6B6B', marginBottom: 8 }}>❌ Before ProLnk</div>
                <div style={{ color: '#FCA5A5', lineHeight: 1.7, fontSize: 14 }}>{chosen.before}</div>
              </div>
              <div style={{ background: '#0A1A0A', border: '1px solid #166534', borderRadius: 10, padding: 18 }}>
                <div style={{ fontWeight: 700, color: '#4ADE80', marginBottom: 8 }}>✅ With ProLnk</div>
                <div style={{ color: '#BBF7D0', lineHeight: 1.7, fontSize: 14 }}>{chosen.after}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: '#0A1628', marginBottom: 8 }}>The difference is real. Join the ProLnk waitlist for DFW.</div>
          <div style={{ color: '#1A2A40', fontSize: 14 }}>Vetted pros. Market pricing. Permanent home health records. A better way to own a home in DFW.</div>
        </div>
      </div>
    </div>
  );
}
