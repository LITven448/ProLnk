import { useState } from 'react';

const guides = [
  { label: 'No Roofing Exp', steps: ['Labor + Safety Training (OSHA 10)', 'Work Under Licensed Contractor', 'HAAG Certification ($800)', 'GAF Master Elite Application'] },
  { label: 'Roofing Laborer', steps: ['HAAG Residential Inspector Cert', 'Manufacturer Certification (GAF/OC)', 'Get Business Insurance ($2K/yr)', 'Register LLC + ProLnk Profile'] },
  { label: 'Lead/Crew Chief', steps: ['HAAG + Manufacturer Certs', 'General Liability + Workers Comp', 'Texas DBA or LLC Registration', 'ProLnk Verified Contractor Status'] },
  { label: 'Own Business', steps: ['Manufacturer Elite Status (GAF/OC)', 'ProLnk Lead Subscription', 'Storm Season DFW Positioning', 'Scale to $500K+ Revenue'] },
];

export default function DFWRoofingCareerGuide2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠⛈️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Roofing Career Guide 2026</h1>
          <p style={{ color: '#8fa3c0', fontSize: 16 }}>Start a roofing business in Dallas-Fort Worth — no state license required, but credentials matter</p>
        </div>

        <div style={{ background: '#1a0a0a', borderRadius: 12, padding: 16, marginBottom: 24, border: '1px solid #8b2020′ }}>
          <div style={{ fontWeight: 700, color: '#ff6b6b', marginBottom: 4 }}>⚠️ Know Before You Start</div>
          <div style={{ color: '#ffaaaa', fontSize: 13 }}>Texas has NO state roofing license — this creates opportunity but also floods DFW with unqualified contractors. Certifications are your competitive moat and your protection against liability.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[{ icon: '🔍', title: 'HAAG Certification', detail: 'Industry gold standard for storm/hail damage assessment — $800 exam, required by major insurers' },
            { icon: '⭐', title: 'GAF Master Elite', detail: 'Only 3% of roofers qualify — requires training, insurance, and track record. Unlocks premium jobs' },
            { icon: '🛡️', title: 'Owens Corning Preferred', detail: 'Manufacturer certification with warranty backing — homeowners specifically search for this credential' },
            { icon: '📄', title: 'Insurance Required', detail: 'General liability ($1M min) + workers comp if you have employees — non-negotiable for ProLnk verification' }].map((c, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#8fa3c0', fontSize: 13 }}>{c.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 14, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>📊 DFW Roofing Market 2026</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[['$18K–$28K', 'Avg Residential Roof Job'], ['Storm Season', 'Apr–Sep Peak Demand'], ['$500K+', 'Solo Operator Revenue Cap']].map(([val, lbl], i) => (
              <div key={i} style={{ textAlign: 'center', background: '#0A1628', borderRadius: 8, padding: '14px 8px' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642′ }}>{val}</div>
                <div style={{ color: '#8fa3c0', fontSize: 12, marginTop: 4 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 14, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16 }}>🗺️ Your DFW Roofing Business Setup Guide</div>
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
          <div style={{ fontSize: 24, marginBottom: 8 }}>🏠</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#0A1628', marginBottom: 6 }}>DFW Roofers: Get Verified on ProLnk</div>
          <div style={{ color: '#1a2f50', fontSize: 14 }}>ProLnk verifies insurance, certifications, and reviews — giving homeowners confidence and giving you a steady flow of DFW storm-season leads.</div>
        </div>
      </div>
    </div>
  );
}