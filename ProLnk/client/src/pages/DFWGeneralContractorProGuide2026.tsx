import { useState } from 'react';

const projectTypes = [
  { label: 'Kitchen Remodel', avgJob: 45000, desc: 'Full gut to turnkey' },
  { label: 'Bathroom Remodel', avgJob: 18000, desc: 'Tile, fixtures, layout' },
  { label: 'Room Addition', avgJob: 54000, desc: '300 sqft @ $180/sqft' },
  { label: 'Garage Conversion', avgJob: 28000, desc: 'ADU or bonus room' },
  { label: 'Whole-Home Reno', avgJob: 120000, desc: 'Complete renovation' },
];

export default function DFWGeneralContractorProGuide2026() {
  const [projIdx, setProjIdx] = useState(0);
  const project = projectTypes[projIdx];
  const jobsPerMonth = project.avgJob > 80000 ? 1 : project.avgJob > 30000 ? 2 : 4;
  const commissionRate = 0.20;
  const monthly = jobsPerMonth * project.avgJob * commissionRate;
  const annual = monthly * 12;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK — DFW TRADE GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏗️ DFW General Contractor Pro Guide 2026</h1>
        <p style={{ color: '#a0aec0', fontSize: 16, marginBottom: 32 }}>
          DFW is in a construction boom with no end in sight. Kitchen remodels average
          <strong style={{ color: '#F5E642' }}> $45K</strong>, additions run
          <strong style={{ color: '#F5E642' }}> $180/sqft</strong>. Charter tier GCs get first access to high-ticket jobs as soon as they post.
        </p>

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🏙️ DFW Construction Market 2026</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '📈', text: 'DFW permit volume up 28% YoY — fastest growing metro in the US' },
              { icon: '🏠', text: 'Kitchen remodel avg: $45K | Bathroom avg: $18K | Room addition avg: $54K' },
              { icon: '🔨', text: 'High demand for GCs who can handle design-build and permitting' },
              { icon: '💼', text: 'Charter tier GCs get first-pick on high-ticket jobs above $25K' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', gap: 12, background: '#1a2d45', borderRadius: 8, padding: '10px 14px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ color: '#cbd5e0', fontSize: 14, lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>💰 Project Type → DFW Market Rate + ProLnk Value</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {projectTypes.map((p, i) => (
              <button key={p.label} onClick={() => setProjIdx(i)}
                style={{ background: i === projIdx ? '#F5E642' : '#1a2d45', color: i === projIdx ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 6, padding: '8px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                {p.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0' }}>DFW market avg</span>
              <span style={{ fontWeight: 700 }}>${project.avgJob.toLocaleString()} — {project.desc}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0' }}>Est. jobs/month</span>
              <span style={{ fontWeight: 700 }}>{jobsPerMonth}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0' }}>Monthly ProLnk commission</span>
              <span style={{ fontWeight: 700, color: '#F5E642' }}>${monthly.toLocaleString(undefined,{maximumFractionDigits:0})}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#a0aec0' }}>Annual ProLnk earnings</span>
              <span style={{ fontWeight: 800, color: '#F5E642', fontSize: 20 }}>${annual.toLocaleString(undefined,{maximumFractionDigits:0})}</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>⭐ Charter GC Benefits</div>
          <ul style={{ color: '#cbd5e0', lineHeight: 2, paddingLeft: 20, margin: 0 }}>
            <li>First access to high-ticket ($25K+) jobs before other GCs see them</li>
            <li>$149/mo rate locked forever — never increases</li>
            <li>Commission tiers: 12% starter → 70% Elite as volume grows</li>
            <li>Override income on subs and specialists you bring to platform</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, borderRadius: 8, padding: '14px 32px', display: 'inline-block', fontSize: 16, cursor: 'pointer' }}>
            🏗️ Join ProLnk — Charter Rate $149/mo
          </div>
          <p style={{ color: '#4a5568', fontSize: 12, marginTop: 12 }}>Only 500 Charter spots. DFW GCs are locking in now.</p>
        </div>
      </div>
    </div>
  );
}
