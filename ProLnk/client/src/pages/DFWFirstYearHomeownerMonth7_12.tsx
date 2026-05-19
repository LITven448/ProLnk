import { useState } from 'react';

export default function DFWFirstYearHomeownerMonth7_12() {
  const [features, setFeatures] = useState<string[]>([]);

  const allFeatures = ['pool', 'foundation', 'irrigation', 'hoa', 'fireplace'];
  const featureLabels: Record<string, string> = {
    pool: '🏊 Pool',
    foundation: '🏗️ Pier & Beam or Older Foundation',
    irrigation: '🌿 Irrigation System',
    hoa: '📋 HOA Community',
    fireplace: '🔥 Wood-Burning Fireplace',
  };

  const featureItems: Record<string, string> = {
    pool: '🏊 Close pool for winter or run heater — winterize equipment before first freeze',
    foundation: '🏗️ Get professional foundation inspection in year 1 — DFW clay soil shifts annually',
    irrigation: '🌿 Blow out irrigation lines before December freeze risk — DFW had pipe damage in 2021',
    hoa: '📋 Submit any exterior changes for HOA approval before year-end projects',
    fireplace: '🔥 Schedule chimney sweep — first use in a new home always needs inspection',
  };

  const baseItems = [
    '📦 Complete year-end home inventory — document all appliances and systems with dates',
    '💰 Prepare tax docs: mortgage interest statement (1098), property tax paid in 2025',
    '📅 Build next year maintenance budget — HVAC, roof, plumbing average $3,500/yr in DFW',
    '🗂️ Update Home Health Vault with all year 1 repairs, receipts, and service records',
    '🔍 Walk property and note any changes — foundation cracks, fence shifts, roof wear',
    '📞 Review ProLnk history — which pros you used, rate them to help future neighbors',
  ];

  const toggle = (f: string) => setFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK HOMEOWNER GUIDES — DFW</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🎉 Months 7–12 Completing Your First DFW Year</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>You made it through your first DFW seasons. Now close out the year with documentation, tax prep, and planning ahead.</p>

        <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 12 }}>Select your home features:</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {allFeatures.map(f => (
            <button
              key={f}
              onClick={() => toggle(f)}
              style={{
                background: features.includes(f) ? '#F5E642′ : '#1e2d45',
                color: features.includes(f) ? '#0A1628′ : '#fff',
                border: '1px solid #F5E642',
                borderRadius: 20,
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {featureLabels[f]}
            </button>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Your Months 7–12 Checklist</h2>
        {baseItems.map((item, i) => (
          <div key={i} style={{ background: '#1e2d45', borderRadius: 10, padding: '14px 18px', marginBottom: 10, fontSize: 15, borderLeft: '3px solid #F5E642′ }}>
            {item}
          </div>
        ))}
        {features.map(f => (
          <div key={f} style={{ background: '#162236', borderRadius: 10, padding: '14px 18px', marginBottom: 10, fontSize: 15, borderLeft: '3px solid #F5E642′ }}>
            {featureItems[f]}
          </div>
        ))}

        <div style={{ marginTop: 36, background: '#1e2d45', borderRadius: 12, padding: '20px' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🗂️ Why Home Health Vault Matters at Year 1</div>
          <div style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: 14 }}>
            Year 1 is when most surprise repairs happen. Documenting them in your Home Health Vault creates a permanent record that increases resale value, speeds insurance claims, and makes next year easier to budget.
          </div>
        </div>
      </div>
    </div>
  );
}

