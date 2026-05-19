import { useState } from 'react';

const quizQuestions = [
  {
    id: 'age',
    question: 'How old is your current roof?',
    options: [
      { label: 'Under 7 years', score: 0 },
      { label: '7–12 years', score: 1 },
      { label: '13–20 years', score: 2 },
      { label: 'Over 20 years', score: 3 },
    ],
  },
  {
    id: 'hail',
    question: 'Has your area experienced a hail event in the last 2 years?',
    options: [
      { label: 'No hail events', score: 0 },
      { label: 'Small hail (under 1 inch)', score: 1 },
      { label: 'Large hail (1–2 inches)', score: 2 },
      { label: 'Severe hail (over 2 inches)', score: 3 },
    ],
  },
  {
    id: 'granules',
    question: 'Do you see granules collecting in your gutters or downspout splash zones?',
    options: [
      { label: 'None visible', score: 0 },
      { label: 'A small amount', score: 1 },
      { label: 'Moderate amount', score: 2 },
      { label: 'Heavy granule loss', score: 3 },
    ],
  },
  {
    id: 'interior',
    question: 'Any interior signs: water stains, ceiling spots, or attic moisture?',
    options: [
      { label: 'None', score: 0 },
      { label: 'One small stain', score: 1 },
      { label: 'Multiple stains or soft spots', score: 2 },
      { label: 'Active leak or daylight in attic', score: 3 },
    ],
  },
  {
    id: 'shingles',
    question: 'From the ground: can you see curling, buckling, or missing shingles?',
    options: [
      { label: 'Roof looks uniform and flat', score: 0 },
      { label: 'One or two shingles look off', score: 1 },
      { label: 'Several areas showing wear', score: 2 },
      { label: 'Visible missing or severely damaged shingles', score: 3 },
    ],
  },
];

type Answers = Record<string, number>;

function getResult(score: number) {
  if (score <= 3) return { label: 'Looks Healthy', color: '#34D399', emoji: '✅', desc: 'Your roof shows no urgent red flags. Schedule a routine inspection within the next 12 months and document current condition for insurance purposes.' };
  if (score <= 7) return { label: 'Monitor Closely', color: '#F59E0B', emoji: '⚠️', desc: 'Some indicators suggest wear or potential damage. Get a professional inspection within 30–60 days — especially before storm season.' };
  return { label: 'Needs Inspection Now', color: '#F87171', emoji: '🚨', desc: 'Multiple risk factors present. Do not wait. Get a professional inspection within 1–2 weeks. You may have an active insurance claim opportunity.' };
}

const inspectionItems = [
  { area: 'Shingles', what: 'Look for cupping, curling, cracking, or missing shingles. Check for dark patches (granule loss).', ground: true },
  { area: 'Hail Damage', what: 'Circular bruise marks on shingles, dents on vents and gutters, cracked caulking around flashing.', ground: false },
  { area: 'Flashing', what: 'Metal strips at chimney, vents, and valleys. Look for rust, gaps, or lifted edges.', ground: false },
  { area: 'Gutters', what: 'Check for granule buildup in gutters — a major sign of shingle deterioration.', ground: true },
  { area: 'Valleys', what: 'Open valleys (exposed metal) and closed valleys both need inspection for debris and wear.', ground: false },
  { area: 'Attic Interior', what: 'Look for daylight, moisture stains on rafters, or soft decking — signs of active leak.', ground: true },
];

export default function RoofInspectionGuide() {
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const allAnswered = quizQuestions.every(q => q.id in answers);
  const result = submitted ? getResult(totalScore) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2d4a 100%)', padding: '60px 24px 40px', textAlign: 'center', borderBottom: '1px solid #1e3a5f' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 12px', color: '#FFFFFF' }}>
          DFW Roof Inspection Guide
        </h1>
        <p style={{ fontSize: 18, color: '#8BA3C0', maxWidth: 640, margin: '0 auto 16px' }}>
          North Texas sees some of the highest hail frequency in the US. Know your roof condition before a storm forces the issue.
        </p>
        <div style={{ display: 'inline-block', background: '#1e3a5f', borderRadius: 8, padding: '8px 20px', fontSize: 14, color: '#60A5FA' }}>
          ⛈️ DFW is in the core of Hail Alley — 15+ hail events per year on average
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        {/* Hail Alley Banner */}
        <div style={{ background: '#1a1a2e', border: '1px solid #F59E0B', borderRadius: 12, padding: 24, marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F59E0B', margin: '0 0 12px' }}>
            ⚠️ DFW Hail Risk Context
          </h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 12px' }}>
            The Dallas-Fort Worth metro sits in the geographic center of <strong style={{ color: '#FCD34D' }}>Hail Alley</strong> — the strip from Texas through Nebraska with the highest hail frequency in the world. Average annual hail claims in North Texas:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: 'Annual hail events', value: '15–20', color: '#F59E0B' },
              { label: 'Avg claim value', value: '$12,000', color: '#F87171' },
              { label: 'Shingle lifespan (DFW)', value: '15–20 yrs', color: '#60A5FA' },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#0A1628', borderRadius: 8, padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: 24, fontWeight: 800, color: stat.color, margin: '0 0 4px' }}>{stat.value}</p>
                <p style={{ color: '#8BA3C0', fontSize: 12, margin: 0 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Self-Assessment Quiz */}
        <div style={{ background: '#0f2035', borderRadius: 12, padding: 32, marginBottom: 40, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px' }}>
            🔍 Hail Damage Self-Assessment
          </h2>
          <p style={{ color: '#8BA3C0', margin: '0 0 28px' }}>Answer 5 questions to get a risk score for your roof:</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {quizQuestions.map((q, qi) => (
              <div key={q.id}>
                <p style={{ color: '#FFFFFF', fontWeight: 700, margin: '0 0 12px', fontSize: 16 }}>
                  {qi + 1}. {q.question}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {q.options.map(opt => (
                    <button
                      key={opt.label}
                      onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt.score }))}
                      style={{
                        padding: '12px 16px', borderRadius: 8, border: `2px solid ${answers[q.id] === opt.score ? '#60A5FA' : '#1e3a5f'}`,
                        background: answers[q.id] === opt.score ? '#1e3a5f' : '#0A1628',
                        color: answers[q.id] === opt.score ? '#FFFFFF' : '#8BA3C0',
                        cursor: 'pointer', fontSize: 14, textAlign: 'left', fontWeight: answers[q.id] === opt.score ? 600 : 400,
                        transition: 'all 0.1s'
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setSubmitted(true)}
            disabled={!allAnswered}
            style={{
              marginTop: 28, background: allAnswered ? '#2563EB' : '#1e3a5f', color: allAnswered ? '#FFFFFF' : '#4B6A8A',
              border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700,
              cursor: allAnswered ? 'pointer' : 'default', transition: 'background 0.15s'
            }}
          >
            Get My Risk Score
          </button>

          {result && (
            <div style={{ marginTop: 24, padding: 24, background: '#0A1628', borderRadius: 10, border: `2px solid ${result.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 32 }}>{result.emoji}</span>
                <div>
                  <p style={{ color: result.color, fontWeight: 800, fontSize: 20, margin: 0 }}>{result.label}</p>
                  <p style={{ color: '#8BA3C0', fontSize: 13, margin: '2px 0 0' }}>Score: {totalScore} / {quizQuestions.length * 3}</p>
                </div>
              </div>
              <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>{result.desc}</p>
            </div>
          )}
        </div>

        {/* What Inspectors Check */}
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#FFFFFF', margin: '0 0 20px' }}>
          🔎 What a Pro Inspector Checks
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 48 }}>
          {inspectionItems.map(item => (
            <div key={item.area} style={{ background: '#0f2035', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>{item.area}</h3>
                <span style={{ fontSize: 12, background: item.ground ? '#1e3a5f' : '#2d1a4a', color: item.ground ? '#93C5FD' : '#C4B5FD', padding: '3px 8px', borderRadius: 12, whiteSpace: 'nowrap' }}>
                  {item.ground ? 'Ground visible' : 'Roof access needed'}
                </span>
              </div>
              <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{item.what}</p>
            </div>
          ))}
        </div>

        {/* Insurance Tips */}
        <div style={{ background: '#0f2035', borderRadius: 12, padding: 32, marginBottom: 40, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', margin: '0 0 20px' }}>
            📋 DFW Insurance Claim Tips
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'File claims within 1 year of a hail event — most DFW policies have this cutoff. Do not wait.',
              'Get an independent inspector before the adjuster visits. Their report strengthens your claim.',
              'Document damage with photos immediately after the storm — date-stamped images are critical.',
              'Do not let a contractor file on your behalf without a signed authorization — some use deceptive practices.',
              'Insurance should cover material and labor for full replacement when damage meets threshold — not patches.',
              'Actual Cash Value (ACV) vs Replacement Cost Value (RCV) — know which policy you have before filing.',
            ].map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', background: '#0A1628', borderRadius: 8 }}>
                <span style={{ color: '#60A5FA', fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
                <span style={{ color: '#CBD5E1', lineHeight: 1.6, fontSize: 14 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #2563EB)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px' }}>
            Get a Verified DFW Roofing Inspection
          </h2>
          <p style={{ color: '#93C5FD', fontSize: 16, margin: '0 auto 28px', maxWidth: 500 }}>
            ProLnk connects you with vetted roofing pros who know DFW hail claims — most inspections are free if a claim is filed.
          </p>
          <button style={{ background: '#FFFFFF', color: '#1e3a5f', border: 'none', borderRadius: 10, padding: '16px 40px', fontSize: 18, fontWeight: 800, cursor: 'pointer' }}>
            Get Free Roof Inspection
          </button>
        </div>
      </div>
    </div>
  );
}
