import { useState } from 'react';

const scenarios = [
  {
    label: 'Partner no-shows',
    icon: '🚫',
    prolnk: 'Report the no-show in the app within 24 hours. ProLnk will contact the partner, flag their account, and priority-match you with a new partner at no additional wait time.',
    you: 'Document the scheduled appointment time and any communications. This helps ProLnk take action.',
    outside: 'ProLnk cannot guarantee a make-good window if you wait more than 72 hours to report the issue.',
  },
  {
    label: 'Work is poor quality',
    icon: '⚠️',
    prolnk: 'Submit a quality dispute within 7 days of job completion. ProLnk will mediate between you and the partner. Partners with documented quality disputes are reviewed for platform status.',
    you: 'Take photos before and after the work. Keep any written quotes or text communications with the partner.',
    outside: 'ProLnk is not a warranty provider. Actual repair liability rests with the licensed contractor\’s insurance.',
  },
  {
    label: 'Partner asks for cash',
    icon: '💵',
    prolnk: 'This is a red flag. Report it immediately. Partners are not permitted to require cash-only payment as a condition of work through ProLnk matches.',
    you: 'Do not feel obligated to pay cash. Request an invoice. Report the cash demand so ProLnk can investigate.',
    outside: 'If you choose to pay cash outside the platform, ProLnk has limited ability to assist with disputes.',
  },
  {
    label: 'Partner damages property',
    icon: '🏚️',
    prolnk: 'Document the damage immediately and report it via the platform. ProLnk will facilitate contact with the partner\’s insurance carrier and flag the incident on their partner account.',
    you: 'Photograph all damage before any cleanup. Get an independent repair estimate. File a claim with the partner\’s insurer directly.',
    outside: 'ProLnk does not hold repair funds in escrow. Actual insurance claims are between you and the contractor\’s carrier.',
  },
  {
    label: 'Partner shares my info',
    icon: '🔐',
    prolnk: 'Partners agree to ProLnk\’s data use policy at signup. Using homeowner contact info for unsolicited marketing or sharing with third parties violates the partner agreement and results in immediate removal.',
    you: 'Report any unwanted contact using the in-app reporting feature. Include the partner name, date, and nature of contact.',
    outside: 'ProLnk cannot prevent a removed partner from retaining contact info they already received. Consider blocking the number.',
  },
];

export default function ProLnkHomeownerProtection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', color: '#1a1a2e', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0A1628', marginBottom: 12 }}>Homeowner Protection Guide</h1>
          <p style={{ fontSize: 18, color: '#555', maxWidth: 540, margin: '0 auto' }}>
            Understand what ProLnk protects you from, what steps to take when problems happen, and what falls outside platform scope.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 48 }}>
          {[
            { icon: '✅', title: 'Partner Accountability', desc: 'Ratings, disputes, and reports all affect partner standing on the platform.' },
            { icon: '📞', title: 'Report Any Issue', desc: 'Every match includes an in-app reporting channel. Use it — reports directly influence partner status.' },
            { icon: '🔄', title: 'Rematch Protection', desc: 'If a matched partner fails to deliver, ProLnk prioritizes your re-match at no penalty to you.' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#fff', borderRadius: 12, padding: 20, textAlign: 'center', boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: '#0A1628' }}>{item.title}</div>
              <div style={{ color: '#555', fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff3cd', borderRadius: 12, padding: 20, marginBottom: 40 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>⚠️ What ProLnk Cannot Guarantee</div>
          <div style={{ color: '#555', fontSize: 14, lineHeight: 1.7 }}>
            ProLnk is a matching platform, not a general contractor or warranty provider. We do not hold payment in escrow, guarantee workmanship beyond partner accountability tools, or provide insurance on your behalf. Licensed partners carry their own liability insurance.
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#0A1628' }}>🛠 What Happens in Your Scenario?</h2>
          <p style={{ color: '#555', fontSize: 15, marginBottom: 20 }}>Select a situation to see what ProLnk does, what you should do, and what falls outside ProLnk's scope.</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {scenarios.map((s, i) => (
              <button key={s.label} onClick={() => setSelected(i)} style={{ padding: '10px 18px', borderRadius: 8, border: selected === i ? '2px solid #F5E642' : '2px solid #ddd', background: selected === i ? '#0A1628' : '#fff', color: selected === i ? '#F5E642' : '#333', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>

          {selected !== null && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: '#f0fff4', borderRadius: 12, padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#27ae60' }}>✅ What ProLnk Does</div>
                <div style={{ color: '#333', fontSize: 14, lineHeight: 1.6 }}>{scenarios[selected].prolnk}</div>
              </div>
              <div style={{ background: '#e8f4fd', borderRadius: 12, padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#0077cc' }}>👤 What You Should Do</div>
                <div style={{ color: '#333', fontSize: 14, lineHeight: 1.6 }}>{scenarios[selected].you}</div>
              </div>
              <div style={{ background: '#fff3cd', borderRadius: 12, padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#e67e22' }}>⚠️ What Falls Outside ProLnk Scope</div>
                <div style={{ color: '#333', fontSize: 14, lineHeight: 1.6 }}>{scenarios[selected].outside}</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
