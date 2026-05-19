import { useState } from 'react';

export default function DFWHomeHygrothermalGuide2026() {
  const [concern, setConcern] = useState('');
  const [solution, setSolution] = useState('');

  const concerns = [
    { label: 'Condensation on walls/windows', solution: 'Air seal first — condensation is an air leakage symptom, not insulation. Add ERV for fresh air exchange without humidity spike. Target interior RH 45-50% summer.' },
    { label: 'Musty smell / mold risk', solution: 'Check vapor drive direction: summer = outward push, winter = inward. In DFW climate zone 3, use vapor-retarder paint NOT poly sheeting. Air seal attic penetrations immediately.' },
    { label: 'High summer energy bills', solution: 'Radiant barrier in attic (DFW gets 130°F attic temps). Air seal before adding insulation — every $1 of air sealing saves $3 of insulation cost in zone 3.' },
    { label: 'Dry air in winter', solution: 'DFW winters are brief but dry. Whole-home humidifier on furnace (bypass type, $400-800 installed). Target 35-45% RH. Tight home holds humidity better.' },
    { label: 'Crawl space moisture', solution: 'Encapsulate crawl space with 20-mil liner + dehumidifier. DFW clay soil holds moisture. Conditioned crawl outperforms vented in zone 3 climate.' },
    { label: 'HVAC sweating / duct condensation', solution: 'Duct condensation = supply air too cold hitting warm humid air. Check duct insulation (R-8 minimum in DFW attics). Seal duct leaks — avg DFW home leaks 25-30% of conditioned air.' },
  ];

  const handleSelect = (c: { label: string; solution: string }) => {
    setConcern(c.label);
    setSolution(c.solution);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>DFW 2026 GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🌡️ DFW Hygrothermal Performance Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 15 }}>Managing heat AND moisture in North Texas homes — Climate Zone 3 mixed-humid rules apply.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { icon: '🚫', label: 'No poly vapor barriers', sub: 'Climate zone 3 rule' },
            { icon: '💨', label: 'Air seal first', sub: 'Then insulate' },
            { icon: '🔄', label: 'ERV > HRV for DFW', sub: 'Handles humidity' },
          ].map(item => (
            <div key={item.label} style={{ background: '#1e2d4a', borderRadius: 8, padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{item.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 4 }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14, color: '#F5E642′ }}>🔍 Hygrothermal Problem Finder</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {concerns.map(c => (
            <button key={c.label} onClick={() => handleSelect(c)} style={{ background: concern === c.label ? '#F5E642′ : '#1e2d4a', color: concern === c.label ? '#0A1628' : '#fff', border: ’none', borderRadius: 6, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>{c.label}</button>
          ))}
        </div>
        {solution && (
          <div style={{ background: '#1e2d4a', border: '1px solid #F5E642', borderRadius: 8, padding: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Hygrothermal Solution</div>
            <p style={{ color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>{solution}</p>
          </div>
        )}
        <div style={{ marginTop: 32, color: '#64748b', fontSize: 12, textAlign: 'center' }}>ProLnk · DFW Home Performance · 2026 Edition</div>
      </div>
    </div>
  );
}