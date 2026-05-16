import { useState } from 'react';

export default function DFWAluminumWiringGuide2026() {
  const [vintage, setVintage] = useState('');

  const vintages = [
    { id: 'pre1965', label: '📅 Built Before 1965', risk: 'Low', color: '#4ade80', note: 'Homes built before 1965 typically have copper wiring. Aluminum wiring was not yet widely used. Focus on knob-and-tube and cloth-wrapped wire concerns instead.' },
    { id: '1965-1968', label: '📅 1965–1968', risk: 'Moderate', color: '#facc15', note: 'Early aluminum wiring era. Some homes in DFW have aluminum branch circuits. Have a licensed electrician inspect your panel and a sample of outlets.' },
    { id: '1969-1973', label: '📅 1969–1973', risk: 'High', color: '#f97316', note: 'Peak aluminum wiring years in DFW. Strong likelihood of aluminum branch circuit wiring. Immediate inspection by TDLR-licensed electrician recommended.' },
    { id: '1974-1985', label: '📅 1974–1985', risk: 'Low-Moderate', color: '#60a5fa', note: 'After 1973, copper returned for branch circuits. Some large appliance circuits may still use aluminum. Panel inspection still recommended for older homes.' },
    { id: 'post1985', label: '📅 After 1985', risk: 'Very Low', color: '#4ade80', note: 'Post-1985 DFW homes built with copper branch wiring. Aluminum may still be used for service entrance and large 240V circuits — this is acceptable per code.' },
  ];

  const selected = vintages.find(v => v.id === vintage);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#F5E642', margin: '0 0 10px' }}>DFW Aluminum Wiring Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>Identify, assess, and remediate aluminum wiring in Dallas-Fort Worth homes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {[
            { icon: '⚠️', label: 'Fire Risk', value: '55x Higher', sub: 'vs copper wiring' },
            { icon: '📅', label: 'At-Risk Era', value: '1965–1973', sub: 'Peak DFW use' },
            { icon: '💵', label: 'Remediation Cost', value: '$2,000–8,000', sub: 'Full home' },
            { icon: '🏠', label: 'Insurance Impact', value: 'May Be Denied', sub: 'Without remediation' },
          ].map(stat => (
            <div key={stat.label} style={{ backgroundColor: '#132036', borderRadius: '10px', padding: '18px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px' }}>{stat.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '15px', marginTop: '6px' }}>{stat.value}</div>
              <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '4px' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#132036', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', margin: '0 0 16px' }}>🏠 Select Your Home Vintage</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px' }}>
            {vintages.map(v => (
              <button key={v.id} onClick={() => setVintage(v.id === vintage ? '' : v.id)}
                style={{ padding: '14px', borderRadius: '8px', border: '2px solid', cursor: 'pointer', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s', textAlign: 'center',
                  borderColor: vintage === v.id ? '#F5E642' : '#1e3a5f', backgroundColor: vintage === v.id ? '#1a2e4a' : '#0d1f35', color: vintage === v.id ? '#F5E642' : '#cbd5e1' }}>
                {v.label}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{ marginTop: '20px', backgroundColor: '#0d1f35', borderRadius: '10px', padding: '20px', borderLeft:  }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <h3 style={{ color: '#F5E642', margin: 0, fontSize: '18px' }}>{selected.label}</h3>
                <span style={{ padding: '4px 14px', borderRadius: '20px', backgroundColor: '#1e2e40', color: selected.color, fontWeight: '700', fontSize: '13px' }}>Risk: {selected.risk}</span>
              </div>
              <p style={{ color: '#cbd5e1', margin: 0, lineHeight: '1.6' }}>{selected.note}</p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#132036', borderRadius: '12px', padding: '28px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', margin: '0 0 14px' }}>🔧 Remediation Options</h2>
          {[
            { method: 'COPALUM Crimp Connectors', cost: '$4,000–8,000', note: 'Gold standard. Aluminum-to-copper crimp at every outlet, switch, and fixture. Requires certified electrician.' },
            { method: 'AlumiConn Pigtailing', cost: '$2,000–5,000', note: 'Approved by CPSC. Mechanical lugs connect aluminum to copper pigtail at each device. Faster alternative.' },
            { method: 'Full Rewire (Copper)', cost: '$8,000–20,000', note: 'Complete replacement with copper wiring. Most expensive but permanent solution. Often required by insurers.' },
            { method: 'CO/ALR Devices Only', cost: '$500–1,500', note: 'Replace outlets and switches with CO/ALR-rated devices. Lower cost but does not address connections inside walls.' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#0d1f35', borderRadius: '8px', padding: '16px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                <span style={{ color: '#F5E642', fontWeight: '700', fontSize: '15px' }}>{item.method}</span>
                <span style={{ color: '#4ade80', fontWeight: '700', fontSize: '14px' }}>{item.cost}</span>
              </div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '13px', lineHeight: '1.5' }}>{item.note}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}