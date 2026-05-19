import { useState } from 'react';

export default function DFWFoundationInspectionGuide2026() {
  const [age, setAge] = useState('');
  const [area, setArea] = useState('');

  const getPriority = () => {
    if (!age || !area) return null;
    const isOld = age === '30+' || age === '20-30';
    const isHighRisk = area === 'Expansive Clay' || area === 'Near Creek/Lake';
    if (isOld && isHighRisk) return { level: '🔴 CRITICAL', msg: 'Structural Engineer required — not optional. High probability of significant movement.', color: '#ef4444′ };
    if (isOld || isHighRisk) return { level: '🟡 HIGH', msg: 'Dedicated foundation inspection strongly recommended before closing.', color: '#eab308′ };
    return { level: '🟢 MODERATE', msg: 'Still get foundation inspection — DFW soils move everywhere.', color: '#22c55e' };
  };

  const priority = getPriority();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '0 0 8px' }}>DFW Foundation Inspection Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Why a separate foundation inspection is non-negotiable in DFW</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20, borderLeft: '4px solid #ef4444′ }}>
          <h2 style={{ color: '#ef4444', fontSize: 16, margin: '0 0 10px' }}>⚠️ General Inspectors Often Miss DFW Foundation Issues</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>DFW sits on some of the most expansive clay soils in the country. General inspectors note visible cracks but rarely assess differential movement depth, pier failure, or soil saturation risk. You need a dedicated foundation specialist.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>⚖️ Structural Engineer vs Foundation Repair Company</h2>
          {[
            { who: '🎓 Structural Engineer (PE Licensed)', pros: 'Unbiased diagnosis, PE stamp for insurance/lending, legally defensible assessment', cons: '$400–800, no conflict of interest', rec: '✅ Recommended for any home showing signs' },
            { who: '🔧 Foundation Repair Company', pros: 'Free estimates, experienced with local soils', cons: 'Financial incentive to recommend repairs — may overstate severity', rec: '⚠️ Get second opinion before signing repair contract' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#0d1e36', borderRadius: 10, padding: 14, marginBottom: 10 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 14 }}>{item.who}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>✅ {item.pros}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>💰 Cost: {item.cons}</div>
              <div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>{item.rec}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>📐 What a Proper Inspection Includes</h2>
          {['Interior floor elevation survey (digital level readings throughout)', 'Exterior pier/beam inspection or slab perimeter review', 'Crack pattern analysis (diagonal vs vertical tells different stories)', 'Drainage and grade assessment around foundation', 'Door/window alignment checks for differential settlement', 'Soil saturation and drainage history review'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, padding: '7px 0', borderBottom: '1px solid #1e3a5f', color: '#cbd5e1', fontSize: 14 }}>
              <span>📍</span><span>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>🗺️ Property Age + Area → Foundation Priority</h2>
          <div style={{ display: 'flex', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Home Age:</p>
              {['Under 10 yrs', '10-20 yrs', '20-30 yrs', '30+'].map(opt => (
                <button key={opt} onClick={() => setAge(opt)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', marginBottom: 6, borderRadius: 8, cursor: 'pointer', border: '1px solid', fontSize: 13,
                    borderColor: age === opt ? '#F5E642′ : '#334155', background: age === opt ? '#F5E642' : ’transparent', color: age === opt ? '#0A1628′ : '#94a3b8', fontWeight: age === opt ? 700 : 400 }}>
                  {opt}
                </button>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Area/Soil Type:</p>
              {['Sandy/Stable', 'Expansive Clay', 'Near Creek/Lake', 'Unknown'].map(opt => (
                <button key={opt} onClick={() => setArea(opt)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', marginBottom: 6, borderRadius: 8, cursor: 'pointer', border: '1px solid', fontSize: 13,
                    borderColor: area === opt ? '#F5E642′ : '#334155', background: area === opt ? '#F5E642' : ’transparent', color: area === opt ? '#0A1628′ : '#94a3b8', fontWeight: area === opt ? 700 : 400 }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
          {priority && (
            <div style={{ background: '#0d1e36', borderRadius: 10, padding: 16, borderLeft: `4px solid ${priority.color}` }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: priority.color }}>{priority.level}</div>
              <div style={{ color: '#e2e8f0', fontSize: 14 }}>{priority.msg}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
