import { useState } from 'react';

type Question = { id: string; text: string; options: { label: string; points: number }[] };

const questions: Question[] = [
  { id: 'solar', text: '☀️ Do you have rooftop solar panels?', options: [{ label: 'Yes, grid-tied (no battery)', points: 8 }, { label: 'Yes, with battery storage', points: 18 }, { label: 'No, but I\’m planning to install', points: 3 }, { label: 'No solar at all', points: 0 }] },
  { id: 'battery', text: '🔋 Do you have home battery storage?', options: [{ label: 'Yes, 10+ kWh (e.g. Powerwall)', points: 18 }, { label: 'Yes, under 10 kWh', points: 10 }, { label: 'No, but planning to add', points: 3 }, { label: 'No battery storage', points: 0 }] },
  { id: 'generator', text: '⛽ Do you have a backup generator?', options: [{ label: 'Yes, whole-home standby (natural gas/propane)', points: 10 }, { label: 'Yes, portable generator', points: 5 }, { label: 'No generator', points: 0 }] },
  { id: 'ev', text: '🚗 Do you have an electric vehicle?', options: [{ label: 'Yes, with V2H (Vehicle-to-Home) capability', points: 10 }, { label: 'Yes, standard EV', points: 5 }, { label: 'Planning to get one', points: 2 }, { label: 'No EV', points: 0 }] },
  { id: 'hvac', text: '🌡️ What is your primary heating/cooling system?', options: [{ label: 'Heat pump (electric — most efficient)', points: 10 }, { label: 'Central AC + gas furnace', points: 4 }, { label: 'Window units / space heaters', points: 2 }, { label: 'Older HVAC, 10+ years old', points: 0 }] },
  { id: 'appliances', text: '🍳 What are your major appliances running on?', options: [{ label: 'All electric (stove, dryer, water heater)', points: 8 }, { label: 'Mostly electric, some gas', points: 5 }, { label: 'Mostly gas appliances', points: 2 }, { label: 'Unsure / mixed', points: 1 }] },
  { id: 'water', text: '💧 What is your water heating situation?', options: [{ label: 'Heat pump water heater (most efficient)', points: 8 }, { label: 'Electric tank water heater', points: 4 }, { label: 'Natural gas water heater', points: 2 }, { label: 'Tankless gas', points: 3 }] },
  { id: 'smart', text: '📱 Do you have smart home energy controls?', options: [{ label: 'Yes — smart thermostat + energy monitor + smart plugs', points: 8 }, { label: 'Yes — smart thermostat only', points: 4 }, { label: 'Partial — some smart devices', points: 2 }, { label: 'No smart controls', points: 0 }] },
  { id: 'insulation', text: '🏠 How well insulated is your DFW home?', options: [{ label: 'Recently upgraded — spray foam, double-pane windows, air sealed', points: 8 }, { label: 'Standard insulation, adequate but not upgraded', points: 4 }, { label: 'Older home, drafty windows, minimal insulation', points: 1 }, { label: 'Not sure', points: 2 }] },
  { id: 'monitoring', text: '📊 Do you actively monitor your energy usage?', options: [{ label: 'Yes — real-time monitoring app + rate optimization', points: 4 }, { label: 'Yes — I check my utility bill monthly', points: 2 }, { label: 'Rarely — I just pay the bill', points: 0 }] },
];

const getScoreLabel = (score: number) => {
  if (score >= 80) return { label: 'Energy Independent', color: '#22C55E', emoji: '🏆' };
  if (score >= 60) return { label: 'Energy Resilient', color: '#84CC16', emoji: '⭐' };
  if (score >= 40) return { label: 'Partially Independent', color: '#F5E642', emoji: '📈' };
  if (score >= 20) return { label: 'Grid Dependent', color: '#F97316', emoji: '⚠️' };
  return { label: 'Fully Grid Dependent', color: '#EF4444', emoji: '🔌' };
};

const improvements = [
  { id: 'solar', label: 'Add solar panels', scoreBoost: '+15–18 pts', cost: '$18,000–$28,000', payback: '7–10 yrs' },
  { id: 'battery', label: 'Add battery storage', scoreBoost: '+10–18 pts', cost: '$11,500–$23,000', payback: '8–12 yrs' },
  { id: 'hvac', label: 'Upgrade to heat pump', scoreBoost: '+6–10 pts', cost: '$4,000–$8,000', payback: '5–8 yrs' },
  { id: 'smart', label: 'Install smart energy controls', scoreBoost: '+4–8 pts', cost: '$500–$2,000', payback: '2–4 yrs' },
  { id: 'appliances', label: 'Electrify appliances', scoreBoost: '+3–8 pts', cost: '$3,000–$8,000', payback: '6–10 yrs' },
  { id: 'generator', label: 'Add standby generator', scoreBoost: '+5–10 pts', cost: '$5,000–$12,000', payback: '10–15 yrs' },
];

export default function DFWEnergyIndependenceScore() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const answered = Object.keys(answers).length;
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = 92;
  const normalizedScore = Math.min(100, Math.round((totalScore / maxScore) * 100));
  const scoreInfo = getScoreLabel(normalizedScore);

  const setAnswer = (qId: string, pts: number) => { setAnswers(prev => ({ ...prev, [qId]: pts })); setShowResult(false); };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚡🏆🏠</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Home Energy Independence Score</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>10-Question Assessment — Find Your Score and What to Do Next</p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 8, padding: '12px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #1E3A5F' }}>
          <span style={{ color: '#94A3B8', fontSize: 14 }}>{answered} of {questions.length} answered</span>
          <div style={{ flex: 1, margin: '0 16px', background: '#0A1628', borderRadius: 20, height: 8, overflow: 'hidden' }}>
            <div style={{ width: `${(answered / questions.length) * 100}%`, background: '#F5E642', height: '100%', borderRadius: 20, transition: 'width 0.3s' }} />
          </div>
          <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{Math.round((answered / questions.length) * 100)}%</span>
        </div>

        {questions.map((q, qi) => (
          <div key={q.id} style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 16, border: `1px solid ${answers[q.id] !== undefined ? '#F5E642' : '#1E3A5F'}` }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14, color: answers[q.id] !== undefined ? '#F5E642′ : '#E8EDF5' }}>{qi + 1}. {q.text}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {q.options.map(opt => (
                <button key={opt.label} onClick={() => setAnswer(q.id, opt.points)}
                  style={{ textAlign: 'left', padding: '10px 14px', borderRadius: 8, border: `1px solid ${answers[q.id] === opt.points ? '#F5E642' : '#1E3A5F'}`, background: answers[q.id] === opt.points ? '#1E3A5F' : '#0A1628', color: answers[q.id] === opt.points ? '#F5E642′ : '#E8EDF5', cursor: ’pointer', fontSize: 14 }}>
                  {answers[q.id] === opt.points ? '✓ ' : ''}{opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        {answered === questions.length && (
          <button onClick={() => setShowResult(true)}
            style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 0', fontSize: 18, fontWeight: 800, cursor: 'pointer', marginBottom: 24 }}>
            Calculate My DFW Energy Independence Score →
          </button>
        )}

        {showResult && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: 28, border: '2px solid #F5E642', marginBottom: 24 }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>{scoreInfo.emoji}</div>
              <div style={{ fontSize: 72, fontWeight: 900, color: scoreInfo.color, lineHeight: 1 }}>{normalizedScore}</div>
              <div style={{ fontSize: 14, color: '#94A3B8', marginTop: 4 }}>out of 100</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: scoreInfo.color, marginTop: 8 }}>{scoreInfo.label}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, height: 16, overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ width: `${normalizedScore}%`, height: '100%', background: scoreInfo.color, borderRadius: 8, transition: 'width 1s' }} />
            </div>
            <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🚀 Top Ways to Improve Your Score</h3>
            {improvements.map(imp => (
              <div key={imp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 14, background: '#0A1628', borderRadius: 8, marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{imp.label}</div>
                  <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 2 }}>Cost: {imp.cost} · Payback: {imp.payback}</div>
                </div>
                <div style={{ background: '#1E3A5F', padding: '4px 12px', borderRadius: 20, color: '#F5E642', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', marginLeft: 12 }}>{imp.scoreBoost}</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
