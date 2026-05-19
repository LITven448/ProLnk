import { useState } from 'react';

const safetyItems = [
  { key: 'smoke', label: 'Smoke Detectors', cost: 150, priority: 1, note: 'One per floor + bedroom. Required by TX code.' },
  { key: 'co', label: 'CO Detectors', cost: 120, priority: 2, note: 'Required near sleeping areas in DFW.' },
  { key: 'extinguisher', label: 'Fire Extinguishers', cost: 80, priority: 3, note: 'Kitchen + garage minimum.' },
  { key: 'gfci', label: 'GFCI Outlets', cost: 350, priority: 4, note: 'Kitchen, baths, garage, exterior — code required.' },
  { key: 'firstaid', label: 'First Aid Kit', cost: 60, priority: 5, note: 'Stocked kit, check annually.' },
  { key: 'pool', label: 'Pool Fence (if applicable)', cost: 3200, priority: 6, note: 'Texas law requires 4ft fence with self-latching gate.' },
  { key: 'locks', label: 'Security Door Locks', cost: 250, priority: 7, note: 'Deadbolts on all exterior doors.' },
  { key: 'flashlights', label: 'Emergency Lighting', cost: 90, priority: 8, note: 'Power outage prep — DFW ice storms.' },
];

const features = ['Has Pool', 'Has Garage', 'Has Gas Appliances', 'Older Home (pre-1990)', 'Has Children Under 12'];

export default function DFWHomeSafetyBudget() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setSelected(prev => ({ ...prev, [key]: !prev[key] }));

  const recommended = safetyItems.filter(item => {
    if (item.key === 'pool') return selected['Has Pool'];
    if (item.key === 'gfci') return selected['Older Home (pre-1990)'] || true;
    if (item.key === 'locks') return selected['Has Children Under 12'] || selected['Has Garage'] || true;
    return true;
  });

  const total = recommended.reduce((sum, i) => sum + i.cost, 0);
  const hasFeatures = Object.values(selected).some(Boolean);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ color: '#1d4ed8', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK DFW</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Home Safety Budget Guide</h1>
        <p style={{ color: '#475569', marginBottom: 32 }}>DFW homeowners: know exactly what safety improvements to budget for and in what order.</p>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#0f172a' }}>Your home features</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {features.map(f => (
              <button key={f} onClick={() => toggle(f)} style={{ background: selected[f] ? '#1d4ed8′ : '#f1f5f9', color: selected[f] ? '#fff' : '#334155', border: ’none', borderRadius: 6, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{f}</button>
            ))}
          </div>
        </div>

        {hasFeatures && (
          <div style={{ background: '#eff6ff', borderRadius: 10, padding: '1rem 1.5rem', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, color: '#1d4ed8′ }}>Recommended Safety Budget</div>
              <div style={{ color: '#475569', fontSize: 13 }}>{recommended.length} items · prioritized for your home</div>
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#1d4ed8′ }}>${total.toLocaleString()}</div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {recommended.sort((a, b) => a.priority - b.priority).map((item, i) => (
            <div key={item.key} style={{ background: '#fff', borderRadius: 10, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', borderLeft: '4px solid #1d4ed8′ }}>
              <div style={{ background: '#eff6ff', color: '#1d4ed8', fontWeight: 800, fontSize: 13, width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>#{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{item.label}</div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{item.note}</div>
              </div>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: 16 }}>${item.cost.toLocaleString()}</div>
            </div>
          ))}
        </div>

        {!hasFeatures && (
          <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: 40 }}>Select your home features above to see your personalized safety budget</div>
        )}

        <div style={{ marginTop: 24, background: '#fef9c3', borderRadius: 10, padding: '1rem', color: '#713f12', fontSize: 13 }}>
          🏡 <strong>ProLnk tip:</strong> Safety improvements are non-negotiable. Get verified DFW contractors for any electrical or structural safety work through ProLnk.
        </div>
      </div>
    </div>
  );
}
