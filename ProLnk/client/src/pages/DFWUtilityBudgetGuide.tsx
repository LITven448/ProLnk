import { useState } from 'react';

const SUBURB_FACTOR: Record<string, number> = {
  dallas: 1.0, plano: 0.95, frisco: 0.93, mckinney: 0.92, allen: 0.94,
  garland: 1.02, arlington: 1.0, ftworth: 1.01, denton: 0.97, lewisville: 0.96,
  mansfield: 0.98, southlake: 0.94, grapevine: 0.96, irving: 1.01, richardson: 0.97,
};

const MONTHLY_ELEC: number[] = [110, 105, 130, 160, 250, 340, 420, 400, 290, 190, 130, 110];
const MONTHLY_GAS: number[] = [120, 100, 65, 40, 25, 20, 20, 20, 25, 35, 65, 110];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function DFWUtilityBudgetGuide() {
  const [sqft, setSqft] = useState('');
  const [suburb, setSuburb] = useState('dallas');
  const [hasPool, setHasPool] = useState(false);
  const [result, setResult] = useState<null | { breakdown: { month: string; elec: number; gas: number; water: number; total: number }[]; annual: number }>(null);

  function calculate() {
    const sf = parseFloat(sqft) || 2000;
    const factor = SUBURB_FACTOR[suburb] || 1.0;
    const sizeMult = sf < 1500 ? 0.75 : sf < 2500 ? 1.0 : sf < 3500 ? 1.3 : 1.6;
    const breakdown = MONTHS.map((month, i) => {
      const elec = Math.round(MONTHLY_ELEC[i] * sizeMult * factor);
      const gas = Math.round(MONTHLY_GAS[i] * sizeMult * factor);
      const isIrrigation = i >= 4 && i <= 8;
      const water = Math.round((isIrrigation ? (hasPool ? 220 : 160) : 80) * factor);
      return { month, elec, gas, water, total: elec + gas + water + 80 };
    });
    const annual = breakdown.reduce((a, b) => a + b.total, 0);
    setResult({ breakdown, annual });
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#0A1628′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 32 }}>⚡💧🔥</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Utility Budget Guide by Season</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>Summer electricity can hit $400+/mo — know what's coming before it hits.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <div style={{ display: 'grid', gap: 16 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
              Home size (sq ft)
              <input type="number" value={sqft} onChange={e => setSqft(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }} placeholder="e.g. 2400″ />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
              DFW Area / Suburb
              <select value={suburb} onChange={e => setSuburb(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }}>
                {Object.keys(SUBURB_FACTOR).map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasPool} onChange={e => setHasPool(e.target.checked)} style={{ width: 18, height: 18 }} />
              Home has a pool (increases summer water bill)
            </label>
          </div>
          <button onClick={calculate}
            style={{ marginTop: 22, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '13px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Show My Utility Budget →
          </button>
        </div>

        {result && (
          <>
            <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
              <h2 style={{ fontSize: 17, marginBottom: 16 }}>📊 Monthly Utility Estimates</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#0A1628', color: '#F5E642′ }}>
                      {['Month','⚡ Elec','🔥 Gas','💧 Water','Other','Total'].map(h => (
                        <th key={h} style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 700 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.breakdown.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#F8FAFC' : '#fff' }}>
                        <td style={{ padding: '7px 10px', fontWeight: 600 }}>{row.month}</td>
                        <td style={{ padding: '7px 10px', textAlign: 'right', color: row.elec > 300 ? '#DC2626′ : '#0A1628' }}>${row.elec}</td>
                        <td style={{ padding: '7px 10px', textAlign: 'right', color: row.gas > 100 ? '#1D4ED8′ : '#0A1628' }}>${row.gas}</td>
                        <td style={{ padding: '7px 10px', textAlign: 'right' }}>${row.water}</td>
                        <td style={{ padding: '7px 10px', textAlign: 'right', color: '#64748B' }}>$80</td>
                        <td style={{ padding: '7px 10px', textAlign: 'right', fontWeight: 700 }}>${row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '2.5px solid #0A1628', fontWeight: 800, fontSize: 16 }}>
                <span>Annual Utility Total</span>
                <span>${result.annual.toLocaleString()}</span>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>💡 Top DFW Utility Savings</div>
              {[
                ['☀️ Solar panels', 'DFW gets 230+ sunny days/yr — payback in 7–10 yrs, instant savings'],
                ['🌡️ Smart thermostat', '$100–200 device saves $200+/yr in DFW summers'],
                ['💧 Drip irrigation', 'Cuts summer water bill 30–40% vs. spray heads'],
                ['🏠 Attic insulation', 'R-38+ in DFW attic reduces cooling load significantly'],
                ['🔌 Rate plan', 'Choose time-of-use plans — avoid peak 3–8pm in summer'],
              ].map(([tip, desc], i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #F1F5F9', fontSize: 13 }}>
                  <span style={{ fontWeight: 600 }}>{tip}:</span> <span style={{ color: '#64748B' }}>{desc}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
