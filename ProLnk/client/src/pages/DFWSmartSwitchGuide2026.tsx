import { useState } from 'react';

const switchBrands = [
  { id: 'caseta', name: 'Lutron Caseta', emoji: '⭐', neutral: false, price: '$60–80', desc: 'Best for older DFW homes — NO neutral wire required. Works with older wiring. Extremely reliable, works with Alexa/Google/Apple. Requires Lutron bridge for full smart features.', best: 'DFW homes pre-1985, no neutral wire available' },
  { id: 'leviton', name: 'Leviton Decora Smart', emoji: '🔷', neutral: true, price: '$40–60', desc: 'Solid mid-range smart switch. Requires neutral wire. Works with WiFi directly — no hub needed. Good app. Widely available at Home Depot in DFW.', best: 'DFW homes post-1985 with neutral wire, budget-conscious' },
  { id: 'kasa', name: 'Kasa (TP-Link)', emoji: '🟢', neutral: true, price: '$20–40', desc: 'Best value smart switch in DFW. Requires neutral wire. Works on 2.4GHz WiFi — no hub. Local control even without internet. Amazon Alexa and Google Home native.', best: 'DFW homes with neutral wire, best budget pick' },
  { id: 'idevices', name: 'iDevices (HomeKit)', emoji: '🍎', neutral: true, price: '$50–70', desc: 'Best for Apple HomeKit users in DFW. Requires neutral wire. Solid build quality. Thread/Matter support in newer models for better mesh networking in large DFW homes.', best: 'DFW Apple ecosystem homes, large floor plans' },
];

const homeAgeGuide: Record<string, Record<string, string>> = {
  'pre1985': {
    'single': 'Lutron Caseta (PD-6ANS) — no neutral needed. Works with old wiring. Install the Caseta bridge for full Alexa/Google/HomeKit control.',
    '3way': 'Lutron Caseta (PD-6ANS + PD-6ANS-DV) — Caseta handles 3-way without traveler wires. One main switch, one remote. Most retrofit-friendly option in older DFW homes.',
    '4way': 'Lutron Caseta multi-switch kit — replace all switches in the 4-way loop with Caseta remotes. Only one switch needs wiring; rest are wireless remotes.',
  },
  'post1985': {
    'single': 'Kasa EP25 or Leviton D26HD — both require neutral wire. WiFi direct, no hub. Kasa is best value; Leviton has better app.',
    '3way': 'Kasa KS230 (3-way kit) — includes both switches. Requires neutral at one location. Very easy install with YouTube tutorials for DFW homes.',
    '4way': 'Leviton DWVAA or Kasa smart 4-way — requires neutral at all switch boxes. May need electrician to verify wiring before purchasing.',
  },
};

export default function DFWSmartSwitchGuide2026() {
  const [homeAge, setHomeAge] = useState<string>('\);
  const [switchType, setSwitchType] = useState<string>('\);
  const [activeSwitch, setActiveSwitch] = useState<string>('\);

  const rec = homeAge && switchType ? homeAgeGuide[homeAge]?.[switchType] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>💡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Smart Switch Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Find the right smart switch for your DFW home — neutral wire matters</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🏠 Get My Recommendation</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            <select
              value={homeAge}
              onChange={e => setHomeAge(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}
            >
              <option value="">When was your DFW home built?</option>
              <option value="pre1985″>Before 1985 (may not have neutral wire)</option>
              <option value="post1985″>1985 or newer (likely has neutral wire)</option>
            </select>
            <select
              value={switchType}
              onChange={e => setSwitchType(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}
            >
              <option value="">What type of switch location?</option>
              <option value="single">Single switch (controls one set of lights)</option>
              <option value="3way">3-way switch (two switches, one light)</option>
              <option value="4way">4-way switch (three+ switches, one light)</option>
            </select>
          </div>
          {rec && (
            <div style={{ marginTop: 14, padding: 14, background: '#0f172a', borderRadius: 8, borderLeft: '3px solid #F5E642', color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>
              ✅ {rec}
            </div>
          )}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 10, padding: 14, marginBottom: 20, borderLeft: '3px solid #60a5fa' }}>
          <p style={{ color: '#bfdbfe', fontSize: 14, margin: '0 0 4px', fontWeight: 600 }}>⚡ Neutral Wire Check</p>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>DFW homes built after 1985 typically have a white neutral wire in the switch box. Look for 3 or more wires (not just 2). If you only see two wires (black + white used as hot), you likely need a no-neutral switch like Lutron Caseta.</p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 14 }}>Top Smart Switches for DFW Homes</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {switchBrands.map(s => (
            <div
              key={s.id}
              onClick={() => setActiveSwitch(activeSwitch === s.id ? '' : s.id)}
              style={{ background: activeSwitch === s.id ? '#1e3a5f' : '#1e293b', borderRadius: 10, padding: 14, cursor: 'pointer', border: `1px solid ${activeSwitch === s.id ? '#F5E642' : '#334155'}` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{s.emoji}</span>
                <span style={{ fontWeight: 600, fontSize: 15 }}>{s.name}</span>
                <span style={{ background: s.neutral ? '#166534′ : '#7c2d12', color: '#fff', padding: '2px 8px', borderRadius: 20, fontSize: 11 }}>{s.neutral ? ’Needs Neutral' : 'No Neutral OK'}</span>
                <span style={{ marginLeft: 'auto', color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{s.price}</span>
              </div>
              {activeSwitch === s.id && (
                <div style={{ marginTop: 10 }}>
                  <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 6px' }}>{s.desc}</p>
                  <p style={{ color: '#F5E642', fontSize: 13, margin: 0 }}>Best for: {s.best}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
