import { useState } from 'react';

const conduitTypes = [
  { id: 'emt', label: 'EMT Conduit', emoji: '🔩', desc: 'Electrical Metallic Tubing — most common in DFW garages and exposed indoor runs. Lightweight, easy to bend, code-required in many commercial applications.', uses: ['Garage wiring', 'Exposed basement runs', 'Panel feeders', 'Workshops'] },
  { id: 'pvc', label: 'PVC Conduit', emoji: '🟡', desc: 'Schedule 40 or 80 PVC — required for outdoor and underground runs in DFW. Resistant to moisture and soil chemicals. Cannot use indoors in DFW fire codes.', uses: ['Underground service entrance', 'Outdoor subpanel feeds', 'Pool/spa wiring', 'Irrigation systems'] },
  { id: 'flex', label: 'Flexible Conduit', emoji: '🌀', desc: 'Greenfield or liquidtight flex — used where rigid conduit cannot reach. Required for HVAC equipment connections and appliance final connections in DFW.', uses: ['HVAC unit connections', 'Motor equipment', 'Final 18-inch to appliances', 'Vibration-prone equipment'] },
  { id: 'romex', label: 'Romex (No Conduit)', emoji: '📦', desc: 'NM-B cable (Romex) is allowed in walls, attics, and crawlspaces. Not allowed exposed in DFW garages or commercial spaces. Most DFW residential circuits use this.', uses: ['In-wall branch circuits', 'Attic wiring runs', 'Crawlspace feeds', 'Switch loops'] },
];

const locationGuide: Record<string, string> = {
  'garage': 'EMT Conduit — exposed runs in DFW garages require conduit per local amendment. Use EMT for wall runs, PVC for any underground exit.',
  'outdoor': 'PVC Conduit (Schedule 40) — all outdoor exposed wiring in DFW must use conduit. Liquidtight flex for final equipment connections.',
  'underground': 'PVC Conduit (Schedule 80) — underground feeders in DFW require Schedule 80 PVC at 6-inch depth minimum for 120V, 24-inch for 240V.',
  'hvac': 'Liquidtight Flexible Conduit — required for the final connection to HVAC equipment per DFW mechanical code. Minimum 12 inches.',
  'attic': 'Romex (NM-B) — allowed in DFW attics running along joists. If exposed and accessible, EMT is preferred for protection.',
  'panel': 'EMT Conduit — feeder wires to subpanels require conduit in DFW. Size conduit per wire gauge: 1" EMT for #4 AWG and smaller.',
};

export default function DFWElectricalConduitGuide2026() {
  const [location, setLocation] = useState<string>('');
  const [activeType, setActiveType] = useState<string>('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Electrical Conduit Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Which conduit type is required for your DFW project?</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📍 Find Conduit by Installation Location</h2>
          <select
            value={location}
            onChange={e => setLocation(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}
          >
            <option value="">Select installation location...</option>
            <option value="garage">Garage (exposed wiring)</option>
            <option value="outdoor">Outdoor / Exterior wall</option>
            <option value="underground">Underground run</option>
            <option value="hvac">HVAC equipment connection</option>
            <option value="attic">Attic wiring run</option>
            <option value="panel">Panel / Subpanel feeder</option>
          </select>
          {location && (
            <div style={{ marginTop: 14, padding: 14, background: '#0f172a', borderRadius: 8, borderLeft: '3px solid #F5E642', color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>
              ✅ {locationGuide[location]}
            </div>
          )}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 14 }}>Conduit Types in DFW Homes</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
          {conduitTypes.map(ct => (
            <div
              key={ct.id}
              onClick={() => setActiveType(activeType === ct.id ? '' : ct.id)}
              style={{ background: activeType === ct.id ? '#1e3a5f' : '#1e293b', borderRadius: 10, padding: 16, cursor: 'pointer', border: `1px solid ${activeType === ct.id ? '#F5E642' : '#334155'}` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: activeType === ct.id ? 10 : 0 }}>
                <span style={{ fontSize: 24 }}>{ct.emoji}</span>
                <span style={{ fontWeight: 600, fontSize: 16 }}>{ct.label}</span>
                <span style={{ marginLeft: 'auto', color: '#F5E642' }}>{activeType === ct.id ? '▲' : '▼'}</span>
              </div>
              {activeType === ct.id && (
                <div>
                  <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 10px' }}>{ct.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {ct.uses.map(u => <span key={u} style={{ background: '#0A1628', color: '#F5E642', padding: '3px 10px', borderRadius: 20, fontSize: 12 }}>{u}</span>)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 10, padding: 16, borderLeft: '3px solid #F5E642' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>⚠️ DFW municipalities (Dallas, Fort Worth, Plano, Frisco) each adopt local amendments to the NEC. Always verify conduit requirements with your local AHJ before starting work.</p>
        </div>
      </div>
    </div>
  );
}
