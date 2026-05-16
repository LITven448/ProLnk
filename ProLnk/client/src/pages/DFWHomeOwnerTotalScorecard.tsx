import { useState } from 'react';

const QUESTIONS = [
  { id: 1, cat: 'Maintenance', q: 'HVAC filters replaced every 1-3 months?' },
  { id: 2, cat: 'Maintenance', q: 'AC serviced in last 12 months?' },
  { id: 3, cat: 'Maintenance', q: 'Water heater flushed in last 12 months?' },
  { id: 4, cat: 'Maintenance', q: 'Gutters cleaned twice a year?' },
  { id: 5, cat: 'Maintenance', q: 'Pest control on regular schedule?' },
  { id: 6, cat: 'Safety', q: 'Smoke detectors tested in last 6 months?' },
  { id: 7, cat: 'Safety', q: 'Carbon monoxide detectors installed?' },
  { id: 8, cat: 'Safety', q: 'Know location of main water shutoff?' },
  { id: 9, cat: 'Safety', q: 'Know location of electrical panel?' },
  { id: 10, cat: 'Safety', q: 'Fire extinguisher in kitchen?' },
  { id: 11, cat: 'Efficiency', q: 'Smart thermostat installed?' },
  { id: 12, cat: 'Efficiency', q: 'LED bulbs throughout home?' },
  { id: 13, cat: 'Efficiency', q: 'Attic insulation at R-38 or higher?' },
  { id: 14, cat: 'Efficiency', q: 'Weather stripping on all doors?' },
  { id: 15, cat: 'Efficiency', q: 'Water softener for DFW hard water?' },
  { id: 16, cat: 'Documentation', q: 'Home inspection report on file?' },
  { id: 17, cat: 'Documentation', q: 'All appliance manuals/warranties saved?' },
  { id: 18, cat: 'Documentation', q: 'Photos of home for insurance?' },
  { id: 19, cat: 'Documentation', q: 'Contractor receipts organized?' },
  { id: 20, cat: 'Documentation', q: 'Utility account info documented?' },
  { id: 21, cat: 'Financial', q: 'Home emergency fund of ,000+?' },
  { id: 22, cat: 'Financial', q: 'Homeowners insurance reviewed this year?' },
  { id: 23, cat: 'Financial', q: 'Property tax exemptions filed?' },
  { id: 24, cat: 'Financial', q: 'Home equity tracked annually?' },
  { id: 25, cat: 'Financial', q: 'Maintenance budget of 1-2% home value/year?' },
  { id: 26, cat: 'DFW Specific', q: 'Foundation watering program active in summer?' },
  { id: 27, cat: 'DFW Specific', q: 'Hail damage assessed after major storms?' },
  { id: 28, cat: 'DFW Specific', q: 'Freeze pipe protection plan in place?' },
  { id: 29, cat: 'DFW Specific', q: 'Slab foundation inspected in last 3 years?' },
  { id: 30, cat: 'ProLnk Ready', q: 'ProLnk account created for vetted pros?' },
];

const CATS = ['Maintenance','Safety','Efficiency','Documentation','Financial','DFW Specific','ProLnk Ready'];
const CAT_COLORS: Record<string,string> = { Maintenance:'#3B82F6', Safety:'#EF4444', Efficiency:'#10B981', Documentation:'#8B5CF6', Financial:'#F59E0B', 'DFW Specific':'#EC4899', 'ProLnk Ready':'#F5E642' };

function grade(score: number) {
  if (score >= 27) return { letter: 'A+', label: 'Elite DFW Homeowner', color: '#10B981' };
  if (score >= 24) return { letter: 'A', label: 'Excellent', color: '#10B981' };
  if (score >= 21) return { letter: 'B', label: 'Good — a few gaps', color: '#3B82F6' };
  if (score >= 15) return { letter: 'C', label: 'Average — needs work', color: '#F59E0B' };
  return { letter: 'D', label: 'At Risk — act now', color: '#EF4444' };
}

export default function DFWHomeOwnerTotalScorecard() {
  const [answers, setAnswers] = useState<Record<number,boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = Object.values(answers).filter(Boolean).length;
  const result = grade(score);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F5E642' }}>📋 DFW Homeowner Total Scorecard</div>
          <div style={{ color: '#94A3B8', marginTop: '.5rem' }}>30-question assessment — get your grade + personalized action plan</div>
        </div>

        {!submitted ? (
          <>
            {CATS.map(cat => (
              <div key={cat} style={{ background: '#0F2035', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem', border: '1px solid #1E3A5F' }}>
                <div style={{ fontWeight: 700, color: CAT_COLORS[cat], marginBottom: '.75rem', fontSize: '1rem' }}>{cat}</div>
                {QUESTIONS.filter(q => q.cat === cat).map(q => (
                  <label key={q.id} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={!!answers[q.id]} onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.checked }))}
                      style={{ width: 18, height: 18, accentColor: '#F5E642' }} />
                    <span style={{ color: '#CBD5E1', fontSize: '.9rem' }}>{q.q}</span>
                  </label>
                ))}
              </div>
            ))}
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button onClick={() => setSubmitted(true)}
                style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: '1.1rem', padding: '.85rem 2.5rem', borderRadius: 999, border: 'none', cursor: 'pointer' }}>
                Get My Score ({Object.keys(answers).length}/30 answered)
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '5rem', fontWeight: 900, color: result.color }}>{result.letter}</div>
            <div style={{ fontSize: '1.4rem', color: result.color, fontWeight: 700 }}>{result.label}</div>
            <div style={{ fontSize: '1.1rem', color: '#94A3B8', marginTop: '.5rem' }}>{score} / 30 complete</div>
            <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', marginTop: '1.5rem', border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.75rem' }}>Your DFW Action Plan</div>
              {QUESTIONS.filter(q => !answers[q.id]).slice(0,8).map(q => (
                <div key={q.id} style={{ color: '#CBD5E1', fontSize: '.85rem', marginBottom: '.4rem' }}>⚠️ {q.q}</div>
              ))}
              {QUESTIONS.filter(q => !answers[q.id]).length > 8 && (
                <div style={{ color: '#94A3B8', fontSize: '.8rem', marginTop: '.5rem' }}>+{QUESTIONS.filter(q => !answers[q.id]).length - 8} more items to address</div>
              )}
            </div>
            <button onClick={() => { setSubmitted(false); setAnswers({}); }}
              style={{ marginTop: '1.5rem', background: 'transparent', border: '2px solid #F5E642', color: '#F5E642', padding: '.6rem 1.5rem', borderRadius: 999, cursor: 'pointer', fontWeight: 600 }}>
              Retake Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
