import { useState } from 'react';

const personas = [
  { id: 'homeowner', label: 'DFW Homeowner', message: 'You started this journey wondering who to trust with your HVAC. You now know: what questions to ask, what fair prices look like, and how to avoid the traps. ProLnk was built for you. Your next step is the waitlist — when we launch, you get first access to our vetted pro network, no middleman fees, no pressure.' },
  { id: 'pro', label: 'HVAC Professional', message: 'You understand DFW better than anyone. ProLnk gives you the infrastructure to grow without the overhead — no chasing bad leads, no wasted bids. Join as a founding pro and lock in the lowest commission rate we will ever offer. The window closes at 500 applications.' },
  { id: 'investor', label: 'Investor / Partner', message: 'DFW has 2.8M households and $4.2B in annual HVAC spend. ProLnk captures a 12–70% commission on every matched job. The data moat — Home Health Vault — makes this a permanent asset, not a marketplace. We are raising a seed round now. Reach out at andrew@lit-ventures.com.' },
  { id: 'curious', label: 'Just Exploring', message: 'Curiosity brought you here. What you found is a company that took DFW HVAC seriously enough to build 3,200 pages of real, verified guidance. That same rigor goes into every pro match. Come back when you have a HVAC need — we will be here, and we will be better than anything else in DFW.' },
];

export default function DFWProLnkHVACJourneyEnd() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = personas.find(p => p.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🏁</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>The ProLnk HVAC Journey</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.6 }}>The end of one journey. The beginning of another.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>What You've Built</h2>
          {[
            { icon: '📚', text: '3,200+ pages of DFW-specific HVAC knowledge — fully verified, seasonally updated' },
            { icon: '🗺️', text: 'A city-by-city map of DFW HVAC conditions, from Allen to Mansfield to Fort Worth' },
            { icon: '🤖', text: '12 AI agents trained on DFW HVAC data — deployed and monitoring in real time' },
            { icon: '🤝', text: 'A community of DFW homeowners who trust ProLnk to protect their biggest asset' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: 15 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>Your Journey End Message</h2>
          <p style={{ color: '#94a3b8', marginBottom: 20 }}>Who are you?</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {personas.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id)} style={{ background: selected === p.id ? '#F5E642' : '#1e3a5f', color: selected === p.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, transition: 'all 0.2s' }}>
                {p.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 15, color: '#e2e8f0', lineHeight: 1.8 }}>{result.message}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: '28px 32px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>The Invitation Is Open</div>
          <div style={{ fontSize: 15, color: '#0A1628', lineHeight: 1.6 }}>ProLnk is accepting its final waitlist slots before launch. Join now and be part of the founding community.</div>
        </div>
      </div>
    </div>
  );
}
