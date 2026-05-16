import { useState } from 'react';

const barriers = [
  { id: 'trust', label: 'I do not trust HVAC contractors', emoji: '🔒', removal: 'Every ProLnk pro is background-checked, license-verified, and rated by real homeowners in your DFW zip code. You see reviews before you agree to anything. No cold calls, no pressure, no surprises.' },
  { id: 'cost', label: 'I am worried about the cost', emoji: '💸', removal: 'ProLnk shows you market-rate pricing for your specific system and zip code before any pro visits. You never negotiate blind. Competitive quotes from multiple vetted pros mean you always get fair pricing.' },
  { id: 'time', label: 'I do not have time to deal with this', emoji: '⏰', removal: 'ProLnk handles the coordination. You describe what you need, we match you with available pros, you approve the appointment. The whole process takes 4 minutes. Then we remind you when it is time for the next service.' },
  { id: 'notbroken', label: 'My system seems fine right now', emoji: '🤷', removal: 'Seeming fine is how every system operates right before it fails — usually in August when it is 104 degrees and every HVAC tech in DFW is booked 10 days out. ProLnk is for before the emergency, not during it.' },
  { id: 'later', label: 'I will deal with it later', emoji: '📅', removal: 'The ProLnk waitlist closes at 500 homeowners. Later may mean missing early access, priority scheduling, and the founding member price lock. The homeowners who join now are the ones who get served first when we launch.' },
];

const ctas = [
  { label: 'Join the ProLnk Waitlist', emoji: '⭐', desc: 'Takes 90 seconds. Priority access, founding member pricing.' },
  { label: 'Schedule Your HVAC Tune-Up', emoji: '🔧', desc: 'Vetted DFW pros, transparent pricing, no pressure.' },
  { label: 'Register Your Warranty', emoji: '📄', desc: 'Document it now before you need it in an emergency.' },
  { label: 'Change Your Filter Today', emoji: '🔄', desc: 'The simplest action with the fastest payback in DFW.' },
  { label: 'Document in the Vault', emoji: '🏠', desc: 'Record your system age, warranty, and service history.' },
];

export default function DFWHVACFinalCallToAction() {
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = barriers.find(b => b.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>🚀</div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#F5E642', marginBottom: '16px', lineHeight: 1.2 }}>
            The Definitive DFW HVAC Action Plan
          </h1>
          <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto' }}>
            You have the knowledge. The only thing left is action. Here is exactly what to do — and how ProLnk removes every barrier between you and a protected, efficient, well-maintained DFW home.
          </p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '16px' }}>Your 5 actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {ctas.map((cta, i) => (
              <div key={i} style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '18px', border: '1px solid #1e3a5f', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '36px', height: '36px', backgroundColor: '#F5E642', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '15px', color: '#0A1628', flexShrink: 0 }}>{i + 1}</div>
                <span style={{ fontSize: '22px', flexShrink: 0 }}>{cta.emoji}</span>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff', marginBottom: '3px' }}>{cta.label}</div>
                  <div style={{ fontSize: '13px', color: '#94a3b8' }}>{cta.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '8px', textAlign: 'center' }}>
            What is holding you back?
          </h2>
          <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '20px', fontSize: '15px' }}>Be honest. ProLnk is designed to remove these barriers — not ignore them.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {barriers.map(b => (
              <button
                key={b.id}
                onClick={() => setSelected(b.id)}
                style={{
                  backgroundColor: selected === b.id ? '#F5E642' : '#0f2040',
                  color: selected === b.id ? '#0A1628' : '#fff',
                  border: `2px solid ${selected === b.id ? '#F5E642' : '#1e3a5f'}`,
                  borderRadius: '12px',
                  padding: '16px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '22px', display: 'block', marginBottom: '6px' }}>{b.emoji}</span>
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {chosen && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: '14px', padding: '28px', border: '2px solid #F5E642', marginBottom: '36px' }}>
            <p style={{ fontSize: '14px', color: '#F5E642', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>How ProLnk removes that barrier</p>
            <p style={{ fontSize: '16px', color: '#e2e8f0', lineHeight: 1.7 }}>{chosen.removal}</p>
          </div>
        )}

        <div style={{ backgroundColor: '#F5E642', borderRadius: '16px', padding: '36px', textAlign: 'center' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>⭐</div>
          <p style={{ fontSize: '24px', fontWeight: '800', color: '#0A1628', marginBottom: '8px' }}>Join the ProLnk Waitlist</p>
          <p style={{ fontSize: '15px', color: '#0A1628', marginBottom: '8px' }}>2,400+ DFW homeowners already in line. Waitlist closes at 500 verified applications.</p>
          <p style={{ fontSize: '13px', color: '#0A1628', marginBottom: '24px', opacity: 0.7 }}>90 seconds to sign up. No payment required. Cancel anytime.</p>
          <div style={{ backgroundColor: '#0A1628', color: '#F5E642', borderRadius: '10px', padding: '16px 36px', display: 'inline-block', fontWeight: '800', fontSize: '18px', cursor: 'pointer' }}>
            Join Now — It Is Free →
          </div>
        </div>
      </div>
    </div>
  );
}
