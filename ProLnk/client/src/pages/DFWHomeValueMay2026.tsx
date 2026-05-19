import { useState } from 'react';

const upgrades = [
  { name: 'Kitchen Remodel', roi: 72, cost: 25000, value: 18000, icon: '🍳' },
  { name: 'HVAC Upgrade', roi: 85, cost: 8500, value: 7225, icon: '❄️' },
  { name: 'Foundation Repair', roi: 90, cost: 12000, value: 10800, icon: '🏠' },
  { name: 'Bathroom Remodel', roi: 65, cost: 15000, value: 9750, icon: '🚿' },
  { name: 'Roof Replacement', roi: 68, cost: 18000, value: 12240, icon: '🏗️' },
  { name: 'Garage Door', roi: 93, cost: 4000, value: 3720, icon: '🚗' },
];

export default function DFWHomeValueMay2026() {
  const [budget, setBudget] = useState(20000);
  const [selected, setSelected] = useState<string[]>([]);

  const affordable = upgrades.filter(u => u.cost <= budget);
  const totalROI = selected.length
    ? Math.round(selected.reduce((acc, n) => {
        const u = upgrades.find(x => x.name === n);
        return acc + (u ? u.roi : 0);
      }, 0) / selected.length)
    : 0;

  const toggle = (name: string) =>
    setSelected(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>PROLNK — DFW MARKET REPORT</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>DFW Home Value — May 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          DFW median home price: <span style={{ color: '#F5E642', fontWeight: 700 }}>$385,000</span> — up <span style={{ color: '#4ade80', fontWeight: 700 }}>4% YoY</span>. Smart upgrades protect and grow your equity.
        </p>

        <div style={{ background: '#111c35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 16 }}>🎯 Your Upgrade Budget</div>
          <input
            type="range" min={2000} max={50000} step={500} value={budget}
            onChange={e => setBudget(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#F5E642', marginBottom: 8 }}
          />
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>${budget.toLocaleString()}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {upgrades.map(u => {
            const canAfford = u.cost <= budget;
            const isSelected = selected.includes(u.name);
            return (
              <div key={u.name}
                onClick={() => canAfford && toggle(u.name)}
                style={{
                  background: isSelected ? '#1a2f52′ : '#111c35',
                  border: `1px solid ${isSelected ? '#F5E642' : canAfford ? '#1e3a5f' : '#0d1f3a'}`,
                  borderRadius: 10, padding: 16, cursor: canAfford ? 'pointer' : 'not-allowed',
                  opacity: canAfford ? 1 : 0.4, transition: 'all 0.2s'
                }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{u.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{u.name}</div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Cost: ${u.cost.toLocaleString()}</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{u.roi}% ROI</div>
              </div>
            );
          })}
        </div>

        {selected.length > 0 && (
          <div style={{ background: '#0f2444', border: '1px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>📊 Your Selected Upgrades</div>
            <div style={{ color: '#94a3b8', marginBottom: 8 }}>Avg ROI across selections: <span style={{ color: '#F5E642', fontWeight: 700 }}>{totalROI}%</span></div>
            <div style={{ color: '#4ade80', fontSize: 13 }}>ProLnk can connect you with pre-vetted DFW contractors for every upgrade above.</div>
          </div>
        )}

        <div style={{ background: '#111c35', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🏆 Why DFW Upgrades Pay Off</div>
          {['DFW market favors move-in-ready homes — renovated homes sell 23 days faster', 'HVAC upgrades are #1 ask from DFW buyers due to Texas heat', 'Foundation issues are deal-breakers — repair before listing'].map(tip => (
            <div key={tip} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 6, paddingLeft: 12, borderLeft: '3px solid #F5E642′ }}>{tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
}