import { useState } from 'react';

const upgrades = [
  {
    name: 'Smart Thermostat',
    emoji: '🌡️',
    cost: '$150–$300',
    roi: 'High',
    roiPct: 'Saves 10–15% on energy bills',
    tags: ['energy savings', 'resale value', 'convenience'],
  },
  {
    name: 'Video Doorbell',
    emoji: '📹',
    cost: '$100–$250',
    roi: 'High',
    roiPct: 'Top buyer request in DFW listings',
    tags: ['security', 'resale value'],
  },
  {
    name: 'Smart Locks',
    emoji: '🔒',
    cost: '$150–$400',
    roi: 'Medium',
    roiPct: 'Eliminates lockouts, keyless entry',
    tags: ['security', 'convenience'],
  },
  {
    name: 'Leak Sensors',
    emoji: '💧',
    cost: '$50–$150',
    roi: 'Very High',
    roiPct: 'Avg water claim in TX is $11,000',
    tags: ['security', 'energy savings'],
  },
  {
    name: 'Smart Lighting',
    emoji: '💡',
    cost: '$200–$600',
    roi: 'Medium',
    roiPct: 'Reduces lighting energy 25–40%',
    tags: ['energy savings', 'convenience', 'resale value'],
  },
];

const goals = ['security', 'energy savings', 'convenience', 'resale value'];

export default function SmartHomeGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleGoal = (g: string) => {
    setSelected(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
    setShowResults(false);
  };

  const scored = [...upgrades]
    .map(u => ({
      ...u,
      score: selected.length === 0 ? 0 : u.tags.filter(t => selected.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW SMART HOME GUIDE</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.15 }}>Top 5 Smart Home Upgrades That Add Real Value</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, margin: 0 }}>DFW homeowners are increasing property values and cutting costs with these proven upgrades.</p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#F5E642' }}>📊 Upgrade Overview & ROI</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #1e3a5f' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94a3b8', fontWeight: 600 }}>Upgrade</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94a3b8', fontWeight: 600 }}>Avg Install Cost</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94a3b8', fontWeight: 600 }}>ROI</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#94a3b8', fontWeight: 600 }}>Key Benefit</th>
                </tr>
              </thead>
              <tbody>
                {upgrades.map((u, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1e3a5f' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600 }}>{u.emoji} {u.name}</td>
                    <td style={{ padding: '14px 16px', color: '#F5E642' }}>{u.cost}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ background: u.roi === 'Very High' ? '#16a34a22' : u.roi === 'High' ? '#1d4ed822' : '#f59e0b22', color: u.roi === 'Very High' ? '#4ade80' : u.roi === 'High' ? '#60a5fa' : '#fbbf24', padding: '2px 10px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>{u.roi}</span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: 14 }}>{u.roiPct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: 56, background: '#112240', borderRadius: 16, padding: '32px 28px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>🎯 Priority Picker</h2>
          <p style={{ color: '#94a3b8', marginBottom: 28 }}>Select your goals and we'll rank the upgrades that match best.</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
            {goals.map(g => (
              <button
                key={g}
                onClick={() => toggleGoal(g)}
                style={{
                  padding: '10px 22px', borderRadius: 30, border: '2px solid',
                  borderColor: selected.includes(g) ? '#F5E642' : '#1e3a5f',
                  background: selected.includes(g) ? '#F5E64220' : 'transparent',
                  color: selected.includes(g) ? '#F5E642' : '#94a3b8',
                  cursor: 'pointer', fontWeight: 600, fontSize: 15, textTransform: 'capitalize', transition: 'all 0.2s',
                }}
              >{g}</button>
            ))}
          </div>

          <button
            onClick={() => setShowResults(true)}
            disabled={selected.length === 0}
            style={{
              background: selected.length > 0 ? '#F5E642' : '#1e3a5f', color: selected.length > 0 ? '#0A1628' : '#4a6080',
              border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
            }}
          >Show My Ranked Upgrades</button>

          {showResults && (
            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Your Ranked Upgrades</h3>
              {scored.map((u, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#0A1628', borderRadius: 12, padding: '16px 20px', marginBottom: 12, border: i === 0 ? '2px solid #F5E642' : '2px solid #1e3a5f' }}>
                  <div style={{ fontSize: 28, width: 40, textAlign: 'center' }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '  '}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{u.emoji} {u.name}</div>
                    <div style={{ color: '#94a3b8', fontSize: 14, marginTop: 4 }}>{u.roiPct}</div>
                  </div>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{u.cost}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: 48, background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 16, padding: '28px 24px' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>🏠 Ready to Install?</h3>
          <p style={{ color: '#94a3b8', margin: 0 }}>ProLnk connects you with vetted DFW smart home installers. Get matched with 3 pros in minutes — no commitment required.</p>
        </div>
      </div>
    </div>
  );
}
