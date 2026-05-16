import { useState } from 'react';

const QUESTIONS = [
  { q: 'What does DFW stand for?', opts: ['Dallas-Fort Worth', 'Dallas-Frisco-Waxahachie', 'Downtown Fort Worth', 'Dallas Federal Way'], ans: 0 },
  { q: 'Which Texas county has the highest property tax rate in DFW?', opts: ['Collin County', 'Tarrant County', 'Denton County', 'Rockwall County'], ans: 1 },
  { q: 'What is the deadline to file a property tax protest in Texas?', opts: ['March 31', 'April 30', 'May 15', 'June 1'], ans: 2 },
  { q: 'Which home improvement has the highest ROI in DFW?', opts: ['Swimming Pool', 'Attic Insulation', 'Sunroom Addition', 'Home Theater'], ans: 1 },
  { q: 'What does TDLR stand for in Texas contracting?', opts: ['Texas Dept of Licensing and Regulation', 'Texas Development and Land Registry', 'Texas Division of Licensed Roofers', 'Texas Dept of Leasing Rights'], ans: 0 },
  { q: 'What is a typical seller closing cost percentage in DFW?', opts: ['1-2%', '3-4%', '6-9%', '12-15%'], ans: 2 },
  { q: 'What document must Texas plumbers be licensed through?', opts: ['TDLR', 'TCEQ', 'HUD', 'TREC'], ans: 1 },
  { q: 'Which DFW submarket typically commands the highest rental rates?', opts: ['Mesquite', 'Garland', 'Uptown Dallas', 'Arlington'], ans: 2 },
  { q: 'What is the typical cap on Texas homestead exemption for school taxes?', opts: [',000', ',000', ',000', ',000'], ans: 3 },
  { q: 'What does ARB stand for in the Texas property tax protest process?', opts: ['Annual Review Board', 'Appraisal Review Board', 'Assessed Rate Bureau', 'Arbitration Resolution Board'], ans: 1 },
];

const LEVELS = [
  { min: 10, title: 'DFW Homeowner Legend', badge: '🏆', color: '#F5E642' },
  { min: 8, title: 'DFW Property Expert', badge: '🥇', color: '#ffd700' },
  { min: 6, title: 'DFW Homeowner Pro', badge: '🥈', color: '#c0c0c0' },
  { min: 4, title: 'DFW Homeowner Apprentice', badge: '🥉', color: '#cd7f32' },
  { min: 0, title: 'DFW Homeowner Rookie', badge: '🏠', color: '#8899bb' },
];

export default function DFWHomeOwnershipCertificate() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [ownerName, setOwnerName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const q = QUESTIONS[current];
  const score = Object.entries(answers).filter(([i, a]) => a === QUESTIONS[i].ans).length;
  const level = LEVELS.find(l => score >= l.min) || LEVELS[LEVELS.length - 1];

  function choose(i) { if (selected !== null) return; setSelected(i); }

  function next() {
    setAnswers(a => ({...a, [current]: selected}));
    if (current < QUESTIONS.length - 1) { setCurrent(c => c + 1); setSelected(null); }
    else setShowResult(true);
  }

  function restart() { setCurrent(0); setAnswers({}); setSelected(null); setShowResult(false); setNameSubmitted(false); }

  if (!nameSubmitted) return (
    <div style={{ background: '#0A1628', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🏠</div>
        <h1 style={{ margin: '0 0 0.5rem', fontSize: 28, fontWeight: 800, color: '#F5E642' }}>DFW Homeowner Certificate</h1>
        <p style={{ color: '#8899bb', fontSize: 15, marginBottom: '2rem' }}>Answer 10 questions about DFW real estate and earn your official Homeowner Knowledge Certificate!</p>
        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#ccc', marginBottom: 8, textAlign: 'left' }}>Your Name (for the certificate)</label>
          <input value={ownerName} onChange={e => setOwnerName(e.target.value)} placeholder='Enter your full name' style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1.5px solid #2a3a50', background: '#0A1628', color: '#fff', fontSize: 15, boxSizing: 'border-box', marginBottom: '1rem' }} />
          <button onClick={() => ownerName && setNameSubmitted(true)} style={{ width: '100%', background: '#F5E642', color: '#0A1628', padding: '13px', borderRadius: 10, border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            🚀 Start the Quiz
          </button>
        </div>
      </div>
    </div>
  );

  if (showResult) return (
    <div style={{ background: '#0A1628', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 560, width: '100%' }}>
        <div style={{ background: 'linear-gradient(135deg, #132035, #1e3a6e)', borderRadius: 20, padding: '2.5rem', textAlign: 'center', border: , boxShadow:  }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>{level.badge}</div>
          <div style={{ fontSize: 12, color: level.color, fontWeight: 700, letterSpacing: 3, marginBottom: 8, textTransform: 'uppercase' }}>Certificate of Achievement</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>This certifies that</div>
          <div style={{ fontSize: 30, fontWeight: 900, color: '#F5E642', marginBottom: 4 }}>{ownerName}</div>
          <div style={{ fontSize: 16, color: '#ccc', marginBottom: '1.5rem' }}>has earned the designation of</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: level.color, marginBottom: '1.5rem' }}>{level.title}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#F5E642' }}>{score}/10</div>
              <div style={{ fontSize: 13, color: '#8899bb' }}>Questions Correct</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#4ade80' }}>{score * 10}%</div>
              <div style={{ fontSize: 13, color: '#8899bb' }}>Mastery Score</div>
            </div>
          </div>
          <div style={{ background: 'rgba(245,230,66,0.1)', borderRadius: 10, padding: '0.75rem', marginBottom: '1.5rem', fontSize: 13, color: '#ccc' }}>
            📅 Issued May 2026 &nbsp;|&nbsp; 🌟 DFW Real Estate Knowledge Verified &nbsp;|&nbsp; 🏠 ProLnk Certified
          </div>
          <button onClick={restart} style={{ background: '#F5E642', color: '#0A1628', padding: '12px 32px', borderRadius: 10, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            🔄 Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ color: '#8899bb', fontSize: 13 }}>Question {current + 1} of {QUESTIONS.length}</div>
          <div style={{ background: '#132035', borderRadius: 20, padding: '4px 14px', fontSize: 13, color: '#F5E642', fontWeight: 700 }}>Score: {score}</div>
        </div>
        <div style={{ background: '#1e2e4a', borderRadius: 4, height: 6, marginBottom: '1.5rem', overflow: 'hidden' }}>
          <div style={{ background: '#F5E642', height: '100%', width: , transition: 'width 0.4s' }} />
        </div>
        <div style={{ background: '#132035', borderRadius: 16, padding: '2rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: '1.5rem', lineHeight: 1.5 }}>{current + 1}. {q.q}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {q.opts.map((opt, i) => {
              let bg = '#0A1628', border = '#2a3a50', color = '#ccc';
              if (selected !== null) {
                if (i === q.ans) { bg = '#0f2a1a'; border = '#4ade80'; color = '#4ade80'; }
                else if (i === selected && selected !== q.ans) { bg = '#2a0a0a'; border = '#f87171'; color = '#f87171'; }
              } else if (selected === i) { bg = '#1e3a6e'; border = '#F5E642'; color = '#F5E642'; }
              return (
                <div key={i} onClick={() => choose(i)} style={{ background: bg, border: , borderRadius: 10, padding: '0.85rem 1.1rem', cursor: selected === null ? 'pointer' : 'default', color, fontWeight: 500, fontSize: 14, transition: 'all 0.2s' }}>
                  {['A','B','C','D'][i]}. {opt}
                </div>
              );
            })}
          </div>
        </div>
        {selected !== null && (
          <button onClick={next} style={{ width: '100%', background: '#F5E642', color: '#0A1628', padding: '13px', borderRadius: 10, border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            {current < QUESTIONS.length - 1 ? 'Next Question →' : '🏆 See My Certificate'}
          </button>
        )}
      </div>
    </div>
  );
}
