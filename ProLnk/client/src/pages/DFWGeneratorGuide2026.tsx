import { useState } from 'react';

export default function DFWGeneratorGuide2026() {
  const [homeSize, setHomeSize] = useState(2500);
  const [critLoads, setCritLoads] = useState<string[]>([]);

  const loadOpts = [
    { id: 'hvac', label: 'Central HVAC', kW: 5 },
    { id: 'fridge', label: 'Refrigerator', kW: 1 },
    { id: 'lights', label: 'Lights & outlets', kW: 3 },
    { id: 'well', label: 'Well pump', kW: 2 },
    { id: 'stove', label: 'Electric range', kW: 5 },
    { id: 'medical', label: 'Medical equipment', kW: 2 },
  ];

  const toggle = (id: string) => setCritLoads(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);
  const totalKw = loadOpts.filter(l => critLoads.includes(l.id)).reduce((s, l) => s + l.kW, 0);
  const recommended = totalKw <= 10 ? '14 kW' : totalKw <= 16 ? '20 kW' : '26 kW';
  const estCost = totalKw <= 10 ? 9000 : totalKw <= 16 ? 11000 : 14000;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🔌</span>
          <h1 style={{ fontSize: 28, color: '#F5E642', margin: 0 }}>DFW Whole-Home Generator Guide 2026</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 16 }}>Standby generator installations surged in DFW after Winter Storm Uri. Here is what you need to know.</p>

        <div style={{ background: '#1e3a5f', border: '1px solid #F5E642', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <p style={{ margin: 0, color: '#fbbf24', fontWeight: 600 }}>⚠️ Natural gas connection required — most DFW homes qualify. Propane is an alternative for rural properties.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '⚙️', label: 'Most Popular Size', value: '20 kW' },
            { icon: '💰', label: 'Avg Install Cost', value: '$8K–12K' },
            { icon: '📋', label: 'Permit Required', value: 'Yes, always' },
          ].map(card => (
            <div key={card.label} style={{ background: '#132040', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{card.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642' }}>{card.value}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{card.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📋 Key Facts for DFW Homeowners</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Automatic transfer switch (ATS) included — generator starts within 10 seconds of outage</li>
            <li>Annual maintenance: oil change, spark plugs, battery check (~$200–300/yr)</li>
            <li>Most DFW municipalities require inspection post-install — Generac/Kohler handle permitting</li>
            <li>Gas line sizing: confirm adequate BTU capacity with your gas utility</li>
            <li>HOA approval may be needed for exterior placement and exhaust direction</li>
          </ul>
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🧮 Generator Size Calculator</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13 }}>Home Size: {homeSize.toLocaleString()} sqft</label>
            <input type="range" min={1000} max={6000} step={100} value={homeSize}
              onChange={e => setHomeSize(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5E642' }} />
          </div>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Select critical loads:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
            {loadOpts.map(opt => (
              <button key={opt.id} onClick={() => toggle(opt.id)}
                style={{ padding: 10, borderRadius: 8, border: `2px solid ${critLoads.includes(opt.id) ? '#F5E642' : '#334155'}`,
                  background: critLoads.includes(opt.id) ? '#1e3a5f' : '#0A1628', color: '#fff', cursor: 'pointer', fontSize: 13 }}>
                {opt.label}<br /><span style={{ color: '#94a3b8', fontSize: 11 }}>{opt.kW} kW</span>
              </button>
            ))}
          </div>
          {critLoads.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {[
                { label: 'Total Load', value: `${totalKw} kW` },
                { label: 'Recommended Size', value: recommended },
                { label: 'Est. Installed Cost', value: `$${estCost.toLocaleString()}` },
              ].map(r => (
                <div key={r.label} style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642' }}>{r.value}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{r.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
