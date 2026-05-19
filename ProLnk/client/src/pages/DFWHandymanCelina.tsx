import { useState } from 'react';

const TASKS = [
  { label: 'New Construction Punch List (per item)', low: 75, high: 200 },
  { label: 'Door Adjustment / Alignment', low: 85, high: 175 },
  { label: 'Caulking & Weatherstripping (full home)', low: 250, high: 550 },
  { label: 'Drywall Patch & Paint', low: 150, high: 450 },
  { label: 'Fence / Gate Repair', low: 200, high: 600 },
  { label: 'Gutter Cleaning & Minor Repair', low: 125, high: 300 },
  { label: 'TV Mount + Cable Conceal', low: 150, high: 350 },
];

const PUNCH_LIST = [
  { id: 'doors', label: 'Doors that stick or won\’t latch properly' },
  { id: 'caulk', label: 'Missing caulk around tubs, windows, or trim' },
  { id: 'grout', label: 'Cracked or missing grout in tile' },
  { id: 'drywall', label: 'Drywall nail pops or settlement cracks' },
  { id: 'cabinet', label: 'Cabinet doors or drawers misaligned' },
  { id: 'exterior', label: 'Exterior gaps, trim separation, or siding issues' },
  { id: 'attic', label: 'Attic access cover improperly sealed' },
];

export default function DFWHandymanCelina() {
  const [taskIdx, setTaskIdx] = useState(0);
  const [taskCount, setTaskCount] = useState(3);
  const [punchList, setPunchList] = useState<Record<string, boolean>>({});

  const task = TASKS[taskIdx];
  const lowTotal = task.low * taskCount;
  const highTotal = task.high * taskCount;

  const togglePunch = (id: string) => setPunchList(prev => ({ ...prev, [id]: !prev[id] }));
  const punchCount = Object.values(punchList).filter(Boolean).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112244 100%)', padding: '60px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🔨</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '16px 0 12px', lineHeight: 1.2 }}>
          Celina TX Handyman Services
        </h1>
        <p style={{ fontSize: 20, color: '#F5E642', fontWeight: 700, margin: '0 0 16px' }}>
          Trusted Local Pros · New Build Specialists · No Job Too Small
        </p>
        <p style={{ fontSize: 16, color: '#aac', maxWidth: 620, margin: '0 auto 32px' }}>
          Celina is the fastest-growing city in the United States — and with thousands of new homes
          delivered every year, there's an enormous demand for handymen who understand new construction
          punch lists, builder warranty gaps, and ongoing maintenance for brand-new homes. ProLnk connects
          Celina homeowners to vetted local handymen who specialize in exactly that.
        </p>
        <a
          href="/signup"
          style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, padding: '16px 40px', borderRadius: 8, fontSize: 18, textDecoration: 'none', display: 'inline-block' }}
        >
          Join the Celina Waitlist — Free
        </a>
      </div>

      {/* City Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, padding: '40px 24px', maxWidth: 900, margin: '0 auto' }}>
        {[
          { icon: '🚀', label: 'Growth Rank', value: '#1 fastest-growing US city' },
          { icon: '🏗️', label: 'New Permits (2024)', value: '6,200+ homes started' },
          { icon: '📅', label: 'Builder Warranty', value: '1 yr workmanship only' },
          { icon: '🔧', label: 'Handyman Rate', value: '$65–$125/hr in Celina' },
        ].map(s => (
          <div key={s.label} style={{ background: '#112244', borderRadius: 10, padding: '20px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>{s.icon}</div>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, margin: '8px 0 4px', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Two-column: Calculator + Punch List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, padding: '0 24px 40px', maxWidth: 900, margin: '0 auto' }}>

        {/* Calculator */}
        <div style={{ background: '#112244', borderRadius: 14, padding: '28px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', margin: '0 0 20px' }}>
            💰 Job Cost Estimator
          </h2>

          <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>Task Type</label>
          <select
            value={taskIdx}
            onChange={e => setTaskIdx(Number(e.target.value))}
            style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334', fontSize: 14, marginBottom: 20 }}
          >
            {TASKS.map((t, i) => <option key={i} value={i}>{t.label}</option>)}
          </select>

          <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>Number of Tasks: {taskCount}</label>
          <input
            type="range" min={1} max={15} value={taskCount}
            onChange={e => setTaskCount(Number(e.target.value))}
            style={{ width: '100%', marginBottom: 24, accentColor: '#F5E642′ }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Low Estimate', value: `$${lowTotal.toLocaleString()}` },
              { label: 'High Estimate', value: `$${highTotal.toLocaleString()}` },
            ].map(s => (
              <div key={s.label} style={{ background: '#0A1628', borderRadius: 8, padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#aac', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontWeight: 800, color: '#F5E642', fontSize: 20 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* New Build Punch List */}
        <div style={{ background: '#112244', borderRadius: 14, padding: '28px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>
            📋 New Build Punch List
          </h2>
          <p style={{ fontSize: 13, color: '#aac', marginBottom: 20 }}>
            Common issues in Celina new builds. Check what your home needs.
          </p>

          {PUNCH_LIST.map(item => (
            <label
              key={item.id}
              onClick={() => togglePunch(item.id)}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12, cursor: 'pointer' }}
            >
              <div style={{
                width: 20, height: 20, borderRadius: 4, border: '2px solid #F5E642',
                background: punchList[item.id] ? '#F5E642′ : ’transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: 1,
              }}>
                {punchList[item.id] && <span style={{ color: '#0A1628', fontWeight: 900, fontSize: 13 }}>✓</span>}
              </div>
              <span style={{ fontSize: 14, lineHeight: 1.5 }}>{item.label}</span>
            </label>
          ))}

          {punchCount > 0 && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px', marginTop: 12, textAlign: 'center' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{punchCount} issue{punchCount !== 1 ? 's' : ''} flagged</span>
              <span style={{ color: '#aac', fontSize: 13 }}> — get quotes for all at once</span>
            </div>
          )}
        </div>
      </div>

      {/* Why Celina */}
      <div style={{ padding: '0 24px 48px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: 'center', marginBottom: 24 }}>
          The Celina Handyman Opportunity
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {[
            { icon: '📄', title: 'Warranty Gap Problem', desc: "Builder 1-year workmanship warranties expire fast — and issues like door misalignment, drywall cracks, and caulk failures often show up in year 2–3. Handymen fill this gap." },
            { icon: '🔧', title: 'Punch List Backlog', desc: "Builders rush to close homes. Punch lists from closing often have 10–40 unresolved items. Many homeowners give up chasing the builder and hire their own handyman." },
            { icon: '🏡', title: 'Ongoing Maintenance', desc: "New homeowners in Celina are often first-time buyers. They need help establishing maintenance routines — ProLnk matches them to a regular handyman they can trust." },
            { icon: '🌳', title: 'Outdoor & Fence Work', desc: "Celina's lots average 7,000–10,000 sq ft. Fence installation, gate repairs, and exterior caulking are top handyman requests in the area." },
          ].map(c => (
            <div key={c.title} style={{ background: '#112244', borderRadius: 10, padding: '20px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: '#F5E642′ }}>{c.title}</div>
              <div style={{ fontSize: 14, color: '#aac', lineHeight: 1.6 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: '#F5E642', padding: '48px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', margin: '0 0 12px' }}>
          Find a Trusted Celina Handyman — Free
        </h2>
        <p style={{ color: '#0A1628', fontSize: 16, maxWidth: 500, margin: '0 auto 28px' }}>
          ProLnk is launching in Celina. Join the waitlist and get matched to vetted handymen who know new construction and can tackle your punch list.
        </p>
        <a
          href="/signup"
          style={{ background: '#0A1628', color: '#F5E642', fontWeight: 800, padding: '16px 40px', borderRadius: 8, fontSize: 18, textDecoration: 'none', display: 'inline-block' }}
        >
          Join the Waitlist
        </a>
      </div>

      <div style={{ background: '#071020', padding: '20px', textAlign: 'center', fontSize: 13, color: '#556′ }}>
        © 2026 ProLnk · Serving Celina, TX and all of DFW · <a href="/privacy" style={{ color: '#556′ }}>Privacy</a>
      </div>
    </div>
  );
}
