import { useState } from 'react';

const issues = [
  { id: 'moisture', label: '🌧️ Moisture / Standing Water', recs: ['Install or replace vapor barrier (6-mil poly minimum)', 'Check gutters and grading — water should drain away from foundation', 'Add exhaust vents if crawl space is unventilated', 'Inspect for wood rot on sill plates and joists', 'Schedule encapsulation quote — DFW humidity 60-80% in spring'] },
  { id: 'rodents', label: '🐀 Rodents / Pests', recs: ['Seal all penetrations with hardware cloth and foam', 'Check for entry gaps around pipes, wires, and HVAC ducts', 'Remove debris and wood scraps — nesting material', 'Set snap traps along walls, check weekly', 'Call pest control if active infestation — DFW has aggressive roof rats'] },
  { id: 'musty', label: '😷 Musty Odor', recs: ['Source is almost always moisture — inspect entire vapor barrier', 'Look for torn or missing vapor barrier sections', 'Check HVAC condensate drain — common DFW crawl space leak source', 'Run dehumidifier if encapsulated space has humidity above 55%', 'Mold remediation may be needed if smell is strong'] },
  { id: 'sagging', label: '🪵 Sagging Floors Above', recs: ['Inspect floor joists for rot, especially near exterior walls', 'Check pier and beam connections — DFW clay movement shifts piers', 'Look for broken or missing bridging between joists', 'Sistering damaged joists is often more cost-effective than full replacement', 'Get structural engineer assessment if multiple joists are affected'] },
];

export default function DFWCrawlSpaceGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = issues.find(i => i.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>🕳️ DFW Crawl Space Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          Pier-and-beam homes across North Texas have crawl spaces that face unique challenges: DFW spring humidity routinely hits 70-80%, clay soil shifts piers, and critters find easy entry. Annual inspection is the single best preventive action.
        </p>

        <div style={{ background: '#111d30', borderRadius: 10, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔍 Encapsulation vs Ventilation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { title: 'Ventilated Crawl Space', pros: ['Lower upfront cost', 'Traditional DFW approach'], cons: ['Allows humid air in spring', 'Rodent entry via vents', 'Vapor barrier still required'] },
              { title: 'Encapsulated Crawl Space', pros: ['Controls humidity year-round', 'Keeps pests out', 'Improves indoor air quality'], cons: ['$3,000-$8,000 installed', 'Requires dehumidifier', 'Needs annual inspection'] },
            ].map(opt => (
              <div key={opt.title} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 14 }}>{opt.title}</div>
                {opt.pros.map(p => <div key={p} style={{ color: '#4ade80', fontSize: 13, marginBottom: 4 }}>✓ {p}</div>)}
                {opt.cons.map(c => <div key={c} style={{ color: '#f87171', fontSize: 13, marginBottom: 4 }}>✗ {c}</div>)}
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🛠️ What Issue Are You Seeing?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {issues.map(i => (
            <button key={i.id} onClick={() => setSelected(i.id === selected ? null : i.id)}
              style={{ background: selected === i.id ? '#F5E642′ : '#111d30', color: selected === i.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '14px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
              {i.label}
            </button>
          ))}
        </div>

        {current && (
          <div style={{ background: '#111d30', borderRadius: 10, padding: 20, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 14 }}>Recommended Actions</h3>
            {current.recs.map((r, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 7px', fontWeight: 700, fontSize: 12, minWidth: 22, textAlign: 'center' }}>{idx + 1}</span>
                <span style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.5 }}>{r}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#111d30', borderRadius: 10, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📅 DFW Crawl Space Inspection Schedule</div>
          {['March–April: Pre-summer moisture check before humidity peaks', 'October: Post-summer damage assessment, pest activity check', 'After any heavy rain event: Check for standing water', 'After earthquake or severe storm: Check pier connections'].map((tip, i) => (
            <div key={i} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #F5E642′ }}>{tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
