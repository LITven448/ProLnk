import { useState } from 'react';

const DFW_AVERAGES: Record<string, { avg: number; label: string }> = {
  hvac: { avg: 1200, label: 'HVAC' },
  plumbing: { avg: 650, label: 'Plumbing' },
  electrical: { avg: 480, label: 'Electrical' },
  roofing: { avg: 900, label: 'Roofing' },
  foundation: { avg: 1800, label: 'Foundation' },
  landscaping: { avg: 720, label: 'Landscaping' },
};

const HOME_AGE_MULTIPLIERS: Record<string, number> = {
  '0-10': 0.6,
  '11-20': 0.85,
  '21-30': 1.0,
  '31-40': 1.3,
  '40+': 1.6,
};

export default function DFWRepairCostTracker() {
  const [costs, setCosts] = useState<Record<string, string>>({
    hvac: '', plumbing: '', electrical: '', roofing: '', foundation: '', landscaping: '',
  });
  const [homeAge, setHomeAge] = useState('21-30');
  const [submitted, setSubmitted] = useState(false);

  const multiplier = HOME_AGE_MULTIPLIERS[homeAge];
  const totalSpent = Object.values(costs).reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
  const totalDFWAvg = Object.values(DFW_AVERAGES).reduce((sum, c) => sum + c.avg * multiplier, 0);

  const handleChange = (key: string, value: string) => {
    setCosts(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔧</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Repair Cost Tracker</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Track your home repair spending vs DFW medians by category</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 8 }}>Home Age</label>
          <select
            value={homeAge}
            onChange={e => setHomeAge(e.target.value)}
            style={{ background: '#1a2f4e', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 15 }}
          >
            {Object.keys(HOME_AGE_MULTIPLIERS).map(k => (
              <option key={k} value={k}>{k} years</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {Object.entries(DFW_AVERAGES).map(([key, meta]) => {
            const dfwMedian = Math.round(meta.avg * multiplier);
            const spent = parseFloat(costs[key]) || 0;
            const delta = spent - dfwMedian;
            return (
              <div key={key} style={{ background: '#0F2040', borderRadius: 10, padding: 16 }}>
                <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>{meta.label}</div>
                <input
                  type="number"
                  placeholder="Your cost $"
                  value={costs[key]}
                  onChange={e => handleChange(key, e.target.value)}
                  style={{ background: '#1a2f4e', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '8px 10px', width: '100%', fontSize: 15, boxSizing: 'border-box' }}
                />
                <div style={{ marginTop: 8, fontSize: 13, color: '#94a3b8' }}>DFW median: <span style={{ color: '#F5E642' }}>${dfwMedian.toLocaleString()}</span></div>
                {submitted && spent > 0 && (
                  <div style={{ marginTop: 4, fontSize: 13, color: delta > 0 ? '#f87171' : '#34d399', fontWeight: 600 }}>
                    {delta > 0 ? `⬆ $${Math.abs(delta).toLocaleString()} over` : `⬇ $${Math.abs(delta).toLocaleString()} under`}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setSubmitted(true)}
          style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 10, padding: '14px 32px', width: '100%', cursor: 'pointer', marginBottom: 24 }}
        >
          Calculate vs DFW Averages
        </button>

        {submitted && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 16px' }}>📊 Your Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>Total You Spent</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>${totalSpent.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>DFW Average ({homeAge} yr home)</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#F5E642' }}>${Math.round(totalDFWAvg).toLocaleString()}</div>
              </div>
            </div>
            <div style={{ marginTop: 16, padding: 12, background: totalSpent > totalDFWAvg ? '#2d1515' : '#0d2d1a', borderRadius: 8 }}>
              <span style={{ fontWeight: 700, color: totalSpent > totalDFWAvg ? '#f87171' : '#34d399' }}>
                {totalSpent > totalDFWAvg
                  ? `⚠️ You're spending $${Math.round(totalSpent - totalDFWAvg).toLocaleString()} above DFW average`
                  : `✅ You're $${Math.round(totalDFWAvg - totalSpent).toLocaleString()} under DFW average`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
