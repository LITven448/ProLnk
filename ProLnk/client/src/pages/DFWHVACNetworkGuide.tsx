import { useState } from 'react';

const networkGaps = [
  {
    situation: 'I have no HVAC contacts at all',
    missing: ['Primary technician for regular service', 'Emergency backup for after-hours failures', 'Specialist for complex issues (zoning, geothermal)'],
    howToFill: [
      'Start with ProLnk to get a verified primary technician matched to your system type and location',
      'Ask your primary tech who they recommend for emergencies when they are unavailable',
      'Schedule one annual tune-up first — this is how you vet a primary relationship',
    ],
    proLnkRole: 'ProLnk is the fastest way to build your starting network in DFW. One search returns multiple verified contractors so you can compare before committing.',
    priorityAction: 'Get a ProLnk match today — start with a diagnostic visit to vet your first relationship.',
  },
  {
    situation: 'I have a primary tech but no emergency backup',
    missing: ['24/7 emergency contractor who can respond within 4 hours', 'Backup who knows your system type', 'Someone who will not price-gouge in a July emergency'],
    howToFill: [
      'Use ProLnk to find a second verified contractor and do a small non-emergency job to establish the relationship',
      'Ask your primary tech if they have an after-hours partner they trust',
      'Save two ProLnk-verified contractor numbers in your phone labeled Primary and Emergency',
    ],
    proLnkRole: 'ProLnk emergency matching routes your request to contractors with confirmed after-hours availability — not just the next available slot.',
    priorityAction: 'Before next DFW summer, establish an emergency backup. A July system failure with no backup costs you 2-3x more.',
  },
  {
    situation: 'I have primary and backup but no specialist',
    missing: ['Zoning system expert for multi-zone problems', 'Commercial-rated tech for oversized residential systems', 'Geothermal or heat pump specialist if applicable'],
    howToFill: [
      'Ask your primary tech what they refer out — this reveals your specialty gap',
      'Search ProLnk for specialty-specific contractors (zoning, geothermal, mini-split)',
      'Build the specialist relationship before you need it — not during a failure',
    ],
    proLnkRole: 'ProLnk filters by specialty so you can find geothermal experts, zoning specialists, or commercial-grade technicians serving your DFW area.',
    priorityAction: 'Identify what your primary tech refers out. That is your specialty gap. Fill it proactively.',
  },
  {
    situation: 'I have a full network but want to optimize it',
    missing: ['Service agreement pricing comparison', 'Confirmation all three contractors are still active and licensed', 'Documentation of each contractor relationship'],
    howToFill: [
      'Use ProLnk annually to benchmark your current contractor pricing against the market',
      'Verify all contractor licenses are current through Texas TDLR',
      'Create a home file: contractor name, phone, license number, last service date, system worked on',
    ],
    proLnkRole: 'ProLnk stores your Home Health Vault records so contractor history, system details, and service records are always accessible and portable.',
    priorityAction: 'Conduct an annual network audit. Licenses expire. Contractors retire. Stay current.',
  },
];

export default function DFWHVACNetworkGuide() {
  const [selected, setSelected] = useState(0);
  const current = networkGaps[selected];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF2', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔗</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>DFW HVAC Contractor Network Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: '1rem' }}>Build your three-tier DFW HVAC network: primary, emergency backup, and specialist</p>
        </div>

        <div style={{ backgroundColor: '#111E33', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>📊 What Is Your Current Network?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {networkGaps.map((g, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ backgroundColor: selected === i ? '#F5E642' : '#1A2E4A', color: selected === i ? '#0A1628' : '#E8EDF2', border: 'none', borderRadius: '8px', padding: '0.75rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', textAlign: 'left', transition: 'all 0.2s' }}>
                {g.situation}
              </button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1A2E4A', borderRadius: '12px', padding: '1.75rem', marginBottom: '1.5rem', border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>{current.situation}</h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ color: '#EF4444', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>What You Are Missing</h3>
            {current.missing.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem 0', fontSize: '0.9rem', color: '#E8EDF2' }}>
                <span style={{ color: '#EF4444' }}>✗</span>{m}
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ color: '#22C55E', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>How to Fill the Gap</h3>
            {current.howToFill.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem 0', fontSize: '0.9rem', color: '#E8EDF2' }}>
                <span style={{ color: '#22C55E' }}>✓</span>{f}
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>How ProLnk Helps</div>
            <div style={{ color: '#E8EDF2', fontSize: '0.9rem', lineHeight: 1.6 }}>{current.proLnkRole}</div>
          </div>

          <div style={{ backgroundColor: '#1A3A2A', border: '1px solid #22C55E', borderRadius: '8px', padding: '1rem' }}>
            <div style={{ color: '#22C55E', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>Priority Action</div>
            <div style={{ color: '#E8EDF2', fontSize: '0.9rem' }}>{current.priorityAction}</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111E33', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏗️</div>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1rem' }}>ProLnk is the fastest way for DFW homeowners to build a complete, verified HVAC contractor network.</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Start Building Your DFW HVAC Network</button>
        </div>
      </div>
    </div>
  );
}
