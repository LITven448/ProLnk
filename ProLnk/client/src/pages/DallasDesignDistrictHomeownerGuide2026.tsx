import { useState } from 'react';

export default function DallasDesignDistrictHomeownerGuide2026() {
  const [buildingType, setBuildingType] = useState<string>('');

  const buildingTypes = [
    {
      id: 'conversion-loft', label: '🏭 Commercial Conversion Loft', desc: 'Former warehouse or commercial space',
      hvac: 'Often rooftop RTU or mini-split systems — require commercial-licensed HVAC tech',
      plumbing: 'Exposed industrial pipes — check original commercial drain sizes (2" min for residential)',
      electrical: 'May have 3-phase wiring — needs residential re-configuration for modern loads',
      tips: ['Concrete floors hide plumbing — document all pipe locations before any renovation', 'High ceilings increase HVAC costs dramatically — zone with mini-splits', 'Loading dock doors may not be insulated — upgrade seals']
    },
    {
      id: 'new-urban-condo', label: '🏢 New Urban Condo Tower', desc: 'Built 2010–present, Victory Park area',
      hvac: 'Fan coil units or VRF systems — HOA manages chillers, owner manages fan coil',
      plumbing: 'Modern PEX throughout — minimal issues for 10+ years',
      electrical: '200A service per unit standard — smart home ready',
      tips: ['VRF systems require specialty refrigerant-certified technicians', 'HOA fees in Victory Park run $800–$2,000/mo — review financials before buying', 'Floor-to-ceiling windows are beautiful but increase solar heat gain — budget for UV film']
    },
    {
      id: 'live-work', label: '🎨 Live/Work Studio Unit', desc: 'Mixed residential-commercial zoning',
      hvac: 'Typically split system — but sized for commercial loads',
      plumbing: 'Commercial-grade fixtures common — easier maintenance',
      electrical: 'Heavy-up panels standard — ideal for high-load equipment',
      tips: ['Zoning determines what HOA covers vs owner — review carefully', 'Loading access and freight elevators are shared assets — coordinate with HOA', 'Commercial-to-residential conversions may lack residential code compliance — verify permits']
    },
  ];

  const districtTips = [
    { icon: '🏗️', tip: 'Design District buildings often have non-standard configurations — always hire contractors with loft/conversion experience' },
    { icon: '🔊', tip: 'Concrete and steel construction transmits sound differently — address noise issues with acoustic underlayment' },
    { icon: '💨', tip: 'Rooftop HVAC units in urban settings collect more debris — filter and coil cleaning every 6 months' },
    { icon: '🔒', tip: 'Urban security systems differ from suburban — ensure smart locks and intercoms are compatible with building infrastructure' },
    { icon: '🌡️', tip: 'Large industrial windows create major thermal bridging — check window seal quality every 3 years' },
  ];

  const selected = buildingTypes.find(b => b.id === buildingType);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🎨</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>Design District / Victory Park Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Urban lofts and commercial conversions — unique systems, unique maintenance</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏠 Select Your Building Type</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {buildingTypes.map(b => (
              <button key={b.id} onClick={() => setBuildingType(b.id)}
                style={{ background: buildingType === b.id ? '#F5E642' : '#0f1f3d', color: buildingType === b.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '14px 18px', textAlign: 'left', cursor: 'pointer', fontSize: 15, fontWeight: 600 }}>
                {b.label} <span style={{ fontWeight: 400, fontSize: 13, opacity: 0.75 }}>— {b.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 16 }}>
              {[['🌡️ HVAC', selected.hvac], ['💧 Plumbing', selected.plumbing], ['⚡ Electrical', selected.electrical]].map(([label, val]) => (
                <div key={label} style={{ background: '#1e293b', borderRadius: 10, padding: 14 }}>
                  <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{label}</p>
                  <p style={{ color: '#cbd5e1', fontSize: 12, margin: 0 }}>{val}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#1e293b', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 15 }}>🔑 Building-Specific Tips</h3>
              {selected.tips.map((t, i) => <p key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 8 }}>• {t}</p>)}
            </div>
          </div>
        )}

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💡 Urban Homeowner Insights</h2>
          {districtTips.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>{t.icon}</span>
              <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{t.tip}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#F5E642', borderRadius: 12 }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>🔧 ProLnk connects Design District owners with urban-specialized contractors.</p>
        </div>
      </div>
    </div>
  );
}
