import { useState } from 'react';

export default function ProLnkPricingTransparency() {
  const [service, setService] = useState('');

  const services = [
    { id: 'hvac_tune', label: '❄️ HVAC Tune-Up' },
    { id: 'hvac_replace', label: '🌡️ HVAC Unit Replace' },
    { id: 'plumb_leak', label: '🚿 Leak Repair' },
    { id: 'plumb_water', label: '🏗️ Water Heater' },
    { id: 'elec_panel', label: '⚡ Panel Upgrade' },
    { id: 'elec_outlet', label: '🔌 Outlet Install' },
    { id: 'roof_inspect', label: '🏠 Roof Inspection' },
    { id: 'pest_quarterly', label: '🐜 Pest Quarterly' },
  ];

  const priceData: Record<string, { low: string; high: string; typical: string; verify: string }> = {
    hvac_tune: { low: '$89', high: '$149', typical: '$119', verify: 'ProLnk checks against ACCA DFW seasonal rate schedule. Includes filter check, coil cleaning, refrigerant level check.' },
    hvac_replace: { low: '$4,200', high: '$9,800', typical: '$6,500', verify: 'Charter pros submit equipment quotes pre-install. Brand, SEER rating, and labor all disclosed before work starts.' },
    plumb_leak: { low: '$150', high: '$450', typical: '$280', verify: 'Pro must diagnose and quote before opening walls or floors. No surprise charges for access.' },
    plumb_water: { low: '$800', high: '$2,200', typical: '$1,400', verify: 'Tank vs tankless pricing differs significantly. Pro specifies unit model and labor separately in the quote.' },
    elec_panel: { low: '$1,800', high: '$4,500', typical: '$2,800', verify: 'Charter electricians disclose permit fees upfront. ProLnk requires itemized quote before any work.' },
    elec_outlet: { low: '$75', high: '$225', typical: '$140', verify: 'Per-outlet pricing. Runs longer than 20ft may add to cost — pro quotes per linear foot.' },
    roof_inspect: { low: '$150', high: '$350', typical: '$225', verify: 'Inspection is separate from repair. ProLnk prohibits bundling inspection fees into repair quotes.' },
    pest_quarterly: { low: '$85', high: '$175', typical: '$120', verify: 'DFW quarterly treatment rates are benchmarked quarterly. Charter pest pros agree to rate caps.' },
  };

  const selected = service ? priceData[service] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>💰</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>Pricing Transparency Guide</h1>
          <p style={{ color: '#94a3b8′ }}>Fair DFW market rates — no price gouging, no hidden fees</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 40 }}>
          {[
            { icon: '📋', label: 'Quote Before Work' },
            { icon: '🚫', label: 'No Hidden Fees' },
            { icon: '📊', label: 'Rate Benchmarked' },
          ].map(item => (
            <div key={item.label} style={{ background: '#1e3a5f', borderRadius: 12, padding: '18px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <p style={{ color: '#94a3b8', marginBottom: 16, fontWeight: 600 }}>Select a service to see typical DFW price ranges:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32 }}>
          {services.map(s => (
            <button key={s.id} onClick={() => setService(s.id)}
              style={{ background: service === s.id ? '#F5E642′ : '#1e3a5f', border: '2px solid #F5E642', borderRadius: 10, padding: '14px 16px', color: service === s.id ? '#0A1628' : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
              {s.label}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#1e3a5f', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20, textAlign: 'center' }}>
              {[{ label: 'Low End', val: selected.low }, { label: 'Typical', val: selected.typical }, { label: 'High End', val: selected.high }].map(item => (
                <div key={item.label}>
                  <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>{item.val}</div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #334', paddingTop: 16 }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>🔍 How ProLnk Verifies This</div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.6, margin: 0, fontSize: 14 }}>{selected.verify}</p>
            </div>
          </div>
        )}

        <p style={{ textAlign: 'center', marginTop: 32, color: '#475569', fontSize: 12 }}>Rates updated quarterly. Charter pros agree to DFW standard ranges at sign-up.</p>
      </div>
    </div>
  );
}

