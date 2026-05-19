import { useState } from 'react';

const months = [
  { name: 'January', icon: '❄️', actions: ['Freeze watch — know location of your main shutoff valve (usually near meter at street)', 'Insulate exposed pipes in garage, crawl space, or exterior walls', 'Keep cabinet doors under sinks open on freezing nights to allow warm air circulation', 'Know how to shut off water at individual fixtures — prep before freeze hits'] },
  { name: 'February', icon: '🔍', actions: ['Post-freeze inspection — check all hose bibs for cracks or drips', 'Inspect water heater for freeze damage or sediment buildup after cold stress', 'Check washing machine hoses for brittleness — cold accelerates rubber cracking', 'Look for water stains on ceilings — signs of pipe issues from winter'  ] },
  { name: 'March', icon: '🌧️', actions: ['Spring rain season — inspect sump pump if you have one (DFW flooding risk in low areas)', 'Check water pressure at multiple fixtures — pressure drops signal hidden leaks', 'Flush water heater to remove sediment — do this annually in DFW hard water areas'  ] },
  { name: 'April', icon: '💧', actions: ['Outdoor irrigation startup — turn on system slowly and walk all zones for broken heads', 'Backflow preventer test required by many DFW municipalities — schedule with a plumber', 'Check hose bib washers — replace if dripping after winter', 'Inspect irrigation controller settings — adjust for spring watering schedule'] },
  { name: 'May', icon: '☀️', actions: ['Check outdoor shower and pool fill lines for leaks before summer use', 'Inspect garbage disposal — food waste increases in spring entertaining season', 'Confirm all irrigation zones functioning before summer heat locks in'  ] },
  { name: 'June', icon: '🌡️', actions: ['Water heater check — summer showers increase demand; verify temperature set to 120°F', 'Check sprinkler coverage — adjust heads as landscape grows and blocks zones', 'Inspect washing machine supply lines — summer heat stresses rubber hoses'] },
  { name: 'July', icon: '💦', actions: ['Flush AC condensate drain line — most important DFW summer plumbing task', 'Check for slow drains — root intrusion peaks in summer as trees seek water', 'Monitor water bills — unexplained increases signal irrigation leaks', 'Test all toilets for silent leaks — add food coloring to tank; if color appears in bowl, flapper needs replacement'] },
  { name: 'August', icon: '🏜️', actions: ['DFW drought mode — reduce irrigation but maintain foundation watering', 'Check foundation drip system if installed — clay soil needs consistent moisture', 'Inspect outdoor faucets for drips — even minor drips waste hundreds of gallons monthly'] },
  { name: 'September', icon: '🍂', actions: ['Inspect water heater anode rod — annual check recommended in DFW hard water', 'Schedule drain cleaning before fall if you’ve had slow drains — roots active', 'Check irrigation controller — reduce frequency as temps drop'] },
  { name: 'October', icon: '🌬️', actions: ['Irrigation blowout if hard winter expected — DFW is borderline; check forecast', 'Test shutoff valves at all fixtures — ensure they turn freely (unused valves seize)', 'Check water heater for leaks or rust before heating season increases demand'] },
  { name: 'November', icon: '🍁', actions: ['Disconnect garden hoses — attached hoses cause hose bib freeze damage', 'Drain and shut off irrigation system if freeze season likely', 'Know your gas shutoff location — if smell gas near water heater, shut off gas immediately'] },
  { name: 'December', icon: '🧊', actions: ['Freeze prep checklist — insulate hose bibs, know shutoffs, buy pipe insulation sleeves', 'Check water heater temperature and pressure relief valve — annual test', 'Prepare a freeze response kit — shutoff wrench, pipe tape, contact for emergency plumber'  ] },
];

export default function DFWPlumbingSeasonGuide2026() {
  const [selected, setSelected] = useState(new Date().getMonth());
  const m = months[selected];
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Plumbing Seasonal Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Month-by-month plumbing care for Dallas–Fort Worth homes</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {months.map((mo, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#e2e8f0', fontWeight: 600, fontSize: 13 }}>{mo.icon} {mo.name}</button>
          ))}
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>{m.icon} {m.name} — Plumbing Action Guide</h2>
          {m.actions.map((action, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', fontSize: 18, minWidth: 24 }}>✓</span>
              <span style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{action}</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginTop: 20 }}>
          <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 8 }}>🚨 DFW Freeze Emergency Quick Reference</h3>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>Main shutoff: locate before winter — usually near the street meter. If pipes burst: shut off main immediately, then call a plumber. Dripping faucets at 28°F or below prevents freeze damage in most DFW situations.</p>
        </div>
        <p style={{ color: '#475569', fontSize: 12, textAlign: 'center', marginTop: 24 }}>ProLnk — Connecting DFW Homeowners with Licensed Plumbers</p>
      </div>
    </div>
  );
}
