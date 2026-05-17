import { useState } from 'react';

const areas = [
  { id: 'hvac', label: 'HVAC & Air Conditioning', icon: '❄️', detail: 'The HVAC section grew first — 300+ pages covering system types, brands, efficiency ratings, refrigerants, seasonal maintenance, and DFW-specific climate guidance. It remains our largest category and the most-searched topic for DFW homeowners.' },
  { id: 'foundation', label: 'Foundation & Structural', icon: '🏗️', detail: 'Foundation content is 200+ pages and the most technically complex section. DFW clay soil creates unique challenges that most national sites ignore entirely. We cover soil science, pier types, post-tension, warranty comparison, and repair cost data.' },
  { id: 'roofing', label: 'Roofing & Storm Damage', icon: '🏠', detail: '150+ roofing pages built around DFW-specific realities: frequent hail, intense UV, storm chasers, and insurance claim complexity. No other resource covers DFW roofing with this level of local specificity.' },
  { id: 'cities', label: 'DFW City Guides', icon: '📍', detail: 'Over 100 DFW cities have dedicated homeowner resource pages — from Plano and Frisco to Mansfield and Waxahachie. Each page tailors guidance to local soil zones, utility providers, permit requirements, and contractor ecosystems.' },
  { id: 'financial', label: 'Financial & Legal Guides', icon: '💰', detail: 'Hundreds of pages on home improvement financing, contractor contracts, lien law in Texas, permit requirements, and cost benchmarking. DFW homeowners often overpay because they lack this information — we fix that.' },
  { id: 'careers', label: 'Trade Career Guides', icon: '🔧', detail: 'A growing section for service professionals: how to start an HVAC business in DFW, plumbing licensing in Texas, foundation contractor certification, and income modeling for independent pros. Attracts the supply side of our marketplace.' },
];

const timeline = [
  { year: '2024', milestone: 'Core HVAC and Foundation guides launched (250 pages)' },
  { year: 'Early 2025', milestone: 'Roofing library added, 100+ DFW city pages built (1,200 pages)' },
  { year: 'Mid 2025', milestone: 'Financial, legal, and seasonal content expanded (2,500 pages)' },
  { year: 'Late 2025', milestone: 'Career and trade guides, specialty topics (4,000 pages)' },
  { year: '2026', milestone: '5,000 pages milestone — launching ProLnk marketplace' },
];

export default function DFWProLnkGrowthSummary2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = areas.find(a => a.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>ProLnk DFW · Content Library 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>ProLnk DFW Content Growth Summary 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          How do you build 5,000 pages of DFW homeowner content? One expert topic at a time — starting with the highest-impact questions DFW homeowners ask most and expanding outward. Here is the story of how this library was built and why it matters.
        </p>

        <div style={{ background: '#0f2037', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 16 }}>📅 Growth Timeline</h2>
          {timeline.map(t => (
            <div key={t.year} style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'flex-start' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, minWidth: 80, fontSize: 13 }}>{t.year}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14 }}>{t.milestone}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, marginBottom: 12 }}>🗂️ Explore a content area</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {areas.map(a => (
            <button
              key={a.id}
              onClick={() => setSelected(a.id)}
              style={{
                background: selected === a.id ? '#1a3a5c' : '#0f2037',
                border: selected === a.id ? '2px solid #F5E642' : '2px solid #1e3a5f',
                borderRadius: 8, padding: '12px 16px', color: '#fff',
                textAlign: 'left', cursor: 'pointer', fontSize: 15,
              }}
            >
              {a.icon} {a.label}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ background: '#0f2037', border: '1px solid #F5E642', borderRadius: 10, padding: 20, marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{result.icon} {result.label}</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{result.detail}</p>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🚀 Content Fuels Connections</div>
          <p style={{ color: '#0A1628', fontSize: 14 }}>Every page in this library serves one purpose: helping DFW homeowners make better decisions and connect with the right pro. ProLnk is launching its marketplace in 2026.</p>
        </div>
      </div>
    </div>
  );
}
