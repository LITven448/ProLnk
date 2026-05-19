import { useState } from 'react';

export default function MurphyTXHomeownerGuide2026() {
  const [communityType, setCommunityType] = useState<string | null>(null);

  const communities: Record<string, { label: string; priorities: string[] }> = {
    'master-planned': {
      label: 'Master-Planned Community',
      priorities: [
        '🏘️ HOA compliance audit — fence, exterior, landscaping',
        '🌿 Irrigation system seasonal tune-up for HOA standards',
        '🏊 Community amenity tie-ins — check shared infrastructure',
        '🌬️ HVAC efficiency — Murphy summer heat 100°F+',
        '🔧 Builder-grade finishes — upgrade fixtures proactively',
        '🏠 Roof inspection post-hail — Murphy storm exposure high',
        '🔒 Smart home integration — newer builds wired for it',
      ],
    },
    'established': {
      label: 'Established Subdivision',
      priorities: [
        '🏗️ Foundation check — Collin County clay soil expansion',
        '💧 Water heater approaching 15-year mark',
        '🌿 Tree canopy matured — limb clearance from roofline',
        '⚡ Electrical panel capacity for modern load',
        '🪟 Window seal failures — 2000s builds common issue',
        '🌬️ HVAC system 15-20 years — replacement planning',
        '🔧 Sewer camera inspection — root intrusion risk',
      ],
    },
    'newer': {
      label: 'Newer Build (2015+)',
      priorities: [
        '📋 Builder warranty expiration checklist — act before it lapses',
        '🏗️ Foundation settlement on new Collin County clay',
        '🌿 New landscaping establishment — proper drainage critical',
        '⚡ Surge protection installation — newer electronics dense',
        '🔧 Punch list items — builder follow-up before 1-year mark',
        '🌬️ HVAC filter and coil cleaning routine',
        '🏠 First 5-year roof and exterior sealant inspection',
      ],
    },
  };

  const selected = communityType ? communities[communityType] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏡</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
            Murphy TX Homeowner Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Small Collin County city — HOA-dense master-planned communities, newer infrastructure, 2000s–2015 builds
          </p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>⚠️ Murphy TX Homeowner Risk Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '📋', label: 'HOA Density', desc: 'High — exterior standards enforced strictly' },
              { icon: '🌍', label: 'Clay Soil', desc: 'Collin County expansive clay — foundation monitor' },
              { icon: '⛈️', label: 'Hail Risk', desc: 'DFW corridor — roof inspection after every storm' },
              { icon: '🌿', label: 'Irrigation Critical', desc: 'HOA lawn standards require working irrigation' },
            ].map((item) => (
              <div key={item.label} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#F5E642′ }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.3rem' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🏘️ Select Your Community Type</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {[
              { key: 'master-planned', label: 'Master-Planned' },
              { key: 'established', label: 'Established Subdivision' },
              { key: 'newer', label: 'Newer Build (2015+)' },
            ].map((opt) => (
              <button key={opt.key} onClick={() => setCommunityType(opt.key)} style={{ padding: '0.6rem 1.4rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, backgroundColor: communityType === opt.key ? '#F5E642′ : '#1e3a5f', color: communityType === opt.key ? '#0A1628' : '#fff' }}>
                {opt.label}
              </button>
            ))}
          </div>
          {selected && (
            <div>
              <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 {selected.label} — Murphy Maintenance Guide</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {selected.priorities.map((p) => (
                  <li key={p} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '0.5rem', color: '#e2e8f0', fontSize: '0.95rem' }}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#112240', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>ProLnk — Murphy Area Pros Ready</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Vetted local contractors serving Murphy, Plano, and Wylie</p>
        </div>
      </div>
    </div>
  );
}