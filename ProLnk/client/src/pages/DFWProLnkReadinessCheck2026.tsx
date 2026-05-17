import { useState } from 'react';

type Role = 'homeowner' | 'pro' | null;

const homeownerQuestions = [
  { id: 1, text: 'Have you needed a home service (HVAC, plumbing, electrical, roofing, foundation) in the last 12 months?', emoji: '🔧' },
  { id: 2, text: 'Have you struggled to find a reliable, licensed contractor in DFW?', emoji: '😤' },
  { id: 3, text: 'Do you want a permanent digital record of your home\'s service history and systems?', emoji: '📁' },
  { id: 4, text: 'Would you prefer getting 3+ competitive quotes instead of calling one contractor?', emoji: '📋' },
  { id: 5, text: 'Do you want to know your home\'s true health score before major issues arise?', emoji: '❤️' },
];

const proQuestions = [
  { id: 1, text: 'Are you currently licensed and insured to work in Texas?', emoji: '📜' },
  { id: 2, text: 'Are you looking for more qualified leads in the DFW market?', emoji: '📈' },
  { id: 3, text: 'Would you like to build passive income by referring other pros to your network?', emoji: '💰' },
  { id: 4, text: 'Do you want a platform that verifies your credentials and builds trust with homeowners?', emoji: '✅' },
  { id: 5, text: 'Are you ready to join a waitlist-only launch limited to 500 charter pros?', emoji: '🚀' },
];

export default function DFWProLnkReadinessCheck2026() {
  const [role, setRole] = useState<Role>(null);
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = role === 'homeowner' ? homeownerQuestions : proQuestions;
  const yesCount = Object.values(answers).filter(v => v === true).length;
  const answered = Object.keys(answers).length;

  const getReadiness = () => {
    if (yesCount >= 4) return { label: 'You\'re Ready to Join ProLnk!', color: '#22c55e', emoji: '🚀', msg: role === 'homeowner' ? 'ProLnk was built for DFW homeowners exactly like you. Join the waitlist today — launch is limited and closing fast.' : 'You\'re exactly who ProLnk is built for. Charter Pros lock in $149/mo forever. Join the waitlist now before 500 spots fill.' };
    if (yesCount >= 2) return { label: 'Strong Candidate', color: '#F5E642', emoji: '✅', msg: role === 'homeowner' ? 'ProLnk would add real value to your homeownership experience. Join the waitlist and explore how the platform protects your investment.' : 'ProLnk could be a great fit. Review the Charter Pro benefits and join the waitlist if the passive income model resonates with you.' };
    return { label: 'Explore More First', color: '#94a3b8', emoji: '🔎', msg: role === 'homeowner' ? 'ProLnk may not be an urgent fit yet — but when you need a contractor, you\'ll wish you were already on the platform.' : 'Get your licensing sorted first, then come back. Charter Pro spots will be limited — don\'t miss the founding tier.' };
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔑</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>DFW ProLnk Readiness Check 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Find out if you\'re ready to join ProLnk</p>
        </div>

        {!role && (
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[{ key: 'homeowner', label: '🏠 I\'m a Homeowner', desc: 'I need reliable home service contractors' }, { key: 'pro', label: '🔧 I\'m a Service Pro', desc: 'I provide home services in DFW' }].map(r => (
              <button key={r.key} onClick={() => setRole(r.key as Role)}
                style={{ background: '#0f2040', border: '2px solid #F5E642', borderRadius: 16, padding: '24px 32px', cursor: 'pointer', textAlign: 'center', color: '#fff', flex: '1 1 200px' }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>{r.label.split(' ')[0]}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 4 }}>{r.label.substring(2)}</div>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>{r.desc}</div>
              </button>
            ))}
          </div>
        )}

        {role && !submitted && (
          <>
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '8px 16px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#F5E642', fontSize: 14 }}>{role === 'homeowner' ? '🏠 Homeowner Track' : '🔧 Pro Track'}</span>
              <button onClick={() => { setRole(null); setAnswers({}); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 13 }}>Change →</button>
            </div>
            {questions.map((q) => (
              <div key={q.id} style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 16, border: '1px solid #1e3a5f' }}>
                <p style={{ fontWeight: 600, marginBottom: 12 }}>{q.emoji} {q.id}. {q.text}</p>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[true, false].map(val => (
                    <button key={String(val)} onClick={() => setAnswers(prev => ({ ...prev, [q.id]: val }))}
                      style={{ flex: 1, background: answers[q.id] === val ? (val ? '#22c55e' : '#ef4444') : '#1e3a5f', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 0', cursor: 'pointer', fontWeight: 700, fontSize: 15 }}>
                      {val ? '✅ Yes' : '❌ No'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => setSubmitted(true)} disabled={answered < 5}
              style={{ width: '100%', background: answered < 5 ? '#334155' : '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 0', fontWeight: 700, fontSize: 16, cursor: answered < 5 ? 'not-allowed' : 'pointer', marginTop: 8 }}>
              {answered < 5 ? `Answer all 5 questions (${answered}/5)` : 'Check My Readiness →'}
            </button>
          </>
        )}

        {submitted && role && (() => { const r = getReadiness(); return (
          <div style={{ background: '#0f2040', borderRadius: 16, padding: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 56 }}>{r.emoji}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: r.color, margin: '12px 0 8px' }}>{r.label}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>{yesCount}/5 Yes Answers</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: 20 }}>{r.msg}</p>
            <div style={{ background: '#1e3a5f', borderRadius: 10, padding: 16, marginBottom: 20 }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🚀 Next Step for DFW {role === 'homeowner' ? 'Homeowners' : 'Pros'}</p>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>
                {role === 'homeowner' ? 'Join ProLnk waitlist → Get competitive quotes → Build your Home Health Vault → Never overpay for home services again' : 'Join Charter Pro waitlist → Lock in $149/mo forever → Get early lead flow → Build Network Income from day one'}
              </p>
            </div>
            <button onClick={() => { setRole(null); setAnswers({}); setSubmitted(false); }}
              style={{ background: 'transparent', color: '#F5E642', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontWeight: 600 }}>
              Start Over
            </button>
          </div>
        ); })()}
        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 24 }}>Powered by ProLnk · Dallas–Fort Worth Home Intelligence</p>
      </div>
    </div>
  );
}
