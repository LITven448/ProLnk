import { useState } from 'react';

export default function ProLnkOriginationRights() {
  const [homes, setHomes] = useState(25);
  const [years, setYears] = useState(5);
  const avgPlatformFeePerHome = 480;
  const originationRate = 0.015;
  const annualPerHome = avgPlatformFeePerHome * originationRate;
  const totalIncome = Math.round(homes * annualPerHome * years);
  const monthly = Math.round(homes * annualPerHome / 12);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontWeight: 700, marginBottom: 16 }}>
          PERMANENT INCOME STREAM
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Origination Rights</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 40 }}>
          Every home you add to the Health Vault earns you 1.5% of all platform fees generated from that home — permanently, for as long as the platform exists.
        </p>

        <div style={{ background: '#111d2e', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, color: '#F5E642′ }}>How It Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 16 }}>
            {[
              { step: '1', label: 'You add a home', desc: 'Help a homeowner set up their Health Vault profile with property data.' },
              { step: '2', label: 'Platform earns fees', desc: 'Every lead, match, and service job on that home generates platform revenue.' },
              { step: '3', label: 'You earn 1.5%', desc: 'Your 1.5% origination right pays out automatically, forever.' },
            ].map(s => (
              <div key={s.step} style={{ background: '#0A1628', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 32, height: 32, lineHeight: '32px', fontWeight: 900, margin: '0 auto 10px' }}>{s.step}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111d2e', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>Income Calculator</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 14 }}>Homes you add: {homes}</label>
            <input type="range" min={1} max={200} value={homes} onChange={e => setHomes(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 14 }}>Years: {years}</label>
            <input type="range" min={1} max={10} value={years} onChange={e => setYears(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Monthly origination income</div>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#F5E642′ }}>${monthly}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{years}-year total</div>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#4ade80′ }}>${totalIncome.toLocaleString()}</div>
            </div>
          </div>

          <div style={{ color: '#64748b', fontSize: 12, marginTop: 12, textAlign: 'center' }}>
            Based on $480/yr avg platform fees per home at 1.5% origination rate
          </div>
        </div>

        <div style={{ background: '#111d2e', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, color: '#F5E642′ }}>Why This Compounds Over Time</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            As ProLnk grows, more jobs per home are generated, more lead value flows through the platform, and fees increase with service demand. Your 1.5% origination right grows in absolute dollars even if you never add another home. 10,000 homeowner installs across the network = massive passive income for originators.
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 8, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 18 }}>Every home you add pays you forever. Start now.</div>
        </div>
      </div>
    </div>
  );
}