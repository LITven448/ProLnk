import { useState } from 'react';

const coldSpotTypes = [
  { id: 'interior', label: 'Interior Room (No Exterior Walls)', emoji: '❄️' },
  { id: 'north', label: 'North-Facing Room', emoji: '🧊' },
  { id: 'basement', label: 'Below-Grade / Basement', emoji: '🏚️' },
  { id: 'closet-adj', label: 'Room Next to Large Closet', emoji: '🚪' },
  { id: 'guest', label: 'Rarely Used Guest Room', emoji: '🛏️' },
];

const systemTypes = [
  { id: 'oversized', label: 'AC Feels Like It Short-Cycles' },
  { id: 'standard', label: 'AC Runs Long Cycles' },
  { id: 'new', label: 'System Replaced Recently' },
  { id: 'old', label: 'System 10+ Years Old' },
];

const diagnostics: Record<string, Record<string, { cause: string; fix: string[]; note: string }>> = {
  'interior': {
    'oversized': { cause: 'Classic DFW oversized AC problem: unit cools perimeter rooms fast, shuts off before air reaches interior rooms — leaving them over-cooled and stagnant.', fix: ['Manual J load calc to right-size system', 'Add return air duct to interior room', 'Zoned system with interior zone sensor'], note: 'Oversized AC is the #1 DFW HVAC mistake — bigger is not better.' },
    'standard': { cause: 'Long duct run to interior room with insufficient CFM. Air loses cooling capacity before reaching the register.', fix: ['Duct balancing and airflow test', 'Add booster fan to long duct run', 'Install additional supply vent'], note: 'Interior rooms need proportionally higher airflow in DFW heat.' },
    'new': { cause: 'New system may be correctly sized but duct layout was designed for old system. Air distribution may not match.', fix: ['Commission HVAC system properly', 'Balancing damper adjustment', 'Thermal scan to find airflow gaps'], note: 'Always commission a new system with airflow measurements.' },
    'old': { cause: 'Older system running constant cooling to hit setpoint — interior room getting too much airflow from an aging oversized unit.', fix: ['System right-sizing assessment', 'Variable speed air handler upgrade', 'Room-by-room airflow audit'], note: 'Single-speed old systems cannot modulate — they blast or shut off.' },
  },
  'north': {
    'oversized': { cause: 'North rooms in DFW get no sun load, so they cool fastest. Oversized system shuts off leaving them over-cooled.', fix: ['Partially close supply damper in north room', 'Install zoning controls', 'Right-size system via Manual J'], note: 'North rooms need less supply air in summer — balance the system.' },
    'standard': { cause: 'System cycles normally but north room cools faster than rest of house — common without zoning.', fix: ['Partially close supply register', 'Install motorized zone damper', 'Smart vent with room sensor'], note: 'Manual damper adjustment is the cheapest immediate fix.' },
    'new': { cause: 'New system likely same issue — airflow not balanced for north exposure. North rooms typically need 20–30% less supply.', fix: ['Duct balancing by HVAC tech', 'Install smart vent', 'Add zone controller'], note: 'Ask your HVAC tech to balance airflow room by room.' },
    'old': { cause: 'North room has always been cold — nobody noticed because other rooms were comfortable. Old single-speed worsens imbalance.', fix: ['Close register 30–40% manually', 'Add zone damper', 'Variable speed system upgrade'], note: 'Quick fix: partially close the register to redirect airflow.' },
  },
  'basement': {
    'oversized': { cause: 'Below-grade spaces are naturally cool in DFW — soil temp is 68°F year-round. Oversized AC compounds the over-cooling.', fix: ['Separate thermostat zone for below-grade', 'Reduce or eliminate AC supply to basement', 'Dedicated dehumidifier instead of more AC'], note: 'Basements in DFW often need heat in summer, not cooling.' },
    'standard': { cause: 'Ground contact keeps below-grade areas naturally cool. Standard AC over-conditions the space.', fix: ['Install zone control for below-grade', 'Partially close all basement supplies', 'Standalone dehumidifier for moisture control'], note: 'DFW basements rarely need aggressive cooling — focus on dehumidification.' },
    'new': { cause: 'New system sized for full house including basement — but basement needs minimal cooling. Over-engineered for the space.', fix: ['Zone dampers for basement', 'Commission with basement doors open vs. closed', 'Dehumidifier to separate moisture from temp control'], note: 'Separate humidity control from temperature in below-grade spaces.' },
    'old': { cause: 'Old system over-supplies basement because ductwork was never balanced. Common in older DFW slab conversions.', fix: ['Duct damper installation', 'Airflow audit and rebalancing', 'Zone thermostat for basement'], note: 'Basement duct balancing is often overlooked for decades.' },
  },
  'closet-adj': {
    'oversized': { cause: 'Large closets act as thermal buffers — adjacent room stays cool because closet absorbs heat before it reaches the room.', fix: ['Verify supply air is reaching room', 'Check for duct leak in closet wall cavity', 'Add return vent if room feels stuffy'], note: 'Closet-adjacent rooms often have airflow isolation issues.' },
    'standard': { cause: 'Room may be over-supplied if closet is blocking return air path. Air gets stuck and over-cools.', fix: ['Undercut door for better return air flow', 'Add transfer grille to improve circulation', 'Duct balancing check'], note: 'Door undercuts of 1 inch allow proper return air circulation.' },
    'new': { cause: 'Duct layout may route supply through closet wall — check for leaks or misdirected airflow.', fix: ['Inspect supply duct routing in closet', 'Duct leakage test', 'Correct any misrouted supply air'], note: 'Closet walls are common locations for duct leaks in new construction.' },
    'old': { cause: 'Closet may have uninsulated exterior wall acting as cold sink in summer — pulling heat from the room and over-cooling it.', fix: ['Insulate closet exterior wall', 'Air seal closet penetrations', 'Rebalance airflow to room'], note: 'Closet insulation is often missing even in well-insulated homes.' },
  },
  'guest': {
    'oversized': { cause: 'Guest room with closed door and oversized AC creates pressure imbalance — air gets forced in, over-cooling the room.', fix: ['Install transfer grille above door', 'Undercut door for return air path', 'Smart vent with occupancy sensor'], note: 'Closed rooms with closed doors create over-pressure cold pockets.' },
    'standard': { cause: 'Closed door blocks return air — supply builds up in room, over-cools it, and unbalances rest of house.', fix: ['Add door undercut or transfer grille', 'Install smart vent that closes when unoccupied', 'Balance system with door closed'], note: 'Every closed room needs a return air path to stay balanced.' },
    'new': { cause: 'New system sized for open floor plan — closed guest room unbalances airflow. Common in builder-grade systems.', fix: ['Install smart vent for guest room', 'Add transfer grille', 'HVAC commission with all doors in normal position'], note: 'Commission your HVAC with doors in normal daily use positions.' },
    'old': { cause: 'Decades of keeping guest room door closed has accumulated over-cooling. System sized for when this room was in regular use.', fix: ['Smart vent with occupancy sensor', 'Close supply register when unoccupied', 'Zoning upgrade for better control'], note: 'Occupancy-based smart vents solve this automatically.' },
  },
};

export default function DFWHVACColdSpotsGuide() {
  const [spot, setSpot] = useState('');
  const [system, setSystem] = useState('');
  const result = spot && system ? diagnostics[spot]?.[system] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>❄️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW HVAC Cold Spots Guide</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>Why certain DFW rooms are too cold even when the rest of the house is comfortable</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🧊 Select Your Cold Spot Type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {coldSpotTypes.map(s => (
              <button key={s.id} onClick={() => setSpot(s.id)}
                style={{ background: spot === s.id ? '#F5E642′ : '#1A3060', color: spot === s.id ? '#0A1628' : '#E2E8F0', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: spot === s.id ? 700 : 400, textAlign: 'left' }}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⚙️ Your AC System Behavior</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {systemTypes.map(s => (
              <button key={s.id} onClick={() => setSystem(s.id)}
                style={{ background: system === s.id ? '#F5E642′ : '#1A3060', color: system === s.id ? '#0A1628' : '#E2E8F0', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: system === s.id ? 700 : 400 }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔍 Root Cause</h2>
            <p style={{ color: '#CBD5E1', marginBottom: 20, lineHeight: 1.6 }}>{result.cause}</p>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔧 Fixes</h2>
            {result.fix.map((f, i) => (
              <div key={i} style={{ background: '#1A3060', borderRadius: 8, padding: 14, marginBottom: 8, color: '#E2E8F0′ }}>
                {i + 1}. {f}
              </div>
            ))}
            <div style={{ background: '#1A3060', borderRadius: 8, padding: 14, marginTop: 16, borderLeft: '4px solid #F5E642′ }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>💡 DFW Pro Tip: </span>
              <span style={{ color: '#CBD5E1′ }}>{result.note}</span>
            </div>
          </div>
        )}

        {!result && (
          <div style={{ textAlign: 'center', color: '#475569', padding: 40 }}>
            Select a cold spot type and system behavior above to see your personalized diagnosis
          </div>
        )}
      </div>
    </div>
  );
}
