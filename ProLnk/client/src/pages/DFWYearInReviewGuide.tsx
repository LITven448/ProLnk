import { useState } from 'react';

const currentYear = new Date().getFullYear();

export default function DFWYearInReviewGuide() {
  const [form, setForm] = useState({ purchasePrice: '', currentValue: '', mortgage: '', maintenanceSpent: '', improvementsSpent: '', insurance: '', goals: '' });
  const [result, setResult] = useState<null | { equity: number; roi: number; netSpend: number }>(null);

  const calculate = () => {
    const equity = Number(form.currentValue) - Number(form.mortgage);
    const invested = Number(form.purchasePrice);
    const roi = invested > 0 ? Math.round(((Number(form.currentValue) - invested) / invested) * 100) : 0;
    const netSpend = Number(form.maintenanceSpent) + Number(form.improvementsSpent);
    setResult({ equity, roi, netSpend });
  };

  const field = (label: string, key: keyof typeof form, prefix = '', placeholder = '0') => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', color: '#475569', fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
        {prefix && <span style={{ padding: '0 12px', color: '#64748b', fontWeight: 700 }}>{prefix}</span>}
        <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder}
          style={{ flex: 1, padding: '12px', border: 'none', background: 'transparent', fontSize: 16, outline: 'none', color: '#1e293b' }} />
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1e293b', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>📅</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1e293b', margin: '12px 0 8px' }}>DFW Year in Review Guide</h1>
          <p style={{ color: '#64748b', fontSize: 16 }}>Your annual homeowner financial + condition review for {currentYear}</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.07)', marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: '#0A1628' }}>🏡 Your Home Stats</h2>
          {field('Original Purchase Price', 'purchasePrice', '$')}
          {field('Current Estimated Value', 'currentValue', '$')}
          {field('Remaining Mortgage Balance', 'mortgage', '$')}
          {field('Maintenance Spent This Year', 'maintenanceSpent', '$')}
          {field('Improvements Made This Year', 'improvementsSpent', '$')}
          <button onClick={calculate} style={{ width: '100%', padding: '14px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 17, cursor: 'pointer', marginTop: 8 }}>
            Generate My Year in Review →
          </button>
        </div>
        {result && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
              {[
                { label: 'Current Equity', value: `$${result.equity.toLocaleString()}`, icon: '💎' },
                { label: 'Total ROI', value: `${result.roi}%`, icon: '📈' },
                { label: 'Home Spend', value: `$${result.netSpend.toLocaleString()}`, icon: '🔧' },
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', borderRadius: 16, padding: '20px 16px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '2px solid #F5E642' }}>
                  <div style={{ fontSize: 28 }}>{s.icon}</div>
                  <div style={{ fontWeight: 900, fontSize: 22, color: '#0A1628', margin: '6px 0 4px' }}>{s.value}</div>
                  <div style={{ color: '#64748b', fontSize: 13 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, color: '#0A1628' }}>🎯 Goals for {currentYear + 1}</h3>
              {['Complete deferred maintenance', 'Review and update homeowner insurance', 'Add your home to ProLnk Home Health Vault', 'Build contractor relationships via ProLnk', 'Increase equity through targeted improvements'].map((g, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #f1f5f9', color: '#475569', fontSize: 15 }}>
                  <span style={{ color: '#F5E642', fontSize: 18 }}>→</span> {g}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
