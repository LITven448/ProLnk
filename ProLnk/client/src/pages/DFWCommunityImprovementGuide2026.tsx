import { useState } from 'react';

const issues = [
  { id: 'code', label: 'Code Violations', icon: '🏚️', actions: ['Look up your city code enforcement portal: Dallas 311, FW 817-392-1234', 'Document the violation with dated photos before filing complaint', 'File anonymously online — Dallas and Fort Worth both allow it', 'Violations must be corrected within 10-30 days (inspector sets timeline)', 'Escalate to city council rep if inspector is unresponsive after 45 days'] },
  { id: 'abandoned', label: 'Abandoned Property', icon: '🏗️', actions: ['Search DCAD.org or TNCAD.org to find the owner of record', 'Report to Dallas Vacant Building Registry or FW Neighborhood Code', 'Contact TX GLO if property may be heir property or tax delinquent', 'File with your county tax office for delinquent tax reporting', 'Community Land Trust option: cities can acquire and redevelop in extreme cases'] },
  { id: 'beautification', label: 'Beautification Grants', icon: '🌸', actions: ['Apply to Dallas Neighborhood Vitality Program (up to $25K grants)', 'Fort Worth Neighborhood Improvement Program offers matching funds', 'Keep DFW Beautiful accepts applications for cleanup supply grants', 'Texas Trees Foundation provides free tree planting in Dallas County', 'Apply to TxDOT Landscape Cost Sharing for highway-adjacent properties'] },
  { id: 'trees', label: 'Free Tree Programs', icon: '🌳', actions: ['Dallas Urban Forest Master Plan: free trees for qualifying homeowners', 'Irving Green: free tree program for Irving residents, apply Mar-Apr', 'Plano Releaf: order online at plano.gov, pickup events each spring', 'Texas A&M Forest Service: watershed restoration tree distributions', 'Plant natives: Texas Live Oak, Cedar Elm, Mexican Plum attract zero deer'] },
  { id: 'litter', label: 'Litter & Dumping', icon: '🗑️', actions: ['Report illegal dumping to Texas TCEQ at 1-888-777-3186', 'Dallas 311 app handles litter and bulk illegal dumping requests', 'Adopt-A-Highway or Adopt-A-Street programs available in all DFW cities', 'Keep DFW Beautiful Cleanathon: annual event with free supplies', 'Install CCTV signs near dump hotspots — legal deterrent even without cameras'] },
];

export default function DFWCommunityImprovementGuide2026() {
  const [selected, setSelected] = useState('code');
  const active = issues.find(i => i.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌱</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Community Improvement Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>
            Practical actions DFW homeowners can take to improve their neighborhoods — grants, programs, and city resources in one place.
          </p>
        </div>

        <div style={{ background: '#0f2d1a', border: '1px solid #166534', borderRadius: 12, padding: 18, marginBottom: 36, display: 'flex', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🌳</span>
          <div>
            <div style={{ fontWeight: 700, color: '#4ade80', marginBottom: 4 }}>Free Trees Available Now in DFW</div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>Dallas, Plano, Irving, and TX A&M Forest Service all offer free native tree distributions. Spring applications open February-April each year. First come, first served.</div>
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Select Your Issue Type</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {issues.map(i => (
            <button key={i.id} onClick={() => setSelected(i.id)}
              style={{ background: selected === i.id ? '#F5E642′ : '#111e35', color: selected === i.id ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 18px', cursor: ’pointer', fontWeight: 600, fontSize: 14 }}>
              {i.icon} {i.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 14, padding: 28, border: '1px solid #1e3a5f', marginBottom: 32 }}>
          <h3 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 20px' }}>{active.icon} Community Action Guide: {active.label}</h3>
          {active.actions.map((action, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
              <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{idx + 1}</span>
              <span style={{ color: '#cbd5e1', fontSize: 15 }}>{action}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>🔧 ProLnk connects DFW homeowners with verified pros for landscaping, exterior work, and code-compliant improvements — the fastest way to meet grant requirements and pass inspections.</p>
        </div>
      </div>
    </div>
  );
}
