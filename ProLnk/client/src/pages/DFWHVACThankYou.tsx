import { useState } from 'react';

const types = [
  { id: 'new', label: 'New Homeowner', emoji: '🏠', thanks: 'You started from zero and now understand your HVAC system better than most. That foundation will save you thousands.', next: 'Join the ProLnk waitlist — get matched with a vetted DFW HVAC pro for your first tune-up before summer.' },
  { id: 'experienced', label: 'Experienced Homeowner', emoji: '🔧', thanks: 'You already had instincts. Now you have data. That combination means you will never be upsold on something you do not need.', next: 'Use ProLnk to benchmark your current HVAC pro against the top-rated pros in your DFW zip code.' },
  { id: 'landlord', label: 'Landlord / Investor', emoji: '🏢', thanks: 'Understanding HVAC across multiple properties is a superpower. You know what to inspect, what to budget, and what red flags to watch for.', next: 'ProLnk can match all your properties with one trusted HVAC partner — volume pricing, priority scheduling.' },
  { id: 'firsttime', label: 'First-Time Buyer', emoji: '🔑', thanks: 'You learned this before it could hurt you. Most first-time buyers find out what HVAC costs the hard way. You will not.', next: 'Register your new home in the ProLnk Vault — document your system before anything breaks.' },
];

export default function DFWHVACThankYou() {
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = types.find(t => t.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>🤝</div>
          <h1 style={{ fontSize: '38px', fontWeight: '800', color: '#F5E642', marginBottom: '16px', lineHeight: 1.2 }}>
            Thank You, DFW Homeowner
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto' }}>
            You took time to understand your HVAC system. In DFW where temperatures swing 90 degrees across a year that knowledge is essential. ProLnk exists to turn that knowledge into action.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '16px', padding: '32px', marginBottom: '36px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#F5E642', marginBottom: '12px' }}>What You Have Learned</h2>
          <ul style={{ color: '#94a3b8', lineHeight: 2.1, paddingLeft: '20px', fontSize: '16px' }}>
            <li>How DFW climate creates unique HVAC demands year-round</li>
            <li>The true cost of reactive vs. proactive maintenance</li>
            <li>How to evaluate a contractor before letting them into your home</li>
            <li>What your system age means for your planning horizon</li>
            <li>How ProLnk connects you to vetted pros with no middlemen</li>
          </ul>
        </div>

        <div style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '20px', textAlign: 'center' }}>
            Which homeowner are you?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {types.map(t => (
              <button
                key={t.id}
                onClick={() => setSelected(t.id)}
                style={{
                  backgroundColor: selected === t.id ? '#F5E642′ : '#0f2040',
                  color: selected === t.id ? '#0A1628′ : '#fff',
                  border: `2px solid ${selected === t.id ? '#F5E642' : '#1e3a5f'}`,
                  borderRadius: '12px',
                  padding: '18px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '600',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '6px' }}>{t.emoji}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {chosen && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: '16px', padding: '32px', border: '2px solid #F5E642', marginBottom: '36px' }}>
            <p style={{ fontSize: '17px', color: '#e2e8f0', lineHeight: 1.7, marginBottom: '20px' }}>
              <strong style={{ color: '#F5E642′ }}>Our thanks to you: </strong>{chosen.thanks}
            </p>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '10px', padding: '20px' }}>
              <p style={{ fontSize: '15px', color: '#F5E642', fontWeight: '700', marginBottom: '8px' }}>Your ProLnk Next Step</p>
              <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.6 }}>{chosen.next}</p>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', backgroundColor: '#F5E642', borderRadius: '14px', padding: '28px' }}>
          <p style={{ fontSize: '20px', fontWeight: '800', color: '#0A1628', marginBottom: '8px' }}>Ready to put your knowledge to work?</p>
          <p style={{ fontSize: '15px', color: '#0A1628', marginBottom: '16px' }}>Join 2,400 plus DFW homeowners already on the ProLnk waitlist.</p>
          <div style={{ backgroundColor: '#0A1628', color: '#F5E642', borderRadius: '8px', padding: '14px 28px', display: 'inline-block', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
            Join the ProLnk Waitlist →
          </div>
        </div>
      </div>
    </div>
  );
}
