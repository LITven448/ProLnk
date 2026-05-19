import { useState } from 'react';

const MESH_SYSTEMS = [
  { name: 'Eero Pro 6E', nodes: 1, coverage: 2000, price: 199, ideal: 'Apartment/Small Home' },
  { name: 'Eero Pro 6E 3-Pack', nodes: 3, coverage: 5500, price: 499, ideal: 'Medium Home' },
  { name: 'Google Nest WiFi Pro 3-Pack', nodes: 3, coverage: 6600, price: 399, ideal: 'Open Floor Plans' },
  { name: 'Orbi RBK863S 3-Pack', nodes: 3, coverage: 7500, price: 699, ideal: 'Large Estates' },
];

const ISP_OPTIONS = [
  { name: 'AT&T Fiber', speeds: '300Mbps–5Gbps', price: '$55–$250/mo', type: 'Fiber', note: 'Best symmetrical speeds in DFW' },
  { name: 'Spectrum', speeds: '300Mbps–1Gbps', price: '$50–$90/mo', type: 'Cable', note: 'Wide availability, no data caps' },
  { name: 'Frontier Fiber', speeds: '500Mbps–2Gbps', price: '$50–$150/mo', type: 'Fiber', note: 'Expanding in DFW suburbs' },
  { name: 'Google Fiber', speeds: '1Gbps–2Gbps', price: '$70–$100/mo', type: 'Fiber', note: 'Available select DFW areas' },
];

function getMeshRecommendation(sqft: number, stories: number, devices: number) {
  const complexity = sqft + stories * 500 + devices * 20;
  if (complexity < 2500) return { system: MESH_SYSTEMS[0], nodes: 1, wiring: 'Single router, no additional wiring needed', isp: 'AT&T Fiber 300Mbps or Spectrum 300Mbps' };
  if (complexity < 4500) return { system: MESH_SYSTEMS[1], nodes: 2, wiring: 'Run Cat6 between floors for backhaul if possible', isp: 'AT&T Fiber 500Mbps–1Gbps' };
  if (complexity < 7000) return { system: MESH_SYSTEMS[2], nodes: 3, wiring: 'Cat6 drops in living room, office, and primary bedroom', isp: 'AT&T Fiber 1Gbps or Frontier 1Gbps' };
  return { system: MESH_SYSTEMS[3], nodes: 4, wiring: 'Structured wiring closet with Cat6 runs to all rooms', isp: 'AT&T Fiber 2Gbps or Frontier 2Gbps' };
}

export default function DFWHomeNetworkGuide() {
  const [sqft, setSqft] = useState(2500);
  const [stories, setStories] = useState(1);
  const [devices, setDevices] = useState(15);
  const [showResult, setShowResult] = useState(false);

  const rec = getMeshRecommendation(sqft, stories, devices);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ marginBottom: 32 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>📡 DFW HOME NETWORK</span>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '16px 0 8px', lineHeight: 1.2 }}>
            DFW Home Network & WiFi Upgrade Guide
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6 }}>
            Larger DFW homes — especially those over 2,500 sq ft with brick walls and multiple stories — are notorious for WiFi dead zones. Here's how to eliminate them for good.
          </p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🏠 Why DFW Homes Struggle with WiFi</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: '🧱', title: 'Brick Exterior Walls', desc: 'Standard in DFW construction — blocks 2.4GHz signals by 6-12dB' },
              { icon: '📐', title: 'Large Square Footage', desc: 'Average new DFW home is 2,800 sq ft — single routers cannot cover' },
              { icon: '🏗️', title: 'Two-Story Layouts', desc: 'Floor/ceiling penetration drops signal by 30-40% per floor' },
              { icon: '💻', title: 'Device Explosion', desc: 'Average DFW household now has 25+ connected devices' },
            ].map(item => (
              <div key={item.title} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#94A3B8′ }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔧 Top Mesh WiFi Systems for DFW</h2>
          {MESH_SYSTEMS.map(sys => (
            <div key={sys.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #1E3A5F' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{sys.name}</div>
                <div style={{ fontSize: 13, color: '#94A3B8′ }}>{sys.coverage.toLocaleString()} sq ft · {sys.ideal}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>${sys.price}</div>
                <div style={{ fontSize: 12, color: '#94A3B8′ }}>{sys.nodes} node{sys.nodes > 1 ? ’s' : ''}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🌐 DFW Gigabit ISPs</h2>
          {ISP_OPTIONS.map(isp => (
            <div key={isp.name} style={{ padding: '12px 0', borderBottom: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>{isp.name}</span>
                <span style={{ background: isp.type === 'Fiber' ? '#F5E642′ : '#1E3A5F', color: isp.type === ’Fiber' ? '#0A1628′ : '#94A3B8', padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>{isp.type}</span>
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8′ }}>{isp.speeds} · {isp.price}</div>
              <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>{isp.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>📊 Get Your Network Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>Home Size (sq ft)</label>
              <input type="range" min="800″ max="8000" step="100" value={sqft} onChange={e => { setSqft(+e.target.value); setShowResult(false); }}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4 }}>{sqft.toLocaleString()} sq ft</div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>Stories</label>
              <input type="range" min="1″ max="3" step="1" value={stories} onChange={e => { setStories(+e.target.value); setShowResult(false); }}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4 }}>{stories} {stories === 1 ? 'story' : 'stories'}</div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>Connected Devices</label>
              <input type="range" min="5″ max="75" step="5" value={devices} onChange={e => { setDevices(+e.target.value); setShowResult(false); }}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4 }}>{devices} devices</div>
            </div>
          </div>
          <button onClick={() => setShowResult(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>
            Get My Recommendation →
          </button>
          {showResult && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12, color: '#F5E642′ }}>✅ Recommended: {rec.system.name}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><div style={{ fontSize: 12, color: '#64748B' }}>MESH NODES NEEDED</div><div style={{ fontWeight: 600, fontSize: 16 }}>{rec.nodes} nodes</div></div>
                <div><div style={{ fontSize: 12, color: '#64748B' }}>SYSTEM COST</div><div style={{ fontWeight: 600, fontSize: 16, color: '#F5E642′ }}>${rec.system.price}</div></div>
                <div style={{ gridColumn: '1/-1′ }}><div style={{ fontSize: 12, color: '#64748B' }}>WIRING SUGGESTION</div><div style={{ fontWeight: 500, fontSize: 14, marginTop: 4 }}>{rec.wiring}</div></div>
                <div style={{ gridColumn: '1/-1′ }}><div style={{ fontSize: 12, color: '#64748B' }}>ISP SPEED RECOMMENDATION</div><div style={{ fontWeight: 500, fontSize: 14, marginTop: 4 }}>{rec.isp}</div></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', padding: '24px', background: '#0F2140', borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>Need a local DFW network installer or smart home pro?</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>ProLnk connects you with vetted DFW smart home specialists 📡</div>
        </div>

      </div>
    </div>
  );
}
