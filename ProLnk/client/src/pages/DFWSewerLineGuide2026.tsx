import { useState } from 'react';

export default function DFWSewerLineGuide2026() {
  const [homeAge, setHomeAge] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [result, setResult] = useState('');

  const symptomList = [
    { id: 'slowdrain', label: '🚿 Multiple slow drains' },
    { id: 'gurgling', label: '🔊 Gurgling from toilet/drains' },
    { id: 'sewsmell', label: '👃 Sewage smell in yard or home' },
    { id: 'wetspot', label: '💦 Wet spots or sinkholes in yard' },
    { id: 'backup', label: '🚽 Sewage backup in basement' },
  ];

  const toggle = (id: string) => setSymptoms(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const assess = () => {
    if (!homeAge) { setResult('Please select your home age.'); return; }
    const age = parseInt(homeAge);
    const highSym = symptoms.length >= 3 || symptoms.includes('backup') || symptoms.includes('wetspot');
    if (age < 1980 && highSym) setResult('🚨 CRITICAL RISK: Pre-1980 home with cast iron pipes + multiple symptoms. Camera inspection immediately ($150–300). Likely trenchless repair $4,000–10,000.');
    else if (age < 1980) setResult('⚠️ ELEVATED RISK: Older DFW home likely has cast iron or clay tile sewer. Schedule camera inspection before symptoms worsen.');
    else if (highSym) setResult('⚠️ MODERATE RISK: Active symptoms detected. Tree root intrusion probable in mature DFW neighborhoods. Camera inspection recommended.');
    else setResult('✅ LOW RISK: No critical indicators. Annual snaking maintenance recommended for homes 10+ years old.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '0.4rem 1rem', borderRadius: '6px', display: 'inline-block', fontWeight: 700, marginBottom: '1rem', fontSize: '0.85rem' }}>DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🪠 DFW Sewer Line Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Tree roots, aging cast iron, and DFW soil movement make sewer problems one of the costliest surprises for homeowners.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🌳', title: 'Root Intrusion', desc: 'DFW mature oak and elm trees invade pipe joints. Most common in homes 20+ years old with clay tile sewers.' },
            { icon: '📹', title: 'Camera Inspection', desc: '$150–300. Essential before buying any pre-1990 DFW home. Reveals cracks, roots, and bellies.' },
            { icon: '⚙️', title: 'Repair Methods', desc: 'Trenchless (CIPP lining) $4k–10k. Open excavation $6k–15k. Spot repair $1,500–3,500.' }
          ].map((c, i) => (
            <div key={i} style={{ background: '#0f2035', borderRadius: '10px', padding: '1.2rem' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: '#F5E642′ }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>📊 Sewer Risk Assessment</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.88rem' }}>Home Built Era</label>
            <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.95rem' }}>
              <option value="">Select era</option>
              <option value="1960″>Before 1960</option>
              <option value="1970″>1960–1979</option>
              <option value="1990″>1980–1999</option>
              <option value="2010″>2000–2015</option>
              <option value="2024″>2016–Present</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1rem' }}>
            {symptomList.map(s => (
              <button key={s.id} onClick={() => toggle(s.id)} style={{ padding: '0.7rem 1rem', borderRadius: '8px', border: '2px solid', borderColor: symptoms.includes(s.id) ? '#F5E642′ : '#1e3a5f', background: symptoms.includes(s.id) ? '#1a2f4a' : '#0A1628', color: '#fff', cursor: ’pointer', textAlign: 'left', fontSize: '0.88rem' }}>{s.label}</button>
            ))}
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.7rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Assess My Sewer Risk →</button>
          {result && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #F5E642', color: '#e2e8f0′ }}>{result}</div>}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '10px', padding: '1.2rem', color: '#0A1628′ }}>
          <strong>💡 DFW Pro Tip:</strong> Always get a sewer camera scope before buying a home built before 1990 in DFW. It could save you $10,000+ in surprise repairs.
        </div>
      </div>
    </div>
  );
}
