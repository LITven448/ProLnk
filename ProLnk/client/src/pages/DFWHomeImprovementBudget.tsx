import { useState } from 'react';

const PROJECTS = [
  { name: 'Kitchen Remodel', cost: 28000, priority: 'high' },
  { name: 'Bathroom Remodel', cost: 14000, priority: 'high' },
  { name: 'HVAC Replacement', cost: 8500, priority: 'critical' },
  { name: 'Roof Replacement', cost: 18000, priority: 'critical' },
  { name: 'Foundation Repair', cost: 15000, priority: 'critical' },
  { name: 'Flooring', cost: 8000, priority: 'medium' },
  { name: 'Paint (interior)', cost: 3500, priority: 'low' },
  { name: 'Fence', cost: 5500, priority: 'low' },
  { name: 'Landscaping', cost: 7000, priority: 'medium' },
  { name: 'Pool Build', cost: 55000, priority: 'low' },
];

export default function DFWHomeImprovementBudget() {
  const [selected, setSelected] = useState<string[]>([]);
  const [custom, setCustom] = useState('');
  const [customCost, setCustomCost] = useState('');
  const [months, setMonths] = useState('24');
  const [result, setResult] = useState<null | { monthly: number; total: number; canFinance: boolean; items: { name: string; cost: number }[] }>(null);

  function toggle(name: string) {
    setSelected(s => s.includes(name) ? s.filter(x => x !== name) : [...s, name]);
  }

  function calculate() {
    const items = PROJECTS.filter(p => selected.includes(p.name)).map(p => ({ name: p.name, cost: p.cost }));
    if (custom && customCost) items.push({ name: custom, cost: parseFloat(customCost) || 0 });
    const total = items.reduce((a, b) => a + b.cost, 0);
    const mo = parseInt(months) || 24;
    const monthly = total / mo;
    setResult({ monthly, total, canFinance: monthly > 2000, items });
  }

  const priorityColor: Record<string, string> = { critical: '#FEE2E2', high: '#FEF9C3', medium: '#E0F2FE', low: '#F0FDF4′ };
  const priorityLabel: Record<string, string> = { critical: '🔴', high: '🟡', medium: '🔵', low: '🟢' };

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#0A1628′ }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 32 }}>🔨💡</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Home Improvement Budget Planner</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>Build a sinking fund strategy — save monthly, spend with confidence.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 16, marginBottom: 4 }}>Select Planned Improvements</h2>
          <p style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>🔴 Critical first, then high → medium → low in DFW</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {PROJECTS.map(p => (
              <button key={p.name} onClick={() => toggle(p.name)}
                style={{ textAlign: 'left', padding: '10px 12px', borderRadius: 8, border: `2px solid ${selected.includes(p.name) ? '#0A1628' : '#E2E8F0'}`,
                  background: selected.includes(p.name) ? '#0A1628′ : priorityColor[p.priority], color: selected.includes(p.name) ? '#F5E642' : '#0A1628',
                  cursor: 'pointer', fontSize: 13 }}>
                {priorityLabel[p.priority]} {p.name}
                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>${p.cost.toLocaleString()}</div>
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <input value={custom} onChange={e => setCustom(e.target.value)} placeholder="Custom project name"
              style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 14 }} />
            <input type="number" value={customCost} onChange={e => setCustomCost(e.target.value)} placeholder="Estimated cost ($)"
              style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 14 }} />
          </div>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14, marginBottom: 20 }}>
            Save over how many months?
            <select value={months} onChange={e => setMonths(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }}>
              <option value="12″>12 months</option>
              <option value="24″>24 months</option>
              <option value="36″>36 months</option>
              <option value="48″>48 months</option>
            </select>
          </label>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '13px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Build My Sinking Fund Plan →
          </button>
        </div>

        {result && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontSize: 17, marginBottom: 16 }}>📊 Your Improvement Savings Plan</h2>
            {result.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9', fontSize: 14 }}>
                <span>{item.name}</span>
                <span style={{ fontWeight: 600 }}>${item.cost.toLocaleString()}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, padding: '14px 0', borderTop: '2.5px solid #0A1628′ }}>
              <span style={{ fontWeight: 800 }}>Total Project Cost</span>
              <span style={{ fontWeight: 800, fontSize: 20 }}>${result.total.toLocaleString()}</span>
            </div>
            <div style={{ background: '#F0FDF4', borderRadius: 10, padding: 18, textAlign: 'center', marginTop: 16 }}>
              <div style={{ fontSize: 13, color: '#166534′ }}>Save monthly for {months} months</div>
              <div style={{ fontSize: 34, fontWeight: 800, color: '#166534′ }}>${Math.round(result.monthly).toLocaleString()}/mo</div>
            </div>
            {result.canFinance && (
              <div style={{ marginTop: 14, padding: 14, background: '#FEF2F2', borderRadius: 8, fontSize: 13, color: '#991B1B' }}>
                ⚠️ Monthly savings target is high. Consider a HELOC or home equity loan for large critical projects, then rebuild savings.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
