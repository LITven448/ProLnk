import { useState } from 'react';

const questions = [
  { q: 'What SEER rating is your system?', a: 'SEER (Seasonal Energy Efficiency Ratio) measures cooling efficiency. In DFW, 14–16 SEER is standard; 18+ is high-efficiency. Check your outdoor unit nameplate or your original installation paperwork.' },
  { q: 'Where is your air handler (indoor unit)?', a: 'Usually in a closet, attic, or utility room. Knowing its location lets you shut it down quickly during a leak or failure and helps technicians locate it fast.' },
  { q: 'How old is your system?', a: 'DFW systems average 12–15 years due to heavy summer use. Find the manufacture date on the outdoor unit nameplate. Systems older than 10 years should be inspected annually.' },
  { q: 'What refrigerant type does it use?', a: 'R-22 (Freon) was phased out in 2020 and is expensive to recharge. R-410A is the current standard. R-32 and R-454B are emerging. Knowing yours affects repair vs replace decisions.' },
  { q: 'Where is your filter, and what size?', a: 'Filters are typically at the air handler or a wall/ceiling return grille. Note the size printed on the frame (e.g., 20x25x1). DFW dust requires monthly checks.' },
  { q: 'Is your condensate drain line clear?', a: 'Clogged drain lines cause water damage and system shutdowns. The drain line runs from your air handler to a floor drain or outside. Pour a cup of diluted bleach monthly in summer.' },
  { q: 'When was your last professional tune-up?', a: 'Annual maintenance in spring before DFW summers is critical. A tune-up includes coil cleaning, refrigerant check, electrical inspection, and drain flushing.' },
  { q: 'Do you know how to reset your thermostat?', a: 'Most smart thermostats have a factory reset. Knowing this saves a service call when the system behaves oddly after a power surge — common in DFW storm season.' },
  { q: 'What brand is your outdoor condenser?', a: 'Brand knowledge matters for warranty claims, part availability, and finding certified technicians. Common DFW brands: Trane, Lennox, Carrier, Rheem, York.' },
  { q: 'Do you have a zone system?', a: 'Zone systems use multiple thermostats and dampers to control temperature in different areas. If you have one, know where the zone controller is and how to override individual zones.' },
  { q: 'Is your outdoor unit on a level pad?', a: 'A tilted condenser causes refrigerant pooling, compressor damage, and noise. Check it visually; the pad should be level. DFW clay soil can shift pads over time.' },
  { q: 'Do you have UV germicidal lights installed?', a: 'UV lights in the air handler kill mold and bacteria on the evaporator coil — especially valuable in humid DFW summers. Bulbs last 1–2 years and need replacement.' },
  { q: 'What is the square footage your system is rated for?', a: 'A system undersized for your home runs constantly and fails early. In DFW, you need approximately 1 ton per 400–600 sq ft depending on insulation and sun exposure.' },
  { q: 'Do you have an emergency heat source (for heat pump owners)?', a: 'Heat pumps use electric resistance backup heat when temps drop below 35°F — rare in DFW but it happens. Know if yours has it and what it costs to run.' },
  { q: 'Do you know your warranty status?', a: 'Most equipment warranties are 5–10 years on parts, 1 year on labor. Register your equipment with the manufacturer after install. Extended warranties require annual maintenance records.' },
];

export default function DFWHVACQuestionsGuide() {
  const [open, setOpen] = useState<number | null>(null);
  const [checked, setChecked] = useState<boolean[]>(Array(questions.length).fill(false));

  const toggle = (i: number) => setOpen(open === i ? null : i);
  const check = (i: number) => setChecked(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
  const score = checked.filter(Boolean).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW HVAC Knowledge Guide</h1>
          <p style={{ color: '#8899aa', fontSize: 15 }}>15 questions every DFW homeowner should be able to answer about their HVAC system</p>
          <div style={{ marginTop: 12, background: '#1a2a40', borderRadius: 8, padding: '8px 20px', display: 'inline-block' }}>
            <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{score}</span>
            <span style={{ color: '#8899aa', fontSize: 14 }}> / {questions.length} answered</span>
          </div>
        </div>
        {questions.map((item, i) => (
          <div key={i} style={{ background: '#111f35', borderRadius: 10, marginBottom: 10, border: checked[i] ? '1.5px solid #F5E642' : '1.5px solid #1e3050' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', cursor: 'pointer', gap: 12 }} onClick={() => toggle(i)}>
              <span onClick={e => { e.stopPropagation(); check(i); }} style={{ fontSize: 20, cursor: 'pointer' }}>{checked[i] ? '✅' : '⬜'}</span>
              <span style={{ flex: 1, fontWeight: 600, fontSize: 15 }}>{i + 1}. {item.q}</span>
              <span style={{ color: '#F5E642', fontSize: 18 }}>{open === i ? '▲' : '▼'}</span>
            </div>
            {open === i && (
              <div style={{ padding: '0 16px 16px 52px', color: '#aabbcc', fontSize: 14, lineHeight: 1.7 }}>{item.a}</div>
            )}
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: 28, color: '#8899aa', fontSize: 13 }}>
          Powered by <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> — Connecting DFW homeowners with trusted pros
        </div>
      </div>
    </div>
  );
}
