import { useState } from 'react';

const systems = [
  { size: '2 ton', home: 'Small DFW home (under 1,200 sq ft)', circuit: '30A / 240V dedicated', wireGauge: '10 AWG', disconnect: '30A non-fused', airHandlerAmp: '15A / 120V', permit: 'Required', cost: '$400–$800' },
  { size: '3 ton', home: 'Mid DFW home (1,200–2,000 sq ft)', circuit: '40A / 240V dedicated', wireGauge: '8 AWG', disconnect: '40A', airHandlerAmp: '20A / 120V', permit: 'Required', cost: '$600–$1,200' },
  { size: '4 ton', home: 'Large DFW home (2,000–3,000 sq ft)', circuit: '50A / 240V dedicated', wireGauge: '6 AWG', disconnect: '60A non-fused', airHandlerAmp: '20A / 120V', permit: 'Required', cost: '$800–$1,600' },
  { size: '5 ton', home: 'XL DFW home (3,000–4,500 sq ft)', circuit: '60A / 240V dedicated', wireGauge: '6 AWG', disconnect: '60A non-fused', airHandlerAmp: '20A / 120V', permit: 'Required', cost: '$1,000–$2,200' },
];

export default function DFWHVACElectricalRequirements() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 12, lineHeight: 1.2 }}>
          ⚡ HVAC Electrical Requirements for DFW Homes
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>
          Every HVAC replacement in DFW requires verified electrical — wrong wire gauge or undersized disconnect is a fire hazard and a failed inspection. Here's exactly what each system needs.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '20px 24px', marginBottom: 32 }}>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 16, marginBottom: 8 }}>🏡 Standard DFW 5-Ton System Electrical</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: 'Condenser Circuit', value: '60A / 240V' },
              { label: 'Air Handler Circuit', value: '20A / 120V' },
              { label: 'Wire Gauge', value: '6 AWG min' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 14px', textAlign: 'center' }}>
                <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🎯 System Size → Electrical Requirements</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {systems.map((s, i) => (
              <button
                key={i}
                onClick={() => setSelected(selected === i ? null : i)}
                style={{
                  background: selected === i ? '#1A3A6B' : '#0F2040',
                  border: selected === i ? '2px solid #F5E642' : '2px solid #1E3A5F',
                  borderRadius: 12,
                  padding: '18px 24px',
                  color: '#E8EDF5',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{s.size}</span>
                    <span style={{ color: '#94A3B8', fontSize: 14, marginLeft: 12 }}>{s.home}</span>
                  </div>
                </div>
                {selected === i && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginTop: 16 }}>
                    {[
                      { label: 'Condenser Circuit', value: s.circuit },
                      { label: 'Wire Gauge', value: s.wireGauge },
                      { label: 'Disconnect', value: s.disconnect },
                      { label: 'Air Handler Circuit', value: s.airHandlerAmp },
                      { label: 'Permit Required', value: s.permit },
                      { label: 'Electrical Upgrade Cost', value: s.cost },
                    ].map((item, j) => (
                      <div key={j} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px' }}>
                        <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                        <div style={{ color: '#E8EDF5', fontSize: 14 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#7F1D1D', borderRadius: 12, padding: '18px 24px', marginBottom: 32 }}>
          <div style={{ color: '#FCA5A5', fontWeight: 800, fontSize: 15, marginBottom: 6 }}>⚠️ DFW Code Note</div>
          <div style={{ color: '#FCA5A5', fontSize: 14, lineHeight: 1.7 }}>All HVAC electrical work in Dallas, Tarrant, Collin, and Denton counties requires a licensed electrician and permit. Never skip the disconnect — DFW inspectors check first.</div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>⚡</div>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Get Electrical + HVAC Quotes Together</h3>
          <p style={{ color: '#0A1628', fontSize: 15, marginBottom: 0 }}>ProLnk pairs DFW HVAC contractors with licensed electricians — one quote, coordinated installation, single permit pull.</p>
        </div>
      </div>
    </div>
  );
}
