import { useState } from 'react';

const homeFeatures = [
  { id: 'gas', label: 'Gas furnace' },
  { id: 'electric', label: 'All-electric HVAC' },
  { id: 'older', label: 'System 10+ years old' },
  { id: 'pool', label: 'Pool or outdoor water features' },
  { id: 'attic', label: 'Attic air handler' },
  { id: 'pets', label: 'Pets in the home' },
];

const baseKit = [
  { item: '📦 2 backup air filters (your size)', reason: 'Replace immediately if system stops moving air' },
  { item: '📞 HVAC emergency contact card', reason: 'Saved in phone AND posted by thermostat' },
  { item: '💊 Condensate tablets (6-pack)', reason: 'Drop in drain pan to prevent clogs all summer' },
  { item: '🔦 Flashlight + headlamp', reason: 'Attic and utility closet work in the dark' },
  { item: '🌡️ Indoor thermometer/hygrometer', reason: 'Know if HVAC is struggling before it fully fails' },
];

const addons: Record<string, { item: string; reason: string }> = {
  gas: { item: '🔴 Gas shutoff wrench', reason: 'If you smell gas, shut off before calling' },
  electric: { item: '⚡ Non-contact voltage tester', reason: 'Verify power before touching any components' },
  older: { item: '🧰 Capacitor tester kit ($25)', reason: 'Old capacitors fail every summer — check first' },
  pool: { item: '💧 Hose washdown nozzle', reason: 'Clean outdoor condenser coils without a pro' },
  attic: { item: '🪜 6-ft folding step ladder', reason: 'Safe attic access for filter changes and checks' },
  pets: { item: '🐾 Extra HEPA pre-filter', reason: 'Pet dander clogs filters 2x faster in DFW heat' },
};

export default function DFWHVACEmergencyKit() {
  const [selected, setSelected] = useState<string[]>([]);
  const [kit, setKit] = useState<null | { item: string; reason: string }[]>(null);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const buildKit = () => {
    const extras = selected.map(id => addons[id]).filter(Boolean);
    setKit([...baseKit, ...extras]);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EEF4', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>🧰</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW HVAC Emergency Kit</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>When DFW temps hit 105°F and your HVAC stops, you have hours — not days — to respond. A prepared DFW homeowner keeps the right items on hand so a minor problem doesn't become a major emergency.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🏠 Tell Me About Your Home</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1rem' }}>Select all that apply — I'll build your custom HVAC emergency kit.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.25rem' }}>
            {homeFeatures.map(f => (
              <button key={f.id} onClick={() => toggle(f.id)}
                style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '2px solid', borderColor: selected.includes(f.id) ? '#F5E642′ : '#1E3A5F', background: selected.includes(f.id) ? '#F5E642' : ’transparent', color: selected.includes(f.id) ? '#0A1628′ : '#E8EEF4', cursor: ’pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                {f.label}
              </button>
            ))}
          </div>
          <button onClick={buildKit}
            style={{ width: '100%', padding: '0.85rem', borderRadius: 10, background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer' }}>
            Build My HVAC Emergency Kit
          </button>
        </div>

        {kit && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 0.25rem' }}>Your DFW HVAC Emergency Kit</h3>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1.25rem' }}>{kit.length} items — store in a labeled bin near your air handler</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {kit.map((entry, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.85rem' }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{entry.item}</div>
                  <div style={{ color: '#94A3B8', fontSize: '0.82rem' }}>{entry.reason}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: '#1a2f50', borderRadius: 8 }}>
              <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.85rem' }}>🔧 For anything beyond your kit, ProLnk connects you with emergency-ready DFW HVAC pros — free quotes, verified techs.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
