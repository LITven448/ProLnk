import { useState } from 'react';

export default function DFWHVACSuperchargeGuide2026() {
  const [systemAge, setSystemAge] = useState('');
  const [startupBehavior, setStartupBehavior] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    const age = parseInt(systemAge);
    if (!systemAge || !startupBehavior) { setResult('Please fill in both fields.'); return; }
    if (age >= 10 && startupBehavior === 'struggles') {
      setResult('HIGH PRIORITY: Hard start kit strongly recommended. Your aging compressor under DFW summer heat stress is at real risk. A $150-250 kit could extend life 2-5 years and prevent a $3,000+ compressor replacement.');
    } else if (age >= 10 && startupBehavior === 'normal') {
      setResult('PREVENTIVE: Hard start kit is a worthwhile investment. Systems 10+ years in DFW heat benefit from the added starting torque even before symptoms appear. Ask your HVAC tech at next tune-up.');
    } else if (age < 10 && startupBehavior === 'struggles') {
      setResult('INVESTIGATE: Struggling startup on a newer system warrants diagnosis first. Could be refrigerant issue, capacitor failure, or electrical supply problem. Get a tech to evaluate before adding a hard start kit.');
    } else {
      setResult('MONITOR: Your system is young and starting normally. No hard start kit needed now. Reassess at 8-10 years or if you notice hesitation on startup during peak DFW summer heat.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Hard Start Kit Guide for DFW AC Compressors</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>DFW brutal summer heat pushes AC compressors to the edge on every startup. A hard start kit adds the extra torque needed to protect your system — here is when you actually need one.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>Why DFW Is Especially Hard on Compressors</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['Brownout Conditions', 'Summer peak demand causes voltage drops, stressing compressor starts'],
              ['High Head Pressure', 'Hot outdoor temps mean refrigerant pressure is maxed on startup'],
              ['Hard Start Effect', 'Kit adds start capacitor + relay to boost starting torque 400-600%'],
              ['Life Extension', 'Reduces startup stress — extends compressor life 2-5 years in DFW heat']
            ].map(([title, desc]) => (
              <div key={title} style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4, fontSize: 14 }}>{title}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>Hard Start Kit Basics</h2>
          {[
            ['What it is', 'A start capacitor paired with a potential relay — boosts compressor starting torque'],
            ['Cost range', '$150-$250 installed by a licensed DFW HVAC tech'],
            ['Best candidates', 'Systems 10+ years old, especially in areas with voltage fluctuations'],
            ['Not a cure-all', 'Will not fix a failing compressor — diagnostic first if compressor is already weak']
          ].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#94a3b8', fontSize: 14 }}>{label}</span>
              <span style={{ fontWeight: 600, fontSize: 14, maxWidth: '60%', textAlign: 'right' }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>Should You Get One?</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>AC System Age (years)</label>
            <input
              value={systemAge}
              onChange={e => setSystemAge(e.target.value)}
              type="number"
              placeholder="e.g. 12"
              style={{ background: '#1a2f50', border: '1px solid #2d4a7a', borderRadius: 8, padding: '10px 14px', color: '#fff', width: '100%', fontSize: 14 }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Startup Behavior on Hot Days</label>
            <select
              value={startupBehavior}
              onChange={e => setStartupBehavior(e.target.value)}
              style={{ background: '#1a2f50', border: '1px solid #2d4a7a', borderRadius: 8, padding: '10px 14px', color: '#fff', width: '100%', fontSize: 14 }}
            >
              <option value="">Select behavior...</option>
              <option value="normal">Starts normally — no hesitation</option>
              <option value="struggles">Hesitates or struggles before starting</option>
            </select>
          </div>
          <button
            onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer', width: '100%' }}
          >
            Get My Assessment
          </button>
          {result && (
            <div style={{ marginTop: 16, background: '#1a2f50', borderRadius: 8, padding: 14, fontSize: 14, lineHeight: 1.6 }}>{result}</div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Find a Vetted DFW HVAC Tech via ProLnk</div>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>All ProLnk HVAC professionals are background-checked, licensed, and experienced with DFW summer conditions. Request a hard start kit evaluation today.</p>
        </div>
      </div>
    </div>
  );
}
