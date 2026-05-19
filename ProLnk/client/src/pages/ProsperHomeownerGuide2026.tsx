import { useState } from 'react';

const checklistByYear: Record<string, { label: string; tasks: string[] }> = {
  '1': { label: 'Year 1–2: Builder Warranty Window', tasks: ['Document every defect for builder warranty claims', 'Foundation crack monitoring — photo monthly', 'Irrigation system audit — builder zones often miscalibrated', 'HVAC filter replacement every 30 days (new construction dust)', 'HOA walkthrough compliance — verify exterior specs'] },
  '3': { label: 'Year 3–5: Settling Phase', tasks: ['Foundation inspection by licensed engineer', 'Grout/caulk refresh at tile joints from settling movement', 'Roof fastener inspection (wind events common in Prosper)', 'Upgrade builder-grade HVAC air handler filter', 'Driveway and walkway joint sealing as concrete cures'] },
  '7': { label: 'Year 7–10: First Major Cycle', tasks: ['Exterior repaint (Prosper HOA requires approved palette)', 'HVAC system full tune-up or consider replacement', 'Water heater anode rod inspection', 'Window seal inspection for fogging / argon loss', 'Landscape tree root management near foundation'] },
  '10': { label: 'Year 10+: Full Maintenance Mode', tasks: ['Roof replacement evaluation (hail damage common in Prosper)', 'Full plumbing inspection for PEX joint integrity', 'Attic insulation top-up for energy efficiency', 'Full HOA exterior compliance review', 'HVAC replacement planning — budget $8K–$15K premium installs'] },
};

export default function ProsperHomeownerGuide2026() {
  const [years, setYears] = useState('');
  const profile = years ? checklistByYear[years] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏆</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>Prosper TX Homeowner Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 560, margin: '0 auto' }}>
            One of Texas's fastest-growing cities. Premium new construction, active HOAs, and still-settling foundations define Prosper homeownership in 2026.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          {[
            { icon: '📈', label: 'Explosive Growth', desc: 'Population tripled 2015–2026. Builder quality varies.' },
            { icon: '🏗️', label: 'New Construction', desc: '90%+ of homes built post-2015. Settling is real.' },
            { icon: '📋', label: 'Active HOA', desc: 'Strict exterior rules. Non-compliance = fines fast.' },
            { icon: '💎', label: 'Premium Market', desc: 'Median home $650K+. Use high-end certified contractors only.' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📅 How Long Have You Owned in Prosper?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[{ v: '1', l: '🆕 Under 3 Years' }, { v: '3', l: '🔧 3–6 Years' }, { v: '7', l: '📆 7–10 Years' }, { v: '10', l: '🔁 10+ Years' }].map(opt => (
              <button key={opt.v} onClick={() => setYears(opt.v)}
                style={{ background: years === opt.v ? '#F5E642′ : '#1a2f50', color: years === opt.v ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {opt.l}
              </button>
            ))}
          </div>
        </div>

        {profile ? (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 14 }}>✅ {profile.label}</h3>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {profile.tasks.map((t, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 8 }}>{t}</li>)}
            </ul>
          </div>
        ) : (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
            Select your ownership duration above to get your Prosper checklist.
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32 }}>🏅</div>
          <h3 style={{ color: '#0A1628', fontSize: 18, margin: '8px 0 6px' }}>Prosper-Certified Premium Contractors</h3>
          <p style={{ color: '#1a2f50', fontSize: 13, margin: '0 0 14px' }}>ProLnk matches Prosper homeowners with verified high-end contractors who meet HOA standards.</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Get Premium Quotes →</button>
        </div>
      </div>
    </div>
  );
}
