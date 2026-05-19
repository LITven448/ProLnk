import { useState } from 'react';

const phases = [
  {
    group: 'Preparation Phase (2–4 Months Before Listing)',
    icon: '🏗️',
    color: '#7c3aed',
    bg: '#1a0e2e',
    border: '#7c3aed',
    months: -4,
    steps: [
      { when: 'Month -4', action: 'Decide to sell. Interview 3 agents. Get a professional home value estimate.' },
      { when: 'Month -3', action: 'Complete major repairs identified in your pre-listing inspection. Get a TrustyPro scan to document current condition.' },
      { when: 'Month -2', action: 'Deep clean, declutter, paint touch-ups, landscaping refresh. First impressions are made at the curb.' },
      { when: 'Month -1', action: 'Professional staging, photography, video tour. Agent finalizes list price based on current comps.' },
    ],
  },
  {
    group: 'Active Listing Phase (Days 1–30)',
    icon: '🏷️',
    color: '#1565c0',
    bg: '#0a1628',
    border: '#1565c0',
    months: 0,
    steps: [
      { when: 'Days 1–3', action: 'Listed on MLS + Zillow + Realtor. Expect 50–80% of all showings in the first week.' },
      { when: 'Days 3–7', action: 'Offers typically come in during week 1 in hot DFW markets. Multiple offers are common in spring.' },
      { when: 'Days 7–30', action: 'If no offer by day 10, evaluate immediately: price, condition, photos, staging. Don’t wait.' },
    ],
  },
  {
    group: 'Under Contract Phase (Days 30–60)',
    icon: '📝',
    color: '#059669',
    bg: '#041a10',
    border: '#059669',
    months: 1,
    steps: [
      { when: 'Days 1–10 (Option Period)', action: 'Buyer inspection and renegotiation. Most deals are renegotiated here. Be ready for repair requests or price adjustments.' },
      { when: 'Days 11–30', action: 'Appraisal ordered by buyer’s lender. Financing approval process. Keep home in show-ready condition.' },
      { when: 'Days 30–45', action: 'Final walkthrough by buyer. Closing documents prepared. Title company coordinates with both parties.' },
      { when: 'Days 45–60', action: 'Closing day. You receive proceeds by wire. Keys transfer. Transaction complete.' },
    ],
  },
];

const seasons = [
  { name: 'Spring (Mar–Jun)', icon: '🌸', label: 'Best', desc: 'Highest buyer demand. List before Memorial Day for maximum exposure. Competition is highest but so are prices.' },
  { name: 'Summer (Jul–Aug)', icon: '☀️', label: 'Good', desc: 'Slower but serious buyers only. Fewer showings but higher conversion rate. Less competition from other sellers.' },
  { name: 'Fall (Sep–Nov)', icon: '🍂', label: 'Good', desc: 'Second best season. Cool weather brings motivated buyers out. Good inventory window before holiday slowdown.' },
  { name: 'Winter (Dec–Feb)', icon: '❄️', label: 'Niche', desc: 'Lowest inventory = less competition. Buyers in winter are highly motivated (job relocation, etc.). Can be surprisingly good.' },
];

export default function DFWHomeSellingTimeline() {
  const [closeDate, setCloseDate] = useState('');
  const [timeline, setTimeline] = useState<{ label: string; date: string }[]>([]);

  function generateTimeline() {
    if (!closeDate) return;
    const close = new Date(closeDate);
    function addDays(d: Date, days: number) {
      const r = new Date(d);
      r.setDate(r.getDate() + days);
      return r.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    setTimeline([
      { label: '🔑 Closing Day (Target)', date: addDays(close, 0) },
      { label: '📋 Final Walkthrough', date: addDays(close, -3) },
      { label: '🏦 Appraisal Complete', date: addDays(close, -14) },
      { label: '🔍 Option Period Ends', date: addDays(close, -45) },
      { label: '📝 Go Under Contract', date: addDays(close, -55) },
      { label: '🏷️ Go Live on MLS', date: addDays(close, -65) },
      { label: '📸 Staging + Photography', date: addDays(close, -75) },
      { label: '🔧 Complete Repairs', date: addDays(close, -90) },
      { label: '🔎 Pre-Listing Inspection + TrustyPro Scan', date: addDays(close, -105) },
      { label: '🤝 Interview Agents', date: addDays(close, -120) },
    ]);
  }

  return (
    <div style={{ background: '#0a0f1e', minHeight: '100vh', color: '#e8eaf0', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1a0a30 0%, #4c1d95 50%, #0a0f1e 100%)', padding: '72px 24px 56px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏡</div>
        <h1 style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 800, margin: '0 0 16px', color: '#fff' }}>
          DFW Home Selling Timeline
        </h1>
        <p style={{ fontSize: 18, color: '#c4b5fd', maxWidth: 560, margin: '0 auto' }}>
          Week-by-Week Guide to Selling in the DFW Market
        </p>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 20px' }}>

        {/* Phases */}
        {phases.map(phase => (
          <section key={phase.group} style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: phase.color, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>{phase.icon}</span> {phase.group}
            </h2>
            <div style={{ background: phase.bg, border: `1px solid ${phase.border}`, borderRadius: 12, overflow: 'hidden' }}>
              {phase.steps.map((step, i) => (
                <div key={step.when} style={{ display: 'flex', gap: 16, padding: '16px 20px', borderBottom: i < phase.steps.length - 1 ? '1px solid #1e2d40' : 'none' }}>
                  <div style={{ minWidth: 110, fontSize: 12, fontWeight: 700, color: phase.color, paddingTop: 2 }}>{step.when}</div>
                  <div style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.6 }}>{step.action}</div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* DFW Timing by Season */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#a78bfa', marginBottom: 16 }}>🗓️ DFW Timing by Season</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
            {seasons.map(s => (
              <div key={s.name} style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: s.label === 'Best' ? '#4ade80' : s.label === 'Good' ? '#60a5fa' : '#fbbf24', marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TrustyPro CTA */}
        <section style={{ marginTop: 40 }}>
          <div style={{ background: '#111827', border: '2px solid #7c3aed', borderRadius: 12, padding: 24, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 36 }}>📡</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#a78bfa', fontSize: 17, marginBottom: 4 }}>Get a TrustyPro Scan Before You List</div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: 14, lineHeight: 1.5 }}>
                A TrustyPro AI scan documents your home's condition before the listing goes live — giving you leverage in the option period and proof of condition during appraisal disputes.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Calculator */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#a78bfa', marginBottom: 8 }}>📅 Reverse Timeline Calculator</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Enter your target close date — get a working-backward schedule for every milestone.</p>
          <div style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: 12, padding: 28 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: 20 }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>🎯 Target Closing Date</label>
                <input
                  type="date"
                  value={closeDate}
                  onChange={e => setCloseDate(e.target.value)}
                  style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 14, boxSizing: 'border-box' }}
                />
              </div>
              <button
                onClick={generateTimeline}
                style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}
              >
                Build My Timeline
              </button>
            </div>
            {timeline.length > 0 && (
              <div>
                {timeline.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1e2d40', flexWrap: 'wrap', gap: 8 }}>
                    <span style={{ fontSize: 14, color: '#e2e8f0' }}>{item.label}</span>
                    <span style={{ fontSize: 14, color: '#a78bfa', fontWeight: 600 }}>{item.date}</span>
                  </div>
                ))}
                <div style={{ marginTop: 20, background: '#1a0e2e', border: '1px solid #7c3aed', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 13, color: '#c4b5fd' }}>
                    💡 Start with a <strong>TrustyPro scan</strong> at Month -3 to document condition before repairs begin. This protects you during the option period.
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
