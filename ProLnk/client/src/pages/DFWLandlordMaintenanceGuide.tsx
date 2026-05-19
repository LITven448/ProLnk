import { useState } from 'react';

const obligations = [
  { item: 'Working heating and cooling (HVAC)', landlordResponsible: true, responseTime: '3 days (summer HVAC)' },
  { item: 'Hot and cold running water', landlordResponsible: true, responseTime: '3 days' },
  { item: 'Working plumbing', landlordResponsible: true, responseTime: '3 days' },
  { item: 'Weatherproofing and insulation', landlordResponsible: true, responseTime: '7 days' },
  { item: 'Smoke and CO detectors', landlordResponsible: true, responseTime: '3 days' },
  { item: 'Secure locks on doors and windows', landlordResponsible: true, responseTime: '3 days' },
  { item: 'Pest control (initial/structural)', landlordResponsible: true, responseTime: '7 days' },
  { item: 'Appliance maintenance (if provided)', landlordResponsible: true, responseTime: '5 days' },
  { item: 'Light bulb replacement', landlordResponsible: false, responseTime: 'Tenant' },
  { item: 'Minor cleaning and upkeep', landlordResponsible: false, responseTime: 'Tenant' },
  { item: 'Intentional damage repair', landlordResponsible: false, responseTime: 'Tenant cost' },
];

const propertyMultipliers: Record<string, number> = {
  singleFamily: 1.4,
  duplex: 1.0,
  apartment: 0.75,
  townhome: 1.1,
};

export default function DFWLandlordMaintenanceGuide() {
  const [propertyType, setPropertyType] = useState('singleFamily');
  const [unitCount, setUnitCount] = useState(1);

  const baseAnnualCost = 2200;
  const multiplier = propertyMultipliers[propertyType] || 1;
  const low = Math.round(baseAnnualCost * multiplier * unitCount * 0.7);
  const high = Math.round(baseAnnualCost * multiplier * unitCount * 1.3);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🔧</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Landlord Maintenance Guide</h1>
        <p style={{ fontSize: 18, color: '#8899AA', maxWidth: 640, margin: '0 auto' }}>Texas habitability laws, response requirements, and budget planning for DFW rental property owners</p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#112240', borderRadius: 16, padding: 32, margin: '32px 0', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 16 }}>📜 Texas Habitability Standards</h2>
          <p style={{ color: '#B0C0D0', lineHeight: 1.7 }}>Under Texas Property Code §92.056, landlords must make repairs that materially affect health or safety within a reasonable time — typically <strong style={{ color: '#F5E642' }}>7 days</strong> after written notice. HVAC failures during summer heat (above 99°F) require response within <strong style={{ color: '#F5E642' }}>3 days</strong> in most Dallas-area jurisdictions. Failure to comply allows tenants to repair-and-deduct or terminate lease.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, margin: '32px 0', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>⚖️ Landlord vs Tenant Responsibilities</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F5E642' }}>
                  <th style={{ textAlign: 'left', padding: '10px 12px', color: '#F5E642', fontSize: 13 }}>Item</th>
                  <th style={{ textAlign: 'center', padding: '10px 12px', color: '#F5E642', fontSize: 13 }}>Responsible Party</th>
                  <th style={{ textAlign: 'center', padding: '10px 12px', color: '#F5E642', fontSize: 13 }}>Response Time</th>
                </tr>
              </thead>
              <tbody>
                {obligations.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1E3A5F', background: i % 2 === 0 ? 'transparent' : '#0D1F38' }}>
                    <td style={{ padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>{row.item}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <span style={{ background: row.landlordResponsible ? '#1A4A2E' : '#3A1A1A', color: row.landlordResponsible ? '#4ADE80' : '#F87171', borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>
                        {row.landlordResponsible ? 'Landlord' : 'Tenant'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center', color: '#8899AA', fontSize: 13 }}>{row.responseTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, margin: '32px 0', border: '2px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🧮 Annual Maintenance Budget Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 8 }}>Property Type</label>
              <select value={propertyType} onChange={e => setPropertyType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
                <option value="singleFamily">Single Family Home</option>
                <option value="duplex">Duplex</option>
                <option value="apartment">Apartment Unit</option>
                <option value="townhome">Townhome</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 8 }}>Number of Units</label>
              <input type="number" min={1} max={50} value={unitCount} onChange={e => setUnitCount(Math.max(1, parseInt(e.target.value) || 1))} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <div style={{ color: '#8899AA', fontSize: 14, marginBottom: 8 }}>Estimated Annual Maintenance Budget</div>
            <div style={{ color: '#F5E642', fontSize: 42, fontWeight: 800 }}>${low.toLocaleString()} – ${high.toLocaleString()}</div>
            <div style={{ color: '#8899AA', fontSize: 13, marginTop: 8 }}>for {unitCount} {propertyType === 'singleFamily' ? 'single-family home' : propertyType === 'duplex' ? 'duplex' : propertyType === 'apartment' ? 'apartment unit' : 'townhome'}{unitCount > 1 ? 's' : ''} in DFW</div>
          </div>
          <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[['🌡️ HVAC Service', '$150–400/yr/unit'], ['🚿 Plumbing', '$200–600/yr/unit'], ['⚡ Electrical', '$100–300/yr/unit']].map(([label, val]) => (
              <div key={label} style={{ background: '#112240', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 20 }}>{label.split(' ')[0]}</div>
                <div style={{ color: '#E8EDF5', fontSize: 13, fontWeight: 600, marginTop: 4 }}>{label.substring(2)}</div>
                <div style={{ color: '#F5E642', fontSize: 12, marginTop: 4 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 16 }}>📋 Maintenance Request Tracking Tips</h2>
          {['Require all requests in writing (text, email, or app)', 'Log date received, date responded, and resolution', 'Document with photos before and after repairs', 'Use a property management app (Buildium, AppFolio, or TenantCloud)', 'Keep all receipts for tax deduction purposes', 'Set up emergency contacts for 24/7 HVAC and plumbing'].map((tip, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
              <span style={{ color: '#F5E642', fontSize: 18, marginTop: 1 }}>✓</span>
              <span style={{ color: '#B0C0D0', fontSize: 15 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
