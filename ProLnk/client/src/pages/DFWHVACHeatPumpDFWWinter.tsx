import { useState } from 'react';

const winterTemps = [
  { id: 't35', label: '35°F (Typical DFW Winter Day)' },
  { id: 't25', label: '25°F (DFW Cold Snap)' },
  { id: 't15', label: '15°F (Rare DFW Freeze — Feb 2021 style)' },
  { id: 't10', label: '10°F (Extreme DFW Event)' },
];

const pumpTypes = [
  { id: 'standard', label: 'Standard Heat Pump' },
  { id: 'cold', label: 'Cold-Climate Heat Pump (Hyper Heat)' },
  { id: 'dual', label: 'Dual-Fuel (+ Gas Backup)' },
];

type TempKey = 't35′ | ’t25′ | ’t15′ | ’t10';
type PumpKey = 'standard' | 'cold' | 'dual';

const results: Record<TempKey, Record<PumpKey, { cop: string; auxActivation: string; costVsGas: string; note: string }>> = {
  t35: {
    standard: { cop: '3.2', auxActivation: 'None needed', costVsGas: '55% cheaper than gas', note: 'DFW winter days like this are ideal heat pump territory — runs pure HP mode all day.' },
    cold: { cop: '3.8', auxActivation: 'None needed', costVsGas: '60% cheaper than gas', note: 'Cold-climate units excel here — DFW rarely challenges their 35°F capacity.' },
    dual: { cop: '3.2', auxActivation: 'None needed', costVsGas: '55% cheaper than gas', note: 'Gas backup idle at 35°F — full heat pump efficiency achieved.' },
  },
  t25: {
    standard: { cop: '2.1', auxActivation: 'Light strip heat assist', costVsGas: '30% cheaper than gas', note: 'Standard HPs lose efficiency fast below 30°F. Aux heat kicks in, raising operating cost.' },
    cold: { cop: '3.0', auxActivation: 'Minimal to none', costVsGas: '50% cheaper than gas', note: 'Cold-climate HPs maintain strong output to 5°F — DFW cold snaps handled without aux heat.' },
    dual: { cop: '2.4', auxActivation: 'Gas backup at ~28°F crossover', costVsGas: '20% cheaper than gas', note: 'Gas takes over near 28°F crossover. Total system stays efficient and comfortable.' },
  },
  t15: {
    standard: { cop: '1.3', auxActivation: 'Heavy strip heat', costVsGas: '10% more than gas', note: 'Standard HP barely functions at 15°F. High aux heat usage — gas would be cheaper for DFW freezes.' },
    cold: { cop: '2.2', auxActivation: 'Minimal', costVsGas: '35% cheaper than gas', note: 'Cold-climate HPs designed for this — proven in 2021 DFW freeze with proper installation.' },
    dual: { cop: '2.8', auxActivation: 'Gas fully active', costVsGas: 'Gas mode — same cost', note: 'Dual-fuel smart: HP for mild days, gas takes over at 15°F freeze events. Best DFW freeze resilience.' },
  },
  t10: {
    standard: { cop: '1.0', auxActivation: 'Full strip heat', costVsGas: '25% more than gas', note: 'Standard HP is a space heater at 10°F. Gas or dual-fuel is far superior for DFW freeze events.' },
    cold: { cop: '1.8', auxActivation: 'Light assist', costVsGas: '20% cheaper than gas', note: 'Cold-climate HP still producing useful heat at 10°F — far better than standard HP in DFW extremes.' },
    dual: { cop: '3.0+', auxActivation: 'Gas fully active', costVsGas: 'Gas mode — same cost', note: 'Dual-fuel in full gas mode. Crossover to gas was the right call — critical for Feb 2021-type DFW events.' },
  },
};

export default function DFWHVACHeatPumpDFWWinter() {
  const [temp, setTemp] = useState<TempKey | null>(null);
  const [pump, setPump] = useState<PumpKey | null>(null);
  const result = temp && pump ? results[temp]?.[pump] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>❄️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>Heat Pumps in DFW Winters</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Why mild DFW winters make heat pumps ideal — and how to handle rare freeze events like February 2021</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 24 }}>
          {[{ label: '🌡️ DFW Winter Avg Low', value: '35–45°F', sub: 'Nov–Feb typical' }, { label: '❄️ Rare DFW Freeze', value: 'Below 20°F', sub: '<10 days/year avg' }, { label: '💚 Efficient Down To', value: '25°F (std) / 5°F (cold-climate)', sub: 'Before COP drops below 2.0′ }].map(s => (
            <div key={s.label} style={{ background: '#111f3a', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{s.label}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#F5E642', margin: '6px 0 2px' }}>{s.value}</div>
              <div style={{ color: '#475569', fontSize: 11 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 18 }}>🌡️ DFW Winter Temp + Heat Pump Type → Heating Efficiency</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>DFW Winter Temperature:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {winterTemps.map(t => (
                <button key={t.id} onClick={() => setTemp(t.id as TempKey)} style={{ background: temp === t.id ? '#F5E642′ : '#1e3a5f', color: temp === t.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '9px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>{t.label}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Heat Pump Type:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {pumpTypes.map(p => (
                <button key={p.id} onClick={() => setPump(p.id as PumpKey)} style={{ background: pump === p.id ? '#F5E642′ : '#1e3a5f', color: pump === p.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '9px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>{p.label}</button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 14 }}>
                {[{ label: 'COP (Efficiency)', value: result.cop }, { label: 'Aux Heat', value: result.auxActivation }, { label: 'Cost vs Gas', value: result.costVsGas }].map(m => (
                  <div key={m.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#F5E642′ }}>{m.value}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{m.label}</div>
                  </div>
                ))}
              </div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: 14, lineHeight: 1.6 }}>{result.note}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 10 }}>🔑 DFW Winter Verdict</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: 14 }}>DFW averages just 8–12 nights below 25°F annually. A cold-climate heat pump handles 95% of DFW winters at COP 3.0+ (3× more efficient than gas). For freeze resilience, dual-fuel with gas backup at a 28°F crossover is the DFW-optimized solution — full efficiency most of winter, gas backup only when you truly need it.</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#475569', fontSize: 12 }}>ProLnk — Connect with Verified DFW HVAC Pros</div>
      </div>
    </div>
  );
}
