import { useState } from 'react';

const emergencySteps = [
  { emoji: '🪣', label: 'Contain Water Now', detail: 'Place buckets under active drips. Lay towels to prevent spread. Move electronics, documents, and valuables immediately.' },
  { emoji: '📸', label: 'Document Everything', detail: 'Photo and video all damage before cleanup — ceiling stains, wet walls, damaged items. Insurance requires proof.' },
  { emoji: '🔵', label: 'Tarp the Roof', detail: 'If safe and roof is accessible, a 6–10 mil poly tarp secured over the leak area can stop ongoing damage. Do not go on roof in rain.' },
  { emoji: '📋', label: 'File Insurance Claim', detail: 'DFW storms = covered perils. Call insurer within 24h of storm damage. Get claim number before calling roofers.' },
];

const leakZones = [
  { id: 'valley', emoji: '📐', label: 'Roof Valley', detail: 'Where two roof planes meet. High water volume makes valleys the most common DFW leak point. Requires valley flashing replacement.' },
  { id: 'flashing', emoji: '🔗', label: 'Chimney / Wall Flashing', detail: 'Step flashing around chimneys and dormers separates and corrodes. Often the source of slow leaks. Reseal or replace flashing.' },
  { id: 'pipe-boot', emoji: '🔧', label: 'Pipe Boot / Vent Boot', detail: 'Rubber boots around plumbing vents crack in DFW UV exposure. Extremely common cause — visible from ground with binoculars.' },
  { id: 'ridge', emoji: '🏔️', label: 'Ridge Cap', detail: 'Ridge caps take direct hail hits. Lifted or missing ridge caps allow wind-driven rain under shingles. Check after hail.' },
  { id: 'gutters', emoji: '🌊', label: 'Gutter Overflow / Ice Dam', detail: 'Clogged gutters cause water to back up under shingles. Rare ice dams possible in hard DFW freezes.' },
];

const actionMap: Record<string, Record<string, { action: string; insurance: string; callWho: string }>> = {
  valley: {
    'active-storm': { action: 'Tarp if accessible; collect water; document damage extensively', insurance: 'Storm damage — file immediately with photos', callWho: 'Emergency roofer + insurance adjuster' },
    'after-storm': { action: 'Inspect valley for lifted or missing shingles; check flashing seams', insurance: 'Document before any repairs; get adjuster out', callWho: 'Licensed roofer for inspection' },
    'no-storm': { action: 'Valley flashing may have separated; check from attic for daylight', insurance: 'Likely maintenance issue — may not be covered', callWho: 'Roofer for flashing repair' },
  },
  pipe-boot: {
    'active-storm': { action: 'Collect water inside; do not go on roof in storm', insurance: 'Storm-related boot damage may be covered', callWho: 'Emergency roofer after storm passes' },
    'after-storm': { action: 'Inspect boots visually from ground or attic for cracking/lifting', insurance: 'Storm damage covered; wear/tear may not be', callWho: 'Roofer — pipe boot replacement is quick/cheap ($150–$300)' },
    'no-storm': { action: 'UV-cracked boot is a maintenance issue — common in DFW heat', insurance: 'Not typically covered — wear and tear exclusion', callWho: 'Roofer — fast repair, often same day' },
  },
  flashing: {
    'active-storm': { action: 'Document damage; contain water; do not attempt repairs in storm', insurance: 'Wind or hail damage to flashing is covered', callWho: 'Emergency roofer + insurance adjuster' },
    'after-storm': { action: 'Check for lifted or bent step flashing around chimney and walls', insurance: 'Storm damage is covered; get photos before repair', callWho: 'Licensed roofer or masonry contractor' },
    'no-storm': { action: 'Failing caulk or separated flashing is maintenance — reseal or replace', insurance: 'Generally not covered', callWho: 'Roofer for flashing repair ($200–$800)' },
  },
};

export default function DFWLeakingRoofGuide() {
  const [leakZone, setLeakZone] = useState('');
  const [weather, setWeather] = useState('');
  const result = leakZone && weather ? actionMap[leakZone]?.[weather] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 12px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>DFW STORM EMERGENCY</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏠 Leaking Roof — DFW Emergency Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>DFW severe thunderstorms can breach a roof in minutes. First steps matter for safety and insurance — follow this guide immediately.</p>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>⚡ Immediate Steps</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {emergencySteps.map(s => (
              <div key={s.label} style={{ background: '#132035', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{s.emoji} {s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{s.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>📍 Common DFW Leak Locations</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {leakZones.map(z => (
              <div key={z.id} style={{ background: '#132035', borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{z.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{z.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>{z.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 10, padding: 22, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 Action Planner</h2>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>Where is the leak?</label>
            <select value={leakZone} onChange={e => setLeakZone(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, fontSize: 14 }}>
              <option value="">Select location...</option>
              <option value="valley">Roof valley (between slopes)</option>
              <option value="pipe-boot">Around plumbing vent pipe</option>
              <option value="flashing">Chimney or wall flashing</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>Current weather situation?</label>
            <select value={weather} onChange={e => setWeather(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, fontSize: 14 }}>
              <option value="">Select situation...</option>
              <option value="active-storm">Storm is actively happening now</option>
              <option value="after-storm">Storm recently passed</option>
              <option value="no-storm">No recent storm — ongoing leak</option>
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Immediate Action: </span>{result.action}</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Insurance: </span>{result.insurance}</div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Who to Call: </span>{result.callWho}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#7f1d1d', borderRadius: 8, padding: 14, fontSize: 13 }}>
          🚨 <strong>Safety First:</strong> Never go on a wet roof. Never use electricity in a water-damaged room. If water is near electrical panels, call 911 and evacuate.
        </div>
      </div>
    </div>
  );
}
