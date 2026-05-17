import { useState } from 'react';

const questions = [
  { id: 1, text: 'What is your current filter MERV rating?', emoji: '🔢', options: ['I don\'t know', 'MERV 1-4 (basic)', 'MERV 8-11 (mid)', 'MERV 13+ (high)'], scores: [0, 1, 2, 3] },
  { id: 2, text: 'When did you last change your air filter?', emoji: '📅', options: ['Over a year ago', '6-12 months ago', '3-6 months ago', 'Within 3 months'], scores: [0, 1, 2, 3] },
  { id: 3, text: 'What refrigerant is in your HVAC system?', emoji: '❄️', options: ['I don\'t know', 'R-22 (Freon)', 'R-410A (Puron)', 'R-32 or R-454B'], scores: [0, 1, 2, 3] },
  { id: 4, text: 'When was your last professional HVAC tune-up?', emoji: '🔧', options: ['Never / Unknown', 'More than 2 years', '1-2 years ago', 'Within the last year'], scores: [0, 1, 2, 3] },
  { id: 5, text: 'Do you have a float switch / overflow shutoff on your drain pan?', emoji: '💧', options: ['What\'s that?', 'Not sure', 'I think so', 'Yes, confirmed'], scores: [0, 1, 2, 3] },
];

const getResult = (score: number) => {
  if (score <= 4) return { label: 'DFW HVAC Novice', color: '#ef4444', tip: 'Your DFW home is at risk — summer heat can spike bills 40% with a dirty system. ProLnk can connect you with a certified HVAC tech today.' };
  if (score <= 8) return { label: 'DFW HVAC Learner', color: '#f97316', tip: 'You\'re partway there. Schedule a tune-up before DFW summer hits and confirm your float switch to avoid costly water damage.' };
  if (score <= 11) return { label: 'DFW HVAC Aware', color: '#eab308', tip: 'Solid knowledge. Upgrade to MERV 13+ if you have pets or allergies — DFW air quality makes it worth it.' };
  return { label: 'DFW HVAC Pro Homeowner', color: '#22c55e', tip: 'Excellent! You\'re protecting your investment. Log your system details in ProLnk Vault so your records follow your home forever.' };
};

export default function DFWHVACTechQuiz2026() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = Object.values(answers).reduce((a, b) => a + b, 0);
  const result = getResult(score);
  const answered = Object.keys(answers).length;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>DFW HVAC Homeowner Knowledge Quiz 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>5 questions · See your score + action plan</p>
        </div>

        {!submitted ? (
          <>
            {questions.map((q) => (
              <div key={q.id} style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 16, border: '1px solid #1e3a5f' }}>
                <p style={{ fontWeight: 600, marginBottom: 12 }}>{q.emoji} {q.id}. {q.text}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {q.options.map((opt, i) => (
                    <button key={i} onClick={() => setAnswers(prev => ({ ...prev, [q.id]: q.scores[i] }))}
                      style={{ background: answers[q.id] === q.scores[i] ? '#F5E642' : '#1e3a5f', color: answers[q.id] === q.scores[i] ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 500, fontSize: 14 }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => setSubmitted(true)} disabled={answered < 5}
              style={{ width: '100%', background: answered < 5 ? '#334155' : '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 0', fontWeight: 700, fontSize: 16, cursor: answered < 5 ? 'not-allowed' : 'pointer', marginTop: 8 }}>
              {answered < 5 ? `Answer all 5 questions (${answered}/5)` : 'Get My HVAC Score →'}
            </button>
          </>
        ) : (
          <div style={{ background: '#0f2040', borderRadius: 16, padding: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 8 }}>🏆</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: result.color }}>{score}/15</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', margin: '8px 0' }}>{result.label}</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: 20 }}>{result.tip}</p>
            <div style={{ background: '#1e3a5f', borderRadius: 10, padding: 16, textAlign: 'left', marginBottom: 20 }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📋 Your DFW HVAC Action Plan</p>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>
                {score < 5 && '✅ Schedule a full HVAC inspection\n✅ Replace filter with MERV 8+ today\n✅ Ask tech about float switch installation\n✅ Log system in ProLnk Vault'}
                {score >= 5 && score < 9 && '✅ Schedule a tune-up before June\n✅ Confirm float switch is functional\n✅ Upgrade to MERV 11 filter\n✅ Log refrigerant type in ProLnk Vault'}
                {score >= 9 && score < 12 && '✅ Consider MERV 13 upgrade for DFW allergens\n✅ Set calendar reminder for annual tune-up\n✅ Verify float switch annually\n✅ Add service records to ProLnk Vault'}
                {score >= 12 && '✅ Share your knowledge with neighbors!\n✅ Keep annual tune-up on schedule\n✅ Explore ProLnk Vault for full home records\n✅ Refer pros to ProLnk Network Income'}
              </p>
            </div>
            <button onClick={() => { setAnswers({}); setSubmitted(false); }}
              style={{ background: 'transparent', color: '#F5E642', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontWeight: 600 }}>
              Retake Quiz
            </button>
          </div>
        )}
        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 24 }}>Powered by ProLnk · Dallas–Fort Worth Home Intelligence</p>
      </div>
    </div>
  );
}
