import { useState } from 'react';

const brands = [
  {
    id: 'carrier',
    label: 'Carrier',
    compressor: '10-year limited (registered), 5-year (unregistered)',
    parts: '10-year limited (registered), 5-year (unregistered)',
    heatExchanger: 'Lifetime limited on select models',
    register: 'Must register within 90 days at carrier.com. In DFW, registration is critical — do not skip.',
    dfwRisk: 'High humidity and heat cycles accelerate coil corrosion. Carrier\’s warranty covers manufacturing defects but not corrosion from improper refrigerant charge — common in DFW.',
    voids: 'Improper refrigerant charge, unlicensed service, failure to register, use of non-approved refrigerant.',
  },
  {
    id: 'lennox',
    label: 'Lennox',
    compressor: '10-year limited (registered), 5-year (unregistered)',
    parts: '5-year limited (registered and unregistered)',
    heatExchanger: '20-year limited on select Elite/Dave Lennox Signature models',
    register: 'Register within 60 days at lennox.com. Lennox\’s registration window is shorter than competitors — set a reminder immediately after install.',
    dfwRisk: 'Lennox XC21 and XC25 perform exceptionally in DFW heat. Variable-speed models have more electronics — ensure warranty covers control boards explicitly.',
    voids: 'Non-Lennox parts, unlicensed service, refrigerant leaks left unrepaired, installation outside Lennox specs.',
  },
  {
    id: 'trane',
    label: 'Trane / American Standard',
    compressor: '12-year limited (registered Trane Comfort Specialist install)',
    parts: '10-year limited (registered), 5-year (unregistered)',
    heatExchanger: 'Limited lifetime on XL and XR series',
    register: 'Register within 60 days at trane.com. Trane\’s 12-year compressor warranty requires installation by a Trane Comfort Specialist — verify your contractor\’s certification.',
    dfwRisk: 'Trane\’s all-aluminum Climatuff compressor handles DFW heat cycles well. However, DFW\’s hard water can cause issues with drain pans and coils — not covered under warranty.',
    voids: 'Non-certified installer (voids 12-year to 5-year), failure to register, improper thermostat wiring, dirty coil due to skipped maintenance.',
  },
  {
    id: 'york',
    label: 'York / Johnson Controls',
    compressor: '10-year limited (registered), 5-year (unregistered)',
    parts: '10-year limited (registered), 1-year (unregistered)',
    heatExchanger: '20-year limited on select models',
    register: 'Register within 90 days at johnsoncontrols.com/york. York often sold through contractor-exclusive channels in DFW — confirm you receive registration paperwork at install.',
    dfwRisk: 'York\’s TM9E and YC series handle DFW cooling loads. Parts availability in DFW is good due to strong distribution network. Extended wait times unlikely.',
    voids: 'Refrigerant substitutions, installation without AHRI-certified matched system, filter neglect causing coil freeze.',
  },
  {
    id: 'rheem',
    label: 'Rheem / Ruud',
    compressor: '10-year limited (registered), 5-year (unregistered)',
    parts: '10-year limited (registered), 5-year (unregistered)',
    heatExchanger: 'Limited lifetime on Classic Plus and Prestige series',
    register: 'Register within 90 days at rheem.com. Rheem\’s online registration is straightforward — have model and serial numbers from install documentation.',
    dfwRisk: 'Rheem\’s EcoNet connected systems provide monitoring — useful for documenting performance in DFW\’s extreme seasons. WiFi diagnostic data can support warranty claims.',
    voids: 'Damage from flooding (common in DFW storms), incorrect refrigerant type, installation without permit where required by city.',
  },
];

export default function DFWHVACManufacturerWarrantyGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF4' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏭</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW HVAC Manufacturer Warranty Guide
          </h1>
          <p style={{ fontSize: 16, color: '#9BAAC0', maxWidth: 580, margin: '0 auto' }}>
            What's covered, registration requirements, DFW climate risks, and what voids your warranty — by brand.
          </p>
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            ⏰ Register Within 60 Days — No Exceptions
          </h2>
          <p style={{ color: '#9BAAC0', fontSize: 15, lineHeight: 1.7 }}>
            Every major HVAC manufacturer offers extended warranty coverage contingent on timely registration. Unregistered units
            typically receive 5-year coverage vs. 10-year for registered equipment. In DFW, where systems run 3–4x longer than
            national average, this difference could mean thousands of dollars in uncovered repairs. Register the day of install.
          </p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#E8EDF4', marginBottom: 16 }}>
          🔍 Select Your Brand
        </h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {brands.map(b => (
            <button
              key={b.id}
              onClick={() => setSelected(selected === b.id ? null : b.id)}
              style={{
                background: selected === b.id ? '#1A3A6E' : '#0F2040',
                border: selected === b.id ? '2px solid #F5E642' : '1px solid #1E3A5F',
                borderRadius: 10, padding: '16px 20px', cursor: 'pointer',
                textAlign: 'left', color: '#E8EDF4', fontSize: 15, fontWeight: 600,
                transition: 'all 0.2s', width: '100%',
              }}
            >
              {selected === b.id ? '▼' : '▶'} {b.label}
              {selected === b.id && (
                <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📋 Coverage Summary</div>
                    <div style={{ display: 'grid', gap: 6 }}>
                      <div style={{ color: '#C5D3E8', fontSize: 13 }}>🔧 <strong>Compressor:</strong> {b.compressor}</div>
                      <div style={{ color: '#C5D3E8', fontSize: 13 }}>⚙️ <strong>Parts:</strong> {b.parts}</div>
                      <div style={{ color: '#C5D3E8', fontSize: 13 }}>🔥 <strong>Heat Exchanger:</strong> {b.heatExchanger}</div>
                    </div>
                  </div>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>📝 Registration Requirements</div>
                    <div style={{ color: '#C5D3E8', fontSize: 14, lineHeight: 1.6 }}>{b.register}</div>
                  </div>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>☀️ DFW Climate Risk Factors</div>
                    <div style={{ color: '#C5D3E8', fontSize: 14, lineHeight: 1.6 }}>{b.dfwRisk}</div>
                  </div>
                  <div style={{ background: '#1A0A0A', border: '1px solid #5F1E1E', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#FF6B6B', fontWeight: 700, marginBottom: 6 }}>🚫 What Voids This Warranty</div>
                    <div style={{ color: '#C5D3E8', fontSize: 14, lineHeight: 1.6 }}>{b.voids}</div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🗂️ DFW Warranty Survival Checklist</h3>
          <ul style={{ color: '#9BAAC0', fontSize: 14, lineHeight: 1.9, paddingLeft: 20 }}>
            <li>Register within 60 days — photograph registration confirmation</li>
            <li>Save all service records — warranty claims require documented maintenance history</li>
            <li>Replace filters every 30–45 days during DFW summer (not 90 days as labeled)</li>
            <li>Never let refrigerant charge remain low — causes compressor damage and voids warranty</li>
            <li>Only use licensed, NATE-certified technicians for all service — document their license number</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
