import { useState } from 'react';

const checklistItems = {
  base: [
    { id: 'hvac', label: 'Set HVAC to 78°F in summer, 60°F in winter — never off in DFW summer', icon: '🌡️' },
    { id: 'lights', label: 'Turn off non-essential lights and ceiling fans in empty rooms', icon: '💡' },
    { id: 'doors', label: 'Verify all exterior doors and windows locked', icon: '🔒' },
    { id: 'stovetop', label: 'Confirm stove/oven is off', icon: '🔥' },
    { id: 'water', label: 'Know where your main water shutoff is (DFW freeze warnings need fast action)', icon: '💧' },
    { id: 'notifications', label: 'Enable security camera motion notifications on phone', icon: '📱' },
  ],
  pets: [
    { id: 'petfood', label: 'Confirm pet water + food covered for trip length', icon: '🐾' },
    { id: 'pettemp', label: 'HVAC set to 74°F max — pets overheat faster than humans in DFW summer', icon: '🐕' },
    { id: 'petsitter', label: 'Confirm pet sitter has emergency vet contact', icon: '🏥' },
  ],
  irrigation: [
    { id: 'sprinkler', label: 'Verify sprinkler timer is set — DFW clay soil cracks fast without water', icon: '💦' },
    { id: 'restrictions', label: 'Confirm current DFW city watering restrictions (day/time rules)', icon: '📋' },
  ],
  smarthome: [
    { id: 'doorbell', label: 'Test video doorbell live view before leaving', icon: '📹' },
    { id: 'locks', label: 'Enable smart lock auto-lock (15 min max for day trips)', icon: '🔑' },
    { id: 'garage', label: 'Confirm garage door closed via app if smart-enabled', icon: '🚗' },
    { id: 'smoke', label: 'Verify smart smoke detector connected and sending alerts', icon: '🚨' },
  ],
};

const emergencyContacts = [
  { role: 'Trusted neighbor', why: 'Package pickup, emergency entry' },
  { role: 'HVAC company', why: 'DFW summer AC failure = pipe/appliance damage in hours' },
  { role: 'Plumber', why: 'Burst pipe or water leak fast response' },
  { role: 'Security monitoring', why: 'Alert response if alarm triggers' },
];

export default function DFWDayTripHomeGuide() {
  const [tripLength, setTripLength] = useState('');
  const [hasPets, setHasPets] = useState(false);
  const [hasIrrigation, setHasIrrigation] = useState(false);
  const [hasSmartHome, setHasSmartHome] = useState(false);
  const [checklist, setChecklist] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);

  function generate() {
    if (!tripLength) return;
    let items = checklistItems.base.map(i => i.id);
    if (hasPets) items = [...items, ...checklistItems.pets.map(i => i.id)];
    if (hasIrrigation) items = [...items, ...checklistItems.irrigation.map(i => i.id)];
    if (hasSmartHome) items = [...items, ...checklistItems.smarthome.map(i => i.id)];
    setChecklist([]);
    setGenerated(true);
  }

  function toggle(id: string) {
    setChecklist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }

  const allItems = [
    ...checklistItems.base,
    ...(hasPets ? checklistItems.pets : []),
    ...(hasIrrigation ? checklistItems.irrigation : []),
    ...(hasSmartHome ? checklistItems.smarthome : []),
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🚗🏠</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW Day Trip Home Checklist</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW summer means your home needs attention even when you're gone for 6 hours. Heat, pets, and irrigation create real risks.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚙️ Configure Your Checklist</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Trip Length</label>
            <select value={tripLength} onChange={e => setTripLength(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
              <option value="">Select...</option>
              <option value="half">Half day (under 6 hrs)</option>
              <option value="full">Full day (6–12 hrs)</option>
              <option value="overnight">Overnight (12–24 hrs)</option>
            </select>
          </div>
          {[
            { state: hasPets, setter: setHasPets, label: '🐾 I have pets at home' },
            { state: hasIrrigation, setter: setHasIrrigation, label: '💦 I have a sprinkler / irrigation system' },
            { state: hasSmartHome, setter: setHasSmartHome, label: '📱 I have smart home devices' },
          ].map(({ state, setter, label }) => (
            <div key={label} onClick={() => setter(!state)} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginBottom: 12, padding: 12, background: state ? '#1a3a5c' : '#0A1628', borderRadius: 8, border: `1px solid ${state ? '#F5E642' : '#1e3a5f'}` }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: state ? '#F5E642′ : ’transparent', border: `2px solid ${state ? '#F5E642' : '#475569'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A1628', fontWeight: 700, fontSize: 14 }}>{state ? '✓' : ''}</div>
              <span style={{ color: '#cbd5e1′ }}>{label}</span>
            </div>
          ))}
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', width: '100%', marginTop: 8 }}>Generate My Checklist</button>
        </div>

        {generated && (
          <>
            <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <h3 style={{ color: '#F5E642′ }}>Pre-Departure Checklist</h3>
                <span style={{ color: '#94a3b8', fontSize: 14 }}>{checklist.length}/{allItems.length} done</span>
              </div>
              {allItems.map(item => (
                <div key={item.id} onClick={() => toggle(item.id)} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer', marginBottom: 14, opacity: checklist.includes(item.id) ? 0.5 : 1 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 4, background: checklist.includes(item.id) ? '#22c55e' : 'transparent', border: `2px solid ${checklist.includes(item.id) ? '#22c55e' : '#475569'}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>{checklist.includes(item.id) ? '✓' : ''}</div>
                  <span style={{ color: '#cbd5e1', fontSize: 14 }}>{item.icon} {item.label}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📞 DFW Emergency Contacts to Have Ready</h3>
              {emergencyContacts.map(c => (
                <div key={c.role} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, padding: '10px 0', borderBottom: '1px solid #1e3a5f' }}>
                  <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{c.role}</span>
                  <span style={{ color: '#94a3b8', fontSize: 14 }}>{c.why}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
