import { useState } from 'react';

const months = [
  { id: '2', label: 'February', actions: ['Freeze watch — DFW\’s 2021 Uri freeze burst millions of pipes statewide', 'Know your main shutoff location before a freeze event hits', 'Wrap exposed exterior pipes in unheated spaces (garage, crawl space)', 'Let cold-side faucets drip at 20°F or below if pipes are exterior-wall'] },
  { id: '4', label: 'April', actions: ['Irrigation startup: turn on system zone by zone', 'Test backflow preventer — DFW code requires annual test', 'Check for broken heads and spray adjustments after winter', 'Run a full cycle and look for wet spots indicating underground leaks'] },
  { id: '6', label: 'June', actions: ['AC condensate drain flush — DFW summer humidity causes algae buildup fast', 'Pour cup of diluted bleach into condensate pan', 'Verify drain line is flowing freely — blockage causes water damage', 'Test water heater pressure relief valve annually (June is a good reminder)'] },
  { id: '10', label: 'October', actions: ['Reduce irrigation schedule as temps drop below 80°F', 'Transition to 2–3x/week from daily summer schedule', 'Check hose bibs for any drips before cold season', 'Clear leaves from outdoor drain areas before fall rains'] },
  { id: '12', label: 'December', actions: ['Full freeze prep: disconnect all garden hoses', 'Insulate exposed pipes in attic, garage, and crawl space', 'Know your main shutoff — label it if it isn\’t', 'If traveling over holidays, leave heat at 58°F minimum'] },
];

export default function DFWPlumbingMonthByMonth2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const month = months.find(m => m.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: '0.5rem' }}>DFW Plumbing Guide 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>Month-by-Month Plumbing Care for DFW</h1>
        <p style={{ color: '#9BA3B2', marginBottom: '2rem', lineHeight: 1.6 }}>From February freeze scares to June condensate drain clogs, DFW plumbing has a distinct seasonal rhythm. Stay ahead of it and avoid the most common — and costly — failures.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>💧 DFW Plumbing Seasonal Risks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[['Winter Freeze', 'Burst pipe risk at 20°F or below', '❄️'], ['Spring', 'Irrigation startup + backflow', '🌱'], ['Summer', 'Condensate drain clogs', '💦'], ['Fall', 'Irrigation taper + drain prep', '🍂']].map(([season, risk, icon]) => (
              <div key={season} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', borderLeft: '3px solid #F5E642' }}>
                <div style={{ fontSize: '1.2rem' }}>{icon} <span style={{ color: '#F5E642', fontWeight: 700 }}>{season}</span></div>
                <div style={{ fontSize: '0.85rem', color: '#C5CAD8', marginTop: '0.25rem' }}>{risk}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📅 Select Your Month → Plumbing Action Guide</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {months.map(m => (
              <button key={m.id} onClick={() => setSelected(m.id)} style={{ background: selected === m.id ? '#F5E642' : '#0A1628', color: selected === m.id ? '#0A1628' : '#E8EAF0', border: '1px solid #F5E642', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}>{m.label}</button>
            ))}
          </div>
          {month && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🔧 {month.label} Plumbing Actions</div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 2, color: '#C5CAD8' }}>
                {month.actions.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🚨 Call a Plumber Immediately If</h2>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 2, color: '#C5CAD8' }}>
            <li>Water pressure suddenly drops across entire house</li>
            <li>You hear running water with all fixtures off</li>
            <li>Sewer odor indoors (potential vent or drain issue)</li>
            <li>AC is not cooling AND there's water near air handler (clogged condensate)</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', color: '#9BA3B2', fontSize: '0.85rem' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> — DFW's licensed plumber network, ready year-round
        </div>
      </div>
    </div>
  );
}