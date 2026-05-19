import { useState } from 'react';

const systemAges = ['Under 5 years', '5-8 years', '8-12 years', '12-16 years', '16-20 years', '20+ years'];
const homeSizes = ['Under 1,200 sq ft', '1,200–1,800 sq ft', '1,800–2,500 sq ft', '2,500–3,500 sq ft', '3,500+ sq ft'];

type ReadinessResult = { score: number; label: string; color: string; tier: string; tierDesc: string; estCost: string };

function getReadiness(age: string, size: string): ReadinessResult {
  const ageIdx = systemAges.indexOf(age);
  const sizeIdx = homeSizes.indexOf(size);
  const score = Math.max(0, 100 - ageIdx * 16 - sizeIdx * 2);
  const tier = sizeIdx <= 1
    ? ageIdx >= 3 ? 'Economy 14-SEER2′ : ’Standard 16-SEER2'
    : sizeIdx <= 2
    ? ageIdx >= 3 ? 'Standard 16-SEER2′ : ’Comfort 18-SEER2'
    : ageIdx >= 3 ? 'Comfort 18-SEER2′ : ’Premium 20-SEER2';
  const baseMin = 4200 + sizeIdx * 800 + Math.max(0, ageIdx - 2) * 200;
  const baseMax = baseMin + 2000 + sizeIdx * 500;
  const label = score >= 70 ? 'GOOD' : score >= 40 ? 'AGING' : score >= 20 ? 'DECLINING' : 'REPLACE SOON';
  const color = score >= 70 ? '#44FF88′ : score >= 40 ? '#F5E642' : score >= 20 ? '#FF8C00' : '#FF4444';
  const tierDesc = {
    'Economy 14-SEER2': 'Best value for smaller DeSoto homes. Meets minimum efficiency standards. Good for moderate use.',
    'Standard 16-SEER2': 'Most popular choice in DeSoto. Balances upfront cost with long-term savings on Oncor bills.',
    'Comfort 18-SEER2': 'Mid-premium efficiency. Ideal for larger homes where HVAC runs most of the day.',
    'Premium 20-SEER2': 'Top efficiency for large homes. Highest upfront cost, but lowest monthly operating expense.',
  }[tier] ?? '';
  return { score, label, color, tier, tierDesc, estCost: `$${baseMin.toLocaleString()}–$${baseMax.toLocaleString()}` };
}

export default function DFWHVACDeSoto() {
  const [sysAge, setSysAge] = useState('');
  const [homeSize, setHomeSize] = useState('');
  const result = sysAge && homeSize ? getReadiness(sysAge, homeSize) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 14, fontWeight: 600 }}>
          ❄️ ProLnk — DeSoto TX
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>
          DeSoto TX HVAC<br />
          <span style={{ color: '#F5E642′ }}>South Dallas County Specialists</span>
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 680, lineHeight: 1.7, marginBottom: 40 }}>
          DeSoto is a well-established middle-class community in southern Dallas County where most homes were built between the 1970s and early 2000s. Many systems in DeSoto are reaching or past end-of-life — and with summer temperatures regularly hitting 100°F+, a failing AC is a real health and safety issue. Our vetted HVAC pros offer honest load calculations, not oversized equipment.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { emoji: '📊', label: 'Load Calc Included', desc: 'Every replacement quote includes a Manual J load calculation — no guessing on system size.' },
            { emoji: '💵', label: 'Financing Available', desc: '0% financing options from 12–60 months through our vetted HVAC pros.' },
            { emoji: '🔄', label: 'Rebates Navigated', desc: 'Oncor and manufacturer rebates applied at time of quote — no chasing paperwork.' },
            { emoji: '⏱️', label: 'Same-Day Installs', desc: 'Most DeSoto replacements completed in one day by experienced crews.' },
          ].map(card => (
            <div key={card.label} style={{ background: '#132040', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.emoji}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: '#F5E642′ }}>{card.label}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 32, border: '1px solid #F5E642', marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>
            🌡️ Replacement Readiness Score
          </h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 24 }}>
            Enter your system age and home size to get a readiness score and the best system tier for your budget.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#CBD5E1', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Current System Age</label>
              <select value={sysAge} onChange={e => setSysAge(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="">Select system age...</option>
                {systemAges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#CBD5E1', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Home Size</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="">Select home size...</option>
                {homeSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, border: `2px solid ${result.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', border: `4px solid ${result.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontWeight: 800, fontSize: 18, color: result.color }}>{result.score}</span>
                  </div>
                  <div>
                    <div style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600 }}>READINESS SCORE</div>
                    <div style={{ color: result.color, fontWeight: 800, fontSize: 16 }}>{result.label}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600 }}>RECOMMENDED TIER</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 15 }}>{result.tier}</div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{result.estCost}</div>
                </div>
              </div>
              <p style={{ color: '#E2E8F0', fontSize: 14, lineHeight: 1.7, marginBottom: 0 }}>{result.tierDesc}</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 18, padding: '16px 48px', borderRadius: 50, border: 'none', cursor: 'pointer' }}
            onClick={() => alert('Redirecting to ProLnk homeowner signup...')}
          >
            Get Free HVAC Quotes — DeSoto TX
          </button>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 12 }}>No obligation · Licensed HVAC pros compete for your business</p>
        </div>
      </div>
    </div>
  );
}
