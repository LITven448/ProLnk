import { useState } from 'react';

const questions = [
  { id: 'hvac_age', text: 'HVAC system is under 12 years old', category: 'HVAC & Comfort', weight: 7 },
  { id: 'hvac_service', text: 'HVAC serviced by a licensed tech in the last 12 months', category: 'HVAC & Comfort', weight: 5 },
  { id: 'hvac_filter', text: 'HVAC filter changed within the last 90 days', category: 'HVAC & Comfort', weight: 3 },
  { id: 'attic_r38', text: 'Attic insulation is R-38 or higher', category: 'Energy Efficiency', weight: 6 },
  { id: 'air_sealing', text: 'Air sealing completed in last 10 years (attic, crawl, sill plates)', category: 'Energy Efficiency', weight: 5 },
  { id: 'windows_dpane', text: 'All windows are double-pane and seals appear intact (no fogging)', category: 'Energy Efficiency', weight: 4 },
  { id: 'roof_age', text: 'Roof is under 15 years old or was recently inspected post-hail', category: 'Structure & Exterior', weight: 7 },
  { id: 'foundation_ok', text: 'No visible foundation cracks wider than 1/8″ or sticking doors', category: 'Structure & Exterior', weight: 8 },
  { id: 'gutters_clean', text: 'Gutters cleaned and downspouts extended away from foundation', category: 'Structure & Exterior', weight: 4 },
  { id: 'water_heater', text: 'Water heater is under 10 years old (tank) or 18 years (tankless)', category: 'Plumbing & Water', weight: 5 },
  { id: 'no_leaks', text: 'No known plumbing leaks — under sinks, toilets, and around water heater', category: 'Plumbing & Water', weight: 6 },
  { id: 'water_softener', text: 'Water softener or filtration installed (DFW water is 280+ ppm hardness)', category: 'Plumbing & Water', weight: 3 },
  { id: 'panel_ok', text: 'Electrical panel is not FPE/Zinsco and has no double-tapped breakers', category: 'Safety & Electrical', weight: 8 },
  { id: 'gfci_ok', text: 'GFCI outlets installed in all bathrooms, kitchen, garage, and exterior', category: 'Safety & Electrical', weight: 5 },
  { id: 'smoke_co', text: 'Smoke and CO detectors tested in last 6 months — all functioning', category: 'Safety & Electrical', weight: 6 },
  { id: 'has_survey', text: 'Current survey on file (within 10 years)', category: 'Documentation', weight: 3 },
  { id: 'has_permits', text: 'All additions and improvements have valid permits on file', category: 'Documentation', weight: 4 },
  { id: 'has_warranty', text: 'Appliance manuals and warranties organized and accessible', category: 'Documentation', weight: 2 },
  { id: 'pest_inspect', text: 'Pest / termite inspection completed in last 2 years', category: 'Maintenance', weight: 4 },
  { id: 'annual_walkthrough', text: 'Annual exterior walkthrough done — caulking, flashing, grading', category: 'Maintenance', weight: 4 },
];

const totalWeight = questions.reduce((s, q) => s + q.weight, 0);

function getGrade(pct: number) {
  if (pct >= 90) return { grade: 'A', label: 'Excellent', color: '#22C55E' };
  if (pct >= 75) return { grade: 'B', label: 'Good', color: '#84CC16′ };
  if (pct >= 60) return { grade: 'C', label: 'Fair', color: '#F5E642′ };
  if (pct >= 45) return { grade: 'D', label: 'Needs Work', color: '#F97316′ };
  return { grade: 'F', label: 'At Risk', color: '#EF4444′ };
}

const categories = [...new Set(questions.map(q => q.category))];

export default function DFWHomeReadinessScore2026() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const answered = Object.keys(answers).length;
  const score = Object.entries(answers).reduce((s, [id, val]) => {
    const q = questions.find(q => q.id === id);
    return val && q ? s + q.weight : s;
  }, 0);
  const pct = Math.round((score / totalWeight) * 100);
  const grade = getGrade(pct);

  const worstItems = questions
    .filter(q => answers[q.id] === false)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🏆</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Home Readiness Score 2026</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 8 }}>20 questions across 5 categories. Answers in 3 minutes — score tells you exactly where to focus.</p>
        <div style={{ color: '#64748B', fontSize: 13, marginBottom: 32 }}>{answered} of {questions.length} answered</div>

        {categories.map(cat => (
          <div key={cat} style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 16 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>{cat}</h2>
            {questions.filter(q => q.category === cat).map(q => (
              <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, gap: 16 }}>
                <span style={{ color: '#CBD5E1', fontSize: 14, flex: 1, lineHeight: 1.4 }}>{q.text}</span>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  {[true, false].map(val => (
                    <button key={String(val)}
                      onClick={() => setAnswers(prev => ({ ...prev, [q.id]: val }))}
                      style={{ padding: '6px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                        background: answers[q.id] === val ? (val ? '#22C55E' : '#EF4444') : '#0A1628',
                        color: answers[q.id] === val ? '#0A1628′ : '#64748B' }}>
                      {val ? 'Yes' : 'No'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        <button onClick={() => setSubmitted(true)} disabled={answered < questions.length}
          style={{ background: answered >= questions.length ? '#F5E642′ : '#1E3A5F', color: answered >= questions.length ? '#0A1628' : '#64748B', border: ’none', borderRadius: 10, padding: '16px', fontWeight: 700, fontSize: 18, cursor: answered >= questions.length ? 'pointer' : 'default', width: '100%', marginBottom: 24 }}>
          {answered < questions.length ? `Answer all ${questions.length - answered} remaining questions` : 'Get My Score →'}
        </button>

        {submitted && (
          <div style={{ background: '#0F3460', borderRadius: 16, padding: 32, border: `3px solid ${grade.color}` }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 72, fontWeight: 900, color: grade.color, lineHeight: 1 }}>{grade.grade}</div>
              <div style={{ color: '#E8EDF5', fontSize: 20, fontWeight: 700, marginTop: 8 }}>{pct}/100 — {grade.label}</div>
            </div>
            {worstItems.length > 0 && (
              <div>
                <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🎯 Top 3 Improvements to Make</h3>
                {worstItems.map((q, i) => (
                  <div key={q.id} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{i+1}</span>
                    <span style={{ color: '#CBD5E1', fontSize: 14 }}>{q.text} <span style={{ color: '#64748B' }}>({q.category})</span></span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
