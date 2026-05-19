import { useState } from 'react';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

interface Expense {
  item: string;
  cost: number;
  lifespan: number;
  dfwNote: string;
}

export default function DFWHomeMaintenanceReserveGuide() {
  const [homeValue, setHomeValue] = useState(380000);
  const [homeAge, setHomeAge] = useState(12);
  const [hasPool, setHasPool] = useState(false);
  const [reserveRate, setReserveRate] = useState(1.5);

  const monthlyReserve = (homeValue * reserveRate / 100) / 12;
  const poolAdder = hasPool ? 150 : 0;
  const totalMonthly = monthlyReserve + poolAdder;

  const baseExpenses: Expense[] = [
    { item: 'HVAC System (full replacement)', cost: 8500, lifespan: 11, dfwNote: 'DFW extreme heat reduces lifespan to 10–12 yrs' },
    { item: 'Roof (architectural shingles)', cost: 18000, lifespan: 20, dfwNote: 'Hail storms in DFW can accelerate replacement' },
    { item: 'Water Heater', cost: 1400, lifespan: 10, dfwNote: 'Hard water in DFW shortens lifespan; tankless lasts 20 yr' },
    { item: 'Kitchen Appliances (full set)', cost: 6000, lifespan: 15, dfwNote: 'Refrigerator fails faster in hot garages' },
    { item: 'Exterior Paint', cost: 5000, lifespan: 8, dfwNote: 'DFW UV and heat fades paint faster than national avg' },
    { item: 'Driveway/Concrete Repair', cost: 3500, lifespan: 20, dfwNote: 'DFW soil expansion/contraction cracks concrete regularly' },
    { item: 'Fence (wood, 200 LF)', cost: 4500, lifespan: 10, dfwNote: 'Termites and moisture rot are common in DFW' },
    { item: 'Plumbing Repairs (cumulative)', cost: 3000, lifespan: 10, dfwNote: 'Tree roots a major issue in older DFW neighborhoods' },
    { item: 'Electrical Updates', cost: 2500, lifespan: 20, dfwNote: 'Panel upgrades often needed for EV chargers' },
    { item: 'Foundation Inspection/Repair', cost: 5000, lifespan: 15, dfwNote: '⚠️ DFW-specific: expansive clay soil shifts foundations' },
  ];

  const poolExpense: Expense = {
    item: 'Pool Resurfacing & Equipment', cost: 12000, lifespan: 10, dfwNote: 'Equipment replacement cycle in high-use DFW climate'
  };
  const expenses = hasPool ? [...baseExpenses, poolExpense] : baseExpenses;

  const yearsUntilExpense = (lifespan: number, age: number) => {
    const cyclesUsed = Math.floor(age / lifespan);
    return lifespan - (age - cyclesUsed * lifespan);
  };

  const urgentExpenses = expenses.filter(e => yearsUntilExpense(e.lifespan, homeAge) <= 5);
  const midtermExpenses = expenses.filter(e => {
    const yrs = yearsUntilExpense(e.lifespan, homeAge);
    return yrs > 5 && yrs <= 10;
  });

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628′ }}>
      <div style={{ background: '#0A1628', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 36 }}>🔧</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
          DFW Home Maintenance Reserve Guide
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: 16, maxWidth: 640, margin: '0 auto' }}>
          DFW's heat, hail, and expansive clay soil demand a disciplined reserve fund. Plan every major expense before it hits.
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0′ }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>💾 Sinking Fund vs General Savings</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13, color: '#475569′ }}>
              <div style={{ background: '#dcfce7', borderRadius: 8, padding: 12 }}>
                <div style={{ fontWeight: 700, color: '#166534', marginBottom: 4 }}>✅ Sinking Fund</div>
                Dedicated HYSA for home expenses. Set monthly auto-transfer. Don't touch for other goals. Earns 4–5% APY.
              </div>
              <div style={{ background: '#fce7f3', borderRadius: 8, padding: 12 }}>
                <div style={{ fontWeight: 700, color: '#9d174d', marginBottom: 4 }}>⚠️ General Savings</div>
                Easy to raid for other needs. Hard to track whether you're "on track." Not recommended for home reserves.
              </div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0′ }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📐 How Much to Save</h3>
            <div style={{ fontSize: 14, color: '#475569′ }}>
              <p style={{ marginBottom: 8 }}><strong>1% Rule:</strong> Save 1% of home value per year. Minimum baseline.</p>
              <p style={{ marginBottom: 8 }}><strong>1.5% Rule:</strong> Better for DFW given foundation, HVAC, and hail risk.</p>
              <p style={{ marginBottom: 0 }}><strong>2% Rule:</strong> For homes over 15 years old or with a pool.</p>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e2e8f0', marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>🧮 Reserve Calculator + 20-Year Forecast</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 24, alignItems: 'end' }}>
            {[
              { label: 'Home Value ($)', value: homeValue, setValue: setHomeValue, step: 10000 },
              { label: 'Home Age (years)', value: homeAge, setValue: setHomeAge, step: 1 },
              { label: 'Reserve Rate (%/yr)', value: reserveRate, setValue: setReserveRate, step: 0.5 },
            ].map(field => (
              <div key={field.label}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>{field.label}</label>
                <input
                  type="number"
                  step={field.step}
                  value={field.value}
                  onChange={e => field.setValue(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 15, boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Pool?</label>
              <button
                onClick={() => setHasPool(!hasPool)}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 15, cursor: 'pointer', background: hasPool ? '#0A1628′ : '#fff', color: hasPool ? '#F5E642' : '#0A1628', fontWeight: 700 }}
              >
                {hasPool ? '🏊 Yes, Pool' : '❌ No Pool'}
              </button>
            </div>
          </div>

          <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, color: '#fff', marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, textAlign: 'center' }}>
            <div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>Recommended Monthly</div>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800 }}>{formatCurrency(totalMonthly)}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>home reserve + {hasPool ? 'pool' : 'no pool'}</div>
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>Annual Contribution</div>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800 }}>{formatCurrency(totalMonthly * 12)}</div>
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>5-Year Reserve Goal</div>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800 }}>{formatCurrency(totalMonthly * 60)}</div>
            </div>
          </div>

          {urgentExpenses.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#dc2626', marginBottom: 8 }}>🚨 Upcoming in Next 5 Years</h3>
              {urgentExpenses.map(e => (
                <div key={e.item} style={{ background: '#fef2f2', borderRadius: 8, padding: 12, marginBottom: 8, display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{e.item}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>In ~{yearsUntilExpense(e.lifespan, homeAge)} yrs | {e.dfwNote}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: '#dc2626', fontSize: 16 }}>{formatCurrency(e.cost)}</div>
                </div>
              ))}
            </div>
          )}

          {midtermExpenses.length > 0 && (
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#d97706', marginBottom: 8 }}>📅 5–10 Year Planning</h3>
              {midtermExpenses.map(e => (
                <div key={e.item} style={{ background: '#fffbeb', borderRadius: 8, padding: 12, marginBottom: 8, display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{e.item}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>In ~{yearsUntilExpense(e.lifespan, homeAge)} yrs | {e.dfwNote}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: '#d97706', fontSize: 16 }}>{formatCurrency(e.cost)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
