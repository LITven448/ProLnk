import { useState } from 'react';

const docTypes = [
  { id: 'legal', label: '📜 Legal Documents', desc: 'Title, deed, closing docs' },
  { id: 'permits', label: '🏗️ Permits & Inspections', desc: 'Building permits, reports' },
  { id: 'warranties', label: '🛡️ Warranties', desc: 'Appliances, roof, systems' },
  { id: 'service', label: '🔧 Service Records', desc: 'Maintenance, repairs, upgrades' },
];

const guides: Record<string, { title: string; items: { name: string; where: string; why: string }[] }> = {
  legal: {
    title: 'Essential Legal Documents',
    items: [
      { name: 'Purchase Contract', where: 'Title company, closing attorney', why: 'Establishes original terms and warranties' },
      { name: 'Survey', where: 'Title policy, county records', why: 'Defines property lines — needed for fences, additions' },
      { name: 'Title Policy', where: 'Title company', why: 'Protects against liens, claims on the property' },
      { name: 'Deed', where: 'County clerk (public record)', why: 'Proof of ownership — critical for sales and refinancing' },
    ],
  },
  permits: {
    title: 'Permits and Inspection Records',
    items: [
      { name: 'Building Permits', where: 'City/county building dept', why: 'Required for resale — unpermitted work can kill deals' },
      { name: 'CO (Certificate of Occupancy)', where: 'City building dept', why: 'Verifies the home is legally habitable' },
      { name: 'Inspection Reports', where: 'Inspector / your email archive', why: 'Reveals known issues at purchase — invaluable reference' },
      { name: 'HOA Approvals', where: 'HOA management company', why: 'Documents approved modifications — prevents future disputes' },
    ],
  },
  warranties: {
    title: 'Warranties to Protect',
    items: [
      { name: 'Roof Warranty', where: 'Contractor, manufacturer', why: 'DFW hail events — warranty can mean free repairs' },
      { name: 'HVAC Warranty', where: 'Installer, manufacturer', why: '$5,000–$15,000 replacement — warranty is essential' },
      { name: 'Appliance Warranties', where: 'Manufacturer, original receipts', why: 'Most appliances fail within 7 years' },
      { name: 'Builder Warranty', where: 'Builder, closing docs', why: '1-year workmanship, 10-year structural — use it' },
    ],
  },
  service: {
    title: 'Service Records — Your Home's History',
    items: [
      { name: 'HVAC Service Records', where: 'ProLnk Vault (auto-logged)', why: 'Proves maintenance — adds value, validates warranty' },
      { name: 'Plumbing & Electrical Work', where: 'ProLnk Vault (auto-logged)', why: 'Documents known issues and repairs for buyers' },
      { name: 'Pest Control History', where: 'ProLnk Vault / pest company', why: 'DFW termites — continuous treatment history required' },
      { name: 'Roof Inspections', where: 'ProLnk Vault (auto-logged)', why: 'Insurance and resale — dated records are gold' },
    ],
  },
};

export default function DFWHomeDocumentationGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = selected ? guides[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui,sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>📁</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: 0 }}>DFW Home Documentation Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: '.5rem' }}>Every document your DFW home needs — where to find it and why it matters.</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.5rem' }}>🏦 Documentation Adds Real Money</p>
          <p style={{ color: '#cbd5e1', fontSize: '.9rem', margin: 0 }}>DFW homes with complete documentation sell for 3–5% more and close 12 days faster. ProLnk Vault auto-logs every service visit.</p>
        </div>

        <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>Which document type do you need?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {docTypes.map(d => (
            <button key={d.id} onClick={() => setSelected(d.id)} style={{ background: selected === d.id ? '#F5E642' : '#1e3a5f', color: selected === d.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '1rem', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>{d.label}</div>
              <div style={{ fontSize: '.85rem', opacity: .8, marginTop: '.25rem' }}>{d.desc}</div>
            </button>
          ))}
        </div>

        {guide && (
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>{guide.title}</h2>
            {guide.items.map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: '.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{item.name}</div>
                <div style={{ color: '#94a3b8', fontSize: '.85rem', margin: '.25rem 0' }}>📍 {item.where}</div>
                <div style={{ color: '#cbd5e1', fontSize: '.9rem' }}>💡 {item.why}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1.5rem', background: '#1e3a5f', borderRadius: 12 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.5rem' }}>🏠 ProLnk Vault Automates Service Record Keeping</div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '.9rem' }}>Every job booked through ProLnk is automatically logged with date, contractor, and scope — no paperwork required.</p>
        </div>
      </div>
    </div>
  );
}
