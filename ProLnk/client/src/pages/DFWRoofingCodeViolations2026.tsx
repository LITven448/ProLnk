import { useState } from 'react';

const violations = [
  {
    id: 'dripedge',
    icon: '🌧️',
    title: 'Missing Drip Edge',
    code: 'IRC R905.2.8.5',
    description: 'Drip edge is required at eaves and rakes. Without it, water wicks under shingles causing fascia rot and soffit damage.',
    fix: 'Install minimum 26-gauge galvanized or aluminum drip edge at all eaves (under underlayment) and all rakes (over underlayment). Lap joints 2 inches minimum.',
    severity: 'High',
  },
  {
    id: 'nailing',
    icon: '🔨',
    title: 'Improper Nailing Pattern',
    code: 'IRC R905.2.6 / Manufacturer Specs',
    description: 'Roofing nails placed too high (high-nailing) or too few per shingle void manufacturer warranty and fail wind uplift requirements.',
    fix: 'Use 4 nails minimum per shingle in the nail zone (1 inch above cut-outs). 6 nails required in high-wind zones. Use 1-1/4 inch roofing nails minimum.',
    severity: 'High',
  },
  {
    id: 'valleymetal',
    icon: '📐',
    title: 'Valley Metal Gauge Too Light',
    code: 'IRC R905.2.8.2',
    description: 'Open valley metal must be minimum 26-gauge galvanized steel or 0.019-inch aluminum. Lighter material corrodes and fails prematurely.',
    fix: 'Install minimum 24-inch wide 26-gauge G-90 galvanized steel valley metal. Center-crimp and paint if exposed. Seal all laps with roofing cement.',
    severity: 'Medium',
  },
  {
    id: 'overlap',
    icon: '📏',
    title: 'Insufficient Shingle Overlap',
    code: 'IRC R905.2.8 / IRC Table R905.2.8.2',
    description: 'Standard 3-tab shingles require 2-inch minimum headlap. Architectural shingles require manufacturer-specified exposure. Under-lapping causes leaks.',
    fix: 'Verify shingle exposure matches manufacturer specs — typically 5 inches for 3-tab, 5-5/8 inches for architectural. Re-lay courses that do not meet minimum headlap.',
    severity: 'High',
  },
  {
    id: 'icewater',
    icon: '🧊',
    title: 'Missing Ice and Water at Eaves',
    code: 'IRC R905.1.2',
    description: 'Texas code requires ice and water shield from eave to 24 inches inside the warm wall line in climate zones with heating requirements.',
    fix: 'Apply self-adhering ice and water barrier at all eaves extending at least 24 inches inside the exterior wall line. Overlap courses 6 inches minimum.',
    severity: 'High',
  },
  {
    id: 'flashing',
    icon: '🏗️',
    title: 'Improper Flashing at Penetrations',
    code: 'IRC R903.2',
    description: 'Pipe boots, skylights, chimneys, and walls require counter-flashing and step flashing. Missing or improperly integrated flashing is the top leak cause.',
    fix: 'Install step flashing at walls (one piece per shingle course). Use two-piece counter-flashing at chimneys. Replace worn pipe boots. Seal all gaps with approved roofing sealant.',
    severity: 'High',
  },
];

export default function DFWRoofingCodeViolations2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = violations.find(v => v.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>
            DFW Common Roofing Code Violations 2026
          </h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>
            What DFW inspectors flag — select a violation to view the roofing compliance guide
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