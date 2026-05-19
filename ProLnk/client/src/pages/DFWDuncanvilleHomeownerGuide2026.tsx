import { useState } from 'react';

const ageRanges = [
  { id: 'old', label: '🏠 30-50 Year Old Homes (1975-1995)', tasks: ['HVAC full replacement (aging R-22 systems)', 'Plumbing pressure test and pipe inspection', 'Electrical panel upgrade assessment', 'Foundation slab crack evaluation', 'Roof replacement at 30-35yr threshold', 'Exterior brick and mortar repointing'] },
  { id: 'mid', label: '🏡 20-30 Year Old Homes (1995-2005)', tasks: ['HVAC efficiency upgrade to SEER 16+', 'Roof inspection and proactive repair', 'Water heater replacement planning', 'Window and door seal check', 'Irrigation system overhaul'] },
  { id: 'newer', label: '🏘️ Under 20 Years (2005+)', tasks: ['Builder warranty expiration audit', 'Foundation settling baseline documentation', 'Smart thermostat and HVAC integration', 'Gutters and downspout inspection', 'Garage door opener safety check'] },
];

export default function DFWDuncanvilleHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const range = ageRanges.find(r => r.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏈</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 6px' }}>Duncanville TX Homeowner Guide 2026</h1>
          <p style={{ color: '#a0b0c8', fontSize: 15 }}>Southwest Dallas suburb — sports-proud community — affordable entry — aging 1970s-90s stock</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
          {[['🏈','Sports Community'],['💵','Affordable Entry'],['❄️','Aging HVAC Risk']].map(([icon, label]) => (
            <div key={label as string} style={{ background: '#111f35', borderRadius: 10, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 26 }}>{icon}</div>
              <div style={{ fontSize: 12, color: '#a0b0c8', marginTop: 6 }}>{label as string}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2d4a', border: '1px solid #F5E642', borderRadius: 10, padding: 16, marginBottom: 24 }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 4px', fontSize: 14 }}>❄️ Duncanville HVAC Priority Alert</p>
          <p style={{ color: '#a0b0c8', fontSize: 13, margin: 0 }}>A high percentage of Duncanville homes still run original R-22 refrigerant systems built in the 1970s-90s. R-22 is now fully phased out. Emergency replacement costs can exceed $8,000. Proactive budgeting is strongly advised.</p>
        </div>

        <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 14 }}>Select Your Home Age</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {ageRanges.map(r => (
            <button key={r.id} onClick={() => setSelected(r.id === selected ? null : r.id)}
              style={{ background: selected === r.id ? '#F5E642′ : '#111f35', color: selected === r.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 10, padding: '14px 18px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
              {r.label}
            </button>
          ))}
        </div>

        {range && (
          <div style={{ background: '#111f35', borderRadius: 12, padding: 24, marginBottom: 28 }}>
            <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🔧 Duncanville Maintenance Priorities — {range.label}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {range.tasks.map(t => (
                <li key={t} style={{ padding: '8px 0', borderBottom: '1px solid #1e3050', color: '#e0e8f0', fontSize: 14 }}>✅ {t}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#0f1e33', border: '1px solid #F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 22 }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '8px 0 4px' }}>Duncanville-Ready Contractors</p>
          <p style={{ color: '#a0b0c8', fontSize: 13 }}>ProLnk matches Duncanville homeowners with southwest Dallas pros experienced in HVAC replacement, foundation work, and aging home systems.</p>
        </div>
      </div>
    </div>
  );
}