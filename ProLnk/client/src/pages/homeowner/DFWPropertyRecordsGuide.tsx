import { useState } from 'react';

const checklistItems = [
  { id: 'cad', label: 'Look up property on county CAD website', category: 'Tax Records' },
  { id: 'ownership', label: 'Verify current ownership matches seller/landlord', category: 'Ownership' },
  { id: 'tax_history', label: 'Check 5-year tax assessment history for unusual jumps', category: 'Tax Records' },
  { id: 'tax_exempt', label: 'Check if homestead exemption is applied (if owner-occupied)', category: 'Tax Records' },
  { id: 'permits', label: 'Pull permit history from city permit portal', category: 'Permits' },
  { id: 'open_permits', label: 'Verify no open/expired permits on visible work', category: 'Permits' },
  { id: 'flood_fema', label: 'Check FEMA flood map (msc.fema.gov)', category: 'Flood' },
  { id: 'deed', label: 'Read deed for restrictions and easements', category: 'Ownership' },
  { id: 'liens', label: 'Run lien search through county courthouse records', category: 'Ownership' },
  { id: 'hoa', label: 'Verify HOA exists and get CC&Rs if applicable', category: 'Ownership' },
];

const resources = [
  { county: 'Collin County', url: 'collincad.org', color: '#1e3a5f', accent: '#60a5fa' },
  { county: 'Dallas County', url: 'dallascad.org', color: '#1a1a3a', accent: '#a78bfa' },
  { county: 'Denton County', url: 'dentoncad.com', color: '#0d2a1a', accent: '#4ade80' },
  { county: 'Tarrant County', url: 'tad.org', color: '#1a2030', accent: '#38bdf8' },
  { county: 'FEMA Flood Map', url: 'msc.fema.gov', color: '#2a1a0d', accent: '#fb923c' },
];

export default function DFWPropertyRecordsGuide() {
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (id: string) => {
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const byCategory = checklistItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof checklistItems>);

  const pct = Math.round((checked.length / checklistItems.length) * 100);

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', color: '#f0f0f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#1a2a1a', color: '#fb923c', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
            🏠 PROPERTY RESEARCH GUIDE
          </span>
        </div>

        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 8, color: '#ffffff' }}>
          DFW Property Records Guide
        </h1>
        <p style={{ fontSize: 20, color: '#fb923c', fontWeight: 700, marginBottom: 16 }}>
          How to Research Any Home
        </p>
        <p style={{ fontSize: 16, color: '#94a3b8', marginBottom: 48, lineHeight: 1.7 }}>
          Before you buy, rent, or renovate — know what you're getting into. DFW property records are public, but you have to know where to look.
        </p>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: '#ffffff' }}>📋 Why Property Records Matter</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginBottom: 40 }}>
          {[
            { icon: '🔑', title: 'Verify Ownership', desc: 'Confirm the seller actually owns the property and there are no disputed claims.' },
            { icon: '🔨', title: 'Permit History', desc: 'Unpermitted work is your liability once you buy. Additions, room conversions, pools, and electrical work all need permits.' },
            { icon: '🌊', title: 'Flood Zone', desc: 'DFW has significant flood risk. Flood zone designation affects insurance costs by thousands per year.' },
            { icon: '💵', title: 'Tax History', desc: 'See how assessments have changed. A dramatic jump could mean your first tax bill is much higher than the seller paid.' },
            { icon: '⚖️', title: 'Liens & Easements', desc: 'A contractor lien could become your problem. Utility easements restrict what you can build.' },
            { icon: '📜', title: 'HOA Restrictions', desc: 'Deed restrictions can prohibit parking, fences, paint colors, outbuildings, and short-term rentals.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#111827', borderRadius: 14, padding: 18 }}>
              <span style={{ fontSize: 24 }}>{item.icon}</span>
              <h3 style={{ color: '#fb923c', fontWeight: 700, marginTop: 10, marginBottom: 6, fontSize: 16 }}>{item.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: '#ffffff' }}>🔍 Where to Look in DFW</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
          {resources.map(r => (
            <div key={r.county} style={{ background: r.color, border: `1px solid ${r.accent}30`, borderRadius: 14, padding: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: r.accent, fontWeight: 700, marginBottom: 4 }}>{r.county}</p>
                <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>Property appraisal records, ownership, tax history, improvements</p>
              </div>
              <span style={{ color: r.accent, fontSize: 14, fontWeight: 600 }}>{r.url}</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#1e293b', borderRadius: 14, padding: 18, marginBottom: 40 }}>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>
            <strong style={{ color: '#f0f0f0' }}>City Permits:</strong> Each city maintains its own portal. Search "[city name] building permits" + "permit portal" or "permit search" for Dallas, Frisco, Plano, McKinney, Fort Worth, Arlington, etc.
          </p>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: '#ffffff' }}>🚩 Red Flags to Watch For</h2>
        <div style={{ background: '#1f0d0d', border: '1px solid #7f1d1d', borderRadius: 16, padding: 24, marginBottom: 40 }}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 12 }}>
            {[
              'Visible addition or conversion with no corresponding permit on record',
              'Tax assessment jumped dramatically between years (sign of renovation or sale)',
              'Multiple failed inspections listed in permit history',
              'Open permit with no final inspection — contractor may have abandoned the job',
              'Deed restrictions that conflict with your intended use (Airbnb, detached ADU, fence, etc.)',
              'Easements running through where you planned to build',
              'Prior flood insurance claim history (ask agent for CLUE report)',
            ].map(item => (
              <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: '#f87171', fontWeight: 700, flexShrink: 0 }}>⚠️</span>
                <span style={{ color: '#fca5a5', fontSize: 15 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: '#ffffff' }}>✅ Pre-Purchase Research Checklist</h2>
        <div style={{ background: '#111827', borderRadius: 16, padding: 24, marginBottom: 48 }}>
          <div style={{ background: '#0f172a', borderRadius: 8, overflow: 'hidden', marginBottom: 20 }}>
            <div style={{ background: '#fb923c', height: 6, width: `${pct}%`, transition: 'width 0.3s' }} />
          </div>
          <p style={{ color: '#94a3b8', marginBottom: 20 }}>{checked.length}/{checklistItems.length} items completed — {pct}%</p>

          {Object.entries(byCategory).map(([cat, items]) => (
            <div key={cat} style={{ marginBottom: 20 }}>
              <p style={{ color: '#fb923c', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{cat}</p>
              <div style={{ display: 'grid', gap: 8 }}>
                {items.map(item => (
                  <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', background: checked.includes(item.id) ? '#0d2010' : '#1e293b', border: `1px solid ${checked.includes(item.id) ? '#fb923c' : '#334155'}`, borderRadius: 8, padding: 12 }}>
                    <input type="checkbox" checked={checked.includes(item.id)} onChange={() => toggle(item.id)} style={{ width: 16, height: 16 }} />
                    <span style={{ color: '#e2e8f0', fontSize: 14 }}>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', background: '#111827', border: '1px solid #334155', borderRadius: 16, padding: 40 }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>Get a Pro Who Knows Your Home</h3>
          <p style={{ color: '#94a3b8', marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
            Found an issue in the records? ProLnk connects you with licensed pros who specialize in remediation, repairs, and permit corrections.
          </p>
          <a href="/waitlist/homeowner" style={{ background: '#ea580c', color: '#ffffff', padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 16, display: 'inline-block' }}>
            Find a Local Pro →
          </a>
        </div>

      </div>
    </div>
  );
}
