import { useState } from 'react';

const ALL_PROJECTS = [
  'Foundation repair', 'Roof replacement', 'Electrical panel upgrade', 'Plumbing re-pipe',
  'HVAC replacement', 'Attic insulation', 'Drywall work', 'Tile / flooring',
  'Interior painting', 'Exterior painting', 'Kitchen remodel', 'Bathroom remodel',
  'Window replacement', 'Garage door', 'Landscaping', 'Pool installation',
];

type SequenceItem = { step: number; project: string; reason: string; parallel?: string; weeks: number };

const SEQUENCE_RULES: Record<string, { step: number; reason: string; parallel?: string; weeks: number }> = {
  'Foundation repair': { step: 1, reason: 'DFW clay soil: foundation MUST be done before any cosmetic work or floors.', weeks: 3 },
  'Roof replacement': { step: 2, reason: 'Weathertight envelope before interior work. DFW storms won\’t wait.', weeks: 2 },
  'Electrical panel upgrade': { step: 3, reason: 'Rough electrical before drywall. You\’ll open walls anyway.', weeks: 1 },
  'Plumbing re-pipe': { step: 3, reason: 'Rough plumbing before drywall — same wall-open window as electrical.', parallel: 'Electrical panel upgrade', weeks: 1 },
  'HVAC replacement': { step: 4, reason: 'Install HVAC before insulation — ductwork needs clear attic access.', weeks: 1 },
  'Attic insulation': { step: 5, reason: 'After HVAC ductwork is set. Major energy savings in DFW heat.', weeks: 1 },
  'Drywall work': { step: 6, reason: 'After all rough-in (electrical, plumbing, HVAC) is inspected and approved.', weeks: 2 },
  'Window replacement': { step: 6, reason: 'Parallel with drywall — exterior envelope work.', parallel: 'Drywall work', weeks: 1 },
  'Tile / flooring': { step: 7, reason: 'After drywall texture, before cabinets. Protects floors from cabinet installation scratches.', weeks: 2 },
  'Interior painting': { step: 8, reason: 'After drywall and before cabinets/trim install. Easier masking.', weeks: 1 },
  'Exterior painting': { step: 8, reason: 'Parallel with interior paint. Best in DFW Oct-Nov (low humidity, 60-75°F).', parallel: 'Interior painting', weeks: 1 },
  'Kitchen remodel': { step: 9, reason: 'Cabinets go in after paint. Countertops template after cabinets settle.', weeks: 4 },
  'Bathroom remodel': { step: 9, reason: 'Parallel with kitchen if separate contractors. Tile before vanities.', parallel: 'Kitchen remodel', weeks: 3 },
  'Garage door': { step: 10, reason: 'Near-final exterior work. Protects interior from dust during interior finish.', weeks: 1 },
  'Landscaping': { step: 11, reason: 'Last — protect new plantings from construction traffic and debris.', weeks: 2 },
  'Pool installation': { step: 11, reason: 'Parallel with landscaping. Excavation first, finish last.', parallel: 'Landscaping', weeks: 6 },
};

export default function DFWHomeRenovationOrderGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showSequence, setShowSequence] = useState(false);

  const toggle = (p: string) =>
    setSelected(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  const sequence: SequenceItem[] = selected
    .filter(p => SEQUENCE_RULES[p])
    .map(p => ({ step: SEQUENCE_RULES[p].step, project: p, ...SEQUENCE_RULES[p] }))
    .sort((a, b) => a.step - b.step);

  const totalWeeks = sequence.reduce((max, s) => {
    const parallelGroup = sequence.filter(x => x.step === s.step);
    const groupWeeks = Math.max(...parallelGroup.map(x => x.weeks));
    return max + (s === parallelGroup[0] ? groupWeeks : 0);
  }, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>DFW HOMEOWNER GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.75rem 0 0.25rem' }}>🏗️ Renovation Order-of-Operations</h1>
          <p style={{ color: '#8FA3BF', marginTop: 4 }}>Why sequence matters — and how DFW's foundation issues change everything.</p>
        </div>

        <div style={{ background: '#0D1F3A', border: '1px solid #1E3A5F', borderRadius: 10, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, marginBottom: 10 }}>⚠️ DFW Critical Rule</h2>
          <p style={{ fontSize: 14, color: '#E8EDF5', margin: 0 }}>
            Always address <strong>foundation</strong> before any cosmetic renovation. DFW clay soil expands and contracts with rain/drought cycles — new floors, tile, or paint over an unstable foundation will crack, warp, and fail within months. Fix the ground first.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { title: 'Paint Before Floors', icon: '🎨', detail: 'Paint first so drips don\’t hit new flooring. Less masking, better finish.' },
            { title: 'Rough-In Before Drywall', icon: '⚡', detail: 'Electrical, plumbing, HVAC all go in before closing the walls. One opening, multiple trades.' },
            { title: 'HVAC Before Insulation', icon: '❄️', detail: 'Ductwork needs clear attic access. Insulation covers the ducts after installation.' },
            { title: 'Foundation Before Everything', icon: '🏠', detail: 'DFW-specific: clay soil movement will crack any cosmetic work on an unstable foundation.' },
          ].map(tip => (
            <div key={tip.title} style={{ background: '#0D1F3A', border: '1px solid #1E3A5F', borderRadius: 8, padding: '1rem' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{tip.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{tip.title}</div>
              <div style={{ fontSize: 13, color: '#8FA3BF' }}>{tip.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D2238', border: '1px solid #F5E642', borderRadius: 10, padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>📋 Build My Renovation Sequence</h2>
          <p style={{ fontSize: 13, color: '#8FA3BF', marginBottom: 10 }}>Select your planned projects:</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1rem' }}>
            {ALL_PROJECTS.map(p => (
              <button key={p} onClick={() => toggle(p)}
                style={{ background: selected.includes(p) ? '#F5E642′ : ’rgba(255,255,255,0.07)', color: selected.includes(p) ? '#0A1628′ : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6, padding: '6px 12px', fontSize: 13, cursor: ’pointer' }}>
                {p}
              </button>
            ))}
          </div>

          <button onClick={() => setShowSequence(true)} disabled={selected.length === 0}
            style={{ background: selected.length > 0 ? '#F5E642′ : '#1E3A5F', color: selected.length > 0 ? '#0A1628' : '#8FA3BF', border: ’none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: selected.length > 0 ? 'pointer' : 'not-allowed' }}>
            Generate Sequence →
          </button>

          {showSequence && sequence.length > 0 && (
            <div style={{ marginTop: '1.25rem' }}>
              <p style={{ color: '#8FA3BF', fontSize: 13, marginBottom: 10 }}>Correct order for your projects · Est. total: <strong style={{ color: '#F5E642′ }}>{totalWeeks} weeks</strong></p>
              {sequence.map((s, idx) => (
                <div key={s.project} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: 8, borderLeft: s.parallel ? '3px solid #8FA3BF' : '3px solid #F5E642′ }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12 }}>{idx + 1}</span>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{s.project}</span>
                    <span style={{ marginLeft: 'auto', color: '#8FA3BF', fontSize: 12 }}>{s.weeks}w</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#8FA3BF', margin: 0 }}>{s.reason}</p>
                  {s.parallel && <p style={{ fontSize: 12, color: '#22C55E', margin: '4px 0 0′ }}>✓ Can run parallel with: {s.parallel}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
