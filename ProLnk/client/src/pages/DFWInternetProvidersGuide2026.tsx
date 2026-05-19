import { useState } from 'react';

const areas = [
  { id: 'dallas', label: '🏙️ Dallas Proper', rec: 'AT&T Fiber', alts: 'Spectrum, Frontier Fiber', note: 'AT&T Fiber widely available in Dallas. 1 Gbps symmetric for $65/mo. Spectrum cable as backup (300-1000 Mbps). Frontier expanding fiber in East Dallas.' },
  { id: 'fortworth', label: '🤠 Fort Worth', rec: 'AT&T Fiber or Spectrum', alts: 'Frontier (limited)', note: 'Fort Worth has strong AT&T Fiber and Spectrum cable coverage. TCU and Westside: both available. Frontier fiber limited to select neighborhoods.' },
  { id: 'plano', label: '📐 Plano / Allen / McKinney', rec: 'AT&T Fiber', alts: 'Spectrum', note: 'AT&T Fiber dominates in Collin County suburbs. Most homes have access to 1 Gbps for under $70/mo. Spectrum available as alternative with no contract.' },
  { id: 'frisco', label: '🏘️ Frisco / Prosper / Celina', rec: 'AT&T Fiber or Spectrum', alts: 'MetroNet (new)', note: 'Rapidly growing area. AT&T Fiber available in established neighborhoods. MetroNet building fiber in newer developments. Check availability block-by-block.' },
  { id: 'rural', label: '🌾 Rural DFW / Far Suburbs', rec: 'Spectrum or Fixed Wireless', alts: 'Starlink, HughesNet', note: 'Fiber less available beyond main suburbs. Spectrum cable where available (best option). Fixed wireless (AT&T Air, T-Mobile Home Internet) increasingly viable at 100-300 Mbps. Starlink ($120/mo) for truly rural areas.' },
];

const uses = [
  { u: 'Work from home (video calls)', mbps: '50+ Mbps up + down' },
  { u: '4K streaming (2 TVs)', mbps: '50 Mbps down' },
  { u: 'Smart home (20+ devices)', mbps: '100 Mbps, low latency' },
  { u: 'Gaming', mbps: '100 Mbps + <20ms ping' },
  { u: 'Large file uploads (design/video)', mbps: '500+ Mbps symmetric' },
];

export default function DFWInternetProvidersGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = areas.find(n => n.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', padding: '32px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Internet Providers — 2026 Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Internet availability in DFW varies by neighborhood. AT&T Fiber is the gold standard where available. Spectrum cable is the widest fallback.</p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📊 Speed Requirements by Use Case</h2>
          {uses.map((u,i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: 13, padding: '6px 0', borderBottom: i < uses.length-1 ? '1px solid #1e3a5f' : 'none' }}>
              <span>{u.u}</span><span style={{ color: '#F5E642', fontWeight: 600 }}>{u.mbps}</span>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📍 Select Your DFW Area</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {areas.map(n => (
            <button key={n.id} onClick={() => setSelected(selected === n.id ? null : n.id)}
              style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${selected === n.id ? '#F5E642' : '#1e3a5f'}`, backgroundColor: selected === n.id ? '#F5E64220′ : '#0f2040', color: selected === n.id ? '#F5E642' : '#cbd5e1', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>
              {n.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, border: '2px solid #F5E642', marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 16 }}>{active.label}</h3>
            <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>{active.note}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>TOP PICK</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{active.rec}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>ALTERNATIVES</div>
                <div style={{ color: '#cbd5e1', fontSize: 14 }}>{active.alts}</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 10 }}>💡 DFW Internet Shopping Tips</h2>
          {['Always check ATT.com and Spectrum.com by exact address — fiber maps are block-by-block','Negotiate: Spectrum and AT&T both offer retention deals if you threaten to cancel','No data caps on most DFW fiber plans — confirm before signing','Equipment rental ($10-15/mo) vs buy your own router — buying saves long-term','Speed test your current plan at fast.com before upgrading' ].map((t,i) => (
            <div key={i} style={{ color: '#cbd5e1', fontSize: 13, padding: '6px 0', borderBottom: i < 4 ? '1px solid #1e3a5f' : 'none' }}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
