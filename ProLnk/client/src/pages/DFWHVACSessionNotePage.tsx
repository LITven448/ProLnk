import { useState } from 'react';

const audiences = [
  { id: 'homeowner', label: '🏠 I own a DFW home', note: "You're the reason this was built. We spent 15 hours creating over 3,100 pages of HVAC knowledge — not to sell ads, not to chase clicks — because DFW homeowners deserve honest, clear answers about the systems that protect their families. Every guide, every checklist, every interactive tool was written with your home in mind. ProLnk is our commitment to keep this free and connect you with the right pro when you need one. Thank you for trusting us." },
  { id: 'pro', label: '🔧 I’m a DFW HVAC professional', note: "We see you. You spend your summers in attics that hit 140°F, answering calls at midnight when someone's AC died, doing the work that keeps DFW livable. This knowledge base was built partly to respect your craft — to help homeowners show up to calls better informed, so your time isn't wasted on the basics. ProLnk exists to connect you with homeowners who are ready to listen and pay fairly. We built this for you too." },
  { id: 'curious', label: '🧐 I stumbled across this', note: "Welcome. You found the end of a 15-hour build session — 3,100+ pages of DFW homeowner knowledge created in a single focused push. It started as a commitment to do something meaningful for one metro: give DFW homeowners the clearest, most actionable HVAC guidance available anywhere, completely free. If you live in DFW, these guides are for you. If you don't, we hope the dedication inspires something in your own work." },
  { id: 'investor', label: '📊 I’m researching ProLnk', note: "What you're seeing is execution. 3,100+ pages of hyper-local content, 15 hours, one session — this is how ProLnk operates. The same intensity that built this knowledge base runs the matching algorithm, the agent infrastructure, and the platform. We believe the future of home services is local trust at scale, and we're building the machine that makes that happen. If that interests you, we'd like to talk." },
];

export default function DFWHVACSessionNotePage() {
  const [selected, setSelected] = useState('');
  const [note, setNote] = useState('');

  const reveal = () => {
    const aud = audiences.find(a => a.id === selected);
    if (aud) setNote(aud.note);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EEF4', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>✍️</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F5E642', margin: '0 0 0.75rem' }}>A Note From ProLnk</h1>
          <p style={{ color: '#94A3B8', maxWidth: 520, margin: '0 auto' }}>This is the last page of a 15-hour build session. Over 3,100 pages of DFW homeowner knowledge — HVAC guides, moisture control, rust prevention, emergency kits, and more — written in a single focused push.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Pages built', value: '3,100+', icon: '📄' },
              { label: 'Session duration', value: '15 hours', icon: '⏱️' },
              { label: 'DFW topics covered', value: '200+', icon: '🗺️' },
              { label: 'Cost to homeowners', value: 'Free — always', icon: '💛' },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#0A1628', borderRadius: 8, padding: '0.85rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>{stat.icon}</div>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: '1.1rem' }}>{stat.value}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.78rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Who Are You?</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1rem' }}>Tell me who you are, and I'll share the note that was written with you in mind.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
            {audiences.map(a => (
              <button key={a.id} onClick={() => setSelected(a.id)}
                style={{ padding: '0.75rem 1rem', borderRadius: 8, border: '2px solid', borderColor: selected === a.id ? '#F5E642' : '#1E3A5F', background: selected === a.id ? '#1a2f50' : 'transparent', color: '#E8EEF4', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}>
                {a.label}
              </button>
            ))}
          </div>
          <button onClick={reveal} disabled={!selected}
            style={{ width: '100%', padding: '0.85rem', borderRadius: 10, background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: selected ? 'pointer' : 'not-allowed', opacity: selected ? 1 : 0.5 }}>
            Read My Note
          </button>
        </div>

        {note && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.75rem', borderLeft: '4px solid #F5E642' }}>
            <p style={{ fontSize: '1rem', lineHeight: 1.85, color: '#E8EEF4', margin: '0 0 1.25rem' }}>{note}</p>
            <div style={{ borderTop: '1px solid #1E3A5F', paddingTop: '1.25rem' }}>
              <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 0.25rem' }}>— The ProLnk Team</p>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0 }}>Built in DFW. For DFW. Committed to keeping it free.</p>
            </div>
            <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: '#0A1628', borderRadius: 8 }}>
              <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.85rem' }}>🔧 Ready to connect with a DFW HVAC pro? ProLnk matches you with verified local techs — free quotes, no pressure, no middleman markup.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
