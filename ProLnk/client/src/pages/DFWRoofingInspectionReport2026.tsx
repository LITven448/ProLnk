import { useState } from 'react';

const findings = [
  { id: 'clean', label: 'Clean / No Issues', color: '#4ADE80', rating: 'Pass', action: 'Document for insurance. Maintain 3-year inspection cycle. Proof of maintenance strengthens future claims.', impact: 'Positive — insurers may offer discounts for documented maintenance', claimEffect: 'Strengthens claim if storm damage occurs later' },
  { id: 'granule', label: 'Granule Loss (Minor)', color: '#EAB308', rating: 'Monitor', action: 'Note shingles with 20-30% granule loss. Schedule re-inspection in 18 months or after next major storm.', impact: 'Neutral — end-of-life indicator but not urgent', claimEffect: 'May indicate age-related wear; document before next storm season' },
  { id: 'hail', label: 'Hail Impact Marks', color: '#F97316', rating: 'Claim', action: 'Photograph all impact marks with HAAG-certified inspector present. File claim within 1 year of storm date.', impact: 'Positive for claim — HAAG report is gold standard for insurance adjusters', claimEffect: 'HAAG report significantly increases claim approval odds in DFW' },
  { id: 'ponding', label: 'Ponding / Drainage Issues', color: '#F97316', rating: 'Repair', action: 'Add scuppers or tapered insulation to resolve standing water. Ponding voids manufacturer warranties.', impact: 'Negative — active damage accelerating if unresolved', claimEffect: 'Often excluded from insurance as maintenance issue' },
  { id: 'flashing', label: 'Failed Flashing / Penetrations', color: '#EF4444', rating: 'Urgent Repair', action: 'Replace failed flashing at chimneys, vents, skylights. Active leak risk — interior damage possible in next rain.', impact: 'Critical — interior water damage risk is immediate', claimEffect: 'Interior water damage claim requires proof of exterior cause' },
  { id: 'structural', label: 'Structural / Deck Damage', color: '#DC2626', rating: 'Emergency', action: 'Full replacement required. Structural deck damage indicates moisture intrusion and possible mold risk. Contact Charter ProLnk roofing pros immediately.', impact: 'Severe — home value and safety at risk', claimEffect: 'Full replacement often covered if storm-related — requires HAAG documentation' },
];

export default function DFWRoofingInspectionReport2026() {
  const [finding, setFinding] = useState(findings[0]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW ROOFING INSPECTION GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>Reading a Roofing Inspection Report in DFW</h1>
        <p style={{ color: '#9BA3AF', fontSize: 15, marginBottom: 32 }}>DFW homeowners file more hail claims than nearly any US market. Knowing what your inspection report says — and what to do next — can mean the difference between a paid claim and a denied one.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📋 Select Your Report Finding</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {findings.map(f => (
              <button key={f.id} onClick={() => setFinding(f)} style={{ background: finding.id === f.id ? '#1A2F50' : '#0A1628', border: finding.id === f.id ? `2px solid ${f.color}` : '1px solid #1A2F50', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ color: f.color, fontWeight: 700, fontSize: 13 }}>{f.label}</div>
                <div style={{ color: '#9BA3AF', fontSize: 12 }}>{f.rating}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, borderLeft: `4px solid ${finding.color}`, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ color: finding.color, fontWeight: 800, fontSize: 20 }}>{finding.label}</div>
            <div style={{ background: finding.color, color: '#0A1628', borderRadius: 6, padding: '4px 12px', fontWeight: 800, fontSize: 13 }}>{finding.rating}</div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#9BA3AF', fontSize: 13, marginBottom: 4 }}>Recommended Action</div>
            <div style={{ color: '#CBD5E1', fontSize: 14 }}>{finding.action}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#1A2F50', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#9BA3AF', fontSize: 12, marginBottom: 4 }}>Home Value Impact</div>
              <div style={{ color: '#E8EAF0', fontSize: 13 }}>{finding.impact}</div>
            </div>
            <div style={{ background: '#1A2F50', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#9BA3AF', fontSize: 12, marginBottom: 4 }}>Insurance Claim Effect</div>
              <div style={{ color: '#E8EAF0', fontSize: 13 }}>{finding.claimEffect}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📄 HAAG-Certified Report Sections</div>
          {['Field Section: shingle condition, granule loss %, hail impact diameter and pattern', 'Penetrations: flashing at chimney, vents, skylights, plumbing boots', 'Drainage: gutters, scuppers, slope adequacy, ponding evidence', 'Edge Details: drip edge, fascia, soffit — common entry point for water and pests', 'Overall Condition Rating: Excellent / Good / Fair / Poor / Failed'].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ color: '#F5E642' }}>📌</span>
              <span style={{ color: '#CBD5E1', fontSize: 14 }}>{f}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🌩️ DFW Roofing Facts</div>
          {['DFW averages 4-6 significant hail events per year — most in North Texas history', 'HAAG certification is the industry standard Texas adjusters use for claim validation', '1-year filing window after storm date — most homeowners miss it without an inspection', 'Class 4 impact-resistant shingles can reduce DFW insurance premiums 20-30%', 'Charter ProLnk roofers are HAAG-certified and coordinate directly with adjusters'].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ color: '#F5E642' }}>✓</span>
              <span style={{ color: '#CBD5E1', fontSize: 14 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}