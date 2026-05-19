import { useState } from 'react';

const DIMENSIONS = [
  { label: 'Contractor Cost', angi: 'Contractors pay $15–$80 per lead — costs passed to you in quotes', prolnk: 'ProLnk charges no per-lead fees — contractors pay a flat subscription only' },
  { label: 'Contractor Vetting', angi: 'Any contractor who pays Angi’s fee gets listed — minimal screening', prolnk: 'Background check, license verify, and insurance review before first match' },
  { label: 'Homeowner Cost', angi: 'Free to browse, but quote quality varies due to lead-chasing contractors', prolnk: '100% free — no upsells, no premium tiers, no pay-to-match' },
  { label: 'Lead Quality', angi: 'Same lead sold to 5–8 contractors — expect spam calls within minutes', prolnk: 'Your job goes to exactly 3 matched pros — not broadcast to a crowd' },
  { label: 'Quote Speed', angi: 'Varies widely — contractors may ignore leads they deem low-value', prolnk: 'Match engine contacts pros within minutes; most quote within 24 hours' },
  { label: 'Accountability', angi: 'Reviews can be gamed; contractors can pay for better placement', prolnk: 'Performance scores drive match priority — low ratings reduce visibility' },
  { label: 'Dispute Resolution', angi: 'Limited — primarily review-based, no direct mediation guarantee', prolnk: 'Built-in dispute workflow with ProLnk team as active mediator' },
];

const PRIORITIES = [
  { label: 'Lowest price quotes', winner: 'prolnk', reason: 'No per-lead fees means contractors don’t inflate quotes to recover acquisition cost.' },
  { label: 'Widest contractor selection', winner: 'angi', reason: 'Angi has more total listings — though volume doesn’t equal quality.' },
  { label: 'Trustworthy contractors', winner: 'prolnk', reason: 'ProLnk’s vetting process removes unverified contractors before they reach you.' },
  { label: 'Speed to first response', winner: 'prolnk', reason: 'ProLnk’s match engine beats Angi’s browse-and-wait model by hours.' },
  { label: 'No spam calls', winner: 'prolnk', reason: 'ProLnk sends your info to 3 pros max. Angi sells the same lead to up to 8.' },
];

export default function ProLnkVsAngi2026() {
  const [selectedPriority, setSelectedPriority] = useState(0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 38, marginBottom: 12 }}>⚔️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 10 }}>ProLnk vs Angi — 2026 Update</h1>
          <p style={{ fontSize: 16, color: '#6B7280' }}>How the two platforms compare for DFW homeowners finding home service pros</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', backgroundColor: '#0A1628', padding: '14px 20px' }}>
            <div style={{ color: '#CBD5E1', fontSize: 13, fontWeight: 600 }}>DIMENSION</div>
            <div style={{ color: '#FF6B35', fontSize: 13, fontWeight: 700 }}>🔶 Angi</div>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>⚡ ProLnk</div>
          </div>
          {DIMENSIONS.map((d, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '16px 20px', borderBottom: '1px solid #F3F4F6', backgroundColor: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>{d.label}</div>
              <div style={{ fontSize: 13, color: '#6B7280', paddingRight: 12 }}>{d.angi}</div>
              <div style={{ fontSize: 13, color: '#059669', paddingRight: 12 }}>{d.prolnk}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Which Platform Wins For You?</h2>
          <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 20 }}>Select your top priority as a homeowner:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {PRIORITIES.map((p, i) => (
              <button key={i} onClick={() => setSelectedPriority(i)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: selectedPriority === i ? '#F5E642' : '#E5E7EB',
                  backgroundColor: selectedPriority === i ? '#F5E642' : '#fff', color: '#0A1628', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                {p.label}
              </button>
            ))}
          </div>
          <div style={{ backgroundColor: '#F0FDF4', borderRadius: 10, padding: 20, borderLeft: '4px solid #10B981' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#065F46', marginBottom: 6 }}>
              {PRIORITIES[selectedPriority].winner === 'prolnk' ? '✅ ProLnk wins on this' : '🔶 Angi wins on this'}
            </div>
            <p style={{ fontSize: 14, color: '#374151', margin: 0 }}>{PRIORITIES[selectedPriority].reason}</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#0A1628', borderRadius: 16, padding: 36 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Try the ProLnk Difference</h2>
          <p style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 22 }}>Join the waitlist — free for homeowners, vetted contractors only.</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 32px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
            Join Waitlist Free →
          </button>
        </div>
      </div>
    </div>
  );
}
