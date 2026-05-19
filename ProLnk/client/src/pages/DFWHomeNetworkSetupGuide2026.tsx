import { useState } from 'react';

export default function DFWHomeNetworkSetupGuide2026() {
  const [homeSize, setHomeSize] = useState('under2500');
  const [deviceCount, setDeviceCount] = useState('under20');

  const getConfig = () => {
    if (homeSize === 'over2500' && deviceCount === 'over40') {
      return { router: 'Tri-band mesh system (3+ nodes)', backhaul: 'Wired backhaul via ethernet', iot: 'Dedicated 2.4GHz IoT VLAN', tip: 'Run CAT6 between nodes for best performance' };
    } else if (homeSize === 'over2500') {
      return { router: 'Dual-band mesh system (2 nodes)', backhaul: 'Wired or wireless backhaul', iot: 'Separate IoT SSID', tip: 'Place nodes 30-40ft apart for full coverage' };
    } else if (deviceCount === 'over40') {
      return { router: 'High-performance single router + 1 satellite', backhaul: 'Wired backhaul recommended', iot: 'Dedicated IoT VLAN', tip: 'Use a router supporting 100+ clients' };
    }
    return { router: 'Single high-performance router', backhaul: 'No backhaul needed', iot: 'Guest network for IoT', tip: 'Place router in center of home, elevated 4-6ft' };
  };

  const config = getConfig();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Home Network Setup Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Optimize your DFW home network for speed, coverage, and smart devices</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📐 Placement Rules</h2>
          {[
            { icon: '🏠', tip: 'Place router in the center of your home, not in a closet' },
            { icon: '📶', tip: 'Elevate router 4-6ft above floor level for better signal spread' },
            { icon: '🔌', tip: 'Homes over 2,500sqft need mesh — single router leaves dead zones' },
            { icon: '🔒', tip: 'Run a dedicated IoT network to isolate smart devices from main traffic' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ color: '#cbd5e1', lineHeight: 1.5 }}>{item.tip}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Get Your Network Config</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Size</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0', fontSize: 14 }}>
                <option value="under2500">Under 2,500 sqft</option>
                <option value="over2500">Over 2,500 sqft</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Connected Devices</label>
              <select value={deviceCount} onChange={e => setDeviceCount(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0', fontSize: 14 }}>
                <option value="under20">Under 20 devices</option>
                <option value="20to40">20–40 devices</option>
                <option value="over40">40+ devices</option>
              </select>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 12 }}>Recommended Setup</h3>
            {[
              { label: 'Router', value: config.router },
              { label: 'Backhaul', value: config.backhaul },
              { label: 'IoT Network', value: config.iot },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? '1px solid #1e3a5f' : 'none' }}>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>{row.label}</span>
                <span style={{ color: '#e2e8f0', fontSize: 13, textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: '10px 12px', background: '#112240', borderRadius: 6, color: '#F5E642', fontSize: 13 }}>
              💡 {config.tip}
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>Need a DFW network pro to install your mesh system or run ethernet? <span style={{ color: '#F5E642' }}>ProLnk connects you with vetted local techs.</span></p>
        </div>
      </div>
    </div>
  );
}
