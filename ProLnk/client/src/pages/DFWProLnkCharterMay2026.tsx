import { useState } from 'react';

const situations = [
  { id: 'considering', label: '🤔 Still Considering', msg: 'Every week you wait = fewer Charter spots. 500 total will ever exist. At current growth, the waitlist closes before June. Charter locks $149/mo permanently — post-Charter pros pay $199+.' },
  { id: 'waitlist', label: '📋 On Waitlist Already', msg: 'You are in the right place. Charter spots are being confirmed in order. DFW launch is underway — your early position means priority territory assignment and first access to verified leads.' },
  { id: 'referred', label: '🤝 Referred by Someone', msg: 'Your referrer earns 12% of your job commissions and 6% of your subscription revenue for life once you activate. Both of you benefit from you activating sooner — lock your spot today.' },
  { id: 'ready', label: '✅ Ready to Activate', msg: 'Charter activation is open now. You lock $149/mo permanently, get first-mover territory advantage in DFW, and join the founding network eligible for all 5 income streams from day one.' },
];

export default function DFWProLnkCharterMay2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = situations.find(s => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK CHARTER · MAY 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>
          ProLnk Charter Tier<br />May 2026 Status
        </h1>
        <p style={{ color: '#8899AA', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Charter tier is the founding level of ProLnk's pro network. Only 500 Charter spots will
          ever exist. The waitlist is approaching that limit in May 2026 — every week that passes
          closes the window for the best rate and the best territory.
        </p>

        <div style={{ background: '#111D2E', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>CHARTER VS. POST-CHARTER</div>
          <div style={{ display: 'grid', gap: 0, borderRadius: 8, overflow: 'hidden' }}>
            {[
              ['Feature', 'Charter (Now)', 'Post-Charter', false],
              ['Monthly Rate', '$149/mo locked', '$199+/mo', true],
              ['Network Commission', '7% of job value', '4% of job value', true],
              ['Subscription Override', '12% recursive', '6% recursive', true],
              ['Territory Priority', 'First choice', 'Remaining', true],
              ['Waitlist Limit', '500 total ever', 'Open enrollment', true],
            ].map(([label, charter, post, isData]) => (
              <div key={String(label)} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                background: isData ? '#0A1628' : '#1E2D42',
                padding: '10px 14px', borderBottom: '1px solid #1E2D42'
              }}>
                <span style={{ color: '#8899AA', fontSize: 13 }}>{label}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{charter}</span>
                <span style={{ color: '#64748B', fontSize: 13 }}>{post}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 12 }}>WHERE ARE YOU IN THE PROCESS?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{
                background: selected === s.id ? '#F5E642' : '#111D2E',
                color: selected === s.id ? '#0A1628' : '#fff',
                border: '1px solid #F5E642', borderRadius: 8, padding: '10px 16px',
                cursor: 'pointer', fontWeight: 600, fontSize: 13,
              }}>{s.label}</button>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: 20, marginBottom: 32, fontWeight: 600, fontSize: 15 }}>
            {active.msg}
          </div>
        )}

        <div style={{ background: '#111D2E', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>DFW LAUNCH STATUS</div>
          <p style={{ color: '#8899AA', fontSize: 14, margin: 0 }}>
            DFW launch preparations are underway. Charter pros get first territory assignments
            and first verified leads when matching goes live. The window to be a founder on
            this platform is measured in weeks, not months.
          </p>
        </div>
      </div>
    </div>
  );
}