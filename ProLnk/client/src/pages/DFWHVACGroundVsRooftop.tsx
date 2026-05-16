import { useState } from 'react';

const options = [
  { id: 'ground-residential', label: 'Ground-Level Unit — Residential Home', install: 'ground', concern: 'heat' },
  { id: 'roof-residential', label: 'Rooftop Unit — Residential (Flat Roof)', install: 'rooftop', concern: 'heat' },
  { id: 'ground-shaded', label: 'Ground-Level — With Shade or Cover', install: 'ground', concern: 'shaded' },
  { id: 'roof-commercial', label: 'Rooftop Unit — Commercial Property', install: 'rooftop', concern: 'commercial' },
  { id: 'planning', label: 'Planning New Installation — Not Sure Yet', install: 'new', concern: 'general' },
];

const assessments: Record<string, { rating: string; detail: string; tips: string[] }> = {
  'ground-heat': {
    rating: '✅ Preferred for DFW Residential',
    detail: 'Ground-level condensers in DFW benefit from shade opportunities and easier access for service. Standard for DFW residential split systems.',
    tips: ['Ensure 2ft clearance on all sides', 'Plant shrubs at 3ft+ distance for shade without blocking airflow', 'Elevate on a pad to avoid flood risk'],
  },
  'rooftop-heat': {
    rating: '⚠️ Extra Heat Stress Risk',
    detail: 'DFW summer sun raises rooftop surface temps to 150°F+. Direct solar exposure adds 20°F+ to the ambient temp your condenser operates in. Equipment degrades faster.',
    tips: ['Use high-SEER2 unit (18+) to compensate', 'Inspect capacitors and fan motors twice yearly', 'Consider reflective roofing around unit'],
  },
  'ground-shaded': {
    rating: '🏆 Best of Both Worlds',
    detail: 'A shaded ground-level unit in DFW is the optimal setup. Shade can reduce condenser operating temps by 10-15°F, improving efficiency and lifespan.',
    tips: ['Maintain shade structures — trim vegetation regularly', 'Still needs 2ft clearance for airflow', 'Keep area free of debris that collects in DFW wind'],
  },
  'rooftop-commercial': {
    rating: '✅ Standard for DFW Commercial',
    detail: 'RTUs are the industry standard for DFW commercial. They centralize mechanical systems and enable zoning. Just plan for heat-related maintenance cycles.',
    tips: ['Schedule coil cleaning before summer (April)', 'Replace capacitors preventatively every 3-5 years', 'Check drain pans after heavy DFW rains'],
  },
  'new-general': {
    rating: '💡 Choose Ground-Level If Possible',
    detail: 'For new DFW residential installations, ground-level split systems are almost always the right choice — easier service, lower heat stress, better contractor familiarity.',
    tips: ['Get a Manual J load calculation — required for proper sizing', 'Ask about SEER2 ratings (16+ minimum for DFW)', 'Verify permit is being pulled'],
  },
};

export default function DFWHVACGroundVsRooftop() {
  const [selected, setSelected] = useState<string | null>(null);
  const key = selected ? (() => { const o = options.find(x => x.id === selected); return o ? `${o.install}-${o.concern}` : null; })() : null;
  const result = key ? assessments[key] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🌞🏗️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          Ground-Level vs Rooftop HVAC in DFW
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 16, lineHeight: 1.6 }}>
          DFW's extreme summer heat — 100°F+ days are routine — means where your HVAC equipment sits matters more here than
          almost anywhere in the US. Rooftop surfaces can hit 150°F in July. That's 20°F or more added to your condenser's
          operating environment. Ground-level installation is strongly preferred for DFW residential.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 16, marginBottom: 24, display: 'flex', gap: 16 }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 32 }}>🌡️</div>
            <div style={{ color: '#F5E642', fontWeight: 700 }}>+20°F</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Rooftop heat added vs ambient</div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 32 }}>📉</div>
            <div style={{ color: '#F5E642', fontWeight: 700 }}>-15%</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Efficiency drop in extreme heat</div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 32 }}>🔧</div>
            <div style={{ color: '#F5E642', fontWeight: 700 }}>2x</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>More frequent rooftop repairs in DFW</div>
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📍 What's Your Setup?</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {options.map(o => (
            <button key={o.id} onClick={() => setSelected(o.id)}
              style={{ background: selected === o.id ? '#F5E642' : '#112240', color: selected === o.id ? '#0A1628' : '#fff', border: '2px solid ' + (selected === o.id ? '#F5E642' : '#1e3a5f'), borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 15 }}>
              {o.label}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642', marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{result.rating}</div>
            <p style={{ color: '#cbd5e1', marginBottom: 12 }}>{result.detail}</p>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>DFW Action Items:</div>
            {result.tips.map(t => <div key={t} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 6 }}>→ {t}</div>)}
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔧 Get a DFW HVAC Assessment</div>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>ProLnk matches you with vetted DFW HVAC pros who understand local heat conditions.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Schedule My HVAC Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
