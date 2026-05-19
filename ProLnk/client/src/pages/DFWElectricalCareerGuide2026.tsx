import { useState } from 'react';

const paths = [
  { label: 'No Experience', steps: ['IBEW Local 20 Application (Dallas)', '5-Year Apprenticeship Program', 'Journeyman License (TDLR)', 'Avg $78K Starting Salary'] },
  { label: 'Some Electrical', steps: ['NECA Training Program', 'Credit for Prior Experience', '3-Year Apprenticeship', 'Journeyman + Specializations'] },
  { label: 'Journeyman Licensed', steps: ['2 Years Additional Experience', 'Master Electrician Exam (TDLR)', 'Business / EC License', 'Independent Contractor $95K+'] },
  { label: 'Master Electrician', steps: ['Electrical Contractor License', 'Business Registration (Texas)', 'Insurance + Bonding', 'Full Business Owner $120K+'] },
];

export default function DFWElectricalCareerGuide2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚡🔌</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Electrical Career Guide 2026</h1>
          <p style={{ color: '#8fa3c0', fontSize: 16 }}>Become a licensed electrician in Dallas-Fort Worth — apprenticeship, licensing, and income guide</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[{ icon: '🏛️', title: 'IBEW Local 20 — Dallas', detail: '5-year apprenticeship, paid while you learn, full union benefits, Mesquite training center' },
            { icon: '🤝', title: 'NECA Programs', detail: 'National Electrical Contractors Assn — employer-sponsored training, flexible scheduling' },
            { icon: '📜', title: 'TDLR Journeyman License', detail: '8,000 hours verified experience + exam — $78K average DFW starting salary' },
            { icon: '👑', title: 'Master License Path', detail: 'Journeyman + 2 years + master exam — required to pull permits, own an EC company' }].map((c, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#8fa3c0', fontSize: 13 }}>{c.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 14, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>📊 DFW Electrician Market 2026</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[['$78K', 'Avg Journeyman Salary'], ['3,500+', 'DFW Job Openings'], ['#1', 'Highest-Paid Trade in Texas']].map(([val, lbl], i) => (
              <div key={i} style={{ textAlign: 'center', background: '#0A1628', borderRadius: 8, padding: '14px 8px' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642′ }}>{val}</div>
                <div style={{ color: '#8fa3c0', fontSize: 12, marginTop: 4 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 14, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16 }}>🗺️ Your DFW Electrical Career Timeline</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {paths.map((p, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: selected === i ? '#F5E642′ : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff' }}>{p.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {paths[selected].steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: '8px 14px', color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{s}</div>
                {i < paths[selected].steps.length - 1 && <span style={{ color: '#F5E642′ }}>→</span>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #F5E642 0%, #e6d400 100%)', borderRadius: 14, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>⚡</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#0A1628', marginBottom: 6 }}>Independent Electricians: Join ProLnk</div>
          <div style={{ color: '#1a2f50', fontSize: 14 }}>ProLnk matches licensed DFW electricians with homeowners needing panel upgrades, EV charger installs, and rewires — no middleman, direct jobs, free to join.</div>
        </div>
      </div>
    </div>
  );
}