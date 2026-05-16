import { useState } from 'react';

export default function DFWSaintAugustineGuide2026() {
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState('');

  const getGuide = () => {
    if (!condition) { setResult('Please select your yard condition.'); return; }
    const guides: Record<string, string> = {
      fullsun: '☀️ Full Sun DFW Yard: Floratam is your best bet — heat tolerant, aggressive growth, handles DFW summers well. Mow at 3.5 inches, water 1 inch/week. Watch for chinch bugs June–August — inspect weekly near driveways and sidewalks.',
      shade: '🌳 Shaded Yard: Raleigh or Palmetto St. Augustine. Raleigh tolerates 40% shade — best in north-facing DFW yards under trees. Palmetto is semi-dwarf with better shade tolerance and softer texture. Requires 6+ hours filtered light minimum.',
      mixed: '🌤️ Mixed Sun/Shade: Palmetto St. Augustine. Semi-dwarf variety handles transition zones in DFW. Plant in late spring. Supplement shaded areas with Raleigh. Keep mow height at 3.5–4 inches to preserve shade tolerance.',
      chinchbug: '🐛 Chinch Bug History: Floratam has some chinch bug resistance but DFW summers are brutal. Apply preventive insecticide (bifenthrin) in May and July. Inspect dry spots near heat-reflective surfaces weekly. Act within 48 hours of spotting.',
      drought: '💧 Drought-Prone Areas: St. Augustine requires 1–1.5 inches water/week in DFW summer. It is NOT as drought-tolerant as Bermuda. For water-restricted yards, Bermuda or Zoysia may serve you better. Floratam wilts fast without consistent irrigation.',
    };
    setResult(guides[condition] || 'Select a valid condition.');
  };

  const varieties = [
    { name: 'Floratam', shade: '❌ Low', chinch: '⚠️ Some resist', water: '💧 High', notes: 'Most common DFW — heat champion' },
    { name: 'Raleigh', shade: '✅ Good', chinch: '❌ Vulnerable', water: '💧 High', notes: 'Best for shaded north DFW yards' },
    { name: 'Palmetto', shade: '✅ Best', chinch: '⚠️ Moderate', water: '💧 Medium', notes: 'Semi-dwarf, soft, shade-shade mix' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🌿 PROLNK LAWN GUIDE — DFW 2026</div>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>DFW St. Augustine Grass Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>St. Augustine thrives in DFW with the right variety. Know your yard before you buy sod.</p>

        <div style={{ overflowX: 'auto', marginBottom: 28 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#0d1f3c' }}>
                {['Variety', 'Shade', 'Chinch Bug', 'Water Need', 'Best For'].map(h => <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#F5E642', borderBottom: '1px solid #1e3a5f' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {varieties.map((v, i) => (
                <tr key={v.name} style={{ background: i % 2 === 0 ? '#0d1f3c' : '#0A1628' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 700 }}>{v.name}</td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{v.shade}</td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{v.chinch}</td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{v.water}</td>
                  <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{v.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>Describe your DFW yard:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[['☀️ Full Sun (6+ hrs)', 'fullsun'], ['🌳 Significant Shade', 'shade'], ['🌤️ Mixed Sun/Shade', 'mixed'], ['🐛 Chinch Bug History', 'chinchbug'], ['💧 Drought / Water Limits', 'drought']].map(([label, val]) => (
            <button key={val} onClick={() => setCondition(val)} style={{ padding: '12px', border: condition === val ? '2px solid #F5E642' : '1px solid #1e3a5f', borderRadius: 8, background: condition === val ? '#1e3a5f' : '#0d1f3c', color: '#fff', cursor: 'pointer', fontSize: 13 }}>{label}</button>
          ))}
        </div>

        <button onClick={getGuide} style={{ width: '100%', padding: '16px', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 20 }}>Get My St. Augustine Guide ➜</button>
        {result && <div style={{ padding: 20, background: '#0d1f3c', border: '1px solid #F5E642', borderRadius: 8, lineHeight: 1.7 }}>{result}</div>}

        <div style={{ marginTop: 28, padding: 16, background: '#0d1f3c', borderRadius: 8, border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚠️ DFW Chinch Bug Warning</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>Chinch bugs are St. Augustine's #1 enemy in DFW. They thrive in hot, dry spells (June–Aug). Inspect drought-looking patches near concrete — they hide at grass/soil interface. Treat immediately with bifenthrin or permethrin. Waiting 1 week can mean losing 500 sq ft.</p>
        </div>

        <div style={{ marginTop: 20, padding: 20, background: '#0d1f3c', borderRadius: 8, textAlign: 'center', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Need a Lawn Pro in DFW?</div>
          <button style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}