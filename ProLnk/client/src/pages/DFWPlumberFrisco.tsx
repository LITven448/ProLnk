import { useState } from 'react';

const JOBS = [
  { label: 'Slab Leak Detection & Repair', low: 1800, high: 4500 },
  { label: 'Water Heater Replacement', low: 900, high: 1800 },
  { label: 'Full Re-pipe (New Construction)', low: 4000, high: 9000 },
  { label: 'Drain Cleaning', low: 150, high: 400 },
  { label: 'Toilet Replacement', low: 250, high: 600 },
  { label: 'Fixture Install (Sink/Tub)', low: 200, high: 550 },
];

export default function DFWPlumberFrisco() {
  const [selectedJob, setSelectedJob] = useState(0);
  const [hours, setHours] = useState(2);

  const job = JOBS[selectedJob];
  const laborEst = hours * 135;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112244 100%)', padding: '60px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🔧</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '16px 0 12px', lineHeight: 1.2 }}>
          Frisco TX Plumbers
        </h1>
        <p style={{ fontSize: 20, color: '#F5E642', fontWeight: 700, margin: '0 0 16px' }}>
          Vetted Pros · Fast Response · Flat-Rate Quotes
        </p>
        <p style={{ fontSize: 16, color: '#aac', maxWidth: 600, margin: '0 auto 32px' }}>
          Frisco is one of the fastest-growing cities in America — and with that growth comes
          expansive clay soils, slab leaks, and new-construction plumbing challenges unique to Collin County.
          ProLnk connects you to vetted local plumbers who know Frisco's soil and code requirements.
        </p>
        <a
          href="/signup"
          style={{
            background: '#F5E642', color: '#0A1628', fontWeight: 800,
            padding: '16px 40px', borderRadius: 8, fontSize: 18,
            textDecoration: 'none', display: 'inline-block',
          }}
        >
          Join the Frisco Waitlist — Free
        </a>
      </div>

      {/* City Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, padding: '40px 24px', maxWidth: 900, margin: '0 auto' }}>
        {[
          { icon: '📈', label: 'Population Growth', value: '+212% since 2010′ },
          { icon: '🏗️', label: 'New Homes/Year', value: '~4,000 permits' },
          { icon: '🌡️', label: 'Avg Summer High', value: '97°F (stresses pipes)' },
          { icon: '🏚️', label: 'Slab Leak Rate', value: '1 in 11 homes / decade' },
        ].map(s => (
          <div key={s.label} style={{ background: '#112244', borderRadius: 10, padding: '20px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>{s.icon}</div>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, margin: '8px 0 4px', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Cost Calculator */}
      <div style={{ background: '#112244', borderRadius: 14, padding: '32px', maxWidth: 700, margin: '0 auto 40px', marginLeft: 'auto', marginRight: 'auto', width: 'calc(100% - 48px)' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', margin: '0 0 24px' }}>
          💰 Frisco Plumbing Cost Estimator
        </h2>

        <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>Select Job Type</label>
        <select
          value={selectedJob}
          onChange={e => setSelectedJob(Number(e.target.value))}
          style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334', fontSize: 15, marginBottom: 20 }}
        >
          {JOBS.map((j, i) => <option key={i} value={i}>{j.label}</option>)}
        </select>

        <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>Estimated Labor Hours: {hours}h</label>
        <input
          type="range" min={1} max={8} value={hours}
          onChange={e => setHours(Number(e.target.value))}
          style={{ width: '100%', marginBottom: 24, accentColor: '#F5E642′ }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {[
            { label: 'Parts Range', value: `$${job.low.toLocaleString()} – $${job.high.toLocaleString()}` },
            { label: 'Labor Est.', value: `~$${laborEst.toLocaleString()}` },
            { label: 'Total Est.', value: `$${(job.low + laborEst).toLocaleString()} – $${(job.high + laborEst).toLocaleString()}` },
          ].map(s => (
            <div key={s.label} style={{ background: '#0A1628', borderRadius: 8, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#aac', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontWeight: 800, color: '#F5E642', fontSize: 15 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 13, color: '#889', marginTop: 16 }}>
          * Frisco plumbers charge $95–$175/hr. Slab leak work typically runs higher due to clay soil difficulty.
          Get 3 real quotes through ProLnk before committing.
        </p>
      </div>

      {/* Common Frisco Plumbing Issues */}
      <div style={{ padding: '0 24px 48px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: 'center', marginBottom: 24 }}>
          Top Plumbing Issues in Frisco
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {[
            { icon: '🧱', title: 'Expansive Clay Slab Leaks', desc: "Frisco's black clay soil shifts dramatically with rain/drought cycles, stressing under-slab pipes and causing leaks that worsen fast." },
            { icon: '🏗️', title: 'New Construction Warranty Gaps', desc: 'Builder warranties on plumbing typically expire after 1–2 years. Many Frisco homeowners discover defects right after the warranty window closes.' },
            { icon: '💧', title: 'Water Pressure Problems', desc: "Rapid growth has strained Frisco's water infrastructure. High or low pressure is a frequent complaint in neighborhoods built after 2015." },
            { icon: '🚿', title: 'Fixture & Finish Upgrades', desc: "Frisco's high median home value ($570K+) drives strong demand for premium fixture upgrades — rain showers, soaking tubs, filtered water systems." },
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
          Get 3 Vetted Frisco Plumber Quotes — Free
        </h2>
        <p style={{ color: '#0A1628', fontSize: 16, maxWidth: 500, margin: '0 auto 28px' }}>
          ProLnk is launching in Frisco. Join the waitlist and be first to access vetted local plumbers with transparent pricing.
        </p>
        <a
          href="/signup"
          style={{ background: '#0A1628', color: '#F5E642', fontWeight: 800, padding: '16px 40px', borderRadius: 8, fontSize: 18, textDecoration: 'none', display: 'inline-block' }}
        >
          Join the Waitlist
        </a>
      </div>

      <div style={{ background: '#071020', padding: '20px', textAlign: 'center', fontSize: 13, color: '#556′ }}>
        © 2026 ProLnk · Serving Frisco, TX and all of DFW · <a href="/privacy" style={{ color: '#556′ }}>Privacy</a>
      </div>
    </div>
  );
}
