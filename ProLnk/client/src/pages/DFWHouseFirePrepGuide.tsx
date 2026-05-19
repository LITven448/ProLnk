import { useState } from 'react';

const fireRiskData: Record<string, Record<string, { score: number; label: string; color: string; checklist: string[]; escapeNotes: string[] }>> = {
  'urban-infill': {
    'attached': { score: 5, label: 'MODERATE', color: '#f59e0b', checklist: ['Install interconnected smoke detectors on every floor and in every bedroom', 'Place smoke detector outside each sleeping area', 'CO detector on each level with sleeping areas', 'Class ABC fire extinguisher in kitchen — mount visibly, not under sink', 'Check that fireplace damper closes fully — open dampers pull fire through home', 'Clear dryer vent annually — #1 appliance fire cause in DFW'], escapeNotes: ['Plan two exits from every room', 'Attached garage fire can spread in under 3 minutes — close door always', 'Designate meeting point at street — never go back inside', 'Practice escape with doors closed — feel handle before opening'] },
    'detached': { score: 3, label: 'LOW-MODERATE', color: '#84cc16', checklist: ['Smoke detector in each bedroom, hallway, and living area', 'CO detector near sleeping areas and near any gas appliances', 'Fire extinguisher in kitchen (Class K) and garage (Class ABC)', 'Space heater clearance: 3 feet from all combustibles', 'Inspect electrical panel for signs of overheating or corrosion', 'Test smoke detector batteries every 6 months; replace detector every 10 years'], escapeNotes: ['Two escape routes from each room — second story escape ladder stored in bedroom', 'Family meeting spot at end of driveway or neighbor\’s mailbox', 'Practice nighttime drill: feel door, crawl low, signal from window if trapped'] },
  },
  'suburban': {
    'attached': { score: 6, label: 'MODERATE', color: '#f59e0b', checklist: ['Interconnected smoke detectors throughout home — when one sounds, all sound', 'Garage fire is most common attached-home fire entry point — keep garage door to home closed and self-closing', 'Defensible space: remove dead vegetation within 30 feet of home (outer DFW suburbs)', 'Install fire-resistant door between garage and living space — 20-minute rated door required by code', 'Class ABC extinguisher in kitchen and garage — know how to use PASS technique'], escapeNotes: ['Garage attached fires move fast — practice escape route that avoids garage corridor', 'Neighborhood meeting point — know address to tell 911 from the street', 'Window escape ladders on all upper floors', 'Family code word for nighttime fire drills'] },
    'detached': { score: 4, label: 'LOW-MODERATE', color: '#84cc16', checklist: ['Smoke detector placement: ceiling, 4 inches from wall — not in corners where dead air collects', 'Replace smoke detectors manufactured before 2014 — ionization type may not detect smoldering fires', 'Combination ionization + photoelectric detector recommended for DFW homes', 'Kitchen extinguisher within 30 feet of stove but NOT above stove — never reach over fire to grab it', 'Annual chimney inspection if you have wood-burning fireplace', 'GFCI outlets in kitchen, bath, garage, outdoors — prevents electrical fire from moisture'], escapeNotes: ['Two-story homes: escape ladders in each second-floor bedroom', 'Practice calling 911 — children should know address', 'Do not stop to grab belongings — 3 minutes to untenable conditions', 'Designate rally point visible from street for headcount'] },
  },
  'wui-interface': {
    'attached': { score: 9, label: 'HIGH', color: '#ef4444', checklist: ['Defensible space zone 1 (0–30 ft): no dead vegetation, fire-resistant plants only, no woodpiles', 'Defensible space zone 2 (30–100 ft): reduce ladder fuels (remove low branches), space trees 10+ feet apart', 'Replace wood shake roof with Class A fire-rated asphalt or metal roofing', 'Vent guards: ember-resistant 1/8-inch metal mesh on all vents — embers enter through vents', 'Multi-pane windows — single pane fails in radiant heat; double/triple pane provides time to escape', 'Clear gutters of dead leaves — embers land in gutters and ignite home', 'Never store combustibles on deck or against exterior walls'], escapeNotes: ['WUI evacuation: GO EARLY — do not wait for mandatory evacuation order', 'Fill bathtubs with water before evacuating — helps firefighters if home accessed', 'Close all interior doors before leaving — slows fire spread through home', 'Alert neighbors when leaving — not everyone may have received evacuation notice'] },
    'detached': { score: 7, label: 'HIGH', color: '#ef4444', checklist: ['Clear combustible vegetation 100 feet around structure (WUI standard)', 'Install ember-resistant vents on attic, eaves, and foundation — major home ignition pathway', 'Replace or seal wood siding and fascia — embers ignite exposed wood surfaces', 'Metal deck with non-combustible furniture only', 'Propane tanks: 10-foot clearance from structure, shut off and cover when fire risk is high', 'Remove wood fencing attached directly to home — fire highway into structure', 'Keep hoses accessible: 100-foot hose on each side of home'], escapeNotes: ['Two pre-planned evacuation routes — one may be blocked by fire', 'Keep car fueled during fire season — gas stations may be closed or overwhelmed', 'Sign up for Tarrant/Dallas/Denton County emergency alerts for evacuation orders', 'Grab-and-go bag packed: documents, medications, 72-hour supplies'] },
  },
};

export default function DFWHouseFirePrepGuide() {
  const [location, setLocation] = useState('');
  const [homeType, setHomeType] = useState('');
  const [result, setResult] = useState<null | { score: number; label: string; color: string; checklist: string[]; escapeNotes: string[] }>(null);

  function assess() {
    if (location && homeType) setResult(fireRiskData[location]?.[homeType] ?? null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔥</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW House Fire Prep Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>From WUI wildfire to kitchen fires — know your specific risk</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🚨 Smoke Detector Placement (Exact Locations)</h2>
          {[['Every bedroom', 'Inside each bedroom — smoke often starts at night when you\’re asleep'], ['Outside sleeping areas', 'In hallway immediately outside every bedroom door'], ['Every floor', 'Including basement and attic if there\’s a living space or HVAC equipment'], ['Kitchen area', '10 feet from stove — closer causes nuisance alarms from cooking steam'], ['Garage', 'If attached, CO and smoke detector inside garage near door to home'], ['Interconnected', 'When one alarm sounds, all sound — required for new construction in Texas']].map(([loc, desc]) => (
            <div key={loc} style={{ display: 'flex', gap: 14, padding: '9px 0', borderBottom: '1px solid #0A1628′ }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 160, fontSize: 13 }}>{loc}</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🧯 Fire Extinguisher by Room</h2>
          {[['Kitchen', 'Class K (wet chemical) for grease fires OR Class ABC rated for general use — mount within 30 feet of stove, NOT above it'], ['Garage', 'Class ABC — covers wood, fuel, and electrical fires from car, tools, and stored items'], ['Master bedroom', 'Class ABC — keep one accessible for nighttime fires when escape may be blocked'], ['Workshop / Hobby room', 'Class ABC — power tools and flammable liquids present'], ['Fireplace room', 'Class ABC nearby — chimney sparks can ignite area rugs and furniture']].map(([room, note]) => (
            <div key={room} style={{ display: 'flex', gap: 14, padding: '9px 0', borderBottom: '1px solid #0A1628′ }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 140, fontSize: 13 }}>{room}</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{note}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Fire Risk & Escape Plan Assessment</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Lot Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', fontSize: 15 }}>
              <option value="">Select location...</option>
              <option value="urban-infill">Urban / Infill (inside LBJ/635 loop area)</option>
              <option value="suburban">Suburban (Plano, Frisco, McKinney, Mansfield area)</option>
              <option value="wui-interface">WUI / Outer Suburbs (Weatherford, Granbury, Roanoke, Argyle area near open land)</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Home Type</label>
            <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', fontSize: 15 }}>
              <option value="">Select home type...</option>
              <option value="attached">Attached / Townhome (shares wall with neighbor)</option>
              <option value="detached">Detached Single-Family Home</option>
            </select>
          </div>
          <button onClick={assess} style={{ width: '100%', padding: 14, background: '#F5E642', color: '#0A1628', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get Risk Score + Escape Plan →</button>

          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: result.color }}>Fire Risk: {result.label}</div>
                <div style={{ background: result.color, borderRadius: 20, padding: '2px 12px', fontSize: 13, color: '#0A1628', fontWeight: 700 }}>{result.score}/10</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>✅ Prevention Checklist</div>
                {result.checklist.map((c, i) => <div key={i} style={{ padding: '5px 0', color: '#cbd5e1', fontSize: 14, borderBottom: '1px solid #1e3a5f' }}>✓ {c}</div>)}
              </div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>🚪 Escape Plan Notes</div>
                {result.escapeNotes.map((n, i) => <div key={i} style={{ padding: '5px 0', color: '#94a3b8', fontSize: 14, borderBottom: '1px solid #1e3a5f' }}>→ {n}</div>)}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📞 Fire Safety Resources</h2>
          {[['🚒 DFW Fire Emergency', '911'], ['🌿 Texas A&M Forest Service', 'tfsweb.tamu.edu — wildfire risk maps'], ['🏠 NFPA Home Escape Plan', 'nfpa.org/escape'], ['💰 Fire Extinguisher Training', 'Contact your local DFW fire station — free demos']].map(([l, v]) => (
            <div key={l as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #0A1628', color: '#cbd5e1', fontSize: 13, flexWrap: 'wrap', gap: 4 }}>
              <span>{l}</span><span style={{ color: '#F5E642', fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
