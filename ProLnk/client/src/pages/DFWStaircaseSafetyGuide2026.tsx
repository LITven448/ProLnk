import { useState } from 'react';

export default function DFWStaircaseSafetyGuide2026() {
  const [staircaseType, setStaircaseType] = useState('');
  const [width, setWidth] = useState('');
  const [surface, setSurface] = useState('');
  const [result, setResult] = useState<string[]>([]);

  const assess = () => {
    const issues: string[] = [];
    if (width === '44plus') issues.push('⚠️ Handrails required on BOTH sides (IRC R311.7.8) — 44"+ width triggers dual-rail requirement');
    else if (width === 'under44') issues.push('✅ Single handrail acceptable for widths under 44 inches');
    if (staircaseType === 'interior') issues.push('✅ Interior stairs: verify 34–38" handrail height, graspable profile required');
    if (staircaseType === 'exterior') issues.push('⚠️ Exterior stairs: check for rot, loose connections, frost heave annually');
    if (surface === 'lvp') issues.push('⚠️ LVP on stairs is slippery — install anti-slip nosing strips on each tread');
    if (surface === 'carpet') issues.push('✅ Carpet provides grip but inspect for loose edges or worn treads');
    if (surface === 'hardwood') issues.push('⚠️ Hardwood stairs: use non-slip runners or anti-slip treads — especially in DFW humidity');
    issues.push('📏 Code: max 7-3/4" riser height, min 10" tread depth (IRC R311.7.5)');
    issues.push('📏 Baluster spacing: max 4" — prevents child head entrapment');
    setResult(issues);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🪜</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Staircase Safety Guide 2026</h1>
          <p style={{ color: '#9CA3AF', marginTop: 8 }}>IRC Code Requirements for Dallas-Fort Worth Homes</p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🔩', title: 'Handrail Both Sides', desc: 'Required when stair width is 44 inches or greater (IRC R311.7.8). Graspable profile mandatory — no flat 2x4 tops.' },
            { icon: '📐', title: 'Baluster Spacing', desc: 'Maximum 4-inch gap between balusters. A 4" sphere must not pass through — prevents child head entrapment per IRC R312.1.3.' },
            { icon: '📏', title: 'Tread & Riser Dimensions', desc: 'Max riser height: 7-3/4". Min tread depth: 10". Consistency within 3/8" of each other across all steps.' },
            { icon: '🏠', title: 'LVP on Stairs Warning', desc: 'Luxury Vinyl Plank is popular in DFW but highly slippery on stairs. Always install anti-slip nosing strips. Consider textured LVP stair-specific products.' },
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
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 18 }}>🔍 Staircase Safety Assessment</h2>
          <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#9CA3AF', fontSize: 13, display: 'block', marginBottom: 6 }}>Staircase Type</label>
              <select value={staircaseType} onChange={e => setStaircaseType(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2D4A7A', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select type...</option>
                <option value="interior">Interior stairs</option>
                <option value="exterior">Exterior / deck stairs</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#9CA3AF', fontSize: 13, display: 'block', marginBottom: 6 }}>Stair Width</label>
              <select value={width} onChange={e => setWidth(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2D4A7A', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select width...</option>
                <option value="under44">Under 44 inches</option>
                <option value="44plus">44 inches or wider</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#9CA3AF', fontSize: 13, display: 'block', marginBottom: 6 }}>Tread Surface Material</label>
              <select value={surface} onChange={e => setSurface(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2D4A7A', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select surface...</option>
                <option value="carpet">Carpet</option>
                <option value="lvp">LVP / Luxury Vinyl Plank</option>
                <option value="hardwood">Hardwood / Engineered Wood</option>
              </select>
            </div>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Run Safety Assessment</button>
          {result.length > 0 && (
            <div style={{ marginTop: 20 }}>
              {result.map((r, i) => <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', marginBottom: 8, fontSize: 14, color: '#CBD5E1' }}>{r}</div>)}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: '16px', background: '#132040', borderRadius: 10, color: '#9CA3AF', fontSize: 13 }}>
          🏠 ProLnk connects DFW homeowners with licensed stair and railing contractors
        </div>
      </div>
    </div>
  );
}