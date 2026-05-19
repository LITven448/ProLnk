import { useState } from 'react';

const BEAM_DATA: Record<string, Record<string, string>> = {
  'load-bearing': {
    '8': 'LVL beam: 3.5″ x 9.5″ minimum (engineer stamp required)',
    '12': 'LVL beam: 3.5″ x 11.25″ minimum (engineer stamp required)',
    '16': 'LVL beam: 3.5″ x 14″ minimum (structural engineer required)',
    '20+': 'Custom engineered beam — structural engineer required',
  },
  'non-load-bearing': {
    '8': 'No beam needed — standard header (2x6)',
    '12': 'No beam needed — standard header (2x8)',
    '16': 'Minimal header — confirm with framer',
    '20+': 'May need temporary support — verify with contractor',
  },
};

const ASBESTOS: Record<string, string> = {
  'pre-1980': '⚠️ STOP — DFW homes pre-1980 may have asbestos in drywall texture. Mandatory testing before any demolition.',
  '1980-2000': '✅ Lower risk — asbestos largely phased out. Spot-check advised for any textured surfaces.',
  'post-2000': '✅ No asbestos risk — standard modern materials.',
};

export default function DFWOpenWallGuide() {
  const [wallType, setWallType] = useState('');
  const [span, setSpan] = useState('');
  const [homeAge, setHomeAge] = useState('');
  const [result, setResult] = useState<null | { beam: string; permit: string; asbestos: string; cost: string }>(null);

  function calculate() {
    if (!wallType || !span || !homeAge) return;
    const beam = BEAM_DATA[wallType]?.[span] ?? 'Consult structural engineer';
    const asbestos = ASBESTOS[homeAge];
    const permit = wallType === 'load-bearing'
      ? 'Building permit + Structural engineer plans required'
      : 'Building permit required (no engineer plans for non-load-bearing)';
    const costMap: Record<string, string> = {
      'load-bearing': '$3,500 – $12,000 (includes beam, posts, engineer)',
      'non-load-bearing': '$800 – $3,000 (demo + patch + finish)',
    };
    setResult({ beam, permit, asbestos, cost: costMap[wallType] });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Opening Walls in DFW Homes</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          Open concept is the #1 remodel request in DFW. But load-bearing walls and pre-1980 asbestos risks make this project require a licensed pro — no exceptions.
        </p>

        <div style={{ background: '#FF4444', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>🚨 Critical DFW Warning</div>
          <div style={{ marginTop: 8, lineHeight: 1.6 }}>
            Opening a load-bearing wall without a permit or structural engineer is illegal in all DFW municipalities and voids your homeowner's insurance. Fines up to $5,000 and mandatory restoration orders are common.
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Load-Bearing Identification</h2>
          <ul style={{ color: '#CBD5E1', lineHeight: 2, paddingLeft: 20 }}>
            <li>Walls perpendicular to floor joists are typically load-bearing</li>
            <li>Walls directly above/below other walls are usually structural</li>
            <li>Exterior walls are almost always load-bearing</li>
            <li>Center walls in ranch homes are frequently structural</li>
            <li>Always verify with a licensed structural engineer before demo</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚗️ Pre-1980 Asbestos in DFW</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            DFW homes built before 1980 commonly used asbestos-containing joint compound, texture spray ("popcorn"), and insulation. Texas law requires accredited asbestos testing before any renovation that disturbs these materials. Testing costs $200–500 and takes 3–5 days.
          </p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🧮 Wall Opening Estimator</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              ['Wall type', wallType, setWallType, [['', 'Select wall type'], ['load-bearing', 'Load-bearing wall'], ['non-load-bearing', 'Non-load-bearing wall']]],
              ['Opening span', span, setSpan, [['', 'Select span'], ['8', "Up to 8'"], ['12', "9'–12'"], ['16', "13'–16'"], ['20+', "17'+"]]],
              ['Home built', homeAge, setHomeAge, [['', 'Select era'], ['pre-1980', 'Before 1980'], ['1980-2000', '1980–2000'], ['post-2000', 'After 2000']]],
            ].map(([label, val, setter, opts]: any) => (
              <div key={label}>
                <label style={{ display: 'block', marginBottom: 8, color: '#94A3B8′ }}>{label}</label>
                <select value={val} onChange={e => setter(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                  {opts.map(([v, l]: string[]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            ))}
            <button onClick={calculate}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, padding: '14px 0', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
              Get Assessment →
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
              {[['🪵 Beam Requirement', result.beam], ['📋 Permit Required', result.permit], ['⚗️ Asbestos Risk', result.asbestos], ['💰 Estimated Cost', result.cost]].map(([label, val]) => (
                <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>{label}</div>
                  <div style={{ fontWeight: 600, marginTop: 4 }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18 }}>Get a structural assessment from a DFW licensed contractor</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginTop: 6 }}>ProLnk connects you with vetted DFW structural contractors</div>
        </div>
      </div>
    </div>
  );
}
