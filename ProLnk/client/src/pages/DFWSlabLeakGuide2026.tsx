import { useState } from 'react';

export default function DFWSlabLeakGuide2026() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState('');

  const symptomList = [
    { id: 'hotfloor', label: '🌡️ Hot or warm spots on floor' },
    { id: 'highbill', label: '💧 Sudden water bill spike' },
    { id: 'running', label: '🔊 Sound of running water (meter off)' },
    { id: 'crack', label: '🏚️ Foundation cracks or settling' },
    { id: 'mold', label: '🍄 Mold or mildew on floors' },
  ];

  const analyze = () => {
    if (symptoms.length === 0) { setRecommendation('Select at least one symptom.'); return; }
    if (symptoms.length >= 3) setRecommendation('🚨 HIGH LIKELIHOOD: Multiple indicators detected. Schedule acoustic + thermal imaging immediately. Avg repair: $3,000–$12,000.');
    else if (symptoms.includes('running') || symptoms.includes('hotfloor')) setRecommendation('⚠️ MODERATE RISK: Strong slab leak indicators. Start with acoustic detection ($200–$500). Act fast to prevent foundation damage.');
    else setRecommendation('📋 LOW-MODERATE RISK: Monitor closely. Schedule a plumbing inspection within 30 days.');
  };

  const toggle = (id: string) => setSymptoms(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '0.4rem 1rem', borderRadius: '6px', display: 'inline-block', fontWeight: 700, marginBottom: '1rem', fontSize: '0.85rem' }}>DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🏠 DFW Slab Leak Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Dallas-Fort Worth sits on expansive clay soil — the #1 driver of slab leaks in the US. Learn to detect, diagnose, and repair.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{icon:'🌍',title:'Clay Soil Problem',desc:'DFW clay expands & contracts with rain cycles, stressing copper pipes below your slab annually.'},{icon:'🔍',title:'Detection Methods',desc:'Acoustic listening ($200–400), thermal imaging ($300–600), pressure testing ($150–250).'},{icon:'🔧',title:'Repair Options',desc:'Spot repair $1,500–3,000. Full reroute $5,000–12,000. Insurance may cover damage.'}].map((c,i) => (
            <div key={i} style={{ background: '#0f2035', borderRadius: '10px', padding: '1.2rem' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: '#F5E642′ }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🩺 Symptom Checker</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1rem' }}>
            {symptomList.map(s => (
              <button key={s.id} onClick={() => toggle(s.id)} style={{ padding: '0.7rem 1rem', borderRadius: '8px', border: '2px solid', borderColor: symptoms.includes(s.id) ? '#F5E642′ : '#1e3a5f', background: symptoms.includes(s.id) ? '#1a2f4a' : '#0A1628', color: '#fff', cursor: ’pointer', textAlign: 'left', fontSize: '0.88rem' }}>{s.label}</button>
            ))}
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.7rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Analyze My Risk →</button>
          {recommendation && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #F5E642', color: '#e2e8f0′ }}>{recommendation}</div>}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '10px', padding: '1.2rem', color: '#0A1628′ }}>
          <strong>💡 DFW Pro Tip:</strong> Pre-1980 homes with copper supply lines under slab are highest risk. Get a free slab leak assessment before your next home purchase.
        </div>
      </div>
    </div>
  );
}