import { useState } from 'react';

type ElectricalService = '100a' | '150a' | '200a' | '400a';
type EVCharger = 'l1_120v' | 'l2_30a' | 'l2_50a' | 'dcfc';
type ChargingTime = 'peak_3to7′ | ’offpeak_night' | 'morning_early' | 'midday_solar';

const services: Record<ElectricalService, { label: string; capacity: string; warning: string }> = {
  '100a': { label: '100A Service (older home)', capacity: '24 kW total', warning: '⚠️ Severely limited — L2 EV + AC likely exceeds capacity at 3–7 PM' },
  '150a': { label: '150A Service', capacity: '36 kW total', warning: '⚠️ Tight — L2 50A charger + 4-ton AC uses 80%+ of service' },
  '200a': { label: '200A Service (most DFW homes)', capacity: '48 kW total', warning: '✅ Sufficient with scheduling — standard DFW new builds' },
  '400a': { label: '400A Service (large homes)', capacity: '96 kW total', warning: '✅ Comfortable — can charge EV and run AC simultaneously' },
};

const chargers: Record<EVCharger, { label: string; draw: string; addHours: string }> = {
  l1_120v: { label: 'Level 1 (120V outlet)', draw: '1.4 kW', addHours: 'Adds 3–5 miles/hr — use overnight with zero load conflict' },
  l2_30a: { label: 'Level 2 (30A / 7 kW)', draw: '7.2 kW', addHours: 'Adds 20–25 miles/hr — schedule off-peak for best results' },
  l2_50a: { label: 'Level 2 (50A / 11 kW)', draw: '11 kW', addHours: 'Adds 30–40 miles/hr — definitely schedule outside 3–7 PM DFW peak' },
  dcfc: { label: 'DCFC Home Unit (rare)', draw: '19–22 kW', addHours: 'Requires 400A service — not compatible with standard DFW homes' },
};

const timings: Record<ChargingTime, { label: string; oncorCost: string }> = {
  peak_3to7: { label: '⚡ Peak (3–7 PM)', oncorCost: 'Highest rate — avoid if on TOU plan' },
  offpeak_night: { label: '🌙 Off-Peak Night (10 PM–6 AM)', oncorCost: 'Lowest rate on Oncor TOU — ideal EV charging window' },
  morning_early: { label: '🌅 Early Morning (6–9 AM)', oncorCost: 'Low rate + AC not yet at full load — good window' },
  midday_solar: { label: '☀️ Midday Solar (10 AM–2 PM)', oncorCost: 'Best if you have rooftop solar — often net-zero charging cost' },
};

const recommendations: Partial<Record<`${ElectricalService}_${EVCharger}_${ChargingTime}`, { verdict: string; tip: string; savings: string }>> = {
  '200a_l2_50a_peak_3to7': {
    verdict: '🔴 High Risk — 200A service with L2 50A + 4-ton AC at DFW peak = 15+ kW, over 90% panel load. Breaker trip likely.',
    tip: 'Never charge at peak on 200A with 50A EVSE. Use smart charger with schedule lock — set to start at 10 PM.',
    savings: 'Shifting to off-peak saves $22–$38/month on Oncor TOU rate',
  },
  '200a_l2_50a_offpeak_night': {
    verdict: '✅ Optimal — off-peak charging avoids load conflict entirely. AC off or minimal, full charger speed.',
    tip: 'Set Tesla/Rivian/GM app charge schedule to 10 PM. Pair with Oncor TOU rate for maximum savings.',
    savings: 'Off-peak L2 charging saves $30–$55/month vs. peak charging',
  },
  '200a_l2_30a_peak_3to7': {
    verdict: '🟡 Caution — L2 30A + AC at peak is manageable on 200A but leaves little headroom for other loads.',
    tip: 'Use smart charger to throttle to 16A (3.8 kW) during 3–7 PM. Reduces conflict by 47%.',
    savings: 'Throttled charging at peak saves $10–$18/month vs. full speed',
  },
  '100a_l2_30a_peak_3to7': {
    verdict: '🔴 Critical Risk — 100A service cannot handle L2 charging and AC simultaneously during DFW peak.',
    tip: 'Upgrade to 200A service ($3,000–$5,000) or charge ONLY on L1 overnight. No exceptions.',
    savings: '200A upgrade pays back in 4–6 years via avoided overload damage',
  },
  '200a_l1_120v_peak_3to7': {
    verdict: '✅ Safe — L1 draws only 1.4 kW. No meaningful load impact during AC peak.',
    tip: 'L1 is slow but completely safe anytime. Use it during day; leave L2 for overnight sessions.',
    savings: 'No additional cost, no scheduling needed with L1',
  },
  '400a_l2_50a_peak_3to7': {
    verdict: '✅ Safe — 400A service handles full L2 charging + 5-ton AC with headroom to spare.',
    tip: 'Still worth scheduling off-peak on Oncor TOU to save $30–$55/month even with ample capacity.',
    savings: 'Savings from TOU scheduling apply regardless of service size',
  },
};

export default function DFWHVACElectricVehicleInteraction() {
  const [service, setService] = useState<ElectricalService>('200a');
  const [charger, setCharger] = useState<EVCharger>('l2_50a');
  const [timing, setTiming] = useState<ChargingTime>('peak_3to7');

  const key = `${service}_${charger}_${timing}` as keyof typeof recommendations;
  const result = recommendations[key];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', letterSpacing: '0.08em', textTransform: 'uppercase' }}>🚗 DFW HVAC Guide</div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>HVAC + EV Charging Interaction</h1>
        <p style={{ color: '#94A3B8', marginBottom: '24px', fontSize: '15px' }}>EV charging during DFW peak hours (3–7 PM) while AC runs can stress your panel and spike costs.</p>

        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>HOME ELECTRICAL SERVICE</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {(Object.keys(services) as ElectricalService[]).map(s => (
              <button key={s} onClick={() => setService(s)} style={{ padding: '10px', borderRadius: '10px', border: service === s ? '2px solid #F5E642′ : '2px solid transparent', cursor: ’pointer', backgroundColor: '#1E2D45', textAlign: 'left' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: service === s ? '#F5E642′ : '#E8EDF5', marginBottom: '2px' }}>{services[s].label}</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>{services[s].capacity}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0D2137', borderRadius: '8px', padding: '10px 14px', marginBottom: '14px', fontSize: '12px', color: '#94A3B8′ }}>{services[service].warning}</div>

        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>EV CHARGER TYPE</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {(Object.keys(chargers) as EVCharger[]).map(c => (
              <button key={c} onClick={() => setCharger(c)} style={{ padding: '10px', borderRadius: '10px', border: charger === c ? '2px solid #F5E642′ : '2px solid transparent', cursor: ’pointer', backgroundColor: '#1E2D45', textAlign: 'left' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: charger === c ? '#F5E642′ : '#E8EDF5', marginBottom: '2px' }}>{chargers[c].label}</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>{chargers[c].draw} draw</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>CHARGING TIME</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {(Object.keys(timings) as ChargingTime[]).map(t => (
              <button key={t} onClick={() => setTiming(t)} style={{ padding: '8px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '12px', backgroundColor: timing === t ? '#F5E642′ : '#1E2D45', color: timing === t ? '#0A1628' : '#E8EDF5' }}>{timings[t].label}</button>
            ))}
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '6px' }}>{timings[timing].oncorCost}</div>
        </div>

        {result ? (
          <>
            <div style={{ backgroundColor: '#1E2D45', borderRadius: '12px', padding: '20px', marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>⚡ LOAD VERDICT</div>
              <div style={{ fontSize: '14px', color: '#E8EDF5', lineHeight: 1.6 }}>{result.verdict}</div>
            </div>
            <div style={{ backgroundColor: '#1E2D45', borderRadius: '12px', padding: '20px', marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>💡 ACTION</div>
              <div style={{ fontSize: '14px', color: '#E8EDF5', lineHeight: 1.6 }}>{result.tip}</div>
            </div>
            <div style={{ backgroundColor: '#0D2137', border: '1px solid #F5E642', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '13px', color: '#F5E642', fontWeight: 700 }}>💰 {result.savings}</div>
            </div>
          </>
        ) : (
          <div style={{ backgroundColor: '#1E2D45', borderRadius: '12px', padding: '20px', textAlign: 'center', color: '#64748B' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔍</div>
            <div style={{ fontSize: '14px' }}>Select your service, charger, and timing for a load analysis.</div>
          </div>
        )}
      </div>
    </div>
  );
}
