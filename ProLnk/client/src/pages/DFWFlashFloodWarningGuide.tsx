import { useState } from 'react';

const alertLevels = [
  {
    level: 'Flash Flood Watch',
    emoji: '👁️',
    color: '#f59e0b',
    issued: 'NWS DFW issues when conditions are favorable for flash flooding within 48 hrs',
    riseSpeed: 'Potential — no active flooding yet',
    actions: ['Monitor NWS DFW alerts and local news', 'Move valuables and documents above flood level', 'Know your evacuation route', 'Charge devices, prepare go-bag', 'Check sump pump operation'],
    evacuate: false,
  },
  {
    level: 'Flash Flood Warning',
    emoji: '⚠️',
    color: '#ef4444',
    issued: 'Active flash flooding is occurring or imminent — issued by NWS DFW',
    riseSpeed: 'Water can rise 1–3 ft in under 30 minutes in DFW creek corridors',
    actions: ['Move to upper floors immediately if in flood-prone area', 'Do NOT drive through flooded roadways (Turn Around Dont Drown)', 'Unplug electronics if water is entering', 'Call 911 if trapped', 'Avoid creek banks and drainage channels'],
    evacuate: false,
  },
  {
    level: 'Flash Flood Emergency',
    emoji: '🚨',
    color: '#7c3aed',
    issued: 'Extremely rare — life-threatening flooding of biblical scale occurring NOW',
    riseSpeed: 'Water can rise 5+ ft in minutes — survival window is very short',
    actions: ['Evacuate IMMEDIATELY if ordered', 'Move to highest ground available', 'Do NOT re-enter home until cleared by authorities', 'If car is swept away, exit and swim to high ground', 'Emergency broadcast will contain specific shelter locations'],
    evacuate: true,
  },
];

const zones = [
  { name: 'Elm Fork / West Dallas (Trinity)', risk: 'Very High', flood100yr: '12 ft above bank', note: 'Multiple FEMA Zone AE areas', emoji: '🟠' },
  { name: 'White Rock Creek Corridor (NE Dallas)', risk: 'High', flood100yr: '8 ft above bank', note: 'Urban development accelerates runoff', emoji: '🔴' },
  { name: 'Cottonwood / Coppell (Lewisville Lake area)', risk: 'High', flood100yr: '6 ft above bank', note: 'Lake overflow risk in extreme events', emoji: '🔴' },
  { name: 'Marine Creek (Fort Worth NW)', risk: 'High', flood100yr: '9 ft above bank', note: 'Rapid rise after heavy rain upstream', emoji: '🔴' },
  { name: 'Upland Suburban (Frisco / Allen / McKinney)', risk: 'Moderate', flood100yr: '4 ft in low spots', note: 'Sheet flow and street flooding common', emoji: '🟡' },
  { name: 'Downtown Dallas / Uptown', risk: 'Moderate', flood100yr: 'Street flooding likely', note: 'Storm drain overload in 3″+ events', emoji: '🟡' },
];

const propertyTypes = [
  { type: 'Single-family (grade level)', extra: 'Confirm base flood elevation (BFE) on FEMA map; add door flood barriers', emoji: '🏠' },
  { type: 'Single-family (elevated slab)', extra: 'Check garage and window well drainage; lower risk than grade level', emoji: '🏡' },
  { type: 'Garden apartment / ground floor', extra: 'Highest risk — consider flood insurance even if not required; store valuables up high', emoji: '🏢' },
  { type: 'Commercial / warehouse', extra: 'Check dock seals and floor drains; have sandbags ready for doorways', emoji: '🏭' },
];

export default function DFWFlashFloodWarningGuide() {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [selectedProp, setSelectedProp] = useState<number | null>(null);

  const alert = selectedAlert !== null ? alertLevels[selectedAlert] : null;
  const zone = selectedZone !== null ? zones[selectedZone] : null;
  const prop = selectedProp !== null ? propertyTypes[selectedProp] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🌊</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW Flash Flood Warning Guide
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: 580, margin: '0 auto' }}>
            DFW's clay soil, impervious surfaces, and creek corridors create rapid flash flooding. DFW creeks can rise 3+ feet per hour during severe storms. Know the alerts before the rain starts.
          </p>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🚨 Alert Level — What's Happening Now?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {alertLevels.map((a, i) => (
              <button key={a.level} onClick={() => setSelectedAlert(i === selectedAlert ? null : i)}
                style={{ background: selectedAlert === i ? '#1e3a5f' : '#0A1628', border: `2px solid ${selectedAlert === i ? '#F5E642' : a.color}`, borderRadius: '10px', padding: '0.85rem 1.2rem', cursor: 'pointer', color: '#fff', textAlign: 'left', display: 'flex', gap: '1rem', alignItems: 'center', transition: 'all 0.2s' }}>
                <span style={{ fontSize: '1.8rem' }}>{a.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, color: a.color }}>{a.level}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{a.issued}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {alert && (
          <div style={{ background: '#1e2d47', borderRadius: '16px', padding: '1.5rem', border: `2px solid ${alert.color}`, marginBottom: '1.5rem' }}>
            <h3 style={{ color: alert.color, marginBottom: '1rem' }}>{alert.emoji} {alert.level} — Response Plan</h3>
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>⏱️ Flood Rise Speed</div>
              <div style={{ color: '#e2e8f0′ }}>{alert.riseSpeed}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>✅ Immediate Actions</div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#e2e8f0′ }}>
                {alert.actions.map((a) => <li key={a} style={{ marginBottom: '0.25rem' }}>{a}</li>)}
              </ul>
            </div>
            {alert.evacuate && <div style={{ background: '#7c3aed', borderRadius: '10px', padding: '1rem', color: '#fff', fontWeight: 700, textAlign: 'center', fontSize: '1.1rem' }}>🚨 EVACUATE IMMEDIATELY — Do not wait</div>}
          </div>
        )}

        <div style={{ background: '#1e2d47', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>📍 DFW Flood Zone — Select Location</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {zones.map((z, i) => (
              <button key={z.name} onClick={() => setSelectedZone(i === selectedZone ? null : i)}
                style={{ background: selectedZone === i ? '#1e3a5f' : '#0A1628', border: selectedZone === i ? '2px solid #F5E642′ : '2px solid #2d4a6b', borderRadius: '10px', padding: '0.75rem 1rem', cursor: ’pointer', color: '#fff', textAlign: 'left', display: 'flex', justifyContent: 'space-between', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><span>{z.emoji}</span><div><div style={{ fontWeight: 600 }}>{z.name}</div><div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{z.note}</div></div></div>
                <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}><div style={{ color: '#ef4444', fontWeight: 700 }}>{z.risk}</div><div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{z.flood100yr}</div></div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🏘️ Property Type — Select Yours</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {propertyTypes.map((p, i) => (
              <button key={p.type} onClick={() => setSelectedProp(i === selectedProp ? null : i)}
                style={{ background: selectedProp === i ? '#1e3a5f' : '#0A1628', border: selectedProp === i ? '2px solid #F5E642′ : '2px solid #2d4a6b', borderRadius: '10px', padding: '0.85rem', cursor: ’pointer', color: '#fff', textAlign: 'left', transition: 'all 0.2s' }}>
                <div style={{ fontSize: '1.5rem' }}>{p.emoji}</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p.type}</div>
                {selectedProp === i && <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '0.4rem' }}>{p.extra}</div>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
