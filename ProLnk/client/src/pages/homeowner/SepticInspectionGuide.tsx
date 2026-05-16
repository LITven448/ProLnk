import { useState } from 'react';

const DUE_DILIGENCE_STEPS = [
  { id: 'records', label: 'Request all septic records from seller', detail: 'Pumping history, inspection reports, any repairs or system modifications. Red flag if no records exist.' },
  { id: 'age', label: 'Determine system age and type', detail: 'Conventional drain field, aerobic spray system, mound system — each has different lifespan and maintenance requirements.' },
  { id: 'inspector', label: 'Hire licensed septic inspector before option expires', detail: 'Inspector must be TCEQ-licensed. Schedule early — good inspectors book out 1-2 weeks.' },
  { id: 'camera', label: 'Add camera inspection of inlet/outlet pipes', detail: 'Basic inspections miss pipe damage. Camera adds $150-200 but reveals root intrusion, cracks, bellying.' },
  { id: 'pump', label: 'Pump tank during inspection', detail: 'Pumping during inspection allows visual assessment of tank walls, inlet/outlet baffles, and baffle condition.' },
  { id: 'perc', label: 'Verify drain field is functional', detail: 'Inspector should probe field for saturation, check effluent distribution, look for surfacing sewage.' },
  { id: 'county', label: 'Check county permit records', detail: 'Verify system was permitted and installed legally. Unpermitted systems may require removal at buyer expense.' },
  { id: 'aerobic', label: 'If aerobic system — verify maintenance contract', detail: 'Texas requires licensed maintenance contracts for aerobic systems. Verify it is transferable and current.' },
  { id: 'negotiate', label: 'Use inspection results to negotiate', detail: 'Failed inspection: request seller repair, credit, or price reduction. Never waive this — replacement costs $8K-25K.' },
  { id: 'insurance', label: 'Verify homeowners insurance covers septic', detail: 'Many policies exclude septic. Add endorsement or separate rider. Aerobic systems especially need coverage.' },
];

export default function SepticInspectionGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  function toggle(id: string) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  const completedCount = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((completedCount / DUE_DILIGENCE_STEPS.length) * 100);

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '48px 24px' }}>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: '#60a5fa', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            🏡 HOME INSPECTION GUIDE
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.15, margin: '0 0 20px', color: '#f8fafc' }}>
            Septic System Inspection Guide
          </h1>
          <p style={{ fontSize: 19, color: '#94a3b8', lineHeight: 1.7, maxWidth: 720 }}>
            Buying or Selling a Rural DFW Home
          </p>
        </div>

        {/* Who needs this */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 28, marginBottom: 32, borderLeft: '4px solid #60a5fa' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f8fafc', margin: '0 0 12px' }}>👥 Who Needs This Guide</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            About <strong style={{ color: '#60a5fa' }}>15% of DFW homes</strong> use septic systems — primarily in outer suburbs and rural areas including Celina, 
            Forney, Kaufman County, parts of Rockwall, Wise County, and unincorporated areas throughout the Metroplex. 
            If you are buying or selling in these areas, septic inspection is critical — not optional.
          </p>
        </div>

        {/* When critical */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f8fafc', margin: '0 0 20px' }}>⏰ When Septic Inspection Is Critical</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 40 }}>
          {[
            { icon: '🏠', label: 'Before Buying', desc: 'Before purchasing any home on septic — without exception.' },
            { icon: '🏷️', label: 'Before Selling', desc: 'Many buyers require it. Getting ahead prevents last-minute deal issues.' },
            { icon: '📅', label: 'Every 3-5 Years', desc: 'Ongoing maintenance inspection catches problems before failure.' },
            { icon: '🌍', label: 'Buying Raw Land', desc: 'Perc test required before building. Failed perc = unbuildable lot.' },
          ].map(w => (
            <div key={w.label} style={{ background: '#1e293b', borderRadius: 12, padding: 22, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{w.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#f8fafc', marginBottom: 6 }}>{w.label}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.55 }}>{w.desc}</div>
            </div>
          ))}
        </div>

        {/* What inspection covers */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', margin: '0 0 20px' }}>🔍 What a Septic Inspection Covers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {[
              { item: 'Tank condition and capacity', note: 'Concrete, fiberglass, or poly — age and structural integrity evaluated' },
              { item: 'Distribution box (D-box) function', note: 'Ensures equal effluent flow to all drain field laterals' },
              { item: 'Drain field percolation rate', note: 'Soil absorption — saturated field = system at or near failure' },
              { item: 'Inlet/outlet baffles', note: 'Prevent solids from entering drain field — critical component' },
              { item: 'Effluent level in tank', note: 'High level relative to inlet = sign of drain field issues' },
            ].map(c => (
              <div key={c.item} style={{ background: '#0f172a', borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f8fafc', marginBottom: 6 }}>• {c.item}</div>
                <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.55 }}>{c.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Red flags */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32, borderLeft: '4px solid #ef4444' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', margin: '0 0 20px' }}>🚨 Red Flags That Mean Immediate Replacement</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Sewage odor in yard or inside the home',
              'Wet spots or unusually lush green areas above drain field without recent rain',
              'Slow drains throughout the entire home (not just one fixture)',
              'Tank is 25+ years old with no pumping records or maintenance history',
              'Surfacing sewage visible in yard — biohazard, requires immediate remediation',
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', background: '#0f172a', borderRadius: 8 }}>
                <span style={{ color: '#ef4444', fontSize: 18, flexShrink: 0 }}>⚠️</span>
                <span style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.55 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost guide */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f8fafc', margin: '0 0 20px' }}>💰 Cost Guide</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 40 }}>
          {[
            { service: 'Basic Inspection', cost: '$150–350', note: 'Visual + probing, no pump-out' },
            { service: 'Inspection + Camera', cost: '$300–600', note: 'Camera on inlet/outlet pipes' },
            { service: 'Pump During Inspection', cost: 'Add $200–400', note: 'Best practice for buying' },
            { service: 'Aerobic System Service', cost: '$75–150/visit', note: 'Quarterly maintenance required by TX law' },
            { service: 'Full Replacement — Conventional', cost: '$8,000–14,000', note: 'Standard drain field system' },
            { service: 'Full Replacement — Aerobic', cost: '$12,000–25,000', note: 'Higher cost, required in some soils' },
          ].map(c => (
            <div key={c.service} style={{ background: '#1e293b', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>{c.service}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#60a5fa', marginBottom: 6 }}>{c.cost}</div>
              <div style={{ fontSize: 12, color: '#475569' }}>{c.note}</div>
            </div>
          ))}
        </div>

        {/* Buyer warning */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 28, marginBottom: 32, borderLeft: '4px solid #f59e0b' }}>
          <div style={{ fontSize: 20, marginBottom: 10 }}>⚠️</div>
          <p style={{ color: '#fbbf24', fontWeight: 700, fontSize: 16, margin: '0 0 8px' }}>Buying a Home on Septic</p>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            Get the inspection <strong style={{ color: '#fbbf24' }}>BEFORE your option period expires</strong>. A failed septic system is a complete 
            deal-killer — the cost to replace ($8K–25K) is substantial, and sellers are rarely willing to absorb it fully. 
            Never waive the septic inspection on an option-period purchase. It is the single most expensive surprise in rural DFW real estate.
          </p>
        </div>

        {/* TrustyPro note */}
        <div style={{ background: '#1e3a5f', border: '1px solid #3b82f6', borderRadius: 14, padding: 24, marginBottom: 40 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#60a5fa', marginBottom: 8 }}>🤖 TrustyPro AI Note</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.65, margin: 0 }}>
            TrustyPro AI scan can detect <em>surface signs</em> of septic failure — wet spots, stressed or unusually green vegetation, 
            odor-adjacent moisture patterns — but cannot inspect underground components. A physical inspection by a TCEQ-licensed inspector 
            is always required before purchase. Use AI scan as an early screening tool, not a replacement.
          </p>
        </div>

        {/* Interactive checklist */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', margin: '0 0 8px' }}>✅ Pre-Purchase Septic Due Diligence Checklist</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 20px' }}>Check off each step as you complete it.</p>

          {/* Progress */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: '#94a3b8' }}>{completedCount} of {DUE_DILIGENCE_STEPS.length} steps completed</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: pct === 100 ? '#22c55e' : '#60a5fa' }}>{pct}%</span>
            </div>
            <div style={{ height: 6, background: '#0f172a', borderRadius: 999 }}>
              <div style={{ height: '100%', borderRadius: 999, background: pct === 100 ? '#22c55e' : '#3b82f6', width: `${pct}%`, transition: 'width 0.3s' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {DUE_DILIGENCE_STEPS.map(step => (
              <div
                key={step.id}
                onClick={() => toggle(step.id)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14, padding: 16,
                  background: checked[step.id] ? '#0d2a1a' : '#0f172a',
                  borderRadius: 10, cursor: 'pointer',
                  border: `1px solid ${checked[step.id] ? '#22c55e' : '#1e293b'}`,
                  transition: 'all 0.15s',
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked[step.id] ? '#22c55e' : '#334155'}`,
                  background: checked[step.id] ? '#22c55e' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
                }}>
                  {checked[step.id] && <span style={{ color: '#fff', fontSize: 13 }}>✓</span>}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: checked[step.id] ? '#4ade80' : '#f8fafc', marginBottom: 4 }}>{step.label}</div>
                  <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.55 }}>{step.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
