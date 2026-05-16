import { useState } from 'react';

const SITUATIONS = [
  { id: 'buying', label: '🏠 Buying a Home' },
  { id: 'cracking', label: '🧱 Seeing Cracks' },
  { id: 'permit', label: '📋 Need Permit' },
  { id: 'lawsuit', label: '⚖️ Legal Dispute' },
];

const GUIDES: Record<string, { title: string; items: string[] }> = {
  'buying': {
    title: 'PE Report for Home Purchase',
    items: [
      '📐 Site inspection: PE walks property and foundation perimeter',
      '📏 Elevation survey: measures foundation level at 12+ points',
      '📊 Movement history: reviews prior repairs, piers, or reports',
      '🪨 Soil conditions: expansive clay content in DFW causes most issues',
      '💰 Cost: $400-700 for full PE report with stamp',
      '✅ Recommendation: require PE report on any DFW home built pre-2000',
    ],
  },
  'cracking': {
    title: 'PE Report for Active Movement',
    items: [
      '📐 Elevation survey documents current differential — the key number',
      '🔍 Cause identification: plumbing leak vs. drainage vs. soil shrink',
      '🧱 Crack mapping: PE photos and classifies all visible cracks',
      '🔧 Remediation scope: how many piers, where, what depth',
      '📄 Report becomes your contractor bid spec — apples-to-apples',
      '⚠️ DFW clay: 2-3" of seasonal movement is normal; 4"+ needs action',
    ],
  },
  'permit': {
    title: 'PE Report for Permit Applications',
    items: [
      '🏛️ City of Dallas requires PE stamp for structural foundation work',
      '📋 Report must include: site plan, elevation data, remediation design',
      '✍️ PE signs and seals drawings for permit submittal',
      '⏱️ Timeline: report in 3-7 days; permit review 2-4 weeks in DFW',
      '💰 PE report ($400-700) + permit fees ($200-500) typical in DFW',
      '📐 Without PE stamp, permit denied — no exceptions in most DFW cities',
    ],
  },
  'lawsuit': {
    title: 'PE Report for Legal Disputes',
    items: [
      '⚖️ PE as expert witness: report becomes legal document',
      '📊 Before/after documentation: establishes causation timeline',
      '🧪 Soil testing addendum: lab results support PE findings',
      '📸 Photo documentation: PE catalogs all defects at time of inspection',
      '💰 Expert PE reports: $800-1500 when litigation is involved',
      '🔍 Choose PE with DFW-specific experience and prior court testimony',
    ],
  },
};

export default function DFWFoundationEngineerReport2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
          PROLNK DFW RESOURCE GUIDE 2026
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🏗️ DFW Foundation Engineer Report Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          What a Professional Engineer (PE) report covers for DFW foundations — and exactly when you need one. DFW expansive clay means most homeowners need this at some point.
        </p>

        <div style={{ background: '#132237', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
            What is your situation?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {SITUATIONS.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  background: selected === s.id ? '#F5E642' : '#1e3a5f',
                  color: selected === s.id ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: '8px', padding: '0.75rem',
                  fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ background: '#132237', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', fontWeight: 800, marginBottom: '1rem' }}>{GUIDES[selected].title}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {GUIDES[selected].items.map((item, i) => (
                <li key={i} style={{ padding: '0.75rem', borderBottom: '1px solid #1e3a5f', lineHeight: 1.5, color: '#cbd5e1' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, marginBottom: '0.25rem' }}>Find a DFW Foundation Contractor</div>
          <div style={{ color: '#1e3a5f', fontSize: '0.9rem' }}>ProLnk matches you with vetted foundation specialists in your area</div>
        </div>
      </div>
    </div>
  );
}
