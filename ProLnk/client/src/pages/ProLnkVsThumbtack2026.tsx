import { useState } from 'react';

const concerns = [
  {
    id: 'leadquality',
    label: 'Lead Quality',
    thumbtack: 'Charges contractors per lead regardless of fit. Leads often unverified, wrong trade, wrong geography. Contractors report 30-50% wasted spend.',
    prolnk: 'Matches only when homeowner need aligns with contractor trade, license, and service area. No charge for non-matches. Zero wasted spend.',
  },
  {
    id: 'homeowner',
    label: 'Homeowner Experience',
    thumbtack: 'Homeowner posts a job and gets called by 3-5 contractors simultaneously. Comparison shopping feels chaotic and overwhelming.',
    prolnk: 'Homeowner describes need, gets one vetted contractor recommendation. Less friction, faster path to service.',
  },
  {
    id: 'pricing',
    label: 'Contractor Pricing',
    thumbtack: 'Pay-per-lead model. A single roofing lead can cost $80-$150. Contractors absorb cost even for no-shows or tire kickers.',
    prolnk: 'Flat monthly subscription. Commission only on completed matches. Predictable cost structure scales with actual jobs.',
  },
  {
    id: 'competition',
    label: 'Contractor Competition',
    thumbtack: 'Same lead sold to multiple contractors. Race to respond fastest. Contractors undercut each other on price to win.',
    prolnk: 'Single-match model. You win the match or you don’t. No bidding war. Compete on quality and reputation, not speed.',
  },
];

export default function ProLnkVsThumbtack2026() {
  const [active, setActive] = useState(concerns[0]);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>2026 Platform Comparison</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px' }}>ProLnk vs Thumbtack</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
            Thumbtack sells leads. ProLnk creates matches. Here is what that difference means in practice for contractors and homeowners in DFW.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          {[
            { label: 'Thumbtack Lead Cost', value: '$80–150', sub: 'per lead, win or lose', warn: true },
            { label: 'ProLnk Match Cost', value: '$0', sub: 'on no-match months', warn: false },
            { label: 'Thumbtack Lead Exclusivity', value: 'None', sub: 'same lead, 3-5 contractors', warn: true },
            { label: 'ProLnk Match Exclusivity', value: '100%', sub: 'one match per homeowner', warn: false },
          ].map((s) => (
            <div key={s.label} style={{ background: '#111c2e', borderRadius: 12, padding: '20px 24px', border: s.warn ? '1px solid #4a1010' : '1px solid #1e3a1e' }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.warn ? '#f87171' : '#4ade80' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111c2e', borderRadius: 14, padding: 28, marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16 }}>Select a concern to compare</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
            {concerns.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                  background: active.id === c.id ? '#F5E642' : '#1e2d45', color: active.id === c.id ? '#0A1628' : '#94a3b8' }}>
                {c.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#1a0a0a', borderRadius: 10, padding: 20, border: '1px solid #4a1010' }}>
              <div style={{ fontSize: 12, color: '#f87171', marginBottom: 10, fontWeight: 700 }}>🔴 THUMBTACK</div>
              <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.6 }}>{active.thumbtack}</p>
            </div>
            <div style={{ background: '#0a1a0a', borderRadius: 10, padding: 20, border: '1px solid #1e3a1e' }}>
              <div style={{ fontSize: 12, color: '#4ade80', marginBottom: 10, fontWeight: 700 }}>🟢 PROLNK</div>
              <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.6 }}>{active.prolnk}</p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: '28px 20px' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>Ready to leave the lead auction behind?</div>
          <div style={{ fontSize: 14, color: '#1e293b' }}>ProLnk is accepting partner contractors in the DFW area. Join the waitlist today.</div>
        </div>
      </div>
    </div>
  );
}

