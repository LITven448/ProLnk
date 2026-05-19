import { useState } from 'react';

const plans: Record<string, Record<string, { items: string[]; cost: string }>> = {
  mild: {
    old: { items: ['Upgrade to MERV 11 filter', 'Change filters every 60 days', 'Add standalone HEPA air purifier for bedroom', 'Check HVAC for leaky ducts'], cost: '$150–$400' },
    mid: { items: ['MERV 11 filter upgrade', 'Schedule HVAC cleaning', 'Add air purifier with HEPA + activated carbon', 'Check humidity levels (target 40–50% in summer)'], cost: '$200–$500' },
    new: { items: ['MERV 11 or 13 filter', 'Annual HVAC maintenance', 'Consider whole-home air purifier installed on HVAC'], cost: '$100–$350' },
  },
  moderate: {
    old: { items: ['MERV 13 filter (verify HVAC can handle static pressure)', 'Whole-home humidifier/dehumidifier', 'Duct cleaning ($300–$600)', 'Carbon monoxide detectors on every level', 'Radon test kit ($15–$30)'], cost: '$600–$1,500' },
    mid: { items: ['MERV 13 filter', 'UV air scrubber installed on HVAC', 'Whole-home dehumidifier for summer', 'CO detector + radon test'], cost: '$800–$1,800' },
    new: { items: ['MERV 13 filter', 'ERV/HRV ventilation system', 'Smart thermostat with air quality monitoring', 'CO + radon testing'], cost: '$500–$1,200' },
  },
  severe: {
    old: { items: ['Full HVAC inspection + duct sealing', 'HEPA filtration system (whole-home)', 'Whole-home dehumidifier + humidifier combo', 'UV-C germicidal light in air handler', 'Professional radon mitigation if elevated', 'Allergy-proof encasements on mattress/pillows'], cost: '$2,000–$5,000' },
    mid: { items: ['Whole-home HEPA + UV system', 'Duct sealing and insulation', 'ERV ventilation', 'Radon test + mitigation if needed', 'Humidity control system'], cost: '$1,500–$4,000' },
    new: { items: ['Whole-home air purification system', 'ERV ventilation', 'Smart IAQ monitoring (Airthings or Foobot)', 'MERV 13+ filtration', 'Radon test'], cost: '$1,000–$2,500' },
  },
};

export default function DFWIndoorAirQualityGuide() {
  const [allergySeverity, setAllergySeverity] = useState('moderate');
  const [homeAge, setHomeAge] = useState('mid');
  const [showPlan, setShowPlan] = useState(false);

  const plan = plans[allergySeverity]?.[homeAge] || { items: [], cost: 'N/A' };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🌬️</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Indoor Air Quality Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6 }}>
            DFW is one of the <strong style={{ color: '#F5E642' }}>worst metro areas in the US for allergies</strong>. Cedar fever (mountain cedar) peaks December–February, elm hits February–April, oak April–May. Combined with DFW's extreme humidity swings — <strong style={{ color: '#F5E642' }}>20% in winter to 80%+ in summer</strong> — indoor air quality management is critical.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>🌿 DFW Allergy Calendar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
            {[
              { months: 'Dec–Feb', trigger: '🌲 Mountain Cedar', level: 'EXTREME', color: '#ef4444' },
              { months: 'Feb–Apr', trigger: '🌳 Elm + Ash', level: 'HIGH', color: '#f59e0b' },
              { months: 'Apr–May', trigger: '🍂 Oak + Pecan', level: 'HIGH', color: '#f59e0b' },
              { months: 'May–Sep', trigger: '🌾 Grasses', level: 'MODERATE', color: '#22c55e' },
              { months: 'Sep–Nov', trigger: '🌱 Ragweed + Mold', level: 'HIGH', color: '#f59e0b' },
            ].map(item => (
              <div key={item.months} style={{ backgroundColor: '#1a2d4a', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{item.trigger.split(' ')[0]}</div>
                <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>{item.months}</div>
                <div style={{ color: '#e2e8f0', fontSize: 12, marginBottom: 4 }}>{item.trigger.split(' ').slice(1).join(' ')}</div>
                <div style={{ color: item.color, fontSize: 11, fontWeight: 700 }}>{item.level}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>🔧 HVAC Filter Ratings Explained</h2>
          {[
            { merv: 'MERV 8', desc: 'Builder-grade filter. Catches dust, pollen, mold spores. Minimum acceptable for DFW allergy season. Change every 30 days during peak allergy months.', cost: '$5–$15' },
            { merv: 'MERV 11', desc: 'Good upgrade. Catches fine dust, pet dander, auto emissions. Recommended for most DFW homeowners. Better balance of filtration vs. airflow restriction.', cost: '$15–$30' },
            { merv: 'MERV 13', desc: 'Hospital-grade filtration. Catches bacteria, smoke particles, virus carriers. Verify your HVAC can handle the pressure drop — older systems may struggle. Best for severe allergy sufferers.', cost: '$25–$50' },
          ].map(f => (
            <div key={f.merv} style={{ backgroundColor: '#1a2d4a', borderRadius: 8, padding: 16, marginBottom: 10, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ minWidth: 90 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 18 }}>{f.merv}</div>
                <div style={{ color: '#22c55e', fontSize: 12 }}>{f.cost}</div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 14, flex: 1 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>💨 Humidity Control in DFW</h2>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 220px', backgroundColor: '#1a2d4a', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>❄️</div>
              <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: 6 }}>Winter: Too Dry (20–35%)</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Nose bleeds, cracked skin, static electricity. Solution: whole-home humidifier installed on HVAC ($400–$900). Target 35–45% RH.</div>
            </div>
            <div style={{ flex: '1 1 220px', backgroundColor: '#1a2d4a', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>☀️</div>
              <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: 6 }}>Summer: Too Humid (70–85%)</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Mold growth risk, musty odors, dust mites thrive. Solution: whole-home dehumidifier ($1,200–$2,500) or standalone units for problem rooms.</div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>⚠️ CO & Radon Basics</h2>
          <div style={{ backgroundColor: '#1a2d4a', borderRadius: 8, padding: 16 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: '#e2e8f0' }}>Carbon Monoxide</strong>: Install detectors near sleeping areas. All gas appliances (furnace, water heater, stove) produce CO risk. $20–$40 per detector. Test annually. <br /><br />
              <strong style={{ color: '#e2e8f0' }}>Radon</strong>: DFW has lower radon risk than northern states, but testing is still recommended ($15–$30 DIY kit). Action level: 4 pCi/L. Mitigation if needed: $800–$2,500.
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>🎯 Your Air Quality Improvement Plan</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>Allergy Severity</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['mild', 'Mild'], ['moderate', 'Moderate'], ['severe', 'Severe']].map(([v, l]) => (
                <button key={v} onClick={() => setAllergySeverity(v)}
                  style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: '2px solid', borderColor: allergySeverity === v ? '#F5E642' : '#1a2d4a', backgroundColor: allergySeverity === v ? '#F5E642' : '#1a2d4a', color: allergySeverity === v ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: 'pointer' }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>Home Age</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['old', 'Before 1990'], ['mid', '1990–2010'], ['new', 'After 2010']].map(([v, l]) => (
                <button key={v} onClick={() => setHomeAge(v)}
                  style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: '2px solid', borderColor: homeAge === v ? '#F5E642' : '#1a2d4a', backgroundColor: homeAge === v ? '#F5E642' : '#1a2d4a', color: homeAge === v ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: 'pointer' }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowPlan(true)}
            style={{ width: '100%', backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get My Air Quality Plan →
          </button>

          {showPlan && (
            <div style={{ marginTop: 20, backgroundColor: '#1a2d4a', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>Estimated Investment: {plan.cost}</div>
              {plan.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid #0f2040' }}>
                  <span style={{ color: '#22c55e', fontWeight: 700 }}>✓</span>
                  <span style={{ color: '#cbd5e1', fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 22, marginBottom: 6 }}>🏠</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>Get matched with DFW HVAC and air quality pros through ProLnk — free quotes from vetted contractors.</p>
        </div>

      </div>
    </div>
  );
}
