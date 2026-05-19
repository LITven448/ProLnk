import { useState } from 'react';

const HVAC_ANALYSIS: Record<string, Record<string, { verdict: string; savings: string; recommendation: string }>> = {
  pre1980: {
    pre2000: { verdict: 'Replace — Strong Case', savings: 'Up to 40–50% reduction in cooling bills. R-22 refrigerant systems cost $150+/lb to recharge vs $20/lb for modern R-410A.', recommendation: 'Replace with 16+ SEER heat pump. Financing at $80–$120/month beats repair costs within 18 months. Rebates up to $500 from Oncor.' },
    '2000to2014': { verdict: 'Replace Soon', savings: '25–35% efficiency gain. System at or past 12-year useful life.', recommendation: 'Get replacement quotes now — don\’t wait for summer failure. 14 SEER minimum, 16 SEER recommended for Forest Hill heat.' },
    post2014: { verdict: 'Repair if Under $800', savings: 'Newer efficient system worth maintaining. Repair extends life 3–5 years at lower cost than replacement.', recommendation: 'Annual tune-up + capacitor/contactor inspection. Replace if single repair exceeds $800.' },
  },
  '1980to2000': {
    pre2000: { verdict: 'Replace — Immediate Priority', savings: '35–45% efficiency improvement. Mid-era home + old system = highest utility bills in the neighborhood.', recommendation: 'Replace with 16 SEER+ system sized correctly for home. Duct sealing adds 10–15% additional savings.' },
    '2000to2014': { verdict: 'Assess Repair vs Replace', savings: 'System entering end-of-life range. Calculate: if repair > 50% of replacement cost, replace.', recommendation: 'Get competing quotes. Repair if under $600 and system under 12 years. Otherwise replace with financing.' },
    post2014: { verdict: 'Maintain and Monitor', savings: 'Good efficiency, reasonable age. Focus on filter changes and coil cleaning for max performance.', recommendation: '$99 tune-up each spring. Watch for refrigerant loss — early sign of coil issues.' },
  },
  post2000: {
    pre2000: { verdict: 'Priority Replace', savings: 'Newer home, old system — mismatch. Modern home air sealing means the old system is working harder than designed.', recommendation: 'Right-size the new system for your modern home — older systems are often oversized for tighter construction.' },
    '2000to2014': { verdict: 'Repair vs Replace Borderline', savings: 'System in useful life zone. Repair is often the right call unless efficiency gap is costing you $50+/month.', recommendation: 'Request efficiency estimate from contractor. Ask for utility bill comparison before committing to replacement.' },
    post2014: { verdict: 'Maintain Only', savings: 'System and home are well-matched. Maintenance is the investment.', recommendation: 'Programmable or smart thermostat if not already installed — $150–$250 installed, saves $120–$200/year.' },
  },
};

export default function DFWHVACForestHill() {
  const [homeAge, setHomeAge] = useState('');
  const [systemAge, setSystemAge] = useState('');
  const [result, setResult] = useState<{ verdict: string; savings: string; recommendation: string } | null>(null);

  function analyze() {
    if (homeAge && systemAge) setResult(HVAC_ANALYSIS[homeAge][systemAge]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 100%)', padding: '48px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: '36px', marginBottom: '8px' }}>🌡️🏠</div>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#F5E642', margin: '0 0 8px' }}>Forest Hill TX HVAC</h1>
        <p style={{ fontSize: '16px', color: '#A8B8D0', margin: '0', maxWidth: '560px', marginInline: 'auto' }}>
          South Fort Worth Specialists — value-focused HVAC for Forest Hill's working community
        </p>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', margin: '0 0 16px' }}>🏙️ Forest Hill HVAC Reality</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { icon: '🏚️', label: '1960s–1990s Housing Stock', desc: 'Most Forest Hill homes are 35–65 years old — HVAC systems in these homes face a clear repair vs replace decision every decade' },
              { icon: '☀️', label: 'Fort Worth Summer Heat', desc: 'South of Fort Worth, temperatures regularly exceed 105°F — aging systems that were adequate in 1985 are overworked today' },
              { icon: '💵', label: 'Value Matters Here', desc: 'Forest Hill is a working-class community — our contractors provide honest cost-benefit analysis, not high-pressure upsells' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: '700', color: '#E8EDF5', fontSize: '14px' }}>{item.label}</div>
                  <div style={{ color: '#8898AA', fontSize: '13px', marginTop: '2px' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', margin: '0 0 16px' }}>💡 Efficiency Improvement + Cost vs Repair Analysis</h2>
          <div style={{ display: 'grid', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', color: '#A8B8D0', fontSize: '13px', marginBottom: '6px' }}>Home Age</label>
              <select
                value={homeAge}
                onChange={(e) => { setHomeAge(e.target.value); setResult(null); }}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #2A4080', borderRadius: '8px', padding: '10px 12px', color: '#E8EDF5', fontSize: '14px' }}
              >
                <option value="">Select era...</option>
                <option value="pre1980">Before 1980</option>
                <option value="1980to2000">1980–2000</option>
                <option value="post2000">After 2000</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A8B8D0', fontSize: '13px', marginBottom: '6px' }}>Current HVAC System Age</label>
              <select
                value={systemAge}
                onChange={(e) => { setSystemAge(e.target.value); setResult(null); }}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #2A4080', borderRadius: '8px', padding: '10px 12px', color: '#E8EDF5', fontSize: '14px' }}
              >
                <option value="">Select system age...</option>
                <option value="pre2000">Before 2000 (25+ years old)</option>
                <option value="2000to2014">2000–2014 (10–25 years old)</option>
                <option value="post2014">2014 or newer (under 10 years)</option>
              </select>
            </div>
          </div>
          <button
            onClick={analyze}
            disabled={!homeAge || !systemAge}
            style={{ width: '100%', background: homeAge && systemAge ? '#F5E642' : '#2A4080', color: homeAge && systemAge ? '#0A1628' : '#4A6080', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '15px', fontWeight: '700', cursor: homeAge && systemAge ? 'pointer' : 'not-allowed' }}
          >
            Analyze Repair vs Replace
          </button>
          {result && (
            <div style={{ marginTop: '16px', background: '#0A1628', borderRadius: '8px', padding: '16px', border: '1px solid #F5E642' }}>
              <div style={{ fontWeight: '800', fontSize: '16px', color: '#F5E642', marginBottom: '6px' }}>{result.verdict}</div>
              <div style={{ color: '#8898AA', fontSize: '13px', marginBottom: '10px' }}>💰 {result.savings}</div>
              <div style={{ background: '#0F2040', borderRadius: '6px', padding: '10px', color: '#E8EDF5', fontSize: '13px', borderLeft: '3px solid #F5E642' }}>
                ✅ {result.recommendation}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🌡️</div>
          <h3 style={{ color: '#0A1628', fontSize: '18px', fontWeight: '800', margin: '0 0 6px' }}>Get a Forest Hill HVAC Quote</h3>
          <p style={{ color: '#1A3060', fontSize: '13px', margin: '0 0 16px' }}>Honest assessment. Financing available. No high-pressure sales — just the facts.</p>
          <a href="/pro-signup" style={{ display: 'inline-block', background: '#0A1628', color: '#F5E642', padding: '12px 32px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}>
            Connect with a Forest Hill HVAC Pro →
          </a>
        </div>
      </div>
    </div>
  );
}
