import { useState } from 'react';

const factors = [
  { id: 'old_home', label: 'Home built before 1970 (clay pipe era)', weight: 4 },
  { id: 'mid_home', label: 'Home built 1970–1990 (orangeburg/cast iron)', weight: 3 },
  { id: 'trees_close', label: 'Large trees within 20 ft of sewer line', weight: 4 },
  { id: 'live_oaks', label: 'Live oaks or mature elms on property', weight: 3 },
  { id: 'slow_drain', label: 'Slow drains or recurring backups', weight: 5 },
  { id: 'clay_soil', label: 'Visible clay soil movement or settled areas in yard', weight: 3 },
  { id: 'never_scoped', label: 'No record of prior sewer scope', weight: 2 },
];

export default function DFWSewerscopeGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const score = selected.reduce((acc, id) => {
    const f = factors.find(r => r.id === id);
    return acc + (f ? f.weight : 0);
  }, 0);

  const getResult = () => {
    if (score >= 8) return { label: 'Urgent — Schedule Before Offer', color: '#FF6B6B', msg: 'Multiple high-risk indicators. Sewer repair in DFW runs $3,000–$15,000. Know before you close.' };
    if (score >= 5) return { label: 'Strongly Recommended', color: '#FFB347', msg: 'Significant risk factors present. A $150–$350 scope could save thousands in post-close surprises.' };
    if (score >= 2) return { label: 'Recommended Add-On', color: '#F5E642', msg: 'Moderate risk. Add sewer scope to your inspection — standard on most DFW resale homes.' };
    return { label: 'Consider As Standard Due Diligence', color: '#4CAF50', msg: 'Lower risk profile, but sewer scopes are inexpensive and provide peace of mind on any resale.' };
  };

  const result = getResult();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF6', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ backgroundColor: '#0D1F3C', borderBottom: '3px solid #F5E642', padding: '32px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>DFW Inspection Series</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>🔭 Sewer Scope Inspection Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0 }}>Why DFW's clay soil and mature trees make sewer scopes one of the most important add-on inspections you can order.</p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>🎥 What Is a Sewer Scope?</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 12px' }}>A sewer scope sends a waterproof camera through the home's main sewer line — from a cleanout or toilet — to the city connection. The inspector records video and still images of the pipe's condition and delivers a report of any issues found.</p>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>A standard TREC home inspection does not include sewer line inspection. It must be ordered separately from a plumber or dedicated scope company.</p>
        </div>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>⚠️ Why DFW Is High Risk</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { icon: '🌱', title: 'Live Oak Root Intrusion', desc: 'DFW live oaks and elms are aggressive. Roots infiltrate clay pipe joints and can fill the line entirely within years of planting.' },
              { icon: '🏗️', title: 'Expansive Clay Soil', desc: 'Dallas clay soil shrinks and expands with rainfall. This movement causes pipe bellies (sags that hold water), offsets, and cracks in older lines.' },
              { icon: '🪨', title: 'Clay Pipe Era Homes', desc: 'Homes built before 1970 typically have clay tile sewer lines — brittle, prone to root infiltration, and not rated for modern water pressure.' },
              { icon: '💧', title: 'Orangeburg Pipe', desc: '1940s–1970s: tar-paper pipe that deteriorates and collapses. Scattered across older DFW neighborhoods and still legal to leave in place.' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', backgroundColor: '#132240', borderRadius: 8, padding: 16 }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ color: '#94A3B8', fontSize: 14 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>📋 What the Report Covers</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              'Root intrusion — minor (monitor), moderate (hydro-jet), severe (replacement)',
              'Belly/sag — standing water collecting in pipe low spots, leading to blockages',
              'Offsets — pipe sections shifted out of alignment from soil movement',
              'Cracks or fractures — stress damage from soil expansion cycles',
              'Grease buildup or debris — typically not structural, cleared with jetting',
              'Pipe material identification — clay, cast iron, ABS, PVC',
            ].map((line, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, backgroundColor: '#132240', borderRadius: 8, padding: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>→</span>
                <span style={{ color: '#CBD5E1', fontSize: 14 }}>{line}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>💰 Typical DFW Cost</h2>
          <div style={{ color: '#4CAF50', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>$150 – $350</div>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: 0 }}>Repair costs: Hydro-jetting $300–$700. Pipe lining (trenchless) $3,000–$8,000. Full replacement $5,000–$15,000+. Use the report in negotiations — sellers often credit the full repair estimate.</p>
        </div>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>🎯 Sewer Scope Urgency Calculator</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: '0 0 20px' }}>Select all that apply to the property you're evaluating:</p>
          <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
            {factors.map(f => (
              <label key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', backgroundColor: selected.includes(f.id) ? '#1E3A5F' : '#132240', borderRadius: 8, padding: '12px 16px', border: `2px solid ${selected.includes(f.id) ? '#F5E642' : 'transparent'}`, transition: 'all 0.2s' }}>
                <input type="checkbox" checked={selected.includes(f.id)} onChange={() => toggle(f.id)} style={{ display: 'none' }} />
                <span style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${selected.includes(f.id) ? '#F5E642' : '#4A5568'}`, backgroundColor: selected.includes(f.id) ? '#F5E642' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#0A1628', fontWeight: 900, fontSize: 14 }}>{selected.includes(f.id) ? '✓' : ''}</span>
                <span style={{ color: selected.includes(f.id) ? '#fff' : '#CBD5E1', fontSize: 15 }}>{f.label}</span>
              </label>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} style={{ width: '100%', padding: '14px', backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, borderRadius: 8, border: 'none', cursor: 'pointer' }}>Calculate Urgency →</button>
          {showResult && (
            <div style={{ marginTop: 20, padding: 20, backgroundColor: '#132240', borderRadius: 10, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ color: result.color, fontWeight: 800, fontSize: 20, marginBottom: 8 }}>{result.label}</div>
              <p style={{ color: '#CBD5E1', margin: 0 }}>{result.msg}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
