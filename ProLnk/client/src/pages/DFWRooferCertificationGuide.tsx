import { useState } from 'react';

const cityReqs = [
  { city: 'Dallas', req: 'City registration required. $75/yr. Must show proof of insurance ($300K GL min).', url: 'dallas.gov/contractors' },
  { city: 'Fort Worth', req: 'Registration required for commercial. Residential: none state-required but recommended.', url: 'fortworthtexas.gov' },
  { city: 'Plano', req: 'Business license + $500K GL insurance required for all roofing work.', url: 'plano.gov' },
  { city: 'Arlington', req: 'City contractor registration + $300K GL min. Storm work requires supplemental registration.', url: 'arlingtontx.gov' },
];

const mfgCerts = [
  { name: 'GAF Master Elite', pct: 3, revenue: '+22% avg ticket size', cost: '$1,200 + training', description: 'Only 3% of roofers qualify. Requires passing exam, minimum installs, and insurance verification. Unlocks extended warranties customers want.', prolnkTier: 'Qualifying' },
  { name: 'Owens Corning Platinum', pct: 5, revenue: '+18% avg ticket size', cost: '$800 + training', description: 'Top 5% of OC contractors. Factory training required. Access to preferred pricing and marketing materials.', prolnkTier: 'Qualifying' },
  { name: 'CertainTeed SELECT', pct: 8, revenue: '+14% avg ticket size', cost: '$600 + training', description: 'SELECT ShingleMaster credential. Photo documentation of installs + warranty registration history required.', prolnkTier: 'Standard' },
  { name: 'HAAG Certified Inspector', pct: null, revenue: 'Storm supplement leverage', cost: '$750 + exam', description: 'Insurance adjuster credibility. Massively valuable for hail/storm claim markets in DFW.', prolnkTier: 'Qualifying' },
];

const stages = [
  { stage: 'Startup', revenue: '$0–$200K', certs: 'City registration + basic GL', prolnkStatus: 'Active on platform', priority: 'Get CertainTeed SELECT first — lowest bar, instant credibility.' },
  { stage: 'Established', revenue: '$200K–$600K', certs: 'OC Platinum or GAF Master Elite', prolnkStatus: 'Preferred status', priority: 'Target manufacturer cert that matches your material mix.' },
  { stage: 'Growth', revenue: '$600K–$1.5M', certs: 'All major manufacturer certs + HAAG', prolnkStatus: 'Top 10% ranking', priority: 'HAAG certification opens insurance restoration market — highest margins in DFW.' },
];

export default function DFWRooferCertificationGuide() {
  const [bizStage, setBizStage] = useState('');
  const [result, setResult] = useState<null | typeof stages[0]>(null);

  function showPlan() {
    const found = stages.find(s => s.stage === bizStage);
    setResult(found || null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>PROLNK CONTRACTOR GUIDES — DFW ROOFING</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.1 }}>DFW Roofer Certification Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, margin: '0 0 12px' }}>Texas has no state roofing license — but the right certifications are the difference between competing on price and winning on value.</p>
        <div style={{ background: '#1a2e4a', borderRadius: 10, padding: '14px 18px', marginBottom: 40, border: '1px solid #F5E642′ }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>Texas Law: </span>
          <span style={{ color: '#cbd5e1', fontSize: 14 }}>No state license required, but many cities require registration + insurance. Storm damage contractors must follow HB 2106 disclosure rules.</span>
        </div>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🏙️ DFW City Requirements</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {cityReqs.map((c, i) => (
              <div key={i} style={{ background: '#131f35', borderRadius: 10, padding: '16px 18px', border: '1px solid #1e3a5f' }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#F5E642', marginBottom: 4 }}>{c.city}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.req}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🏆 Manufacturer Certifications That Move Income</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {mfgCerts.map((cert, i) => (
              <div key={i} style={{ background: '#131f35', borderRadius: 10, padding: '18px 20px', border: '1px solid #1e3a5f' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{cert.name}</span>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {cert.pct && <span style={{ background: '#1e3a5f', color: '#60a5fa', fontSize: 12, padding: '3px 10px', borderRadius: 20 }}>Top {cert.pct}%</span>}
                    <span style={{ background: '#F5E642', color: '#0A1628', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>ProLnk {cert.prolnkTier}</span>
                  </div>
                </div>
                <p style={{ color: '#94a3b8', fontSize: 13, margin: '0 0 10px' }}>{cert.description}</p>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                  <div style={{ fontSize: 13, color: '#4ade80′ }}>📈 {cert.revenue}</div>
                  <div style={{ fontSize: 13, color: '#fbbf24′ }}>💵 Cost: {cert.cost}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#131f35', borderRadius: 14, padding: 28, border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🎯 Your Certification Priority List</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Current business stage</label>
            <select value={bizStage} onChange={e => setBizStage(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15 }}>
              <option value="">Select stage</option>
              {stages.map(s => <option key={s.stage} value={s.stage}>{s.stage} — {s.revenue}</option>)}
            </select>
          </div>
          <button onClick={showPlan}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', width: '100%' }}>
            Show My Certification Plan →
          </button>
          {result && (
            <div style={{ marginTop: 24, padding: 20, background: '#0A1628', borderRadius: 10, border: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 10 }}>{result.stage} Stage — {result.revenue}</div>
              <div style={{ marginBottom: 8, fontSize: 14 }}><span style={{ color: '#64748b' }}>Certs to target: </span><span style={{ color: '#fff' }}>{result.certs}</span></div>
              <div style={{ marginBottom: 8, fontSize: 14 }}><span style={{ color: '#64748b' }}>ProLnk status: </span><span style={{ color: '#F5E642', fontWeight: 700 }}>{result.prolnkStatus}</span></div>
              <div style={{ color: '#4ade80', fontSize: 14 }}>💡 {result.priority}</div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
