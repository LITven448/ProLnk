import { useState } from 'react';

const areas = ['North DFW (Frisco, McKinney, Plano)', 'South DFW (Cedar Hill, Mansfield, Midlothian)', 'East DFW (Garland, Mesquite, Rockwall)', 'West DFW (Fort Worth, Arlington, Weatherford)', 'DFW Core (Dallas, Irving, Grand Prairie)'];
const brands = ['Carrier', 'Trane', 'Lennox', 'Goodman / Amana', 'Rheem / Ruud', 'Other / Unsure'];

const certInfo = {
  nate: {
    label: 'NATE Certification',
    emoji: '🎓',
    why: 'NATE (North American Technician Excellence) is the gold standard for HVAC technicians in DFW. Certified techs pass rigorous exams on installation and service. Most major DFW HVAC contractors require NATE certification for their lead techs.',
    howToVerify: 'Ask to see the tech\’s NATE ID card or look up their name at natex.org. Legitimate NATE certs expire every 5 years — check the date.',
  },
  mfr: {
    label: 'Manufacturer Authorization',
    emoji: '🏭',
    why: 'Carrier, Trane, Lennox, and Rheem each have factory-authorized dealer programs. Getting service or installation from an authorized dealer in DFW means: (1) warranty is valid, (2) tech has brand-specific training, (3) parts are OEM.',
    howToVerify: 'Check the manufacturer\’s website dealer locator. For Carrier: carrier.com/dealer. For Trane: trane.com/dealer. For Lennox: lennox.com/dealer.',
  },
};

const goodInstall = [
  'Load calculation done (Manual J) — not just "match existing size"',
  'Refrigerant lines properly insulated and supported',
  'Drain line pitched correctly and secondary drain installed',
  'Static pressure test after install (DFW systems often have undersized ducts)',
  'Electrical disconnect and breaker properly sized for new unit',
  'Startup sheet provided showing refrigerant charge readings',
  'Permit pulled with local city (required in most DFW municipalities)',
  'Equipment registered with manufacturer for full warranty',
];

const redFlags = [
  '🚩 Quote given without seeing your home or measuring duct system',
  '🚩 "We\’ll match the old size" — proper sizing requires Manual J calc',
  '🚩 No permit offered — illegal in most DFW cities, voids warranty',
  '🚩 Refuses to show NATE credentials or manufacturer authorization',
  '🚩 Cash only with no written contract',
  '🚩 Pressures you to decide same-day',
];

export default function DFWHVACCertifiedInstallersGuide() {
  const [area, setArea] = useState(areas[0]);
  const [brand, setBrand] = useState(brands[0]);
  const [tab, setTab] = useState<'certs' | 'install' | 'redflags'>('certs');

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🏅</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW Certified HVAC Installers Guide</h1>
          <p style={{ color: '#9BB0CC', margin: 0 }}>Find, verify, and evaluate certified HVAC pros in DFW</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#9BB0CC', fontSize: '0.8rem', display: 'block', marginBottom: 4 }}>YOUR DFW AREA</label>
            <select value={area} onChange={(e) => setArea(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 6, padding: '0.5rem', fontSize: '0.95rem' }}>
              {areas.map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: '#9BB0CC', fontSize: '0.8rem', display: 'block', marginBottom: 4 }}>YOUR HVAC BRAND</label>
            <select value={brand} onChange={(e) => setBrand(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 6, padding: '0.5rem', fontSize: '0.95rem' }}>
              {brands.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>📍 {area}</span>
          <span style={{ color: '#9BB0CC', margin: '0 0.5rem' }}>|</span>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>🏭 {brand}</span>
          <p style={{ color: '#CBD5E1', margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
            For {brand} warranty validity in {area.split('(')[0].trim()}, insist on a {brand === 'Carrier' ? 'Carrier Factory Authorized Dealer' : brand === 'Trane' ? 'Trane Comfort Specialist' : brand === 'Lennox' ? 'Lennox Premier Dealer' : 'manufacturer-authorized'} contractor with NATE-certified lead tech.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {([['certs', '🎓 Certifications'], ['install', '🛠 Good Installation'], ['redflags', '🚩 Red Flags']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              style={{ padding: '0.5rem 1rem', borderRadius: 6, border: '1px solid', borderColor: tab === key ? '#F5E642′ : '#1E3A5F', background: tab === key ? '#1E3A5F' : ’transparent', color: tab === key ? '#F5E642′ : '#9BB0CC', cursor: ’pointer', fontWeight: 700 }}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'certs' && (
          <div>
            {Object.values(certInfo).map((cert) => (
              <div key={cert.label} style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
                <h3 style={{ color: '#F5E642', marginTop: 0 }}>{cert.emoji} {cert.label}</h3>
                <p style={{ color: '#CBD5E1', lineHeight: 1.7, marginBottom: '0.75rem' }}>{cert.why}</p>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', borderLeft: '4px solid #F5E642′ }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>How to Verify</div>
                  <div style={{ color: '#CBD5E1′ }}>{cert.howToVerify}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'install' && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}>🛠 What Good DFW HVAC Installation Looks Like</h3>
            {goodInstall.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid #1E3A5F', color: '#CBD5E1′ }}>
                <span style={{ color: '#4ADE80', flexShrink: 0 }}>✓</span><span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'redflags' && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}>🚩 DFW HVAC Installer Red Flags</h3>
            {redFlags.map((item, i) => (
              <div key={i} style={{ padding: '0.6rem 0', borderBottom: '1px solid #1E3A5F', color: '#CBD5E1′ }}>{item}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
