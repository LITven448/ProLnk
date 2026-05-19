import { useState } from 'react';

const emergencies = [
  {
    type: 'Gas Smell',
    icon: '🔥',
    action: 'Leave immediately — do not flip switches. Call Atmos Energy 24/7.',
    contact: 'Atmos Energy: 888-286-6700',
    steps: ['Exit building immediately', 'Do not use lights or appliances', 'Call from outside or neighbor', 'Do not re-enter until cleared'],
  },
  {
    type: 'Water Flooding',
    icon: '💧',
    action: 'Shut off main water valve immediately. Usually at front curb or under sink.',
    contact: 'Dallas Water: 214-651-1441 | Fort Worth Water: 817-392-4477',
    steps: ['Locate main shutoff (front yard/garage)', 'Turn clockwise to close', 'Call plumber for emergency repair', 'Document damage for insurance'],
  },
  {
    type: 'Electrical Sparks',
    icon: '⚡',
    action: 'Shut off the breaker panel immediately. Do not touch sparking outlets.',
    contact: 'TDLR Licensed Electrician — find at tdlr.texas.gov',
    steps: ['Go to breaker panel', 'Flip main breaker OFF', 'Do not use water near electrical', 'Call TDLR-licensed electrician only'],
  },
  {
    type: 'HVAC Failure (Summer)',
    icon: '❄️',
    action: 'DFW heat is dangerous. Get emergency HVAC match via ProLnk immediately.',
    contact: 'ProLnk Emergency Match: prolnk.io | Dallas 311: 311',
    steps: ['Turn off HVAC to prevent damage', 'Open windows if below 90°F outside', 'Move to cool space or hotel', 'Request emergency match at prolnk.io'],
  },
];

export default function DFWHomeEmergencyQuickRef2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>🚨</div>
          <h1 style={{ color: '#F5E642', fontSize: '24px', fontWeight: '700', margin: '0 0 8px' }}>DFW Home Emergency Quick Reference 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Select your emergency type for immediate action steps</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {emergencies.map((e, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ backgroundColor: selected === i ? '#1a2f4a' : '#0f2035', border: selected === i ? '2px solid #F5E642′ : '2px solid #1e3a5f', borderRadius: '12px', padding: '20px', cursor: ’pointer', textAlign: 'left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{e.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '15px' }}>{e.type}</div>
            </button>
          ))}
        </div>
        {selected !== null && (
          <div style={{ backgroundColor: '#0f2035', border: '2px solid #F5E642', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '32px' }}>{emergencies[selected].icon}</span>
              <h2 style={{ color: '#F5E642', fontSize: '20px', margin: 0 }}>{emergencies[selected].type}</h2>
            </div>
            <p style={{ color: '#e2e8f0', fontSize: '15px', marginBottom: '16px', lineHeight: '1.6′ }}>{emergencies[selected].action}</p>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
              <div style={{ color: '#F5E642', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>📞 CONTACT</div>
              <div style={{ color: '#94a3b8', fontSize: '13px' }}>{emergencies[selected].contact}</div>
            </div>
            <div>
              <div style={{ color: '#F5E642', fontSize: '13px', fontWeight: '700', marginBottom: '10px' }}>IMMEDIATE STEPS</div>
              {emergencies[selected].steps.map((s, j) => (
                <div key={j} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
                  <span style={{ backgroundColor: '#F5E642', color: '#0A1628', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', flexShrink: 0, marginTop: '1px' }}>{j + 1}</span>
                  <span style={{ color: '#cbd5e1', fontSize: '14px' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '24px', color: '#475569', fontSize: '12px' }}>
          ProLnk Emergency Match available 24/7 at prolnk.io — DFW's trusted home services network
        </div>
      </div>
    </div>
  );
}