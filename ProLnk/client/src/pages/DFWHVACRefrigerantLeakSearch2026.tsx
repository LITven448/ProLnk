import { useState } from 'react';

export default function DFWHVACRefrigerantLeakSearch2026() {
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState('');

  const symptoms = [
    { id: 'warm_air', label: 'AC blowing warm air' },
    { id: 'ice_buildup', label: 'Ice on refrigerant lines' },
    { id: 'hissing_sound', label: 'Hissing or bubbling sound' },
    { id: 'high_bills', label: 'High bills, poor cooling' },
  ];

  const methods: Record<string, { primary: string; steps: string[] }> = {
    warm_air: {
      primary: 'Electronic + Pressure Test',
      steps: [
        '🔬 Electronic leak detector (halogen sniffer) swept around all joints',
        '❄️ DFW evaporator coils are #1 leak location — check first',
        '🧪 Nitrogen pressure test confirms total system integrity (no refrigerant needed)',
        '⚠️ Low refrigerant causes warm air — do not just add refrigerant without finding leak',
        '✅ ProLnk techs always find source before recharge',
      ],
    },
    ice_buildup: {
      primary: 'UV Dye Injection',
      steps: [
        '🟡 UV dye injected into refrigerant circuit — circulates to leak point',
        '🔦 UV light reveals dye at exact leak location (even tiny coil pinhole)',
        '❄️ Ice on lines = refrigerant starved — leak or restriction',
        '🌀 Let system thaw completely before pressure testing',
        '✅ UV dye stays in system — future checks easier',
      ],
    },
    hissing_sound: {
      primary: 'Bubble Solution + Electronic Detector',
      steps: [
        '🫧 Audible hiss = significant leak — often at Schrader valve or fitting',
        '🫧 Bubble solution applied to accessible connections while pressurized',
        '🔬 Electronic detector confirms and pinpoints source',
        '⚡ Large leaks lose refrigerant fast — DFW summer heat makes this urgent',
        '✅ Repair fitting first, then system pressure test before recharge',
      ],
    },
    high_bills: {
      primary: 'Nitrogen Pressure Test + UV Dye',
      steps: [
        '🌡️ Slow leak = system works but runs constantly — expensive in DFW summer',
        '🧪 Nitrogen pressure test: pressurize, hold 24 hrs, check for drop',
        '🟡 UV dye injection finds slow coil pin-hole leaks electronic detector misses',
        '📉 Slow leaks typically at coil — DFW humidity accelerates coil corrosion',
        '✅ Formicary corrosion from DFW air quality is common in copper coils',
      ],
    },
  };

  const handleSymptom = (id: string) => { setSymptom(id); setResult(id); };
  const current = methods[result];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>❄️ DFW HVAC Refrigerant Leak Search Guide 2026</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>How DFW HVAC technicians find refrigerant leaks and which method fits your situation.</p>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🔍 Leak Detection Methods</div>
          {[
            { icon: '🔬', name: 'Electronic Detector', desc: 'Halogen sniffer sweeps joints — fast, misses tiny leaks.' },
            { icon: '🟡', name: 'UV Dye + Light', desc: 'Injected dye glows at leak point — best for coil pin-holes.' },
            { icon: '🧪', name: 'Nitrogen Pressure Test', desc: 'No refrigerant needed — pressurize and watch for pressure drop.' },
            { icon: '🫧', name: 'Bubble Solution', desc: 'Soap bubbles on fittings — best for audible/large leaks.' },
          ].map((item) => (
            <div key={item.name} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div><div style={{ fontWeight: 600 }}>{item.name}</div><div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item.desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🎯 My Leak Symptom</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            {symptoms.map((s) => (
              <button key={s.id} onClick={() => handleSymptom(s.id)} style={{ backgroundColor: symptom === s.id ? '#F5E642' : '#1a2f50', color: symptom === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: '8px', padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>{s.label}</button>
            ))}
          </div>
          {current && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Recommended Method: {current.primary}</div>
              {current.steps.map((step, i) => <div key={i} style={{ color: '#e2e8f0', marginBottom: '0.4rem', fontSize: '0.9rem' }}>{step}</div>)}
              <div style={{ marginTop: '1rem', color: '#F5E642', fontSize: '0.85rem' }}>ProLnk matches you with EPA 608-certified DFW techs who find leaks before recharging. 🛡️</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
