import { useState } from 'react';

const homeStages = [
  {
    id: 'pre_pour', label: 'Before Pour', icon: '🏗️',
    items: [
      'Verify soil compaction report — DFW clay requires 95%+ Proctor density',
      'Confirm PT cable layout matches engineer drawing — check cable count and spacing',
      'Ensure proper moisture barrier under slab — DFW clay holds water, vapor barrier critical',
      'Photograph entire slab area before pour — your only pre-pour documentation',
    ],
    warning: 'DFW expansive clay (PI 40-60+) must be pre-treated or moisture conditioned before pour'
  },
  {
    id: 'post_pour', label: 'Post-Pour (0-30 days)', icon: '⏱️',
    items: [
      'PT cables stressed at 3-10 days — verify stressing pockets are grouted after completion',
      'Curing compound applied evenly — prevents DFW summer heat from drying slab too fast',
      'Initial crack monitoring — plastic shrinkage cracks normal, structural cracks are not',
      'No heavy equipment on slab for minimum 28 days (full cure)',
    ],
    warning: 'DFW summer pours (100°F+) require ice water mixing and shading — ask builder about hot-weather protocol'
  },
  {
    id: 'first_year', label: 'Year 1 Monitoring', icon: '📅',
    items: [
      'Photograph all interior door frames at move-in — settling makes doors sticky within 90 days',
      'Establish elevation benchmarks at 6 key points inside home',
      'Note any cracks in drywall, especially diagonal cracks near door corners',
      'Maintain consistent soil moisture around perimeter — DFW drought cycles cause most new-home issues',
    ],
    warning: 'Most DFW builder warranty claims arise in months 8-14 as soil stabilizes — document everything'
  },
  {
    id: 'warranty', label: 'Builder Warranty', icon: '📋',
    items: [
      '1-year workmanship warranty: covers all defects in labor and materials',
      '2-year systems warranty: plumbing, HVAC, electrical inside walls',
      '10-year structural warranty: foundation, load-bearing walls, roof framing',
      'Document every issue in writing — verbal reports often excluded from warranty coverage',
    ],
    warning: 'Texas Residential Construction Liability Act (RCLA) governs disputes — homeowner must give 60-day notice before suing'
  },
];

export default function DFWFoundationNewConstruction2026() {
  const [stage, setStage] = useState('pre_pour');
  const current = homeStages.find(s => s.id === stage)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW New Construction Foundation Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>What to watch for in new DFW construction — from pour to 10-year warranty</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
          {homeStages.map(s => (
            <div key={s.id} onClick={() => setStage(s.id)}
              style={{ background: stage===s.id?'#1a2a4a':'#111d33', border:`2px solid ${stage===s.id?'#F5E642':'#1e3a5f'}`, borderRadius:10, padding:'14px', cursor:'pointer', textAlign:'center' }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div style={{ color: stage===s.id?'#F5E642':'#cbd5e1', fontWeight: 600, fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d33', borderRadius: 12, padding: 20, marginBottom: 20, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>{current.icon} {current.label}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {current.items.map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: '#4ade80', fontSize: 16, minWidth: 20 }}>✓</span>
                <span style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#2d1515', borderRadius: 12, padding: 16, marginBottom: 20, border: '1px solid #ef4444' }}>
          <div style={{ color: '#ef4444', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>⚠️ DFW-SPECIFIC WARNING</div>
          <p style={{ color: '#cbd5e1', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{current.warning}</p>
        </div>

        <div style={{ background: '#111d33', borderRadius: 12, padding: 18, border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>📊 DFW New Construction Foundation Stats</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              {v:'>70%',l:'DFW new homes use PT slab'},
              {v:'3-5 yrs',l:'Normal initial settling period'},
              {v:'60 days',l:'RCLA notice before lawsuit'},
              {v:'10 years',l:'Structural warranty duration'},
            ].map(s => (
              <div key={s.l} style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>{s.v}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, color: '#475569', fontSize: 12 }}>
          ProLnk DFW Homeowner Resource · Dallas-Fort Worth · 2026
        </div>
      </div>
    </div>
  );
}
