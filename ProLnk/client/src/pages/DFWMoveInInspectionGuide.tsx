import { useState } from 'react';

const homeTypes = [
  { id: 'new', label: 'New Construction' },
  { id: 'resale', label: 'Resale Home' },
  { id: 'condo', label: 'Condo / Townhome' },
  { id: 'rental', label: 'Rental Property' },
];

const homeAges = [
  { id: 'new', label: '0–5 Years' },
  { id: 'mid', label: '6–20 Years' },
  { id: 'older', label: '21–40 Years' },
  { id: 'vintage', label: '40+ Years' },
];

function getChecklist(type: string, age: string) {
  const universal = [
    'Test every light switch and outlet in every room',
    'Run all faucets — check water pressure and hot water response time',
    'Flush every toilet — check for running or weak flush',
    'Test all appliances included in sale (dishwasher, stove, disposal)',
    'Open and close every door and window — check locks and seals',
    'Test garage door opener and safety sensors',
    'Walk the perimeter — document any new cracks or damage',
    'Check attic access and confirm insulation visible',
  ];
  const prioritized: string[] = [];
  if (type === 'new') prioritized.push('Document all punch-list items on builder move-in form', 'Take photos of every room before furniture arrives', 'Test all smart home features and connected systems', 'Confirm all builder warranty cards are provided');
  if (age === 'older' || age === 'vintage') prioritized.push('Check foundation perimeter for new movement cracks', 'Look for water stains on ceilings — active vs old', 'Test GFCI outlets in bathrooms, kitchen, and garage', 'Check electrical panel for proper labeling and no double-taps');
  if (age === 'vintage') prioritized.push('Verify no knob-and-tube wiring remains active', 'Check for polybutylene pipes (gray, flex piping — recalls)', 'Inspect chimney firebox if applicable');
  if (type === 'rental') prioritized.push('Document EVERY imperfection in writing before moving in', 'Photograph all walls, floors, and fixtures with timestamps', 'Test smoke and CO detectors — landlord must provide working ones', 'Submit move-in condition report to landlord within required window');
  return { universal, prioritized };
}

function getPriorities(type: string, age: string) {
  if (type === 'new') return ['🥇 HVAC performance — run it before builder leaves', '🥈 All appliances and smart systems', '🥉 Window and door seals for energy efficiency'];
  if (age === 'vintage') return ['🥇 Foundation and structural integrity', '🥈 Electrical panel safety', '🥉 Plumbing material identification'];
  if (age === 'older') return ['🥇 HVAC age and cooling capacity for DFW heat', '🥈 Water heater age and condition', '🥉 Roof condition from ground level'];
  if (type === 'rental') return ['🥇 Complete photo documentation before unpacking', '🥈 All safety devices functioning', '🥉 Move-in condition report submission'];
  return ['🥇 AC cooling performance — DFW summers are extreme', '🥈 Water pressure and temperature', '🥉 All included appliances functioning'];
}

export default function DFWMoveInInspectionGuide() {
  const [homeType, setHomeType] = useState('');
  const [homeAge, setHomeAge] = useState('');
  const [showResult, setShowResult] = useState(false);
  const checklist = homeType && homeAge ? getChecklist(homeType, homeAge) : null;
  const priorities = homeType && homeAge ? getPriorities(homeType, homeAge) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '6px 14px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          🔍 DFW MOVE-IN INSPECTION
        </div>
        <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 8, color: '#fff' }}>Move-In Inspection Guide for DFW</h1>
        <p style={{ fontSize: 17, color: '#aaa', marginBottom: 36 }}>
          The move-in inspection is different from your purchase inspection — this is about documenting condition and testing everything before your warranty window closes or your landlord dispute begins.
        </p>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔑 Move-In Day vs. Inspection Day</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'rgba(245,230,66,0.08)', borderRadius: 8, padding: 16 }}>
              <strong style={{ color: '#F5E642' }}>Purchase Inspection</strong>
              <ul style={{ paddingLeft: 18, lineHeight: 1.9, fontSize: 14, marginTop: 10, color: '#ccc' }}>
                <li>Done during option period</li>
                <li>Professional inspector hired</li>
                <li>Goal: find defects to renegotiate</li>
                <li>Seller sees results</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(245,230,66,0.08)', borderRadius: 8, padding: 16 }}>
              <strong style={{ color: '#F5E642' }}>Move-In Inspection</strong>
              <ul style={{ paddingLeft: 18, lineHeight: 1.9, fontSize: 14, marginTop: 10, color: '#ccc' }}>
                <li>Done on closing or move-in day</li>
                <li>You walk through yourself</li>
                <li>Goal: document baseline condition</li>
                <li>Creates your paper trail for claims</li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>⚡ DFW-Specific First Checks</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: '❄️', title: 'AC Performance', desc: 'DFW summers hit 100+ regularly. Run the AC and confirm it reaches set temperature within 20 minutes.' },
              { icon: '💧', title: 'Water Pressure', desc: 'DFW has varying municipal pressure. Run shower + sink simultaneously — if pressure drops significantly, investigate.' },
              { icon: '🏗️', title: 'Foundation Cracks', desc: 'DFW clay soil moves. Walk the perimeter and interior slab for new cracks that were not in inspection report.' },
              { icon: '🚗', title: 'Garage Door', desc: 'Test auto-reverse safety feature by placing a 2x4 flat on the ground and closing the door — it must auto-reverse.' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 14 }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <div><strong style={{ color: '#F5E642' }}>{item.title}</strong><br /><span style={{ color: '#aaa', fontSize: 14 }}>{item.desc}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: 28, marginBottom: 28, color: '#0A1628' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 Get Your Move-In Checklist</h2>
          <p style={{ color: '#333', marginBottom: 20 }}>Home type plus age → personalized checklist, priorities, and documentation guide</p>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: 10 }}>Home Type</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {homeTypes.map(t => (
                <button key={t.id} onClick={() => { setHomeType(t.id); setShowResult(false); }}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: homeType === t.id ? '#0A1628' : 'rgba(10,22,40,0.3)', background: homeType === t.id ? '#0A1628' : 'transparent', color: homeType === t.id ? '#F5E642' : '#0A1628', fontWeight: 600, cursor: 'pointer' }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: 10 }}>Home Age</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {homeAges.map(a => (
                <button key={a.id} onClick={() => { setHomeAge(a.id); setShowResult(false); }}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: homeAge === a.id ? '#0A1628' : 'rgba(10,22,40,0.3)', background: homeAge === a.id ? '#0A1628' : 'transparent', color: homeAge === a.id ? '#F5E642' : '#0A1628', fontWeight: 600, cursor: 'pointer' }}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!homeType || !homeAge}
            style={{ background: homeType && homeAge ? '#0A1628' : 'rgba(10,22,40,0.3)', color: '#F5E642', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: homeType && homeAge ? 'pointer' : 'not-allowed', fontSize: 16 }}>
            Generate My Checklist →
          </button>
        </div>
        {showResult && checklist && priorities && (
          <div>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 28, marginBottom: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🥇 Top Priorities for Your Home</h3>
              {priorities.map(p => <div key={p} style={{ padding: '10px 14px', background: 'rgba(245,230,66,0.1)', borderRadius: 8, marginBottom: 8, fontSize: 15 }}>{p}</div>)}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 28, marginBottom: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📋 Universal Move-In Checklist</h3>
              {checklist.universal.map(item => (
                <label key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12, cursor: 'pointer' }}>
                  <input type="checkbox" style={{ marginTop: 3, width: 16, height: 16, flexShrink: 0 }} />
                  <span style={{ color: '#ccc', fontSize: 14 }}>{item}</span>
                </label>
              ))}
            </div>
            {checklist.prioritized.length > 0 && (
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #F5E642', borderRadius: 12, padding: 28, marginBottom: 20 }}>
                <h3 style={{ color: '#F5E642', marginBottom: 16 }}>⭐ Additional Items for Your Home Type</h3>
                {checklist.prioritized.map(item => (
                  <label key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12, cursor: 'pointer' }}>
                    <input type="checkbox" style={{ marginTop: 3, width: 16, height: 16, flexShrink: 0 }} />
                    <span style={{ color: '#ccc', fontSize: 14 }}>{item}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>📸 Documentation Guide</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 2, color: '#aaa' }}>
            <li>Take timestamped photos or video of every room before moving furniture in</li>
            <li>For rentals — submit written move-in condition report within 72 hours (Texas law protects you)</li>
            <li>For purchases — document anything not matching the final walkthrough and contact your agent same day</li>
            <li>Store all photos in a dedicated folder with the property address and move-in date</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
