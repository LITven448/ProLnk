import { useState } from 'react';

const situations = [
  { id: 'app', label: '🔥 APP Modified Bitumen', tip: 'APP (Atactic Polypropylene) is torch-applied and performs better in sustained DFW heat. More rigid than SBS but excels in high UV environments above 95°F.' },
  { id: 'sbs', label: '❄️ SBS Modified Bitumen', tip: 'SBS (Styrene Butadiene Styrene) is more flexible, handles DFW\'s winter temperature swings better. Cold-process application avoids open-flame liability on occupied buildings.' },
  { id: 'granulated', label: '⚪ Granulated vs Smooth', tip: 'Granulated cap sheet is strongly preferred in DFW — reflects UV radiation, extends membrane life 3–5 years. Smooth cap is cheaper but degrades faster in 100°F+ summers.' },
  { id: 'timing', label: '🌡️ Installation Timing', tip: 'Best installation windows: March–April and October–November. July/August torch work risks membrane bubbling and adhesive failure. Schedule around DFW heat if possible.' },
  { id: 'inspection', label: '🔍 Inspection Signs', tip: 'Look for blistering, alligatoring, or granule loss. In DFW, expect 10–15 year cap sheet life. Document condition annually in ProLnk Vault for insurance purposes.' },
];

export default function DFWRoofingCapper2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>ProLnk · DFW Roofing Series</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          🏚️ DFW Roofing Cap Sheet Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          Modified bitumen cap sheets are the finish layer on DFW flat roofs. APP vs SBS, granulated vs smooth, torch vs cold-process — the right combination for DFW's UV intensity and heat load means the difference between a 10-year and 20-year roof.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '☀️', label: 'DFW Annual UV Index', value: 'High (5.5 avg)' },
            { icon: '🌡️', label: 'Peak Roof Surface Temp', value: '150–180°F' },
            { icon: '📅', label: 'Cap Sheet Lifespan DFW', value: '10–15 years' },
            { icon: '✅', label: 'Best Choice for DFW', value: 'APP + Granulated' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{stat.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1rem' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>Select Your Flat Roof Situation</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {situations.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{
                background: selected === s.id ? '#F5E642' : '#0f2040',
                color: selected === s.id ? '#0A1628' : '#fff',
                border: '1px solid #1e3a5f',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0f2040', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>{active.label}</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{active.tip}</p>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🔧 DFW Cap Sheet Best Practices</div>
          {[
            'Choose granulated cap sheet for all DFW flat roofs',
            'APP torch-applied preferred for maximum heat resistance',
            'Schedule installation spring or fall — avoid July/August',
            'Inspect after every hail event (DFW averages 3–5 per year)',
            'Recoat with reflective coating at 7–8 year mark',
            'Document condition photos annually in ProLnk Vault',
          ].map(item => (
            <div key={item} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.6rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              <span style={{ color: '#F5E642' }}>✓</span>{item}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk Home Health Vault · DFW Roofing Series 2026
        </div>
      </div>
    </div>
  );
}