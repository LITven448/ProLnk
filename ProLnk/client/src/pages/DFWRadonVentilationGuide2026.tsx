import { useState } from 'react';

export default function DFWRadonVentilationGuide2026() {
  const [result, setResult] = useState<string | null>(null);

  const testResults = [
    { id: 'low', label: '✅ Below 2 pCi/L', tip: 'DFW typical range. No action required — north Texas geology (limestone/clay) produces lower radon than Rocky Mountain states. Retest every 2 years as foundation settles.' },
    { id: 'moderate', label: '⚠️ 2–4 pCi/L', tip: 'EPA recommends considering mitigation above 2 pCi/L. Seal visible foundation cracks, improve basement ventilation. Retest in 90 days after sealing.' },
    { id: 'elevated', label: '🔴 4–8 pCi/L', tip: 'Above EPA action level of 4 pCi/L — install sub-slab depressurization (ASD) system. ASD pulls radon from soil before it enters through foundation. Cost: $800–2,500 in DFW.' },
    { id: 'high', label: '🚨 Above 8 pCi/L', tip: 'High for DFW — rare but requires immediate ASD installation. Consider professional continuous monitor post-mitigation. ASD systems typically reduce levels by 90–99%.' },
  ];

  const facts = [
    { icon: '🗺️', stat: 'Zone 3', label: 'DFW EPA radon zone — lower risk than Zones 1/2 but testing still recommended' },
    { icon: '⬇️', stat: '4 pCi/L', label: 'EPA action level — mitigation recommended above this threshold' },
    { icon: '🏗️', stat: 'ASD System', label: 'Active sub-slab depressurization — gold standard mitigation method' },
    { icon: '📉', stat: '90–99%', label: 'Radon reduction achieved by properly installed ASD systems' },
  ];

  const steps = [
    { icon: '🧪', title: 'Test First', desc: '90-day alpha track test ($15–30) gives most accurate reading — short-term kits available at hardware stores' },
    { icon: '🔩', title: 'Seal Entry Points', desc: 'Caulk foundation cracks, seal sump pit, plug floor drains — reduces radon entry without active system' },
    { icon: '⚙️', title: 'ASD Installation', desc: 'Licensed contractor installs PVC pipe through slab + inline fan to vent radon to exterior — $800–2,500′ },
    { icon: '📊', title: 'Post-Test', desc: 'Retest 24–30 hours after system activation to verify effectiveness — reputable contractors guarantee results' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>☢️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW Home Ventilation for Radon 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>North Texas has lower radon risk — but testing is still the only way to know your home is safe</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {facts.map(f => (
            <div key={f.stat} style={{ background: '#122040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28 }}>{f.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>{f.stat}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{f.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📊 What Is Your Test Result?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {testResults.map(r => (
              <button key={r.id} onClick={() => setResult(r.id === result ? null : r.id)}
                style={{ background: result === r.id ? '#F5E642′ : '#1e3a5f', color: result === r.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 10, padding: '14px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
                {r.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#1e3a5f', borderLeft: '4px solid #F5E642', borderRadius: '0 10px 10px 0', padding: 20, marginTop: 16 }}>
              <p style={{ margin: 0, color: '#e2e8f0', fontSize: 15, lineHeight: 1.6 }}>{testResults.find(r => r.id === result)?.tip}</p>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {steps.map(s => (
            <div key={s.title} style={{ background: '#122040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', margin: '8px 0 6px', fontSize: 15 }}>{s.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#122040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🏠 DFW Radon Context</h2>
          {['DFW sits on EPA Zone 3 — predicted average indoor radon below 2 pCi/L','Limestone and clay geology reduces radon movement vs granite-rich soils up north','Test during home sale — buyers increasingly request radon test results in DFW','Slab-on-grade construction (common in DFW) can still have elevated radon in specific lots','New construction: radon-resistant features cost $300 upfront vs $1,500+ to retrofit later'].map(item => (
            <div key={item} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642′ }}>→</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
