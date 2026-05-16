import { useState } from 'react';

const issues = [
  { label: 'Buckling / Peaking', icon: '📐', guide: 'DFW humidity swings from 20% winter to 80% summer cause laminate to expand and contract significantly. Buckling means insufficient expansion gap (minimum 3/8" required on all sides). Solution: remove baseboards, trim laminate edges, reinstall. Floating floors must never be glued to subfloor. In DFW, acclimate laminate 72 hours before install.' },
  { label: 'Swelling at Seams', icon: '💧', guide: 'Laminate is not waterproof — DFW spills, pet accidents, or high-humidity rooms cause seams to swell permanently. Swollen planks cannot be dried back to original. Replace affected planks. DFW recommendation: use AC4-rated laminate minimum, apply seam sealer at joints during install, and add moisture barrier underlayment. In bathrooms or laundry rooms, switch to LVP instead.' },
  { label: 'Scratching / Wear', icon: '🐾', guide: 'DFW red clay tracked in on shoes and pet claws are the top scratch causes. Use AC4 (31) or AC5 (32-34) wear layer rating for DFW pet homes. Entry mats are essential. Minor scratches: use laminate repair kit or floor marker. Deep gouges: replace plank (keep extra planks from original install). Avoid wet mopping — dampness causes swelling.' },
  { label: 'LVP vs Laminate', icon: '⚖️', guide: 'In 2026, LVP (Luxury Vinyl Plank) is the dominant choice in DFW over laminate. LVP is 100% waterproof, more dimensionally stable in DFW humidity swings, handles pet accidents, and costs similarly (-5/sq ft installed). Laminate still makes sense for dry living areas on a budget. Most DFW realtors report LVP adds more resale value than laminate in 2026.' },
  { label: 'Hollow Sound / Feel', icon: '🔊', guide: 'Hollow spots indicate subfloor voids or improper underlayment. DFW concrete slab subfloors must be leveled to within 3/16" over 10 feet before laminate install. Use self-leveling compound for low spots. Hollow-sounding laminate on concrete: add thicker underlayment (3mm minimum with attached foam) or inject construction adhesive via syringe at void points.' },
];

export default function DFWLaminateFlooringGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏠</div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>DFW Laminate Flooring Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px', maxWidth: '560px', margin: '0 auto' }}>DFW humidity swings are laminate\'s biggest challenge. Select your issue for DFW-specific guidance.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {issues.map((issue, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ backgroundColor: selected === i ? '#F5E642' : '#0f2040', color: selected === i ? '#0A1628' : '#ffffff', border: '1px solid', borderColor: selected === i ? '#F5E642' : '#1e3a5f', borderRadius: '10px', padding: '18px 14px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{issue.icon}</div>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>{issue.label}</div>
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ backgroundColor: '#0f2040', border: '1px solid #F5E642', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '32px' }}>{issues[selected].icon}</span>
              <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700' }}>{issues[selected].label}</h2>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '15px' }}>{issues[selected].guide}</p>
          </div>
        )}

        <div style={{ marginTop: '40px', backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>📊 DFW Flooring Market 2026</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[['LVP Market Share','68% of new DFW floor installs — laminate falling fast'],['Laminate Best Use','Dry bedrooms, offices, low-humidity living areas only'],['DFW Humidity','20% winter lows cause contraction; 80% summer highs cause expansion'],['Warranty Note','Most warranties void if RH exceeds 65% — common in DFW summers']].map(([k,v],i) => (
              <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '12px' }}>
                <div style={{ color: '#F5E642', fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>{k}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px', padding: '20px', backgroundColor: '#0f2040', borderRadius: '12px', border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>Need a flooring contractor in DFW?</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 28px', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>Get Free Quotes via ProLnk 🔗</button>
        </div>
      </div>
    </div>
  );
}