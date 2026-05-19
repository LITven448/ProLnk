import { useState } from 'react';

export default function DFWNaturalGasGuide() {
  const [householdSize, setHouseholdSize] = useState(3);
  const [hasGasHeat, setHasGasHeat] = useState(true);
  const [hasGasWater, setHasGasWater] = useState(true);
  const [hasGasCook, setHasGasCook] = useState(false);
  const [result, setResult] = useState<null | { monthly: number; annual: number; electricCost: number; roi: number }>(null);

  const s = { background: '#0F1E35', borderRadius: '12px', padding: '20px', marginBottom: '16px' };
  const lbl = { color: '#A0AEC0', fontSize: '13px', marginBottom: '4px' };
  const tg = { display: 'inline-block', background: '#1A2F50', color: '#F5E642', borderRadius: '6px', padding: '3px 10px', fontSize: '12px', marginRight: '6px', marginBottom: '6px' };

  function calculate() {
    let therms = householdSize * 6;
    if (hasGasHeat) therms += 40;
    if (hasGasWater) therms += 20;
    if (hasGasCook) therms += 5;
    const monthly = therms * 1.15;
    const annual = monthly * 12;
    const electricCost = annual * 1.6;
    const roi = 3200 / ((electricCost - annual) / 12);
    setResult({ monthly, annual, electricCost, roi });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '13px', marginBottom: '8px' }}>🔥 DFW ENERGY GUIDES</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>DFW Natural Gas: Atmos Energy Guide</h1>
        <p style={{ color: '#A0AEC0', fontSize: '15px', marginBottom: '28px' }}>Unlike electricity, natural gas in DFW is regulated — Atmos Energy is the only provider. But smart appliance choices still dramatically affect your bills.</p>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>🏢 Atmos Energy: DFW Service Area</h2>
          <p style={{ color: '#CBD5E0', fontSize: '14px', marginBottom: '10px' }}>Atmos Energy serves all of DFW — Dallas, Fort Worth, Plano, Arlington, Irving, Garland, and surrounding cities. Rates are set by the Texas Railroad Commission, not Atmos.</p>
          <div style={tg}>Residential rate: ~$1.15/therm</div>
          <div style={tg}>Monthly base charge: ~$21</div>
          <div style={tg}>No switching options</div>
          <p style={{ color: '#718096', fontSize: '13px', marginTop: '10px' }}>Budget Billing available: Atmos averages your annual usage and bills the same amount each month.</p>
        </div>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>⚖️ Gas vs Electric: DFW Appliance Showdown</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { appliance: '🌡️ HVAC (Heating)', gas: '$45–80/mo winter', electric: '$90–160/mo winter', winner: 'gas' },
              { appliance: '🚿 Water Heater', gas: '$18–28/mo', electric: '$35–55/mo', winner: 'gas' },
              { appliance: '🍳 Cooktop', gas: '$5–10/mo', electric: '$8–15/mo', winner: 'gas' },
              { appliance: '🌀 Dryer', gas: '$8–14/mo', electric: '$15–25/mo', winner: 'gas' },
            ].map(a => (
              <div key={a.appliance} style={{ background: '#1A2F50', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontWeight: 700, marginBottom: '8px', fontSize: '14px' }}>{a.appliance}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: '#FBD38D', fontSize: '12px' }}>⛽ Gas</span>
                  <span style={{ color: '#FBD38D', fontSize: '12px' }}>{a.gas}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#A0AEC0', fontSize: '12px' }}>⚡ Electric</span>
                  <span style={{ color: '#A0AEC0', fontSize: '12px' }}>{a.electric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' }}>🔧 Gas Line Safety: Annual Inspection Checklist</h2>
          {['Have a licensed plumber inspect all gas connections annually', 'Check CSST (corrugated stainless steel tubing) for bonding — required by DFW code', 'Test all shutoff valves: locate them before you need them', 'Carbon monoxide detectors required within 10ft of gas appliances in TX', 'Know your Atmos emergency number: 1-866-322-8667'].map(item => (
            <div key={item} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: '#68D391', marginTop: '1px' }}>✓</span>
              <span style={{ color: '#CBD5E0', fontSize: '14px' }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={s}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '16px' }}>🧮 Monthly Gas Cost + Electric Conversion ROI</h2>
          <div style={{ marginBottom: '14px' }}>
            <div style={lbl}>Household Size</div>
            <input type="number" value={householdSize} min={1} max={8} onChange={e => setHouseholdSize(Number(e.target.value))}
              style={{ width: '100%', background: '#1A2F50', border: '1px solid #2D4A70', borderRadius: '8px', color: '#FFF', padding: '10px', fontSize: '15px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '14px' }}>
            <div style={lbl}>Gas Appliances in Home</div>
            {[
              { label: '🌡️ Gas Heat/Furnace', val: hasGasHeat, set: setHasGasHeat },
              { label: '🚿 Gas Water Heater', val: hasGasWater, set: setHasGasWater },
              { label: '🍳 Gas Cooktop/Range', val: hasGasCook, set: setHasGasCook },
            ].map(opt => (
              <label key={opt.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={opt.val} onChange={e => opt.set(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#F5E642′ }} />
                <span style={{ color: '#CBD5E0', fontSize: '14px' }}>{opt.label}</span>
              </label>
            ))}
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', cursor: 'pointer', width: '100%' }}>
            Estimate Gas Cost + Conversion ROI
          </button>

          {result && (
            <div style={{ marginTop: '20px', background: '#0A1628', borderRadius: '10px', padding: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                {[
                  { label: 'Est. Monthly Gas Bill', val: `$${result.monthly.toFixed(0)}`, color: '#FBD38D' },
                  { label: 'Est. Annual Gas Cost', val: `$${result.annual.toFixed(0)}`, color: '#FBD38D' },
                  { label: 'Same Load — All Electric', val: `$${result.electricCost.toFixed(0)}/yr`, color: '#A0AEC0′ },
                  { label: 'Electric Conversion ROI', val: `${result.roi.toFixed(1)} years`, color: result.roi < 5 ? '#68D391′ : '#FC8181' },
                ].map(r => (
                  <div key={r.label} style={{ background: '#0F1E35', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ color: '#718096', fontSize: '12px', marginBottom: '4px' }}>{r.label}</div>
                    <div style={{ color: r.color, fontWeight: 700, fontSize: '18px' }}>{r.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#1A2F50', borderRadius: '8px', padding: '12px', fontSize: '13px', color: '#A0AEC0′ }}>
                💡 ROI assumes ~$3,200 conversion cost per appliance. Gas is typically 30–60% cheaper for heating in DFW.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
