import { useState } from 'react';

type Resident = 'toddlers' | 'school_age' | 'dogs' | 'cats';

const SAFETY_ITEMS: Record<Resident, { label: string; priority: 'critical' | 'high' | 'medium'; action: string }[]> = {
  toddlers: [
    { label: 'Pool / water feature fully fenced', priority: 'critical', action: 'Install 4-foot+ self-closing, self-latching gate. Add door alarm on any home entry to pool area.' },
    { label: 'Baby gates at top AND bottom of stairs', priority: 'critical', action: 'Hardware-mounted gate at top (pressure-mount insufficient). Pressure-mount acceptable at bottom only.' },
    { label: 'Window fall prevention devices installed', priority: 'critical', action: 'All windows above ground floor accessible to children. $20-40 per window. Removable for adults.' },
    { label: 'CO detector within 15ft of sleeping areas', priority: 'critical', action: 'If gas appliances or attached garage, CO detector is required by Texas code.' },
    { label: 'Cabinet locks on all lower cabinets', priority: 'high', action: 'Kitchen, bathroom, utility room. Especially chemicals, medications, sharp objects.' },
    { label: 'Outlet covers on all unused outlets', priority: 'high', action: 'Tamper-resistant outlet covers throughout home.' },
    { label: 'Hot water heater set to 120°F max', priority: 'high', action: 'Prevents scalding. Most water heaters default to 140°F — too hot for toddlers.' },
    { label: 'Furniture anchored to walls', priority: 'medium', action: 'Dressers, bookshelves, TV stands — top-heavy furniture tips frequently. Anti-tip straps $10-20 each.' },
  ],
  school_age: [
    { label: 'Pool fence and alarm still required', priority: 'critical', action: 'School-age children are not immune to drowning. Fence and alarm are still critical until age 10+.' },
    { label: 'Garage door safety sensor tested', priority: 'high', action: 'Test monthly — wave hand under closing door. Must auto-reverse. Required by law on all openers.' },
    { label: 'Fire escape plan practiced', priority: 'high', action: 'Two exit routes from every bedroom. Meeting point outside. Practice twice per year.' },
    { label: 'Internet/device safety in shared spaces', priority: 'high', action: 'Router-level parental controls. Devices charged in common area, not bedrooms.' },
    { label: 'Trampoline enclosure netting', priority: 'medium', action: 'If trampoline is present — enclosure net required, no double bouncing, adult supervision.' },
    { label: 'Bike helmet storage accessible', priority: 'medium', action: 'Make it easy to grab — kids skip helmets if inconvenient.' },
  ],
  dogs: [
    { label: 'Fence minimum 6 feet for large breeds', priority: 'critical', action: 'No gap larger than 4 inches at bottom. Check for dig-out spots monthly.' },
    { label: 'Pool exit ramp installed', priority: 'critical', action: 'Most dogs cannot exit pools unaided. Pet pool ramps $30-100. Position in shallow end area.' },
    { label: 'Yard chemicals secured', priority: 'critical', action: 'Fertilizer, herbicides, pesticides — read all labels. Many are acutely toxic to dogs.' },
    { label: 'HVAC filter upgraded to MERV-11+', priority: 'high', action: 'Dogs shed significant dander. MERV-11 filter captures more. Change every 45-60 days vs. 90.' },
    { label: 'Fire ant treatment — professional', priority: 'high', action: 'Fire ants are an emergency risk for dogs, especially small breeds. Professional treatment, not DIY bait only.' },
    { label: 'Foundation gaps sealed', priority: 'medium', action: 'Snakes enter homes through small foundation gaps. Seal with appropriate caulk or mesh.' },
  ],
  cats: [
    { label: 'Window screens secured and undamaged', priority: 'critical', action: 'Cats push through damaged screens. Inspect all screens — even 2nd floor. High-rise syndrome is real.' },
    { label: 'Toxic plant audit', priority: 'high', action: 'Lilies, aloe, pothos, peace lily — highly toxic to cats. ASPCA toxic plant list covers 400+ species.' },
    { label: 'Clothes dryer check habit', priority: 'high', action: 'Cats sleep in warm dryers. Always check before starting. Small cats are difficult to see.' },
    { label: 'HVAC filter — cat hair', priority: 'high', action: 'Cat dander and hair are finer than dog. MERV-11 minimum. Check filters monthly.' },
    { label: 'Garage chemicals secured', priority: 'high', action: 'Antifreeze is extremely toxic to cats and has a sweet taste they seek out. Lock garage chemicals.' },
    { label: 'Balcony netting if applicable', priority: 'medium', action: 'Cats misjudge distance and fall. Balcony netting prevents falls from multi-story homes.' },
  ],
};

const PRIORITY_COLORS = { critical: '#ef4444', high: '#f59e0b', medium: '#60a5fa' };
const PRIORITY_LABELS = { critical: '🔴 Critical', high: '🟡 High Priority', medium: '🔵 Moderate' };

export default function FamilyHomeSafetyGuide() {
  const [selected, setSelected] = useState<Resident[]>([]);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  function toggleResident(r: Resident) {
    setSelected(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);
  }

  function toggleItem(key: string) {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  }

  const allItems = selected.flatMap(r =>
    SAFETY_ITEMS[r].map(item => ({ ...item, key: `${r}-${item.label}` }))
  ).filter((item, idx, arr) => arr.findIndex(x => x.label === item.label) === idx)
   .sort((a, b) => {
     const order = { critical: 0, high: 1, medium: 2 };
     return order[a.priority] - order[b.priority];
   });

  const completedCount = allItems.filter(item => checked[item.key]).length;

  const residents = [
    { id: 'toddlers' as Resident, label: '👶 Toddlers (0-4)' },
    { id: 'school_age' as Resident, label: '🧒 School Age (5-12)' },
    { id: 'dogs' as Resident, label: '🐕 Dogs' },
    { id: 'cats' as Resident, label: '🐈 Cats' },
  ];

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 940, margin: '0 auto', padding: '48px 24px' }}>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: '#60a5fa', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            🏡 FAMILY SAFETY
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.15, margin: '0 0 20px', color: '#f8fafc' }}>
            DFW Family Home Safety Guide
          </h1>
          <p style={{ fontSize: 19, color: '#94a3b8', lineHeight: 1.7, maxWidth: 720 }}>
            For Families with Children and Pets
          </p>
        </div>

        {/* Child hotspots */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f8fafc', margin: '0 0 20px' }}>👶 Child Safety Hotspots in DFW Homes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          {[
            {
              icon: '🏊', title: 'Pool / Water Features',
              body: '#1 cause of accidental death for children under 5 in Texas. Fence all pool areas — 4-foot minimum, self-closing gate with latch above child reach, door alarm on all home entries to pool area.',
              level: 'CRITICAL'
            },
            {
              icon: '🪜', title: 'Stairs',
              body: 'Baby gates required at top AND bottom. Pressure-mounted gates acceptable only at bottom. Hardware-mounted gates required at top. Remove gates when child can open them reliably (usually 2 years).',
              level: 'HIGH'
            },
            {
              icon: '🪟', title: 'Windows (Upper Floors)',
              body: 'Window fall prevention devices required on all upper-floor windows accessible to children. These are $20-40 each, allow adult egress in emergency, and prevent the most common childhood home injuries.',
              level: 'HIGH'
            },
            {
              icon: '🚗', title: 'Garage Doors',
              body: 'Safety auto-reverse sensor required by law. Test monthly by waving hand under closing door — it must reverse immediately. Garage is also chemical storage — lock all cabinets.',
              level: 'HIGH'
            },
            {
              icon: '💨', title: 'Carbon Monoxide',
              body: 'CO sensor within 15 feet of sleeping areas is Texas code if gas appliances or attached garage is present. CO is invisible and odorless — children are more vulnerable than adults.',
              level: 'REQUIRED BY CODE'
            },
          ].map(item => (
            <div key={item.title} style={{ background: '#1e293b', borderRadius: 14, padding: 24, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 32, flexShrink: 0 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc' }}>{item.title}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', background: '#1f1315', padding: '3px 10px', borderRadius: 999, letterSpacing: 1 }}>{item.level}</div>
                </div>
                <div style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.65 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pet safety */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f8fafc', margin: '0 0 20px' }}>🐾 Pet Safety Considerations</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '🏊', title: 'Pool Access', desc: 'Most pets cannot exit pools. Pet pool ramps ($30-100) are essential. Position in shallow end. Supervise any pet near water.' },
            { icon: '🌿', title: 'Yard Chemicals', desc: 'Fertilizer, pesticides, herbicides — read labels before applying. Many are acutely toxic to pets. Store in locked area.' },
            { icon: '❄️', title: 'HVAC & Air Quality', desc: 'Pets shed dander and hair. Use MERV-11 filter minimum. Change more frequently — every 45-60 days with pets vs. 90.' },
            { icon: '🚧', title: 'Fence Integrity', desc: '6-foot minimum for large dogs. Check for gaps at bottom — no gap larger than 4 inches. Inspect for dig-out spots monthly.' },
          ].map(p => (
            <div key={p.title} style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>{p.title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        {/* DFW hazards */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', margin: '0 0 20px' }}>🌵 DFW-Specific Hazards</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '🐍', title: 'Snakes', body: 'Texas has 7 venomous snake species. DFW suburban areas regularly see copperheads and rattlesnakes. Seal foundation gaps, keep landscaping trimmed, educate school-age children.' },
              { icon: '🌡️', title: 'Extreme Heat', body: 'Never leave children or pets in vehicles. DFW summer sun heats car interiors to 140°F+ within 20 minutes. Dangerous in any season — temps swing unpredictably.' },
              { icon: '🐜', title: 'Fire Ants', body: 'Medical emergency for small children and pets. Texas fire ants are aggressive and attack in swarms. Professional treatment required — DIY bait insufficient for large infestations. Re-treat seasonally.' },
            ].map(h => (
              <div key={h.title} style={{ display: 'flex', gap: 16, padding: 18, background: '#0f172a', borderRadius: 12 }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{h.icon}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#f8fafc', marginBottom: 6 }}>{h.title}</div>
                  <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.65 }}>{h.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive audit */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', margin: '0 0 8px' }}>🔍 Personalized Safety Audit</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 20px' }}>Select who lives in your home to get a custom safety checklist.</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
            {residents.map(r => (
              <button
                key={r.id}
                onClick={() => toggleResident(r.id)}
                style={{
                  padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  background: selected.includes(r.id) ? '#3b82f6' : '#0f172a',
                  color: selected.includes(r.id) ? '#fff' : '#94a3b8',
                }}
              >
                {r.label}
              </button>
            ))}
          </div>

          {selected.length > 0 && allItems.length > 0 && (
            <>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: '#94a3b8' }}>{completedCount} of {allItems.length} items addressed</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: completedCount === allItems.length ? '#22c55e' : '#60a5fa' }}>
                    {Math.round((completedCount / allItems.length) * 100)}%
                  </span>
                </div>
                <div style={{ height: 6, background: '#0f172a', borderRadius: 999 }}>
                  <div style={{
                    height: '100%', borderRadius: 999, transition: 'width 0.3s',
                    background: completedCount === allItems.length ? '#22c55e' : '#3b82f6',
                    width: `${Math.round((completedCount / allItems.length) * 100)}%`,
                  }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {allItems.map(item => (
                  <div
                    key={item.key}
                    onClick={() => toggleItem(item.key)}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 14, padding: 16,
                      background: checked[item.key] ? '#0d2a1a' : '#0f172a',
                      borderRadius: 10, cursor: 'pointer',
                      border: `1px solid ${checked[item.key] ? '#22c55e' : '#1e293b'}`,
                    }}
                  >
                    <div style={{
                      width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked[item.key] ? '#22c55e' : '#334155'}`,
                      background: checked[item.key] ? '#22c55e' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
                    }}>
                      {checked[item.key] && <span style={{ color: '#fff', fontSize: 12 }}>✓</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: checked[item.key] ? '#4ade80' : '#f8fafc' }}>{item.label}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: PRIORITY_COLORS[item.priority], letterSpacing: 0.5 }}>{PRIORITY_LABELS[item.priority]}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.55 }}>{item.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {selected.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px 0', color: '#475569' }}>
              Select who lives in your home above to generate your personalized checklist.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
