import { useState } from 'react';

export default function DFWFoundationDifferential2026() {
  const [movement, setMovement] = useState('');
  const [pattern, setPattern] = useState('');

  const getGuide = () => {
    if (!movement || !pattern) return null;
    if (movement === 'one-inch-plus' && pattern === 'differential') return { risk: 'High Risk', color: '#FF4444', title: 'Act Now — Structural Engineer Required', steps: ['Do NOT delay: differential movement of 1\"+ requires professional evaluation', 'Document all cracks with photos and measurements today', 'Contact a licensed structural engineer (not just a foundation company)', 'Get 3 independent assessments before any repair work', 'Ask about root intrusion, plumbing leaks, and drainage as root causes'], note: 'DFW expansive clay with sun-exposure variation is the #1 cause of differential settlement.' };
    if (movement === 'one-inch-plus' && pattern === 'uniform') return { risk: 'Monitor Closely', color: '#F5A623', title: 'Uniform Settlement — Monitor But Less Urgent', steps: ['Uniform 1\" drop is less concerning than differential movement', 'Measure crack widths every 30 days to track progression', 'Check gutters and drainage — poor drainage accelerates settlement', 'Maintain consistent soil moisture with soaker hoses in drought', 'Consult a foundation company if cracks exceed 1/4 inch'], note: 'Even uniform settlement can become differential. Track monthly.' };
    if (movement === 'under-half-inch' && pattern === 'differential') return { risk: 'Watch Carefully', color: '#F5A623', title: 'Early Differential Movement — Address Root Causes', steps: ['Small differential now can grow — fix drainage and moisture issues first', 'Install soaker hose system 18\" from foundation perimeter', 'Clean gutters and extend downspouts 4+ feet from foundation', 'Remove large trees within 20 feet of foundation', 'Re-evaluate in 6 months after moisture management improvements'], note: 'DFW clay soil shrinks/swells up to 6 inches seasonally. Moisture control is key.' };
    return { risk: 'Normal Range', color: '#4CAF50', title: 'Typical DFW Foundation Behavior', steps: ['Minor uniform movement is expected in DFW expansive clay', 'Maintain consistent watering around foundation year-round', 'Inspect twice yearly: after summer drought and after spring rains', 'Seal any plumbing penetrations through the slab', 'Document baseline with photos now for future comparison'], note: 'The goal is preventing differential movement, not eliminating all movement.' };
  };

  const guide = getGuide();

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DFW Foundation Guide 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.2 }}>🏠 DFW Differential Foundation Movement Guide</h1>
        <p style={{ color: '#9BA3B2', marginBottom: '2rem' }}>In DFW, it's not total movement that matters — it’s differential movement. One end of your slab dropping while the other stays is far more damaging than uniform settlement.</p>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>📐 Why Differential Matters More Than Total</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[{icon:'✅',text:'1 inch UNIFORM drop across whole slab = generally acceptable'},{icon:'🚨',text:'1 inch DIFFERENTIAL (one end drops, other stays) = major structural concern'},{icon:'🌞',text:'DFW clay dries faster on sun-facing sides — causing uneven soil shrinkage'},{icon:'🌳',text:'Tree roots extract moisture unevenly, amplifying differential settlement'},{icon:'💧',text:'Plumbing leaks under slab create localized voids = sudden differential movement'}].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
                <span style={{ color: '#CBD2DC', fontSize: '0.95rem' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>🔎 Assess Your Movement</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#9BA3B2', fontSize: '0.9rem' }}>Approximate total movement observed</label>
              <select value={movement} onChange={e => setMovement(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EAF0', fontSize: '0.95rem' }}>
                <option value="">Select movement amount...</option>
                <option value="minimal">Minimal — hairline cracks only</option>
                <option value="under-half-inch">Under 1/2 inch</option>
                <option value="half-to-one">1/2 inch to 1 inch</option>
                <option value="one-inch-plus">Over 1 inch</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#9BA3B2', fontSize: '0.9rem' }}>Movement pattern</label>
              <select value={pattern} onChange={e => setPattern(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EAF0', fontSize: '0.95rem' }}>
                <option value="">Select pattern...</option>
                <option value="uniform">Uniform — whole structure moved similarly</option>
                <option value="differential">Differential — one side/corner worse than others</option>
                <option value="unknown">Not sure / need to assess</option>
              </select>
            </div>
          </div>
        </div>

        {guide && (
          <div style={{ background: '#0F2744', border: `2px solid ${guide.color}`, borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ background: guide.color, color: '#0A1628', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700 }}>{guide.risk}</span>
              <span style={{ color: guide.color, fontWeight: 700, fontSize: '1.05rem' }}>{guide.title}</span>
            </div>
            <div style={{ display: 'grid', gap: '0.6rem', marginBottom: '1rem' }}>
              {guide.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: guide.color, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ color: '#CBD2DC', fontSize: '0.95rem' }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#1A2F4A', borderRadius: '8px', padding: '0.75rem 1rem', color: '#9BA3B2', fontSize: '0.88rem', fontStyle: 'italic' }}>💡 {guide.note}</div>
          </div>
        )}
      </div>
    </div>
  );
}