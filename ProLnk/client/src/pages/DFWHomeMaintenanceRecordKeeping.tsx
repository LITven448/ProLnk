import { useState } from 'react';

const featureRecords: Record<string, { label: string; records: string[] }[]> = {
  hvac: [
    { label: '📋 Each Service Visit', records: ['Date of service', 'Company name & technician', 'Work performed (filter size, refrigerant added, parts replaced)', 'Cost paid', 'Next recommended service date'] },
    { label: '🔧 Major Repairs', records: ['Before/after photos if possible', 'Warranty on parts & labor', 'Model & serial number of replaced components'] },
  ],
  roof: [
    { label: '📋 Each Inspection or Repair', records: ['Date, company, technician name', 'Photos of damage and repair', 'Materials used (shingle type, color, brand)', 'Cost and warranty', 'Insurance claim number if applicable'] },
    { label: '📅 Roof Age Tracking', records: ['Original installation date', 'Type of roof (shingle, tile, metal)', 'Expected lifespan'] },
  ],
  plumbing: [
    { label: '🚰 Each Repair or Service', records: ['Date and plumber company', 'Location of issue (which bathroom, kitchen)', 'Parts replaced and cost', 'Any permits pulled (required for major work)'] },
    { label: '💧 Water Heater', records: ['Install date and model', 'Capacity and type (tank vs tankless)', 'Annual anode rod inspection notes'] },
  ],
  electrical: [
    { label: '⚡ Each Electrical Job', records: ['Date, electrician company, license number', 'Permit number (required for panel work)', 'Panels, circuits, or fixtures upgraded', 'Cost and warranty'] },
  ],
  foundation: [
    { label: '🏗️ Foundation Work', records: ['Date and company (get 2+ quotes)', 'Number of piers added and locations', 'Warranty (typically 10-25 years — keep the certificate!)', 'Before/after elevation readings', 'Transferability to next owner'] },
  ],
  appliances: [
    { label: '🏠 Each Appliance', records: ['Purchase date and store', 'Model & serial number', 'Warranty expiration date', 'Service history', 'Cost of each repair'] },
  ],
};

const featureOptions = [
  { key: 'hvac', label: '❄️ HVAC System' },
  { key: 'roof', label: '🏠 Roof' },
  { key: 'plumbing', label: '🚰 Plumbing' },
  { key: 'electrical', label: '⚡ Electrical' },
  { key: 'foundation', label: '🏗️ Foundation' },
  { key: 'appliances', label: '🔧 Appliances' },
];

export default function DFWHomeMaintenanceRecordKeeping() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (key: string) => setSelected(s => s.includes(key) ? s.filter(k => k !== key) : [...s, key]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          📁 DFW Home Maintenance Record Keeping Guide
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
          Good records mean faster insurance claims, higher resale value, and warranty protection. Here's exactly what to keep — and why.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[['💰', '+$10K–25K', 'avg resale value boost with records'], ['⚡', '2x faster', 'insurance claims with documentation'], ['🛡️', '100%', 'warranty claims need proof of service']].map(([icon, val, label]) => (
            <div key={val} style={{ background: '#0f2040', borderRadius: 10, padding: '0.85rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem' }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.5rem' }}>🏦 ProLnk Home Health Vault</div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>Every job booked through ProLnk is automatically logged to your Home Health Vault — contractor name, date, cost, photos, and warranty details. Your home's complete history, forever. No spreadsheets required.</p>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>🏠 Select your home's features to see what records to keep:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {featureOptions.map(f => (
              <button key={f.key} onClick={() => toggle(f.key)} style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '2px solid', borderColor: selected.includes(f.key) ? '#F5E642' : '#1e3a5f', background: selected.includes(f.key) ? '#F5E642' : '#0f2040', color: selected.includes(f.key) ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer' }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        {selected.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {selected.map(key => {
              const feature = featureOptions.find(f => f.key === key)!;
              const sections = featureRecords[key];
              return (
                <div key={key} style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.75rem' }}>{feature.label} Records</div>
                  {sections.map((section, i) => (
                    <div key={i} style={{ marginBottom: i < sections.length - 1 ? '1rem' : 0 }}>
                      <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem' }}>{section.label}</div>
                      {section.records.map((r, j) => (
                        <div key={j} style={{ color: '#94a3b8', fontSize: '0.85rem', padding: '0.2rem 0', paddingLeft: '0.75rem', borderLeft: '2px solid #1e3a5f' }}>• {r}</div>
                      ))}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
        {selected.length === 0 && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>
            Select your home features above to see what records to keep
          </div>
        )}
      </div>
    </div>
  );
}