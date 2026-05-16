import { useState } from 'react';

export default function DFWBalconyDeckSafetyGuide2026() {
  const [deckType, setDeckType] = useState('');
  const [age, setAge] = useState('');
  const [material, setMaterial] = useState('');
  const [result, setResult] = useState<string[]>([]);

  const inspect = () => {
    const items: string[] = [];
    if (deckType === 'above30') {
      items.push('🚨 Guardrail REQUIRED — deck is 30+ inches above grade (IRC R312.1.1). Minimum 36" height.');
      items.push('📏 Baluster spacing max 4 inches — check all openings with a 4" diameter ball');
    }
    if (deckType === 'below30') items.push('✅ Under 30" above grade — guardrail not required but strongly recommended');
    if (age === 'over10') items.push('⚠️ Deck over 10 years old — inspect ledger board connection, joist hangers, and beam-to-post connections annually');
    if (age === 'over20') items.push('🚨 Deck over 20 years old — professional structural inspection strongly recommended; check for wood rot at post bases');
    if (material === 'wood') items.push('🌧️ DFW humidity warning: wood decks prone to rot and insect damage — probe post bases and ledger with screwdriver annually');
    if (material === 'composite') items.push('✅ Composite decking holds up well in DFW humidity — inspect fasteners and frame, not just surface boards');
    items.push('🔩 Ledger board must be flashed properly — #1 cause of deck collapse in DFW is water intrusion at ledger');
    items.push('📋 Annual inspection checklist: fasteners, ledger, posts, guardrail connections, decking surface');
    setResult(items);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Balcony & Deck Safety Guide 2026</h1>
          <p style={{ color: '#9CA3AF', marginTop: 8 }}>Guardrail, Inspection & Material Requirements for DFW Decks</p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '⚠️', title: '30-Inch Guardrail Threshold', desc: 'IRC R312.1.1: Any deck surface 30 inches or more above grade requires a guardrail. Minimum height is 36 inches. Top rail must not facilitate climbing.' },
            { icon: '📐', title: 'Baluster Spacing', desc: 'Maximum 4-inch spacing between balusters and between bottom rail and deck surface. A 4" sphere must not pass through any opening.' },
            { icon: '💧', title: 'Ledger Board Flashing', desc: 'Ledger connection failure is the #1 cause of deck collapse. Proper flashing prevents water intrusion. Inspect annually for separation or rot.' },
            { icon: '🌿', title: 'DFW Humidity & Wood Rot', desc: 'DFW humidity cycles accelerate wood rot, especially at post bases in soil contact. Use composite or pressure-treated lumber rated for ground contact (UC4B+).' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#132040', borderRadius: 10, padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#CBD5E1', fontSize: 14 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 18 }}>🔍 Deck Safety Inspection Checklist</h2>
          <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#9CA3AF', fontSize: 13, display: 'block', marginBottom: 6 }}>Deck Height Above Grade</label>
              <select value={deckType} onChange={e => setDeckType(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2D4A7A', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select height...</option>
                <option value="below30">Under 30 inches</option>
                <option value="above30">30 inches or higher</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#9CA3AF', fontSize: 13, display: 'block', marginBottom: 6 }}>Deck Age</label>
              <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2D4A7A', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select age...</option>
                <option value="under10">Under 10 years</option>
                <option value="over10">10–20 years</option>
                <option value="over20">20+ years</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#9CA3AF', fontSize: 13, display: 'block', marginBottom: 6 }}>Decking Material</label>
              <select value={material} onChange={e => setMaterial(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2D4A7A', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select material...</option>
                <option value="wood">Pressure-treated wood</option>
                <option value="composite">Composite / PVC decking</option>
              </select>
            </div>
          </div>
          <button onClick={inspect} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Generate Inspection Checklist</button>
          {result.length > 0 && (
            <div style={{ marginTop: 20 }}>
              {result.map((r, i) => <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', marginBottom: 8, fontSize: 14, color: '#CBD5E1' }}>{r}</div>)}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: '16px', background: '#132040', borderRadius: 10, color: '#9CA3AF', fontSize: 13 }}>
          🏠 ProLnk connects DFW homeowners with licensed deck and railing contractors
        </div>
      </div>
    </div>
  );
}