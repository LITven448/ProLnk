import { useState } from 'react';

const concerns = [
  { id: 'certification', label: 'Installer certification', guide: 'Manufacturer certification is required for the full warranty to apply. GAF requires GAF-certified contractors; CertainTeed requires ShingleMaster or SELECT ShingleMaster. DFW hail frequency means warranty disputes are common — non-certified installs give the manufacturer grounds to deny. Ask for certification number before signing.' },
  { id: 'haag', label: 'HAAG training', guide: 'HAAG certification trains inspectors and installers to identify hail and wind damage specific to DFW storm patterns. DFW averages 3-5 significant hail events per year. HAAG-trained installers document pre-existing damage before installation, protecting the homeowner from disputed future claims.' },
  { id: 'nailing', label: 'Nailing pattern', guide: 'DFW wind zone requires 6-nail pattern on dimensional shingles (vs standard 4-nail). Nails must be in the nailing strip — not above (exposed to weather) or below (tears through shingle in wind). Improper nailing is the #1 cause of early shingle blow-off in DFW storms.' },
  { id: 'starter', label: 'Starter strip installation', guide: 'Starter strip is required at both the eave (bottom edge) and rake (side edge). DFW sees wind-driven rain from multiple directions. Missing rake starter allows water infiltration under first shingle course. Starter strip seals shingles down — omitting it voids most manufacturer warranties.' },
  { id: 'flashing', label: 'Penetration flashing', guide: 'All roof penetrations — pipes, vents, chimneys, skylights — require proper step and counter flashing. DFW roof surfaces reach 160°F in summer causing rapid thermal expansion; flashing must be mechanically fastened and sealed. Pipe boots (pipe collars) are the most common DFW leak point after 5-7 years — rubber degrades in UV heat.' },
  { id: 'verification', label: 'ProLnk verification', guide: 'ProLnk requires roofers to upload: manufacturer certification number, permit confirmation, installation photos at eave and ridge, and customer sign-off checklist. Pros with installation-related callbacks within 90 days are flagged for review. Verification protects both homeowner and quality pros.' },
];

export default function DFWRoofingCertifiedInstall2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = concerns.find(c => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', letterSpacing: '1px', textTransform: 'uppercase' }}>ProLnk DFW Guide · Roofing</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>DFW Certified Roofing Installation Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '32px' }}>What a proper roof installation looks like in Dallas-Fort Worth. Select an installation concern below.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '28px' }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => setSelected(selected === c.id ? null : c.id)}
              style={{ padding: '14px 16px', borderRadius: '10px', border: '2px solid', borderColor: selected === c.id ? '#F5E642' : '#1e3a5f', backgroundColor: selected === c.id ? '#F5E64220' : '#0d1f3c', color: '#ffffff', cursor: 'pointer', textAlign: 'left', fontSize: '14px', fontWeight: 600, transition: 'all 0.2s' }}>
              🏠 {c.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ backgroundColor: '#0d1f3c', border: '2px solid #F5E642', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
            <div style={{ fontSize: '13px', color: '#F5E642', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Installation Guide</div>
            <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>🏠 {active.label}</h2>
            <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '15px' }}>{active.guide}</p>
          </div>
        )}

        <div style={{ backgroundColor: '#0d1f3c', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px', color: '#F5E642' }}>✅ DFW Installation Checklist</h2>
          {['Manufacturer certification number on file','HAAG-trained installer (preferred)','6-nail pattern in wind zone areas','Starter strip at eave AND rake','All penetrations flashed and sealed','Permit pulled and inspection scheduled'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642' }}>✅</span>
              <span style={{ color: '#cbd5e1', fontSize: '14px' }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '24px', backgroundColor: '#0d1f3c', borderRadius: '12px', border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: '22px', marginBottom: '8px' }}>🏠</div>
          <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>Need a certified roofer in DFW?</div>
          <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '16px' }}>ProLnk matches DFW homeowners with manufacturer-certified roofing pros.</div>
          <a href="/" style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>Get Matched Free →</a>
        </div>
      </div>
    </div>
  );
}
