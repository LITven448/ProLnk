import { useState } from 'react';

const questions = [
  { q: 'Where is your main water shutoff valve?', a: 'In DFW, this is typically near the street in a ground box or inside near the water meter connection. Knowing this location can prevent thousands in water damage during a burst pipe.' },
  { q: 'What is your home\’s water pressure?', a: 'Normal residential pressure is 40–80 PSI. DFW municipal pressure often runs high (80–100 PSI), which stresses pipes and appliances. A pressure gauge costs $10 at any hardware store. Above 80 PSI? Install a pressure regulator.' },
  { q: 'Is your water heater gas or electric?', a: 'Gas water heaters heat faster and cost less to run in DFW. Electric are safer in flood-prone areas. Knowing your type helps you troubleshoot pilot light issues (gas) or tripped breakers (electric).' },
  { q: 'How old is your water heater?', a: 'Average water heater life is 8–12 years. Find the manufacture date in the serial number — first 4 digits are usually year and week. DFW hard water deposits shorten life; flush the tank annually.' },
  { q: 'Do you have a water softener?', a: 'DFW water is notoriously hard (300–500 mg/L hardness). A softener protects pipes, appliances, and skin. Know where it is, how to add salt, and when to regenerate the resin tank.' },
  { q: 'What are the signs of a slab leak?', a: 'DFW homes are predominantly on concrete slabs. Signs: unexplained water bills increase, hot spots on floors, sound of running water when nothing is on, mold near baseboards, or foundation shifting. Act immediately — slab leaks cost $2K–$10K to repair.' },
  { q: 'Where is your water heater\’s pressure relief valve?', a: 'The T&P (temperature & pressure) relief valve is a safety device on the side or top of your water heater. It should be tested annually — lift the lever briefly. If it leaks after testing, replace it immediately.' },
  { q: 'Do you know how to shut off water to individual fixtures?', a: 'Each toilet, sink, and appliance has its own supply shutoff — typically an oval knob under or behind the fixture. These seize up if never turned; exercise them annually to keep them operational.' },
  { q: 'Is your water meter accessible?', a: 'Your meter is at the street in a covered box. Knowing how to read it lets you detect leaks (check the dial when no water is in use) and verify your bill. DFW meters are typically read monthly.' },
  { q: 'Do you have a tankless water heater?', a: 'Tankless heaters last 20+ years but need annual descaling in DFW due to hard water. Know where the service ports are and whether your unit has a built-in flush mode.' },
  { q: 'What material are your supply pipes?', a: 'Older DFW homes (pre-1990) may have galvanized steel (corrodes) or copper. Homes built after 2000 typically have PEX. Galvanized pipes restrict water flow and discolor water — a major red flag.' },
  { q: 'Do you have a whole-home water filter?', a: 'DFW municipal water is safe but has chlorine, chloramines, and sediment. Whole-home filters have sediment and carbon stages. Know filter change intervals (typically 3–12 months per stage).' },
  { q: 'What is your sewer cleanout location?', a: 'The cleanout is a capped pipe giving direct access to your main sewer line, usually in the yard near the house. Know its location before a blockage — plumbers need it to snake or hydro-jet the line.' },
  { q: 'Do you have a grease trap or interceptor?', a: 'Most DFW residential homes do not, but if you have a commercial kitchen or a home with heavy cooking use, you might. Grease in municipal sewers is a code violation and causes backups.' },
  { q: 'Is your outdoor hose bib frost-free?', a: 'DFW gets hard freezes (2–5 nights/year). Frost-free sillcocks have a long stem that shuts off inside the wall. Standard bibs must be covered or shut off from inside during freezes. Know which type you have.' },
];

export default function DFWPlumbingQuestionsGuide() {
  const [open, setOpen] = useState<number | null>(null);
  const [checked, setChecked] = useState<boolean[]>(Array(questions.length).fill(false));
  const [quizMode, setQuizMode] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<boolean[]>(Array(questions.length).fill(false));

  const toggle = (i: number) => setOpen(open === i ? null : i);
  const check = (i: number) => setChecked(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
  const score = checked.filter(Boolean).length;
  const quizScore = quizAnswers.filter(Boolean).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Plumbing Knowledge Guide</h1>
          <p style={{ color: '#8899aa', fontSize: 15 }}>15 plumbing questions every DFW homeowner should know cold</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 14 }}>
            <button onClick={() => setQuizMode(false)} style={{ background: !quizMode ? '#F5E642' : '#1a2a40', color: !quizMode ? '#0A1628' : '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 700, cursor: 'pointer' }}>📖 Learn</button>
            <button onClick={() => setQuizMode(true)} style={{ background: quizMode ? '#F5E642' : '#1a2a40', color: quizMode ? '#0A1628' : '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 700, cursor: 'pointer' }}>🧪 Self-Quiz</button>
          </div>
        </div>
        {!quizMode ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: 16, background: '#1a2a40', borderRadius: 8, padding: '8px 20px', display: 'inline-block', marginLeft: '50%', transform: 'translateX(-50%)' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{score}</span><span style={{ color: '#8899aa', fontSize: 14 }}> / {questions.length} known</span>
            </div>
            {questions.map((item, i) => (
              <div key={i} style={{ background: '#111f35', borderRadius: 10, marginBottom: 10, border: checked[i] ? '1.5px solid #F5E642' : '1.5px solid #1e3050' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', cursor: 'pointer', gap: 12 }} onClick={() => toggle(i)}>
                  <span onClick={e => { e.stopPropagation(); check(i); }} style={{ fontSize: 20, cursor: 'pointer' }}>{checked[i] ? '✅' : '⬜'}</span>
                  <span style={{ flex: 1, fontWeight: 600, fontSize: 15 }}>{i + 1}. {item.q}</span>
                  <span style={{ color: '#F5E642', fontSize: 18 }}>{open === i ? '▲' : '▼'}</span>
                </div>
                {open === i && <div style={{ padding: '0 16px 16px 52px', color: '#aabbcc', fontSize: 14, lineHeight: 1.7 }}>{item.a}</div>}
              </div>
            ))}
          </>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{quizScore}</span><span style={{ color: '#8899aa', fontSize: 14 }}> / {questions.length} — {quizScore >= 12 ? '🏆 Expert' : quizScore >= 8 ? '👍 Solid' : '📚 Keep Learning'}</span>
            </div>
            {questions.map((item, i) => (
              <div key={i} style={{ background: '#111f35', borderRadius: 10, marginBottom: 10, border: '1.5px solid #1e3050', padding: '14px 16px' }}>
                <p style={{ fontWeight: 600, fontSize: 15, margin: '0 0 10px' }}>{i + 1}. {item.q}</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => setQuizAnswers(prev => { const n = [...prev]; n[i] = true; return n; })} style={{ background: quizAnswers[i] === true ? '#16a34a' : '#1a2a40', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 18px', cursor: 'pointer', fontWeight: 600 }}>✓ I Know This</button>
                  <button onClick={() => setQuizAnswers(prev => { const n = [...prev]; n[i] = false; return n; })} style={{ background: quizAnswers[i] === false && quizScore > 0 ? '#991b1b' : '#1a2a40', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 18px', cursor: 'pointer', fontWeight: 600 }}>✗ Need to Learn</button>
                </div>
              </div>
            ))}
          </>
        )}
        <div style={{ textAlign: 'center', marginTop: 28, color: '#8899aa', fontSize: 13 }}>Powered by <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> — DFW's trusted home services marketplace</div>
      </div>
    </div>
  );
}
