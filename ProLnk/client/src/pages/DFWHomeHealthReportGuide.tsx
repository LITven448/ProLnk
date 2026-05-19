import { useState } from 'react';

const reportSections = [
  { icon: '🏗️', category: 'Structural', items: ['Foundation movement / settlement cracks', 'Roof structure / deck / framing', 'Exterior walls, siding, brick veneer', 'Windows, doors, grading / drainage'] },
  { icon: '⚙️', category: 'Mechanical Systems', items: ['HVAC system age, efficiency, condition', 'Water heater age and performance', 'Plumbing supply and drain lines', 'Electrical panel, wiring, GFCI/AFCI'] },
  { icon: '🌿', category: 'Environmental', items: ['Mold and moisture indicators', 'Asbestos (pre-1980 materials)', 'Lead paint screening (pre-1978)', 'Radon, VOCs, carbon monoxide'] },
  { icon: '🔒', category: 'Safety', items: ['Smoke and CO detector coverage', 'Electrical hazards (double-taps, aluminum wiring)', 'Gas line condition', 'Stair/deck/railing safety'] },
  { icon: '💡', category: 'Efficiency', items: ['Insulation levels (attic, walls)', 'Window energy performance', 'Air sealing / infiltration', 'Solar readiness and orientation'] },
  { icon: '💧', category: 'Water & Drainage', items: ['Roof drainage, gutters, downspouts', 'Foundation grading and drainage', 'Interior moisture / crawl space', 'Sump pump if applicable'] },
];

const timing = [
  { trigger: 'Before Purchase', priority: '🔴 Essential', reason: 'Standard contingency item. Full report before you waive inspection period.' },
  { trigger: 'Every 5 Years', priority: '🟡 Recommended', reason: 'Systems age. 5-year cadence catches deferred maintenance before it becomes expensive.' },
  { trigger: 'After Major Storm', priority: '🔴 Urgent', reason: 'DFW hail, straight-line winds, and tornado events cause hidden damage that worsens over time.' },
  { trigger: 'Before Major Renovation', priority: '🟡 Recommended', reason: 'Discover issues (knob-and-tube wiring, asbestos) before opening walls.' },
  { trigger: 'Aging Home (25+ years)', priority: '🟡 Recommended', reason: 'Proactive assessment of systems approaching end-of-life.' },
  { trigger: 'After Flooding', priority: '🔴 Urgent', reason: 'Moisture intrusion, foundation movement, mold risk require immediate assessment.' },
];

const concerns = [
  { id: 'foundation', label: '🏠 Foundation / Cracks' },
  { id: 'roof', label: '🏚️ Roof Age / Hail' },
  { id: 'mold', label: '🍄 Mold / Moisture' },
  { id: 'hvac', label: '❄️ HVAC Age' },
  { id: 'electrical', label: '⚡ Electrical' },
  { id: 'environmental', label: '🌿 Environmental' },
];

export default function DFWHomeHealthReportGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleConcern = (id: string) => {
    setSelectedConcerns(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const getChecklist = () => {
    const items: { priority: string; item: string; note: string }[] = [];

    if (homeAge === 'pre1978') {
      items.push({ priority: '🔴 Priority', item: 'Lead Paint & Asbestos Screening', note: 'Pre-1978 homes require EPA-certified testing. Lead paint common in trim, windows. Asbestos in floor tiles, insulation, HVAC duct tape.' });
    }
    if (homeAge === 'pre1990′ || homeAge === ’pre1978') {
      items.push({ priority: '🔴 Priority', item: 'Electrical Panel & Wiring', note: 'Federal Pacific and Zinsco panels common in DFW homes through 1990s — known fire hazards. Aluminum wiring on 15/20A circuits also an issue.' });
    }
    if (selectedConcerns.includes('foundation')) {
      items.push({ priority: '🔴 Priority', item: 'Structural / Foundation Assessment', note: 'DFW clay movement causes settlement. Look for stair-step cracks in brick, doors/windows that stick, sloping floors.' });
    }
    if (selectedConcerns.includes('roof')) {
      items.push({ priority: '🔴 Priority', item: 'Roof & Hail Damage Inspection', note: 'DFW averages 1–3 hail events annually. Granule loss and soft spots may qualify for insurance claim — document before filing.' });
    }
    if (selectedConcerns.includes('mold')) {
      items.push({ priority: '🟡 Elevated', item: 'Mold & Moisture Survey', note: 'HVAC duct leaks and DFW humidity swings create ideal mold conditions. Thermal imaging finds hidden moisture.' });
    }
    if (selectedConcerns.includes('environmental')) {
      items.push({ priority: '🟡 Elevated', item: 'Environmental Panel (VOC, CO, Radon)', note: 'New construction and renovated homes in DFW commonly show elevated VOCs and formaldehyde for 2–3 years.' });
    }
    items.push({ priority: '🟢 Standard', item: 'Full Systems Inspection (HVAC, Plumbing, Electrical)', note: 'Comprehensive mechanical review included in standard home health report.' });
    items.push({ priority: '🟢 Standard', item: 'TrustyPro Visual Scan', note: 'AI-powered visual assessment identifies structural, mechanical, and safety concerns from photo documentation — faster than traditional inspection for initial screening.' });
    return items;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Health</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0', lineHeight: 1.2 }}>📋 Comprehensive Home Health Report Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>A full home health assessment goes beyond a standard inspection — it covers structure, environmental health, safety, and efficiency. Here's what it includes, when to get one, and what it costs.</p>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>📂 What a Full Health Report Covers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {reportSections.map((s, i) => (
            <div key={i} style={{ background: '#0f2340', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>{s.category}</div>
              {s.items.map((item, j) => <div key={j} style={{ color: '#94a3b8', fontSize: '0.825rem', marginBottom: 3 }}>• {item}</div>)}
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>📅 When to Get a Home Health Report</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2.5rem' }}>
          {timing.map((t, i) => (
            <div key={i} style={{ background: '#0f2340', borderRadius: 8, padding: '0.875rem 1rem', border: '1px solid #1e3a5f', display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <span style={{ minWidth: 80, fontWeight: 700 }}>{t.priority}</span>
              <span style={{ fontWeight: 600, minWidth: 160 }}>{t.trigger}</span>
              <span style={{ color: '#94a3b8', fontSize: '0.875rem', flex: 1 }}>{t.reason}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2340', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5E642', marginBottom: '1.25rem' }}>🏠 Build Your Home Health Checklist</h2>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 6 }}>HOME AGE</label>
            <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: 260, background: '#0A1628', border: '1px solid #1e3a5f', color: '#fff', borderRadius: 6, padding: '0.5rem' }}>
              <option value=''>Select...</option>
              <option value='pre1978'>Before 1978</option>
              <option value='pre1990'>1978 – 1990</option>
              <option value='1990to2005'>1990 – 2005</option>
              <option value='post2005'>After 2005</option>
            </select>
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 8 }}>CONCERNS (select all that apply)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {concerns.map(c => (
                <button key={c.id} onClick={() => toggleConcern(c.id)} style={{ padding: '0.4rem 0.9rem', borderRadius: 20, border: '1px solid', borderColor: selectedConcerns.includes(c.id) ? '#F5E642′ : '#1e3a5f', background: selectedConcerns.includes(c.id) ? '#F5E642' : ’transparent', color: selectedConcerns.includes(c.id) ? '#0A1628′ : '#fff', cursor: ’pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResults(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' }}>
            Build My Checklist →
          </button>
          {showResults && (
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {getChecklist().map((item, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.875rem 1rem', border: '1px solid #1e3a5f' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: 4, flexWrap: 'wrap' }}>
                    <span>{item.priority}</span>
                    <span style={{ fontWeight: 700, color: '#e2e8f0′ }}>{item.item}</span>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{item.note}</div>
                </div>
              ))}
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.875rem 1rem', border: '1px solid #F5E642', marginTop: 4 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>💰 Estimated Cost</div>
                <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>Standard home inspection: $350–$500 | Full home health report with environmental: $600–$900 | TrustyPro visual scan: Free with platform enrollment</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2340', borderRadius: 10, padding: '1rem 1.25rem', border: '1px solid #1e3a5f', color: '#94a3b8', fontSize: '0.875rem' }}>
          💡 TrustyPro's AI visual scan is not a replacement for a licensed inspection but serves as a fast, low-cost first screen to identify priority areas before scheduling a full professional assessment.
        </div>
      </div>
    </div>
  );
}
