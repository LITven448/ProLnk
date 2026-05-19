import { useState } from 'react';

const applianceData: Record<string, { amps: number; wire: string; why: string; undersized: string }> = {
  'Bedroom / Living Room Outlets': { amps: 15, wire: '14 AWG', why: 'Standard lighting and device loads stay well under 1,800 W combined.', undersized: 'Frequent nuisance trips; overheated wiring inside walls.' },
  'Kitchen Small Appliance Circuits': { amps: 20, wire: '12 AWG', why: 'NEC requires two 20 A circuits for countertop receptacles to handle toasters, microwaves, and mixers.', undersized: 'Breaker trips mid-cook; appliances share limited capacity and can overheat.' },
  'Bathroom Receptacle': { amps: 20, wire: '12 AWG', why: 'Hair dryers and curling irons draw 15–20 A; dedicated 20 A circuit prevents trips.', undersized: 'Constant trips when hair dryer runs; inconvenient and unsafe.' },
  'Dishwasher': { amps: 20, wire: '12 AWG', why: 'Dedicated circuit prevents interaction with other kitchen loads during the heated dry cycle.', undersized: 'Shared circuit causes trips when dishwasher heats simultaneously with microwave.' },
  'Refrigerator': { amps: 20, wire: '12 AWG', why: 'Compressor start-up surge needs a dedicated 20 A circuit to avoid voltage dip to other appliances.', undersized: 'Compressor struggle causes food spoilage; shared circuit dims lights on startup.' },
  'Dryer (Electric)': { amps: 30, wire: '10 AWG', why: 'Heating element draws 24 A continuously; 30 A 240 V circuit is code minimum in DFW.', undersized: 'Breaker trips mid-cycle; clothes stay damp; wiring can overheat.' },
  'Central AC (3–4 Ton, DFW typical)': { amps: 30, wire: '10 AWG', why: 'DFW summers push AC compressors hard; dedicated 240 V circuit sized to unit MCA rating.', undersized: 'Breaker trips on 100°F days when load is highest — worst possible time.' },
  'Large AC (5 Ton)': { amps: 50, wire: '6 AWG', why: 'Larger compressor draws up to 40 A; 50 A circuit provides required 125% headroom per NEC.', undersized: 'Nuisance trips, compressor overheating, reduced system life.' },
  'EV Charger (Level 2 / 48 A)': { amps: 60, wire: '6 AWG', why: 'DFW homeowners adding EVs need a dedicated 60 A 240 V circuit; charger runs at 48 A (80% of 60 A per NEC).', undersized: 'Charger throttles speed or trips breaker during overnight charge.' },
  'Range / Oven (Electric)': { amps: 50, wire: '6 AWG', why: 'Combined oven + burner draw can reach 40 A; 50 A dedicated 240 V circuit is standard.', undersized: 'Breaker trips when multiple burners and oven run simultaneously.' },
  'Pool Pump Motor (1–1.5 HP)': { amps: 20, wire: '12 AWG', why: 'DFW pools run pumps 8–12 hrs/day; dedicated 20 A 240 V circuit prevents interaction with other loads.', undersized: 'Motor runs hot in summer heat; breaker trips during peak demand hours.' },
  'Hot Tub / Spa': { amps: 50, wire: '6 AWG', why: 'Heater + pump + blower combined draw requires dedicated 50 A 240 V GFCI circuit.', undersized: 'Heater cannot maintain temperature; safety GFCI may not function correctly.' },
};

export default function DFWCircuitBreakerSizeGuide() {
  const [selected, setSelected] = useState('');

  const result = applianceData[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>⚡ DFW ELECTRICAL GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#fff' }}>Circuit Breaker Size Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          Every circuit in your DFW home has a breaker sized to match the wire and load it protects.
          Select an appliance below to see the correct breaker size, wire gauge, and what happens when it's undersized.
        </p>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, color: '#94A3B8', fontSize: 14 }}>Select appliance or circuit type</label>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', background: '#162035', border: '1px solid #2D3F5E', borderRadius: 8, color: '#E8F0FE', fontSize: 16 }}
          >
            <option value="">— choose an appliance —</option>
            {Object.keys(applianceData).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        {result && (
          <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, border: '1px solid #F5E642′ }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>{selected}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div style={{ background: '#162035', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642′ }}>{result.amps}A</div>
                <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>Required Breaker</div>
              </div>
              <div style={{ background: '#162035', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642′ }}>{result.wire}</div>
                <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>Minimum Wire Gauge</div>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 4 }}>💡 Why this size?</div>
              <p style={{ color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>{result.why}</p>
            </div>
            <div style={{ background: '#1a0a0a', borderRadius: 8, padding: 16, borderLeft: '3px solid #EF4444′ }}>
              <div style={{ color: '#EF4444', fontSize: 13, marginBottom: 4 }}>⚠️ If undersized in DFW heat:</div>
              <p style={{ color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>{result.undersized}</p>
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, background: '#0F1F3D', borderRadius: 12, padding: 20, borderLeft: '3px solid #F5E642′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔑 DFW Key Rules</div>
          <ul style={{ color: '#94A3B8', lineHeight: 1.8, margin: 0, paddingLeft: 20 }}>
            <li>All DFW AC units and EV chargers require dedicated circuits — no sharing.</li>
            <li>NEC 80% rule: continuous loads must not exceed 80% of breaker rating.</li>
            <li>Oncor requires permits for new 240 V circuits and panel work.</li>
            <li>GFCI protection required within 6 ft of water sources throughout DFW homes.</li>
          </ul>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center', padding: '20px', background: '#0F1F3D', borderRadius: 12 }}>
          <p style={{ color: '#94A3B8', marginBottom: 12 }}>Need a licensed DFW electrician to evaluate your panel?</p>
          <a href="/get-quote" style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>Get a Free DFW Electrical Quote</a>
        </div>
      </div>
    </div>
  );
}
