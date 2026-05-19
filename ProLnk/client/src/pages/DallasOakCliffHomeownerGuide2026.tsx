import { useState } from 'react';

export default function DallasOakCliffHomeownerGuide2026() {
  const [vintage, setVintage] = useState<string>('');

  const vintages = [
    {
      id: 'pre1930', label: '🏚️ Pre-1930 Bungalow', desc: 'Original everything — highest risk, highest reward',
      priorities: ['Knob-and-tube wiring replacement (urgent)', 'Lead paint testing and remediation', 'Foundation pier inspection and leveling', 'Galvanized pipe replacement', 'Original single-pane window upgrade'],
      budget: '$30,000–$80,000 for full system modernization',
      notes: 'These homes often have beautiful original woodwork — prioritize systems over cosmetics'
    },
    {
      id: '1930s-1950s', label: '🏠 1930s–1950s Craftsman', desc: 'Classic Oak Cliff character homes',
      priorities: ['Electrical upgrade to 100A or 200A panel', 'Cast iron sewer lateral inspection', 'Roof decking inspection (original rafters)', 'Insulation upgrade (zero in original homes)', 'Foundation leveling if needed'],
      budget: '$15,000–$45,000 for targeted upgrades',
      notes: 'Many have been partially updated — get inspection to know exact status before buying or renovating'
    },
    {
      id: 'post2000', label: '🏡 Post-2000 Infill Build', desc: 'New construction in gentrifying Oak Cliff',
      priorities: ['Builder-grade HVAC — upgrade within 10 years', 'Slab plumbing check at 15 years', 'Roof inspection at 15 years', 'Check grading for drainage issues', 'Verify permits were pulled for original build'],
      budget: '$5,000–$20,000 for routine maintenance cycle',
      notes: 'Some infill builders cut corners — verify all work was permitted and inspected'
    },
  ];

  const oakCliffTips = [
    { icon: '⚡', tip: 'Knob-and-tube wiring is uninsurable and dangerous — replacement is non-negotiable in pre-1940 homes' },
    { icon: '🎨', tip: 'Gentrification has raised contractor demand — book ahead and verify licenses for Oak Cliff work' },
    { icon: '🌳', tip: 'Large pecans and oaks near foundations create root and moisture issues — get annual inspection' },
    { icon: '📍', tip: 'Bishop Arts District proximity inflates rehab costs — get 3 bids minimum for any major project' },
    { icon: '🔍', tip: 'Pre-purchase inspection is critical in Oak Cliff — many homes sold as-is with hidden deferred maintenance' },
  ];

  const selected = vintages.find(v => v.id === vintage);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🌆</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>Dallas Oak Cliff Homeowner Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Historic bungalows south of downtown — vintage-specific repair priorities</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏠 Select Your Home Vintage</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {vintages.map(v => (
              <button key={v.id} onClick={() => setVintage(v.id)}
                style={{ background: vintage === v.id ? '#F5E642′ : '#0f1f3d', color: vintage === v.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '14px 18px', textAlign: ’left', cursor: 'pointer', fontSize: 15, fontWeight: 600 }}>
                {v.label} <span style={{ fontWeight: 400, fontSize: 13, opacity: 0.75 }}>— {v.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 15 }}>🔧 Repair Priority List</h3>
              {selected.priorities.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{p}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#1e293b', borderRadius: 10, padding: 16 }}>
                <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>💰 Estimated Budget</p>
                <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{selected.budget}</p>
              </div>
              <div style={{ background: '#1e293b', borderRadius: 10, padding: 16 }}>
                <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>📝 Key Note</p>
                <p style={{ color: '#cbd5e1', fontSize: 13, margin: 0 }}>{selected.notes}</p>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💡 Oak Cliff Homeowner Insights</h2>
          {oakCliffTips.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>{t.icon}</span>
              <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{t.tip}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#F5E642', borderRadius: 12 }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>🔧 Find Oak Cliff contractors who know historic homes on ProLnk.</p>
        </div>
      </div>
    </div>
  );
}
