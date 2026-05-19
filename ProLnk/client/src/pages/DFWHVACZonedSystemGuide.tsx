import { useState } from 'react';

const layouts = ['Single-story open floor plan', 'Two-story traditional (bedrooms up)', 'Split-level (3 floors)', 'Master on main + bonus room', 'Detached garage/workshop to condition'];
const problems = ['Upstairs always hotter than downstairs', 'Guest rooms unused — wasting conditioned air', 'One zone occupied all day, others not', 'Different family members want different temps', 'Conditioned space added after original build'];

type ZoneRec = { system: string; cost: string; vs_dampers: string };

const matrix: Record<string, Record<string, ZoneRec>> = {
  'Single-story open floor plan': {
    'Upstairs always hotter than downstairs': { system: 'Ductless mini-split for a hot room or addition — not a multi-split zoned system. Open floor plans rarely benefit from true multi-unit zoning.', cost: '$1,800–$3,200 per zone (ductless)', vs_dampers: 'Dampers on open floor plans often fail because the space isn\’t divided. A dedicated mini-split for the problem area is more effective.' },
    'Guest rooms unused — wasting conditioned air': { system: 'Ductless multi-split: up to 5 indoor heads on one outdoor unit. Turn off unused zones without affecting others.', cost: '$8,000–$14,000 for 3-zone system', vs_dampers: 'Damper systems close off airflow but the system still conditions to the same setpoint. Multi-split actually stops conditioning unused zones independently.' },
    'One zone occupied all day, others not': { system: 'Ducted multi-zone inverter system (Mitsubishi City Multi or Daikin VRV) — a true commercial-grade residential solution.', cost: '$14,000–$22,000 for 4-zone ducted', vs_dampers: 'Dampers reduce but don\’t eliminate airflow. Multi-zone ducted gives true independent control with full airflow to active zones.' },
    'Different family members want different temps': { system: 'Ductless multi-split with individual thermostats per indoor head. Each zone is fully independent.', cost: '$9,000–$15,000 for 4-zone system', vs_dampers: 'Damper systems share one refrigerant circuit — one thermostat wins. Multi-split: each head has its own setpoint.' },
    'Conditioned space added after original build': { system: 'Ductless single-zone mini-split for the addition — simplest, most cost-effective, no duct extension needed.', cost: '$2,200–$4,000 installed', vs_dampers: 'Dampers don\’t help additions. Ductless mini-split is the correct solution for any space without existing ductwork.' },
  },
  'Two-story traditional (bedrooms up)': {
    'Upstairs always hotter than downstairs': { system: 'Two-system approach: dedicated unit for upstairs, existing unit for downstairs. Most effective solution for DFW two-stories.', cost: '$5,500–$9,000 for second system', vs_dampers: 'Damper zoning on two-stories is the #1 source of HVAC complaints. True two-system approach eliminates the problem permanently.' },
    'Guest rooms unused — wasting conditioned air': { system: 'Ducted multi-zone with variable air volume (VAV) dampers controlled by a true zoning controller — not standard bypass dampers.', cost: '$3,500–$6,000 added to existing system', vs_dampers: 'Standard dampers recirculate air; VAV zoning controllers modulate supply properly. The distinction matters for comfort and equipment life.' },
    'One zone occupied all day, others not': { system: 'Two-system: downstairs unit for daytime living, upstairs unit (inverter) at setback during day. Schedule independently.', cost: '$5,500–$9,000 for second system', vs_dampers: 'Dampers on a single two-story system are a bandaid. Two systems is the real solution.' },
    'Different family members want different temps': { system: 'Ductless multi-split for upstairs bedrooms: each bedroom gets its own head with independent setpoint.', cost: '$9,000–$14,000 for 3-bedroom upstairs', vs_dampers: 'Damper zoning gives one setpoint per zone, not per room. Multi-split: each room has its own thermostat.' },
    'Conditioned space added after original build': { system: 'Ductless single-zone for the addition regardless of two-story layout. Don\’t extend ductwork if avoidable.', cost: '$2,200–$4,500 installed', vs_dampers: 'N/A — additions need their own refrigerant circuit.' },
  },
  'Split-level (3 floors)': {
    'Upstairs always hotter than downstairs': { system: 'Three-zone VRF (variable refrigerant flow) system — the commercial technology now available residentially. One outdoor unit, three independent ducted zones.', cost: '$18,000–$28,000 installed', vs_dampers: 'Split-levels are the worst candidates for bypass damper zoning. VRF is the correct architecture.' },
    'Guest rooms unused — wasting conditioned air': { system: 'VRF multi-zone: each level is an independent zone with its own air handler. Unused level can be set to 80°F without affecting others.', cost: '$18,000–$28,000 installed', vs_dampers: 'Bypass dampers on split-levels create massive static pressure problems. VRF eliminates this entirely.' },
    'One zone occupied all day, others not': { system: 'VRF with occupancy scheduling: middle level (main living) conditions normally, top and bottom on setback schedules.', cost: '$18,000–$28,000 installed', vs_dampers: 'There is no good damper solution for 3-level split-levels. VRF is the answer.' },
    'Different family members want different temps': { system: 'VRF with independent thermostats per level. Each air handler responds to its own setpoint independently.', cost: '$18,000–$28,000 installed', vs_dampers: 'Damper systems on split-levels share a compressor that can\’t modulate between three independent demands. VRF can.' },
    'Conditioned space added after original build': { system: 'Ductless mini-split for the new space, leave existing system for original three levels.', cost: '$2,200–$4,500 installed', vs_dampers: 'Ductless is always the right answer for additions.' },
  },
  'Master on main + bonus room': {
    'Upstairs always hotter than downstairs': { system: 'Dedicated mini-split for the bonus room — the most cost-effective solution for this exact DFW scenario.', cost: '$1,800–$3,500 installed', vs_dampers: 'Dampers can\’t effectively address bonus room heat because they reduce airflow to other areas when the bonus room damper closes.' },
    'Guest rooms unused — wasting conditioned air': { system: 'Ductless mini-split for bonus room, leave main system for the rest of the house. Independent control.', cost: '$1,800–$3,500 installed', vs_dampers: 'Far simpler and more effective than adding damper zoning to the existing system.' },
    'One zone occupied all day, others not': { system: 'Mini-split for bonus room set to schedule; main system handles living areas. No interaction between systems.', cost: '$1,800–$3,500 installed', vs_dampers: 'Dampers interact with the main system\’s airflow in ways that cause hot/cold spots. Independent mini-split avoids this.' },
    'Different family members want different temps': { system: 'Mini-split for bonus room (or master suite) gives that zone full independence from the main system.', cost: '$2,500–$4,500 installed', vs_dampers: 'Independent system beats damper zoning for this use case every time.' },
    'Conditioned space added after original build': { system: 'Ductless single-zone is the standard answer. Straightforward installation, no duct modification.', cost: '$2,200–$4,000 installed', vs_dampers: 'N/A — additions get their own system.' },
  },
  'Detached garage/workshop to condition': {
    'Upstairs always hotter than downstairs': { system: 'N/A for detached structure. Single-zone mini-split is the correct and only practical solution.', cost: '$2,000–$4,000 installed', vs_dampers: 'Dampers are for connected duct systems only. Detached structures need their own refrigerant system.' },
    'Guest rooms unused — wasting conditioned air': { system: 'Ductless mini-split with remote scheduling. Run only when garage/workshop is in use.', cost: '$2,000–$4,000 installed', vs_dampers: 'Independent mini-split is always the right answer for detached structures.' },
    'One zone occupied all day, others not': { system: 'Single-zone mini-split with programmable or smart thermostat. Condition only during working hours.', cost: '$2,000–$4,000 installed', vs_dampers: 'No damper connection is possible for detached structures.' },
    'Different family members want different temps': { system: 'Each detached structure gets its own mini-split with independent control. Clean and simple.', cost: '$2,000–$4,000 per structure', vs_dampers: 'Not applicable.' },
    'Conditioned space added after original build': { system: 'Ductless mini-split is the standard solution for detached garage conditioning. Requires electrical service upgrade in some cases.', cost: '$2,500–$5,000 including electrical', vs_dampers: 'Dampers cannot extend to detached structures.' },
  },
};

export default function DFWHVACZonedSystemGuide() {
  const [layout, setLayout] = useState('');
  const [problem, setProblem] = useState('');

  const result = layout && problem ? matrix[layout]?.[problem] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>True Zoned System Guide</h1>
        <p style={{ color: '#A0AEC0', marginBottom: '2rem', fontSize: '0.97rem' }}>Multi-unit and multi-split zoned HVAC — the real solution vs damper workarounds.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>🏠 Zoned Systems vs Damper Zoning</h2>
          <p style={{ color: '#CBD5E0', fontSize: '0.93rem', lineHeight: 1.7 }}>Damper zoning uses one HVAC system with motorized dampers that close off airflow to certain areas. It's a compromise. True zoned systems use separate refrigerant circuits — either multiple independent units (multi-split) or a single VRF/VRV outdoor unit with multiple independent indoor air handlers. Each zone operates on its own refrigerant circuit with its own thermostat. In DFW, where homes have dramatically different heat loads by zone, true zoning is far more effective.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>🔍 Your Layout + Problem → Zone System Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#A0AEC0', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>HOME LAYOUT</label>
              <select value={layout} onChange={e => setLayout(e.target.value)} style={{ width: '100%', background: '#162035', color: '#E8EDF5', border: '1px solid #2D4A6E', borderRadius: 8, padding: '0.6rem 0.8rem', fontSize: '0.88rem' }}>
                <option value=''>Select layout...</option>
                {layouts.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0AEC0', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>YOUR PROBLEM</label>
              <select value={problem} onChange={e => setProblem(e.target.value)} style={{ width: '100%', background: '#162035', color: '#E8EDF5', border: '1px solid #2D4A6E', borderRadius: 8, padding: '0.6rem 0.8rem', fontSize: '0.88rem' }}>
                <option value=''>Select problem...</option>
                {problems.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#162035', borderRadius: 10, padding: '1.2rem', borderLeft: '4px solid #F5E642', display: 'grid', gap: '0.75rem' }}>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>✅ RECOMMENDED SYSTEM</div>
                <p style={{ color: '#CBD5E0', fontSize: '0.92rem', lineHeight: 1.6 }}>{result.system}</p>
              </div>
              <div style={{ borderTop: '1px solid #2D4A6E', paddingTop: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.35rem' }}>💰 COST RANGE</div>
                <p style={{ color: '#A0AEC0', fontSize: '0.88rem' }}>{result.cost}</p>
              </div>
              <div style={{ borderTop: '1px solid #2D4A6E', paddingTop: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.35rem' }}>⚖️ VS DAMPER ZONING</div>
                <p style={{ color: '#A0AEC0', fontSize: '0.88rem', lineHeight: 1.6 }}>{result.vs_dampers}</p>
              </div>
            </div>
          )}
        </div>
        <div style={{ color: '#4A6080', fontSize: '0.78rem', textAlign: 'center' }}>ProLnk • DFW HVAC Zoned System Guide • 2026 DFW market estimates</div>
      </div>
    </div>
  );
}
