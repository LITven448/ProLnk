import { useState } from 'react';

const scenarios = [
  {
    job: 'Emergency Roof Leak',
    situation: 'Active leak, water entering home, urgent repair needed tonight',
    urgency: 99,
    distance: 'Under 8 miles preferred',
    qualityMin: 4.2,
    availability: 'Same-day only',
    summary: 'Urgency flag triggers emergency queue. AI skips normal ranking and surfaces only contractors with same-day availability and 4.2+ rating. Distance weight triples. Past homeowner reviews for water damage work boosted.',
    improvement: 'Each emergency match teaches the AI which contractors consistently arrive on time for urgent calls — improving future emergency response accuracy.',
  },
  {
    job: 'Kitchen Remodel',
    situation: 'Full gut remodel, planning phase, 3-month timeline, $60K budget',
    urgency: 12,
    distance: 'Up to 40 miles acceptable',
    qualityMin: 4.7,
    availability: 'Flexible start within 4 weeks',
    summary: 'Low urgency unlocks full scoring model. AI weights portfolio quality, permit history, project size experience, and review volume heavily. Budget signal filters out contractors who underperform on large jobs.',
    improvement: 'Large job outcomes feed the project-size experience model — contractors who complete high-value jobs correctly earn higher match scores for future large bids.',
  },
  {
    job: 'HVAC Tune-Up',
    situation: 'Annual maintenance, non-urgent, prefer weekday morning',
    urgency: 8,
    distance: 'Under 20 miles',
    qualityMin: 4.0,
    availability: 'Specific time window',
    summary: 'Routine jobs use calendar-fit scoring. AI finds contractors with open morning slots, high review frequency (active pros), and HVAC certification verified. Availability match weighted at 40% of score.',
    improvement: 'Scheduling data trains the AI on contractor reliability — pros who honor time windows score higher in future calendar-fit matches.',
  },
  {
    job: 'Foundation Inspection',
    situation: 'Buying a home, need licensed structural engineer report within 7 days',
    urgency: 65,
    distance: 'Up to 50 miles',
    qualityMin: 4.8,
    availability: 'Within 7-day window',
    summary: 'License verification becomes the dominant signal. AI filters to structural specialists only, cross-references state license database, prioritizes those with report-delivery track records. Buyer context adjusts communication style.',
    improvement: 'Inspection outcomes and buyer satisfaction data refine which specialists produce reports that actually close deals — not just any licensed engineer.',
  },
];

export default function ProLnkAIMatchingTechnology() {
  const [selected, setSelected] = useState(0);
  const s = scenarios[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 3, marginBottom: 12 }}>AI MATCHING ENGINE</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, margin: '0 0 16px' }}>Matching That Actually Understands Your Job</h1>
          <p style={{ color: '#8899aa', fontSize: 17, maxWidth: 580, margin: '0 auto' }}>
            Not keyword search. Not alphabetical. A multi-signal AI that considers urgency, quality, distance, availability, and past performance — all at once.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 36 }}>
          {scenarios.map((sc, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? '#F5E642′ : '#111e35',
                color: selected === i ? '#0A1628′ : '#ccc',
                border: '1px solid #1e3a5f',
                borderRadius: 8,
                padding: '10px 16px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {sc.job}
            </button>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 16, padding: 36, border: '1px solid #1e3a5f', marginBottom: 20 }}>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>{s.job}</div>
          <div style={{ color: '#8899aa', fontSize: 14, marginBottom: 28 }}>{s.situation}</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
            {[
              { label: '⚡ URGENCY SCORE', value: `${s.urgency}/100` },
              { label: '📍 DISTANCE LIMIT', value: s.distance },
              { label: '⭐ MIN RATING', value: `${s.qualityMin} stars` },
              { label: '📅 AVAILABILITY', value: s.availability },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#F5E642', letterSpacing: 2, marginBottom: 8 }}>{item.label}</div>
                <div style={{ fontWeight: 700 }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: '#F5E642', letterSpacing: 2, marginBottom: 10 }}>🤖 HOW THE AI SCORES THIS JOB</div>
            <p style={{ color: '#cdd9e5', lineHeight: 1.7, margin: 0 }}>{s.summary}</p>
          </div>

          <div style={{ background: '#0A1628', borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: 12, color: '#F5E642', letterSpacing: 2, marginBottom: 8 }}>📈 HOW IT IMPROVES OVER TIME</div>
            <p style={{ color: '#cdd9e5', margin: 0, lineHeight: 1.6, fontSize: 14 }}>{s.improvement}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
