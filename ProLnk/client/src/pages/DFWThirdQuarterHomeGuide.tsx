import { useState } from 'react';

const features = ['Has foundation slab', 'Has HVAC system', 'Has pool or spa', 'Has irrigation system', 'Has outdoor plants/landscaping', 'Has wood fence or deck', 'Planning fall projects'];

const priorities: Record<string, { q3Task: string; timing: string; urgency: string; why: string }[]> = {
  'Has foundation slab': [
    { q3Task: 'Foundation watering — deep soak perimeter weekly', timing: 'July–September ONGOING', urgency: 'CRITICAL', why: 'DFW clay soil loses 3–4 inches of moisture in summer drought. Once foundation moves, repairs cost $8,000–$30,000. Soaker hoses 18 inches from foundation, 30 min 3×/week.' },
    { q3Task: 'Watch for new door sticking or floor gaps', timing: 'August (peak drought)', urgency: 'HIGH', why: 'Sticky doors are the first sign of foundation movement. Catch it early and watering corrections can reverse the shift.' },
  ],
  'Has HVAC system': [
    { q3Task: 'Replace AC filters monthly — not quarterly', timing: 'July, August, September', urgency: 'HIGH', why: 'At 10–14 hrs/day runtime, DFW AC filters clog 4× faster in summer. Dirty filters increase energy use 15% and can freeze the coil.' },
    { q3Task: 'Schedule fall furnace inspection in September', timing: 'September (off-season pricing)', urgency: 'MEDIUM', why: 'Book heating tune-ups while cooling season winds down. October bookings surge when first cold front arrives.' },
  ],
  'Has pool or spa': [
    { q3Task: 'Weekly chemistry checks + algae prevention', timing: 'July–August (peak algae season)', urgency: 'HIGH', why: 'Water temps above 90°F in DFW July/August create rapid algae bloom conditions. Shock weekly, not bi-weekly.' },
    { q3Task: 'Inspect pool equipment for summer wear', timing: 'September', urgency: 'MEDIUM', why: 'Pumps, heaters, and filters worked hardest in summer. September inspection before winter prep catches wear early.' },
  ],
  'Has irrigation system': [
    { q3Task: 'Irrigation at max schedule — early AM only', timing: 'July–August', urgency: 'HIGH', why: 'Water before 7am to minimize evaporation. DFW mid-day evaporation rate means 40% of afternoon watering is wasted.' },
    { q3Task: 'Begin scaling back irrigation schedule', timing: 'September', urgency: 'MEDIUM', why: 'DFW September temps drop to 85–90°F range. Reduce watering frequency 30% to avoid root rot before dormancy.' },
  ],
  'Has outdoor plants/landscaping': [
    { q3Task: 'Stop fertilizing — plants are in summer stress mode', timing: 'July–August', urgency: 'HIGH', why: 'Fertilizing stressed plants forces growth they cannot sustain in extreme heat. Hold all feeding until September temperatures cool.' },
    { q3Task: 'Start fall garden planning + plant in September', timing: 'September 15+', urgency: 'MEDIUM', why: 'DFW fall planting window opens when soil temps drop below 85°F (~Sept 15). Best time to plant trees, shrubs, and fall perennials.' },
  ],
  'Has wood fence or deck': [
    { q3Task: 'Inspect for summer heat warping and loose boards', timing: 'August', urgency: 'MEDIUM', why: 'Extreme heat causes wood to expand and contract. Check posts, gates, and deck boards for movement. Schedule repairs for fall.' },
  ],
  'Planning fall projects': [
    { q3Task: 'Get contractor bids in August for fall work', timing: 'August (before fall rush)', urgency: 'HIGH', why: 'Fall is DFW\’s busiest home improvement season. Contractors who are free in August book October/November faster than any other month. Lock in bids now at 10–20% better pricing.' },
    { q3Task: 'Order materials for fall projects in September', timing: 'September', urgency: 'MEDIUM', why: 'Supply chain delays and fall demand mean popular materials (pavers, lumber, roofing) can be 3–4 weeks out by October.' },
  ],
};

const urgencyColor: Record<string, string> = { CRITICAL: '#ef4444', HIGH: '#f97316', MEDIUM: '#F5E642', LOW: '#4ade80' };

export default function DFWThirdQuarterHomeGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [shown, setShown] = useState(false);

  function toggle(f: string) {
    setSelected(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
    setShown(false);
  }

  const results = selected.flatMap(f => (priorities[f] || []).map(p => ({ ...p, feature: f })));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>☀️ Q3 DFW Homeowner Guide — Jul–Sep 2026</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          July through September is DFW's survival season — 100°F+ days, extreme drought stress on foundations and landscaping,
          and energy bills that peak near $400–600/month. September brings relief and the start of planning for DFW's best home improvement season: fall.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[['🌡️', 'July avg high', '99°F'], ['💧', 'Drought days', '60–80/summer'], ['⚡', 'Avg energy bill', '$380–$620/mo']].map(([icon, label, val]) => (
            <div key={label} style={{ background: '#132140', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>{icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem' }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132140', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🏡 Tell us about your home</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
            {features.map(f => (
              <label key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.5rem', borderRadius: 6, background: selected.includes(f) ? '#1e3a5f' : '#0A1628', border: `1px solid ${selected.includes(f) ? '#F5E642' : '#1e3a5f'}` }}>
                <input type="checkbox" checked={selected.includes(f)} onChange={() => toggle(f)} style={{ accentColor: '#F5E642' }} />
                <span style={{ fontSize: '0.9rem' }}>{f}</span>
              </label>
            ))}
          </div>
          <button onClick={() => setShown(true)} disabled={selected.length === 0}
            style={{ background: selected.length > 0 ? '#F5E642' : '#1e3a5f', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: selected.length > 0 ? 'pointer' : 'default' }}>
            Build My Q3 Priority List
          </button>
        </div>

        {shown && results.length > 0 && (
          <div style={{ background: '#132140', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📋 Your Q3 Priority List</div>
            {results.sort((a, b) => ['CRITICAL','HIGH','MEDIUM','LOW'].indexOf(a.urgency) - ['CRITICAL','HIGH','MEDIUM','LOW'].indexOf(b.urgency))
              .map((r, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <div style={{ fontWeight: 700 }}>{r.q3Task}</div>
                  <span style={{ color: urgencyColor[r.urgency], fontSize: '0.8rem', fontWeight: 700, border: `1px solid ${urgencyColor[r.urgency]}`, borderRadius: 4, padding: '0.1rem 0.4rem' }}>{r.urgency}</span>
                </div>
                <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.3rem' }}>⏰ {r.timing}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{r.why}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#132140', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🍂 When to Start Planning Fall Improvements</div>
          {[
            ['Aug 1', 'Get contractor bids for October/November projects now'],
            ['Aug 15', 'Order materials — pavers, roofing, lumber have 3–4 week lead times in fall'],
            ['Sep 1', 'Begin scaling back irrigation and fertilizer'],
            ['Sep 15', 'Plant trees, shrubs, and fall perennials — soil temps drop enough'],
            ['Sep 20', 'Schedule furnace inspection before first cold front (Oct 1 average)'],
            ['Oct 1', 'DFW average first cold front — heating season begins'],
          ].map(([date, desc]) => (
            <div key={date} style={{ display: 'flex', gap: '1rem', padding: '0.6rem 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 90, fontSize: '0.9rem' }}>{date}</span>
              <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
