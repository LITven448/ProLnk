import { useState } from 'react';

const tornadoGuide = [
  { homeType: 'Single-Story Slab', icon: '🏠', shelter: 'Interior bathroom or closet (no windows)', warning: 'No basement in DFW — bathtub with mattress over you is the best protection in a single-story slab home.', alerts: 'Tarrant County: tarrantcounty.com/alerts | Dallas County: dallascounty.org/emergency | NOAA Weather Radio: 162.550 MHz', postTornado: 'Document ALL damage with photos before touching anything. Call ProLnk for emergency structural inspection. DO NOT enter if structure is compromised.', insurance: 'Texas requires insurers to offer tornado coverage. Document pre-storm home condition in Home Health Vault now — before damage occurs.' },
  { homeType: 'Two-Story Home', icon: '🏡', shelter: 'Ground floor interior room, away from windows', warning: 'Go to lowest floor, most interior room. Stairs and upper floors are dangerous during tornado. Bring pets and emergency kit.', alerts: 'Sign up for Wireless Emergency Alerts on your phone. DFW Metroplex uses Outdoor Warning Sirens — audible outside only, not indoors.', postTornado: 'Check for gas leaks first (smell + hissing). Call 911 if you smell gas. Don\'t use electrical switches if water intrusion occurred. Document everything.', insurance: 'Texas wind deductibles are typically 1-2% of home value, not a flat amount. Know your deductible BEFORE storm season. Check your policy now.' },
  { homeType: 'Pier & Beam Home', icon: '🏚️', shelter: 'Interior closet on ground floor or safe room', warning: 'Pier & beam homes have slight flex advantage but still no substitute for interior room. Avoid crawl space during tornado.', alerts: 'DFW\'s warning time averages 8-13 minutes. Have a plan before storms develop. Weather apps: RadarScope, MyRadar for storm tracking.', postTornado: 'Pier & beam foundations can shift during tornado. Have foundation inspected before assuming home is safe. Check for gas, water, electrical damage.', insurance: 'Document pier & beam foundation condition in Home Health Vault. Pre-existing foundation issues can complicate claims. Annual photos protect you.' },
  { homeType: 'Mobile / Manufactured', icon: '🏕️', shelter: 'Leave immediately — go to community shelter or sturdy building', warning: 'NEVER shelter in a mobile or manufactured home during a tornado — even with tie-downs. DFW mobile home parks should have community shelters.', alerts: 'Sign up for county emergency alerts IMMEDIATELY. Mobile homes are 10x more likely to be destroyed. Know the route to nearest shelter now.', postTornado: 'Do not return until officials declare safe. Mobile home damage is often total. Document serial numbers and all contents in Home Health Vault.', insurance: 'Mobile home policies differ from standard homeowners. Verify you have actual cash value vs replacement cost coverage. Review now.' },
  { homeType: 'Safe Room Installed', icon: '🛡️', shelter: 'Your safe room — rated for EF5 tornadoes', warning: 'Safe rooms provide maximum protection. FEMA P-361 certified rooms can withstand EF5 winds. Keep emergency supplies inside year-round.', alerts: 'You have the best protection available. Still monitor weather — have 72-hour kit in safe room including water, phone charger, first aid.', postTornado: 'Safe room protects you, not your home. Still document all exterior damage immediately after storm passes. Call ProLnk for post-storm inspection.', insurance: 'Having a FEMA-certified safe room can reduce homeowner insurance premiums in Texas by 5-15%. Provide documentation to your insurer.' },
];

export default function DFWTexasTornadoGuide2026() {
  const [homeType, setHomeType] = useState('Single-Story Slab');
  const [tab, setTab] = useState('shelter');
  const result = tornadoGuide.find(g => g.homeType === homeType);

  const tabs = [
    { key: 'shelter', label: '🏃 Shelter', field: 'shelter' },
    { key: 'warning', label: '⚠️ Warning', field: 'warning' },
    { key: 'alerts', label: '📱 Alerts', field: 'alerts' },
    { key: 'postTornado', label: '🔍 After', field: 'postTornado' },
    { key: 'insurance', label: '📋 Insurance', field: 'insurance' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🌪️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>DFW Tornado Preparedness 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW is in North Texas Tornado Alley — be prepared before storm season</p>
        </div>

        <div style={{ background: '#0F2137', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 14 }}>🏠 Select Your Home Type</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {tornadoGuide.map(g => (
              <button key={g.homeType} onClick={() => setHomeType(g.homeType)} style={{ padding: '9px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: homeType === g.homeType ? '#F5E642' : '#162842', color: homeType === g.homeType ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 12 }}>{g.icon} {g.homeType}</button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: '7px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: tab === t.key ? '#F5E642' : '#162842', color: tab === t.key ? '#0A1628' : '#94a3b8', fontWeight: 600, fontSize: 12 }}>{t.label}</button>
            ))}
          </div>

          {result && (
            <div style={{ background: '#162842', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{result[tabs.find(t => t.key === tab)?.field as keyof typeof result]}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#ef4444', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#fff', fontSize: 16, margin: '0 0 8px' }}>🚨 Tornado Warning vs Watch</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#fbbf24', fontWeight: 700, marginBottom: 4 }}>WATCH</div>
              <div style={{ color: '#fff', fontSize: 13 }}>Conditions favorable. Be ready to act. Monitor weather.</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#f87171', fontWeight: 700, marginBottom: 4 }}>WARNING</div>
              <div style={{ color: '#fff', fontSize: 13 }}>Tornado confirmed or detected. Take shelter NOW.</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0F2137', borderRadius: 12, padding: 20 }}>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>Store your insurance policy, home photos, and structural documentation in Home Health Vault NOW — before damage occurs. ProLnk connects you with DFW storm damage contractors for rapid post-tornado assessment and repair.</p>
        </div>
      </div>
    </div>
  );
}