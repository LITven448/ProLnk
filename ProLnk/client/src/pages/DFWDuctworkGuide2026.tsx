import { useState } from 'react';

export default function DFWDuctworkGuide2026() {
  const [homeAge, setHomeAge] = useState(20);
  const [result, setResult] = useState('');

  const assess = () => {
    if (homeAge <= 10) setResult('✅ Low Risk: Modern ductwork likely in good shape. Schedule a duct leakage test every 5 years. Verify attic duct insulation is at least R-8.');
    else if (homeAge <= 20) setResult('⚠️ Moderate Risk: Flex duct connections may have loosened. A blower door test is recommended. Sealing alone could save $300-500/year.');
    else if (homeAge <= 30) setResult('🔴 High Risk: Ductwork may be original to the home. Expect 25-30% energy loss. Full duct replacement typically costs $3,000-7,000 but delivers 20-30% energy savings.');
    else setResult('🚨 Critical: Ducts this old likely have asbestos tape, extreme leakage, or complete failure. Immediate professional inspection required before running system.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>🏠 DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Ductwork Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>Leaky ducts cost DFW homeowners $400-800/year — here's how to find and fix them</p>

        <div style={{ background: '#0f2444', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12, fontSize: 18 }}>⚠️ The DFW Attic Problem</div>
          <div style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.7 }}>
            DFW attics reach <strong style={{ color: '#F5E642' }}>130-145°F</strong> in summer. Most homes run ductwork through these attics. Even small leaks dump expensive conditioned air into a superheated space — forcing your AC to run 20-30% longer.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🔍', title: 'Signs of Duct Problems', body: 'Rooms that won’t cool below 78°F, high electric bills vs. neighbors, dusty vents, AC running constantly, musty smell from vents.' },
            { icon: '🧪', title: 'Blower Door Test', body: '$300-500 professional test quantifies duct leakage. Results show CFM25 — target under 8% of system capacity. Many DFW homes test at 20-35%.' },
            { icon: '🔧', title: 'Sealing vs Replacement', body: 'Sealing with mastic or Aeroseal ($1,200-2,500) fixes minor leaks. Full replacement ($3,000-7,000) needed for collapsed or severely degraded ductwork.' },
            { icon: '🌡️', title: 'Attic Insulation Impact', body: 'Wrap attic ducts in R-8 minimum. Radiant barrier on roof deck reduces radiant heat load 25-40°F — less heat soaking through duct walls.' },
          ].map((card) => (
            <div key={card.title} style={{ background: '#0f2444', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.5 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2444', borderRadius: 12, padding: 24, border: '1px solid #F5E642', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🔍 Ductwork Risk Assessment</h2>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8' }}>Home age: <strong style={{ color: '#F5E642' }}>{homeAge} years</strong></label>
          <input type="range" min={1} max={50} value={homeAge} onChange={(e) => setHomeAge(Number(e.target.value))}
            style={{ width: '100%', marginBottom: 16, accentColor: '#F5E642' }} />
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Assess My Ductwork Risk
          </button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ background: '#0f2444', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>💡 ProLnk Tip</div>
          <div style={{ color: '#cbd5e1', fontSize: 14 }}>ProLnk matches DFW homeowners with duct-testing specialists who use Aeroseal technology. Average DFW duct sealing job pays back in under 3 years.</div>
        </div>
      </div>
    </div>
  );
}
