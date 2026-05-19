import { useState } from 'react';

const cities = [
  { name: 'Dallas', permit: true, hoa: false, notes: 'Building permit required from Dallas Development Services. Submit site plan + equipment specs.', timeline: '3-4 weeks', fee: '$150-$400' },
  { name: 'Fort Worth', permit: true, hoa: true, notes: 'Permit from FW Development + HOA approval needed. Roof-mount requires structural analysis.', timeline: '2-4 weeks', fee: '$100-$300' },
  { name: 'Frisco', permit: true, hoa: true, notes: 'Permit from Frisco Building Inspections + HOA review. HOA may restrict panel visibility.', timeline: '3-5 weeks', fee: '$200-$450' },
  { name: 'Plano', permit: true, hoa: false, notes: 'Permit from Plano Building Inspections. Electrical permit also required for inverter/interconnect.', timeline: '2-3 weeks', fee: '$125-$350' },
  { name: 'McKinney', permit: true, hoa: false, notes: 'Permit from McKinney Community Development. Submit system diagrams and load calculations.', timeline: '2-3 weeks', fee: '$100-$275' },
  { name: 'Arlington', permit: true, hoa: false, notes: 'Permit from Arlington Development Services. Utility interconnect approval also required.', timeline: '2-4 weeks', fee: '$150-$350' },
  { name: 'Garland', permit: true, hoa: false, notes: 'Permit from Garland Building Inspections. Separate electrical permit for battery storage.', timeline: '2-3 weeks', fee: '$100-$250' },
];

export default function DFWSolarPermitGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const city = cities.find(c => c.name === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>☀️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW Solar Permit Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Permit requirements for solar panel installation across DFW cities</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12, fontSize: 14 }}>⚡ KEY RULES — ALL DFW CITIES</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {['Building permit always required','Electrical permit for inverter','Utility interconnect approval','Licensed electrician must sign off','Final inspection before activation','Net metering paperwork with utility'].map(r => (
              <div key={r} style={{ background: '#1a2f50', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#cbd5e1' }}>✅ {r}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Select your DFW city:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8 }}>
            {cities.map(c => (
              <button key={c.name} onClick={() => setSelected(c.name)}
                style={{ background: selected === c.name ? '#F5E642' : '#1a2f50', color: selected === c.name ? '#0A1628' : '#fff', border: '1px solid #2a4070', borderRadius: 8, padding: '10px 8px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {city && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 800, marginBottom: 16 }}>☀️ {city.name} — Solar Permit Guide</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>PERMIT REQUIRED</p>
                <p style={{ color: city.permit ? '#4ade80' : '#f87171', fontWeight: 700 }}>{city.permit ? '✅ Yes — Building + Electrical' : '❌ No permit required'}</p>
              </div>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>HOA APPROVAL</p>
                <p style={{ color: city.hoa ? '#fbbf24' : '#4ade80', fontWeight: 700 }}>{city.hoa ? '⚠️ Required — check HOA rules before applying' : '✅ Not required citywide (check your HOA)'}</p>
              </div>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>WHAT TO SUBMIT</p>
                <p style={{ color: '#e2e8f0', fontSize: 14 }}>{city.notes}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                  <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>TIMELINE</p>
                  <p style={{ color: '#F5E642', fontWeight: 700 }}>📅 {city.timeline}</p>
                </div>
                <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                  <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>PERMIT FEE (EST.)</p>
                  <p style={{ color: '#F5E642', fontWeight: 700 }}>💰 {city.fee}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: 'center', color: '#475569', fontSize: 13 }}>
          <p>ProLnk connects DFW homeowners with licensed solar installers who handle permits for you.</p>
        </div>
      </div>
    </div>
  );
}