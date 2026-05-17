import { useState } from 'react';

const categories = [
  {
    key: 'hvac', emoji: '❄️', label: 'HVAC System', color: '#3b82f6',
    fields: ['System brand & model', 'Install year', 'Refrigerant type', 'Filter size (e.g. 16x25x1)', 'MERV rating', 'Last tune-up date', 'Warranty expiration'],
    trackAnnually: ['Replace filter every 90 days', 'Annual professional tune-up (March/April before summer)', 'Clean condensate drain line', 'Check float switch functionality', 'Inspect ductwork for leaks'],
    vaultNote: 'ProLnk Vault auto-logs every service visit, filter change reminder, and stores warranty documents with zero effort.',
  },
  {
    key: 'foundation', emoji: '🏠', label: 'Foundation', color: '#8b5cf6',
    fields: ['Foundation type (slab/pier & beam)', 'Last elevation survey date', 'Engineer name & contact', 'Watering schedule (seasonal)', 'Gutters & drainage notes', 'Any known cracks or movement'],
    trackAnnually: ['Annual elevation survey (especially after drought or heavy rain)', 'Inspect perimeter for new cracks each spring', 'Adjust soaker hose schedule seasonally', 'Clean gutters twice yearly to redirect water away from foundation'],
    vaultNote: 'ProLnk Vault stores your elevation surveys, engineer reports, and watering logs — creating a chain-of-care record that adds resale value.',
  },
  {
    key: 'roof', emoji: '⛈️', label: 'Roof', color: '#ef4444',
    fields: ['Shingle brand & type', 'Install year & age', 'Wind resistance rating (mph)', 'Hail resistance rating (Class 1-4)', 'Roofing contractor name', 'Warranty (manufacturer + labor)', 'Last inspection date'],
    trackAnnually: ['Annual inspection — especially after any DFW hail event', 'Check attic for leaks after every major storm', 'Clear debris from valleys and gutters each fall', 'Document every hail event with date and storm report'],
    vaultNote: 'ProLnk Vault captures storm events at your address automatically and stores inspection reports — critical evidence for insurance claims.',
  },
  {
    key: 'water', emoji: '💧', label: 'Water Heater', color: '#06b6d4',
    fields: ['Brand & model', 'Tank vs tankless', 'Gallon capacity', 'Install year', 'Anode rod last replaced', 'Warranty expiration', 'Shutoff valve location'],
    trackAnnually: ['Flush tank annually to remove sediment', 'Test pressure relief valve', 'Inspect anode rod every 2-3 years', 'Check for corrosion at connections', 'Plan replacement at 10-12 year mark'],
    vaultNote: 'ProLnk Vault tracks your water heater age and sends you a heads-up before it fails — the average DFW water heater emergency costs $1,200+ after-hours.',
  },
  {
    key: 'electrical', emoji: '⚡', label: 'Electrical Panel', color: '#F5E642',
    fields: ['Panel brand (note: Federal Pacific = hazard)', 'Amperage (100A, 200A, 400A)', 'Install year', 'AFCI/GFCI breakers present?', 'Last inspection year', 'Electrician contact used', 'Main shutoff location'],
    trackAnnually: ['Annual visual inspection of panel', 'Test all GFCI outlets (press test button)', 'Check for tripped breakers or signs of heat', 'Verify smoke/CO detector placement and battery status'],
    vaultNote: 'ProLnk Vault flags if your panel brand is in a known hazard category and connects you with licensed electricians proactively.',
  },
  {
    key: 'plumbing', emoji: '🔧', label: 'Plumbing & Pipes', color: '#22c55e',
    fields: ['Pipe material (copper, PVC, CPVC, galvanized, PEX)', 'Main shutoff location', 'Water meter location', 'Last known plumbing service', 'Irrigation system present?', 'Water softener present?', 'Sewer last inspected (camera)'],
    trackAnnually: ['Locate and test main shutoff every year', 'Flush water softener/check salt level monthly', 'Inspect irrigation system each spring', 'Consider sewer camera inspection every 5 years', 'Winterize outdoor hose bibs before freezes (critical in DFW)'],
    vaultNote: 'ProLnk Vault records your pipe materials and shutoff locations — searchable by future owners and essential for any insurance claim or emergency.',
  },
];

export default function DFWHomeownerKnowledgeBase2026() {
  const [active, setActive] = useState<string | null>(null);

  const cat = categories.find(c => c.key === active);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📚</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>DFW Complete Homeowner Knowledge Base 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Your DFW home at a glance — select a system to explore</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 28 }}>
          {categories.map(c => (
            <button key={c.key} onClick={() => setActive(active === c.key ? null : c.key)}
              style={{ background: active === c.key ? c.color : '#0f2040', border: `2px solid ${active === c.key ? c.color : '#1e3a5f'}`, borderRadius: 12, padding: '16px 12px', cursor: 'pointer', textAlign: 'center', color: '#fff', transition: 'all 0.15s' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{c.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{c.label}</div>
            </button>
          ))}
        </div>

        {cat && (
          <div style={{ background: '#0f2040', borderRadius: 16, padding: 24, border: `2px solid ${cat.color}`, marginBottom: 20 }}>
            <h2 style={{ color: cat.color, fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{cat.emoji} {cat.label} — What to Record</h2>

            <div style={{ marginBottom: 20 }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>📝 Key Facts to Know About Your {cat.label}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {cat.fields.map((f, i) => (
                  <div key={i} style={{ background: '#1e3a5f', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: cat.color }}>•</span> {f}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>📅 Track Annually in DFW</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {cat.trackAnnually.map((t, i) => (
                  <div key={i} style={{ background: '#1e3a5f', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#cbd5e1', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: '#22c55e', flexShrink: 0 }}>✅</span> {t}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: `4px solid #F5E642` }}>
              <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>🔒 How ProLnk Vault Handles This Automatically</p>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{cat.vaultNote}</p>
            </div>
          </div>
        )}

        {!active && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #1e3a5f' }}>
            <p style={{ color: '#94a3b8', fontSize: 14 }}>👆 Select a system above to see what to record, what to track annually, and how ProLnk Vault automates it for your DFW home.</p>
          </div>
        )}

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 24 }}>Powered by ProLnk · Dallas–Fort Worth Home Intelligence</p>
      </div>
    </div>
  );
}
