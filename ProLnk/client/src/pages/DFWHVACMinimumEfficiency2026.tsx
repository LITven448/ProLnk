import { useState } from 'react';

export default function DFWHVACMinimumEfficiency2026() {
  const [systemType, setSystemType] = useState('');
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const getRequirement = () => {
    if (!systemType || !situation) { setResult('Please select both options.'); return; }
    const reqs = {
      'split-ac': 'Texas Climate Zone 3 (DFW) minimum: 15 SEER2 for split-system central air conditioners (effective January 1, 2023). This replaced the old 14 SEER standard. Units manufactured before Jan 2023 may still be installed by contractors if already in distribution.',
      'package-unit': 'Package units (combined heating and cooling in one outdoor cabinet) minimum: 14.3 SEER2 in Climate Zone 3. This applies to gas/electric package units and heat pump package units installed in DFW.',
      'heat-pump': 'Heat pump split systems minimum: 15 SEER2 cooling efficiency + 8.1 HSPF2 heating efficiency in Climate Zone 3. Both ratings must meet minimums — a unit that hits SEER2 but fails HSPF2 is still non-compliant.',
      'gas-furnace': 'Gas furnace minimum: 80% AFUE (Annual Fuel Utilization Efficiency) in DFW Climate Zone 3. Note: 90%+ AFUE condensing furnaces require PVC flue pipe — verify your home\'s venting before specifying high-efficiency.',
    };
    const situationNote = situation === 'replacement' ? ' For full system replacements, the new unit must meet current minimums regardless of what was there before.' : situation === 'repair' ? ' Repair/component replacement of an existing system does not trigger minimum efficiency requirements — only full system replacements.' : ' New construction requires meeting current minimums and City of Denton/Dallas/Fort Worth permit inspection will verify compliance.';
    setResult(`📋 ${reqs[systemType]}${situationNote}`);
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '14px', fontWeight: '600' }}>⚡ DFW HVAC CODE GUIDE 2026</div>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px', lineHeight: '1.2' }}>DFW HVAC Minimum Efficiency Requirements 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '32px' }}>New federal efficiency standards changed in January 2023. DFW is in Climate Zone 3 — here's exactly what the code requires.</p>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>📊 DFW Climate Zone 3 Requirements at a Glance</h2>
          {[['Split-System Central AC','15 SEER2','Was 14 SEER (pre-2023)'],['Package Units (Gas/Electric)','14.3 SEER2','Was 14 SEER (pre-2023)'],['Heat Pumps (Cooling)','15 SEER2','Was 14 SEER (pre-2023)'],['Heat Pumps (Heating)','8.1 HSPF2','Was 8.8 HSPF (pre-2023)'],['Gas Furnaces','80% AFUE','Unchanged'],['Mini-Split Systems','15 SEER2','Same as split systems']].map(([system, req, note]) => (
            <div key={system} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #334155', gap: '12px' }}>
              <span style={{ color: '#cbd5e1', fontSize: '14px', flex: 1 }}>{system}</span>
              <span style={{ color: '#F5E642', fontWeight: '700', fontSize: '15px', whiteSpace: 'nowrap' }}>{req}</span>
              <span style={{ color: '#64748b', fontSize: '12px', whiteSpace: 'nowrap' }}>{note}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>🔑 What Changed with SEER2</h2>
          {[['New Test Method','SEER2 uses a more realistic external static pressure test — 0.5 in. w.g. vs 0.1 in. w.g. for SEER'],['Numbers Are Lower','A 15 SEER2 unit ≈ 15.8 SEER under old testing — similar real-world efficiency, different number'],['Not Backward Compatible','Old SEER ratings cannot be directly compared to new SEER2 ratings'],['Effective Date','January 1, 2023 for new equipment manufactured — existing inventory could be installed post-date']].map(([title, desc]) => (
            <div key={title} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '14px', marginBottom: '10px' }}>
              <div style={{ fontWeight: '700', marginBottom: '6px', fontSize: '14px', color: '#F5E642' }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: '13px' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>🧮 What's Required for My Situation?</h2>
          {[['What type of HVAC system?', systemType, setSystemType, [['split-ac','Split-system central air conditioner'],['package-unit','Package unit (all-in-one outdoor cabinet)'],['heat-pump','Heat pump (split system)'],['gas-furnace','Gas furnace only']]],['What is your situation?', situation, setSituation, [['replacement','Replacing existing system'],['repair','Repairing/replacing a component'],['new-construction','New construction install']]]].map(([label, val, setter, options]) => (
            <div key={label} style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', marginBottom: '6px' }}>{label}</label>
              <select value={val} onChange={e => setter(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px' }}>
                <option value="">Select an option</option>
                {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          ))}
          <button onClick={getRequirement}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
            Get Code Requirement →
          </button>
          {result && <div style={{ marginTop: '16px', backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px', color: '#cbd5e1', fontSize: '15px', lineHeight: '1.7' }}>{result}</div>}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#F5E642', fontWeight: '700', marginBottom: '8px' }}>🏠 ProLnk Tip</div>
          <div style={{ color: '#94a3b8', fontSize: '14px' }}>Always ask your HVAC contractor for the equipment model number so you can verify SEER2 rating on the AHRI database (ahridirectory.org) before signing a contract. ProLnk-vetted HVAC pros install only code-compliant equipment.</div>
        </div>
      </div>
    </div>
  );
}