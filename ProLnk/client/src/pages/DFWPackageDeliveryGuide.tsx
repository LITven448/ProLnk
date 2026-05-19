import { useState } from 'react';

const solutions = {
  doorbell: { label: 'Smart Video Doorbell', icon: '📷', cost: '$200-$500 installed', description: 'Detects package delivery, records video, sends alerts. Deters porch pirates with visible camera.', dfwNote: 'Most effective deterrent in DFW suburban neighborhoods. Visible cameras reduce theft 60%.', effectiveness: 'High deterrent value' },
  lockbox: { label: 'Secure Package Lockbox', icon: '📦', cost: '$150-$400', description: 'Weatherproof locked box mounted at front door. Delivery drivers place packages inside.', dfwNote: 'DFW heat-rated boxes important — cheap plastic warps in summer. Choose metal/steel construction.', effectiveness: 'Physical theft prevention' },
  amazonkey: { label: 'Amazon Key Delivery', icon: '🔑', cost: '$250-$500 (smart lock required)', description: 'Amazon driver scans and opens your smart lock for in-garage or in-home delivery.', dfwNote: 'Available in most DFW zip codes. Requires compatible smart lock and Amazon Prime membership.', effectiveness: 'Eliminates porch exposure' },
  neighbor: { label: 'Neighbor Network + Instructions', icon: '🏘️', cost: '$0 (relationship-based)', description: 'Coordinate with neighbors for package pickup. Use delivery instructions to redirect to side door.', dfwNote: 'DFW HOA communities often have neighborhood watch groups — great for package coordination.', effectiveness: 'Community-based solution' },
  camera: { label: 'Full Camera Coverage', icon: '🎥', cost: '$400-$1200 installed', description: 'Multiple cameras covering front door, driveway, and side entrances with cloud recording.', dfwNote: 'For DFW homes in high-theft areas — Nextdoor often has local theft activity reports.', effectiveness: 'Full documentation + deterrent' },
};

const recMap: Record<string, Record<string, string>> = {
  low: { low: 'doorbell', medium: 'doorbell', high: 'doorbell' },
  medium: { low: 'doorbell', medium: 'lockbox', high: 'amazonkey' },
  high: { low: 'lockbox', medium: 'amazonkey', high: 'camera' },
};

export default function DFWPackageDeliveryGuide() {
  const [frequency, setFrequency] = useState('');
  const [riskLevel, setRiskLevel] = useState('');
  const [result, setResult] = useState('');
  function getRecommendation() { if (!frequency || !riskLevel) return; setResult(recMap[frequency]?.[riskLevel] ?? 'doorbell'); }
  const rec = result ? solutions[result as keyof typeof solutions] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 1 }}>DFW HOME SECURITY</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>📦 Package Delivery Security Guide</h1>
        <p style={{ color: '#9EAFC2', marginBottom: 12, lineHeight: 1.6 }}>DFW package theft is a growing problem. Porch pirates monitor Amazon Prime delivery schedules and strike within hours. Here are your options.</p>
        <div style={{ background: '#1A0A0A', border: '1px solid #F87171', borderRadius: 10, padding: 14, marginBottom: 28, fontSize: 13, color: '#F87171' }}>
          ⚠️ DFW Stat: Package theft increased 30% in DFW suburbs over the past 2 years. Check your neighborhood on Nextdoor for recent theft reports before choosing your solution.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {Object.entries(solutions).map(([k, s]) => (
            <div key={k} style={{ background: '#111E35', borderRadius: 12, padding: 18, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: '#F5E642' }}>{s.label}</div>
              <div style={{ color: '#4ADE80', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{s.cost}</div>
              <div style={{ color: '#9EAFC2', fontSize: 12, marginBottom: 8 }}>{s.description}</div>
              <div style={{ background: '#1E3A5F', borderRadius: 6, padding: 8, fontSize: 11, color: '#F5E642', marginBottom: 8 }}>🌡️ {s.dfwNote}</div>
              <div style={{ fontSize: 11, color: '#60A5FA', fontWeight: 600 }}>Effectiveness: {s.effectiveness}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🎯 Get Your Solution</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9EAFC2', marginBottom: 8 }}>Delivery Frequency</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[['low', 'A few per month'], ['medium', '1-2 per week'], ['high', 'Daily deliveries']].map(([v, l]) => (
                <button key={v} onClick={() => setFrequency(v)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: frequency === v ? '#F5E642' : '#1E3A5F', color: frequency === v ? '#0A1628' : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9EAFC2', marginBottom: 8 }}>DFW Neighborhood Risk Level</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[['low', 'Low — quiet neighborhood'], ['medium', 'Medium — some incidents'], ['high', 'High — active theft area']].map(([v, l]) => (
                <button key={v} onClick={() => setRiskLevel(v)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: riskLevel === v ? '#F5E642' : '#1E3A5F', color: riskLevel === v ? '#0A1628' : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>{l}</button>
              ))}
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Recommendation →</button>
        </div>
        {rec && (
          <div style={{ background: '#0F2940', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{rec.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642', marginBottom: 4 }}>Recommended: {rec.label}</div>
            <div style={{ color: '#4ADE80', fontWeight: 700, marginBottom: 8 }}>{rec.cost}</div>
            <div style={{ color: '#9EAFC2', fontSize: 14 }}>{rec.dfwNote}</div>
          </div>
        )}
        <div style={{ marginTop: 32, textAlign: 'center', color: '#9EAFC2', fontSize: 12 }}>🏠 ProLnk connects you with licensed DFW security and smart home specialists</div>
      </div>
    </div>
  );
}
