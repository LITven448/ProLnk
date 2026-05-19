import { useState } from 'react';

export default function DFWHVACElectricalDisconnect2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const situations = [
    {
      id: 'service',
      label: '🔧 HVAC Technician Arriving',
      title: 'Pre-Service Disconnect Procedure',
      steps: [
        '✅ Locate the grey metal box mounted on exterior wall near outdoor unit',
        '✅ Open the cover — most flip up or pull outward',
        '✅ Pull the fuse block straight out (pull-out type) or flip breaker to OFF',
        '✅ Inform technician disconnect is open before they begin work',
        '✅ Do NOT restore until technician gives clear signal',
      ],
      note: 'NEC 440.14 requires disconnect within sight of outdoor unit — typically within 50 ft line-of-sight.',
    },
    {
      id: 'emergency',
      label: '🚨 AC Smoking or Burning Smell',
      title: 'Emergency Shutdown Procedure',
      steps: [
        '🚨 Do NOT touch unit — go directly to disconnect box',
        '🚨 Pull fuse block out completely or flip breaker to OFF',
        '🚨 Set thermostat to OFF inside home',
        '🚨 If smoke persists, shut off main breaker and call 911',
        '🚨 Do NOT restore power until licensed HVAC tech inspects',
      ],
      note: 'DFW fire departments respond to AC electrical fires regularly in peak summer — act fast.',
    },
    {
      id: 'fuse',
      label: '⚡ Fuse Replacement',
      title: 'Pull-Out Fuse Block Guide',
      steps: [
        '🔍 Open disconnect — pull block reveals two cartridge fuses',
        '🔍 Use fuse puller or needle-nose pliers to remove fuses',
        '🔍 Test with multimeter — no continuity = blown fuse',
        '🔍 Replace with EXACT same amperage (typically 30A, 40A, or 60A)',
        '🔍 Never upsize a fuse — this removes overcurrent protection',
      ],
      note: 'DFW summer heat causes compressor overloads that blow fuses. Always match amperage stamped on original.',
    },
    {
      id: 'inspection',
      label: '📋 Annual Inspection',
      title: 'Disconnect Box Annual Checklist',
      steps: [
        '🔎 Check for rust, corrosion, or moisture intrusion in box',
        '🔎 Confirm cover closes and latches fully (weathertight)',
        '🔎 Verify wires are firmly seated — heat cycling loosens connections',
        '🔎 Confirm amperage rating matches unit nameplate data',
        '🔎 Breaker-style: test ON/OFF operation is smooth with no sparking',
      ],
      note: 'DFW humidity and temperature swings degrade disconnect boxes faster than most US climates.',
    },
  ];

  const selected_item = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>
            DFW AC Electrical Disconnect Guide 2026
          </h1>
          <p style={{ color: '#8899BB', fontSize: 14, margin: 0 }}>
            Required by code · Pull-out fuse vs breaker · Emergency use · Annual inspection
          </p>
        </div>

        <div style={{ background: '#0F1E35', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1A2E4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 12px' }}>📍 What Is the Disconnect Box?</h2>
          <p style={{ color: '#B0BFDA', fontSize: 14, lineHeight: 1.6, margin: '0 0 8px' }}>
            Every DFW outdoor AC unit must have a <strong style={{ color: '#F5E642' }}>disconnect switch</strong> mounted within sight of the unit per NEC 440.14. This small grey metal box allows power to be safely cut for service or emergency — without going to the main panel.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[['🔌 Pull-Out Fuse', 'Most common in DFW — fuse block slides out'], ['🔀 Breaker Disconnect', 'Newer installs — flip switch to OFF'], ['📏 Within 50 ft', 'Must be visible from unit per code']].map(([label, desc]) => (
              <div key={label} style={{ background: '#1A2E4A', borderRadius: 8, padding: '10px 14px', flex: '1 1 180px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{label}</div>
                <div style={{ color: '#8899BB', fontSize: 12, marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: '#8899BB', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>Select your situation for step-by-step guidance:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{ background: selected === s.id ? '#F5E642' : '#0F1E35', color: selected === s.id ? '#0A1628' : '#E8EDF5', border: '1px solid', borderColor: selected === s.id ? '#F5E642' : '#1A2E4A', borderRadius: 10, padding: '12px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
              {s.label}
            </button>
          ))}
        </div>

        {selected_item && (
          <div style={{ background: '#0F1E35', border: '1px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>{selected_item.title}</h3>
            {selected_item.steps.map((step, i) => (
              <div key={i} style={{ color: '#B0BFDA', fontSize: 14, padding: '6px 0', borderBottom: i < selected_item.steps.length - 1 ? '1px solid #1A2E4A' : 'none' }}>{step}</div>
            ))}
            <div style={{ background: '#1A2E4A', borderRadius: 8, padding: 12, marginTop: 14, color: '#8899BB', fontSize: 12 }}>
              💡 {selected_item.note}
            </div>
          </div>
        )}

        <div style={{ background: '#0F1E35', borderRadius: 12, padding: 20, border: '1px solid #1A2E4A', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>🏠 ProLnk — DFW HVAC Experts</div>
          <p style={{ color: '#8899BB', fontSize: 13, margin: 0 }}>Get quotes from licensed DFW HVAC pros in minutes. No pressure, no commitment.</p>
        </div>
      </div>
    </div>
  );
}