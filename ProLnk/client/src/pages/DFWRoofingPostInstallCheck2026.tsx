import { useState } from 'react';

const concerns = [
  { id: 'magnetsweep', label: 'Magnetic sweep not done', guide: 'A magnetic sweep (rolling magnet across the yard) is standard after any DFW re-roof. Roofing nails in the grass are a hazard for children, pets, and bare feet — and a flat tire liability. If your contractor skipped the sweep, ask them to return and do it, or deduct from final payment. ProLnk requires sweep confirmation before job close-out.' },
  { id: 'gutters', label: 'Gutter and granule cleanup', guide: 'Granules in the gutter immediately after install are normal — new shingles shed loose granules for 2-4 weeks. Excessive granule loss after 6 months indicates defective shingles or installation damage. Debris (paper wrapping, shingle scrap) left in gutters is not acceptable — require cleanup before final sign-off.' },
  { id: 'pipeboots', label: 'Pipe boot sealing', guide: 'All pipe penetrations (plumbing vents, exhaust pipes) must have new pipe boots. DFW summer UV at 160°F surface temps degrades rubber boots in 7-10 years — if your roofer reused old boots on a new roof, that is a defect. Neoprene boots last longer than rubber in DFW heat. Check that each boot is sealed with roofing caulk at the base.' },
  { id: 'ridgecap', label: 'Ridge cap complete', guide: 'Ridge cap should run the full length of every ridge, including hip ridges. DFW wind-driven rain enters through any gap at the ridge. Hip-and-ridge cap should overlap shingles below it and be sealed with roofing cement at ends. Check from the ground with binoculars — missing or lifted ridge cap is visible.' },
  { id: 'dripedge', label: 'Drip edge all around', guide: 'Drip edge (metal edge flashing) should be installed at all eaves and rakes. DFW code requires drip edge in most jurisdictions. At eaves, drip edge goes under the ice-and-water shield; at rakes, it goes over the underlayment. Missing drip edge causes fascia and soffit rot from water wicking — common in DFW after heavy rains.' },
  { id: 'permit', label: 'Permit inspection passed', guide: 'Roofing permits are required in most DFW cities for full replacements (Dallas, Fort Worth, Plano, Frisco, McKinney). City inspector verifies underlayment, flashing, and nail pattern. No inspection = no permit close-out = title issue at resale. Ask contractor for the final inspection sign-off card. ProLnk holds final payment until permit inspection is confirmed.' },
];

export default function DFWRoofingPostInstallCheck2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = concerns.find(c => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', letterSpacing: '1px', textTransform: 'uppercase' }}>ProLnk DFW Guide · Roofing</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>DFW Roofing Post-Installation Inspection Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '32px' }}>What to check after your new DFW roof is installed. Select a post-install concern below.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '28px' }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => setSelected(selected === c.id ? null : c.id)}
              style={{ padding: '14px 16px', borderRadius: '10px', border: '2px solid', borderColor: selected === c.id ? '#F5E642′ : '#1e3a5f', backgroundColor: selected === c.id ? '#F5E64220' : '#0d1f3c', color: '#ffffff', cursor: ’pointer', textAlign: 'left', fontSize: '14px', fontWeight: 600, transition: 'all 0.2s' }}>
              🏠 {c.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ backgroundColor: '#0d1f3c', border: '2px solid #F5E642', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
            <div style={{ fontSize: '13px', color: '#F5E642', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Inspection Checklist</div>
            <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>🏠 {active.label}</h2>
            <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '15px' }}>{active.guide}</p>
          </div>
        )}

        <div style={{ backgroundColor: '#0d1f3c', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px', color: '#F5E642′ }}>✅ DFW Post-Install Checklist</h2>
          {['Magnetic sweep confirmed (no nails in yard)','Gutters cleaned of debris (granules normal)','New pipe boots on all penetrations','Ridge cap complete — all ridges and hips','Drip edge at all eaves and rakes','Permit inspection passed and card received'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <span style={{ color: '#F5E642′ }}>✅</span>
              <span style={{ color: '#cbd5e1', fontSize: '14px' }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '24px', backgroundColor: '#0d1f3c', borderRadius: '12px', border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: '22px', marginBottom: '8px' }}>🏠</div>
          <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>Roofing concerns after install in DFW?</div>
          <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '16px' }}>ProLnk matches DFW homeowners with certified roofers who complete every post-install step.</div>
          <a href="/" style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>Get Matched Free →</a>
        </div>
      </div>
    </div>
  );
}
