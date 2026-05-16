import { useState } from 'react';

const violations = [
  {
    id: 'ptrap',
    icon: '🚿',
    title: 'Missing or Improper P-Trap',
    code: 'IPC 1002.1',
    description: 'Every fixture drain must have a P-trap. Missing, dry, or S-trap configurations fail inspection.',
    fix: 'Install approved P-trap within 24 inches of fixture outlet. S-traps are not permitted under current IPC.',
    severity: 'High',
  },
  {
    id: 'venting',
    icon: '🏗️',
    title: 'Improper or Missing Venting',
    code: 'IPC 903.1',
    description: 'Drain lines without proper venting cause siphoning, gurgling, and sewer gas entry.',
    fix: 'Install individual, common, or wet venting per IPC Chapter 9. Air admittance valves allowed in specific locations.',
    severity: 'High',
  },
  {
    id: 'pipematerial',
    icon: '🔧',
    title: 'Wrong Pipe Material for Hot Water',
    code: 'IPC 605.1',
    description: 'PVC is not rated for hot water supply lines. Only CPVC, PEX, or copper approved for hot water.',
    fix: 'Replace PVC hot water supply lines with CPVC, PEX-A, PEX-B, or Type L copper rated for 180°F.',
    severity: 'High',
  },
  {
    id: 'waterheater',
    icon: '♨️',
    title: 'Non-CPVC Above Water Heater',
    code: 'IPC 605.3',
    description: 'Standard PEX cannot connect directly above a gas water heater flue. Heat degrades PEX connections.',
    fix: 'Use CPVC or copper for the first 18 inches above water heater. Transition to PEX after heat dissipates.',
    severity: 'Medium',
  },
  {
    id: 'gaselectric',
    icon: '⚡',
    title: 'Gas Line Too Close to Electrical',
    code: 'NFPA 54 / IRC G2412',
    description: 'Gas piping must maintain clearance from electrical panels, meters, and open wiring.',
    fix: 'Maintain 3-inch minimum clearance from electrical panels. Re-route gas line or relocate electrical components.',
    severity: 'High',
  },
  {
    id: 'backflow',
    icon: '🌿',
    title: 'No Backflow Preventer on Irrigation',
    code: 'IPC 608.1 / City of Dallas',
    description: 'Irrigation systems connected to potable water require backflow prevention to protect the water supply.',
    fix: 'Install approved pressure vacuum breaker (PVB) or reduced pressure zone (RPZ) device per local water authority.',
    severity: 'High',
  },
];

export default function DFWPlumbingCodeViolations2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = violations.find(v => v.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🚰</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>
            DFW Common Plumbing Code Violations 2026
          </h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>
            What DFW inspectors flag — select a violation to view the compliance guide
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