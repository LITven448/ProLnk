import { useState } from 'react';

const rebates: Record<string, string> = {
  oncor: 'Oncor offers $0.10–$0.15/kWh saved via their Home Performance program. Apply before starting work.',
  atmos: 'Atmos Energy rebates up to $400 for insulation and $200 for smart thermostats.',
  txuenergy: 'TXU Energy credits for efficiency upgrades — check current offers at txu.com.',
  federal: 'Federal 25C tax credit: 30% of cost up to $3,200/year for insulation, windows, HVAC.',
};

export default function DFWHomeEnergyPlanGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [monthlyBill, setMonthlyBill] = useState('');
  const [budget, setBudget] = useState('');
  const [utility, setUtility] = useState('');
  const [plan, setPlan] = useState<null | { years: { year: number; project: string; cost: string; savings: string; rebate: string }[]; total: string; monthly: string }>(null);

  function generatePlan() {
    const age = parseInt(homeAge) || 15;
    const bill = parseInt(monthlyBill) || 250;
    const bgt = parseInt(budget) || 5000;

    const years = [];

    if (age > 20 || bill > 300) {
      years.push({ year: 1, project: 'Air Sealing + Attic Insulation', cost: '$2,500', savings: '$45/mo', rebate: utility ? (rebates[utility] || 'Check local utility for rebates') : 'Select utility for rebate info' });
    } else {
      years.push({ year: 1, project: 'Air Sealing Audit + Targeted Sealing', cost: '$800', savings: '$20/mo', rebate: 'Federal 25C credit applies' });
    }

    if (bgt >= 10000) {
      years.push({ year: 2, project: 'High-Efficiency HVAC Replacement (16+ SEER)', cost: '$7,500', savings: '$90/mo', rebate: 'Federal 25C: up to $2,000 credit' });
    } else {
      years.push({ year: 2, project: 'Smart Thermostat + HVAC Tune-Up', cost: '$600', savings: '$25/mo', rebate: 'Atmos rebate up to $200′ });
    }

    years.push({ year: 3, project: 'Solar Array (Right-Sized After Efficiency)', cost: '$18,000', savings: '$180/mo', rebate: 'Federal ITC 30% = $5,400 back' });

    const totalSavings = years.reduce((acc, y) => {
      const mo = parseFloat(y.savings.replace(/[^0-9.]/g, '')) || 0;
      return acc + mo;
    }, 0);

    setPlan({ years, total: '$' + years.reduce((a, y) => a + parseFloat(y.cost.replace(/[^0-9]/g, '')), 0).toLocaleString(), monthly: '$' + totalSavings.toFixed(0) + '/mo' });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: 40 }}>📋</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', marginBottom: 8 }}>DFW 3-Year Energy Improvement Plan</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>Build a sequenced, rebate-optimized energy plan for your DFW home.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Home age (years)', value: homeAge, set: setHomeAge, placeholder: 'e.g. 25′ },
            { label: 'Average summer electric bill ($)', value: monthlyBill, set: setMonthlyBill, placeholder: 'e.g. 350′ },
            { label: 'Total 3-year budget ($)', value: budget, set: setBudget, placeholder: 'e.g. 15000′ },
          ].map(f => (
            <div key={f.label}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: 4 }}>{f.label}</label>
              <input
                value={f.value}
                onChange={e => { f.set(e.target.value); setPlan(null); }}
                placeholder={f.placeholder}
                style={{ width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '0.65rem 1rem', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>
          ))}
          <div>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: 4 }}>Your electric utility</label>
            <select
              value={utility}
              onChange={e => { setUtility(e.target.value); setPlan(null); }}
              style={{ width: '100%', background: '#0A1628', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '0.65rem 1rem', color: '#fff', fontSize: '1rem' }}
            >
              <option value=''>Select utility...</option>
              <option value='oncor'>Oncor</option>
              <option value='atmos'>Atmos Energy</option>
              <option value='txuenergy'>TXU Energy</option>
              <option value='federal'>Federal only</option>
            </select>
          </div>
        </div>

        <button
          onClick={generatePlan}
          style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '0.85rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginBottom: '1.5rem' }}
        >
          Build My 3-Year Plan →
        </button>

        {plan && (
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '1.5rem', border: '1px solid rgba(245,230,66,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Total Investment</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.2rem' }}>{plan.total}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Monthly Savings</div>
                <div style={{ color: '#22c55e', fontWeight: 700, fontSize: '1.2rem' }}>{plan.monthly}</div>
              </div>
            </div>
            {plan.years.map(y => (
              <div key={y.year} style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.04)', borderRadius: 10, borderLeft: '3px solid #F5E642′ }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600 }}>Year {y.year}: {y.project}</span>
                  <span style={{ color: '#F5E642', fontWeight: 600 }}>{y.cost}</span>
                </div>
                <div style={{ color: '#22c55e', fontSize: '0.85rem', marginBottom: 4 }}>Savings: {y.savings}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>💡 {y.rebate}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
