import { useState } from 'react';

const sleepProblems = ['Too hot to fall asleep', 'Wake up sweating at night', 'Stuffy / congested at night', 'Too dry — wake up with dry mouth', 'Inconsistent temperatures', 'Allergies disrupting sleep'];
const dfwSeasons = ['Summer (Jun–Sep) 95–108°F nights', 'Fall (Oct–Nov) 55–75°F variable', 'Winter (Dec–Feb) 25–55°F', 'Spring (Mar–May) 60–85°F, stormy', 'Cedar fever season (Jan–Mar)'];

type SleepPlan = { thermostat: string[]; fanSettings: string; improvement: string; notes: string[]; };

function getSleepPlan(problem: string, season: string): SleepPlan {
  const isSummer = season.includes('Summer');
  const isWinter = season.includes('Winter');
  const isCedar = season.includes('Cedar');
  const isHot = problem.includes('hot') || problem.includes('sweating');
  const isDry = problem.includes('dry');
  const isStudy = problem.includes('Stuffy');
  return {
    thermostat: [
      `🌙 Set sleep temp to 66–68°F — optimal for deep sleep in DFW ${isSummer ? 'summers' : 'variable weather'}`,
      isSummer ? '⏰ Pre-cool bedroom to 64°F by 9pm before body heat raises it during sleep' : '🌡️ Program thermostat: 72°F daytime → 67°F at 9pm → 70°F at 6am wake-up',
      isHot ? '❄️ Enable "cool surge" — drop 2°F below target temp for 30 min before bedtime' : '📱 Use smart thermostat sleep mode — gradual 1°F rise toward morning matches circadian rhythm',
      isDry && isWinter ? '💧 Set whole-home humidifier to 40–45% in winter — DFW winter strips humidity below 20%' : '🔄 Run HVAC on 20-min cycles during sleep rather than constant — prevents temperature swings',
      isCedar ? '🔬 MERV 13 filter essential — change weekly during cedar season for sleep-disrupting pollen' : '✅ Ensure bedroom vents are open and unobstructed — restricted airflow raises sleep temp 3–5°F',
    ],
    fanSettings: isSummer ? 'Ceiling fan: high speed, counterclockwise (summer mode). Creates 4°F wind chill effect, lets AC thermostat set 4° higher saving 8–10% on bills.' : isWinter ? 'Ceiling fan: low speed, clockwise (winter mode). Pushes warm air down from ceiling without creating cold draft.' : 'Ceiling fan: medium speed, counterclockwise. Use timer to shut off 2 hours after sleep onset.',
    improvement: isHot && isSummer ? 'Expected: fall asleep 18 min faster, reduce night wake-ups by 60%, wake feeling 40% more rested' : isDry ? 'Expected: eliminate dry mouth wake-ups, reduce nasal congestion by 70%, improve sleep continuity' : 'Expected: 45 min more deep sleep per night, 30% reduction in night wake-ups',
    notes: [
      '🧬 Body core temp must drop 2–3°F to initiate sleep — DFW summer nights above 85°F make this nearly impossible without AC',
      '🏠 Bedroom doors should stay closed with AC running — open doors raise bedroom temp 4–7°F',
      isSummer ? '⚡ DFW peak demand pricing hits 6–9pm — pre-cool before 6pm to avoid expensive cooling cycles' : '🌬️ DFW spring storms bring outdoor humidity spikes — set AC to "dry" mode on stormy nights',
    ],
  };
}

export default function DFWHVACSleepGuide() {
  const [problem, setProblem] = useState('');
  const [season, setSeason] = useState('');
  const [plan, setPlan] = useState<SleepPlan | null>(null);
  function generate() { if (problem && season) setPlan(getSleepPlan(problem, season)); }
  const sel = { width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EAF0', fontSize: 14 } as const;
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', paddingBottom: 60 }}>
      <div style={{ background: 'linear-gradient(135deg, #0D1F3C 0%, #0A1628 100%)', borderBottom: '1px solid #1E3A5F', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW HVAC GUIDE</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>Better Sleep Through HVAC<br /><span style={{ color: '#F5E642' }}>in DFW's Climate</span></h1>
          <p style={{ fontSize: 17, color: '#A8B4C8', lineHeight: 1.7, margin: 0 }}>The optimal sleeping temperature is 65–68°F. DFW nights routinely exceed 85°F in summer. Here's how to program your thermostat and configure your fans for the deepest sleep of your life.</p>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[['😴', '65–68°F', 'Optimal sleep temperature'], ['🌙', '85°F+', 'DFW summer night lows'], ['⏱️', '18 min', 'Faster sleep onset at ideal temp']].map(([icon, stat, label]) => (
            <div key={label} style={{ background: '#0D1F3C', borderRadius: 12, padding: '20px 16px', textAlign: 'center', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642' }}>{stat}</div>
              <div style={{ fontSize: 12, color: '#6B7A99', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', color: '#F5E642' }}>🌙 Get Your DFW Sleep Strategy</h2>
          <p style={{ fontSize: 13, color: '#6B7A99', margin: '0 0 20px' }}>Tell us your sleep problem and current DFW season for a personalized thermostat and fan strategy.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#A8B4C8', marginBottom: 8, fontWeight: 600 }}>SLEEP PROBLEM</label>
              <select value={problem} onChange={e => setProblem(e.target.value)} style={sel}>
                <option value="">Select problem</option>
                {sleepProblems.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#A8B4C8', marginBottom: 8, fontWeight: 600 }}>DFW SEASON</label>
              <select value={season} onChange={e => setSeason(e.target.value)} style={sel}>
                <option value="">Select season</option>
                {dfwSeasons.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={generate} disabled={!problem || !season} style={{ background: problem && season ? '#F5E642' : '#1E3A5F', color: problem && season ? '#0A1628' : '#4A5568', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: problem && season ? 'pointer' : 'not-allowed' }}>Get My Sleep Strategy →</button>
        </div>
        {plan && (
          <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, border: '1px solid #F5E642' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px', color: '#F5E642' }}>Your DFW Sleep HVAC Strategy</h3>
            <div style={{ marginBottom: 20 }}>
              {plan.thermostat.map((item, i) => <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1E3A5F', fontSize: 14, lineHeight: 1.6 }}>{item}</div>)}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 14, marginBottom: 16, borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>🌀 FAN SETTINGS</div>
              <div style={{ fontSize: 13, color: '#A8B4C8', lineHeight: 1.7 }}>{plan.fanSettings}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 14, marginBottom: 16, borderLeft: '3px solid #22C55E' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#22C55E', marginBottom: 6 }}>📈 EXPECTED IMPROVEMENT</div>
              <div style={{ fontSize: 13, color: '#A8B4C8', lineHeight: 1.7 }}>{plan.improvement}</div>
            </div>
            <div>
              {plan.notes.map((n, i) => <div key={i} style={{ fontSize: 13, color: '#6B7A99', padding: '5px 0', lineHeight: 1.6 }}>{n}</div>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
