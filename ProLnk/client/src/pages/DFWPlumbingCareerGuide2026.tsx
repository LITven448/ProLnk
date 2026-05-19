import { useState } from 'react';

const paths = [
  { label: 'No Experience', steps: ['TSBPE Apprentice Registration', 'Tarrant County College Plumbing', '4-Year Apprenticeship', 'Journeyman Plumber $55-72K'] },
  { label: 'Helper/Labor', steps: ['TSBPE Apprentice (count hours)', 'Vocational Coursework', '3-Year Remaining Apprenticeship', 'Journeyman Exam + License'] },
  { label: 'Journeyman Plumber', steps: ['2 Years as Journeyman', 'Master Plumber Exam (TSBPE)', 'Business + Master License', 'Top Earners $120K+'] },
  { label: 'Master Plumber', steps: ['Licensed Master Plumber', 'Start Plumbing Company', 'ProLnk Contractor Listing', 'DFW Residential Contracts'] },
];

export default function DFWPlumbingCareerGuide2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔧🚿</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Plumbing Career Guide 2026</h1>
          <p style={{ color: '#8fa3c0', fontSize: 16 }}>From apprentice to master plumber — the complete DFW roadmap including TSBPE licensing and earnings</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[{ icon: '🏫', title: 'TSBPE Apprentice Program', detail: 'Texas State Board of Plumbing Examiners — register first, then log 8,000 hours over 4 years' },
            { icon: '🎓', title: 'Tarrant County College', detail: 'Plumbing Technology Certificate — 12 months, covers code, pipe systems, safety, $3,400 total' },
            { icon: '📋', title: 'Journeyman Exam', detail: 'After 4 years + required coursework — avg $72K salary, needed before starting own company' },
            { icon: '👑', title: 'Master Plumber Path', detail: 'Journeyman + 2 additional years + master exam — top earners clear $120K+ in DFW market' }].map((c, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#8fa3c0', fontSize: 13 }}>{c.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 14, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>📊 DFW Plumbing Market 2026</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[['$72K', 'Avg Journeyman Salary'], ['$120K+', 'Top Master Plumber Earnings'], ['2,800+', 'DFW Plumbing Job Openings']].map(([val, lbl], i) => (
              <div key={i} style={{ textAlign: 'center', background: '#0A1628', borderRadius: 8, padding: '14px 8px' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642' }}>{val}</div>
                <div style={{ color: '#8fa3c0', fontSize: 12, marginTop: 4 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 14, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16 }}>🗺️ Your DFW Plumbing Career Path</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {paths.map((p, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff' }}>{p.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {paths[selected].steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: '8px 14px', color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{s}</div>
                {i < paths[selected].steps.length - 1 && <span style={{ color: '#F5E642' }}>→</span>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #F5E642 0%, #e6d400 100%)', borderRadius: 14, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>🔧</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#0A1628', marginBottom: 6 }}>DFW Plumbers: Find Jobs on ProLnk</div>
          <div style={{ color: '#1a2f50', fontSize: 14 }}>Licensed DFW plumbers get matched with homeowner leak, drain, and remodel jobs — ProLnk verifies your TSBPE license and puts your profile in front of motivated buyers.</div>
        </div>
      </div>
    </div>
  );
}