import { useState } from 'react';

const suburbResources: Record<string, { department: string; phone: string; program: string; tip: string }> = {
  Dallas: { department: 'Dallas PD Crime Prevention', phone: '214-671-4268', program: 'Dallas Volunteers in Patrol', tip: 'dallas-pd.com/crime-prevention' },
  'Fort Worth': { department: 'Fort Worth PD Community Affairs', phone: '817-392-4222', program: 'Fort Worth Safe City Commission', tip: 'fortworthtexas.gov/police' },
  Plano: { department: 'Plano PD Community Services', phone: '972-941-2153', program: 'Plano Neighborhood Watch', tip: 'planopdwatch.org' },
  Frisco: { department: 'Frisco PD Crime Prevention', phone: '972-292-6010', program: 'Frisco Crime Free Multi-Housing', tip: 'friscotexas.gov/police' },
  McKinney: { department: 'McKinney PD Community Services', phone: '972-547-2700', program: 'McKinney Neighbors Watch', tip: 'mckinneytexas.org/police' },
  Arlington: { department: 'Arlington PD Crime Prevention', phone: '817-459-5600', program: 'Arlington Neighborhood Watch', tip: 'arlingtontx.gov/police' },
  Denton: { department: 'Denton PD Community Services', phone: '940-349-8181', program: 'Denton Neighborhood Watch', tip: 'cityofdenton.com/police' },
};

const sizeGuides: Record<string, { steps: string[]; tech: string[]; patrol: string }> = {
  Small: {
    steps: ['Host a block meeting — 5–10 households', 'Create a group text or Signal thread', 'Register with local PD (free)', 'Post Neighborhood Watch signs (city provides)'],
    tech: ['Ring Neighbors app — share alerts by block', 'Nextdoor — neighborhood-specific alerts', 'GroupMe for block communication'],
    patrol: 'Passive — report suspicious activity, no active patrols',
  },
  Medium: {
    steps: ['Elect a block captain + 2 zone leaders', 'Hold quarterly safety meetings', 'Map vulnerable homes (elderly, single residents)', 'Coordinate with PD for occasional patrols'],
    tech: ['Ring Neighbors + alert zones', 'Nextdoor + Citizen app', 'Shared Google Doc for incident log', 'WhatsApp community group'],
    patrol: 'Semi-active — walking patrols 2–3x/week, PD liaison assigned',
  },
  Large: {
    steps: ['Form a committee with HOA coordination', 'Designate zone captains for each street', 'Annual safety audit with PD', 'Apply for COPS grants for equipment'],
    tech: ['Fusus or Flock Safety camera network', 'Ring Neighbors + paid tier', 'Citizen app pro monitoring', 'Dedicated neighborhood alert email list'],
    patrol: 'Active — scheduled volunteer patrols, body cams, PD partnership',
  },
};

export default function DFWNeighborhoodWatchGuide() {
  const [suburb, setSuburb] = useState('');
  const [size, setSize] = useState('Medium');
  const [showResults, setShowResults] = useState(false);

  const resource = suburbResources[suburb] || null;
  const guide = sizeGuides[size];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>🏘️ DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Neighborhood Watch in DFW</h1>
        <p style={{ color: '#8899AA', fontSize: 16, marginBottom: 32 }}>
          DFW's rapid growth means neighborhoods form faster than community bonds. Neighborhood Watch programs reduce property crime by 16–26% in Texas communities.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '📋', title: 'Register Free', desc: 'Every DFW PD offers free registration — sign online in 10 min' },
            { icon: '📱', title: 'Ring Neighbors', desc: "Share real-time alerts with neighbors in your ring — DFW's most popular tool" },
            { icon: '🚗', title: 'Volunteer Patrol', desc: 'Work with PD to coordinate walking or driving patrols legally' },
            { icon: '🔒', title: 'Crime Prevention', desc: 'Free home security assessments from DFW police departments' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0D1F35', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
              <div style={{ color: '#8899AA', fontSize: 14 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Get Your Custom Setup Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>YOUR DFW SUBURB</label>
              <select value={suburb} onChange={e => setSuburb(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15 }}>
                <option value=''>Select city...</option>
                {Object.keys(suburbResources).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>NEIGHBORHOOD SIZE</label>
              <select value={size} onChange={e => setSize(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15 }}>
                <option>Small</option><option>Medium</option><option>Large</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Generate Setup Guide
          </button>
        </div>

        {showResults && (
          <>
            {resource && (
              <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
                <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🚔 {suburb} Police Resources</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ color: '#AAB8C2′ }}>📞 <strong>Contact:</strong> {resource.phone}</div>
                  <div style={{ color: '#AAB8C2′ }}>🌐 <strong>Site:</strong> {resource.tip}</div>
                  <div style={{ color: '#AAB8C2', gridColumn: '1 / -1′ }}>🤝 <strong>Program:</strong> {resource.program}</div>
                </div>
              </div>
            )}
            <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12 }}>📋 Setup Steps — {size} Neighborhood</h3>
              {guide.steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #1E3A5F' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 24 }}>0{i + 1}</span>
                  <span style={{ color: '#AAB8C2′ }}>{s}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12 }}>📱 Technology Tools</h3>
              {guide.tech.map(t => <div key={t} style={{ color: '#AAB8C2', padding: '6px 0′ }}>✅ {t}</div>)}
            </div>
            <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 8 }}>🚶 Patrol Level</h3>
              <p style={{ color: '#AAB8C2′ }}>{guide.patrol}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
