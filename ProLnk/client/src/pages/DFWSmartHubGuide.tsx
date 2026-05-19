import { useState } from 'react';

const hubs = [
  {
    name: 'Samsung SmartThings',
    local: false,
    cloud: true,
    devices: 'Zigbee, Z-Wave, WiFi, Matter',
    outageRisk: 'High — loses control when internet/cloud down',
    cost: '$130 hub',
    bestFor: 'Large ecosystems, Samsung devices, easy setup',
    privacy: 'Low',
    score: { reliability: 2, features: 5, privacy: 2, cost: 4 },
  },
  {
    name: 'Hubitat',
    local: true,
    cloud: false,
    devices: 'Zigbee, Z-Wave, LAN, Matter',
    outageRisk: 'Low — runs locally, internet not required',
    cost: '$150 hub',
    bestFor: 'DFW power outage resilience, local automations',
    privacy: 'High',
    score: { reliability: 5, features: 4, privacy: 5, cost: 4 },
  },
  {
    name: 'Home Assistant',
    local: true,
    cloud: false,
    devices: 'Everything — Zigbee, Z-Wave, WiFi, Matter, custom',
    outageRisk: 'Very Low — full local, open source',
    cost: '$100–$200 hardware',
    bestFor: 'Privacy, max control, advanced automations',
    privacy: 'Very High',
    score: { reliability: 5, features: 5, privacy: 5, cost: 3 },
  },
];

export default function DFWSmartHubGuide() {
  const [devices, setDevices] = useState('');
  const [priority, setPriority] = useState('reliability');
  const [recommendation, setRecommendation] = useState<string | null>(null);

  function getRecommendation() {
    const scores = hubs.map(h => ({
      name: h.name,
      score: h.score[priority as keyof typeof h.score],
      outageRisk: h.outageRisk,
      cost: h.cost,
    }));
    scores.sort((a, b) => b.score - a.score);
    const top = scores[0];
    setRecommendation(
      `Best for your priority (${priority}): ${top.name} — ${top.outageRisk}. Cost: ${top.cost}.`
    );
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13 }}>🏠 DFW Smart Home Guide</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Smart Hub Guide for DFW Homes</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          DFW ice storms knock out internet for days. Cloud-based hubs stop working when your connection drops — local hubs keep running. Here's how to choose.
        </p>

        <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 10, padding: '16px 20px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>❄️ DFW Ice Storm Reality Check</div>
          <p style={{ color: '#CBD5E1', fontSize: 14, margin: 0 }}>
            During Winter Storm Uri (2021), many DFW homeowners lost smart home control because cloud hubs require internet. Hubitat and Home Assistant users kept full local automation running during the outage.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {hubs.map(h => (
            <div key={h.name} style={{ background: '#0D1F35', borderRadius: 10, padding: '20px 24px', border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{h.name}</div>
                <div style={{ background: h.local ? '#16A34A20' : '#DC262620', color: h.local ? '#4ADE80' : '#F87171', fontSize: 12, padding: '3px 10px', borderRadius: 99, fontWeight: 600 }}>
                  {h.local ? '🏠 Local Processing' : '☁️ Cloud Dependent'}
                </div>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Devices: {h.devices}</div>
              <div style={{ color: '#F87171', fontSize: 13, marginBottom: 6 }}>⚡ Outage Risk: {h.outageRisk}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>✅ Best For: {h.bestFor}</div>
              <div style={{ color: '#F5E642', fontSize: 13 }}>💵 {h.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F35', borderRadius: 12, padding: '28px', border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🔧 Get Your Hub Recommendation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#CBD5E1', fontSize: 13, marginBottom: 6 }}>Existing Smart Devices (optional)</label>
            <input
              value={devices}
              onChange={e => setDevices(e.target.value)}
              placeholder="e.g. Philips Hue, Ring, Nest, Ecobee..."
              style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#CBD5E1', fontSize: 13, marginBottom: 8 }}>Top Priority</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['reliability', 'features', 'privacy', 'cost'].map(p => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  style={{ padding: '8px 18px', borderRadius: 8, border: `2px solid ${priority === p ? '#F5E642' : '#1E3A5F'}`, background: priority === p ? '#F5E64220' : 'transparent', color: priority === p ? '#F5E642' : '#94A3B8', cursor: 'pointer', fontWeight: 600, fontSize: 13, textTransform: 'capitalize' }}
                >
                  {p === 'reliability' ? '⚡ Reliability' : p === 'features' ? '🔧 Features' : p === 'privacy' ? '🔒 Privacy' : '💵 Cost'}
                </button>
              ))}
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get My Hub Recommendation →
          </button>
          {recommendation && (
            <div style={{ marginTop: 20, background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 8, padding: '16px 20px', color: '#F5E642', fontSize: 15 }}>
              {recommendation}
            </div>
          )}
        </div>

        <div style={{ color: '#475569', fontSize: 12, textAlign: 'center' }}>ProLnk · DFW Smart Home Guides · Local-first smart home for DFW resilience</div>
      </div>
    </div>
  );
}
