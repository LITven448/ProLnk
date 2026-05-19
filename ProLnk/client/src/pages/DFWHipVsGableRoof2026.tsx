import { useState } from 'react';

const roofStyles = [
  { id: 'hip', name: 'Hip Roof', icon: '🏔️', slopes: 4, tag: 'PREFERRED IN DFW', color: '#F5E642', windRating: 'Excellent', cost: 'Higher', complexity: 'High', desc: 'All four sides slope down — no vertical gable ends. Wind resistance is superior, making it the preferred choice in DFW storm alley.' },
  { id: 'gable', name: 'Gable Roof', icon: '🏠', slopes: 2, tag: null, color: '#94a3b8', windRating: 'Fair', cost: 'Lower', complexity: 'Low', desc: 'Two sloping sides meet at a ridge with vertical triangular gable ends. Simple, cost-effective, but gable ends are vulnerable to DFW winds.' },
  { id: 'dutch', name: 'Dutch Hip Roof', icon: '🏡', slopes: 4, tag: 'COMPROMISE', color: '#60a5fa', windRating: 'Good', cost: 'Moderate', complexity: 'Moderate', desc: 'Gable roof with clipped corners that form small hip sections. Better wind resistance than full gable, less expensive than full hip.' },
  { id: 'mansard', name: 'Mansard Roof', icon: '🏰', slopes: 8, tag: null, color: '#94a3b8', windRating: 'Poor', cost: 'Highest', complexity: 'Very High', desc: 'Four double-sloped sides. Rare in DFW due to poor wind performance and high maintenance cost in Texas weather conditions.' },
];

const currentRoofs = ['Hip Roof', 'Gable Roof', 'Dutch Hip', 'Mansard', 'Flat Roof', 'Not Sure'];

const implications: Record<string, string[]> = {
  'Hip Roof': ['✅ Your roof style is ideal for DFW. Continue maintaining gutters and flashing.', '✅ Lower wind uplift risk during DFW tornado/storm events.', '✅ Excellent water runoff from all four sides.', '💡 Insurance carriers often give hip roof discounts — ask your agent.'],
  'Gable Roof': ['⚠️ Gable ends are your vulnerability in DFW storms — inspect regularly.', '⚠️ Consider gable bracing if your attic bracing was built before 2010.', '💡 Braced gable ends (hurricane straps) significantly improve performance.', '💡 At replacement time, consider converting to hip for long-term wind resistance.'],
  'Dutch Hip': ['✅ Good compromise for DFW wind resistance.', '✅ Better than standard gable at handling storm uplift.', '💡 Ensure the hip corner sections have proper flashing — common leak point.'],
  'Mansard': ['🚨 Lowest wind resistance of any style — critical in DFW.', '🚨 High maintenance required; inspect after every major storm.', '💡 Consider converting to hip or gable at next major renovation.'],
  'Flat Roof': ['⚠️ Flat roofs require entirely different materials (TPO, modified bitumen).', '💡 Ensure proper drainage — DFW flash floods can overwhelm flat roof drains.'],
  'Not Sure': ['💡 A DFW roofing inspection will identify your roof style and vulnerabilities.', '💡 Photos from street level often reveal whether you have hip or gable ends.'],
};

export default function DFWHipVsGableRoof2026() {
  const [currentRoof, setCurrentRoof] = useState('');
  const [showImplications, setShowImplications] = useState(false);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🌪️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Hip vs Gable Roof Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Roof style comparison for North Texas storm alley conditions</p>
        </div>
        <div style={{ background: '#1a2744', borderRadius: 12, padding: 16, marginBottom: 24, border: '1px solid #F5E642' }}>
          <p style={{ margin: 0, color: '#F5E642', fontWeight: 600 }}>🌪️ DFW Storm Reality: The Dallas-Fort Worth metro is in one of the most active severe weather corridors in the US. Roof style directly impacts how your home survives 70–100+ mph straight-line winds and tornadic events common in North Texas.</p>
        </div>
        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {roofStyles.map(r => (
            <div key={r.id} style={{ background: '#1a2744', borderRadius: 12, padding: 20, border: `1px solid ${r.color}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 36 }}>{r.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                    <h3 style={{ margin: 0, color: '#F5E642' }}>{r.name}</h3>
                    {r.tag && <span style={{ fontSize: 11, background: r.color, color: '#0A1628', padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>{r.tag}</span>}
                  </div>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: 14 }}>{r.desc}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {[['🌪️ Wind', r.windRating], ['🔢 Slopes', String(r.slopes)], ['💰 Cost', r.cost], ['🔧 Complexity', r.complexity]].map(([label, val]) => (
                  <div key={String(label)} style={{ background: '#0A1628', padding: '8px', borderRadius: 8, textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: 10, color: '#94a3b8' }}>{label}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 12, color: val === 'Excellent' ? '#22c55e' : val === 'Poor' ? '#ef4444' : '#cbd5e1', fontWeight: 600 }}>{val}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, border: '1px solid #2a3a5c' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔍 My Roof Style Implications</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 14 }}>Current Roof Style</label>
            <select value={currentRoof} onChange={e => { setCurrentRoof(e.target.value); setShowImplications(false); }} style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px', background: '#0A1628', border: '1px solid #2a3a5c', borderRadius: 8, color: '#fff' }}>
              <option value="">Select your current roof style</option>
              {currentRoofs.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <button onClick={() => setShowImplications(true)} disabled={!currentRoof} style={{ width: '100%', padding: 14, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: currentRoof ? 'pointer' : 'not-allowed', opacity: currentRoof ? 1 : 0.5 }}>See My Implications</button>
          {showImplications && implications[currentRoof] && (
            <div style={{ marginTop: 20, padding: 16, background: '#0A1628', borderRadius: 8 }}>
              <p style={{ margin: '0 0 12px', color: '#94a3b8', fontSize: 12, fontWeight: 600 }}>FOR YOUR {currentRoof.toUpperCase()} IN DFW:</p>
              {implications[currentRoof].map(item => <p key={item} style={{ margin: '6px 0', color: '#cbd5e1', fontSize: 14 }}>{item}</p>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}