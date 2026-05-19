import { useState } from 'react';

const sheathingMaterials = ['OSB (oriented strand board)', 'Plywood', 'Board sheathing (older homes)', 'Foam board (exterior insulation)', 'Unknown / not visible'];
const dfwIssues = ['Wind damage / racking', 'Moisture intrusion / staining', 'Foundation shift / wall cracking', 'Re-siding project planning', 'Energy efficiency concern'];

function getSheathingAssessment(material: string, issue: string) {
  if (issue === 'Wind damage / racking') {
    const structural = material === 'OSB (oriented strand board)' || material === 'Plywood';
    return {
      rating: structural ? 'GOOD' : 'CONCERN',
      color: structural ? '#00CC66′ : '#FF8C00',
      assessment: structural
        ? 'OSB and plywood provide strong racking resistance — critical in DFW wind events. Properly nailed (6″ edge, 12″ field) to studs, these panels act as the primary lateral load system.'
        : material === 'Foam board (exterior insulation)'
          ? 'Foam board alone provides minimal racking resistance. DFW wind loads require a separate structural sheathing layer or engineered bracing system when foam is used.'
          : 'Diagonal board sheathing provides racking resistance through triangulation but is inferior to panel sheathing in extreme wind. Older DFW homes with board sheathing are more vulnerable in tornado events.',
      performance: 'Nail pattern is as important as material. Under-nailed OSB fails before the material itself.',
      recommendation: 'Verify proper nailing schedule if re-siding. Add structural panels if board sheathing is discovered during a major renovation.',
    };
  }
  if (issue === 'Moisture intrusion / staining') {
    return {
      rating: material === 'OSB (oriented strand board)' ? 'HIGH RISK' : 'MODERATE RISK',
      color: material === 'OSB (oriented strand board)' ? '#FF4444′ : '#FF8C00',
      assessment: 'OSB is highly moisture-sensitive. DFW\’s humidity (averaging 60–70% RH) combined with inadequate house wrap or failed window flashing causes OSB to swell, delaminate, and lose shear strength. Plywood is more forgiving due to cross-laminated layers.',
      performance: 'Water infiltration behind cladding is a primary cause of wall sheathing failure in DFW. Often invisible until re-siding.',
      recommendation: 'Inspect sheathing condition whenever re-siding. Any soft, dark, or crumbling panels must be replaced before new siding application.',
    };
  }
  if (issue === 'Foundation shift / wall cracking') {
    return {
      rating: 'INVESTIGATE',
      color: '#FF8C00',
      assessment: 'DFW\’s expansive clay soils cause foundation movement that translates to wall racking forces. Sheathing that was properly installed can still show distress after significant foundation shift.',
      performance: 'Sheathing performance after foundation movement depends on severity of racking. Look for fastener pull-through and panel joint gaps.',
      recommendation: 'Address foundation first. After stabilization, assess sheathing for racking damage. Re-nailing or panel replacement may be required after major repairs.',
    };
  }
  if (issue === 'Re-siding project planning') {
    return {
      rating: 'PLAN AHEAD',
      color: '#F5E642',
      assessment: 'Re-siding is the best — often only — opportunity to inspect and upgrade wall sheathing. DFW contractors often discover failed OSB hidden behind vinyl or hardboard siding on homes built 1985–2005.',
      performance: 'House wrap (Tyvek or equivalent) is required by DFW-area codes under most siding types. Inspect flashing at windows and penetrations while exposed.',
      recommendation: 'Budget $1–$3/sq ft for potential sheathing replacement. Install new house wrap over all new or replaced sheathing. Verify window flashing details comply with current codes.',
    };
  }
  return {
    rating: 'REVIEW',
    color: '#00AAFF',
    assessment: 'Wall sheathing is the hidden backbone of DFW home energy performance. Air infiltration through sheathing joints and penetrations is a major source of energy loss.',
    performance: 'OSB with taped seams or a quality house wrap dramatically reduces air infiltration. Board sheathing without wrap is highly air-leaky.',
    recommendation: 'Consider a blower door test to quantify air leakage. Sealing sheathing joints and ensuring continuous house wrap delivers measurable energy savings in DFW\’s extreme climate.',
  };
}

export default function DFWSheathingGuide() {
  const [material, setMaterial] = useState('');
  const [issue, setIssue] = useState('');
  const result = material && issue ? getSheathingAssessment(material, issue) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🏠 DFW Building Envelope Series</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8, lineHeight: 1.2 }}>Wall Sheathing Guide for DFW Homes</h1>
        <p style={{ color: '#8899BB', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Wall sheathing is the structural and weather-resistive backbone of your exterior walls. In DFW — where wind loads, clay soil movement, and humidity extremes converge — it matters more than most homeowners realize.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🧱', title: 'What Wall Sheathing Does', body: 'Sheathing panels nailed to wall studs create the lateral load (racking) resistance that keeps DFW homes standing in high-wind events. They also provide a substrate for house wrap and siding, and contribute to air sealing.' },
            { icon: '🌧️', title: 'House Wrap in DFW', body: 'Texas residential code requires a weather-resistive barrier (WRB) behind most siding types. Tyvek and similar wraps allow vapor transmission while blocking liquid water — critical in DFW\’s mixed-humid climate.' },
            { icon: '🌪️', title: 'DFW Wind & Sheathing', body: 'DFW sits in a high-wind zone. Sheathing nail pattern (spacing and penetration depth) is as critical as sheathing thickness. Under-nailed OSB is one of the most common wind damage amplifiers found in post-storm inspections.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 15 }}>{c.title}</div>
              <div style={{ color: '#8899BB', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, border: '1px solid #F5E642′ }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔍 Sheathing Performance Assessment</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#8899BB', fontSize: 13, marginBottom: 8 }}>Sheathing material (if known)</label>
            <select value={material} onChange={e => setMaterial(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select material...</option>
              {sheathingMaterials.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#8899BB', fontSize: 13, marginBottom: 8 }}>Primary DFW concern</label>
            <select value={issue} onChange={e => setIssue(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select concern...</option>
              {dfwIssues.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: `2px solid ${result.color}` }}>
              <div style={{ fontWeight: 800, color: result.color, fontSize: 16, marginBottom: 12 }}>{result.rating}</div>
              <div style={{ color: '#E8EDF5', fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>{result.assessment}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 6 }}>⚡ {result.performance}</div>
              <div style={{ color: '#8899BB', fontSize: 13 }}>✅ {result.recommendation}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#0F2040', borderRadius: 12, border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#8899BB', fontSize: 12, lineHeight: 1.6 }}>⚠️ Educational only. Wall sheathing structural concerns require a licensed contractor or structural engineer evaluation. DFW jurisdictions may require permits for structural re-sheathing work.</div>
        </div>
      </div>
    </div>
  );
}
