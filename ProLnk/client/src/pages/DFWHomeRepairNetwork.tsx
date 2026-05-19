import { useState } from 'react';

const TRADES = [
  { name: 'HVAC Technician', reason: 'DFW summers hit 110°F — a broken AC is an emergency', emoji: '❄️' },
  { name: 'Licensed Plumber', reason: 'Hard water and aging pipes make plumbing failures common', emoji: '🔧' },
  { name: 'Master Electrician', reason: 'Panel upgrades and EV chargers require vetted pros', emoji: '⚡' },
  { name: 'Roofing Contractor', reason: 'Hail season can damage a roof overnight', emoji: '🏠' },
  { name: 'Foundation Specialist', reason: 'DFW clay soil causes foundation movement year-round', emoji: '🏗️' },
];

const PRIORITIES = {
  old: ['Foundation Specialist', 'Roofing Contractor', 'Licensed Plumber'],
  pool: ['HVAC Technician', 'Licensed Plumber'],
  new: ['HVAC Technician', 'Master Electrician'],
  default: ['HVAC Technician', 'Licensed Plumber', 'Roofer'],
};

export default function DFWHomeRepairNetwork() {
  const [age, setAge] = useState('');
  const [hasPool, setHasPool] = useState(false);
  const [priorities, setPriorities] = useState<string[]>([]);

  function calcPriorities() {
    if (!age) return;
    const yr = parseInt(age);
    let key = 'default';
    if (yr > 30) key = 'old';
    else if (hasPool) key = 'pool';
    else if (yr < 10) key = 'new';
    setPriorities(PRIORITIES[key as keyof typeof PRIORITIES]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px' }}>Build Your DFW Home Repair Network <span style={{ color: '#F5E642′ }}>Before You Need It</span></h1>
        <p style={{ color: '#8FA3BF', fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>In the Dallas-Fort Worth metro, home emergencies don't wait for convenient timing. The homeowners who recover fastest already know who to call. Here’s how to build that network now.</p>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginTop: 0, marginBottom: 24 }}>🏡 The 5 Contractor Relationships Every DFW Homeowner Needs</h2>
          {TRADES.map(t => (
            <div key={t.name} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px 0', borderBottom: '1px solid #1E2F4A' }}>
              <span style={{ fontSize: 28 }}>{t.emoji}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{t.name}</div>
                <div style={{ color: '#8FA3BF', fontSize: 14 }}>{t.reason}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 20 }}>🔍 Which Relationships Should <em>You</em> Build First?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 14, color: '#8FA3BF', display: 'block', marginBottom: 6 }}>Home age (years)</label>
              <input type="number" placeholder="e.g. 18″ value={age} onChange={e => setAge(e.target.value)} style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', padding: '10px 14px', fontSize: 15, width: '100%' }} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 15 }}>
              <input type="checkbox" checked={hasPool} onChange={e => setHasPool(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#F5E642′ }} />
              My home has a pool or spa
            </label>
          </div>
          <button onClick={calcPriorities} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', width: '100%' }}>Show My Priority Contractors</button>
          {priorities.length > 0 && (
            <div style={{ marginTop: 20, padding: 20, background: '#0A1628', borderRadius: 10, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>Build these relationships first:</div>
              {priorities.map(p => <div key={p} style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>✓ {p}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 32, color: '#0A1628′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginTop: 0, marginBottom: 12 }}>🔗 How ProLnk Builds This Network For You</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 0 }}>ProLnk pre-vets every contractor for license, insurance, and DFW market experience. When you join, you get instant access to your personalized contractor network — no cold calls, no guesswork. Your Home Health Vault also documents every job so your next contractor knows exactly what's been done.</p>
        </div>
      </div>
    </div>
  );
}
