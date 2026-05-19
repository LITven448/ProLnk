import { useState } from 'react';

const roles = [
  {
    id: 'homeowner',
    label: 'Homeowner',
    emoji: '🏠',
    promise: 'You will never wonder who to call.',
    success: 'Success looks like this: Your HVAC breaks on a July afternoon in DFW. You open ProLnk, describe the problem, and within 4 minutes a licensed, insured, background-checked HVAC partner confirms the appointment. You rate them after. The data makes the next match even better. That is the promise.',
    differentiator: 'Unlike Angi or HomeAdvisor, ProLnk does not sell your contact to 10 contractors. One match. One partner. Confirmed before first contact.',
  },
  {
    id: 'partner',
    label: 'Contractor Partner',
    emoji: '🔧',
    promise: 'You will never buy a bad lead again.',
    success: 'Success looks like this: You pay a flat monthly fee. You set your trade, zip codes, and capacity. ProLnk AI matches you to homeowners who need exactly what you do. You respond, you work, you earn commission. No bidding wars. No lead brokers. No chasing.',
    differentiator: 'Partners on ProLnk earn 5 income streams — not just job fees. Commission, overrides, subscription income, origination rights. One platform, compounding income.',
  },
  {
    id: 'agent',
    label: 'Referring Agent',
    emoji: '💼',
    promise: 'Every home you register becomes permanent income.',
    success: 'Success looks like this: You close a home in Southlake. You register it on ProLnk. That homeowner books 4 services in year one. You earn origination overrides on each one — forever. You close 40 homes a year. Do the math.',
    differentiator: 'No other platform gives referring professionals permanent origination rights tied to specific homes. Once registered, that home earns you income indefinitely.',
  },
  {
    id: 'dfw',
    label: 'The DFW Market',
    emoji: '🌆',
    promise: 'DFW gets the home services marketplace it has always deserved.',
    success: 'Success looks like this: 500 vetted contractors across every trade, every DFW zip. 10,000 homeowners with one-tap access to trusted service. Insurance agents, real estate agents, and property managers all connected to the same trust layer. DFW becomes the proof-of-concept that the whole country watches.',
    differentiator: 'DFW was chosen first because it is the fastest-growing metro in America, with the most new homes, the most contractors, and the highest demand for quality matching. ProLnk was built for this market.',
  },
];

const promises = [
  { emoji: '🎯', text: 'One match, not ten cold calls' },
  { emoji: '🛡️', text: 'Every partner verified before first lead' },
  { emoji: '💰', text: 'Five income streams for partners and referrers' },
  { emoji: '📊', text: 'AI that learns and improves every match' },
  { emoji: '🏙️', text: 'Built for DFW. Scaling to every city.' },
];

export default function DFWProLnkAbsoluteFinalPage() {
  const [active, setActive] = useState<string | null>(null);
  const selected = roles.find(r => r.id === active);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 52 }}>🌟</div>
          <h1 style={{ fontSize: 36, fontWeight: 900, margin: '14px 0 10px', lineHeight: 1.2 }}>This Is What ProLnk Is</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
            The last page. The whole truth. Why DFW. Why now. What we promise. What success looks like for everyone.
          </p>
        </div>

        <div style={{ marginBottom: 36 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>What Makes ProLnk Different</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {promises.map(p => (
              <div key={p.text} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#0d1f36', borderRadius: 8, padding: '14px 18px', border: '1px solid #1e3a5f' }}>
                <span style={{ fontSize: 22 }}>{p.emoji}</span>
                <span style={{ color: '#e2e8f0', fontSize: 15 }}>{p.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Select Your Role — See Your Version of Success</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 16 }}>ProLnk means something different to every person in the DFW ecosystem.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {roles.map(r => (
              <button key={r.id} onClick={() => setActive(active === r.id ? null : r.id)} style={{
                padding: '14px 18px', borderRadius: 10, border: '2px solid',
                borderColor: active === r.id ? '#F5E642' : '#1e3a5f',
                background: active === r.id ? '#0f2a4a' : '#0d1f36',
                color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer',
                textAlign: 'left', transition: 'all 0.2s'
              }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{r.emoji}</div>
                <div style={{ color: active === r.id ? '#F5E642' : '#e2e8f0' }}>{r.label}</div>
              </button>
            ))}
          </div>

          {selected && (
            <div style={{ background: '#0d1f36', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>THE PROMISE TO YOU</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 16 }}>{selected.promise}</div>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: '0 0 16px' }}>{selected.success}</p>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, borderLeft: '3px solid #F5E642' }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>WHY PROLNK IS DIFFERENT</div>
                <p style={{ color: '#94a3b8', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{selected.differentiator}</p>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 36 }}>🚀</div>
          <h2 style={{ color: '#0A1628', fontSize: 22, fontWeight: 900, margin: '12px 0 8px' }}>DFW is where it starts. America is where it goes.</h2>
          <p style={{ color: '#0A1628', fontSize: 14, margin: '0 auto', maxWidth: 480, lineHeight: 1.6 }}>
            ProLnk launches in DFW with 500 vetted partners and 5,000 registered homes. Every match, every rating, every origination right issued makes the platform more valuable. Join the waitlist. Be part of what DFW home services becomes.
          </p>
        </div>
      </div>
    </div>
  );
}
