import { useState } from 'react';

export default function DFWHomeEmergencyFundGuide2026() {
  const [homeAge, setHomeAge] = useState(10);
  const [hasPool, setHasPool] = useState(false);
  const [hasOldRoof, setHasOldRoof] = useState(false);
  const [hasOldHVAC, setHasOldHVAC] = useState(false);
  const [hasFoundationIssues, setHasFoundationIssues] = useState(false);

  const base = 10000;
  const ageAdj = homeAge > 20 ? 3000 : homeAge > 10 ? 1500 : 0;
  const poolAdj = hasPool ? 2000 : 0;
  const roofAdj = hasOldRoof ? 2500 : 0;
  const hvacAdj = hasOldHVAC ? 2000 : 0;
  const foundAdj = hasFoundationIssues ? 5000 : 0;
  const target = base + ageAdj + poolAdj + roofAdj + hvacAdj + foundAdj;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK FINANCIAL GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏠 DFW Home Emergency Fund Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>How much emergency savings does your DFW home really need?</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '❄️', label: 'HVAC Failure', range: ',000 – ,000', note: 'Avg DFW replacement cost' },
            { icon: '💧', label: 'Slab Leak Repair', range: ',000 – ,000', note: 'Common in DFW clay soil' },
            { icon: '🌩️', label: 'Roof Hail Damage', range: ',850 – ,250', note: 'Deductible on avg DFW home' },
            { icon: '🏗️', label: 'Foundation Repair', range: ',000 – ,000', note: 'Clay soil movement risk' },
          ].map((item) => (
            <div key={item.label} style={{ background: 'rgba(245,230,66,0.07)', border: '1px solid rgba(245,230,66,0.2)', borderRadius: 12, padding: '20px 18px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 17, marginBottom: 4 }}>{item.range}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Your Emergency Fund Calculator</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 14, color: '#94a3b8′ }}>Home Age (years): <strong style={{ color: '#fff' }}>{homeAge}</strong></span>
              <input type="range" min={0} max={50} value={homeAge} onChange={e => setHomeAge(+e.target.value)} style={{ accentColor: '#F5E642′ }} />
            </label>
            {[
              { label: '🏊 Has Pool', val: hasPool, set: setHasPool },
              { label: '🏚️ Roof 15+ Years Old', val: hasOldRoof, set: setHasOldRoof },
              { label: '❄️ HVAC 10+ Years Old', val: hasOldHVAC, set: setHasOldHVAC },
              { label: '🏗️ Known Foundation Issues', val: hasFoundationIssues, set: setHasFoundationIssues },
            ].map((item) => (
              <label key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <input type="checkbox" checked={item.val} onChange={e => item.set(e.target.checked)} style={{ accentColor: '#F5E642', width: 18, height: 18 }} />
                <span style={{ fontSize: 15 }}>{item.label}</span>
              </label>
            ))}
          </div>
          <div style={{ marginTop: 24, background: '#F5E642', borderRadius: 12, padding: '20px 24px', textAlign: 'center' }}>
            <div style={{ color: '#0A1628', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>YOUR RECOMMENDED DFW EMERGENCY FUND</div>
            <div style={{ color: '#0A1628', fontSize: 42, fontWeight: 900 }}>${target.toLocaleString()}</div>
            <div style={{ color: '#1a2d4e', fontSize: 13, marginTop: 4 }}>Keep liquid in HYSA — not invested</div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>💡 DFW-Specific Risks to Fund For</div>
          <ul style={{ color: '#94a3b8', fontSize: 14, paddingLeft: 20, lineHeight: 2 }}>
            <li>Expansive clay soil causes foundation movement every season</li>
            <li>Hail storms average 3–5x/year in DFW corridor</li>
            <li>Summer HVAC failures common — replacement demand spikes costs</li>
            <li>Slab plumbing leaks are top insurance claim in North Texas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}