import { useState } from 'react';

export default function DFWGarbageDisposalGuide2026() {
  const [age, setAge] = useState('');
  const [symptom, setSymptom] = useState('none');
  const [result, setResult] = useState('');

  const assess = () => {
    const yr = parseInt(age);
    if (isNaN(yr)) { setResult('Please enter a valid age.'); return; }
    if (symptom === 'dead') {
      setResult(yr > 8 ? '🔴 Replace unit ($150-400 installed). At this age, repair cost rarely makes sense.' : '⚠️ Check reset button first. If still dead, call a plumber — repair may be worthwhile under 8 yrs.');
    } else if (symptom === 'jam') {
      setResult('🔧 Use hex wrench in bottom socket to manually rotate. Press red reset button. DFW hard water causes mineral jams — run cold water + ice monthly to prevent.');
    } else if (symptom === 'leak') {
      setResult(yr > 8 ? '🔴 Leaking disposal over 8 yrs = replace. Internal seals fail with age + DFW mineral buildup.' : '⚠️ Check flange connection and dishwasher drain. May be a $50 fix. Call a plumber to confirm.');
    } else if (symptom === 'noise') {
      setResult('⚠️ Foreign object likely inside. Turn off power, use tongs (never hands) to clear. Hard water deposits on blades cause grinding — annual cleaning recommended.');
    } else {
      if (yr < 7) setResult('✅ Disposal in expected lifespan. Run cold water 30 sec after use. Avoid fibrous foods, grease, coffee grounds, eggshells.');
      else if (yr < 11) setResult('⚠️ Approaching average end of life (10-12 yrs). Watch for frequent jams, slow drain, or odors. Budget $150-400 for replacement.');
      else setResult('🔴 Past average lifespan. Replacement recommended before failure causes bigger plumbing issues.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🔧 ProLnk Home Intelligence</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>DFW Garbage Disposal Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: '2rem' }}>Hard DFW water is the #1 killer of garbage disposals. Know your unit, know your risks.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '📅', label: 'Avg Lifespan', val: '10–12 years' },
            { icon: '💧', label: 'DFW Hard Water', val: '300+ ppm buildup' },
            { icon: '💰', label: 'Replacement Cost', val: '$150–$400 installed' },
            { icon: '🔄', label: 'Repair vs Replace', val: 'Replace if 8+ yrs' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#1a2744', borderRadius: 8, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600 }}>{s.val}</div>
              <div style={{ color: '#a0aec0', fontSize: '0.85rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Troubleshooting Guide</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#a0aec0', fontSize: '0.85rem' }}>Disposal Age (years)</label><br />
              <input value={age} onChange={(e) => setAge(e.target.value)} type="number" min="0" max="25"
                style={{ background: '#0A1628', border: '1px solid #F5E642', color: '#fff', padding: '0.5rem', borderRadius: 6, width: 120, marginTop: 4 }} />
            </div>
            <div>
              <label style={{ color: '#a0aec0', fontSize: '0.85rem' }}>Current Symptom</label><br />
              <select value={symptom} onChange={(e) => setSymptom(e.target.value)}
                style={{ background: '#0A1628', border: '1px solid #F5E642', color: '#fff', padding: '0.5rem', borderRadius: 6, marginTop: 4 }}>
                <option value="none">No issues / General check</option>
                <option value="jam">Jammed / humming but not spinning</option>
                <option value="dead">Completely dead</option>
                <option value="leak">Leaking</option>
                <option value="noise">Loud grinding noise</option>
              </select>
            </div>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.6rem 1.5rem', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}>
            Get My Answer
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8 }}>{result}</div>}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>🚫 Never Put These In</h2>
          {['Grease or cooking oil — solidifies and clogs DFW drains fast','Fibrous foods — celery, artichokes, corn husks wrap around blades','Eggshells — membrane wraps blades; shells create fine paste that clogs','Coffee grounds — accumulate in drain traps','Pasta, rice, potatoes — expand with water and clog pipes'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', color: '#a0aec0', fontSize: '0.9rem' }}>
              <span style={{ color: '#F5E642' }}>✕</span>{t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}