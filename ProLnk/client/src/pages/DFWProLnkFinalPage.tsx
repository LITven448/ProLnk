import { useState } from 'react';

const situations = [
  {
    label: 'I\’m a DFW homeowner',
    emoji: '🏠',
    nextStep: 'Join the ProLnk homeowner waitlist. Add your home to the Health Vault when it opens. Your most important next step is securing your founding member status before the waitlist closes at 5,000 homes.',
    cta: 'Join as a Homeowner',
  },
  {
    label: 'I\’m a DFW contractor',
    emoji: '🔧',
    nextStep: 'Apply to the ProLnk contractor network. Founding contractors get priority placement, lower match fees, and founding member recognition. The 500-contractor limit is your signal to move now.',
    cta: 'Apply as a Contractor',
  },
  {
    label: 'I want to refer others',
    emoji: '🤝',
    nextStep: 'Join the ProLnk Network Income System. Your most important next step is signing up so you have a referral link when ProLnk opens — every homeowner and contractor you refer locks in permanent income streams.',
    cta: 'Join as a Referrer',
  },
  {
    label: 'I\’m just exploring',
    emoji: '🔍',
    nextStep: 'Join the waitlist with no commitment. You\’ll get first access to ProLnk when matching goes live, and you\’ll be inside the community where all early announcements happen. There\’s no downside to joining now.',
    cta: 'Join the Waitlist',
  },
];

const promise = [
  { emoji: '🔒', text: 'We will only match you with verified, accountable contractors.' },
  { emoji: '💡', text: 'We will give you transparent pricing benchmarks before every decision.' },
  { emoji: '🏆', text: 'We will protect your home\’s history in the Health Vault — permanently.' },
  { emoji: '🤝', text: 'We will earn your trust one match at a time, not assume it.' },
];

export default function DFWProLnkFinalPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🌟</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            The Last Page
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.6 }}>
            The final word from ProLnk's DFW resource library — the closing thought, the promise, and the invitation.
          </p>
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📝 The Closing Thought</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.8, fontSize: 16 }}>
            You've read through everything ProLnk has built for DFW homeowners. Every guide, every framework, every piece of knowledge in this library exists because we believe an informed homeowner is a protected homeowner. The problem we're solving — opaque pricing, unvetted contractors, no accountability — is real. It costs DFW families billions of dollars every year. ProLnk exists to end that. Not eventually. Now.
          </p>
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🤝 The ProLnk Promise</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {promise.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 24, marginTop: 2 }}>{p.emoji}</div>
                <p style={{ color: '#CBD5E1', lineHeight: 1.6, margin: 0, fontSize: 15 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🧭 What's your next step?</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 20 }}>Tell us your situation — we'll give you the single most important thing to do next:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {situations.map((s, i) => (
              <button key={i} onClick={() => setSelected(selected === i ? null : i)}
                style={{ background: selected === i ? '#F5E642' : '#0A1628', color: selected === i ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 10, padding: '14px 12px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
              <p style={{ color: '#CBD5E1', lineHeight: 1.7, marginBottom: 20, fontSize: 15 }}>{situations[selected].nextStep}</p>
              <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                {situations[selected].cta} →
              </button>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 36, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🚀</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0A1628', marginBottom: 12 }}>The Invitation</h2>
          <p style={{ color: '#132040', fontSize: 16, lineHeight: 1.7, marginBottom: 24, maxWidth: 520, margin: '0 auto 24px' }}>
            Join the ProLnk waitlist. Be part of the founding community that transforms home services in DFW — and eventually, everywhere.
          </p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 10, padding: '16px 40px', fontSize: 18, fontWeight: 800, cursor: 'pointer' }}>
            Join ProLnk Now →
          </button>
        </div>

      </div>
    </div>
  );
}
