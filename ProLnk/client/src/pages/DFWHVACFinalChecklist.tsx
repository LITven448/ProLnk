import { useState } from 'react';

const ITEMS = [
  { id: 1, freq: 'One-Time', text: 'Locate and document all HVAC equipment model/serial numbers' },
  { id: 2, freq: 'One-Time', text: 'Save manufacturer manuals and warranty documents digitally' },
  { id: 3, freq: 'One-Time', text: 'Register equipment with manufacturer for warranty protection' },
  { id: 4, freq: 'One-Time', text: 'Install a programmable or smart thermostat for DFW climate efficiency' },
  { id: 5, freq: 'One-Time', text: 'Seal all visible duct leaks with mastic or foil tape' },
  { id: 6, freq: 'One-Time', text: 'Confirm correct refrigerant type on unit nameplate' },
  { id: 7, freq: 'Monthly', text: 'Check and replace 1-inch air filter (every 30 days in DFW summers)' },
  { id: 8, freq: 'Monthly', text: 'Verify thermostat is set correctly for season' },
  { id: 9, freq: 'Monthly', text: 'Listen for unusual sounds: rattling, banging, or squealing' },
  { id: 10, freq: 'Monthly', text: 'Confirm condensate drain line is clear and dripping properly' },
  { id: 11, freq: 'Monthly', text: 'Check that all vents are open and unobstructed' },
  { id: 12, freq: 'Annually', text: 'Schedule spring AC tune-up before DFW heat season (March-April)' },
  { id: 13, freq: 'Annually', text: 'Schedule fall furnace inspection before heating season (Oct-Nov)' },
  { id: 14, freq: 'Annually', text: 'Have refrigerant levels checked by licensed HVAC tech' },
  { id: 15, freq: 'Annually', text: 'Clean condenser coils on outdoor unit' },
  { id: 16, freq: 'Annually', text: 'Flush condensate drain line with diluted bleach' },
  { id: 17, freq: 'Annually', text: 'Inspect and clean evaporator coil' },
  { id: 18, freq: 'Annually', text: 'Test all capacitors and contactors for wear' },
  { id: 19, freq: 'As-Needed', text: 'Replace aging equipment (15+ years) before summer failure risk' },
  { id: 20, freq: 'As-Needed', text: 'Address ice on refrigerant lines immediately — call a pro' },
  { id: 21, freq: 'As-Needed', text: 'Upgrade insulation in attic to reduce HVAC load (DFW critical)' },
  { id: 22, freq: 'As-Needed', text: 'Install UV light in air handler to combat DFW humidity mold' },
  { id: 23, freq: 'As-Needed', text: 'Get duct cleaning after major renovation or pest infestation' },
  { id: 24, freq: 'As-Needed', text: 'Check for carbon monoxide if furnace is gas-powered' },
  { id: 25, freq: 'As-Needed', text: 'Call a pro if electric bill spikes unexpectedly in summer' },
];

const FREQ_COLORS: Record<string, string> = {
  'One-Time': '#F5E642',
  'Monthly': '#60CFFF',
  'Annually': '#7EE8A2',
  'As-Needed': '#FF9F6B',
};

export default function DFWHVACFinalChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const pct = Math.round((checked.size / ITEMS.length) * 100);
  const remaining = ITEMS.filter(i => !checked.has(i.id));
  const freqs = [...new Set(ITEMS.map(i => i.freq))];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>DFW HOMEOWNER SERIES</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>🌡️ DFW HVAC Final Checklist</h1>
        <p style={{ color: '#9BB3CC', marginBottom: 24, fontSize: 14 }}>25 things every DFW homeowner should do, know, or have for their HVAC system.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ position: 'relative', width: 80, height: 80 }}>
            <svg viewBox="0 0 36 36" style={{ width: 80, height: 80, transform: 'rotate(-90deg)' }}>
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1E3A5F" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F5E642" strokeWidth="3"
                strokeDasharray={`${pct} 100`} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#F5E642' }}>{pct}%</div>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{checked.size} of {ITEMS.length} complete</div>
            <div style={{ color: '#9BB3CC', fontSize: 13, marginTop: 4 }}>{remaining.length > 0 ? `${remaining.length} items remaining` : '✅ Fully protected!'}</div>
          </div>
        </div>

        {freqs.map(freq => (
          <div key={freq} style={{ marginBottom: 28 }}>
            <div style={{ color: FREQ_COLORS[freq], fontWeight: 700, fontSize: 12, letterSpacing: 2, marginBottom: 12, textTransform: 'uppercase' }}>● {freq}</div>
            {ITEMS.filter(i => i.freq === freq).map(item => (
              <div key={item.id} onClick={() => toggle(item.id)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', borderRadius: 8, marginBottom: 8, cursor: 'pointer',
                  background: checked.has(item.id) ? '#0F2040' : '#111E35', border: `1px solid ${checked.has(item.id) ? '#1E3A5F' : '#1A2F4A'}`,
                  opacity: checked.has(item.id) ? 0.6 : 1 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked.has(item.id) ? '#F5E642' : '#2A4060'}`,
                  background: checked.has(item.id) ? '#F5E642' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>
                  {checked.has(item.id) ? '✓' : ''}
                </div>
                <span style={{ fontSize: 14, lineHeight: 1.5, textDecoration: checked.has(item.id) ? 'line-through' : 'none', color: checked.has(item.id) ? '#5A7A9A' : '#D4E4F4' }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
