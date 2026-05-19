import { useState } from 'react';

type NeedType =
  | 'Foundation & Drainage'
  | 'Roof & Exterior'
  | 'HVAC & Energy'
  | 'Plumbing & Water'
  | 'Electrical & Safety'
  | 'Concrete & Hardscape'
  | 'Landscaping & Trees'
  | 'DIY vs Pro'
  | 'Permits & Code'
  | 'Emergency Response';

const RESOURCES: Record<NeedType, { count: string; tools: string[]; highlight: string }> = {
  'Foundation & Drainage': {
    count: '340+ guides',
    tools: ['Foundation crack severity checker', 'Drainage grade calculator', 'Clay soil expansion risk map', 'Pier repair cost estimator', 'Slab vs pier-and-beam guide'],
    highlight: 'Most-used resource for DFW homeowners — clay soil impacts every property',
  },
  'Roof & Exterior': {
    count: '290+ guides',
    tools: ['Hail damage photo guide', 'Roof age & replacement calculator', 'Fascia & soffit inspection checklist', 'Storm damage documentation tool', 'DFW roofing permit guide'],
    highlight: 'DFW averages 4+ major hail events per year — roof resources are critical',
  },
  'HVAC & Energy': {
    count: '270+ guides',
    tools: ['AC sizing calculator for DFW summers', 'Energy efficiency audit checklist', 'Heat pump vs AC comparison tool', 'Attic insulation R-value guide', 'HVAC filter schedule builder'],
    highlight: 'DFW cooling season runs March–November — HVAC is the biggest utility cost',
  },
  'Plumbing & Water': {
    count: '220+ guides',
    tools: ['Water pressure test guide', 'Freeze pipe risk checker', 'Water heater sizing calculator', 'Slab leak detection guide', 'DFW water quality report finder'],
    highlight: 'DFW hard water and freeze events create unique plumbing risks',
  },
  'Electrical & Safety': {
    count: '180+ guides',
    tools: ['Panel capacity calculator', 'EV charger installation guide', 'Smoke detector placement map', 'GFCI requirement checker', 'Generator sizing calculator'],
    highlight: 'ERCOT grid instability makes backup power and surge protection essential',
  },
  'Concrete & Hardscape': {
    count: '160+ guides',
    tools: ['PSI guide for DFW surfaces', 'DIY concrete feasibility checker', 'Curb & gutter responsibility guide', 'Driveway crack assessment tool', 'Expansion joint spacing calculator'],
    highlight: 'DFW clay soil movement is the #1 cause of concrete damage',
  },
  'Landscaping & Trees': {
    count: '210+ guides',
    tools: ['DFW drought-tolerant plant finder', 'Tree root vs foundation risk checker', 'Irrigation schedule builder', 'Oak wilt spread risk map', 'Grass type guide for DFW zones'],
    highlight: 'Tree roots + clay soil + drought cycles = the DFW landscaping triangle',
  },
  'DIY vs Pro': {
    count: '400+ comparisons',
    tools: ['Project feasibility calculator', 'Permit requirement checker', 'Cost comparison tool', 'Skill level assessment', 'When to stop and call a pro guide'],
    highlight: 'The most-searched resource category on ProLnk — homeowners want clarity before starting',
  },
  'Permits & Code': {
    count: '150+ city-specific guides',
    tools: ['DFW permit requirement finder by city', 'Project permit cost estimator', 'Inspection scheduling guide', 'Code violation risk checker', 'Permit vs no-permit impact on home sale'],
    highlight: 'Covers all 15 major DFW cities — permit rules vary significantly',
  },
  'Emergency Response': {
    count: '120+ emergency guides',
    tools: ['Gas leak response checklist', 'Burst pipe emergency steps', 'Post-storm damage triage', 'Power outage home protection', 'Who to call first guide'],
    highlight: 'Available offline — save these pages before DFW storm season',
  },
};

export default function DFWHomeResourceFinal() {
  const [need, setNeed] = useState<NeedType | ''>('');
  const [situation, setSituation] = useState('');
  const result = need ? RESOURCES[need] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📚</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Home Resource Library</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>2,600+ guides, calculators, and checklists built for North Texas homeowners</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[['2,600+', 'Total Resources'], ['15', 'DFW Cities Covered'], ['47', 'Expert Contributors']].map(([num, label]) => (
            <div key={label} style={{ background: '#1e2d47', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: '1.6rem', fontWeight: 700 }}>{num}</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔍 Find Your Resources</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.875rem' }}>What Do You Need?</label>
              <select value={need} onChange={e => setNeed(e.target.value as NeedType)}
                style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem' }}>
                <option value=''>Select category...</option>
                {(Object.keys(RESOURCES) as NeedType[]).map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.875rem' }}>DFW Situation (optional)</label>
              <input value={situation} onChange={e => setSituation(e.target.value)} placeholder='e.g. after storm, buying a home...'
                style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem', boxSizing: 'border-box' }} />
            </div>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem' }}>{need}</span>
                <span style={{ background: '#1e2d47', color: '#F5E642', padding: '0.25rem 0.75rem', borderRadius: 99, fontSize: '0.8rem' }}>{result.count}</span>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '0.5rem' }}>TOP TOOLS IN THIS CATEGORY</div>
                {result.tools.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                    <span style={{ color: '#F5E642′ }}>→</span> {t}
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #1e2d47', paddingTop: '0.75rem' }}>
                <span style={{ color: '#F5E642′ }}>⭐ </span>
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{result.highlight}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🏆 All Categories at a Glance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {(Object.entries(RESOURCES) as [NeedType, typeof RESOURCES[NeedType]][]).map(([k, v]) => (
              <div key={k} onClick={() => setNeed(k)}
                style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', border: need === k ? '1px solid #F5E642′ : '1px solid transparent' }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{k}</div>
                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{v.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', background: '#1e2d47', borderRadius: 12 }}>
          <p style={{ color: '#94a3b8', marginBottom: '0.75rem' }}>All resources are free. Get matched with a DFW pro when you need one.</p>
          <a href='/' style={{ background: '#F5E642', color: '#0A1628', padding: '0.75rem 2rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>Join ProLnk — Free for Homeowners →</a>
        </div>
      </div>
    </div>
  );
}
