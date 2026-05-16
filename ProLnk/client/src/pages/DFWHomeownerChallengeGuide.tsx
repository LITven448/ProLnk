import { useState } from 'react';

const DAYS = [
  { day: 1, task: 'Check your HVAC filter — hold it to the light', why: 'A dirty filter costs 15% more in energy and shortens your system life' },
  { day: 2, task: 'Walk outside and check all outdoor faucets for drips', why: 'One dripping hose bib wastes 3,000 gallons a year' },
  { day: 3, task: 'Walk the perimeter — look for foundation cracks wider than 1/4 inch', why: 'DFW clay soil shifts every season — catching cracks early saves thousands' },
  { day: 4, task: 'Test every smoke detector — press the button', why: 'Detectors over 10 years old need replacement regardless of battery' },
  { day: 5, task: 'Clean your AC condenser coils with a garden hose', why: 'Dirty coils reduce efficiency by up to 30%' },
  { day: 6, task: 'Check your attic for daylight gaps around vents', why: 'Air leaks in the attic are the #1 energy waste in DFW homes' },
  { day: 7, task: 'Locate your main water shutoff and make sure it turns', why: 'In a leak emergency, you have minutes — know where it is now' },
  { day: 8, task: 'Flush a gallon from your water heater to remove sediment', why: 'Sediment buildup reduces heater life by 30% and costs more to run' },
  { day: 9, task: 'Check all window and door weatherstripping for gaps', why: 'Air sealing can cut cooling bills by + per DFW summer' },
  { day: 10, task: 'Walk your roof from ground level with binoculars', why: 'Catching missing shingles early prevents expensive decking damage' },
  { day: 11, task: 'Test all GFCIs by pressing the test/reset buttons', why: 'Faulty GFCIs are a code violation and a safety risk' },
  { day: 12, task: 'Clean your garbage disposal with ice and salt', why: 'Takes 60 seconds and prevents bacterial buildup and odors' },
  { day: 13, task: 'Trim vegetation touching your home or AC unit', why: 'Plants on siding cause moisture damage; vegetation on AC cuts efficiency' },
  { day: 14, task: 'Check gutters for sagging, blockage, or pulling away', why: 'Gutters protect your foundation — the most expensive repair in DFW' },
  { day: 15, task: 'Run water in any sink not used daily', why: 'Dry P-traps let sewer gas into your home' },
  { day: 16, task: 'Test your garage door auto-reverse by placing a 2x4 in its path', why: 'Required safety feature — if it does not reverse, call a tech today' },
  { day: 17, task: 'Inspect caulking around tubs, showers, and sinks', why: 'Failed caulk leads to mold and water damage inside walls' },
  { day: 18, task: 'Check dryer vent from outside for blockage or bird nest', why: 'Clogged dryer vents are a top cause of house fires' },
  { day: 19, task: 'Pour baking soda and vinegar down slow drains', why: 'Prevents grease buildup that leads to clogs and plumber calls' },
  { day: 20, task: 'Check sprinkler heads — look for broken or misaligned heads', why: 'Broken heads waste 25+ gallons per cycle and can violate DFW water rules' },
  { day: 21, task: 'Open your electrical panel and look for signs of scorching', why: 'Scorching or tripped breakers that keep tripping need a licensed electrician' },
  { day: 22, task: 'Measure your attic insulation depth — DFW minimum is R-38', why: 'Inadequate insulation is the most cost-effective upgrade you can make' },
  { day: 23, task: 'Check under sinks for slow drips or mineral staining', why: 'Slow leaks rot cabinet floors and create mold before you notice them' },
  { day: 24, task: 'Test your carbon monoxide detector', why: 'CO is odorless — DFW furnaces and gas appliances can leak it' },
  { day: 25, task: 'Walk your fence and look for rot or loose posts', why: 'Fence repairs are much cheaper than full replacements' },
  { day: 26, task: 'Check the flashing around your chimney or roof penetrations', why: 'Flashing failure is the #1 cause of roof leaks in Texas' },
  { day: 27, task: 'Clean refrigerator coils underneath or behind the unit', why: 'Dirty coils use 30% more energy and shorten compressor life' },
  { day: 28, task: 'Inspect driveway and walkways for cracks to seal before summer', why: 'DFW heat expands cracks — sealing now prevents costly replacement' },
  { day: 29, task: 'Review your homeowners insurance policy — check coverage limits', why: 'Most DFW policies are underinsured after recent construction cost increases' },
  { day: 30, task: 'Log all your work in the ProLnk Home Improvement Journal', why: 'Documentation adds provable value at resale and speeds up closing' },
];

export default function DFWHomeownerChallengeGuide() {
  const [done, setDone] = useState([]);
  const [active, setActive] = useState(null);

  const toggle = (day) => {
    setDone(p => p.includes(day) ? p.filter(d => d !== day) : [...p, day]);
  };

  const pct = Math.round((done.length / 30) * 100);
  const streak = (() => {
    let s = 0;
    for (let i = 1; i <= 30; i++) { if (done.includes(i)) s++; else break; }
    return s;
  })();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '24px' }}>
      <h1 style={{ color: '#F5E642', fontSize: '1.6rem', marginBottom: 4 }}>🏆 DFW 30-Day Homeowner Challenge</h1>
      <p style={{ color: '#8899AA', marginBottom: 20 }}>One small task per day — big impact on your home by day 30</p>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <div style={{ background: '#0D1F35', borderRadius: 10, padding: 14, flex: 1, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700 }}>{pct}%</div>
          <div style={{ color: '#8899AA', fontSize: '0.8rem' }}>Complete</div>
        </div>
        <div style={{ background: '#0D1F35', borderRadius: 10, padding: 14, flex: 1, textAlign: 'center' }}>
          <div style={{ color: '#FF6B6B', fontSize: '1.8rem', fontWeight: 700 }}>{streak}</div>
          <div style={{ color: '#8899AA', fontSize: '0.8rem' }}>Day Streak</div>
        </div>
        <div style={{ background: '#0D1F35', borderRadius: 10, padding: 14, flex: 1, textAlign: 'center' }}>
          <div style={{ color: '#81C784', fontSize: '1.8rem', fontWeight: 700 }}>{done.length}</div>
          <div style={{ color: '#8899AA', fontSize: '0.8rem' }}>Done</div>
        </div>
      </div>

      <div style={{ background: '#0D1F35', borderRadius: 8, height: 8, marginBottom: 20 }}>
        <div style={{ background: '#F5E642', width: pct + '%', height: '100%', borderRadius: 8, transition: 'width 0.3s' }} />
      </div>

      {DAYS.map(({ day, task, why }) => (
        <div key={day} onClick={() => setActive(active === day ? null : day)} style={{ background: '#0D1F35', borderRadius: 10, padding: '12px 14px', marginBottom: 8, cursor: 'pointer', borderLeft: done.includes(day) ? '3px solid #81C784' : '3px solid #1C2E45' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={e => { e.stopPropagation(); toggle(day); }} style={{ background: done.includes(day) ? '#81C784' : '#1C2E45', border: 'none', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', color: done.includes(day) ? '#fff' : '#555', fontWeight: 700, flexShrink: 0 }}>
              {done.includes(day) ? '✓' : day}
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ color: done.includes(day) ? '#888' : '#ddd', textDecoration: done.includes(day) ? 'line-through' : 'none', fontSize: '0.9rem' }}>{task}</div>
              {active === day && <div style={{ color: '#4FC3F7', fontSize: '0.8rem', marginTop: 6 }}>💡 {why}</div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
