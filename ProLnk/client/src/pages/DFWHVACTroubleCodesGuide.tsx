import { useState } from 'react';

type Brand = 'Carrier' | 'Trane' | 'Lennox' | 'Rheem' | 'Goodman';

const codes: Record<Brand, { code: string; meaning: string; urgency: 'low' | 'medium' | 'high'; techCheck: string }[]> = {
  Carrier: [
    { code: '13', meaning: 'Limit device lockout — system tripped 3+ times on high temp limit.', urgency: 'high', techCheck: 'Dirty filter, blocked return, failed blower motor, cracked heat exchanger.' },
    { code: '14', meaning: 'Ignition lockout — gas furnace failed to light after 3 attempts.', urgency: 'high', techCheck: 'Gas pressure, ignitor resistance, flame sensor, inducer motor.' },
    { code: '21', meaning: 'Gas heating lockout — pressure switch fault.', urgency: 'medium', techCheck: 'Condensate drain blockage (common in DFW humidity), inducer motor, pressure switch hose.' },
    { code: '24', meaning: 'Secondary voltage fuse blown.', urgency: 'medium', techCheck: 'Shorted thermostat wire, faulty control board, failed zone valve.' },
    { code: '33', meaning: 'Limit circuit fault — open high-temperature limit device.', urgency: 'high', techCheck: 'Airflow restriction, dirty filter, failed blower, oversized system.' },
  ],
  Trane: [
    { code: '2 flashes', meaning: 'System lockout — 5 failed ignition attempts.', urgency: 'high', techCheck: 'Gas supply, ignitor, flame sensor cleaning, inducer pressure.' },
    { code: '3 flashes', meaning: 'Draft pressure fault — inducer or pressure switch issue.', urgency: 'medium', techCheck: 'Clogged condensate drain, blocked flue, failed inducer motor.' },
    { code: '4 flashes', meaning: 'Open high-temperature limit.', urgency: 'high', techCheck: 'Filter restriction, blower motor, return airflow, refrigerant charge.' },
    { code: '6 flashes', meaning: 'Low pressure switch open.', urgency: 'medium', techCheck: 'Low refrigerant charge, dirty evaporator coil, restricted filter.' },
    { code: '9 flashes', meaning: 'Reversed line voltage polarity.', urgency: 'medium', techCheck: 'Electrical connection at disconnect or air handler wiring.' },
  ],
  Lennox: [
    { code: 'E1', meaning: 'Communication error between control board and zone controller.', urgency: 'medium', techCheck: 'Thermostat wiring, control board, zone controller connections.' },
    { code: 'E2', meaning: 'Ignition failure lockout.', urgency: 'high', techCheck: 'Ignitor, gas valve, flame sensor, inducer operation.' },
    { code: 'E4', meaning: 'High limit switch open.', urgency: 'high', techCheck: 'Airflow restrictions, blower operation, heat exchanger integrity.' },
    { code: 'E5', meaning: 'Rollout switch open — flame detected outside combustion area.', urgency: 'high', techCheck: 'Cracked heat exchanger, blocked flue — do not run, call immediately.' },
    { code: 'E8', meaning: 'Pressure switch fault.', urgency: 'medium', techCheck: 'Condensate drain blockage, inducer speed, pressure switch hose.' },
  ],
  Rheem: [
    { code: '1 flash', meaning: 'Normal operation, no call for heat.', urgency: 'low', techCheck: 'No issue — system is in standby.' },
    { code: '2 flashes', meaning: 'Normal — cooling or fan only mode active.', urgency: 'low', techCheck: 'No issue — confirms AC or fan operation.' },
    { code: '4 flashes', meaning: 'Open high-pressure switch (AC mode).', urgency: 'high', techCheck: 'Dirty condenser coil, failed condenser fan motor, refrigerant overcharge.' },
    { code: '6 flashes', meaning: 'Low-pressure switch open.', urgency: 'medium', techCheck: 'Refrigerant leak, dirty evaporator coil, restricted filter.' },
    { code: '9 flashes', meaning: 'Ignition lockout.', urgency: 'high', techCheck: 'Gas pressure, hot surface ignitor, flame sensor, gas valve.' },
  ],
  Goodman: [
    { code: '2 flashes', meaning: 'Lockout — pressure switch stuck open.', urgency: 'medium', techCheck: 'Condensate drain, inducer motor, pressure switch hose integrity.' },
    { code: '3 flashes', meaning: 'Draft pressure switch stuck closed.', urgency: 'medium', techCheck: 'Inducer motor running when not called, pressure switch failure.' },
    { code: '4 flashes', meaning: 'Open high-temperature limit.', urgency: 'high', techCheck: 'Filter change, return air obstruction, blower motor speed.' },
    { code: '5 flashes', meaning: 'Flame sensed without call for heat — gas valve leak suspected.', urgency: 'high', techCheck: 'Gas valve replacement — shut off gas and call tech immediately.' },
    { code: '6 flashes', meaning: 'Low-stage pressure switch fault.', urgency: 'medium', techCheck: 'Two-stage system pressure switch, condensate, inducer performance.' },
  ],
};

const urgencyStyles: Record<string, { bg: string; color: string; label: string }> = {
  low: { bg: '#14532D', color: '#86EFAC', label: '🟢 Low' },
  medium: { bg: '#78350F', color: '#FDE68A', label: '🟡 Medium — Schedule Soon' },
  high: { bg: '#7F1D1D', color: '#FCA5A5', label: '🔴 High — Call Now' },
};

export default function DFWHVACTroubleCodesGuide() {
  const [brand, setBrand] = useState<Brand>('Carrier');
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const brands: Brand[] = ['Carrier', 'Trane', 'Lennox', 'Rheem', 'Goodman'];
  const activeEntry = codes[brand].find(c => c.code === selectedCode);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>🔦</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW HVAC Trouble Code Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Carrier · Trane · Lennox · Rheem · Goodman — what that blinking light means</p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ color: '#64748B', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>SELECT YOUR BRAND</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {brands.map(b => (
              <button key={b} onClick={() => { setBrand(b); setSelectedCode(null); }}
                style={{ background: brand === b ? '#F5E642' : '#0F2237', color: brand === b ? '#0A1628' : '#CBD5E1', border: `2px solid ${brand === b ? '#F5E642' : '#1E3A5F'}`, borderRadius: 8, padding: '8px 18px', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
                {b}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#64748B', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>SELECT ERROR CODE</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {codes[brand].map(c => (
              <button key={c.code} onClick={() => setSelectedCode(selectedCode === c.code ? null : c.code)}
                style={{ background: selectedCode === c.code ? '#1E3A5F' : '#0F2237', border: `2px solid ${selectedCode === c.code ? '#F5E642' : urgencyStyles[c.urgency].color}`, borderRadius: 8, padding: '8px 16px', cursor: 'pointer', color: selectedCode === c.code ? '#F5E642' : urgencyStyles[c.urgency].color, fontWeight: 700, fontSize: 13 }}>
                Code {c.code}
              </button>
            ))}
          </div>
        </div>

        {activeEntry ? (
          <div style={{ background: '#0F2237', border: '2px solid #1E3A5F', borderRadius: 14, padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, margin: 0 }}>{brand} — Code {activeEntry.code}</h2>
              <span style={{ background: urgencyStyles[activeEntry.urgency].bg, color: urgencyStyles[activeEntry.urgency].color, padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                {urgencyStyles[activeEntry.urgency].label}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <div style={{ color: '#64748B', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>WHAT IT MEANS</div>
                <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{activeEntry.meaning}</p>
              </div>
              <div>
                <div style={{ color: '#64748B', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>WHAT THE TECH WILL CHECK</div>
                <p style={{ color: '#86EFAC', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{activeEntry.techCheck}</p>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ background: '#0F2237', border: '2px dashed #1E3A5F', borderRadius: 14, padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
            <p style={{ color: '#64748B', margin: 0 }}>Select your brand then tap the error code flashing on your air handler board</p>
          </div>
        )}

        <div style={{ marginTop: 24, background: '#0F2237', border: '1px solid #1E3A5F', borderRadius: 10, padding: 16 }}>
          <div style={{ color: '#FCA5A5', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>⚠️ DFW TECH TIP</div>
          <p style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.7, margin: 0 }}>In DFW, the most common summer service calls are from condensate line blockages causing pressure switch faults, and dirty filters causing high-limit trips. Before calling, change your filter and pour a cup of diluted bleach down the drain line — it resolves 30% of calls.</p>
        </div>
      </div>
    </div>
  );
}
