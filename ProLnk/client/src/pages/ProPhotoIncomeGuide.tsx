import { useState } from 'react';

const bestPhotos = [
  { icon: '🔧', label: 'Before photos', detail: 'Show the problem clearly — rust, cracks, wear' },
  { icon: '❄️', label: 'HVAC system label', detail: 'The data plate showing model, age, serial number' },
  { icon: '⚡', label: 'Electrical panel', detail: 'Panel brand, breaker layout, any red flags' },
  { icon: '🏠', label: 'All 4 exterior angles', detail: 'Roof edge, gutters, foundation, siding' },
  { icon: '🍂', label: 'Gutters and drainage', detail: 'Overflow, damage, improper slope' },
  { icon: '🏗️', label: 'Attic (if accessible)', detail: 'Insulation depth, ventilation, any moisture' },
];

const badPhotos = [
  '📵 Blurry or dark images',
  '❓ No context — just a close-up with no reference',
  '😶 Faces visible (privacy violation)',
  '🌑 Nighttime without proper lighting',
  '📦 Cluttered backgrounds hiding the subject',
];

export default function ProPhotoIncomeGuide() {
  const [jobsPerWeek,   setJobsPerWeek]   = useState('');
  const [photosPerJob,  setPhotosPerJob]  = useState('');
  const [monthlyExtra,  setMonthlyExtra]  = useState('');

  function estimate() {
    const jobs   = parseFloat(jobsPerWeek)  || 0;
    const photos = parseFloat(photosPerJob) || 0;
    if (!jobs || !photos) { setMonthlyExtra('Enter both fields.'); return; }
    const totalPhotosPerMonth = jobs * photos * 4.33;
    const leadsGenerated      = totalPhotosPerMonth / 8;
    const commissionEarned    = leadsGenerated * 312;
    setMonthlyExtra(`~$${Math.round(commissionEarned).toLocaleString()}/mo in extra commission (${Math.round(leadsGenerated)} leads from ${Math.round(totalPhotosPerMonth)} photos)`);
  }

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', color: '#1A2332', fontFamily: 'Inter, sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 8, fontSize: 13, color: '#1D6FE8', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 600 }}>ProLnk Pro Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0A1628', marginBottom: 8, lineHeight: 1.2 }}>
          The ProLnk Photo Income Guide
        </h1>
        <p style={{ fontSize: 20, color: '#F59E0B', fontWeight: 700, marginBottom: 8 }}>Every Photo Is Worth Money</p>
        <p style={{ fontSize: 17, color: '#475569', marginBottom: 48, lineHeight: 1.6 }}>
          Every photo you upload to ProLnk is analyzed by AI for revenue opportunities. Here's exactly how that works.
        </p>

        {/* How It Works */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 20 }}>How Photo Income Works</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { step: 1, text: 'You complete any job', sub: 'Plumbing, HVAC, electrical — any trade' },
              { step: 2, text: 'Upload job photos to ProLnk', sub: 'Takes 60 seconds from your phone' },
              { step: 3, text: 'AI analyzes in real-time', sub: 'Identifies aging systems, damage, upgrade opportunities' },
              { step: 4, text: 'Matched homeowners receive AI-generated insight', sub: '"Your neighbor’s water heater is similar age — worth checking yours"' },
              { step: 5, text: 'They request a quote', sub: 'Routed back to you or your network' },
              { step: 6, text: 'When they book → you earn commission', sub: 'On top of what you already made on the first job' },
            ].map((item, i) => (
              <div key={item.step} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: '20px 0', borderBottom: i < 5 ? '1px solid #E2E8F0′ : ’none' }}>
                <div style={{ minWidth: 44, height: 44, borderRadius: '50%', background: '#1D6FE8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, color: '#FFFFFF' }}>{item.step}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 16 }}>{item.text}</div>
                  <div style={{ color: '#64748B', fontSize: 14, marginTop: 2 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Per-Photo Math */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 16 }}>The Per-Photo Math</h2>
          <div style={{ background: '#0A1628', borderRadius: 16, padding: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#F59E0B' }}>1 in 8</div>
              <div style={{ color: '#94A3B8', fontSize: 14, marginTop: 4 }}>photos generates a lead</div>
            </div>
            <div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#4ADE80′ }}>$312</div>
              <div style={{ color: '#94A3B8', fontSize: 14, marginTop: 4 }}>avg commission per lead</div>
            </div>
            <div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#64B5F6′ }}>∞</div>
              <div style={{ color: '#94A3B8', fontSize: 14, marginTop: 4 }}>ROI — photos cost $0</div>
            </div>
          </div>
        </section>

        {/* Best Photos */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 20 }}>✅ Photos That Work Best</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {bestPhotos.map(p => (
              <div key={p.label} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{p.icon}</div>
                <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>{p.label}</div>
                <div style={{ color: '#64748B', fontSize: 13 }}>{p.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Bad Photos */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 16 }}>❌ Photos That Don't Work</h2>
          <div style={{ background: '#FEF2F2', borderRadius: 12, padding: 24 }}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {badPhotos.map(b => (
                <li key={b} style={{ color: '#B91C1C', fontSize: 15 }}>{b}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Income Estimator */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 20 }}>🧮 Your Photo Income Estimate</h2>
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#475569', marginBottom: 6 }}>Jobs per week</label>
                <input
                  type="number" min="1″ max="50"
                  value={jobsPerWeek}
                  onChange={e => setJobsPerWeek(e.target.value)}
                  placeholder="e.g. 8″
                  style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: 8, padding: '10px 14px', color: '#0A1628', fontSize: 15, boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#475569', marginBottom: 6 }}>Photos per job</label>
                <input
                  type="number" min="1″ max="30"
                  value={photosPerJob}
                  onChange={e => setPhotosPerJob(e.target.value)}
                  placeholder="e.g. 5″
                  style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: 8, padding: '10px 14px', color: '#0A1628', fontSize: 15, boxSizing: 'border-box' }}
                />
              </div>
            </div>
            <button
              onClick={estimate}
              style={{ background: '#1D6FE8', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}
            >
              Calculate My Extra Income
            </button>
            {monthlyExtra && (
              <div style={{ marginTop: 20, background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 10, padding: 20, color: '#166534', fontWeight: 700, fontSize: 17, textAlign: 'center' }}>
                {monthlyExtra}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #0A1628, #1E3A5F)', borderRadius: 16, padding: 36, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>📸</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>Start Earning on Every Job</h3>
          <p style={{ color: '#93C5FD', marginBottom: 24, lineHeight: 1.6 }}>
            Apply to become a ProLnk Pro. Upload photos on the job. Earn commissions while you sleep.
          </p>
          <a href="/apply" style={{ display: 'inline-block', background: '#F59E0B', color: '#0A1628', fontWeight: 800, borderRadius: 8, padding: '14px 32px', textDecoration: 'none', fontSize: 16 }}>
            Apply to ProLnk →
          </a>
        </div>

      </div>
    </div>
  );
}
