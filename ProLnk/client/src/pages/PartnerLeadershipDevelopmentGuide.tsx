import { useState } from 'react';

const questions = [
  { q: 'How many photos have you personally submitted this month?', opts: ['0–10', '11–30', '31–60', '61+'], scores: [0, 1, 2, 3] },
  { q: 'How many partners have you directly recruited to date?', opts: ['0', '1–2', '3–5', '6+'], scores: [0, 1, 2, 3] },
  { q: 'How often do you communicate with your recruits?', opts: ['Never', 'When they ask', 'Monthly', 'Weekly or more'], scores: [0, 1, 2, 3] },
  { q: 'Have you taught any of your recruits how to recruit others?', opts: ['No, not my job', 'Thought about it', 'Tried once', 'Yes, actively'], scores: [0, 1, 2, 3] },
  { q: 'Do you track your network’s photo volume or earnings?', opts: ['No', 'Occasionally check', 'Monthly review', 'Weekly with spreadsheet'], scores: [0, 1, 2, 3] },
  { q: 'How do you handle a recruit who goes inactive?', opts: ['Let them go', 'Wait for them to return', 'Send one message', 'Have a reactivation conversation'], scores: [0, 1, 2, 3] },
  { q: 'Do you share your income progress with your network?', opts: ['Never — private', 'Only if asked', 'Occasionally', 'Yes, transparency is my strategy'], scores: [0, 1, 2, 3] },
  { q: 'What’s your current primary ProLnk focus?', opts: ['Only my own commissions', 'My commissions + light recruiting', 'Equal split', 'Mostly building network depth'], scores: [0, 1, 2, 3] },
];

const stages = [
  { min: 0, max: 8, label: 'Solo Earner', color: '#64748b', next: ['Get to 30+ personal photos/month before anything else.', 'Study the commission structure until you can explain it in 30 seconds.', 'Identify 3 people in your life who should be Partners — don’t recruit yet, just identify.'] },
  { min: 9, max: 15, label: 'Emerging Builder', color: '#3b82f6', next: ['Recruit your first 3 partners this month. Teach them your exact photo process.', 'Set up a group text with your recruits — weekly check-ins start now.', 'Track your L1 photo volume — you should know this number every week.'] },
  { min: 16, max: 20, label: 'Network Builder', color: '#8b5cf6', next: ['Shift 30% of your focus to helping your recruits recruit (L2 income is where leverage starts).', 'Host a 30-minute Zoom call monthly with your network — share your numbers.', 'Identify your 1–2 top performers and give them personal coaching time.'] },
  { min: 21, max: 24, label: 'Network Leader', color: '#f59e0b', next: ['Focus on depth: help your L2 partners build their own L1 networks.', 'Create recognition within your team — call out top performers publicly.', 'You’re building a system now, not just recruiting. Document your playbook.'] },
];

export default function PartnerLeadershipDevelopmentGuide() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const total = Object.values(answers).reduce((a, b) => a + b, 0);
  const allAnswered = Object.keys(answers).length === questions.length;
  const stage = stages.find(s => total >= s.min && total <= s.max) || stages[3];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>Partner Development</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 16 }}>
            ProLnk Leadership Guide — From Partner to Network Leader
          </h1>
          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.6 }}>
            Three types of partners build three very different income trajectories. Understanding which one you are is the first step to leveling up.
          </p>
        </div>

        {/* Three Personas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '🎯', persona: 'Solo Earner', range: '$1,000–$3,000/mo', desc: 'Focuses on personal job commissions. Solid income, predictable work. The ceiling is how many photos one person can take.' },
            { icon: '🌐', persona: 'Network Builder', range: '$3,000–$8,000/mo', desc: 'Actively recruits and coaches downline. Building passive income streams from L1 and L2 overrides. The effort compounds.' },
            { icon: '🏆', persona: 'Network Leader', range: '$8,000–$20,000+/mo', desc: 'Runs a team, recruits leaders, manages at scale. Mentors others. L2 and L3 income is the majority of earnings.' },
          ].map(p => (
            <div key={p.persona} style={{ background: '#fff', borderRadius: 14, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{p.icon}</div>
              <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{p.persona}</h3>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#3b82f6', marginBottom: 10 }}>{p.range}</div>
              <p style={{ color: '#64748b', margin: 0, fontSize: 14, lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* What Leaders Do Differently */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 32, marginBottom: 40, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>🔑 What Network Leaders Do Differently</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { icon: '📞', action: 'Weekly team calls', detail: '30 minutes, focused on photo volume and recruiting. Consistency over intensity.' },
              { icon: '🎓', action: 'Personal coaching for new recruits', detail: 'Every recruit gets 1-on-1 attention in their first 14 days. That’s when most people quit.' },
              { icon: '📊', action: 'Monthly income transparency', detail: 'Share their numbers with their network. Transparency builds belief. Belief drives action.' },
              { icon: '🏅', action: 'Recognition programs', detail: 'Call out top performers publicly. People work harder when they know someone’s watching and celebrating.' },
              { icon: '🧩', action: 'Strategic recruiting', detail: 'Target complementary trades, not just your own. An electrician recruiting HVAC techs expands coverage.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 20px', background: '#f8fafc', borderRadius: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>{item.action}</div>
                  <div style={{ color: '#64748b', fontSize: 14 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Ladder */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>🪜 The Leadership Ladder</h2>
          <div style={{ position: 'relative' }}>
            {[
              { period: 'Month 1–3', goal: 'Perfect your own photo process. Earn your first $1,000.' },
              { period: 'Month 3–6', goal: 'Recruit your first 3 partners. Teach them exactly what you did — nothing more.' },
              { period: 'Month 6–12', goal: 'Help your recruits recruit. Transition from recruiter to mentor.' },
              { period: 'Month 12+', goal: 'Focus on depth, not width. L2 and L3 income compounds. This is where it gets interesting.' },
            ].map((rung, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 12, alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 20 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#3b82f6', flexShrink: 0 }} />
                  {i < 3 && <div style={{ width: 2, height: 40, background: '#e2e8f0' }} />}
                </div>
                <div style={{ background: '#fff', borderRadius: 10, padding: '16px 20px', flex: 1, border: '1px solid #e2e8f0', marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, color: '#3b82f6', fontSize: 13, marginBottom: 4 }}>{rung.period}</div>
                  <div style={{ color: '#1e293b', fontWeight: 600 }}>{rung.goal}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div style={{ background: '#eff6ff', borderRadius: 14, padding: 28, marginBottom: 48, border: '1px solid #bfdbfe' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e40af', marginBottom: 16 }}>📚 ProLnk Leadership Resources</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            {[
              { icon: '📹', name: 'Weekly Training Calls', desc: 'Live — Tuesdays 7PM CT' },
              { icon: '📖', name: 'Partner Playbook PDF', desc: 'Full process from day 1' },
              { icon: '📈', name: 'Income Tracking Dashboard', desc: 'Real-time earnings view' },
              { icon: '🤝', name: 'Partner Community', desc: 'Private Slack group' },
            ].map(r => (
              <div key={r.name} style={{ background: '#fff', borderRadius: 10, padding: '16px 18px', border: '1px solid #bfdbfe' }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{r.icon}</div>
                <div style={{ fontWeight: 700, color: '#1e40af', marginBottom: 2, fontSize: 15 }}>{r.name}</div>
                <div style={{ color: '#3b82f6', fontSize: 13 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Self Assessment */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>🔎 Leadership Self-Assessment</h2>
          <p style={{ color: '#64748b', marginBottom: 28, fontSize: 15 }}>8 questions. Find out what leadership stage you're at — and exactly what to do next.</p>

          <div style={{ display: 'grid', gap: 24 }}>
            {questions.map((q, qi) => (
              <div key={qi}>
                <div style={{ fontWeight: 600, color: '#1e293b', marginBottom: 12, fontSize: 15 }}>
                  {qi + 1}. {q.q}
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {q.opts.map((opt, oi) => {
                    const sel = answers[qi] === q.scores[oi];
                    return (
                      <button key={oi} onClick={() => { setAnswers(a => ({ ...a, [qi]: q.scores[oi] })); setShowResult(false); }}
                        style={{ background: sel ? '#eff6ff' : '#f8fafc', border: `1px solid ${sel ? '#3b82f6' : '#e2e8f0'}`, borderRadius: 8, padding: '12px 16px', cursor: 'pointer', color: sel ? '#1d4ed8' : '#475569', textAlign: 'left', fontSize: 14, fontWeight: sel ? 700 : 400 }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {allAnswered && (
            <button onClick={() => setShowResult(true)}
              style={{ marginTop: 28, width: '100%', background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: 10, padding: '16px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
              See My Leadership Stage
            </button>
          )}

          {showResult && allAnswered && (
            <div style={{ marginTop: 24, background: '#f8fafc', borderRadius: 12, padding: 28, border: `2px solid ${stage.color}` }}>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>Your current stage</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: stage.color, marginBottom: 16 }}>{stage.label}</div>
              <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 12, fontSize: 16 }}>Your next 3 actions:</div>
              <ol style={{ margin: 0, padding: '0 0 0 20px', lineHeight: 2, color: '#475569' }}>
                {stage.next.map((n, i) => <li key={i} style={{ marginBottom: 4 }}>{n}</li>)}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
