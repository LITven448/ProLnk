import { useState } from 'react';

const SYSTEM_SIZES = [
  { label: '1.5 Ton (up to 900 sq ft)', low: 4500, high: 7200 },
  { label: '2 Ton (900–1,200 sq ft)', low: 5000, high: 8000 },
  { label: '2.5 Ton (1,200–1,500 sq ft)', low: 5500, high: 8800 },
  { label: '3 Ton (1,500–1,900 sq ft)', low: 6000, high: 9500 },
  { label: '3.5 Ton (1,900–2,400 sq ft)', low: 6800, high: 10500 },
  { label: '4 Ton (2,400–3,000 sq ft)', low: 7500, high: 12000 },
];

export default function DFWHVACMcKinney() {
  const [sizeIdx, setSizeIdx] = useState(2);
  const [isEmergency, setIsEmergency] = useState(false);

  const sys = SYSTEM_SIZES[sizeIdx];
  const emergencyAdder = isEmergency ? 300 : 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112244 100%)', padding: '60px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>❄️</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '16px 0 12px', lineHeight: 1.2 }}>
          McKinney TX HVAC
        </h1>
        <p style={{ fontSize: 20, color: '#F5E642', fontWeight: 700, margin: '0 0 16px' }}>
          Beat the DFW Heat · Fast Installs · Trusted Local Techs
        </p>
        <p style={{ fontSize: 16, color: '#aac', maxWidth: 620, margin: '0 auto 32px' }}>
          McKinney is one of the fastest-growing suburbs in America — with tens of thousands of homes built
          between 2000 and 2020. HVAC systems in those homes are reaching end-of-life exactly when you
          need them most: during a 100°F DFW summer. ProLnk finds you vetted McKinney HVAC pros before the heat hits.
        </p>
        <a
          href="/signup"
          style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, padding: '16px 40px', borderRadius: 8, fontSize: 18, textDecoration: 'none', display: 'inline-block' }}
        >
          Join the McKinney Waitlist — Free
        </a>
      </div>

      {/* City Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, padding: '40px 24px', maxWidth: 900, margin: '0 auto' }}>
        {[
          { icon: '🏙️', label: 'Population', value: '220,000+ residents' },
          { icon: '☀️', label: 'Days Above 90°F', value: '90+ days/year avg' },
          { icon: '🏠', label: 'Homes Built 2000–2020', value: '~60% of housing stock' },
          { icon: '💸', label: 'HVAC Replacement', value: '$4,500 – $12,000′ },
        ].map(s => (
          <div key={s.label} style={{ background: '#112244', borderRadius: 10, padding: '20px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>{s.icon}</div>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, margin: '8px 0 4px', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Cost Calculator */}
      <div style={{ background: '#112244', borderRadius: 14, padding: '32px', maxWidth: 700, margin: '0 auto 40px', width: 'calc(100% - 48px)' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', margin: '0 0 24px' }}>
          🌡️ McKinney HVAC Replacement Estimator
        </h2>

        <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>Home Size / System Tonnage</label>
        <select
          value={sizeIdx}
          onChange={e => setSizeIdx(Number(e.target.value))}
          style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334', fontSize: 15, marginBottom: 20 }}
        >
          {SYSTEM_SIZES.map((s, i) => <option key={i} value={i}>{s.label}</option>)}
        </select>

        <label style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 700, marginBottom: 24, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={isEmergency}
            onChange={e => setIsEmergency(e.target.checked)}
            style={{ width: 18, height: 18, accentColor: '#F5E642′ }}
          />
          Emergency / Same-Day Service (+$300 typical upcharge)
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { label: 'Estimated Low', value: `$${(sys.low + emergencyAdder).toLocaleString()}` },
            { label: 'Estimated High', value: `$${(sys.high + emergencyAdder).toLocaleString()}` },
          ].map(s => (
            <div key={s.label} style={{ background: '#0A1628', borderRadius: 8, padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#aac', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontWeight: 800, color: '#F5E642', fontSize: 22 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 13, color: '#889', marginTop: 16 }}>
          * Carrier and Trane are the most common brands in McKinney. Pricing includes equipment + labor.
          Always get 3 quotes — ProLnk makes that easy.
        </p>
      </div>

      {/* McKinney HVAC Context */}
      <div style={{ padding: '0 24px 48px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: 'center', marginBottom: 24 }}>
          Why McKinney Homeowners Need ProLnk
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {[
            { icon: '🏗️', title: 'Aging 2000s Systems', desc: 'Homes built in McKinney\’s boom years (2002–2015) have HVAC units hitting 15–20 year marks. That\’s end-of-life in DFW climate conditions.' },
            { icon: '🌪️', title: 'Summer Emergency Demand', desc: 'When temps hit 105°F, every HVAC company in DFW is booked 2 weeks out. ProLnk\’s network gets you to the front of the line.' },
            { icon: '⚡', title: 'Variable Refrigerant Tech', desc: 'Modern Carrier and Trane VRF systems can cut energy bills 30–40% vs. older R-22 units. McKinney pros on ProLnk are certified on both.' },
            { icon: '🔍', title: 'Duct Inspection First', desc: 'Many McKinney homes have undersized or leaky ductwork from original construction — fixing ducts before replacing units saves thousands.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#112244', borderRadius: 10, padding: '20px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: '#F5E642′ }}>{c.title}</div>
              <div style={{ fontSize: 14, color: '#aac', lineHeight: 1.6 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: '#F5E642', padding: '48px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', margin: '0 0 12px' }}>
          Don't Wait Until Your AC Dies in August
        </h2>
        <p style={{ color: '#0A1628', fontSize: 16, maxWidth: 500, margin: '0 auto 28px' }}>
          Get ahead of DFW summer with ProLnk. Join the McKinney waitlist and be first to access vetted HVAC pros with transparent flat-rate pricing.
        </p>
        <a
          href="/signup"
          style={{ background: '#0A1628', color: '#F5E642', fontWeight: 800, padding: '16px 40px', borderRadius: 8, fontSize: 18, textDecoration: 'none', display: 'inline-block' }}
        >
          Join the Waitlist
        </a>
      </div>

      <div style={{ background: '#071020', padding: '20px', textAlign: 'center', fontSize: 13, color: '#556′ }}>
        © 2026 ProLnk · Serving McKinney, TX and all of DFW · <a href="/privacy" style={{ color: '#556′ }}>Privacy</a>
      </div>
    </div>
  );
}
