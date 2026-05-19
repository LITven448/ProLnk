import { useState } from 'react';

const quarters = ['Q1 - Winter (Jan-Mar)', 'Q2 - Spring (Apr-Jun)', 'Q3 - Summer (Jul-Sep)', 'Q4 - Fall (Oct-Dec)'];
const locations = ['Dallas (Urban Core)', 'Fort Worth / West DFW', 'Plano / Allen / McKinney (North)', 'Grand Prairie / Arlington (Central)', 'Southlake / Keller / Flower Mound'];

type QuarterData = { tasks: string[]; checks: string[]; cost: string; warning: string };
const quarterData: Record<string, QuarterData> = {
  'Q1 - Winter (Jan-Mar)': { tasks: ['Replace air filters (MERV 11+) after holiday dust', 'Schedule annual heating tune-up if not done in fall', 'Check heat strips — DFW electric heat rarely runs but must work', 'Verify thermostat emergency heat setting works', 'Inspect ductwork for gaps after freeze-thaw cycles'], checks: ['Check refrigerant lines for freeze damage after hard freezes', 'Ensure outdoor unit is clear of ice after winter storms', 'Test carbon monoxide detectors — heating season risk', 'Check condensate drain for winter debris blockage'], cost: '$150-$350 for tune-up + filters', warning: 'DFW winters are short but can hit 10°F. An unprepared system on a freeze night is an emergency call at 3x normal rates.' },
  'Q2 - Spring (Apr-Jun)': { tasks: ['Replace air filters every 30 days during pollen season', 'Schedule pre-summer AC tune-up before June heat hits', 'Clean outdoor condenser coils — cedar and oak pollen clogs them fast', 'Check and clean condensate drain line before summer humidity', 'Test AC performance while temps are mild — find issues now'], checks: ['Verify refrigerant charge before 100-degree days arrive', 'Check capacitor condition — summer heat kills capacitors', 'Inspect electrical connections for corrosion', 'Confirm thermostat cooling mode works on first warm day'], cost: '$200-$400 for full AC tune-up + coil cleaning', warning: 'Spring allergy season in DFW is severe. Cedar fever peaks Feb-Mar, oak Apr-May. MERV 13 filters help but must be changed monthly or airflow starves the system.' },
  'Q3 - Summer (Jul-Sep)': { tasks: ['Replace air filters every 30 days — system runs 18+ hrs/day', 'Monitor system performance weekly — any loss of cooling needs same-day attention', 'Keep outdoor unit clear of grass clippings and debris', 'Check condensate drain monthly — high humidity means heavy condensation', 'Consider UV light installation for mold prevention in humid conditions'], checks: ['System should cool home to 75°F within 1 hour on 100°F day', 'Refrigerant levels drop if there is a leak — watch for warm air from vents', 'Check electrical disconnect box outside for heat damage', 'Monitor energy bills — a 20% spike often means a failing capacitor or low refrigerant'], cost: '$80-$150 for emergency filter and drain service; $300-$800 for capacitor or refrigerant recharge', warning: 'DFW summer 2026: expect 60+ days over 100°F. Your HVAC will run 20+ hours daily for 5 months straight. Systems that skip spring tune-ups fail in August when techs are booked 2 weeks out.' },
  'Q4 - Fall (Oct-Dec)': { tasks: ['Replace filters after summer — they are saturated after 5 months of heavy use', 'Schedule heating system inspection before first cold snap', 'Clean evaporator coil if system ran hard all summer', 'Verify heat pump auxiliary heat function before winter', 'Seal any ductwork issues identified during summer'], checks: ['Test heat mode before first cold night — do not wait for a freeze', 'Check thermostat emergency heat mode and heat strips', 'Inspect outdoor unit for summer storm damage', 'Verify condensate drain is clear for fall operation'], cost: '$150-$300 for fall tune-up and filter replacement', warning: 'DFW first hard freeze typically hits mid-November. Scheduling a heating tune-up in October avoids the rush. By November, quality HVAC techs are booked solid.' },
};

export default function DFWHVACSeasonalGuide() {
  const [quarter, setQuarter] = useState('');
  const [location, setLocation] = useState('');
  const [showResults, setShowResults] = useState(false);

  const data = quarter ? quarterData[quarter] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>❄️ DFW Home Systems</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>HVAC Seasonal Readiness Guide</h1>
        <p style={{ color: '#9BA3B4', fontSize: 16, marginBottom: 32 }}>DFW has one of the most demanding HVAC climates in the US — 60+ days over 100°F in summer, hard freezes in winter, and allergy season that clogs filters in spring. Quarter-by-quarter preparation is essential.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[{ season: 'Winter', icon: '🧊', note: 'Short but fierce' }, { season: 'Spring', icon: '🌼', note: 'Pollen = clogged filters' }, { season: 'Summer', icon: '🔥', note: 'Runs 18-20 hrs/day' }, { season: 'Fall', icon: '🍂', note: 'Prep before first freeze' }].map(s => (
            <div key={s.season} style={{ backgroundColor: '#112240', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{s.season}</div>
              <div style={{ color: '#9BA3B4', fontSize: 12, marginTop: 4 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 20 }}>📅 Get Your Seasonal Task List</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#9BA3B4', fontSize: 13, marginBottom: 8 }}>Current Quarter</label>
              <select value={quarter} onChange={e => { setQuarter(e.target.value); setShowResults(false); }} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select quarter...</option>
                {quarters.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BA3B4', fontSize: 13, marginBottom: 8 }}>Your DFW Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select location...</option>
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)} disabled={!quarter || !location} style={{ backgroundColor: quarter && location ? '#F5E642' : '#1E3A5F', color: quarter && location ? '#0A1628' : '#4A5568', padding: '12px 28px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: quarter && location ? 'pointer' : 'default' }}>
            Get My HVAC Tasks →
          </button>
        </div>

        {showResults && data && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>🔧 Maintenance Tasks</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {data.tasks.map((t, i) => <li key={i} style={{ color: '#CBD5E1', fontSize: 14, padding: '6px 0', borderBottom: '1px solid #1E3A5F' }}>✓ {t}</li>)}
              </ul>
            </div>
            <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: '#10B981', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>🔍 What to Check</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {data.checks.map((c, i) => <li key={i} style={{ color: '#CBD5E1', fontSize: 14, padding: '6px 0', borderBottom: '1px solid #1E3A5F' }}>🔎 {c}</li>)}
              </ul>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💰 Expected Cost This Quarter</div>
                <div style={{ color: '#10B981', fontSize: 18, fontWeight: 800 }}>{data.cost}</div>
              </div>
              <div style={{ backgroundColor: '#2D1A00', border: '1px solid #F59E0B', borderRadius: 12, padding: 20 }}>
                <div style={{ color: '#F59E0B', fontWeight: 700, marginBottom: 8 }}>⚠️ DFW Warning</div>
                <div style={{ color: '#CBD5E1', fontSize: 13 }}>{data.warning}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
