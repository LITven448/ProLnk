import { useState } from 'react';

const SITUATIONS = [
  { label: '🏠 New homeowner — just moved in', key: 'new' },
  { label: '⚠️ My system broke down unexpectedly', key: 'broke' },
  { label: '🔄 System is 10+ years old — planning ahead', key: 'aging' },
  { label: '💸 Bills are high — need to save money', key: 'bills' },
  { label: '🌡️ Worried about summer heat season', key: 'summer' },
  { label: '❄️ Just installed a new system', key: 'new_install' },
];

const GUIDE: Record<string, { title: string; sections: { heading: string; points: string[] }[]; action: string }> = {
  new: {
    title: 'New Homeowner HVAC Checklist',
    sections: [
      { heading: '📋 First Week', points: ['Locate your thermostat and air handler/furnace', 'Find filter location and check filter condition', 'Note brand, model, serial number for records', 'Verify system cools to set point within 20 min'] },
      { heading: '📅 First Month', points: ['Schedule an inspection if system is 5+ years old', 'Check warranty transfer (many are non-transferable)', 'Register system with manufacturer if < 60 days from install', 'Set up a maintenance reminder for twice a year'] },
      { heading: '🌡️ DFW Specific', points: ['Expect 7-month cooling season (April–October)', 'Budget $200–400/yr for maintenance in DFW heat', 'Attic unit should be inspected for insulation and duct leaks', 'A 10-yr-old DFW unit = a 30-yr-old unit in Minnesota'] },
    ],
    action: 'Schedule an HVAC inspection within 30 days to baseline your system condition.',
  },
  broke: {
    title: 'Emergency Breakdown Guide',
    sections: [
      { heading: '🚨 Immediate Steps', points: ['Switch thermostat to fan-only to circulate air', 'Check breaker panel — HVAC has its own breaker', 'Replace filter if very dirty (can cause freeze-up)', 'Check condensate drain for blockage (common DFW issue)'] },
      { heading: '🔍 What to Tell Tech', points: ['When did symptoms start?', 'Is there ice on the coils or refrigerant lines?', 'Is the outdoor unit (compressor) running?', 'Age and brand of the system'] },
      { heading: '💰 Repair vs Replace Rule', points: ['Rule of thumb: repair cost × age > $5,000 → replace', 'Compressor replacement on 10+ yr unit → usually replace', 'Get 3 quotes before any repair over $1,000', 'Ask about trade-in credit if replacing'] },
    ],
    action: 'Call 3 DFW HVAC companies today. Ask each for a diagnostic + repair vs replace recommendation.',
  },
  aging: {
    title: '10+ Year System Replacement Plan',
    sections: [
      { heading: '⏳ DFW Lifespan Reality', points: ['DFW units last 13–16 yrs (vs 18–22 in northern states)', '10 yrs in DFW = ~27,000 hours of runtime', 'Efficiency drops 2–5% annually after year 10', 'R-22 refrigerant systems cannot be recharged (illegal)'] },
      { heading: '📐 Right Sizing for DFW', points: ['Don\’t replace with same size if home has changed', 'Manual J calculation required for accurate sizing', 'Bigger is NOT better — oversized = humidity problems', 'SEER2 rating: 15+ recommended for DFW energy costs'] },
      { heading: '🛒 Buying Tips', points: ['Get 3 bids — DFW prices vary $3,000–$6,000 for same unit', 'Compare: equipment brand, SEER2, warranty, labor warranty', 'Ask about Oncor rebates ($150–$500 for high-efficiency)', 'Install in fall or spring — not peak summer (lower prices, faster scheduling)'] },
    ],
    action: 'Get 3 bids for a new system now — before it fails in a 105°F DFW heat wave.',
  },
  bills: {
    title: 'Cut Your DFW HVAC Energy Bills',
    sections: [
      { heading: '🌡️ Thermostat Strategy', points: ['Each degree above 72°F saves ~3% on cooling costs', 'Set to 78°F when away, pre-cool 30 min before home', 'Smart thermostat payback: 6–12 months in DFW', 'Never cool to below 70°F — coils will ice over'] },
      { heading: '🏠 Home Envelope', points: ['Attic insulation to R-38 can cut HVAC load 15–20%', 'Solar shades on west-facing windows = big DFW impact', 'Seal duct leaks (avg DFW home loses 20–30% through ducts)', 'Ceiling fans let you raise thermostat 4°F comfortably'] },
      { heading: '⚙️ Equipment', points: ['Clean or replace filter monthly during June–August', 'Annual tune-up saves 5–15% on energy costs', 'Condenser coil cleaning = up to 10% efficiency gain', 'High-SEER2 unit (18+) cuts energy 30% vs 10-yr-old unit'] },
    ],
    action: 'Start with filter + thermostat setback — free changes that cut 10–15% immediately.',
  },
  summer: {
    title: 'DFW Summer Heat Season Prep',
    sections: [
      { heading: '📅 Before April', points: ['Schedule spring tune-up (refrigerant check, coil cleaning)', 'Install or replace programmable thermostat', 'Clean condenser coils and clear debris 2 ft around unit', 'Inspect ductwork for disconnects or leaks in attic'] },
      { heading: '🌡️ Peak Heat (June–August)', points: ['Replace filter every 4 weeks (not 90 days — DFW heat)', 'System running 24/7 at 105°F is normal — not a malfunction', 'If home can\’t reach set temp: raise thermostat 2°F to prevent shutdown', 'Ice on coils = restricted airflow or low refrigerant — call tech'] },
      { heading: '⚡ Demand Management', points: ['Pre-cool to 70°F by 2pm before peak rates (3–7pm Oncor)', 'Use TXU/Oncor free night plans to pre-cool after 9pm', 'Close blinds on south and west windows by 10am', 'Avoid heat-generating appliances 2–7pm (oven, dryer)'] },
    ],
    action: 'Book your spring tune-up in March — slots fill up by April in DFW.',
  },
  new_install: {
    title: 'After New System Installation',
    sections: [
      { heading: '✅ Day 1 Checklist', points: ['Register warranty with manufacturer within 60 days', 'Get a copy of all permits pulled by installer', 'Confirm Oncor rebate was submitted or get paperwork', 'Set first filter change reminder for 30 days from today'] },
      { heading: '📸 Document Everything', points: ['Photo: brand label with model + serial number', 'Photo: install date tag on unit', 'Save all receipts and warranty cards', 'Record installer name, company, and license number'] },
      { heading: '📅 Year 1 Maintenance', points: ['30 days: replace filter for first time', '6 months: fall check-up (heat mode verification)', '12 months: first annual tune-up to catch install issues', '60 days: confirm warranty registration was processed'] },
    ],
    action: 'Register your warranty TODAY — the 60-day window is unforgiving and doubles your parts coverage.',
  },
};

export default function DFWHVACUltimateGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const guide = selected ? GUIDE[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '32px 24px' }}>
      <div style={{ maxWidth: 660, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8 }}>📚 DFW HVAC TOOLS</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Ultimate DFW HVAC Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          Your complete one-stop reference — from choosing a system to emergency breakdowns — tailored for DFW's extreme 7-month cooling season.
        </p>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>📍 What's your situation?</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {SITUATIONS.map(s => (
              <button key={s.key} onClick={() => setSelected(s.key)} style={{
                textAlign: 'left', padding: '14px 18px', borderRadius: 10,
                border: `2px solid ${selected === s.key ? '#F5E642' : '#1e2d4a'}`,
                background: selected === s.key ? '#1e2d4a' : '#111c35',
                color: '#fff', cursor: 'pointer', fontSize: 15, fontWeight: selected === s.key ? 700 : 400,
                transition: 'all 0.2s'
              }}>{s.label}</button>
            ))}
          </div>
        </div>

        {guide && (
          <div>
            <div style={{ background: '#F5E642', borderRadius: 12, padding: '14px 20px', marginBottom: 20 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0A1628′ }}>{guide.title}</div>
            </div>
            {guide.sections.map(sec => (
              <div key={sec.heading} style={{ background: '#111c35', borderRadius: 12, padding: 20, marginBottom: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#F5E642′ }}>{sec.heading}</div>
                {sec.points.map(p => (
                  <div key={p} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 14 }}>
                    <span style={{ color: '#F5E642', marginTop: 2 }}>▸</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ background: '#1a3a1a', border: '1px solid #22c55e44', borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 13, color: '#22c55e', fontWeight: 700, marginBottom: 6 }}>✅ Your Next Action</div>
              <div style={{ fontSize: 15 }}>{guide.action}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
