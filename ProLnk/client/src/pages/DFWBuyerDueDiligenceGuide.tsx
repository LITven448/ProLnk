import { useState } from 'react';

const dueDiligenceItems: Record<string, { items: { task: string; time: string; cost: string }[] }> = {
  new: {
    items: [
      { task: 'General home inspection', time: '3-4 hours', cost: '$400-600' },
      { task: 'Foundation inspection', time: '1-2 hours', cost: '$300-500' },
      { task: 'Roof inspection', time: '1 hour', cost: '$150-300' },
      { task: 'HVAC inspection', time: '1 hour', cost: '$100-200' },
      { task: 'Title search', time: '3-5 days', cost: '$200-400' },
      { task: 'Survey (if not available)', time: '5-7 days', cost: '$400-800' },
      { task: 'Flood zone check (FEMA)', time: '30 min', cost: 'Free' },
      { task: 'HOA document review', time: '1-2 days', cost: 'Free-$250' },
      { task: 'Property tax history (DCAD/TCAD)', time: '30 min', cost: 'Free' },
    ],
  },
  older: {
    items: [
      { task: 'Full home inspection + sewer scope', time: '4-5 hours', cost: '$500-900' },
      { task: 'Foundation + drainage engineer', time: '2-3 hours', cost: '$500-800' },
      { task: 'Electrical panel inspection', time: '1 hour', cost: '$100-200' },
      { task: 'Plumbing pressure test', time: '1-2 hours', cost: '$150-300' },
      { task: 'Permit history pull (city portal)', time: '1-2 hours', cost: 'Free-$50' },
      { task: 'Environmental test (asbestos/lead if pre-1980)', time: '1-2 days', cost: '$200-600' },
      { task: 'Title search + lien check', time: '3-5 days', cost: '$200-400' },
      { task: 'Flood zone + drainage history', time: '1 hour', cost: 'Free' },
      { task: 'Neighborhood crime stats review', time: '1 hour', cost: 'Free' },
    ],
  },
};

const ageGroups = [
  { key: 'new', label: '0–15 years old' },
  { key: 'older', label: '16+ years old' },
];

export default function DFWBuyerDueDiligenceGuide() {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏡 DFW Buyer Due Diligence Guide</div>
          <p style={{ fontSize: '1.05rem', color: '#374151' }}>
            Everything to investigate before closing on a DFW home. Texas is a seller-friendly state — buyers must do their homework. Use this guide to protect yourself.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>📋 Always-On Checklist (Every DFW Purchase)</div>
          {[
            ['🔍', 'Home inspection by TREC-licensed inspector'],
            ['📄', 'Seller disclosure statement review'],
            ['🗂️', 'Title commitment review with your attorney'],
            ['💧', 'Flood zone determination (FEMA FIRM map)'],
            ['🏘️', 'HOA docs: CC&Rs, bylaws, financials, minutes'],
            ['🗺️', 'Survey — boundary lines, easements, encroachments'],
            ['💰', 'Property tax history — check appraisal district (DCAD, TCAD, CCAD)'],
            ['🏗️', 'Permit history — verify unpermitted work'],
            ['🌆', 'Neighborhood development plans — city master plan + TxDOT projects'],
          ].map(([icon, text], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.5rem 0', borderBottom: i < 8 ? '1px solid #F3F4F6' : 'none' }}>
              <span style={{ fontSize: '1.2rem' }}>{icon}</span>
              <span style={{ fontSize: '0.95rem' }}>{text}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>🎯 Personalized Checklist by Home Age</div>
          <p style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '1rem' }}>Select the home's approximate age to see prioritized items with estimated time and cost:</p>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
            {ageGroups.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelectedAge(key)}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: 8,
                  border: '2px solid',
                  borderColor: selectedAge === key ? '#F5E642' : '#E5E7EB',
                  backgroundColor: selectedAge === key ? '#F5E642' : '#fff',
                  color: '#0A1628',
                  fontWeight: selectedAge === key ? 700 : 400,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {selectedAge && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.5rem', fontWeight: 700, fontSize: '0.85rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                <span>Task</span><span>Time</span><span>Est. Cost</span>
              </div>
              {dueDiligenceItems[selectedAge].items.map((item, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.5rem', padding: '0.5rem 0', borderTop: '1px solid #F3F4F6', fontSize: '0.9rem' }}>
                  <span>{item.task}</span>
                  <span style={{ color: '#6B7280', whiteSpace: 'nowrap' }}>{item.time}</span>
                  <span style={{ color: '#059669', whiteSpace: 'nowrap', fontWeight: 600 }}>{item.cost}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#FEF9C3', borderRadius: 12, padding: '1.5rem', border: '1px solid #FDE047' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>⚡ DFW-Specific Risks</div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.95rem', lineHeight: 1.8 }}>
            <li>Expansive clay soil causes foundation movement — get a structural engineer, not just an inspector</li>
            <li>DFW is in a 100-year flood plain patchwork — verify FEMA zone and check local drainage basin maps</li>
            <li>MUD (Municipal Utility Districts) add extra taxes — ask for the MUD tax rate before offer</li>
            <li>Rapid development means neighboring lots can change — check zoning maps at city GIS portals</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
