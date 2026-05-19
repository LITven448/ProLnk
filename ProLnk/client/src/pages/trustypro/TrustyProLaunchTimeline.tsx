import { useState } from 'react';

const phases = [
  {
    phase: 'Phase 1',
    title: 'DFW Waitlist — Now Open',
    timing: 'May 2026',
    status: 'active',
    icon: '📋',
    description: 'TrustyPro is collecting its founding DFW waitlist. Early registrants lock in founding member status and are first in line for beta scan access.',
    forHomeowner: 'Join the waitlist now. Your spot determines your beta queue position. No payment required.',
    forPro: 'Register as a TrustyPro-affiliated professional. Founding pros get premium placement when the marketplace goes live.',
    forInvestor: 'Review deck and data room. DFW waitlist numbers are updated weekly.',
  },
  {
    phase: 'Phase 2',
    title: 'Beta Scan Program',
    timing: 'Summer 2026',
    status: 'upcoming',
    icon: '🔬',
    description: 'The first 500 waitlist homeowners get access to TrustyPro’s beta scanning tool. Real scans. Real AI analysis. Zero cost during beta.',
    forHomeowner: 'You scan your home using the app. AI generates your first Health Report. You give feedback that shapes the product.',
    forPro: 'Beta pros receive scan reports on properties in their service area. First look at the data before the full platform launches.',
    forInvestor: 'Beta data validates scan accuracy, user engagement, and report utility. Key milestone before Series A.',
  },
  {
    phase: 'Phase 3',
    title: 'Full DFW Launch',
    timing: 'Fall 2026',
    status: 'upcoming',
    icon: '🚀',
    description: 'TrustyPro opens to all DFW homeowners. AI scanning, Home Health Vault, and the full ProLnk contractor marketplace go live simultaneously.',
    forHomeowner: 'Full scan access, permanent Health Vault record, and ability to connect with TrustyPro-vetted contractors for any flagged issues.',
    forPro: 'Live lead feed based on TrustyPro scan findings. No cold calling — homeowners come to you with documented needs.',
    forInvestor: 'Revenue begins. Subscription model plus transaction fees on matched jobs.',
  },
  {
    phase: 'Phase 4',
    title: 'Premium Features',
    timing: 'Q1 2027',
    status: 'future',
    icon: '⭐',
    description: 'Advanced features roll out: predictive maintenance alerts, neighborhood health benchmarks, insurance documentation packages, and historical scan comparison.',
    forHomeowner: 'Get alerts before problems become expensive. Compare your home to neighborhood averages. Export scan history for insurance or resale.',
    forPro: 'Predictive maintenance leads — homeowners notified of likely upcoming needs become proactive buyers of your services.',
    forInvestor: 'Premium ARPU expansion. Data licensing to insurance carriers and lenders creates additional revenue stream.',
  },
  {
    phase: 'Phase 5',
    title: 'National Expansion',
    timing: '2027–2028',
    status: 'future',
    icon: '🌎',
    description: 'TrustyPro expands beyond DFW to the top 25 US metros. The Home Health Vault becomes the largest privately-held residential property condition dataset in the country.',
    forHomeowner: 'TrustyPro available wherever you live or buy property. Your Health Vault follows your home ownership history.',
    forPro: 'National network with local precision. Build a multi-market business on TrustyPro leads.',
    forInvestor: 'National scale unlocks data licensing, insurance partnerships, and B2B revenue from title companies and lenders.',
  },
];

const userTypes = ['Homeowner', 'Pro', 'Investor'];

export default function TrustyProLaunchTimeline() {
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [userType, setUserType] = useState(0);
  const phase = phases[selectedPhase];
  const userKey = userTypes[userType].toLowerCase() as 'homeowner' | 'pro' | 'investor';
  const userContent = phase[`for${userTypes[userType]}` as keyof typeof phase] as string;
  const statusColor = phase.status === 'active' ? '#22c55e' : phase.status === 'upcoming' ? '#FACC15′ : '#64748b';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050d1a', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🗓️</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px' }}>TrustyPro DFW Launch Timeline</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            From waitlist to national platform. Here is the roadmap and what each phase means for you.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', justifyContent: 'center' }}>
          {userTypes.map((type, i) => (
            <button key={i} onClick={() => setUserType(i)}
              style={{ padding: '10px 20px', borderRadius: '20px', border: `2px solid ${userType === i ? '#4F46E5' : '#1e2d45'}`, backgroundColor: userType === i ? '#4F46E5′ : '#0d1f35', color: '#fff', cursor: ’pointer', fontSize: '0.9rem', fontWeight: 600 }}>
              {type}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {phases.map((p, i) => (
            <button key={i} onClick={() => setSelectedPhase(i)}
              style={{ flex: 1, minWidth: '120px', padding: '12px 8px', borderRadius: '10px', border: `2px solid ${selectedPhase === i ? '#4F46E5' : '#1e2d45'}`, backgroundColor: selectedPhase === i ? '#4F46E5′ : '#0d1f35', color: '#fff', cursor: ’pointer', fontSize: '0.8rem', fontWeight: 600, textAlign: 'center' }}>
              {p.icon}<br /><span style={{ fontSize: '0.7rem', color: selectedPhase === i ? '#c7d2fe' : '#64748b' }}>{p.phase}</span><br />{p.timing}
            </button>
          ))}
        </div>
        <div style={{ backgroundColor: '#0d1f35', borderRadius: '16px', padding: '32px', border: '1px solid #1e2d45', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <div>
              <span style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{phase.phase}</span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '4px' }}>{phase.icon} {phase.title}</h2>
            </div>
            <span style={{ backgroundColor: statusColor + '22', color: statusColor, padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
              {phase.status === 'active' ? 'Live Now' : phase.status === 'upcoming' ? 'Coming Soon' : 'Future'}
            </span>
          </div>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '24px' }}>{phase.description}</p>
          <div style={{ backgroundColor: '#4F46E522', borderRadius: '12px', padding: '20px', border: '1px solid #4F46E5′ }}>
            <div style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.85rem', marginBottom: '10px' }}>
              WHAT THIS MEANS FOR YOU — {userTypes[userType].toUpperCase()}
            </div>
            <p style={{ color: '#c7d2fe', lineHeight: 1.7, margin: 0 }}>{userContent}</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', backgroundColor: '#0d1f35', borderRadius: '12px', padding: '24px', border: '1px solid #1e2d45′ }}>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '12px' }}>Phase 1 waitlist is open now. Your position determines your beta access timing.</p>
          <span style={{ backgroundColor: '#4F46E5', color: '#fff', padding: '10px 28px', borderRadius: '8px', fontWeight: 700, fontSize: '0.95rem' }}>
            Join the DFW Waitlist
          </span>
        </div>
      </div>
    </div>
  );
}
