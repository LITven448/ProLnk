import { useState } from 'react';

const violations = [
  {
    id: 'soilprep',
    icon: '🌍',
    title: 'Soil Not Properly Prepared Before Pour',
    code: 'IRC R401.4 / ACI 332',
    description: 'DFW expansive clay soil (PI 40+) must be moisture-conditioned and compacted before concrete placement. Skipping this causes heave and settlement.',
    fix: 'Conduct geotechnical report. Pre-wet soil to within 2% of optimum moisture. Compact in 6-inch lifts to 95% Standard Proctor. Document with compaction tests.',
    severity: 'High',
  },
  {
    id: 'posttension',
    icon: '🔩',
    title: 'Post-Tension Cables Not Tensioned Correctly',
    code: 'PTI DC10.5-12',
    description: 'Post-tension cables under-tensioned or over-tensioned per PT engineer specifications cause slab cracking and structural failure.',
    fix: 'Tension cables per PT engineer design — typically 33,000 lbs force. Document elongation measurements. Third-party inspection required before encapsulation.',
    severity: 'High',
  },
  {
    id: 'depth',
    icon: '📏',
    title: 'Inadequate Depth for DFW Clay Soils',
    code: 'IRC R403.1.4 / Local Amendments',
    description: 'Standard 12-inch beam depth is insufficient for DFW active zone depth (typically 5-8 ft). Shallow beams move with clay.',
    fix: 'Extend grade beams to below active zone per soils report. Dallas/Tarrant counties typically require 24-30 inch beam depth minimum for expansive clay.',
    severity: 'High',
  },
  {
    id: 'drainage',
    icon: '💧',
    title: 'Drainage Not Addressed at Construction',
    code: 'IRC R401.3 / IBC 1804.4',
    description: 'Flat grading or negative drainage toward foundation causes differential moisture — the primary cause of DFW foundation movement.',
    fix: 'Establish positive drainage: minimum 6-inch drop in 10 feet away from structure. Install French drains or swales. Document final grades on survey.',
    severity: 'High',
  },
  {
    id: 'planissue',
    icon: '📐',
    title: 'Foundation Design Not Stamped by PE',
    code: 'IRC R301.1.3',
    description: 'DFW jurisdictions require a Texas PE-stamped foundation design for all new residential construction on expansive soils.',
    fix: 'Obtain foundation design from licensed Texas structural engineer. Submit stamped plans to permitting authority before pour. Keep on-site during inspection.',
    severity: 'High',
  },
  {
    id: 'rebar',
    icon: '🏗️',
    title: 'Insufficient Rebar Cover or Spacing',
    code: 'ACI 318 / IRC R404',
    description: 'Rebar placed too close to soil edge corrodes and spalls concrete. Spacing violations reduce structural capacity.',
    fix: 'Maintain minimum 3-inch concrete cover from rebar to soil-side of slab. Follow engineer-specified spacing — typically #4 @ 12 inches each way for DFW conditions.',
    severity: 'Medium',
  },
];

export default function DFWFoundationCodeViolations2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = violations.find(v => v.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏛️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>
            DFW Foundation Code & Standard Violations 2026
          </h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>
            What experts flag on DFW clay soils — select a violation to view the assessment guide
          </p>
        </div>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {violations.map(v => (
            <button key={v.id} onClick={() => setSelected(selected === v.id ? null : v.id)}
              style={{ background: selected === v.id ? '#1a2f50' : '#0F1F38', border: selected === v.id ? '2px solid #F5E642' : '2px solid #1E3A5F', borderRadius: 10, padding: '16px 20px', textAlign: 'left', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 28 }}>{v.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{v.title}</div>
                <div style={{ color: '#8899AA', fontSize: 13, marginTop: 2 }}>Code: {v.code}</div>
              </div>
              <span style={{ background: '#7f1d1d', color: '#fca5a5', borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>{v.severity}</span>
            </button>
          ))}
        </div>
        {active && (
          <div style={{ background: '#1a2f50', border: '2px solid #F5E642', borderRadius: 14, padding: 28 }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>{active.icon}</div>
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{active.title}</h2>
            <div style={{ color: '#93c5fd', fontSize: 13, marginBottom: 14 }}>📋 {active.code}</div>
            <div style={{ color: '#cbd5e1', fontSize: 15, marginBottom: 18, lineHeight: 1.6 }}>{active.description}</div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>✅ Assessment & Fix</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{active.fix}</div>
            </div>
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: 40, color: '#475569', fontSize: 13 }}>
          ProLnk · DFW Code Compliance Series 2026 · Always verify with local AHJ and licensed PE
        </div>
      </div>
    </div>
  );
}