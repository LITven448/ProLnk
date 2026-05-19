import { useState } from 'react';

type Budget = 'under150' | '150to400' | '400plus';

const tiers: Record<Budget, { label: string; items: { rank: number; device: string; why: string; dfwRoi: string; product: string; price: string; setup: string[] }[] }> = {
  under150: {
    label: 'Under $150 — Start Here',
    items: [
      { rank: 1, device: '🌡️ Smart Thermostat', why: 'Single biggest ROI in DFW. HVAC runs 8–9 months/yr. Smart scheduling cuts bills 15–23%.', dfwRoi: 'Average DFW savings: $35–$55/month. Payback in 3–4 months.', product: 'Ecobee SmartThermostat Essential ($89)', price: '$89', setup: ['Turn off breaker to HVAC', 'Remove old thermostat, photograph wiring', 'Install Ecobee base plate', 'Reconnect wires per color guide', 'Restore power, complete app setup (15 min)'] },
      { rank: 2, device: '💧 Leak Sensor', why: 'DFW slab foundations shift constantly. Hidden pipe leaks are #1 home emergency here.', dfwRoi: 'Avg DFW water damage claim: $11,000. Sensor costs $35. 300x ROI on one catch.', product: 'Govee Water Sensor ($35/2-pack)', price: '$35', setup: ['Place under kitchen sink, water heater, dishwasher', 'Place near AC drain pan (critical in DFW summers)', 'Install app and set phone alert', 'Test with damp cloth'] },
    ],
  },
  '150to400': {
    label: '$150–$400 — Smart Foundation',
    items: [
      { rank: 1, device: '🌡️ Smart Thermostat', why: 'Still #1 — DFW HVAC is your biggest controllable expense.', dfwRoi: 'Average DFW savings: $35–$55/month. Payback in 3–4 months.', product: 'Ecobee SmartThermostat Premium ($169)', price: '$169', setup: ['Turn off HVAC breaker', 'Remove old thermostat, photo wires', 'Install Ecobee, reconnect wires', 'Complete app setup, enable SmartRecovery for DFW heat spikes'] },
      { rank: 2, device: '🔔 Smart Video Doorbell', why: 'DFW porch piracy is high — 1,200+ package thefts reported monthly in DFW metro.', dfwRoi: 'One prevented theft pays for device. Insurance discount possible (ask your provider).', product: 'Ring Battery Video Doorbell Pro ($130)', price: '$130', setup: ['Charge battery fully (5 hrs)', 'Remove old doorbell', 'Mount Ring bracket', 'Connect wires if doorbell transformer present', 'Complete Ring app setup, set motion zones'] },
      { rank: 3, device: '💧 Leak Sensor', why: 'DFW slab leaks — non-negotiable detection upgrade.', dfwRoi: 'Same as above: $35 prevents $11K+ claim.', product: 'Govee Water Sensor 2-pack ($35)', price: '$35', setup: ['Under sinks, water heater, dishwasher, AC drain pan'] },
    ],
  },
  '400plus': {
    label: '$400+ — Full Smart Start',
    items: [
      { rank: 1, device: '🌡️ Smart Thermostat (Pro)', why: '#1 priority. With $400+ budget, go for multi-zone or premium.', dfwRoi: 'Ecobee with SmartSensor in bedrooms: additional 8% savings vs base thermostat.', product: 'Ecobee SmartThermostat Premium + 2 SmartSensors ($220)', price: '$220', setup: ['Install thermostat + place SmartSensors in master bedroom and living room', 'Enable Follow Me feature for DFW day/night temp swings'] },
      { rank: 2, device: '🔔 Smart Video Doorbell + Lock', why: 'Doorbell + smart lock is the DFW standard combo — controls package delivery access.', dfwRoi: 'Smart lock enables Amazon Key, UPS Access Point delivery — zero theft risk.', product: 'Ring Video Doorbell Pro 2 + Schlage Encode ($280)', price: '$280', setup: ['Install Ring (wired preferred for DFW heat — battery degrades faster in 110°F)', 'Install Schlage Encode, set auto-lock (30 min)', 'Link both to Alexa for voice control'] },
      { rank: 3, device: '💧 Full Leak Detection', why: 'With $400+ budget, add a flow meter — detects slab leaks before they surface.', dfwRoi: 'Flo by Moen catches 96% of leaks before visible water damage. Critical for DFW slabs.', product: 'Flo by Moen Smart Water Monitor ($150)', price: '$150', setup: ['Hire licensed DFW plumber to install on main water line (2 hrs)', 'Complete Flo app setup, set DFW "away" mode when traveling'] },
    ],
  },
};

export default function DFWSmartHomeStarters() {
  const [budget, setBudget] = useState<Budget | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const tier = budget ? tiers[budget] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW SMART HOME 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Smart Home Starter Guide for DFW Homeowners</h1>
        <p style={{ color: '#9BA3B8', marginBottom: 24, lineHeight: 1.6 }}>
          Don't know where to start? Here are the 3 things that matter most in DFW — ranked by local ROI. Skip the gimmicks.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🏠 WHY DFW IS DIFFERENT</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {['🌡️ HVAC runs 8–9 months/yr — smart thermostat ROI is massive here', '💧 Slab foundations shift constantly — leaks are your #1 risk', '📦 DFW porch piracy is among highest in US — doorbell cameras are essential'].map(i => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 10, fontSize: 13, color: '#C8D0E0' }}>{i}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>⚡ SELECT YOUR STARTING BUDGET</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[['under150', '💰 Under $150', 'Starter'], ['150to400', '💎 $150–$400', 'Foundation'], ['400plus', '👑 $400+', 'Full Start']] .map(([k, label, sub]) => (
              <button key={k} onClick={() => { setBudget(k as Budget); setExpanded(null); }} style={{ background: budget === k ? '#F5E642' : '#111E35', color: budget === k ? '#0A1628' : '#E8EAF0', border: '1px solid ' + (budget === k ? '#F5E642' : '#1E2D45'), borderRadius: 8, padding: '12px 10px', cursor: 'pointer', fontWeight: 700, fontSize: 12, textAlign: 'center' }}>{label}<br /><span style={{ fontWeight: 400, fontSize: 11 }}>{sub}</span></button>
            ))}
          </div>
        </div>

        {tier && (
          <div>
            <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, marginBottom: 16 }}>✅ {tier.label}</div>
            <div style={{ display: 'grid', gap: 12 }}>
              {tier.items.map((item) => (
                <div key={item.rank} style={{ background: '#111E35', borderRadius: 12, padding: 20, border: '1px solid #1E2D45' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ fontSize: 16, fontWeight: 800 }}>#{item.rank} {item.device}</div>
                    <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{item.price}</div>
                  </div>
                  <div style={{ color: '#C8D0E0', fontSize: 13, marginBottom: 8, lineHeight: 1.6 }}>{item.why}</div>
                  <div style={{ color: '#9BA3B8', fontSize: 12, marginBottom: 12 }}>💰 ROI: {item.dfwRoi}</div>
                  <div style={{ fontSize: 12, color: '#6B7894', marginBottom: 8 }}>📦 {item.product}</div>
                  <button onClick={() => setExpanded(expanded === item.rank ? null : item.rank)} style={{ background: 'transparent', border: '1px solid #F5E642', color: '#F5E642', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                    {expanded === item.rank ? '▲ Hide Setup Steps' : '▼ Show Setup Steps'}
                  </button>
                  {expanded === item.rank && (
                    <div style={{ marginTop: 12, background: '#0A1628', borderRadius: 8, padding: 12 }}>
                      {item.setup.map((step, i) => <div key={i} style={{ fontSize: 12, color: '#C8D0E0', padding: '4px 0', borderBottom: i < item.setup.length - 1 ? '1px solid #1E2D45' : 'none' }}>{i + 1}. {step}</div>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
