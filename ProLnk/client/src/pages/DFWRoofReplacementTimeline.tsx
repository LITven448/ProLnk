import { useState } from 'react';

const phases = [
  {
    days: 'Day 1–3',
    title: 'Inspection & Estimate',
    icon: '🔍',
    steps: ['Licensed roofer inspects roof, attic, gutters, and flashing', 'Detailed written estimate provided (materials, labor, timeline)', 'Insurance claim filed if storm damage exists'],
    risks: ['Beware instant on-the-spot estimates with no documentation', 'Storm chasers push you to sign same day — always wait 24 hrs'],
    color: '#3B82F6',
  },
  {
    days: 'Day 4–7',
    title: 'Insurance Approval',
    icon: '📋',
    steps: ['Insurance adjuster schedules and completes inspection', 'Adjuster\’s estimate issued — compare with your roofer\’s', 'Negotiate discrepancies; roofer submits supplemental if needed'],
    risks: ['Can extend 10+ days if adjuster is backed up post-storm', 'First offer is rarely the final offer — always push back'],
    color: '#8B5CF6',
  },
  {
    days: 'Day 8–14',
    title: 'Material Order & Permit',
    icon: '📦',
    steps: ['Roofer orders shingles, underlayment, and accessories', 'Building permit pulled from your city (DFW cities vary)', 'HOA approval if required (some DFW HOAs mandate specific colors)'],
    risks: ['Material shortages post-hailstorm can push this to 3+ weeks', 'Skipped permits = resale problems and warranty voids'],
    color: '#F59E0B',
  },
  {
    days: 'Day 15–21',
    title: 'Installation (1–3 Days)',
    icon: '🏗️',
    steps: ['Existing shingles torn off and decking inspected', 'Damaged decking replaced (additional cost if extensive)', 'Ice & water shield, underlayment, then shingles installed', 'Ridge caps, flashing, and ventilation completed'],
    risks: ['Rain delay adds 3–7 days — DFW weather is unpredictable', 'Rushed crew = improper nail patterns = voided manufacturer warranty'],
    color: '#10B981',
  },
  {
    days: 'Day 22',
    title: 'Final Inspection & Cleanup',
    icon: '✅',
    steps: ['City inspector signs off on permit (required in most DFW cities)', 'Roofer does final walkthrough with homeowner', 'Magnetic nail sweep of yard and driveway', 'Final invoice + warranty documents delivered'],
    risks: ['Skip the city inspection and permit goes unresolved on record', 'No written warranty = no recourse if leaks appear in 6 months'],
    color: '#F5E642',
  },
];

export default function DFWRoofReplacementTimeline() {
  const [startDate, setStartDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [activePhase, setActivePhase] = useState<number>(0);

  const addDays = (base: string, days: number) => {
    const d = new Date(base);
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const milestones = [
    { label: 'Inspection', day: 1 },
    { label: 'Insurance Approval', day: 4 },
    { label: 'Materials Ordered', day: 8 },
    { label: 'Installation Begins', day: 15 },
    { label: 'Project Complete', day: 22 },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
          What to Expect: DFW Roof Replacement Timeline
        </h1>
        <p style={{ color: '#9AA3B4', fontSize: 16, marginBottom: 32 }}>
          A week-by-week breakdown of the full replacement process — from first call to final inspection. Know what's coming so you aren't surprised.
        </p>

        <div style={{ background: '#111E33', borderRadius: 16, padding: 24, marginBottom: 28 }}>
          <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>📅 Project Milestone Calendar</h3>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#6B7A99', display: 'block', marginBottom: 6 }}>Project Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              style={{ padding: '10px 14px', background: '#0A1628', border: '1px solid #1E2D45', borderRadius: 8, color: '#fff', fontSize: 15 }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {milestones.map(m => (
              <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0A1628', borderRadius: 8, padding: '10px 16px' }}>
                <span style={{ color: '#C5CAD8', fontWeight: 600 }}>📌 {m.label}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{addDays(startDate, m.day)}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {phases.map((p, i) => (
            <button key={i} onClick={() => setActivePhase(i)} style={{
              padding: '8px 14px', borderRadius: 8, border: `2px solid ${activePhase === i ? p.color : '#1E2D45'}`,
              background: activePhase === i ? p.color : '#111E33',
              color: activePhase === i ? '#0A1628' : '#9AA3B4', fontWeight: 700, fontSize: 13, cursor: 'pointer',
            }}>{p.days}</button>
          ))}
        </div>

        <div style={{ background: '#111E33', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>{phases[activePhase].icon}</span>
            <div>
              <div style={{ fontSize: 13, color: phases[activePhase].color, fontWeight: 600 }}>{phases[activePhase].days}</div>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 20, margin: 0 }}>{phases[activePhase].title}</h3>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            {phases[activePhase].steps.map(s => (
              <div key={s} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                <span style={{ color: '#4ADE80', marginTop: 2 }}>✓</span>
                <span style={{ color: '#C5CAD8', lineHeight: 1.5 }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#2A1A0D', border: '1px solid #5C3A1A', borderRadius: 10, padding: '12px 16px' }}>
            <div style={{ color: '#FBBF24', fontWeight: 700, marginBottom: 6 }}>⚠️ What Can Go Wrong</div>
            {phases[activePhase].risks.map(r => (
              <div key={r} style={{ color: '#C5CAD8', fontSize: 14, marginBottom: 4 }}>• {r}</div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 28, padding: '16px 20px', background: '#111E33', borderRadius: 12, borderLeft: '4px solid #F5E642' }}>
          <strong style={{ color: '#F5E642' }}>DFW Reality Check:</strong>
          <span style={{ color: '#9AA3B4', marginLeft: 8 }}>After a major hailstorm, DFW roofers book out 4–8 weeks. Start the process immediately while maintaining the right to review any contractor you choose.
          </span>
        </div>
      </div>
    </div>
  );
}
