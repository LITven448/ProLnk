import { useState } from 'react';

const deckTypes = [
  { id: 'osb', name: 'OSB (Oriented Strand Board)', icon: '🪵', tag: 'MOST COMMON IN DFW', color: '#F5E642', thickness: '7/16″ or 5/8″', strength: 'Good', moisture: 'Fair (swells when wet)', cost: '$0.50–0.80/sqft', bestFor: 'New construction, standard replacement' },
  { id: 'plywood', name: 'Plywood', icon: '📦', tag: null, color: '#94a3b8', thickness: '1/2″ or 5/8″', strength: 'Excellent', moisture: 'Good (more stable)', cost: '$0.90–1.40/sqft', bestFor: 'High-moisture zones, coastal-adjacent DFW areas' },
  { id: 'zip', name: 'ZIP System Roof Deck', icon: '🔒', tag: 'GROWING IN DFW', color: '#60a5fa', thickness: '5/8″', strength: 'Excellent', moisture: 'Excellent (integrated barrier)', cost: '$1.20–1.80/sqft', bestFor: 'New construction, air-barrier focused builds' },
];

const conditions = [
  { id: 'solid', label: '✅ Solid — no soft spots', action: 'overlay', rec: 'Overlay acceptable' },
  { id: 'soft', label: '⚠️ Soft spots in some areas', action: 'partial', rec: 'Partial replacement' },
  { id: 'widespread', label: '🚨 Widespread rot/damage', action: 'full', rec: 'Full replacement required' },
  { id: 'unknown', label: '❓ Unknown — not inspected', action: 'inspect', rec: 'Inspection first' },
];

export default function DFWRoofDeckboardGuide2026() {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [isNewConst, setIsNewConst] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const condition = conditions.find(c => c.id === selectedCondition);
  const recommendZip = isNewConst;
  const recommendPlywood = selectedCondition === 'widespread' || selectedCondition === 'soft';
  const primaryRec = isNewConst ? 'ZIP System' : recommendPlywood ? 'Plywood' : 'OSB';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Roof Deck Board Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Choosing the right roof decking for North Texas conditions</p>
        </div>
        <div style={{ background: '#1a2744', borderRadius: 12, padding: 16, marginBottom: 24, border: '1px solid #60a5fa' }}>
          <p style={{ margin: 0, color: '#60a5fa', fontWeight: 600 }}>🔧 DFW Context: Most DFW homes built after 1990 use 7/16" OSB. It performs well in dry conditions but can swell if exposed during DFW spring rain season. Proper underlayment installation timing is critical.</p>
        </div>
        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {deckTypes.map(d => (
            <div key={d.id} style={{ background: '#1a2744', borderRadius: 12, padding: 20, border: `1px solid ${d.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 32 }}>{d.icon}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0, color: '#F5E642′ }}>{d.name}</h3>
                    {d.tag && <span style={{ fontSize: 11, background: d.color, color: '#0A1628', padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>{d.tag}</span>}
                  </div>
                  <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: 14 }}>{d.bestFor}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {[['📐 Thickness', d.thickness], ['💪 Strength', d.strength], ['💧 Moisture', d.moisture], ['💰 Cost', d.cost]].map(([label, val]) => (
                  <div key={String(label)} style={{ background: '#0A1628', padding: '8px', borderRadius: 8, textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: 10, color: '#94a3b8′ }}>{label}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 12, color: '#cbd5e1', fontWeight: 600 }}>{val}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, border: '1px solid #2a3a5c', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📋 Overlay vs Replacement Rules</h2>
          {[['✅ CAN Overlay', ['Deck is solid with no soft spots', 'Maximum 1 existing shingle layer', 'No current leaks or moisture damage', 'Local code permits overlay (DFW generally allows)']], ['❌ MUST Replace', ['Two existing shingle layers present', 'Soft spots, rot, or delamination', 'Active leaks have caused deck saturation', 'Deck is less than 7/16″ OSB']]].map(([title, items]) => (
            <div key={String(title)} style={{ marginBottom: 16 }}>
              <h3 style={{ color: String(title).startsWith('✅') ? '#22c55e' : '#ef4444', margin: '0 0 8px' }}>{title}</h3>
              {(items as string[]).map(i => <p key={i} style={{ margin: '2px 0', color: '#cbd5e1', fontSize: 14 }}>• {i}</p>)}
            </div>
          ))}
        </div>
        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, border: '1px solid #2a3a5c' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔍 Deck Condition Guide</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 14 }}>Current Deck Condition</label>
            <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
              {conditions.map(c => (
                <button key={c.id} onClick={() => { setSelectedCondition(c.id); setShowGuide(false); }} style={{ padding: '10px 16px', textAlign: 'left', borderRadius: 8, border: '1px solid', borderColor: selectedCondition === c.id ? '#F5E642′ : '#2a3a5c', background: selectedCondition === c.id ? '#F5E642' : ’transparent', color: selectedCondition === c.id ? '#0A1628′ : '#fff', cursor: ’pointer', fontSize: 14 }}>{c.label}</button>
              ))}
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 16 }}>
            <input type="checkbox" checked={isNewConst} onChange={e => setIsNewConst(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#F5E642′ }} />
            <span style={{ color: '#cbd5e1′ }}>This is new construction</span>
          </label>
          <button onClick={() => setShowGuide(true)} disabled={!selectedCondition} style={{ width: '100%', padding: 14, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: selectedCondition ? 'pointer' : 'not-allowed', opacity: selectedCondition ? 1 : 0.5 }}>Get Deck Guide</button>
          {showGuide && condition && (
            <div style={{ marginTop: 20, padding: 16, background: '#0A1628', borderRadius: 8 }}>
              <p style={{ margin: '0 0 4px', color: '#94a3b8', fontSize: 12 }}>RECOMMENDATION</p>
              <p style={{ margin: '0 0 12px', color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{condition.rec} — {primaryRec}</p>
              <p style={{ margin: 0, color: '#cbd5e1', fontSize: 14 }}>{condition.id === 'inspect' ? '⚠️ A licensed DFW roofer should walk your deck before any work begins. Soft spots are easy to miss without hands-on inspection.' : `Specified deck: ${primaryRec}. ${recommendZip ? 'ZIP System provides integrated air barrier — ideal for DFW new construction energy efficiency.' : recommendPlywood ? 'Plywood provides superior moisture stability for areas with existing damage.' : 'OSB is cost-effective and performs well with proper underlayment in DFW conditions.'}`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}