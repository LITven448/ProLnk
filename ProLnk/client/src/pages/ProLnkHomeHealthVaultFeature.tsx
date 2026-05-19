import { useState } from 'react';

const docTypes = [
  {
    type: 'Inspection Reports',
    emoji: '🔍',
    storage: 'Uploaded as PDF or connected from certified inspection companies. Timestamped and tamper-evident.',
    privacy: 'You control who sees it — keep private or share with a buyer\’s agent link that expires.',
    value: 'Buyers pay a premium when they can see pre-certified inspection results. Fewer negotiations, faster close.',
  },
  {
    type: 'Contractor Invoices',
    emoji: '🧾',
    storage: 'ProLnk auto-captures invoices from any job completed through the platform. Upload others manually.',
    privacy: 'Line-item detail visible only to you unless you choose to share as a verified repair record.',
    value: 'Documented repairs remove buyer objections and justify your list price on every upgrade made.',
  },
  {
    type: 'Permits',
    emoji: '📋',
    storage: 'Manual upload or future API sync with participating county offices. Linked to specific work orders.',
    privacy: 'Permits are public record but we organize them so buyers can find them instantly.',
    value: 'Unpermitted work kills deals. Verified permits show compliance and protect your liability.',
  },
  {
    type: 'Warranties',
    emoji: '🛡️',
    storage: 'Upload manufacturer documents and service contracts. ProLnk tracks expiration dates automatically.',
    privacy: 'Fully private by default. Transfer to new owner at closing with one click.',
    value: 'Transferable warranties are a tangible asset — appliances, HVAC, roof, foundation all count.',
  },
  {
    type: 'Maintenance Logs',
    emoji: '🔧',
    storage: 'Log entries manually or let ProLnk auto-fill from completed service visits on the platform.',
    privacy: 'You see everything. Share summary view with buyers — no sensitive pricing exposed.',
    value: 'A maintained home shows. Logs prove it. Agents report faster sale times on well-documented homes.',
  },
  {
    type: 'Scan History',
    emoji: '📡',
    storage: 'TrustyPro visual scans create a 3D record of your home\’s condition stored in the Vault.',
    privacy: 'Biometric and structural detail is yours — never sold to insurers or third parties.',
    value: 'Before-and-after scan history creates a documented transformation that justifies your asking price.',
  },
];

export default function ProLnkHomeHealthVaultFeature() {
  const [selected, setSelected] = useState(0);
  const doc = docTypes[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 3, marginBottom: 12 }}>HOME HEALTH VAULT</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, margin: '0 0 16px' }}>Your Home Has a Story. We Help You Tell It.</h1>
          <p style={{ color: '#8899aa', fontSize: 17, maxWidth: 580, margin: '0 auto' }}>
            Every repair, inspection, warranty, and permit — stored securely, organized automatically, and yours forever.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 40 }}>
          {docTypes.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? '#F5E642' : '#111e35',
                color: selected === i ? '#0A1628' : '#ccc',
                border: '1px solid #1e3a5f',
                borderRadius: 8,
                padding: '12px 10px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {d.emoji} {d.type}
            </button>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 16, padding: 36, border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 28 }}>{doc.emoji} {doc.type}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
            {[
              { label: '🗄️ HOW WE STORE IT', text: doc.storage },
              { label: '🔒 PRIVACY CONTROLS', text: doc.privacy },
              { label: '💰 VALUE AT SALE', text: doc.value },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 11, color: '#F5E642', letterSpacing: 2, marginBottom: 10 }}>{item.label}</div>
                <p style={{ color: '#cdd9e5', margin: 0, lineHeight: 1.6, fontSize: 14 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24, marginTop: 24, border: '1px solid #F5E64240', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 2, marginBottom: 8 }}>LIFETIME ACCESS GUARANTEE</div>
          <p style={{ color: '#8899aa', margin: 0 }}>Your Vault belongs to you — not to your agent, your lender, or ProLnk. You own it, you control it, forever.</p>
        </div>
      </div>
    </div>
  );
}
