import { useState } from 'react';

const homeTypes = ['1950s Slab', '1970s Pier & Beam', '1990s Two-Story', '2000s+ New Build'];

const baseData = {
  panelSafety: ['Know your panel location and label every breaker', 'Never block panel access — 36" clearance required by code', 'Tripping breaker = overloaded circuit or failing breaker'],
  gfci: ['Test GFCI outlets monthly: press TEST, confirm power off, press RESET', 'Required in: kitchen, bathrooms, garage, outdoors, pool area', 'Replace if test button doesn\’t cut power within 1 second'],
  outdoor: ['Use weatherproof outlet covers year-round in DFW humidity', 'All outdoor circuits must be GFCI protected', 'Inspect landscape lighting wiring after hail storms'],
  storm: ['Surge protector whole-home unit at panel: $300–$600 installed', 'DFW averages 50+ storm days/year — surge risk is real', 'Unplug sensitive electronics during severe thunderstorm warnings'],
  upgrades: ['200-amp panel: standard for modern DFW homes', '100-amp or less: upgrade now if adding EV charger or AC unit', 'EV charger (Level 2): requires dedicated 240V 50-amp circuit'],
  vetting: ['Verify TDLR Electrician license at tdlr.texas.gov', 'Permit required for panel upgrades, new circuits, EV chargers', 'Get 3 written quotes — price variance is high in DFW market'],
};

const typeOverrides: Record<string, Partial<typeof baseData>> = {
  '1950s Slab': { panelSafety: ['Fuse box? Replace immediately — fire hazard', 'Knob-and-tube wiring: inspect with licensed electrician', 'Aluminum wiring (common 1950s–70s): needs COPALUM connectors'] },
  '1970s Pier & Beam': { upgrades: ['60-amp or 100-amp panel common — likely undersized', 'Upgrade to 200-amp before adding any major appliance', 'Check for aluminum branch wiring — requires remediation'] },
  '1990s Two-Story': { gfci: ['Verify GFCI protection on both floors', 'Arc-fault interrupters (AFCI) may not be installed — add for bedrooms', 'Test all GFCI outlets — often skipped during resale'] },
  '2000s+ New Build': { storm: ['Surge protection may already be at panel — verify', 'Smart panels (Leviton, Square D) available for upgrade', 'EV-ready conduit may already be run — ask electrician'] },
};

export default function DFWElectricalFinalReferenceCard() {
  const [homeType, setHomeType] = useState(homeTypes[0]);
  const data = { ...baseData, ...(typeOverrides[homeType] || {}) };

  const sections = [
    { emoji: '⚡', title: 'Panel Safety', items: data.panelSafety },
    { emoji: '🔌', title: 'GFCI Testing', items: data.gfci },
    { emoji: '🌿', title: 'Outdoor Safety', items: data.outdoor },
    { emoji: '⛈️', title: 'Storm Surge Protocol', items: data.storm },
    { emoji: '🔋', title: 'Upgrade Timing', items: data.upgrades },
    { emoji: '✅', title: 'Contractor Vetting', items: data.vetting },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>⚡🔌</div>
          <h1 style={{ color: '#F5E642', fontSize: '26px', fontWeight: 800, margin: 0 }}>DFW Electrical Final Reference Card</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px' }}>Everything you need — one page, DFW-specific</p>
        </div>

        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <label style={{ color: '#cbd5e1', fontSize: '13px', marginRight: '10px' }}>My DFW Home Type:</label>
          <select
            value={homeType}
            onChange={e => setHomeType(e.target.value)}
            style={{ background: '#1e293b', color: '#F5E642', border: '1px solid #F5E642', borderRadius: '6px', padding: '6px 12px', fontSize: '13px' }}
          >
            {homeTypes.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {sections.map(sec => (
            <div key={sec.title} style={{ background: '#1e293b', borderRadius: '10px', padding: '16px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>{sec.emoji}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: '14px' }}>{sec.title}</span>
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
                {sec.items.map((item, i) => (
                  <li key={i} style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: '1.6', marginBottom: '4px' }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', background: '#F5E642', borderRadius: '8px', padding: '12px 16px', textAlign: 'center' }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: '13px' }}>📋 Print this card — post it near your electrical panel</span>
        </div>
      </div>
    </div>
  );
}
