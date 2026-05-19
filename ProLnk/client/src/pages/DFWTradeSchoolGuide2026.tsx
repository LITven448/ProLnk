import { useState } from 'react';

const schools = [
  { trade: 'HVAC', name: 'North Lake College', location: 'Irving', duration: '10 mo', cost: '$3,200', cert: 'TDLR + EPA 608', icon: '❄️' },
  { trade: 'Plumbing', name: 'Tarrant County College', location: 'Fort Worth', duration: '12 mo', cost: '$3,400', cert: 'TSBPE Ready', icon: '🔧' },
  { trade: 'Electrical', name: 'Cedar Valley College', location: 'Lancaster', duration: '18 mo', cost: '$4,100', cert: 'TDLR Apprentice', icon: '⚡' },
  { trade: 'Welding', name: 'Cedar Valley College', location: 'Lancaster', duration: '12 mo', cost: '$3,800', cert: 'AWS D1.1', icon: '🔥' },
  { trade: 'HVAC/Electrical', name: 'Triangle Tech Dallas', location: 'Dallas', duration: '15 mo', cost: '$18,000', cert: 'Multiple Certs', icon: '🏫' },
  { trade: 'Auto/HVAC', name: 'UTI Dallas', location: 'Dallas', duration: '12 mo', cost: '$22,000', cert: 'Manufacturer Certs', icon: '🚗' },
];

const recommendations: Record<string, string[]> = {
  'HVAC': ['North Lake College — Irving (10 mo, $3,200)', 'Tarrant County College HVAC — Fort Worth (12 mo)', 'UTI Dallas HVAC track (12 mo, $22K with placement)'],
  'Electrical': ['Cedar Valley College — Lancaster (18 mo, $4,100)', 'IBEW Local 20 Apprenticeship — paid while learning', 'Triangle Tech Dallas (15 mo, comprehensive)'],
  'Plumbing': ['Tarrant County College — Fort Worth (12 mo, $3,400)', 'TSBPE-approved programs — count toward apprenticeship hours'],
  'Welding': ['Cedar Valley College — Lancaster (12 mo, $3,800)', 'Dallas College Welding Program — multiple campuses'],
  'Multiple Trades': ['Dallas College — 7 campuses, wide program selection', 'Triangle Tech — HVAC + electrical combined', 'Tarrant County College — HVAC, plumbing, welding'],
};

export default function DFWTradeSchoolGuide2026() {
  const [selected, setSelected] = useState('HVAC');
  const trades = Object.keys(recommendations);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎓🛠️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Trade Schools Guide 2026</h1>
          <p style={{ color: '#8fa3c0', fontSize: 16 }}>Best Dallas-Fort Worth trade schools for home service careers — programs, costs, and ProLnk hiring pipeline</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14, marginBottom: 32 }}>
          {schools.map((s, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 12, padding: 18, border: '1px solid #1e3a5f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
                <span style={{ background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>{s.trade}</span>
              </div>
              <div style={{ fontWeight: 700, color: '#fff', marginBottom: 4 }}>{s.name}</div>
              <div style={{ color: '#8fa3c0', fontSize: 12, marginBottom: 8 }}>📍 {s.location} · {s.duration} · {s.cost}</div>
              <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 600 }}>✅ {s.cert}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 14, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>💰 Scholarships & Financial Aid</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[['Pell Grant', 'Up to $7,395/yr for eligible students — applies to all Dallas College, TCC programs'],
              ['Texas Grant', 'State need-based grant — covers up to full tuition at community colleges'],
              ['Workforce Solutions', 'DFW workforce board — funds training for unemployed/underemployed workers'],
              ['ProLnk Pipeline', 'Complete school + list on ProLnk — direct connection to homeowners hiring now']].map(([title, detail], i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 13, marginBottom: 4 }}>{title}</div>
                <div style={{ color: '#8fa3c0', fontSize: 12 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 14, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16 }}>🗺️ Find Your DFW School — by Trade Interest</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {trades.map((t, i) => (
              <button key={i} onClick={() => setSelected(t)} style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: selected === t ? '#F5E642′ : '#1e3a5f', color: selected === t ? '#0A1628' : '#fff' }}>{t}</button>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recommendations[selected].map((rec, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', color: '#F5E642', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>🎓</span> {rec}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #F5E642 0%, #e6d400 100%)', borderRadius: 14, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>🚀</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#0A1628', marginBottom: 6 }}>ProLnk: The Hiring Pipeline for DFW Trade Grads</div>
          <div style={{ color: '#1a2f50', fontSize: 14 }}>Complete your DFW trade program, get certified, and list on ProLnk — our platform connects you directly with local homeowners the day you finish training. No job board, no middleman.</div>
        </div>
      </div>
    </div>
  );
}