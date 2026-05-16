import { useState } from 'react';

const droughtLevels = [
  { code: 'D0', label: 'Abnormally Dry', color: '#F5E642', foundationUrgency: 'Low', restrictions: 'None typically', homeImpact: 'Monitor soil moisture around foundation. Begin supplemental watering if soil pulls away from foundation.' },
  { code: 'D1', label: 'Moderate Drought', color: '#FFA500', foundationUrgency: 'Moderate', restrictions: 'Stage 1 — watering 2x/week', homeImpact: 'Clay soil contraction begins. Water foundation perimeter 3x/week. Check for new cracks in drywall or brick.' },
  { code: 'D2', label: 'Severe Drought', color: '#FF6600', foundationUrgency: 'High', restrictions: 'Stage 2 — watering 1x/week', homeImpact: 'Significant foundation settlement risk. Daily soaker hose around perimeter. Inspect pier and beam monthly.' },
  { code: 'D3', label: 'Extreme Drought', color: '#CC0000', foundationUrgency: 'Critical', restrictions: 'Stage 3 — hand-watering only', homeImpact: 'Foundation movement likely. Emergency foundation watering exemptions may apply. Get structural inspection.' },
  { code: 'D4', label: 'Exceptional Drought', color: '#800000', foundationUrgency: 'Emergency', restrictions: 'Stage 4 — outdoor watering banned', homeImpact: 'Severe soil shrinkage. Document all foundation cracks. Apply for city watering variance. Consult foundation contractor.' },
];

export default function DFWDroughtMonitorGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const detail = droughtLevels.find(d => d.code === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>🌵 DFW HOME CARE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Drought Monitor Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          Texas A&M AgriLife Extension publishes the Texas Drought Monitor weekly. For DFW homeowners, drought level directly determines foundation watering urgency — DFW's expansive clay soil shrinks dramatically when dry, causing costly foundation movement.
        </p>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>📍 How to Check DFW Drought Status</div>
          <ol style={{ paddingLeft: 20, lineHeight: 2, color: '#cbd5e1', margin: 0 }}>
            <li>Visit <span style={{ color: '#F5E642' }}>droughtmonitor.unl.edu</span> or <span style={{ color: '#F5E642' }}>texasdrought.tamu.edu</span></li>
            <li>Select Texas → Dallas-Fort Worth region</li>
            <li>Check weekly update (published every Thursday)</li>
            <li>Note your county: Dallas, Tarrant, Collin, Denton, or surrounding</li>
          </ol>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Select Your Current DFW Drought Level</h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
          {droughtLevels.map(d => (
            <button
              key={d.code}
              onClick={() => setSelected(d.code)}
              style={{
                background: selected === d.code ? d.color : '#0f2240',
                color: selected === d.code ? '#0A1628' : '#fff',
                border: `2px solid ${d.color}`,
                borderRadius: 8,
                padding: '10px 18px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {d.code} — {d.label}
            </button>
          ))}
        </div>

        {detail && (
          <div style={{ background: '#0f2240', borderRadius: 12, padding: 24, border: `2px solid ${detail.color}` }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: detail.color, marginBottom: 4 }}>{detail.code}: {detail.label}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>🏗️ FOUNDATION URGENCY</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642' }}>{detail.foundationUrgency}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>💧 WATER RESTRICTIONS</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#cbd5e1' }}>{detail.restrictions}</div>
              </div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginTop: 16 }}>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>🏠 HOME CARE IMPLICATIONS</div>
              <div style={{ color: '#e2e8f0', lineHeight: 1.7 }}>{detail.homeImpact}</div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, background: '#0f2240', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>⚠️ Foundation Watering Exemption</div>
          <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>Most DFW water utilities allow foundation watering exemptions even during Stage 3-4 restrictions. Contact your city water department with your address to apply. Keep receipts for any foundation contractor visits.
          </p>
        </div>
      </div>
    </div>
  );
}
