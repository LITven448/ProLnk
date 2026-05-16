import { useState } from 'react';

const concerns = [
  {
    concern: 'System Sizing & Load Calculation',
    icon: '📐',
    quality: 'A quality DFW install begins with ACCA Manual J load calculation — documented and provided to homeowner. Sizing is based on your specific home: square footage, insulation R-value, window area, orientation, and infiltration rate.',
    redFlag: 'Contractor sizes by "rule of thumb" (1 ton per 500 sq ft) without calculation. This leads to oversized equipment that short-cycles, fails to dehumidify, and wears out faster.',
    demand: 'Ask for the Manual J report before work begins. Refuse any proposal that skips it.',
  },
  {
    concern: 'Permits & Inspection',
    icon: '📋',
    quality: 'Every HVAC replacement in DFW requires a permit from the local municipality. Permits ensure a city inspector verifies refrigerant handling, electrical connections, and equipment placement.',
    redFlag: 'Contractor offers to skip the permit to save money or time. This is illegal, voids manufacturer warranty, and becomes a problem at resale.',
    demand: 'Request the permit number before installation begins. Verify the inspection passed at closeout.',
  },
  {
    concern: 'Refrigerant Line Handling',
    icon: '🔩',
    quality: 'New refrigerant lines should be used on full replacements (not reused). Lines should be properly brazed, insulated with Armaflex, and routed without sharp bends. Nitrogen pressure test before charging.',
    redFlag: 'Old lines reused without flushing or inspection. No pressure test performed. Lines run in direct sunlight without UV-rated insulation.',
    demand: 'Ask specifically: "Will you replace the refrigerant lines?" and "Do you nitrogen pressure test before charging?"',
  },
  {
    concern: 'Airflow & Duct Verification',
    icon: '💨',
    quality: 'Duct system is tested for static pressure and airflow. Supply and return are balanced. If existing ductwork is leaky or undersized, contractor identifies this and provides options.',
    redFlag: 'New equipment installed on old, untested ductwork. No mention of duct leakage or static pressure. Supply/return balance never verified.',
    demand: 'Request a static pressure reading report. Ask if existing ductwork was inspected for leaks and proper sizing.',
  },
  {
    concern: 'Commissioning & Startup',
    icon: '✅',
    quality: 'After installation, contractor measures: supply/return temps, superheat and subcooling, refrigerant charge (verified by measurement, not guessed), total static pressure, and airflow at each register.',
    redFlag: 'System is started, set to cool, contractor leaves after 20 minutes. No measurements recorded. "Feels cold" is the only verification.',
    demand: 'Ask for the startup commissioning sheet — all values measured and documented. This is your proof the system is installed correctly.',
  },
];

export default function DFWHVACInstallQuality() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = concerns.find((c) => c.concern === selected) ?? null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>ProLnk · DFW HVAC</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', color: '#FFFFFF' }}>HVAC Installation Quality Guide</h1>
        <p style={{ color: '#9AA3B2', fontSize: 15, margin: '0 0 32px', lineHeight: 1.6 }}>
          Know what a proper DFW HVAC installation looks like — and exactly what to demand from your contractor.
        </p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
          {concerns.map((c) => (
            <button
              key={c.concern}
              onClick={() => setSelected(selected === c.concern ? null : c.concern)}
              style={{
                background: selected === c.concern ? '#132040' : '#0F1E35',
                border: `1.5px solid ${selected === c.concern ? '#F5E642' : '#1E2D45'}`,
                borderRadius: 10,
                padding: '14px 20px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <span style={{ fontSize: 26 }}>{c.icon}</span>
              <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15 }}>{c.concern}</span>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#132040', border: '1.5px solid #F5E642', borderRadius: 12, padding: '24px 28px' }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>{active.icon}</div>
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>{active.concern}</h2>

            <div style={{ marginBottom: 14 }}>
              <div style={{ color: '#4ADE80', fontWeight: 700, marginBottom: 6 }}>✅ Quality Standard</div>
              <p style={{ color: '#C8CDD8', lineHeight: 1.7, margin: 0 }}>{active.quality}</p>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ color: '#F87171', fontWeight: 700, marginBottom: 6 }}>🚩 Red Flag</div>
              <p style={{ color: '#C8CDD8', lineHeight: 1.7, margin: 0 }}>{active.redFlag}</p>
            </div>

            <div style={{ background: '#0F1E35', borderRadius: 8, padding: '14px 18px', borderLeft: '3px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>💬 What to Demand</div>
              <div style={{ color: '#9AA3B2', fontSize: 13, lineHeight: 1.6 }}>{active.demand}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}