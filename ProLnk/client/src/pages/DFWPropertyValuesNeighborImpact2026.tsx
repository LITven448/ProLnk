import { useState } from 'react';

const issues = [
  { id: 'yard', label: 'Unkempt Yards', icon: '🌿', impact: '-3 to -5%', severity: 'medium', actions: ['Unkempt yards suppress nearby values by 3-5% per DFW appraisal data', 'Politely approach neighbor first — most respond to a kind conversation', 'If HOA-governed: file complaint per your CC&Rs (written, documented)', 'Non-HOA: file with city code enforcement via Dallas 311 or FW 817-392-1234', 'City citations typically result in forced mow within 10 days (billed to owner)', 'ProLnk can connect your neighbor with affordable landscaping pros'] },
  { id: 'foreclosure', label: 'Foreclosure Nearby', icon: '🏚️', impact: '-1% per 300ft', severity: 'high', actions: ['Studies show each foreclosure within 300ft reduces nearby values 0.9-1.1%', 'Multiple foreclosures compound — 3 nearby can reduce value 3-4%', 'Monitor DCAD.org / TNCAD.org for tax delinquency notices on nearby homes', 'Report neglected foreclosures to city vacant property registry', 'Community Land Trust programs can acquire and stabilize abandoned homes', 'Work with HOA or neighborhood association to formalize maintenance standards'] },
  { id: 'violations', label: 'Code Violations', icon: '⚠️', impact: '-2 to -7%', severity: 'high', actions: ['Visible junk vehicles, broken windows, and overgrowth all suppress value', 'Code violations on adjacent lots can reduce your appraisal by 2-7%', 'File complaint with city — citations require corrective action within 10-30 days', 'For chronic violators: escalate to city council district office', 'Work with neighborhood association to pressure systemic enforcement', 'Consult a DFW real estate attorney if violation materially affects your listing'] },
  { id: 'rental', label: 'Neglected Rental Properties', icon: '🏢', impact: '-2 to -4%', severity: 'medium', actions: ['Deferred maintenance on nearby rentals reduces comps for your appraisal', 'Identify the owner via DCAD.org — send certified letter documenting issues', 'File code enforcement if violations are visible from public right-of-way', 'TX law allows tenants to report habitability issues to city (helps pressure owners)', 'Engage your HOA if rental is in a governed community', 'For chronic negligence: contact TX Real Estate Commission about unlicensed PM'] },
  { id: 'commercial', label: 'Nearby Blight / Commercial', icon: '🏭', impact: '-5 to -15%', severity: 'critical', actions: ['Industrial blight or failing commercial within 500ft can reduce values 5-15%', 'Organize neighbors to attend city zoning hearings — numbers matter', 'File with TX Commission on Environmental Quality if contamination suspected', 'Petition city for blight remediation funding (CDBG grants available)', 'Work with NTCAR (North TX Commercial Assoc of Realtors) advocacy programs', 'Consult a TX property rights attorney for inverse condemnation claims'] },
];

const severityColor: Record<string, string> = { medium: '#fbbf24', high: '#f97316', critical: '#dc2626' };

export default function DFWPropertyValuesNeighborImpact2026() {
  const [selected, setSelected] = useState('yard');
  const active = issues.find(i => i.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📉</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Neighbor Impact on Property Values 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>
            How neighboring properties affect your home value in DFW — quantified impacts and actionable steps to protect your investment.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Select Neighbor Issue Type</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {issues.map(i => (
            <button key={i.id} onClick={() => setSelected(i.id)}
              style={{ background: selected === i.id ? '#F5E642' : '#111e35', color: selected === i.id ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
              {i.icon} {i.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 14, padding: 28, border: '1px solid #1e3a5f', marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <h3 style={{ color: '#F5E642', fontSize: 20, margin: 0 }}>{active.icon} {active.label}</h3>
            <div style={{ background: severityColor[active.severity], color: '#0A1628', fontWeight: 800, borderRadius: 8, padding: '6px 14px', fontSize: 18 }}>
              {active.impact} value impact
            </div>
          </div>
          {active.actions.map((action, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
              <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{idx + 1}</span>
              <span style={{ color: '#cbd5e1', fontSize: 15 }}>{action}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2d1a', borderRadius: 12, padding: 24, border: '1px solid #166534', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔧</div>
          <h3 style={{ color: '#4ade80', margin: '0 0 8px' }}>ProLnk Raises Neighborhood Standards</h3>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>
            When more homes in your neighborhood use ProLnk verified pros, maintenance quality rises across the block — protecting and lifting everyone's property value simultaneously.
          </p>
        </div>
      </div>
    </div>
  );
}
