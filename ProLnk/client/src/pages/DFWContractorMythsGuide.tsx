import { useState } from 'react';

const myths = [
  {
    belief: 'The cheapest bid is the best deal',
    verdict: 'MYTH',
    reality: 'In DFW, low-ball bids frequently result in change orders that exceed competitor pricing. Common tactic: win the bid, then add "discovered" costs mid-project. Get 3 itemized bids and compare scope line-by-line, not just total price.',
    icon: '💰',
  },
  {
    belief: 'Word of mouth is enough to verify a contractor',
    verdict: 'MYTH',
    reality: 'Texas requires most contractors to be licensed and insured. A neighbor recommendation doesn\’t verify active licensure, current insurance, or no active complaints with TDLR (Texas Dept of Licensing and Regulation). Always check credentials independently.',
    icon: '👥',
  },
  {
    belief: 'Bigger companies deliver better work',
    verdict: 'MYTH',
    reality: 'In DFW, many large contractor companies subcontract work to smaller crews — the same crews working for smaller local firms. Local DFW contractors often have more skin in the game, higher accountability, and faster response. Size does not equal quality.',
    icon: '🏢',
  },
  {
    belief: 'Paying cash gets you a significant discount',
    verdict: 'SOMETIMES',
    reality: 'Cash can reduce credit card processing fees (2–3%) which some pass on, but beware: cash payments reduce accountability, complicate dispute resolution, and leave no paper trail. Legitimate DFW contractors issue proper invoices regardless of payment method.',
    icon: '💵',
  },
  {
    belief: 'You need to be home for every inspection',
    verdict: 'MYTH',
    reality: 'Modern DFW contractors use photo documentation, video walkthroughs, and project management apps. You do not need to be on-site for every phase inspection — but you should require documented proof of completion before milestone payments.',
    icon: '📸',
  },
];

const verdictColor: Record<string, string> = {
  MYTH: '#EF4444',
  SOMETIMES: '#F59E0B',
  FACT: '#10B981',
};

export default function DFWContractorMythsGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40 }}>🔧</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW Contractor Myths — Debunked</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Know the truth before you hire anyone in the Dallas-Fort Worth area.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {myths.map((m, i) => (
            <div
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? '#0F2040′ : '#111D33',
                border: `1px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`,
                borderRadius: 12,
                padding: '18px 20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24 }}>{m.icon}</span>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{m.belief}</span>
                </div>
                <span style={{
                  background: verdictColor[m.verdict] || '#EF4444',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 20,
                  flexShrink: 0,
                  marginLeft: 12,
                }}>{m.verdict}</span>
              </div>
              {selected === i && (
                <div style={{ marginTop: 14, padding: '14px', background: '#0A1628', borderRadius: 8, color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>
                  {m.reality}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 36, padding: 20, background: '#111D33', borderRadius: 12, border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>Hire with Confidence in DFW</p>
          <p style={{ color: '#94A3B8', fontSize: 13 }}>ProLnk pre-screens every contractor for active licensure, insurance, and verified reviews across the DFW metro.</p>
        </div>
      </div>
    </div>
  );
}
