import { useState } from 'react';

export default function ProLnkCharterClosingScript() {
  const [objection, setObjection] = useState('cost');

  const objections = [
    {
      id: 'cost',
      label: '💰 "$149 is too much"',
      response: 'Let me put it in perspective. One ProLnk match on an average DFW job is $800. At Charter rate you keep $200 of that. Two jobs and the month is paid. After that, everything else is profit — and your rate is locked for life. If you wait and sign up at Founding tier, you pay the same $149 but keep less from every job, forever.',
      proof: 'Charter: $149/mo · 72% keep · 25% on jobs\nFounding (next tier): $149/mo · 69% keep · 22% on jobs\nDifference compounds to $4,200/yr at 100 matches',
    },
    {
      id: 'timing',
      label: '⏰ "I\’ll sign up later"',
      response: 'Charter closes when we hit 500 applications — we are tracking that in real time. The rate tier you sign up at is permanent. There is no "upgrade to Charter" path once the tier closes. Three months from now when you are sending me jobs and I am making more on each one than you, I want you to remember this conversation.',
      proof: 'Charter closes: 500 total applications DFW-wide\nCurrent: filling fast — no extensions planned\n"Later" very likely means permanent Founding rate',
    },
    {
      id: 'trust',
      label: '🤔 "I don\’t know if this works"',
      response: 'That is fair — you have not seen a match yet. Sign up Charter now, get your first match within 30 days or I personally help you troubleshoot. The platform only makes money when you make money. ProLnk income is tied to your match volume — they have every reason to make sure you win.',
      proof: 'ProLnk only earns when matches close\nNo match = no platform fee collected\nAligned incentives: your success = their revenue',
    },
    {
      id: 'busy',
      label: '📋 "I\’m already too busy"',
      response: 'Being busy is exactly why Charter makes sense right now. You recruit two guys who are not as busy as you, they take the overflow ProLnk matches, and you earn a network override on everything they do. You go from too busy to running a small team — without hiring employees. ProLnk is the infrastructure.',
      proof: 'Charter network override: 7% of L1 job value\n2 recruited pros at $800/job x 20 jobs/mo = $2,240/mo passive\nBusy pros are the best network recruiters on the platform',
    },
    {
      id: 'competition',
      label: '🥊 "I use HomeAdvisor/Thumbtack"',
      response: 'Keep using them — ProLnk is not a replacement, it is additional income. But here is the difference: HomeAdvisor charges you $25-80 per lead whether you win the job or not. ProLnk only takes a commission when a job is completed. Plus you earn network overrides on every pro you refer — HomeAdvisor has nothing like that.',
      proof: 'HomeAdvisor: pay per lead (win or lose)\nThumbtack: pay to contact (win or lose)\nProLnk: pay only on completed job · zero wasted spend',
    },
  ];

  const current = objections.find(o => o.id === objection) || objections[0];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>🎯</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>Charter Closing Script</h1>
          <p style={{ color: '#8899AA', fontSize: 14 }}>For Pros Recruiting Other Pros to ProLnk</p>
        </div>

        <div style={{ background: '#1A2E4A', borderRadius: 12, padding: 16, marginBottom: 20,
          border: '2px solid #FF4444', textAlign: 'center' }}>
          <div style={{ color: '#FF4444', fontWeight: 700, fontSize: 14 }}>CHARTER TIER CLOSING SOON</div>
          <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: '4px 0' }}>~127 spots remaining</div>
          <div style={{ color: '#8899AA', fontSize: 12 }}>Closes permanently at 500 total Charter applications · DFW-wide</div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 10 }}>PROSPECT SAYS...</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {objections.map(o => (
              <button key={o.id} onClick={() => setObjection(o.id)}
                style={{ padding: '12px 16px', borderRadius: 10,
                  border: `2px solid ${objection === o.id ? '#F5E642' : 'transparent'}`,
                  background: objection === o.id ? '#1A2E4A' : '#0A1628',
                  color: '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 14 }}>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#1A2E4A', borderRadius: 12, padding: 24, marginBottom: 16, border: '2px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 10 }}>YOUR RESPONSE</div>
          <p style={{ color: '#fff', fontSize: 14, lineHeight: 1.7, margin: '0 0 16px' }}>{current.response}</p>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ color: '#8899AA', fontSize: 11, marginBottom: 6 }}>THE NUMBERS</div>
            {current.proof.split('\n').map((line, i) => (
              <div key={i} style={{ color: line.startsWith('→') || line.includes('zero wasted') ? '#F5E642' : '#ccc',
                fontSize: 12, lineHeight: 1.6 }}>{line}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 16, textAlign: 'center' }}>
          <div style={{ color: '#8899AA', fontSize: 11, marginBottom: 4 }}>YOUR EARNING WHEN THEY JOIN</div>
          <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>$17.88/mo recurring</div>
          <div style={{ color: '#8899AA', fontSize: 11, marginTop: 2 }}>12% of their $149/mo subscription · for as long as they stay</div>
        </div>
      </div>
    </div>
  );
}
