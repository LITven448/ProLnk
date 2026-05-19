import { useState } from 'react';

type Solution = { cause: string; approach: string; diy: string; pro: string; proWhen: string };

const solutions: Record<string, Record<string, Solution>> = {
  kitchen: {
    first: { cause: 'Grease buildup (DFW BBQ/cooking culture)', approach: '🪠 Boiling water + dish soap flush. Then plunger. DFW kitchens see 3x national avg grease buildup — never pour fats down drain.', diy: '$0-10', pro: '$95-175', proWhen: 'If clog returns within 2 weeks' },
    recurring: { cause: 'Deep grease + soap scum layer in P-trap and drain line', approach: '🔧 Remove and clean P-trap ($0 DIY). Then enzyme drain cleaner for 48 hrs. For main line — hydro-jetting recommended.', diy: '$15-30', pro: '$200-500', proWhen: 'After 2 DIY attempts fail' },
  },
  bathroom: {
    first: { cause: 'Hair + DFW hard water soap scum combination', approach: '🔓 Drain snake (Zip-It tool $3). DFW hard water turns soap into solid calcium soap — physically remove, don’t dissolve.', diy: '$3-15', pro: '$85-150', proWhen: 'If snake won’t reach or pull clog' },
    recurring: { cause: 'Soap scum scale lining drain walls', approach: '⚗️ Enzyme drain cleaner monthly. DFW mineral deposits bind with hair creating rock-hard clogs. Consider installing hair catcher immediately.', diy: '$20-40', pro: '$150-300', proWhen: 'Monthly clogs = professional hydro-jet' },
  },
  mainline: {
    first: { cause: 'Clay soil root intrusion (very common in DFW)', approach: '📹 Get camera inspection first. DFW clay soil + mature oak/elm trees = root infiltration in homes over 15 years. Do NOT snake without camera.', diy: 'Camera rental $50-100', pro: '$150-400', proWhen: 'Always — main line needs pro' },
    recurring: { cause: 'Established root system or pipe damage from clay soil shifting', approach: '💥 Hydro-jetting + root killer treatment. DFW clay soil shifts 2-4 inches seasonally — can crack older clay or cast iron pipes.', diy: 'Not DIY', pro: '$400-1,200', proWhen: 'Immediately — recurring main line = serious issue' },
  },
};

export default function DFWDrainClogGuide() {
  const [drain, setDrain] = useState('');
  const [freq, setFreq] = useState('');
  const sol = drain && freq ? solutions[drain]?.[freq] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW PLUMBING GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🚰 Drain Clog Guide<br /><span style={{ color: '#F5E642′ }}>Dallas-Fort Worth Guide</span></h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, fontSize: 15 }}>DFW drain clogs have three unique causes: heavy grease from DFW cooking culture, hard water soap scum bonding with hair in bathrooms, and root intrusion from DFW clay soil shifting into older drain lines. Diagnosis determines the right tool.</p>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 12 }}>🌳 DFW ROOT INTRUSION RISK</div>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>DFW is built on expansive clay soil that shifts 2-4 inches seasonally. Homes over 15 years old with oak, elm, or pecan trees near drain lines are at high risk. Root intrusion accounts for 40% of DFW main line clogs — camera inspection before snaking is essential.</p>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>STEP 1: Which drain?</div>
          {[{ id: 'kitchen', label: '🍳 Kitchen sink' }, { id: 'bathroom', label: '🛁 Bathroom sink, tub, or shower' }, { id: 'mainline', label: '🏠 Multiple drains or main sewer line' }].map(o => (
            <button key={o.id} onClick={() => setDrain(o.id)}
              style={{ display: 'block', width: '100%', marginBottom: 8, background: drain === o.id ? '#1a3a5c' : '#0A1628', border: `2px solid ${drain === o.id ? '#F5E642' : '#2d3f5a'}`, borderRadius: 8, padding: '12px 16px', color: '#e2e8f0', textAlign: 'left', cursor: 'pointer', fontSize: 14 }}>
              {o.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>STEP 2: How often?</div>
          {[{ id: 'first', label: '1️⃣ First time clogging' }, { id: 'recurring', label: '🔁 Happened before (recurring)' }].map(o => (
            <button key={o.id} onClick={() => setFreq(o.id)}
              style={{ display: 'block', width: '100%', marginBottom: 8, background: freq === o.id ? '#1a3a5c' : '#0A1628', border: `2px solid ${freq === o.id ? '#F5E642' : '#2d3f5a'}`, borderRadius: 8, padding: '12px 16px', color: '#e2e8f0', textAlign: 'left', cursor: 'pointer', fontSize: 14 }}>
              {o.label}
            </button>
          ))}
        </div>

        {sol && (
          <div style={{ background: '#1e2d47', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🔍 Likely Cause: {sol.cause}</div>
            <p style={{ color: '#cbd5e1', marginBottom: 16 }}>{sol.approach}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><div style={{ color: '#64748b', fontSize: 11 }}>DIY COST</div><div style={{ color: '#22c55e', fontWeight: 700, marginTop: 4 }}>{sol.diy}</div></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><div style={{ color: '#64748b', fontSize: 11 }}>PRO COST</div><div style={{ color: '#f97316', fontWeight: 700, marginTop: 4 }}>{sol.pro}</div></div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><div style={{ color: '#64748b', fontSize: 11 }}>CALL A PRO WHEN</div><div style={{ color: '#e2e8f0', fontSize: 13, marginTop: 4 }}>{sol.proWhen}</div></div>
          </div>
        )}
      </div>
    </div>
  );
}
