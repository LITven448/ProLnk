import { useState } from 'react';

const situations = [
  { id: 'foundation', label: '🏠 I need help with my DFW foundation', entry: 'Foundation Hub: Start with DFW Foundation Month-by-Month Guide, then DFW Clay Soil Irrigation Deep Dive, then DFW Foundation Watering System Setup.' },
  { id: 'roof', label: '🌩️ I\’m worried about my roof after a hail storm', entry: 'Roof Hub: Start with DFW Post-Storm Roof Inspection Checklist, then DFW Hail Insurance Claims Guide, then DFW Roofing Material Comparison.' },
  { id: 'hvac', label: '🌡️ My AC can\’t keep up this summer', entry: 'HVAC Hub: Start with DFW Summer AC Performance Guide, then DFW Attic Ventilation and Heat Load, then DFW HVAC Upgrade ROI Calculator.' },
  { id: 'plumbing', label: '💧 I had a plumbing issue or want to prevent one', entry: 'Plumbing Hub: Start with DFW Plumbing Month-by-Month Guide, then DFW Freeze Preparation Checklist, then DFW Irrigation Backflow Testing Guide.' },
  { id: 'newowner', label: '🔑 I just moved to DFW and own a home here', entry: 'New DFW Homeowner Start: Begin with DFW Home Ownership Survival Guide, then DFW Foundation Basics for New Residents, then DFW Trade Directory by City.' },
  { id: 'pro', label: '🔧 I\’m a home service pro looking for leads', entry: 'Pro Hub: Visit ProLnk Pro Signup, then DFW Lead Marketplace Overview, then DFW Service Area Coverage Map. ProLnk connects vetted pros with DFW homeowners actively requesting quotes.' },
];

export default function DFWProLnk5000PagesMilestone() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: '0.5rem' }}>ProLnk Milestone 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>ProLnk Is Approaching 5,000 DFW Resource Pages</h1>
        <p style={{ color: '#9BA3B2', marginBottom: '2rem', lineHeight: 1.6 }}>ProLnk has built the most comprehensive DFW home services knowledge base in existence — nearly 5,000 pages of DFW-specific guidance for homeowners and pros.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📚 What's Been Built</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[['Foundation', '400+ pages', '🏠'], ['HVAC', '350+ pages', '🌡️'], ['Roofing', '300+ pages', '⛈️'], ['Plumbing', '280+ pages', '💧'], ['Electrical', '250+ pages', '⚡'], ['City Guides', '200+ pages', '📍'], ['Trade Directories', '180+ pages', '🔧'], ['Seasonal Guides', '500+ pages', '📅']].map(([topic, count, icon]) => (
              <div key={topic} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', borderLeft: '3px solid #F5E642′ }}>
                <div style={{ fontSize: '1.1rem' }}>{icon} <span style={{ fontWeight: 700 }}>{topic}</span></div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1rem', marginTop: '0.25rem' }}>{count}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🎯 Why DFW Depth Matters</h2>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 2, color: '#C5CAD8′ }}>
            <li>DFW has unique soil, climate, and code requirements — generic advice fails here</li>
            <li>Each page is built specifically for DFW conditions, zip codes, and seasonal patterns</li>
            <li>Homeowners get hyper-local answers, not national generics</li>
            <li>Pros get DFW-specific context to deliver better service outcomes</li>
            <li>The knowledge base grows continuously with new trades, cities, and topics</li>
          </ul>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🗺️ Your Situation → Best Entry Point</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#F5E642′ : '#0A1628', color: selected === s.id ? '#0A1628' : '#E8EAF0', border: '1px solid #F5E642', borderRadius: 8, padding: '0.75rem 1rem', textAlign: ’left', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>{s.label}</button>
            ))}
          </div>
          {result && <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: '4px solid #F5E642', color: '#E8EAF0', lineHeight: 1.7 }}>{result.entry}</div>}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🚀 What's Still Being Built</h2>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 2, color: '#C5CAD8′ }}>
            <li>DFW neighborhood-level guides (Frisco, McKinney, Southlake, Plano deep dives)</li>
            <li>Interactive cost calculators for every major trade</li>
            <li>Pro reviews and reputation profiles by service area</li>
            <li>Real-time matching: homeowner need → verified DFW pro quote</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', color: '#9BA3B2', fontSize: '0.85rem' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> — Building the definitive DFW home services platform, one page at a time
        </div>
      </div>
    </div>
  );
}