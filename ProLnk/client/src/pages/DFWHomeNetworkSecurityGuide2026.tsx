import { useState } from 'react';

const checklists: Record<string, string[]> = {
  low: ['🔒 Change default router password (admin/admin is never safe)', '📡 Enable WPA3 encryption (or WPA2 minimum)', '🔄 Enable auto-firmware updates on router', '📶 Separate IoT devices onto guest network'],
  medium: ['🔒 All above items', '🌐 Create dedicated IoT VLAN or guest network', '📱 Use strong unique passwords for each smart device', '👁️ Check connected devices list monthly', '🔔 Enable router login alerts', '🔑 Two-factor auth on all smart home apps'],
  high: ['🔒 All above items', '🛡️ Hardware firewall (Firewalla Purple ~$199)', '🌍 VPN router for remote access (no port forwarding)', '📊 Network monitoring app (Fing or PiHole)', '🔐 Certificate-based auth for cameras', '⚡ UPS battery backup for router (stays online in ERCOT outages)', '🏠 Separate network for ProLnk contractors — they never need your main WiFi'],
};

const deviceTips = [
  { device: 'Smart Thermostat', risk: 'Low', tip: 'Use manufacturer app only, enable 2FA' },
  { device: 'Security Cameras', risk: 'High', tip: 'Change default password immediately, keep on isolated VLAN' },
  { device: 'Smart Doorbell', risk: 'Medium', tip: 'Guest network ok, enable encrypted cloud storage' },
  { device: 'Smart Locks', risk: 'High', tip: 'Direct Z-Wave/Bluetooth preferred over cloud-dependent Wi-Fi' },
  { device: 'Smart Plugs/Bulbs', risk: 'Low', tip: 'Guest network, no sensitive data — just convenience devices' },
];

export default function DFWHomeNetworkSecurityGuide2026() {
  const [deviceCount, setDeviceCount] = useState(0);

  const level = deviceCount === 0 ? null : deviceCount <= 5 ? 'low' : deviceCount <= 15 ? 'medium' : 'high';
  const label = level === 'low' ? 'Basic Setup' : level === 'medium' ? 'Intermediate Setup' : level === 'high' ? 'Advanced Setup' : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌐🛡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Home Network Security Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Smart home devices create attack surface — here is how to lock it down</p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚡ DFW-Specific Threats</h2>
          {['ERCOT outages can knock routers offline — attackers probe during reboots', 'DFW heat causes router hardware failure — aging routers = security gaps', 'High turnover in rentals means old passwords float around', 'Contractor access (landscaping, HVAC) creates physical network exposure'].map(t => (
            <div key={t} style={{ padding: '6px 0', fontSize: 13, color: '#94a3b8', display: 'flex', gap: 8 }}>⚠️ {t}</div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📱 Device Risk Guide</h2>
          {deviceTips.map(d => (
            <div key={d.device} style={{ padding: '10px 0', borderBottom: '1px solid #1e3a5f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{d.device}</span>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 99,
                  backgroundColor: d.risk === 'High' ? '#7f1d1d' : d.risk === 'Medium' ? '#78350f' : '#14532d' }}>{d.risk} Risk</span>
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>💡 {d.tip}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🎯 Your Network Checklist</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>How many smart devices in your home? <strong style={{ color: '#F5E642' }}>{deviceCount}</strong></label>
            <input type="range" min={0} max={30} value={deviceCount} onChange={e => setDeviceCount(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5E642' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8' }}>
              <span>0 devices</span><span>15 devices</span><span>30 devices</span>
            </div>
          </div>
          {level && (
            <div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Recommended: {label}</div>
              {checklists[level].map(item => (
                <div key={item} style={{ padding: '8px 12px', backgroundColor: '#0A1628', borderRadius: 8, marginBottom: 6, fontSize: 13 }}>{item}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: 16, backgroundColor: '#112240', borderRadius: 12 }}>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>🔗 ProLnk contractors never need your main WiFi — we use isolated access for all service visits.</p>
        </div>
      </div>
    </div>
  );
}