import { useState } from 'react';

type PoolType = 'heat_pump_pool' | 'solar_pool' | 'gas_pool' | 'unheated';
type HomeSetup = 'standard_ac' | 'solar_home' | 'battery_backup' | 'ev_also';

const poolTypes: Record<PoolType, { label: string; emoji: string }> = {
  heat_pump_pool: { label: 'Pool Heat Pump', emoji: '♨️' },
  solar_pool: { label: 'Solar Pool Heating', emoji: '☀️' },
  gas_pool: { label: 'Gas Pool Heater', emoji: '🔥' },
  unheated: { label: 'Unheated Pool', emoji: '🏊' },
};

const homeSetups: Record<HomeSetup, { label: string; emoji: string }> = {
  standard_ac: { label: 'Standard Central AC', emoji: '❄️' },
  solar_home: { label: 'Home Solar + AC', emoji: '🌞' },
  battery_backup: { label: 'Solar + Battery', emoji: '🔋' },
  ev_also: { label: 'AC + EV Charging', emoji: '🚗' },
};

type ResultKey = `${PoolType}_${HomeSetup}`;

const results: Partial<Record<ResultKey, { load: string; schedule: string; savings: string }>> = {
  heat_pump_pool_standard_ac: {
    load: 'Pool heat pump (3–5 kW) + central AC (3–5 kW) = 6–10 kW combined. During DFW peak (3–7 PM) this can push 200A service near limits.',
    schedule: 'Run pool heat pump 8 AM–2 PM. AC handles afternoon peak alone. Pool retains heat 6–8 hours with a good cover.',
    savings: 'Off-peak scheduling saves $20–$40/month on Oncor TOU rate',
  },
  heat_pump_pool_solar_home: {
    load: 'Solar production (5–10 kW) often covers pool heat pump mid-day — essentially free pool heating 10 AM–3 PM in DFW.',
    schedule: 'Set pool heat pump to run 10 AM–3 PM to maximize solar offset. AC still gets grid power afternoon.',
    savings: 'Solar self-consumption for pool: $25–$50/month in summer',
  },
  heat_pump_pool_battery_backup: {
    load: 'Battery can power pool heat pump during peak hours from stored solar — zero grid draw for pool during Oncor peak.',
    schedule: 'Charge battery 8 AM–2 PM from solar. Dispatch to pool heat pump 3–7 PM. AC runs on grid or battery split.',
    savings: 'Peak avoidance: $35–$65/month combined with battery optimization',
  },
  heat_pump_pool_ev_also: {
    load: 'Three major loads competing: AC (4 kW) + pool heat pump (4 kW) + EV L2 charging (7 kW) = 15 kW. Nearly all 200A panel capacity.',
    schedule: 'Stagger strictly: pool heat pump 6 AM–noon, AC runs all day, EV charges 10 PM–6 AM only.',
    savings: 'Load staggering prevents demand charges and potential panel overload',
  },
  solar_pool_standard_ac: {
    load: 'Solar pool panels are passive — no electrical load. Reduces need to heat pool with electricity, indirectly reduces total home load.',
    schedule: 'No scheduling needed for solar heating. Run pool pump (0.75–1.5 kW) during off-peak hours.',
    savings: 'Solar pool heating saves $15–$30/month vs. heat pump pool in DFW summers',
  },
  solar_pool_solar_home: {
    load: 'Best DFW combo — solar roof heats home + pool panels heat pool. Both loads dramatically reduced from grid.',
    schedule: 'Run pool pump 9 AM–4 PM to circulate through solar panels during peak sun.',
    savings: 'Total pool + HVAC solar savings: $60–$120/month in DFW summer',
  },
  gas_pool_standard_ac: {
    load: 'Gas pool heater has no electrical impact on AC load — separate fuel source entirely.',
    schedule: 'Gas heating at night is most efficient — heat loss is lower and you’re not competing with daytime AC.',
    savings: 'No electrical load conflict. Gas heater adds $40–$90/month gas cost in pool season',
  },
  unheated_standard_ac: {
    load: 'No pool-HVAC electrical interaction. Pool water actually provides thermal mass that can slightly moderate yard microclimate.',
    schedule: 'Pool pump (0.75 kW) best run overnight or early morning — minimal contribution to peak load.',
    savings: 'Pool pump off-peak saves $8–$15/month. No heating cost.',
  },
};

export default function DFWHVACPoolInteraction() {
  const [poolType, setPoolType] = useState<PoolType>('heat_pump_pool');
  const [homeSetup, setHomeSetup] = useState<HomeSetup>('standard_ac');

  const key: ResultKey = `${poolType}_${homeSetup}`;
  const result = results[key];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', letterSpacing: '0.08em', textTransform: 'uppercase' }}>🏊 DFW HVAC Guide</div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>HVAC + Pool Interaction Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: '28px', fontSize: '15px' }}>Manage pool and AC loads to avoid Oncor peak charges and panel overload in DFW.</p>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>YOUR POOL TYPE</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {(Object.keys(poolTypes) as PoolType[]).map(p => (
              <button key={p} onClick={() => setPoolType(p)} style={{ padding: '12px', borderRadius: '10px', border: poolType === p ? '2px solid #F5E642′ : '2px solid transparent', cursor: ’pointer', backgroundColor: '#1E2D45', textAlign: 'left' }}>
                <div style={{ fontSize: '18px', marginBottom: '4px' }}>{poolTypes[p].emoji}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: poolType === p ? '#F5E642′ : '#E8EDF5' }}>{poolTypes[p].label}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>YOUR HOME SETUP</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {(Object.keys(homeSetups) as HomeSetup[]).map(h => (
              <button key={h} onClick={() => setHomeSetup(h)} style={{ padding: '12px', borderRadius: '10px', border: homeSetup === h ? '2px solid #F5E642′ : '2px solid transparent', cursor: ’pointer', backgroundColor: '#1E2D45', textAlign: 'left' }}>
                <div style={{ fontSize: '18px', marginBottom: '4px' }}>{homeSetups[h].emoji}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: homeSetup === h ? '#F5E642′ : '#E8EDF5' }}>{homeSetups[h].label}</div>
              </button>
            ))}
          </div>
        </div>

        {result ? (
          <>
            <div style={{ backgroundColor: '#1E2D45', borderRadius: '12px', padding: '20px', marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>⚡ LOAD MANAGEMENT</div>
              <div style={{ fontSize: '14px', color: '#E8EDF5', lineHeight: 1.6 }}>{result.load}</div>
            </div>
            <div style={{ backgroundColor: '#1E2D45', borderRadius: '12px', padding: '20px', marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>📅 SCHEDULE OPTIMIZATION</div>
              <div style={{ fontSize: '14px', color: '#E8EDF5', lineHeight: 1.6 }}>{result.schedule}</div>
            </div>
            <div style={{ backgroundColor: '#0D2137', border: '1px solid #F5E642', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '13px', color: '#F5E642', fontWeight: 700 }}>💰 {result.savings}</div>
            </div>
          </>
        ) : (
          <div style={{ backgroundColor: '#1E2D45', borderRadius: '12px', padding: '20px', textAlign: 'center', color: '#64748B' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔍</div>
            <div>Select your pool type and home setup to see interaction analysis.</div>
          </div>
        )}
      </div>
    </div>
  );
}
