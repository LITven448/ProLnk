import { useState } from 'react';

const questions = [
  { id: 1, text: 'Do you actively water your foundation perimeter during dry months?', emoji: '🌊', options: ['No, never heard of this', 'Not consistently', 'Sometimes in summer', 'Yes, on a schedule'], scores: [0, 1, 2, 3] },
  { id: 2, text: 'When did you last water your foundation?', emoji: '📅', options: ['Never / Unknown', 'More than 6 months ago', '1-6 months ago', 'Within the last month'], scores: [0, 1, 2, 3] },
  { id: 3, text: 'Do you know where your home\'s main water shutoff is located?', emoji: '🚿', options: ['No idea', 'I think I know', 'I know roughly', 'Yes, confirmed location'], scores: [0, 1, 2, 3] },
  { id: 4, text: 'When was your last professional foundation inspection?', emoji: '🔍', options: ['Never', 'More than 5 years', '2-5 years ago', 'Within the last 2 years'], scores: [0, 1, 2, 3] },
  { id: 5, text: 'Do you have a current elevation survey / engineer\'s report for your foundation?', emoji: '📐', options: ['What\'s that?', 'No', 'Old one somewhere', 'Yes, on file'], scores: [0, 1, 2, 3] },
];

const getResult = (score: number) => {
  if (score <= 4) return { label: 'High Foundation Risk', color: '#ef4444', tip: 'DFW\'s expansive clay soil is the #1 cause of foundation damage in Texas. Without watering and monitoring, you could face a $15K–$80K repair. Act now.' };
  if (score <= 8) return { label: 'Foundation Risk Present', color: '#f97316', tip: 'You\'re aware but not protected. Get an elevation survey this season — it\'s the only way to know if you have movement.' };
  if (score <= 11) return { label: 'Foundation Conscious', color: '#eab308', tip: 'Good habits forming. Get a current survey if yours is over 2 years old — DFW clay shifts every drought cycle.' };
  return { label: 'DFW Foundation Expert', color: '#22c55e', tip: 'You\'re doing it right. Log your survey and inspection history in ProLnk Vault so future owners (and your insurance) can see your diligence.' };
};

export default function DFWFoundationQuiz2026() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = Object.values(answers).reduce((a, b) => a + b, 0);
  const result = getResult(score);
  const answered = Object.keys(answers).length;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>DFW Foundation Homeowner Knowledge Quiz 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>5 questions · Protect your biggest asset</p>
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
              {answered < 5 ? `Answer all 5 questions (${answered}/5)` : 'Get My Foundation Score →'}
            </button>
          </>
        ) : (
          <div style={{ background: '#0f2040', borderRadius: 16, padding: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 8 }}>🏆</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: result.color }}>{score}/15</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', margin: '8px 0' }}>{result.label}</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: 20 }}>{result.tip}</p>
            <div style={{ background: '#1e3a5f', borderRadius: 10, padding: 16, textAlign: 'left', marginBottom: 20 }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📋 Your DFW Foundation Action Plan</p>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>
                {score < 5 && '✅ Install a soaker hose system around perimeter this week\n✅ Get a free foundation estimate from a ProLnk certified engineer\n✅ Locate and tag your main water shutoff\n✅ Log all foundation info in ProLnk Vault'}
                {score >= 5 && score < 9 && '✅ Set up a consistent watering schedule (Apr–Oct)\n✅ Order a new elevation survey — last one is outdated\n✅ Confirm shutoff location and label it\n✅ Store survey in ProLnk Vault'}
                {score >= 9 && score < 12 && '✅ Update your elevation survey this season\n✅ Set watering reminders before summer drought\n✅ Share foundation records with ProLnk Vault for resale value\n✅ Connect with a ProLnk foundation specialist'}
                {score >= 12 && '✅ You\'re a DFW foundation champion!\n✅ Digitize all reports in ProLnk Vault\n✅ Schedule annual elevation check\n✅ Refer ProLnk to your neighbors for their protection'}
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
