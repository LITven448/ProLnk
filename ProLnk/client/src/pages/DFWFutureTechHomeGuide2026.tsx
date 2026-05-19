import { useState } from 'react';

const technologies = [
  { name: 'AI Predictive Maintenance', icon: '🧠', eta: '2025-2026', status: 'Available Now', desc: 'Sensors + AI detect HVAC, plumbing, and roof issues 30-90 days before failure. Saves DFW homeowners $3,200 avg per prevented emergency.' },
  { name: '3D-Printed Additions', icon: '🏗️', eta: '2026-2028', status: 'Early Pilots', desc: 'ICON is 3D-printing homes in Austin. DFW additions (guest suites, garages) could be printed on-site in days vs months by 2027.' },
  { name: 'AR Home Improvement', icon: '🥽', eta: '2025-2026', status: 'Available Now', desc: 'Apple Vision Pro + apps let DFW homeowners visualize renovations before spending. See new kitchen cabinets, flooring, or room additions in real scale.' },
  { name: 'Quantum Dot Windows', icon: '🪟', eta: '2027-2029', status: 'Coming Soon', desc: 'Windows that generate electricity while letting light in. DFW south-facing windows could produce 15-30% of home energy needs without visible solar panels.' },
  { name: 'Drone Delivery Prep', icon: '🚁', eta: '2026-2028', status: 'Planning Phase', desc: 'Amazon Prime Air and Wing expanding DFW coverage. Homes will need rooftop landing pads, updated HOA rules, and package security systems.' },
];

const interests = [
  { label: 'Stop Surprise Repairs', rec: 'AI Predictive Maintenance (2025-2026)', detail: 'Install Flair, Whisker Labs, or Lew Electric sensors now. AI learns your systems and alerts you before $8,000 HVAC replacements become emergencies.' },
  { label: 'Remodel Smarter', rec: 'AR Visualization + 3D Printing (2026-2028)', detail: 'Use Apple Vision Pro or IKEA app to see your remodel before starting. By 2027, some DFW contractors will offer 3D-printed room additions.' },
  { label: 'Lower Energy Bills', rec: 'Quantum Dot Windows (2027-2029)', detail: 'Plan south and west window replacements for 2027-2028 when quantum dot glass hits $40/sqft. DFW sun intensity makes window solar highly efficient.' },
  { label: 'Convenience Upgrades', rec: 'Drone Delivery Prep (2026-2028)', detail: 'Update HOA covenants, add a rooftop or backyard landing zone, and install a smart package locker. DFW suburbs will have drone delivery by 2027.' },
];

export default function DFWFutureTechHomeGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = interests.find(i => i.label === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🚀</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW Future Home Technology Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>What is coming to DFW homes 2026–2030 and how to get ready</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 28, borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 16 }}>📍 Why DFW Leads Texas in Home Tech Adoption</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>DFW adds 100,000+ residents per year. New construction in Frisco, McKinney, and Celina is built smart-home-ready. Older homes in Plano, Richardson, and Garland are retrofitting fast. DFW consistently ranks top 3 in US smart home adoption per capita.</p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>2026–2030 Technology Timeline</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {technologies.map(t => (
            <div key={t.name} style={{ background: '#112240', borderRadius: 10, padding: 16, border: '1px solid #1e3a5f' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 26 }}>{t.icon}</span>
                <div>
                  <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{t.name}</span>
                  <span style={{ marginLeft: 10, background: t.status === 'Available Now' ? '#166534′ : '#1e3a5f', color: t.status === ’Available Now' ? '#86efac' : '#93c5fd', fontSize: 11, padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>{t.status}</span>
                </div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{t.desc}</div>
              <div style={{ color: '#475569', fontSize: 11, marginTop: 6 }}>ETA: {t.eta}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🎯 Your Adoption Roadmap</h2>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>What matters most to you?</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {interests.map(i => (
            <button key={i.label} onClick={() => setSelected(i.label)}
              style={{ background: selected === i.label ? '#F5E642′ : '#1e3a5f', color: selected === i.label ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
              {i.label}
            </button>
          ))}
        </div>
        {result && (
          <div style={{ background: '#F5E642', borderRadius: 10, padding: 20 }}>
            <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>Focus on: {result.rec}</div>
            <div style={{ color: '#1a2f4a', fontSize: 14 }}>{result.detail}</div>
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk connects DFW homeowners with future-ready home pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
