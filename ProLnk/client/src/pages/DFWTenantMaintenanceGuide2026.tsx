import { useState } from 'react';

const tenantTypes = {
  'Single Family Home': {
    responsible: ['Change HVAC filter monthly (most DFW leases require this)', 'Maintain lawn and landscaping per lease', 'Test smoke detectors monthly', 'Report any leaks or damage promptly', 'Keep drains clear (no grease or wipes)'],
    landlord: ['HVAC system repairs and replacements', 'Roof and structural repairs', 'Major plumbing repairs', 'Appliance repairs (if provided by landlord)', 'Pest control (initial — tenant maintains)'],
    tips: ['DFW clay soil causes foundation movement — report cracks immediately', 'DFW freeze events: know your water shutoff location', 'AC is critical June-Sept — notify landlord same day if it fails'],
  },
  'Apartment': {
    responsible: ['Replace light bulbs inside unit', 'Change HVAC filter if unit has individual air handler', 'Keep balcony/patio clean and clear', 'Report any mold, leaks, pests immediately', 'Properly dispose of trash — DFW HOA rules apply'],
    landlord: ['HVAC central system repairs', 'Common area maintenance', 'Pest control for building', 'All structural repairs', 'Appliances provided in unit'],
    tips: ['DFW apartment pools: HOA rules vary — read lease carefully', 'Noise ordinances in DFW cities — 10 PM-7 AM in most municipalities', 'Renter\'s insurance recommended: DFW hail/storm risk'],
  },
  'Townhome': {
    responsible: ['Interior maintenance per lease', 'Patio/small yard if attached', 'HVAC filter changes', 'Parking area cleanliness', 'Interior pest control'],
    landlord: ['Exterior structure', 'Roof (unless HOA covers)', 'Foundation issues', 'Major system repairs', 'Common wall issues between units'],
    tips: ['HOA rules often apply to townhome rentals in DFW', 'Verify who pays HOA fees — tenant or landlord', 'DFW hail: document roof condition at move-in'],
  },
};

export default function DFWTenantMaintenanceGuide2026() {
  const [type, setType] = useState('');

  const data = tenantTypes[type as keyof typeof tenantTypes];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🔑</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW Tenant Home Maintenance Guide 2026</h1>
          <p style={{ color: '#9AA3B2', fontSize: 15 }}>Know your responsibilities — and your landlord's — in DFW rentals</p>
        </div>

        <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 8 }}>Your Property Type → Responsibility Guide</label>
          <select value={type} onChange={e => setType(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2A3A50', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
            <option value=''>Select your rental type...</option>
            {Object.keys(tenantTypes).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        {data && (
          <>
            <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>✅ Tenant Responsibilities</h2>
              {data.responsible.map(r => (
                <div key={r} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <span>🔹</span>
                  <span style={{ fontSize: 14, color: '#E8EAF0' }}>{r}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>🏠 Landlord Responsibilities</h2>
              {data.landlord.map(r => (
                <div key={r} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <span>🔸</span>
                  <span style={{ fontSize: 14, color: '#E8EAF0' }}>{r}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>💡 DFW-Specific Tips</h2>
              {data.tips.map(r => (
                <div key={r} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <span>⭐</span>
                  <span style={{ fontSize: 14, color: '#E8EAF0' }}>{r}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#9AA3B2', fontSize: 13 }}>DFW tenants: need a reliable contractor your landlord approves?</p>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginTop: 4 }}>ProLnk connects you with vetted DFW home service pros. Free to request quotes.</p>
        </div>
      </div>
    </div>
  );
}