import { useState } from 'react';

const projects = [
  {
    label: 'Plumbing leak',
    icon: '🔧',
    prolnk: 'Licensed plumber, verified insurance, rated by past customers, accountable through the platform if anything goes wrong.',
    traditional: 'Call from a search result. Unknown license status. Unknown insurance. No accountability after the job.',
    benefits: 'License verified before arrival. Rating history visible. Dispute resolution built in. No pre-payment required.',
  },
  {
    label: 'Electrical work',
    icon: '⚡',
    prolnk: 'Master or journeyman electrician with verified Texas TDLR license. Code compliance expected. Rated after each job.',
    traditional: 'Handyman may offer electrical work without proper licensing. Insurance gaps are common. No licensing verification.',
    benefits: 'Electrical work has highest safety stakes. ProLnk license check protects you legally and physically.',
  },
  {
    label: 'HVAC service',
    icon: '❄️',
    prolnk: 'EPA 608 certified technician matched by system type. Rated on responsiveness and quality. Accountable for follow-up.',
    traditional: 'Many HVAC companies charge diagnostic fees upfront. Technicians may recommend unnecessary repairs.',
    benefits: 'No diagnostic fee required through ProLnk matches. Partner rating history shows if they over-diagnose.',
  },
  {
    label: 'Roof repair',
    icon: '🏠',
    prolnk: 'Insured roofing contractor with certificate on file. Matched by job scope. Rated on completion quality.',
    traditional: 'Storm-chasing contractors often appear after weather events without local licensing or verifiable insurance.',
    benefits: 'Insurance certificate verified before match. Local partner means warranty support is accessible.',
  },
  {
    label: 'General handyman',
    icon: '🔨',
    prolnk: 'Rated general repair professionals. Background checked. Platform accountability for no-shows or disputes.',
    traditional: 'Craigslist or neighbor referrals offer no background check, no accountability, and no recourse if work fails.',
    benefits: 'Background check gives peace of mind for interior access. Rating history shows reliability.',
  },
];

export default function ProLnkVsTraditionalContractor() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#f0f0f0', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚔️</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>ProLnk vs. Calling Contractors Directly</h1>
          <p style={{ fontSize: 18, color: '#aaa', maxWidth: 540, margin: '0 auto' }}>
            You give up nothing using ProLnk. Homeowners pay the same — but get vetted partners, accountability, and zero cold calls.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
          <div style={{ background: '#0d1f3c', borderRadius: 16, padding: 28, border: '2px solid #F5E642' }}>
            <div style={{ fontSize: 22, marginBottom: 12, fontWeight: 800, color: '#F5E642' }}>✅ Using ProLnk</div>
            {[
              'Partner license verified before match',
              'Insurance certificate confirmed',
              'Background check completed',
              'Rating history visible before hiring',
              'Platform dispute resolution',
              'No upfront fees — free for homeowners',
              'No cold calls or lead resale',
              'Re-match protection if partner fails',
            ].map((item) => (
              <div key={item} style={{ fontSize: 14, color: '#ccc', marginBottom: 8, display: 'flex', gap: 8 }}>
                <span style={{ color: '#F5E642' }}>•</span> {item}
              </div>
            ))}
          </div>
          <div style={{ background: '#0d1f3c', borderRadius: 16, padding: 28, border: '2px solid #444' }}>
            <div style={{ fontSize: 22, marginBottom: 12, fontWeight: 800, color: '#888' }}>⚠️ Calling Directly</div>
            {[
              'License status unknown — you must verify',
              'Insurance must be requested manually',
              'No background check available',
              'Reviews scattered across Yelp/Google',
              'No recourse if contractor disappears',
              'May charge diagnostic or trip fees',
              'Your number may be sold to other contractors',
              'No guarantee of response or follow-through',
            ].map((item) => (
              <div key={item} style={{ fontSize: 14, color: '#888', marginBottom: 8, display: 'flex', gap: 8 }}>
                <span style={{ color: '#555' }}>•</span> {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: 16, padding: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>📋 Your Project Type</h2>
          <p style={{ color: '#888', fontSize: 15, marginBottom: 20 }}>See how ProLnk compares to calling contractors directly — for your specific job.</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {projects.map((p, i) => (
              <button key={p.label} onClick={() => setSelected(i)} style={{ padding: '10px 18px', borderRadius: 8, border: selected === i ? '2px solid #F5E642' : '2px solid #1e3a5f', background: selected === i ? '#F5E642' : '#0A1628', color: selected === i ? '#0A1628' : '#ccc', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                {p.icon} {p.label}
              </button>
            ))}
          </div>

          {selected !== null && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: '#0A1628', borderRadius: 12, padding: 18, border: '1px solid #F5E642' }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#F5E642' }}>✅ ProLnk Experience</div>
                <div style={{ color: '#ccc', fontSize: 14, lineHeight: 1.6 }}>{projects[selected].prolnk}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 12, padding: 18, border: '1px solid #444' }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#888' }}>⚠️ Traditional Experience</div>
                <div style={{ color: '#888', fontSize: 14, lineHeight: 1.6 }}>{projects[selected].traditional}</div>
              </div>
              <div style={{ background: '#112240', borderRadius: 12, padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#64b5f6' }}>💡 Specific Benefits for This Project</div>
                <div style={{ color: '#aaa', fontSize: 14, lineHeight: 1.6 }}>{projects[selected].benefits}</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
