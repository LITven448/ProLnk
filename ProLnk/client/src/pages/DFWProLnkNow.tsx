import { useState } from 'react';

const situations = [
  { id: 'not-joined', label: 'Haven\'t joined ProLnk yet', action: 'Go to prolnk.io right now. Takes 2 minutes. If you\'re a Pro, you\'re locking the Charter rate ($149/mo forever) before the 500-app cap hits. If you\'re a homeowner, you\'re getting first access when DFW launches.' },
  { id: 'just-joined', label: 'Just joined the waitlist', action: 'Next step: add your home to the Health Vault (homeowners) or complete your Pro profile with your trade and service area. Then share your referral link with one neighbor — that\'s all it takes to start earning network income.' },
  { id: 'want-hvac', label: 'Need HVAC service now', action: 'Join ProLnk as a homeowner and select HVAC as your service need. Our beta matching will connect you with a verified DFW HVAC pro. You avoid the price surge that hits in June when demand peaks.' },
  { id: 'tell-neighbor', label: 'Want to tell a neighbor about ProLnk', action: 'Share prolnk.io with them. Tell them: "Charter tier closes at 500 Pros. If they want the locked rate, they need to get in now." If they sign up through your link, you get 12% of their subscription — every month, forever.' },
  { id: 'pro-unsure', label: 'Pro — not sure if it\'s worth it', action: 'The math: $149/mo to access DFW homeowner leads + network income from pros you refer. If you close one job/month through ProLnk, the fee pays for itself many times over. Join, try the beta, decide with data.' },
  { id: 'all-done', label: 'Already joined and profile is complete', action: 'You\'re ahead of the curve. Now: (1) Refer one pro and one homeowner from your network today. (2) Add your home to Health Vault if you haven\'t. (3) Watch for your beta match notification — DFW launch is close.' },
];

export default function DFWProLnkNow() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
          🚀 ProLnk · Right Now
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
          What to Do With ProLnk Right Now
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
          Charter waitlist is closing at 500 Pro applications. Beta HVAC matching is open in DFW. Here's exactly what to do right now depending on where you are.
        </p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {[
            { icon: '⏳', title: 'Charter Closes at 500 — Not a Soft Deadline', body: 'This is a hard cap. 500 Charter Pro applications, then the $149/mo locked rate is gone. New Pros will pay market rate. The window is open now — it won\'t be for long.' },
            { icon: '🏠', title: 'Beta HVAC Matching Open in DFW', body: 'ProLnk is actively matching DFW homeowners with verified HVAC pros in beta. If you need HVAC service before summer, join now and get matched before June pricing kicks in.' },
            { icon: '👥', title: 'Every Referral Earns You Ongoing Income', body: 'When you refer a Pro who joins Charter, you earn 12% of their $149/mo subscription — every month, forever. Refer 10 Pros = $178.80/mo in passive income. Permanently locked to your account.' },
            { icon: '🔐', title: 'Health Vault — Private, Free, Valuable', body: 'Add your home now. Your structural data, HVAC history, appliance ages. It stays private, improves your match quality, and earns you 1.5% origination rights on the home\'s platform fees long-term.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0f2040', borderRadius: 12, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{card.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 4 }}>{card.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: '32px' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 20 }}>
            Your Situation → ProLnk Action for Right Now
          </div>
          <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
            {situations.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  background: selected === s.id ? '#F5E642' : '#1a3050',
                  color: selected === s.id ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 10, padding: '14px 18px',
                  textAlign: 'left', cursor: 'pointer', fontSize: 14, fontWeight: 500,
                  transition: 'all 0.15s',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: '20px 24px', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>YOUR ACTION RIGHT NOW</div>
              <div style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.7 }}>{result.action}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center', color: '#475569', fontSize: 13 }}>
          ProLnk · DFW's home services marketplace · Charter closes at 500 · prolnk.io
        </div>
      </div>
    </div>
  );
}
