import { useState } from 'react';

const steps = [
  { label: 'No Experience', path: ['Vocational School (6-12 mo)', 'EPA 608 Cert ($25-50)', 'TDLR Apprentice Registration', 'Entry Tech $18-22/hr'] },
  { label: 'Some Mechanical', path: ['North Lake College HVAC Program', 'EPA 608 + TDLR Apprentice', 'Apprenticeship 2 Years', 'Journeyman Tech $24-30/hr'] },
  { label: 'Military/Trade', path: ['TDLR Apprentice (fast-track)', 'EPA 608 Cert', '1-Year Supervised Hours', 'Journeyman+ $30-38/hr'] },
  { label: 'Journeyman', path: ['TDLR Contractor License', '4 Years Verified Hours', 'Business Registration', 'Independent Contractor $60-120K+'] },
];

export default function DFWHVACCareerGuide2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>❄️🔥</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW HVAC Career Guide 2026</h1>
          <p style={{ color: '#8fa3c0', fontSize: 16 }}>Your complete roadmap to becoming a licensed HVAC technician in the Dallas-Fort Worth area</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[{ icon: '🏫', title: 'Tarrant County College', detail: 'HVAC Technology Program — 12 months, 18 credit hours, $3,200 total' },
            { icon: '🎓', title: 'North Lake College', detail: 'HVAC/R Certificate — 10 months, financial aid available, Arlington campus' },
            { icon: '📋', title: 'TDLR Certification', detail: 'Texas Dept of Licensing — Apprentice → Journeyman → Master path' },
            { icon: '🧪', title: 'EPA 608 Cert', detail: 'Required to handle refrigerants — $25-50 test, 1-day prep, any proctored site' }].map((c, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#8fa3c0', fontSize: 13 }}>{c.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 14, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>📊 DFW Market Snapshot</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[['2,000+', 'Open HVAC Jobs in DFW'], ['$52K–$98K', 'Average Salary Range'], ['Top 3', 'Fastest Growing Trade in Texas']].map(([val, lbl], i) => (
              <div key={i} style={{ textAlign: 'center', background: '#0A1628', borderRadius: 8, padding: '14px 8px' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642' }}>{val}</div>
                <div style={{ color: '#8fa3c0', fontSize: 12, marginTop: 4 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 14, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16 }}>🗺️ Your DFW HVAC Career Path</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {steps.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff' }}>{s.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {steps[selected].path.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: '8px 14px', color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{p}</div>
                {i < steps[selected].path.length - 1 && <span style={{ color: '#F5E642' }}>→</span>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #F5E642 0%, #e6d400 100%)', borderRadius: 14, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>⚡</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#0A1628', marginBottom: 6 }}>Get Your First HVAC Jobs on ProLnk</div>
          <div style={{ color: '#1a2f50', fontSize: 14 }}>Once certified, ProLnk connects DFW HVAC techs with local homeowners — no experience minimum, free to list, jobs start flowing within 48 hours of verification.</div>
        </div>
      </div>
    </div>
  );
}