import { useState } from 'react';

const systemAges = ['Under 5 years', '5-10 years', '10-15 years', '15-20 years', '20+ years'];
const homeVintages = ['Pre-1970', '1970s', '1980s', '1990s', '2000s+'];

function getAssessment(age: string, vintage: string) {
  const ageScore = systemAges.indexOf(age);
  const vintageScore = homeVintages.indexOf(vintage);
  const total = ageScore * 2 + (4 - vintageScore);
  const cost = 4500 + ageScore * 1200 + (4 - vintageScore) * 400;
  if (total >= 10) return { urgency: 'REPLACE NOW', detail: 'System is near or past end-of-life. Efficiency losses are costing you money monthly. Old ductwork in pre-1980s homes may need replacement too.', estimate: `$${cost.toLocaleString()}–$${(cost + 2500).toLocaleString()}`, color: '#FF4444′ };
  if (total >= 6) return { urgency: 'PLAN REPLACEMENT', detail: 'Within 2-3 years you\’ll need a new system. Start budgeting now. Consider a tune-up to extend life and lower bills.', estimate: `$${cost.toLocaleString()}–$${(cost + 2000).toLocaleString()}`, color: '#FF8C00′ };
  if (total >= 3) return { urgency: 'MAINTAIN & MONITOR', detail: 'System has good life remaining. Annual tune-ups and filter changes keep efficiency high. Watch for unusual sounds or rising bills.', estimate: '$150–$350/year maintenance', color: '#F5E642′ };
  return { urgency: 'IN GOOD SHAPE', detail: 'Newer system in a well-built home. Keep up with filter changes and annual inspections. You\’re in great shape.', estimate: '$100–$200/year maintenance', color: '#44FF88′ };
}

export default function DFWHVACFarmersBranch() {
  const [age, setAge] = useState('');
  const [vintage, setVintage] = useState('');
  const result = age && vintage ? getAssessment(age, vintage) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 14, fontWeight: 600 }}>
          ❄️ ProLnk — Farmers Branch TX
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>
          Farmers Branch TX HVAC<br />
          <span style={{ color: '#F5E642′ }}>Established Suburb Specialists</span>
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 680, lineHeight: 1.7, marginBottom: 40 }}>
          Farmers Branch is one of the few DFW suburbs completely surrounded by Dallas — a compact, mature community where most homes date from the 1960s through 1980s. HVAC in these older homes often means dealing with original ductwork, limited attic clearance, and systems that haven't been upgraded in decades. Our vetted Farmers Branch HVAC pros know these homes inside and out.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { emoji: '🏚️', label: 'Older Home Experts', desc: 'Experienced with 1960s-1980s ductwork, limited access, and aging systems' },
            { emoji: '🔧', label: 'All Major Brands', desc: 'Carrier, Lennox, Trane, Goodman, Rheem — same-day parts available' },
            { emoji: '💡', label: 'Energy Audit Ready', desc: 'Identify duct leaks and insulation gaps driving up your Oncor bill' },
            { emoji: '📅', label: 'Maintenance Plans', desc: 'Annual service contracts tailored to established-suburb home needs' },
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
            🌡️ Replacement Urgency Calculator
          </h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 24 }}>
            Input your system age and home vintage to get an honest assessment and ballpark cost estimate.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#CBD5E1', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                Current HVAC System Age
              </label>
              <select
                value={age}
                onChange={e => setAge(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}
              >
                <option value="">Select system age...</option>
                {systemAges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#CBD5E1', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                Home Build Decade
              </label>
              <select
                value={vintage}
                onChange={e => setVintage(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}
              >
                <option value="">Select home vintage...</option>
                {homeVintages.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, border: `2px solid ${result.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                <span style={{ background: result.color, color: '#000', fontWeight: 800, fontSize: 13, padding: '4px 14px', borderRadius: 20 }}>
                  {result.urgency}
                </span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>Estimated cost: {result.estimate}</span>
              </div>
              <p style={{ color: '#E2E8F0', fontSize: 15, lineHeight: 1.7, marginBottom: 0 }}>{result.detail}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 32, marginBottom: 40, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Farmers Branch HVAC Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
            {[
              { num: '102°F', label: 'Avg Summer Peak Temp' },
              { num: '15 yrs', label: 'Avg System Lifespan DFW' },
              { num: '40%', label: 'Energy Bill from HVAC' },
              { num: '3', label: 'Competing Quotes Always' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#F5E642′ }}>{s.num}</div>
                <div style={{ color: '#94A3B8', fontSize: 14, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 18, padding: '16px 48px', borderRadius: 50, border: 'none', cursor: 'pointer' }}
            onClick={() => alert('Redirecting to ProLnk homeowner signup...')}
          >
            Get Free HVAC Quotes — Farmers Branch
          </button>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 12 }}>No obligation · 3 licensed HVAC pros compete for your business</p>
        </div>
      </div>
    </div>
  );
}
