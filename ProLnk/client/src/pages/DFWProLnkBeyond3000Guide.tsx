import { useState } from 'react';

const phases = [
  {
    phase: 'Phase 4 (Complete)',
    label: 'Pages 1–3,000',
    icon: '✅',
    color: '#10B981',
    desc: 'DFW HVAC, plumbing, roofing, electrical, foundation — the most comprehensive local home services resource library in Texas.',
    examples: ['HVAC cost guides', 'Permit requirement pages', 'Contractor selection guides', 'Emergency service guides'],
  },
  {
    phase: 'Phase 5',
    label: 'National Expansion',
    icon: '🌎',
    color: '#3B82F6',
    desc: 'Houston, Austin, San Antonio, Phoenix, Atlanta, Denver — same depth as DFW but for 20+ major metro areas. Launching Q3 2026.',
    examples: ['Phoenix AC guides (hotter than DFW)', 'Denver heating guides (colder winters)', 'Atlanta humidity guides', 'Houston hurricane prep'],
  },
  {
    phase: 'Phase 6',
    label: 'Predictive Maintenance Tools',
    icon: '🔮',
    color: '#8B5CF6',
    desc: 'AI-powered tools that predict failures before they happen — based on your home’s age, equipment data, and DFW climate patterns.',
    examples: ['AC failure probability calculator', 'Seasonal maintenance scheduler', 'Equipment lifespan tracker', 'Cost-to-repair vs replace modeler'],
  },
  {
    phase: 'Phase 7',
    label: 'Home Health Vault Integration',
    icon: '🏦',
    color: '#F5E642',
    desc: 'Your home’s complete service history, permits, equipment specs, and maintenance records — all in one secure vault. Increases home value at resale.',
    examples: ['Digital permit archive', 'Equipment warranty tracker', 'Contractor history log', 'Home health score'],
  },
  {
    phase: 'Phase 8',
    label: 'Pro Matching Network',
    icon: '🤝',
    color: '#F59E0B',
    desc: 'Stop reading about who to hire — get matched instantly. ProLnk connects you with verified DFW contractors based on your specific job.',
    examples: ['Instant quote matching', 'Verified pro profiles', 'Job-specific matching', 'Review-verified contractors'],
  },
];

const userTypes: Record<string, { upcoming: string[]; timeline: string }> = {
  'DFW Homeowner': {
    upcoming: ['Predictive maintenance tools for your specific home age and HVAC brand', 'Home Health Vault to store your permits and service history', 'Instant pro matching when you need a contractor'],
    timeline: 'Tools launching July–September 2026',
  },
  'DFW HVAC Contractor': {
    upcoming: ['Verified contractor profile in the ProLnk network', 'Inbound lead matching for your service area', 'Customer review system to build your reputation'],
    timeline: 'Pro matching launching August 2026 — get on the waitlist now',
  },
  'Real Estate Agent': {
    upcoming: ['Home Health Vault for listings — show buyers complete service history', 'Property health score for CMAs', 'Permit verification tool for due diligence'],
    timeline: 'Real estate tools launching Q4 2026',
  },
  'Property Manager': {
    upcoming: ['Multi-property maintenance tracking', 'Vendor management and bid comparison', 'Maintenance cost reporting by unit'],
    timeline: 'Portfolio tools launching Q1 2027',
  },
  'Home Inspector': {
    upcoming: ['Integration with Home Health Vault for report sharing', 'Historical permit data for the homes you inspect', 'Contractor referral network for remediation'],
    timeline: 'Inspector tools in development — Q4 2026',
  },
};

export default function DFWProLnkBeyond3000Guide() {
  const [userType, setUserType] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600 }}>🚀 PROLNK PLATFORM</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>ProLnk Beyond 3,000 Pages: What's Next</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24, fontSize: 15 }}>
          ProLnk's DFW resource library just crossed 3,000 pages — the most comprehensive local home services content in Texas. Here's what the next phase looks like.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
          {phases.map(p => (
            <div key={p.phase} style={{ background: '#0F2240', borderRadius: 12, padding: 20, border:  }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24 }}>{p.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: p.color, fontWeight: 700 }}>{p.phase}</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: '#E8EDF5' }}>{p.label}</span>
                  </div>
                  <p style={{ fontSize: 14, color: '#CBD5E1', lineHeight: 1.6, marginBottom: 10 }}>{p.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {p.examples.map(e => (
                      <span key={e} style={{ background: '#0A1628', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: '#94A3B8', border: '1px solid #1E3A5F' }}>{e}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>🎯 What's Coming For Me?</h2>
          <select value={userType} onChange={e => setUserType(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 14, marginBottom: 16 }}>
            <option value=>I am a...</option>
            {Object.keys(userTypes).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
          {userType && userTypes[userType] && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                {userTypes[userType].upcoming.map(item => (
                  <div key={item} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: '#F5E642', marginTop: 2 }}>→</span>
                    <span style={{ fontSize: 14, color: '#CBD5E1' }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 13, color: '#10B981', fontWeight: 700 }}>⏱️ {userTypes[userType].timeline}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
