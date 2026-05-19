import { useState } from 'react';

const mistakes = [
  {
    id: 'door-to-door',
    icon: '🚪',
    title: 'Hiring Door-to-Door Salespeople',
    risk: 'High fraud risk, no accountability',
    detail: 'Door-to-door solicitation is the #1 vector for contractor fraud in DFW. These operators have no local reputation at stake, often subcontract to unvetted labor, and disappear after payment.',
    prolnk: 'ProLnk Charter Pros apply to the platform — they come to you through a verified system, not your front door. Every Charter Pro has passed identity, license, and insurance verification before their first lead.',
  },
  {
    id: 'license',
    icon: '📋',
    title: 'Not Verifying the License',
    risk: 'No legal recourse + insurance void',
    detail: 'Texas law requires licenses for HVAC, electrical, plumbing, and several other trades. Unlicensed work voids your homeowner\’s insurance on related claims and creates legal liability for you as the property owner.',
    prolnk: 'ProLnk verifies every trade license against the TDLR database at onboarding and re-checks quarterly. You never need to Google "how do I look up a contractor license" again.',
  },
  {
    id: 'upfront',
    icon: '💸',
    title: 'Paying Full Amount Upfront',
    risk: '$0 recourse if work is abandoned',
    detail: 'Paying 100% upfront removes all leverage. Legitimate contractors don\’t need full payment before starting. Deposit (10–30%) is normal; full payment before completion is not.',
    prolnk: 'ProLnk\’s milestone payment structure (coming in Phase 2) ties payments to job milestones verified by the platform. No disappearing acts after full payment.',
  },
  {
    id: 'contract',
    icon: '📄',
    title: 'No Written Contract',
    risk: 'No recourse on scope disputes',
    detail: 'Verbal agreements for home services in Texas are nearly impossible to enforce. Without a written scope of work, material specs, and timeline, disputes default to "he said / she said."',
    prolnk: 'Every ProLnk job generates a digital scope-of-work summary with agreed pricing, timeline, and materials logged in the platform. Both parties have a shared record.',
  },
  {
    id: 'reviews',
    icon: '⭐',
    title: 'Ignoring Review Patterns',
    risk: 'Repeating other homeowners\’ mistakes',
    detail: 'One bad review might be a difficult customer. Five reviews mentioning "didn\’t show up," "left job unfinished," or "added charges" is a pattern. Most homeowners only check the star rating, not the text.',
    prolnk: 'ProLnk\’s review system tags reviews by issue type (reliability, communication, quality, pricing). You see patterns instantly — not just a 4.1-star average.',
  },
];

export default function DFWProLnkMistake2026() {
  const [active, setActive] = useState(mistakes[0].id);
  const selected = mistakes.find(m => m.id === active)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>DFW HOMEOWNER GUIDE · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Biggest Contractor Mistakes — And How ProLnk Eliminates Them</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 32, fontSize: 15 }}>The most common (and costly) hiring mistakes DFW homeowners make — and exactly how ProLnk's Charter system prevents every one.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {mistakes.map(m => (
            <button key={m.id} onClick={() => setActive(m.id)} style={{ background: active === m.id ? '#F5E642′ : '#132238', color: active === m.id ? '#0A1628' : '#E8EDF5', border: ’none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              {m.icon} {m.title.split(' ').slice(0, 2).join(' ')}
            </button>
          ))}
        </div>
        <div style={{ background: '#132238', borderRadius: 12, padding: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>{selected.icon}</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{selected.title}</h2>
          <div style={{ background: '#1E3A5F', borderRadius: 6, padding: '8px 14px', display: 'inline-block', marginBottom: 16, color: '#F5E642', fontWeight: 700, fontSize: 13 }}>⚠️ Risk: {selected.risk}</div>
          <p style={{ color: '#C2D3E8', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{selected.detail}</p>
          <div style={{ background: '#0D1F36', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>🛡️ HOW PROLNK PREVENTS THIS</div>
            <p style={{ color: '#C2D3E8', fontSize: 14, margin: 0 }}>{selected.prolnk}</p>
          </div>
        </div>
        <div style={{ marginTop: 28, background: '#132238', borderRadius: 10, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 32 }}>🏆</div>
          <div>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>ProLnk Charter — DFW's Verified Pro Network</div>
            <div style={{ color: '#8FA3BF', fontSize: 14 }}>License-verified, insured, reviewed. Every mistake above — eliminated by design.</div>
          </div>
        </div>
      </div>
    </div>
  );
}