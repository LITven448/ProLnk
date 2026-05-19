import { useState } from 'react';

export default function DFWACUpgradeGuide2026() {
  const [sysAge, setSysAge] = useState(10);
  const [refrigerant, setRefrigerant] = useState('r410a');
  const [repairCost, setRepairCost] = useState(1200);
  const [seer, setSeer] = useState(13);

  const shouldUpgrade = sysAge >= 10 || refrigerant === 'r22' || repairCost >= 1500 || seer < 14;
  const urgency = refrigerant === 'r22' ? 'Urgent' : sysAge >= 15 ? 'High' : repairCost >= 1500 ? 'High' : 'Recommended';
  const urgencyColor = urgency === 'Urgent' ? '#7f1d1d' : urgency === 'High' ? '#92400e' : '#1e3a5f';

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 8 }}>⬆️ ProLnk DFW AC Guide 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW AC Upgrade Path Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Know when to upgrade — DFW summers punish aging, inefficient systems.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '📅', title: 'Age Trigger: 10+ Years', desc: 'DFW heat degrades compressors faster than cooler climates — 10yr is the planning threshold' },
            { icon: '🧪', title: 'R-22 Refrigerant', desc: 'R-22 is banned — DFW recharge costs $800+ per pound. Upgrade is almost always cheaper' },
            { icon: '💸', title: '$1,500+ Repair Rule', desc: 'If repair exceeds 50% of replacement cost, new system delivers better ROI in DFW climate' },
            { icon: '⚡', title: 'SEER2 for DFW', desc: 'SEER2 18+ qualifies for TX utility rebates — variable speed handles DFW humidity far better' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔄 Upgrade Decision Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6 }}>System Age: {sysAge} years</label>
              <input type="range" min={1} max={25} value={sysAge} onChange={e => setSysAge(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6 }}>Current SEER: {seer}</label>
              <input type="range" min={8} max={22} value={seer} onChange={e => setSeer(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Refrigerant Type</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[{id: 'r22', label: 'R-22 (Old)'}, {id: 'r410a', label: 'R-410A'}, {id: 'r454b', label: 'R-454B (New)'}].map(r => (
                <button key={r.id} onClick={() => setRefrigerant(r.id)}
                  style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600,
                    backgroundColor: refrigerant === r.id ? '#F5E642' : '#0A1628', color: refrigerant === r.id ? '#0A1628' : '#fff' }}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6 }}>Quoted Repair Cost: ${repairCost.toLocaleString()}</label>
            <input type="range" min={0} max={5000} step={100} value={repairCost} onChange={e => setRepairCost(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5E642' }} />
          </div>
          <div style={{ backgroundColor: urgencyColor, borderRadius: 8, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{shouldUpgrade ? '🔄' : '✅'}</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{shouldUpgrade ? `${urgency} — Plan Upgrade` : 'No Upgrade Needed Yet'}</div>
            <div style={{ color: '#e2e8f0', fontSize: 14, marginTop: 4 }}>{shouldUpgrade ? 'Multiple factors indicate upgrade is cost-effective' : 'Current system appears serviceable'}</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Get DFW AC Replacement Quotes</div>
          <div style={{ color: '#0A1628', marginBottom: 16 }}>Compare quotes from vetted DFW HVAC contractors — financing available for qualified systems</div>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>
            Compare Replacement Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
