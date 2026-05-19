import { useState } from 'react';

type Entry = { label: string; amount: number; year: number };

const CATEGORY_GROUPS = [
  { group: 'Installation', icon: '🏗️', items: ['System Purchase', 'Labor/Install', 'Ductwork', 'Permits/Inspection'] },
  { group: 'Maintenance', icon: '🔧', items: ['Annual Tune-Up', 'Filter Replacements', 'Coil Cleaning', 'Refrigerant Recharge'] },
  { group: 'Repairs', icon: '🛠️', items: ['Compressor Repair', 'Capacitor/Contactor', 'Thermostat', 'Other Repair'] },
  { group: 'Energy', icon: '⚡', items: ['Annual Electric Bill (HVAC share)'] },
];

export default function DFWHVACCostTracker() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [label, setLabel] = useState('System Purchase');
  const [amount, setAmount] = useState('');
  const [yr, setYr] = useState(2022);
  const [installYear, setInstallYear] = useState(2022);
  const [showResults, setShowResults] = useState(false);

  const addEntry = () => {
    if (!amount || isNaN(Number(amount))) return;
    setEntries(e => [...e, { label, amount: Number(amount), year: yr }]);
    setAmount('');
  };

  const totalCost = entries.reduce((s, e) => s + e.amount, 0);
  const currentYear = 2026;
  const age = Math.max(1, currentYear - installYear);
  const costPerYear = Math.round(totalCost / age);

  const replacementCost = 8500;
  const annualSavings = 600;
  const breakEvenYrs = replacementCost > 0 ? Math.ceil(replacementCost / annualSavings) : 0;
  const replacementPencilsOut = costPerYear > annualSavings * 1.5 || age >= 12;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '32px 24px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8 }}>💰 DFW HVAC TOOLS</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>HVAC Cost Tracker</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          Log every dollar your DFW HVAC system has cost — installation, maintenance, repairs, and energy — to find your true ownership cost.
        </p>

        <div style={{ background: '#111c35', borderRadius: 12, padding: 18, marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>🗓️ System Install Year: <span style={{ color: '#F5E642', fontWeight: 700 }}>{installYear}</span></div>
          <input type="range" min={1995} max={2026} value={installYear} onChange={e => setInstallYear(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#F5E642′ }} />
        </div>

        <div style={{ background: '#111c35', borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>➕ Add Expense</div>
          <div style={{ display: 'grid', gap: 10 }}>
            <select value={label} onChange={e => setLabel(e.target.value)}
              style={{ background: '#1e2d4a', border: '1px solid #2d3f5f', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14 }}>
              {CATEGORY_GROUPS.map(g => (
                <optgroup key={g.group} label={`${g.icon} ${g.group}`}>
                  {g.items.map(item => <option key={item} value={item}>{item}</option>)}
                </optgroup>
              ))}
            </select>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="$ Amount"
                style={{ background: '#1e2d4a', border: '1px solid #2d3f5f', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14 }} />
              <select value={yr} onChange={e => setYr(Number(e.target.value))}
                style={{ background: '#1e2d4a', border: '1px solid #2d3f5f', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14 }}>
                {Array.from({length:32},(_,i)=>1995+i).map(y=><option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <button onClick={addEntry} style={{ background: '#F5E642', color: '#0A1628', padding: '12px', borderRadius: 8, fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer' }}>
              + Add Expense
            </button>
          </div>
        </div>

        {entries.length > 0 && (
          <div style={{ background: '#111c35', borderRadius: 12, padding: 18, marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📊 Logged Expenses</div>
            {entries.map((e, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #1e2d4a' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{e.label}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{e.year}</div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>${e.amount.toLocaleString()}</div>
                  <button onClick={() => setEntries(entries.filter((_, j) => j !== i))} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 16 }}>✕</button>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 16, marginTop: 12 }}>
              <span>Total</span><span style={{ color: '#F5E642′ }}>${totalCost.toLocaleString()}</span>
            </div>
          </div>
        )}

        {entries.length > 0 && (
          <button onClick={() => setShowResults(true)} style={{ width: '100%', background: '#F5E642', color: '#0A1628', padding: '14px', borderRadius: 10, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', marginBottom: 20 }}>
            Analyze Ownership Cost 📈
          </button>
        )}

        {showResults && entries.length > 0 && (
          <div style={{ background: '#111c35', borderRadius: 16, padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              {[
                { label: '💵 Total Spent', val: `$${totalCost.toLocaleString()}` },
                { label: '📅 System Age', val: `${age} years` },
                { label: '📆 Cost Per Year', val: `$${costPerYear.toLocaleString()}/yr` },
                { label: '⚖️ Replace at 6yr?', val: `$${Math.round(replacementCost / 6).toLocaleString()}/yr` },
              ].map(({ label, val }) => (
                <div key={label} style={{ background: '#1e2d4a', borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#F5E642′ }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ background: replacementPencilsOut ? '#1a0a0a' : '#0a1a0a', border: `1px solid ${replacementPencilsOut ? '#ef444433' : '#22c55e33'}`, borderRadius: 10, padding: 14 }}>
              <div style={{ fontWeight: 700, marginBottom: 4, color: replacementPencilsOut ? '#ef4444′ : '#22c55e' }}>
                {replacementPencilsOut ? '🔄 Replacement Pencils Out' : '✅ Keep Running — Not Yet'}
              </div>
              <div style={{ fontSize: 14 }}>
                {replacementPencilsOut
                  ? `At $${costPerYear.toLocaleString()}/yr in maintenance and repairs, a new system ($8,500 est.) pays back in ~${breakEvenYrs} years with lower energy costs and no repair surprises.`
                  : `Your cost per year is reasonable for a ${age}-year-old DFW system. Continue regular maintenance and reassess when costs exceed $1,500/yr.`}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
