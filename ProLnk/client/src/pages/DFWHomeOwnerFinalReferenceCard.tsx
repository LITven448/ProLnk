import { useState } from 'react';

const homeTypes = ['1950s Slab', '1970s Pier & Beam', '1990s Two-Story', '2000s+ New Build'];

type MonthlyAction = { system: string; emoji: string; action: string; urgent?: boolean };

const calendarBase: Record<string, MonthlyAction[]> = {
  Jan: [
    { system: 'HVAC', emoji: '❄️', action: 'Check heat strips — DFW cold snaps hit January hard' },
    { system: 'Plumbing', emoji: '💧', action: 'Know freeze protocol — drip faucets below 28°F' },
    { system: 'Electrical', emoji: '⚡', action: 'Test GFCI outlets after holiday lights removed' },
  ],
  Feb: [
    { system: 'Foundation', emoji: '🏗️', action: 'Resume foundation watering if dry — clay still moves in winter' },
    { system: 'Roofing', emoji: '🏠', action: 'Inspect for winter storm damage before spring storms' },
    { system: 'Plumbing', emoji: '💧', action: 'Flush water heater — begin annual maintenance cycle' },
  ],
  Mar: [
    { system: 'HVAC', emoji: '❄️', action: 'Spring AC tune-up — book before April rush', urgent: true },
    { system: 'Roofing', emoji: '🏠', action: 'Pre-storm-season inspection — fix before hail season' },
    { system: 'Foundation', emoji: '🏗️', action: 'Check drainage grades — spring rains arriving' },
  ],
  Apr: [
    { system: 'Roofing', emoji: '🏠', action: 'Hail season begins — inspect after every storm', urgent: true },
    { system: 'HVAC', emoji: '❄️', action: 'Replace filter — high-allergen spring season' },
    { system: 'Electrical', emoji: '⚡', action: 'Test outdoor GFCI before outdoor season begins' },
  ],
  May: [
    { system: 'HVAC', emoji: '❄️', action: 'AC running full time — clean condensate drain line' },
    { system: 'Foundation', emoji: '🏗️', action: 'Increase watering 3x/week as dry season starts', urgent: true },
    { system: 'Plumbing', emoji: '💧', action: 'Check irrigation system for leaks — water bills spike fast' },
  ],
  Jun: [
    { system: 'HVAC', emoji: '❄️', action: 'Check for warm spots — ice on coil = problem' },
    { system: 'Foundation', emoji: '🏗️', action: 'Peak drought risk — water daily if no rain >7 days', urgent: true },
    { system: 'Roofing', emoji: '🏠', action: 'Check attic temp — should not exceed 150°F' },
  ],
  Jul: [
    { system: 'HVAC', emoji: '❄️', action: 'Peak load month — change filter mid-month' },
    { system: 'Foundation', emoji: '🏗️', action: 'Maximum clay stress — maintain watering religiously', urgent: true },
    { system: 'Electrical', emoji: '⚡', action: 'Surge protector check — peak lightning storm season' },
  ],
  Aug: [
    { system: 'HVAC', emoji: '❄️', action: 'Drain line bleach flush — peak moisture month' },
    { system: 'Foundation', emoji: '🏗️', action: 'Drought watch — water if 2+ weeks without rain', urgent: true },
    { system: 'Plumbing', emoji: '💧', action: 'Check water bill — hidden leaks most common in summer' },
  ],
  Sep: [
    { system: 'Roofing', emoji: '🏠', action: 'Post-summer inspection — UV and heat damage check' },
    { system: 'HVAC', emoji: '❄️', action: 'Book fall tune-up for October', urgent: true },
    { system: 'Foundation', emoji: '🏗️', action: 'Continue watering — September still dry in DFW' },
  ],
  Oct: [
    { system: 'HVAC', emoji: '❄️', action: 'Fall tune-up — prepare heat for winter' },
    { system: 'Electrical', emoji: '⚡', action: 'Test smoke and CO detectors — heating season begins' },
    { system: 'Plumbing', emoji: '💧', action: 'Disconnect outdoor hoses before freeze season' },
  ],
  Nov: [
    { system: 'Roofing', emoji: '🏠', action: 'Clean gutters — fall leaves clog and cause fascia rot' },
    { system: 'Foundation', emoji: '🏗️', action: 'Reduce watering — cooler temps, less evaporation' },
    { system: 'HVAC', emoji: '❄️', action: 'Confirm heat is working — test before cold arrives' },
  ],
  Dec: [
    { system: 'Plumbing', emoji: '💧', action: 'Know your freeze protocol — freeze risk returns' },
    { system: 'Electrical', emoji: '⚡', action: 'Holiday light load — check circuit before overloading' },
    { system: 'Roofing', emoji: '🏠', action: 'Year-end inspection — note anything to address in spring' },
  ],
};

const months = Object.keys(calendarBase);

export default function DFWHomeOwnerFinalReferenceCard() {
  const [homeType, setHomeType] = useState(homeTypes[0]);
  const [activeMonth, setActiveMonth] = useState('May');

  const actions = calendarBase[activeMonth] || [];

  const systemColors: Record<string, string> = {
    HVAC: '#3b82f6', Plumbing: '#06b6d4', Electrical: '#f59e0b', Roofing: '#8b5cf6', Foundation: '#10b981',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>🏡📋</div>
          <h1 style={{ color: '#F5E642', fontSize: '26px', fontWeight: 800, margin: 0 }}>DFW Homeowner Master Reference Card</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px' }}>All 5 systems · Monthly action planner · Personalized for your DFW home</p>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div>
            <label style={{ color: '#cbd5e1', fontSize: '13px', marginRight: '8px' }}>Home Type:</label>
            <select value={homeType} onChange={e => setHomeType(e.target.value)}
              style={{ background: '#1e293b', color: '#F5E642', border: '1px solid #F5E642', borderRadius: '6px', padding: '6px 10px', fontSize: '13px' }}>
              {homeTypes.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px', justifyContent: 'center' }}>
          {months.map(m => (
            <button key={m} onClick={() => setActiveMonth(m)}
              style={{ background: activeMonth === m ? '#F5E642′ : '#1e293b', color: activeMonth === m ? '#0A1628' : '#cbd5e1',
                border: '1px solid #334155', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: activeMonth === m ? 700 : 400 }}>
              {m}
            </button>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '20px', marginBottom: '20px', border: '1px solid #334155′ }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', fontWeight: 700, margin: '0 0 16px 0′ }}>{activeMonth} — Priority Actions for {homeType}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {actions.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', background: '#0f172a', borderRadius: '8px',
                borderLeft: `3px solid ${systemColors[a.system] || '#64748b'}` }}>
                <span style={{ fontSize: '20px' }}>{a.emoji}</span>
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ color: systemColors[a.system], fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{a.system}</span>
                    {a.urgent && <span style={{ background: '#dc2626', color: 'white', fontSize: '10px', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>URGENT</span>}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '13px', margin: 0 }}>{a.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginBottom: '20px' }}>
          {Object.entries(systemColors).map(([sys, color]) => (
            <div key={sys} style={{ background: '#1e293b', borderRadius: '8px', padding: '10px', borderLeft: `3px solid ${color}`, textAlign: 'center' }}>
              <div style={{ color, fontWeight: 700, fontSize: '12px' }}>{sys}</div>
              <div style={{ color: '#64748b', fontSize: '11px', marginTop: '2px' }}>reference card available</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '8px', padding: '12px 16px', textAlign: 'center' }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: '13px' }}>📋 Your master DFW home maintenance calendar — review monthly</span>
        </div>
      </div>
    </div>
  );
}
