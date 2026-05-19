import { useState } from 'react';

const REPAIR_COSTS: Record<string, number> = {
  hvac: 8500,
  foundation: 15000,
  roof: 18000,
  plumbing: 4500,
  electrical: 3500,
};

export default function DFWEmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [homeAge, setHomeAge] = useState('');
  const [hasPool, setHasPool] = useState(false);
  const [hvacAge, setHvacAge] = useState('');
  const [roofAge, setRoofAge] = useState('');
  const [result, setResult] = useState<null | { min: number; max: number; topRisks: string[] }>(null);

  function calculate() {
    const expenses = parseFloat(monthlyExpenses) || 0;
    const age = parseInt(homeAge) || 0;
    const hvac = parseInt(hvacAge) || 0;
    const roof = parseInt(roofAge) || 0;

    let baseMonths = 6;
    const risks: string[] = [];

    if (age > 20) { baseMonths += 1; risks.push('Older home — higher repair likelihood'); }
    if (hvac > 10) { baseMonths += 1; risks.push('HVAC over 10 yrs — DFW summer failure risk ($8,500 avg)'); }
    if (roof > 15) { baseMonths += 1; risks.push('Roof over 15 yrs — hail season replacement risk ($18,000 avg)'); }
    if (hasPool) { baseMonths += 1; risks.push('Pool — pump/plaster repairs ($2,000–$12,000)'); }
    if (age > 15) risks.push('Foundation piers common in DFW clay soil ($15,000 avg)');

    const minFund = expenses * baseMonths;
    const maxFund = expenses * (baseMonths + 2);
    setResult({ min: minFund, max: maxFund, topRisks: risks });
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#0A1628′ }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 32 }}>🏠💰</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Emergency Fund Calculator</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>Homeowners need more than renters — DFW has unique repair risks.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 17, marginBottom: 20 }}>Your Home Details</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
              Monthly household expenses ($)
              <input type="number" value={monthlyExpenses} onChange={e => setMonthlyExpenses(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }} placeholder="e.g. 5500″ />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
              Home age (years)
              <input type="number" value={homeAge} onChange={e => setHomeAge(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }} placeholder="e.g. 18″ />
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
                HVAC age (years)
                <input type="number" value={hvacAge} onChange={e => setHvacAge(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }} placeholder="e.g. 8″ />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
                Roof age (years)
                <input type="number" value={roofAge} onChange={e => setRoofAge(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }} placeholder="e.g. 12″ />
              </label>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasPool} onChange={e => setHasPool(e.target.checked)} style={{ width: 18, height: 18 }} />
              Home has a pool 🏊
            </label>
          </div>
          <button onClick={calculate}
            style={{ marginTop: 22, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '13px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Calculate My Emergency Fund →
          </button>
        </div>

        {result && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontSize: 17, marginBottom: 16 }}>📊 Your Recommended Emergency Fund</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div style={{ background: '#F0FDF4', borderRadius: 10, padding: 18, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#166534', marginBottom: 4 }}>Minimum Target</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#166534′ }}>${result.min.toLocaleString()}</div>
              </div>
              <div style={{ background: '#FEF9EC', borderRadius: 10, padding: 18, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#92400E', marginBottom: 4 }}>Recommended Max</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#92400E' }}>${result.max.toLocaleString()}</div>
              </div>
            </div>
            {result.topRisks.length > 0 && (
              <div style={{ background: '#FEF2F2', borderRadius: 10, padding: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: '#991B1B' }}>⚠️ Your DFW Risk Factors</div>
                {result.topRisks.map((r, i) => <div key={i} style={{ fontSize: 13, color: '#7F1D1D', marginBottom: 4 }}>• {r}</div>)}
              </div>
            )}
            <div style={{ marginTop: 16, padding: 14, background: '#F8FAFC', borderRadius: 8, fontSize: 13, color: '#475569′ }}>
              💡 Build it by saving ${Math.round(result.min / 24).toLocaleString()}/mo for 24 months in a high-yield savings account separate from your regular savings.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
