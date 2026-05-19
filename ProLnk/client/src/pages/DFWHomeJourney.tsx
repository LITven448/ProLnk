import { useState } from 'react';

const stages = [
  {
    key: 'renter',
    label: '🏠 Renter',
    subtitle: 'Building toward ownership',
    emotion: '😤 Ready for more control',
    color: '#6366f1',
    decisions: ['Save for down payment', 'Build credit', 'Research DFW neighborhoods'],
    milestones: ['Credit score 680+', 'Down payment saved', 'Pre-approval letter'],
    prolnk: 'Join waitlist — lock in Charter Founding Member rate when you buy',
    next: 'buyer',
  },
  {
    key: 'buyer',
    label: '🔑 Active Buyer',
    subtitle: 'Searching for your DFW home',
    emotion: '🤩 Excited + Overwhelmed',
    color: '#0ea5e9',
    decisions: ['Choose DFW submarket', 'Select agent', 'Make offers', 'Choose inspector'],
    milestones: ['Offer accepted', 'Inspection cleared', 'Close date set'],
    prolnk: 'Enroll home in ProLnk Home Health Vault at close — lock in origination rights',
    next: 'new-owner',
  },
  {
    key: 'new-owner',
    label: '🎉 New Owner',
    subtitle: 'First 12 months of ownership',
    emotion: '😬 Excited + Nervous',
    color: '#22c55e',
    decisions: ['Safety improvements first', 'Find reliable contractors', 'Understand home systems', 'Set maintenance schedule'],
    milestones: ['All systems inspected', 'Emergency contacts set', 'First repair handled'],
    prolnk: 'Get matched with TrustyPro-verified DFW contractors for new-home checklist work',
    next: 'owner',
  },
  {
    key: 'owner',
    label: '🏡 Established Owner',
    subtitle: 'Building equity + maintaining value',
    emotion: '😌 Settled + Strategic',
    color: '#F5E642',
    decisions: ['Remodel vs sell', 'Strategic improvements', 'Rental income potential', 'Build referral network'],
    milestones: ['Major system upgrades complete', 'Referral network income active', '20%+ equity built'],
    prolnk: 'Activate all 5 ProLnk income streams — subscription override, network income, origination rights',
    next: 'seller',
  },
  {
    key: 'seller',
    label: '📦 Pre-Sale',
    subtitle: 'Preparing to sell your DFW home',
    emotion: '🧮 Calculating + Emotional',
    color: '#f97316',
    decisions: ['Choose agent', 'Pre-sale repairs', 'Staging strategy', 'Timing the market'],
    milestones: ['Pre-sale inspection done', 'Home staged', 'Listed on MLS'],
    prolnk: 'Transfer origination rights to buyer — lock in permanent income share before you sell',
    next: 'renter',
  },
];

export default function DFWHomeJourney() {
  const [active, setActive] = useState('');
  const current = stages.find(s => s.key === active);
  const nextStage = current ? stages.find(s => s.key === current.next) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK DFW</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Homeowner Journey Map</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Every DFW homeowner goes through these stages. See where you are — and what's next.</p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
          {stages.map((s, i) => (
            <button key={s.key} onClick={() => setActive(s.key)} style={{ flex: 1, minWidth: 120, background: active === s.key ? s.color : '#111d30', color: active === s.key ? '#0A1628' : '#fff', border: `2px solid ${active === s.key ? s.color : '#1e3a5f'}`, borderRadius: 10, padding: '0.75rem 0.5rem', cursor: 'pointer', fontWeight: 700, fontSize: 13, textAlign: 'center', transition: 'all 0.2s' }}>
              {s.label}
            </button>
          ))}
        </div>

        {current && (
          <div>
            <div style={{ background: '#111d30', borderRadius: 14, padding: '1.5rem', marginBottom: 16, borderTop: `4px solid ${current.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>{current.label}</h2>
                  <div style={{ color: '#94a3b8', fontSize: 14, marginTop: 4 }}>{current.subtitle}</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.5rem 1rem', fontSize: 20 }}>{current.emotion}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <div style={{ color: current.color, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>KEY DECISIONS</div>
                  {current.decisions.map((d, i) => <div key={i} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>→ {d}</div>)}
                </div>
                <div>
                  <div style={{ color: current.color, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>MILESTONES</div>
                  {current.milestones.map((m, i) => <div key={i} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>✓ {m}</div>)}
                </div>
              </div>

              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #1e3a5f', background: '#0d1f35', borderRadius: 8, padding: '0.75rem 1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 12, marginBottom: 4 }}>HOW PROLNK HELPS AT THIS STAGE</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{current.prolnk}</div>
              </div>
            </div>

            {nextStage && (
              <div style={{ background: '#0d1f35', borderRadius: 10, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #1e3a5f' }}>
                <div style={{ color: '#64748b', fontSize: 13 }}>Up next:</div>
                <div style={{ color: nextStage.color, fontWeight: 700 }}>{nextStage.label}</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>— {nextStage.subtitle}</div>
              </div>
            )}
          </div>
        )}
        {!active && <div style={{ color: '#334155', textAlign: 'center', marginTop: 40 }}>Select your current stage above to see your journey map</div>}
      </div>
    </div>
  );
}
