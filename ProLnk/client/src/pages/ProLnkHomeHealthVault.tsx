import { useState } from 'react';

const vaultItems = [
  { emoji: '🔧', category: 'Maintenance Records', examples: 'HVAC service dates, plumbing repairs, roof patches, appliance maintenance logs' },
  { emoji: '📄', category: 'Warranties & Manuals', examples: 'Appliance warranties, HVAC unit specs, roofing material warranties, window seals' },
  { emoji: '🏛️', category: 'Permits & Inspections', examples: 'Building permits, inspection sign-offs, electrical panel upgrades, additions' },
  { emoji: '🧾', category: 'Contractor Invoices', examples: 'Every pro who touched the home — verified, timestamped, with scope of work' },
  { emoji: '📸', category: 'Photo Documentation', examples: 'Before/after photos of major work, current condition of systems, structural changes' },
  { emoji: '🔒', category: 'Privacy Controls', examples: 'Choose what buyers see, what stays private, revoke access at any time' },
];

const homeAges = ['Under 5 years', '5–15 years', '15–30 years', '30+ years'];
const improvements = ['None yet', 'Minor updates', 'Major renovation', 'Full gut renovation'];

export default function ProLnkHomeHealthVault() {
  const [homeAge, setHomeAge] = useState(1);
  const [improvement, setImprovement] = useState(1);

  const docs = homeAge === 0 ? 12 : homeAge === 1 ? 28 : homeAge === 2 ? 45 : 60;
  const valueImpact = improvement === 0 ? '$2,000–5,000' : improvement === 1 ? '$5,000–12,000' : improvement === 2 ? '$12,000–25,000' : '$25,000–50,000';
  const saleAdvantage = improvement < 2 ? 'Buyers see verified maintenance — fewer inspection surprises = faster close' : 'Full renovation history = appraisal support + premium pricing confidence';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>HOME HEALTH VAULT</div>
          <h1 style={{ fontSize: 42, fontWeight: 900, margin: '0 0 16px' }}>🏠 Your Home's Permanent Record</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 580, margin: '0 auto' }}>
            Every repair, every permit, every contractor — verified and secured forever. Unlocks real value at sale.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }}>
          {vaultItems.map((item, i) => (
            <div key={i} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.emoji}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{item.category}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.examples}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #22c55e', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ fontSize: 40 }}>💡</div>
            <div>
              <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: 4 }}>Why This Matters at Sale</div>
              <div style={{ color: '#94a3b8' }}>Buyers pay more for homes with documented history. Lenders approve faster. Inspections become confirmations, not surprises. The Vault is the home's resume.</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #F5E642', borderRadius: 16, padding: 32 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 800, marginBottom: 20 }}>📊 Value Impact Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>Home Age</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {homeAges.map((h, i) => (
                  <button key={i} onClick={() => setHomeAge(i)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 13,
                      background: homeAge === i ? '#F5E642' : '#1e3a5f', color: homeAge === i ? '#0A1628' : '#fff' }}>{h}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>Improvement History</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {improvements.map((imp, i) => (
                  <button key={i} onClick={() => setImprovement(i)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 13,
                      background: improvement === i ? '#F5E642' : '#1e3a5f', color: improvement === i ? '#0A1628' : '#fff' }}>{imp}</button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, display: 'grid', gap: 12 }}>
            <div><span style={{ color: '#64748b', fontSize: 13 }}>Estimated documentable records: </span><span style={{ color: '#F5E642', fontWeight: 700 }}>{docs}+ items</span></div>
            <div><span style={{ color: '#64748b', fontSize: 13 }}>Estimated value impact at sale: </span><span style={{ color: '#22c55e', fontWeight: 700 }}>{valueImpact}</span></div>
            <div><span style={{ color: '#64748b', fontSize: 13 }}>Sale advantage: </span><span style={{ color: '#fff' }}>{saleAdvantage}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
