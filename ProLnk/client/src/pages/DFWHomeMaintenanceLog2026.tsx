import { useState } from 'react';

const serviceTypes = ['HVAC Service', 'Plumbing Repair', 'Electrical Work', 'Roofing', 'Foundation', 'Pest Control', 'Painting', 'Other'];

const fieldDefs: Record<string, string[]> = {
  'HVAC Service': ['Date of service', 'Company name + license #', 'Technician name', 'Scope: inspection / repair / replacement', 'Refrigerant type + charge (oz)', 'Filter brand + MERV rating', 'Warranty: parts & labor (months)', 'Next recommended service date'],
  'Plumbing Repair': ['Date of service', 'Company name + license #', 'Plumber name', 'Location: kitchen / bath / slab / exterior', 'Issue diagnosed', 'Pipe material replaced (if any)', 'Permit pulled? (Y/N + permit #)', 'Warranty on work (months)', 'Next inspection recommended'],
  'Electrical Work': ['Date of service', 'Company name + license #', 'Electrician name', 'Panel / circuit / outlet affected', 'Scope of work', 'Breaker size (if replaced)', 'Permit + inspection passed (Y/N)', 'Warranty (months)'],
  'Roofing': ['Date of service', 'Company name + license #', 'Scope: repair / partial / full replacement', 'Shingle brand + color + warranty (years)', 'Hail/wind event date (if applicable)', 'Insurance claim # (if applicable)', 'Permit #', 'Next inspection date'],
  'Foundation': ['Date of service', 'Company name + license #', 'Engineer report? (Y/N)', 'Piers installed: count + location', 'Soil treatment (if any)', 'Warranty: transferable? (Y/N + years)', 'Recommended watering plan updated'],
  'Pest Control': ['Date of service', 'Company name + license #', 'Treatment type: termite / general / rodent', 'Chemicals used (for records)', 'Interior / exterior / both', 'Next scheduled treatment date', 'Warranty / bond terms'],
  'Painting': ['Date of service', 'Company name', 'Interior / exterior / both', 'Paint brand + color code', 'Primer used (Y/N)', 'Square footage', 'Warranty on labor (months)'],
  'Other': ['Date of service', 'Company name + license # (if applicable)', 'Scope of work', 'Materials used', 'Cost (optional)', 'Warranty info', 'Next service date'],
};

export default function DFWHomeMaintenanceLog2026() {
  const [service, setService] = useState('HVAC Service');
  const [copied, setCopied] = useState(false);

  const fields = fieldDefs[service] || fieldDefs['Other'];
  const template = fields.map(f => `• ${f}: _______________`).join('
');

  const handleCopy = () => {
    navigator.clipboard.writeText(`[${service} Log Entry]
${template}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>📋🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW Home Maintenance Log 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Every service call deserves a proper record. Use this template — or let ProLnk Vault do it automatically.</p>
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <label style={{ color: '#F5E642', fontSize: '0.95rem', fontWeight: 700, display: 'block', marginBottom: '0.75rem' }}>📂 Select Service Type</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {serviceTypes.map(s => (
              <button key={s} onClick={() => setService(s)} style={{ background: service === s ? '#F5E642′ : '#0A1628', color: service === s ? '#0A1628' : '#cbd5e1', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.4rem 0.75rem', fontSize: '0.85rem', cursor: ’pointer', fontWeight: service === s ? 700 : 400 }}>{s}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1rem', margin: 0 }}>📝 Log Entry Template: {service}</h2>
            <button onClick={handleCopy} style={{ background: copied ? '#4ade80′ : '#1e3a5f', color: '#fff', border: ’none', borderRadius: 6, padding: '0.4rem 0.9rem', cursor: 'pointer', fontSize: '0.85rem' }}>{copied ? '✅ Copied!' : '📋 Copy'}</button>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
            {fields.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0', borderBottom: i < fields.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                <span style={{ color: '#F5E642', marginRight: '0.5rem' }}>•</span>
                <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{f}:</span>
                <span style={{ color: '#334155', marginLeft: '0.5rem', fontSize: '0.88rem' }}>_______________</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.4rem' }}>🏠 ProLnk Vault captures this automatically</p>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: 0 }}>Every ProLnk service call logs contractor info, scope, materials, and warranty — searchable forever, transferable when you sell.</p>
        </div>
      </div>
    </div>
  );
}