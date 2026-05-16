import { useState } from 'react';

const scenarios = [
  {
    orgType: 'HOA (Homeowners Association)',
    issue: 'Lawn too tall / non-approved paint color',
    canEnforce: true,
    details: 'HOAs have legal authority backed by your deed. They can fine you, place a lien on your property, and in extreme cases foreclose. In DFW, HOA power is governed by Texas Property Code Chapter 209.',
    dispute: 'Request a hearing with the HOA board in writing. If unresolved, contact the Texas HOA ombudsman or hire a real estate attorney. Many DFW HOA disputes settle at mediation.',
  },
  {
    orgType: 'HOA (Homeowners Association)',
    issue: 'Parking in your own driveway (commercial vehicle)',
    canEnforce: true,
    details: 'If your CC&Rs prohibit commercial vehicles, the HOA can enforce. However, "commercial vehicle" definition varies by HOA docs — many DFW HOAs have been challenged on pickup truck restrictions.',
    dispute: 'Review your specific CC&Rs. Texas SB 1588 (2021) added new HOA reform rules. An HOA cannot fine you without proper written notice and hearing opportunity.',
  },
  {
    orgType: 'Neighborhood Association (NA)',
    issue: 'Neighbor running a loud business from home',
    canEnforce: false,
    details: 'Voluntary NAs have no legal enforcement authority. They can ask, write letters, and organize community pressure — but cannot fine or lien your property.',
    dispute: 'Contact your city directly. In DFW, noise and home business complaints go to the city code enforcement department. The NA can help organize a coordinated city complaint.',
  },
  {
    orgType: 'Neighborhood Association (NA)',
    issue: 'Derelict property dragging down values',
    canEnforce: false,
    details: 'NAs can advocate but not legally compel. However, organized NAs in DFW neighborhoods like East Dallas and Oak Cliff have been very effective at pressuring city code enforcement.',
    dispute: 'File a code enforcement complaint with your city. In Dallas, use 311. The NA can coordinate multiple complaints to escalate priority.',
  },
  {
    orgType: 'HOA (Homeowners Association)',
    issue: 'HOA denying solar panel installation',
    canEnforce: false,
    details: 'Texas law (Property Code 202.010) prohibits HOAs from banning solar panels outright. HOAs CAN regulate placement (not visible from street) but cannot ban them entirely in Texas.',
    dispute: 'Cite Texas Property Code 202.010 in writing to the HOA. This is a clear legal protection for DFW homeowners wanting solar.',
  },
];

export default function DFWNeighborhoodAssociationGuide() {
  const [selectedOrgType, setSelectedOrgType] = useState<string | null>(null);
  const [activeScenario, setActiveScenario] = useState<number | null>(null);

  const filtered = selectedOrgType ? scenarios.filter(s => s.orgType === selectedOrgType) : scenarios;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏘️</div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#F5E642', marginBottom: '8px' }}>
            DFW Neighborhood Association Guide
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            Know the difference between what your HOA can legally enforce vs. what your NA can only request.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {['HOA (Homeowners Association)', 'Neighborhood Association (NA)'].map(type => (
            <div
              key={type}
              onClick={() => setSelectedOrgType(selectedOrgType === type ? null : type)}
              style={{
                backgroundColor: selectedOrgType === type ? '#F5E642' : '#1e2d4a',
                color: selectedOrgType === type ? '#0A1628' : '#fff',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                textAlign: 'center',
                border: '2px solid #F5E642',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{type.includes('HOA') ? '⚖️' : '🤝'}</div>
              <div style={{ fontWeight: '700', fontSize: '14px' }}>{type}</div>
              <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.8 }}>
                {type.includes('HOA') ? 'Mandatory + Legal authority' : 'Voluntary + No legal power'}
              </div>
            </div>
          ))}
        </div>

        <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>
          {selectedOrgType ? `Showing scenarios for: ${selectedOrgType}` : 'Showing all scenarios — select an org type to filter'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {filtered.map((s, idx) => (
            <div
              key={idx}
              onClick={() => setActiveScenario(activeScenario === idx ? null : idx)}
              style={{
                backgroundColor: '#1e2d4a',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                border: activeScenario === idx ? '2px solid #F5E642' : '2px solid transparent',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, marginRight: '12px' }}>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>{s.orgType}</div>
                  <div style={{ fontWeight: '600', fontSize: '15px', marginBottom: '6px' }}>"{s.issue}"</div>
                  <div style={{
                    display: 'inline-block',
                    backgroundColor: s.canEnforce ? '#dc2626' : '#16a34a',
                    color: '#fff',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '11px',
                    fontWeight: '700',
                  }}>
                    {s.canEnforce ? 'CAN ENFORCE' : 'CANNOT ENFORCE'}
                  </div>
                </div>
                <span style={{ color: '#F5E642' }}>{activeScenario === idx ? '▲' : '▼'}</span>
              </div>
              {activeScenario === idx && (
                <div style={{ marginTop: '16px', backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px' }}>
                  <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.7', marginBottom: '12px' }}>{s.details}</p>
                  <p style={{ color: '#94a3b8', fontSize: '12px' }}>⚡ <strong style={{ color: '#F5E642' }}>Dispute path:</strong> {s.dispute}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e2d4a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: '700', marginBottom: '8px' }}>🔧 Need Home Improvements That Meet HOA Rules?</p>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>ProLnk pros know DFW HOA requirements and can help you stay compliant.</p>
        </div>
      </div>
    </div>
  );
}
