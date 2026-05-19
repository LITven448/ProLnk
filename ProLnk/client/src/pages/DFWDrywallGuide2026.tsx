import { useState } from 'react';

const issues = [
  { id: 'nailPop', label: '📌 Nail Pops', recs: ['Nail pops are extremely common in DFW — clay soil movement shifts studs seasonally', 'Drive a drywall screw 2″ above and below the popped nail to re-secure', 'Knock the nail back in flush (do not remove) then apply the new screws', 'Fill with lightweight spackle, feather 3-4 inches wide', 'Prime before painting — bare spackle flashes through latex paint', 'If pops recur in same spot each year, that stud is moving with soil moisture cycles'] },
  { id: 'cornerBead', label: '🔲 Corner Bead Damage', recs: ['Metal corner bead dents from impacts — most common in hallways and tight spaces', 'Replace metal bead with flexible vinyl corner bead — far more durable', 'Cut out 6-12 inches of damaged section with oscillating tool', 'Tape vinyl bead in place before applying compound', 'Three coats of compound, feathering 8-10 inches on each side', 'DFW homes with kids: consider plastic corner guards on vulnerable corners'] },
  { id: 'waterStain', label: '💧 Water Stains', recs: ['Never paint over a water stain without fixing the source first', 'Check roof, window flashing, and AC drain pan — all common DFW sources', 'Let the area dry completely — use moisture meter, target below 12% MC', 'Apply shellac-based stain blocker (Zinsser BIN) — latex primer will not block stains', 'Texture to match existing wall surface before final paint coat', 'If stain keeps returning: source is still active — do not repaint until resolved'] },
  { id: 'texture', label: '🎨 Texture Matching', recs: ['Skip trowel and orange peel are the two dominant textures in DFW residential', 'Skip trowel: apply joint compound with trowel, skip across surface, knock high spots', 'Orange peel: spray hopper or aerosol can — practice on cardboard first', 'Knockdown texture: hopper spray then flatten peaks with trowel before fully dry', 'Lighting is critical — check match with raking light before painting', 'Hire a pro for large patches in living areas — texture matching takes experience'] },
];

export default function DFWDrywallGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = issues.find(i => i.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>🧱 DFW Drywall Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          DFW drywall takes a beating from clay soil movement, extreme temperature swings, and high spring humidity. Nail pops are nearly universal in North Texas homes older than 10 years. Most repairs are DIY-friendly — texture matching is the hardest skill to master.
        </p>

        <div style={{ background: '#111d30', borderRadius: 10, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🏗️ Common DFW Drywall Textures</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {[
              { name: 'Skip Trowel', desc: 'Most common in DFW. Hand-applied, organic randomness. Hardest to match.' },
              { name: 'Orange Peel', desc: 'Second most common. Spray-applied. Consistent small bumps. Easier to match.' },
              { name: 'Knockdown', desc: 'Flattened spray texture. Common in 1990s-2000s DFW builds.' },
            ].map(t => (
              <div key={t.name} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 13 }}>{t.name}</div>
                <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🔍 Select Your Drywall Issue</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {issues.map(i => (
            <button key={i.id} onClick={() => setSelected(i.id === selected ? null : i.id)}
              style={{ background: selected === i.id ? '#F5E642′ : '#111d30', color: selected === i.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '14px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
              {i.label}
            </button>
          ))}
        </div>

        {current && (
          <div style={{ background: '#111d30', borderRadius: 10, padding: 20, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 14 }}>Repair Guide: {current.label}</h3>
            {current.recs.map((r, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 7px', fontWeight: 700, fontSize: 12, minWidth: 22, textAlign: 'center' }}>{idx + 1}</span>
                <span style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.5 }}>{r}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#111d30', borderRadius: 10, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🛠️ DIY vs Pro Decision Guide</div>
          {[
            { task: 'Nail pops (1-5 pops)', rec: 'DIY — 30 min max', diy: true },
            { task: 'Small holes under 6″', rec: 'DIY with patch kit', diy: true },
            { task: 'Texture matching in main living areas', rec: 'Hire a pro', diy: false },
            { task: 'Water damage repair', rec: 'Fix source first, then hire', diy: false },
            { task: 'Corner bead replacement', rec: 'DIY if comfortable with mud', diy: true },
          ].map(r => (
            <div key={r.task} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14, alignItems: 'center' }}>
              <span style={{ color: '#94a3b8′ }}>{r.task}</span>
              <span style={{ color: r.diy ? '#4ade80′ : '#f59e0b', fontWeight: 700, fontSize: 13 }}>{r.rec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
