import { useState } from 'react';

const materials = [
  {
    id: 'fiberglass-batt',
    name: 'Fiberglass Batt',
    emoji: '🧱',
    rValue: 'R-13 to R-21',
    costPerSqFt: '0.40–0.80',
    dfwNote: 'Standard choice, works well in DFW walls and floors but leaves gaps in irregular attics',
    bestFor: 'New construction walls & floors',
    diyFriendly: true,
    applications: ['walls', 'floors'],
  },
  {
    id: 'blown-fiberglass',
    name: 'Blown-In Fiberglass',
    emoji: '💨',
    rValue: 'R-30 to R-60',
    costPerSqFt: '0.90–1.50',
    dfwNote: 'Best retrofit for DFW attics — fills every gap, critical given 100°F+ attic temps',
    bestFor: 'Existing attics',
    diyFriendly: false,
    applications: ['attic', 'walls'],
  },
  {
    id: 'open-cell',
    name: 'Open-Cell Spray Foam',
    emoji: '🫧',
    rValue: 'R-3.5 per inch',
    costPerSqFt: '1.00–1.50',
    dfwNote: 'Great for DFW irregular spaces, allows some vapor movement — good for humid east DFW zones',
    bestFor: 'Crawlspaces & irregular cavities',
    diyFriendly: false,
    applications: ['crawlspace', 'walls', 'attic'],
  },
  {
    id: 'closed-cell',
    name: 'Closed-Cell Spray Foam',
    emoji: '🛡️',
    rValue: 'R-6 to R-7 per inch',
    costPerSqFt: '2.00–3.50',
    dfwNote: 'Vapor barrier + insulation in one — premium choice for DFW attics and flood-prone areas',
    bestFor: 'Attics, basements, high-moisture areas',
    diyFriendly: false,
    applications: ['attic', 'basement', 'walls'],
  },
  {
    id: 'rigid-foam',
    name: 'Rigid Foam Board',
    emoji: '📋',
    rValue: 'R-3.8 to R-6.5 per inch',
    costPerSqFt: '0.25–0.65',
    dfwNote: 'Excellent for DFW exterior walls (continuous insulation) and under slab to block ground heat',
    bestFor: 'Exterior walls, foundations, under slab',
    diyFriendly: true,
    applications: ['walls', 'foundation'],
  },
];

export default function DFWInsulationMaterialsCompared() {
  const [application, setApplication] = useState<string>('attic');
  const [location, setLocation] = useState<string>('suburban');
  const [budget, setBudget] = useState<number>(2);
  const [selected, setSelected] = useState<string | null>(null);

  const getRecommendation = () => {
    if (application === 'attic' && budget >= 3) return 'closed-cell';
    if (application === 'attic') return 'blown-fiberglass';
    if (application === 'crawlspace') return 'open-cell';
    if (application === 'foundation') return 'rigid-foam';
    if (application === 'walls' && budget >= 3) return 'closed-cell';
    if (application === 'walls' && budget === 1) return 'fiberglass-batt';
    return 'blown-fiberglass';
  };

  const rec = getRecommendation();
  const filtered = materials.filter(m => m.applications.includes(application));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🌡️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Insulation Materials Compared</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>North Texas attics hit 160°F in summer — insulation choice is critical</p>
        </div>

        <div style={{ background: '#1a1020', borderRadius: 12, padding: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🏠</span>
          <div>
            <div style={{ fontWeight: 600, color: '#F5E642′ }}>DFW Insulation Context</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Texas Energy Code requires R-38 minimum in attics. DFW's extreme heat makes the right insulation material a major factor in your energy bills.</div>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎯 Your Project Details</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Application Area</label>
              <select value={application} onChange={e => setApplication(e.target.value)}
                style={{ width: '100%', background: '#1a3050', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="attic">Attic (most critical in DFW)</option>
                <option value="walls">Exterior walls</option>
                <option value="crawlspace">Crawlspace</option>
                <option value="foundation">Foundation / under slab</option>
                <option value="basement">Basement (rare in DFW)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 6 }}>DFW Location Zone</label>
              <select value={location} onChange={e => setLocation(e.target.value)}
                style={{ width: '100%', background: '#1a3050', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="suburban">Suburban DFW (Plano, Frisco, McKinney)</option>
                <option value="urban">Urban (Dallas / Fort Worth core)</option>
                <option value="east">East DFW (more humid — Rockwall, Garland)</option>
                <option value="west">West DFW (drier — Weatherford, Azle)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Budget Priority</label>
              <select value={budget} onChange={e => setBudget(Number(e.target.value))}
                style={{ width: '100%', background: '#1a3050', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value={1}>Lowest upfront cost</option>
                <option value={2}>Balance cost and performance</option>
                <option value={3}>Best performance, ROI focused</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ background: '#0f3020', border: '2px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>⭐ BEST INSULATION FOR YOUR DFW PROJECT</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{materials.find(m => m.id === rec)?.emoji} {materials.find(m => m.id === rec)?.name}</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginTop: 4 }}>{materials.find(m => m.id === rec)?.dfwNote}</div>
          <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Best for: {materials.find(m => m.id === rec)?.bestFor}</div>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {(filtered.length > 0 ? filtered : materials).map(m => (
            <div key={m.id} onClick={() => setSelected(selected === m.id ? null : m.id)}
              style={{ background: selected === m.id ? '#0f2040′ : '#0f1e35', border: `1px solid ${m.id === rec ? '#F5E642' : '#1e3a5f'}`, borderRadius: 12, padding: 20, cursor: ’pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{m.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{m.name} {m.id === rec && <span style={{ background: '#F5E642', color: '#0A1628', fontSize: 11, padding: '2px 8px', borderRadius: 4, marginLeft: 6 }}>BEST FIT</span>}</div>
                    <div style={{ color: '#94a3b8', fontSize: 13 }}>{m.rValue} · ${m.costPerSqFt}/sq ft</div>
                  </div>
                </div>
                <div style={{ background: m.diyFriendly ? '#0f3020′ : '#2a1010', borderRadius: 8, padding: '4px 10px', fontSize: 12, color: m.diyFriendly ? '#4ade80' : '#f87171' }}>
                  {m.diyFriendly ? '🔧 DIY OK' : '👷 Pro Install'}
                </div>
              </div>
              {selected === m.id && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #1e3a5f', color: '#94a3b8', fontSize: 14 }}>
                  🌡️ <strong>DFW Note:</strong> {m.dfwNote}
                  <div style={{ marginTop: 8 }}>✅ <strong>Best for:</strong> {m.bestFor}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#0f2040', borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>Connect with a DFW insulation specialist</div>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer' }}>❄️ Get Free DFW Insulation Quote</button>
        </div>
      </div>
    </div>
  );
}
