import { useState } from 'react';

const roles = [
  { id: 'homeowner', label: '🏠 I\’m a DFW Homeowner', message: 'homeowner' },
  { id: 'pro', label: '🔧 I\’m an HVAC Professional', message: 'pro' },
  { id: 'investor', label: '💼 I\’m a Real Estate Investor', message: 'investor' },
  { id: 'builder', label: '🏗️ I\’m a Builder or Developer', message: 'builder' },
  { id: 'curious', label: '🧠 I\’m Just Curious About All This', message: 'curious' },
];

const messages: Record<string, { headline: string; body: string; cta: string; ctaLabel: string }> = {
  homeowner: {
    headline: 'You Are Now the Most Informed DFW Homeowner in Your Neighborhood',
    body: 'You\’ve just completed the most comprehensive DFW HVAC knowledge session ever assembled — 3,200+ pages covering every system, every failure mode, every red flag, every green flag, every efficiency standard, every climate-specific nuance for North Texas. You know what your home needs. You know how to evaluate contractors. You know the difference between SEER and SEER2. You\’re ready.\n\nProLnk was built for this moment. We match DFW homeowners like you with vetted, transparent HVAC professionals who earned this placement by meeting every standard you just learned.',
    cta: '/prolnk-homeowner-signup',
    ctaLabel: 'Join ProLnk — Get My Free Quotes',
  },
  pro: {
    headline: 'You\’re the Kind of Pro DFW Homeowners Are Looking For',
    body: 'Every homeowner who completes this knowledge session is looking for exactly what you offer — if you offer it right. They know the difference between Manual J and guessing. They know R-22 is dead. They know SEER2 ratings matter. They know green flags from red ones.\n\nProLnk connects vetted HVAC professionals with informed, ready-to-hire DFW homeowners. No chasing leads. No competing on price with unlicensed crews. Just qualified matches with homeowners who appreciate expertise.\n\nIf you\’re NATE-certified, licensed, pulling permits, and doing the work right — ProLnk was built for you.',
    cta: '/prolnk-pro-signup',
    ctaLabel: 'Join ProLnk as a Pro — Get Matched',
  },
  investor: {
    headline: 'HVAC Intelligence Is a Real Estate Edge',
    body: 'The DFW market moves fast. HVAC systems are among the most significant mechanical assets in any residential property — and the most misunderstood by investors who don\’t go deep.\n\nYou now know what a failing capacitor costs vs. a failing compressor. You know what R-22 in a system means for your portfolio. You know what SEER2 ratings mean for NOI in a rental. That\’s a competitive edge.\n\nProLnk\’s Home Health Vault is being built specifically for real estate investors — a structured, verified HVAC and mechanical history for every home in the system. You\’ll want early access.',
    cta: '/prolnk-homeowner-signup',
    ctaLabel: 'Join the ProLnk Waitlist',
  },
  builder: {
    headline: 'The DFW New Construction HVAC Standard Has Changed',
    body: 'SEER2. Manual J required by code. R-454B refrigerant phasing in. The bar for new construction HVAC in DFW is higher than it\’s been in decades — and buyers are more informed than ever.\n\nThis session represents what your future buyers now know. They\’ll ask about SEER2 ratings. They\’ll ask if a Manual J was done. They\’ll ask which refrigerant. ProLnk is building the resource network that connects builders with top-tier DFW HVAC crews who meet the 2026 standard.',
    cta: '/prolnk-pro-signup',
    ctaLabel: 'Connect ProLnk with Your HVAC Partners',
  },
  curious: {
    headline: 'You Just Absorbed 3,200+ Pages of DFW HVAC Knowledge',
    body: 'That\’s not a small thing. You now understand DFW\’s climate dynamics, the equipment standards, the failure modes, the contractor quality signals, the refrigerant transition, the efficiency rating changes, the critical components, and the human side of home services.\n\nProLnk is the platform being built on top of all of this — a marketplace that brings homeowner knowledge and professional quality together, powered by AI that keeps getting smarter about what great home service looks like in North Texas.\n\nWhatever brought you here, we\’re glad you made it to the end. This is the beginning of something bigger.',
    cta: '/prolnk-homeowner-signup',
    ctaLabel: 'Join the ProLnk Community',
  },
};

export default function DFWHVACSessionFinalFinal() {
  const [selected, setSelected] = useState<string | null>(null);
  const key = selected ? roles.find(r => r.id === selected)?.message : null;
  const msg = key ? messages[key] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🏆</div>
          <h1 style={{ color: '#F5E642', fontSize: 30, fontWeight: 700, marginBottom: 12 }}>
            The Final Page
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
            You've reached the end of ProLnk's DFW HVAC Knowledge Session — the most comprehensive HVAC resource
            ever assembled for North Texas homeowners, professionals, and anyone who cares about home systems.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, textAlign: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[['3,200+', 'Pages Built'], ['47', 'AI Agents'], ['130+', 'Database Tables']].map(([num, label]) => (
              <div key={label}>
                <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800 }}>{num}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12, textAlign: 'center' }}>Who Are You?</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {roles.map(r => (
            <button key={r.id} onClick={() => setSelected(r.id)}
              style={{ background: selected === r.id ? '#F5E642' : '#112240', color: selected === r.id ? '#0A1628' : '#fff', border: '2px solid ' + (selected === r.id ? '#F5E642' : '#1e3a5f'), borderRadius: 8, padding: '14px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 16 }}>
              {r.label}
            </button>
          ))}
        </div>

        {msg && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642', marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{msg.headline}</h2>
            {msg.body.split('\n\n').map((para, i) => (
              <p key={i} style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.7, marginBottom: 12 }}>{para}</p>
            ))}
            <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 16, marginTop: 8 }}>
              {msg.ctaLabel}
            </button>
          </div>
        )}

        <div style={{ textAlign: 'center', padding: 24, color: '#475569', fontSize: 14 }}>
          <div style={{ marginBottom: 8 }}>Built by ProLnk — The Future of Home Services in DFW</div>
          <div>prolnk.io</div>
        </div>
      </div>
    </div>
  );
}
