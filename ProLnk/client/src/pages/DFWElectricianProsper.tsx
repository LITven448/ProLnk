import { useState } from 'react';

const SERVICES = [
  { label: 'EV Charger Installation (Level 2)', low: 800, high: 1800 },
  { label: 'Panel Upgrade (200A to 400A)', low: 2500, high: 5500 },
  { label: 'Smart Home Wiring Package', low: 1500, high: 4000 },
  { label: 'Whole-Home Generator Hookup', low: 2000, high: 5000 },
  { label: 'Outdoor Lighting Circuit', low: 400, high: 1200 },
  { label: 'New Construction Rough-In (per room)', low: 350, high: 700 },
];

const CHECKLIST = [
  { id: 'ev', label: 'EV charger / garage 240V outlet needed' },
  { id: 'panel', label: 'Panel feels warm or breakers trip often' },
  { id: 'smart', label: 'Want smart switches, dimming, or Lutron' },
  { id: 'gen', label: 'Whole-home or partial generator transfer switch' },
  { id: 'outdoor', label: 'Outdoor outlets or landscape lighting' },
  { id: 'inspect', label: 'Pre-listing or new construction inspection' },
];

export default function DFWElectricianProsper() {
  const [serviceIdx, setServiceIdx] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const svc = SERVICES[serviceIdx];
  const checkedCount = Object.values(checked).filter(Boolean).length;

  const toggle = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112244 100%)', padding: '60px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>⚡</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '16px 0 12px', lineHeight: 1.2 }}>
          Prosper TX Electricians
        </h1>
        <p style={{ fontSize: 20, color: '#F5E642', fontWeight: 700, margin: '0 0 16px' }}>
          New Home Specialists · EV Chargers · Smart Wiring · Panel Upgrades
        </p>
        <p style={{ fontSize: 16, color: '#aac', maxWidth: 620, margin: '0 auto 32px' }}>
          Prosper has exploded with new construction — now one of the fastest-growing towns in Texas.
          New homes bring new electrical demands: EV chargers, smart home systems, and oversized panels
          for larger square footage. ProLnk connects Prosper homeowners with electricians who specialize
          in exactly what new builds require.
        </p>
        <a
          href="/signup"
          style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, padding: '16px 40px', borderRadius: 8, fontSize: 18, textDecoration: 'none', display: 'inline-block' }}
        >
          Join the Prosper Waitlist — Free
        </a>
      </div>

      {/* City Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, padding: '40px 24px', maxWidth: 900, margin: '0 auto' }}>
        {[
          { icon: '📈', label: 'Growth Rate', value: '+500% since 2010' },
          { icon: '🏠', label: 'Median Home Value', value: '$680,000' },
          { icon: '🚗', label: 'EV Ownership Rate', value: '1 in 7 households' },
          { icon: '⚡', label: 'Electrician Hourly Rate', value: '$95–$185/hr' },
        ].map(s => (
          <div key={s.label} style={{ background: '#112244', borderRadius: 10, padding: '20px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>{s.icon}</div>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, margin: '8px 0 4px', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Two-column: Calculator + Checklist */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, padding: '0 24px 40px', maxWidth: 900, margin: '0 auto' }}>

        {/* Cost Calculator */}
        <div style={{ background: '#112244', borderRadius: 14, padding: '28px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', margin: '0 0 20px' }}>
            💰 Service Cost Estimator
          </h2>

          <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>Select Service</label>
          <select
            value={serviceIdx}
            onChange={e => setServiceIdx(Number(e.target.value))}
            style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334', fontSize: 14, marginBottom: 20 }}
          >
            {SERVICES.map((s, i) => <option key={i} value={i}>{s.label}</option>)}
          </select>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Low Estimate', value: `$${svc.low.toLocaleString()}` },
              { label: 'High Estimate', value: `$${svc.high.toLocaleString()}` },
            ].map(s => (
              <div key={s.label} style={{ background: '#0A1628', borderRadius: 8, padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#aac', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontWeight: 800, color: '#F5E642', fontSize: 20 }}>{s.value}</div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 12, color: '#889', marginTop: 14 }}>
            Prosper electricians add a $45–85 trip fee for most visits. EV charger permit required by city (~$150).
          </p>
        </div>

        {/* Needs Checklist */}
        <div style={{ background: '#112244', borderRadius: 14, padding: '28px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>
            📋 What Do You Need?
          </h2>
          <p style={{ fontSize: 13, color: '#aac', marginBottom: 20 }}>
            Check everything that applies — share this list with your ProLnk electrician.
          </p>

          {CHECKLIST.map(item => (
            <label
              key={item.id}
              onClick={() => toggle(item.id)}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14, cursor: 'pointer' }}
            >
              <div style={{
                width: 20, height: 20, borderRadius: 4, border: '2px solid #F5E642',
                background: checked[item.id] ? '#F5E642' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: 1,
              }}>
                {checked[item.id] && <span style={{ color: '#0A1628', fontWeight: 900, fontSize: 13 }}>✓</span>}
              </div>
              <span style={{ fontSize: 14, lineHeight: 1.5 }}>{item.label}</span>
            </label>
          ))}

          {checkedCount > 0 && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px', marginTop: 8, textAlign: 'center' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{checkedCount} item{checkedCount !== 1 ? 's' : ''} selected</span>
              <span style={{ color: '#aac', fontSize: 13 }}> — share with your quote request</span>
            </div>
          )}
        </div>
      </div>

      {/* Why Prosper */}
      <div style={{ padding: '0 24px 48px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: 'center', marginBottom: 24 }}>
          Prosper's Unique Electrical Needs
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {[
            { icon: '🚘', title: 'EV Capital of DFW', desc: 'Prosper has one of the highest EV ownership rates in North Texas. Level 2 charger installs are the #1 electrical job in the city right now.' },
            { icon: '🏡', title: 'Oversized New Homes', desc: 'Prosper\’s average new home exceeds 3,200 sq ft. Larger homes need 400A panels — many builders still install 200A as standard, creating immediate upgrade demand.' },
            { icon: '🔌', title: 'Smart Home Wiring', desc: 'Buyers in the $600K+ range expect Lutron, Control4, and whole-home audio. Running low-voltage alongside electrical requires specialized experience.' },
            { icon: '🔋', title: 'Generator Prep', desc: 'After 2021\’s Winter Storm Uri, Prosper residents invested heavily in standby generators. Transfer switch and hookup work keeps area electricians busy year-round.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#112244', borderRadius: 10, padding: '20px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: '#F5E642' }}>{c.title}</div>
              <div style={{ fontSize: 14, color: '#aac', lineHeight: 1.6 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: '#F5E642', padding: '48px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', margin: '0 0 12px' }}>
          Get Vetted Prosper Electricians — Free Quotes
        </h2>
        <p style={{ color: '#0A1628', fontSize: 16, maxWidth: 500, margin: '0 auto 28px' }}>
          ProLnk is launching in Prosper. Join the waitlist and get matched to licensed electricians who specialize in new construction and EV installs.
        </p>
        <a
          href="/signup"
          style={{ background: '#0A1628', color: '#F5E642', fontWeight: 800, padding: '16px 40px', borderRadius: 8, fontSize: 18, textDecoration: 'none', display: 'inline-block' }}
        >
          Join the Waitlist
        </a>
      </div>

      <div style={{ background: '#071020', padding: '20px', textAlign: 'center', fontSize: 13, color: '#556' }}>
        © 2026 ProLnk · Serving Prosper, TX and all of DFW · <a href="/privacy" style={{ color: '#556' }}>Privacy</a>
      </div>
    </div>
  );
}
