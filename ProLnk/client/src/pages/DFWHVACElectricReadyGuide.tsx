import { useState } from 'react';

const electrificationPaths = {
  gas: [
    { step: 1, action: 'Upgrade electrical panel to 200A minimum (300A ideal)', cost: '$2,500-$5,000', when: 'Before or during HVAC install' },
    { step: 2, action: 'Install dedicated 240V circuit for heat pump', cost: '$400-$800', when: 'During HVAC install' },
    { step: 3, action: 'Cap and remove gas line to HVAC unit', cost: '$300-$600', when: 'During HVAC install' },
    { step: 4, action: 'Install heat pump (replace gas furnace + AC)', cost: '$6,000-$12,000', when: 'When system is due' },
    { step: 5, action: 'Add auxiliary electric heat strips (DFW backup for <20°F)', cost: '$400-$800', when: 'Included with heat pump' },
  ],
  electric: [
    { step: 1, action: 'Verify 200A+ panel capacity for heat pump', cost: '$0-$2,000', when: 'Before install' },
    { step: 2, action: 'Replace central AC + electric furnace with heat pump', cost: '$5,500-$10,000', when: 'When system is due' },
    { step: 3, action: 'Upgrade to smart thermostat with weather integration', cost: '$150-$300', when: 'At install' },
  ],
};

const timelines = ['Replace now', '1-2 years', '3-5 years', '5+ years'];
const systemTypes = ['Gas furnace + AC', 'Electric furnace + AC', 'Heat pump (upgrading)'];

export default function DFWHVACElectricReadyGuide() {
  const [currentSystem, setCurrentSystem] = useState('');
  const [electrifyTimeline, setElectrifyTimeline] = useState('');
  const [showPath, setShowPath] = useState(false);

  const isGas = currentSystem === 'Gas furnace + AC';
  const pathKey = isGas ? 'gas' : 'electric';
  const steps = electrificationPaths[pathKey] || [];

  const taxCredit = 2000;
  const panelCredit = 1200;
  const totalCredit = isGas ? taxCredit + panelCredit : taxCredit;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
          ⚡ DFW HVAC RESOURCE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          All-Electric Ready HVAC Guide for DFW
        </h1>
        <p style={{ color: '#8899aa', fontSize: 16, marginBottom: 32 }}>
          Prepare your DFW home for all-electric heating and cooling — panel upgrades, gas removal, and the right heat pump path.
        </p>

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🗺️ Build Your Electrification Path</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#8899aa', fontSize: 13, display: 'block', marginBottom: 6 }}>Current DFW HVAC System</label>
              <select value={currentSystem} onChange={e => { setCurrentSystem(e.target.value); setShowPath(false); }}
                style={{ width: '100%', background: '#152238', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select system...</option>
                {systemTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8899aa', fontSize: 13, display: 'block', marginBottom: 6 }}>Electrification Timeline</label>
              <select value={electrifyTimeline} onChange={e => { setElectrifyTimeline(e.target.value); setShowPath(false); }}
                style={{ width: '100%', background: '#152238', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select timeline...</option>
                {timelines.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowPath(true)} disabled={!currentSystem || !electrifyTimeline}
            style={{ background: currentSystem && electrifyTimeline ? '#F5E642′ : '#1e3a5f', color: currentSystem && electrifyTimeline ? '#0A1628' : '#4a6080', border: ’none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: currentSystem && electrifyTimeline ? 'pointer' : 'not-allowed' }}>
            Show My Path →
          </button>
        </div>

        {showPath && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>💰 Available Federal Tax Credits</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>Up to ${totalCredit.toLocaleString()} back</div>
              <div style={{ color: '#8899aa', fontSize: 13, marginTop: 4 }}>
                Heat pump credit: $2,000 + {isGas ? 'Panel upgrade credit: $1,200′ : ’No panel upgrade needed'}
              </div>
            </div>
            <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>
                Your {currentSystem} → All-Electric Path
              </div>
              {steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 16, padding: 16, background: '#152238', borderRadius: 8 }}>
                  <div style={{ background: '#F5E642', color: '#0A1628', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
                    {s.step}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 14 }}>{s.action}</div>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <span style={{ color: '#F5E642', fontSize: 12 }}>💰 {s.cost}</span>
                      <span style={{ color: '#8899aa', fontSize: 12 }}>📅 {s.when}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>❄️ DFW All-Electric Reality Check</h2>
          {[
            { icon: '🌡️', title: 'DFW Winters Are Mild — Mostly', desc: 'DFW averages only 3-5 days below 20°F per year. Heat pumps work great here — just add auxiliary strips for rare freezes.' },
            { icon: '💸', title: 'Electricity vs Gas Cost in DFW', desc: 'Oncor electricity is ~$0.12/kWh. Modern heat pumps deliver 2-3x efficiency. For most DFW homes, all-electric costs similar or less.' },
            { icon: '🔌', title: 'Panel Upgrade is the Hidden Cost', desc: 'Many DFW homes have 100A panels. Upgrading to 200A ($2,500-$5,000) is required and qualifies for the $1,200 federal credit.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < 2 ? 16 : 0, padding: 16, background: '#152238', borderRadius: 8 }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#8899aa', fontSize: 13 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
