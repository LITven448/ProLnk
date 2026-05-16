import { useState } from 'react';

const questions = [
  { id: 'hail', text: 'Has your area received hail (any size) in the last 12 months?' },
  { id: 'age', text: 'Is your roof more than 10 years old?' },
  { id: 'granules', text: 'Have you noticed granules (sand-like material) in your gutters or downspouts?' },
  { id: 'dents', text: 'Can you see dents or bruising on metal vents, gutters, or flashing?' },
  { id: 'shingles', text: 'Are any shingles visibly cracked, curling, or missing?' },
];

type Answer = 'yes' | 'no' | null;

function getScore(answers: Record<string, Answer>): number {
  return Object.values(answers).filter(v => v === 'yes').length;
}

function getRisk(score: number) {
  if (score === 0) return { level: 'Low', color: '#4ade80', emoji: '✅', action: 'No immediate action needed. Schedule your next annual inspection in 12 months.' };
  if (score <= 2) return { level: 'Moderate', color: '#fbbf24', emoji: '⚠️', action: 'A professional inspection is recommended within 30 days. Document visible damage with photos now.' };
  if (score <= 4) return { level: 'High', color: '#f97316', emoji: '🔶', action: 'Contact a licensed DFW roofing contractor this week. File a claim with your homeowner\'s insurance if hail is confirmed.' };
  return { level: 'Critical', color: '#ef4444', emoji: '🚨', action: 'Immediate professional inspection required. Multiple damage indicators suggest active roof failure. Contact your insurer today.' };
}

export default function RoofInspectionGuide() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [showResult, setShowResult] = useState(false);

  const setAnswer = (id: string, val: Answer) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
    setShowResult(false);
  };

  const allAnswered = questions.every(q => answers[q.id] !== undefined);
  const score = getScore(answers);
  const risk = getRisk(score);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW ROOF INSPECTION GUIDE</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.15 }}>DFW Roof Inspection Guide: Protect Your Biggest Investment</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, margin: 0 }}>Dallas-Fort Worth averages 6+ hail events per year — more than almost any metro in the US. Know your risk.</p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>📅 When to Inspect Your Roof</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
            {[
              { emoji: '⛈️', title: 'After Any Hail', desc: 'Even pea-sized hail can damage shingles — inspect within 48 hours' },
              { emoji: '💨', title: 'After 60+ MPH Winds', desc: 'Wind lifts and cracks shingles and flashing' },
              { emoji: '📆', title: 'Annually', desc: 'Spring or fall — before storm season peaks' },
              { emoji: '🏡', title: 'Before Selling', desc: 'Buyers require a clean roof inspection for financing' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#112240', borderRadius: 14, padding: '20px 18px', border: '1px solid #1e3a5f' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.emoji}</div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 8 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>🔍 What Inspectors Look For</h2>
          <div style={{ display: 'grid', gap: 12, marginBottom: 48 }}>
            {[
              ['Shingle condition', 'Cracking, curling, blistering, or missing shingles'],
              ['Hail bruising', 'Soft spots, granule loss, exposed fiberglass mat'],
              ['Flashing integrity', 'Gaps or rust around chimney, vents, and skylights'],
              ['Gutter damage', 'Dents, granule buildup, separation from fascia'],
              ['Attic inspection', 'Daylight penetration, moisture, and insulation damage'],
            ].map(([label, detail], i) => (
              <div key={i} style={{ background: '#112240', borderRadius: 12, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', border: '1px solid #1e3a5f' }}>
                <div style={{ fontWeight: 600, color: '#fff' }}>🔎 {label}</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 8, padding: '20px 24px', marginBottom: 48, border: '1px solid #1e3a5f' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 12px', color: '#F5E642' }}>⛈️ DFW Hail by the Numbers</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
            {[['6+', 'Hail events/year avg'], ['$14B', 'TX hail damage 2023'], ['Top 5', 'Most hail-prone metro US'], ['$8,000', 'Avg roof repair claim']].map(([n, label], i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>{n}</div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: '32px 28px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>🧪 Hail Damage Self-Assessment</h2>
          <p style={{ color: '#94a3b8', marginBottom: 28 }}>Answer 5 quick questions to get your roof risk score.</p>

          <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
            {questions.map((q, i) => (
              <div key={q.id} style={{ background: '#0A1628', borderRadius: 12, padding: '18px 20px', border: `2px solid ${answers[q.id] === 'yes' ? '#ef4444' : answers[q.id] === 'no' ? '#1e3a5f' : '#1e3a5f'}` }}>
                <div style={{ fontWeight: 600, marginBottom: 14 }}>Q{i + 1}: {q.text}</div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {(['yes', 'no'] as const).map(val => (
                    <button key={val} onClick={() => setAnswer(q.id, val)}
                      style={{
                        padding: '8px 28px', borderRadius: 8, border: '2px solid',
                        borderColor: answers[q.id] === val ? (val === 'yes' ? '#ef4444' : '#4ade80') : '#1e3a5f',
                        background: answers[q.id] === val ? (val === 'yes' ? '#ef444420' : '#4ade8020') : 'transparent',
                        color: answers[q.id] === val ? (val === 'yes' ? '#ef4444' : '#4ade80') : '#94a3b8',
                        cursor: 'pointer', fontWeight: 700, fontSize: 15, textTransform: 'capitalize',
                      }}>{val === 'yes' ? '✓ Yes' : '✗ No'}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowResult(true)}
            disabled={!allAnswered}
            style={{
              background: allAnswered ? '#F5E642' : '#1e3a5f', color: allAnswered ? '#0A1628' : '#4a6080',
              border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: allAnswered ? 'pointer' : 'not-allowed',
            }}
          >Get My Risk Score</button>

          {showResult && (
            <div style={{ marginTop: 28, background: '#0A1628', borderRadius: 14, padding: '28px', border: `2px solid ${risk.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 42 }}>{risk.emoji}</div>
                <div>
                  <div style={{ fontSize: 14, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>Your Risk Level</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: risk.color }}>{risk.level}</div>
                </div>
                <div style={{ marginLeft: 'auto', background: `${risk.color}20`, border: `2px solid ${risk.color}`, borderRadius: 50, width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: risk.color }}>{score}/5</span>
                </div>
              </div>
              <p style={{ color: '#cbd5e1', margin: 0 }}>{risk.action}</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: 48, background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 16, padding: '28px 24px' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>🏠 Get a Free Roof Inspection Quote</h3>
          <p style={{ color: '#94a3b8', margin: 0 }}>ProLnk connects DFW homeowners with licensed, insured roofing contractors. Get matched in minutes — insurance claim assistance available.</p>
        </div>
      </div>
    </div>
  );
}
