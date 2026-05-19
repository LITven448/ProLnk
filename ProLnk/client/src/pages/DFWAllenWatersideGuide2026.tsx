import { useState } from 'react';

const communityTypes = [
  { id: 'lake-adjacent', label: '🌊 Lake-Adjacent Home', tips: ['Moisture vapor barrier under slab critical near Lake Lavon spillover zone', 'Check French drain and grading every spring before heavy rain season', 'HVAC outdoor units: verify pad elevation above 100-year flood mark'] },
  { id: 'hoa-amenity', label: '🏊 HOA Amenity Community', tips: ['HOA manages pool, trails, and common areas — review annual assessment history', 'Allen HOA communities typically enforce 72-hour notice for contractor vehicles', 'Amenity-driven pricing: maintain curb appeal to preserve comp advantage'] },
  { id: 'premium-suburban', label: '🏡 Premium Suburban Home', tips: ['2005-2020 Allen builds use zip system sheathing — inspect flashing at all transitions', 'Premium pricing tier means buyers expect move-in condition — pre-list inspection essential', 'Smart thermostat and irrigation upgrades yield measurable Allen resale lift'] },
];

const allenFacts = [
  'Allen ISD school ratings are a top driver of demand — mention in all listing descriptions',
  'Lake Lavon spillover creates micro-climate: humidity runs 5-8% higher than central Allen',
  'Premium pricing: Allen waterside homes trade 12-18% above non-lake Allen comparables',
  'HOA-managed amenities typically include trail access, pool, and playground maintenance',
];

export default function DFWAllenWatersideGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = communityTypes.find(c => c.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>ALLEN · WATERSIDE · 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '12px 0 6px' }}>🌊 Allen Waterside Homeowner Guide</h1>
        <p style={{ color: '#8899aa', marginBottom: 28 }}>Lake Lavon corridor · Premium Allen pricing · 2005–2020 builds · HOA-managed amenities</p>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>📍 Area Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[{ icon: '🏗️', label: 'Build Era', val: '2005–2020' }, { icon: '💧', label: 'Water Feature', val: 'Lake Lavon' }, { icon: '📈', label: 'Lake Premium', val: '12–18%' }, { icon: '📋', label: 'HOA', val: 'Amenity-Managed' }].map(s => (
              <div key={s.label} style={{ background: '#162236', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ fontSize: 20 }}>{s.icon}</div>
                <div style={{ fontSize: 11, color: '#8899aa', marginTop: 4 }}>{s.label}</div>
                <div style={{ fontWeight: 700, marginTop: 2 }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>🔍 Select Your Community Type</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {communityTypes.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id === selected ? null : c.id)}
                style={{ background: selected === c.id ? '#F5E642' : '#162236', color: selected === c.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {c.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#162236', borderRadius: 10, padding: 16 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 14 }}>{active.label} — Lakeside Owner Guide</h3>
              {active.tips.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: '#F5E642' }}>✓</span>
                  <span style={{ color: '#ccd6e0', fontSize: 14 }}>{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>🏞️ Allen Waterside Key Facts</h2>
          {allenFacts.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642' }}>→</span>
              <span style={{ color: '#ccd6e0', fontSize: 14 }}>{f}</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#445566', fontSize: 12, marginTop: 32 }}>ProLnk · Allen Waterside · 2026</p>
      </div>
    </div>
  );
}
