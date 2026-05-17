import { useState } from 'react';

export default function DFWRoofingOAKWiltRoof2026() {
  const [situation, setSituation] = useState('');
  const [guide, setGuide] = useState('');

  const situations = [
    'Planning to trim oaks now',
    'Oak shows signs of stress or leaf loss',
    'Oak confirmed dead from oak wilt',
    'Dead oak near or overhanging roof',
    'Replacing roof, oak trees nearby',
  ];

  const generate = () => {
    if (!situation) return;
    let tips = [];
    if (situation === 'Planning to trim oaks now') {
      const month = new Date().getMonth();
      if (month >= 1 && month <= 5) {
        tips.push('🚫 STOP — Do NOT trim DFW oaks February through June — this is prime oak wilt transmission season via beetle vectors');
        tips.push('📅 Schedule trimming for July-January only — DFW arborists call this the "safe window" for oak pruning');
      } else {
        tips.push('✅ Current timing is within the safe window — July-January trimming is low-risk for oak wilt transmission in DFW');
        tips.push('🔴 Paint all cut surfaces immediately with pruning sealant — even in safe window, fresh wounds attract Nitidulid beetles');
      }
      tips.push('🍂 Trimmed oak debris affects roof: leaf litter in valleys and gutters accelerates organic decay — clean within 48 hours');
    }
    if (situation === 'Oak shows signs of stress or leaf loss') {
      tips.push('🍁 Symptomatic oaks in DFW: look for "flagging" — one branch dying while others remain green — classic oak wilt pattern');
      tips.push('🌳 Live oaks wilt from crown downward, red oaks wilt within weeks of infection — DFW red oaks die fastest');
      tips.push('🏠 Stressed oak loses thermal shading benefit — a 40% leaf loss increases attic temperature 8-12°F in DFW summer');
    }
    if (situation === 'Oak confirmed dead from oak wilt') {
      tips.push('⚠️ Dead DFW oaks become hazard trees within 2-3 years — root systems fail and trees fall without warning');
      tips.push('🪚 Remove dead oaks within 18 months — insurance claims from fallen trees onto DFW roofs average $18,000-45,000');
      tips.push('🌿 Do NOT chip dead oak wilt wood on your property — spores survive in fresh chips and spread to healthy oaks');
    }
    if (situation === 'Dead oak near or overhanging roof') {
      tips.push('🏚️ Dead oak overhanging DFW roof: get emergency arborist assessment — tree failure risk is not gradual, it is sudden');
      tips.push('📸 Document with photos and get written arborist report — critical for insurance if roof is later damaged');
      tips.push('🔧 Remove dead limbs over roof first as emergency measure — full removal can follow on normal schedule');
    }
    if (situation === 'Replacing roof, oak trees nearby') {
      tips.push('🛡️ Protect existing healthy oaks during reroofing — tarp root zones within drip line to prevent soil compaction');
      tips.push('🌳 Schedule roofing outside Feb-June if possible — contractor foot traffic near oaks during oak wilt season adds stress');
      tips.push('🍂 Post-roofing: clean all leaf debris from valleys and gutters — DFW oak leaf buildup causes premature shingle decay');
    }
    tips.push('📞 DFW oak wilt hotline: Texas A&M Forest Service — free identification from photos, available year-round');
    tips.push('🏠 Healthy oak shade extends DFW roof shingle life 3-5 years — losing shading trees adds to long-term roofing costs');
    setGuide(tips.join('
'));
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', borderRadius: 8, padding: '4px 12px', display: 'inline-block', marginBottom: 12 }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 12 }}>DFW ROOFING GUIDE 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Oak Wilt and Roofing Connection Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>How DFW oak wilt affects roofing decisions — trimming windows, hazard assessment, thermal loss, and protecting your roof from dead tree risk.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🌳 Get Your Oak and Roof Guide</h2>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>Current Oak Situation</label>
          <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, marginBottom: 20, boxSizing: 'border-box' }}>
            <option value="">Select situation...</option>
            {situations.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Generate Oak and Roof Guide</button>
        </div>

        {guide && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🌳 Your Oak and Roofing Action Plan</h3>
            {guide.split('
').map((line, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>{line}</div>
            ))}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          {[['🚫 Trimming Window', 'July-January ONLY — Feb-June trimming spreads oak wilt via beetles'],['🌡️ Shade Value', 'Healthy oaks reduce attic temp 8-12°F — extends shingle life 3-5 years'],['⚠️ Hazard Timeline', 'Dead DFW oaks become fall risk within 2-3 years — remove promptly'],['🍂 Debris Management', 'Clean leaf debris from roof valleys within 48 hours of heavy drop']].map(([title, desc]) => (
            <div key={title} style={{ background: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Get a DFW arborist or roofer to assess your oak and roof situation</p>
          <div style={{ background: '#F5E642', borderRadius: 8, padding: '10px 20px', display: 'inline-block', cursor: 'pointer' }}>
            <span style={{ color: '#0A1628', fontWeight: 700 }}>🌳 Find Tree or Roofing Pro in DFW</span>
          </div>
        </div>
      </div>
    </div>
  );
}