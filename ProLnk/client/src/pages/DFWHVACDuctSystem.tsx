import { useState } from 'react';

const ductTypes = [
  { id: 'trunk', icon: '🛤️', name: 'Supply Trunks', desc: 'Main rectangular or round ducts carrying air from the air handler.', dfwDamage: 'Extreme attic temps cause sheet metal expansion/contraction, loosening joints and creating air leaks over time.' },
  { id: 'branch', icon: '🌿', name: 'Branch Ducts', desc: 'Smaller ducts branching off trunks to individual rooms.', dfwDamage: 'Flex duct branches sag in DFW attics, creating kinks that reduce airflow by 30-50% per sharp bend.' },
  { id: 'flex', icon: '🐍', name: 'Flex Connections', desc: 'Flexible duct sections used to connect rigid ducts to registers.', dfwDamage: 'UV and heat in DFW attics degrade flex duct outer jacket in 10-15 years, causing insulation loss and air leaks.' },
  { id: 'return', icon: '🔄', name: 'Return Ducts', desc: 'Ducts that carry air back from rooms to the air handler.', dfwDamage: 'Negative pressure in return ducts pulls hot attic air through unsealed joints — a major efficiency killer in DFW.' },
];

const locations = ['North DFW (Frisco, McKinney)', 'East DFW (Mesquite, Garland)', 'South DFW (Mansfield, Cedar Hill)', 'West DFW (Fort Worth, Keller)', 'Central DFW (Dallas, Irving)'];

const issues = [
  { issue: 'Disconnected duct section', priority: 'URGENT', repair: 'Reconnect and seal with mastic + metal tape. Verify airflow after.', cost: '$200–$500 per section' },
  { issue: 'Collapsed or kinked flex duct', priority: 'HIGH', repair: 'Replace or re-route affected flex run. Minimum radius 1.5x duct diameter.', cost: '$150–$400 per run' },
  { issue: 'Air leaks at joints', priority: 'HIGH', repair: 'Apply mastic sealant to all joints. Do not use standard duct tape — it fails in DFW attic heat.', cost: '$300–$900 whole system' },
  { issue: 'Inadequate insulation on ducts', priority: 'MEDIUM', repair: 'Upgrade to R-8 insulation wrap minimum. R-11 recommended for DFW attic runs over 10 feet.', cost: '$500–$2,000 whole system' },
  { issue: 'Undersized duct for room CFM need', priority: 'MEDIUM', repair: 'Manual D calculation needed. Upsize duct or add parallel branch run.', cost: '$400–$1,200 per zone' },
  { issue: 'Condensation on duct exterior', priority: 'LOW', repair: 'Inspect insulation integrity. Condensation indicates vapor barrier failure — common after DFW hail damage.', cost: '$200–$600' },
];

export default function DFWHVACDuctSystem() {
  const [activeType, setActiveType] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [issueIdx, setIssueIdx] = useState<number | null>(null);

  const selected = ductTypes.find(d => d.id === activeType);
  const priorityColor = (p: string) => p === 'URGENT' ? '#FF4444' : p === 'HIGH' ? '#FF8C00' : p === 'MEDIUM' ? '#F5E642' : '#4ADE80';

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Education</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 0.75rem' }}>Complete DFW Duct System Guide</h1>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>DFW attics reach 150-160°F in summer — the harshest environment for ductwork in the country. Understanding how DFW heat damages each duct component helps you prioritize repairs before efficiency collapses.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {ductTypes.map(d => (
            <button key={d.id} onClick={() => setActiveType(activeType === d.id ? null : d.id)}
              style={{ background: activeType === d.id ? '#F5E642' : '#0F2140', border: `2px solid ${activeType === d.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: '1.25rem 1rem', cursor: 'pointer', textAlign: 'left', color: activeType === d.id ? '#0A1628' : '#E8EDF5' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{d.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{d.name}</div>
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#0F2140', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1E3A5F' }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 0.75rem' }}>{selected.icon} {selected.name}</h3>
            <p style={{ color: '#CBD5E1', margin: '0 0 1rem', lineHeight: 1.7 }}>{selected.desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#FF8C00', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.4rem' }}>🔥 DFW HEAT DAMAGE</div>
              <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.92rem', lineHeight: 1.6 }}>{selected.dfwDamage}</p>
            </div>
          </div>
        )}

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#CBD5E1' }}>Your DFW Location</label>
          <select value={location} onChange={e => setLocation(e.target.value)}
            style={{ width: '100%', background: '#0F2140', border: '1px solid #1E3A5F', borderRadius: 8, padding: '0.75rem 1rem', color: '#E8EDF5', fontSize: '1rem' }}>
            <option value="">Select your area...</option>
            {locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          {location && <div style={{ marginTop: '0.75rem', padding: '0.75rem 1rem', background: '#0A1628', borderRadius: 8, color: '#94A3B8', fontSize: '0.9rem' }}>
            ⚡ {location} homes typically have ductwork installed 1980-2010. Priority: inspect for flex duct kinking and joint leaks before next summer.
          </div>}
        </div>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>🔧 Duct Issue Assessment</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {issues.map((issue, i) => (
            <div key={i} onClick={() => setIssueIdx(issueIdx === i ? null : i)}
              style={{ background: '#0F2140', border: `1px solid ${issueIdx === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ background: priorityColor(issue.priority), color: '#0A1628', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: 4 }}>{issue.priority}</span>
                <span style={{ fontWeight: 600, color: issueIdx === i ? '#F5E642' : '#E8EDF5' }}>{issue.issue}</span>
              </div>
              {issueIdx === i && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <div style={{ color: '#CBD5E1', marginBottom: '0.4rem' }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Repair: </span>{issue.repair}</div>
                  <div style={{ color: '#F5E642', fontWeight: 600 }}>Cost: <span style={{ color: '#94A3B8' }}>{issue.cost}</span></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: '1.5rem', textAlign: 'center', border: '1px solid #1E3A5F' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛠️</div>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Get a Full Duct Inspection</div>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: '0 0 1rem' }}>ProLnk matches DFW homeowners with HVAC pros who perform full duct leakage testing and Manual D verification.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Match Me With a Duct Specialist
          </button>
        </div>
      </div>
    </div>
  );
}
