import { useState } from 'react';

const seasons = ['Spring (AC Startup)', 'Fall (Heat Startup)'];

const checklists: Record<string, Record<string, string[]>> = {
  'Spring (AC Startup)': {
    'Before You Turn It On': [
      '🔌 Check circuit breaker — reset if tripped after winter',
      '🌿 Clear 2 ft around outdoor condenser — trim shrubs, remove debris',
      '🪟 Inspect condenser fins — straighten bent fins with fin comb',
      '🔩 Check electrical disconnect box at outdoor unit — fuses intact?',
      '💧 Clear condensate drain line — flush with diluted bleach + water',
    ],
    'First Startup Test': [
      '🌡 Set thermostat to COOL, 68°F — listen for compressor kick-on',
      '❄️ Feel supply vents — should feel cold within 5–10 minutes',
      '🌀 Verify outdoor fan is spinning — if not, call a tech before running',
      '📊 Check delta-T (supply vs return) — should be 15–22°F difference in DFW',
      '💨 Confirm all vents are open — DFW homes need full airflow distribution',
    ],
    'Schedule These Now': [
      '🛠 Book a DFW spring tune-up (March–April fills fast)',
      '🔄 Replace air filter — MERV 8 minimum for DFW allergy season',
      '📱 Set smart thermostat schedule — precool to 74°F before 3pm DFW peak',
      '📝 Test smoke/CO detectors near air handler',
    ],
  },
  'Fall (Heat Startup)': {
    'Before You Switch to Heat': [
      '🔥 Locate your gas shutoff valve — know where it is before lighting season',
      '🧹 Vacuum around furnace and air handler — dust buildup is a fire risk',
      '🔄 Replace air filter — dirty filter strains heat exchanger in DFW cold snaps',
      '🪟 Check furnace flue pipe — look for rust, gaps, bird nests',
      '🔦 Visually inspect heat exchanger — cracks allow CO into airstream',
    ],
    'First Heat Startup Test': [
      '🌡 Set thermostat to HEAT, 72°F — listen for ignitor click then burner ignition',
      '🔥 Feel supply vents — warm air should flow within 5 minutes',
      '👃 Sniff for burning smell (normal first run) — should clear within 10 min',
      '⚠️ If you smell gas: leave immediately, call 911, do NOT flip any switches',
      '📊 Verify static pressure — restricted ducts overheat heat exchanger',
    ],
    'Schedule These Now': [
      '🛠 Book DFW furnace tune-up (October books out fast before cold snaps)',
      '🔋 Replace thermostat batteries — power outages during DFW ice events are common',
      '🧯 Check carbon monoxide detector — replace if over 7 years old',
      '📝 Locate emergency heat shutoff switch (usually red switch near air handler)',
    ],
  },
};

export default function DFWHVACSeasonalStartupChecklist() {
  const [season, setSeason] = useState(seasons[0]);
  const stages = Object.keys(checklists[season]);
  const [stage, setStage] = useState(stages[0]);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleItem = (item: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  };

  const items = checklists[season][stage] || [];
  const done = items.filter((i) => checked.has(i)).length;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>📋</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW HVAC Seasonal Startup Checklist</h1>
          <p style={{ color: '#9BB0CC', margin: 0 }}>Spring AC startup and fall heat startup — step by step for DFW</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {seasons.map((s) => (
            <button key={s} onClick={() => { setSeason(s); setStage(Object.keys(checklists[s])[0]); setChecked(new Set()); }}
              style={{ padding: '0.6rem 1.2rem', borderRadius: 8, border: '2px solid', borderColor: season === s ? '#F5E642′ : '#1E3A5F', background: season === s ? '#F5E642' : '#112240', color: season === s ? '#0A1628' : '#fff', fontWeight: 700, cursor: ’pointer' }}>
              {s.includes('Spring') ? '🌸' : '🍂'} {s}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {stages.map((st) => (
            <button key={st} onClick={() => setStage(st)}
              style={{ padding: '0.4rem 1rem', borderRadius: 6, border: '1px solid', borderColor: stage === st ? '#F5E642′ : '#1E3A5F', background: stage === st ? '#1E3A5F' : ’transparent', color: stage === st ? '#F5E642′ : '#9BB0CC', cursor: ’pointer', fontSize: '0.85rem' }}>
              {st}
            </button>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ color: '#F5E642', margin: 0 }}>{stage}</h2>
            <div style={{ background: done === items.length ? '#0F4C2A' : '#1E3A5F', borderRadius: 8, padding: '0.3rem 0.8rem', fontSize: '0.85rem', color: done === items.length ? '#4ADE80′ : '#9BB0CC', fontWeight: 700 }}>
              {done}/{items.length} done
            </div>
          </div>
          {items.map((item, i) => (
            <div key={i} onClick={() => toggleItem(item)}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', borderRadius: 8, marginBottom: '0.5rem', background: checked.has(item) ? '#0F2A1A' : '#0A1628', cursor: 'pointer', borderLeft: `4px solid ${checked.has(item) ? '#4ADE80' : '#1E3A5F'}` }}>
              <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{checked.has(item) ? '✅' : '⬜'}</span>
              <span style={{ color: checked.has(item) ? '#9BB0CC' : '#CBD5E1', textDecoration: checked.has(item) ? 'line-through' : 'none', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
