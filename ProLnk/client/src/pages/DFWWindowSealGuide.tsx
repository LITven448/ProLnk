import { useState } from 'react';

const windowCounts = ['1–5 windows', '6–10 windows', '11–20 windows', '21+ windows'];
const windowAges = ['Under 5 years', '5–10 years', '10–20 years', '20+ years'];
const observedIssues = ['No visible issues', 'Peeling paint / staining near windows', 'Drafts or visible gaps', 'Water intrusion during storms'];

type ChecklistResult = { items: string[]; repairCost: string; urgency: string; urgencyColor: string };
const results: { [key: string]: ChecklistResult } = {
  'No visible issues|Under 5 years': { urgency: 'Preventive', urgencyColor: '#22C55E', items: ['Inspect exterior caulk bead continuity at all four sides of each window', 'Verify head flashing extends past window frame on each side', 'Check interior sill for moisture staining even if walls look dry', 'Ensure grading slopes away from walls below windows'], repairCost: '$0–$300 (DIY caulk touch-up)' },
  'No visible issues|5–10 years': { urgency: 'Moderate Priority', urgencyColor: '#EAB308', items: ['Re-caulk all windows with polyurethane sealant — original caulk likely UV-degraded in DFW', 'Check for micro-cracks in sealant by pressing along bead — cracking indicates failure', 'Inspect head flashing and Z-flashing above windows for proper lap', 'Run water test: hose window from below during inspection'], repairCost: '$400–$1,200 (professional re-caulk)' },
  'Peeling paint / staining near windows|10–20 years': { urgency: 'High Priority', urgencyColor: '#EF4444', items: ['Water intrusion is active — identify entry point before painting over', 'Remove and inspect window trim for rot — DFW moisture causes rapid deterioration once started', 'Install pan flashing in window rough opening if not present', 'Re-bed window in silicone at frame perimeter after repairs'], repairCost: '$800–$3,000 (trim repair + re-flash + caulk)' },
  'Drafts or visible gaps|10–20 years': { urgency: 'High Priority', urgencyColor: '#EF4444', items: ['Remove exterior trim and inspect for missing or failed backer rod', 'Install 3/8-inch closed-cell backer rod in all gaps before caulking — critical for DFW movement', 'Apply polyurethane caulk in two-point adhesion (backer rod prevents three-point failure)', 'Check window flange integration with house wrap or building paper'], repairCost: '$600–$2,500 (per window section or full re-seal)' },
  'Water intrusion during storms|20+ years': { urgency: 'Critical', urgencyColor: '#DC2626', items: ['Do not wait — water intrusion during DFW storms indicates complete seal failure', 'Inspect for interior mold behind drywall near window corners immediately', 'Assess window unit itself — older frames may have failed glazing compound or broken seals', 'Consider full window replacement if frames are wood and showing rot', 'Temporary: apply clear polyurethane caulk over any visible gaps as emergency measure'], repairCost: '$1,500–$8,000+ (depends on damage extent and replacement)' },
};

const getResult = (issues: string, age: string): ChecklistResult => {
  const key = `${issues}|${age}`;
  return results[key] || results['No visible issues|5–10 years'];
};

export default function DFWWindowSealGuide() {
  const [windowCount, setWindowCount] = useState('');
  const [windowAge, setWindowAge] = useState('');
  const [issues, setIssues] = useState('');
  const result = windowAge && issues ? getResult(issues, windowAge) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0D1E35', borderBottom: '3px solid #F5E642', padding: '32px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>DFW HOME SERVICES GUIDE · 2026</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px', lineHeight: 1.2 }}>🪟 Window Seal & Waterproofing Guide for DFW</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0, lineHeight: 1.6 }}>DFW thunderstorms drive rain sideways at 40–60 mph — angles that standard window installations were never designed to handle. Even small caulk failures let gallons of water into your walls during a single storm. Window sealing is one of the most overlooked waterproofing issues in DFW homes.</p>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[{ label: '🪟 Window Count', val: windowCount, set: setWindowCount, opts: windowCounts }, { label: '📅 Window Age', val: windowAge, set: setWindowAge, opts: windowAges }, { label: '🔍 Observed Issues', val: issues, set: setIssues, opts: observedIssues }].map(({ label, val, set, opts }) => (
            <div key={label}>
              <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>{label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {opts.map(o => (
                  <button key={o} onClick={() => set(o)} style={{ background: val === o ? '#F5E642′ : '#1A2D4A', color: val === o ? '#0A1628' : '#E8EDF5', border: ’none', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', fontWeight: val === o ? 700 : 400, fontSize: 13, textAlign: 'left', transition: 'all 0.15s' }}>{o}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {result ? (
          <div style={{ background: '#1A2D4A', borderRadius: 12, padding: 28, borderLeft: `4px solid ${result.urgencyColor}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ background: result.urgencyColor, color: '#FFFFFF', fontWeight: 800, fontSize: 12, padding: '4px 14px', borderRadius: 20 }}>{result.urgency.toUpperCase()}</span>
              <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 16 }}>{result.repairCost}</span>
            </div>
            <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>INSPECTION CHECKLIST</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {result.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginTop: 1 }}>✓</span>
                  <span style={{ color: '#E8EDF5', fontSize: 14, lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ background: '#1A2D4A', borderRadius: 12, padding: 28, textAlign: 'center', color: '#94A3B8′ }}>Select window age and observed issues to get your seal inspection checklist and repair cost estimate.</div>
        )}
        {windowCount && (
          <div style={{ background: '#1A2D4A', borderRadius: 10, padding: '16px 20px', marginTop: 16 }}>
            <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>PROJECT SCOPE ESTIMATE</div>
            <div style={{ color: '#FFFFFF', fontSize: 15 }}>With <span style={{ color: '#F5E642', fontWeight: 700 }}>{windowCount}</span>, a full professional re-caulk takes approximately <span style={{ color: '#F5E642', fontWeight: 700 }}>{windowCount === '1–5 windows' ? '2–4 hours' : windowCount === '6–10 windows' ? '4–8 hours' : windowCount === '11–20 windows' ? '1–2 days' : '2–4 days'}</span> and should be done every 7–10 years in DFW climate.</div>
          </div>
        )}
        <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[{ icon: '🌧️', title: 'Wind-Driven Rain Angle', text: 'DFW storms regularly drive rain at 45° or greater. This means water hits window tops and sides, not just the sill. Head flashing is as important as sill flashing.' }, { icon: '🔩', title: 'Backer Rod is Non-Negotiable', text: 'Caulking without backer rod creates three-point adhesion — the caulk bonds to both sides and bottom, which tears it apart as the joint moves. Backer rod enables two-point adhesion that flexes properly.' }, { icon: '🏠', title: 'Pan Flashing for New Windows', text: 'When replacing DFW windows, insist on sill pan flashing — a sloped waterproof pan under the window rough opening. This is code in many jurisdictions but frequently skipped.' }, { icon: '☀️', title: 'UV Degradation Timeline', text: 'Standard paintable acrylic caulk lasts 3–5 years in DFW UV. Polyurethane (like NP1 or OSI Quad) lasts 10–15 years. The extra cost per tube saves 3x in labor over a decade.' }].map(({ icon, title, text }) => (
            <div key={title} style={{ background: '#1A2D4A', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 6, fontSize: 15 }}>{title}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
