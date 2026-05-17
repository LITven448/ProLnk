import { useState } from 'react';

const questions = [
  { id: 1, text: 'How old is your current roof?', emoji: '📅', options: ['I don\'t know', 'Over 15 years', '8–15 years', 'Under 8 years'], scores: [0, 1, 2, 3] },
  { id: 2, text: 'What type of shingles do you have?', emoji: '🏠', options: ['No idea', '3-tab asphalt', 'Architectural asphalt', 'Metal or tile'], scores: [0, 1, 2, 3] },
  { id: 3, text: 'When was the last significant hail event at your DFW address?', emoji: '⛈️', options: ['I never track this', 'More than 3 years ago', '1–3 years ago', 'Within the last year'], scores: [0, 1, 2, 3] },
  { id: 4, text: 'Do you know your roof\'s wind resistance rating?', emoji: '💨', options: ['No idea', 'I think it\'s standard', 'I know it\'s 110+ mph', 'Yes, I have the spec sheet'], scores: [0, 1, 2, 3] },
  { id: 5, text: 'When was your last professional roof inspection?', emoji: '🔍', options: ['Never / Unknown', 'More than 3 years', '1–3 years ago', 'Within the last year'], scores: [0, 1, 2, 3] },
];

const getResult = (score: number) => {
  if (score <= 4) return { label: 'DFW Roofing Novice', color: '#ef4444', tip: 'DFW averages 6+ hail events per year. An uninspected roof can fail without warning — and insurance claims require proof of pre-storm condition. Get an inspection now.' };
  if (score <= 8) return { label: 'Roofing Risk Present', color: '#f97316', tip: 'You have gaps in your roof knowledge. Post-hail inspections are often free — request one through ProLnk before storm season peaks.' };
  if (score <= 11) return { label: 'Roof Aware', color: '#eab308', tip: 'Solid basics. Document your wind rating and shingle type in ProLnk Vault — it\'s required for many insurance claims and will speed up any future claim.' };
  return { label: 'DFW Roofing Pro Homeowner', color: '#22c55e', tip: 'Outstanding! Your documentation protects your insurance claim rights. Upload all records to ProLnk Vault for permanent safekeeping.' };
};

export default function DFWRoofingQuiz2026() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = Object.values(answers).reduce((a, b) => a + b, 0);
  const result = getResult(score);
  const answered = Object.keys(answers).length;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⛈️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>DFW Roofing Homeowner Knowledge Quiz 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>5 questions · Storm season is here — know your roof</p>
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
              {answered < 5 ? `Answer all 5 questions (${answered}/5)` : 'Get My Roofing Score →'}
            </button>
          </>
        ) : (
          <div style={{ background: '#0f2040', borderRadius: 16, padding: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 8 }}>🏆</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: result.color }}>{score}/15</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', margin: '8px 0' }}>{result.label}</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: 20 }}>{result.tip}</p>
            <div style={{ background: '#1e3a5f', borderRadius: 10, padding: 16, textAlign: 'left', marginBottom: 20 }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📋 Your DFW Roofing Action Plan</p>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>
                {score < 5 && '✅ Book a free post-storm inspection through ProLnk\n✅ Find out your roof age from permit records or prior owner\n✅ Check shingle brand in your attic or old paperwork\n✅ Log everything in ProLnk Vault before next storm'}
                {score >= 5 && score < 9 && '✅ Request a ProLnk inspection — hail may have gone undetected\n✅ Ask your roofer for your wind resistance rating\n✅ Set a storm-tracking alert for your zip code\n✅ Store inspection report in ProLnk Vault'}
                {score >= 9 && score < 12 && '✅ Get your wind rating spec sheet and upload to ProLnk Vault\n✅ Note your last hail event date — insurers will ask\n✅ Schedule annual inspection every spring before hail season\n✅ Consider impact-resistant shingles at next replacement'}
                {score >= 12 && '✅ You\'re a DFW roofing champion!\n✅ Ensure all docs are in ProLnk Vault for insurance\n✅ Share ProLnk with neighbors before next storm season\n✅ Refer a ProLnk roofer to earn Network Income'}
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
