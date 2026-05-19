import { useState } from 'react';

const guides = [
  { label: 'Construction Bg', steps: ['Foundation Repair Apprenticeship', 'Equipment Training ($50K invest)', 'Helical Pier Institute Certification', 'First Jobs $8K–$15K avg'] },
  { label: 'Concrete/Masonry', steps: ['Pier System Manufacturer Training', 'PE Engineer Partnership (permits)', 'Equipment Financing Options', 'DFW Clay Soil Specialization'] },
  { label: 'Structural/Engineering', steps: ['PE License + Foundation Specialty', 'Start Foundation Company', 'ProLnk Contractor Verification', 'Premium Jobs $25K avg'] },
  { label: 'Existing Contractor', steps: ['Add Foundation as Service Line', 'Helical Pier Certification', 'Expand Equipment Fleet', 'Scale to $1M+ Revenue'] },
];

export default function DFWFoundationCareerGuide2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏗️🔩</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Foundation Repair Career Guide 2026</h1>
          <p style={{ color: '#8fa3c0', fontSize: 16 }}>Break into the highest-ticket residential trade in DFW — $8K–$25K per job, massive demand from clay soil</p>
        </div>

        <div style={{ background: '#0a1f0a', borderRadius: 12, padding: 16, marginBottom: 24, border: '1px solid #206b20′ }}>
          <div style={{ fontWeight: 700, color: '#6bff6b', marginBottom: 4 }}>💡 The DFW Advantage</div>
          <div style={{ color: '#aaffaa', fontSize: 13 }}>DFW sits on expansive clay soil that shifts with moisture — every heavy rain or drought season generates thousands of foundation jobs. This market is structural, not cyclical.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[{ icon: '📜', title: 'No License Required', detail: 'Texas has no foundation repair contractor license — but permits require PE engineering oversight for structural repairs' },
            { icon: '🔩', title: 'Helical Pier Institute', detail: 'Industry certification for pier installation — manufacturer training available from Chance, Ram Jack, Atlas systems' },
            { icon: '💰', title: 'Job Size Advantage', detail: 'Average residential job: $8,000–$25,000. No other trade has this ticket size without licensing barriers.' },
            { icon: '🚜', title: 'Equipment Investment', detail: 'Pier installation rig + hydraulic tools: $50K–$80K. Financing available through equipment lenders.' }].map((c, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#8fa3c0', fontSize: 13 }}>{c.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 14, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>📊 DFW Foundation Market 2026</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[['$8K–$25K', 'Avg Job Revenue'], ['Year-Round', 'Demand in DFW Clay'], ['$1M+', 'Scale Potential Solo Op']].map(([val, lbl], i) => (
              <div key={i} style={{ textAlign: 'center', background: '#0A1628', borderRadius: 8, padding: '14px 8px' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642′ }}>{val}</div>
                <div style={{ color: '#8fa3c0', fontSize: 12, marginTop: 4 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 14, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16 }}>🗺️ Your Foundation Career Entry Guide</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {guides.map((g, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: selected === i ? '#F5E642′ : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff' }}>{g.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {guides[selected].steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: '8px 14px', color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{s}</div>
                {i < guides[selected].steps.length - 1 && <span style={{ color: '#F5E642′ }}>→</span>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #F5E642 0%, #e6d400 100%)', borderRadius: 14, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>🏗️</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#0A1628', marginBottom: 6 }}>Foundation Pros: List on ProLnk Today</div>
          <div style={{ color: '#1a2f50', fontSize: 14 }}>ProLnk connects DFW homeowners with verified foundation contractors — every cracked slab and sticking door in Dallas is a lead waiting for you.</div>
        </div>
      </div>
    </div>
  );
}