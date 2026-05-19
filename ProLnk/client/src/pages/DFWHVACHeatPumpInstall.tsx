import { useState } from 'react';

const requirements: Record<string, { items: string[]; techNotes: string[] }> = {
  'Gas furnace + AC': {
    items: [
      'Remove gas furnace, cap gas line at shutoff',
      'Install heat pump air handler in furnace location',
      'Install reversing valve in outdoor unit (factory-installed)',
      'Add defrost control board to outdoor unit',
      'Install auxiliary electric heat strips (5-10kW for DFW)',
      'Run new 240V dedicated circuit (40-60A breaker)',
      'Install new thermostat with O/B reversing valve wire',
      'Commission defrost cycle timing for DFW climate',
    ],
    techNotes: [
      'Defrost board set to 30-minute max interval for DFW humidity',
      'Auxiliary heat strips engage below 35°F (rare in DFW)',
      'Emergency heat mode required for the 3-5 freeze days per year',
    ],
  },
  'Electric furnace + AC': {
    items: [
      'Remove electric furnace, keep electrical panel circuit',
      'Install heat pump air handler in furnace location',
      'Connect reversing valve O/B terminal on new thermostat',
      'Install defrost control board on outdoor unit',
      'Verify 240V circuit amperage (upgrade from 30A to 40A likely)',
      'Add or retain auxiliary heat strips for DFW freeze backup',
      'Commission system refrigerant charge for DFW heat',
    ],
    techNotes: [
      'Most DFW electric furnaces are 240V — reuse circuit if 40A+',
      'No gas work needed — straightforward swap',
      'Refrigerant charge critical: DFW summer 100°F head pressure',
    ],
  },
  'Older heat pump (R-22)': {
    items: [
      'Remove R-22 refrigerant (EPA 608 certified tech required)',
      'Replace outdoor condensing unit and indoor air handler',
      'Install new R-410A or R-32 refrigerant system',
      'Replace lineset if undersized for new unit capacity',
      'Update defrost board and reversing valve to current specs',
      'Install communicating thermostat if upgrading to variable speed',
      'Check ductwork for leaks — DFW heat makes this critical',
    ],
    techNotes: [
      'R-22 is illegal to manufacture — all service is reclaimed gas',
      'R-410A phase-out ongoing — R-32 or R-454B now preferred',
      'Variable speed inverter compressors excel in DFW partial-load conditions',
    ],
  },
};

const systemTypes = Object.keys(requirements);
const climateZones = ['North DFW (Zone 3A)', 'Central/East DFW (Zone 3A high humidity)', 'South/West DFW (hotter, drier)'];

export default function DFWHVACHeatPumpInstall() {
  const [system, setSystem] = useState('');
  const [climateZone, setClimateZone] = useState('');
  const [showReqs, setShowReqs] = useState(false);

  const reqs = requirements[system];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
          🔧 DFW HVAC RESOURCE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          Heat Pump Installation Guide for DFW
        </h1>
        <p style={{ color: '#8899aa', fontSize: 16, marginBottom: 32 }}>
          What's different about installing a heat pump vs AC in DFW — reversing valve setup, defrost board timing, auxiliary heat, and the DFW-specific commissioning steps.
        </p>

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>⚙️ Get Your Installation Requirements</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#8899aa', fontSize: 13, display: 'block', marginBottom: 6 }}>Existing System Type</label>
              <select value={system} onChange={e => { setSystem(e.target.value); setShowReqs(false); }}
                style={{ width: '100%', background: '#152238', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 13 }}>
                <option value="">Select system...</option>
                {systemTypes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8899aa', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Climate Zone</label>
              <select value={climateZone} onChange={e => { setClimateZone(e.target.value); setShowReqs(false); }}
                style={{ width: '100%', background: '#152238', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 13 }}>
                <option value="">Select zone...</option>
                {climateZones.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowReqs(true)} disabled={!system || !climateZone}
            style={{ background: system && climateZone ? '#F5E642′ : '#1e3a5f', color: system && climateZone ? '#0A1628' : '#4a6080', border: ’none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: system && climateZone ? 'pointer' : 'not-allowed' }}>
            Show Installation Requirements →
          </button>
        </div>

        {showReqs && reqs && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>📋 Installation Checklist: {system}</div>
              {reqs.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, padding: 12, background: '#152238', borderRadius: 8 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ fontSize: 13, color: '#ccd9e8′ }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 20, borderLeft: '4px solid #a0d4a0′ }}>
              <div style={{ color: '#a0d4a0', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>🔬 Tech Notes for DFW Climate</div>
              {reqs.techNotes.map((note, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13, color: '#8899aa' }}>
                  <span style={{ color: '#a0d4a0', flexShrink: 0 }}>→</span>
                  {note}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🌡️ DFW Heat Pump vs AC Install Differences</h2>
          {[
            { icon: '🔄', title: 'Reversing Valve', desc: 'AC units only cool. Heat pumps add a reversing valve that switches refrigerant flow direction — this is what makes it heat in winter. DFW techs must understand the O/B terminal and heating vs cooling mode.' },
            { icon: '🌨️', title: 'Defrost Board Timing', desc: 'In DFW winter humidity, frost builds on outdoor coils. The defrost board runs a 3-5 minute reverse cycle to melt it. Set max interval to 30 min — every 90 min is too slow for DFW.' },
            { icon: '⚡', title: 'Auxiliary Heat Integration', desc: 'DFW heat pumps need electric auxiliary heat strips for the 5-10 days per year below 35°F. Most DFW homeowners never see this kick in — but it must be wired and tested at install.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < 2 ? 16 : 0, padding: 16, background: '#152238', borderRadius: 8 }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#8899aa', fontSize: 13 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
