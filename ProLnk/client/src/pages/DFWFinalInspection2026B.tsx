import { useState } from 'react';

const findings = [
  {
    id: 'smokedetector',
    icon: '🔥',
    title: 'Smoke Detectors in Wrong Locations',
    code: 'IRC R314.3 / NFPA 72',
    description: 'Smoke detectors required outside each sleeping area, inside each bedroom, and on every level including basement. Wrong locations miss sleeping area protection.',
    fix: 'Install smoke detector: (1) inside each bedroom, (2) outside each bedroom within 21 feet of door, (3) each additional story. All must be interconnected.',
    severity: 'High',
  },
  {
    id: 'codetector',
    icon: '💨',
    title: 'CO Detector Not Within 15 Feet of Sleeping Area',
    code: 'IRC R315.2',
    description: 'Carbon monoxide detectors must be installed outside each sleeping area within 15 feet of any bedroom door — not just anywhere on the floor.',
    fix: 'Place CO detector in the hallway within 15 feet of all bedroom doors. Hardwired with battery backup required for new construction in most DFW jurisdictions.',
    severity: 'High',
  },
  {
    id: 'garagegfci',
    icon: '🚗',
    title: 'Missing GFCI in Garage',
    code: 'NEC 210.8(A)(2)',
    description: 'All 125-volt, 15 and 20-amp receptacles in garages (attached and detached) require GFCI protection. Garage circuits are frequently overlooked.',
    fix: 'Install GFCI outlet or GFCI breaker covering all garage receptacles. Include unfinished areas and attached storage. Test each outlet after installation.',
    severity: 'High',
  },
  {
    id: 'handrail',
    icon: '🪜',
    title: 'Handrail Not Graspable',
    code: 'IRC R311.7.8',
    description: 'Handrails must be graspable — circular rails 1-1/4 to 2 inch diameter, or non-circular with specific grip dimensions. Flat-top rails fail code.',
    fix: 'Replace non-graspable rails with circular pipe 1-1/2 inch OD or use profiled rail with 1-1/4 inch minimum grip cross-section. Mount 34-38 inches above stair nosing.',
    severity: 'Medium',
  },
  {
    id: 'egress',
    icon: '🪟',
    title: 'Bedroom Window Egress Non-Compliant',
    code: 'IRC R310.1',
    description: 'Egress windows must have 5.7 sq ft net clear opening (5.0 for grade floor), minimum 24-inch height, 20-inch width, 44-inch sill height max.',
    fix: 'Measure net clear opening of all bedroom windows. Replace non-compliant windows or add compliant egress window. Document all dimensions on inspection card.',
    severity: 'High',
  },
  {
    id: 'weatherstrip',
    icon: '🚪',
    title: 'Garage-to-House Door Not Fire-Rated',
    code: 'IRC R302.5.1',
    description: 'Door between attached garage and living space must be 1-3/8 inch solid wood, solid steel, or 20-minute fire-rated. Standard hollow-core doors fail.',
    fix: 'Replace door with 20-minute fire-rated door assembly including frame and self-closing hardware. Label must be visible. Solid-core wood or steel acceptable per IRC.',
    severity: 'High',
  },
];

export default function DFWFinalInspection2026B() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = findings.find(v => v.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>📋</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>
            DFW Final Inspection Deep Dive 2026 — Part 2
          </h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>
            What gets missed in DFW final inspections — select a finding to view the compliance guide
          </p>
        </div>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {findings.map(v => (
            <button key={v.id} onClick={() => setSelected(selected === v.id ? null : v.id)}
              style={{ background: selected === v.id ? '#1a2f50′ : '#0F1F38', border: selected === v.id ? '2px solid #F5E642' : '2px solid #1E3A5F', borderRadius: 10, padding: '16px 20px', textAlign: ’left', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 28 }}>{v.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{v.title}</div>
                <div style={{ color: '#8899AA', fontSize: 13, marginTop: 2 }}>Code: {v.code}</div>
              </div>
              <span style={{ background: v.severity === 'High' ? '#7f1d1d' : '#713f12', color: v.severity === 'High' ? '#fca5a5′ : '#fde68a', borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>{v.severity}</span>
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