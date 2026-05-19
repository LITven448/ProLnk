import { useState } from 'react';

export default function DFWHVACFoundationElecInterplay2026() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState('');

  const concerns = [
    { id: 'hvac_found', label: '🔧 HVAC issues + Foundation cracks' },
    { id: 'elec_found', label: '⚡ Electrical panel issues + Foundation' },
    { id: 'hvac_elec', label: '❄️ HVAC not working + Electrical problems' },
    { id: 'all_three', label: '🏠 All three systems acting up' },
  ];

  const results: Record<string, string> = {
    hvac_found: 'Foundation movement in DFW clay soil separates HVAC ductwork at joints — causing air loss and higher bills. Gas line connections near slab can crack under pressure. A ProLnk match sends both HVAC and foundation pros for a coordinated assessment.',
    elec_found: 'Your electrical panel (often in the garage) sits on the slab. As foundation settles unevenly, conduit can pull loose and panel doors misalign — a fire hazard. Foundation repair should precede electrical work in DFW homes with active settling.',
    hvac_elec: 'HVAC units draw significant electrical load. If foundation settling has disrupted your electrical panel or outdoor disconnect, the HVAC unit may cycle incorrectly. Both trades need to assess simultaneously — ProLnk coordinates multi-trade scheduling.',
    all_three: 'DFW expansive clay creates a cascade: foundation moves → ductwork separates (HVAC efficiency drops) → electrical conduit pulls at panel. ProLnk Home Health Vault documents all three systems, giving future buyers and pros full history.',
  };

  function assess() {
    if (concern) setResult(results[concern]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>DFW HOME SYSTEMS — MULTI-TRADE GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW HVAC, Foundation & Electrical Interaction Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>How DFW home systems affect each other — and why multi-trade coordination matters.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🏗️', title: 'Foundation → HVAC Ductwork', body: 'DFW Blackland Prairie clay shifts seasonally. As the slab moves, flex duct connections pull apart at joints. Homes lose 20-30% of conditioned air into attic or crawlspace — driving up energy bills without an obvious cause.' },
            { icon: '⚡', title: 'Foundation → Electrical Panel', body: 'Garage slabs often settle independently. An uneven garage slab causes the electrical panel to rack, making breakers hard to reset and conduit connections to loosen. This is a code and safety issue that requires both foundation and electrical assessment.' },
            { icon: '🔥', title: 'Foundation → Gas Lines', body: 'Gas lines entering the slab or running along the foundation perimeter can develop micro-cracks under differential settlement stress. HVAC and water heater connections are the highest-risk points in DFW clay soil homes.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#112240', borderRadius: 12, padding: 20, display: 'flex', gap: 16 }}>
              <div style={{ fontSize: 32 }}>{c.icon}</div>
              <div>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔍 Multi-System Interaction Assessment</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16, fontSize: 14 }}>What is your concern?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => { setConcern(c.id); setResult(''); }}
                style={{ background: concern === c.id ? '#F5E642′ : '#1e3a5f', color: concern === c.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
                {c.label}
              </button>
            ))}
          </div>
          <button onClick={assess} disabled={!concern}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 800, cursor: concern ? 'pointer' : 'not-allowed', opacity: concern ? 1 : 0.5 }}>
            Show Interaction Assessment →
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642′ }}>
              <p style={{ color: '#fff', lineHeight: 1.6 }}>{result}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16, marginBottom: 8 }}>🏠 ProLnk Connects All Three Trades</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>One request → HVAC, foundation, and electrical pros coordinated and dispatched. Health Vault documents all three for your home's permanent record.</div>
        </div>
      </div>
    </div>
  );
}
