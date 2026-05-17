import { useState } from 'react';

export default function DFWRoofingFoundationConnections2026() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState('');

  const concerns = [
    { id: 'leak_found', label: '💧 Active roof leak + Foundation cracks' },
    { id: 'gutters', label: '🌧️ Gutter problems + Uneven floors' },
    { id: 'drainage', label: '🏞️ Yard drainage issues + Foundation movement' },
    { id: 'vault', label: '📁 Documenting both for Home Health Vault' },
  ];

  const results: Record<string, string> = {
    leak_found: 'Roof leaks saturate soil at the perimeter of the home. DFW clay soil responds dramatically to moisture — localized saturation causes foundation heave under that corner. Fix the roof first to stop moisture source, then assess foundation uplift damage.',
    gutters: 'Clogged or improperly pitched gutters dump water directly against the foundation. In DFW clay, this causes localized heave in wet season and accelerated shrinkage in drought. Both issues require coordinated roofer + foundation pro assessment.',
    drainage: 'Improper yard grading sends water toward the foundation after every rain. This is the single biggest cause of DFW foundation problems. ProLnk connects roofing pros (gutter/drainage) with foundation specialists for a complete perimeter assessment.',
    vault: 'ProLnk Home Health Vault documents both roof condition (age, material, last inspection) and foundation condition (pier locations, leveling history, soil reports). This dual documentation increases home value and is required for most DFW real estate disclosures.',
  };

  function assess() {
    if (concern) setResult(results[concern]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>DFW HOME SYSTEMS — ROOF + FOUNDATION</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Roof and Foundation Connection Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>How DFW roofing and foundation systems are linked — and why fixing one without the other fails.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>💧 The Water Cycle That Destroys DFW Homes</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            Roof leak → water penetrates exterior → saturates soil at foundation perimeter → DFW clay expands (heave) → floor becomes uneven → interior doors stick → cracks appear in drywall. This cascade is fully preventable with coordinated roof and foundation maintenance.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🏠', title: 'Gutters Are the Bridge', body: 'Properly functioning gutters move water 6+ feet from the foundation. In DFW, a 1-inch rain event deposits 600+ gallons on the average roof. Where that water goes determines foundation health over the next 10 years.' },
            { icon: '🌱', title: 'Soil Saturation = Heave', body: 'DFW Blackland Prairie clay can expand up to 30% in volume when saturated. Localized saturation from a roof or gutter failure causes uneven heave that cracks slabs, breaks piers, and misaligns door frames.' },
            { icon: '📋', title: 'Disclosure Requirements', body: 'Texas real estate law requires disclosure of known foundation repairs and roof age/condition. Home Health Vault provides documented, timestamped records of both systems — protecting sellers and informing buyers.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#112240', borderRadius: 12, padding: 20, display: 'flex', gap: 16 }}>
              <div style={{ fontSize: 32 }}>{c.icon}</div>
              <div>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 Dual System Interaction Guide</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16, fontSize: 14 }}>What is your concern?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => { setConcern(c.id); setResult(''); }}
                style={{ background: concern === c.id ? '#F5E642' : '#1e3a5f', color: concern === c.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
                {c.label}
              </button>
            ))}
          </div>
          <button onClick={assess} disabled={!concern}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 800, cursor: concern ? 'pointer' : 'not-allowed', opacity: concern ? 1 : 0.5 }}>
            Show System Interaction Guide →
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642' }}>
              <p style={{ color: '#fff', lineHeight: 1.6 }}>{result}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16, marginBottom: 8 }}>🏠 ProLnk Coordinates Roof + Foundation Pros</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>One request → roofing and foundation specialists dispatched together. Health Vault documents both systems permanently.</div>
        </div>
      </div>
    </div>
  );
}
