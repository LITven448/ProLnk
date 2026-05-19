import { useState } from 'react';

export default function DFWSwimmingPoolFencingGuide2026() {
  const [fenceHeight, setFenceHeight] = useState('');
  const [gateType, setGateType] = useState('');
  const [doorAlarm, setDoorAlarm] = useState('');
  const [result, setResult] = useState<string[]>([]);

  const checkCompliance = () => {
    const findings: string[] = [];
    if (fenceHeight === 'under4') findings.push('🚨 NON-COMPLIANT: Texas Pool Safety Act requires minimum 4-foot fence height around all swimming pools — upgrade immediately');
    if (fenceHeight === '4plus') findings.push('✅ Fence height meets minimum 4-foot requirement under Texas Health & Safety Code §757');
    if (gateType === 'selfclose') findings.push('✅ Self-closing, self-latching gate is compliant — verify latch is on pool side of gate at 54″ or higher');
    if (gateType === 'manual') findings.push('🚨 NON-COMPLIANT: Gate must be self-closing and self-latching per Texas Pool Safety Act — install compliant gate hardware');
    if (doorAlarm === 'yes') findings.push('✅ Door alarm installed on house-to-pool door — test monthly, battery backup recommended');
    if (doorAlarm === 'no') findings.push('⚠️ Door alarm required on any door in house that opens directly to pool area — pool cover does NOT substitute for this requirement');
    findings.push('📏 Check all fence openings — no gap larger than 4 inches anywhere in the barrier');
    findings.push('🔍 Annual inspection: check fence posts for heaving, gate alignment, latch function, and bottom gap clearance');
    findings.push('🏊 Pool covers are NOT a substitute for fencing under Texas law — both are required');
    setResult(findings);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏊🔒</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Swimming Pool Fencing Guide 2026</h1>
          <p style={{ color: '#9CA3AF', marginTop: 8 }}>Texas Pool Safety Act Requirements for Dallas-Fort Worth Homes</p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '📏', title: '4-Foot Minimum Fence Height', desc: 'Texas Health & Safety Code §757.003 requires all pool barriers to be at least 4 feet tall. No gaps over 4 inches anywhere — bottom, sides, or between pickets.' },
            { icon: '🚪', title: 'Self-Closing Self-Latching Gate', desc: 'All pool gates must close and latch automatically. Latch must be on the pool side at least 54 inches from the ground, or enclosed to prevent reach-over.' },
            { icon: '🔔', title: 'House Door Alarm Required', desc: 'Any door in the home that opens directly to the pool area must have an audible alarm. Pool covers do NOT substitute — both barriers are required by law.' },
            { icon: '📋', title: 'Annual Pool Safety Inspection', desc: 'Inspect fence posts for heaving (DFW clay soil expands), gate alignment, latch operation, and bottom rail clearance every year before swim season.' },
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
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 18 }}>🔍 Pool Fencing Compliance Check</h2>
          <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#9CA3AF', fontSize: 13, display: 'block', marginBottom: 6 }}>Current fence height</label>
              <select value={fenceHeight} onChange={e => setFenceHeight(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2D4A7A', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select...</option>
                <option value="under4″>Under 4 feet</option>
                <option value="4plus">4 feet or taller</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#9CA3AF', fontSize: 13, display: 'block', marginBottom: 6 }}>Pool gate type</label>
              <select value={gateType} onChange={e => setGateType(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2D4A7A', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select...</option>
                <option value="selfclose">Self-closing and self-latching</option>
                <option value="manual">Manual / must be closed by hand</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#9CA3AF', fontSize: 13, display: 'block', marginBottom: 6 }}>Door alarm on house-to-pool doors?</label>
              <select value={doorAlarm} onChange={e => setDoorAlarm(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2D4A7A', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select...</option>
                <option value="yes">Yes — alarm installed</option>
                <option value="no">No alarm</option>
              </select>
            </div>
          </div>
          <button onClick={checkCompliance} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Check Compliance</button>
          {result.length > 0 && (
            <div style={{ marginTop: 20 }}>
              {result.map((r, i) => <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', marginBottom: 8, fontSize: 14, color: '#CBD5E1′ }}>{r}</div>)}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: '16px', background: '#132040', borderRadius: 10, color: '#9CA3AF', fontSize: 13 }}>
          🏠 ProLnk connects DFW homeowners with licensed pool fence and safety contractors
        </div>
      </div>
    </div>
  );
}