import { useState } from 'react';

const improvements = [
  { name: 'HVAC System Replacement', cost: 8000, roi: 85, return: 6800, icon: '❄️' },
  { name: 'Foundation Documentation', cost: 2000, roi: 1500, return: 30000, icon: '🏗️' },
  { name: 'Kitchen Refresh', cost: 5000, roi: 140, return: 12000, icon: '🍳' },
  { name: 'Curb Appeal (Landscaping)', cost: 3000, roi: 72, return: 4600, icon: '🌿' },
  { name: 'Bathroom Remodel', cost: 7000, roi: 65, return: 10500, icon: '🚿' },
  { name: 'Fresh Interior Paint', cost: 2500, roi: 107, return: 5000, icon: '🎨' },
  { name: 'New Roof', cost: 12000, roi: 60, return: 7200, icon: '🏠' },
  { name: 'Smart Home Tech', cost: 1500, roi: 55, return: 2300, icon: '📱' },
  { name: 'Hardwood Floors', cost: 6000, roi: 70, return: 8400, icon: '🪵' },
  { name: 'Energy-Efficient Windows', cost: 8000, roi: 48, return: 3840, icon: '🪟' },
];

export default function DFWHomeValueBoostGuide2026() {
  const [budget, setBudget] = useState(10000);

  const affordable = improvements
    .filter(i => i.cost <= budget)
    .sort((a, b) => b.roi - a.roi);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW REAL ESTATE · 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>💰 DFW Home Value Boost Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          Not all improvements pay off equally in DFW. Foundation documentation alone can recover $30K in perceived discount.
          HVAC systems return 85 cents on every dollar. Use your budget wisely.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🛠️ Budget → Priority Ranker</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 8 }}>
              Your Budget: <strong style={{ color: '#F5E642′ }}>${budget.toLocaleString()}</strong>
            </label>
            <input
              type="range" min={1000} max={30000} step={500} value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5E642′ }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', marginTop: 4 }}>
              <span>$1K</span><span>$30K</span>
            </div>
          </div>
          {affordable.length === 0 ? (
            <div style={{ color: '#94a3b8', textAlign: 'center', padding: 20 }}>Increase budget to see recommendations</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {affordable.map((item, i) => (
                <div key={item.name} style={{ background: '#1a3a5c', borderRadius: 10, padding: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ fontSize: 28, minWidth: 36, textAlign: 'center' }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{item.name}</span>
                      <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 13 }}>#{i + 1} Priority</span>
                    </div>
                    <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#94a3b8′ }}>
                      <span>Cost: ${item.cost.toLocaleString()}</span>
                      <span style={{ color: '#22c55e' }}>ROI: {item.roi}%</span>
                      <span>Return: +${item.return.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>🏠 See Your Home's Current Value First</div>
          <div style={{ color: '#1a3a5c', fontSize: 13, marginTop: 6 }}>ProLnk gives you a free DFW baseline before you spend a dollar</div>
        </div>
      </div>
    </div>
  );
}