import { useState } from 'react';

export default function DFWGarageFireSafetyGuide2026() {
  const [hasFireDoor, setHasFireDoor] = useState('');
  const [evCharging, setEvCharging] = useState('');
  const [gasAppliance, setGasAppliance] = useState('');
  const [result, setResult] = useState<string[]>([]);

  const check = () => {
    const findings: string[] = [];
    if (hasFireDoor === 'yes') findings.push('✅ Fire-rated door present — verify it is 20-minute rated, self-closing, and self-latching per IRC R302.5.1');
    if (hasFireDoor === 'no') findings.push('🚨 CRITICAL: 20-minute fire-rated door required between garage and living space (IRC R302.5.1) — upgrade immediately');
    if (evCharging === 'yes') findings.push('⚠️ EV Charging: Lithium-ion fires burn hotter and longer — ensure 10lb ABC extinguisher within 10 ft and no combustibles within 3 ft of charger');
    if (evCharging === 'no') findings.push('✅ No EV charging — standard fire extinguisher placement still required near exit');
    if (gasAppliance === 'yes') findings.push('⚠️ Gas appliances: must be 18″ above floor if in garage — vapors are heavier than air per IRC G2408.2');
    if (gasAppliance === 'no') findings.push('✅ No gas appliances — verify no supply air ducts terminate in garage (IRC M1601.6 violation if present)');
    findings.push('📍 Place a 10 lb ABC fire extinguisher near garage exit door — inspect annually');
    findings.push('🚫 HVAC supply air ducts must NOT terminate in garage — carbon monoxide risk');
    setResult(findings);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🚗🔥</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Garage Fire Safety Guide 2026</h1>
          <p style={{ color: '#9CA3AF', marginTop: 8 }}>Code Compliance & Fire Prevention for Dallas-Fort Worth Garages</p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🚪', title: '20-Minute Fire-Rated Door', desc: 'IRC R302.5.1 requires a 20-minute fire-rated, self-closing, self-latching door between the garage and living space. No hollow-core doors permitted.' },
            { icon: '⚡', title: 'EV Charging Fire Risk', desc: 'Lithium-ion battery fires can exceed 2,000°F and are difficult to extinguish. Keep a 10 lb ABC extinguisher nearby. Avoid charging damaged batteries.' },
            { icon: '🔧', title: 'Gas Appliance Height Rule', desc: 'Water heaters and furnaces in garages must be 18″ above floor — gasoline vapors pool at ground level and can ignite on a pilot light.' },
            { icon: '🌬️', title: 'No HVAC Supply in Garage', desc: 'IRC M1601.6 prohibits supply air ducts in garages. Carbon monoxide and vapors would be pumped into living areas — common code violation in older DFW homes.' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#132040', borderRadius: 10, padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#CBD5E1', fontSize: 14 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 18 }}>🔍 Garage Fire Compliance Check</h2>
          <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#9CA3AF', fontSize: 13, display: 'block', marginBottom: 6 }}>Do you have a fire-rated door to the house?</label>
              <select value={hasFireDoor} onChange={e => setHasFireDoor(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2D4A7A', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select...</option>
                <option value="yes">Yes — solid door with self-closer</option>
                <option value="no">No — standard or hollow-core door</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#9CA3AF', fontSize: 13, display: 'block', marginBottom: 6 }}>EV charging in garage?</label>
              <select value={evCharging} onChange={e => setEvCharging(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2D4A7A', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#9CA3AF', fontSize: 13, display: 'block', marginBottom: 6 }}>Gas appliances in garage?</label>
              <select value={gasAppliance} onChange={e => setGasAppliance(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2D4A7A', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select...</option>
                <option value="yes">Yes — water heater, furnace, etc.</option>
                <option value="no">No gas appliances</option>
              </select>
            </div>
          </div>
          <button onClick={check} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Check Compliance</button>
          {result.length > 0 && (
            <div style={{ marginTop: 20 }}>
              {result.map((r, i) => <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', marginBottom: 8, fontSize: 14, color: '#CBD5E1′ }}>{r}</div>)}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: '16px', background: '#132040', borderRadius: 10, color: '#9CA3AF', fontSize: 13 }}>
          🏠 ProLnk connects DFW homeowners with licensed fire safety and garage contractors
        </div>
      </div>
    </div>
  );
}