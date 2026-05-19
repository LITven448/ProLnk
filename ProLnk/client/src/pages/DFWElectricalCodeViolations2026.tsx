import { useState } from 'react';

const violations = [
  {
    id: 'gfci',
    icon: '🔌',
    title: 'Missing GFCI in Wet Areas',
    code: 'NEC 210.8(A)',
    description: 'Bathrooms, kitchens within 6 ft of sink, garages, outdoors, crawl spaces, and unfinished basements require GFCI protection.',
    fix: 'Install GFCI outlets or GFCI breakers at all required locations. Test with built-in test/reset buttons after installation.',
    severity: 'High',
  },
  {
    id: 'afci',
    icon: '🛏️',
    title: 'No AFCI in Bedrooms',
    code: 'NEC 210.12(A)',
    description: '2020 NEC and Dallas adopted code requires AFCI protection for all bedroom circuits including lighting.',
    fix: 'Install AFCI circuit breakers at the panel for all bedroom branch circuits. Combination-type AFCI required for new construction.',
    severity: 'High',
  },
  {
    id: 'grounding',
    icon: '⚡',
    title: 'Improper Grounding',
    code: 'NEC 250.50',
    description: 'Missing or improperly bonded ground rods, water pipe grounds, or equipment grounds create shock and fire hazards.',
    fix: 'Install two ground rods 6 ft apart or verified concrete-encased electrode. Bond all metallic systems. Verify with low-resistance continuity test.',
    severity: 'High',
  },
  {
    id: 'doubletap',
    icon: '🔀',
    title: 'Double-Tapped Breakers',
    code: 'NEC 408.41',
    description: 'Two conductors under one breaker terminal is prohibited unless breaker is specifically rated and listed for two conductors.',
    fix: 'Install tandem breaker rated for two conductors, or add sub-panel to provide additional circuit capacity.',
    severity: 'High',
  },
  {
    id: 'junctionbox',
    icon: '📦',
    title: 'Missing Junction Box Covers',
    code: 'NEC 314.28',
    description: 'All junction boxes, pull boxes, and handhole enclosures must be accessible with removable covers.',
    fix: 'Install appropriate cover plates on all junction boxes. Boxes must remain accessible — cannot be buried in walls or ceilings.',
    severity: 'Medium',
  },
  {
    id: 'aluminum',
    icon: '🔩',
    title: 'Aluminum to Copper Without Proper Connectors',
    code: 'NEC 110.14',
    description: 'Direct aluminum-to-copper connections cause galvanic corrosion, loose connections, arcing, and fires.',
    fix: 'Use CO/ALR rated devices, AlumiConn connectors, or purple wire nuts rated for aluminum-copper combinations. Apply anti-oxidant compound.',
    severity: 'High',
  },
];

export default function DFWElectricalCodeViolations2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = violations.find(v => v.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>
            DFW Common Electrical Code Violations 2026
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