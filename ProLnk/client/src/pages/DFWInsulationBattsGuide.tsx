import { useState } from 'react';

const insulationData: Record<string, Record<string, { rValue: string; battType: string; vaporBarrier: string; notes: string }>> = {
  'Exterior walls': {
    'No existing insulation': { rValue: 'R-15 (2x4 wall) or R-21 (2x6 wall)', battType: 'Kraft-faced fiberglass batts', vaporBarrier: 'Kraft facing toward INTERIOR (living space) — DFW Zone 3A rule', notes: 'DFW is hot-humid (Zone 3A). Vapor barrier always faces interior. R-15 for standard 2x4 walls is minimum code. Upgrade to 2x6 framing + R-21 for significant energy savings.' },
    'Partial / damaged insulation': { rValue: 'Supplement to R-15 or R-21 total', battType: 'Unfaced batts (layer over existing)', vaporBarrier: 'No second vapor barrier — unfaced only when adding to existing', notes: 'Never put two vapor barriers in same wall cavity — traps moisture. Use unfaced batts to add R-value to partial insulation. Fill gaps completely — voids lose more heat than thin insulation.' },
  },
  'Attic floor': {
    'No existing insulation': { rValue: 'R-38 minimum (DFW Energy Star)', battType: 'Unfaced fiberglass batts between joists, blown-in cellulose over top', vaporBarrier: 'No vapor barrier on attic floor — DFW attics must breathe', notes: 'DFW attics see 140°F+ heat. R-38 minimum, R-49–60 ideal. Do NOT use vapor barrier on attic floor — traps moisture. Ventilation is critical. Seal all air bypasses first (biggest bang for buck).' },
    'Partial / damaged insulation': { rValue: 'Add batts/blown to reach R-38–49 total', battType: 'Unfaced batts in gaps + blown cellulose over existing', vaporBarrier: 'None — existing attic floor, no vapor barrier needed', notes: 'Check existing insulation for moisture damage (common after DFW hail events with roof leaks). Wet insulation = zero R-value. Remove and replace damaged sections before adding new material.' },
  },
  'Crawlspace floor': {
    'No existing insulation': { rValue: 'R-19 between floor joists', battType: 'Kraft-faced batts, facing UP toward living space', vaporBarrier: 'Kraft facing UP (toward living space) — DFW Zone 3A', notes: 'DFW crawlspaces are warm-humid. Face vapor barrier toward living space. Secure batts with wire supports (insulation hangers) — DFW humidity causes batts to sag if not supported.' },
    'Partial / damaged insulation': { rValue: 'Replace damaged sections to R-19', battType: 'Kraft-faced replacement batts', vaporBarrier: 'Kraft facing UP — consistent direction throughout', notes: 'DFW crawlspace insulation often damaged by moisture or pest activity. Inspect for rodent nests before handling. Wear N95 respirator — dried rodent droppings are a health hazard.' },
  },
  'Interior walls (soundproofing)': {
    'No existing insulation': { rValue: 'R-11 to R-15 (sound, not thermal)', battType: 'Unfaced fiberglass or mineral wool batts', vaporBarrier: 'None — interior walls, no vapor barrier', notes: 'Interior walls are for sound dampening, not thermal. Mineral wool (Rockwool) performs better for sound than fiberglass. No vapor barrier in interior walls — creates moisture trap.' },
    'Partial / damaged insulation': { rValue: 'Fill to complete coverage', battType: 'Unfaced batts to fill gaps', vaporBarrier: 'None', notes: 'Interior wall gaps are common in DFW remodels. Full coverage matters more than R-value for sound. Cut batts precisely — compression reduces R-value and sound performance.' },
  },
};

export default function DFWInsulationBattsGuide() {
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState('');
  const result = location && condition ? insulationData[location]?.[condition] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 DFW HOME GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Fiberglass Batt Insulation — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>R-values for DFW Zone 3A, PPE requirements, cutting technique, and the critical vapor barrier direction rule for DFW's climate.</p>

        <div style={{ background: '#f59e0b20', border: '1px solid #F5E642', borderRadius: 12, padding: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>⚠️ PPE Required — Read Before Handling</div>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.7 }}>
            Fiberglass batts release microscopic glass fibers that cause intense skin irritation, eye injury, and respiratory damage. 
            Required PPE: long-sleeve shirt, gloves, safety glasses or goggles, N95 respirator minimum (P100 preferred in confined spaces). 
            DFW summer attic work: add a cooling vest or schedule before 7am. Do not rub eyes after handling — wash hands thoroughly before touching face.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>✂️ Cutting Technique</div>
            <ul style={{ color: '#cbd5e1', fontSize: '0.85rem', paddingLeft: '1.25rem', lineHeight: 1.7 }}>
              <li>Use a straightedge and utility knife</li>
              <li>Cut from facing side, compress slightly</li>
              <li>Batts should fit snug — no gaps</li>
              <li>Compression reduces R-value — don't overfill</li>
              <li>Cut around wiring, don't compress over it</li>
            </ul>
          </div>
          <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>🌡️ DFW Zone 3A Rules</div>
            <ul style={{ color: '#cbd5e1', fontSize: '0.85rem', paddingLeft: '1.25rem', lineHeight: 1.7 }}>
              <li>Hot-humid climate — vapor barrier faces interior</li>
              <li>Attic: R-38 minimum, R-49 recommended</li>
              <li>Walls: R-15 (2x4) or R-21 (2x6)</li>
              <li>No vapor barrier in attic or crawlspace floor</li>
              <li>Air sealing saves more than R-value alone</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#F5E642′ }}>🎯 DFW Insulation Selector</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>DFW Insulation Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select location</option>
                <option value="Exterior walls">Exterior walls</option>
                <option value="Attic floor">Attic floor</option>
                <option value="Crawlspace floor">Crawlspace floor</option>
                <option value="Interior walls (soundproofing)">Interior walls (sound)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Existing Condition</label>
              <select value={condition} onChange={e => setCondition(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select condition</option>
                <option value="No existing insulation">No existing insulation</option>
                <option value="Partial / damaged insulation">Partial / damaged insulation</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642′ }}>R-Value Target:</span> <span style={{ color: '#fff', fontWeight: 600 }}>{result.rValue}</span></div>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642′ }}>Batt Type:</span> <span style={{ color: '#fff' }}>{result.battType}</span></div>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642′ }}>Vapor Barrier (DFW Zone 3A):</span> <span style={{ color: '#fff' }}>{result.vaporBarrier}</span></div>
              <div><span style={{ color: '#F5E642′ }}>Notes:</span> <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{result.notes}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>💡 DFW Energy Impact</div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            DFW homes with properly insulated attics save $400–900/year on cooling. Air sealing before insulating 
            is the highest-ROI step — seal top plates, penetrations, and recessed lights first. 
            Typical DFW payback on attic insulation upgrade: 2–4 years. Many DFW utility companies 
            (Oncor, CoSERV) offer rebates up to $150 for attic insulation improvements — check before starting.
          </p>
        </div>
      </div>
    </div>
  );
}
