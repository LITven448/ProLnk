import { useState } from 'react';

const scenarios = [
  { trade: 'Foundation Pro', example: 'Every foundation job reveals soil conditions — adjacent homes are scan opportunities.' },
  { trade: 'HVAC Pro', example: 'Every job in a neighborhood = chance to scan neighbor’s aging unit while you’re there.' },
  { trade: 'Pest Control', example: '4 visits/year per home = 4 photo upload opportunities at the same address.' },
  { trade: 'General Inspector', example: 'Every inspection is an origination opportunity — you’re already inside.' },
  { trade: 'Plumber', example: 'Under-slab jobs require full home documentation — photos are already part of your workflow.' },
];

export default function OriginationRightsDeepDive() {
  const [homes, setHomes] = useState(50);
  const [jobsPerYear, setJobsPerYear] = useState(2);
  const [avgCommission, setAvgCommission] = useState(800);
  const [tier, setTier] = useState<'charter' | 'founding'>('charter');

  const pct = tier === 'charter' ? 0.015 : 0.01;
  const annualIncome = homes * jobsPerYear * avgCommission * pct;
  const tenYearIncome = annualIncome * 10;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px 0′ }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>🏛️</div>
          <h1 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, color: '#0f172a', margin: '0 0 16px', lineHeight: 1.15 }}>
            Origination Rights: The ProLnk Income Stream That Pays Forever
          </h1>
          <p style={{ color: '#475569', fontSize: 17, maxWidth: 620, margin: '0 auto' }}>
            Every other ProLnk income stream requires ongoing activity. Origination rights are the only stream that earns whether you're working or not — for the life of the property.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0f172a', fontSize: 20, fontWeight: 800, margin: '0 0 20px' }}>The Permanent Income Math</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            {[
              { tier: 'Charter Tier', rate: '1.5%', desc: 'of every ProLnk commission on every job at that home — permanently', badge: '🥇 25 spots' },
              { tier: 'Founding Tier', rate: '1.0%', desc: 'of every ProLnk commission on every job at that home — permanently', badge: '🥈 100 spots' },
            ].map(t => (
              <div key={t.tier} style={{ background: '#f1f5f9', borderRadius: 12, padding: 20 }}>
                <div style={{ color: '#64748b', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{t.badge}</div>
                <div style={{ color: '#0f172a', fontWeight: 800, fontSize: 17, marginBottom: 4 }}>{t.tier}</div>
                <div style={{ color: '#1d4ed8', fontWeight: 800, fontSize: 28, marginBottom: 6 }}>{t.rate}</div>
                <div style={{ color: '#475569', fontSize: 13 }}>{t.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#eff6ff', borderRadius: 12, padding: 20, borderLeft: '4px solid #3b82f6′ }}>
            <div style={{ color: '#1e40af', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Example — Charter Tier:</div>
            <div style={{ color: '#1e293b', fontSize: 14, lineHeight: 1.8 }}>
              You originate a home in 2026. That home has 2 HVAC jobs/year ($800 each in ProLnk commission).<br />
              <strong>Your cut: $24/year from that ONE home — forever.</strong><br />
              At 100 homes: $2,400/year in permanent income from homes you added once.<br />
              At 500 homes: $12,000/year, growing as service prices rise.
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0f172a', fontSize: 20, fontWeight: 800, margin: '0 0 20px' }}>How to Maximize Origination by Trade</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {scenarios.map(s => (
              <div key={s.trade} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', background: '#f8fafc', borderRadius: 10 }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: '#1d4ed8', minWidth: 140, paddingTop: 2 }}>{s.trade}</div>
                <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.6 }}>{s.example}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0f172a', fontSize: 20, fontWeight: 800, margin: '0 0 8px' }}>🏛️ The Legacy Angle</h2>
          <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            Origination rights are transferable to your estate. The income you build through ProLnk doesn't end when you stop working — it passes to your family. Charter and Founding members are building a permanent asset that appreciates as service costs rise and the ProLnk platform grows.
          </p>
        </div>

        <div style={{ background: '#fef2f2', borderRadius: 16, padding: 28, marginBottom: 40, border: '2px solid #fca5a5′ }}>
          <h3 style={{ color: '#dc2626', fontWeight: 800, fontSize: 16, margin: '0 0 8px' }}>⏳ Scarcity — This Stream Closes</h3>
          <p style={{ color: '#7f1d1d', fontSize: 15, margin: 0, lineHeight: 1.7 }}>
            Only Charter (25 spots) and Founding (100 spots) tiers earn origination rights. After founding closes at 500 total applications, this income stream is permanently unavailable to new members.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 48, border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0f172a', fontSize: 20, fontWeight: 800, margin: '0 0 24px' }}>📊 Origination Income Calculator</h2>
          <div style={{ marginBottom: 8 }}>
            <label style={{ color: '#64748b', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Your Tier</label>
            <div style={{ display: 'flex', gap: 12 }}>
              {(['charter', 'founding'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  style={{
                    background: tier === t ? '#1d4ed8′ : '#f1f5f9',
                    color: tier === t ? '#fff' : '#475569',
                    border: 'none', borderRadius: 8, padding: '8px 20px',
                    fontWeight: 700, fontSize: 14, cursor: 'pointer',
                  }}
                >
                  {t === 'charter' ? '🥇 Charter (1.5%)' : '🥈 Founding (1.0%)'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, margin: '24px 0′ }}>
            {[
              { label: 'Homes Originated', value: homes, setter: setHomes, min: 1, max: 1000, step: 5 },
              { label: 'Avg Jobs/Year per Home', value: jobsPerYear, setter: setJobsPerYear, min: 1, max: 12, step: 1 },
              { label: 'Avg ProLnk Commission ($)', value: avgCommission, setter: setAvgCommission, min: 100, max: 5000, step: 50 },
            ].map(s => (
              <div key={s.label}>
                <label style={{ color: '#64748b', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>{s.label}</label>
                <input
                  type="range" min={s.min} max={s.max} step={s.step}
                  value={s.value}
                  onChange={e => s.setter(Number(e.target.value))}
                  style={{ width: '100%', marginBottom: 4 }}
                />
                <div style={{ color: '#0f172a', fontWeight: 700, fontSize: 18 }}>
                  {s.label.includes('$') ? `$${s.value.toLocaleString()}` : s.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#eff6ff', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#64748b', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Annual Permanent Income</div>
              <div style={{ color: '#1d4ed8', fontSize: 32, fontWeight: 800 }}>${annualIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div style={{ background: '#f0fdf4', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#64748b', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>10-Year Projection</div>
              <div style={{ color: '#16a34a', fontSize: 32, fontWeight: 800 }}>${tenYearIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)', borderRadius: 20, padding: '48px 36px', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🚀</div>
          <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 800, margin: '0 0 12px' }}>Claim Your Origination Rights</h2>
          <p style={{ color: '#bfdbfe', fontSize: 16, margin: '0 0 28px', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            Charter spots: 25. Founding spots: 100. Once they're gone, origination rights close permanently. Apply today.
          </p>
          <a
            href="/apply"
            style={{
              display: 'inline-block', background: '#fff', color: '#1d4ed8',
              fontWeight: 800, fontSize: 16, padding: '14px 36px',
              borderRadius: 10, textDecoration: 'none',
            }}
          >
            Apply Now — Secure Your Spot →
          </a>
        </div>
      </div>
    </div>
  );
}
