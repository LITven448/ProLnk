import { useState } from 'react';

const levels = [
  { id: 'curious', label: 'Just starting to learn about foundations', icon: '🌱', entry: 'Start with: DFW Clay Soil Science 101, What is a Pier and Beam Foundation, and Signs Your Foundation Needs Attention. These three pages cover 80% of what most DFW homeowners need to know.' },
  { id: 'issue', label: 'Noticing cracks or door issues', icon: '⚠️', entry: 'Go straight to: DFW Foundation Warning Signs Guide, Diagonal Crack Patterns Explained, and When to Call a Foundation Engineer. Pair with our DFW Soil Moisture Calendar.' },
  { id: 'estimate', label: 'Getting foundation repair estimates', icon: '💰', entry: 'Read: DFW Foundation Repair Cost Guide 2026, Pier Types Compared (steel vs concrete vs helical), and How to Evaluate a Foundation Warranty. Also see our Contractor Questions Checklist.' },
  { id: 'posttension', label: 'Have a post-tension slab', icon: '🏗️', entry: 'Post-tension is common in DFW builds from the 1980s onward. Read: Post-Tension Slab Guide DFW, PT Cable Repair Risks, and PT vs Traditional Slab Repair Options. Do not let uninformed contractors drill randomly.' },
  { id: 'warranty', label: 'Comparing foundation warranties', icon: '📄', entry: 'Our Warranty Deep-Dive section covers: Lifetime vs 10-Year Warranty Comparison, Transferability When Selling a DFW Home, and What Voids a Foundation Warranty. Critical before signing any contract.' },
];

const stats = [
  { label: 'Total DFW homeowner pages', value: '5,000+' },
  { label: 'Foundation-specific pages', value: '200+' },
  { label: 'Cities covered', value: '100+' },
  { label: 'Pier types documented', value: '8′ },
];

export default function DFWFoundation5000Milestone2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = levels.find(l => l.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>ProLnk DFW · Milestone 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Foundation Resources: 5,000 Pages Milestone</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          ProLnk has reached 5,000 pages of DFW homeowner content — and the foundation section alone spans 200+ pages. From clay soil science to post-tension slabs to warranty comparison, we have built the most comprehensive DFW foundation resource in existence.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: '#0f2037', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 700 }}>{s.value}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2037', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 12 }}>🏆 What 200+ Foundation Pages Covers</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.9, paddingLeft: 20 }}>
            <li>Clay soil science: Blackland Prairie, Grand Prairie, and Trinity aquifer zones</li>
            <li>All pier types: steel push, helical, pressed concrete, drilled bell-bottom</li>
            <li>Post-tension slab guides — the most underserved DFW homeowner topic</li>
            <li>Seasonal soil moisture calendars by DFW sub-region</li>
            <li>Warranty comparison matrix across 15 DFW foundation contractors</li>
            <li>Foundation + plumbing interaction guides (most companies hide this)</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 18, marginBottom: 12 }}>📚 Where should you start?</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {levels.map(l => (
            <button
              key={l.id}
              onClick={() => setSelected(l.id)}
              style={{
                background: selected === l.id ? '#1a3a5c' : '#0f2037',
                border: selected === l.id ? '2px solid #F5E642′ : '2px solid #1e3a5f',
                borderRadius: 8, padding: '12px 16px', color: '#fff',
                textAlign: 'left', cursor: 'pointer', fontSize: 15,
              }}
            >
              {l.icon} {l.label}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ background: '#0f2037', border: '1px solid #F5E642', borderRadius: 10, padding: 20, marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{result.icon} Your Entry Point</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{result.entry}</p>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏠 Match with a DFW Foundation Pro</div>
          <p style={{ color: '#0A1628', fontSize: 14 }}>ProLnk matches DFW homeowners with vetted foundation specialists. No cold calls — just the right contractor for your soil zone and foundation type.</p>
        </div>
      </div>
    </div>
  );
}
