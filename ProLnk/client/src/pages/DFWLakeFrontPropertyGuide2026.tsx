import { useState } from 'react';

const LAKES = [
  { id: 'lewisville', label: '🌊 Lake Lewisville', county: 'Denton County', notes: 'COE managed, dock permits via US Army Corps of Engineers' },
  { id: 'grapevine', label: '🌊 Lake Grapevine', county: 'Tarrant/Dallas County', notes: 'COE managed, strict dock regulations, annual permit renewal' },
  { id: 'rayhubbard', label: '🌊 Ray Hubbard', county: 'Dallas/Rockwall/Kaufman', notes: 'Dallas Water Utilities managed, permits via DWU' },
  { id: 'joepool', label: '🌊 Joe Pool Lake', county: 'Tarrant/Dallas/Ellis', notes: 'COE managed, limited private dock permits' },
  { id: 'lavon', label: '🌊 Lake Lavon', county: 'Collin County', notes: 'COE managed, NTMWD coordinates local permits' },
];

const FEATURES: Record<string, string[]> = {
  dock: ['Annual dock inspection for structural integrity', 'Check decking for rot or splinters every spring', 'Verify dock lighting meets USCG requirements', 'Inspect flotation and hardware for corrosion'],
  seawall: ['Inspect for cracks and efflorescence annually', 'Check weep holes are clear (drainage critical)', 'Monitor for soil erosion behind wall', 'Seawall cap inspection after freeze/thaw cycles'],
  boatlift: ['Lubricate cable and pulleys semi-annually', 'Check cradle bunks for wear each season', 'Test limit switches and electrical annually', 'Winter: lower to prevent ice damage'],
  hvac: ['Lake-adjacent homes see 15–20% higher humidity loads', 'Upgrade to dehumidifier with HVAC in lakefront homes', 'Inspect coils and drain lines twice per year', 'Condensate line blockages common in humid lake microclimates'],
};

const FEATURE_LABELS: Record<string, string> = {
  dock: '🪵 Dock Maintenance',
  seawall: '🧱 Seawall Inspection',
  boatlift: '⚓ Boat Lift Service',
  hvac: '❄️ Lake HVAC Considerations',
};

export default function DFWLakeFrontPropertyGuide2026() {
  const [selectedLake, setSelectedLake] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const lake = LAKES.find(l => l.id === selectedLake);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk · DFW Guides</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>⛵ DFW Lakefront Property Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          DFW's five major lakes — Lewisville, Grapevine, Ray Hubbard, Joe Pool, and Lavon — host thousands of lakefront properties. Dock permits, seawall integrity, shoreline erosion, and lake-specific HVAC demands require specialized contractors.
        </p>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📍 Select Your Lake</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {LAKES.map(l => (
              <button key={l.id} onClick={() => setSelectedLake(l.id)} style={{ padding: '12px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, textAlign: 'left', backgroundColor: selectedLake === l.id ? '#F5E642′ : '#1e2d4a', color: selectedLake === l.id ? '#0A1628' : '#fff' }}>
                {l.label} — {l.county}
              </button>
            ))}
          </div>
          {lake && (
            <div style={{ marginTop: 16, backgroundColor: '#0A1628', borderRadius: 8, padding: 14, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Permit Authority</div>
              <div style={{ color: '#cbd5e1', fontSize: 14 }}>{lake.notes}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔧 Lake Property Features → Maintenance Guide</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {Object.keys(FEATURE_LABELS).map(f => (
              <button key={f} onClick={() => setSelectedFeature(f)} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, backgroundColor: selectedFeature === f ? '#F5E642′ : '#1e2d4a', color: selectedFeature === f ? '#0A1628' : '#fff' }}>{FEATURE_LABELS[f]}</button>
            ))}
          </div>
          {selectedFeature && (
            <div>
              <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 15 }}>{FEATURE_LABELS[selectedFeature]}</h3>
              {FEATURES[selectedFeature].map((item, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e2d4a', fontSize: 14, color: '#cbd5e1′ }}>✅ {item}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🌊</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Shoreline Erosion</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Rip-rap (large stone) is the standard DFW lake erosion control. Requires Army COE permit if below normal pool elevation. Annual inspection recommended.</div>
          </div>
          <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>📄</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Dock Permits</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>COE-managed lakes: Section 404 permit required. DWU lakes: separate application to Dallas Water Utilities. New docks take 60–120 days for approval.</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <h2 style={{ color: '#0A1628', fontWeight: 800, marginBottom: 8 }}>Connect with Lakefront Property Pros</h2>
          <p style={{ color: '#0A1628', marginBottom: 16, fontSize: 14 }}>ProLnk connects DFW lake property owners with dock builders, seawall contractors, marine electricians, and HVAC specialists.</p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', border: 'none', padding: '12px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get Free Lakefront Property Quotes →</button>
        </div>
      </div>
    </div>
  );
}