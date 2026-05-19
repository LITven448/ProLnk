import { useState } from 'react';

const situations = [
  { value: 'aging', label: '🏚️ My system is 10+ years old' },
  { value: 'highbill', label: '💸 I want to lower my energy bills' },
  { value: 'newbuyer', label: '🏡 I just bought or am buying a DFW home' },
  { value: 'selling', label: '📋 I\’m planning to sell in 1–3 years' },
  { value: 'comfortable', label: '✅ My system works but I want to stay ahead' },
  { value: 'worried', label: '😰 I\’m worried about summer 2026′ },
];

const finalWords: Record<string, { headline: string; body: string; cta: string }> = {
  aging: {
    headline: '2026 is a decision year for aging DFW systems.',
    body: 'A 10+ year DFW HVAC system has survived north Texas summers. That\’s no small thing. But 2026 brings higher electricity prices, a likely hot summer, and rising R-22 refrigerant costs. The math on repair vs. replace shifts this year. ProLnk can connect you with a DFW specialist for an honest assessment — no up-sell pressure, just the real numbers.',
    cta: 'Get a replacement assessment from a vetted DFW pro',
  },
  highbill: {
    headline: 'Your 2026 DFW electric bill is negotiable.',
    body: 'DFW homeowners average $200–$320/month in peak summer. The gap between best and worst performers is almost entirely execution: pre-cool strategies, filter choices, attic insulation, and system tune-up timing. ProLnk\’s Home Health Vault tracks your usage over time so you can see what interventions actually work. This is data-driven efficiency — not guesswork.',
    cta: 'Start tracking and find your biggest efficiency win',
  },
  newbuyer: {
    headline: 'Your DFW HVAC baseline starts today.',
    body: 'New DFW homeowners who document their HVAC from day one have lower repair costs, better resale outcomes, and fewer summer emergencies. The system you inherited has a history — find it. The Home Health Vault is where that history lives going forward. One inspection, one vault entry, and you own your HVAC knowledge for as long as you own the home.',
    cta: 'Add your DFW home to the Home Health Vault waitlist',
  },
  selling: {
    headline: 'HVAC documentation is a DFW selling advantage.',
    body: 'DFW buyers increasingly ask for HVAC records at inspection. Sellers who can produce service history, warranty documents, and maintenance logs close faster and with fewer concessions. ProLnk\’s Home Health Vault makes this turnkey — one link to share with your agent, one document that transfers at closing. Start building your record now, while you have time.',
    cta: 'Build your HVAC legacy document before you list',
  },
  comfortable: {
    headline: 'Ahead of it is the only way to win in DFW.',
    body: 'A working DFW HVAC system in May doesn\’t guarantee July. The difference between homeowners who sail through DFW summers and those who panic-call contractors at 5pm on a 105°F Friday is one thing: scheduled maintenance in March, documented in a system that sends reminders. That\’s what ProLnk\’s Home Health Vault is built for.',
    cta: 'Schedule your spring tune-up and start your vault record',
  },
  worried: {
    headline: '2026 DFW summer readiness starts with knowledge.',
    body: 'Worry is a signal, not a verdict. The homeowners who know their system — refrigerant type, last service date, filter size, age — make faster decisions when something goes wrong. The ones who don\’t spend 3 hours on hold with contractors in July. ProLnk exists to flip that equation: vetted DFW pros, your home\’s full HVAC history, and a network that responds.',
    cta: 'Get ready for summer 2026 — join ProLnk today',
  },
};

export default function DFWHVACDFWFinalWord2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState<{ headline: string; body: string; cta: string } | null>(null);

  function reveal() {
    if (!situation) return;
    setResult(finalWords[situation] || null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8, letterSpacing: 1 }}>PROLNK · DFW HVAC GUIDE · 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>The DFW HVAC Final Word 🏁</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          You've read the guides. You know DFW HVAC is different. You know what benchmarks matter, what trouble looks like, and how to build a legacy worth something. Here’s what ties it all together — the definitive 2026 word for DFW homeowners, based on where you stand.
        </p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📍 What Describes Your Situation?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {situations.map(opt => (
              <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <input type="radio" name="situation" value={opt.value} onChange={() => setSituation(opt.value)}
                  style={{ accentColor: '#F5E642', width: 18, height: 18 }} />
                <span style={{ color: '#cbd5e1', fontSize: 15 }}>{opt.label}</span>
              </label>
            ))}
          </div>
          <button onClick={reveal}
            style={{ marginTop: 20, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get My 2026 Final Word →
          </button>
        </div>

        {result && (
          <div style={{ background: '#111f3a', borderRadius: 12, padding: 28, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 16, lineHeight: 1.3 }}>{result.headline}</h2>
            <p style={{ color: '#cbd5e1', fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>{result.body}</p>
            <div style={{ background: '#F5E642', borderRadius: 8, padding: '14px 20px', color: '#0A1628', fontWeight: 700, fontSize: 15, display: 'inline-block', cursor: 'pointer' }}>
              → {result.cta}
            </div>
          </div>
        )}

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 800, marginBottom: 16 }}>What ProLnk Is Building for DFW</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { icon: '🔍', title: 'Vetted DFW Contractors', desc: 'Every pro is background-checked and DFW-experienced — no national chains, no call centers' },
              { icon: '🏦', title: 'Home Health Vault', desc: 'Permanent HVAC records tied to your address, transferable at closing, accessible anywhere' },
              { icon: '🤝', title: 'Competitive Quotes', desc: 'Multiple DFW pros bid on your work — you see prices before anyone enters your home' },
              { icon: '📅', title: 'Maintenance Scheduling', desc: 'Spring tune-up reminders, filter change alerts, warranty expiration notices — proactive, not reactive' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <div>
                  <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: 15 }}>{item.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, borderTop: '1px solid #1e3a5f', paddingTop: 24, textAlign: 'center' }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Join the ProLnk Waitlist</div>
            <div style={{ color: '#94a3b8', fontSize: 15, marginBottom: 16 }}>Spots are limited. DFW homeowners on the waitlist get first access when we launch and lock in founding member pricing.</div>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>prolnk.io · Join Free Today</div>
          </div>
        </div>
      </div>
    </div>
  );
}
