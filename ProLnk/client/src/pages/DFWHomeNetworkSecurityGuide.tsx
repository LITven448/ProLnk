import { useState } from 'react';

export default function DFWHomeNetworkSecurityGuide() {
  const [deviceCount, setDeviceCount] = useState('');
  const [wfhStatus, setWfhStatus] = useState('sometimes');
  const [smartHomeDevices, setSmartHomeDevices] = useState('some');
  const [result, setResult] = useState<{ config: string[]; time: string; cost: string; priority: string } | null>(null);

  function calculate() {
    const devices = parseInt(deviceCount) || 0;
    const config: string[] = [];
    let time = '2-3 hours';
    let cost = '$0-50 (router settings only)';
    let priority = 'Medium';

    config.push('Change router admin password from default immediately');
    config.push('Enable WPA3 encryption (or WPA2-AES minimum)');
    config.push('Disable WPS - it has known vulnerabilities');

    if (devices > 20 || smartHomeDevices === 'many') {
      config.push('Create separate IoT VLAN or guest network for smart home devices');
      config.push('Use a router with VLAN support: Eero Pro 6E, Ubiquiti UniFi, or TP-Link Omada');
      cost = '$300-800 for capable router/mesh system';
      time = '4-6 hours setup + 1 hour IoT migration';
      priority = 'High - large attack surface';
    }

    if (wfhStatus === 'fulltime') {
      config.push('Set up business VPN on work devices - check with your employer first');
      config.push('Create separate SSID for work devices with stronger security policy');
      config.push('Enable automatic firmware updates on all network equipment');
      cost = devices > 20 ? cost : '$200-500 for upgraded router + VPN subscription';
      priority = 'High - work data at risk on home network';
    } else if (wfhStatus === 'sometimes') {
      config.push('Use VPN when accessing company resources from home');
      config.push('Keep work and personal devices on separate network segments if possible');
    }

    if (smartHomeDevices === 'many') {
      config.push('Audit every smart device - remove any you no longer use');
      config.push('Enable two-factor authentication on all smart home apps');
      config.push('Check for and apply firmware updates on all smart devices monthly');
    }

    config.push('Set up guest network for visitors - never share main WiFi password');
    config.push('Enable router firewall and disable remote management if not needed');

    setResult({ config, time, cost, priority });
  }

  const threats = [
    { threat: 'Smart TV / streaming box', risk: 'Manufacturers collect and sell viewing data; some TVs have ad injection capabilities', fix: 'Isolate on IoT network, disable ACR in TV settings' },
    { threat: 'Smart doorbell / cameras', risk: 'Compromised cameras have livestreamed DFW homes without owner knowledge', fix: 'Strong unique passwords, 2FA, separate IoT VLAN' },
    { threat: 'Voice assistants (Alexa, Google)', risk: 'Always-on microphones; historically sent snippets to human reviewers', fix: 'Isolate on IoT network, use mute hardware button when sensitive conversations' },
    { threat: 'Default router credentials', risk: 'Routers shipped with same password across millions of units - indexed by attackers', fix: 'Change admin password day 1, enable WPA3, disable remote admin' },
  ];

  const routers = [
    { name: 'Eero Pro 6E', price: '$299 (single) / $599 (3-pack)', feature: 'Easy app setup, good parental controls, automatic updates, Works with Alexa' },
    { name: 'TP-Link Deco XE75', price: '$199-399', feature: 'Strong DFW coverage, HomeShield security subscription adds threat detection' },
    { name: 'Ubiquiti UniFi Dream Machine', price: '$379+', feature: 'Prosumer-grade, full VLAN support, intrusion detection - ideal for WFH power users' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW SMART HOME SECURITY 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>Home Network Security Guide for DFW</h1>
        <p style={{ color: '#8A9BBE', marginBottom: 16, lineHeight: 1.6 }}>DFW leads Texas in smart home adoption - which means DFW homes have larger attack surfaces than ever. The average North Texas home now has 28 connected devices. Most are running on a single unsecured network.</p>
        <div style={{ background: '#1A2F4E', borderRadius: 12, padding: 20, border: '1px solid #F5E642', marginBottom: 36 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>DFW Smart Home Reality Check</div>
          <ul style={{ color: '#C8D5E8', lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
            <li>Average DFW smart home: 28 connected devices (2026)</li>
            <li>68% of DFW remote workers use home network for company data daily</li>
            <li>Most ISP-provided routers use default credentials shared across thousands of units</li>
            <li>Smart home devices receive security patches 60% less frequently than phones or computers</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Common Threats in DFW Smart Homes</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 40 }}>
          {threats.map(t => (
            <div key={t.threat} style={{ background: '#111E35', borderRadius: 10, padding: 16, border: '1px solid #1E3A5F' }}>
              <div style={{ fontWeight: 700, color: '#E8EDF5', marginBottom: 4 }}>{t.threat}</div>
              <div style={{ color: '#C8D5E8', fontSize: 13, marginBottom: 6 }}>Risk: {t.risk}</div>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600 }}>Fix: {t.fix}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Recommended Routers for DFW Homes</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {routers.map(r => (
            <div key={r.name} style={{ background: '#111E35', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#E8EDF5', marginBottom: 4 }}>{r.name}</div>
                <div style={{ color: '#8A9BBE', fontSize: 13 }}>{r.feature}</div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 700, whiteSpace: 'nowrap' }}>{r.price}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Security Configuration Builder</h2>
        <div style={{ background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#8A9BBE', fontSize: 13, marginBottom: 6 }}>Connected Device Count</label>
              <input value={deviceCount} onChange={e => setDeviceCount(e.target.value)} placeholder="e.g. 25" style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#8A9BBE', fontSize: 13, marginBottom: 6 }}>Work From Home</label>
              <select value={wfhStatus} onChange={e => setWfhStatus(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="never">Never WFH</option>
                <option value="sometimes">Sometimes WFH</option>
                <option value="fulltime">Full-time remote</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#8A9BBE', fontSize: 13, marginBottom: 6 }}>Smart Home Devices</label>
            <select value={smartHomeDevices} onChange={e => setSmartHomeDevices(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
              <option value="few">A few (smart speaker, maybe a thermostat)</option>
              <option value="some">Some (cameras, locks, lights, thermostat)</option>
              <option value="many">Many (full smart home - 10+ IoT devices)</option>
            </select>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Build My Security Config</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #F5E642' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>Priority: {result.priority}</span>
                <span style={{ color: '#8A9BBE', fontSize: 13 }}>Setup time: {result.time} | Cost: {result.cost}</span>
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                {result.config.map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                    <span style={{ color: '#C8D5E8', fontSize: 14 }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F' }}>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Need a Pro to Secure Your DFW Network?</div>
          <p style={{ color: '#8A9BBE', marginBottom: 16 }}>ProLnk connects you with certified low-voltage and smart home pros in the DFW area.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Get Free Quotes</button>
        </div>
      </div>
    </div>
  );
}
