import { useState } from 'react';

const violations = [
  {
    id: 'dripan',
    icon: '💧',
    title: 'No Drip Pan Under Air Handler',
    code: 'IRC M1411.3',
    description: 'Air handlers in attics or above occupied spaces require a secondary drip pan with overflow drain or switch.',
    fix: 'Install corrosion-resistant drain pan under the air handler. Connect to separate drain line or install overflow shutoff switch.',
    severity: 'High',
  },
  {
    id: 'condensate',
    icon: '🔄',
    title: 'Missing Condensate Overflow Switch',
    code: 'IRC M1411.3.1',
    description: 'Without a float switch, a clogged condensate line can overflow causing structural water damage before homeowner notices.',
    fix: 'Install secondary condensate shutoff switch (float switch) in the primary drain pan. Unit shuts off when pan fills.',
    severity: 'High',
  },
  {
    id: 'lineinsulation',
    icon: '🧊',
    title: 'Improper Refrigerant Line Insulation',
    code: 'IRC M1411.4',
    description: 'Uninsulated suction lines sweat and drip causing water damage. Insulation must be continuous with no gaps.',
    fix: 'Apply minimum 1/2-inch thick closed-cell foam insulation on suction line end-to-end. Tape all seams and seal penetrations.',
    severity: 'Medium',
  },
  {
    id: 'returnair',
    icon: '🌀',
    title: 'Inadequate Return Air',
    code: 'IRC M1601.1',
    description: 'Undersized return grilles create negative pressure, pulling conditioned air from ducts and causing comfort and efficiency problems.',
    fix: 'Size return air openings to match supply CFM. DFW standard: minimum 1 sq inch free area per CFM of system capacity.',
    severity: 'High',
  },
  {
    id: 'flexduct',
    icon: '🔗',
    title: 'Flex Duct Too Long or Compressed',
    code: 'ACCA Manual D / IRC M1601',
    description: 'Compressed or kinked flex duct dramatically reduces airflow. Maximum run length and bend radius are code-required.',
    fix: 'Keep flex duct runs under 14 feet. Maintain full extension with no compression. Use hard duct for longer runs or tight bends.',
    severity: 'Medium',
  },
  {
    id: 'disconnect',
    icon: '🔌',
    title: 'No Disconnect at Outdoor Unit',
    code: 'NEC 440.14',
    description: 'A readily accessible disconnect switch must be within sight of and within 50 feet of the condensing unit.',
    fix: 'Install a weatherproof disconnect switch within line-of-sight of the condensing unit, not inside the unit itself.',
    severity: 'High',
  },
];

export default function DFWHVACCodeViolations2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = violations.find(v => v.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>
            DFW Common HVAC Code Violations 2026
          </h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>
            What DFW inspectors flag — select a violation to view the HVAC compliance guide
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
              <span style={{ background: v.severity === 'High' ? '#7f1d1d' : '#713f12', color: v.severity === 'High' ? '#fca5a5' : '#fde68a', borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>{v.severity}</span>
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
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>✅ Compliance Fix</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{active.fix}</div>
            </div>
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: 40, color: '#475569', fontSize: 13 }}>
          ProLnk · DFW Code Compliance Series 2026 · Always verify with local AHJ
        </div>
      </div>
    </div>
  );
}