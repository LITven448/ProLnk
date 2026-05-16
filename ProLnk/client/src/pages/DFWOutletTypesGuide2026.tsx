import { useState } from 'react';

const outletTypes = [
  { id: 'standard15', label: 'Standard 15A Outlet', emoji: '🔌', desc: 'Two vertical slots + ground. Handles 15A / 1800W max. Used in bedrooms, living rooms, hallways. Cannot use on 20A dedicated circuits.', locations: ['Bedrooms', 'Living rooms', 'Hallways', 'Dining rooms'] },
  { id: '20amp', label: '20A Outlet (T-Slot)', emoji: '⚡', desc: 'T-shaped slot on left side. Required for kitchen counters and bathroom circuits in DFW per NEC 210.52. Handles 20A / 2400W max.', locations: ['Kitchen counters', 'Bathrooms', 'Garages', 'Laundry rooms'] },
  { id: 'gfci', label: 'GFCI Outlet', emoji: '💧', desc: 'Ground Fault Circuit Interrupter — trips in 1/40th of a second if it detects a ground fault. Required within 6 feet of all water sources in DFW per NEC 210.8.', locations: ['Kitchens', 'Bathrooms', 'Garages', 'Outdoor', 'Near pools/spas'] },
  { id: 'afci', label: 'AFCI Outlet / Breaker', emoji: '🔥', desc: 'Arc Fault Circuit Interrupter — detects dangerous arcing (common cause of DFW house fires). Required in all bedrooms, living rooms, and most areas per 2020 NEC adopted in DFW.', locations: ['Bedrooms', 'Living rooms', 'Kitchens', 'Dining rooms'] },
  { id: 'usbc', label: 'USB-C Built-In Outlet', emoji: '📱', desc: 'Trending hard in DFW new construction. Leviton and Legrand models replace one outlet with USB-A + USB-C charging ports. No adapter needed. 5V/3A USB-C standard.', locations: ['Bedside outlets', 'Kitchen counters', 'Home offices', 'Living rooms'] },
  { id: '240v', label: '240V Outlet', emoji: '🔆', desc: 'NEMA 14-30 (dryer), NEMA 14-50 (range/EV), NEMA 6-20 (welder). Two hots + neutral + ground. Never connect 120V devices — immediately destroys them.', locations: ['Laundry (dryer)', 'Kitchen (range)', 'Garage (EV charger)', 'Workshop'] },
  { id: 'floor', label: 'Floor Outlet', emoji: '🟫', desc: 'In-floor outlets common in DFW open-plan homes and living rooms. Must be listed for floor use (UL listed). Pop-up style allows furniture placement anywhere.', locations: ['Open living rooms', 'Home theaters', 'Conference rooms', 'Islands'] },
];

const needGuide: Record<string, string> = {
  'water': 'GFCI Outlet required — all outlets within 6 feet of sinks, tubs, showers, or pool equipment. GFCI breaker protects entire circuit.\',
  'kitchen': '20A T-Slot GFCI Outlets — all kitchen counter outlets must be 20A and GFCI protected. Minimum two small appliance circuits required.\',
  'bedroom': 'Standard 15A + AFCI Protection — bedrooms need AFCI protection (breaker or outlet). USB-C outlets trending for bedside.\',
  'garage': '20A GFCI Outlets — all garage outlets must be GFCI protected. At least one outlet required. 20A recommended for tools.\',
  'ev': 'NEMA 14-50 (240V 50A) — standard EV charger outlet. Requires 6 AWG wire, 50A breaker, and NEMA 14-50R outlet in the garage.\',
  'outdoor': 'GFCI Weatherproof Outlets — all outdoor outlets in DFW require GFCI and weatherproof in-use covers. Front and back of home required.\',
  'office': 'Standard 15A + USB-C Combo — home offices benefit from USB-C built-in outlets and surge-protected outlet strips. AFCI protection required.\',
};

export default function DFWOutletTypesGuide2026() {
  const [need, setNeed] = useState<string>('\);
  const [activeOutlet, setActiveOutlet] = useState<string>('\);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔌</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Outlet Types Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Every outlet type found in DFW homes — what they do and where they go</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔍 What Outlet Do I Need?</h2>
          <select
            value={need}
            onChange={e => setNeed(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}
          >
            <option value="">Select your situation...</option>
            <option value="water">Near water (sink/tub/shower)</option>
            <option value="kitchen">Kitchen counter outlet</option>
            <option value="bedroom">Bedroom outlet</option>
            <option value="garage">Garage outlet</option>
            <option value="ev">EV charger outlet</option>
            <option value="outdoor">Outdoor outlet</option>
            <option value="office">Home office</option>
          </select>
          {need && (
            <div style={{ marginTop: 14, padding: 14, background: '#0f172a', borderRadius: 8, borderLeft: '3px solid #F5E642', color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>
              ✅ {needGuide[need]}
            </div>
          )}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 14 }}>Outlet Types in DFW Homes</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {outletTypes.map(o => (
            <div
              key={o.id}
              onClick={() => setActiveOutlet(activeOutlet === o.id ? '' : o.id)}
              style={{ background: activeOutlet === o.id ? '#1e3a5f' : '#1e293b', borderRadius: 10, padding: 14, cursor: 'pointer', border: `1px solid ${activeOutlet === o.id ? '#F5E642' : '#334155'}` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{o.emoji}</span>
                <span style={{ fontWeight: 600, fontSize: 15 }}>{o.label}</span>
                <span style={{ marginLeft: 'auto', color: '#64748b' }}>{activeOutlet === o.id ? '▲' : '▼'}</span>
              </div>
              {activeOutlet === o.id && (
                <div style={{ marginTop: 10 }}>
                  <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 8px' }}>{o.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {o.locations.map(l => <span key={l} style={{ background: '#0A1628', color: '#F5E642', padding: '3px 10px', borderRadius: 20, fontSize: 12 }}>{l}</span>)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 10, padding: 14, borderLeft: '3px solid #F5E642' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>💡 DFW adopted the 2020 NEC with local amendments. AFCI protection is now required in almost all living spaces — not just bedrooms. Check with your city permit office before adding outlets.</p>
        </div>
      </div>
    </div>
  );
}
