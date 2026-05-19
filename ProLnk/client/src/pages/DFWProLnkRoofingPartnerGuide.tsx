import { useState } from 'react';

const BIZ_TYPES = [
  { id: 'storm', label: '⛈️ Storm & Hail Specialist', opp: 'Priority hail damage matches post-storm', rate: '$8,000-$25,000/job', note: 'Insurance claim workflow built into ProLnk' },
  { id: 'replace', label: '🏠 Full Replacement Contractor', opp: 'Homeowner replacement matches 10-25yr roofs', rate: '$12,000-$40,000/job', note: 'DFW averages 1 major hail event/year' },
  { id: 'repair', label: '🔨 Repair & Patch Specialist', opp: 'Leak and repair matches, fast turnaround', rate: '$350-$3,500/job', note: 'High volume, repeat customer potential' },
  { id: 'commercial', label: '🏢 Commercial Roofer', opp: 'Multi-unit and commercial roof matches', rate: '$25,000-$250,000/project', note: 'DFW commercial construction booming' },
  { id: 'solar', label: '☀️ Solar-Ready Installer', opp: 'Solar roof prep and install matches', rate: '$15,000-$45,000/system', note: 'TX net metering driving demand surge' },
];

const HAIL_FACTS = [
  { stat: '1.2M+', label: 'DFW homes in our primary market' },
  { stat: '3.2', label: 'Average hail events per year in DFW' },
  { stat: '$4.1B', label: 'Annual hail damage in North Texas' },
  { stat: '72hrs', label: 'ProLnk post-storm match window' },
];

const TRUST_FEATURES = [
  { icon: '✅', title: 'License Verification', desc: 'ProLnk verifies all contractor licenses before activation — homeowners know you are legitimate' },
  { icon: '🛡️', title: 'Insurance Confirmation', desc: 'General liability and workers comp confirmed — reduces your liability exposure' },
  { icon: '⭐', title: 'Review System', desc: 'Verified homeowner reviews build your reputation in a market plagued by storm chasers' },
  { icon: '📋', title: 'Insurance Claim Workflow', desc: 'ProLnk guides homeowners through the claims process, delivering warmer leads to you' },
];

const STREAMS = [
  { icon: '💰', name: 'Storm Match Premium', desc: 'Post-hail storm matches delivered within 72 hours with 1.8x rate for emergency response' },
  { icon: '🔄', name: 'Annual Inspection Plans', desc: 'Convert replacements into $149/yr inspection agreements for recurring revenue' },
  { icon: '👥', name: 'Pro Network Override', desc: 'Recruit roofers to ProLnk — earn 1-4% of their match income 4 levels deep' },
  { icon: '🏠', name: 'Home Origination Rights', desc: 'Permanent platform revenue share on every home you first service through ProLnk' },
  { icon: '📋', name: 'Referral Subscriptions', desc: '10% recurring of $149/mo for every roofer you refer to ProLnk' },
];

export default function DFWProLnkRoofingPartnerGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const biz = BIZ_TYPES.find(b => b.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F5E642' }}>🏠 ProLnk Roofing Partner Guide</div>
          <div style={{ color: '#94A3B8', marginTop: '.5rem' }}>DFW roofers — hail matches, trust-building, storm chaser differentiation</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {HAIL_FACTS.map(f => (
            <div key={f.label} style={{ background: '#0F2035', borderRadius: 10, padding: '1.25rem', border: '1px solid #EF4444', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#F5E642' }}>{f.stat}</div>
              <div style={{ color: '#94A3B8', fontSize: '.8rem', marginTop: '.25rem' }}>{f.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>Select Your Roofing Business Type</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {BIZ_TYPES.map(b => (
              <button key={b.id} onClick={() => setSelected(b.id)}
                style={{ padding: '.85rem 1rem', borderRadius: 10, border: , background: selected === b.id ? '#F5E64222' : '#0A1628', color: '#fff', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
                {b.label}
              </button>
            ))}
          </div>
          {biz && (
            <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 10, padding: '1rem', border: '1px solid #EF4444' }}>
              <div style={{ color: '#EF4444', fontWeight: 700, marginBottom: '.5rem' }}>Your ProLnk Opportunity</div>
              <div style={{ color: '#CBD5E1' }}>📍 Match Type: <strong style={{ color: '#fff' }}>{biz.opp}</strong></div>
              <div style={{ color: '#CBD5E1', marginTop: '.25rem' }}>💵 Average Job: <strong style={{ color: '#F5E642' }}>{biz.rate}</strong></div>
              <div style={{ color: '#94A3B8', fontSize: '.85rem', marginTop: '.35rem' }}>⚡ {biz.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>How ProLnk Builds Your Trust vs. Storm Chasers</div>
          {TRUST_FEATURES.map(t => (
            <div key={t.title} style={{ display: 'flex', gap: '1rem', marginBottom: '.85rem' }}>
              <span style={{ fontSize: '1.4rem' }}>{t.icon}</span>
              <div>
                <div style={{ fontWeight: 600, color: '#fff' }}>{t.title}</div>
                <div style={{ color: '#94A3B8', fontSize: '.85rem' }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>5 Income Streams for Roofers</div>
          {STREAMS.map(s => (
            <div key={s.name} style={{ display: 'flex', gap: '1rem', marginBottom: '.75rem' }}>
              <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
              <div>
                <div style={{ fontWeight: 600, color: '#fff', fontSize: '.9rem' }}>{s.name}</div>
                <div style={{ color: '#94A3B8', fontSize: '.82rem' }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
