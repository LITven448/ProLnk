import { useState } from 'react';

const purposes: Record<string, { checklist: string[]; settings: string; storage: string }> = {
  insurance: {
    checklist: ['📐 All 4 exterior corners from 45° angle','🏠 Roof from ground (wide + close on shingles)','⚡ Breaker panel open + labeled','💧 Water shutoff valve location','🔥 Furnace/AC unit + serial number plate','🪟 Every window interior + exterior','🛋️ Each room: 4-wall panoramic sweep','📦 All appliances + serial number close-ups'],
    settings: '☀️ Shoot in overcast or open shade — DFW midday sun creates blown highlights. Use HDR mode on iPhone, or shoot RAW. Avoid flash indoors — open all blinds instead.',
    storage: '☁️ Insurance: Google Photos "Insurance 2026″ album + external drive copy. Share album link with insurer. Print index page annually.'
  },
  selling: {
    checklist: ['🌅 Exterior: Golden hour (7–8 AM or 6–7 PM in DFW summer)','🏊 Pool/patio: mid-morning when water sparkles','🍳 Kitchen: clear counters, shoot from corner','🛁 Bathrooms: towels staged, lid closed, shoot from door','🛏️ Bedrooms: shoot from doorway at chest height','📏 Great room: wide-angle from highest corner','🌳 Front yard: show mature trees if any','🚗 Garage: clean, door down, show storage'],
    settings: '📸 Use your best phone camera on 1x (not ultra-wide — distorts rooms). Shoot landscape. DFW tip: skip shooting between 11 AM–3 PM — harsh shadows ruin exterior shots. Use portrait mode for detail shots.',
    storage: '📁 Selling: organize by room in shared Google Drive with agent. Name files "01-front-exterior.jpg" for easy MLS upload. Keep originals at full res.'
  },
  contractor: {
    checklist: ['🔍 Problem area: 3 distances — wide context, medium, close detail','📏 Always include measuring tape in close-up shots','🔦 Damage: use flashlight to reveal depth','💧 Water damage: photograph wet AND after drying','📊 Ceiling leaks: shoot toward light source to show stain extent','🔩 Mechanical issues: video better than photo — narrate while filming','🏷️ Model/serial plates: straight-on, good light, no glare','📍 Location reference: always one shot showing where in home'],
    settings: '📱 Contractor photos: use standard camera (no filters). Grid lines on to keep level. Lock exposure by tapping and holding on the damage area. Turn on location tagging.',
    storage: '📂 Contractor: one iCloud album per project named "Plumber-May2026″. Share album link — easier than texting 20 photos. Keep until warranty expires.'
  },
  inventory: {
    checklist: ['🏷️ Every appliance serial number plate','⚡ Electrical panel map (photograph + diagram)','🔧 Shutoff valves: water main, gas, irrigation','🪟 Window/door brand labels (usually on frame edge)','🔌 Smart home hub + network closet','🌡️ HVAC unit(s) — inside and outside','🌿 Sprinkler controller zone map','🔑 Lockbox code + spare key locations (encrypted note)'],
    settings: '📋 Inventory: use Google Lens or HomeZada to auto-extract model numbers. Shoot in good light, straight-on. Create a dedicated "Home Inventory" album — update after every appliance purchase.',
    storage: '🔐 Inventory: local backup + cloud + printed binder in fire-safe box. Include purchase receipts. Share with spouse/partner and store one copy offsite.'
  }
};

const purposeList = [
  { key: 'insurance', label: '🛡️ Insurance Claim' },
  { key: 'selling', label: '🏷️ Selling the Home' },
  { key: 'contractor', label: '🔧 Contractor Estimate' },
  { key: 'inventory', label: '📋 Home Inventory' }
];

export default function DFWPhotoGuideHome() {
  const [purpose, setPurpose] = useState('');
  const data = purpose ? purposes[purpose] : null;

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1E293B', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#1D4ED8', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEOWNER RESOURCE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>📸 Home Photography Guide — DFW Edition</h1>
        <p style={{ color: '#64748B', marginBottom: 32 }}>Document your home right the first time. Built for DFW light, weather, and home styles.</p>

        <div style={{ background: '#FFF9E6', border: '1px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>☀️ DFW Light Reality Check</div>
          <div style={{ color: '#64748B', fontSize: 14 }}>DFW summer sun is brutal noon–3 PM. Best exterior shots: 7–9 AM or 6–8 PM. Interior tip: open all blinds, turn off overhead lights, use natural light from windows only.</div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>What are you photographing for?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {purposeList.map(p => (
              <button key={p.key} onClick={() => setPurpose(p.key)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontSize: 14, fontWeight: 600, borderColor: purpose === p.key ? '#1D4ED8′ : '#E2E8F0', background: purpose === p.key ? '#EFF6FF' : '#FFFFFF', color: purpose === p.key ? '#1D4ED8' : '#64748B' }}>{p.label}</button>
            ))}
          </div>
        </div>

        {data && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 16 }}>✅ Shot Checklist</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                {data.checklist.map(item => <div key={item} style={{ background: '#F8FAFC', borderRadius: 8, padding: '10px 14px', fontSize: 14 }}>{item}</div>)}
              </div>
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 12 }}>📷 Camera Settings Tip</h3>
              <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{data.settings}</div>
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 12 }}>💾 Storage Recommendation</h3>
              <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{data.storage}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
