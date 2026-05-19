import { useState } from 'react';

type Intensity = 'occasional' | 'daily' | 'heavy';

const RECS: Record<string, Record<Intensity, { gear: string[]; cost: string; note: string }>> = {
  small: {
    occasional: { gear: ['WiFi 6 Router (TP-Link AX3000)', 'UPS Battery Backup 600VA'], cost: '$120–$180', note: 'WiFi 6 handles light WFH in small homes easily.' },
    daily: { gear: ['WiFi 6 Router (ASUS AX5400)', 'Ethernet to desk', 'UPS 1000VA'], cost: '$200–$320', note: 'Wired ethernet eliminates call drops for daily remote work.' },
    heavy: { gear: ['WiFi 6E Router (Netgear Nighthawk)', 'Cat6 ethernet runs', 'UPS 1500VA', 'Network switch'], cost: '$350–$550', note: 'Heavy video requires wired + UPS surge protection for DFW storms.' },
  },
  medium: {
    occasional: { gear: ['WiFi 6 Mesh System 2-node', 'UPS 600VA'], cost: '$180–$260', note: 'Mesh covers mid-size DFW homes without dead zones.' },
    daily: { gear: ['WiFi 6E Mesh 2-node (Eero Pro)', 'Wired backhaul recommended', 'UPS 1000VA'], cost: '$300–$450', note: 'Wired backhaul on mesh drastically improves call stability.' },
    heavy: { gear: ['WiFi 6E Mesh 3-node', 'Cat6 home run to office', 'UPS 1500VA x2', '8-port gigabit switch'], cost: '$550–$850', note: 'Cat6 home run is worth the install cost for heavy video producers.' },
  },
  large: {
    occasional: { gear: ['WiFi 6 Mesh 3-node', 'UPS 1000VA'], cost: '$280–$400', note: 'Three-node mesh for large DFW homes prevents range issues.' },
    daily: { gear: ['WiFi 6E Mesh 3-node (Orbi 960)', 'Wired backhaul', 'UPS 1500VA'], cost: '$500–$750', note: 'Orbi 960 handles large floor plans with rock-solid daily WFH.' },
    heavy: { gear: ['Enterprise-grade AP system (UniFi)', 'Structured cabling', 'UPS 1500VA x2', '16-port PoE switch'], cost: '$900–$1,600', note: 'UniFi system pays off for heavy users — enterprise stability at home.' },
  },
};

export default function DFWHomeOfficeNetworkGuide() {
  const [sqft, setSqft] = useState('');
  const [intensity, setIntensity] = useState<Intensity | ''>('');
  const [result, setResult] = useState<null | { gear: string[]; cost: string; note: string }>(null);

  function handleCheck() {
    if (sqft && intensity) {
      const sizeKey = sqft === 'small' ? 'small' : sqft === 'medium' ? 'medium' : 'large';
      setResult(RECS[sizeKey][intensity as Intensity]);
    }
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🖥️ DFW Home Office Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 16, lineHeight: 1.2 }}>
          Home Office Network Setup for DFW Remote Workers
        </h1>
        <p style={{ color: '#9BA3B8', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>
          DFW's remote work population has exploded. A solid home office network means dedicated ethernet, proper UPS protection against DFW storms, and the right mesh or wired setup for your home size and work style.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '🔌', title: 'Ethernet vs WiFi', desc: 'Wired ethernet eliminates packet loss on video calls. A single Cat6 run to your desk is the single best upgrade for DFW remote workers.' },
            { icon: '🔒', title: 'VPN Performance', desc: 'AT&T Fiber and Frontier handle VPN traffic well due to symmetrical speeds. Cable ISPs with low upload can bottleneck VPN throughput.' },
            { icon: '⚡', title: 'UPS for DFW Storms', desc: 'DFW severe weather and power surges are common. A 1000VA UPS keeps your router and workstation online during brief outages.' },
            { icon: '📶', title: 'WiFi 6E Mesh', desc: 'Larger DFW homes benefit from WiFi 6E mesh systems — tri-band with 6GHz backhaul keeps every room fast without wiring every wall.' },
          ].map((card) => (
            <div key={card.title} style={{ backgroundColor: '#111D35', border: '1px solid #1E2D4A', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 15, marginBottom: 8 }}>{card.title}</div>
              <div style={{ color: '#9BA3B8', fontSize: 14, lineHeight: 1.6 }}>{card.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#111D35', border: '1px solid #1E2D4A', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🛠️ Network Equipment Recommender</h2>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 10 }}>Home Size</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[{ v: 'small', l: 'Small (under 1,800 sq ft)' }, { v: 'medium', l: 'Medium (1,800–3,200 sq ft)' }, { v: 'large', l: 'Large (3,200+ sq ft)' }].map((o) => (
                <button key={o.v} onClick={() => setSqft(o.v)}
                  style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${sqft === o.v ? '#F5E642' : '#1E2D4A'}`,
                    backgroundColor: sqft === o.v ? '#F5E642' : 'transparent', color: sqft === o.v ? '#0A1628' : '#9BA3B8',
                    cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 10 }}>WFH Intensity</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[{ v: 'occasional', l: 'Occasional (1–2 days/wk)' }, { v: 'daily', l: 'Daily (full-time remote)' }, { v: 'heavy', l: 'Heavy (video/streaming/multi-monitor)' }].map((o) => (
                <button key={o.v} onClick={() => setIntensity(o.v as Intensity)}
                  style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${intensity === o.v ? '#F5E642' : '#1E2D4A'}`,
                    backgroundColor: intensity === o.v ? '#F5E642' : 'transparent', color: intensity === o.v ? '#0A1628' : '#9BA3B8',
                    cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleCheck}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get My Network Recommendation
          </button>
          {result && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 12, padding: 24 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🛒 Recommended Equipment</div>
              {result.gear.map((g) => <div key={g} style={{ color: '#E8EAF0', fontSize: 14, marginBottom: 6 }}>✅ {g}</div>)}
              <div style={{ marginTop: 16 }}>
                <span style={{ color: '#9BA3B8', fontSize: 13 }}>Estimated Cost</span>
                <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15 }}>{result.cost}</div>
              </div>
              <div style={{ marginTop: 12, color: '#9BA3B8', fontSize: 14, fontStyle: 'italic' }}>{result.note}</div>
            </div>
          )}
        </div>
        <div style={{ padding: 24, backgroundColor: '#0D1E3A', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ color: '#9BA3B8', fontSize: 14 }}>Need a pro to run ethernet or install your network equipment?</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginTop: 8 }}>Find a certified DFW network installer on ProLnk →</div>
        </div>
      </div>
    </div>
  );
}
