import { useState } from 'react';

const BRANDS = [
  { name: 'Trane', emoji: '🏈', logo: 'Football player (helmet + jersey)', color: '#dc2626', tier: 'Premium', warranty: '10-yr parts + labor (registered)', tip: 'Model # on silver label on side of outdoor unit. XR/XL series = high efficiency.' },
  { name: 'Lennox', emoji: '⭕', logo: 'Circle/globe logo in red-orange', color: '#ea580c', tier: 'Premium', warranty: '10-yr registered / 5-yr unregistered', tip: 'Model # on data plate inside air handler door. XC/XP series = variable speed.' },
  { name: 'Carrier', emoji: '🔵', logo: 'Blue wordmark — Carrier in blue text', color: '#2563eb', tier: 'Premium', warranty: '10-yr parts registered', tip: 'Serial number contains manufacture date: positions 5-8 are week + year.' },
  { name: 'Goodman', emoji: '⚙️', logo: 'Silver/grey G shield logo', color: '#64748b', tier: 'Value', warranty: '10-yr parts + lifetime heat exchanger', tip: 'Very common in DFW builder-grade installs 2010-2020. Model on sticker inside cabinet.' },
  { name: 'American Standard', emoji: '⭐', logo: 'Blue star logo — no relation to plumbing brand', color: '#1d4ed8', tier: 'Premium', warranty: '10-yr registered (same parent as Trane)', tip: 'Owned by same company as Trane. Parts are often interchangeable. Gold/Silver/Platinum tiers.' },
  { name: 'York', emoji: '🟡', logo: 'Yellow Y-circle logo', color: '#ca8a04', tier: 'Mid-Range', warranty: '10-yr limited (must register within 90 days)', tip: 'Johnson Controls brand. Common in commercial and residential. LX/Affinity series.' },
  { name: 'Rheem', emoji: '🔷', logo: 'Diamond/rhombus blue logo', color: '#0891b2', tier: 'Mid-Range', warranty: '10-yr parts registered', tip: 'Also makes Ruud (same units, different label). RA/RH series common in DFW.' },
];

const MODEL_AGE: Record<string, string> = {
  '0-5': '✅ Full warranty likely active — register if you haven\'t. Keep maintenance logs.',
  '6-10': '🟡 Warranty active but verify registration. Schedule annual tune-up now.',
  '11-15': '🟠 Warranty expired on most parts. Budget for repair vs. replace analysis.',
  '16+': '🔴 Beyond typical lifespan. Replacement planning recommended.',
};

export default function DFWHVACBrandLogoGuide2026() {
  const [selected, setSelected] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const brand = BRANDS.find(b => b.name === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>PROLNK HVAC GUIDE · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🔍 DFW HVAC Brand<br />Logo ID Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 32 }}>Identify your HVAC brand from the label on your outdoor unit. Find the model number to check your warranty status instantly.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🏷️ Select Your Brand</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {BRANDS.map(b => (
              <button key={b.name} onClick={() => setSelected(b.name)}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 8, border: `2px solid ${selected === b.name ? '#F5E642' : '#1e3a5f'}`, background: selected === b.name ? '#0A1628' : '#0A1628', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontSize: 24 }}>{b.emoji}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: selected === b.name ? '#F5E642' : '#e2e8f0' }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Logo: {b.logo}</div>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: 12, padding: '4px 10px', borderRadius: 99, background: '#1e3a5f', color: '#94a3b8' }}>{b.tier}</span>
              </button>
            ))}
          </div>
        </div>

        {brand && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>{brand.emoji} {brand.name} Details</h3>
            <div style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.7, marginBottom: 16 }}>
              <strong style={{ color: '#e2e8f0' }}>Warranty:</strong> {brand.warranty}<br />
              <strong style={{ color: '#e2e8f0' }}>Finding Your Model #:</strong> {brand.tip}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>📅 How old is your system?</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {Object.keys(MODEL_AGE).map(a => (
                  <button key={a} onClick={() => setAge(a)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: `2px solid ${age === a ? '#F5E642' : '#1e3a5f'}`, background: age === a ? '#F5E642' : '#0A1628', color: age === a ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                    {a} yrs
                  </button>
                ))}
              </div>
              {age && <p style={{ marginTop: 14, fontSize: 14, color: '#e2e8f0', lineHeight: 1.6 }}>{MODEL_AGE[age]}</p>}
            </div>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📍 Where to Find the Label</div>
          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>Look on the side panel of your outdoor condenser unit. The data plate is usually silver or white with the brand logo, model number, serial number, and electrical specs. Take a photo and add it to your ProLnk Home Health Vault.</p>
        </div>
      </div>
    </div>
  );
}