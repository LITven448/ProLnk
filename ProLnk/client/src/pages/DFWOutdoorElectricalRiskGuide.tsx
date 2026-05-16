import { useState } from 'react';

const outdoorFeatures = [
  { key: 'pool', label: 'Swimming pool or hot tub' },
  { key: 'outdoor_kitchen', label: 'Outdoor kitchen or grill area' },
  { key: 'detached_garage', label: 'Detached garage or workshop' },
  { key: 'landscape_lighting', label: 'Landscape or pathway lighting' },
  { key: 'outdoor_outlets', label: 'Exterior outlets (patio, deck)' },
  { key: 'ev_charger', label: 'EV charger or 240V outdoor circuit' },
];

const featureRisks: Record<string, { risk: string; riskColor: string; required: string[]; upgrades: string[]; cost: string }> = {
  pool: {
    risk: 'High Risk — Water + electricity is lethal combination',
    riskColor: '#EF4444',
    required: ['GFCI protection on all pool circuits within 20 feet', 'Equipotential bonding on all metal pool components', 'Underwater lighting must be GFCI-protected or low-voltage', 'Pump motor disconnect within sight of pool', 'No overhead power lines within 10 feet of pool edge'],
    upgrades: ['Surge protection on pool equipment panel', 'Smart pool controller to monitor amp draw', 'Upgraded bonding for older pools (many DFW pools built before 2008 code updates)'],
    cost: 'GFCI upgrades: -400. Full pool electrical inspection: -350. Bonding upgrade: -1,500.',
  },
  outdoor_kitchen: {
    risk: 'Elevated Risk — Multiple appliances + weather exposure',
    riskColor: '#FB923C',
    required: ['All outlets must be GFCI-protected', 'Weatherproof in-use covers on every outlet', 'Dedicated circuits for refrigerator, ice maker, EVO griddle', 'Outlets must be rated for wet locations if under pergola or near water features'],
    upgrades: ['Whole-house surge protector to protect outdoor refrigerator and smart appliances', 'GFCI breakers instead of GFCI outlets for longer runs', 'Conduit burial depth minimum 18 inches for any underground runs to kitchen'],
    cost: 'GFCI outlets: -80 each installed. Weatherproof covers: -30 each. Dedicated circuit: -400.',
  },
  detached_garage: {
    risk: 'Elevated Risk — Often under-protected and code-non-compliant',
    riskColor: '#FB923C',
    required: ['GFCI protection on all garage outlets since 1978 code', 'Lighting circuits must be on arc-fault protection in new installs', 'Sub-panel if running 240V equipment', 'Grounding electrode at detached structure required'],
    upgrades: ['Separate ground rod at detached garage', 'Upgrade from fused disconnect to breaker sub-panel', 'Add GFCI protection to any outlet without it (many older garages lack this)'],
    cost: 'Sub-panel installation: -2,000. GFCI upgrades: -150 per outlet installed. Ground rod: -300.',
  },
  landscape_lighting: {
    risk: 'Lower Risk — Low-voltage systems are inherently safer',
    riskColor: '#22C55E',
    required: ['12V low-voltage systems require no special permits or GFCI', '120V landscape lighting requires GFCI protection and weatherproof fixtures', 'Buried cable must be marked and at proper depth (6 inches for low-voltage, 12-18 for line voltage)', 'Transformer must be UL-listed and weatherproof'],
    upgrades: ['Convert line-voltage landscape lighting to 12V LED (safer + lower energy)', 'Smart transformer with timer and photocell', 'Surge protection for smart lighting hubs outdoors'],
    cost: 'Low-voltage transformer: -200. Line-voltage GFCI outlet for transformer: -200 installed.',
  },
  outdoor_outlets: {
    risk: 'Moderate Risk — Most common violation in DFW inspections',
    riskColor: '#F5E642',
    required: ['GFCI protection required on all exterior outlets (code since 1978, enforced since 1993)', 'In-use weatherproof covers required if outlet can be used while cord is plugged in', 'Cannot be within 6 feet of a pool or water feature without additional protection', 'All outdoor outlets must face weather-resistant covers'],
    upgrades: ['Upgrade old covers to bubble/clamshell style in-use covers', 'Replace old GFCI outlets (test button should reset — if not, replace)', 'Add exterior outlet on each side of house if lacking — DFW hail season requires utility access'],
    cost: 'In-use covers: -20 each plus installation. GFCI outlet replacement: -150 each installed.',
  },
  ev_charger: {
    risk: 'Elevated Risk — High amperage outdoor circuit',
    riskColor: '#FB923C',
    required: ['240V Level 2 charger requires dedicated 50A or 60A circuit', 'GFCI protection not standard required for EV circuits but recommended', 'Weatherproof outlet or hardwired unit required outdoors', 'Permit required in most DFW municipalities for EV charger installation'],
    upgrades: ['Surge protection on EV charger circuit — lightning in DFW can destroy charger and vehicle charging system', 'Smart charger with amp adjustment to reduce panel load', 'Load management if adding EV to home already near panel capacity'],
    cost: 'EV charger installation (circuit + charger): -2,500. Surge protection: -400. Panel upgrade if needed: ,000-5,000.',
  },
};

export default function DFWOutdoorElectricalRiskGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [viewing, setViewing] = useState('');

  function toggle(key: string) {
    setSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  }

  const overallRisk = selected.includes('pool') ? 'High' : selected.some(s => ['outdoor_kitchen','detached_garage','ev_charger'].includes(s)) ? 'Elevated' : selected.length > 0 ? 'Moderate' : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🌩️</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Outdoor Electrical Risk Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24 }}>DFW leads Texas in lightning strikes per year. Add outdoor pools, kitchens, and EV chargers to the mix and outdoor electrical systems need to be built right. Most DFW homes have at least one code violation in their outdoor electrical setup.</p>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>⚡ DFW Outdoor Electrical Reality</h2>
          {[['Lightning capital of Texas', 'DFW averages 50+ lightning days per year — surge protection is not optional.'],['Pool electrocution risk', 'Improperly bonded DFW pools have caused fatalities. Bonding code updates 2008-2023 require many older pools to be upgraded.'],['Outdoor kitchen boom', 'DFW outdoor kitchen installs up 300% since 2018 — most were DIY or under-permitted.'],['GFCI failures', 'Outdoor GFCI outlets degrade faster in DFW heat and humidity — test monthly or replace every 10 years.']].map(([t, d]) => (
            <div key={t} style={{ borderBottom: '1px solid #1E2D4A', padding: '10px 0' }}>
              <div style={{ fontWeight: 600, color: '#F5E642', fontSize: 14 }}>{t}</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🏡 Select Your Outdoor Features</h2>
          <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
            {outdoorFeatures.map(f => (
              <button key={f.key} onClick={() => toggle(f.key)} style={{ background: selected.includes(f.key) ? '#F5E642' : '#0A1628', color: selected.includes(f.key) ? '#0A1628' : '#E8EDF5', border: '1px solid #1E2D4A', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontSize: 14, textAlign: 'left', fontWeight: selected.includes(f.key) ? 700 : 400 }}>{f.label}</button>
            ))}
          </div>
          {overallRisk && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, borderLeft: `4px solid ${overallRisk === 'High' ? '#EF4444' : overallRisk === 'Elevated' ? '#FB923C' : '#F5E642'}` }}>
              <div style={{ fontWeight: 700, color: overallRisk === 'High' ? '#EF4444' : overallRisk === 'Elevated' ? '#FB923C' : '#F5E642' }}>Overall Outdoor Risk: {overallRisk}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>Click any feature below to see specific requirements and upgrades.</div>
            </div>
          )}
        </div>

        {selected.length > 0 && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>📋 Feature Details</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {selected.map(s => (
                <button key={s} onClick={() => setViewing(s)} style={{ background: viewing === s ? '#F5E642' : '#0A1628', color: viewing === s ? '#0A1628' : '#E8EDF5', border: '1px solid #1E2D4A', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontSize: 13, fontWeight: viewing === s ? 700 : 400 }}>{outdoorFeatures.find(f => f.key === s)?.label.split(' ')[0]} {outdoorFeatures.find(f => f.key === s)?.label.split(' ')[1]}</button>
              ))}
            </div>
            {viewing && featureRisks[viewing] && (
              <div>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 16, borderLeft: `4px solid ${featureRisks[viewing].riskColor}` }}>
                  <div style={{ fontWeight: 700, color: featureRisks[viewing].riskColor }}>{featureRisks[viewing].risk}</div>
                </div>
                <h3 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, marginBottom: 8 }}>✅ Code Requirements</h3>
                <ul style={{ paddingLeft: 20, marginBottom: 12 }}>{featureRisks[viewing].required.map((r, i) => <li key={i} style={{ marginBottom: 6, color: '#E8EDF5', fontSize: 14 }}>{r}</li>)}</ul>
                <h3 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, marginBottom: 8 }}>⬆️ Recommended Upgrades</h3>
                <ul style={{ paddingLeft: 20, marginBottom: 12 }}>{featureRisks[viewing].upgrades.map((u, i) => <li key={i} style={{ marginBottom: 6, color: '#E8EDF5', fontSize: 14 }}>{u}</li>)}</ul>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, borderLeft: '3px solid #F5E642' }}>
                  <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>💰 Typical DFW Costs</div>
                  <div style={{ color: '#94A3B8', fontSize: 14 }}>{featureRisks[viewing].cost}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
