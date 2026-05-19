import { useState } from 'react';

export default function DFWHVACRefrigerantCharge2026() {
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState('');

  const symptoms = [
    { id: 'warm-air', label: '🌡️ System runs constantly but blows warm air' },
    { id: 'frozen-lines', label: '🧊 Ice on refrigerant lines or indoor unit' },
    { id: 'high-bills', label: '📈 Electric bills up 25%+ with same usage' },
    { id: 'short-cycle', label: '🔄 System short-cycles (runs in short bursts)' },
    { id: 'new-install', label: '🏗️ New installation or post-repair startup' },
    { id: 'tech-suggested', label: '💬 Tech said system is low on refrigerant' },
  ];

  const recommendations: Record<string, string> = {
    'warm-air': '⚠️ REFRIGERANT CHECK INDICATED — Warm air with compressor running often means low refrigerant charge or a failed compressor. A certified HVAC tech will use manifold gauges to check high-side and low-side pressures. In DFW heat, a system 10% low on refrigerant loses up to 50% of cooling capacity. EPA 608 certification required to add refrigerant.',
    'frozen-lines': '🚨 STOP SYSTEM — Ice on lines indicates either severely low refrigerant or restricted airflow (dirty filter/coil). Turn AC off, run fan only to thaw, check filter. If it refreezes: call a tech. Low refrigerant and ice buildup damage compressors. Do not add refrigerant without finding the leak first.',
    'high-bills': '🔍 DIAGNOSE BEFORE ASSUMING REFRIGERANT — High bills are often from dirty coils or incorrect thermostat setpoints, not low refrigerant. A tech should perform subcooling/superheat measurements with manifold gauges before adding any refrigerant. Adding refrigerant to an already-correct charge wastes money and can damage the compressor.',
    'short-cycle': '🔧 NOT TYPICALLY REFRIGERANT — Short cycling usually indicates oversized equipment, refrigerant overcharge, dirty evaporator coil, or electrical issue. Have a tech check static pressure and run a full diagnostic. An overcharged system can damage the compressor — more refrigerant is not always the answer.',
    'new-install': '📋 VERIFY CHARGE BY WEIGHT — New systems should be charged by the weigh-in method, not pressure alone. Manufacturer spec sheets list the exact refrigerant weight for the system and line set length. Superheat and subcooling readings verify correct charge. Demand documentation from the installer.',
    'tech-suggested': '🔍 ASK FOR MEASUREMENTS — Before approving refrigerant addition, ask the tech for manifold gauge readings (high-side and low-side PSI), subcooling reading, and superheat reading. These numbers tell the full story. Also ask: where is the leak? R-410A and R-22 systems should not lose refrigerant without a leak. Fix the leak before recharging.',
  };

  const handleCheck = () => {
    if (symptom) setResult(recommendations[symptom] || '');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DFW Home Guide 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>DFW HVAC Refrigerant Charge Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: '2rem', fontSize: '1.05rem' }}>How techs properly check refrigerant charge in DFW. Manifold gauges, superheat, and subcooling tell the real story — not guesswork. Only EPA 608 certified techs can legally add refrigerant.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🔧', label: 'Best Method', value: 'Superheat + subcooling' },
            { icon: '⚖️', label: 'New Installs', value: 'Weigh-in method' },
            { icon: '🪪', label: 'Legal Requirement', value: 'EPA 608 certification' },
            { icon: '🔍', label: 'Key Insight', value: 'Find leak before recharge' },
          ].map(item => (
            <div key={item.label} style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '10px', padding: '1.2rem' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{item.label}</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>🔍 HVAC Symptom → Refrigerant Check Guide</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
            {symptoms.map(s => (
              <button key={s.id} onClick={() => setSymptom(s.id)}
                style={{ textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '8px', border: symptom === s.id ? '2px solid #F5E642' : '1px solid #1e3a5f', backgroundColor: symptom === s.id ? '#1a3060' : '#0A1628', color: '#fff', cursor: 'pointer', fontSize: '0.9rem' }}>
                {s.label}
              </button>
            ))}
          </div>
          <button onClick={handleCheck} disabled={!symptom}
            style={{ backgroundColor: symptom ? '#F5E642' : '#2a3a50', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', cursor: symptom ? 'pointer' : 'not-allowed', fontSize: '0.95rem', width: '100%' }}>
            Get Refrigerant Guidance →
          </button>
          {symptom && result && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0A1628', borderRadius: '8px', border: '1px solid #F5E642', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>📌 DFW Refrigerant Reality</h2>
          <p style={{ color: '#a0aec0', fontSize: '0.88rem', lineHeight: 1.7 }}>R-410A is the current DFW standard. R-22 (older systems) is now very expensive due to EPA phase-out — replacement may be more cost-effective than recharging old R-22 units. In DFW summers, a system 15% low on charge can run up to 50% longer to hit setpoint, massively increasing electric bills and compressor wear.</p>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#0f2040', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: '#a0aec0', fontSize: '0.8rem' }}>Need an EPA 608 certified HVAC tech in DFW? <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> connects you with vetted local pros.</p>
        </div>
      </div>
    </div>
  );
}