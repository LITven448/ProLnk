import { useState } from 'react';

const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
const features = ['Pool', 'Older Roof (10+ yrs)', 'Multiple HVAC Units', 'Large Trees', 'Sprinkler System'];

const checklists: Record<string, string[]> = {
  Spring: [
    '🌬️ Test AC — first cool day is almost here, fire it up now',
    '🌧️ Clear gutters of winter debris before spring rains',
    '🔍 Walk foundation perimeter — look for new cracks or soil heave',
    '🪟 Check window and door seals — DFW wind strips caulk fast',
    '🌿 Inspect sprinkler heads after dormant season',
  ],
  Summer: [
    '❄️ Check AC before 6am — if it ran overnight, it should be ice-free',
    '💧 Soak foundation perimeter 2x/week in drought conditions',
    '⚡ Test GFCI outlets after storm — power surges trip them silently',
    '🌡️ Attic temp check — above 150°F means ventilation problem',
    '🦟 Inspect window screens for tears — DFW mosquito season is intense',
  ],
  Fall: [
    '🔥 Test furnace before first cold front — do not wait for November',
    '🍂 Clear roof valleys of leaves — DFW fall can bring sudden heavy rain',
    '🔩 Tighten fence hardware — summer heat expands and loosens fasteners',
    '🚿 Flush water heater sediment — hard DFW water builds up fast',
    '🌪️ Inspect exterior for storm season damage before repairs freeze up',
  ],
  Winter: [
    '🧊 Know where your main shutoff is — DFW pipes freeze faster than you think',
    '💨 Cover exterior hose bibs before any freeze warning',
    '🔦 Check attic insulation — inadequate insulation spikes bills 40%+',
    '🚗 Garage door seal check — cold air infiltrates through worn seals',
    '📋 Foundation moisture — drought then freeze cycles crack slabs',
  ],
};

const featureTips: Record<string, string> = {
  Pool: '🏊 Check pool equipment for freeze damage each morning below 32°F',
  'Older Roof (10+ yrs)': '🏠 Visually scan roof after every storm — missing shingles are invisible from inside',
  'Multiple HVAC Units': '🌀 Cycle each unit individually — a failed zone hides behind a working one',
  'Large Trees': '🌳 Check for hanging limbs after every DFW wind event — they fall without warning',
  'Sprinkler System': '💦 Run each zone monthly — heads clog silently and dry spots kill grass fast',
};

export default function DFWMorningHomeGuide() {
  const [season, setSeason] = useState('Summer');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  function toggleFeature(f: string) {
    setSelectedFeatures(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    );
  }

  function toggleCheck(item: string) {
    setChecked(prev => ({ ...prev, [item]: !prev[item] }));
  }

  const list = checklists[season] || [];
  const featureItems = selectedFeatures.map(f => featureTips[f]).filter(Boolean);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW Morning Home Routine</h1>
          <p style={{ color: '#8B9BB4', fontSize: 15 }}>What every DFW homeowner should check before the day starts</p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <p style={{ color: '#8B9BB4', fontSize: 13, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Current Season</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {seasons.map(s => (
              <button key={s} onClick={() => setSeason(s)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: season === s ? '#F5E642′ : '#1A2E4A', color: season === s ? '#0A1628' : '#8B9BB4' }}>{s}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <p style={{ color: '#8B9BB4', fontSize: 13, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Your Home Features</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {features.map(f => (
              <button key={f} onClick={() => toggleFeature(f)} style={{ padding: '7px 14px', borderRadius: 8, border: selectedFeatures.includes(f) ? '2px solid #F5E642′ : '2px solid #1A2E4A', cursor: ’pointer', fontSize: 13, background: selectedFeatures.includes(f) ? '#1A2E4A' : 'transparent', color: selectedFeatures.includes(f) ? '#F5E642′ : '#8B9BB4' }}>{f}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🌅 {season} Morning Checklist</h2>
          {list.map(item => (
            <div key={item} onClick={() => toggleCheck(item)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: '1px solid #1A2E4A', cursor: 'pointer' }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: checked[item] ? '#F5E642′ : ’transparent', border: '2px solid #F5E642', flexShrink: 0, marginTop: 2 }}>{checked[item] ? '✓' : ''}</div>
              <span style={{ fontSize: 14, color: checked[item] ? '#8B9BB4′ : '#E8EAF0', textDecoration: checked[item] ? ’line-through' : 'none' }}>{item}</span>
            </div>
          ))}
          {featureItems.map(tip => (
            <div key={tip} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: '1px solid #1A2E4A' }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: 'transparent', border: '2px solid #2A7FFF', flexShrink: 0, marginTop: 2 }}></div>
              <span style={{ fontSize: 14, color: '#60A5FA' }}>{tip}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#8B9BB4', fontSize: 13 }}>Need a pro for something on this list? <span style={{ color: '#F5E642', fontWeight: 600 }}>ProLnk connects you with vetted DFW contractors — always free for homeowners.</span></p>
        </div>
      </div>
    </div>
  );
}
