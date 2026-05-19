import { useState } from 'react';

const locations = ['North DFW (Collin, Denton)', 'Central DFW (Dallas, Tarrant)', 'West DFW (Parker County)', 'Far West (Palo Pinto County)'];
const homeFeatures = ['Older construction (pre-2000)', 'New construction (post-2000)', 'Has crawl space', 'Slab foundation only'];

const dustMap: Record<string, Record<string, { frequency: string; color: string; hvacInterval: string; checklist: string[]; filterRec: string[]; tips: string[] }>> = {
  'Far West (Palo Pinto County)': {
    'Older construction (pre-2000)': { frequency: '3-5 events/year', color: '#EF4444', hvacInterval: 'Every 30 days during dry season', checklist: ['Seal all window and door gaps with weatherstripping', 'Install MERV-13 or higher HVAC filters', 'Caulk baseboards and utility penetrations', 'Add door sweeps to all exterior doors', 'Inspect crawl space vents for open gaps', 'Cover attic vents with fine mesh screen'], filterRec: ['MERV-13 minimum for living spaces', 'Pre-filter wraps on return air vents', 'HEPA air purifier in bedrooms', 'Change filters within 48hr post-storm'], tips: ['Dust in older homes infiltrates through dozens of micro-gaps', 'Post-storm HVAC filter replacement prevents motor damage', 'Vehicle cabin filters need replacement after each major event'] },
    'New construction (post-2000)': { frequency: '3-5 events/year', color: '#F97316', hvacInterval: 'Every 45 days during dry season', checklist: ['Verify spray foam insulation at all penetrations', 'Install MERV-11 HVAC filters minimum', 'Check door and window seals annually', 'Add weatherstripping to garage door bottom seal', 'Inspect attic vent screens for damage'], filterRec: ['MERV-11 standard, MERV-13 during drought', 'ERV/HRV systems may need pre-filter addition', 'Replace within 72hr post-major storm'], tips: ['Newer homes have better sealing but not dust-proof', 'Garage door bottom seal is the #1 dust entry point', 'ERV systems can pull dust in during haboob events — shut off'] },
  },
  'West DFW (Parker County)': {
    'Older construction (pre-2000)': { frequency: '1-3 events/year', color: '#F97316', hvacInterval: 'Every 45 days during dry season', checklist: ['Seal window frames with interior rope caulk', 'Add door sweeps to all exterior doors', 'Install MERV-11 HVAC filters', 'Seal attic access panel gaps', 'Check dryer vent exterior cap seals'], filterRec: ['MERV-11 standard filter', 'Check and replace post-event', 'Add return air pre-filters in dusty rooms'], tips: ['Parker County sits on dust-prone red clay soil', 'Construction activity in the area increases ambient dust', 'Water lawn and garden before predicted dry wind events'] },
    'New construction (post-2000)': { frequency: '1-3 events/year', color: '#EAB308', hvacInterval: 'Every 60 days', checklist: ['Annual seal inspection by HVAC tech', 'MERV-8 filters minimum', 'Garage door bottom seal check', 'Patio door seal inspection'], filterRec: ['MERV-8 standard, bump to MERV-11 in drought years', 'Replace on schedule, not just post-event'], tips: ['Parker County newer homes generally fare well', 'Biggest risk is HVAC filter neglect over dry summers'] },
  },
};

const defaultResult = { frequency: '< 1 event/year', color: '#22C55E', hvacInterval: 'Standard 90-day schedule', checklist: ['Standard weatherstripping maintenance', 'MERV-8 filter adequate for this location', 'Annual HVAC inspection covers dust prep'], filterRec: ['MERV-8 standard filter', 'Standard replacement schedule applies'], tips: ['Central and North DFW rarely experience haboob conditions', 'Monitor alerts if traveling west of Fort Worth'] };

export default function DFWDustStormGuide() {
  const [location, setLocation] = useState('');
  const [feature, setFeature] = useState('');
  const result = location && feature ? (dustMap[location]?.[feature] ?? defaultResult) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌪️ DFW Dust Storm Guide</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>Haboob & Dust Storm Prep for DFW Homes</h1>
          <p style={{ color: '#94A3B8', marginTop: '0.75rem', lineHeight: 1.6 }}>DFW's western counties — especially Parker and Palo Pinto — experience haboob-style dust storms driven by collapsing thunderstorm outflows. These walls of dust can reduce visibility to near zero and infiltrate homes, vehicles, and HVAC systems within minutes.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{ emoji: '🏜️', title: 'What Is a Haboob?', desc: 'A haboob is a wall of dust created when a thunderstorm downdraft hits dry ground. The front can be 50-100ft tall and move at 30-50 mph with almost no warning.' }, { emoji: '🫁', title: 'HVAC at Risk', desc: 'A single haboob can clog a 90-day HVAC filter in minutes. Particles bypass standard filters and coat heat exchangers, reducing efficiency 15-30% if not addressed.' }, { emoji: '🚗', title: 'Vehicle Protection', desc: 'Park vehicles in a garage if possible. Cabin air filters need replacement within 24 hours of exposure. Never run AC during a dust storm — recirculate air only.' }, { emoji: '👁️', title: 'Visibility Events', desc: 'Major haboobs create zero-visibility conditions. Pull off the road safely, turn off all lights, and stay in your vehicle. Do not walk outside during the storm.' }].map(c => (
            <div key={c.title} style={{ background: '#132038', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{c.emoji}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.25rem' }}>{c.title}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132038', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, marginBottom: '1rem' }}>🔍 Your Dust Storm Risk Profile</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Your DFW Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E2E8F0', border: '1px solid #1E3A5F', borderRadius: '6px', padding: '0.75rem', fontSize: '1rem' }}>
                <option value="">Select location...</option>
                {locations.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Home Construction</label>
              <select value={feature} onChange={e => setFeature(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E2E8F0', border: '1px solid #1E3A5F', borderRadius: '6px', padding: '0.75rem', fontSize: '1rem' }}>
                <option value="">Select feature...</option>
                {homeFeatures.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: result.color + '22', border: `2px solid ${result.color}`, borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: '#94A3B8′ }}>Expected Frequency</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: result.color }}>{result.frequency}</div>
                </div>
                <div style={{ background: '#1E40AF22', border: '2px solid #3B82F6', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: '#94A3B8′ }}>Filter Change Interval</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#60A5FA' }}>{result.hvacInterval}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                {[{ title: '🏠 Home Prep Checklist', items: result.checklist }, { title: '🌬️ Filter Recommendations', items: result.filterRec }, { title: '💡 Local Tips', items: result.tips }].map(s => (
                  <div key={s.title} style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.75rem', fontSize: '0.875rem' }}>{s.title}</div>
                    {s.items.map((item, i) => <div key={i} style={{ color: '#94A3B8', fontSize: '0.8rem', marginBottom: '0.4rem', lineHeight: 1.4 }}>{item}</div>)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', padding: '1rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.5rem' }}>📱 During a Dust Storm</div>
          <div style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.6 }}>Shut off HVAC and switch to recirculation mode. Close all windows and doors. Place wet towels at door bases. Stay indoors until the storm passes and 30 minutes after. Replace HVAC filter before restarting system. Wipe down electronics and kitchen surfaces post-storm.</div>
        </div>
      </div>
    </div>
  );
}
