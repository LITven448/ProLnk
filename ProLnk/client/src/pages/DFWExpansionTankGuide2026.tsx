import { useState } from 'react';

const situations = ['Have PRV, no expansion tank', 'Have PRV, have expansion tank', 'No PRV', 'Not sure'];
const guides: Record<string, string> = {
  'Have PRV, no expansion tank': '🔴 Action required. You have a closed system. Every time your water heater fires, pressure spikes. Code requires expansion tank. Cost: $150–250 installed. Also check pressure relief valve — it may already be dripping.'  ,
  'Have PRV, have expansion tank': '✅ You’re properly configured. Check expansion tank every 2–3 years — pre-charge pressure should match home static pressure. Bladder failure = waterlogged tank.'  ,
  'No PRV': '⚠️ Open system. Pressure fluctuates with city main. No expansion tank needed, but check if pressure exceeds 80 PSI — PRV install recommended.'  ,
  'Not sure': '💡 Look for a bell-shaped brass fitting on incoming water line near shutoff. If present, assume closed system. Call plumber to verify and install expansion tank if missing.'  ,
};

export default function DFWExpansionTankGuide2026() {
  const [situation, setSituation] = useState<string>('Not sure');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>🏺 DFW Expansion Tank Guide 2026</div>
        <div style={{ color: '#8899AA', marginBottom: '2rem' }}>Pressure spikes that quietly destroy your water heater.</div>

        <div style={{ background: '#111E35', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🔥 Why DFW Homes With PRVs Need Expansion Tanks</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { icon: '🚰', title: 'Closed System Problem', desc: 'PRV creates a closed system. Water heater expands heated water 2% — nowhere to go, pressure spikes to 150+ PSI.' },
              { icon: '💥', title: 'What Gets Damaged', desc: 'Pressure relief valve starts dripping, water heater fails early, supply lines burst. All preventable.' },
              { icon: '📋', title: 'Texas Plumbing Code Requires It', desc: 'If you have a PRV, expansion tank is required. Many older DFW homes were grandfathered but should upgrade.' },
              { icon: '💰', title: 'Cost: $150–250 Installed', desc: 'Cheap insurance vs. $1,200–2,500 water heater replacement or water damage from blown relief valve.' },
              { icon: '🔴', title: 'Signs of Failure', desc: 'Pressure relief valve dripping or leaking = tank bladder failed. Tap tank — hollow sound = good, solid/heavy = waterlogged.' },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div><div style={{ fontWeight: 600 }}>{item.title}</div><div style={{ color: '#8899AA', fontSize: '0.9rem' }}>{item.desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🔍 Home Situation → Expansion Tank Guide</div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#8899AA', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Your Situation</div>
            <select value={situation} onChange={(e) => setSituation(e.target.value)} style={{ background: '#0A1628', border: '1px solid #2A3A55', borderRadius: '8px', padding: '0.5rem 1rem', color: '#E8EDF5′ }}>
              {situations.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #F5E642', color: '#E8EDF5′ }}>{guides[situation]}</div>
        </div>
      </div>
    </div>
  );
}
