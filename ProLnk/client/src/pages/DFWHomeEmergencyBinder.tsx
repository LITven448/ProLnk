import { useState } from 'react';

const binderSections = [
  {
    title: '📋 Insurance Policies',
    items: [
      'Homeowners insurance declarations page (full policy number)',
      'Flood insurance policy (if applicable — common in DFW)',
      'Auto insurance for all vehicles',
      'Umbrella policy (if applicable)',
      'Claims hotline numbers highlighted on each',
    ],
  },
  {
    title: '🏦 Mortgage & Financial',
    items: [
      'Mortgage statement with servicer contact and loan number',
      'Property tax statements (last 2 years)',
      'HOA contact info and CC&Rs summary',
      'Home purchase closing documents',
      'Refinance documents (if applicable)',
    ],
  },
  {
    title: '⚡ Utility Contacts',
    items: [
      'Oncor (electricity) — 888-313-4747 — outage reporting number',
      'Atmos Energy (gas) — 888-286-6700',
      'Water utility (varies by city) — write your local number',
      'Internet provider and router admin password',
      'Irrigation system shutoff location and controller instructions',
    ],
  },
  {
    title: '🔧 Contractor Contacts',
    items: [
      'HVAC company — name, number, license # — from past service',
      'Plumber — name, number, license #',
      'Electrician — name, number, license #',
      'Roofer — name, number, license #',
      'General handyman — name, number',
      'Pest control company — name and account number',
    ],
  },
  {
    title: '🆘 Emergency Contacts',
    items: [
      'Nearest family member (2 options with cell numbers)',
      'Neighbor you trust — name and cell',
      'Primary care doctor + pharmacy',
      'Nearest 24-hr emergency vet (if pets)',
      'Local Red Cross: 214-678-0600',
      'Poison Control: 1-800-222-1222',
    ],
  },
  {
    title: '📸 Home Inventory',
    items: [
      'Photos of every room — dated and stored in cloud (Google Photos or iCloud)',
      'Photos of major appliances (serial numbers visible)',
      'Photos of jewelry, art, electronics with purchase receipts',
      'Video walkthrough of entire home — update annually',
      'USB drive copy stored at a separate location',
    ],
  },
  {
    title: '📄 Warranties & Manuals',
    items: [
      'HVAC system — warranty card and installation date',
      'Water heater — warranty and serial number',
      'Roof — contractor warranty and installation year',
      'Major appliances — all warranty cards',
      'Smart home devices — setup codes and app logins',
    ],
  },
];

const digitalBackups = [
  '☁️ Scan all documents — store in Google Drive or iCloud folder named "Home Binder"',
  '🔐 Password manager entry for all utility and insurance accounts',
  '📧 Email yourself a summary with key numbers in subject line',
  '💾 USB drive with scanned copies — store at work or trusted family member',
  '📱 Screenshot insurance policy numbers — save to phone album',
];

const storageOptions = [
  { type: 'Physical Binder', pro: 'Works without power or internet', con: 'Can be lost in flood or fire', location: 'Fireproof safe or off-site at family member home' },
  { type: 'Cloud Folder', pro: 'Accessible anywhere with phone', con: 'Requires internet and login', location: 'Google Drive / iCloud — dedicated "Home Emergency" folder' },
  { type: 'USB Drive', pro: 'Portable, works offline', con: 'Can be lost or corrupted', location: 'Store at work, parent, or sibling home' },
];

export default function DFWHomeEmergencyBinder() {
  const [homeType, setHomeType] = useState('');
  const [hasPets, setHasPets] = useState('');
  const [hasHOA, setHasHOA] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  const customItems: string[] = [];
  if (hasPets === 'yes') customItems.push('🐾 Vet records, vaccination history, microchip numbers for all pets');
  if (hasHOA === 'yes') customItems.push('📜 HOA violation response procedure + board contact list');
  if (homeType === 'rental') customItems.push('📄 Landlord contact info + lease agreement copy');
  if (homeType === 'owner') customItems.push('📄 Deed copy + title insurance policy');

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#2563eb', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>
          DFW HOMEOWNER GUIDE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>
          📁 Home Emergency Binder Guide
        </h1>
        <p style={{ color: '#475569', marginBottom: 28, lineHeight: 1.6 }}>
          Every DFW homeowner needs a physical binder with the 7 critical categories below. 
          When disaster strikes, this binder is what gets you back on your feet fast.
        </p>

        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '16px 20px', marginBottom: 28 }}>
          <strong>📌 DFW Pro Tip:</strong> After hail, floods, or ice storms — homeowners with organized documentation get insurance payouts 3x faster than those scrambling for policy numbers.
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏠 Customize Your Binder</h2>
          {[
            { label: 'HOME SITUATION', key: 'homeType', options: [['owner', 'I own this home'], ['rental', 'I rent this home']], setter: setHomeType, val: homeType },
            { label: 'DO YOU HAVE PETS?', key: 'hasPets', options: [['yes', 'Yes'], ['no', 'No']], setter: setHasPets, val: hasPets },
            { label: 'ARE YOU IN AN HOA?', key: 'hasHOA', options: [['yes', 'Yes'], ['no', 'No']], setter: setHasHOA, val: hasHOA },
          ].map(field => (
            <div key={field.key} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, color: '#64748b', fontSize: 13 }}>{field.label}</label>
              <select
                value={field.val}
                onChange={e => field.setter(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#f8fafc', color: '#1e293b', border: '1px solid #e2e8f0', fontSize: 15 }}
              >
                <option value=''>Select one</option>
                {field.options.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
              </select>
            </div>
          ))}
          <button
            onClick={() => setShowGuide(true)}
            style={{ background: '#0A1628', color: '#F5E642', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 15, cursor: 'pointer' }}
          >
            Build My Binder Contents →
          </button>
        </div>

        {showGuide && customItems.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', borderLeft: '4px solid #F5E642' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>⭐ Your Custom Additions</h2>
            {customItems.map((item, i) => (
              <div key={i} style={{ padding: '6px 0', fontSize: 14, color: '#475569' }}>{item}</div>
            ))}
          </div>
        )}

        {binderSections.map((section, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{section.title}</h2>
            {section.items.map((item, j) => (
              <div key={j} style={{ padding: '6px 0', fontSize: 14, color: '#475569', display: 'flex', gap: 8 }}>
                <span style={{ color: '#2563eb', minWidth: 16 }}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        ))}

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>☁️ Digital Backup Recommendations</h2>
          {digitalBackups.map((item, i) => (
            <div key={i} style={{ padding: '6px 0', fontSize: 14, color: '#475569' }}>{item}</div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🗄️ Where to Store Your Binder</h2>
          {storageOptions.map((opt, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: i < storageOptions.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{opt.type}</div>
              <div style={{ fontSize: 13, color: '#16a34a' }}>✅ {opt.pro}</div>
              <div style={{ fontSize: 13, color: '#dc2626' }}>⚠️ {opt.con}</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>📍 {opt.location}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 10, padding: '16px 20px', color: '#F5E642', textAlign: 'center' }}>
          <strong>🔧 ProLnk helps you find vetted DFW contractors before you need them in a crisis.</strong>
        </div>
      </div>
    </div>
  );
}
