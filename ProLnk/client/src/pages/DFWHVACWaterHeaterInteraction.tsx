import { useState } from 'react';

type SystemCombo = 'hpwh_central' | 'standard_wh_central' | 'tankless_central' | 'hpwh_mini';
type DFWSituation = 'summer_peak' | 'summer_offpeak' | 'winter' | 'shoulder';

const combos: Record<SystemCombo, { label: string; emoji: string }> = {
  hpwh_central: { label: 'Heat Pump Water Heater + Central AC', emoji: '🔄' },
  standard_wh_central: { label: 'Tank Water Heater + Central AC', emoji: '🏠' },
  tankless_central: { label: 'Tankless Water Heater + Central AC', emoji: '⚡' },
  hpwh_mini: { label: 'Heat Pump Water Heater + Mini-Split', emoji: '🌀' },
};

const situations: Record<DFWSituation, string> = {
  summer_peak: '☀️ DFW Summer Peak (3–7 PM)',
  summer_offpeak: '🌙 DFW Summer Off-Peak',
  winter: '❄️ DFW Winter',
  shoulder: '🍂 Spring/Fall Shoulder',
};

type InteractionKey = `${SystemCombo}_${DFWSituation}`;

const interactions: Partial<Record<InteractionKey, { interaction: string; tip: string; savings: string }>> = {
  hpwh_central_summer_peak: {
    interaction: 'HPWH pulls heat from indoor air to heat water — this cools and dehumidifies your garage or utility room slightly, reducing AC load by 3–8%.',
    tip: 'Run HPWH during 9 AM–2 PM to pre-heat water before peak. Your AC benefits all afternoon from cooler ambient air.',
    savings: 'Combined efficiency gain: 8–15% vs. running both at peak',
  },
  hpwh_central_summer_offpeak: {
    interaction: 'Ideal time to heat water. HPWH operates at 3–4x efficiency vs. resistance heating. AC is off or minimal.',
    tip: 'Set HPWH schedule to 10 PM–6 AM for lowest electric rates on Oncor TOU plans.',
    savings: 'Off-peak HPWH saves $18–$35/month vs. standard tank',
  },
  hpwh_central_winter: {
    interaction: 'HPWH extracts heat from the air — in winter this slightly cools your utility room, making your central heater work marginally harder.',
    tip: 'Switch HPWH to resistance/hybrid mode during freezes to avoid over-cooling attached spaces.',
    savings: 'Minimal impact in DFW winters — heat pump still efficient above 40°F',
  },
  hpwh_central_shoulder: {
    interaction: 'Optimal performance window — mild temps maximize HPWH efficiency without AC conflict.',
    tip: 'Spring and fall are perfect for HPWH tune-up and anode rod inspection.',
    savings: 'Peak efficiency season — COP of 3.5+ typical in DFW spring/fall',
  },
  standard_wh_central_summer_peak: {
    interaction: 'No interaction benefit — standard tanks resist continuously without regard to AC load.',
    tip: 'Install a timer to run water heater only 6–9 AM and 9 PM–midnight. Avoids stacking loads at peak.',
    savings: 'Timer installation: $40 part, saves $12–$22/month in summer',
  },
  standard_wh_central_summer_offpeak: {
    interaction: 'Run water heater overnight. Tank stays hot for morning demand with no AC conflict.',
    tip: 'Insulate the tank with an R-8 jacket if it is in an unconditioned garage — DFW summer garage temps hit 110°F+.',
    savings: 'Garage insulation jacket: $30, saves $8–$15/month in summer',
  },
  tankless_central_summer_peak: {
    interaction: 'Tankless only heats on demand — no standing load. Minimal AC interaction.',
    tip: 'DFW groundwater runs 65–75°F in summer, so tankless efficiency is high. No scheduling needed.',
    savings: 'Tankless in DFW: saves $15–$40/month vs. standard tank year-round',
  },
  hpwh_mini_summer_peak: {
    interaction: 'HPWH cooling effect pairs well with mini-split — both condition different zones without fighting each other.',
    tip: 'Place HPWH in garage or utility room separate from mini-split zone for maximum separation.',
    savings: 'Best DFW combo for efficiency — total HVAC + WH savings: $45–$80/month',
  },
};

export default function DFWHVACWaterHeaterInteraction() {
  const [combo, setCombo] = useState<SystemCombo>('hpwh_central');
  const [situation, setSituation] = useState<DFWSituation>('summer_peak');

  const key: InteractionKey = `${combo}_${situation}`;
  const result = interactions[key];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', letterSpacing: '0.08em', textTransform: 'uppercase' }}>💧 DFW HVAC Guide</div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>HVAC + Water Heater Interaction</h1>
        <p style={{ color: '#94A3B8', marginBottom: '28px', fontSize: '15px' }}>How your water heater and HVAC system interact — and how to optimize both.</p>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>YOUR SYSTEM COMBINATION</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {(Object.keys(combos) as SystemCombo[]).map(c => (
              <button key={c} onClick={() => setCombo(c)} style={{ padding: '12px', borderRadius: '10px', border: combo === c ? '2px solid #F5E642′ : '2px solid transparent', cursor: ’pointer', backgroundColor: '#1E2D45', textAlign: 'left' }}>
                <div style={{ fontSize: '16px', marginBottom: '4px' }}>{combos[c].emoji}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: combo === c ? '#F5E642′ : '#E8EDF5' }}>{combos[c].label}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>DFW SITUATION</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {(Object.keys(situations) as DFWSituation[]).map(s => (
              <button key={s} onClick={() => setSituation(s)} style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '12px', backgroundColor: situation === s ? '#F5E642′ : '#1E2D45', color: situation === s ? '#0A1628' : '#E8EDF5' }}>{situations[s]}</button>
            ))}
          </div>
        </div>

        {result ? (
          <>
            <div style={{ backgroundColor: '#1E2D45', borderRadius: '12px', padding: '20px', marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>🔄 INTERACTION</div>
              <div style={{ fontSize: '14px', color: '#E8EDF5', lineHeight: 1.6 }}>{result.interaction}</div>
            </div>
            <div style={{ backgroundColor: '#1E2D45', borderRadius: '12px', padding: '20px', marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>💡 OPTIMIZATION TIP</div>
              <div style={{ fontSize: '14px', color: '#E8EDF5', lineHeight: 1.6 }}>{result.tip}</div>
            </div>
            <div style={{ backgroundColor: '#0D2137', border: '1px solid #F5E642', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '13px', color: '#F5E642', fontWeight: 700 }}>💰 {result.savings}</div>
            </div>
          </>
        ) : (
          <div style={{ backgroundColor: '#1E2D45', borderRadius: '12px', padding: '20px', textAlign: 'center', color: '#64748B' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔍</div>
            <div>Select a system combo and situation to see interaction details.</div>
          </div>
        )}
      </div>
    </div>
  );
}
